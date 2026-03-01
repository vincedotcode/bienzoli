/**
 * content/social/templates/tip-card.ts
 * bienzoli Social Card — Educational Tip
 *
 * Shows: tip number (coral), large headline in quotes (Space Grotesk),
 * lagoon accent divider, body text, bienzoli.com footer.
 *
 * Design system: dark mode tokens from docs/brand/design-system.md §9.2
 */

export interface TipCardData {
  headline: string   // "Your Instagram is not a website."
  body: string       // Supporting explanation (2–3 sentences)
  tipNumber?: string // "01", "02" — displayed in coral (optional)
}

export function tipCard(data: TipCardData): string {
  const { headline, body, tipNumber = '' } = data

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
    position: absolute; top: -150px; left: 50%; transform: translateX(-50%);
    width: 800px; height: 600px;
    background: radial-gradient(circle, hsla(199,89%,48%,0.14) 0%, transparent 65%);
    pointer-events: none;
  }
  .glow-coral {
    position: absolute; bottom: -100px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, hsla(24,94%,53%,0.10) 0%, transparent 65%);
    pointer-events: none;
  }
  .top {
    display: flex; align-items: center; justify-content: space-between;
    position: relative; z-index: 1;
  }
  .brand {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 26px; font-weight: 700;
    color: hsl(199, 89%, 48%);
    letter-spacing: -0.5px;
  }
  .tip-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    color: hsl(24, 94%, 53%);
    background: hsla(24,94%,53%,0.12);
    border: 1px solid hsla(24,94%,53%,0.3);
    padding: 6px 16px; border-radius: 100px;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .main { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .tip-number {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px; font-weight: 700;
    color: hsl(24, 94%, 53%);
    letter-spacing: 0.16em; text-transform: uppercase;
    margin-bottom: 28px;
  }
  .quote-mark {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 96px; line-height: 0.6;
    color: hsl(199, 89%, 48%);
    opacity: 0.25;
    display: block;
    margin-bottom: 16px;
  }
  .headline {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 54px; font-weight: 700;
    color: hsl(210, 20%, 95%);
    letter-spacing: -1.5px; line-height: 1.08;
    margin-bottom: 32px;
  }
  .divider {
    width: 56px; height: 3px;
    background: hsl(199, 89%, 48%);
    border-radius: 2px;
    margin-bottom: 28px;
  }
  .body-text {
    font-size: 20px; line-height: 1.6;
    color: hsl(210, 16%, 72%);
    max-width: 820px;
  }
  .footer {
    display: flex; align-items: center; justify-content: space-between;
    position: relative; z-index: 1;
    padding-top: 32px;
    border-top: 1px solid hsl(223, 13%, 14%);
  }
  .footer-url {
    font-size: 16px; font-weight: 500;
    color: hsl(218, 11%, 50%);
  }
  .footer-tag {
    font-size: 13px; font-weight: 600;
    color: hsl(218, 11%, 50%);
    letter-spacing: 0.08em; text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="glow-lagoon"></div>
  <div class="glow-coral"></div>
  <div class="top">
    <span class="brand">bienzoli</span>
    ${tipNumber ? `<span class="tip-label">Tip ${tipNumber}</span>` : '<span class="tip-label">Quick Tip</span>'}
  </div>
  <div class="main">
    ${tipNumber ? `<div class="tip-number">TIP ${tipNumber.padStart(2, '0')}</div>` : ''}
    <span class="quote-mark">&ldquo;</span>
    <h1 class="headline">${headline}</h1>
    <div class="divider"></div>
    <p class="body-text">${body}</p>
  </div>
  <div class="footer">
    <span class="footer-url">bienzoli.com</span>
    <span class="footer-tag">Web Agency · Mauritius</span>
  </div>
</body>
</html>`
}
