# Research 04 — Maps Integration + Geo Structured Data: Technical Implementation

> Deep-research findings brief. Sources 2025–2026. Code-level guidance for performance (Core Web Vitals) + SEO/AI-SEO at scale.

Two competing pressures govern location-page engineering: an interactive map is a UX/trust signal but a Core Web Vitals (CWV) liability, while geo structured data is invisible to users but the primary machine-readable signal for Google and AI crawlers. The right pattern **decouples them — static-first map, statically-rendered JSON-LD graph.**

## 1. Map embed options — performance vs SEO

Third-party embeds routinely exceed 100KB of JS (up to 2MB) and hurt all three CWV metrics: render-blocking delays **LCP**, main-thread execution inflates **INP**, undimensioned iframes cause **CLS** (web.dev).

| Option | Weight | CWV impact | SEO value |
|---|---|---|---|
| **Maps JavaScript API + marker** | Heaviest (SDK + tiles, 100KB–1MB+ JS) | Worst LCP/INP | No direct ranking benefit |
| **Keyless iframe** (`maps.google.com/maps?q=...&output=embed`) | 1 request, spawns many sub-requests | Slow (slowest loading) | Minimal |
| **Maps Embed API iframe** (keyed) | Same iframe model, free + unlimited, needs API key | Slow unless deferred | Minimal |
| **Static Maps API image** | Single image request, ~0 JS | Best — behaves like a normal image | Strong (real `<img>` + geo alt) |

**Recommendation: facade / click-to-load.** Render a static map image (or screenshot) as the default; load the interactive iframe only on user click. This saves ~220KB on initial load (web.dev). Native `loading="lazy"` on an iframe is **insufficient alone** — prefer IntersectionObserver-gated injection or a true facade:

```html
<!-- Facade: static image is the LCP-safe default -->
<button class="map-facade" data-map-src="https://www.google.com/maps/embed/v1/place?key=KEY&q={CITY}+{REGION}">
  <img src="/maps/{city}-static.webp" width="640" height="360"
       alt="Map of our {SERVICE} service area in {CITY}, {REGION}" loading="lazy" decoding="async">
  <span>Load interactive map</span>
</button>
<script>
document.querySelector('.map-facade').addEventListener('click', e => {
  const f = document.createElement('iframe');
  f.src = e.currentTarget.dataset.mapSrc;
  f.loading = 'lazy'; f.width = 640; f.height = 360; f.style.border = 0;
  e.currentTarget.replaceWith(f);
}, { once: true });
</script>
```

Always set explicit `width`/`height` on image and iframe to prevent CLS.

> **Codebase note:** the current `GoogleMap.tsx` already does a keyless-iframe fallback with `loading="lazy"` + `<noscript>` — solid. The upgrade is a **facade/static-image default** so the iframe never costs initial load, plus a static-map LCP-safe poster.

## 2. Geo structured data for service-area pages

Google's `LocalBusiness` docs require `name` + `address`, recommend `geo` (GeoCoordinates ≥5 decimals), `telephone`, `url`, `openingHoursSpecification`. For a city the business has **no address** in, you cannot fabricate `streetAddress` — use the **real HQ address** plus `areaServed` to declare coverage.

- **`areaServed`** accepts `City`, `GeoShape`, `GeoCircle`, `AdministrativeArea`, `containedInPlace`. Use `GeoCircle` (center + `geoRadius` in **meters**) for a service radius, `GeoShape` (polygon) for irregular boundaries, named `City` for simplicity.
- **`serviceArea`** (newer) describes the precise shape you physically serve; `areaServed` can be broader. Both can coexist.
- **`hasMap`** — still valid; point at the Google Maps URL, coordinates matching GBP.

