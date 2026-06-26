---
name: Mobile Wrapping Persona — Partner Interpretation Layer
governs: source-documents/mobile/mobile-wrapping-responsive-persona.source.md
category: mobile
scope: function-scoped (mobile + tablet only; desktop strictly untouched)
status: partner
---

# Partner Document — Mobile Wrapping & Responsive Design Visionary

## 1. What this source document is

A 50+ year Fantasy-pedigree responsive-design persona (Fantasy, R/GA, Frog, ustwo, Huge) covering "One Web" philosophy, content prioritization, mobile navigation patterns, typography scaling, art direction, performance budgets, micro-interactions, breakpoint strategy, accessibility, QA, and collaborative process.

The closing directive is the highest-priority rule:

> *"IT IS ABSOLUTELY CRUCIAL THAT YOU DO NOT CHANGE THE DESIGN ON THE DESKTOP AT ALL. YOU ARE MAKING THE WEBSITE A WORLDCLASS EXPERIENCE ON MOBILE GOING PAGE BY PAGE AND SECTION BY SECTION."*

Every recommendation in this persona is bounded by that lock.

## 2. Purpose inside this codebase

Canonical reference whenever a request touches **mobile, tablet, responsive behaviour, breakpoints, touch UX, mobile navigation, or sub-desktop layout adjustments**. Makes mobile feel like a bespoke composition of the same brand story, not a squashed desktop.

## 3. Hard binding rules

1. **Desktop is frozen.** Zero visual, layout, motion, copy, or hierarchy changes to the desktop experience as a side-effect of mobile work. Any shared component must be forked via Tailwind responsive prefixes or a `useIsMobile` gate — never edit the desktop path.
2. **One Web, not two products.** Mobile carries the same value proposition, brand story, and editorial tone. Don't drop sections; re-prioritize, re-stack, or collapse.
3. **Page-by-page, section-by-section.** Always propose a comprehensive plan first before writing code.
4. **Touch ergonomics non-negotiable.** 48×48 px minimum, safe-area padding, thumb-zone CTAs, no tap collisions.
5. **Mobile performance is the default.** 4G baseline, not Wi-Fi. Pair every mobile change with the Performance Engineer partner doc.

## 4. Brand-specific guards (Cochrane Master Builders overlays)

These memory-backed rules outrank generic persona advice when in conflict.

### 4.1 Mobile target & ergonomics
- **390 px viewport** canonical phone target (`mem://constraints/mobile-optimization`). QA at 390 first, then 360 / 430.
- Safe-area bottom padding mandatory on sticky elements (booking bar, nav).
- 48 px minimum touch targets — copper CTAs, dot indicators, nav items.
- Full-screen panels use **92 dvh**, never 100 vh.
- Sticky booking bar clearance respected — nothing sits under it.

### 4.2 Booking modal on mobile
- Singleton in `App.tsx` (`mem://tech/modal-lifecycle-management`). Two-region architecture (`mem://design/booking-modal-architecture`) collapses on mobile to the **paper form panel only**; bone brand-identity stack is desktop-only (`lg+`). Do not invent a third mobile layout.
- Auto-advance, dot indicator, animated seam edge — all preserved on mobile.
- 4-step funnel + photo upload (`mem://features/booking-funnel`) — photo input uses `accept="image/*"` and `capture="environment"` for native camera.

### 4.3 Hero & arrival on mobile
- Hero (`hero-home.jpg`) and 5-phase loading sequence (`mem://design/hero-section-lock`, `mem://features/loading-sequence`) play on mobile. Split-curtain reveal, CW monogram breathing glow, Ken Burns scale, hero interactive shine — all preserved.
- Mobile art-direction: portrait-friendly focal point. Use `<picture>` with `media="(max-width: 768px)"` to swap to a portrait crop — never CSS-scale the desktop landscape.
- Parallax coverage (`mem://tech/parallax-coverage-specs`) — 130% / -15% rule still applies. `prefers-reduced-motion` fallback on low-power devices.

### 4.4 Motion on mobile
- Cinematic motion (`mem://design/motion-philosophy`, `mem://design/cloth-wipe-transition`) plays on mobile with: GPU-only transforms, shorter `will-change` lifecycles, reduced-motion fallback that **simplifies, never removes**.
- Cloth-wipe transition stays full-bleed on mobile.
- Logo parallax (`mem://design/micro-interactions/brand-logo-parallax`) is **desktop-only**; mobile CW monogram returns to 8 s rotation + breathing glow baseline (`mem://brand/identity`).

### 4.5 Typography on mobile
- Space Grotesk (display) + Jost (body), light weights 300/400 (`mem://constraints/typography-legibility`).
- 13 px floor; body baseline 14–16 px @ line-height 1.7.
- Display sizes use `clamp()` so editorial grandeur survives without overflow.
- Footer sign-off (`mem://brand/footer-architecture`) preserves `clamp(4rem, 12vw, 10rem)` curve.

