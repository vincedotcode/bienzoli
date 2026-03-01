/**
 * Scene 2 — The Stat (120 frames, 4.0s)
 *
 * Giant "87%" counter — counts 0→87 over 60 frames.
 * Sub-copy lines stagger in after counter lands.
 *
 * Timing (seq-relative):
 *   frame 4  — counter starts counting
 *   frame 64 — counter lands at 87 (whip in SoundDesign)
 *   frame 82 — sub-copy line 1 fades in
 *   frame 94 — sub-copy line 2
 *   frame 106 — sub-copy line 3
 *   frame 112 — source tag
 *   frame 108–120 — fade out
 */

import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'
import { colors, fonts, typeScale, spacing } from '../utils/theme'
import { MotionGrid } from '../components/MotionGrid'
import { StatCounter } from '../components/StatCounter'

export const Scene2Stat: React.FC = () => {
  const frame = useCurrentFrame()

  const sceneOpacity = interpolate(frame, [0, 12, 108, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  const mkLine = (start: number) => ({
    opacity: interpolate(frame, [start, start + 14], [0, 1], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    }),
    y: interpolate(frame, [start, start + 16], [28, 0], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    }),
  })

  const line1 = mkLine(82)
  const line2 = mkLine(94)
  const line3 = mkLine(106)
  const source = mkLine(112)

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, opacity: sceneOpacity }}>
      <MotionGrid opacity={0.35} speed={0.25} />

      {/* Overline */}
      <div style={{
        position: 'absolute', top: spacing.safeTop + 20,
        left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        <span style={{
          fontFamily: fonts.mono, fontSize: typeScale.tag,
          color: colors.lagoon, letterSpacing: 6, textTransform: 'uppercase',
        }}>
          THE REALITY
        </span>
      </div>

      {/* Stat + sub-copy centred */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: `0 ${spacing.sidePad}px`,
        gap: 32,
        transform: 'translateY(-60px)',
      }}>
        {/* 87% counter */}
        <StatCounter
          target={87}
          startFrame={4}
          duration={60}
          suffix="%"
          color={colors.lagoon}
          size={typeScale.stat}
          pulseOnLand
          landFrame={64}
        />

        {/* Sub-copy */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 12, marginTop: 8,
        }}>
          {[
            { text: 'of customers Google a business',   ...line1, bold: false },
            { text: 'before deciding to visit.',         ...line2, bold: false },
            { text: 'Is yours showing up?',              ...line3, bold: true  },
          ].map(({ text, opacity, y, bold }, i) => (
            <span key={i} style={{
              fontFamily: fonts.body,
              fontWeight: bold ? 700 : 500,
              fontSize: typeScale.sub,
              color: bold ? colors.textPrimary : colors.textSecondary,
              letterSpacing: bold ? -1 : 0,
              textAlign: 'center',
              opacity,
              transform: `translateY(${y}px)`,
            }}>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Source tag */}
      <div style={{
        position: 'absolute', bottom: spacing.safeBottom + 20,
        left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: source.opacity,
        transform: `translateY(${source.y}px)`,
      }}>
        <span style={{
          fontFamily: fonts.mono, fontSize: typeScale.tag - 4,
          color: colors.textSupporting, letterSpacing: 1,
        }}>
          Source: Google Consumer Insights
        </span>
      </div>
    </AbsoluteFill>
  )
}
