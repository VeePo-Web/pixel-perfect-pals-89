---
status: PARTNER
layer: partner
category: animations
governs: ../../source-documents/animations/premium-scroll-animation-persona.source.md
embedded-on: 2026-04-28
scope: global
cross-cuts: motion, scroll, performance, ux, ui-components
---

# Partner Document — Premium Scroll Animation Persona & Lenis + GSAP Implementation Playbook

> Interpretation layer for `source-documents/animations/premium-scroll-animation-persona.source.md`.
> The source is **immutable and verbatim**. Everything below is how this codebase reads, weighs, and applies it.

---

## 1. Title

**Premium Scroll Animation Persona & Lenis + GSAP Implementation Playbook**

A 14-page master-craftsperson persona (Fantasy.co / Igloo.inc / Pentagram / IDEO / AKQA / Huge / Wolff Olins / B-Reel / MetaDesign / Work & Co lineage) plus a full technical playbook for building fantasy.co / igloo.inc-grade smooth-scroll experiences using **Lenis** + **GSAP ScrollTrigger** on a React 18 + Vite stack.

## 2. Document category

- **Primary shelf:** `animations/` (this is the first entry on this shelf — taxonomy was reserved in `governance/knowledge-system-charter`).
- **Cross-cuts:** `motion`, `scroll`, `performance`, `ux`, `ui-components` (when scroll-triggered components are involved), `accessibility`.

## 3. Main purpose

Install fantasy.co / igloo.inc-grade scroll-experience methodology and the **Lenis + GSAP ScrollTrigger** technical stack as the **default approach** for any scroll-driven work in this codebase. The persona supplies *taste and discipline*; the playbook supplies *concrete configuration, integration, and phase-by-phase implementation guidance*.

## 4. What this document should influence

- Whether to add Lenis to a brand at all (default **yes**, with `prefers-reduced-motion` fallback).
- Lenis configuration: `lerp`, `duration`, `easing`, `wheelMultiplier`, `touchMultiplier`, `syncTouch`, `anchors`, `autoRaf`, `orientation`, `gestureOrientation`, `smoothWheel`, `infinite`, `autoResize`, `prevent`, `virtualScroll`, `overscroll`, `autoToggle`, `allowNestedScroll`, `naiveDimensions`, `stopInertiaOnNavigate`.
- The canonical **GSAP ScrollTrigger integration triad**:
  ```
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- Animation **property choice** — only `transform` + `opacity` (compositor-thread). Never `width`, `height`, `margin`, `top`, `left`.
- Scroll-fade **duration band**: 100–400 ms (sweet spot per Nielsen Norman).
- **Stagger discipline**: one element type at a time. Don't fade text + images simultaneously.
- **Section pacing**: alternate long and short scrolls; let upcoming sections peek into view.
- **Persistence**: once content has appeared, it stays. No fading back out on reverse scroll.
- **Sticky nav + anchor + scroll-progress** conventions.
- **Mobile behaviour**: minimize / disable scroll-fade reveals on small screens (Lenis momentum can stay on).
- **`prefers-reduced-motion`** handling — mandatory, not optional.
- **Nested-scroll handling**: `data-lenis-prevent` on modals / carousels / embedded scroll panels.
- When to consider **WebGL / Three.js** (Igloo-style heavy effects) vs DOM-only.
- When to consider the native **scroll-driven CSS animation API** vs Lenis (current default: Lenis, revisit annually).

## 5. Trigger prompts (when to consult this document)

Consult whenever the request touches scroll mechanics, perceived smoothness, or scroll-coupled motion:

- "smooth scroll" · "Lenis" · "scroll feel" · "scroll feels janky" · "buttery scroll" · "scroll inertia"
- "scroll-triggered animation" · "scroll fade" · "fade in on scroll" · "reveal on scroll"
- "parallax" · "scroll parallax" · "scroll-driven" · "ScrollTrigger" · "GSAP scroll"
- "scrolljacking" · "scroll hijack" · "section pinning" · "pinned section" · "horizontal scroll section"
- "scroll-snap" · "snap to section"
- "scroll progress indicator" · "scroll progress bar" · "section counter"
- "scroll cinema" · "scroll storytelling" · "scroll narrative"
- "fix the modal scroll" · "modal scroll wrong" → `data-lenis-prevent`
- "anchor links jumping wrong" · "scroll-to with offset" · "anchor lands behind nav"
- "reduce motion" · "respect prefers-reduced-motion" · "accessibility motion"
- "performance" · "60fps" · "frame rate" · "jank" · "CLS from animation"
- "WebGL hero" · "Three.js hero" · "ice block" · "particle hero" · "Igloo-style"
- Anything referencing **fantasy.co**, **igloo.inc**, **awwwards-quality scroll**, or **Apple-style scroll**.

## 6. Scope of application

**In scope**
- Global app-shell scroll smoothing (Lenis at root).
- Per-section reveal animations (hero curtain, divider taper, image clip-path).
- Pinned and horizontal scroll sections.
- Cinematic intro choreography (overlaps with `experience-prompts/anti-gravity-opening-engineer`).
- Cloth-wipe / asphalt-wipe page transitions (already documented in `mem://design/cloth-wipe-transition`).
- Modals and overlays (`data-lenis-prevent` + `lenis.stop()` / `start()` lifecycle).
- Booking-funnel auto-advance panel (must not fight Lenis).

