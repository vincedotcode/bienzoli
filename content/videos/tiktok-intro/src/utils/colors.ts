/**
 * bienzoli Design System — Video Color Tokens
 *
 * All values extracted from docs/brand/design-system.md
 * Dark-mode palette used for social video (§9.2: dark background for social)
 */

export const colors = {
  // Surface elevation (dark mode)
  bg:               'hsl(225, 16%, 5%)',   // --surface-base dark
  surfaceRaised:    'hsl(224, 14%, 8%)',   // --surface-raised dark
  surfaceElevated:  'hsl(224, 14%, 11%)',  // --surface-elevated dark

  // Brand primaries
  lagoon:           'hsl(199, 89%, 48%)',  // primary brand cyan #10b4e8
  lagoonDim:        'hsla(199, 89%, 48%, 0.6)',
  lagoonMute:       'hsla(199, 89%, 48%, 0.12)',
  lagoonBorder:     'hsla(199, 89%, 48%, 0.30)',
  coral:            'hsl(24, 94%, 53%)',   // secondary brand orange #f87334
  coralDim:         'hsla(24, 94%, 53%, 0.6)',

  // Text hierarchy (dark mode)
  textPrimary:      'hsl(210, 20%, 95%)',  // --text-primary dark  (near white)
  textSecondary:    'hsl(210, 16%, 72%)',  // --text-secondary dark (light gray)
  textSupporting:   'hsl(218, 11%, 50%)',  // --text-supporting dark (medium gray)

  // Borders (dark mode)
  borderDefault:    'hsl(223, 13%, 14%)',  // --border-default dark
  borderStrong:     'hsl(223, 13%, 22%)',  // --border-strong dark

  // Utility
  white:            '#ffffff',
  black:            '#000000',
  transparent:      'transparent',
} as const
