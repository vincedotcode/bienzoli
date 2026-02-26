/**
 * FeatureTag — Animated feature badge/pill
 *
 * Flies in from a direction (left/right/top/bottom) with spring physics.
 * Matches the bienzoli badge style from design-system.md §6.9
 * All animation via useCurrentFrame().
 */

import React from 'react'
import { spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors } from '../utils/colors'
import { monoFont } from '../utils/fonts'

type Direction = 'left' | 'right' | 'top' | 'bottom'

type Props = {
  children: React.ReactNode
  delay?: number
  from?: Direction
  distance?: number   // px to fly from (default 400)
  pulseStart?: number // Frame to start pulse effect
  style?: React.CSSProperties
}

export const FeatureTag: React.FC<Props> = ({
  children,
  delay = 0,
  from = 'left',
  distance = 400,
  pulseStart,
  style,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const localFrame = Math.max(0, frame - delay)

  const flyProgress = spring({
    frame: localFrame,
    fps,
    config: { mass: 1, damping: 18, stiffness: 120 },
  })

  const translateX = from === 'left'
    ? interpolate(flyProgress, [0, 1], [-distance, 0])
    : from === 'right'
    ? interpolate(flyProgress, [0, 1], [distance, 0])
    : 0

  const translateY = from === 'top'
    ? interpolate(flyProgress, [0, 1], [-distance, 0])
    : from === 'bottom'
    ? interpolate(flyProgress, [0, 1], [distance, 0])
    : 0

  const opacity = interpolate(flyProgress, [0, 0.15], [0, 1], { extrapolateRight: 'clamp' })

  // Pulse effect (scale 1 → 1.06 → 1 triggered once)
  let pulseScale = 1
  if (pulseStart !== undefined) {
    const pulseProgress = spring({
      frame: Math.max(0, frame - pulseStart),
      fps,
      config: { mass: 0.8, damping: 10, stiffness: 200 },
    })
    pulseScale = interpolate(pulseProgress, [0, 0.5, 1], [1, 1.06, 1])
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 28,
        paddingRight: 28,
        borderRadius: 9999,
        border: `1.5px solid ${colors.lagoonBorder}`,
        backgroundColor: colors.lagoonMute,
        fontFamily: monoFont,
        fontSize: 34,
        fontWeight: '500',
        color: colors.lagoon,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        transform: `translate(${translateX}px, ${translateY}px) scale(${pulseScale})`,
        opacity,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
