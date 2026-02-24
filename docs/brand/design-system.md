# bienzoli Design System

**Version:** 1.0 — February 2026
**Maintained by:** AGENT 01 — Brand Guardian
**Applies to:** All visual output produced by or for bienzoli — the website, social media, proposals, client deliverables

---

## Audit Baseline

This system was built from the live codebase. Before defining anything, every component, token, and pattern was audited. The design system EVOLVES the existing language — it does not replace it.

**What was preserved:** `--lagoon` and `--coral` as the two brand primaries, Space Grotesk as the display font, JetBrains Mono for technical contexts, glow utility classes, the `.bg-grid` pattern, the border-based card elevation approach, the radial glow decorative effects.

**What was changed:** Space Grotesk no longer serves double duty as body font — DM Sans is now the body/UI font. `defaultTheme` was flipped from dark to light. The token system was expanded with a full semantic layer (text hierarchy, surface elevation, border scale, status colors). Hardcoded `emerald-400` in pricing.tsx was removed.

---

## § 1 — Color Tokens

### Philosophy
Every color that appears in a component must trace back to a CSS custom property. No hardcoded hex, HSL, or RGB values in JSX. No Tailwind color palette values (no `text-emerald-400`, `bg-blue-600`, `border-gray-200`). If the color does not exist as a token, create the token first.

### Google Fonts Link (for external documents)
Not applicable — colors are defined in globals.css as CSS custom properties.

### Raw Palette (reference only — do not use directly in components)
These are the source values that feed the semantic layer.

| Name | HSL Value | Hex Approx | Purpose |
|---|---|---|---|
| Lagoon | `199 89% 48%` | `#10b4e8` | Primary brand cyan |
| Coral | `24 94% 53%` | `#f87334` | Secondary brand orange |
| Navy | `225 16% 5%` | `#0c0d12` | Dark mode page background |
| Slate | `220 16% 97%` | `#f5f6f8` | Light mode card surface |
| White | `0 0% 100%` | `#ffffff` | Light mode page background |

### Semantic Tokens — Light Mode (`:root`)

```css
/* Brand primaries */
--lagoon: 199 89% 48%;           /* Primary CTAs, links, icons, check marks, ring */
--lagoon-subtle: 199 60% 96%;    /* Tinted section backgrounds, icon container fills */
--lagoon-muted: 199 60% 91%;     /* Hover backgrounds behind lagoon-adjacent elements */
--coral: 24 94% 53%;             /* Secondary CTAs, step numbers, star ratings, accents */
--coral-subtle: 24 70% 96%;      /* Tinted backgrounds behind coral elements */
--coral-muted: 24 70% 91%;       /* Hover backgrounds for coral-adjacent elements */

/* Surface elevation */
--surface-base: 0 0% 100%;       /* Page canvas — always white in light mode */
--surface-raised: 220 16% 97%;   /* Cards at rest — barely lifted from page */
--surface-elevated: 220 16% 94%; /* Cards on hover, active states */
--surface-overlay: 0 0% 100%;    /* Modals, popovers, command palette */

/* Text hierarchy */
--text-primary: 222 20% 10%;     /* Headlines, strong labels, card titles */
--text-secondary: 222 14% 32%;   /* Body copy, descriptions, feature text */
--text-supporting: 220 9% 48%;   /* Captions, metadata, nav links, placeholder copy */
--text-disabled: 220 9% 70%;     /* Disabled inputs, unavailable items */

/* Border variants */
--border-subtle: 220 13% 93%;    /* Dividers, row separators, section rules */
--border-default: 220 13% 87%;   /* Card borders at rest */
--border-strong: 220 13% 72%;    /* Focused inputs, hovered card borders */
--border-active: 199 89% 48%;    /* Selected/active state — identical to --lagoon */

/* Status colors */
--success: 142 71% 45%;          /* Success states, positive confirmations */
--success-subtle: 142 50% 96%;   /* Success tinted backgrounds */
--warning: 38 92% 50%;           /* Warning states, caution indicators */
--warning-subtle: 38 80% 96%;    /* Warning tinted backgrounds */
--info: 199 89% 48%;             /* Info = lagoon (intentional alias) */
--destructive: 0 84% 60%;        /* Error states, delete confirmations */
--destructive-subtle: 0 70% 96%; /* Error tinted backgrounds */
```

### Semantic Tokens — Dark Mode (`.dark`)

```css
/* Brand primaries — same accent values, adjusted subtle/muted for dark */
--lagoon: 199 89% 48%;
--lagoon-subtle: 199 50% 12%;
--lagoon-muted: 199 50% 16%;
--coral: 24 94% 53%;
--coral-subtle: 24 40% 12%;
--coral-muted: 24 40% 16%;

/* Surface elevation — deep navy scale */
--surface-base: 225 16% 5%;
--surface-raised: 224 14% 8%;
--surface-elevated: 224 14% 11%;
--surface-overlay: 224 14% 8%;

/* Text hierarchy */
--text-primary: 210 20% 95%;
--text-secondary: 210 16% 72%;
--text-supporting: 218 11% 50%;
--text-disabled: 218 11% 30%;

/* Border variants */
--border-subtle: 223 13% 10%;
--border-default: 223 13% 14%;
--border-strong: 223 13% 22%;
--border-active: 199 89% 48%;

/* Status colors */
--success: 142 71% 45%;
--success-subtle: 142 50% 10%;
--warning: 38 92% 50%;
--warning-subtle: 38 80% 10%;
--destructive: 0 63% 31%;
--destructive-subtle: 0 60% 10%;
```