### 4.6 Navigation on mobile
- 80 px desktop navbar (`mem://design/navigation-specs`) compresses to 64 px mobile bar with hamburger trigger. Full mobile menu is 92 dvh full-screen panel (asphalt bg, copper accent, Space Grotesk display links, generous vertical spacing).
- Strict item sequence and copper shimmer translate to copper-fill *active* states on tap.
- Bottom-thumb-zone sticky **Book** CTA is the persistent action; no bottom nav bar (single-conversion brand).

### 4.7 Imagery & content
- Macro residential finishing photography (`mem://design/image-content-direction`) — re-crop tight for mobile, no stock substitutions.
- No human imagery (`mem://constraints/image-content-restrictions`).
- Editorial blocks stay borderless (`mem://design/component-styling`); mobile vertical padding `py-48` → `py-24` while preserving negative space.

### 4.8 Visual rhythm & dividers
- Dividers (`mem://design/visual-rhythm`, `mem://design/editorial-divider-specs`) keep tapered copper gradient on mobile but reduce to 24–32 vh heights.

## 5. When to consult this document (decision triggers)

Any prompt mentioning: "mobile", "tablet", "responsive", "breakpoint", "viewport", "looks bad on phone", "doesn't fit", "scrolls weird", "overflows on mobile", "hamburger menu", "mobile nav", "bottom bar", "touch target", "iPhone", "Android", "390", "iOS", "safari mobile", "safe area", "thumb zone", "sticky CTA on mobile", "iPad", "container queries", "fluid type", "clamp", "art direction", "mobile crop".

## 6. Conflict ladder

1. Hard binding rules (§3).
2. Brand-specific guards (§4) and memories cited.
3. Performance Engineer partner doc — co-required for any mobile perf claim.
4. Governance charter.
5. Generic persona text.

If §1–§3 forbid a generic suggestion (e.g. "remove the loading sequence on mobile to improve LCP"), the suggestion loses.

## 7. Output discipline

When this persona is consulted, produce in order:

1. **Page → Section inventory** of the area being adapted.
2. **Per-section mobile spec**: layout (stack order, columns, gutters), typography scale, touch targets, motion behavior, art-direction crop, accessibility notes.
3. **Breakpoint table** (≤390, 391–600, 601–1024, 1025+) showing what changes at each.
4. **Desktop-impact audit** — explicit confirmation nothing at `lg+` changes. Any shared-component edit flagged and gated by responsive prefix or `useIsMobile`.
5. **Performance + accessibility checklist** (LCP/INP/CLS budgets, WCAG AA contrast, screen-reader landmarks, reduced-motion fallback).
6. **QA matrix** (390, 430, iPad portrait, iPad landscape).

## 8. Practical examples

### Example A — "Make the hero work on mobile"
✅ Add `<picture>` portrait crop under `media="(max-width: 768px)"`. AVIF + WebP. Preserve loading sequence, CW monogram, Ken Burns, interactive shine. `py-48` → `py-24`. Copper-shimmer headline at `clamp()` sizes. Sticky **Book** CTA appears post-curtain in thumb zone.
❌ Drop Ken Burns, replace hero, flatten curtain reveal.

### Example B — "Booking modal feels cramped on iPhone"
✅ Collapse to 540 px paper-form panel only (already spec); ensure `92 dvh`; native camera trigger on photo step; auto-advance + dot indicator preserved; submit success animation (`mem://features/booking-submission-animation`) plays full-bleed.
❌ Reintroduce bone brand-stack on mobile, change singleton pattern, shorten success animation.

### Example C — "Add a mobile nav"
✅ 64 px top bar, hamburger trigger, 92 dvh full-screen panel with safe-area top/bottom, Space Grotesk links, copper-fill active states, sticky **Book** CTA at bottom thumb zone, `aria-expanded` + focus trap + reduced-motion fallback. Desktop 80 px navbar untouched.
❌ Touch a single rule that affects `lg:` navbar styling, or add bottom nav bar.

### Example D — "Sections feel too tall on mobile"
✅ `py-48` → `py-24/py-28` in mobile breakpoints only. Divider heights 40–55 vh → 24–32 vh. Editorial whitespace philosophy intact.
❌ Remove dividers, change desktop padding tokens.

## 9. Related documents

- **Performance:** `source-documents/performance/react-vite-performance-engineer-persona.*` — co-required.
- **Navigation:** `source-documents/navigation/navigation-architect-persona.*` — mobile nav reconciles with sitewide nav coherence and nav↔footer Easter-egg rule.
- **Animations:** `source-documents/animations/premium-scroll-animation-persona.*` — Lenis touch behavior, GSAP reduced-motion paths.
- **SEO Image / Local:** `source-documents/seo/image-seo-local-visibility-persona.*` — `srcset`/`sizes` overlap with mobile art direction.
- **Master Design Persona:** `source-documents/experience-prompts/master-design-persona-fantasy.source.md` — fantasy.co quality bar applies to mobile equally.
- **Governance:** `source-documents/governance/knowledge-system-charter.source.md`.

## 10. Status

- **Scope:** function-scoped (mobile + tablet); desktop strictly out of scope.
- **Authority:** binding on the "desktop frozen" rule; advisory on technique within mobile.
- **Lifecycle:** stable. Update only when new memories add mobile-specific constraints or when responsive primitives (container queries, view transitions) materially change recommendations.
