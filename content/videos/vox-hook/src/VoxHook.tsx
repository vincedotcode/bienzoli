/**
 * bienzoli Vox-Style Hook Video — Main Composition
 *
 * Format: 9:16 vertical | 1080×1920 | 30fps | 23s (690 frames)
 *
 * Scene timing (absolute frames):
 *   Scene 1 — Hook:    0–89    (90 frames,  3.0s)
 *   Scene 2 — Stat:    90–209  (120 frames, 4.0s)
 *   Scene 3 — Problem: 210–299 (90 frames,  3.0s)
 *   Scene 4 — Proof:   300–419 (120 frames, 4.0s)
 *   Scene 5 — Offer:   420–539 (120 frames, 4.0s)
 *   Scene 6 — CTA:     540–689 (150 frames, 5.0s)
 *   TOTAL:    690 frames (23s)
 *
 * Sound: 30+ events using all 7 @remotion/sfx sounds.
 * Set SOUND_ENABLED = false to silence during composition.
 */

import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'

import { Scene1Hook }    from './scenes/Scene1-Hook'
import { Scene2Stat }    from './scenes/Scene2-Stat'
import { Scene3Problem } from './scenes/Scene3-Problem'
import { Scene4Proof }   from './scenes/Scene4-Proof'
import { Scene5Offer }   from './scenes/Scene5-Offer'
import { Scene6CTA }     from './scenes/Scene6-CTA'
import { SoundDesign }   from './components/SoundDesign'

const SOUND_ENABLED = true

// ─── Scene boundaries ─────────────────────────────────────────────────────
const S1 = 0
const S2 = 90
const S3 = 210
const S4 = 300
const S5 = 420
const S6 = 540
const TOTAL = 690

export const VoxHook: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0c10' }}>

      {/* ── Sound layer ─────────────────────────────────────────────── */}
      <SoundDesign enabled={SOUND_ENABLED} />

      {/* ── Scene 1: Hook (0–89) ────────────────────────────────────── */}
      <Sequence from={S1} durationInFrames={S2 - S1} premountFor={5}>
        <Scene1Hook />
      </Sequence>

      {/* ── Scene 2: Stat (90–209) ──────────────────────────────────── */}
      <Sequence from={S2} durationInFrames={S3 - S2} premountFor={5}>
        <Scene2Stat />
      </Sequence>

      {/* ── Scene 3: Problem (210–299) ──────────────────────────────── */}
      <Sequence from={S3} durationInFrames={S4 - S3} premountFor={5}>
        <Scene3Problem />
      </Sequence>

      {/* ── Scene 4: Proof (300–419) ────────────────────────────────── */}
      <Sequence from={S4} durationInFrames={S5 - S4} premountFor={5}>
        <Scene4Proof />
      </Sequence>

      {/* ── Scene 5: Offer (420–539) ────────────────────────────────── */}
      <Sequence from={S5} durationInFrames={S6 - S5} premountFor={5}>
        <Scene5Offer />
      </Sequence>

      {/* ── Scene 6: CTA (540–689) ──────────────────────────────────── */}
      <Sequence from={S6} durationInFrames={TOTAL - S6} premountFor={5}>
        <Scene6CTA />
      </Sequence>

    </AbsoluteFill>
  )
}
