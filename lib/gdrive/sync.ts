/**
 * bienzoli Google Drive Sync Utility
 *
 * Handles file upload, folder creation, and sync manifest management
 * for the bienzoli project backup and sharing system.
 *
 * Agent: AGENT 09 — CLOUD ARCHIVIST
 *
 * Usage (server-side only — requires GOOGLE_* env vars):
 *   import { syncFile, syncFolder, getSyncManifest } from '@/lib/gdrive/sync'
 *
 *   const link = await syncFile('content/case-studies/nickel-sew.md', 'case-studies')
 *   const links = await syncFolder('design/exports/social-cards/nickel-sew/', 'social-cards')
 */

import { google } from 'googleapis'
import { createReadStream, existsSync, readdirSync, statSync } from 'fs'
import { join, basename } from 'path'

// ─── Types ─────────────────────────────────────────────────────────────────

export interface SyncManifestEntry {
  driveId: string
  link: string
  lastSync: string
}

export type SyncManifest = Record<string, SyncManifestEntry>

// ─── Auth ──────────────────────────────────────────────────────────────────

function getAuth() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN } =
    process.env

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error(
      'Missing Google OAuth env vars. Ensure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN are set in .env.local.',
    )
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback',
  )
  oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN })
  return oauth2Client
}

function getDrive() {
  return google.drive({ version: 'v3', auth: getAuth() })
}

function getRootFolderId(): string {
  const id = process.env.GDRIVE_ROOT_FOLDER_ID
  if (!id) {
    throw new Error(
      'GDRIVE_ROOT_FOLDER_ID is not set. Run npm run gdrive:init to create the folder structure.',
    )
  }
  return id
}

// ─── Folder resolution ─────────────────────────────────────────────────────

const SUBFOLDER_MAP: Record<string, string | undefined> = {
  'docs': undefined,
  'case-studies': undefined,
  'social-cards': undefined,
  'client-deliverables': undefined,
  'invoices': undefined,
  'contracts': undefined,
  'content': undefined,
}

async function resolveFolderId(driveFolder: string): Promise<string> {
  // First try scripts/gdrive-folders.json if running in Node context
  try {
    // Dynamic import for server-side use
    const { readFileSync } = await import('fs')
    const foldersPath = join(process.cwd(), 'scripts', 'gdrive-folders.json')
    if (existsSync(foldersPath)) {
      const folders = JSON.parse(readFileSync(foldersPath, 'utf8'))
      if (folders[driveFolder]) return folders[driveFolder]
    }
  } catch {
    // Fall through
  }

  // Fall back: search Drive for the folder by name under root
  const drive = getDrive()
  const rootId = getRootFolderId()

  const res = await drive.files.list({
    q: `name = '${driveFolder}' and '${rootId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id)',
    spaces: 'drive',
  })

  if (res.data.files && res.data.files.length > 0) {
    return res.data.files[0].id!
  }

  throw new Error(
    `Drive folder "${driveFolder}" not found under /bienzoli/. Run npm run gdrive:init to create the folder structure.`,
  )
}

// ─── File operations ───────────────────────────────────────────────────────

async function findExistingFile(drive: ReturnType<typeof getDrive>, filename: string, parentId: string) {
  const res = await drive.files.list({
    q: `name = '${filename.replace(/'/g, "\\'")}' and '${parentId}' in parents and trashed = false`,
    fields: 'files(id, webViewLink)',
    spaces: 'drive',
  })
  return res.data.files?.[0] ?? null
}

async function uploadOrUpdate(
  drive: ReturnType<typeof getDrive>,
  localPath: string,
  parentId: string,
): Promise<{ id: string; link: string }> {
  const filename = basename(localPath)
  const existing = await findExistingFile(drive, filename, parentId)

  let fileId: string
  let webViewLink: string

  if (existing) {
    const res = await drive.files.update({
      fileId: existing.id!,
      media: { body: createReadStream(localPath) },
      fields: 'id, webViewLink',
    })
    fileId = res.data.id!
    webViewLink = res.data.webViewLink!
  } else {
    const res = await drive.files.create({
      requestBody: { name: filename, parents: [parentId] },
      media: { body: createReadStream(localPath) },
      fields: 'id, webViewLink',
    })
    fileId = res.data.id!
    webViewLink = res.data.webViewLink!

    // Share with anyone (reader)
    await drive.permissions.create({
      fileId,
      requestBody: { role: 'reader', type: 'anyone' },
    })
  }

  return { id: fileId, link: webViewLink }
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Upload a single local file to the specified Drive folder.
 * Returns a shareable link.
 *
 * @param localPath - Absolute or project-relative path to the local file
 * @param driveFolder - Drive subfolder name (e.g. 'case-studies', 'docs', 'invoices')
 */
export async function syncFile(localPath: string, driveFolder: string): Promise<string> {
  const absolutePath = localPath.startsWith('/') ? localPath : join(process.cwd(), localPath)

  if (!existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`)
  }

  const drive = getDrive()
  const folderId = await resolveFolderId(driveFolder)
  const { link } = await uploadOrUpdate(drive, absolutePath, folderId)

  return link
}

/**
 * Upload all files in a local directory to the specified Drive folder.
 * Skips subdirectories. Returns an array of shareable links.
 *
 * @param localPath - Absolute or project-relative path to the local directory
 * @param driveFolder - Drive subfolder name (e.g. 'social-cards', 'client-deliverables')
 */
export async function syncFolder(localPath: string, driveFolder: string): Promise<string[]> {
  const absolutePath = localPath.startsWith('/') ? localPath : join(process.cwd(), localPath)

  if (!existsSync(absolutePath)) {
    throw new Error(`Directory not found: ${absolutePath}`)
  }

  const drive = getDrive()
  const folderId = await resolveFolderId(driveFolder)

  const files = readdirSync(absolutePath).filter((f) => {
    const stat = statSync(join(absolutePath, f))
    return stat.isFile()
  })

  const links: string[] = []

  for (const filename of files) {
    const filePath = join(absolutePath, filename)
    const { link } = await uploadOrUpdate(drive, filePath, folderId)
    links.push(link)
  }

  return links
}

/**
 * Read and return the sync manifest from logs/drive-sync.md.
 * Returns an empty object if the manifest doesn't exist yet.
 */
export async function getSyncManifest(): Promise<SyncManifest> {
  const manifestPath = join(process.cwd(), 'logs', 'drive-sync.md')

  if (!existsSync(manifestPath)) {
    return {}
  }

  const { readFileSync } = await import('fs')
  const content = readFileSync(manifestPath, 'utf8')
  const result: SyncManifest = {}

  let pastHeader = false
  for (const line of content.split('\n')) {
    if (line.startsWith('| Local Path')) { pastHeader = false; continue }
    if (line.startsWith('|---')) { pastHeader = true; continue }
    if (!pastHeader) continue

    const m = line.match(/^\|\s*`?([^`|]+?)`?\s*\|\s*`?([^`|]+?)`?\s*\|\s*\[?[^\]]*\]?\(([^)]+)\)\s*\|\s*([^|]+?)\s*\|$/)
    if (m) {
      const [, localPath, driveId, link, lastSync] = m
      result[localPath.trim()] = {
        driveId: driveId.trim(),
        link: link.trim(),
        lastSync: lastSync.trim(),
      }
    }
  }

  return result
}
