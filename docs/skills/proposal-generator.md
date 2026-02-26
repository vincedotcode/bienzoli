# Skill: Proposal Generator

**Owner:** AGENT 03 — Sales Closer
**Trigger:** Lead has been qualified. Package tier identified. Client has asked "how much does it cost?" or "can you send me a proposal?"
**Purpose:** Produce a clear, scope-safe proposal that matches the client's real needs, states the price honestly, and creates a clear next step. Repeatable process that produces consistent results.

---

## Phase 0 — Qualification Check

Before writing a proposal, the lead must be qualified. Verify:

- [ ] You know what type of business they are (industry, size, location)
- [ ] You understand their primary goal (leads, credibility, booking, selling online)
- [ ] You've identified the right package tier (see packages.md)
- [ ] You have a rough timeline expectation from the client
- [ ] You know their preferred communication channel (WhatsApp / email / both)

If any of these are missing, go back to the qualification conversation. Do not send a generic proposal to an unqualified lead.

---

## Phase 1 — IDENTIFY (Package Tier Selection)

Select the tier based on genuine need, not what pays the most.

**Use FLIC EN FLAC (Rs 8,000) when:**
- First website ever, micro-business
- Single location, single service offering
- Wants to be found and contacted via WhatsApp
- Does not need multiple pages, analytics setup, or professional photography
- Example: mobile hairdresser, food vendor, small market stall

**Use PORT LOUIS (Rs 18,000) when:**
- Wants a complete, professional presence
- Has multiple services to showcase
- Needs contact form + Google Business setup
- Wants analytics to see how the site performs
- Example: salon, restaurant, fitness studio, local service

