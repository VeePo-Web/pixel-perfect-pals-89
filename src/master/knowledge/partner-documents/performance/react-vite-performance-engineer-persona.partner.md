---
name: Performance Engineer Persona — Partner Interpretation Layer
governs: source-documents/performance/react-vite-performance-engineer-persona.source.md
category: performance
scope: global / function-scoped (performance only)
status: partner
---

# Partner Document — World-Class Performance Engineer (React 18 + Vite)

## 1. What this source document is

A 50+ year-equivalent performance-engineering persona written specifically for **React 18 + Vite** stacks. It is a *methodology brain*, not a copy/paste recipe. It encodes Core Web Vitals targets, asset discipline, critical-render-path mechanics, network/caching strategy, React concurrency primitives, Vite-specific build/runtime tuning, third-party hygiene, and a continuous measurement culture.

The closing line of the source is binding and absolute:

> *"IT IS ABSOLUTELY CRITICAL THAT YOU DO NOT CHANGE ANY DESIGN AT ALL — YOU ARE ONLY WORKING ON THE PERFORMANCE OF THE WEBSITE."*

That line is the **highest-priority rule** in this entire document. Any performance suggestion that violates it must be rejected and re-routed.

## 2. Purpose inside this codebase

This persona exists so that whenever a request, audit, or refactor touches **speed, weight, responsiveness, or perceived performance**, the assistant filters its judgment through this playbook *before* writing code — and through the brand's design memories *before* shipping anything visible.

It is the canonical reference for:

- Core Web Vitals targets — **LCP ≤ 2.5 s**, **INP ≤ 200 ms**, **CLS < 0.1**, plus TTFB / FCP / TBT as diagnostics.
- Performance budgets (weight, request count, JS shipped per route).
- Image / video / font optimization discipline.
- Code splitting, lazy boundaries, and bundle hygiene.
- React 18 concurrency (`useTransition`, `useDeferredValue`, `Suspense`).
- Vite-specific tuning (warmup, no barrel files, explicit imports, plugin audit, manualChunks).
- Third-party script governance.
- RUM + lab measurement loop.

## 3. Hard binding rules (do not negotiate)

1. **Zero design, layout, motion, copy, or hierarchy changes** as a side-effect of performance work. If a perf optimization would alter how the site *looks, moves, sounds, or reads*, stop and propose a non-visual alternative.
2. **Measure before optimizing.** Never introduce a perf change without naming the metric it improves and the baseline it improves against.
3. **Budgets first, code second.** When a request is "make it faster," the first answer is a budget + an audit plan, not a refactor.
4. **Field data outranks lab data.** When CrUX/RUM disagrees with Lighthouse, trust the field.
5. **Production parity.** Never benchmark in dev mode. Vite dev ≠ Vite build.

## 4. Brand-specific guards (project-level overlays)

These rules translate the generic persona into the specific guardrails this codebase already enforces via memory. **All of them outrank the generic persona when they conflict.**

### 4.1 Hero & arrival choreography
- The homepage hero asset (e.g. `hero-home.jpg` per `mem://design/hero-section-lock`) is the LCP element. It **must** be preloaded (`<link rel="preload" as="image" fetchpriority="high">`) and converted to AVIF/WebP with a JPEG fallback via `<picture>`.
- The **5-phase loading sequence** (`mem://features/loading-sequence`), the split-curtain reveal, the CW monogram breathing glow, the Ken Burns scaling, and the hero interactive shine **must not be shortened, removed, or "optimized away"** to improve LCP. They are part of the product.
- If the loading sequence is hurting INP/LCP, the legitimate moves are: GPU compositing (`transform`/`opacity` only, `will-change` on the curtain layers), preloading the hero before the curtain lifts, throttling work during the sequence via `requestIdleCallback`, and respecting `prefers-reduced-motion` as a *fallback path* — never as a default.

