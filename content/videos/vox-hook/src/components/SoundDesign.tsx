/**
 * SoundDesign — Full sound design for the Vox Hook video
 *
 * All 7 available @remotion/sfx sounds used:
 *   whip          — hard word slams, price reveals, stat landings
 *   whoosh        — scene transitions
 *   pageTurn      — Scene 4 Proof transition (softer reveal)
 *   uiSwitch      — secondary word reveals, toggle-style elements
 *   mouseClick    — small UI moments (chips, badges, tags)
 *   shutterModern — bienzoli logo reveal in Scene 6
 *   shutterOld    — Scene 1 "money." highlight sweep (vintage emphasis)
 *
 * Scene boundaries (absolute frames):
 *   Scene 1 — Hook:    0
 *   Scene 2 — Stat:    90
 *   Scene 3 — Problem: 210
 *   Scene 4 — Proof:   300
 *   Scene 5 — Offer:   420
 *   Scene 6 — CTA:     540
 *   End:               690
 */

import React from 'react'
import { Sequence, Audio } from 'remotion'
import {
  whip,
  whoosh,
  pageTurn,
  uiSwitch,
  mouseClick,
  shutterModern,
  shutterOld,
} from '@remotion/sfx'

interface SoundDesignProps {
  enabled?: boolean
}

// ─── Scene offsets ─────────────────────────────────────────────────────────
const S1 = 0
const S2 = 90
const S3 = 210
const S4 = 300
const S5 = 420
const S6 = 540

// ─── Sound event type ─────────────────────────────────────────────────────
interface SoundEvent {
  frame: number
  src: string
  volume: number
  label: string
}

// ─── Full sound map ───────────────────────────────────────────────────────
const SOUNDS: SoundEvent[] = [

  // ── Scene 1: Hook ─────────────────────────────────────────────────────
  { frame: S1 + 0,  src: whip,          volume: 0.85, label: 's1-your-slams'       },
  { frame: S1 + 55, src: shutterOld,    volume: 0.60, label: 's1-money-highlight'  },
  { frame: S1 + 52, src: whip,          volume: 0.70, label: 's1-money-slam'       },

  // ── Transition → Scene 2 ─────────────────────────────────────────────
  { frame: S2 - 4,  src: whoosh,        volume: 0.65, label: 't1-whoosh'           },

  // ── Scene 2: Stat ─────────────────────────────────────────────────────
  { frame: S2 + 4,  src: uiSwitch,      volume: 0.50, label: 's2-counter-start'    },
  { frame: S2 + 64, src: whip,          volume: 0.90, label: 's2-stat-lands'       },
  { frame: S2 + 68, src: shutterModern, volume: 0.40, label: 's2-stat-echo'        },
  { frame: S2 + 82, src: mouseClick,    volume: 0.45, label: 's2-subcopy-1'        },
  { frame: S2 + 94, src: mouseClick,    volume: 0.40, label: 's2-subcopy-2'        },
  { frame: S2 + 106,src: uiSwitch,      volume: 0.40, label: 's2-subcopy-3'        },
  { frame: S2 + 112,src: mouseClick,    volume: 0.30, label: 's2-source-tag'       },

  // ── Transition → Scene 3 ─────────────────────────────────────────────
  { frame: S3 - 4,  src: whoosh,        volume: 0.65, label: 't2-whoosh'           },

  // ── Scene 3: Problem ──────────────────────────────────────────────────
  { frame: S3 + 0,  src: whip,          volume: 0.95, label: 's3-no-website-slam'  },
  { frame: S3 + 16, src: uiSwitch,      volume: 0.45, label: 's3-theyre-already'   },
  { frame: S3 + 30, src: uiSwitch,      volume: 0.45, label: 's3-on-your'          },
  { frame: S3 + 44, src: uiSwitch,      volume: 0.55, label: 's3-competitors'      },
  { frame: S3 + 58, src: whip,          volume: 0.80, label: 's3-page-slam'        },

  // ── Transition → Scene 4 ─────────────────────────────────────────────
  { frame: S4 - 4,  src: pageTurn,      volume: 0.55, label: 't3-page-turn'        },

  // ── Scene 4: Proof ────────────────────────────────────────────────────
  { frame: S4 + 0,  src: uiSwitch,      volume: 0.40, label: 's4-header-in'        },
  { frame: S4 + 14, src: mouseClick,    volume: 0.35, label: 's4-bar1-start'       },
  { frame: S4 + 30, src: mouseClick,    volume: 0.35, label: 's4-bar2-start'       },
  { frame: S4 + 60, src: whip,          volume: 0.65, label: 's4-bienzoli-bar-end' },
  { frame: S4 + 80, src: uiSwitch,      volume: 0.50, label: 's4-badge-appears'    },

  // ── Transition → Scene 5 ─────────────────────────────────────────────
  { frame: S5 - 4,  src: whoosh,        volume: 0.65, label: 't4-whoosh'           },

  // ── Scene 5: Offer ────────────────────────────────────────────────────
  { frame: S5 + 0,  src: whip,          volume: 0.85, label: 's5-website-slam'     },
  { frame: S5 + 18, src: whip,          volume: 0.90, label: 's5-48hours-slam'     },
  { frame: S5 + 36, src: pageTurn,      volume: 0.40, label: 's5-divider'          },
  { frame: S5 + 44, src: uiSwitch,      volume: 0.45, label: 's5-from-rs'          },
  { frame: S5 + 58, src: whip,          volume: 0.95, label: 's5-price-slam'       },
  { frame: S5 + 62, src: shutterOld,    volume: 0.35, label: 's5-price-echo'       },
  { frame: S5 + 72, src: mouseClick,    volume: 0.40, label: 's5-chip-1'           },
  { frame: S5 + 78, src: mouseClick,    volume: 0.38, label: 's5-chip-2'           },
  { frame: S5 + 84, src: mouseClick,    volume: 0.36, label: 's5-chip-3'           },

  // ── Transition → Scene 6 ─────────────────────────────────────────────
  { frame: S6 - 4,  src: whoosh,        volume: 0.70, label: 't5-whoosh'           },

  // ── Scene 6: CTA ──────────────────────────────────────────────────────
  { frame: S6 + 0,  src: shutterModern, volume: 0.75, label: 's6-logo-reveal'      },
  { frame: S6 + 4,  src: whip,          volume: 0.70, label: 's6-bienzoli-slam'    },
  { frame: S6 + 18, src: mouseClick,    volume: 0.40, label: 's6-domain-appears'   },
  { frame: S6 + 28, src: whip,          volume: 0.80, label: 's6-cta-bounce'       },
  { frame: S6 + 55, src: uiSwitch,      volume: 0.50, label: 's6-kreol-line'       },
  { frame: S6 + 70, src: mouseClick,    volume: 0.30, label: 's6-sub-note'         },
  { frame: S6 + 90, src: mouseClick,    volume: 0.35, label: 's6-pulse-1'          },
  { frame: S6 + 130,src: mouseClick,    volume: 0.30, label: 's6-pulse-2'          },
]

export const SoundDesign: React.FC<SoundDesignProps> = ({ enabled = true }) => {
  if (!enabled) return null

  return (
    <>
      {SOUNDS.map(({ frame, src, volume, label }) => (
        <Sequence key={label} from={frame} durationInFrames={30}>
          <Audio src={src} volume={volume} />
        </Sequence>
      ))}
    </>
  )
}
