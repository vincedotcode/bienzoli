# Folder Structure — bienzoli

> Canonical structure. Never scatter files outside this tree.
> If you add new folders, update this file + `CLAUDE.md` + `docs/agents/registry.md`.

```
bienzoli/
│
├── CLAUDE.md                          ← Pointer file (read CORE.md instead)
├── CORE.md                            ← Always-loaded minimal context
│
├── context/
│   ├── modules/                       ← Load only what the task needs
│   │   ├── brand.md
│   │   ├── packages.md
│   │   ├── agents.md
│   │   ├── folder-structure.md
│   │   ├── roadmap.md
│   │   ├── automation.md
│   │   ├── market.md
│   │   ├── ops.md
│   │   ├── sales.md
│   │   └── content.md
│   └── working-set.md                 ← Rolling session state (always tiny)
│
├── app/                               ← Next.js App Router routes
├── components/                        ← Shared UI + feature components
├── hooks/                             ← Shared React hooks
├── public/                            ← Static assets (logos, icons, illustrations)
├── styles/                            ← Additional style layers
│
├── scripts/                           ← Operational scripts + setup helpers
│   ├── README.md
│   ├── setup.sql
│   ├── gdrive-folders.json
│   ├── gdrive-init.mjs
│   ├── sync-to-drive.mjs
│   ├── facebook-post.mjs
│   ├── generate-social-image.mjs
│   ├── generate-week.mjs
│   ├── post-today.mjs
│   └── fetch-engagement.mjs
│
├── lib/                               ← Shared utilities + integrations
│   ├── gdrive/sync.ts                 ← Google Drive sync helper
│   ├── facebook/api.ts                ← Facebook Graph API client
│   └── image-gen/render.ts            ← HTML-to-PNG renderer (puppeteer + sharp)
│
├── docs/                              ← Source-of-truth identity documents (authoritative)
│   ├── brand/
│   │   ├── design-system.md           ← Full visual identity (AUTHORITATIVE — read before visual output)
│   │   └── voice-and-tone.md          ← Writing standards
│   ├── business/
│   │   ├── packages.md
│   │   ├── contract-template.md
│   │   ├── invoice-template.md
│   │   ├── onboarding-form.md
│   │   ├── outreach-scripts.md
│   │   ├── referral-programme.md
│   │   └── roadmap.md
│   ├── market/
│   │   ├── competitive-landscape.md
│   │   └── target-clients.md
│   ├── agents/
│   │   ├── registry.md
│   │   ├── brand-guardian.md
│   │   ├── content-strategist.md
│   │   ├── sales-closer.md
│   │   ├── platform-engineer.md
│   │   ├── client-success.md
│   │   ├── market-researcher.md
│   │   ├── self-architect.md
│   │   ├── business-operations.md
│   │   ├── cloud-archivist.md
│   │   ├── social-card-generator.md
│   │   ├── ai-deployment-specialist.md
│   │   └── marketing-engine.md
│   ├── skills/
│   │   ├── README.md
│   │   ├── client-site-build.md
│   │   ├── ai-chatbot-deploy.md
│   │   ├── portfolio-case-study.md
│   │   ├── proposal-generator.md
│   │   └── speed-test-comparison.md
│   ├── setup/
│   │   ├── google-drive-setup.md
│   │   ├── email-setup.md
│   │   └── facebook-api-setup.md
│   └── clients/
│       └── _template/
│           ├── brief.md
│           └── status.md
│
├── content/                           ← All marketing and social content
│   ├── social/
│   │   ├── tiktok/README.md
│   │   ├── instagram/README.md
│   │   ├── linkedin/README.md
│   │   ├── templates/                 ← 9 HTML social card templates (1080×1080)
│   │   ├── queue/                     ← Dated post JSON files + generated images
│   │   └── calendar.md                ← 30-day content calendar
│   ├── case-studies/
│   │   ├── nickel-sew.md
│   │   ├── ziyaad-beneydatoula.md
│   │   ├── keygo.md
│   │   └── ds-nails.md
│   ├── videos/
│   │   └── tiktok-intro/              ← Remotion project (15-second brand intro)
│   └── outreach/README.md
│
├── design/                            ← Design assets
│   ├── components/README.md
│   ├── exports/
│   │   ├── README.md
│   │   └── social-cards/[client-name]/
│   └── templates/README.md
│
├── clients/                           ← Active client project folders (code)
│   ├── README.md
│   └── [client-name]/
│
└── logs/                              ← Session logs, decision records
    ├── decisions.md                   ← Architectural + business decisions (most recent first)
    ├── clients.md                     ← Client log: who, what, when, status, revenue
    ├── content-performance.md         ← Social media engagement tracking
    ├── drive-sync.md                  ← Google Drive sync manifest
    └── sessions/README.md
```

## Rules

- Never create files outside this structure without updating this module + `docs/agents/registry.md`
- Every new client: `docs/clients/[name]/` (brief + status) AND `clients/[name]/` (code)
- Every major decision: `logs/decisions.md`
- Every client interaction: `logs/clients.md`
- Every session that changes structure: update this file + `CLAUDE.md`
