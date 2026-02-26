/**
 * Scene 7 — THE CTA (local frames 0–174 | 9.1s–15.0s)
 *
 * bienzoli logo springs in with rotation.
 * "bienzoli.com" + tagline + WhatsApp number appear in sequence.
 * Logo glow pulses continuously. Everything holds for 3 final seconds.
 * Ambient beat swells to full volume here.
 */

import React from 'react'
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors } from '../utils/colors'
import { displayFont, bodyFont, monoFont } from '../utils/fonts'
import { BienzoliBrand } from '../components/BienzoliBrand'
import { AnimatedText } from '../components/AnimatedText'

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // "bienzoli.com" springs in at frame 18
  const urlProgress = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 200 },
  })
  const urlTranslateY = interpolate(urlProgress, [0, 1], [50, 0])
  const urlOpacity = interpolate(urlProgress, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' })

  // Tagline fades in at frame 28
  const taglineOpacity = interpolate(frame, [28, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // WhatsApp number fades in at frame 45
  const waOpacity = interpolate(frame, [45, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Final fade out: frames 159–174 (last 0.5s)
  const finalOpacity = interpolate(frame, [159, 174], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        opacity: finalOpacity,
      }}
    >
      {/* Grid pattern */}
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

      {/* Background radial glows */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          height: 900,
          background: 'radial-gradient(ellipse at center, hsla(199, 89%, 48%, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 500,
          height: 400,
          background: 'radial-gradient(ellipse at center, hsla(24, 94%, 53%, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main content — vertically centered */}
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
          gap: 0,
        }}
      >
        {/* Logo springs in at frame 3 */}
        <BienzoliBrand delay={3} logoSize={200} />

        {/* "bienzoli.com" */}
        <div
          style={{
            marginTop: 32,
            transform: `translateY(${urlTranslateY}px)`,
            opacity: urlOpacity,
          }}
        >
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 88,
              fontWeight: '700',
              color: colors.textPrimary,
              letterSpacing: '0.03em',
              textAlign: 'center',
            }}
          >
            bienzoli.com
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 20,
            opacity: taglineOpacity,
          }}
        >
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 42,
              fontWeight: '400',
              color: colors.textSecondary,
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Premium websites. Built fast. Built right.
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            width: 120,
            height: 1,
            backgroundColor: colors.lagoonBorder,
            marginTop: 32,
            opacity: waOpacity,
          }}
        />

        {/* WhatsApp contact */}
        <div
          style={{
            marginTop: 20,
            opacity: waOpacity,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 36 }}>💬</div>
          <div
            style={{
              fontFamily: monoFont,
              fontSize: 36,
              fontWeight: '400',
              color: colors.textSupporting,
              letterSpacing: '0.04em',
            }}
          >
            +230 5790 1383
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 80,
          right: 80,
          height: 1,
          background: `linear-gradient(to right, transparent, ${colors.lagoonBorder}, transparent)`,
          opacity: taglineOpacity,
        }}
      />
    </AbsoluteFill>
  )
}
