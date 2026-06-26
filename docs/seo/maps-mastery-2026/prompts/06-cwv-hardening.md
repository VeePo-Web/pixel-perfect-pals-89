# Prompt 06 — Core Web Vitals Hardening (matrix + map at scale)

> **Goal.** Keep every Areas/Blog page ≥90 Lighthouse mobile **with the map on the page**, across hundreds of community pages. The map widget is the main cost; the facade is the main fix.
>
> **Satisfies:** Gate E. **Evidence:** `../research/02` §1,§5.

---

## Budgets (mobile, throttled Slow 4G)
`LCP < 2.5s · INP < 200ms · CLS < 0.1 (target 0) · FCP < 1.8s · TTFB < 800ms` · Lighthouse **Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO 100**.

## Tasks
1. **Map = facade everywhere** (prompt 03). Confirm Maps JS/iframe is absent from the cold-load waterfall; loads only on interaction. A live iframe costs ~14% of a perfect Lighthouse score — never eager.
2. **CLS = 0 from the map:** `aspect-ratio` box reserved; never inject the iframe without reserved space.
3. **LCP protection:** the map placeholder is **not** the LCP element; the hero image/heading is, and the hero is preloaded with `fetchpriority="high"`. Map placeholder is small WebP/AVIF, `loading="lazy"`, `decoding="async"`, explicit `width`/`height`.
4. **INP:** the facade keeps Maps script off the main thread until opt-in. Audit other JS for long tasks on the matrix template; defer non-critical.
5. **Images:** every image explicit `width`/`height`, AVIF/WebP, `srcset`/`sizes`, lazy below fold — so a phone never downloads a desktop-sized image.
6. **Code-split:** legal/contact and other non-area routes do not ship the map runtime.
7. **Preconnect** `maps.googleapis.com` only where a map is reliably interacted with (don't preconnect site-wide).
8. **Measure, don't guess:** Lighthouse on a representative community page + a blog post, before/after.

## Verification (paste evidence)
- Lighthouse mobile on a community page **with the facade present**: Perf ≥ 90, CLS ≈ 0, LCP < 2.5s. Network waterfall shows no Maps JS until the map button is activated.
- `vite build` bundle: matrix route does not pull the Maps JS-API runtime; map runtime not in non-area routes.
