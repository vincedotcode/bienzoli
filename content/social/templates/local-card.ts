/**
 * content/social/templates/local-card.ts
 * bienzoli Social Card — Local / Kreol Engagement
 *
 * Shows: Mauritius flag emoji, large Kreol headline (centered),
 * English translation smaller below, CTA + bienzoli.com footer.
 *
 * Design system: dark mode tokens from docs/brand/design-system.md §9.2
 */

export interface LocalCardData {
  kreolText: string          // Main Kreol headline (displayed large, centered)
  englishTranslation: string // English summary/translation below
  ctaText?: string           // Optional CTA line (default: "bienzoli.com")
  flagEmoji?: string         // Default "🇲🇺"
}

export function localCard(data: LocalCardData): string {
  const {
    kreolText,
    englishTranslation,
    ctaText = '',
    flagEmoji = '🇲🇺',
  } = data

  return `<!DOCTYPE html>
<html lang="fr">
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
    padding: 64px;
    position: relative;
  }
  .glow-lagoon {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -60%);
    width: 900px; height: 700px;
    background: radial-gradient(circle, hsla(199,89%,48%,0.12) 0%, transparent 60%);
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
  .local-tag {
    font-size: 13px; font-weight: 600;
    color: hsl(199, 89%, 48%);
    background: hsla(199,89%,48%,0.1);
    border: 1px solid hsla(199,89%,48%,0.25);
    padding: 6px 16px; border-radius: 100px;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .main {
    position: relative; z-index: 1;
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 0 32px;
    gap: 28px;
  }
  .flag { font-size: 72px; line-height: 1; }
  .kreol-headline {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 58px; font-weight: 700;
    color: hsl(210, 20%, 95%);
    letter-spacing: -2px; line-height: 1.08;
  }
  .kreol-headline em {
    font-style: normal;
    color: hsl(199, 89%, 48%);
  }
  .divider {
    width: 48px; height: 2px;
    background: hsl(223, 13%, 22%);
    border-radius: 2px;
  }
  .english-translation {
    font-size: 19px; line-height: 1.6;
    color: hsl(210, 16%, 72%);
    max-width: 720px;
  }
  ${ctaText ? `.cta-text {
    font-size: 16px; font-weight: 600;
    color: hsl(24, 94%, 53%);
    background: hsla(24,94%,53%,0.1);
    border: 1px solid hsla(24,94%,53%,0.25);
    padding: 10px 24px; border-radius: 100px;
    letter-spacing: 0.02em;
  }` : ''}
  .footer {
    display: flex; align-items: center; justify-content: space-between;
    position: relative; z-index: 1;
    padding-top: 24px;
    border-top: 1px solid hsl(223, 13%, 14%);
  }
  .footer-url { font-size: 16px; font-weight: 500; color: hsl(218, 11%, 50%); }
  .footer-wa {
    font-size: 15px; color: hsl(218, 11%, 50%);
  }
  .footer-wa strong { color: hsl(199, 89%, 48%); }
</style>
</head>
<body>
  <div class="glow-lagoon"></div>
  <div class="glow-coral"></div>
  <div class="header">
    <span class="brand">bienzoli</span>
    <span class="local-tag">Mauritius Local</span>
  </div>
  <div class="main">
    <span class="flag">${flagEmoji}</span>
    <h1 class="kreol-headline">${kreolText}</h1>
    <div class="divider"></div>
    <p class="english-translation">${englishTranslation}</p>
    ${ctaText ? `<div class="cta-text">${ctaText}</div>` : ''}
  </div>
  <div class="footer">
    <span class="footer-url">bienzoli.com</span>
    <span class="footer-wa">WhatsApp <strong>5790 1383</strong></span>
  </div>
</body>
</html>`
}
