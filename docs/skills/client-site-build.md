# Skill: Client Site Build

**Owner:** AGENT 04 — Platform Engineer
**Reviewer:** AGENT 01 — Brand Guardian
**Coordinator:** AGENT 05 — Client Success
**Purpose:** Repeatable, complete process for delivering a client website from signed contract to archived portfolio entry. Any agent in a cold session can follow this process and produce the same result.

---

## Phase 0 — Prerequisites (Before Build Starts)

Before writing a single line of code, verify all of these are true:

- [ ] Contract signed by client (from `docs/business/contract-template.md`)
- [ ] Deposit received and confirmed (50% for Flic en Flac/Port Louis/Grand Baie, 30% for Le Morne)
- [ ] `docs/clients/[name]/brief.md` exists with complete requirements
- [ ] `docs/clients/[name]/status.md` created with full timeline
- [ ] `logs/clients.md` updated with project entry
- [ ] Client assets collected or confirmed incoming: logo, photos, copy, colors
- [ ] Delivery date agreed and logged in status.md

If any of these are missing, do NOT start the build. Resolve them first.

---

## Phase 1 — SETUP

**1.1 Create Project Folder**
```
clients/[client-name]/
```

**1.2 Initialize Next.js Project**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

**1.3 Install Required Dependencies**
```bash
npm install framer-motion @radix-ui/react-slot class-variance-authority clsx tailwind-merge
npx shadcn@latest init
```

**1.4 Configure Design System**
- Copy font imports from main project `app/layout.tsx` (Space Grotesk, DM Sans, JetBrains Mono)
- Copy CSS tokens from main project `app/globals.css` (lagoon, coral, surface, text, border tokens)
- Copy Tailwind config extensions from main project `tailwind.config.ts` (font families, color tokens)
- Apply `defaultTheme="light"` to next-themes ThemeProvider in layout

