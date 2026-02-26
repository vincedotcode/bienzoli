/**
 * Scene 3 — THE TRANSFORMATION (local frames 0–29 | 3.0s–4.0s)
 *
 * 8 frames of intense glitch → snap to beautiful bienzoli-built site.
 * Text "This is what we build." springs in from below.
 * Hero moment of the video.
 */

import React from 'react'
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors } from '../utils/colors'
import { displayFont, monoFont } from '../utils/fonts'
import { GlitchEffect } from '../components/GlitchEffect'
import { AnimatedText } from '../components/AnimatedText'

const BeautifulSiteMockup: React.FC = () => (
  <div
    style={{
      borderRadius: 20,
      overflow: 'hidden',
      border: `1.5px solid ${colors.lagoonBorder}`,
      boxShadow: `0 0 60px -12px hsla(199, 89%, 48%, 0.3)`,
    }}
  >
    {/* Browser chrome */}
    <div
      style={{
        backgroundColor: colors.surfaceRaised,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderBottom: `1px solid ${colors.borderDefault}`,
      }}
    >
      {/* Traffic lights */}
      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: colors.borderStrong, opacity: 0.6 }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: colors.borderStrong, opacity: 0.6 }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: colors.borderStrong, opacity: 0.6 }} />
      {/* URL bar */}
      <div
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          borderRadius: 6,
          padding: '5px 12px',
          marginLeft: 8,
          fontFamily: monoFont,
          fontSize: 18,
          color: colors.textSupporting,
          border: `1px solid ${colors.borderDefault}`,
        }}
      >
        nickel-sew.bienzoli.com
      </div>
    </div>

    {/* Beautiful site content */}
    <div
      style={{
        backgroundColor: colors.bg,
        padding: '32px 28px',
        minHeight: 380,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid at very low opacity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, ${colors.borderDefault} 1px, transparent 1px),
            linear-gradient(to bottom, ${colors.borderDefault} 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 500,
          height: 300,
          background: 'radial-gradient(ellipse at center, hsla(199, 89%, 48%, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 36,
          position: 'relative',
        }}
      >
        <div style={{ fontFamily: displayFont, fontSize: 24, fontWeight: '600', color: colors.textPrimary, letterSpacing: '0.02em' }}>
          nickel sew
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Services', 'Gallery', 'Contact'].map((label) => (
            <div key={label} style={{ fontFamily: displayFont, fontSize: 18, color: colors.textSupporting }}>{label}</div>
          ))}
        </div>
        <div
          style={{
            backgroundColor: colors.lagoon,
            color: colors.white,
            fontFamily: displayFont,
            fontSize: 16,
            fontWeight: '600',
            padding: '8px 18px',
            borderRadius: 9999,
          }}
        >
          Book Now
        </div>
      </div>

      {/* Hero headline */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 48,
            fontWeight: '700',
            color: colors.textPrimary,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Tailoring that{' '}
          <span style={{ color: colors.lagoon }}>fits perfectly.</span>
        </div>
      </div>

      {/* Subheadline */}
      <div
        style={{
          fontFamily: displayFont,
          fontSize: 20,
          color: colors.textSecondary,
          marginBottom: 24,
          lineHeight: 1.5,
        }}
      >
        Custom alterations and bespoke clothing in Mauritius.
      </div>

      {/* CTA row */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 28 }}>
        <div
          style={{
            backgroundColor: colors.lagoon,
            color: colors.white,
            fontFamily: displayFont,
            fontSize: 18,
            fontWeight: '600',
            padding: '10px 24px',
            borderRadius: 9999,
          }}
        >
          Get a Quote
        </div>
        <div
          style={{
            border: `1px solid ${colors.borderDefault}`,
            color: colors.textPrimary,
            fontFamily: displayFont,
            fontSize: 18,
            fontWeight: '500',
            padding: '10px 24px',
            borderRadius: 9999,
          }}
        >
          View Gallery
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 32 }}>
        {[['200+', 'Clients'], ['10yr', 'Experience'], ['100%', 'Satisfaction']].map(([val, lbl]) => (
          <div key={val}>
            <div style={{ fontFamily: displayFont, fontSize: 26, fontWeight: '700', color: colors.textPrimary }}>{val}</div>
            <div style={{ fontFamily: displayFont, fontSize: 14, color: colors.textSupporting }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export const Scene3Transform: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Show glitch for frames 0–7 (8 frames)
  const isGlitching = frame < 8

  // After glitch: site entrance spring (frame 8 onward)
  const siteProgress = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 200 },
    durationInFrames: 15,
  })
  const siteScale = interpolate(siteProgress, [0, 0.6, 1], [1.02, 0.99, 1])
  const siteOpacity = interpolate(siteProgress, [0, 0.1], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
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

      {/* Beautiful site mockup */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 60,
          right: 60,
          transform: `scale(${siteScale})`,
          opacity: siteOpacity,
        }}
      >
        {isGlitching ? (
          <GlitchEffect durationInFrames={8} intensity={18}>
            <BeautifulSiteMockup />
          </GlitchEffect>
        ) : (
          <BeautifulSiteMockup />
        )}
      </div>

      {/* "This is what we build." — springs in from below at frame 15 */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 60,
          right: 60,
        }}
      >
        <AnimatedText delay={15} preset="punchy" fromY={60}>
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 72,
              fontWeight: '700',
              color: colors.lagoon,
              textAlign: 'center',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            This is what we build.
          </div>
        </AnimatedText>
      </div>
    </AbsoluteFill>
  )
}
