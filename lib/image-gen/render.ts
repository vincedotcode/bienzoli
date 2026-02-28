/**
 * lib/image-gen/render.ts
 * bienzoli Marketing Engine — HTML-to-PNG social card renderer
 *
 * Uses puppeteer (headless Chrome) to render an HTML template to PNG,
 * then sharp to crop/resize to exact dimensions.
 *
 * Output: 1080×1080 PNG (1:1 for Facebook/Instagram feed)
 *
 * Usage (from Node/ESM scripts):
 *   import { renderCard } from '@/lib/image-gen/render'
 *   await renderCard('PortfolioCard', { projectName: 'Nickel Sew', ... }, 'output.png')
 */

import puppeteer from 'puppeteer'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = path.resolve(__dirname, '../../content/social/templates')

// Output dimensions
const CARD_WIDTH  = 1080
const CARD_HEIGHT = 1080

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardTemplate =
  | 'PortfolioCard'
  | 'TipCard'
  | 'BuildProcessCard'
  | 'TestimonialCard'
  | 'LocalEngagementCard'
  | 'PricingCard'
  | 'SpeedTestCard'
  | 'StatCard'
  | 'BeforeAfterCard'

export type CardData = Record<string, string | number | boolean>

// ─── Renderer ────────────────────────────────────────────────────────────────

/**
 * Renders an HTML template with injected data to a PNG file.
 *
 * @param template  Name of the template (matches filename in content/social/templates/)
 * @param data      Key-value pairs injected into the template via {{key}} placeholders
 * @param outputPath Absolute or relative path for the output PNG
 */
export async function renderCard(
  template: CardTemplate,
  data: CardData,
  outputPath: string
): Promise<string> {
  const templatePath = path.join(TEMPLATES_DIR, `${template}.html`)

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`)
  }

  // Load template HTML and inject data
  let html = fs.readFileSync(templatePath, 'utf-8')
  for (const [key, value] of Object.entries(data)) {
    html = html.replaceAll(`{{${key}}}`, String(value))
  }

  // Launch headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=none',
    ],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: CARD_WIDTH, height: CARD_HEIGHT, deviceScaleFactor: 2 })
    await page.setContent(html, { waitUntil: 'networkidle0' })

    // Wait for Google Fonts to load
    await page.evaluate(() => document.fonts.ready)

    // Capture screenshot at 2x scale then downscale to exactly 1080×1080
    const screenshot = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: CARD_WIDTH, height: CARD_HEIGHT },
    })

    // Resolve output path
    const absOutput = path.resolve(outputPath)
    fs.mkdirSync(path.dirname(absOutput), { recursive: true })

    // Resize with sharp to ensure exact dimensions (handles 2x deviceScaleFactor)
    await sharp(screenshot as Buffer)
      .resize(CARD_WIDTH, CARD_HEIGHT, { fit: 'cover' })
      .png({ quality: 95 })
      .toFile(absOutput)

    return absOutput
  } finally {
    await browser.close()
  }
}
