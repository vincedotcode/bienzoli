/**
 * Remotion configuration — bienzoli Vox Hook Video
 *
 * Entry point: content/videos/vox-hook/src/Root.tsx
 * Public dir:  content/videos/vox-hook/public/
 *
 * Preview: npm run video:vox:dev
 * Render:  npm run video:vox:render
 */

import { Config } from '@remotion/cli/config'

Config.setPublicDir('content/videos/vox-hook/public')
Config.setVideoImageFormat('jpeg')
Config.setOverwriteOutput(true)
