
# SEO World-Class Audit + Blog Reset

Two threads: (1) finish making the SEO surface trade-agnostic and bulletproof for any business / any geography with stacked metadata and real Google Maps integration; (2) collapse the blog system to hub-only and ship the remaining pages as prerendered static HTML.

---

## Part A — SEO Audit Findings (current state)

What the audit turned up — to be fixed in Part B:

1. **Stale trade-branded meta config.** `src/config/template/meta-config.ts` is still 214 lines of hardcoded "Cochrane Tile Masters" titles and descriptions. It also references routes that no longer exist (`/brand-story`, `/services/:slug`, `/pricing`, `/thank-you`, etc.).
2. **Stale residue in `remix-variables.ts`.** Comments still reference "Cochrane Master Builders / 150 sites / cochranetile.ca". `OG_IMAGE` is `""` — meaning every page sends an empty `og:image`.
3. **No sitewide JSON-LD.** `index.html` has no `Organization` or `WebSite` (with `SearchAction`) schema — both are baseline for a world-class SEO surface.
4. **No `sitemap.xml` / no generator.** `public/robots.txt` exists but advertises no `Sitemap:` directive and there is no file to serve. Areas + Blog hub routes are not discoverable.
5. **`MetaTags.tsx` routing logic is stale.** Still routes for deleted pages and has `/thank-you` noindex branch for a page that does not exist.
6. **Google Maps is keyless iframe.** `GoogleMapEmbed.tsx` uses the legacy `maps.google.com/maps?q=…&output=embed` iframe — works without auth but is the lowest tier. We have a Google Maps Platform connector available and a `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` we can use to ship the real Maps JS API with markers.
7. **Areas-side stacking is thin.** Region pages do not emit their own `BreadcrumbList` + `Place` + `ItemList` schema; only Community pages do. The Areas hub only emits `LocalBusiness`.
8. **Blog system is over-built.** A full markdown post pipeline (`react-markdown`, `remark-gfm`, `BlogPost.tsx`, `BlogContent.tsx`, etc.) sits underneath a request that only wants the hub structure live for SEO.
9. **No prerender.** Every route is an SPA shell — social crawlers and AI bots see an empty `<div id="root">` body for the public hubs.

---

## Part B — What I'll change

### 1. Sitewide schema + meta stacking (any business, any geography)

- **`index.html`**: add two JSON-LD blocks driven by tokens — `Organization` (name, url, logo, sameAs, contactPoint) and `WebSite` (url, name, `potentialAction` SearchAction targeting `/blog?q={search_term_string}`). Keep tokens like `{BRAND_NAME}` so they remain trade-agnostic; document that they're swapped per remix.
- **`index.html` head**: also add `og:image`, `og:image:width/height`, `twitter:card=summary_large_image`, `twitter:image`, `theme-color`, and a `<link rel="alternate" hreflang>` block scaffolded for `en-CA` / `en-US` (commented placeholders the remixer fills in).
- **`MetaTags.tsx`**: simplify — drop logic for deleted routes; keep three branches only: `/areas-we-serve/*` (defer to page), `/blog*` (defer to page), default (token-driven brand title + description). Always emit canonical, og:url, og:image, twitter:image stacked together.
- **`meta-config.ts`**: replace the entire file with a small, generic `META_CONFIG` that only carries entries for the live routes (`/`, `/areas-we-serve`, `/blog`). Each entry uses `{BRAND_NAME}` / `{SERVICE_CATEGORY}` tokens. Remove the hardcoded `ORIGIN`; read `MASTER_REMIX.BRAND_URL` instead.
- **`remix-variables.ts`**: scrub the remaining "Cochrane Master Builders / 150 sites / cochranetile.ca" comments and replace with neutral remix guidance. Keep all token defaults intact.

### 2. Areas We Serve — stronger stacking

- **`AreasHub.tsx`**: extend the existing hub schema injection from one block to four — `LocalBusiness`, `BreadcrumbList`, `ItemList` (the regions), and `WebPage`/`CollectionPage`. All driven by `REGIONS` + `COMMUNITIES` arrays (no hardcoding).
- **`RegionPage.tsx`**: add the region-tier JSON-LD it's currently missing — `BreadcrumbList` (3 levels), `Place` (the region with adjacent regions as `containedInPlace`), `ItemList` of communities, and `LocalBusiness` with `areaServed` = the region.
- **`AreasSEOSchema.tsx`** (community tier): already strong; add `geo` to the `LocalBusiness` block (currently only on `Service.areaServed`) and add `aggregateRating` only when `MASTER_REMIX.GOOGLE_REVIEW_URL` is set (so it never ships fake ratings).

### 3. Google Maps Platform integration (replace the keyless iframe)

