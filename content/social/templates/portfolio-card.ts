/**
 * content/social/templates/portfolio-card.ts
 * bienzoli Social Card — Portfolio / Project Showcase
 *
 * Shows: bienzoli brand + "PORTFOLIO" tag, browser chrome mockup with URL bar,
 * gradient placeholder content area, client info at bottom, PageSpeed badge.
 *
 * Design system: dark mode tokens from docs/brand/design-system.md §9.2
 */

export interface PortfolioCardData {
  clientName: string       // "Nickel Sew"
  industry?: string        // "Tailoring & Alterations" (optional subline)
  location?: string        // "Mauritius" (optional)
  url: string              // "nickelsew.com"
  deliveryTime?: string    // "48 hours"
  packageName?: string     // "Port Louis"
  pageSpeedScore?: string  // "96"
}

export function portfolioCard(data: PortfolioCardData): string {
  const {
    clientName,
    industry = '',
    url,
    deliveryTime = '',
    packageName = '',
    pageSpeedScore = '',
  } = data

  const metaItems = [
    deliveryTime && `<div class="meta-item">Delivered in <strong>${deliveryTime}</strong></div>`,
    packageName && `<div class="divider"></div><div class="meta-item"><strong>${packageName}</strong> package</div>`,
  ].filter(Boolean).join('')

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
    position: relative;
  }
  .glow-lagoon {
    position: absolute; top: -200px; right: -200px;
    width: 700px; height: 700px;
    background: radial-gradient(circle, hsla(199,89%,48%,0.18) 0%, transparent 65%);
    pointer-events: none;
  }
  .glow-coral {
    position: absolute; bottom: -150px; left: -150px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, hsla(24,94%,53%,0.12) 0%, transparent 65%);
    pointer-events: none;
  }
  .header {
    padding: 56px 64px 0;
    display: flex; align-items: center; justify-content: space-between;
  }
  .brand {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px; font-weight: 700;
    color: hsl(199, 89%, 48%);
    letter-spacing: -0.5px;
  }
  .tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    color: hsl(24, 94%, 53%);
    background: hsla(24,94%,53%,0.12);
    border: 1px solid hsla(24,94%,53%,0.3);
    padding: 6px 16px; border-radius: 100px;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .image-area {
    margin: 36px 64px 0;
    flex: 1;
    background: hsl(225, 12%, 9%);
    border: 1px solid hsl(223, 13%, 14%);
    border-radius: 20px;
    overflow: hidden; position: relative;
  }
  .browser-bar {
    height: 44px;
    background: hsl(225, 12%, 7%);
    border-bottom: 1px solid hsl(223, 13%, 14%);
    display: flex; align-items: center; padding: 0 16px; gap: 8px;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot-r { background: #ff5f57; }
  .dot-y { background: #febc2e; }
  .dot-g { background: #28c840; }
  .url-bar {
    flex: 1; margin: 0 16px;
    background: hsl(225, 10%, 12%);
    border-radius: 6px; height: 26px;
    display: flex; align-items: center; padding: 0 12px;
    font-family: 'DM Sans', sans-serif; font-size: 13px;
    color: hsl(218, 11%, 50%);
  }
  .preview-content {
    height: calc(100% - 44px);
    background: linear-gradient(135deg, hsl(225,14%,11%) 0%, hsl(225,12%,8%) 60%, hsl(199,30%,10%) 100%);
    display: flex; align-items: center; justify-content: center;
  }
  .preview-icon { opacity: 0.15; }
  .preview-icon svg { width: 72px; height: 72px; }
  .info { padding: 36px 64px 52px; }
  .client-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 52px; font-weight: 700;
    color: hsl(210, 20%, 95%);
    letter-spacing: -1.5px; line-height: 1.05;
    margin-bottom: 10px;
  }
  .industry {
    font-size: 17px; color: hsl(210, 16%, 72%); margin-bottom: 14px;
  }
  .project-meta {
    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  }
  .meta-item {
    font-size: 15px; color: hsl(218, 11%, 50%);
  }
  .meta-item strong { color: hsl(199, 89%, 48%); font-weight: 600; }
  .divider { width: 4px; height: 4px; border-radius: 50%; background: hsl(223, 13%, 22%); }
  .score-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: hsla(199,89%,48%,0.1);
    border: 1px solid hsla(199,89%,48%,0.3);
    border-radius: 100px;
    padding: 7px 18px; margin-top: 18px;
  }
  .score { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; color: hsl(199, 89%, 48%); }
  .score-label { font-size: 13px; color: hsl(218, 11%, 50%); }
</style>
</head>
<body>
  <div class="glow-lagoon"></div>
  <div class="glow-coral"></div>
  <div class="header">
    <span class="brand">bienzoli</span>
    <span class="tag">Portfolio</span>
  </div>
  <div class="image-area">
    <div class="browser-bar">
      <div class="dot dot-r"></div>
      <div class="dot dot-y"></div>
      <div class="dot dot-g"></div>
      <div class="url-bar">${url}</div>
    </div>
    <div class="preview-content">
      <div class="preview-icon">
        <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="72" height="72" rx="10" fill="hsl(199,89%,48%)"/>
          <path d="M22 50L36 30L50 50" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="50" cy="28" r="7" stroke="white" stroke-width="3"/>
        </svg>
      </div>
    </div>
  </div>
  <div class="info">
    <div class="client-name">${clientName}</div>
    ${industry ? `<div class="industry">${industry}</div>` : ''}
    <div class="project-meta">${metaItems}</div>
    ${pageSpeedScore ? `
    <div class="score-badge">
      <span class="score">${pageSpeedScore}</span>
      <span class="score-label">PageSpeed Score</span>
    </div>` : ''}
  </div>
</body>
</html>`
}
