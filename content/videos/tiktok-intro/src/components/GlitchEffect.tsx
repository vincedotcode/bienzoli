/**
 * GlitchEffect — Digital glitch/datamosh transition component
 *
 * Renders 8 frames of intense digital distortion:
 *   - RGB channel split (red left, blue right)
 *   - Horizontal scan lines (animated position)
 *   - Block displacement via clip-path
 *   - Brief white flash on peak frame
 *
 * All driven by useCurrentFrame() — no CSS animations.
 */

import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { colors } from '../utils/colors'

type Props = {
  children?: React.ReactNode
  durationInFrames?: number  // Total glitch duration (default 8)
  intensity?: number         // Max displacement in px (default 15)
}

export const GlitchEffect: React.FC<Props> = ({
  children,
  durationInFrames = 8,
  intensity = 15,
}) => {
  const frame = useCurrentFrame()

  // Progress 0→1 over glitch duration, clamp
  const progress = Math.min(frame / Math.max(durationInFrames, 1), 1)

  // Peak intensity at frame 4 (middle of glitch)
  const peakCurve = Math.sin(progress * Math.PI)

  // Pseudo-random displacements seeded on frame
  const seed = (frame * 17 + 31) % 100
  const blockSeed = (frame * 7 + 13) % 100
  const xJitter = ((seed % 10) - 5) * intensity * 0.1 * peakCurve
  const yJitter = ((blockSeed % 8) - 4) * intensity * 0.08 * peakCurve

  // RGB split amount
  const rgbSplit = interpolate(progress, [0, 0.5, 1], [0, intensity, 0])

  // Scan line opacity
  const scanOpacity = peakCurve * 0.35

  // White flash: peaks at 60% through the glitch, then fades
  const flashOpacity = interpolate(
    progress,
    [0, 0.4, 0.6, 0.85, 1],
    [0, 0, 0.85, 0.2, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  )

  // Block displacement clips (3 horizontal bands that offset)
  const blockDisplacements = [
    { clipY: '15%', clipH: '18%', offset: ((seed % 20) - 10) * peakCurve },
    { clipY: '45%', clipH: '12%', offset: ((blockSeed % 24) - 12) * peakCurve },
    { clipY: '72%', clipH: '14%', offset: ((seed % 16) - 8) * peakCurve * -1 },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Layer 1: Red channel (shifted left) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${-rgbSplit}px)`,
          mixBlendMode: 'screen',
          filter: 'saturate(2) hue-rotate(-30deg)',
          opacity: peakCurve * 0.7,
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>

      {/* Layer 2: Original content with position jitter */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${xJitter}px, ${yJitter}px)`,
        }}
      >
        {children}
      </div>

      {/* Layer 3: Blue channel (shifted right) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${rgbSplit}px)`,
          mixBlendMode: 'screen',
          filter: 'saturate(2) hue-rotate(200deg)',
          opacity: peakCurve * 0.7,
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>

      {/* Block displacement layers */}
      {blockDisplacements.map((block, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(${block.clipY} 0 calc(100% - ${block.clipY} - ${block.clipH}) 0)`,
            transform: `translateX(${block.offset}px)`,
            mixBlendMode: 'normal',
          }}
        >
          {children}
        </div>
      ))}

      {/* Scan lines overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0,0,0,0.4) 2px,
            rgba(0,0,0,0.4) 4px
          )`,
          backgroundPositionY: `${frame * 3}px`,
          opacity: scanOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Lagoon tint on scan lines for color effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            hsla(199, 89%, 48%, 0.06) 3px,
            hsla(199, 89%, 48%, 0.06) 6px
          )`,
          backgroundPositionY: `${frame * -2}px`,
          opacity: scanOpacity * 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* White flash */}
      {flashOpacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: colors.white,
            opacity: flashOpacity,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}
