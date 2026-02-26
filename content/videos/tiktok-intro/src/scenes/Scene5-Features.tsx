/**
 * Scene 5 — THE FEATURES (local frames 0–46 | 5.2s–6.8s)
 *
 * Feature tags fly in one by one from different directions.
 * Staggered by 6 frames each. Unison pulse at frames 37–46.
 * All animation via useCurrentFrame().
 */

import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { colors } from '../utils/colors'
import { FeatureTag } from '../components/FeatureTag'

type TagConfig = {
  label: string
  from: 'left' | 'right' | 'top' | 'bottom'
  delay: number
  top: number
  left?: number
  right?: number
}

const TAGS: TagConfig[] = [
  { label: 'AI Chatbot',       from: 'left',   delay: 2,  top: 310, left: 80  },
  { label: 'WhatsApp Ready',   from: 'right',  delay: 8,  top: 460, left: 120 },
  { label: 'Mobile-First',     from: 'bottom', delay: 14, top: 610, left: 90  },
  { label: 'PageSpeed 95+',    from: 'top',    delay: 20, top: 760, left: 60  },
  { label: 'Built in Mauritius', from: 'left', delay: 26, top: 910, left: 80  },
]

export const Scene5Features: React.FC = () => {
  const frame = useCurrentFrame()

  // Pulse start: frame 37
  const PULSE_START = 37

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

      {/* Radial glow — centered */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 1000,
          background: 'radial-gradient(ellipse at center, hsla(199, 89%, 48%, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Label above tags */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 60,
          right: 60,
        }}
      >
        <div
          style={{
            fontFamily: 'inherit',
            fontSize: 36,
            fontWeight: '600',
            color: colors.textSupporting,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Everything included
        </div>
      </div>

      {/* Feature tags */}
      {TAGS.map((tag) => (
        <div
          key={tag.label}
          style={{
            position: 'absolute',
            top: tag.top,
            left: tag.left,
            right: tag.right,
          }}
        >
          <FeatureTag
            delay={tag.delay}
            from={tag.from}
            pulseStart={frame >= PULSE_START ? PULSE_START : undefined}
          >
            {tag.label}
          </FeatureTag>
        </div>
      ))}
    </AbsoluteFill>
  )
}
