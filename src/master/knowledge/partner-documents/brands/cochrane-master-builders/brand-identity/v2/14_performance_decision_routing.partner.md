# 14 — Performance Decision Routing (CMB)

> **File:** `14_performance_decision_routing.partner.md`
> **Parent:** CMB Master Style Guide v2.0
> **Owner persona:** React + Vite Performance Engineer (CMB-scoped)
> **Upstream source (byte-for-byte, integrity-tracked):**
> `src/master/knowledge/source-documents/brands/cochrane-master-builders/performance/react-vite-performance-engineer-persona.source.md`
> **SHA-256:** `dd84af5a957545eba3fb0ca96711cfd2861d7704c07e9eb6c47cf689b2762e2a`
> **Bytes:** 17163  **Lines:** 165
> **Scope:** Cochrane Master Builders only.
> **Sibling authority:** `11_performance_accessibility_governance.partner.md` (governance posture). This file is the **decision router** with hard numeric budgets.
> **Does NOT change design.** All visual decisions remain governed by `12_landing_page_style_guide_persona.partner.md` and `13_landing_page_operating_manual.partner.md`. If a performance fix would alter design output, it is **rejected at the gate** and escalated — see §11.

---

## 0. What this document is (and is not)

**Is:**
- The single routing authority for any change that affects payload, parse, paint, layout-stability, or interactivity on a CMB surface.
- The owner of the **hard CWV floors** (§2) and the **per-route budget table** (§6).
- The owner of the **allow / conditional / deny matrices** (§4) for assets, scripts, third parties, fonts, motion.
- The owner of the **build-time** and **runtime** gates (§7, §8).

**Is not:**
- A design document. It does not define spacing, typography, color, or section composition. Those belong to files 12 and 13.
- A replacement for `11_performance_accessibility_governance` — that file owns culture, sign-off cadence, accessibility coupling, and the broader governance posture. **14 owns the numeric router.**
- A licence to remove, downgrade, or restyle anything in pursuit of a metric. See §5 (Design-neutrality clause).

---

## 1. Non-goals (explicit)

The following are **forbidden** justifications for any change made under this authority:

1. "We removed the [section / hero / motion] to hit LCP."
2. "We swapped Space Grotesk / Jost for a system font to cut payload."
3. "We replaced the AVIF hero with a smaller crop / different image."
4. "We collapsed two archetypes into one to reduce DOM."
5. "We disabled the cinematic reveals to improve INP."
6. "We dropped the copper accent layer to simplify CSS."

Any of the above auto-fails review and routes to **§11 escalation**.

---

## 2. Hard CWV floors (premium budget)

These are **floors, not targets**. A PR that ships any route worse than the floor on the listed device class **cannot merge**.

| Metric | Floor | Device profile | Notes |
|---|---|---|---|
| **LCP** | **< 2.0 s** | Moto G4-class, 4G Slow (1.6 Mbps, 150 ms RTT) | p75 across 28-day window |
| **CLS** | **< 0.02** | All | Includes booking modal mount |
| **INP** | **< 150 ms** | Mid-tier mobile | p75 |
| **TBT** | **< 150 ms** | Lab — Lighthouse mobile | Per-route |
| **TTFB** | **< 600 ms** | All | Edge cache HIT required for marketing routes |
| **FCP** | **< 1.4 s** | Mobile | Lab |
| **SI** | **< 2.5 s** | Mobile | Lab |

### Payload caps (gzip-compressed, per route)

| Asset class | Cap | Notes |
|---|---|---|
| JS shipped to client | **170 KB gz** | Excludes prefetched routes |
| CSS shipped to client | **60 KB gz** | All Tailwind output combined |
| Hero image | **140 KB** | AVIF preferred, WebP fallback |
| Total route weight | **900 KB** | All resource types, first paint |
| Font payload (total) | **80 KB** | Subset, woff2 only |
| Font families | **2 max** | Space Grotesk + Jost (locked by design system) |
| Font weights total | **4 max** | 300, 400 default; 500/600 only with §4 conditional approval |

### What "per route" means

Per route = the resources required to render that route's first viewport on a cold load with no service worker. Code-split chunks fetched on idle do **not** count against the cap, but they **do** count against the per-route INP budget if they execute before user input completes.

