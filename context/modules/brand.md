# Brand Module — bienzoli

> Deep dive: `docs/brand/design-system.md` is the single source of truth. Read it in full before any visual output.
> Also: `docs/brand/voice-and-tone.md` for writing standards.

## Font Stack

| Token | Font | Usage |
|-------|------|-------|
| `font-display` | Space Grotesk | Headlines h1/h2/h3, overlines ONLY |
| `font-sans` | DM Sans | ALL body copy, nav, buttons, labels, captions, forms — default |
| `font-mono` | JetBrains Mono | URL bars, code, tracking-wide labels ("STEP 01") |

Rules: Never use Space Grotesk for body copy. DM Sans is the default. DM Sans bold = `font-semibold font-sans` (weight 600). Bold 700 not loaded for DM Sans — use `font-bold font-display` if bold display needed.

## Color System

- Primary accent: `lagoon` — HSL 199 89% 48% (cyan)
- Secondary accent: `coral` — HSL 24 94% 53% (orange)
- NEVER hardcode hex/RGB/HSL in JSX — always CSS vars via Tailwind tokens
- NEVER use `emerald-*`, `blue-*`, `green-*` raw Tailwind palette — token system only
- `emerald-*` is not in the system — use `lagoon` instead

## Depth & Elevation

- **Borders-first** strategy with surface color shifts
- Glow effects (`.glow-lagoon`, `.radial-glow-lagoon`) = decorative atmosphere ONLY, not elevation
- Never stack shadow + border + glow on one element
- Cards: `border border-border bg-card hover:border-border hover:bg-card`

## Theme

- `defaultTheme="light"` — light mode is primary, dark mode supported
- Visual QA always in light mode
- Social/video content uses dark-mode tokens (§9.2 of design system)

## Logo Rules

- Always lowercase "bienzoli". File: `logo_normal_transparent.png`
- Clearspace = cap-height of "b" on all four sides
- Never: "BIENZOLI" / all-caps / modified colours
- Footer attribution required on every client site: "Built with care by bienzoli" → `https://bienzoli.com`

## Key CSS Files

- `app/globals.css` — all CSS custom properties + full semantic token layer
- `tailwind.config.ts` — font stack, color objects, radius scale
- `app/layout.tsx` — font loading

## Semantic Token Reference

```
Text:    --text-primary | --text-secondary | --text-supporting | --text-disabled
Border:  --border-subtle | --border-default | --border-strong | --border-active
Surface: --surface-base | --surface-raised | --surface-elevated | --surface-overlay
Accent:  --lagoon-subtle | --lagoon-muted | --coral-subtle | --coral-muted
Status:  --success | --success-subtle | --warning | --warning-subtle | --destructive-subtle
```

All shadcn/ui tokens (`--background`, `--foreground`, `--card`, `--muted`, etc.) preserved for backward compatibility.

## Portfolio Reference

| Project | URL | Notable |
|---------|-----|---------|
| Nickel Sew | nickelsew.com | Before/after gallery, WhatsApp flow, loyalty, local payments |
| Ziyaad Ben Eydatoula | ziyaadbeneydatoula.com | Personal brand, testimonials, service tabs |
| KeyGo | keygomu.vercel.app | Car rental, Mauritian payments, booking flow |
| DS Nails | dsnail.vercel.app | Booking, auth, gallery |
| Frisco Creamery | friscocreamery.org | Full brand system |

Personal projects demonstrating fullstack capability: TechKours, MoTalent, MoTravel, MoPet, Mobet.

## Quality Floor (Visual)

Every site must: score 90+ PageSpeed Insights | be fully responsive | zero layout shift | WCAG accessible.
Remediate before delivery — no exceptions.
