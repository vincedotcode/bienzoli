# bienzoli Decision Log

This file records architectural and business decisions with rationale.
One entry per decision. Most recent at top.

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