---

## 3. Decision routing tree

Any change touching any item in §4 must walk this tree before merging.

```text
                       ┌─────────────────────────────┐
                       │  Proposed change            │
                       └──────────────┬──────────────┘
                                      │
                ┌─────────────────────┼─────────────────────┐
                │                     │                     │
        Adds payload?           Adds work on             Changes
        (asset, lib,            main thread?             visual output?
        font, third party)      (script, anim,
                │               handler)                     │
                │                     │                     │
                ▼                     ▼                     ▼
          §4 matrix              §4 matrix          ROUTE TO FILE 12/13
          lookup                 lookup             (NOT this file)
                │                     │                     │
        ┌───────┼───────┐     ┌───────┼───────┐
        ▼       ▼       ▼     ▼       ▼       ▼
      ALLOW  COND.   DENY   ALLOW  COND.   DENY
        │       │       │     │       │       │
        │   §6 budget   │     │   §6 budget   │
        │   re-check    │     │   re-check    │
        │       │       │     │       │       │
        ▼       ▼       ▼     ▼       ▼       ▼
      MERGE  REVIEW  REJECT MERGE  REVIEW  REJECT
                │                     │
                ▼                     ▼
       Perf lead + design     Perf lead + design
       neutrality sign-off    neutrality sign-off
                                      │
                                      ▼
                              If neutrality fails →
                              §11 escalation
```

**Rule:** A change that "Changes visual output" is **never** routed by this file. It must be authored against files 12/13. This file only acts on the payload/work axes.

---

## 4. Allow / Conditional / Deny matrices

Conditional = needs perf-lead written approval AND a §6 budget re-check.
Deny = blocked at PR review. To override, the requester must produce a written exception signed by perf lead **and** brand lead.

### 4.1 Images

| Decision | Items |
|---|---|
| **Allow** | AVIF ≤ 140 KB hero, AVIF/WebP ≤ 60 KB inline, decorative inline SVG ≤ 4 KB, sprite SVG ≤ 12 KB |
| **Conditional** | Above-the-fold AVIF 140–180 KB (must justify with art-direction note from file 13), WebP fallback duplicates, lazy-loaded JPEG > 60 KB (only outside hero) |
| **Deny** | PNG screenshots > 100 KB, animated GIF (any size), uncompressed source PNG, image without explicit `width`/`height` attrs, hero `<img>` without `fetchpriority="high"` |

### 4.2 Fonts

| Decision | Items |
|---|---|
| **Allow** | Self-hosted woff2, subset (Latin + extended Latin if community pages need it), `font-display: swap`, preload **only** the LCP-critical face |
| **Conditional** | A 5th weight (500 or 600) — must show typographic role mapped to file 13's scale, must subset, must keep total ≤ 80 KB |
| **Deny** | Google Fonts CDN link, third-party font CDNs, full-charset woff2, woff (non-2), TTF/OTF in production, italic variants not used by file 13 |

### 4.3 JavaScript libraries

| Decision | Items |
|---|---|
| **Allow** | React, react-dom, react-router-dom, framer-motion (already in budget), tailwind-merge, clsx, lucide-react (tree-shaken), date-fns (tree-shaken), zod, @tanstack/react-query, supabase-js |
| **Conditional** | Any new lib > 8 KB gz — requires bundle-analyser screenshot, written justification, and §6 re-check on every affected route |
| **Deny** | moment, lodash (full), jquery, axios (use `fetch`), heavy chart libs (chart.js, recharts) on marketing routes, any lib that CJS-only, any lib with > 50 KB gz that duplicates an existing capability |

### 4.4 CSS

| Decision | Items |
|---|---|
| **Allow** | Tailwind utility classes already in `tailwind.config.ts`, semantic-token-based custom CSS in `index.css` |
| **Conditional** | New `@layer` rules (must justify against design tokens), new keyframes (must respect `prefers-reduced-motion`) |
| **Deny** | Inline `<style>` blocks in components, runtime CSS-in-JS (emotion / styled-components), unscoped global selectors, any CSS that ships > 60 KB gz total |

### 4.5 Animations & motion

