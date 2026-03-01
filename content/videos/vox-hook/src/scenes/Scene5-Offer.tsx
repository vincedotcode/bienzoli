/**
 * Scene 5 — The Offer (120 frames, 4.0s)
 *
 * "Website in 48 hours." then "From Rs 8,000." then package chips.
 *
 * Word timing (seq-relative):
 *   frame 0  — "Website"  (whip)
 *   frame 10 — "in"
 *   frame 18 — "48 hours." (BOUNCY + lagoon highlight at 24 — whip SFX)
 *   frame 36 — divider line
 *   frame 44 — "From" + "Rs"
 *   frame 58 — "8,000."   (whip + shutterOld echo — coral)
 *   frame 72 — chips appear (mouseClick × 3)
 *   frame 108–120 — fade out
 */

import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { colors, fonts, typeScale, spacing } from '../utils/theme'
import { springs } from '../utils/springs'
import { MotionGrid } from '../components/MotionGrid'
import { Highlighter } from '../components/Highlighter'

export const Scene5Offer: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const p = (start: number, cfg = springs.SNAPPY) =>
    spring({ frame: frame - start, fps, config: cfg })

  const ws = (progress: number, dy = 70): React.CSSProperties => ({
    opacity:   interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(progress, [0, 1], [dy, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
    display:   'inline-block',
  })

  const sceneOpacity = interpolate(frame, [0, 10, 108, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })
  const divOpacity = interpolate(frame, [34, 44], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })
  const chipsOpacity = interpolate(frame, [70, 84], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })
  const chipsY = interpolate(frame, [70, 86], [24, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, opacity: sceneOpacity }}>
      <MotionGrid opacity={0.5} speed={0.6} />

      {/* Lagoon glow — centre */}
      <div style={{
        position: 'absolute', top: '45%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, hsla(199,89%,48%,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: `0 ${spacing.sidePad}px`,
        textAlign: 'center', gap: 0,
      }}>
        {/* "Website in" */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 4 }}>
          {([
            { word: 'Website', start: 0  },
            { word: 'in',      start: 10 },
          ] as { word: string; start: number }[]).map(({ word, start }) => (
            <span key={word} style={{
              ...ws(p(start, springs.SLAM)),
              fontFamily: fonts.display, fontWeight: 700,
              fontSize: typeScale.heading * 0.85, color: colors.textSecondary,
              letterSpacing: -3,
            }}>
              {word}
            </span>
          ))}
        </div>

        {/* "48 hours." — massive lagoon, bouncy + highlight */}
        <div style={{ position: 'relative', overflow: 'visible', marginBottom: 32 }}>
          <Highlighter
            startFrame={24}
            color={colors.lagoon}
            opacity={0.16}
            height={typeScale.hero * 1.15}
            offsetX={22}
            offsetY={-6}
          />
          <span style={{
            ...ws(p(18, springs.BOUNCY), 100),
            fontFamily: fonts.display, fontWeight: 900,
            fontSize: typeScale.hero * 1.3, color: colors.lagoon,
            letterSpacing: -6, lineHeight: 0.88,
            position: 'relative', zIndex: 1,
          }}>
            48 hours.
          </span>
        </div>

        {/* Divider */}
        <div style={{
          width: 120, height: 2,
          backgroundColor: colors.borderStrong, borderRadius: 2,
          marginBottom: 28, opacity: divOpacity,
        }} />

        {/* "From Rs 8,000." */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 8 }}>
          {([
            { text: 'From', size: typeScale.sub,     color: colors.textSecondary, start: 44, weight: 600, cfg: springs.SNAPPY },
            { text: 'Rs',   size: typeScale.sub,     color: colors.textSecondary, start: 50, weight: 700, cfg: springs.SNAPPY },
            { text: '8,000.',size: typeScale.heading, color: colors.coral,         start: 58, weight: 900, cfg: springs.BOUNCY },
          ] as { text: string; size: number; color: string; start: number; weight: number; cfg: typeof springs.SNAPPY }[]).map(({ text, size, color, start, weight, cfg }) => (
            <span key={text} style={{
              ...ws(p(start, cfg), text === '8,000.' ? 60 : 50),
              fontFamily: fonts.display, fontWeight: weight,
              fontSize: size, color, letterSpacing: size > 80 ? -3 : 0,
            }}>
              {text}
            </span>
          ))}
        </div>

        {/* Package chips */}
        <div style={{
          display: 'flex', gap: 16, flexWrap: 'wrap',
          justifyContent: 'center', marginTop: 36,
          opacity: chipsOpacity, transform: `translateY(${chipsY}px)`,
        }}>
          {([
            { name: 'FLIC EN FLAC', price: 'Rs 8k',  highlight: false },
            { name: 'PORT LOUIS',   price: 'Rs 18k', highlight: false },
            { name: 'GRAND BAIE',   price: 'Rs 35k', highlight: true  },
          ] as { name: string; price: string; highlight: boolean }[]).map(({ name, price, highlight }) => (
            <div key={name} style={{
              border: `1.5px solid ${highlight ? colors.lagoonBorder : colors.borderDefault}`,
              borderRadius: 40, padding: '10px 24px',
              background: highlight ? colors.lagoonMute : 'transparent',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                fontFamily: fonts.mono, fontSize: typeScale.tag - 2,
                color: highlight ? colors.lagoon : colors.textSupporting,
                letterSpacing: 2, textTransform: 'uppercase',
              }}>
                {name}
              </span>
              <span style={{
                fontFamily: fonts.display, fontWeight: 700,
                fontSize: typeScale.tag, color: highlight ? colors.lagoon : colors.textSecondary,
              }}>
                {price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}
