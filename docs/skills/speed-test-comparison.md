# Skill: Speed Test Comparison

**Owner:** AGENT 03 — Sales Closer + AGENT 02 — Content Strategist
**Trigger:** Prospect has an existing website, or competitor benchmark is needed for sales or social content
**Purpose:** Generate objective, visual proof of the performance gap between a prospect's current site (or a competitor's) and a bienzoli-built site. Used in outreach, proposals, and social content.

---

## Phase 1 — IDENTIFY (Select Comparison Targets)

**For sales use (prospect outreach):**
- Target A: The prospect's current website URL
- Target B: A comparable bienzoli-built site (same industry preferred)

**For content use (social media):**
- Target A: A well-known local business's website with a known performance problem
- Target B: A bienzoli-built site in the same industry

**For general proof (agency positioning):**
- Target A: Average WordPress site in Mauritius (use a real local business, ideally a competitor of a bienzoli client)
- Target B: The bienzoli-built version of that client's site

---

## Phase 2 — TEST (PageSpeed Insights)

**Tool:** Google PageSpeed Insights — `https://pagespeed.web.dev/`

For EACH URL (Target A and Target B), run the test twice:
1. Mobile test
2. Desktop test

**Data to capture for each test:**
- Overall Performance Score (0–100)
- Core Web Vitals:
  - LCP (Largest Contentful Paint) — target: < 2.5s
  - INP (Interaction to Next Paint) — target: < 200ms
  - CLS (Cumulative Layout Shift) — target: < 0.1
- First Contentful Paint (FCP)
- Time to First Byte (TTFB) — found under "Server response times"
- Speed Index

---

## Phase 3 — CAPTURE (Screenshots)

Take four screenshots total:

1. **Target A — Mobile score** (full PageSpeed results page, showing score + Core Web Vitals)
2. **Target A — Desktop score**
3. **Target B — Mobile score**
4. **Target B — Desktop score**

Screenshot naming:
- `[target-a-domain]-mobile.png`
- `[target-a-domain]-desktop.png`
- `[target-b-domain]-mobile.png`
- `[target-b-domain]-desktop.png`

Save to: `design/exports/speed-tests/[date]-[vs-description]/`

Also capture **top 3 performance bottlenecks** from Target A (found in the "Opportunities" and "Diagnostics" section):
- Typically: "Eliminate render-blocking resources", "Reduce unused JavaScript", "Serve images in next-gen formats"
- These explain WHY the score is low and make the comparison educational

---

## Phase 4 — COMPARE (Build the Comparison Asset)

Create a side-by-side comparison showing:

| Metric | [Target A] | [Target B / bienzoli] |
|---|---|---|
| Mobile Score | [score] | [score] |
| Desktop Score | [score] | [score] |
| LCP | [time] | [time] |
| CLS | [value] | [value] |
| Page Weight | [MB] | [MB] |
| Built With | WordPress / [platform] | Next.js by bienzoli |

For visual comparison (social/sales use):
- Create a two-panel image:
  - Left panel: Target A score (red/orange for low scores)
  - Right panel: Target B score (green for 90+)
- Add caption: "[Business type] website: before vs bienzoli — [A score] vs [B score] on PageSpeed"

Use Social Card Generator (Agent 10) to produce this comparison in 1:1 and 16:9 formats.

---

## Phase 5 — FORMAT (For Context)

**For sales outreach (WhatsApp or email):**
```
Hi [Name]! Quick note on your website — I ran a speed test and your site scored [X] on Google's PageSpeed Insights.
For context, a slow-loading website loses on average 53% of mobile visitors before the page finishes loading.
Here's a comparison with a bienzoli-built site in the [same industry]: [attach comparison image]
We can do a free preview of what an improved version could look like. No obligation. Vince from bienzoli
```

**For social media (Instagram caption):**
```
Before: [X] / After: [Y] 🚀

We ran a PageSpeed test on a [industry] website in Mauritius.
[Target A]: [score]
bienzoli-built: [score]

That gap = fewer visitors, fewer leads, less trust.
Every second of load time costs businesses customers.

If your website scores below 70, let's talk.
bienzoli.com / DM us

#mauritius #webdesign #pagespeed #performance #bienzoli
```

**For LinkedIn (founder post):**
"I ran a PageSpeed test on 10 Mauritius business websites today. The average score was [X]. The bienzoli-built comparison sites averaged [Y]. Here's why this matters for your revenue..."

---

## Phase 6 — USE (Distribution)

**Sales use:**
- Include comparison image in outreach message (attach directly to WhatsApp)
- Include in formal proposal as "Performance Comparison" section
- Use verbally in sales calls: "Have you ever checked your website's PageSpeed score?"

**Content use:**
- Queue for Instagram (comparison card)
- Queue for TikTok (screen recording of running the test live)
- Queue for LinkedIn (data insight post)
- Add to bienzoli.com "Why bienzoli" section as live proof

---

## Reporting Standard

Every speed test comparison must be filed with:
```
## [DATE] — [TARGET A vs TARGET B]
- Target A URL: [url]
- Target A Mobile: [score]
- Target A Desktop: [score]
- Target B URL: [url]
- Target B Mobile: [score]
- Target B Desktop: [score]
- Top 3 Target A Issues: [list]
- Used for: [sales / content / both]
- Files saved: [paths]
```

Save to: `design/exports/speed-tests/log.md` (create if doesn't exist)

---

## Quality Standards

Before using a comparison in sales or publishing:

1. **Both tests run on the same day:** Performance can vary day-to-day. Never compare a test from weeks apart.
2. **Fair comparison:** Target B should be the same type of site (same industry, same approximate complexity) as Target A. Don't compare a micro-site to an e-commerce platform.
3. **Test on production URLs:** Never test a preview URL (Vercel preview deployments may not represent production performance).
4. **Respect for real businesses:** When using a specific competitor or prospect URL in social content, don't identify the business by name — use "a local [industry] website in Mauritius." Proof doesn't require public humiliation.
5. **Accurate scores:** Screenshot the actual PageSpeed Insights result. Never round up bienzoli scores or round down competitor scores.
