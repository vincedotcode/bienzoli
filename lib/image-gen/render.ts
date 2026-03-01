/**
 * lib/image-gen/render.ts
 * bienzoli Marketing Engine — HTML-to-PNG social card renderer
 *
 * Uses puppeteer (headless Chrome) to render an HTML template to PNG,
 * then sharp to crop/resize to exact dimensions.
 *
 * Usage (from TypeScript):
 *   import { renderCard } from '@/lib/image-gen/render'
 *   await renderCard('PortfolioCard', { clientName: 'Nickel Sew', ... }, 'output.png')
 *   await renderCard('PortfolioCard', { ... }, 'output.png', 'instagram')
 */

import puppeteer from 'puppeteer'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = path.resolve(__dirname, '../../content/social/templates')

// ─── Size Presets ─────────────────────────────────────────────────────────────

export type SizePreset = 'facebook' | 'instagram' | 'story'

export const SIZE_PRESETS: Record<SizePreset, { width: number; height: number }> = {
  facebook:  { width: 1200, height: 630 },   // 1.91:1 — Facebook feed, LinkedIn
  instagram: { width: 1080, height: 1080 },  // 1:1    — Instagram, Facebook square
  story:     { width: 1080, height: 1920 },  // 9:16   — Stories, Reels, TikTok
}

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
  | 'CallToActionCard'
  | 'EducationCard'

export type CardData = Record<string, string | number | boolean>

// ─── Renderer ────────────────────────────────────────────────────────────────

/**
 * Renders an HTML template with injected data to a PNG file.
 *
 * @param template   Name of the template (matches filename in content/social/templates/)
 * @param data       Key-value pairs injected into the template via {{key}} placeholders
 * @param outputPath Absolute or relative path for the output PNG
 * @param size       Output size preset (default: 'instagram' = 1080×1080)
 */
export async function renderCard(
  template: CardTemplate,
  data: CardData,
  outputPath: string,
  size: SizePreset = 'instagram'
): Promise<string> {
  const templatePath = path.join(TEMPLATES_DIR, `${template}.html`)

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`)
  }

  const { width, height } = SIZE_PRESETS[size]

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
    await page.setViewport({ width, height, deviceScaleFactor: 2 })
    await page.setContent(html, { waitUntil: 'networkidle0' })

    // Wait for Google Fonts to load
    await page.evaluate(() => document.fonts.ready)

    // Capture screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width, height },
    })

    // Resolve output path
    const absOutput = path.resolve(outputPath)
    fs.mkdirSync(path.dirname(absOutput), { recursive: true })

    // Resize with sharp to ensure exact dimensions
    await sharp(screenshot as Buffer)
      .resize(width, height, { fit: 'cover' })
      .png({ quality: 95 })
      .toFile(absOutput)

    return absOutput
  } finally {
    await browser.close()
  }
}
