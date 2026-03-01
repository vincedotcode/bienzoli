# bienzoli Decision Log

This file records architectural and business decisions with rationale.
One entry per decision. Most recent at top.

---

## 2026-03-01 — VOX-STYLE HOOK VIDEO (REMOTION)

**What changed:** Built a complete 15-second Vox-style kinetic typography video in Remotion for TikTok and Facebook Reels. Registered Agent 13 — Video Director.

**Why:** bienzoli needs social video content that demonstrates speed, credibility, and local relevance. A Vox-style kinetic typography format is high-impact, works without a presenter or camera, and can be produced programmatically — making it repeatable for future campaigns.

**Technical decisions:**
- Separate `remotion.vox.config.ts` at project root (not modifying the tiktok-intro config)
- `@remotion/sfx` `whoosh` (string constant, not function) for zero-file scene transition audio
- 6 scenes in 450 frames: Hook → Stat → Problem → Proof → Offer → CTA
- MotionGrid component for ambient dot background (infinite scroll via `frame % spacing`)
- Spring presets: SLAM / SMOOTH / SNAPPY / BOUNCY / BAR — defined in `utils/springs.ts`
- All colours from design system tokens — no hardcoded hex
- TikTok safe zones respected (top 120px, bottom 200px)

**Files created:**
- `content/videos/vox-hook/src/Root.tsx`
- `content/videos/vox-hook/src/VoxHook.tsx`
- `content/videos/vox-hook/src/utils/theme.ts`
- `content/videos/vox-hook/src/utils/springs.ts`
- `content/videos/vox-hook/src/components/KineticText.tsx`
- `content/videos/vox-hook/src/components/Highlighter.tsx`
- `content/videos/vox-hook/src/components/StatCounter.tsx`
- `content/videos/vox-hook/src/components/ComparisonBar.tsx`
- `content/videos/vox-hook/src/components/MotionGrid.tsx`
- `content/videos/vox-hook/src/components/SoundDesign.tsx`
- `content/videos/vox-hook/src/scenes/Scene1-Hook.tsx` through `Scene6-CTA.tsx`
- `remotion.vox.config.ts`

**npm scripts added:**
- `video:vox:dev` — Remotion Studio preview
- `video:vox:render` — render to `out/vox-hook.mp4`

**Packages installed:** `@remotion/sfx`, `@remotion/transitions`, `@remotion/media-utils`

---

## 2026-02-28 — PACKAGE SIMPLIFICATION & WEBSITE UPDATE

**What changed:** Simplified all packages to remove AI, CRM, and business email as standard features. Added two maintenance plans. Updated bienzoli.com with 4-tier pricing, real portfolio screenshots, maintenance section, and cleaned-up page structure.

**Why:** Cleaner positioning. Standard packages should not overpromise. AI, CRM, and automation are custom add-ons scoped per project. Maintenance plans create recurring revenue without overcomplicating the base offer. The site was showing old prices (Rs 15k / 25k) and CRM as a standard product — neither reflects the actual offer.

**Pricing changes:**
- FLIC EN FLAC: Rs 8,000 (was absent from site)
- PORT LOUIS: Rs 18,000 (was Rs 15,000)
- GRAND BAIE: Rs 35,000 (was Rs 25,000), Most Popular
- LE MORNE: Rs 60,000+ custom quote (unchanged)
- NEW: Essential maintenance Rs 1,500/mo | Growth maintenance Rs 3,000/mo

**Removed from standard packages:** AI chatbot, CRM system, business email hosting, lead management dashboard. These are now described as custom add-on work ("We build those too — let's talk.").

**Website sections changed:**
- Removed: AISection, ProductPreview, Testimonials (commented out), ProjectsShowcase (DB-driven)
- Added: PortfolioSection (static, real screenshots), MaintenanceSection
- New page order: Hero → Features → HowItWorks → Portfolio → Pricing → Maintenance → FAQ → CTA → Footer