### Token Usage Rules

1. **Lagoon is the primary action color.** Use it for: primary buttons, links, icons in feature cards, checkmarks in pricing, input focus rings, active nav links, step numbers.
2. **Coral is the secondary accent.** Use it for: star ratings in testimonials, "Most Popular" badge backgrounds, secondary CTA backgrounds, decorative step labels.
3. **Never use two accent colors in the same element.** A card can have a lagoon icon OR a coral badge. Not both.
4. **Text hierarchy must be respected.** Headlines → `text-primary`. Body copy → `text-secondary`. Captions/metadata → `text-supporting`. No skipping levels (no direct jump from headline to muted/supporting).
5. **`emerald-*` is not in this system.** Any usage of `text-emerald-*`, `bg-emerald-*`, or `via-emerald-*` is a violation. Use `lagoon` instead.
6. **Status colors are for status only.** `--success` is never used decoratively. It means "this action succeeded / this state is correct."
7. **Opacity on borders is approved.** `border-border/60`, `border-lagoon/30`, `border-coral/20` are all valid. This is the only approved use of opacity modifiers in the token system.
8. **No opacity on text tokens.** Never write `text-foreground/60`. Use the correct hierarchy token instead (`text-supporting`).

---

## § 2 — Typography

### Font Stack

Maximum 3 fonts. Each has a strict, exclusive role.

| Role | Font | CSS Variable | Tailwind Class |
|---|---|---|---|
| Display | Space Grotesk | `--font-space-grotesk` | `font-display` |
| Body | DM Sans | `--font-dm-sans` | `font-sans` (default) |
| Mono | JetBrains Mono | `--font-jetbrains-mono` | `font-mono` |

### Google Fonts Import Link

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

> For Next.js (production): use `next/font/google` — already configured in `app/layout.tsx`. The link above is for external documents (proposals, email templates).

### Type Scale

| Token | Size | Line Height | Weight | Font | Usage |
|---|---|---|---|---|---|
| `display-2xl` | 72px / 4.5rem | 1.05 | 700 | Space Grotesk | Hero headline maximum (desktop only) |
| `display-xl` | 60px / 3.75rem | 1.1 | 700 | Space Grotesk | Hero headline standard |
| `display-lg` | 48px / 3rem | 1.1 | 700 | Space Grotesk | Section hero headline |
| `display-md` | 36px / 2.25rem | 1.15 | 700 | Space Grotesk | Section headlines (h2) |
| `display-sm` | 30px / 1.875rem | 1.2 | 600 | Space Grotesk | Card titles, subsection heads (h3) |
| `body-xl` | 20px / 1.25rem | 1.6 | 400 | DM Sans | Hero subtitle |
| `body-lg` | 18px / 1.125rem | 1.65 | 400 | DM Sans | Section subtitles, lead copy |
| `body-md` | 16px / 1rem | 1.6 | 400 | DM Sans | Body copy default |
| `body-sm` | 14px / 0.875rem | 1.5 | 400 | DM Sans | Card body, form copy, table text |
| `body-xs` | 13px / 0.8125rem | 1.4 | 400 | DM Sans | Nav links, small UI text |
| `label-lg` | 12px / 0.75rem | 1.3 | 600 | DM Sans | Section badges, pill labels |
| `label-md` | 11px / 0.6875rem | 1.3 | 600 | DM Sans | Card metadata, category tags |
| `label-sm` | 10px / 0.625rem | 1.2 | 700 | Space Grotesk | Step overlines, ALL-CAPS UI labels |
| `mono-md` | 14px / 0.875rem | 1.5 | 400 | JetBrains Mono | URL bars in browser chrome mockups |
| `mono-sm` | 12px / 0.75rem | 1.4 | 400 | JetBrains Mono | Tracking labels, terminal text |
| `mono-xs` | 11px / 0.6875rem | 1.3 | 400 | JetBrains Mono | Tiny overlines, code in badges |

### Typography Rules

1. **`font-display` is exclusively for h1, h2, h3.** Never apply it to body copy, nav links, buttons, captions, or any running text.
2. **`font-sans` (DM Sans) is the default.** It applies to everything not explicitly tagged as display or mono. Nav, buttons, labels, form text, card descriptions, captions — all DM Sans.
3. **`font-mono` is purposeful.** Use it for: URL bars in browser chrome mockups, code examples, tracking-wide overlines formatted as ALL-CAPS categories (e.g., `STEP 01`, `NEW CLIENT INTAKE`). Never use it for regular labels or body copy.
4. **Letter-spacing on headlines:** `tracking-tight` (-0.025em) for display-md and above. Never track headlines wide.
5. **Letter-spacing on ALL-CAPS labels:** `tracking-[0.12em]` minimum. These are set in Space Grotesk or JetBrains Mono, always uppercase, always small (10-12px). Examples: `FLIC EN FLAC`, `STEP 01`, `OUR GUARANTEE`.
6. **`text-balance` on all h1, h2.** `text-pretty` on multi-line body paragraphs. Never on single-line elements.
7. **Maximum body line length:** 65 characters. Control via `max-w-xl` (= 36rem = 576px) or `max-w-2xl` (= 42rem = 672px) on copy containers.
8. **No bold DM Sans.** DM Sans is loaded at 400/500/600 only. Any `font-bold` (700) in a body context falls back to the system font. Use `font-semibold` (600) for strong body text. Use `font-bold font-display` for bold headlines.

