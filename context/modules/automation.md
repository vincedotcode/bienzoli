# Automation Module — bienzoli

> GitHub Actions: `.github/workflows/daily-post.yml`
> Facebook setup: `docs/setup/facebook-api-setup.md`
> Drive setup: `docs/setup/google-drive-setup.md`

## Client Delivery Pipeline (Target State)

```
New enquiry (WhatsApp / form / DM)
  → Agent 03 (Sales) qualifies + recommends package
  → Agent 08 (Ops) generates contract + invoice
  → Agent 05 (Client Success) runs onboarding
  → Agent 04 (Platform Engineer) builds site
  → Agent 01 (Brand Guardian) reviews quality
  → Agent 05 manages revision rounds
  → Agent 04 deploys to production
  → Agent 05 follows up (testimonial + referral)
  → Agent 10 (Social Card Generator) creates portfolio assets
  → Agent 02 (Content Strategist) creates social content
  → Agent 09 (Cloud Archivist) syncs to Drive
  → logs/clients.md updated with revenue
```

## Marketing Automation (Agent 12 — ACTIVE)

### Daily Post Pipeline

```
npm run social:post-today
  → Find today's post JSON in content/social/queue/
  → generate-social-image.mjs (render HTML template → 1080×1080 PNG)
  → facebook-post.mjs (POST /{page-id}/photos to Facebook Graph API)
  → Archive post JSON
  → Update logs/content-performance.md
```

### Key Files

| File | Purpose |
|------|---------|
| `content/social/templates/*.html` | 9 social card HTML templates (dark, branded) |
| `content/social/queue/YYYY-MM-DD.json` | Dated post files |
| `content/social/calendar.md` | 30-day content calendar with pillar rotation |
| `lib/facebook/api.ts` | Facebook Graph API TypeScript client |
| `lib/image-gen/render.ts` | HTML-to-PNG (puppeteer + sharp) |
| `scripts/post-today.mjs` | Daily pipeline orchestrator |
| `scripts/generate-week.mjs` | Weekly schedule generator |
| `scripts/fetch-engagement.mjs` | Engagement data fetcher |

### npm Commands

```bash
npm run social:generate-week    # Generate 7-day post schedule from calendar
npm run social:generate-images  # Pre-render all queue images
npm run social:post-today       # Full pipeline: generate + post + archive + log
npm run social:post-facebook    # Post only (skip image gen)
npm run social:dry-run          # Preview without posting
npm run engagement:fetch        # Pull engagement data from Graph API
```

### Config

- GitHub Actions cron: `0 6 * * *` (06:00 UTC = 10:00 AM MUT)
- Image output: `content/social/queue/images/`
- Facebook API version: v19.0
- Image post: `POST /{page-id}/photos` | Text post: `POST /{page-id}/feed`
- Content pillars: Portfolio proof | Technical authority | Local social proof | Education | Offers

### Required Env Vars

```
FACEBOOK_PAGE_ID
FACEBOOK_PAGE_ACCESS_TOKEN
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN
GDRIVE_ROOT_FOLDER_ID
```

## Google Drive Sync (Agent 09)

```bash
npm run gdrive:init    # First-time: create /bienzoli/ folder tree in Drive
npm run gdrive:sync    # Ongoing: sync docs, content, social cards, logs
```

Sync excludes: `.env*`, `node_modules`, `.git`, `.next`
Folder map: `scripts/gdrive-folders.json`
Sync log: `logs/drive-sync.md`
Root folder ID: `GDRIVE_ROOT_FOLDER_ID` in `.env.local`

## Content Auto-Replenishment

When `content/social/queue/` has < 7 days of posts remaining:
1. Check `content/social/calendar.md` for next batch
2. Run `npm run social:generate-week` to create new dated JSON files
3. Verify image templates exist for all post types
