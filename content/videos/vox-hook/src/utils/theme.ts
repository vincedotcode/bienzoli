/**
 * bienzoli Design System — Vox Hook Video Tokens
 *
 * Dark-mode palette (§9.2 of design-system.md — dark bg for social video)
 * All values extracted from docs/brand/design-system.md
 */

// ─── Colors ────────────────────────────────────────────────────────────────
export const colors = {
  // Surface (dark mode)
  bg:              'hsl(225, 16%, 5%)',
  surfaceRaised:   'hsl(224, 14%, 8%)',
  surfaceElevated: 'hsl(224, 14%, 11%)',

  // Brand primaries
  lagoon:          'hsl(199, 89%, 48%)',   // #10b4e8 — primary cyan
  lagoonDim:       'hsla(199, 89%, 48%, 0.6)',
  lagoonMute:      'hsla(199, 89%, 48%, 0.12)',
  lagoonBorder:    'hsla(199, 89%, 48%, 0.30)',
  lagoonGlow:      'hsla(199, 89%, 48%, 0.20)',
  coral:           'hsl(24, 94%, 53%)',    // #f87334 — secondary orange
  coralDim:        'hsla(24, 94%, 53%, 0.6)',
  coralMute:       'hsla(24, 94%, 53%, 0.12)',

  // Text (dark mode)
  textPrimary:     'hsl(210, 20%, 95%)',
  textSecondary:   'hsl(210, 16%, 72%)',
  textSupporting:  'hsl(218, 11%, 50%)',

  // Borders (dark mode)
  borderDefault:   'hsl(223, 13%, 14%)',
  borderStrong:    'hsl(223, 13%, 22%)',

  // Utility
  white:           '#ffffff',
  black:           '#000000',
  pure:            '#000000',
} as const

// ─── Typography ─────────────────────────────────────────────────────────────
export const fonts = {
  display: '"Space Grotesk", sans-serif',  // headlines, overlines
  body:    '"DM Sans", sans-serif',         // body copy, labels
  mono:    '"JetBrains Mono", monospace',   // URL bars, code
} as const

// ─── Type scale (px) for 1080×1920 canvas ────────────────────────────────
export const typeScale = {
  hero:    160,  // Scene 1 hook word
  stat:    280,  // Scene 2 stat number
  heading: 120,  // Scene headlines
  sub:     56,   // Scene sub-copy
  body:    44,   // Scene body text
  label:   32,   // Badges, overlines
  tag:     24,   // Small tags
} as const

// ─── Spacing (px on 1080-wide canvas) ────────────────────────────────────
export const spacing = {
  safeTop:    120,   // TikTok safe zone top
  safeBottom: 200,   // TikTok safe zone bottom
  sidePad:    80,    // Left/right padding
  gutter:     40,    // Between elements
} as const