### Pricing Display Format

Pricing numbers are rendered in Space Grotesk (font-display), large, in `--text-primary`. The `Rs` prefix is rendered at a smaller size.

```
Rs  ← text-2xl font-display font-semibold text-supporting
15,000  ← text-4xl sm:text-5xl font-display font-bold text-primary tracking-tight
```

Example Tailwind: `<span class="text-4xl font-bold font-display tracking-tight">15,000</span>`

**Format rules:**
- Always `Rs X,XXX` — space after Rs, comma separating thousands
- Never `Rs15,000` (no space), `MUR 15,000` (wrong prefix), `15,000 rupees` (word form)
- Monthly: `Rs 800/mo` — slash, lowercase mo
- Range: `Rs 60,000+`
- Custom: `Custom pricing`

### Package Name Display Format

Package names are always rendered in ALL-CAPS Space Grotesk with wide letter-spacing.

```
FLIC EN FLAC   — text-xs font-bold font-display tracking-[0.14em] uppercase text-lagoon
PORT LOUIS     — same
GRAND BAIE     — same
LE MORNE       — same
```

Never render package names in title case ("Grand Baie") in pricing UI contexts. In prose copy (proposals, emails, this document), title case is acceptable.

---

## § 3 — Depth Strategy

### Decision: Borders-first with surface color shifts

This is the most critical structural rule. It governs every card, panel, and overlay. Commit fully.

**What this means:**
- Elevation is communicated by surface color change + border strength change
- Shadows are NOT used for structural elevation
- Glow effects are NOT elevation — they are decorative atmosphere

### Elevation Model

| Level | Name | Background Token | Border Token | Use Case |
|---|---|---|---|---|
| 0 | Canvas | `--surface-base` | none | Page background |
| 1 | Raised | `--surface-raised` + `--border-default` | 1px solid | Cards at rest |
| 2 | Elevated | `--surface-elevated` + `--border-strong` | 1px solid | Cards on hover |
| 3 | Active | `--surface-elevated` + `--border-active` | 1px solid | Selected cards, active state |
| 4 | Overlay | `--surface-overlay` + `--border-strong` + `shadow-sm` | 1px solid | Modals, dropdowns |

Tailwind pattern for a standard card:
```jsx
<div className="rounded-2xl border border-border bg-card hover:border-border-strong hover:bg-surface-elevated transition-colors">
```

### Glow Classification

Glow effects (`.glow-lagoon`, `.glow-coral`, `.radial-glow-lagoon`, `.radial-glow-coral`) are **decorative atmosphere, not elevation.**

Approved uses:
- `.glow-lagoon` — featured pricing card (the one with `border-lagoon/40`)
- `.radial-glow-lagoon` / `.radial-glow-coral` — hero section background, CTA section background
- Never on standard feature cards, testimonial cards, or navigation elements

### Backdrop Blur Rules

- `backdrop-blur-2xl` — navbar only (over colorful backgrounds while scrolling)
- `backdrop-blur-sm` — cards that sit directly over hero-section glows or colored backgrounds
- Never apply backdrop-blur to cards over plain white/dark backgrounds — it has no visual effect and wastes GPU

### Shadow Rules

- `shadow-sm` — floating overlays: tooltips, dropdowns, command palette (Level 4 overlay only)
- `shadow-lg shadow-lagoon/20` — primary CTA button only (the hero button pattern)
- `shadow-lg` — decorative floating elements in hero (AI chat bubble mockup in ai-section.tsx)
- **Never:** `shadow-md`, `shadow-xl`, `shadow-2xl` on any structural element
- **Never:** shadow + border on the same element (except Level 4 overlay which uses `border + shadow-sm`)

### What Never to Mix

- Never: `glow-lagoon` + a strong border (the glow IS the emphasis; adding a lagoon border is redundant)
- Never: `shadow-md` + `border` on a card (pick one depth mechanism)
- Never: `backdrop-blur` on cards over a flat background

---

## § 4 — Spacing System

### Base Unit: 4px (Tailwind default)

Do not change the base unit. All spacing in the system is a multiple of 4.

### Section Spacing

```
Section vertical padding:     py-24 sm:py-32        96px → 128px
Section max-width container:  max-w-7xl px-6         1280px container, 24px gutter mobile
Section title block:          mx-auto max-w-2xl text-center
Headline to grid gap:         mt-16                  64px
Badge to headline gap:        mb-6 (badge has this mb, then headline follows naturally)
Subtitle to content gap:      mt-8                   32px
```

### Card Padding Standards

```
Compact (small feature cards, badge cards):   p-4     16px
Standard (feature cards, testimonials):       p-6     24px
Comfortable (pricing cards, guarantee blocks): p-8    32px
```

### Grid Gaps