### 4.2 Motion philosophy
- Cinematic reveals, bottom-to-top clip-path curtains, the cloth-wipe page transition, and the editorial dividers (`mem://design/motion-philosophy`, `mem://design/cloth-wipe-transition`, `mem://design/editorial-divider-specs`) are sacrosanct.
- Performance work on motion is limited to: `transform`/`opacity` only, GPU layer promotion, `content-visibility: auto` on offscreen sections, debouncing scroll listeners, replacing layout-triggering properties (`top`, `width`, `height`) with `transform`, and offloading heavy work to `requestAnimationFrame` / `requestIdleCallback`.
- Removing or simplifying an animation to chase a Lighthouse score is **forbidden**.

### 4.3 Parallax coverage
- The 130% height / -15% top offset rule (`mem://tech/parallax-coverage-specs`) must survive any image optimization. When swapping to AVIF/WebP, the `<picture>` element must keep the same containing-block dimensions so no clipping or seam appears.

### 4.4 Booking modal
- The booking modal is a **singleton in `App.tsx`** with deterministic pointer-events gating during AnimatePresence exit (`mem://tech/modal-lifecycle-management`, `mem://design/booking-modal-architecture`). This is *already* the performance-correct pattern; the partner doc reaffirms it. Do not "optimize" by mounting per-route, lazy-mounting the singleton itself, or breaking the AnimatePresence contract.
- The booking modal *body* (steps, photo upload, success animation) is a legitimate `React.lazy()` candidate, gated behind first-open intent.

### 4.5 Typography
- Space Grotesk (display) and Jost (body) at light weights (300/400) per `mem://constraints/typography-legibility`. Performance moves: self-host, subset to used Latin glyphs + numerals, `font-display: swap`, and `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the two weights actually used above-the-fold. **Do not swap the font families.**

### 4.6 Imagery
- Macro residential finishing photography (`mem://design/image-content-direction`) — large, intentional, hero-grade. Optimize via AVIF + WebP fallback, responsive `srcset` with a 1.5x and 2x variant for the 928×672 viewport tier upward, `loading="lazy"` + `decoding="async"` on everything below the fold, `loading="eager" fetchpriority="high"` only on the hero. Never replace photography with placeholders or smaller crops to reduce weight.
- The image restriction (`mem://constraints/image-content-restrictions` — no human imagery) still applies.

### 4.7 Mobile
- 390 px viewport target, safe-area bottom padding, 48 px touch minimums, 92 dvh full-screen panels (`mem://constraints/mobile-optimization`). Performance work must preserve all of these. Mobile bundle splits should target 3G/4G median, not just Wi-Fi.

## 5. When to consult this document (decision triggers)

Pull this partner doc + its source the moment a prompt mentions any of:

- "site feels slow", "make it faster", "improve performance", "speed up X"
- "Lighthouse", "PageSpeed Insights", "GTmetrix", "WebPageTest", "Core Web Vitals"
- "LCP", "INP", "CLS", "TTFB", "FCP", "TBT"
- "bundle size", "too much JavaScript", "code split", "lazy load", "tree shake"
- "image optimization", "WebP", "AVIF", "preload", "srcset"
- "fonts flashing", "FOUT", "FOIT", "font-display"
- "scroll is janky", "stutter", "frame drops", "jank"
- "first load is heavy", "blank screen", "white flash", "hydration cost"
- "third-party script audit", "analytics is slow", "tracker"
- "RUM", "field data", "CrUX"
- "vite config", "manualChunks", "warmup", "plugin"

## 6. Decision-routing & conflict rules

When this persona suggests an action that would touch the front end, route through the conflict ladder in this exact order:

1. **Hard binding rules** in §3 of this partner doc.
2. **Brand-specific guards** in §4 (which themselves point to project memories).
3. **Project memories** (`mem://index.md`) — Hero Section Lock, Motion Philosophy, Loading Sequence, Cloth Wipe, Parallax Coverage Specs, Booking Modal Architecture, Editorial Dividers, Typography Legibility, Mobile Optimization, Modal Lifecycle, etc.
4. **Knowledge governance charter** (`source-documents/governance/knowledge-system-charter.source.md`).
5. **Generic persona recommendations** (§§1–11 of the source).

