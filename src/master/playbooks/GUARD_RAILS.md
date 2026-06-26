# GUARD RAILS — The Constitution Above The Checklist

> **Read this first.** Before any plan, any phase, any line of code on a remix, the AI agent and the operator both acknowledge these laws. If the agent skips this file, the work is invalid.
>
> **Build-time enforcement:** `bun preflight` (auto-invoked by the `prebuild` hook in `package.json`) runs every guard rail in `src/master/guardrails.ts` and prints a categorized report. Each failure links to the partner-doc routes that govern it via `src/master/knowledge/guardrail-routes.ts`. Dashboard at `/knowledge/preflight`. Run `bun preflight --strict` in CI to halt the build on any failure.

The remix checklist (`src/master/checklist.ts`) describes WHAT to do. The guard rails describe what MUST be true before a site is allowed to ship. They are non-negotiable, immutable, and ALWAYS apply, on every trade site, every time. **If a guard rail fails, the site does not launch.**

The canonical typed registry lives in `src/master/guardrails.ts`. This document is the long-form companion.

---

## How guard rails relate to everything else

```text
                ┌───────────────────────────┐
                │   GUARD RAILS (this doc)   │   ← non-negotiable laws
                │   src/master/guardrails.ts │
                └────────────┬──────────────┘
                             │ enforced by
                             ▼
                ┌───────────────────────────┐
                │   CHECKLIST PHASES (0–9)   │   ← ordered work
                │   src/master/checklist.ts  │
                └────────────┬──────────────┘
                             │ executed by
                             ▼
                ┌───────────────────────────┐
                │   CHECKLIST ITEMS (~200)   │   ← concrete tasks
                └───────────────────────────┘
```

- A **guard rail** is a law: "this MUST be true at launch."
- A **checklist item** is the work that proves the law.
- Each guard rail's `enforcedBy` field lists which checklist items satisfy it. Each checklist item's `guardRails` field tags which laws it satisfies.
- The function `getUnenforcedGuardRails()` MUST return `[]`. Anything else is a bug.

---

## The 18 laws

### A. Brand & Identity (4)

1. **Bespoke Brand Identity Derivation** — every site derives its own complete identity (palette, type pair, motion signature, voice, photo direction) from the master CMB brand bible. No master tokens shipped unmodified.
2. **Bespoke Style Guide Live** — every site publishes an internal `/style-guide` route (noindex) showing its own tokens, every component in every state, and motion samples.
3. **Zero Sister-Site Fingerprints** — codebase scan returns zero references to any other trade's name, slug, accent, photography, or copy paragraphs.
4. **Master Logo Slot Map Honored** — all logo surfaces use `<MasterLogo slot="..."/>`. Zero direct `<img src=".../cmb-...png">`. Favicon, PWA, share pack regenerated for THIS trade.

### B. SEO Depth (4)

5. **Areas-We-Serve Excellence** — one indexable page per area, bespoke 150+ word intro, area-specific proof, LocalBusiness JSON-LD with `areaServed`, breadcrumbs, internal-link matrix back to services. Templated area pages = automatic fail.
6. **Per-Page Title / Meta / JSON-LD Uniqueness** — every URL has unique title + meta and valid schema (Organization/LocalBusiness on home, Service on service pages, FAQPage where applicable, BreadcrumbList everywhere). No duplicates within site or sister network.
7. **Crawl Hygiene** — valid sitemap.xml, sane robots.txt, canonical URLs everywhere, zero orphan pages, internal-link matrix passes.
8. **Local Trust Schema Rendered** — NAP consistency green, LocalBusiness JSON-LD complete, GBP claimed, GSC verified pre-launch.

### C. Performance & Accessibility (3)

9. **Performance-First Budget (Mobile)** — mid-tier Android over 4G: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, first-paint transfer ≤ 1.5MB, JS ≤ 200KB gzipped on initial route. Fail = no ship.
10. **Modern Image Pipeline** — WebP/AVIF, sized for largest viewport that uses them, lazy below the fold, explicit width/height, descriptive alt, trade-specific filenames. No PNG/JPG hero >250KB.
11. **WCAG 2.2 AA Across The Board** — contrast matrix green, focus visible, booking flow keyboard-reachable, prefers-reduced-motion respected, semantic heading order, no color-only meaning.

### D. Conversion & Trust (3)

12. **Booking CTA Reachable In ≤1 Tap From Anywhere** — sticky/persistent CTA on every page, `tel:` link on mobile, service prefill from service pages, mobile time-to-book under 60s on a real device.
13. **Real Business Signals Rendered** — license, insurance, WCB, real address, real hours, founder bio, warranty terms render site-wide. No placeholders. No fabricated certs.
14. **Legal Pages Bespoke & Accurate** — privacy, terms, cookie notice (if needed), warranty, accessibility statement — present, trade-specific, reviewed. No template paragraphs from sister sites.

