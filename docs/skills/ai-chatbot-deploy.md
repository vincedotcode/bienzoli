# Skill: AI Chatbot Deploy

**Owner:** AGENT 11 — AI Deployment Specialist
**Collaborator:** AGENT 04 — Platform Engineer
**Prerequisites:** Site shell in Phase 4+ of client-site-build.md. Grand Baie or Le Morne package confirmed.
**Purpose:** Repeatable process for deploying a production-safe, multilingual AI chatbot. Executable by any agent in a cold session.

---

## Phase 0 — Prerequisites

Before starting chatbot work:
- [ ] Site shell built (at minimum Phase 4 of client-site-build.md complete)
- [ ] Package is Grand Baie (basic chatbot) or Le Morne (advanced chatbot)
- [ ] Client chatbot scope confirmed
- [ ] API key ready: `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` for Vercel environment

---

## Phase 1 — COLLECT (Business Knowledge)

Request from client via Agent 05 (Client Success):

**Required:**
- [ ] Complete service list with descriptions
- [ ] Pricing for each service (if client wants it public)
- [ ] Business hours (weekdays, Saturday, Sunday, public holidays)
- [ ] Physical address + Google Maps link (if applicable)
- [ ] Booking/enquiry contact: WhatsApp number, email, or phone
- [ ] Top 10 most common customer questions
- [ ] Things the chatbot should NOT answer (services they don't offer, topics to avoid)
- [ ] Preferred chatbot tone: professional or friendly
- [ ] Languages needed: English / English + French / English + French + Kreol

**Industry-specific additions:**
- Restaurant: menu items, delivery availability, reservation process
- Salon: service duration, booking lead time, cancellation policy
- Clinic: which doctor handles what, appointment booking process, emergency contact
- Car rental: fleet list, daily rates, deposit requirements, airport pickup
- Real estate: property types, viewing request process, geographic coverage

---

## Phase 2 — TRAIN (System Prompt Engineering)

Create `clients/[name]/lib/system-prompt.ts`:

```typescript
export const SYSTEM_PROMPT = `
You are the customer service assistant for [Business Name].

## About Us
[Business name, 2-3 sentence description, location]

## Our Services
[Complete service list with descriptions and prices as provided by client]

## Hours
[Full hours including weekdays, Saturday, Sunday, public holidays]

## Location
[Address and directions]

## Contact
For bookings or to speak with our team: WhatsApp +230 [NUMBER]
Email: [email]

## Language Rules
Detect the visitor's language from their first message.
If Kreol → respond in Kreol.
If French → respond in French.
Default to English.

## Rules
1. Never state prices not listed above. If uncertain: 'For current pricing, contact us on WhatsApp +230 [NUMBER].'
2. For bookings: 'To book, please WhatsApp us at +230 [NUMBER] or email [email].'
3. If asked about competitors: 'I can only speak to our services. Is there something I can help you with?'
4. If conversation is outside your scope: 'I'd recommend reaching our team: +230 [NUMBER].'
5. Keep responses to 2–4 sentences maximum.
6. Never invent information not provided above.
`
```

---

## Phase 3 — BUILD (Chat Widget)

Create `clients/[name]/components/ChatWidget.tsx`:

The widget must include:
- Floating lagoon-colored button (bottom-right, `w-14 h-14 rounded-full`)
- Chat panel (max-width 380px, `border border-border bg-surface-base rounded-2xl`)
- Message bubbles: user right-aligned (lagoon background), bot left-aligned (surface-raised background)
- Typing indicator while waiting for API response
- Close/minimize button
- Input field + Send button
- Mobile: full-screen panel. Desktop: corner panel.
- Design system tokens only — no hardcoded colors

State management:
- `isOpen: boolean`
- `messages: Array<{role: 'user' | 'assistant', content: string}>`
- `isLoading: boolean`
- Error state: display graceful fallback message if API fails

---

## Phase 4 — CONFIGURE (API Route)

Create `clients/[name]/app/api/chat/route.ts`:

Requirements:
- Import `SYSTEM_PROMPT` from `@/lib/system-prompt`
- Use Anthropic SDK (`@anthropic-ai/sdk`) — primary choice
- Model: `claude-haiku-4-5-20251001` for Grand Baie (cost-efficient), `claude-sonnet-4-6` for Le Morne (better reasoning)
- Max tokens: 512 (sufficient for FAQ responses)
- Keep last 10 messages for context (prevent unbounded history)
- Rate limiting: 10 requests per minute per IP address
- Error handling: if API call fails, return graceful WhatsApp fallback message with HTTP 200 (not 500)
- API key: read from `process.env.ANTHROPIC_API_KEY` — never hardcoded

Add to Vercel environment variables:
```
ANTHROPIC_API_KEY=[key]
```

---

## Phase 5 — LANGUAGES (Multilingual Validation)

Test in all required languages using this standard test script:

**10 Standard Test Questions (ask in EN, FR, and Kreol):**
1. What services do you offer?
2. What are your prices?
3. What are your opening hours?
4. Where are you located?
5. How do I make a booking?
6. Do you have availability this week?
7. What payment methods do you accept?
8. I want to speak to a real person.
9. [Out-of-scope question for this business type]
10. [One industry-specific question]

**Kreol question examples:**
1. Ki services zot pena?
2. Ki bann prix zot ena?
3. Ki ler zot ouver?
4. Kot zot ete?
5. Kouma mo kapav fer enn booking?

**Pass criteria:**
- [ ] All factual answers match client-provided information exactly
- [ ] Escalation to WhatsApp/contact info works
- [ ] Out-of-scope question routes to human contact
- [ ] Kreol responses sound natural (not translated)
- [ ] French grammar is correct (no Anglicisms)
- [ ] "Speak to real person" gives correct contact info

---

## Phase 6 — DEPLOY

1. Add `<ChatWidget />` to client site layout (bottom of `app/layout.tsx` body)
2. Verify API route accessible at `/api/chat`
3. Deploy to Vercel production
4. Test chatbot on production URL (API must work on production domain)
5. Confirm API key is in Vercel environment variables, NOT hardcoded in any file

---

## Phase 7 — MONITOR (First Week)

Days 1–7:
- Check Vercel function logs for `/api/chat` errors daily
- Review conversation patterns:
  - Questions answered poorly or incorrectly
  - Questions refused that should have been answered
  - Tone mismatches
  - Information missing from system prompt
- Update `lib/system-prompt.ts` based on findings and redeploy

---

## Phase 8 — REFINE

After first week:
- Compile performance summary for Client Success (Agent 05) to share with client
- Update `docs/skills/ai-chatbot-deploy.md` if any process improvements discovered
- Log any significant prompt engineering improvements in `logs/decisions.md`

---

## Guardrails (Always Required in System Prompt)
- Never invent prices/services outside client-provided data
- Never confirm bookings (route to contact channel)
- Neutral on competitor mentions
- Human fallback for aggressive/abusive conversations
- Responses max 2–4 sentences

---

## Exit Criteria

Chatbot fully deployed when:
- [ ] Widget renders on all pages (desktop + mobile)
- [ ] API route responding correctly in production
- [ ] 10-question test passed in all required languages
- [ ] Rate limiting active
- [ ] Error fallback tested and working
- [ ] API key in Vercel environment, NOT in git
- [ ] First-week monitoring planned
- [ ] Client informed chatbot is live