```
Feature card grid (6 cards):    gap-4     16px
Pricing card grid (3-4 tiers):  gap-6     24px
Project card grid:               gap-4     16px
Testimonial grid:                gap-4     16px
Process steps grid:              gap-6     24px
Footer column grid:              gap-8 sm:gap-12
Stats row in hero:               gap-x-12 gap-y-6
```

### Navbar Dimensions

```
Navbar height:           py-4 (64px total with logo)
Navbar container:        max-w-7xl px-6
Nav link padding:        px-3 py-2
Nav link text size:      text-[13px] font-medium
CTA button in nav:       px-5 h-9 text-[13px] font-medium rounded-full
Logo height:             h-8 (32px)
Wordmark text:           text-lg font-semibold tracking-[0.03em]
```

---

## § 5 — Border Radius

### Radius Scale

| Token | Value | px | Use Case |
|---|---|---|---|
| `--radius-none` | 0 | 0 | Never use — sharp corners look unfinished |
| `--radius-sm` | 0.375rem | 6px | Small tags in CRM tables |
| `--radius-md` | 0.5rem | 8px | Form inputs, select dropdowns, small buttons |
| `--radius-lg` | 0.625rem | 10px | Default radius (shadcn/ui base) |
| `--radius-xl` | 1rem | 16px | Icon containers (h-10 w-10 boxes) |
| `--radius-2xl` | 1.25rem | 20px | Feature cards, pricing cards, testimonials, process cards |
| `--radius-3xl` | 1.5rem | 24px | Large hero elements, browser chrome mockups |
| `--radius-full` | 9999px | pill | Buttons, badges, section labels, avatar circles |

### Radius Assignment Rules

```
Buttons (all sizes):              rounded-full
Section badge/pills:              rounded-full
Pricing "Most Popular" badge:     rounded-full
Avatar circles:                   rounded-full
Feature cards:                    rounded-2xl
Pricing cards:                    rounded-2xl
Testimonial cards:                rounded-2xl
Process/step cards:               rounded-2xl
Portfolio project cards:          rounded-2xl
Form inputs (Input, Textarea, Select): rounded-md
Icon containers (h-10 w-10):      rounded-xl
Browser chrome mockup wrapper:    rounded-2xl or rounded-3xl (outer)
Browser chrome inner image:       rounded-xl
Tooltip:                          rounded-lg
Dropdown menu:                    rounded-lg
Modal/dialog:                     rounded-2xl
```

### Personality

bienzoli is **approachable but engineered.** Not sharp (no `rounded-none` or `rounded-sm` on main elements), not bubbly (no `rounded-3xl` on cards). The `rounded-2xl` card + `rounded-full` button combination is the core personality — professional and friendly without being corporate or playful.

---

## § 6 — Component Patterns

For each pattern: background, border, radius, padding, typography, color usage, hover state.

---

### 6.1 Navigation Bar

```
Structure:        fixed top-0 z-50 w-full
Default (transparent):
  bg-transparent
  border-b border-transparent
Scrolled:
  bg-background/70
  backdrop-blur-2xl
  border-b border-border-subtle/60
  transition: all 0.3s ease

Logo block:
  h-8 logo image (logo_normal_transparent.png)
  + "bienzoli" text-lg font-semibold tracking-[0.03em] lowercase text-foreground

Nav links (desktop):
  text-[13px] font-sans font-medium text-supporting
  hover: rounded-lg px-3 py-2 bg-surface-elevated text-text-primary
  active: text-lagoon

Actions:
  Language switcher: text-[13px] font-sans font-medium text-supporting
  Theme toggle: icon button, rounded-lg hover:bg-surface-elevated
  "Get Started" CTA: bg-foreground text-background rounded-full px-5 h-9 text-[13px] font-medium

Mobile menu:
  bg-background/95 backdrop-blur-2xl
  border-b border-border-default
  links: text-base font-sans font-medium py-3 border-b border-border-subtle
```

---

### 6.2 Hero Section

```
Container:
  min-h-screen relative overflow-hidden

Background layers (bottom to top):
  1. bg-background (page color)
  2. .bg-grid opacity-[0.4]
  3. radial-glow-lagoon — absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-70
  4. radial-glow-coral — absolute bottom-0 right-0 w-[600px] h-[400px] opacity-50
  5. Logo watermark — absolute center, opacity-[0.04] dark:opacity-[0.06], size ~w-[400px]
  6. Bottom fade — absolute bottom-0 h-32 bg-gradient-to-t from-background to-transparent

Section label badge:
  inline-flex items-center gap-2
  rounded-full border border-border/60 bg-muted/50
  px-4 py-1.5 text-xs font-sans font-medium text-lagoon

Hero headline:
  font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance
  Gradient span: bg-gradient-to-r from-[hsl(199,89%,48%)] to-[hsl(199,89%,65%)] bg-clip-text text-transparent
  Underline accent: absolute wavy line in coral below key word

Hero subtitle:
  text-lg sm:text-xl font-sans text-secondary max-w-2xl mx-auto text-pretty

CTA row:
  Primary: bg-lagoon text-white rounded-full px-8 h-12 font-sans font-medium shadow-lg shadow-lagoon/20
  Secondary: variant=outline rounded-full px-8 h-12 border-border/60 font-sans font-medium

Stats row (below CTAs):
  mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6
  Value: text-2xl sm:text-3xl font-bold font-display text-text-primary
  Label: text-xs font-sans text-text-supporting
```

