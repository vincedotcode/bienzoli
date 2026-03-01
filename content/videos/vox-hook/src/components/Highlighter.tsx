/**
 * Highlighter — Vox-style colored sweep behind a word/phrase
 *
 * Renders a colored rectangle that sweeps from 0 → full width over ~10 frames.
 * Place behind text using z-index. The text sits on top.
 *
 * Usage:
 *   <div style={{ position: 'relative', display: 'inline-block' }}>
 *     <Highlighter startFrame={20} color={colors.lagoon} height={72} />
 *     <span>key phrase</span>
 *   </div>
 */

import React from 'react'
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { colors } from '../utils/theme'
import { springs } from '../utils/springs'

interface HighlighterProps {
  startFrame?: number       // frame at which the sweep begins (seq-relative)
  color?: string            // fill color (default: lagoon)
  opacity?: number          // fill opacity (default 0.25)
  height?: number           // px height of the bar (default 1.15× font-size passed by parent)
  borderRadius?: number
  offsetX?: number          // left overhang in px (default 12)
  offsetY?: number          // top offset in px (default 4)
  style?: React.CSSProperties
}

export const Highlighter: React.FC<HighlighterProps> = ({
  startFrame = 0,
  color = colors.lagoon,
  opacity = 0.22,
  height = 80,
  borderRadius = 8,
  offsetX = 12,
  offsetY = 4,
  style,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springs.BOUNCY,
  })

  const widthPct = interpolate(progress, [0, 1], [0, 100], {
    extrapolateLeft:  'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <span
      style={{
        position: 'absolute',
        left:   -offsetX,
        top:    offsetY,
        height,
        width:  `${widthPct}%`,
        backgroundColor: color,
        opacity,
        borderRadius,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        display: 'block',
        ...style,
      }}
    />
  )
}
