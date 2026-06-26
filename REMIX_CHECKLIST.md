# Remix Checklist

World-class Local-SEO substrate. Edit in this order — every page
rehydrates from these files. No component edits required for a remix.

## 1. Brand + service identity

`src/config/template/remix-variables.ts` → `MASTER_REMIX`

- `BRAND_NAME`, `BRAND_URL` (no trailing slash), `PHONE`
- `SERVICE`, `SERVICE_PLURAL`, `SERVICE_VERB`, `SERVICE_CATEGORY`
- `SERVICE_REGION_TAGLINE`, `COVERAGE_BLURB`
- `TRUST_STATS_LABELS`, `SUB_SERVICES`, `PRICE_BANDS`, `FAQS`
- `OG_IMAGE` (1200×630), `HERO_IMAGE`
- `AUTHORS` — at least one entry before publishing a blog post
- `BRAND_SOCIAL` — fed into Organization `sameAs`

## 2. Geography (Areas We Serve)

`src/data/communities.ts` → `REGIONS`, `COMMUNITIES`

- One `Region` per cluster of communities (state, province, metro).
- One `Community` per city/neighbourhood; include real `streets`,
  `landmarks`, `coordinates`, and `nearestCommunities`.
- Tier 1 = priority service area; Tier 2/3 = secondary.

## 3. Editorial topic clusters (Blog Hubs)

`src/lib/hubRegistry.ts` → copy from `EXAMPLE_HUB` into `hubRegistry`

- One hub per topic cluster.
- `linkedRegions: ["region-slug", ...]` powers the bi-directional
  Areas ↔ Blog cross-link rails (no extra wiring).

## 4. (Optional) Blog posts

`src/lib/blogData.ts` → push `BlogPost` objects into `blogPosts`

- One pillar + 4–8 spokes per hub.
- Wrap the post page with `<BlogPostingSchema post={post} hub={hub} />`
  to emit stitched BlogPosting + BreadcrumbList + FAQPage JSON-LD
  (with `speakable` selectors).
- Render `<AuthorBio author={post.author} reviewedAt={post.modifiedAt} />`
  for the visible E-E-A-T surface.

## 5. Sitemap + robots

Auto-generated on `dev` and `build` from the three data files above
(`predev` / `prebuild` → `scripts/generate-sitemap.ts`). No manual
sitemap edits.

## What ships SEO-correct for free

- Stitched JSON-LD graph (`Organization` ↔ `WebSite` ↔ `WebPage`
  ↔ `Service` / `LocalBusiness` / `ItemList` / `FAQPage`) via
  `src/lib/seoGraph.ts`.
- `speakable` FAQ selectors on every Community page.
- 4-level breadcrumbs (Home → Areas → Region → Community).
- `ItemList` schema on the Areas hub + every Region page.
- Per-route Helmet metadata: title, description, canonical, og:*.
- Sitewide `Organization` + `WebSite` JSON-LD in `index.html`.
- Bi-directional Areas ↔ Blog topical linking via `Hub.linkedRegions`.
- `Place` / `AdministrativeArea` graph nodes for every region with
  `containsPlace` edges to every served community.
- Cross-surface "Guides for {Region}" / "Guides for {Community}" rails
  rendered automatically when a `BlogPost.about` declares geo binding.
- "Serving {Community}" trust card rendered on every geo-bound post.
- Sitemap entries carry `<lastmod>` for posts; auto-regenerated on
  `dev` and `build`.
- Google Maps JS API used when
  `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` is present;
  keyless iframe fallback otherwise (no broken map in preview).

## Programmatic variance contract (anti-doorway)

Use `pickVariant(slug, [...])` from `src/lib/contentVariance.ts` to
rotate intro / FAQ phrasing across many community or hub pages from
one template. Same slug always returns the same variant — stable for
caching and link integrity, varied enough to avoid doorway-page
flags when you ship 100+ locations.

```ts
import { pickVariant, fill } from "@/lib/contentVariance";

const intros = [
  "{brand} has served {community} for {years} years.",
  "Homeowners across {community} call {brand} for {service}.",
  "{community} sits at the heart of where {brand} works.",
];

const copy = fill(pickVariant(community.slug, intros), {
  brand: BRAND_NAME, community: community.name, years: 12, service: SERVICE,
});
```

## What requires a real domain

- `BRAND_URL` populates `BASE_URL` in `sitemap.xml` and every absolute
  `@id` in JSON-LD. Set it before going live.
- `OG_IMAGE` is needed for accurate LinkedIn / Slack / Facebook previews.