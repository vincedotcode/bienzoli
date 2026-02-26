# Audio Assets — bienzoli TikTok Intro

All audio files must be royalty-free and cleared for **commercial use**.

## Required Files

| File | Description | Duration | Suggested Sources |
|---|---|---|---|
| `ambient-beat.mp3` | Subtle modern bass loop — minimal/electronic, low-freq pulse | 15s+ (loops) | Uppbeat, Pixabay |
| `impact.mp3` | Heavy bass drop / cinematic hit | <1s | Freesound, Pixabay |
| `whoosh-1.mp3` | Fast horizontal whoosh, clean, directional feel | <1s | Freesound |
| `whoosh-2.mp3` | Secondary whoosh, slightly different pitch/texture | <1s | Freesound |
| `glitch.mp3` | Digital glitch/distortion — harsh burst, clean cut | 0.5–1s | Freesound, Pixabay |
| `typing.mp3` | Rapid mechanical keyboard burst | 1–2s | Freesound |
| `success.mp3` | Bright achievement chime, ascending tone | 1–2s | Freesound, Pixabay |
| `tick.mp3` | Single click/tick (for counter animation, plays every 2 frames) | <0.2s | Freesound |

## Sourcing

**Pixabay** — `pixabay.com/sound-effects`
Free, no attribution required for commercial use.
Search: "bass drop", "whoosh", "glitch", "typing", "success chime"

**Freesound** — `freesound.org`
Free, check individual license (prefer CC0 or CC BY).
Search: "impact bass", "transition whoosh", "digital glitch", "keyboard type", "tick click"

**Uppbeat** — `uppbeat.io`
Free tier available. Attribution may be required.
Good for background beats and ambient tracks.

**Zapsplat** — `zapsplat.com`
Free with account. Professional quality SFX library.

## Licensing Requirement

bienzoli uses these videos commercially (client marketing, social media).
**Only use sounds licensed for commercial use.** CC0 and Royalty-Free Commercial licenses are acceptable.
Avoid CC BY-SA (share-alike) and CC BY-NC (non-commercial) licenses.

## Installation

1. Source and download each file
2. Rename to the exact filenames listed above
3. Place in this folder: `content/videos/tiktok-intro/public/audio/`
4. Open `content/videos/tiktok-intro/src/TikTokIntro.tsx`
5. Set `const AUDIO_ENABLED = true`
6. Run `npm run video:preview` to verify sync

## Frame-Accurate SFX Timing

The SFX are synced to specific absolute frames (see TikTokIntro.tsx):
- Frame 0:   `impact.mp3` — bass hit on "Your business" text
- Frame 45:  `whoosh-1.mp3` — Scene 2 entry
- Frame 90:  `glitch.mp3` — Transformation glitch
- Frame 120: `whoosh-2.mp3` — Speed counter entry
- Frame 158: `typing.mp3` — Features scene
- Frame 205: `impact.mp3` — Price reveal
- Frame 275: `success.mp3` — CTA reveal
- Frames 123–143: `tick.mp3` every 2 frames — counter animation
