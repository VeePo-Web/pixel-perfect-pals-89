# PROMPT 02 — Maps Integration (CWV-Safe) + Geo Structured Data

> Fire after Prompts 00–01. Paste this whole file to the build agent.
> This prompt makes the map fast and the geography machine-readable — the two things that
> actually matter about "maps integration" for SEO + AI-SEO.

---

## ROLE

You are the **Maps Integration + Geo-Schema specialist** (Local SEO Architect × performance
engineer). Frontend only. Animate/load nothing on the critical path that isn't needed. Verify
with evidence. **Core truth you operate from:** *embedding a Google Map is not a ranking
factor* (Google ended embed-to-address credit in June 2018). The map is **UX/trust/conversion**;
the SEO value lives in the **content + `LocalBusiness`/`Service` schema** around it, and in
keeping the embed **off the critical path**.

## ONE-SENTENCE OBJECTIVE

Convert the in-page map embed into a **static-first facade** (zero map JS on initial load) and
enrich the `@graph` with the geo signals Google + AI engines actually read — `areaServed`
(`GeoCircle`/`City`), `hasMap`, and an `Organization` node with `sameAs`.

## WHY / CURRENT STATE

- `src/components/areas/GoogleMap.tsx:1–135` loads the **Maps JS API** (when
  `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` is set) or a **keyless iframe** fallback,
  *inline* in the page (`CommunityPage.tsx:349`), with `loading="async"` + a `<noscript>` iframe
  (`:122`). Solid, but the embed sits on the critical path — a CWV liability (LCP/INP/CLS).
  `GoogleMapEmbed.tsx` is a keyless iframe-only variant.
- `src/lib/seoGraph.ts` builds a strong `@id`-linked graph (`localBusinessNode():129`,
  `serviceNode():89` with `areaServed`, `faqPageNode():171`, `breadcrumbNode():29`,
  `administrativeAreaNode():220`). Sitewide `Organization`+`WebSite` is in `index.html:37–66`.
  **Missing:** `areaServed` as a service-radius `GeoCircle`, `hasMap`, and `sameAs` on the
  Organization entity.

---

## THE WORK

### Part A — The static-first map facade (performance)

1. Replace the inline interactive embed with a **facade / click-to-load** pattern. Default render
   is a **Static Maps image** (or a pre-captured screenshot) behaving like a normal `<img>`
   (~0 JS); the interactive iframe/JS map loads **only on user click** (saves ~220KB on initial
   load). Keep the `<noscript>` iframe fallback for no-JS crawlers/users.
   ```html
   <button class="map-facade" data-map-src="https://www.google.com/maps/embed/v1/place?key=KEY&q={CITY}+{REGION}">
     <img src="/maps/{region}-{city}-static.webp" width="640" height="360"
          alt="Map of our {SERVICE} service area in {City}, {Region}"
          loading="lazy" decoding="async">
     <span>Load interactive map</span>
   </button>
   <!-- on click: inject the iframe once -->
   ```
   - **Explicit `width`/`height`** on image + iframe (prevent CLS). Native `loading="lazy"` on an
     iframe is *insufficient alone* — use the facade (or IntersectionObserver-gated injection).
   - **Keep the existing dual-mode logic** (JS API vs keyless iframe) as the *post-click* loader;
     only the **default** changes to a static image. The static image is the LCP-safe default; the
     hero photo, not the map, should remain the page's LCP element.
2. **Generate the static-map posters at build time** (one per published city) from the
   coordinates already in `communities.ts` — either via the Static Maps API (keyed) or a cached
   screenshot pipeline. Filenames geo-descriptive: `/maps/{region}-{city}-static.webp`.
   Below-the-fold maps stay `loading="lazy" decoding="async"`.
3. Refactor `GoogleMap.tsx` so the facade is the component's default and the interactive path is
   a lazy upgrade. `GoogleMapEmbed.tsx` can become the post-click iframe. Do **not** ship the
   Maps JS API on initial load anywhere.

