#!/usr/bin/env node
/**
 * bienzoli Google Drive — Sync Script
 *
 * Syncs local content to Google Drive under /bienzoli/.
 * Updates logs/drive-sync.md with the sync manifest.
 *
 * Agent: AGENT 09 — CLOUD ARCHIVIST
 *
 * Usage:
 *   node --env-file=.env.local scripts/sync-to-drive.mjs
 *   npm run gdrive:sync
 *
 * Sync targets:
 *   docs/business/      → /bienzoli/docs/
 *   docs/brand/         → /bienzoli/docs/
 *   docs/agents/        → /bienzoli/docs/
 *   docs/skills/        → /bienzoli/docs/
 *   docs/market/        → /bienzoli/docs/
 *   content/case-studies/ → /bienzoli/case-studies/
 *   content/social/     → /bienzoli/content/
 *   design/exports/social-cards/ → /bienzoli/social-cards/
 *   logs/               → /bienzoli/docs/
 *
 * Excluded:
 *   .env*, node_modules, .git, .next, *.lock, *.log (binary)
 */

import { google } from 'googleapis'
import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  statSync,
  createReadStream,
} from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, relative, extname } from 'path'
import mimeTypes from 'mime-types'
const mimeLookup = mimeTypes.lookup.bind(mimeTypes)

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ─── Auth ──────────────────────────────────────────────────────────────────

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_REFRESH_TOKEN,
  GDRIVE_ROOT_FOLDER_ID,
} = process.env

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
  console.error('Missing required env vars. Run with: node --env-file=.env.local scripts/sync-to-drive.mjs')
  process.exit(1)
}

if (!GDRIVE_ROOT_FOLDER_ID) {
  console.error('GDRIVE_ROOT_FOLDER_ID is empty. Run npm run gdrive:init first.')
  process.exit(1)
}

const auth = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback',
)
auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN })

const drive = google.drive({ version: 'v3', auth })

// ─── Load folder map ───────────────────────────────────────────────────────

const foldersPath = join(ROOT, 'scripts', 'gdrive-folders.json')
if (!existsSync(foldersPath)) {
  console.error('scripts/gdrive-folders.json not found. Run npm run gdrive:init first.')
  process.exit(1)
}

const FOLDERS = JSON.parse(readFileSync(foldersPath, 'utf8'))

// Validate we have IDs
const requiredFolders = ['root', 'docs', 'case-studies', 'social-cards', 'content', 'videos']
for (const f of requiredFolders) {
  if (!FOLDERS[f]) {
    console.error(`Folder ID missing for "${f}". Run npm run gdrive:init first.`)
    process.exit(1)
  }
}

// ─── Sync targets ──────────────────────────────────────────────────────────

// Each entry: { localDir, driveFolderId, label }
const SYNC_TARGETS = [
  { localDir: join(ROOT, 'docs', 'business'),  driveFolderId: FOLDERS.docs,          label: 'docs/business' },
  { localDir: join(ROOT, 'docs', 'brand'),     driveFolderId: FOLDERS.docs,          label: 'docs/brand' },
  { localDir: join(ROOT, 'docs', 'agents'),    driveFolderId: FOLDERS.docs,          label: 'docs/agents' },
  { localDir: join(ROOT, 'docs', 'skills'),    driveFolderId: FOLDERS.docs,          label: 'docs/skills' },
  { localDir: join(ROOT, 'docs', 'market'),    driveFolderId: FOLDERS.docs,          label: 'docs/market' },
  { localDir: join(ROOT, 'content', 'case-studies'), driveFolderId: FOLDERS['case-studies'], label: 'content/case-studies' },
  { localDir: join(ROOT, 'content', 'social'), driveFolderId: FOLDERS.content,       label: 'content/social' },
  { localDir: join(ROOT, 'content', 'social', 'queue', 'images'), driveFolderId: FOLDERS['social-cards'], label: 'content/social/queue/images (social cards)' },
  { localDir: join(ROOT, 'logs'),              driveFolderId: FOLDERS.docs,          label: 'logs' },
  { localDir: join(ROOT, 'out'),               driveFolderId: FOLDERS.videos,        label: 'out (rendered videos)' },
]

// Social cards: sync per client subfolder into social-cards
const socialCardsDir = join(ROOT, 'design', 'exports', 'social-cards')
if (existsSync(socialCardsDir)) {
  for (const clientFolder of readdirSync(socialCardsDir)) {
    const clientPath = join(socialCardsDir, clientFolder)
    if (statSync(clientPath).isDirectory()) {
      SYNC_TARGETS.push({
        localDir: clientPath,
        driveFolderId: FOLDERS['social-cards'],
        label: `design/exports/social-cards/${clientFolder}`,
      })
    }
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────

const EXCLUDED_EXTENSIONS = new Set(['.lock', '.log', '.DS_Store'])
const EXCLUDED_NAMES = new Set(['.env', '.env.local', '.env.development', '.gitignore', '.git'])

function shouldSync(filename) {
  if (EXCLUDED_NAMES.has(filename)) return false
  if (filename.startsWith('.env')) return false
  const ext = extname(filename).toLowerCase()
  if (EXCLUDED_EXTENSIONS.has(ext)) return false
  return true
}

/**
 * Find an existing file in Drive folder by name.
 */
async function findFile(name, parentId) {
  const res = await drive.files.list({
    q: `name = '${name.replace(/'/g, "\\'")}' and '${parentId}' in parents and trashed = false`,
    fields: 'files(id, name, webViewLink)',
    spaces: 'drive',
  })
  return res.data.files?.length > 0 ? res.data.files[0] : null
}

/**
 * Upload a new file to Drive. Returns { id, webViewLink }.
 */
async function uploadFile(localPath, filename, parentId) {
  const mimeType = mimeLookup(filename) || 'application/octet-stream'

  const res = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [parentId],
    },
    media: {
      mimeType,
      body: createReadStream(localPath),
    },
    fields: 'id, webViewLink',
  })

  // Make it readable by anyone with the link
  await drive.permissions.create({
    fileId: res.data.id,
    requestBody: { role: 'reader', type: 'anyone' },
  })

  return { id: res.data.id, link: res.data.webViewLink }
}

