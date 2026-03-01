/**
 * content/social/templates/speed-test-card.ts
 * bienzoli Social Card — PageSpeed Comparison
 *
 * Shows: split layout — left side (coral/red = competitor low score)
 * vs right side (lagoon = bienzoli high score). Dramatic contrast.
 *
 * Design system: dark mode tokens from docs/brand/design-system.md §9.2
 */

export interface SpeedTestCardData {
  competitorName?: string  // "WordPress" or "Typical Mauritius Site"
  competitorScore: string  // "38" — displayed large in red/coral
  bienzolScore: string     // "97" — displayed large in lagoon
  headline?: string        // Card headline (default: "The speed gap.")
  testDate?: string        // "Feb 2026" — shown in supporting text
}

export function speedTestCard(data: SpeedTestCardData): string {
  const {
    competitorName = 'Typical WordPress',
    competitorScore,
    bienzolScore,
    headline = 'The speed gap.',
    testDate = '',
  } = data

  const compNum = parseInt(competitorScore, 10)
  const bienzNum = parseInt(bienzolScore, 10)
  const compBarPct = Math.min(Math.round((compNum / 100) * 100), 100)
  const bienzBarPct = Math.min(Math.round((bienzNum / 100) * 100), 100)

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
  .header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 40px; position: relative; z-index: 1;
  }
  .brand {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 26px; font-weight: 700;
    color: hsl(199, 89%, 48%);
    letter-spacing: -0.5px;
  }
  .tag {
    font-size: 13px; font-weight: 600;
    color: hsl(218, 11%, 50%);
    background: hsl(224, 14%, 8%);
    border: 1px solid hsl(223, 13%, 14%);
    padding: 6px 16px; border-radius: 100px;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .headline {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 48px; font-weight: 700;
    color: hsl(210, 20%, 95%);
    letter-spacing: -1.5px; line-height: 1;
    margin-bottom: 40px;
    position: relative; z-index: 1;
  }
  .comparison {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    flex: 1; position: relative; z-index: 1;
  }
  .side {
    border-radius: 20px;
    padding: 40px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .side-comp {
    background: hsla(0,60%,20%,0.4);
    border: 1px solid hsla(0,84%,60%,0.2);
  }
  .side-bienz {
    background: hsla(199,60%,12%,0.6);
    border: 1px solid hsla(199,89%,48%,0.3);
  }
  .side-label {
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    display: block; margin-bottom: 16px;
  }
  .side-comp .side-label { color: hsla(0,70%,65%,0.8); }
  .side-bienz .side-label { color: hsl(199, 89%, 48%); }
  .site-name {
    font-size: 16px; color: hsl(210, 16%, 72%);
    display: block; margin-bottom: 24px;
  }
  .score-display {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 120px; font-weight: 700;
    letter-spacing: -5px; line-height: 1;
  }
  .side-comp .score-display { color: hsl(0, 70%, 60%); }
  .side-bienz .score-display { color: hsl(199, 89%, 48%); }
  .bar-track {
    height: 8px; border-radius: 4px;
    background: hsl(223, 13%, 14%);
    margin-top: 24px; overflow: hidden;
  }
  .bar-fill { height: 100%; border-radius: 4px; }
  .side-comp .bar-fill {
    width: ${compBarPct}%;
    background: hsl(0, 60%, 50%);
  }
  .side-bienz .bar-fill {
    width: ${bienzBarPct}%;
    background: hsl(199, 89%, 48%);
  }
  .side-meta {
    font-size: 13px; color: hsl(218, 11%, 50%);
    margin-top: 12px;
  }
  .footer {
    display: flex; align-items: center; justify-content: space-between;
    position: relative; z-index: 1;
    padding-top: 24px; margin-top: 24px;
    border-top: 1px solid hsl(223, 13%, 14%);
  }
  .footer-note { font-size: 14px; color: hsl(218, 11%, 50%); }
  .footer-url { font-size: 16px; font-weight: 500; color: hsl(199, 89%, 48%); }
</style>
</head>
<body>
  <div class="header">
    <span class="brand">bienzoli</span>
    <span class="tag">PageSpeed</span>
  </div>
  <h1 class="headline">${headline}</h1>
  <div class="comparison">
    <div class="side side-comp">
      <div>
        <span class="side-label">The competition</span>
        <span class="site-name">${competitorName}</span>
        <div class="score-display">${competitorScore}</div>
        <div class="bar-track"><div class="bar-fill"></div></div>
        <div class="side-meta">Fails Core Web Vitals</div>
      </div>
    </div>
    <div class="side side-bienz">
      <div>
        <span class="side-label">bienzoli build</span>
        <span class="site-name">Next.js — clean code</span>
        <div class="score-display">${bienzolScore}</div>
        <div class="bar-track"><div class="bar-fill"></div></div>
        <div class="side-meta">Passes all Core Web Vitals</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span class="footer-note">${testDate ? `Tested ${testDate} · pagespeed.web.dev` : 'pagespeed.web.dev'}</span>
    <span class="footer-url">bienzoli.com</span>
  </div>
</body>
</html>`
}