### E. Motion, Copy & Craft (2)

15. **Motion System Pinned + Reduced-Motion Fallback** — easing tokens, duration ladder, signature interactions defined. Every signature animation has a measured reduced-motion fallback. 60fps verified on mid-tier Android.
16. **Anti-Paraphrase + Readability Bands** — ≤40% n-gram overlap on any 100-word window vs. each sister site. Flesch reading-ease in the prescribed band (default 60–75).

### F. Operational Safety (2)

17. **Plan-First Discipline Honored on Every Deep Item** — written 12-section deep plan exists for every `planDepth: "deep"` item before code lands. The plan includes a Guard Rail Compliance Statement.
18. **Pre-Launch Walkthrough + Post-Launch Monitoring Armed** — human walks the full site on real desktop AND real mobile pre-launch. Uptime monitor, runtime error monitor, analytics events, conversion goals, and CWV monitor all live and verified the moment DNS flips.

---

## The Guard Rail Compliance Statement (required in every deep plan)

Every `planDepth: "deep"` plan adds a section after the existing 11:

> **12. Guard Rail Compliance** — list every guard rail this plan touches. For each, state in one sentence how this plan satisfies it (or how this plan moves the site closer to satisfying it). If this plan touches no guard rails, justify why a deep plan is even warranted.

Example for `visual-per-service-hero`:

> **12. Guard Rail Compliance**
> - `gr-bespoke-style-guide-live` — hero uses this trade's accent, type pair, and motion tokens (not master).
> - `gr-modern-image-pipeline` — AVIF, sized for 1440px max, explicit width/height, descriptive alt.
> - `gr-performance-budget-mobile` — image budget ≤250KB, fetchpriority="high", no CLS.
> - `gr-wcag-aa` — gradient overlay verified ≥7:1 contrast on headline; reduced-motion fallback fades in without clip-path or parallax.
> - `gr-motion-system-pinned` — uses `--ease-entry` and `--dur-hero` from the brand motion tokens, not magic numbers.

If the agent cannot fill this section honestly, the plan is incomplete.

---

## Failure-mode reference

Each guard rail's failure has a known cost. Use this when triaging blockers:

| Rail | Cost of failure |
|---|---|
| Bespoke identity | Brand collapses into "another Masters template" — lifetime value gone. |
| Style guide live | No proof identity was bespoked; brand decisions can't be audited. |
| Zero fingerprints | Google detects template network → algorithmic suppression. |
| Logo slot map | Logo bugs on remix; broken favicons; wrong OG card. |
| Areas excellence | Area pages get treated as doorway pages; map-pack dies. |
| Meta uniqueness | Cannibalisation; dropped rich results. |
| Crawl hygiene | Half the site never indexes; orphan content stranded. |
| Local trust schema | Map-pack ranking caps low; lead flow plateaus. |
| Performance budget | Bounce on 4G; CWV penalises rank. |
| Image pipeline | Slow + invisible to Google Images; wasted hero asset. |
| WCAG AA | Real customers locked out; legal exposure. |
| Booking ≤1 tap | Lead leakage at the most expensive moment. |
| Real business signals | Trust collapse at the decision point. |
| Legal pages bespoke | Non-binding pages + sister-site fingerprints. |
| Motion system pinned | Inconsistent feel; inaccessible animations. |
| Anti-paraphrase | Network-wide demotion. |
| Plan-first | Templated work re-enters; brand decay. |
| Pre/post launch | First 7 days wasted; lost reviews; lost rank window. |

---

## Operator workflow

1. **Acknowledge** — operator reads this file in full. Marks `guardrails-acknowledged` complete.
2. **Generate coverage map** — run helper from `guardrails.ts`; commit per-trade `guardrails-coverage.md`. Marks `guardrails-coverage-map-generated` complete.
3. **Plan-first for every deep item** — Guard Rail Compliance Statement in every deep plan.
4. **Run scans before launch** — execute every `scanCommand` listed in `guardrails.ts`; all must return zero.
5. **Verify proofs** — for every guard rail, the listed `proofRequired` artifacts exist and are reviewed.
6. **No exceptions** — a guard rail cannot be "waived" for launch. If it cannot be met, the launch slips.

---

## What guard rails are NOT

- They are not a replacement for the checklist — they are the law the checklist serves.
- They are not aspirational — they are minimums.
- They are not negotiable per-client — they protect the network, not just one site.
- They are not the design system — the design system is downstream of them.
