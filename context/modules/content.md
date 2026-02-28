# Content Module — bienzoli

> Content calendar: `content/social/calendar.md`
> Case studies: `content/case-studies/*.md`
> Social channel guides: `content/social/tiktok/README.md`, `instagram/README.md`, `linkedin/README.md`

## Content Pillars (5-Pillar Rotation)

1. **Portfolio proof** — client results, before/after, live site reveals
2. **Technical authority** — "why Next.js beats WordPress", PageSpeed comparisons
3. **Local social proof** — Mauritian businesses, relatable context, Kreol hooks
4. **Education** — website tips for small business owners, "what makes a good site"
5. **Offers** — package transparency, limited-time positioning, monthly payment options

## Platform Strategy

### TikTok + Reels + Shorts (Primary)
- Hook format: "Watch me build a website in 48 hours for a [business type] in Mauritius"
- Build process timelapse, before/after website reveal, PageSpeed score comparison
- Kreol lines land well with local audience
- Target: Mauritian business owners aged 25–45

### Instagram
- Visual: portfolio screenshots, social card designs, before/after comparisons
- Stories: behind-the-scenes build process, client reactions
- Carousels: "5 reasons your Facebook page isn't enough", "What a Rs 8,000 website gets you"
- Reels: same as TikTok content, repurposed

### LinkedIn
- Positioning: Vince as a young technical leader building a systems-first agency in Mauritius
- Content: AI in Mauritius web development, Next.js vs WordPress performance data, client wins
- Tone: professional but direct — insights, not corporate speak
- Frequency: 2–3 posts/week

## Video Production (Remotion)

All videos: `content/videos/[video-name]/`

**Technical spec:**
- Format: 9:16 vertical (1080×1920), 30fps
- Colors + fonts: dark-mode tokens from `docs/brand/design-system.md` §9.2 (social = dark)
- Animation: `useCurrentFrame()` + `spring()` + `interpolate()` ONLY
- NO CSS transitions, NO Tailwind animation classes in Remotion
- Audio: 3-layer approach (ambient beat loop + frame-timed SFX + detail sounds)

**Current videos:**
- `content/videos/tiktok-intro/` — 15-second bienzoli brand intro (7 scenes)
  - Scenes: Hook → Problem → Transformation → Speed → Features → Price → CTA
  - Audio gate: set `AUDIO_ENABLED = true` in `TikTokIntro.tsx` after sourcing 8 audio files
  - See: `content/videos/tiktok-intro/public/audio/README.md`

**Commands:**
```bash
npm run video:preview   # Remotion Studio live preview (hot reload)
npm run video:render    # Export to out/tiktok-intro.mp4
```

**Config:** `remotion.config.ts` (project root) — public dir → `content/videos/tiktok-intro/public`

**Font modules:** `@remotion/google-fonts/SpaceGrotesk`, `DMSans`, `JetBrainsMono`

## Content-From-Client-Projects Workflow

Every delivered project creates:
1. Speed test comparison → `docs/skills/speed-test-comparison.md` process
2. Before/after screenshot set → post immediately to social
3. Case study → `content/case-studies/[client-name].md`
4. Social card pack (1:1, 16:9, 9:16) → `design/exports/social-cards/[client-name]/`
5. TikTok/Reels content (build timelapse or reveal)
6. LinkedIn post with project metrics

## Case Studies (Published)

| Client | File |
|--------|------|
| Nickel Sew | `content/case-studies/nickel-sew.md` |
| Ziyaad Ben Eydatoula | `content/case-studies/ziyaad-beneydatoula.md` |
| KeyGo | `content/case-studies/keygo.md` |
| DS Nails | `content/case-studies/ds-nails.md` |

## Voice Rules for Content

- Use "we" (agency voice), not "I"
- Confident but never arrogant
- Kreol hooks for local audience: relatable, warm, direct
- Never: empty superlatives, "best in Mauritius", price-focused positioning
- Always: results-focused, specific metrics (PageSpeed scores, delivery speed)