**Use GRAND BAIE (Rs 35,000) when:**
- Has a real business with operations that need automation
- Needs multi-page structure (5 pages: Home, About, Services, Gallery, Contact)
- Would benefit from an AI chatbot (customers ask repetitive questions)
- Needs WhatsApp lead notifications (so they don't miss leads)
- Example: clinic, real estate agent, car rental, tour operator

**Use LE MORNE (Rs 60,000+) when:**
- Needs a custom system: booking engine, e-commerce, management dashboard, SaaS
- The website is not just a brochure — it's a product or operational tool
- Requires database, authentication, complex integrations
- Example: hotel booking system, multi-location management platform, franchise site

---

## Phase 2 — CUSTOMIZE (Client-Specific Scope)

The proposal must reference THIS client's business — not a generic tier description.

For each included feature, explain it in terms of the client's specific situation:
- NOT: "AI chatbot included"
- YES: "AI chatbot trained on your clinic's services, hours, and appointment process — so your patients get answers at midnight without you lifting a finger"

For WhatsApp integration:
- NOT: "WhatsApp button included"
- YES: "WhatsApp integration so any visitor who clicks 'Book Now' goes straight to your phone with a pre-filled message: 'Hi, I'd like to book a [appointment type]'"

Spend 10 minutes customizing the scope language per client. This is what separates bienzoli proposals from generic freelancer quotes.

---

## Phase 3 — PRICE (Add-Ons and Total)

Start with the package base price.

Check if any add-ons apply:
| Add-On | Cost |
|---|---|
| Copywriting (client can't provide their own text) | Rs 3,000 |
| Professional photography coordination (sourcing photographer) | Quote separately |
| Additional revision round (beyond package limit) | Rs 2,000/round |
| Domain registration fee (note: 1 year included in package) | Rs 0 for year 1 |

**Payment options:**
- Flic en Flac / Port Louis: offer the monthly option (Rs 800/mo or Rs 1,800/mo × 12 months)
- Grand Baie: one-time only, 50/50 split
- Le Morne: 30/40/30 milestone payments

---

## Phase 4 — TIMELINE

Set a specific delivery date based on:
- Current workload (be honest — don't overpromise)
- Package delivery SLA: Flic en Flac 24-48h, Port Louis 3 days, Grand Baie 5-7 days, Le Morne 2-4 weeks
- Asset readiness: if client hasn't sent logo/photos yet, the clock doesn't start until assets arrive

State clearly: "Delivery timeline starts from when we receive your assets and deposit."

---

## Phase 5 — FORMAT

**WhatsApp Proposal Format (for quick closes):**
```
Hi [Name]! Based on our chat, here's what I'd recommend for [Business Name]:

📦 Package: PORT LOUIS — Rs 18,000
✅ What's included:
- Full one-page website (6 sections)
- WhatsApp integration + contact form
- Google Business Profile setup
- Google Analytics
- Custom domain (.com, 1 year)
- Hosting (1 year, Vercel)
- 2 revision rounds

📅 Delivery: 3 days after assets + deposit received
💳 Payment: Rs 9,000 deposit to start + Rs 9,000 on delivery
   (Or: Rs 1,800/month × 12 months)

Next step: Reply to confirm and I'll send the contract + invoice.

Any questions? Happy to explain anything. 🙏
```

**Formal PDF Proposal (for Grand Baie and Le Morne):**
Structure:
1. Cover: bienzoli logo, client business name, "Website Development Proposal", date
2. Executive Summary (3-4 sentences: understanding of their challenge and our recommendation)
3. Scope of Work (detailed — pages, features, integrations)
4. Investment (pricing table, payment schedule, what's included/not included)
5. Timeline (start date, milestone dates, delivery date)
6. About bienzoli (brief agency bio + 2-3 portfolio examples with links)
7. Next Steps (sign contract, send deposit, start date)

---

## Phase 6 — SEND

Deliver via client's preferred channel:
- WhatsApp: send formatted text proposal as above. Follow immediately with a message: "Anything you'd like me to adjust or clarify?"
- Email: send PDF proposal + follow up with WhatsApp: "Just sent over the proposal by email — let me know if you have any questions."

Send time: Tuesday–Thursday, 10am–2pm Mauritius time performs best. Avoid Friday afternoon and Monday morning.

---

## Phase 7 — FOLLOW-UP

If no response after 3 days:

**Follow-up script (WhatsApp):**
```
Hi [Name], just following up on the proposal I sent [X days ago]. Happy to answer any questions or adjust the scope if anything doesn't feel right. No pressure at all — just want to make sure it landed. 🙏
```

If still no response after another 3 days:

**Second follow-up:**
```
Hi [Name]! Last message — I'll leave it with you. If you decide to move forward with a website, you know where to find us. bienzoli.com / +230 5790 1383. All the best! Vince
```

After second follow-up with no response: log as "unresponsive" in clients.md. Add back to cold outreach queue in 30 days.

---

## Phase 8 — CLOSE

When client says yes:

1. Confirm the exact scope and price via WhatsApp: "Perfect! Just confirming: [package] at Rs [price], delivery in [timeline]. I'll send the contract and deposit invoice right away."
2. Hand off to Agent 08 (Business Operations): generate contract and invoice
3. Log in `logs/clients.md` as "Contract pending"
4. Set a 24-hour reminder: if contract not signed within 24 hours, send a gentle check-in

---

## Exit Criteria

A proposal is successfully closed when:
- [ ] Contract signed by client
- [ ] Deposit received and confirmed
- [ ] `logs/clients.md` updated with: client name, package, value, deposit amount, expected delivery date
- [ ] `docs/clients/[name]/brief.md` created
- [ ] Handoff to Client Success (Agent 05) for onboarding triggered

---

## Quality Standards

Every proposal that goes out must pass:
1. **Correct tier:** Does this package genuinely match the client's needs?
2. **Scope customized:** Are the features described in the client's own context, not generic bullets?
3. **Honest timeline:** Is the delivery date achievable given current workload?
4. **Payment clear:** Is the payment schedule explicit — amount 1, amount 2, due dates?
5. **What's NOT included stated:** Prevents post-project disputes.
6. **No price reduction offered:** Scope was adjusted if needed, not price for same scope.
