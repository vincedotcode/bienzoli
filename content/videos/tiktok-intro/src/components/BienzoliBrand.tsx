/**
 * BienzoliBrand — Logo + wordmark lockup for video CTA
 *
 * Renders the bienzoli wordmark text (logo image referenced via staticFile).
 * Spring entrance with rotation for premium feel.
 * Pulsing glow effect for the CTA hold.
 * All animation via useCurrentFrame().
 */

import React from 'react'
import { spring, interpolate, useCurrentFrame, useVideoConfig, staticFile, Img } from 'remotion'
import { colors } from '../utils/colors'
import { displayFont } from '../utils/fonts'

type Props = {
  delay?: number
  logoSize?: number
}

export const BienzoliBrand: React.FC<Props> = ({
  delay = 0,
  logoSize = 160,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const localFrame = Math.max(0, frame - delay)

  // Logo entrance: scale + rotation spring
  const entranceProgress = spring({
    frame: localFrame,
    fps,
    config: { mass: 0.6, damping: 8, stiffness: 180 },
  })

  const scale = interpolate(entranceProgress, [0, 1], [0, 1])
  const rotation = interpolate(entranceProgress, [0, 1], [-10, 0])
  const opacity = interpolate(entranceProgress, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' })

  // Pulsing glow — 2-second cycle (60 frames at 30fps)
  const glowCycle = (frame % 60) / 60  // 0→1 repeating
  const glowIntensity = Math.sin(glowCycle * Math.PI * 2) * 0.5 + 0.5  // 0→1 smooth pulse
  const glowSize = interpolate(glowIntensity, [0, 1], [40, 80])
  const glowOpacity = interpolate(glowIntensity, [0, 1], [0.08, 0.2])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      {/* Glow halo behind logo */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            width: logoSize + glowSize * 2,
            height: logoSize + glowSize * 2,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, hsla(199, 89%, 48%, ${glowOpacity}) 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Logo image — from video public folder */}
        <Img
          src={staticFile('images/logo_normal_transparent.png')}
          style={{
            width: logoSize,
            height: logoSize,
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  )
}