---

### 6.3 Feature / Service Cards

```
Container:
  rounded-2xl border border-border bg-card p-6
  group relative overflow-hidden
  hover: border-border-strong bg-surface-elevated transition-colors

Icon box:
  h-10 w-10 rounded-xl bg-lagoon/10 text-lagoon (or bg-coral/10 text-coral for alternates)
  flex items-center justify-center

Icon:
  h-5 w-5

Title:
  text-sm font-sans font-semibold text-text-primary mt-4

Body:
  text-sm font-sans leading-relaxed text-text-secondary mt-2

Bottom accent (hover reveal):
  absolute inset-x-0 bottom-0 h-px
  bg-gradient-to-r from-transparent via-lagoon/40 to-transparent
  opacity-0 group-hover:opacity-100 transition-opacity

Grid:
  grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto
```

---

### 6.4 Pricing Cards

```
Card container (default tier):
  rounded-2xl border border-border bg-card p-8
  flex flex-col h-full
  hover: border-border-strong bg-surface-elevated transition-colors

Card container (featured tier — GRAND BAIE):
  rounded-2xl border border-lagoon/40 bg-card p-8
  flex flex-col h-full relative overflow-hidden
  glow-lagoon

Top accent line (featured only):
  absolute inset-x-0 top-0 h-px
  bg-gradient-to-r from-transparent via-lagoon/60 to-transparent

City label (section overline):
  text-xs font-bold font-display tracking-[0.14em] uppercase text-lagoon (or coral for FLIC EN FLAC)

Package tagline:
  text-lg font-semibold font-display text-text-primary mt-1

Price:
  text-4xl font-bold font-display tracking-tight text-text-primary mt-4
  Prefixed by: text-xl font-semibold text-text-supporting  →  "Rs"

Price label / audience:
  text-xs font-sans font-medium uppercase tracking-[0.08em] text-text-supporting mt-1

Feature list:
  mt-7 space-y-2.5
  Item: flex items-start gap-2
  Check: CheckCircle2 h-4 w-4 text-lagoon shrink-0 mt-0.5
  Text: text-sm font-sans text-text-secondary

CTA button (default tier):
  variant=outline rounded-full w-full font-sans font-medium mt-8

CTA button (featured tier):
  bg-foreground text-background rounded-full w-full font-sans font-medium mt-8

"Most Popular" badge (featured tier):
  absolute -top-3 left-1/2 -translate-x-1/2
  rounded-full bg-coral px-4 py-1 text-[11px] font-sans font-semibold text-white

Grid:
  grid md:grid-cols-3 gap-6 max-w-5xl mx-auto
```

---

### 6.5 Testimonial Cards

```
Container:
  rounded-2xl border border-border bg-card p-6
  hover: border-border-strong bg-surface-elevated transition-colors

Quote icon:
  Quote h-8 w-8 text-lagoon/15 mb-4

Star rating:
  flex gap-0.5
  Star: h-3.5 w-3.5 fill-coral text-coral
  (star color is always coral — never yellow/amber)

Quote text:
  text-sm font-sans leading-relaxed text-text-secondary

Divider:
  border-t border-border-subtle pt-4 mt-6

Avatar:
  h-9 w-9 rounded-full bg-gradient-to-br from-lagoon/20 to-coral/20
  initials: text-xs font-bold font-display text-text-primary

Name:
  text-sm font-sans font-semibold text-text-primary ml-3

Role:
  text-xs font-sans text-text-supporting

Grid:
  grid md:grid-cols-2 lg:grid-cols-3 gap-4
```

---

### 6.6 CTA Section

```
Container:
  relative overflow-hidden py-24 sm:py-32

Background:
  bg-surface-elevated
  + .bg-grid opacity-30
  + radial-glow-lagoon opacity-50 top-center
  + radial-glow-coral opacity-30 bottom-right

Badge:
  same as hero badge pattern (rounded-full, lagoon border, text-lagoon)

Headline:
  font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-text-primary

Subtitle:
  text-lg font-sans text-text-secondary text-pretty max-w-2xl mx-auto

CTA row:
  Primary: bg-lagoon text-white rounded-full px-8 h-12 font-sans font-medium
  Secondary: variant=outline rounded-full px-8 h-12 border-border/60 font-sans font-medium

Support note (e.g. "No commitment required"):
  text-xs font-sans text-text-supporting mt-6
```

---

### 6.7 Footer

```
Container:
  relative border-t border-border-subtle pt-16 pb-12

Top gradient accent:
  absolute top-0 inset-x-0 h-px
  bg-gradient-to-r from-transparent via-lagoon/20 to-transparent

Logo block:
  logo_normal_transparent.png h-7 + "bienzoli" text-base font-semibold tracking-[0.03em] lowercase

Tagline:
  max-w-xs text-sm font-sans leading-relaxed text-text-secondary mt-4

Column category heading:
  text-xs font-sans font-semibold uppercase tracking-widest text-text-supporting mb-4

Links:
  text-sm font-sans text-text-secondary hover:text-text-primary transition-colors duration-200

Grid:
  grid gap-12 sm:grid-cols-2 lg:grid-cols-4

Bottom bar:
  border-t border-border-subtle pt-8 mt-12
  flex flex-col sm:flex-row items-center justify-between gap-4

Copyright:
  text-xs font-sans text-text-supporting

"Made in Mauritius" note:
  text-xs font-sans text-text-supporting (optional: with MU flag emoji)

Mandatory attribution:
  "Built with care by bienzoli" in client sites — text-xs font-sans text-text-supporting
  linking to https://bienzoli.com
```