**Portfolio screenshots:** Took real desktop + mobile screenshots of all 4 live client sites using puppeteer. Saved to `public/portfolio/` (8 PNGs). Script: `scripts/take-portfolio-screenshots.mjs`.

**Footer updated:** Added vincedotcode ltd, WhatsApp link, Kreol tagline "Mo build website ki fer bizness grandi. 🇲🇺".

**Files created:** `components/portfolio-section.tsx`, `components/maintenance-section.tsx`, `scripts/take-portfolio-screenshots.mjs`, `public/portfolio/*.png` (8 files), `design/exports/portfolio/*.png` (8 files)

**Files updated:** `components/pricing.tsx` (full rewrite), `components/footer.tsx`, `app/page.tsx`, `context/modules/packages.md`, `logs/decisions.md`

**Decision maker:** AGENT 04 — Platform Engineer + AGENT 01 — Brand Guardian + AGENT 03 — Sales Closer
**Session:** 2026-02-28

---

## 2026-02-28 — MARKETING LAUNCH SPRINT (Complete Infrastructure Build)

**What changed:** Built the complete bienzoli Facebook marketing infrastructure — scripts, TypeScript templates, 14 days of content, audit tool, and outreach expansion. Upgraded Facebook API to v21.0.

**Why:** Phase B of the roadmap requires active content marketing. This sprint makes the daily post pipeline fully operational from day one — no manual effort needed to post, generate images, or track performance.

**What was built:**

*Scripts upgraded:*
- `scripts/facebook-post.mjs` — Added `--today`, `--folder <path>` modes; `parseFrontmatter()` for YAML frontmatter; `archiveFolderPost()`; upgraded to Graph API v21.0
- `scripts/generate-social-image.mjs` — Added direct CLI mode (`--template`, `--data`, `--size`, `--out`); backward-compatible queue mode retained; `TEMPLATE_ALIASES` map; `SIZE_PRESETS`
- `lib/facebook/api.ts` — v19.0 → v21.0
- `lib/image-gen/render.ts` — Added `SizePreset` type; `SIZE_PRESETS` (facebook 1200×630, instagram 1080×1080, story 1080×1920); optional size param on `renderCard()`

*TypeScript templates (new — `content/social/templates/`):*
- 9 typed template files: `portfolio-card.ts`, `tip-card.ts`, `build-process-card.ts`, `testimonial-card.ts`, `local-card.ts`, `pricing-card.ts`, `speed-test-card.ts`, `stat-card.ts`, `before-after-card.ts`
- `index.ts` — unified re-export of all functions + interfaces
- Each exports a typed interface + function returning a complete standalone HTML string

*14-day content queue (new — `content/social/queue/`):*
- `2026-03-02.json` — Nickel Sew portfolio (PortfolioCard)
- `2026-03-03.json` — "Your Instagram is not a website" tip (TipCard)
- `2026-03-04.json` — 48-hour build process (BuildProcessCard)
- `2026-03-05.json` — KeyGo portfolio (PortfolioCard)
- `2026-03-06.json` — "Speed = Revenue" tip (TipCard)
- `2026-03-07.json` — "40+ Projects" stat (StatCard)
- `2026-03-08.json` — Kreol local engagement (LocalEngagementCard)
- `2026-03-09.json` — Ziyaad portfolio (PortfolioCard)
- `2026-03-10.json` — AI chatbot tip (TipCard)
- `2026-03-11.json` — Next.js vs WordPress speed test (SpeedTestCard)
- `2026-03-12.json` — DS Nails portfolio (PortfolioCard)
- `2026-03-13.json` — "85% browse on mobile" tip (TipCard)
- `2026-03-14.json` — "48 Hours" delivery stat (StatCard)
- `2026-03-15.json` — Kreol Google search engagement (LocalEngagementCard)

*New business documents:*
- `docs/business/website-audit-template.md` — Full lead-conversion audit checklist (speed, mobile, SEO, conversion, WhatsApp delivery script, package recommendation)
- `docs/business/outreach-scripts.md` — Expanded with: Facebook DM template (EN + Kreol), free audit offer hook (EN + Kreol), full objection handling for 6 scenarios ("cousin can do it" added), Kreol testimonial request