**Out of scope**
- Raw 3D modeling decisions — Igloo case study is **inspiration only**, not a blueprint.
- Audio engineering specifics (the source mentions sound design; treat as flavour, not requirement).
- Non-scroll micro-interactions (covered by other animation partners as they're added).

## 7. Output-quality direction

- **fantasy.co / igloo.inc bar.** Scroll must feel *weighted*, *intentional*, *silent*. Never twitchy, never bouncy, never spring-overshooting.
- **60 fps non-negotiable.** Drop a non-critical animation before letting frame rate slip.
- **Restraint over spectacle.** "One effect at a time" beats stacked effects every single time.
- **Brand-coupled easing.** The *personality* of the lerp/easing is dictated by the active brand's motion partner doc, not by the source's example values.
- **Persistence.** Once content has appeared, it stays.
- **Accessibility on equal footing with polish.** Every Lenis instance must ship with a `prefers-reduced-motion` branch that either disables Lenis or sets `lerp: 1` (instant).

## 8. Brand & ICP relationship

### Cochrane Master Builders — current active brand

- **Easing personality** matches `mem://design/motion-philosophy`: cinematic reveals, bottom-to-top clip-path curtains, Ken Burns scaling. Heavy / luxurious. Never bouncy.
- **Lenis preset (Cochrane Master Builders):**
  - `lerp: 0.06–0.08` (heavier than the source's 0.05 example because brand = family-legacy residential).
  - `wheelMultiplier: 1.1`, `touchMultiplier: 1.0` — input feels *deliberate*, not snappy.
  - `syncTouch: false` (default) until iOS<16 share is negligible.
  - `autoRaf: true` unless integrating with GSAP's ticker (then drive Lenis from `gsap.ticker`).
  - `smoothWheel: true`.
- **Initialisation order:** Lenis must be initialised *after* `mem://features/loading-sequence` resolves, so it doesn't fight the split-curtain reveal.
- **Hero coexistence:** the locked hero (`mem://design/hero-section-lock`) owns its arrival choreography. Lenis owns *everything after* the hero settles.
- **Booking modal:** apply `data-lenis-prevent` to the inner scrollable form panel; call `lenis.stop()` on open and `lenis.start()` on close. Combine with `mem://tech/modal-lifecycle-management` (singleton, AnimatePresence pointer-events gating).
- **Cloth-wipe transition** (`mem://design/cloth-wipe-transition`): already transform/opacity-only → Lenis-safe.
- **Scroll-driven candidates:** editorial divider tapers (`mem://design/editorial-divider-specs`) and full-bleed parallax (`mem://tech/parallax-coverage-specs`, 130% height / -15% top offset).
- **Visual constraints carry over:** no human imagery (`mem://constraints/image-content-restrictions`), no rounded cards / ghost buttons (`mem://design/component-styling`).
- **Mobile (390px target, `mem://constraints/mobile-optimization`):** keep Lenis momentum on, but **downgrade scroll-fade reveals** per source's "Avoid scroll fading on mobile" guideline.

### Cochrane Master Builders — when activated

- Inherit the same playbook but couple easing to a *family-legacy / generational-craft* personality (slightly slower lerp, longer easing tail, more gravitas). Document the per-brand preset in a future `brands/cochrane-master-builders/animations/` partner doc when CMB goes live.
- ICPs (Mothers, Grandfathers, Subcontractors) — for **Grandfathers** especially, default to *more conservative* motion: shorter fade duration (~150–200 ms), no parallax on text, generous `prefers-reduced-motion` honouring.

## 9. Global vs specific

- **Wins over** ad-hoc per-component scroll choices on **technical method**: always Lenis + GSAP ScrollTrigger, always transform/opacity, always 100–400 ms fade band, always `prefers-reduced-motion` branch.
- **Inherits from** `governance/knowledge-system-charter` (always) and `experience-prompts/master-design-persona-fantasy` (visual taste).
- **Loses to** brand-identity / motion-philosophy partner docs and existing memories on the **personality** of the easing (e.g., Cochrane Master Builders overrides the source's lighter `lerp: 0.05` example with a heavier 0.06–0.08 band).
- **Loses to** existing locked components: hero (`mem://design/hero-section-lock`), brand-logo parallax (`mem://design/micro-interactions/brand-logo-parallax`), loading sequence (`mem://features/loading-sequence`), booking submission animation (`mem://features/booking-submission-animation`).

## 10. Adaptation notes (conflict rule applied — source preserved verbatim)

| In source | Apply as |
|-----------|----------|
| `Lovable.dev` (the framework the source addresses) | The active brand for the prompt — **Cochrane Master Builders** in this codebase by default; **Cochrane Master Builders** when CMB is the active brand. |
| `lerp: 0.05` (Next.js provider example) | Starting point for *light* brands. For Cochrane Master Builders / luxury brands prefer `0.06–0.08`. Always document the per-brand lerp in the brand's motion partner doc. |
| `wheelMultiplier: 1.5`, `touchMultiplier: 1.1` (example) | One valid preset. For Cochrane Master Builders prefer `1.1` / `1.0` — input must feel *deliberate*, not snappy. |
| `syncTouch: true` (with iOS<16 caveat) | Default `false` until iOS<16 share is negligible. |
| Igloo Inc procedural ice blocks / WebGL UI / particle simulations | **Inspiration only**, not a blueprint. Do not adopt Three.js unless a brand explicitly invests in a 3D hero. |
| Tool list mentioning Svelte / Vue / SvelteKit / Next.js | This codebase is **React 18 + Vite**. Translate the "Next.js provider for Lenis" pattern into a React `LenisProvider` component (`useEffect` + rAF lifecycle pattern maps cleanly). Use `lenis` package (npm) when actually installing. |
| Scroll-driven CSS animations API | Browser support still limited. Continue using Lenis + GSAP as primary; revisit annually. |
| Trailing **Final Directive** with the empty step | **Knowledge-only.** Does NOT authorise a frontend scroll-overhaul pass. Implementing Lenis + GSAP across the site is a separate, deliberately-scoped request that must come from the user. |
| Duplicated headings ("Performance principles…" twice, "GSAP GSAP & ScrollTrigger", leading-space headings " Example: Next.js…", " Scroll-driven animation API", " Igloo Inc case study") | Paste artefacts from the original DOCX. Read past them. |
| `<mark>` tags around config keys / values | Treat as inline highlights of code identifiers. |
| Mention of "Work Work & Co" | Likely refers to Work & Co. Treat as such, but do not edit the source. |
| References to "weddings" or any non-custom home building/non-construction context if encountered | Treat as out-of-scope. The active brand's identity (Cochrane Master Builders residential finishing or CMB construction) governs all output decisions. |

## 11. Dependencies / related documents

**Always inherit**
- `partner-documents/governance/knowledge-system-charter` — dual-layer rule, conflict rule, fantasy.co quality bar.

**Style + taste partner**
- `partner-documents/experience-prompts/master-design-persona-fantasy` — visual taste ceiling.

**Cinematic intro partner**
- `partner-documents/experience-prompts/anti-gravity-opening-engineer` — owns the opening choreography that runs *before* Lenis takes over the page.

**Brand motion memories (Cochrane Master Builders)**
- `mem://design/motion-philosophy` — cinematic reveals, clip-path curtains, Ken Burns.
- `mem://design/cloth-wipe-transition` — transform/opacity-only, Lenis-safe.
- `mem://features/loading-sequence` — Lenis must start *after* this resolves.
- `mem://design/hero-section-lock` — hero choreography is locked; Lenis works around it.
- `mem://design/editorial-divider-specs` — scroll-driven taper reveals.
- `mem://tech/parallax-coverage-specs` — 130% / -15% offset rule for full-bleed parallax.
- `mem://design/hero-interactive-shine` — cursor-driven, not scroll-driven, but shares the frame budget.
- `mem://design/micro-interactions/brand-logo-parallax` — desktop-only mouse parallax (compositor-only).
- `mem://tech/modal-lifecycle-management` — Lenis stop/start hooks for the booking modal.
- `mem://design/booking-modal-architecture` — two-region booking modal; the form panel needs `data-lenis-prevent`.
- `mem://constraints/mobile-optimization` — downgrade scroll-fades on 390px viewport.
- `mem://design/visual-rhythm` — section divider heights / generous vertical padding feed scroll pacing.
- `mem://design/navigation-specs` — 80px navbar = anchor offset target (`anchors: { offset: -80 }`).

**Future**
- When CMB activates as the live brand, mirror these motion memories under `brands/cochrane-master-builders/animations/`.

## 12. Practical examples

**A. "The site feels twitchy on Mac trackpads."**
Install Lenis at the App root with `lerp: 0.07`, `wheelMultiplier: 1.1`, `touchMultiplier: 1.0`, `autoRaf: false` (drive from GSAP ticker). Wire the canonical triad:
```ts
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
Add a `prefers-reduced-motion` branch that skips Lenis entirely. Confirm fps with Chrome DevTools.

**B. "Add a scroll-fade reveal to the section heading."**
```ts
gsap.from(el, {
  opacity: 0,
  y: 24,
  duration: 0.32,        // inside 100–400 ms band
  ease: 'power2.out',
  scrollTrigger: { trigger: el, start: 'top 80%', once: true }, // persist
});
```
Animate text *or* image, not both at once. Skip on mobile (`window.matchMedia('(max-width: 640px)')`) per source guideline.

**C. "The booking modal scrolls weird inside Lenis."**
Add `data-lenis-prevent` to the inner scrollable form panel. On `Dialog.onOpenChange(true)` call `lenis.stop()`; on close call `lenis.start()`. Combine with the singleton + AnimatePresence pointer-events rules in `mem://tech/modal-lifecycle-management`.

**D. "Anchor link to `#services` lands behind the sticky nav."**
Configure Lenis with `anchors: { offset: -80 }` (matching the 80px navbar from `mem://design/navigation-specs`). Or use `lenis.scrollTo('#services', { offset: -80 })` programmatically.

**E. "Build an Igloo-style WebGL hero for Cochrane Master Builders."**
Flag as a major investment. Confirm scope with brand decision-makers. If approved: scaffold Three.js + React Three Fiber, follow Igloo case study (procedural variation, GPU-side effects, browser-iterated shader work, real-time intro). Otherwise stay DOM-only and lean on `mem://design/motion-philosophy` reveals.

**F. "Pin the services section while we scroll through three cards."**
GSAP ScrollTrigger with `pin: true`, `scrub: 1` (smooth tween-to-scroll), driven off Lenis. Animate `transform` + `opacity` only. Provide a non-pinned fallback for `prefers-reduced-motion`.

---

## Decision-flow summary

1. Does the request touch scroll mechanics or scroll-coupled motion? → consult this doc.
2. Read the *source* in full. Apply the conflict-rule table in §10.
3. Read the active brand's motion memories / partner doc. Brand personality wins on easing *feel*.
4. Apply the technical playbook (Lenis + GSAP ScrollTrigger triad, transform/opacity only, 100–400 ms fades, persistence, stagger, mobile downgrade, `prefers-reduced-motion`).
5. Verify against `mem://tech/modal-lifecycle-management`, hero/loading locks, and the booking-modal architecture before shipping.
6. Measure: 60 fps target. Drop non-critical animations before degrading frame rate.