---

### 6.8 Buttons

```
Primary (lagoon background):
  bg-lagoon text-white rounded-full font-sans font-medium
  hover: bg-lagoon/90
  + shadow-lg shadow-lagoon/20 (on hero/CTA usage only)

Primary (dark background):
  bg-foreground text-background rounded-full font-sans font-medium
  hover: bg-foreground/90
  (used in: navbar "Get Started", featured pricing CTA)

Secondary (coral background):
  bg-coral text-white rounded-full font-sans font-medium
  hover: bg-coral/90
  (use sparingly — secondary CTAs only)

Outline:
  border border-border/60 bg-transparent text-text-primary rounded-full font-sans font-medium
  hover: bg-surface-elevated border-border-default

Ghost:
  bg-transparent text-text-secondary rounded-lg font-sans font-medium
  hover: bg-surface-elevated text-text-primary

Icon button (square target):
  rounded-lg (NOT rounded-full)
  hover: bg-surface-elevated

Sizes:
  sm:  h-8 px-4 text-xs
  md:  h-10 px-6 text-sm (default)
  lg:  h-12 px-8 text-base

Never mix button shapes in the same component (all full or all square, not mixed).
```

---

### 6.9 Badges / Tags

```
Section label badge (above headlines):
  inline-flex items-center gap-2 rounded-full
  border border-border/60 bg-muted/50
  px-3 py-1 text-xs font-sans font-medium text-lagoon
  (optional leading icon: h-3 w-3)

Accent badge (AI section, secondary emphasis):
  border border-coral/30 bg-coral/5 text-coral

Card metadata tag:
  rounded-full border border-border/60 bg-muted/30
  px-2.5 py-0.5 text-[11px] font-sans font-medium text-text-supporting

Pricing "Most Popular":
  absolute positioning (see Pricing Cards spec above)
  bg-coral text-white rounded-full
  px-4 py-1 text-[11px] font-sans font-semibold
```

---

### 6.10 Form Elements

```
Label:
  text-sm font-sans font-medium text-text-primary
  Required indicator: text-destructive (append *)

Input (text, email, url):
  h-10 w-full rounded-md border border-border bg-background px-3
  text-sm font-sans text-text-primary placeholder:text-text-supporting
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon focus-visible:ring-offset-2
  hover: border-border-strong (via CSS hover state)
  error: border-destructive focus-visible:ring-destructive

Textarea:
  same border and focus as Input
  min-h-[120px] resize-y py-2

Select:
  same border and focus as Input
  font-sans text-sm

Error text:
  text-xs font-sans text-destructive mt-1

Form grid:
  grid gap-6 (single column default)
  sm:grid-cols-2 for paired fields (name + email)

Submit button:
  bg-lagoon text-white rounded-full w-full h-12 text-base font-sans font-medium
```

---

### 6.11 FAQ Accordion

```
Item:
  border-b border-border-subtle

Trigger:
  text-sm sm:text-base font-sans font-medium text-text-primary text-left py-4
  hover: text-lagoon
  [data-state=open]: text-lagoon

Chevron icon:
  h-4 w-4 text-text-supporting shrink-0
  [data-state=open]: rotate-180 transform transition-transform

Content:
  text-sm font-sans leading-relaxed text-text-secondary pb-4 pt-0

Max width:
  max-w-3xl mx-auto
```

---

### 6.12 Process / Steps Cards

```
Container:
  rounded-2xl border border-border bg-card overflow-hidden group
  hover: border-border-strong bg-surface-elevated transition-colors

Image header:
  relative h-40 overflow-hidden
  Image: w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity scale-105

Icon on image:
  absolute top-4 left-4
  h-10 w-10 rounded-xl border border-border/60 bg-background/80 backdrop-blur-sm
  icon: h-5 w-5 text-lagoon

Content block:
  p-6

Step label (overline):
  text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-coral

Title:
  text-lg font-semibold font-display text-text-primary mt-2

Body:
  text-sm font-sans leading-relaxed text-text-secondary mt-2

Grid:
  grid md:grid-cols-3 gap-6
```

---

### 6.13 Portfolio / Project Cards

```
Container:
  rounded-2xl border border-border bg-card overflow-hidden group
  hover: border-lagoon/30 bg-surface-elevated transition-colors

Browser chrome header:
  border-b border-border-subtle px-5 py-3
  flex items-center gap-3

Traffic light dots:
  3 × h-2.5 w-2.5 rounded-full bg-text-supporting/20

URL bar:
  rounded-md bg-muted/50 px-3 py-1 text-[11px] font-mono text-text-supporting
  flex-1

Arrow icon:
  h-3.5 w-3.5 text-text-supporting opacity-0 group-hover:opacity-100 transition-opacity

Preview image:
  w-full h-48 object-cover object-top

Content block:
  p-6

Title:
  text-lg font-semibold font-display text-text-primary group-hover:text-lagoon transition-colors

Client:
  text-xs font-sans text-text-supporting mt-0.5

Description:
  text-sm font-sans leading-relaxed text-text-secondary mt-3 line-clamp-2

Tags row:
  flex flex-wrap gap-1.5 mt-4
  Tag: rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[11px] font-sans font-medium text-text-supporting

Bottom accent line:
  h-px w-full bg-gradient-to-r from-transparent via-lagoon/0 to-transparent
  group-hover:via-lagoon/50 transition-all duration-300

Grid:
  grid md:grid-cols-2 gap-4
```

