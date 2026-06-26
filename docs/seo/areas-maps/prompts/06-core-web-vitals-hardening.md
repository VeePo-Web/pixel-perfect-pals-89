# PROMPT 06 — Core Web Vitals Hardening (matrix + map at scale)

> Fire after Prompts 00–03. Paste this whole file to the build agent.
> Prompts 00–03 made pages legible, unique, and AI-extractable. This prompt makes them **fast under
> the 2026 thresholds** — because CWV is a Google ranking input *and* AI crawlers/answer engines favor
> fast, cleanly-parsed pages. Closes the gap flagged in the docs audit (data present, how-to missing).

---

## ROLE

You are the **Performance Optimization** specialist + **Local SEO Architect** (`/areas`). Frontend only,
on `MASTER_REMIX` tokens. Every change must hold CWV without regressing the static HTML + JSON-LD that
Prompts 00–02 put in place. Verify with fresh Lighthouse/build evidence — confidence is not evidence.

## ONE-SENTENCE OBJECTIVE

Bring every Areas matrix route and the Google Map embed under the **2026 CWV budget** on throttled
mobile — **LCP < 2.5s · INP < 200ms · CLS < 0.1 · FCP < 1.8s** — without removing any rendered content
or schema.

## WHY / CURRENT STATE

- The map is the chief liability: `CommunityPage.tsx` loads the Google JS API (or a keyless iframe)
  **inside the page** — a known LCP/INP/CLS cost at matrix scale. There is **no static-image facade** and
  no static-map LCP poster (see `areas-maps/research/04` + Prompt 02).
- **INP is the most-failed metric** industry-wide (~43% of sites fail) — driven by heavy JS on
  interaction. The repo manual-chunks `react-vendor` + `motion-vendor`; the motion bundle must not load
  on routes that don't animate.
- Field-update 01 §5: the map embed is **not a ranking factor** — so there is zero SEO cost to deferring
  it behind a facade, and a real CWV win.
- Crawlers extract from initial HTML; a fast, light initial document also helps AI fetch/parse.

---

## THE WORK

### Part A — Map facade (biggest single win)
1. Replace the eager map with a **static-image facade**: render a lightweight static map *poster*
   (or a CSS placeholder with the area name + pin) as the default; load the interactive Google Map
   **only on user interaction** (click/tap) or when it scrolls into view via `IntersectionObserver`.
   Keep the `<noscript>` iframe fallback so the map is reachable without JS.
2. The facade image must carry explicit `width`/`height` (no CLS) and **must not be the LCP element** —
   the LCP element should be the H1 or the hero, not a map. Mark the hero image `fetchpriority="high"`.

### Part B — LCP / FCP
3. Identify the LCP element per route (usually H1 or hero) and protect it: preload the hero image
   (`fetchpriority="high"`, AVIF/WebP, explicit dimensions, `srcset`/`sizes` so a phone never downloads a
   desktop-sized asset). No lazy-loading the above-fold hero.
4. Self-host + subset fonts, `font-display: swap`, preload the one critical font; no render-blocking CSS.

### Part C — INP / JS discipline
5. Ensure the **motion bundle (`motion-vendor`) is not shipped on routes that don't use it** — verify the
   matrix/area routes don't import Framer Motion eagerly; lazy-load any animated component.
6. Defer/async all third-party scripts (maps, analytics). Nothing third-party on the critical path.
7. Avoid long tasks on first interaction: keep area-page interactivity (FAQ accordions, nearby-areas
   widget) cheap; no synchronous layout thrash.

### Part D — CLS
8. Every image/embed/figure has reserved space (explicit dimensions or aspect-ratio box). The "Updated
   {Month} 2026" stamp, reviews, and nearby-areas widget must not shift content as they hydrate.

---

## VERIFICATION GATE (paste evidence before claiming done)

1. **Lighthouse mobile (throttled "Slow 4G")** on a built matrix URL: Performance ≥ 90, LCP < 2.5s,
   CLS < 0.1, TBT proxy for INP minimal; FCP < 1.8s. Paste the numbers.
2. **Map is off the critical path:** the facade renders with no Google Maps request until interaction/
   in-view; confirmed in the Network panel.
3. **Static HTML intact:** a JS-disabled fetch of the same URL still shows H1 + body + all JSON-LD
   (Prompt 00's gate did not regress).
4. **No motion bundle on area routes** unless an animated component is actually used (check the built
   chunk graph).
5. `npx tsc --noEmit` + `npx vite build` green.

## GUARDRAILS

- **Never remove rendered content or JSON-LD to gain speed** — static-render (Prompt 00) and the schema
  graph (Prompt 02) are inviolable.
- The map is UX/trust only; deferring it costs no ranking (field-update 01 §5). Do not "optimize" it by
  putting a unique map on every city page (2018-era abuse).
- Animate only `transform`/`opacity`; honor `prefers-reduced-motion`.
- Keep everything on `MASTER_REMIX` tokens. Re-measure after every change; never claim a gain without a
  fresh number.
