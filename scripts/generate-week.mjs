/**
 * scripts/generate-week.mjs
 * bienzoli Marketing Engine — Weekly post schedule generator
 *
 * Generates 7 dated post JSON files in content/social/queue/ starting from
 * the next Monday (or a specified start date), based on the content calendar pillars.
 *
 * Usage:
 *   node --env-file=.env.local scripts/generate-week.mjs
 *   node --env-file=.env.local scripts/generate-week.mjs --start 2026-03-03
 *   node --env-file=.env.local scripts/generate-week.mjs --week 2
 *
 * Each output file: content/social/queue/YYYY-MM-DD.json
 * These files are then picked up by generate-social-image.mjs + facebook-post.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const QUEUE_DIR = path.join(ROOT, 'content', 'social', 'queue')
const DRAFTS_DIR = path.join(ROOT, 'content', 'social', 'queue')

// ─── Content library ──────────────────────────────────────────────────────────
// These map to the pre-written posts in the queue/week*-day*.json files.
// You can extend this array to add more weeks.

const CONTENT_LIBRARY = [
  // Week 1
  { sourceFile: 'week1-day1.json' },
  { sourceFile: 'week1-day2.json' },
  { sourceFile: 'week1-day3.json' },
  { sourceFile: 'week1-day4.json' },
  { sourceFile: 'week1-day5.json' },
  { sourceFile: 'week1-day6.json' },
  { sourceFile: 'week1-day7.json' },
  // Week 2
  { sourceFile: 'week2-day1.json' },
  { sourceFile: 'week2-day2.json' },
  { sourceFile: 'week2-day3.json' },
  { sourceFile: 'week2-day4.json' },
  { sourceFile: 'week2-day5.json' },
  { sourceFile: 'week2-day6.json' },
  { sourceFile: 'week2-day7.json' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`)
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function formatDate(date) {
  return date.toISOString().split('T')[0]
}

function nextMonday() {
  const now = new Date()
  const dayOfWeek = now.getDay() // 0=Sun, 1=Mon, ...
  const daysUntilMonday = dayOfWeek === 1 ? 7 : (8 - dayOfWeek) % 7 || 7
  return addDays(now, daysUntilMonday)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)

  const startArg = args.find(a => a.startsWith('--start='))?.split('=')[1]
    ?? args[args.indexOf('--start') + 1]
  const weekArg = parseInt(args.find(a => a.startsWith('--week='))?.split('=')[1]
    ?? args[args.indexOf('--week') + 1] ?? '1', 10)

  // Determine start date
  let startDate
  if (startArg) {
    startDate = new Date(startArg)
  } else {
    startDate = nextMonday()
  }

  log(`Generating week ${weekArg} schedule starting ${formatDate(startDate)}`)

  // Determine which 7 posts to use from the library
  const weekIndex = (weekArg - 1) % Math.ceil(CONTENT_LIBRARY.length / 7)
  const startIdx = weekIndex * 7
  const weekPosts = CONTENT_LIBRARY.slice(startIdx, startIdx + 7)

  if (weekPosts.length === 0) {
    log('No posts found for this week index. Check CONTENT_LIBRARY.')
    process.exit(1)
  }

  const created = []

  for (let i = 0; i < weekPosts.length; i++) {
    const date = addDays(startDate, i)
    const dateStr = formatDate(date)
    const targetFile = path.join(QUEUE_DIR, `${dateStr}.json`)

    // Skip if already exists
    if (fs.existsSync(targetFile)) {
      log(`  Skip: ${dateStr}.json already exists`)
      continue
    }

    // Load source post template
    const sourcePath = path.join(DRAFTS_DIR, weekPosts[i].sourceFile)
    if (!fs.existsSync(sourcePath)) {
      log(`  WARN: Source not found: ${weekPosts[i].sourceFile}`)
      continue
    }

    const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'))

    // Write dated post file
    const postData = {
      ...sourceData,
      date: dateStr,
      imagePath: null, // will be filled by generate-social-image.mjs
    }

    fs.writeFileSync(targetFile, JSON.stringify(postData, null, 2))
    created.push(dateStr)
    log(`  Created: ${dateStr}.json (${sourceData.pillar} · ${sourceData.template})`)
  }

  log(`\nWeek schedule created: ${created.length} posts`)
  log(`Queue directory: ${QUEUE_DIR}`)
  log(`\nNext steps:`)
  log(`  1. Generate images:  npm run social:generate-images`)
  log(`  2. Review queue:     ls content/social/queue/`)
  log(`  3. Posts auto-post at 10:00 AM MUT via GitHub Actions`)
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
