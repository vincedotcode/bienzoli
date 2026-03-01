/**
 * scripts/facebook-post.mjs
 * bienzoli Marketing Engine — Facebook post runner
 *
 * Usage:
 *   node --env-file=.env.local scripts/facebook-post.mjs --test
 *   node --env-file=.env.local scripts/facebook-post.mjs --today
 *   node --env-file=.env.local scripts/facebook-post.mjs --file content/social/queue/2026-03-02.json
 *   node --env-file=.env.local scripts/facebook-post.mjs --folder content/social/queue/2026-03-02-portfolio-nickel-sew/
 *
 * In CI (GitHub Actions), call without --env-file:
 *   node scripts/facebook-post.mjs --today
 *
 * Post JSON schema (content/social/queue/YYYY-MM-DD.json):
 * {
 *   "date": "2026-03-02",
 *   "caption": "Post text...",
 *   "imagePath": "content/social/queue/images/2026-03-02.png",
 *   "template": "PortfolioCard",
 *   "pillar": "portfolio-proof"
 * }
 *
 * Folder post schema (content/social/queue/[date]-[type]-[slug]/):
 *   post.md  — YAML frontmatter (date, template, pillar, hashtags, link) + caption body
 *   image.png — pre-generated social card image
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import FormData from 'form-data'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ─── Config ───────────────────────────────────────────────────────────────────

const PAGE_ID    = process.env.FACEBOOK_PAGE_ID
const PAGE_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
const GRAPH_VER  = 'v21.0'
const BASE_URL   = `https://graph.facebook.com/${GRAPH_VER}`

const QUEUE_DIR   = path.join(ROOT, 'content', 'social', 'queue')
const ARCHIVE_DIR = path.join(ROOT, 'content', 'social', 'archive')
const PERF_LOG    = path.join(ROOT, 'logs', 'content-performance.md')

// ─── Helpers ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0]
}

function log(msg) {
  const ts = new Date().toISOString()
  console.log(`[${ts}] ${msg}`)
}

function getArg(args, flag) {
  const withEquals = args.find(a => a.startsWith(`${flag}=`))
  if (withEquals) return withEquals.split('=').slice(1).join('=')
  const idx = args.indexOf(flag)
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--')) return args[idx + 1]
  return null
}

async function postPhoto(caption, imagePath) {
  const form = new FormData()
  form.append('caption', caption)
  form.append('access_token', PAGE_TOKEN)
  form.append('source', fs.createReadStream(imagePath), {
    filename: path.basename(imagePath),
    contentType: 'image/png',
  })

  const res = await fetch(`${BASE_URL}/${PAGE_ID}/photos`, {
    method: 'POST',
    headers: form.getHeaders(),
    body: form,
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Photo post failed ${res.status}: ${err}`)
  }

  return res.json()
}

async function postText(message) {
  const body = new URLSearchParams({ message, access_token: PAGE_TOKEN })
  const res = await fetch(`${BASE_URL}/${PAGE_ID}/feed`, { method: 'POST', body })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Text post failed ${res.status}: ${err}`)
  }

  return res.json()
}

function appendPerformanceLog(entry) {
  const line = `| ${entry.date} | ${entry.postId} | ${entry.pillar} | ${entry.template} | — | — | — | — |\n`

  if (!fs.existsSync(PERF_LOG)) {
    const header = `# Content Performance Log\n\n| Date | Post ID | Pillar | Template | Likes | Reach | Comments | Shares |\n|---|---|---|---|---|---|---|---|\n`
    fs.writeFileSync(PERF_LOG, header)
  }

  fs.appendFileSync(PERF_LOG, line)
}

function archiveJsonPost(postFile, postData, result) {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true })
  const archivePath = path.join(ARCHIVE_DIR, path.basename(postFile))
  fs.writeFileSync(
    archivePath,
    JSON.stringify({ ...postData, result, postedAt: new Date().toISOString() }, null, 2)
  )
  fs.unlinkSync(postFile)
  log(`Archived: ${archivePath}`)
}

function archiveFolderPost(folderPath, postData, result) {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true })
  const folderName = path.basename(folderPath)
  const archiveFolderPath = path.join(ARCHIVE_DIR, folderName)

  // Write result.md inside the archived folder
  fs.mkdirSync(archiveFolderPath, { recursive: true })
  const resultContent = `# Post Result\n\n- **Date:** ${postData.date}\n- **Posted at:** ${new Date().toISOString()}\n- **Post ID:** ${result.post_id ?? result.id}\n- **URL:** https://facebook.com/${result.post_id ?? result.id}\n`
  fs.writeFileSync(path.join(archiveFolderPath, 'result.md'), resultContent)

  // Copy post.md and image.png to archive
  for (const file of ['post.md', 'image.png']) {
    const src = path.join(folderPath, file)
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(archiveFolderPath, file))
    }
  }

  // Remove original folder
  fs.rmSync(folderPath, { recursive: true })
  log(`Archived folder: ${archiveFolderPath}`)
}

// ─── Parse post.md frontmatter ────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/m)
  if (!match) return { data: {}, body: content.trim() }

  const frontmatter = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
    frontmatter[key] = value
  }

  return { data: frontmatter, body: match[2].trim() }
}

// ─── Execute post ─────────────────────────────────────────────────────────────

async function executePost(caption, imagePath, meta) {
  let result

  if (imagePath && fs.existsSync(path.resolve(ROOT, imagePath))) {
    const absImagePath = path.resolve(ROOT, imagePath)
    log(`Posting with image: ${absImagePath}`)
    result = await postPhoto(caption, absImagePath)
    log(`Photo post successful. Post ID: ${result.post_id ?? result.id}`)
  } else {
    log('No image found — posting text only.')
    result = await postText(caption)
    log(`Text post successful. Post ID: ${result.id}`)
  }

  appendPerformanceLog({
    date: meta.date ?? today(),
    postId: result.post_id ?? result.id,
    pillar: meta.pillar ?? 'unknown',
    template: meta.template ?? 'unknown',
  })

  return result
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const isTest   = args.includes('--test')
  const isToday  = args.includes('--today')
  const fileArg  = getArg(args, '--file')
  const folderArg = getArg(args, '--folder')

  if (!PAGE_ID || !PAGE_TOKEN) {
    console.error('ERROR: FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN must be set in env.')
    process.exit(1)
  }

  // ── Test mode ──────────────────────────────────────────────────────────────
  if (isTest) {
    log('Test mode — posting test message to Facebook Page...')
    const result = await postText('Test post from bienzoli marketing engine. Ignore this.')
    log(`Test post successful. Post ID: ${result.id}`)
    return
  }

  // ── Folder mode ────────────────────────────────────────────────────────────
  if (folderArg) {
    const folderPath = path.resolve(ROOT, folderArg)

    if (!fs.existsSync(folderPath)) {
      log(`Folder not found: ${folderPath}`)
      process.exit(1)
    }

    const postMdPath = path.join(folderPath, 'post.md')
    if (!fs.existsSync(postMdPath)) {
      log(`No post.md found in folder: ${folderPath}`)
      process.exit(1)
    }

    const { data: frontmatter, body: caption } = parseFrontmatter(
      fs.readFileSync(postMdPath, 'utf-8')
    )

    // Build full caption (body + hashtags)
    const fullCaption = frontmatter.hashtags
      ? `${caption}\n\n${frontmatter.hashtags}`
      : caption

    log(`Folder mode: ${folderArg}`)
    log(`  Caption: ${caption.substring(0, 80)}...`)

    const imagePath = path.join(folderPath, 'image.png')
    const result = await executePost(fullCaption, imagePath, {
      date: frontmatter.date ?? today(),
      pillar: frontmatter.pillar ?? 'unknown',
      template: frontmatter.template ?? 'unknown',
    })

    archiveFolderPost(folderPath, { ...frontmatter, caption }, result)
    log('Done.')
    return
  }

  // ── File mode or Today mode ────────────────────────────────────────────────
  let postFile

  if (fileArg) {
    postFile = path.resolve(ROOT, fileArg)
  } else {
    // --today or default (no args)
    const dateStr = today()
    postFile = path.join(QUEUE_DIR, `${dateStr}.json`)
  }

  if (!fs.existsSync(postFile)) {
    log(`No post scheduled for today (${path.basename(postFile, '.json')}). Nothing to do.`)
    process.exit(0)
  }

  const postData = JSON.parse(fs.readFileSync(postFile, 'utf-8'))
  log(`Loaded post: ${postFile}`)
  log(`  Pillar:   ${postData.pillar}`)
  log(`  Template: ${postData.template}`)
  log(`  Caption:  ${postData.caption.substring(0, 80)}...`)

  const result = await executePost(postData.caption, postData.imagePath, {
    date: postData.date ?? today(),
    pillar: postData.pillar ?? 'unknown',
    template: postData.template ?? 'unknown',
  })

  archiveJsonPost(postFile, postData, result)
  log('Done.')
}

main().catch(err => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
