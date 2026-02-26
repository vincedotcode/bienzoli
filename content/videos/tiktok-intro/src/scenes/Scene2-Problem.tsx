/**
 * Scene 2 — THE PROBLEM (local frames 0–44 | 1.5s–3.0s)
 *
 * CSS browser mockup of a hilariously bad website.
 * Wipe transition in from left. Text overlay fades in.
 * Glitch-out begins at frame 37 (bridges to Scene 3).
 * All animation via useCurrentFrame() — no CSS transitions.
 */

import React from 'react'
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors } from '../utils/colors'
import { displayFont, bodyFont, monoFont } from '../utils/fonts'

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Horizontal wipe: slide in from left (frames 0–8)
  const wipeProgress = spring({
    frame,
    fps,
    config: { mass: 1, damping: 20, stiffness: 180 },
    durationInFrames: 12,
  })
  const wipeTranslateX = interpolate(wipeProgress, [0, 1], [-200, 0])
  const wipeOpacity = interpolate(wipeProgress, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' })

  // Mockup slides in from bottom (frames 5–18)
  const mockupProgress = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { mass: 0.9, damping: 14, stiffness: 140 },
  })
  const mockupTranslateY = interpolate(mockupProgress, [0, 1], [120, 0])
  const mockupOpacity = interpolate(mockupProgress, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' })

  // Bad website mockup rotation (-2deg) — static, no animation needed
  // Text overlay fades in at frame 20
  const textOpacity = interpolate(frame, [20, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Glitch-out: position jitter frames 37–44
  const glitchIntensity = interpolate(frame, [37, 44], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const glitchX = ((frame * 7) % 10 - 5) * glitchIntensity * 3
  const glitchOpacityOut = interpolate(frame, [41, 44], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Spinning gear: rotate at constant speed
  const gearRotation = frame * 5  // 5 degrees per frame = fast spin

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        transform: `translateX(${wipeTranslateX}px) translateX(${glitchX}px)`,
        opacity: wipeOpacity * glitchOpacityOut,
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

      {/* Bad website browser mockup */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 60,
          right: 60,
          transform: `translateY(${mockupTranslateY}px) rotate(-2deg)`,
          opacity: mockupOpacity,
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            border: `2px solid hsl(0, 80%, 50%)`,
            boxShadow: `0 0 40px -8px hsla(0, 80%, 50%, 0.4)`,
          }}
        >
          {/* Browser bar */}
          <div
            style={{
              backgroundColor: '#c8c8c8',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {/* Traffic lights */}
            <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#febc2e' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#28c840' }} />
            {/* URL bar */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#e8e8e8',
                borderRadius: 6,
                padding: '4px 10px',
                marginLeft: 8,
                fontFamily: monoFont,
                fontSize: 18,
                color: '#555',
              }}
            >
              mywebsite2019.wix.com
            </div>
          </div>

          {/* "Bad" website content */}
          <div
            style={{
              backgroundColor: '#ffff33',
              padding: 24,
              minHeight: 380,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Under construction banner */}
            <div
              style={{
                backgroundColor: '#ff0000',
                color: '#ffffff',
                fontFamily: 'serif',
                fontSize: 28,
                fontWeight: 'bold',
                textAlign: 'center',
                padding: 8,
                marginBottom: 16,
                border: '4px dashed #000000',
              }}
            >
              🚧 UNDER CONSTRUCTION 🚧
            </div>

            {/* Bad headline */}
            <div
              style={{
                fontFamily: 'serif',
                fontSize: 42,
                fontWeight: 'bold',
                color: '#cc0000',
                textAlign: 'center',
                textDecoration: 'underline',
                marginBottom: 12,
              }}
            >
              WELCOME TO MY WEBSITE!!
            </div>

            {/* Misaligned content block */}
            <div style={{ marginLeft: 40, marginTop: 8 }}>
              <div
                style={{
                  fontFamily: 'Comic Sans MS, cursive',
                  fontSize: 22,
                  color: '#000080',
                  marginBottom: 8,
                }}
              >
                • We sell stuff online
              </div>
              <div
                style={{
                  fontFamily: 'Comic Sans MS, cursive',
                  fontSize: 22,
                  color: '#000080',
                  marginBottom: 8,
                }}
              >
                • Click here to learn more!!
              </div>
              <div
                style={{
                  fontFamily: 'Comic Sans MS, cursive',
                  fontSize: 22,
                  color: '#008000',
                  marginBottom: 8,
                }}
              >
                • BEST PRICES GUARANTEED!!!
              </div>
            </div>

            {/* Spinning gear */}
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                right: 30,
                fontSize: 52,
                transform: `rotate(${gearRotation}deg)`,
              }}
            >
              ⚙️
            </div>

            {/* Last updated notice */}
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                left: 20,
                fontFamily: 'serif',
                fontSize: 14,
                color: '#555',
                fontStyle: 'italic',
              }}
            >
              Last updated: March 2019
            </div>

            {/* Blinking "NEW!" element */}
            <div
              style={{
                position: 'absolute',
                top: 80,
                right: 20,
                backgroundColor: '#ff00ff',
                color: '#ffff00',
                fontFamily: 'serif',
                fontSize: 20,
                fontWeight: 'bold',
                padding: '4px 8px',
                border: '3px solid #000',
                opacity: Math.round(frame / 4) % 2 === 0 ? 1 : 0.3,  // "Blink" effect
              }}
            >
              ★ NEW! ★
            </div>
          </div>
        </div>
      </div>

      {/* Text overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: 60,
          right: 60,
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 56,
            fontWeight: '500',
            color: colors.textPrimary,
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          This is what your customers see.
        </div>
      </div>
    </AbsoluteFill>
  )
}