---

## § 7 — Logo System

### Available Logo Files

| File | Background | Use Case |
|---|---|---|
| `logo_normal_transparent.png` | Transparent | Navbar, footer — default in all site contexts |
| `logo_normal_whiteback.png` | White | OG/Twitter meta images, PDF proposals, print |
| `logo_darkback.png` | Dark | Dark section overrides, social media cards (dark) |
| `logo_blue.png` | Lagoon tint | Lagoon-accented contexts (avoid — can clash) |
| `logo_orange.png` | Coral tint | Coral-accented contexts (avoid — can clash) |

### Wordmark Specification

The bienzoli wordmark when rendered as text (not image):

```
Font:           Space Grotesk (font-display)
Weight:         600 (font-semibold)
Size:           text-lg (18px) in navbar and footer
Case:           Always lowercase — "bienzoli" never "Bienzoli" or "BIENZOLI"
Letter-spacing: tracking-[0.03em] (slight open spacing)
Color:          text-foreground (adapts to light/dark automatically)
```

### Logo Clearspace

Minimum clearspace on all four sides equal to the cap-height of the "b" in "bienzoli" at the rendered size. At navbar size (32px logo height), this is approximately 8px clearspace on all sides.

Never clip the logo. Never place the logo over a busy background without a backing overlay element.

### Approved Combinations

1. **Icon + wordmark text** (navbar, footer — standard usage)
2. **Icon alone** (favicon, app icon, 32px or smaller contexts)
3. **Wordmark text alone** (proposals and invoices where the icon has already been shown in a header)
4. **Full image lockup** (`logo_normal_transparent.png` — use when in doubt)

### Logo Don'ts

1. Never render in all-caps: `BIENZOLI`
2. Never add drop shadow, outline, or CSS filter to the logo
3. Never place on a busy background without a semi-opaque backing element
4. Never use `logo_blue.png` or `logo_orange.png` in standard contexts — they exist for print edge cases only
5. Never resize the icon to below 16px (it becomes illegible)
6. Never add the tagline text directly attached to the logo lockup (tagline runs below the logo block with clear separation)

---

## § 8 — Brand Voice

### Core Tone

Sharp friend who is also a great engineer. Confident but not arrogant. Professional but not corporate. Local but not informal.

### The Register Spectrum

```
Too corporate:   "We leverage cutting-edge digital solutions to synergize your online presence"
Too casual:      "yo we build sick websites lol check us out"
bienzoli voice:  "Your website, live in 48 hours. Built to convert, not just to look good."
```

### Vocabulary Table