### Part B — Geo structured data (the machine-readable signal)

4. **Add `areaServed` as a service radius.** In `serviceNode()` / `localBusinessNode()`
   (`seoGraph.ts:89,129`) emit, per page geography:
   - City pages: `areaServed: { "@type": "City", "name": "{City}" }` (simple, exact).
   - Business-level: a `GeoCircle` from `GEO_CONFIG.base` + `serviceRadiusKm`:
     ```json
     "areaServed": { "@type": "GeoCircle",
       "geoMidpoint": { "@type": "GeoCoordinates", "latitude": {base.lat}, "longitude": {base.lng} },
       "geoRadius": "{serviceRadiusKm * 1000}" }    // meters
     ```
     Use a `GeoShape` polygon only for genuinely irregular boundaries. `areaServed` (broad) and
     `serviceArea` (precise) may coexist.
5. **Add `hasMap`** to `localBusinessNode()` → the business's Google Maps URL (Place ID/CID),
   with `geo` coordinates **matching GBP exactly** (≥5 decimals).
6. **Add the `Organization` node + `sameAs`.** Ensure the graph links
   `Organization` → `LocalBusiness` → `Service` → `WebPage` → `BreadcrumbList` → `FAQPage` via
   stable `@id` fragments (the builders already do most of this). Add `sameAs` to the
   Organization: GBP/Maps URL, `MASTER_REMIX.PARENT_BRAND_URL`, Wikidata (if any), and social
   profiles — this is **entity reinforcement** that reduces ambiguity for Google's Knowledge
   Graph **and** AI engines. Reference shape in [`../research/04-maps-embed-geo-schema-technical.md`](../research/04-maps-embed-geo-schema-technical.md).
7. **SAB rule:** for a city the business has **no address** in, do **not** fabricate
   `streetAddress`. Use the real HQ `address` + `areaServed` (City/GeoCircle) to declare
   coverage. Render NAP as **real crawlable HTML** (`<address>` + `tel:` E.164), identical to the
   JSON-LD and GBP. Prefer JSON-LD over inline Microdata; don't duplicate the same entity in both.
8. **Static-render the graph** (Prompt 00 already moved emission into JSX) — confirm the enriched
   nodes ship in the static HTML, not `useEffect`.

### Part C — Legacy/no-op cleanups (do not waste effort here)

9. **Do not** add KML, `<geo>` geo-sitemaps, or what3words — Google dropped the `<geo>` sitemap
   extension; schema.org markup replaces KML. There is no "driving-directions" rich result —
   directions live as the Maps URL in `hasMap`. A driving-directions link + store-locator are
   conversion aids only.

---

## VERIFICATION GATE (paste evidence before claiming done)

1. **Performance:** a community page loads with **zero Maps JS** until the facade is clicked.
   Confirm in the Network tab (no `maps.googleapis.com` request on initial load) and that the map
   image has explicit dimensions (no CLS). Lighthouse mobile Perf unchanged or improved vs Prompt 00.
2. **Schema:** the page's `@graph` passes Google's **Rich Results Test** / Schema validator with
   no errors; `areaServed` resolves to the page's city/`GeoCircle`; `hasMap` + `geo` match GBP
   coordinates; `Organization.sameAs` is present and absolute-URL-correct.
3. **Static-render proof:** fetch the built URL with JS disabled → the enriched JSON-LD
   (incl. `areaServed`, `hasMap`, `sameAs`) is in the raw HTML.
4. `npx tsc --noEmit` + `npx vite build` green.

## GUARDRAILS

- The map is **not** a ranking trick — don't reintroduce it to the critical path "for SEO."
- Don't fabricate an address for a no-address city; `areaServed` declares coverage.
- `geo`/`hasMap` coordinates must match GBP exactly — mismatches are a trust hit.
- Keep `seoGraph.ts` `@id` linking intact; you're **adding** nodes/fields, not restructuring.
- Stay scoped: page body/E-E-A-T/freshness = Prompt 03; bilingual = Prompt 04.