*Logs expanded:*
- `logs/content-performance.md` — Added content type averages table, pillar performance table, top posts tracker, weekly insights, benchmark targets

*Modules updated:*
- `context/modules/automation.md` — Updated to v21.0, added TypeScript templates reference, folder-based post format, size presets, CLI image gen command

**Key architecture decisions:**
- TypeScript templates (`.ts`) export typed functions for use from TypeScript code. ESM scripts (`.mjs`) continue using `.html` files — they cannot import `.ts` directly. Both interfaces maintained.
- Folder-based post format (`[date]-[type]-[slug]/`) enables rich posts with custom images without modifying the JSON queue system.
- Graph API moved to v21.0 — keep this updated before token refresh (Facebook deprecates older versions periodically).

**Pending activation:** Add `FACEBOOK_PAGE_ID` and `FACEBOOK_PAGE_ACCESS_TOKEN` to `.env.local`, then to GitHub Secrets → cron activates automatically.

**Files created:** 9 TS templates, `index.ts`, 14 queue JSONs, `docs/business/website-audit-template.md`
**Files updated:** `scripts/facebook-post.mjs`, `scripts/generate-social-image.mjs`, `lib/facebook/api.ts`, `lib/image-gen/render.ts`, `docs/business/outreach-scripts.md`, `logs/content-performance.md`, `context/modules/automation.md`, `logs/decisions.md`

**Decision maker:** AGENT 12 — Marketing Engine + AGENT 02 — Content Strategist + AGENT 07 — Self-Architect
**Session:** 2026-02-28

---

## 2026-02-28 — CONTEXT SYSTEM REFACTOR (Modular v2)

**What changed:** Refactored the monolithic `CLAUDE.md` (~600 lines, ~5,000+ tokens) into a modular, token-efficient context architecture.

**Why:** The original CLAUDE.md was loaded in full every session regardless of task. A brand design session was loading the full folder tree, competitor landscape, Remotion video spec, and sales scripts — context it didn't need. The modular system loads only what the task requires.

**Architecture:**
- `CORE.md` — always-loaded minimal context (~700 tokens): identity, quality floor, tone, compressed agent registry, session protocol, context router
- `context/modules/*.md` — 10 topic modules, loaded only when relevant
- `context/working-set.md` — tiny rolling state (current task, open items)
- `CLAUDE.md` — rewritten as short pointer/routing file

**Estimated token saving:** Old CLAUDE.md ~5,000+ tokens every session. New: ~700 (CORE) + ~500–800 per module. Typical session: 1,200–1,800 tokens = **60–75% reduction**.

**Content preserved:** All content from original CLAUDE.md relocated into module files — nothing deleted. Full agent responsibilities, service package tables, folder tree, roadmap, automation pipeline, market notes, ops details, sales scripts, and Remotion video spec all preserved in appropriate modules.

**Files created:** `CORE.md`, `context/working-set.md`, `context/modules/brand.md`, `context/modules/packages.md`, `context/modules/agents.md`, `context/modules/folder-structure.md`, `context/modules/roadmap.md`, `context/modules/automation.md`, `context/modules/market.md`, `context/modules/ops.md`, `context/modules/sales.md`, `context/modules/content.md`

**Files updated:** `CLAUDE.md` (rewritten as pointer file), `logs/decisions.md`

**Decision maker:** AGENT 07 — Self-Architect
**Session:** 2026-02-28

---

## 2026-02-27 — AGENT 12 MARKETING ENGINE ACTIVATED

**What changed:** Built the complete bienzoli Marketing Automation System. Registered Agent 12 — Marketing Engine in CLAUDE.md and docs/agents/registry.md.

**Why:** Phase B of the roadmap requires content marketing to start (TikTok, Instagram, LinkedIn). Facebook auto-posting is the first pillar — daily posts with social card images, no manual effort.

