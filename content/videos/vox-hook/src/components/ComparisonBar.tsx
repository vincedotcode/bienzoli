/**
 * ComparisonBar — Spring-animated horizontal progress bar for visual comparisons
 *
 * Shows two bars side by side (or stacked) to compare metrics.
 * E.g. "Competitor: 45 PageSpeed" vs "bienzoli: 97 PageSpeed"
 */

import React from 'react'
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { colors, fonts, typeScale } from '../utils/theme'
import { springs } from '../utils/springs'

interface BarItem {
  label: string
  value: number        // 0–100 for percentage bars
  maxValue?: number    // default 100
  color?: string
  glow?: boolean
}

interface ComparisonBarProps {
  items: BarItem[]
  startFrame?: number
  staggerFrames?: number   // delay between each bar animation
  barHeight?: number       // px height of bar track
  maxBarWidth?: number     // px max width of track
  labelSize?: number
  valueSize?: number
  showValue?: boolean      // show number at bar end
  suffix?: string          // e.g. "/100", "%"
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  items,
  startFrame = 0,
  staggerFrames = 10,
  barHeight = 20,
  maxBarWidth = 800,
  labelSize = typeScale.label,
  valueSize = typeScale.sub,
  showValue = true,
  suffix = '',
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
        width: maxBarWidth,
      }}
    >
      {items.map((item, i) => {
        const itemFrame = frame - startFrame - i * staggerFrames
        const maxVal = item.maxValue ?? 100

        // Bar fill width
        const barProgress = spring({
          frame: itemFrame,
          fps,
          config: springs.BAR,
        })
        const fillPct = interpolate(barProgress, [0, 1], [0, (item.value / maxVal) * 100], {
          extrapolateLeft:  'clamp',
          extrapolateRight: 'clamp',
        })

        // Label + value fade in
        const labelOpacity = interpolate(itemFrame, [0, 12], [0, 1], {
          extrapolateLeft:  'clamp',
          extrapolateRight: 'clamp',
        })

        const barColor = item.color ?? colors.lagoon

        return (
          <div key={i} style={{ opacity: labelOpacity }}>
            {/* Label row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 600,
                  fontSize: labelSize,
                  color: colors.textSecondary,
                  letterSpacing: 0.5,
                }}
              >
                {item.label}
              </span>
              {showValue && (
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 800,
                    fontSize: valueSize,
                    color: barColor,
                    letterSpacing: -1,
                  }}
                >
                  {item.value}{suffix}
                </span>
              )}
            </div>

            {/* Track */}
            <div
              style={{
                width: '100%',
                height: barHeight,
                backgroundColor: colors.surfaceElevated,
                borderRadius: barHeight / 2,
                overflow: 'hidden',
                border: `1px solid ${colors.borderDefault}`,
              }}
            >
              {/* Fill */}
              <div
                style={{
                  height: '100%',
                  width: `${fillPct}%`,
                  backgroundColor: barColor,
                  borderRadius: barHeight / 2,
                  boxShadow: item.glow ? `0 0 20px 4px ${barColor}` : 'none',
                  transition: 'none',
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
