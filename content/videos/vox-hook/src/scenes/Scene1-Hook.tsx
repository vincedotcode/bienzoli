/**
 * Scene 1 — The Hook (90 frames, 3.0s)
 *
 * "Your website is losing you money."
 *
 * Word timing (seq-relative):
 *   frame 0  — "Your"    (whip in SoundDesign)
 *   frame 12 — "website"
 *   frame 24 — "is"
 *   frame 36 — "losing"  (coral)
 *   frame 46 — "you"
 *   frame 56 — "money."  (lagoon, bouncy + highlight sweep at 62)
 *   frame 65 — brand tag fades in
 *   frame 78 — scene fades out
 */

import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { colors, fonts, typeScale, spacing } from '../utils/theme'
import { springs } from '../utils/springs'
import { MotionGrid } from '../components/MotionGrid'
import { Highlighter } from '../components/Highlighter'

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const p = (start: number, cfg = springs.SLAM) =>
    spring({ frame: frame - start, fps, config: cfg })

  const ws = (progress: number, dy = 80): React.CSSProperties => ({
    opacity:   interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(progress, [0, 1], [dy, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
    display:   'inline-block',
  })

  const sceneOpacity = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })
  const tagOpacity = interpolate(frame, [65, 76], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, opacity: sceneOpacity }}>
      <MotionGrid opacity={0.6} speed={0.4} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '32%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.lagoonGlow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: `0 ${spacing.sidePad}px`,
        gap: 10,
      }}>
        {/* "Your website" */}
        <div style={{ display: 'flex', gap: 32, overflow: 'hidden' }}>
          {([
            { word: 'Your',    start: 0 },
            { word: 'website', start: 12 },
          ] as { word: string; start: number }[]).map(({ word, start }) => (
            <span key={word} style={{
              ...ws(p(start)),
              fontFamily: fonts.display, fontWeight: 800,
              fontSize: typeScale.hero, color: colors.textPrimary,
              letterSpacing: -4, lineHeight: 0.95,
            }}>
              {word}
            </span>
          ))}
        </div>

        {/* "is" */}
        <div style={{ overflow: 'hidden' }}>
          <span style={{
            ...ws(p(24, springs.SNAPPY), 50),
            fontFamily: fonts.display, fontWeight: 700,
            fontSize: typeScale.heading, color: colors.textSecondary,
            letterSpacing: -2,
          }}>
            is
          </span>
        </div>

        {/* "losing you" */}
        <div style={{ display: 'flex', gap: 28, overflow: 'hidden' }}>
          {([
            { word: 'losing', start: 36, color: colors.coral },
            { word: 'you',    start: 46, color: colors.textPrimary },
          ] as { word: string; start: number; color: string }[]).map(({ word, start, color }) => (
            <span key={word} style={{
              ...ws(p(start, springs.SNAPPY)),
              fontFamily: fonts.display, fontWeight: 900,
              fontSize: typeScale.hero, color,
              letterSpacing: -4, lineHeight: 0.95,
            }}>
              {word}
            </span>
          ))}
        </div>

        {/* "money." — lagoon, bouncy, highlighted */}
        <div style={{ position: 'relative', overflow: 'visible' }}>
          <Highlighter
            startFrame={62}
            color={colors.lagoon}
            opacity={0.18}
            height={typeScale.hero * 1.1}
            offsetX={18}
            offsetY={-4}
          />
          <span style={{
            ...ws(p(56, springs.BOUNCY), 100),
            fontFamily: fonts.display, fontWeight: 900,
            fontSize: typeScale.hero * 1.2, color: colors.lagoon,
            letterSpacing: -6, lineHeight: 0.9,
            position: 'relative', zIndex: 1,
          }}>
            money.
          </span>
        </div>
      </div>

      {/* Brand tag */}
      <div style={{
        position: 'absolute', bottom: spacing.safeBottom,
        left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: tagOpacity,
      }}>
        <span style={{
          fontFamily: fonts.mono, fontSize: typeScale.tag,
          color: colors.textSupporting, letterSpacing: 4,
          textTransform: 'uppercase',
        }}>
          bienzoli
        </span>
      </div>
    </AbsoluteFill>
  )
}
