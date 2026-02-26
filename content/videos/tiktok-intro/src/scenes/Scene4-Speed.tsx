/**
 * Scene 4 — THE SPEED (local frames 0–37 | 4.0s–5.2s)
 *
 * "48 hours" counter with rapid tick sounds.
 * Large mono-font counter, spring bounce on landing.
 * All animation via useCurrentFrame().
 */

import React from 'react'
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors } from '../utils/colors'
import { displayFont, monoFont } from '../utils/fonts'
import { AnimatedText } from '../components/AnimatedText'
import { CounterAnimation } from '../components/CounterAnimation'

export const Scene4Speed: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Whoosh in: slide from right (frames 0–6)
  const slideIn = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 16, stiffness: 200 },
    durationInFrames: 10,
  })
  const translateX = interpolate(slideIn, [0, 1], [300, 0])
  const sceneOpacity = interpolate(slideIn, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' })

  // "hours" springs in at frame 25
  const hoursProgress = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 200 },
  })
  const hoursTranslateY = interpolate(hoursProgress, [0, 1], [40, 0])
  const hoursOpacity = interpolate(hoursProgress, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' })

  // Subtitle fades in at frame 30
  const subtitleOpacity = interpolate(frame, [30, 37], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        transform: `translateX(${translateX}px)`,
        opacity: sceneOpacity,
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

      {/* Radial glow behind counter */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          background: 'radial-gradient(ellipse at center, hsla(199, 89%, 48%, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Counter block — vertically centered */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        {/* Counter: counts 00 → 48 over 20 frames starting at frame 3 */}
        <CounterAnimation
          from={0}
          to={48}
          durationInFrames={20}
          delay={3}
          fontSize={260}
          color={colors.lagoon}
        />

        {/* "hours" label */}
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 80,
            fontWeight: '700',
            color: colors.textPrimary,
            letterSpacing: '-0.02em',
            transform: `translateY(${hoursTranslateY}px)`,
            opacity: hoursOpacity,
            marginTop: -20,
          }}
        >
          hours
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 40,
            fontWeight: '400',
            color: colors.textSecondary,
            marginTop: 20,
            opacity: subtitleOpacity,
            letterSpacing: '0.01em',
          }}
        >
          from idea to live website
        </div>
      </div>
    </AbsoluteFill>
  )
}
