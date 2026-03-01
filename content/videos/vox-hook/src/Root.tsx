/**
 * bienzoli Vox Hook — Remotion Root
 *
 * 9:16 vertical | 1080×1920 | 30fps | 23s (690 frames)
 *
 * Preview: npm run video:vox:dev
 * Render:  npm run video:vox:render
 */

import React from 'react'
import { Composition, registerRoot } from 'remotion'
import { VoxHook } from './VoxHook'

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="VoxHook"
      component={VoxHook}
      durationInFrames={690}
      fps={30}
      width={1080}
      height={1920}
    />
  )
}

registerRoot(RemotionRoot)