| Decision | Items |
|---|---|
| **Allow** | Framer-motion variants on `transform`/`opacity` only, intersection-triggered reveals, GPU-friendly transitions ≤ 600 ms |
| **Conditional** | Any animation that animates layout-affecting properties (width, height, top, left) — requires perf trace showing < 16 ms frame budget |
| **Deny** | Animating `box-shadow` on scroll, animating `filter: blur()` continuously, parallax that fires on every scroll event without `requestAnimationFrame` throttling, autoplay video > 1 MB |

### 4.6 Third-party tags

| Decision | Items |
|---|---|
| **Allow** | Self-hosted analytics beacon (≤ 4 KB), CMB-controlled CDN edge functions |
| **Conditional** | Privacy-respecting analytics (Plausible, Fathom) loaded `async defer` after LCP |
| **Deny** | Google Analytics gtag.js on marketing routes (use server-side proxy if needed), Google Tag Manager, Hotjar, FullStory, Intercom widget, any chat widget > 30 KB gz, any social embed iframe (Twitter, Instagram, YouTube — use static screenshot + click-to-load) |

### 4.7 Web fonts loading strategy

| Decision | Items |
|---|---|
| **Allow** | `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the **single** LCP face, `font-display: swap`, `size-adjust` to minimize CLS |
| **Conditional** | Preloading a second face — only if file 13 proves it appears in the first viewport |
| **Deny** | Preloading > 2 faces, `font-display: block`, FOIT longer than 100 ms |

### 4.8 Network / data

| Decision | Items |
|---|---|
| **Allow** | Edge-cached marketing data, Supabase reads ≤ 50 KB JSON gz, prefetched on idle |
| **Conditional** | Client-side joins across > 2 tables — must be measured against INP floor |
| **Deny** | Blocking fetch in render path, waterfall of > 2 sequential requests before LCP, unindexed queries on marketing surfaces |

---

## 5. Design-neutrality clause (binding)

Every change merged under this authority must be **pixel-equivalent** to the pre-change render at all four canonical viewports:

- **390 × 701** (mobile, primary CMB target)
- **768 × 1024** (tablet)
- **1280 × 800** (laptop)
- **1920 × 1080** (desktop)

Pixel-equivalent = no perceptible difference in layout, type, color, motion timing, or section ordering. A 1–2 px sub-pixel anti-alias delta caused by a font-loading strategy change is acceptable **only** if file 13's auditor signs it off.

### Forbidden "optimisations" (auto-reject)

- Removing or hiding any section defined in file 13's archetype catalog.
- Replacing the locked hero image set without a parallel design PR signed by file 12 owner.
- Disabling reveal/Ken-Burns motion to improve INP. Correct path: re-author the animation per §4.5.
- Downgrading a font weight that file 13 specifies for a role.
- Reducing whitespace tokens (`space-*`) to fit "above the fold."
- Merging two archetypes into one.
- Replacing copper accent layers with system colors.

### Allowed perf moves that preserve design

- Smaller AVIF encodes of the **same** hero crop.
- Subsetting fonts to characters actually used.
- Code-splitting non-LCP routes.
- Replacing a heavy lib with a lighter one **of identical visual API**.
- Moving non-critical JS to `idle` / `defer`.
- Inlining critical CSS (≤ 14 KB) for the first paint.
- Adding `fetchpriority`, `loading="lazy"`, `decoding="async"` attributes.
- Preconnecting to required origins.
- Adding `Cache-Control` / edge headers.

---

## 6. Per-route budget table

| Route | LCP floor | JS gz cap | CSS gz cap | Hero img cap | Font cap | Total cap |
|---|---|---|---|---|---|---|
| `/` (homepage) | 1.8 s | 170 KB | 60 KB | 140 KB | 80 KB | 900 KB |
| `/services/[slug]` | 2.0 s | 160 KB | 55 KB | 120 KB | 80 KB | 850 KB |
| `/communities/[slug]` | 2.0 s | 150 KB | 55 KB | 120 KB | 80 KB | 800 KB |
| `/process` | 2.2 s | 160 KB | 55 KB | 100 KB | 80 KB | 800 KB |
| `/contact` | 1.6 s | 130 KB | 50 KB | 80 KB | 60 KB | 600 KB |
| `/about` | 2.0 s | 140 KB | 55 KB | 120 KB | 80 KB | 750 KB |

Caps are per **first paint**. Subsequent route navigations must stay within +30 KB JS additive.

---

## 7. Build-time gates

These run in CI and **must block merge on failure**.

1. **Lighthouse CI** (mobile profile, throttled 4G slow):
   - Performance score ≥ 95 on every marketing route.
   - LCP, CLS, INP/TBT must satisfy §2 floors.
2. **size-limit** (or equivalent):
   - JS chunks per route within §6 cap.
   - CSS bundle within §6 cap.
3. **Vite chunk analysis**:
   - No single vendor chunk > 100 KB gz.
   - No dynamic-import cycle.
4. **Image audit script**:
   - Walks `src/assets/` and `public/`. Any `.avif`/`.webp` > 140 KB on a hero path, or any `.jpg`/`.png` > 200 KB anywhere → fail.
5. **Font audit**:
   - Total `public/fonts/` woff2 size ≤ 80 KB.
   - No `.ttf`/`.otf`/`.woff` in `public/`.
6. **Third-party domain allowlist**:
   - `rg` for `<script src=` and `fetch(` against an allowlist file. Unknown origin → fail.

---

## 8. Runtime gates

Wired through whatever RUM provider CMB chooses (privacy-respecting, server-proxied).

| Signal | Threshold | Action |
|---|---|---|
| LCP p75 (28d) | > 2.0 s | Page flagged red on internal dashboard |
| CLS p75 | > 0.02 | Auto-open ticket assigned to perf lead |
| INP p75 | > 150 ms | Auto-open ticket assigned to perf lead |
| 4xx on hero asset | any | Pager (out-of-hours) |
| Font face fallback rate | > 5% | Investigate subset/preload |

---

## 9. Pass / Fail audit checklist

Auditor walks this list per route before sign-off. Any "Fail" = block.

1. LCP element identified and has `fetchpriority="high"`. Pass / Fail
2. LCP image is AVIF (or WebP fallback) and ≤ §6 cap. Pass / Fail
3. LCP image has explicit `width` and `height`. Pass / Fail
4. No CLS contributor mounted after first paint without reserved space. Pass / Fail
5. Booking modal mount does not shift layout. Pass / Fail
6. Only the LCP-critical font face is preloaded. Pass / Fail
7. Total preloaded font payload ≤ 80 KB. Pass / Fail
8. No Google Fonts CDN link present. Pass / Fail
9. No third-party JS on marketing routes outside §4.6 allowlist. Pass / Fail
10. No GTM, GA gtag, Hotjar, Intercom, social embeds. Pass / Fail
11. JS shipped to route ≤ §6 cap (verified by bundle analyser screenshot). Pass / Fail
12. CSS shipped ≤ §6 cap. Pass / Fail
13. No inline `<style>` block in any component. Pass / Fail
14. No `import` of moment / lodash / jquery / axios. Pass / Fail
15. All `<img>` outside the LCP hero have `loading="lazy" decoding="async"`. Pass / Fail
16. All animations animate only `transform` / `opacity` (or have a perf trace exception). Pass / Fail
17. `prefers-reduced-motion` honoured for every reveal. Pass / Fail
18. No animation of `box-shadow` / `filter` on scroll without throttle. Pass / Fail
19. Lighthouse CI mobile score ≥ 95 on this route. Pass / Fail
20. Lab LCP / CLS / TBT all within §2 floors. Pass / Fail
21. RUM dashboard for this route shows green over the last 28 days. Pass / Fail
22. **Design neutrality**: pixel-equivalent at 390 / 768 / 1280 / 1920 (visual diff signed by file 13 owner). Pass / Fail
23. **Design neutrality**: no archetype removed, merged, or reordered. Pass / Fail
24. **Design neutrality**: no font, weight, or color token swapped. Pass / Fail
25. Sign-off chain (§12) complete with timestamps. Pass / Fail

---

## 10. Auditor ripgrep bundle

Run from project root. Each pattern that returns a hit on a CMB surface is **investigate-or-justify**.

```bash
# 1. Google Fonts CDN
rg -n 'fonts\.googleapis\.com|fonts\.gstatic\.com' src public index.html

# 2. Banned heavy libs
rg -n "from ['\"](moment|lodash|jquery|axios)['\"]" src

# 3. Inline style blocks in components
rg -n '<style[^>]*>' src --type tsx --type ts

# 4. Images without lazy-loading (excluding hero / LCP)
rg -n '<img\b(?![^>]*loading=)' src --type tsx --type ts | rg -v -i 'hero|lcp'

# 5. Animated GIFs
rg -n '\.gif["\)]' src public

# 6. Tag managers / analytics on marketing surfaces
rg -n 'googletagmanager|gtag\(|hotjar|fullstory|intercom' src public index.html

# 7. Social embed iframes
rg -n '<iframe[^>]+(twitter|instagram|youtube|facebook)' src

# 8. Non-woff2 font formats in public
rg --files public/fonts | rg -v '\.woff2$'

# 9. Hero images without fetchpriority
rg -n '<img\b[^>]*hero' src --type tsx | rg -v 'fetchpriority'

# 10. Synchronous third-party scripts
rg -n '<script\b(?![^>]*(async|defer))[^>]*src=' src public index.html
```

A passing audit = every command returns zero hits **or** every hit has a written exception attached to the PR.

---

## 11. Escalation chain (when perf and design conflict)

If the only way to hit a §2 floor or §6 cap is to violate §5, **stop**. Do not ship a workaround. Open an escalation:

1. **Perf lead** drafts the conflict note: which floor, which design lock, what was tried.
2. **Design lead (file 13 owner)** reviews. Two outcomes:
   - **Re-author the design** in files 12/13 to relieve the conflict (preferred). The perf change then ships against the new design.
   - **Hold the design** and accept a temporary budget exception, time-boxed and recorded in §13.
3. **Brand lead** signs the chosen outcome.
4. PR proceeds only with the signed escalation note attached.

The escalation note format:

```text
ESCALATION: <route> · <metric or cap> · <design lock>
Tried: <list>
Cannot: <list>
Resolution: [re-author | exception]
Expires: <date if exception>
Signed: perf=<…> design=<…> brand=<…>
```

---

## 12. Sign-off chain

Every PR touching a route's payload, scripts, or third parties must collect, in order:

1. **Performance lead** — verifies §2, §6, §7, §8, §9, §10.
2. **Design lead (file 13 owner)** — verifies §5 design-neutrality.
3. **Brand lead** — verifies the change does not contradict files 01, 09, 12.

No merge without all three.

---

## 13. Exception register

Any temporary budget exception (issued under §11) is recorded here with metric, route, expiry date, and owner. Empty by default.

| Date | Route | Metric / cap | Reason | Expires | Owner |
|---|---|---|---|---|---|
| — | — | — | — | — | — |

---

## 14. What inherits / what locks

**Inherits from:**
- `01_brand_identity_north_star` — never violate brand promise of "load fast or fail."
- `11_performance_accessibility_governance` — accessibility coupling, sign-off cadence, governance posture.
- `12_landing_page_style_guide_persona` and `13_landing_page_operating_manual` — visual locks that this file must preserve.

**Locks for child sub-guides:**
- Homepage Sub-Style-Guide and Service-Page Sub-Style-Guide must declare their per-route budget against §6 and pass §9 before publishing.
- The Process Page Sub-Style-Guide v1.0 is brought under §6 retroactively; first audit due at next routine sweep.

---

## 15. Pass/Fail audit check (this file)

- This file declares hard CWV floors. Pass / Fail
- This file declares per-route budgets. Pass / Fail
- This file declares allow / conditional / deny matrices for at least 6 asset classes. Pass / Fail
- This file declares a design-neutrality clause that auto-rejects design-altering "optimisations". Pass / Fail
- This file declares a build-time gate, a runtime gate, an audit checklist, and a ripgrep bundle. Pass / Fail
- This file declares an escalation chain that routes design conflicts back to file 13, never auto-resolved here. Pass / Fail
- This file declares a sign-off chain requiring perf + design + brand. Pass / Fail
