# `src/master/` — Cochrane Master Builders Source of Truth

This folder is the **parent brand**. Every remixed trade site (drywall, roofing, plumbing, electrical, etc.) inherits from here.

## The rule

> **Edit it here once. It propagates to every remix.**

If a piece of brand, copy, persona, SEO list, or playbook applies to *more than one* trade site, it lives in `src/master/`. If it only applies to *this one* trade, it lives in `src/config/trade.config.ts`.

## Layout

```
src/master/
├── brand/
│   ├── identity.ts          ← parent-brand mission, voice, do/don't, master email
│   ├── style-guide.ts       ← master color/type/spacing rules (parent of trade.config palette)
│   ├── logo.svg             ← master CMB logo (used by AI logo generator as reference)
│   └── brand-docs.md        ← embedded business plan + brand bible (markdown)
│
├── personas/                ← 19 rewritten persona files, all in CMB voice
│
├── seo/
│   ├── service-areas.ts     ← 100+ areas (lat/lng, neighborhoods, schema)
│   ├── seo-playbook.md      ← per-page SEO best practices
│   └── backlink-network.ts  ← list of all sister sites, for cross-linking
│
├── playbooks/
│   ├── REMIX_PLAYBOOK.md       ← step-by-step remix guide
│   ├── INTAKE_BRIEF.md         ← Phase 1 — what to gather before remix starts
│   ├── IA_WIREFRAME_GUIDE.md   ← Phase 3 — sitemap, page templates, nav rules
│   ├── BRAND_AUDIT.md          ← how to verify a remix reflects CMB
│   ├── AI_IMAGE_RULES.md       ← no faces, no people, ultra-realistic, prompt patterns
│   ├── COPY_GUIDE.md           ← voice, anti-paraphrase, per-page word counts, AIDA
│   ├── SEO_PLAYBOOK.md         ← keyword maps, JSON-LD per page type, area network, NAP, GBP
│   ├── LEGAL_TRUST_GUIDE.md    ← Phase 8 — privacy, terms, warranty, license/insurance render
│   └── PERFORMANCE_PLAYBOOK.md
│
├── trades.ts                ← taxonomy of every planned trade (slug, category, adjacencies)
├── checklist.ts             ← typed remix checklist — 9 phases, P0/P1/P2 tiers (see below)
└── VERSION.ts               ← semver of the master brand; remixes record what they forked from
```

## Guard Rails — the constitution above the checklist

`src/master/guardrails.ts` defines **18 non-negotiable laws** every remix must satisfy before launch. Guard rails sit ABOVE the phased checklist: phases describe ordered work, items execute that work, but **guard rails are the laws the work serves**. If a guard rail fails, the site does not ship — full stop. No waivers, no exceptions.

The 18 laws cover:

- **Brand & Identity** (4) — bespoke identity derived from master, live `/style-guide`, zero sister-site fingerprints, master logo slot map honored.
- **SEO Depth** (4) — Areas-We-Serve excellence, per-page meta + JSON-LD uniqueness, crawl hygiene, local trust schema rendered.
- **Performance & Accessibility** (3) — mobile CWV budget, modern image pipeline, WCAG 2.2 AA.
- **Conversion & Trust** (3) — booking ≤1 tap from anywhere, real business signals rendered, legal pages bespoke.
- **Motion, Copy & Craft** (2) — motion system pinned with reduced-motion fallback, anti-paraphrase + readability bands.
- **Operational Safety** (2) — plan-first discipline on every deep item, pre-launch walkthrough + post-launch monitoring armed.

Each guard rail is enforced by one or more concrete checklist items. Each checklist item carries a `guardRails?: GuardRailId[]` tag so coverage can be audited. The helper `getUnenforcedGuardRails()` MUST always return `[]`. **Read `playbooks/GUARD_RAILS.md` in full before starting any remix.**

## How the remix checklist works

`src/master/checklist.ts` is the **definitive roadmap** for every remix. It is NOT an automated test runner — it's a typed, phased, tiered plan that Lovable / Claude reads to generate deep, in-depth implementation plans for each step.

**Eleven phases, run in order:**

0. **Plan-First Discipline** — read the brand stack, pin craft benchmarks, write a deep plan (`PLAN_FIRST_DISCIPLINE.md`)
0.5. **Guard Rails Armed** — acknowledge the 18 laws, generate the per-trade coverage map (`GUARD_RAILS.md`)
1. **Intake & Trade Foundation** — gather every input before touching code (`INTAKE_BRIEF.md`)
2. **Brand & Identity Bespoking** — zero leftover sister-site fingerprints (`BRAND_AUDIT.md`)
3. **Information Architecture & Wireframes** — structure first (`IA_WIREFRAME_GUIDE.md`)
4. **Copy & Storytelling** — every word bespoke (`COPY_GUIDE.md`)
5. **Visual Craft & AI Imagery** — no faces, no people (`AI_IMAGE_RULES.md`)
5b. **Motion & Interaction Craft** — Apple/Linear/FROG-tier (`MOTION_AND_CRAFT.md`)
6. **SEO Depth** — the moat (`SEO_PLAYBOOK.md`)
7. **Conversion, Forms & Booking** — < 60s mobile time-to-book
8. **Legal, Trust & Compliance** — real numbers, real pages (`LEGAL_TRUST_GUIDE.md`)
9. **Quality Gate, Analytics & Launch** — pre + post-launch (`PERFORMANCE_PLAYBOOK.md`)

Each item is tagged: **Tier** (`P0`/`P1`/`P2`), **Owner** (`ai-plan`/`human`/`hybrid`), **Playbook** (linked deep-dive), **Inputs needed** (assets the operator must hand over), **Guard Rails** (laws this item satisfies). For each item, the AI agent reads the description + linked playbook + inputs + relevant guard rails, then generates an in-depth plan, then executes it. The operator confirms each item before moving on. **All P0 items must be green AND every guard rail satisfied to ship.**

Helpers: `getChecklistByPhase()`, `getChecklistByTier()`, `getChecklistByOwner()`, `getChecklistByGuardRail()`, `checklistStats()`. Guard-rail helpers: `getGuardRailCoverage()`, `getUnenforcedGuardRails()`, `guardRailStats()`.

## How a remix works

1. Click **Remix** in Lovable.
2. Open `src/config/trade.config.ts` — edit ~6 fields (name, trade slug, palette accent, services, optional contact override).
3. Open `/remix` route in the preview — click **Generate logo for this trade** (AI generates the wordmark from the master logo).
4. Walk the checklist on `/remix` until all items are green.
5. Deploy.

Total time target: **15–30 minutes per site**.

## What does NOT live here

- App data (bookings, emails) — that's the database.
- Trade-specific copy, services, palette accents — that's `src/config/trade.config.ts`.
- Per-site assets (hero images, before/afters) — that's `src/assets/`.