**What was built:**
- `docs/setup/facebook-api-setup.md` — Step-by-step token setup guide
- `lib/facebook/api.ts` — Facebook Graph API TypeScript client (text posts, photo posts, engagement fetching)
- `lib/image-gen/render.ts` — HTML-to-PNG social card renderer (puppeteer + sharp)
- `scripts/facebook-post.mjs` — Post runner (finds today's JSON → posts to Facebook → archives)
- `scripts/generate-social-image.mjs` — Image generator (renders HTML template → 1080×1080 PNG)
- `scripts/generate-week.mjs` — Weekly schedule generator (creates dated post JSONs from content library)
- `scripts/post-today.mjs` — Full daily pipeline orchestrator (generate image → post → archive → log)
- `scripts/fetch-engagement.mjs` — Engagement data fetcher (updates performance log from Graph API)
- `content/social/templates/` — 9 HTML social card templates (dark, branded, bienzoli design system)
- `content/social/calendar.md` — 30-day content calendar with pillar rotation
- `content/social/queue/week1-day*.json` — 7 Week 1 post drafts
- `content/social/queue/week2-day*.json` — 7 Week 2 post drafts (14 posts total)
- `logs/content-performance.md` — Engagement tracking log
- `.github/workflows/daily-post.yml` — GitHub Actions cron (06:00 UTC = 10:00 AM MUT)

**npm scripts added:** `social:generate-week`, `social:generate-images`, `social:post-today`, `social:post-facebook`, `social:dry-run`, `engagement:fetch`

**Pending activation:** Add `FACEBOOK_PAGE_ID` and `FACEBOOK_PAGE_ACCESS_TOKEN` to `.env.local` (see `docs/setup/facebook-api-setup.md`), then add to GitHub Secrets to activate the cron.

**Files updated:** CLAUDE.md, docs/agents/registry.md, package.json, logs/decisions.md

---

## 2026-02-25 — TIKTOK INTRO VIDEO CREATED (REMOTION)

**What changed:** Created 15-second TikTok intro video for bienzoli using Remotion. Full 7-scene structure, 3-layer audio system, spring-based animations throughout, bienzoli design system colors + fonts baked in.

**Why:** First piece of video content for bienzoli marketing. Designed to hook Mauritian small business owners on TikTok/Reels/Shorts. Demonstrates the brand, the speed promise, the features, and the pricing in exactly 15 seconds.

**Structure:**
- 7 scenes: Hook → Problem → Transformation → Speed → Features → Price → CTA
- 3 audio layers: ambient beat (loop) + SFX (frame-accurate) + tick sounds (counter)
- Glitch transition as signature moment (Scene 3: bad → beautiful website reveal)
- Kreol line: "Mo build website ki fer bizness grandi." in Scene 6

**Files created:**
- `content/videos/tiktok-intro/` — full Remotion project (15 files)
- `remotion.config.ts` — project root config pointing at tiktok public dir

**Audio:** 8 royalty-free files needed. See `content/videos/tiktok-intro/public/audio/README.md`.
After adding files: set `AUDIO_ENABLED = true` in `TikTokIntro.tsx`.

**Commands:**
- `npm run video:preview` — Remotion Studio (live preview)
- `npm run video:render` — export to `out/tiktok-intro.mp4`

**Tech:** Remotion 4.x, @remotion/google-fonts (Space Grotesk + DM Sans + JetBrains Mono), @remotion/media (Audio). All colors from design system dark-mode tokens (§9.2 specifies dark for social).

---

## 2026-02-25 — GOOGLE DRIVE SYNC IMPLEMENTATION

**What changed:** Implemented full Google Drive sync suite (Agent 09 — Cloud Archivist activation).

**Files created:** `scripts/gdrive-init.mjs`, `scripts/sync-to-drive.mjs`, `lib/gdrive/sync.ts` (replaced stub). Installed `googleapis` + `mime-types`. Added `gdrive:init` and `gdrive:sync` npm scripts.

**Auth:** OAuth2 with refresh token. Env var names: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GDRIVE_ROOT_FOLDER_ID`.

---

## 2026-02-25 — FULL CONTENT EXPANSION OF AGENCY SYSTEM

**What changed:** Expanded every stub document from the 2026-02-24 session to full, actionable content. Prior session created the structure; this session filled it with complete, usable material that any agent can execute from a cold session.

**Scope of expansion:**

All 11 agent spec files expanded from ~45-line stubs to 150–200+ line full specs with all 10 required sections (role description, trigger words, responsibilities, key knowledge, input/output, files read/written, handoff rules, quality checks).

All 5 skills files expanded from ~20-line outlines to 100–200+ line complete processes with phase-by-phase steps, prerequisites, exit criteria, and quality checks.

All 4 case studies expanded from ~35-line outlines to 80–120+ line published case studies with challenge analysis, solution reasoning, full feature lists, PageSpeed results, and strategic insights.

**Other changes:**
- `docs/business/roadmap.md` updated to reflect completed Phase A items
- Next.js build verified: compiles successfully (7.2s, all routes generated, no errors)

**Why:**
Stub documents are not operationally usable. An agent reading a 45-line brand-guardian.md cannot actually enforce brand standards. A 20-line client-site-build.md cannot guide a site build. This expansion makes the system genuinely executable — not just structured.

**Files updated:**
`docs/agents/*.md` (all 11), `docs/skills/*.md` (all 5), `content/case-studies/*.md` (all 4), `docs/business/roadmap.md`

**Decision maker:** AGENT 07 — Self-Architect
**Session:** 2026-02-25

---

## 2026-02-24 — COMPLETE AGENCY SYSTEM BUILD

**What changed:** Created the full bienzoli agency operating system — business documents, market research docs, complete agent specs, skills docs, content infrastructure, client templates, revenue tracker, and Google Drive sync scaffolding.

**Why:**
bienzoli needed a complete, self-documenting system to operate as a professional web agency with clear package scope, repeatable delivery workflows, and reliable operational tracking from lead to delivery to retention.

**Files created:**
- `docs/brand/voice-and-tone.md`
- `docs/business/packages.md`
- `docs/business/contract-template.md`
- `docs/business/invoice-template.md`
- `docs/business/onboarding-form.md`
- `docs/business/outreach-scripts.md`
- `docs/business/referral-programme.md`
- `docs/business/roadmap.md`
- `docs/market/competitive-landscape.md`
- `docs/market/target-clients.md`
- `docs/agents/registry.md`
- `docs/agents/brand-guardian.md`
- `docs/agents/content-strategist.md`
- `docs/agents/sales-closer.md`
- `docs/agents/platform-engineer.md`
- `docs/agents/client-success.md`
- `docs/agents/market-researcher.md`
- `docs/agents/self-architect.md`
- `docs/agents/business-operations.md`
- `docs/agents/cloud-archivist.md`
- `docs/agents/social-card-generator.md`
- `docs/agents/ai-deployment-specialist.md`
- `docs/skills/README.md`
- `docs/skills/client-site-build.md`
- `docs/skills/ai-chatbot-deploy.md`
- `docs/skills/portfolio-case-study.md`
- `docs/skills/proposal-generator.md`
- `docs/skills/speed-test-comparison.md`
- `docs/clients/_template/brief.md`
- `docs/clients/_template/status.md`
- `docs/setup/google-drive-setup.md`
- `docs/setup/email-setup.md`
- `content/social/tiktok/README.md`
- `content/social/instagram/README.md`
- `content/social/linkedin/README.md`
- `content/case-studies/nickel-sew.md`
- `content/case-studies/ziyaad-beneydatoula.md`
- `content/case-studies/keygo.md`
- `content/case-studies/ds-nails.md`
- `content/outreach/README.md`
- `design/components/README.md`
- `design/exports/README.md`
- `design/templates/README.md`
- `clients/README.md`
- `logs/clients.md`
- `logs/drive-sync.md`
- `logs/sessions/README.md`
- `scripts/README.md`
- `scripts/gdrive-folders.json`
- `lib/gdrive/sync.ts`

**Files updated:**
- `CLAUDE.md`
- `logs/decisions.md`

**Agents registered:** 11 total (10 active, 1 standby)

**Next actions:**
1. Set up professional email (`hello@bienzoli.com`)
2. Complete Google Drive OAuth setup and first sync
3. Update bienzoli.com production content (portfolio + package alignment)
4. Begin outreach campaign with warm and cold scripts

---

## 2026-02-24 — Design System Initialization

**What changed:** Created `docs/brand/design-system.md` — the bienzoli visual identity system.
Also updated `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, and `CLAUDE.md`.

**Why:**
The codebase had an implicit design system (colors, spacing patterns, animation) but no canonical reference document. Without a single source of truth, every agent producing visual output would make independent decisions leading to visual drift. This creates the authoritative reference that every agent reads before producing any visual output.

**Key decisions and rationale:**

### 1. DM Sans added as body font
Space Grotesk was doing double duty as both display and body font. At 14-16px body sizes, its geometric construction causes subtle readability fatigue. DM Sans (humanist sans) is substantially more legible at small sizes and creates a clear role distinction between display (Space Grotesk for h1/h2/h3) and body (DM Sans for all running text, nav, buttons, labels). JetBrains Mono is unchanged for mono/code contexts.

Font weights loaded for DM Sans: 400/500/600. Bold (700) is not loaded for DM Sans — any bold text in a body context should use `font-bold font-display` (Space Grotesk) or `font-semibold font-sans` (DM Sans 600).

### 2. defaultTheme changed from "dark" to "light"
The design brief specifies light mode as primary. The target audience (Mauritian small business owners, SMEs) browses primarily on mobile during daylight hours. Dark mode remains fully supported and correct, but light mode is now the design origin point — visual QA and PageSpeed testing are performed in light mode.

### 3. Depth strategy formalized: borders-first with surface color shifts
The existing code already used this approach implicitly (cards: `border border-border bg-card hover:border-border hover:bg-card`). Formalizing it prevents shadow-based elevation from creeping in. Glow effects (`.glow-lagoon`, `.radial-glow-lagoon`) are explicitly classified as decorative atmosphere effects, not elevation markers.

### 4. Semantic token layer added
The existing token system had the right primitives (`--lagoon`, `--coral`, shadcn/ui compatibility tokens) but no semantic layer for text hierarchy, surface elevation, or border scale. Added:
- `--text-primary`, `--text-secondary`, `--text-supporting`, `--text-disabled`
- `--border-subtle`, `--border-default`, `--border-strong`, `--border-active`
- `--surface-base`, `--surface-raised`, `--surface-elevated`, `--surface-overlay`
- `--lagoon-subtle`, `--lagoon-muted`, `--coral-subtle`, `--coral-muted`
- `--success`, `--success-subtle`, `--warning`, `--warning-subtle`, `--destructive-subtle`

All shadcn/ui tokens (`--background`, `--foreground`, `--card`, `--muted`, etc.) preserved with identical names for backward compatibility.

### 5. `emerald-400` hardcode removed from design spec
The pricing.tsx LE MORNE tier used `text-emerald-400` and `via-emerald-400` — hardcoded Tailwind color palette values outside the token system. These were replaced with `text-lagoon` and `via-lagoon/40`. LE MORNE is the premium tier — lagoon (the primary brand color) is the appropriate accent.

**Files created:**
- `docs/brand/design-system.md`
- `logs/decisions.md` (this file)

**Files updated:**
- `app/globals.css` — expanded CSS custom properties with full semantic layer
- `tailwind.config.ts` — DM Sans as `font-sans`, expanded color objects, full radius scale
- `app/layout.tsx` — DM Sans font loaded, `defaultTheme="light"`
- `CLAUDE.md` — Agent 01 key knowledge section updated
- `components/pricing.tsx` — `emerald-400` hardcodes removed

**Decision maker:** AGENT 01 — Brand Guardian + AGENT 07 — Self-Architect
**Session:** 2026-02-24
