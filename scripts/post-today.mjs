/**
 * scripts/post-today.mjs
 * bienzoli Marketing Engine — Daily post orchestrator
 *
 * Full pipeline for today's post:
 *   1. Find today's post JSON in content/social/queue/
 *   2. Generate social card image (puppeteer → PNG)
 *   3. Post to Facebook (photo + caption)
 *   4. Archive the post JSON
 *   5. Log to content-performance.md
 *
 * Called by GitHub Actions daily cron at 06:00 UTC (10:00 AM MUT).
 * Can also be run manually:
 *   node --env-file=.env.local scripts/post-today.mjs
 *   node --env-file=.env.local scripts/post-today.mjs --date 2026-03-01
 *   node --env-file=.env.local scripts/post-today.mjs --dry-run  (no posting)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const QUEUE_DIR = path.join(ROOT, 'content', 'social', 'queue')
const ARCHIVE_DIR = path.join(ROOT, 'content', 'social', 'archive')
const PERF_LOG = path.join(ROOT, 'logs', 'content-performance.md')

// ─── Helpers ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0]
}

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`)
}

function run(cmd, opts = {}) {
  log(`  > ${cmd}`)
  return execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts })
}

function countQueuedPosts() {
  if (!fs.existsSync(QUEUE_DIR)) return 0
  return fs.readdirSync(QUEUE_DIR)
    .filter(f => f.match(/^\d{4}-\d{2}-\d{2}\.json$/))
    .length
}

function lowQueueWarning(remaining) {
  if (remaining < 7) {
    log(`\n⚠️  WARNING: Only ${remaining} post(s) remaining in queue.`)
    log(`   Run: node scripts/generate-week.mjs --week X`)
    log(`   to replenish the content calendar.\n`)
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const isDryRun = args.includes('--dry-run')
  const dateArg = args.find(a => a.startsWith('--date='))?.split('=')[1]
    ?? args[args.indexOf('--date') + 1]

  const dateStr = dateArg ?? today()

  log(`bienzoli Marketing Engine — Daily Post Pipeline`)
  log(`Date: ${dateStr}${isDryRun ? ' (DRY RUN — no posting)' : ''}`)
  log('─'.repeat(60))

  // ── 1. Find today's post file ──────────────────────────────────────────────
  const postFile = path.join(QUEUE_DIR, `${dateStr}.json`)

  if (!fs.existsSync(postFile)) {
    log(`No post scheduled for ${dateStr}. Nothing to do.`)
    const remaining = countQueuedPosts()
    lowQueueWarning(remaining)
    process.exit(0)
  }

  const postData = JSON.parse(fs.readFileSync(postFile, 'utf-8'))
  log(`Post loaded:`)
  log(`  Pillar:   ${postData.pillar}`)
  log(`  Template: ${postData.template}`)
  log(`  Caption:  ${postData.caption.substring(0, 80)}...`)

  // ── 2. Generate social card image ──────────────────────────────────────────
  if (postData.template) {
    log(`\nGenerating social card image...`)
    const imageCmd = `node scripts/generate-social-image.mjs --file content/social/queue/${dateStr}.json`

    if (!isDryRun) {
      run(imageCmd)
    } else {
      log(`  [dry-run] Would run: ${imageCmd}`)
    }
  } else {
    log(`\nNo template specified — skipping image generation.`)
  }

  // ── 3. Post to Facebook ────────────────────────────────────────────────────
  log(`\nPosting to Facebook...`)
  const postCmd = `node scripts/facebook-post.mjs --file content/social/queue/${dateStr}.json`

  if (!isDryRun) {
    run(postCmd)
  } else {
    log(`  [dry-run] Would run: ${postCmd}`)
    log(`  Caption preview:\n`)
    console.log(postData.caption)
    console.log()
  }

  // ── 4. Report queue status ─────────────────────────────────────────────────
  const remaining = countQueuedPosts()
  log(`\nQueue status: ${remaining} post(s) remaining after today`)
  lowQueueWarning(remaining)

  log(`\nPipeline complete. ✓`)
}

main().catch(err => {
  console.error('\nFatal error:', err.message)
  console.error(err.stack)
  process.exit(1)
})
