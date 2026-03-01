/**
 * content/social/templates/stat-card.ts
 * bienzoli Social Card — Single Impressive Statistic
 *
 * Shows: massive number in lagoon, unit text, supporting description,
 * bienzoli.com footer.
 *
 * Design system: dark mode tokens from docs/brand/design-system.md §9.2
 */

export interface StatCardData {
  number: string      // "40+" or "48" or "95"
  unit: string        // "Projects" or "Hours" or "PageSpeed Score"
  description: string // Supporting explanation (1–2 sentences)
}

export function statCard(data: StatCardData): string {
  const { number, unit, description } = data

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
    padding: 80px;
    position: relative;
  }
  .glow-lagoon {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -60%);
    width: 1000px; height: 800px;
    background: radial-gradient(circle, hsla(199,89%,48%,0.16) 0%, transparent 60%);
    pointer-events: none;
  }
  .glow-coral {
    position: absolute; bottom: -100px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, hsla(24,94%,53%,0.10) 0%, transparent 65%);
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
  .stat-tag {
    font-size: 13px; font-weight: 600;
    color: hsl(218, 11%, 50%);
    background: hsl(224, 14%, 8%);
    border: 1px solid hsl(223, 13%, 14%);
    padding: 6px 16px; border-radius: 100px;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .main {
    position: relative; z-index: 1;
    display: flex; flex-direction: column;
    align-items: center; text-align: center;
  }
  .number {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 220px; font-weight: 700;
    color: hsl(199, 89%, 48%);
    letter-spacing: -8px; line-height: 1;
    display: block;
  }
  .unit {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 36px; font-weight: 600;
    color: hsl(210, 20%, 95%);
    letter-spacing: -0.5px;
    margin-top: -8px;
  }
  .description {
    font-size: 22px; line-height: 1.55;
    color: hsl(210, 16%, 72%);
    max-width: 700px;
    margin-top: 24px;
  }
  .footer {
    display: flex; align-items: center; justify-content: space-between;
    position: relative; z-index: 1;
    padding-top: 28px;
    border-top: 1px solid hsl(223, 13%, 14%);
  }
  .footer-url { font-size: 16px; font-weight: 500; color: hsl(218, 11%, 50%); }
  .footer-tag {
    font-size: 13px; color: hsl(218, 11%, 50%);
    letter-spacing: 0.08em; text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="glow-lagoon"></div>
  <div class="glow-coral"></div>
  <div class="header">
    <span class="brand">bienzoli</span>
    <span class="stat-tag">By the Numbers</span>
  </div>
  <div class="main">
    <span class="number">${number}</span>
    <span class="unit">${unit}</span>
    <p class="description">${description}</p>
  </div>
  <div class="footer">
    <span class="footer-url">bienzoli.com</span>
    <span class="footer-tag">Web Agency · Mauritius</span>
  </div>
</body>
</html>`
}