/**
 * Update an existing file in Drive. Returns { id, webViewLink }.
 */
async function updateFile(fileId, localPath, filename) {
  const mimeType = mimeLookup(filename) || 'application/octet-stream'

  const res = await drive.files.update({
    fileId,
    media: {
      mimeType,
      body: createReadStream(localPath),
    },
    fields: 'id, webViewLink',
  })

  return { id: res.data.id, link: res.data.webViewLink }
}

// ─── Manifest ──────────────────────────────────────────────────────────────

/**
 * Sync manifest: { [localRelPath]: { driveId, link, lastSync } }
 */
let manifest = {}

function loadManifest() {
  const manifestPath = join(ROOT, 'logs', 'drive-sync.md')
  if (!existsSync(manifestPath)) return {}

  const content = readFileSync(manifestPath, 'utf8')
  const result = {}

  // Parse table rows: | local path | drive ID | link | last sync |
  const rowPattern = /^\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/gm
  let match
  let isHeader = true
  let isSeparator = false

  for (const line of content.split('\n')) {
    if (line.startsWith('| Local Path')) { isHeader = false; continue }
    if (isHeader) continue
    if (line.startsWith('|---')) { isSeparator = true; continue }
    if (!isSeparator) continue

    const m = line.match(/^\|\s*`?(.+?)`?\s*\|\s*`?(.+?)`?\s*\|\s*\[?(.+?)\]?\(?.+?\)?\s*\|\s*(.+?)\s*\|$/)
    if (m) {
      const [, localPath, driveId, link, lastSync] = m
      if (localPath && driveId && driveId !== 'Drive File ID') {
        result[localPath.trim()] = {
          driveId: driveId.trim(),
          link: link.trim(),
          lastSync: lastSync.trim(),
        }
      }
    }
  }

  return result
}

function saveManifest(entries) {
  const manifestPath = join(ROOT, 'logs', 'drive-sync.md')
  const now = new Date().toISOString()

  let content = `# Google Drive Sync Manifest\n\n`
  content += `Last sync: ${now}\n\n`
  content += `| Local Path | Drive File ID | Shareable Link | Last Sync |\n`
  content += `|---|---|---|---|\n`

  for (const [localPath, data] of Object.entries(entries)) {
    content += `| \`${localPath}\` | \`${data.driveId}\` | [Open](${data.link}) | ${data.lastSync} |\n`
  }

  writeFileSync(manifestPath, content)
}

// ─── Main sync ─────────────────────────────────────────────────────────────

async function syncTarget({ localDir, driveFolderId, label }) {
  if (!existsSync(localDir)) {
    console.log(`  → Skipping ${label} (directory not found)`)
    return { synced: 0, skipped: 0 }
  }

  const files = readdirSync(localDir)
  let synced = 0
  let skipped = 0

  for (const filename of files) {
    const localPath = join(localDir, filename)
    const stat = statSync(localPath)

    // Skip directories and excluded files
    if (stat.isDirectory()) continue
    if (!shouldSync(filename)) { skipped++; continue }

    const relPath = relative(ROOT, localPath)

    try {
      const existing = await findFile(filename, driveFolderId)
      let result

      if (existing) {
        result = await updateFile(existing.id, localPath, filename)
        process.stdout.write(`    ↑ Updated: ${filename}\n`)
      } else {
        result = await uploadFile(localPath, filename, driveFolderId)
        process.stdout.write(`    ✓ Uploaded: ${filename}\n`)
      }

      manifest[relPath] = {
        driveId: result.id,
        link: result.link,
        lastSync: new Date().toISOString(),
      }
      synced++
    } catch (err) {
      console.error(`    ✗ Failed: ${filename} — ${err.message}`)
    }
  }

  return { synced, skipped }
}

async function sync() {
  console.log('\nbienzoli Google Drive Sync')
  console.log('══════════════════════════\n')
  console.log(`Root folder ID: ${GDRIVE_ROOT_FOLDER_ID}\n`)

  manifest = loadManifest()

  let totalSynced = 0
  let totalSkipped = 0

  for (const target of SYNC_TARGETS) {
    console.log(`Syncing ${target.label}...`)
    const { synced, skipped } = await syncTarget(target)
    totalSynced += synced
    totalSkipped += skipped
    if (synced === 0 && skipped === 0) {
      // Already logged "directory not found"
    } else {
      console.log(`  → ${synced} synced, ${skipped} skipped\n`)
    }
  }

  // Save updated manifest
  saveManifest(manifest)
  console.log('✓ Updated logs/drive-sync.md\n')

  console.log('══════════════════════════')
  console.log(`Sync complete: ${totalSynced} files synced, ${totalSkipped} skipped.`)
  console.log(`View your Drive: https://drive.google.com/drive/folders/${GDRIVE_ROOT_FOLDER_ID}\n`)
}

sync().catch((err) => {
  console.error('\nSync failed:', err.message)
  if (err.errors) {
    for (const e of err.errors) console.error(' -', e.message)
  }
  process.exit(1)
})
