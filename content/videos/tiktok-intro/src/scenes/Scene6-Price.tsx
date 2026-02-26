/**
 * Scene 6 — THE PRICE (local frames 0–69 | 6.8s–9.1s)
 *
 * "Starting at Rs 8,000" with the Kreol emotional closer.
 * Bass impact on entry. Rs 8,000 slams in with punchy spring.
 * The Kreol line appears last and stays — emotional hook.
 */

import React from 'react'
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors } from '../utils/colors'
import { displayFont, bodyFont, monoFont } from '../utils/fonts'
import { AnimatedText } from '../components/AnimatedText'

export const Scene6Price: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // "STARTING AT" label fades in frames 2–12
  const labelOpacity = interpolate(frame, [2, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // "Rs" prefix springs in with the price (same timing, slightly earlier)
  const rsProgress = spring({
    frame: Math.max(0, frame - 13),
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 200 },
  })
  const rsOpacity = interpolate(rsProgress, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' })
  const rsTranslateY = interpolate(rsProgress, [0, 1], [30, 0])

  // "Website live in 48 hours." fades in at frame 30
  const taglineOpacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Kreol line fades in at frame 45
  const kreolOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Everything holds and gently fades at frames 60–69
  const holdOpacity = interpolate(frame, [62, 69], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        opacity: holdOpacity,
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, ${colors.borderDefault} 1px, transparent 1px),
            linear-gradient(to bottom, ${colors.borderDefault} 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          opacity: 0.03,
          pointerEvents: 'none',
        }}
      />

      {/* Radial glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 600,
          background: 'radial-gradient(ellipse at center, hsla(199, 89%, 48%, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 500,
          height: 400,
          background: 'radial-gradient(ellipse at center, hsla(24, 94%, 53%, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content — vertically centered */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 80,
          paddingRight: 80,
          gap: 0,
        }}
      >
        {/* "STARTING AT" overline */}
        <div
          style={{
            fontFamily: monoFont,
            fontSize: 34,
            fontWeight: '500',
            color: colors.textSupporting,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: labelOpacity,
            marginBottom: 16,
          }}
        >
          Starting at
        </div>

        {/* Price row: "Rs" + "8,000" */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          {/* Rs prefix */}
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 72,
              fontWeight: '600',
              color: colors.textSecondary,
              lineHeight: 1.2,
              paddingTop: 16,
              transform: `translateY(${rsTranslateY}px)`,
              opacity: rsOpacity,
            }}
          >
            Rs
          </div>

          {/* Price number slams in at frame 15 */}
          <AnimatedText delay={15} preset="punchy" fromY={80} fromScale={0.6}>
            <div
              style={{
                fontFamily: displayFont,
                fontSize: 180,
                fontWeight: '700',
                color: colors.textPrimary,
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              8,000
            </div>
          </AnimatedText>
        </div>

        {/* "Website live in 48 hours." */}
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 52,
            fontWeight: '500',
            color: colors.lagoon,
            marginTop: 24,
            opacity: taglineOpacity,
            letterSpacing: '-0.01em',
            textAlign: 'center',
          }}
        >
          Website live in 48 hours.
        </div>

        {/* Kreol line — the emotional closer */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 44,
            fontWeight: '400',
            fontStyle: 'italic',
            color: colors.textSecondary,
            marginTop: 20,
            opacity: kreolOpacity,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          "Mo build website ki fer bizness grandi."
        </div>
      </div>
    </AbsoluteFill>
  )
}
