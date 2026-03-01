/**
 * Spring presets for bienzoli Vox Hook Video
 *
 * Usage: spring({ frame, fps, config: springs.SLAM })
 */

import { SpringConfig } from 'remotion'

export const springs: Record<string, SpringConfig> = {
  // SLAM — instant, no bounce. For hard text reveals.
  SLAM: {
    mass:      0.3,
    stiffness: 400,
    damping:   40,
    overshootClamping: true,
  },

  // SMOOTH — gentle, flowing. For scene fades and background elements.
  SMOOTH: {
    mass:      1.2,
    stiffness: 80,
    damping:   22,
    overshootClamping: false,
  },

  // SNAPPY — quick and decisive. For word-by-word KineticText entries.
  SNAPPY: {
    mass:      0.5,
    stiffness: 250,
    damping:   28,
    overshootClamping: false,
  },

  // BOUNCY — has personality. For highlight reveal and CTA pulse.
  BOUNCY: {
    mass:      0.6,
    stiffness: 160,
    damping:   10,
    overshootClamping: false,
  },

  // BAR — for ComparisonBar width animation. Smooth with slight settle.
  BAR: {
    mass:      1.0,
    stiffness: 90,
    damping:   20,
    overshootClamping: false,
  },
} as const
