/**
 * scripts/fetch-engagement.mjs
 * bienzoli Marketing Engine — Engagement data fetcher
 *
 * Reads logs/content-performance.md, finds rows with "—" placeholders,
 * fetches real engagement data from the Facebook Graph API,
 * and updates the log file.
 *
 * Usage:
 *   node --env-file=.env.local scripts/fetch-engagement.mjs
 *   node --env-file=.env.local scripts/fetch-engagement.mjs --days 7
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PERF_LOG = path.join(ROOT, 'logs', 'content-performance.md')

const PAGE_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
const GRAPH_VER = 'v19.0'
const BASE_URL = `https://graph.facebook.com/${GRAPH_VER}`

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`)
}

// ─── Facebook API helpers ─────────────────────────────────────────────────────

async function fetchPostEngagement(postId) {
  const fields = [
    'likes.summary(true)',
    'comments.summary(true)',
    'shares',
    `insights.metric(post_impressions,post_reach)`,
  ].join(',')

  const url = `${BASE_URL}/${postId}?fields=${encodeURIComponent(fields)}&access_token=${PAGE_TOKEN}`

  const res = await fetch(url)
  if (!res.ok) {
    const err = await res.text()
    log(`  WARN: Could not fetch post ${postId}: ${err.substring(0, 80)}`)
    return null
  }

  const data = await res.json()

  const insights = data.insights?.data ?? []
  const reach = insights.find(i => i.name === 'post_reach')?.values?.[0]?.value ?? '—'
  const impressions = insights.find(i => i.name === 'post_impressions')?.values?.[0]?.value ?? '—'

  return {
    likes: data.likes?.summary?.total_count ?? '—',
    comments: data.comments?.summary?.total_count ?? '—',
    shares: data.shares?.count ?? '—',
    reach,
    impressions,
  }
}

// ─── Log parser ───────────────────────────────────────────────────────────────

function parsePerformanceLog(content) {
  const lines = content.split('\n')
  const headerIdx = lines.findIndex(l => l.includes('| Date |'))
  if (headerIdx === -1) return { lines, rows: [], headerIdx: -1 }

  const rows = []
  for (let i = headerIdx + 2; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line.startsWith('|') || !line.endsWith('|')) continue

    const cells = line.split('|').map(c => c.trim()).filter(Boolean)
    if (cells.length < 8) continue

    rows.push({
      lineIdx: i,
      date: cells[0],
      postId: cells[1],
      pillar: cells[2],
      template: cells[3],
      likes: cells[4],
      reach: cells[5],
      comments: cells[6],
      shares: cells[7],
    })
  }

  return { lines, rows, headerIdx }
}

function buildRow(row) {
  return `| ${row.date} | ${row.postId} | ${row.pillar} | ${row.template} | ${row.likes} | ${row.reach} | ${row.comments} | ${row.shares} |`
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!PAGE_TOKEN) {
    console.error('ERROR: FACEBOOK_PAGE_ACCESS_TOKEN must be set.')
    process.exit(1)
  }

  const args = process.argv.slice(2)
  const daysArg = parseInt(args.find(a => a.startsWith('--days='))?.split('=')[1]
    ?? args[args.indexOf('--days') + 1] ?? '30', 10)

  log(`Fetching engagement data (last ${daysArg} days)...`)

  if (!fs.existsSync(PERF_LOG)) {
    log('No performance log found — nothing to update.')
    process.exit(0)
  }

  const content = fs.readFileSync(PERF_LOG, 'utf-8')
  const { lines, rows } = parsePerformanceLog(content)

  // Find rows that have placeholder data and a real post ID
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysArg)

  let updated = 0

  for (const row of rows) {
    // Skip rows without a real post ID
    if (!row.postId || row.postId === '—' || row.postId === 'Post ID') continue

    // Skip if all data is already filled
    if (row.likes !== '—' && row.reach !== '—') continue

    // Skip posts outside the date window
    const rowDate = new Date(row.date)
    if (!isNaN(rowDate) && rowDate < cutoffDate) continue

    log(`  Fetching: ${row.date} / ${row.postId}`)
    const engagement = await fetchPostEngagement(row.postId)

    if (!engagement) continue

    row.likes = String(engagement.likes)
    row.reach = String(engagement.reach)
    row.comments = String(engagement.comments)
    row.shares = String(engagement.shares)

    lines[row.lineIdx] = buildRow(row)
    updated++

    // Avoid rate limiting
    await new Promise(r => setTimeout(r, 500))
  }

  if (updated > 0) {
    fs.writeFileSync(PERF_LOG, lines.join('\n'))
    log(`\nUpdated ${updated} row(s) in ${PERF_LOG}`)
  } else {
    log('No rows needed updating.')
  }

  // ── Print summary ──────────────────────────────────────────────────────────
  log('\n=== Engagement Summary ===')
  for (const row of rows) {
    if (row.postId && row.postId !== '—') {
      log(`  ${row.date} | ${row.pillar.padEnd(20)} | 👍 ${String(row.likes).padStart(4)} | 👁 ${String(row.reach).padStart(6)} | 💬 ${String(row.comments).padStart(4)} | 🔄 ${row.shares}`)
    }
  }
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
