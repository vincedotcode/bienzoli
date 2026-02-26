/**
 * CounterAnimation — Animated number counter
 *
 * Counts from a start value to an end value over durationInFrames.
 * Uses spring physics for a satisfying land+bounce on the final number.
 * All driven by useCurrentFrame().
 */

import React from 'react'
import { spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors } from '../utils/colors'
import { monoFont } from '../utils/fonts'

type Props = {
  from?: number
  to: number
  durationInFrames?: number  // How many frames to count (default 20)
  delay?: number             // Frames to delay start
  fontSize?: number
  color?: string
  suffix?: string            // e.g. "+" or "h"
  style?: React.CSSProperties
}

export const CounterAnimation: React.FC<Props> = ({
  from = 0,
  to,
  durationInFrames = 20,
  delay = 0,
  fontSize = 240,
  color = colors.lagoon,
  suffix = '',
  style,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const localFrame = Math.max(0, frame - delay)

  // Linear progress for counting
  const countProgress = interpolate(
    localFrame,
    [0, durationInFrames * 0.85],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  )
  const currentValue = Math.round(interpolate(countProgress, [0, 1], [from, to]))

  // Spring bounce on landing
  const landingSpring = spring({
    frame: Math.max(0, localFrame - durationInFrames + 5),
    fps,
    config: { mass: 0.6, damping: 8, stiffness: 180 },
  })
  const scale = interpolate(landingSpring, [0, 0.6, 1], [1, 1.08, 1])

  // Entrance animation
  const entranceSpring = spring({
    frame: localFrame,
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 200 },
  })
  const opacity = interpolate(entranceSpring, [0, 0.15], [0, 1], { extrapolateRight: 'clamp' })
  const translateY = interpolate(entranceSpring, [0, 1], [60, 0])

  return (
    <div
      style={{
        fontFamily: monoFont,
        fontSize,
        fontWeight: '700',
        color,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        display: 'inline-block',
        ...style,
      }}
    >
      {currentValue.toString().padStart(2, '0')}{suffix}
    </div>
  )
}
