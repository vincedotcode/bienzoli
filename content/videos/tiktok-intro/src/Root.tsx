/**
 * bienzoli TikTok Intro — Remotion Root
 *
 * Registers the TikTokIntro composition.
 * 9:16 vertical | 1080×1920 | 30fps | 15s (450 frames)
 */

import React from 'react'
import { Composition, registerRoot } from 'remotion'
import { TikTokIntro } from './TikTokIntro'

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TikTokIntro"
      component={TikTokIntro}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  )
}

registerRoot(RemotionRoot)
