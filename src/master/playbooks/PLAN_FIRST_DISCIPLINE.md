# PLAN-FIRST DISCIPLINE — Phase 0, applied to every phase that follows

> No code is written for any `planDepth: "deep"` item until a written plan exists. The plan is the deliverable for Phase 0; everything after just executes it.

---

## Why

Without this, the agent skips ahead, ignores the brand identity stack, and ships templated work that "looks fine" but isn't ours. With it, every artifact traces back to a brand-truth document and a craft benchmark.

## The deep-plan template

Every `planDepth: "deep"` checklist item produces a plan with these **12 sections**, in this order:

1. **Goal** — one sentence. What does done look like?
2. **Brand truth refs** — every file the agent read before drafting (BRAND_BIBLE.md, brand-identity-northstar.ts, persona files, trade.config.ts, business.ts, reviews.ts). Quote the lines that matter.
3. **Craft benchmarks** — 2–3 URLs from the benchmark library. Note specifically what we're emulating from each.
4. **Information architecture** — sections, hierarchy, where the user's eye lands first.
5. **Content** — copy slots filled per `COPY_GUIDE.md` rules. Word counts. Voice traits applied.
6. **Visual & motion** — palette, type scale, image treatment, easing curves, stagger timings, hover state, focus state, reduced-motion fallback.
7. **Accessibility** — contrast verified, focus order, ARIA, keyboard nav, prefers-reduced-motion, touch target sizes.
8. **Performance** — image weight target, font loading, JS budget, layout-shift prevention.
9. **Success criteria** — measurable. ("Hero LCP <2.5s on iPhone 12, contrast 4.5:1+ on every text, motion at 60fps in DevTools throttle")
10. **Risks** — what could go wrong, how to detect early.
11. **Verification** — how the agent will prove it's done (Lighthouse, screenshot, manual walkthrough, codebase scan).
12. **Guard Rail Compliance Statement** — list every guard rail this plan touches (by `GuardRailId` from `src/master/guardrails.ts`). For each, state in one sentence how this plan satisfies it (or moves the site closer to satisfying it). If this plan touches no guard rails, justify why a deep plan is even warranted. **A deep plan without this section is incomplete and must not be executed.** See `playbooks/GUARD_RAILS.md`.

## Brand sources — load order

Always read in this order before any deep plan:

1. `src/master/brand/BRAND_BIBLE.md` — canonical brand contract
2. `src/config/brand-identity.ts` + `src/config/brand-identity-northstar.ts` — voice, tagline candidates, power words
3. `src/config/business.ts` + `src/config/business-overview.ts` — what the business actually does
4. `src/config/trade.config.ts` — current trade truth (palette, services, contact, voice arrays)
5. `src/config/style-guide.ts` — token system (colors, spacing, radius, type scale)
6. `src/config/design-plan.ts` + `src/config/design-preferences.ts` — design intent
7. `src/config/reviews.ts` — real testimonials (never invent)
8. `src/config/fear-dispel.ts` — top objections, how we answer them
9. `src/config/discovery-questionnaire.ts` — what we already learned about this trade
10. **Phase-relevant personas** from `src/config/personas/` — see table below

## Persona load map (which personas to pull per phase)

| Phase | Required personas |
|---|---|
| 1 — Intake | `discovery-framework`, `ideal-customer`, `market-research` |
| 2 — Brand | `brand-identity-architect`, `master-visual` |
| 3 — IA | `nav-architect`, `footer-architect`, `responsive-mobile`, `ui-footer` |
| 4 — Copy | `narrative-copywriter`, `strategic-narrative`, `seo-faq`, `fear-dispel` (file), `ideal-customer` |
| 5 — Visual | `master-visual`, `image-seo`, `scroll-motion` |
| 5b — Motion | `scroll-motion`, `master-visual`, `responsive-mobile` |
| 6 — SEO | `seo-expert`, `seo-faq`, `image-seo` |
| 7 — Conversion | `frontend-engineer`, `responsive-mobile`, `fear-dispel` |
| 8 — Legal/Trust | `brand-identity-architect`, `strategic-narrative` |
| 9 — Launch | `performance-engineer`, `frontend-engineer` |

