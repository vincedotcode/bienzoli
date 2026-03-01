/**
 * MotionGrid — Infinite-scrolling dot grid background
 *
 * Creates ambient depth. Dots scroll upward at a constant rate.
 * Fills the full 1080×1920 canvas.
 */

import React from 'react'
import { useCurrentFrame, AbsoluteFill } from 'remotion'

interface MotionGridProps {
  dotColor?: string
  dotSize?: number     // px radius
  spacing?: number     // px between dot centres
  speed?: number       // px per frame (default 0.3)
  opacity?: number
}

export const MotionGrid: React.FC<MotionGridProps> = ({
  dotColor = 'hsla(199, 89%, 48%, 0.18)',
  dotSize = 2,
  spacing = 60,
  speed = 0.3,
  opacity = 1,
}) => {
  const frame = useCurrentFrame()

  const cols = Math.ceil(1080 / spacing) + 1
  const rows = Math.ceil(1920 / spacing) + 2

  // Scroll offset — wraps within one spacing unit so grid appears infinite
  const scrollY = (frame * speed) % spacing

  const dots: React.ReactNode[] = []

  for (let r = -1; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={c * spacing}
          cy={r * spacing + scrollY}
          r={dotSize}
          fill={dotColor}
        />
      )
    }
  }

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg
        width={1080}
        height={1920}
        viewBox={`0 0 1080 1920`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {dots}
      </svg>
    </AbsoluteFill>
  )
}
