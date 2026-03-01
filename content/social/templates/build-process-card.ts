/**
 * content/social/templates/build-process-card.ts
 * bienzoli Social Card — Build Process / Behind-the-Scenes
 *
 * Shows: large delivery time in lagoon, 3 step cards (Brief → Build → Live),
 * tagline, bienzoli.com footer.
 *
 * Design system: dark mode tokens from docs/brand/design-system.md §9.2
 */

export interface BuildProcessCardData {
  deliveryTime?: string  // "48 Hours" — displayed large in lagoon accent
  tagline?: string       // Optional override for the bottom tagline
}

export function buildProcessCard(data: BuildProcessCardData): string {
  const {
    deliveryTime = '48 Hours',
    tagline = 'From brief to live. No WordPress. No templates. Just clean code.',
  } = data

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
    display: flex; flex-direction: column;
    padding: 64px;
    position: relative;
  }
  .glow-lagoon {
    position: absolute; top: -100px; right: -100px;
    width: 700px; height: 700px;
    background: radial-gradient(circle, hsla(199,89%,48%,0.16) 0%, transparent 65%);
    pointer-events: none;
  }
  .header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 56px; position: relative; z-index: 1;
  }
  .brand {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 26px; font-weight: 700;
    color: hsl(199, 89%, 48%);
    letter-spacing: -0.5px;
  }
  .bts-tag {
    font-size: 13px; font-weight: 600;
    color: hsl(218, 11%, 50%);
    background: hsl(224, 14%, 8%);
    border: 1px solid hsl(223, 13%, 14%);
    padding: 6px 16px; border-radius: 100px;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .hero-number {
    position: relative; z-index: 1;
    margin-bottom: 48px;
  }
  .label-small {
    font-size: 13px; font-weight: 700;
    color: hsl(218, 11%, 50%);
    letter-spacing: 0.16em; text-transform: uppercase;
    display: block; margin-bottom: 8px;
  }
  .delivery-time {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 88px; font-weight: 700;
    color: hsl(199, 89%, 48%);
    letter-spacing: -3px; line-height: 1;
  }
  .steps {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;
    position: relative; z-index: 1;
    flex: 1; align-items: stretch;
  }
  .step {
    background: hsl(224, 14%, 8%);
    border: 1px solid hsl(223, 13%, 14%);
    border-radius: 20px;
    padding: 28px;
    display: flex; flex-direction: column;
  }
  .step-num {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px; font-weight: 700;
    color: hsl(24, 94%, 53%);
    letter-spacing: 0.18em; text-transform: uppercase;
    margin-bottom: 16px;
  }
  .step-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px; font-weight: 700;
    color: hsl(210, 20%, 95%);
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .step-desc {
    font-size: 14px; line-height: 1.55;
    color: hsl(210, 16%, 72%);
    flex: 1;
  }
  .footer {
    margin-top: 32px; position: relative; z-index: 1;
    display: flex; align-items: center; justify-content: space-between;
  }
  .tagline { font-size: 16px; color: hsl(218, 11%, 50%); max-width: 560px; }
  .footer-url { font-size: 16px; font-weight: 500; color: hsl(199, 89%, 48%); }
</style>
</head>
<body>
  <div class="glow-lagoon"></div>
  <div class="header">
    <span class="brand">bienzoli</span>
    <span class="bts-tag">How We Build</span>
  </div>
  <div class="hero-number">
    <span class="label-small">Delivery time</span>
    <div class="delivery-time">${deliveryTime}</div>
  </div>
  <div class="steps">
    <div class="step">
      <div class="step-num">Step 01</div>
      <div class="step-title">Brief</div>
      <div class="step-desc">30-minute call. We understand your business, your clients, your goals.</div>
    </div>
    <div class="step">
      <div class="step-num">Step 02</div>
      <div class="step-title">Build</div>
      <div class="step-desc">Next.js site coded from scratch. First design pass within 12 hours.</div>
    </div>
    <div class="step">
      <div class="step-num">Step 03</div>
      <div class="step-title">Live</div>
      <div class="step-desc">Review, revisions, deploy. Domain + hosting + SSL all configured.</div>
    </div>
  </div>
  <div class="footer">
    <span class="tagline">${tagline}</span>
    <span class="footer-url">bienzoli.com</span>
  </div>
</body>
</html>`
}
