# Skill: Portfolio Case Study

**Owner:** AGENT 02 — Content Strategist + AGENT 10 — Social Card Generator
**Trigger:** Project delivered, payment received, client satisfaction confirmed
**Purpose:** Turn every delivered project into published proof — case study file, social card set, portfolio entry, and content pipeline. Repeatable process that runs after every successful delivery.

---

## Phase 0 — Prerequisites

Before starting a case study, verify:
- [ ] Project delivered and live on production domain
- [ ] Client has reviewed and is satisfied (no outstanding revision disputes)
- [ ] Full payment received (check `logs/clients.md`)
- [ ] Delivery phase complete in `docs/clients/[name]/status.md`

---

## Phase 1 — SCREENSHOT

Capture three visual assets of the live site:

**Desktop Screenshot (1440px wide):**
- Full-page scroll screenshot of the homepage
- Tool: Browser devtools → full-page screenshot, or use a service like screenshotone.com
- Save as: `[client-name]-desktop-full.png`

**Desktop Hero Screenshot (1440×900px):**
- Above-the-fold view — this is the card image for portfolio and OG
- Save as: `[client-name]-desktop-hero.png`

**Mobile Screenshot (390×844px — iPhone 14 size):**
- Full-page scroll screenshot at mobile size
- Save as: `[client-name]-mobile-full.png`

Save all screenshots to: `design/exports/social-cards/[client-name]/screenshots/`

---

## Phase 2 — METRICS

Run PageSpeed Insights on the live production URL (not the preview):
- URL: `https://pagespeed.web.dev/`
- Test: both mobile and desktop
- Record: overall scores, Core Web Vitals (LCP, CLS, FID/INP)
- Screenshot: both results pages
- Save as: `[client-name]-pagespeed-mobile.png`, `[client-name]-pagespeed-desktop.png`

**Minimum standards for publishing:**
- Mobile ≥ 90, Desktop ≥ 90 — if below this, fix the site before publishing the case study

Save PageSpeed screenshots to: `design/exports/social-cards/[client-name]/metrics/`

---

## Phase 3 — WRITE

Create or update `content/case-studies/[client-name].md` with this structure:

```markdown
# Case Study — [Client Name]

**Published:** [Date]
**Live URL:** [URL]

## Client
- **Business:** [Business name]
- **Industry:** [Industry]
- **Location:** [Location, Mauritius / or international]
- **Package:** [Flic en Flac / Port Louis / Grand Baie / Le Morne]

## Challenge
[2–3 sentences: What situation was the client in before the project?
What was missing or broken about their digital presence?
What goal were they trying to achieve?]

## Solution
[2–4 sentences: What did bienzoli build?
What key decisions were made in the design/functionality?
Why was this the right approach for this client?]

## Features Built
- [Feature 1]
- [Feature 2]
- [Feature 3]
(5–8 bullet points maximum — concrete features, not vague statements)

## Results
- **PageSpeed (Mobile):** [Score] / 100
- **PageSpeed (Desktop):** [Score] / 100
- [Any business outcome stated by client: e.g., "client reports 3x more WhatsApp enquiries"]
- [Any measurable improvement: e.g., "0.02 CLS vs competitor site at 0.38"]

## Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Deployment: Vercel
- [Any additional: Framer Motion, Anthropic API, Clerk, Neon DB, etc.]

## Testimonial (if collected)
> "[Client quote]"
> — [Client name], [Business name]
```

**Writing standards:**
- Challenge section: describe the real problem, not just "they needed a website"
- Solution section: explain the thinking, not just list features
- Results section: concrete and honest — if no business outcome data yet, just include PageSpeed scores
- Never fabricate or exaggerate results

---

## Phase 4 — SOCIAL CARDS

Trigger Social Card Generator (Agent 10) with:
- Client name, industry, URL
- Hero screenshot path
- Package tier
- Top 2–3 feature callouts (from case study features list)
- Key metric (PageSpeed mobile score is always included)

Requested outputs:
- 1:1 (1080×1080px) — Instagram feed card
- 16:9 (1200×630px) — LinkedIn post + OG image
- 9:16 (1080×1920px) — Stories/TikTok

Save to: `design/exports/social-cards/[client-name]/`

---

## Phase 5 — CONTENT PIPELINE

Trigger Content Strategist (Agent 02) with the completed case study. Request:

1. **Instagram carousel** (5–8 slides, based on case study):
   - Slide 1: Hook ("We built a [industry] website that scores 95 on PageSpeed")
   - Slides 2–4: Key features or before/after context
   - Slide 5: PageSpeed comparison
   - Slide 6: Client quote (if available)
   - Slide 7: CTA ("Link in bio → bienzoli.com")

2. **TikTok script** (15–30 seconds):
   - Hook: "Watch me build a [industry] website in [delivery time]"
   - Show: hero section, one key feature, PageSpeed reveal
   - CTA: bienzoli.com

3. **LinkedIn post** (founder perspective):
   - Brief project story
   - Key technical decision or interesting problem solved
   - PageSpeed score as proof point
   - End with: what would you do if your business had this?

---

## Phase 6 — PUBLISH

**6.1 bienzoli.com Portfolio**
Add the project to the portfolio/projects section of bienzoli.com:
- Client name + industry label
- Hero screenshot
- Brief description (1–2 sentences)
- Live URL link
- Key feature tags
- PageSpeed score badge

**6.2 Google Business Profile**
Post the case study as a Google Business update (photo + caption) on bienzoli's Google Business Profile.

**6.3 Social Media**
Confirm with Content Strategist that cards and captions are queued for posting.

---

## Phase 7 — ARCHIVE

1. **Drive sync:** Trigger Agent 09 (Cloud Archivist) to sync:
   - `content/case-studies/[name].md` → Drive `/case-studies/`
   - `design/exports/social-cards/[name]/` → Drive `/social-cards/[name]/`
   - `design/exports/social-cards/[name]/screenshots/` → Drive as well

2. **Status update:** In `docs/clients/[name]/status.md`, add case study completion date.

3. **clients.md update:** In `logs/clients.md`, mark "Case Study: Yes" for this project entry.

---

## Exit Criteria

Case study is fully complete when:
- [ ] `content/case-studies/[name].md` exists with complete content
- [ ] Screenshots captured (desktop + mobile)
- [ ] PageSpeed scores recorded (≥90 both)
- [ ] Social card set requested from Agent 10
- [ ] Content pipeline requested from Agent 02
- [ ] Portfolio entry on bienzoli.com updated
- [ ] Drive sync triggered
- [ ] clients.md updated

**Time target:** The full process (phases 1–7) should take no more than 2–3 hours per project.
