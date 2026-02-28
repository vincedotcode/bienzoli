/**
 * scripts/generate-social-image.mjs
 * bienzoli Marketing Engine — Social card image generator
 *
 * Reads a post JSON from the queue and generates the social card PNG.
 * Run this before facebook-post.mjs so the image is ready.
 *
 * Usage:
 *   node --env-file=.env.local scripts/generate-social-image.mjs --file content/social/queue/2026-02-26.json
 *   node --env-file=.env.local scripts/generate-social-image.mjs --date 2026-02-26
 *   node --env-file=.env.local scripts/generate-social-image.mjs  (uses today's date)
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

const CARD_WIDTH  = 1080
const CARD_HEIGHT = 1080

// ─── Helpers ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0]
}

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`)
}

async function renderCard(templateName, data, outputPath) {
  const templatePath = path.join(TEMPLATES_DIR, `${templateName}.html`)

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`)
  }

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
    await page.setViewport({ width: CARD_WIDTH, height: CARD_HEIGHT, deviceScaleFactor: 2 })
    await page.setContent(html, { waitUntil: 'networkidle0' })
    await page.evaluate(() => document.fonts.ready)

    const screenshot = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: CARD_WIDTH, height: CARD_HEIGHT },
    })

    fs.mkdirSync(path.dirname(outputPath), { recursive: true })

    await sharp(screenshot)
      .resize(CARD_WIDTH, CARD_HEIGHT, { fit: 'cover' })
      .png({ quality: 95 })
      .toFile(outputPath)

    return outputPath
  } finally {
    await browser.close()
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)

  const dateArg = args.find(a => a.startsWith('--date='))?.split('=')[1]
    ?? args[args.indexOf('--date') + 1]

  const fileArg = args.find(a => a.startsWith('--file='))?.split('=')[1]
    ?? args[args.indexOf('--file') + 1]

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

  const dateStr = postData.date ?? today()
  const outputPath = path.join(IMAGES_DIR, `${dateStr}.png`)

  log(`Rendering template: ${postData.template}`)
  log(`Output: ${outputPath}`)

  await renderCard(postData.template, postData.templateData ?? {}, outputPath)

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
