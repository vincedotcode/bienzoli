/**
 * bienzoli Design System — Video Font Tokens
 *
 * Fonts loaded via @remotion/google-fonts.
 * Must be called at module level (not inside components).
 *
 * Font stack from docs/brand/design-system.md §2:
 *   Display  → Space Grotesk 500/600/700  (headlines h1/h2/h3)
 *   Body     → DM Sans 400/500/600        (all body copy, labels)
 *   Mono     → JetBrains Mono 400/500     (overlines, counters, URL bars)
 */

import { loadFont as loadSpaceGrotesk } from '@remotion/google-fonts/SpaceGrotesk'
import { loadFont as loadDmSans } from '@remotion/google-fonts/DMSans'
import { loadFont as loadJetBrainsMono } from '@remotion/google-fonts/JetBrainsMono'

export const { fontFamily: displayFont } = loadSpaceGrotesk('normal', {
  weights: ['500', '600', '700'],
  subsets: ['latin'],
})

export const { fontFamily: bodyFont } = loadDmSans('normal', {
  weights: ['400', '500', '600'],
  subsets: ['latin'],
})

export const { fontFamily: monoFont } = loadJetBrainsMono('normal', {
  weights: ['400', '500'],
  subsets: ['latin'],
})
