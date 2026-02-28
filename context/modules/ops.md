# Operations Module — bienzoli

> Full templates: `docs/business/contract-template.md`, `docs/business/invoice-template.md`
> Referral system: `docs/business/referral-programme.md`

## Legal Entity

- Company: **vincedotcode ltd**
- BRN: Registered in Mauritius
- Client-facing brand: **bienzoli**
- Professional email: vince@bienzoli.com | hello@bienzoli.com

## Payment

- Methods: Bank transfer | MCB Juice | my.t money
- All amounts in MUR (Mauritian Rupees)
- Terms:
  - Flic en Flac + Port Louis: 50% upfront, 50% on delivery
  - Grand Baie + Le Morne: milestone-based (negotiate per project)

## Costs (Internal Reference)

| Item | Cost |
|------|------|
| Vercel hosting (small site) | ~$0/month (free tier) |
| Vercel Pro (larger projects) | ~$20/month |
| Domain (.com via Namecheap/Cloudflare) | ~Rs 500–800/year |
| Anthropic/OpenAI API (chatbot) | Usage-based |

## Client Contract Protocol

1. Generate contract from `docs/business/contract-template.md`
2. Client signs **before work begins** — no exceptions
3. Invoice generated from `docs/business/invoice-template.md`
4. Collect upfront payment before starting
5. Log client in `logs/clients.md`

## Invoice Format (vincedotcode ltd)

- Company name: vincedotcode ltd
- Brand displayed: bienzoli
- Include: BRN, bank details, payment methods, due date
- Template: `docs/business/invoice-template.md`

## Referral Programme

- Existing clients who refer a converting client get: Rs 2,000 off next project OR 1 month free retainer
- Track referral source in `logs/clients.md`
- Follow up with referral ask after every successful delivery

## Revenue Tracking (`logs/clients.md`)

Log for every client:
- Client name, business type, package tier
- Total amount, upfront paid, final paid
- Delivery date, support expiry
- Referral source (if any)
- Notes (testimonial received, upsell potential)

## Subscriptions & Tools to Track

- Vercel (hosting)
- Namecheap/Cloudflare (domains)
- Google Analytics (free)
- Anthropic/OpenAI API keys
- Facebook Graph API access
- GitHub (Actions, repos)
