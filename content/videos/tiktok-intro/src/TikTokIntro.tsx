/**
 * bienzoli TikTok Intro — Main Composition
 *
 * 15 seconds | 450 frames | 30fps | 1080×1920 (9:16)
 *
 * Scene timing (absolute frames):
 *   Scene 1 — Hook:        0–44   (45 frames)
 *   Scene 2 — Problem:     45–89  (45 frames)
 *   Scene 3 — Transform:   90–119 (30 frames)
 *   Scene 4 — Speed:       120–157 (38 frames)
 *   Scene 5 — Features:    158–204 (47 frames)
 *   Scene 6 — Price:       205–274 (70 frames)
 *   Scene 7 — CTA:         275–449 (175 frames)
 *
 * Audio layers (3):
 *   Layer 1 — Ambient beat: continuous, volume curve
 *   Layer 2 — SFX: scene-timed via Sequence
 *   Layer 3 — Tick sounds: counter scene
 *
 * IMPORTANT: Audio requires files in content/videos/tiktok-intro/public/audio/
 * See public/audio/README.md for sourcing instructions.
 * Set AUDIO_ENABLED = true after adding audio files.
 */

import React from 'react'
import { AbsoluteFill, Sequence, Audio, interpolate, staticFile } from 'remotion'

import { Scene1Hook }      from './scenes/Scene1-Hook'
import { Scene2Problem }   from './scenes/Scene2-Problem'
import { Scene3Transform } from './scenes/Scene3-Transform'
import { Scene4Speed }     from './scenes/Scene4-Speed'
import { Scene5Features }  from './scenes/Scene5-Features'
import { Scene6Price }     from './scenes/Scene6-Price'
import { Scene7CTA }       from './scenes/Scene7-CTA'

// ─── Audio flag ──────────────────────────────────────────────────────────────
// Set to true after audio files are placed in public/audio/
const AUDIO_ENABLED = false

// ─── Scene timing ─────────────────────────────────────────────────────────────
const SCENE_1_START = 0
const SCENE_2_START = 45
const SCENE_3_START = 90
const SCENE_4_START = 120
const SCENE_5_START = 158
const SCENE_6_START = 205
const SCENE_7_START = 275
const TOTAL_FRAMES   = 450

// SFX timing (absolute frames)
const SFX_IMPACT_1  = 0
const SFX_WHOOSH_1  = 45
const SFX_GLITCH    = 90
const SFX_WHOOSH_2  = 120
const SFX_TYPING    = 158
const SFX_IMPACT_2  = 205
const SFX_SUCCESS   = 275

// Counter tick range: frames 123–143
const TICK_START = 123
const TICK_END   = 143

export const TikTokIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>

      {/* ──────────────────────────────────────────────────────────────
          AUDIO LAYERS (only rendered when AUDIO_ENABLED = true)
      ────────────────────────────────────────────────────────────── */}
      {AUDIO_ENABLED && (
        <>
          {/* Layer 1: Ambient beat — continuous, volume curve */}
          <Audio
            src={staticFile('audio/ambient-beat.mp3')}
            loop
            volume={(f) =>
              interpolate(
                f,
                [0, 45, 90, 120, 180, 275, 420, 450],
                [0.3, 0.3, 0.15, 0.3, 0.15, 0.3, 0.5, 0],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
              )
            }
          />

          {/* Layer 2: Scene SFX */}
          <Sequence from={SFX_IMPACT_1} durationInFrames={30} premountFor={5}>
            <Audio src={staticFile('audio/impact.mp3')} volume={0.85} />
          </Sequence>

          <Sequence from={SFX_WHOOSH_1} durationInFrames={30} premountFor={5}>
            <Audio src={staticFile('audio/whoosh-1.mp3')} volume={0.65} />
          </Sequence>

          <Sequence from={SFX_GLITCH} durationInFrames={30} premountFor={5}>
            <Audio src={staticFile('audio/glitch.mp3')} volume={0.8} />
          </Sequence>

          <Sequence from={SFX_WHOOSH_2} durationInFrames={30} premountFor={5}>
            <Audio src={staticFile('audio/whoosh-2.mp3')} volume={0.65} />
          </Sequence>

          <Sequence from={SFX_TYPING} durationInFrames={60} premountFor={5}>
            <Audio src={staticFile('audio/typing.mp3')} volume={0.6} />
          </Sequence>

          <Sequence from={SFX_IMPACT_2} durationInFrames={30} premountFor={5}>
            <Audio src={staticFile('audio/impact.mp3')} volume={0.8} />
          </Sequence>

          <Sequence from={SFX_SUCCESS} durationInFrames={60} premountFor={5}>
            <Audio src={staticFile('audio/success.mp3')} volume={0.75} />
          </Sequence>

          {/* Layer 3: Tick sounds during counter (every 2 frames) */}
          {Array.from({ length: Math.ceil((TICK_END - TICK_START) / 2) }, (_, i) => (
            <Sequence
              key={`tick-${i}`}
              from={TICK_START + i * 2}
              durationInFrames={4}
              premountFor={2}
            >
              <Audio src={staticFile('audio/tick.mp3')} volume={0.35} />
            </Sequence>
          ))}

          {/* Counter landing impact (frame 143) */}
          <Sequence from={143} durationInFrames={20} premountFor={5}>
            <Audio src={staticFile('audio/impact.mp3')} volume={0.4} />
          </Sequence>
        </>
      )}

      {/* ──────────────────────────────────────────────────────────────
          VIDEO SCENES
      ────────────────────────────────────────────────────────────── */}

      {/* Scene 1 — The Hook (0–44) */}
      <Sequence
        from={SCENE_1_START}
        durationInFrames={SCENE_2_START - SCENE_1_START}
        premountFor={5}
      >
        <Scene1Hook />
      </Sequence>

      {/* Scene 2 — The Problem (45–89) */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_3_START - SCENE_2_START}
        premountFor={5}
      >
        <Scene2Problem />
      </Sequence>

      {/* Scene 3 — The Transformation (90–119) */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_4_START - SCENE_3_START}
        premountFor={5}
      >
        <Scene3Transform />
      </Sequence>

      {/* Scene 4 — The Speed (120–157) */}
      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_5_START - SCENE_4_START}
        premountFor={5}
      >
        <Scene4Speed />
      </Sequence>

      {/* Scene 5 — The Features (158–204) */}
      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_6_START - SCENE_5_START}
        premountFor={5}
      >
        <Scene5Features />
      </Sequence>

      {/* Scene 6 — The Price (205–274) */}
      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_7_START - SCENE_6_START}
        premountFor={5}
      >
        <Scene6Price />
      </Sequence>

      {/* Scene 7 — The CTA (275–449) */}
      <Sequence
        from={SCENE_7_START}
        durationInFrames={TOTAL_FRAMES - SCENE_7_START}
        premountFor={5}
      >
        <Scene7CTA />
      </Sequence>

    </AbsoluteFill>
  )
}
