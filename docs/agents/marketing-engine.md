# Agent 12 — Marketing Engine

## Role
Automated daily social media content pipeline. Generates branded social card images, posts to Facebook at 10:00 AM MUT, tracks engagement, and maintains the 30-day content calendar.

## Trigger Words
marketing, post, schedule, facebook, auto-post, content calendar, social media, campaign, image gen

## Status
Active — requires Facebook credentials to post (see setup below).

---

## Architecture

```
Content Calendar
  └── content/social/calendar.md          ← 30-day pillar rotation plan

Pre-written Posts
  └── content/social/queue/week*-day*.json ← Drafts with caption + templateData

Daily Pipeline (10 AM MUT via GitHub Actions)
  └── scripts/post-today.mjs
        ├── scripts/generate-social-image.mjs
        │     ├── content/social/templates/*.html  (9 templates)
        │     ├── puppeteer (headless Chrome)
        │     └── sharp (PNG resize/compress)
        └── scripts/facebook-post.mjs
              └── Facebook Graph API v19.0

Archive + Logging
  └── content/social/archive/YYYY-MM-DD.json
  └── logs/content-performance.md

Performance Tracking
  └── scripts/fetch-engagement.mjs
```

---

## Setup

1. Follow `docs/setup/facebook-api-setup.md` to get a permanent Page Access Token
2. Add to `.env.local`:
   ```
   FACEBOOK_PAGE_ID=your_page_id
   FACEBOOK_PAGE_ACCESS_TOKEN=your_permanent_token
   ```
3. Add same values to GitHub Secrets (`Settings → Secrets → Actions`)
4. Install dependencies: `npm install puppeteer sharp form-data --legacy-peer-deps`
5. Test locally: `npm run social:dry-run`
6. Generate first week: `npm run social:generate-week`
7. GitHub Actions activates automatically on schedule

---

## npm Scripts

| Script | Action |
|---|---|
| `npm run social:generate-week` | Generate 7 dated post files for next week |
| `npm run social:generate-images` | Render PNG for today's post |
| `npm run social:post-today` | Full pipeline: image → post → archive |
| `npm run social:post-facebook` | Post only (skip image gen) |
| `npm run social:dry-run` | Preview without posting |
| `npm run engagement:fetch` | Fetch likes/reach from Graph API |

---

## Content Pillars

| Pillar | Frequency | Templates Used |
|---|---|---|
| portfolio-proof | 2×/week | PortfolioCard, TestimonialCard, BeforeAfterCard |
| technical-authority | 2×/week | SpeedTestCard, BuildProcessCard, TipCard |
| local-social-proof | 1×/week | LocalEngagementCard |
| education | 1×/week | EducationCard, TipCard |
| offer | 1×/week | PricingCard, CallToActionCard, StatCard |

---

## Social Card Templates (9)

| Template | Use case |
|---|---|
| `PortfolioCard` | Client delivery — project name, URL, metrics |
| `TipCard` | Dev tip with optional code snippet |
| `BuildProcessCard` | 4-step timeline visualization |
| `TestimonialCard` | Client quote + star rating |
| `LocalEngagementCard` | Kreol/Mauritian content, local features |
| `PricingCard` | Package comparison (3 tiers) |
| `SpeedTestCard` | Speed comparison vs. WordPress |
| `StatCard` | Big stat + 3 mini stats |
| `BeforeAfterCard` | Before/after metrics split view |
| `EducationCard` | Q&A / did-you-know format |
| `CallToActionCard` | Offer/CTA with grid background |

---

## Adding New Posts

1. Create a new JSON in `content/social/queue/`:
```json
{
  "date": "2026-03-10",
  "pillar": "portfolio-proof",
  "template": "PortfolioCard",
  "caption": "Your caption here...\n\n#hashtags",
  "templateData": {
    "clientName": "Client Name",
    "projectType": "Business Website",
    "projectUrl": "example.com",
    "deliveryTime": "3 days",
    "packageName": "Port Louis",
    "pageSpeedScore": "96"
  },
  "imagePath": null
}
```
2. `imagePath` is auto-filled when `generate-social-image.mjs` runs.
3. The cron picks up the file automatically on the matching date.

---

## Content Calendar Extension

When fewer than 7 posts remain in queue:
```bash
node scripts/generate-week.mjs --week 3
```

Add new post drafts to `CONTENT_LIBRARY` in `generate-week.mjs` before new weeks run out.

---

## Performance Tracking

After posts go live (24h+):
```bash
npm run engagement:fetch
```

Updates `logs/content-performance.md` with real likes, reach, comments, shares from the Graph API.

---

*Agent 12 — Marketing Engine | bienzoli Agency System*
*Activated: 2026-02-27*
