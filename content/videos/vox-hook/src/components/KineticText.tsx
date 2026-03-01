/**
 * KineticText — Word-by-word staggered entry with spring animation
 *
 * Splits text into words, each word springs in with a directional offset.
 * Supports "hero" (massive), "heading", "sub", and "body" size presets.
 */

import React from 'react'
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { colors, fonts, typeScale } from '../utils/theme'
import { springs } from '../utils/springs'

type SizePreset = 'hero' | 'heading' | 'sub' | 'body' | 'label'
type Direction = 'up' | 'down' | 'left' | 'right'
type Align = 'left' | 'center' | 'right'

interface WordStyle {
  word: string
  color?: string
  highlight?: boolean
  highlightColor?: string
  italic?: boolean
}

interface KineticTextProps {
  text: string | WordStyle[]
  size?: SizePreset
  color?: string
  direction?: Direction
  staggerFrames?: number   // delay between each word (default 4)
  startFrame?: number      // frame at which animation starts (default 0 = current seq start)
  align?: Align
  lineHeight?: number
  fontFamily?: string
  fontWeight?: number | string
  uppercase?: boolean
  letterSpacing?: number
  maxWidth?: number
}

const OFFSETS: Record<Direction, [number, number]> = {
  up:    [0,  60],
  down:  [0, -60],
  left:  [60,  0],
  right: [-60, 0],
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  size = 'heading',
  color = colors.textPrimary,
  direction = 'up',
  staggerFrames = 4,
  startFrame = 0,
  align = 'center',
  lineHeight = 1.1,
  fontFamily = fonts.display,
  fontWeight = 800,
  uppercase = false,
  letterSpacing = -1,
  maxWidth,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Normalise input to WordStyle[]
  const words: WordStyle[] = typeof text === 'string'
    ? text.split(' ').map(w => ({ word: w }))
    : text

  const [dx, dy] = OFFSETS[direction]
  const fontSize = typeScale[size]

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        gap: `0 ${fontSize * 0.28}px`,
        lineHeight,
        maxWidth: maxWidth ?? undefined,
        width: '100%',
      }}
    >
      {words.map((ws, i) => {
        const wordFrame = frame - startFrame - i * staggerFrames
        const progress = spring({
          frame: wordFrame,
          fps,
          config: springs.SNAPPY,
        })

        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        const translateX = interpolate(progress, [0, 1], [dx, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        const translateY = interpolate(progress, [0, 1], [dy, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

        const wordColor = ws.color ?? color

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              transform: `translate(${translateX}px, ${translateY}px)`,
              fontSize,
              fontFamily,
              fontWeight,
              color: wordColor,
              fontStyle: ws.italic ? 'italic' : 'normal',
              textTransform: uppercase ? 'uppercase' : 'none',
              letterSpacing,
              position: 'relative',
              lineHeight,
            }}
          >
            {ws.highlight && (
              <HighlightRect
                frame={frame}
                fps={fps}
                startFrame={startFrame + i * staggerFrames + 6}
                color={ws.highlightColor ?? colors.lagoon}
                fontSize={fontSize}
              />
            )}
            {ws.word}
          </span>
        )
      })}
    </div>
  )
}

// ─── Inline Highlight Rect ────────────────────────────────────────────────
interface HighlightRectProps {
  frame: number
  fps: number
  startFrame: number
  color: string
  fontSize: number
}

const HighlightRect: React.FC<HighlightRectProps> = ({ frame, fps, startFrame, color, fontSize }) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springs.BOUNCY,
  })
  const width = interpolate(progress, [0, 1], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <span
      style={{
        position: 'absolute',
        left:   -8,
        right:  -8,
        top:    fontSize * 0.06,
        bottom: fontSize * 0.04,
        backgroundColor: color,
        opacity: 0.22,
        borderRadius: 6,
        width: `${width}%`,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  )
}
