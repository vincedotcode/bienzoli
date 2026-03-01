/**
 * content/social/templates/pricing-card.ts
 * bienzoli Social Card — Package / Pricing Spotlight
 *
 * Shows: package name in ALL CAPS lagoon, large price, feature list,
 * CTA, bienzoli.com footer.
 *
 * Design system: dark mode tokens from docs/brand/design-system.md §9.2
 */

export interface PricingCardData {
  packageName: string    // "PORT LOUIS" — displayed in ALL CAPS
  price: string          // "18,000"
  features: string[]     // List of feature strings (max ~6 for visual balance)
  monthlyOption?: string // "Rs 1,800/mo" — shown if provided
  tagline?: string       // Short package description
  highlight?: boolean    // Show lagoon glow (featured tier)
}

export function pricingCard(data: PricingCardData): string {
  const {
    packageName,
    price,
    features,
    monthlyOption = '',
    tagline = '',
    highlight = false,
  } = data

  const featureItems = features.slice(0, 7).map(f =>
    `<div class="feature-item"><span class="check">✓</span><span>${f}</span></div>`
  ).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px; height: 1080px; overflow: hidden;
    background: hsl(225, 16%, 5%);
    font-family: 'DM Sans', sans-serif;
    color: hsl(210, 20%, 95%);
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 72px 80px;
    position: relative;
  }
  .glow-lagoon {
    position: absolute; top: -150px; right: -150px;
    width: 700px; height: 700px;
    background: radial-gradient(circle, hsla(199,89%,48%,${highlight ? '0.22' : '0.14'}) 0%, transparent 65%);
    pointer-events: none;
  }
  .header {
    display: flex; align-items: center; justify-content: space-between;
    position: relative; z-index: 1;
  }
  .brand {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 26px; font-weight: 700;
    color: hsl(199, 89%, 48%);
    letter-spacing: -0.5px;
  }
  .package-tag {
    font-size: 13px; font-weight: 600;
    color: hsl(218, 11%, 50%);
    background: hsl(224, 14%, 8%);
    border: 1px solid hsl(223, 13%, 14%);
    padding: 6px 16px; border-radius: 100px;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .main { position: relative; z-index: 1; }
  .package-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px; font-weight: 700;
    color: hsl(199, 89%, 48%);
    letter-spacing: 0.18em; text-transform: uppercase;
    display: block; margin-bottom: 10px;
  }
  ${tagline ? `.tagline {
    font-size: 18px; color: hsl(210, 16%, 72%);
    display: block; margin-bottom: 24px;
  }` : ''}
  .price-row { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; }
  .price-prefix {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px; font-weight: 600;
    color: hsl(218, 11%, 50%);
  }
  .price {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 80px; font-weight: 700;
    color: hsl(210, 20%, 95%);
    letter-spacing: -2px; line-height: 1;
  }
  .monthly {
    font-size: 16px; color: hsl(218, 11%, 50%);
    display: block; margin-bottom: 32px;
  }
  .features {
    display: flex; flex-direction: column; gap: 14px;
    margin-bottom: 36px;
  }
  .feature-item {
    display: flex; align-items: flex-start; gap: 14px;
    font-size: 18px; color: hsl(210, 16%, 72%);
  }
  .check {
    color: hsl(199, 89%, 48%);
    font-weight: 700; font-size: 20px;
    flex-shrink: 0; margin-top: 1px;
  }
  .footer {
    display: flex; align-items: center; justify-content: space-between;
    position: relative; z-index: 1;
    padding-top: 28px;
    border-top: 1px solid hsl(223, 13%, 14%);
  }
  .footer-url { font-size: 16px; font-weight: 500; color: hsl(218, 11%, 50%); }
  .cta {
    font-size: 15px; font-weight: 600;
    color: hsl(210, 20%, 95%);
    background: hsl(199, 89%, 48%);
    padding: 10px 28px; border-radius: 100px;
  }
</style>
</head>
<body>
  <div class="glow-lagoon"></div>
  <div class="header">
    <span class="brand">bienzoli</span>
    <span class="package-tag">Pricing</span>
  </div>
  <div class="main">
    <span class="package-name">${packageName.toUpperCase()}</span>
    ${tagline ? `<span class="tagline">${tagline}</span>` : ''}
    <div class="price-row">
      <span class="price-prefix">Rs</span>
      <span class="price">${price}</span>
    </div>
    ${monthlyOption ? `<span class="monthly">or ${monthlyOption}</span>` : ''}
    <div class="features">${featureItems}</div>
  </div>
  <div class="footer">
    <span class="footer-url">bienzoli.com</span>
    <span class="cta">Start Your Project</span>
  </div>
</body>
</html>`
}
