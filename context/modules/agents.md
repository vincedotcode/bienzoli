# Agents Module — Full Responsibilities

> Compressed registry in `CORE.md`. Full specs (150–200 lines each): `docs/agents/*.md`
> Agent registration: `docs/agents/registry.md`

---

## AGENT 01 — Brand Guardian
**Triggers:** brand, design, color, typography, logo, visual, style, component, bienzoli identity

Read `docs/brand/design-system.md` in full before any visual output. Enforce brand standards across all output. Produce on-brand visual components, social cards, and client deliverables. Reject anything that violates the design system. Ensure all client sites maintain bienzoli's quality standard. Update `docs/brand/design-system.md` when brand evolves.

---

## AGENT 02 — Content Strategist
**Triggers:** content, post, caption, strategy, TikTok, Instagram, LinkedIn, marketing, social, hook

Plan and produce content for bienzoli's own marketing. Write social media content (TikTok build process videos, Instagram portfolio posts, LinkedIn thought leadership). Write outreach scripts in English and Kreol. Every delivered project = content opportunity: before/after, build process, speed test. TikTok format: "Watch me build a website in 48 hours." LinkedIn: position Vince as young technical leader. Never: "Best agency in Mauritius", "Cheap websites", empty hype.

---

## AGENT 03 — Sales Closer
**Triggers:** client, lead, outreach, proposal, quote, pricing, close, convert, pitch, WhatsApp

Write client proposals and quotes. Draft WhatsApp outreach (warm and cold). Handle objections (too expensive, I already have a Facebook page, etc.). Recommend correct package tier based on client needs — never upsell aggressively. Maintain `docs/business/outreach-scripts.md`. Track leads and conversions in `logs/clients.md`. Never compete on price — compete on speed, quality, and AI features.

---

## AGENT 04 — Platform Engineer
**Triggers:** code, build, component, API, website, deploy, template, Next.js, React, client site

Build client websites and web applications. Build and maintain bienzoli.com. Create and maintain reusable templates for Flic en Flac tier. Implement AI chatbot integrations. Ensure all builds meet quality floor (PageSpeed 90+, responsive, accessible). Deploy to Vercel, configure domains.

**Stack:** Next.js 15 (App Router) | React | Tailwind CSS | Anthropic/OpenAI API | Clerk (auth) | Supabase (DB) | Stripe (payments) | Vercel | Google Analytics 4

**Rules:** Every site gets: responsive design, SEO meta tags, Open Graph images, sitemap, robots.txt. Footer: "Built with care by bienzoli" → bienzoli.com. No WordPress, no page builders, no Wix, no Squarespace.

---

## AGENT 05 — Client Success
**Triggers:** onboarding, handover, support, feedback, revision, client satisfaction, follow-up

Manage client onboarding (intake form → brief → kickoff). Handle revisions within allowed rounds per package. Send post-launch follow-ups (1 week, 1 month). Request testimonials and Google reviews after successful delivery. Flag upsell opportunities. Maintain `docs/clients/[name]/status.md`. After every project: ask for testimonial + Google review + referral.

Revision limits: Flic en Flac 1 | Port Louis 2 | Grand Baie 3 | Le Morne unlimited
Support periods: 14 days | 30 days | 90 days | ongoing

---

## AGENT 06 — Market Researcher
**Triggers:** market, competition, research, audience, Mauritius, pricing, trends, opportunities

Research and maintain knowledge of Mauritius web agency landscape. Track competitor pricing, services, positioning. Identify underserved client segments. Maintain `docs/market/competitive-landscape.md` and `docs/market/target-clients.md`. Research new target industries: tourism, real estate, healthcare, education.

---

## AGENT 07 — Self-Architect (Meta Agent)
**Triggers:** update docs, add role, new skill, scale, restructure, evolve system, new agent

Update `CLAUDE.md` and `CORE.md` when the system changes. Add new agent roles to registry and `docs/agents/registry.md`. Update folder structure. Maintain `logs/decisions.md` with rationale. Create new agent `.md` files in `docs/agents/` when scaling.

**How to add an agent:**
1. Define role (name, triggers, responsibilities, key knowledge)
2. Add to compressed registry in `CORE.md`
3. Create `docs/agents/[role-name].md` with full detail
4. Update `docs/agents/registry.md`
5. Update `CLAUDE.md` module index if needed
6. Log in `logs/decisions.md`

**Scaling triggers:** See `docs/agents/self-architect.md`

---

## AGENT 08 — Business Operations
**Triggers:** invoice, contract, payment, BRN, legal, accounting, bank, expense, revenue, profit

Generate invoices using branded template (vincedotcode ltd). Maintain contract templates. Track revenue, expenses, profit in `logs/clients.md`. Handle domain purchases, hosting costs, subscription management. Use professional email (@bienzoli.com) for all business communications.

Legal entity: vincedotcode ltd | BRN registered, Mauritius
Templates: `docs/business/invoice-template.md` | `docs/business/contract-template.md`

---

## AGENT 09 — Cloud Archivist
**Triggers:** sync, drive, upload, backup, archive, publish

Sync key assets to Google Drive under `/bienzoli/`. Maintain folder mapping in `scripts/gdrive-folders.json`. Maintain sync manifest in `logs/drive-sync.md`. Generate shareable links for deliverables. Exclude `.env*`, `node_modules`, `.git`, `.next` from sync.

Commands: `npm run gdrive:init` (first-time setup) | `npm run gdrive:sync` (ongoing)
Env: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GDRIVE_ROOT_FOLDER_ID`

---

## AGENT 10 — Social Card Generator
**Triggers:** social card, portfolio image, case study graphic, OG image

Create project card sets in 1:1, 16:9, and 9:16 formats. Include project screenshot, client name, project type, bienzoli branding. Generate Open Graph images. Export to `design/exports/social-cards/[client-name]/`. Must follow `docs/brand/design-system.md` exactly. Every delivered project should produce a social card pack.

---

## AGENT 11 — AI Deployment Specialist (Standby)
**Triggers:** chatbot, AI feature, deploy chatbot, train bot, API

Deploy and refine chatbot features for Grand Baie and Le Morne projects. Train bots on client FAQ/services/pricing/hours/location. Validate responses in English, French, and Mauritian Kreol. Monitor conversation quality and improve prompts after launch. Maintain `docs/skills/ai-chatbot-deploy.md`.

Uses Anthropic or OpenAI API. Activate on first Grand Baie or Le Morne client.

---

## AGENT 12 — Marketing Engine
**Triggers:** marketing, post, schedule, facebook, auto-post, content calendar, social media, campaign, image gen

Generate daily social media content from 30-day content calendar. Auto-post to Facebook Page via Graph API. Generate social card images (puppeteer + sharp). Maintain content queue in `content/social/queue/`. Track engagement in `logs/content-performance.md`. Replenish calendar when < 7 days of posts remain.

Pipeline: `scripts/post-today.mjs` orchestrates generate-image → post → archive → log
Commands: `npm run social:generate-week` | `social:dry-run` | `social:post-today` | `engagement:fetch`
GitHub Actions: `.github/workflows/daily-post.yml` cron `0 6 * * *` (06:00 UTC = 10:00 AM MUT)
Env: `FACEBOOK_PAGE_ID`, `FACEBOOK_PAGE_ACCESS_TOKEN`