- Add `src/components/areas/GoogleMap.tsx`: loads the Maps JS API asynchronously via the browser key (`VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`) with `loading=async&callback=__initMaps&channel={tracking}`. Renders a `google.maps.Map` with a single `google.maps.Marker` at the community's coordinates. No `mapId`, no AdvancedMarkerElement (per connector rules).
- Falls back gracefully to the existing keyless iframe when the env var is absent (so the template still renders for remixers who haven't set up Maps yet).
- Replace usages of `GoogleMapEmbed` on Community pages with the new `GoogleMap`. Keep `GoogleMapEmbed.tsx` as the fallback path.
- No server-side Maps calls in this pass — geocoding can be added later if needed.

### 4. Blog reset → hub-only, static HTML

- **Delete all blog posts.** `src/lib/blogData.ts` → keep `BlogPost` interface + helpers (`getAllPosts`, `getPostsByHubSlug`, etc.) but set `blogPosts: BlogPost[] = []`. No example posts.
- **Delete post-only files**:
  - `src/pages/BlogPost.tsx`
  - `src/components/blog/BlogContent.tsx`, `BlogHero.tsx`, `BlogSchema.tsx`, `BlogFAQ.tsx`, `BlogCTA.tsx`, `MidPostCTA.tsx`, `TableOfContents.tsx`, `ScrollProgressBar.tsx`, `SocialShare.tsx`, `MobileStickyCTA.tsx`, `EditorialImage.tsx`, `PullQuote.tsx`, `AuthorCard.tsx`, `RelatedPosts.tsx`
  - Keep: `BlogCard.tsx`, `HubNavigation.tsx` (hub-level only)
- **Uninstall `react-markdown` + `remark-gfm`** (no longer needed).
- **`App.tsx`**: keep `/blog` (BlogHub) and `/blog/:hubSlug` (BlogHubPage); remove the `BlogPost` lazy import. `BlogHubPage` becomes hub-only — if the slug isn't a hub, redirect to `/blog`.
- **`BlogHub.tsx`** + **`BlogHubPage.tsx`**: render purely from `hubRegistry` (hub directory cards, pillar/spoke counts read as zero until posts are added, with an "editorial in progress" empty state). All schema (CollectionPage + Breadcrumb + ItemList of hubs) stays.
- **Prerender to static HTML.** Add `vite-plugin-prerender` (or `vite-react-ssg` — final choice during build; `vite-plugin-prerender` is the lighter touch). Configure it to crawl: `/`, `/areas-we-serve`, every region + community route (generated from `communities.ts`), `/blog`, and every hub route (generated from `hubRegistry`). Output one `.html` per route under `dist/` so first paint is HTML — no JS required for crawlers or first paint.

### 5. Sitemap + robots

- Add `scripts/generate-sitemap.ts` wired to `predev` / `prebuild`. Entries pulled from `REGIONS`, `COMMUNITIES`, and `hubRegistry` so the sitemap stays in sync automatically. `BASE_URL` reads from `MASTER_REMIX.BRAND_URL`; falls back to empty + TODO comment when unset.
- Append `Sitemap: {BASE_URL}/sitemap.xml` to `public/robots.txt` (only emitted when `BRAND_URL` is set; otherwise commented).

### 6. Cleanup

- Remove `setPageMeta` from pages where `Helmet` now owns head (Areas pages still use it — keep). Consolidate so each route owns its canonical + og:url once (not both via index.html and Helmet).
- Confirm zero remaining "Cochrane", "Calgary", "Alberta", "drywall", "tile" string literals in `src/` via final `rg` sweep.

---

## Technical Notes

- **Why prerender, not full SSR.** The app is a Vite React SPA on Lovable; SSR would force a runtime server. Prerendering at build time gives static HTML for every known route — fast LCP, full crawler coverage — while keeping the runtime as a static bundle. Dynamic routes (community pages) are enumerable from `communities.ts`, so prerender can walk them all.
- **Maps JS API loading rule.** Per the connector docs: `loading=async` requires a global `callback`. I'll set `window.__initMaps` once and have each `<GoogleMap>` either wait for it or call `google.maps.importLibrary` when already loaded. No `mapId`. Browser key only — no gateway calls in this pass.
- **Schema stacking philosophy.** Each route ships ≥ 3 JSON-LD blocks: a primary entity (`Organization` / `LocalBusiness` / `Service`), a `BreadcrumbList`, and a navigation/listing entity (`WebPage`, `CollectionPage`, `ItemList`). FAQPage only when FAQs exist. No fake `aggregateRating`.
- **Tokens stay visible.** Every default string remains `{BRAND_NAME}` / `{SERVICE}` / `{SERVICE_CATEGORY}` so a future remix author can see what to swap. Nothing geography-specific is hardcoded.
- **Acceptance.** After this pass: `rg -i "cochrane|drywall|tile masters|alberta|calgary" src/` returns zero hits; `dist/blog/index.html` contains the editorial copy in raw HTML; every community route has a JSON-LD `LocalBusiness` with `geo`; `sitemap.xml` lists every region + community + hub; and the Maps tile on a community page is the real Maps JS API when `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` is set.
