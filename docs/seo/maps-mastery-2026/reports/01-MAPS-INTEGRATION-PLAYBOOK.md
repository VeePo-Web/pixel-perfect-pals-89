# Report 01 — Maps Integration Playbook (the deep, Maps-specific spec)

> **What this is.** The complete, decision-grade specification for **how to integrate Google Maps** into "Areas We Serve" pages (and blog posts) for maximum SEO + AI-SEO value at the lowest performance cost — replicated safely across hundreds of community pages.
> Synthesizes `../research/02-map-embed-geo-schema-technical.md` and `../research/03-ai-geo-aeo-local.md`. **Spec only — no code changed.**

---

## 0. The one-paragraph verdict

The embedded map is **UX and location-context**, not a ranking lever (removing it cost ~7% organic sessions in a controlled test, but Google does not treat the widget as a keyword signal). The *ranking and AI-citation* value lives in the **static geo JSON-LD** (`Service`/`LocalBusiness` + `areaServed` + `geo` + `hasMap` + `sameAs`) and in **NAP corroboration** with Google Business Profile. Therefore: render the map as a **static, CWV-safe facade** that lazy-loads a **Place-ID Maps Embed API iframe on interaction**, and put **all the SEO weight in prerendered structured data**. Never let the map break static-render or Core Web Vitals.

---

## 1. The embed decision (final)

**Template default: the facade pattern.** Static WebP placeholder image (crawlable, with descriptive `alt`) + a real `<button>` that injects the iframe on click/tap/keyboard.

**Embed source priority:**
1. **Maps Embed API iframe with `q=place_id:…`** (free, unlimited, $0, documented, ties the embed to the verified GBP entity) — when an API key + Place ID are available.
2. **Keyless `maps.google.com/maps?q={lat},{lng}&output=embed`** — **fallback only** (undocumented/legacy; may break). The current `GoogleMap.tsx` already does this when no key is present — keep it as the no-key path.

**Never the default:** the Maps **JavaScript API** with live markers across every community page — it's the heaviest (TBT/INP), billed per load, and invisible to non-JS crawlers. Reserve it for a single interactive "coverage map" on the national hub if ever needed, behind a facade.

**Why the facade, in numbers:** a live Maps iframe costs ~14% of a perfect Lighthouse score (+0.8s FCP, +0.8s LCP, +320ms TBT, +6.5s TTI). The facade defers ~all of that until a user actually interacts. Across 100+ community pages this is the single biggest CWV decision.

---

## 2. The facade — reference spec

```html
<figure class="map-facade">
  <button type="button" class="map-facade__btn"
          data-embed="https://www.google.com/maps/embed/v1/place?key=API_KEY&q=place_id:CHIJ..."
          aria-label="Load interactive map of our {Community} service area">
    <img src="/maps/{community-slug}-service-area.webp"
         width="800" height="600" loading="lazy" decoding="async"
         alt="Map showing our {service} service area across {Community}, {Region}">
  </button>
</figure>
```
```css
.map-facade { position: relative; aspect-ratio: 4 / 3; margin: 0; } /* reserves space → CLS = 0 */
.map-facade iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.map-facade__btn { display: block; width: 100%; padding: 0; border: 0; cursor: pointer; background: none; }
```
```js
// keyboard + touch + mouse via a single click handler
btn.addEventListener('click', () => {
  const f = document.createElement('iframe');
  f.src = btn.dataset.embed;
  f.loading = 'lazy';
  f.title = btn.getAttribute('aria-label');
  f.allowFullscreen = true;
  btn.replaceWith(f);
});
```

**Craft rules (non-negotiable):**
- `aspect-ratio` reserves the box → **CLS = 0**.
- The trigger is a real `<button>` (focusable, Enter/Space) — **never** `mouseover`-only (breaks touch + a11y).
- The injected iframe gets a descriptive `title` (WCAG; Lighthouse flags missing titles).
- The placeholder is **not** the LCP element on a cold load. If it would be, preload it; otherwise keep it below the hero.
- One facade per page.

**Static placeholder image options (pick per deployment):** a pre-rendered Maps Static API image (keyed), a screenshot, or a lightweight styled SVG/illustration of the coverage area. The `alt` text carries a real geo signal to non-JS crawlers regardless of which you choose.

---

## 3. The geo structured-data graph (where the SEO/AI value lives)

Emit this **statically (prerendered into the HTML)** on every community page. This is the migration of today's `AreasSEOSchema.tsx` from `useEffect` → server HTML.