**1.5 Configure Environment**
Create `.env.local`:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
# Add API keys here as needed
```
Add to `.gitignore`: `.env.local`, `node_modules`, `.next`

**1.6 Set Up Vercel Project**
- Create new Vercel project linked to this directory
- Add environment variables to Vercel dashboard
- Note the preview deployment URL

---

## Phase 2 — DESIGN

**2.1 Read the Brief**
Read `docs/clients/[name]/brief.md` fully. Know:
- Package tier (Flic en Flac / Port Louis / Grand Baie / Le Morne)
- Required sections/pages
- Client industry, brand colors, tone preference
- Key CTA: WhatsApp / contact form / booking / phone call

**2.2 Read the Design System**
Read `docs/brand/design-system.md` fully. Apply:
- Token-only colors (lagoon, coral, surface-*, text-*, border-*)
- Font roles (display for headings, sans for body, mono for code/labels)
- Depth strategy (borders-first, no shadow elevation)
- Light mode as primary

**2.3 Component Architecture (by tier)**

FLIC EN FLAC (single page):
- `<Navbar />` — logo + WhatsApp button
- `<Hero />` — headline, subtext, primary CTA
- `<Services />` — 3–6 service cards
- `<Contact />` — WhatsApp link + basic contact info
- `<Footer />` — bienzoli attribution

PORT LOUIS (single page, 5–7 sections):
- `<Navbar />` — logo, nav links, CTA button
- `<Hero />` — visual hero, headline, CTA
- `<About />` — who they are, story or mission
- `<Services />` — service cards with descriptions
- `<Gallery />` (if applicable) — image grid
- `<Testimonials />` — 3–5 client quotes
- `<Contact />` — form + WhatsApp + map embed
- `<Footer />` — nav, social links, bienzoli attribution

GRAND BAIE (multi-page, up to 5 pages):
- All PORT LOUIS sections across 5 pages: Home, About, Services, Portfolio/Gallery, Contact
- Plus: AI chatbot component (see `docs/skills/ai-chatbot-deploy.md`)
- Plus: WhatsApp lead notification integration

LE MORNE (custom):
- Architecture defined per project in `docs/clients/[name]/brief.md`

**2.4 Responsive Strategy**
- Mobile-first: build at 375px, scale up
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Test at every major breakpoint before review

---

## Phase 3 — CONTENT INTEGRATION

**3.1 Text Content**
- Client provides copy. If not provided, use placeholder `[PLACEHOLDER: X]` and flag in status.md.
- Never invent business details (pricing, hours, services) — use exact client-provided information.

**3.2 Images**
- Use Next.js `<Image />` component (automatic WebP, lazy loading)
- Specify explicit `width` and `height` on all images to prevent CLS
- Use `sizes` prop for responsive images

**3.3 WhatsApp Integration**
```tsx
const WHATSAPP_URL = `https://wa.me/230${PHONE_NUMBER}?text=${encodeURIComponent("Hi, I'd like to enquire about...")}`;
```
- Floating WhatsApp button on all pages (bottom-left, green background)
- Include phone number in contact section

**3.4 Google Analytics 4**
```tsx
// app/layout.tsx
import Script from 'next/script'
// Add GA script with afterInteractive strategy
```

---

## Phase 4 — SEO AND TECHNICAL

**4.1 Metadata (every page)**
```tsx
export const metadata: Metadata = {
  title: '[Business Name] — [Page Title]',
  description: '[150 char max description]',
  openGraph: {
    title: '[Business Name] — [Page Title]',
    description: '[150 char max]',
    images: ['/og-image.jpg'],
    url: 'https://[domain]',
  },
}
```

**4.2 OG Image**
Generate 1200×630px OG image (request from Social Card Generator Agent 10) and place at `/public/og-image.jpg`.

**4.3 Sitemap**
Create `app/sitemap.ts` with all pages listed.

**4.4 robots.txt**
Create `app/robots.ts` allowing all crawlers, pointing to sitemap.

**4.5 Favicon**
Place `favicon.ico` in `/app/` directory (Next.js App Router convention).

---

## Phase 5 — REVIEW

**5.1 Internal Quality Check (before sending to client)**

- [ ] PageSpeed Insights — mobile ≥ 90, desktop ≥ 90. Screenshot both.
- [ ] Responsive QA — no layout issues at 375px, 768px, 1280px
- [ ] Zero CLS — all images have explicit dimensions
- [ ] All forms submit correctly
- [ ] All WhatsApp links open correct pre-filled message
- [ ] Metadata complete on every page
- [ ] sitemap.xml and robots.txt accessible
- [ ] Google Analytics fires on page load
- [ ] bienzoli footer attribution present with correct link
- [ ] No hardcoded hex values in components
- [ ] Font roles correct (display on headings, sans on body)
- [ ] 404 page functional

**5.2 Brand Guardian Review**
Pass preview link to Agent 01 (Brand Guardian) before sending to client.

**5.3 Send Preview to Client**
Pass to Agent 05 (Client Success) with: preview URL, summary of what was built, any placeholders awaiting client content, revision deadline.

---

## Phase 6 — REVISE

- Client submits consolidated feedback (one list)
- Implement within 48 hours
- Track revision round number in `docs/clients/[name]/status.md`
- If revision limit reached, flag to Agent 05 — no extra revisions without authorization

---

## Phase 7 — DEPLOY

**7.1 Production Deployment**
Deploy to Vercel (`vercel --prod` or via git push to main).

**7.2 Custom Domain**
- Add domain in Vercel dashboard
- Update DNS: CNAME `www` → `cname.vercel-dns.com`
- Verify SSL certificate active

**7.3 Post-Deployment Verification**
- [ ] Custom domain resolves correctly
- [ ] SSL active (https://)
- [ ] www redirect working
- [ ] PageSpeed on production URL ≥ 90
- [ ] GA fires on production domain

---

## Phase 8 — DELIVER

Notify Agent 05 (Client Success) with:
- Production URL
- Any login credentials (if CMS/admin)
- Post-launch instructions
- Balance invoice trigger

Update `docs/clients/[name]/status.md` with delivery date.
Update `logs/clients.md` with balance payment pending.

---

## Phase 9 — ARCHIVE

After full payment confirmed:
1. Case study: run `docs/skills/portfolio-case-study.md` process
2. Social cards: trigger Agent 10
3. Drive sync: trigger Agent 09
4. Portfolio: add to bienzoli.com
5. Status: mark Closed in status.md and clients.md

---

## Exit Criteria

Project fully complete when ALL are true:
- [ ] Site live on production domain
- [ ] PageSpeed 90+ mobile AND desktop (production URL)
- [ ] All pages responsive and functional
- [ ] Full payment received
- [ ] Case study created
- [ ] Social cards requested
- [ ] status.md marked Closed
- [ ] clients.md updated with final revenue
