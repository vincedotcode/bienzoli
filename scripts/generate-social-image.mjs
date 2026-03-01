/**
 * scripts/generate-social-image.mjs
 * bienzoli Marketing Engine — Social card image generator
 *
 * Two usage modes:
 *
 * 1. Direct render (new — for CLI and one-off generation):
 *    node scripts/generate-social-image.mjs \
 *      --template portfolio \
 *      --data '{"clientName":"Nickel Sew","projectUrl":"nickelsew.com"}' \
 *      --size instagram \
 *      --out content/social/queue/images/test.png
 *
 * 2. Queue mode (existing — for daily pipeline):
 *    node scripts/generate-social-image.mjs --date 2026-03-02
 *    node scripts/generate-social-image.mjs --file content/social/queue/2026-03-02.json
 *    node scripts/generate-social-image.mjs  (uses today's date)
 *
 * Template aliases (case-insensitive):
 *   portfolio, tip, build-process, testimonial, local, pricing,
 *   speed-test, stat, before-after, cta, education
 *
 * Size presets:
 *   instagram (default) = 1080×1080
 *   facebook            = 1200×630
 *   story               = 1080×1920
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const TEMPLATES_DIR = path.join(ROOT, 'content', 'social', 'templates')
const QUEUE_DIR     = path.join(ROOT, 'content', 'social', 'queue')
const IMAGES_DIR    = path.join(ROOT, 'content', 'social', 'queue', 'images')

// ─── Template aliases ─────────────────────────────────────────────────────────

const TEMPLATE_ALIASES = {
  portfolio:     'PortfolioCard',
  tip:           'TipCard',
  'build-process': 'BuildProcessCard',
  buildprocess:  'BuildProcessCard',
  testimonial:   'TestimonialCard',
  local:         'LocalEngagementCard',
  localengagement: 'LocalEngagementCard',
  pricing:       'PricingCard',
  'speed-test':  'SpeedTestCard',
  speedtest:     'SpeedTestCard',
  stat:          'StatCard',
  'before-after': 'BeforeAfterCard',
  beforeafter:   'BeforeAfterCard',
  cta:           'CallToActionCard',
  education:     'EducationCard',
}

// ─── Size presets ─────────────────────────────────────────────────────────────

const SIZE_PRESETS = {
  instagram: { width: 1080, height: 1080 },
  facebook:  { width: 1200, height: 630  },
  story:     { width: 1080, height: 1920 },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0]
}

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`)
}

function resolveTemplate(name) {
  const key = name.toLowerCase().replace(/\s+/g, '-')
  const resolved = TEMPLATE_ALIASES[key] ?? name
  return resolved
}

async function renderCard(templateName, data, outputPath, size = 'instagram') {
  const templatePath = path.join(TEMPLATES_DIR, `${templateName}.html`)

  if (!fs.existsSync(templatePath)) {
    const available = fs.readdirSync(TEMPLATES_DIR)
      .filter(f => f.endsWith('.html'))
      .map(f => f.replace('.html', ''))
    throw new Error(
      `Template not found: ${templateName}.html\nAvailable: ${available.join(', ')}`
    )
  }

  const { width, height } = SIZE_PRESETS[size] ?? SIZE_PRESETS.instagram

  let html = fs.readFileSync(templatePath, 'utf-8')
  for (const [key, value] of Object.entries(data)) {
    html = html.split(`{{${key}}}`).join(String(value))
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width, height, deviceScaleFactor: 2 })
    await page.setContent(html, { waitUntil: 'networkidle0' })
    await page.evaluate(() => document.fonts.ready)

    const screenshot = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width, height },
    })

    fs.mkdirSync(path.dirname(outputPath), { recursive: true })

    await sharp(screenshot)
      .resize(width, height, { fit: 'cover' })
      .png({ quality: 95 })
      .toFile(outputPath)

    return outputPath
  } finally {
    await browser.close()
  }
}

// ─── Argument parsing ─────────────────────────────────────────────────────────

function getArg(args, flag) {
  const withEquals = args.find(a => a.startsWith(`${flag}=`))
  if (withEquals) return withEquals.split('=').slice(1).join('=')
  const idx = args.indexOf(flag)
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--')) return args[idx + 1]
  return null
}

function hasFlag(args, flag) {
  return args.includes(flag)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)

  const templateArg = getArg(args, '--template')
  const dataArg     = getArg(args, '--data')
  const sizeArg     = getArg(args, '--size') ?? 'instagram'
  const outArg      = getArg(args, '--out')
  const dateArg     = getArg(args, '--date')
  const fileArg     = getArg(args, '--file')

  // ── Mode 1: Direct render ──────────────────────────────────────────────────
  if (templateArg) {
    const templateName = resolveTemplate(templateArg)
    const data = dataArg ? JSON.parse(dataArg) : {}
    const outputPath = outArg
      ? path.resolve(ROOT, outArg)
      : path.join(IMAGES_DIR, `${templateName}-${Date.now()}.png`)

    log(`Direct render mode`)
    log(`  Template: ${templateArg} → ${templateName}`)
    log(`  Size:     ${sizeArg} (${SIZE_PRESETS[sizeArg]?.width ?? '?'}×${SIZE_PRESETS[sizeArg]?.height ?? '?'})`)
    log(`  Output:   ${outputPath}`)

    await renderCard(templateName, data, outputPath, sizeArg)
    log(`Done: ${outputPath}`)
    return
  }

  // ── Mode 2: Queue file render ──────────────────────────────────────────────
  let postFile

  if (fileArg) {
    postFile = path.resolve(ROOT, fileArg)
  } else {
    const dateStr = dateArg ?? today()
    postFile = path.join(QUEUE_DIR, `${dateStr}.json`)
  }

  if (!fs.existsSync(postFile)) {
    log(`No post file found: ${postFile}`)
    process.exit(1)
  }

  const postData = JSON.parse(fs.readFileSync(postFile, 'utf-8'))
  log(`Loaded post: ${postFile}`)
  log(`  Template: ${postData.template}`)

  if (!postData.template) {
    log('No template specified in post JSON — skipping image generation.')
    process.exit(0)
  }

  const templateName = resolveTemplate(postData.template)
  const dateStr = postData.date ?? today()
  const outputPath = path.join(IMAGES_DIR, `${dateStr}.png`)

  log(`Rendering template: ${templateName}`)
  log(`Output: ${outputPath}`)

  await renderCard(templateName, postData.templateData ?? {}, outputPath, sizeArg)

  // Update the post JSON with the generated image path
  postData.imagePath = path.relative(ROOT, outputPath)
  fs.writeFileSync(postFile, JSON.stringify(postData, null, 2))

  log(`Image generated: ${outputPath}`)
  log('Updated post JSON with imagePath.')
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
