/**
 * StatCounter — Animates a number from 0 to a target value
 *
 * Uses interpolate() for smooth counting. Pulses on landing.
 * Supports suffix (%, +, x) and prefix (Rs, $).
 */

import React from 'react'
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { colors, fonts, typeScale } from '../utils/theme'
import { springs } from '../utils/springs'

interface StatCounterProps {
  target: number
  startFrame?: number       // frame counting begins
  duration?: number         // frames to count over (default 45)
  prefix?: string           // e.g. "Rs "
  suffix?: string           // e.g. "%", "+", "x"
  color?: string
  size?: number             // font size px (default typeScale.stat)
  decimals?: number         // decimal places (default 0)
  pulseOnLand?: boolean     // scale pulse when value reaches target
  landFrame?: number        // frame the pulse triggers (default startFrame + duration)
}

export const StatCounter: React.FC<StatCounterProps> = ({
  target,
  startFrame = 0,
  duration = 45,
  prefix = '',
  suffix = '',
  color = colors.lagoon,
  size = typeScale.stat,
  decimals = 0,
  pulseOnLand = true,
  landFrame,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Count progress: 0→1 over `duration` frames
  const countProgress = interpolate(
    frame - startFrame,
    [0, duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Ease-out curve for natural deceleration
  const eased = 1 - Math.pow(1 - countProgress, 3)
  const currentValue = eased * target

  const displayValue = decimals > 0
    ? currentValue.toFixed(decimals)
    : Math.round(currentValue).toString()

  // Pulse scale on landing
  const actualLandFrame = landFrame ?? (startFrame + duration)
  const pulseProgress = pulseOnLand
    ? spring({ frame: frame - actualLandFrame, fps, config: springs.BOUNCY })
    : 0

  const scale = pulseOnLand
    ? interpolate(pulseProgress, [0, 0.5, 1], [1, 1.06, 1], {
        extrapolateLeft:  'clamp',
        extrapolateRight: 'clamp',
      })
    : 1

  // Fade in at start
  const opacity = interpolate(frame - startFrame, [0, 8], [0, 1], {
    extrapolateLeft:  'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: 0,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {prefix && (
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: size * 0.42,
            color,
            marginRight: 8,
            lineHeight: 1,
            alignSelf: 'flex-start',
            paddingTop: size * 0.12,
          }}
        >
          {prefix}
        </span>
      )}
      <span
        style={{
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: size,
          color,
          lineHeight: 0.9,
          letterSpacing: -6,
        }}
      >
        {displayValue}
      </span>
      {suffix && (
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: size * 0.52,
            color,
            marginLeft: 4,
            lineHeight: 1,
            alignSelf: 'flex-start',
            paddingTop: size * 0.06,
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  )
}
