/**
 * scripts/take-portfolio-screenshots.mjs
 * bienzoli — Portfolio Screenshot Capture
 *
 * Takes desktop + mobile screenshots of live client sites for use in the
 * portfolio section of bienzoli.com.
 *
 * Usage:
 *   node scripts/take-portfolio-screenshots.mjs
 *   node scripts/take-portfolio-screenshots.mjs --slug nickelsew   # one site only
 *
 * Output:
 *   public/portfolio/{slug}-desktop.png  (served by Next.js)
 *   design/exports/portfolio/{slug}-desktop.png  (canonical design archive)
 *   public/portfolio/{slug}-mobile.png
 *   design/exports/portfolio/{slug}-mobile.png
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const PUBLIC_PORTFOLIO  = path.join(ROOT, 'public', 'portfolio')
const DESIGN_PORTFOLIO  = path.join(ROOT, 'design', 'exports', 'portfolio')

const SITES = [
  { slug: 'frisco',     url: 'https://friscocreamery.org' },
  { slug: 'nickelsew',  url: 'https://nickelsew.com' },
  { slug: 'ziyaad',     url: 'https://ziyaadbeneydatoula.com' },
  { slug: 'keygo',      url: 'https://keygomu.vercel.app' },
  { slug: 'dsnails',    url: 'https://dsnail.vercel.app' },
]

const VIEWPORTS = {
  desktop: { width: 1280, height: 900,  deviceScaleFactor: 2, isMobile: false },
  mobile:  { width: 390,  height: 844,  deviceScaleFactor: 3, isMobile: true  },
}

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`)
}

function getArg(args, flag) {
  const idx = args.indexOf(flag)
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--')) return args[idx + 1]
  const withEq = args.find(a => a.startsWith(`${flag}=`))
  if (withEq) return withEq.split('=').slice(1).join('=')
  return null
}

async function saveToDir(buffer, dir, filename) {
  fs.mkdirSync(dir, { recursive: true })
  const outPath = path.join(dir, filename)
  await sharp(buffer).png({ quality: 95, compressionLevel: 8 }).toFile(outPath)
  return outPath
}

async function screenshot(page, site, viewportName) {
  const vp = VIEWPORTS[viewportName]
  await page.setViewport(vp)
  await page.goto(site.url, { waitUntil: 'networkidle0', timeout: 45000 })
  await page.evaluate(() => document.fonts.ready)

  const filename = `${site.slug}-${viewportName}.png`

  const buffer = await page.screenshot({
    type: 'png',
    clip: { x: 0, y: 0, width: vp.width, height: vp.height },
  })

  const [publicPath] = await Promise.all([
    saveToDir(buffer, PUBLIC_PORTFOLIO, filename),
    saveToDir(buffer, DESIGN_PORTFOLIO, filename),
  ])

  return publicPath
}

async function main() {
  const args = process.argv.slice(2)
  const slugFilter = getArg(args, '--slug')

  const sites = slugFilter
    ? SITES.filter(s => s.slug === slugFilter)
    : SITES

  if (sites.length === 0) {
    console.error(`No site found for slug: ${slugFilter}`)
    console.error(`Available: ${SITES.map(s => s.slug).join(', ')}`)
    process.exit(1)
  }

  log(`Taking screenshots for: ${sites.map(s => s.slug).join(', ')}`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  try {
    for (const site of sites) {
      log(`\n→ ${site.slug} (${site.url})`)
      const page = await browser.newPage()

      try {
        for (const viewportName of ['desktop', 'mobile']) {
          try {
            const outPath = await screenshot(page, site, viewportName)
            log(`  ✓ ${viewportName}: ${path.relative(ROOT, outPath)}`)
          } catch (err) {
            log(`  ✗ ${viewportName}: ${err.message}`)
          }
        }
      } finally {
        await page.close()
      }
    }
  } finally {
    await browser.close()
  }

  log('\nDone. Screenshots saved to public/portfolio/ and design/exports/portfolio/')
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
