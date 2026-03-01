/**
 * Scene 6 — The CTA (150 frames, 5.0s)
 *
 * bienzoli wordmark + domain + WhatsApp CTA + Kreol line
 *
 * Timing (seq-relative):
 *   frame 0  — shutterModern + whip: "bienzoli" slams in
 *   frame 12 — accent underline
 *   frame 18 — domain reveals (mouseClick)
 *   frame 28 — CTA button bounces in (whip)
 *   frame 55 — Kreol line (uiSwitch)
 *   frame 70 — sub-note (mouseClick)
 *   frame 90 — CTA pulse 1 (mouseClick)
 *   frame 130 — CTA pulse 2 (mouseClick)
 *   Pulses loop every 40 frames from frame 50
 */

import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { colors, fonts, typeScale, spacing } from '../utils/theme'
import { springs } from '../utils/springs'
import { MotionGrid } from '../components/MotionGrid'

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const p = (start: number, cfg = springs.SLAM) =>
    spring({ frame: frame - start, fps, config: cfg })

  const fade = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const slideUp = (start: number, end: number, dy = 30) =>
    interpolate(frame, [start, end], [dy, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Logo slam
  const logoP = p(0)
  const logoOpacity = interpolate(logoP, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const logoY = interpolate(logoP, [0, 1], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Domain
  const domainP = p(18, springs.SNAPPY)
  const domainOpacity = interpolate(domainP, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const domainY = interpolate(domainP, [0, 1], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // CTA button
  const ctaP = p(28, springs.BOUNCY)
  const ctaScale = interpolate(ctaP, [0, 1], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const ctaOpacity = interpolate(ctaP, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Pulse every 40 frames from frame 50
  const pulsePhase = (frame - 50) % 40
  const pulseP = frame >= 50 ? spring({ frame: pulsePhase, fps, config: springs.BOUNCY }) : 0
  const pulseScale = frame >= 50
    ? interpolate(pulseP, [0, 0.5, 1], [1, 1.05, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 1

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <MotionGrid opacity={0.45} speed={0.3} />

      {/* Lagoon glow — bottom */}
      <div style={{
        position: 'absolute', bottom: '20%', left: '50%',
        transform: 'translate(-50%, 50%)',
        width: 900, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, hsla(199,89%,48%,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: `0 ${spacing.sidePad}px`,
        textAlign: 'center', gap: 0,
      }}>
        {/* bienzoli wordmark */}
        <div style={{
          opacity: logoOpacity, transform: `translateY(${logoY}px)`,
          marginBottom: 20,
        }}>
          <span style={{
            fontFamily: fonts.display, fontWeight: 900,
            fontSize: 140, color: colors.textPrimary,
            letterSpacing: -8, lineHeight: 0.88,
          }}>
            bienzoli
          </span>
        </div>

        {/* Lagoon accent line */}
        <div style={{
          width: 80, height: 3,
          backgroundColor: colors.lagoon, borderRadius: 2,
          marginBottom: 28,
          opacity: fade(12, 24),
          boxShadow: `0 0 16px 2px ${colors.lagoon}`,
        }} />

        {/* Domain */}
        <div style={{
          opacity: domainOpacity,
          transform: `translateY(${domainY}px)`,
          marginBottom: 52,
        }}>
          <span style={{
            fontFamily: fonts.mono, fontWeight: 500,
            fontSize: typeScale.sub, color: colors.lagoon, letterSpacing: 2,
          }}>
            bienzoli.com
          </span>
        </div>

        {/* WhatsApp CTA button */}
        <div style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale * pulseScale})`,
          marginBottom: 48,
        }}>
          <div style={{
            background: colors.lagoon, borderRadius: 100,
            padding: '28px 72px',
            display: 'flex', alignItems: 'center', gap: 20,
            boxShadow: `0 0 40px 8px ${colors.lagoonGlow}`,
          }}>
            {/* WhatsApp icon */}
            <svg width={40} height={40} viewBox="0 0 24 24" fill={colors.bg}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.115 1.525 5.84L.057 23.857a.5.5 0 0 0 .609.609l6.055-1.463A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.97 0-3.81-.564-5.362-1.54l-.383-.23-3.975.962.98-3.9-.248-.397A9.975 9.975 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            <span style={{
              fontFamily: fonts.display, fontWeight: 800,
              fontSize: typeScale.sub, color: colors.bg, letterSpacing: -1,
            }}>
              Chat on WhatsApp
            </span>
          </div>
        </div>

        {/* Kreol line */}
        <div style={{
          opacity: fade(55, 70),
          transform: `translateY(${slideUp(55, 72)})`,
          marginBottom: 20,
        }}>
          <span style={{
            fontFamily: fonts.display, fontWeight: 700,
            fontSize: typeScale.label, color: colors.lagoon,
            fontStyle: 'italic', letterSpacing: -0.5,
          }}>
            Mo build website ki fer bizness grandi. 🇲🇺
          </span>
        </div>

        {/* No commitment note */}
        <div style={{ opacity: fade(70, 84) }}>
          <span style={{
            fontFamily: fonts.body, fontWeight: 400,
            fontSize: typeScale.tag, color: colors.textSupporting, letterSpacing: 0.5,
          }}>
            Free consultation. No commitment.
          </span>
        </div>
      </div>

      {/* wa.me URL — bottom safe zone */}
      <div style={{
        position: 'absolute', bottom: spacing.safeBottom,
        left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: fade(70, 84),
      }}>
        <span style={{
          fontFamily: fonts.mono, fontSize: typeScale.tag - 4,
          color: colors.textSupporting, letterSpacing: 1,
        }}>
          wa.me/23057901383
        </span>
      </div>
    </AbsoluteFill>
  )
}
