/**
 * scripts/facebook-post.mjs
 * bienzoli Marketing Engine — Facebook post runner
 *
 * Usage:
 *   node --env-file=.env.local scripts/facebook-post.mjs
 *   node --env-file=.env.local scripts/facebook-post.mjs --test
 *   node --env-file=.env.local scripts/facebook-post.mjs --file content/social/queue/2026-02-26.json
 *
 * In CI (GitHub Actions), call without --env-file:
 *   node scripts/facebook-post.mjs
 *
 * Post JSON schema (content/social/queue/YYYY-MM-DD.json):
 * {
 *   "date": "2026-02-26",
 *   "caption": "Post text here...",
 *   "imagePath": "content/social/queue/images/2026-02-26.png",
 *   "template": "PortfolioCard",
 *   "pillar": "portfolio-proof"
 * }
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
const GRAPH_VER  = 'v19.0'
const BASE_URL   = `https://graph.facebook.com/${GRAPH_VER}`

const QUEUE_DIR   = path.join(ROOT, 'content', 'social', 'queue')
const ARCHIVE_DIR = path.join(ROOT, 'content', 'social', 'archive')
const PERF_LOG    = path.join(ROOT, 'logs', 'content-performance.md')

// ─── Helpers ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0] // YYYY-MM-DD
}

function log(msg) {
  const ts = new Date().toISOString()
  console.log(`[${ts}] ${msg}`)
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
  const res = await fetch(`${BASE_URL}/${PAGE_ID}/feed`, {
    method: 'POST',
    body,
  })

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

function archivePost(postFile, postData, result) {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true })
  const archivePath = path.join(ARCHIVE_DIR, path.basename(postFile))
  fs.writeFileSync(archivePath, JSON.stringify({ ...postData, result, postedAt: new Date().toISOString() }, null, 2))
  fs.unlinkSync(postFile)
  log(`Archived: ${archivePath}`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const isTest = args.includes('--test')
  const fileArg = args.find(a => a.startsWith('--file='))?.split('=')[1]
    ?? args[args.indexOf('--file') + 1]

  if (!PAGE_ID || !PAGE_TOKEN) {
    console.error('ERROR: FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN must be set in env.')
    process.exit(1)
  }

  // ── Test mode ──────────────────────────────────────────────────────────────
  if (isTest) {
    log('Test mode — posting test message to Facebook Page...')
    const result = await postText(
      '🧪 Test post from bienzoli marketing engine. Ignore this.'
    )
    log(`Test post successful. Post ID: ${result.id}`)
    return
  }

  // ── Determine which post file to use ──────────────────────────────────────
  let postFile

  if (fileArg) {
    postFile = path.resolve(ROOT, fileArg)
  } else {
    // Auto-detect: look for today's post JSON in queue
    const dateStr = today()
    postFile = path.join(QUEUE_DIR, `${dateStr}.json`)
  }

  if (!fs.existsSync(postFile)) {
    log(`No post scheduled for today (${path.basename(postFile, '.json')}). Nothing to do.`)
    process.exit(0)
  }

  // ── Load post data ─────────────────────────────────────────────────────────
  const postData = JSON.parse(fs.readFileSync(postFile, 'utf-8'))
  log(`Loaded post: ${postFile}`)
  log(`  Pillar:   ${postData.pillar}`)
  log(`  Template: ${postData.template}`)
  log(`  Caption:  ${postData.caption.substring(0, 80)}...`)

  // ── Post to Facebook ───────────────────────────────────────────────────────
  let result

  if (postData.imagePath && fs.existsSync(path.resolve(ROOT, postData.imagePath))) {
    const absImagePath = path.resolve(ROOT, postData.imagePath)
    log(`Posting with image: ${absImagePath}`)
    result = await postPhoto(postData.caption, absImagePath)
    log(`Photo post successful. Post ID: ${result.post_id ?? result.id}`)
  } else {
    log('No image found — posting text only.')
    result = await postText(postData.caption)
    log(`Text post successful. Post ID: ${result.id}`)
  }

  // ── Log performance entry ──────────────────────────────────────────────────
  appendPerformanceLog({
    date: postData.date ?? today(),
    postId: result.post_id ?? result.id,
    pillar: postData.pillar ?? 'unknown',
    template: postData.template ?? 'unknown',
  })

  // ── Archive the post file ──────────────────────────────────────────────────
  archivePost(postFile, postData, result)

  log('Done.')
}

main().catch(err => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
