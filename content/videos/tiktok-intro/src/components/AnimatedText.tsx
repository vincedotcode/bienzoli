/**
 * AnimatedText — Reusable spring-in text component
 *
 * Supports: punchy slam, smooth fade, staggered multi-line
 * All animations driven by useCurrentFrame() — no CSS transitions.
 */

import React from 'react'
import { spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'

export type SpringPreset = 'punchy' | 'smooth' | 'bouncy' | 'gentle'

const SPRING_CONFIGS: Record<SpringPreset, { mass?: number; damping: number; stiffness?: number }> = {
  punchy:  { mass: 0.8, damping: 12, stiffness: 200 },  // Text slams, price reveals
  smooth:  { mass: 1,   damping: 18, stiffness: 120 },  // Tags, secondary text
  bouncy:  { mass: 0.6, damping: 8,  stiffness: 180 },  // Logo, counter landing
  gentle:  { mass: 1.2, damping: 24, stiffness: 80  },  // Subtle movements
}

type Props = {
  children: React.ReactNode
  delay?: number          // Frames to delay entrance
  preset?: SpringPreset
  fromY?: number          // Starting Y offset (px) — default 40
  fromScale?: number      // Starting scale — default 0.7
  style?: React.CSSProperties
  fadeOutStart?: number   // Frame to start fading out
  fadeOutDuration?: number
}

export const AnimatedText: React.FC<Props> = ({
  children,
  delay = 0,
  preset = 'punchy',
  fromY = 40,
  fromScale = 0.7,
  style,
  fadeOutStart,
  fadeOutDuration = 10,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const config = SPRING_CONFIGS[preset]

  const progress = spring({
    frame: frame - delay,
    fps,
    config,
  })

  const translateY = interpolate(progress, [0, 1], [fromY, 0])
  const scale = interpolate(progress, [0, 1], [fromScale, 1])
  const opacity = interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' })

  // Optional fade out
  let fadeOpacity = 1
  if (fadeOutStart !== undefined) {
    fadeOpacity = interpolate(
      frame,
      [fadeOutStart, fadeOutStart + fadeOutDuration],
      [1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    )
  }

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: Math.min(opacity, fadeOpacity),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
