# CLAUDE.md — bienzoli Agency System

**Pointer file. Do not read this whole file as context — load `CORE.md` instead.**

---

## How This System Works

The bienzoli context is modular to minimise token usage per session.

| File | When to load |
|------|-------------|
| `CORE.md` | **Always** — identity, quality floor, agent registry, session protocol, context router |
| `context/modules/*.md` | **On demand** — load only what the task needs (see router below) |
| `context/working-set.md` | **Always** — tiny rolling state (current task, open items) |
| `docs/` | **On demand** — authoritative full-detail documents; modules summarise, docs go deep |
| `logs/decisions.md` | **Only when** you need historical context or are logging a new decision |
| `logs/clients.md` | **Only when** working on a specific client or tracking revenue |

**Rule:** Do not preload logs or full docs at session start. Load `CORE.md` + relevant modules only.

---

## Context Router (Quick Reference)

| Task type | Load |
|-----------|------|
| Brand / design / visual | `context/modules/brand.md` → `docs/brand/design-system.md` |
| Pricing / proposals | `context/modules/packages.md` + `context/modules/sales.md` |
| Invoices / contracts / legal | `context/modules/ops.md` |
| Code / build / deploy | `context/modules/agents.md` |
| Marketing automation / Facebook | `context/modules/automation.md` |
| Market research | `context/modules/market.md` |
| Client onboarding / success | `context/modules/packages.md` + `context/modules/agents.md` |
| Content / social / video | `context/modules/content.md` |
| Roadmap / planning | `context/modules/roadmap.md` |
| Folder structure / file paths | `context/modules/folder-structure.md` |
| System update / new agent | `context/modules/agents.md` + `context/modules/folder-structure.md` |
| Skills / repeatable processes | `docs/skills/[skill-name].md` |

---

## Module Index

| Module | Contents |
|--------|---------|
| `context/modules/brand.md` | Font stack, colors, depth rules, logo rules, quality floor |
| `context/modules/packages.md` | Service tiers, pricing, payment terms, retainers |
| `context/modules/agents.md` | Full responsibilities for all 12 agents |
| `context/modules/folder-structure.md` | Canonical folder tree + rules |
| `context/modules/roadmap.md` | Phase A/B/C checklist, standby activation triggers |
| `context/modules/automation.md` | Client pipeline, Facebook posting, Drive sync commands |
| `context/modules/market.md` | Competitor landscape, target clients, Mauritius context |
| `context/modules/ops.md` | Legal entity, payments, contracts, invoices, referrals |
| `context/modules/sales.md` | Package recommendations, objection handling, outreach |
| `context/modules/content.md` | Content pillars, platform strategy, Remotion video spec |

---

## Source-of-Truth Documents (`/docs/`)

Modules are summaries. These files are authoritative — read them when you need the full detail.

```
docs/brand/design-system.md       ← Visual identity (read before ANY visual output)
docs/brand/voice-and-tone.md      ← Writing standards
docs/business/packages.md         ← Full package detail + contract terms
docs/business/contract-template.md
docs/business/invoice-template.md
docs/business/onboarding-form.md
docs/business/outreach-scripts.md
docs/business/referral-programme.md
docs/business/roadmap.md
docs/market/competitive-landscape.md
docs/market/target-clients.md
docs/agents/registry.md           ← Agent registry (full)
docs/agents/*.md                  ← Full agent specs (150–200 lines each)
docs/skills/*.md                  ← Repeatable skill processes
docs/setup/*.md                   ← API + service setup guides
docs/clients/_template/           ← Client brief + status templates
```

---

## Self-Update Protocol

When the system changes:
1. Update the relevant `context/modules/*.md` file
2. Update the `docs/` source-of-truth file if applicable
3. Update `CORE.md` if a compressed entry changes
4. Log in `logs/decisions.md`
5. If adding a new agent: update `docs/agents/registry.md` + create `docs/agents/[role].md`

---

## Session Protocol (Summary)

1. Load `CORE.md`
2. Check `context/working-set.md`
3. Load relevant module(s) from Context Router
4. Declare operating agent: *"Operating as: [AGENT NAME]"*
5. Execute
6. Update `context/working-set.md` + log decisions

---

*bienzoli Agency System — modular context v2, February 2026*
*Legal entity: vincedotcode ltd — Mauritius*
*Self-maintained by Claude Code. Update CORE.md + modules as the system grows.*
