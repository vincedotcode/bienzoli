/**
 * Scene 3 — The Problem (90 frames, 3.0s)
 *
 * "No website? They're already on your competitor's page."
 *
 * Word timing (seq-relative):
 *   frame 0  — "No website?"  (whip — massive coral slam)
 *   frame 16 — "They're"
 *   frame 26 — "already"
 *   frame 36 — "on"
 *   frame 44 — "your"
 *   frame 52 — "competitor's" (coral)
 *   frame 62 — "page."        (whip — textPrimary, lagoon highlight)
 *   frame 78–90 — fade out
 */

import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { colors, fonts, typeScale, spacing } from '../utils/theme'
import { springs } from '../utils/springs'
import { MotionGrid } from '../components/MotionGrid'
import { Highlighter } from '../components/Highlighter'

export const Scene3Problem: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const p = (start: number, cfg = springs.SNAPPY) =>
    spring({ frame: frame - start, fps, config: cfg })

  const ws = (progress: number, dy = 70): React.CSSProperties => ({
    opacity:   interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(progress, [0, 1], [dy, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
    display:   'inline-block',
  })

  const sceneOpacity = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, opacity: sceneOpacity }}>
      <MotionGrid opacity={0.4} speed={0.5} dotColor="hsla(24, 94%, 53%, 0.12)" />

      {/* Coral glow — left side */}
      <div style={{
        position: 'absolute', top: '40%', left: '15%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.coralMute} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center',
        padding: `0 ${spacing.sidePad}px`,
        gap: 20,
      }}>
        {/* "No website?" — massive coral slam */}
        <div style={{ overflow: 'hidden' }}>
          <span style={{
            ...ws(p(0, springs.SLAM), 100),
            fontFamily: fonts.display, fontWeight: 900,
            fontSize: typeScale.hero * 1.05, color: colors.coral,
            letterSpacing: -5, lineHeight: 0.9,
          }}>
            No website?
          </span>
        </div>

        {/* "They're already" */}
        <div style={{ display: 'flex', gap: 22 }}>
          {([
            { word: "They're", start: 16 },
            { word: 'already', start: 26 },
          ] as { word: string; start: number }[]).map(({ word, start }) => (
            <span key={word} style={{
              ...ws(p(start)),
              fontFamily: fonts.display, fontWeight: 700,
              fontSize: typeScale.heading * 0.82, color: colors.textSecondary,
              letterSpacing: -2,
            }}>
              {word}
            </span>
          ))}
        </div>

        {/* "on your competitor's" */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {([
            { word: 'on',           start: 36, color: colors.textSecondary, weight: 700 },
            { word: 'your',         start: 44, color: colors.textSecondary, weight: 700 },
            { word: "competitor's", start: 52, color: colors.coral,         weight: 800 },
          ] as { word: string; start: number; color: string; weight: number }[]).map(({ word, start, color, weight }) => (
            <span key={word} style={{
              ...ws(p(start)),
              fontFamily: fonts.display, fontWeight: weight,
              fontSize: typeScale.heading * 0.85, color,
              letterSpacing: -2,
            }}>
              {word}
            </span>
          ))}
        </div>

        {/* "page." — big, lagoon highlight */}
        <div style={{ position: 'relative', overflow: 'visible' }}>
          <Highlighter
            startFrame={66}
            color={colors.lagoon}
            opacity={0.15}
            height={typeScale.hero * 1.0}
            offsetX={12}
            offsetY={0}
          />
          <span style={{
            ...ws(p(62, springs.BOUNCY), 80),
            fontFamily: fonts.display, fontWeight: 900,
            fontSize: typeScale.hero, color: colors.textPrimary,
            letterSpacing: -4, lineHeight: 0.95,
            position: 'relative', zIndex: 1,
          }}>
            page.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  )
}
