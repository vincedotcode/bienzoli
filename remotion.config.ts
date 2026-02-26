/**
 * Remotion configuration — bienzoli
 *
 * Entry point: content/videos/tiktok-intro/src/Root.tsx
 * Public dir:  content/videos/tiktok-intro/public/
 *
 * Preview:  npm run video:preview
 * Render:   npm run video:render
 */

import { Config } from '@remotion/cli/config'

// Point Remotion at the tiktok-intro public folder (not Next.js public/)
Config.setPublicDir('content/videos/tiktok-intro/public')

Config.setVideoImageFormat('jpeg')
Config.setOverwriteOutput(true)