If a required persona is missing, stop and flag it — don't improvise.

## Craft benchmark library

Pin these and reference at least two on every visual/motion deep plan:

- **Apple** — `apple.com/airpods-pro`, `apple.com/iphone-15-pro` — hero treatment, scroll choreography, type rhythm, restraint
- **Fantasy.co** — `fantasy.co` — visual edge, editorial density, asymmetric craft
- **Linear** — `linear.app` — interaction language, easing, modal entry, keyboard-first feel
- **FROG** — `frog.co` — interaction philosophy, micro-interactions, ergonomics
- **Stripe** — `stripe.com/payments` — form craft, trust placement, copy density
- **Christopher Gawryletz** — `christophergawryletz.com` — editorial luxury (per existing brand memory)
- **Awwwards SOTD archive** — only when looking for a specific motion pattern

## Worked example — planning a service-page hero

**Item**: `visual-per-service-hero`

**1. Goal** — A hero for `/services/roof-replacement` that earns 3 seconds of attention and one CTA tap on mobile.

**2. Brand truth refs**
- `BRAND_BIBLE.md` §Color: navy `#1F2F4D` primary surface
- `brand-identity-northstar.ts` tagline #2: "Built true. Top to bottom."
- `master-visual` persona: macro detail, controlled lighting, no people
- `trade.config.ts`: accent HSL, founded 2024
- `reviews.ts` row 3: "fixed our roof in 1 day, no mess"

**3. Craft benchmarks**
- apple.com/iphone-15-pro — hero negative space ratio (60/40 image/copy)
- fantasy.co — type rhythm and section divider treatment

**4. IA** — Single full-bleed hero. Headline left-aligned, sub below, CTA + phone bottom-left. Right 60% is image. Mobile: stack, image on top at 56vh.

**5. Content** — H1 "Roof replacement done in a day, not a week" (8 words, benefit-led). Sub: 18 words, names city + warranty. Primary CTA "Send a couple of photos". Secondary "See pricing & process".

**6. Visual & motion** — Macro shot of asphalt shingle catching morning light, no sky drama. Palette warm. Image enters bottom-to-top clip-path reveal over 800ms `cubic-bezier(.16,1,.3,1)`. Headline staggers in 120ms after, then sub 80ms after. Hover on CTA: lift 2px, copper shimmer 600ms. Cursor parallax on image, 3% range.

**7. Accessibility** — Text contrast 7:1 on image (gradient overlay). Focus ring on CTAs. Reduced-motion: image fades in, no clip-path, no parallax.

**8. Performance** — Hero AVIF, <250KB, `fetchpriority="high"`. Font preloaded. No layout shift (image aspect-ratio reserved).

**9. Success criteria** — LCP <2.0s, no CLS, 60fps reveal in throttled DevTools, contrast 7:1+, mobile thumb taps the CTA without re-grip.

**10. Risks** — AVIF unsupported on old Safari → JPG fallback. Font flash → `font-display: swap` + preload.

**11. Verification** — Lighthouse mobile run, screenshot at 390px + 1440px, manual walkthrough on iPhone, codebase grep for the alt text.

**12. Guard Rail Compliance**
- `gr-bespoke-style-guide-live` — hero uses this trade's accent, type pair, and motion tokens (not master tokens).
- `gr-modern-image-pipeline` — AVIF, sized for 1440px max, explicit width/height, descriptive trade-specific alt text.
- `gr-performance-budget-mobile` — image budget ≤250KB, `fetchpriority="high"`, no CLS via reserved aspect-ratio.
- `gr-wcag-aa` — gradient overlay verified ≥7:1 on headline; reduced-motion fallback fades in without clip-path or parallax.
- `gr-motion-system-pinned` — uses `--ease-entry` and `--dur-hero` from the brand motion tokens, not magic numbers.

---

## When to skip the deep plan

Standard items (`planDepth: "standard"`) — copy edits, single-token swaps, file renames — don't need this template. They still must reference brand sources but can ship in one paragraph.