| Say | Never Say |
|---|---|
| "Built with care" | "Handcrafted" |
| "We build" | "We leverage / utilize / deliver" |
| "Modern website" | "Cutting-edge digital presence" |
| "Fast" / "In 48 hours" | "Lightning-fast" / "Blazing" / "Instant" |
| "AI-powered features" | "AI-driven synergy" / "AI-first approach" |
| "Grow your business" | "Maximize your ROI" / "Supercharge your growth" |
| "Rs 15,000" | "Only Rs 15,000!" |
| "For freelancers and small businesses" | "Perfect for everyone!" |
| "Here's what you get" | "Features include..." |
| "Built in Mauritius" | "Made with Mauritian pride!" |
| "We" | "I" (even though it's one person — the brand is the agency) |
| "Get a quote" | "Buy now" / "Order" |
| "Talk to us on WhatsApp" | "Contact our sales team" |

### CTA Language Patterns

**Primary CTAs (high-intent actions):**
- "Get started on WhatsApp"
- "Request a free quote"
- "Book a consultation"

**Secondary CTAs (exploration):**
- "See our work"
- "View pricing"
- "How it works"
- "Learn more about [specific feature]" (with context — never standalone "Learn more")

**Micro-copy (button labels):**
- "Get Started" (navbar)
- "Get a Quote" (hero)
- "Start Your Project" (pricing cards)
- "Talk to Us" (footer / contact)

**Never:**
- "Click here"
- "Learn more" (without following context)
- "Buy now"
- "Subscribe"
- "Try for free" (we don't have a free tier)

### Pricing Format Rules

- Format: `Rs X,XXX` — space after Rs, comma separating thousands
- `Rs 8,000` / `Rs 18,000` / `Rs 35,000` / `Rs 60,000+`
- Monthly: `Rs 800/mo` (slash, lowercase mo)
- Never: `Rs8,000` (no space), `MUR 8,000` (wrong prefix), `8,000 rupees` (word form)

### Kreol Voice

Used for: TikTok hooks, WhatsApp outreach to Mauritian small business owners
Never used in: proposals, contracts, invoices, website body copy, formal communications

Example hooks:
- "To bizness merit enn bon website. Mo fer li pou twa."
- "Mo build website ki fer bizness grandi."
- "48 ler — to site live, to kliyan satisfait."

---

## § 9 — Application Contexts

### 9.1 bienzoli.com

**Mode:** Light primary, dark supported
**Max content width:** `max-w-7xl` (1280px)
**Page gutter:** `px-6` (24px mobile-first, same on desktop)
**Section rhythm (home page):** Hero → Features → AI Section → How It Works → Projects → Pricing → FAQ → CTA → Footer

**Rules:**
- No full-width colored section backgrounds. Sections live on the page background color. Depth comes from card borders, not alternating section colors.
- Every section has a consistent top-padding anchor (py-24 sm:py-32)
- The hero is the only exception — it uses full-bleed background effects

### 9.2 Social Media

**Instagram square (portfolio posts):** 1080×1080px
**Instagram stories/reels:** 1080×1920px
**LinkedIn post image:** 1200×628px
**TikTok overlays:** 1080×1920px (video)

**Social card style:**
- Dark background (`--surface-base` in dark mode = navy `hsl(225 16% 5%)`)
- lagoon or coral accent for headline highlights
- Space Grotesk for headline text
- Logo icon (not full wordmark) in bottom-right corner at approx 48px

**Why dark for social:** High-contrast, premium look. Light-mode social cards are less visually impactful in feeds.

### 9.3 Client Proposals

**Format:** A4 portrait, PDF
**Background:** White
**Typography:** Space Grotesk for section headings, DM Sans for body
**Accent:** Lagoon for headings, dividers, callout boxes, table header rows
**Logo:** `logo_normal_whiteback.png` in page header, top-left
**Pricing tables:** Lagoon header row (`bg-lagoon text-white`), alternating white/off-white rows
**Footer of each page:** "bienzoli — vincedotcode ltd" with proposal number and date

### 9.4 Invoices

**Legal entity name:** vincedotcode ltd (BRN registered, Mauritius)
**Client-facing brand:** bienzoli
**Logo:** `logo_normal_whiteback.png` in header
**Currency:** Always `Rs X,XXX` — never USD equivalent unless agreed
**Style:** Clean, minimal, no decorative glows or grid patterns — this is a legal document
**Footer:** Bank transfer details, MCB Juice number, payment terms

### 9.5 Email Signature

**Format:**
```
[Name]
bienzoli — vincedotcode ltd

Email  |  WhatsApp: +230 XXXX XXXX
bienzoli.com
```

**HTML signature:** Logo icon + "bienzoli" wordmark text, website link. No heavy styling. Prefer plain text for cold outreach.

---

## § 10 — What This Is Not

An explicit rejection list. Any future output that violates these rules must be corrected before delivery.

### Visual Rejections

- **Not gradient-heavy.** No rainbow gradients, no multi-stop decorative gradients. The only approved gradient uses are: the two `radial-glow-*` background effects (hero, CTA), the `via-lagoon/40` bottom-edge reveal on feature cards, and the top accent line on featured pricing cards. That is the complete list.
- **Not dark-mode-first.** Light mode is the primary design. Dark mode is supported but secondary. All PageSpeed testing and visual QA is performed in light mode.
- **Not a shadow-based design.** No `shadow-md`, `shadow-xl`, or `shadow-2xl` on any structural element. Structure uses borders and surface shifts.
- **Not a radius-inconsistent design.** Never mix `rounded-lg` and `rounded-2xl` buttons in the same section. The button shape is always `rounded-full`. The card shape is always `rounded-2xl`.
- **Not icon-heavy.** Icons are used purposefully — one icon per feature item maximum. No decorative icon clusters, no icon grids, no icon-as-art patterns.
- **Not Inter, Poppins, Nunito, or generic SaaS fonts.** Space Grotesk (display) + DM Sans (body) + JetBrains Mono (mono). These three fonts. No others.
- **Not WordPress.** No page builder, no template-bought aesthetic, no plugin-dependent functionality.

### Content Rejections

- "Best web agency in Mauritius" — unsubstantiated superlative. Never.
- "Cheap websites" — the word "cheap" never appears in bienzoli output.
- "We do everything" — we do web development and AI integration. Not photography, not logo design from scratch, not print.
- Hype language: "revolutionary", "game-changing", "disrupting", "bleeding-edge", "world-class"
- Empty CTA: "Click here", standalone "Learn more"
- Feature-first copy without business outcome: "We use Next.js" without "so your site loads in under 1 second"

### Technical Rejections

- No hardcoded hex or RGB in JSX. CSS variables via Tailwind tokens only.
- No inline `style={}` attributes except on Framer Motion `animate` values.
- No more than 3 Google Fonts. DM Sans + Space Grotesk + JetBrains Mono is the maximum.
- No `emerald-*`, `blue-*`, `green-*`, `yellow-*` Tailwind color classes. Token system only.
- No below-90 PageSpeed score. Any site that drops below 90 requires remediation before delivery.
- No `console.log` in production code.
- No WordPress, Wix, Squarespace, Webflow, or no-code platforms for client sites.
- No unoptimized images (always use `next/image` with appropriate `sizes` and `priority` attributes).

---

*bienzoli Design System v1.0 — February 2026*
*Maintained by AGENT 01 — Brand Guardian*
*Update this document when the brand evolves. Log changes in logs/decisions.md*
