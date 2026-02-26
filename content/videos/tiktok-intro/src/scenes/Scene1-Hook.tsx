/**
 * Scene 1 — THE HOOK (local frames 0–44 | 0.0s–1.5s)
 *
 * "Your business deserves better."
 * Punchy spring entrance. Bass impact on frame 0.
 * Both lines fade out at end with slight scale-up.
 */

import React from 'react'
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors } from '../utils/colors'
import { displayFont } from '../utils/fonts'
import { AnimatedText } from '../components/AnimatedText'

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Camera shake: 2px random jitter on frame 0–3 (tied to impact)
  const shakeAmount = interpolate(frame, [0, 2, 4], [2, -2, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Fade out both lines: frames 35–44
  const fadeOut = interpolate(frame, [35, 44], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const scaleOut = interpolate(frame, [35, 44], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        transform: `translate(${shakeAmount}px, ${shakeAmount * 0.5}px)`,
      }}
    >
      {/* Grid pattern texture at 3% opacity */}
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

      {/* Radial glow — lagoon, centered top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 600,
          background: 'radial-gradient(ellipse at center, hsla(199, 89%, 48%, 0.12) 0%, transparent 70%)',
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
          transform: `scale(${scaleOut})`,
          opacity: fadeOut,
        }}
      >
        {/* Line 1: "Your business" — appears at frame 3 */}
        <AnimatedText delay={3} preset="punchy" fromY={50} fromScale={0.8}>
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 120,
              fontWeight: '700',
              color: colors.textPrimary,
              textAlign: 'center',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            Your business
          </div>
        </AnimatedText>

        {/* Line 2: "deserves better." — appears at frame 11 */}
        <AnimatedText delay={11} preset="punchy" fromY={50} fromScale={0.8}>
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 120,
              fontWeight: '700',
              color: colors.lagoon,
              textAlign: 'center',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            deserves better.
          </div>
        </AnimatedText>
      </div>
    </AbsoluteFill>
  )
}
