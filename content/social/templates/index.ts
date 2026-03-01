/**
 * content/social/templates/index.ts
 * bienzoli Social Card Templates — unified export
 *
 * All templates use dark mode design system tokens (§9.2 of docs/brand/design-system.md).
 * Each exports a typed function that accepts a data object and returns
 * a complete standalone HTML string ready for puppeteer rendering.
 *
 * Usage (TypeScript):
 *   import { portfolioCard } from '@/content/social/templates'
 *   const html = portfolioCard({ clientName: 'Nickel Sew', url: 'nickelsew.com', ... })
 *
 * Template → HTML file mapping (for script compatibility):
 *   portfolio-card.ts   → PortfolioCard.html
 *   tip-card.ts         → TipCard.html
 *   build-process-card  → BuildProcessCard.html
 *   testimonial-card    → TestimonialCard.html
 *   local-card          → LocalEngagementCard.html
 *   pricing-card        → PricingCard.html
 *   speed-test-card     → SpeedTestCard.html
 *   stat-card           → StatCard.html
 *   before-after-card   → BeforeAfterCard.html
 */

export { portfolioCard } from './portfolio-card'
export type { PortfolioCardData } from './portfolio-card'

export { tipCard } from './tip-card'
export type { TipCardData } from './tip-card'

export { buildProcessCard } from './build-process-card'
export type { BuildProcessCardData } from './build-process-card'

export { testimonialCard } from './testimonial-card'
export type { TestimonialCardData } from './testimonial-card'

export { localCard } from './local-card'
export type { LocalCardData } from './local-card'

export { pricingCard } from './pricing-card'
export type { PricingCardData } from './pricing-card'

export { speedTestCard } from './speed-test-card'
export type { SpeedTestCardData } from './speed-test-card'

export { statCard } from './stat-card'
export type { StatCardData } from './stat-card'

export { beforeAfterCard } from './before-after-card'
export type { BeforeAfterCardData } from './before-after-card'
