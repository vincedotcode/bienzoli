/**
 * content/social/templates/before-after-card.ts
 * bienzoli Social Card — Website Transformation (Before / After)
 *
 * Shows: split layout — left BEFORE (muted, dark, desaturated look with
 * red label) and right AFTER (lagoon border, clean label). Client name below.
 *
 * Design system: dark mode tokens from docs/brand/design-system.md §9.2
 */

export interface BeforeAfterCardData {
  clientName: string          // "DS Nails"
  beforeDescription: string   // "Facebook page only. No bookings, no SEO, no credibility."
  afterDescription: string    // "Full booking site. 92 PageSpeed. Live in 4 days."
  industry?: string           // "Nail Salon · Mauritius"
}

export function beforeAfterCard(data: BeforeAfterCardData): string {
  const {
    clientName,
    beforeDescription,
    afterDescription,
    industry = '',
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
  .header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 36px; position: relative; z-index: 1;
  }
  .brand {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 26px; font-weight: 700;
    color: hsl(199, 89%, 48%);
    letter-spacing: -0.5px;
  }
  .transform-tag {
    font-size: 13px; font-weight: 600;
    color: hsl(218, 11%, 50%);
    background: hsl(224, 14%, 8%);
    border: 1px solid hsl(223, 13%, 14%);
    padding: 6px 16px; border-radius: 100px;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .comparison {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    flex: 1; position: relative; z-index: 1;
  }
  .panel {
    border-radius: 20px;
    overflow: hidden;
    display: flex; flex-direction: column;
  }
  .panel-before {
    background: hsl(225, 10%, 7%);
    border: 1px solid hsl(223, 13%, 12%);
    filter: saturate(0.3);
  }
  .panel-after {
    background: hsl(224, 14%, 9%);
    border: 1px solid hsla(199,89%,48%,0.4);
    filter: none;
  }
  .panel-label {
    padding: 14px 24px;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    border-bottom: 1px solid transparent;
    display: flex; align-items: center; gap: 10px;
  }
  .panel-before .panel-label {
    color: hsl(0, 60%, 60%);
    border-color: hsl(223, 13%, 12%);
    background: hsla(0,60%,15%,0.4);
  }
  .panel-after .panel-label {
    color: hsl(199, 89%, 48%);
    border-color: hsla(199,89%,48%,0.2);
    background: hsla(199,60%,12%,0.5);
  }
  .label-dot {
    width: 8px; height: 8px; border-radius: 50%;
    flex-shrink: 0;
  }
  .panel-before .label-dot { background: hsl(0, 60%, 50%); }
  .panel-after .label-dot { background: hsl(199, 89%, 48%); }
  .panel-content {
    flex: 1;
    padding: 28px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .panel-desc {
    font-size: 18px; line-height: 1.55;
  }
  .panel-before .panel-desc { color: hsl(210, 10%, 50%); }
  .panel-after .panel-desc { color: hsl(210, 16%, 75%); }
  .client-footer {
    position: relative; z-index: 1;
    margin-top: 24px;
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 24px;
    border-top: 1px solid hsl(223, 13%, 14%);
  }
  .client-info { }
  .client-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px; font-weight: 700;
    color: hsl(210, 20%, 95%);
    letter-spacing: -0.5px;
    display: block;
  }
  .client-industry {
    font-size: 15px; color: hsl(218, 11%, 50%);
    display: block; margin-top: 3px;
  }
  .footer-url { font-size: 16px; font-weight: 500; color: hsl(218, 11%, 50%); }
</style>
</head>
<body>
  <div class="header">
    <span class="brand">bienzoli</span>
    <span class="transform-tag">Transformation</span>
  </div>
  <div class="comparison">
    <div class="panel panel-before">
      <div class="panel-label">
        <div class="label-dot"></div>
        Before
      </div>
      <div class="panel-content">
        <p class="panel-desc">${beforeDescription}</p>
      </div>
    </div>
    <div class="panel panel-after">
      <div class="panel-label">
        <div class="label-dot"></div>
        After bienzoli
      </div>
      <div class="panel-content">
        <p class="panel-desc">${afterDescription}</p>
      </div>
    </div>
  </div>
  <div class="client-footer">
    <div class="client-info">
      <span class="client-name">${clientName}</span>
      ${industry ? `<span class="client-industry">${industry}</span>` : ''}
    </div>
    <span class="footer-url">bienzoli.com</span>
  </div>
</body>
</html>`
}