**Entity-linking graph (`@graph` + `@id`):** link `Organization` → `LocalBusiness` → `Service` → `WebPage` → `BreadcrumbList` → `FAQPage` via stable `@id` fragments so crawlers and LLMs build one coherent entity; `sameAs`/Wikidata for external disambiguation.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://ex.com/#org", "name": "{BRAND_NAME}",
      "url": "https://ex.com", "sameAs": ["https://www.wikidata.org/entity/Q…","https://linkedin.com/company/…"] },
    { "@type": "HomeAndConstructionBusiness", "@id": "https://ex.com/#localbusiness",
      "parentOrganization": { "@id": "https://ex.com/#org" },
      "name": "{BRAND_NAME}", "telephone": "+10005550100",
      "address": { "@type": "PostalAddress", "streetAddress": "123 Main St",
        "addressLocality": "{HQ_CITY}", "addressRegion": "{REGION}",
        "postalCode": "[Postal]", "addressCountry": "[Country]" },
      "geo": { "@type": "GeoCoordinates", "latitude": "[lat]", "longitude": "[lng]" },
      "hasMap": "https://maps.google.com/?cid=…",
      "areaServed": { "@type": "GeoCircle",
        "geoMidpoint": { "@type": "GeoCoordinates", "latitude": "[lat]", "longitude": "[lng]" },
        "geoRadius": "50000" } },
    { "@type": "Service", "@id": "https://ex.com/{city}/#service",
      "name": "{SERVICE} in {CITY}",
      "provider": { "@id": "https://ex.com/#localbusiness" },
      "areaServed": { "@type": "City", "name": "{CITY}" } },
    { "@type": "WebPage", "@id": "https://ex.com/{city}/#webpage",
      "url": "https://ex.com/{city}/", "about": { "@id": "https://ex.com/{city}/#service" },
      "breadcrumb": { "@id": "https://ex.com/{city}/#breadcrumb" } },
    { "@type": "BreadcrumbList", "@id": "https://ex.com/{city}/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ex.com/" },
        { "@type": "ListItem", "position": 2, "name": "{CITY}", "item": "https://ex.com/{city}/" } ] },
    { "@type": "FAQPage", "@id": "https://ex.com/{city}/#faq",
      "mainEntity": [ { "@type": "Question", "name": "Do you need a permit for {SERVICE} in {CITY}?",
        "acceptedAnswer": { "@type": "Answer", "text": "…40–60 word answer…" } } ] }
  ]
}
```

> **Codebase note:** `seoGraph.ts` already builds an `@id`-linked graph (LocalBusiness + Service + FAQ + Breadcrumb + speakable). The upgrades: add `areaServed` as `GeoCircle`/`City`, add `hasMap`, add `Organization` + `sameAs`, and **render the graph into static HTML** (see §3) instead of `useEffect` injection.

## 3. Static rendering / prerender for React SPAs

AI crawlers (GPTBot, ClaudeBot, PerplexityBot) and Google's first pass largely **do not execute JS** — they see only the initial HTML response. JSON-LD injected via `useEffect`/Helmet at runtime is therefore a weak-to-invisible signal. Bake content + JSON-LD into static HTML at build time:

- **vite-react-ssg / vite-plugin-ssr** — render each location route to static HTML with its `@graph` embedded.
- **Puppeteer / react-snap / Prerender.io** — crawl routes post-build and emit HTML snapshots.

Verify by fetching a built URL with JS disabled and confirming the H1, body copy, and `<script type="application/ld+json">` are present.

## 4. KML / geositemaps / store-locator schema in 2026

Google **no longer supports the `<geo>` sitemap extension**; geositemap/KML files are legacy. Modern best practice is **schema.org markup over KML** for store-locator/location data. `hasMap` and `geo` remain valid and should match GBP coordinates exactly. There is no dedicated "driving-directions" rich result — directions live as a Maps URL in `hasMap`.

## 5. NAP rendering + click-to-call

Render NAP as **real, crawlable HTML text** (not in an image), identical to GBP and JSON-LD. Semantic `<address>` + `tel:` link with E.164 number:

```html
<address>{BRAND_NAME}, 123 Main St, {HQ_CITY}, {REGION} [Postal]
  <a href="tel:+10005550100">(000) 555-0100</a></address>
```

Prefer **JSON-LD over inline Microdata** (Google's recommended format; don't duplicate the same entity in both).

## 6. Image SEO for location heroes

- **Alt text** = natural geo signal: "{SERVICE} crew in {CITY}, {REGION}" — descriptive, <125 chars.
- **Explicit `width`/`height`** to prevent CLS; **AVIF/WebP** + `srcset`/`sizes`.
- Hero (LCP element): `fetchpriority="high"`, **not** lazy. Static maps below fold: `loading="lazy" decoding="async"`.
- Descriptive filenames: `{service-slug}-{city-slug}.webp`.

## 7. Sitemaps + image sitemap + hreflang at scale (bilingual Canada)

- Auto-generate `sitemap.xml` at build time covering all static + matrix routes, accurate `<lastmod>`.
- **Image sitemap** entries (`<image:image>`) for location heroes aid discovery.
- **Hreflang at scale: use the XML-sitemap method**, not per-page tags. For en/fr Canada: each `<url>` lists `<xhtml:link>` for `en-CA`, `fr-CA`, **and one `x-default`.** Links must be **bidirectional + self-referencing**; **canonical must agree with hreflang.** ISO 639-1 language + 3166-1 alpha-2 region codes.

## Sources
- https://web.dev/articles/embed-best-practices
- https://www.corewebvitals.io/pagespeed/google-maps-100-percent-pagespeed
- https://developers.google.com/maps/documentation/embed/get-started
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://schema.org/areaServed · https://schema.org/GeoCircle · https://schema.org/LocalBusiness
- https://authoritynw.com/blog/service-area-businesses-gmb-schema-setup/
- https://momenticmarketing.com/blog/id-schema-for-seo-llms-knowledge-graphs
- https://dev.to/lukefryer4/optimizing-react-spas-for-ai-web-scrapers-gptbot-claudebot-3mpb
- https://dev.to/lukefryer4/json-ld-structured-data-for-react-apps-complete-implementation-guide-34n1
- https://lockedownseo.com/local-seo-geo-sitemap-generator/
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://backlinko.com/hreflang-tag
