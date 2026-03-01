/**
 * Scene 4 — The Proof (120 frames, 4.0s)
 *
 * ComparisonBar: Typical agency 42 vs bienzoli 97 PageSpeed.
 * Social proof badge with "10+ businesses in Mauritius".
 *
 * Timing (seq-relative):
 *   frame 0–14 — header fades in
 *   frame 14   — first bar starts (pageTurn SFX)
 *   frame 30   — second bar starts (mouseClick SFX)
 *   frame 60   — bienzoli bar ends → whip SFX
 *   frame 80   — badge appears (uiSwitch SFX)
 *   frame 108–120 — fade out
 */

import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'
import { colors, fonts, typeScale, spacing } from '../utils/theme'
import { MotionGrid } from '../components/MotionGrid'
import { ComparisonBar } from '../components/ComparisonBar'

export const Scene4Proof: React.FC = () => {
  const frame = useCurrentFrame()

  const sceneOpacity = interpolate(frame, [0, 12, 108, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  const headerOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })
  const headerY = interpolate(frame, [0, 18], [28, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  const badgeOpacity = interpolate(frame, [80, 96], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })
  const badgeY = interpolate(frame, [80, 98], [20, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, opacity: sceneOpacity }}>
      <MotionGrid opacity={0.3} speed={0.2} />

      {/* Overline */}
      <div style={{
        position: 'absolute', top: spacing.safeTop,
        left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: headerOpacity, transform: `translateY(${headerY}px)`,
      }}>
        <span style={{
          fontFamily: fonts.mono, fontSize: typeScale.tag,
          color: colors.lagoon, letterSpacing: 6, textTransform: 'uppercase',
        }}>
          THE DIFFERENCE
        </span>
      </div>

      {/* Headline */}
      <div style={{
        position: 'absolute', top: spacing.safeTop + 80,
        left: spacing.sidePad, right: spacing.sidePad,
        opacity: headerOpacity, transform: `translateY(${headerY}px)`,
      }}>
        <span style={{
          fontFamily: fonts.display, fontWeight: 800,
          fontSize: typeScale.heading * 0.72, color: colors.textPrimary,
          letterSpacing: -3, lineHeight: 1.05,
        }}>
          PageSpeed scores don't lie.
        </span>
      </div>

      {/* Comparison bars — centred vertically */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: `0 ${spacing.sidePad}px`,
        transform: 'translateY(60px)',
      }}>
        <ComparisonBar
          startFrame={14}
          staggerFrames={16}
          barHeight={28}
          maxBarWidth={920}
          labelSize={typeScale.label}
          valueSize={typeScale.sub}
          suffix="/100"
          items={[
            { label: 'Typical WordPress agency', value: 42, color: colors.coralDim, glow: false },
            { label: 'bienzoli (Next.js)',        value: 97, color: colors.lagoon,   glow: true  },
          ]}
        />
      </div>

      {/* Social proof badge */}
      <div style={{
        position: 'absolute', bottom: spacing.safeBottom + 40,
        left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: badgeOpacity, transform: `translateY(${badgeY}px)`,
      }}>
        <div style={{
          border: `1.5px solid ${colors.lagoonBorder}`,
          borderRadius: 60, padding: '16px 40px',
          background: colors.lagoonMute,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{
            fontFamily: fonts.display, fontWeight: 800,
            fontSize: typeScale.label, color: colors.lagoon, letterSpacing: -1,
          }}>
            10+
          </span>
          <span style={{
            fontFamily: fonts.body, fontWeight: 500,
            fontSize: typeScale.label, color: colors.textSecondary,
          }}>
            businesses in Mauritius — live
          </span>
        </div>
      </div>
    </AbsoluteFill>
  )
}