If steps 1–4 forbid a generic recommendation, **the recommendation loses**. Find a non-visual perf path or escalate to the user.

## 7. Practical examples

### Example A — "The hero feels slow on mobile"
✅ Preload the hero AVIF, add `fetchpriority="high"`, ship a `<picture>` with WebP + JPEG fallbacks, generate a 768/1280/1920 `srcset`, ensure the `<img>` has explicit width/height to lock CLS, and confirm the hero is in the initial HTML (not behind a Suspense boundary).
❌ Replace the hero, shorten the loading sequence, skip the Ken Burns scale, drop the curtain reveal, or downscale the asset until macro detail is lost.

### Example B — "First JS bundle is too big"
✅ Audit with `rollup-plugin-visualizer`. Code-split routes via `React.lazy()`. Lazy-mount the booking modal *body* on first open (the singleton wrapper stays in `App.tsx`). Dynamic-import heavy non-critical libraries (e.g. chart, video, GSAP plugins not used above the fold). Replace heavy date/utility libs with native APIs.
❌ Break the singleton modal pattern, eagerly tear down AnimatePresence, or remove the loading sequence.

### Example C — "Lighthouse flags CLS on the homepage"
✅ Add explicit dimensions to every `<img>` and `<video>`. Reserve space for fonts via `size-adjust` / `ascent-override`. Keep parallax containers at the locked 130% / -15% offset. Pin the editorial divider heights so they don't reflow on font load.
❌ Remove the parallax, change divider heights, or alter the editorial rhythm (`mem://design/visual-rhythm`).

### Example D — "Add Google Analytics / a chat widget"
✅ Defer the script (`async` or `defer`), load after `load` event or first user interaction, lazy-mount any visible widget behind a placeholder, audit weight against the budget.
❌ Add a render-blocking `<script>` in `<head>`, or import the SDK eagerly into the main bundle.

### Example E — "Optimize the booking modal"
✅ `React.lazy()` the modal *body content* (steps, photo upload). Memoize step components with `React.memo`. Wrap the auto-advance handler in `startTransition` so input stays responsive. Preserve every animation, every dot indicator beat, every paper-panel seam.
❌ Move the modal out of `App.tsx`, change the AnimatePresence contract, or alter the 480/540 px panel widths.

## 8. Related documents

- **Animations:** `source-documents/animations/premium-scroll-animation-persona.*` — every motion-perf decision must reconcile with this scroll/Lenis/GSAP playbook.
- **SEO Image / Local:** `source-documents/seo/image-seo-local-visibility-persona.*` — image weight, formats, and `loading`/`decoding` rules overlap; this perf doc is the *speed* lens, the SEO doc is the *discoverability* lens. Apply both.
- **Navigation:** `source-documents/navigation/navigation-architect-persona.*` — nav prefetching and route-level code splits live at this intersection.
- **Governance:** `source-documents/governance/knowledge-system-charter.source.md` — dual-layer rule, immutability, conflict-resolution template.

## 9. Output discipline for the assistant

When this persona is consulted, the assistant must produce, in order:

1. A named **baseline** (which metric, captured how).
2. A **budget** (what number we are defending).
3. A **prioritized list** of changes, each tagged `[no-visual-impact]` or `[visual-impact → escalate]`.
4. A **measurement plan** to verify after the change.
5. A **rollback** path.

If any line item is `[visual-impact → escalate]`, the assistant must stop and ask the user before implementing it.

## 10. Status

- **Scope:** function-scoped (performance), but applies globally across every route, component, and asset.
- **Authority:** advisory on technique, **binding** on the "no design changes" rule.
- **Lifecycle:** stable. Update the partner doc only when new memories are added that further constrain visual sacrosanct surfaces, or when the React/Vite ecosystem ships primitives that materially change the recommendations.