**Per-community `Service` + town-scoped `areaServed` (primary):**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "{SERVICE_CATEGORY}",
  "name": "{SERVICE_CATEGORY} in {Community}",
  "provider": {
    "@type": "{LOCALBUSINESS_TYPE}",            // e.g. HomeAndConstructionBusiness
    "name": "{BRAND_NAME}",
    "url": "{SITE_URL}",
    "telephone": "{PHONE_E164}",
    "image": "{LOGO_OR_PHOTO_URL}",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "{STREET}", "addressLocality": "{CITY}",
      "addressRegion": "{REGION_CODE}", "postalCode": "{POSTAL}", "addressCountry": "{CA|US}"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": {LAT}, "longitude": {LNG} },
    "hasMap": "https://www.google.com/maps/place/?q=place_id:{PLACE_ID}",
    "sameAs": ["{GBP_MAPS_URL}", "{FACEBOOK}", "{LINKEDIN}", "{INSTAGRAM}"]
  },
  "areaServed": {
    "@type": "City", "name": "{Community}",
    "@id": "{WIKIDATA_URL_OPTIONAL}",
    "containedInPlace": { "@type": "AdministrativeArea", "name": "{Province_or_State}" }
  }
}
```

**Co-emit on the same page (full graph):**
- `LocalBusiness` (the brand entity — NAP, `geo`, `hasMap`, `sameAs`, `priceRange`, `openingHoursSpecification`). **No self-serving `aggregateRating`/`review`.**
- `BreadcrumbList` (Home → Areas We Serve → {Region} → {Community}).
- `FAQPage` (the page's geo-specific Q&A — must match visible text).
- `WebPage` (with `speakable` for the answer-first block, and `dateModified`).

**SAB serving many towns from one base — hybrid `areaServed`:**
```json
"areaServed": [
  { "@type": "City", "name": "{Community}" },
  { "@type": "City", "name": "{Nearest1}" },
  { "@type": "City", "name": "{Nearest2}" },
  { "@type": "GeoCircle",
    "geoMidpoint": { "@type": "GeoCoordinates", "latitude": {BASE_LAT}, "longitude": {BASE_LNG} },
    "geoRadius": "{RADIUS_METRES}" }       // metres — 30 mi = 48280. NOT miles.
]
```

**Hard rules:**
- `geoRadius` is **metres.** (#1 mistake in the wild.)
- NAP in schema matches GBP + footer **character-for-character.**
- Add `@id` (Wikidata/Wikipedia) to `City`/`AdministrativeArea` where available — strengthens entity disambiguation for AI.
- Prefer `Service` + `areaServed` (not a physical `LocalBusiness` address) on towns where the business has **no real branch** — a fake address reads as a manipulation signal.
- `Service`/`areaServed`/`GeoCircle`/`hasMap` produce **no SERP rich result** — they're for *understanding* (Google) and *entity disambiguation* (AI). Include them anyway; that's the AI-citation payoff.

---

## 4. Place ID vs. raw lat/lng (do this)

- Resolve each business's **Place ID** once (Place IDs are stable; from the GBP / Places API / the "share embed" URL) and store it in the per-business config.
- Use the **Place-ID Embed API URL** for the facade iframe and the **`hasMap`/`sameAs` Maps place URL** — both tie the page to the *verified entity*, not just coordinates.
- Raw `q={lat},{lng}` is the keyless-fallback behavior only.

---

## 5. Performance budget for the map at scale

| Metric | Budget (mobile, throttled) | How the facade protects it |
|---|---|---|
| LCP | < 2.5s | Map JS never loads on cold paint; placeholder is small WebP, not LCP |
| INP | < 200ms | Maps script stays off main thread until interaction |
| CLS | < 0.1 (target 0) | `aspect-ratio` reserves the box |
| Lighthouse Perf (mobile) | ≥ 90 | Facade restores ~100% vs ~86% for a live iframe |

- Placeholder image: explicit `width`/`height`, `loading="lazy"`, `decoding="async"`, AVIF/WebP.
- Never preload the Maps script. Preconnect to `maps.googleapis.com` only if a map is reliably interacted with on the page.
- Code-split: legal/contact pages must not ship the map runtime.

---

## 6. Discovery + crawler config (Maps-relevant)

- **Static-render** the page (content + the full JSON-LD graph) — verify with JS disabled.
- **robots.txt:** allow the search/answer bots (`OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Googlebot`, `Bingbot`). Do **not** block them; that's the highest-impact AI-visibility mistake.
- **sitemap.xml:** include every gate-passing community URL with honest `<lastmod>`.
- **Skip** geo/KML sitemaps and `KmlLayer` — deprecated, no ranking value in 2026.

---

## 7. What NOT to do (Maps-specific anti-patterns)

- ❌ Live Maps **JavaScript API** marker on every community page (TBT/INP/cost; non-JS-crawler-invisible).
- ❌ Eager-loaded iframe with no facade (14%+ Lighthouse hit × hundreds of pages).
- ❌ `mouseover`-only map activation (a11y + touch failure).
- ❌ `geoRadius` in **miles**.
- ❌ Marking up a **physical address you don't have** on a town page.
- ❌ Self-serving `aggregateRating`/`review` schema on your own business.
- ❌ Treating the map embed as a ranking trick or stuffing it to "boost" the page.
- ❌ Relying on `useEffect` to inject the map's structured data (invisible to AI crawlers).

---

## 8. Acceptance checklist (Maps integration)

A community page passes Maps integration when ALL are true:
- [ ] Page is **prerendered**: H1 + body + full JSON-LD graph present with JS disabled.
- [ ] Map renders as a **facade**; live iframe loads only on `<button>` activation (keyboard-operable, has `title`).
- [ ] CLS = 0 from the map (`aspect-ratio` box reserved); placeholder is not the LCP element.
- [ ] `Service` + town-scoped `areaServed` + `geo` + **`hasMap`** + **`sameAs`** emitted statically.
- [ ] `geoRadius` (if used) is in **metres**; NAP matches GBP character-for-character.
- [ ] Place-ID embed used when key + Place ID exist; keyless `output=embed` only as fallback.
- [ ] Lighthouse mobile Perf ≥ 90 with the map on the page.
- [ ] Search/answer crawlers allowed in robots.txt; URL in sitemap with honest `lastmod`.
