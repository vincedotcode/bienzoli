/**
 * content/social/templates/testimonial-card.ts
 * bienzoli Social Card — Client Testimonial / Quote
 *
 * Shows: large opening quote mark (lagoon), quote in display font,
 * star rating (coral), client attribution, delivery badge.
 *
 * Design system: dark mode tokens from docs/brand/design-system.md §9.2
 */

export interface TestimonialCardData {
  quote: string          // Full quote text
  clientName: string     // "Ziyaad Ben Eydatoula"
  businessName: string   // "Strategy Consultant" or "Nickel Sew"
  industry?: string      // Optional industry label
  rating?: number        // 1-5, default 5
  deliveryTime?: string  // "72 hours" — shown in lagoon badge
  packageName?: string   // "Port Louis" — shown in badge
  clientInitials?: string // "ZB" — shown in avatar
}

export function testimonialCard(data: TestimonialCardData): string {
  const {
    quote,
    clientName,
    businessName,
    rating = 5,
    deliveryTime = '',
    packageName = '',
    clientInitials = '',
  } = data

  const stars = Array.from({ length: 5 }, (_, i) =>
    `<span class="star" style="color: ${i < rating ? 'hsl(24, 94%, 53%)' : 'hsl(223, 13%, 22%)'}">★</span>`
  ).join('')

  const initials = clientInitials || clientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const badges = [
    deliveryTime && `<div class="badge">Delivered in <strong>${deliveryTime}</strong></div>`,
    packageName && `<div class="badge"><strong>${packageName}</strong> package</div>`,
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
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 64px 80px;
    position: relative;
  }
  .glow-lagoon {
    position: absolute; top: -100px; right: -100px;
    width: 650px; height: 650px;
    background: radial-gradient(circle, hsla(199,89%,48%,0.14) 0%, transparent 65%);
    pointer-events: none;
  }
  .glow-coral {
    position: absolute; bottom: -80px; left: -80px;
    width: 450px; height: 450px;
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
  .stars { display: flex; gap: 6px; }
  .star { font-size: 28px; }
  .quote-section { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .quote-mark {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 120px; line-height: 0.5;
    color: hsl(199, 89%, 48%);
    opacity: 0.2;
    display: block;
    margin-bottom: 24px;
  }
  .quote {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 42px; font-weight: 600;
    color: hsl(210, 20%, 95%);
    letter-spacing: -1px; line-height: 1.2;
    font-style: italic;
  }
  .attribution-section {
    position: relative; z-index: 1;
    border-top: 1px solid hsl(223, 13%, 14%);
    padding-top: 28px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .client-info { display: flex; align-items: center; gap: 20px; }
  .avatar {
    width: 56px; height: 56px; border-radius: 50%;
    background: linear-gradient(135deg, hsla(199,89%,48%,0.3) 0%, hsla(24,94%,53%,0.3) 100%);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .initials {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px; font-weight: 700;
    color: hsl(210, 20%, 95%);
  }
  .name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 20px; font-weight: 600;
    color: hsl(210, 20%, 95%);
    display: block;
  }
  .biz {
    font-size: 15px; color: hsl(218, 11%, 50%);
    display: block; margin-top: 3px;
  }
  .badges { display: flex; gap: 10px; }
  .badge {
    font-size: 13px; color: hsl(210, 16%, 72%);
    background: hsl(224, 14%, 8%);
    border: 1px solid hsl(223, 13%, 14%);
    padding: 6px 14px; border-radius: 100px;
  }
  .badge strong { color: hsl(199, 89%, 48%); }
</style>
</head>
<body>
  <div class="glow-lagoon"></div>
  <div class="glow-coral"></div>
  <div class="header">
    <span class="brand">bienzoli</span>
    <div class="stars">${stars}</div>
  </div>
  <div class="quote-section">
    <span class="quote-mark">&ldquo;</span>
    <p class="quote">${quote}</p>
  </div>
  <div class="attribution-section">
    <div class="client-info">
      <div class="avatar"><span class="initials">${initials}</span></div>
      <div>
        <span class="name">${clientName}</span>
        <span class="biz">${businessName}</span>
      </div>
    </div>
    ${badges ? `<div class="badges">${badges}</div>` : ''}
  </div>
</body>
</html>`
}
