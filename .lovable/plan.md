
# Worldclass SEO Plan — Blog Hub + Areas We Serve, fused

Goal: ship a remix-ready substrate where the Blog (topic clusters / pillars) and Areas We Serve (geo clusters / pillars) form a single interlinked entity graph following Victorious-SEO methodology. Zero business-specific content; every hardcoded string is a token.

## 1. Audit findings to address

**Blog (currently)**
- `hubRegistry.ts` is blank with an `EXAMPLE_HUB` — good baseline, but no schema contract enforces pillar/spoke shape.
- `BlogHub.tsx` and `BlogHubPage.tsx` render empty states but don't yet emit `Blog` / `CollectionPage` / `ItemList` JSON-LD when empty (Victorious requires schema even on empty hubs so structure is discoverable on day one).
- No `BlogPosting` content surface remains; the dormant `BlogPostingSchema.tsx` exists but isn't wired to a route.
- No author E-E-A-T surface in the hub view (Victorious weights author entities heavily).
- No internal-link bridge from blog cluster → served region (one-way only today).

**Areas We Serve (currently)**
- Hub/Region/Community emit `Service`, `LocalBusiness`, `ItemList`, `FAQPage` via `seoGraph.ts` — solid.
- Missing: `Place` / `AdministrativeArea` nodes for regions so Google can tie communities to a parent geo entity.
- `GoogleMapEmbed` still uses keyless iframe; not yet on Maps JS API key.
- No "nearby communities" silo links on community pages (Victorious internal-link depth rule: every leaf ≥3 contextual sibling links).
- No reviews/Aggregate rating slot (token-driven, optional render).

**Cross-cutting**
- No canonical contract: blog and areas both rely on `window.location` rather than a single `buildCanonical(path)` helper using `BRAND.siteUrl`.
- Sitemap covers both surfaces, but doesn't emit `<lastmod>` from content timestamps.
- No `hreflang` strategy for the planned Canada + USA split.

## 2. Victorious-SEO doctrine applied

Victorious's playbook in one page:
1. **Pillar + cluster topology** — one authoritative pillar per intent; spokes link up to pillar and laterally to siblings.
2. **Entity graph stitching** — every page is a node with a stable `@id`; nodes reference each other via `sameAs` / `isPartOf` / `about` / `mentions`.
3. **E-E-A-T surfaces** — visible author, credentials, updated date, organization trust signals on every indexable page.
4. **Intent-matched on-page** — H1 = primary intent, H2s = PAA-style questions, FAQ with `speakable`.
5. **Internal-link depth** — every leaf reachable within 3 clicks from root; ≥3 contextual outbound contextual links per leaf.
6. **Programmatic scale with guardrails** — templated pages must vary intro/FAQ/local proof to avoid doorway-page penalty.
7. **Freshness signal** — `dateModified` on schema, visible "Updated" stamp, sitemap `<lastmod>`.

## 3. The fused topology

```text
                ┌────────────── Organization (sitewide @id) ──────────────┐
                │                                                          │
        Areas We Serve hub                                          Blog hub
         (Service area pillar)                                  (Editorial pillar)
              │                                                          │
       ┌──────┴──────┐                                          ┌────────┴────────┐
   Region pages   Region pages                              Topic Hub        Topic Hub
   (Place / AdminArea)                                  (CollectionPage)  (CollectionPage)
        │                                                       │
   Community pages  ←─────── linked via Hub.linkedRegions ──→  Blog posts
   (LocalBusiness + FAQPage + speakable)                       (BlogPosting + Author + speakable FAQ)
```

Bridge rules:
- Each `Hub` declares `linkedRegions: string[]` AND `linkedCommunities: string[]` (new).
- Each `Region` exposes a "Field notes for {Region}" rail pulling posts whose hub links it.
- Each `Community` exposes "Guides for {Community}" rail (≤3 posts) and "Nearby communities" rail (3 siblings).
- Each `BlogPost` declares `about: { regionSlug?, communitySlug? }` → renders "Serving {Community}" trust block linking back.

## 4. Implementation steps

### A. Schema + tokens (foundation)
1. Extend `remix-variables.ts`: add `BRAND.siteUrl`, `BRAND.defaultLocale`, `BRAND.alternateLocales[]`, `BRAND.reviewAggregate?` (tokenised, optional).
2. Add `src/lib/canonical.ts` exporting `buildCanonical(path)` + `buildAlternates(path)` (hreflang ready for `en-CA` / `en-US`).
3. Extend `seoGraph.ts` with: `buildPlaceNode(region)`, `buildAdministrativeAreaNode(region)`, `buildBlogNode()`, `buildCollectionPageNode(hub)`, `buildBlogPostingNode(post)`, `buildPersonNode(author)`, `buildAggregateRatingNode()`.
4. Enforce stable `@id` anchors: `/{path}#webpage`, `/areas-we-serve/{region}#place`, `/blog/{hub}#collection`, `/blog/{hub}/{post}#article`.

### B. Blog hub upgrade (still blank-by-default)
5. Tighten `Hub` type: require `pillarIntent`, `clusterIntent`, `linkedRegions`, `linkedCommunities`, `author`, `updatedAt`, `posts: Post[]`.
6. Tighten `Post` type: require `author`, `updatedAt`, `publishedAt`, `wordCount`, `faqs`, `about` (geo binding), `tldr`, `outline` (H2 list).
7. Wire `BlogPub` route back: `/blog/:hubSlug/:postSlug` resolved by `BlogHubPage` when slug matches a post; emit `BlogPostingSchema` + `AuthorBio` + speakable FAQ.
8. Even when blank, emit `Blog` + `CollectionPage` + `BreadcrumbList` JSON-LD using tokens so structure indexes from day one.
9. Add "Updated {date}" stamp + author byline component to hub and post layouts (hidden when token empty, never broken).

### C. Areas We Serve upgrade
10. Region page: emit `Place` + `AdministrativeArea` nodes alongside `Service`; add `containsPlace` edges to each community.
11. Community page: emit `LocalBusiness` with `areaServed: Place(parent region)`, `geo` (lat/lng tokens), optional `aggregateRating`.
12. Add `NearbyCommunities` rail (3 siblings by alpha or distance token) — satisfies internal-link depth.
13. Add `GuidesForCommunity` rail pulling posts whose `about.communitySlug` matches.
14. Replace `GoogleMapEmbed` with Maps JS API component using `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`; static-fallback `<noscript>` iframe for crawlers.

### D. Cross-surface bridges
15. `RegionPage` "From the Field Notes" rail (already exists) → confirm pulls via `hub.linkedRegions`.
16. New `BlogHubPage` "Service areas covered" rail → reverse lookup.
17. New `BlogPost` "Serving {Community}" trust card → forward link to community page.
18. Breadcrumb consistency: blog posts breadcrumb up to topic hub → blog → home; community pages breadcrumb up to region → areas hub → home.

### E. Freshness + sitemap
19. Sitemap generator: emit `<lastmod>` from `post.updatedAt` / `community.updatedAt` tokens; default to build time when absent.
20. Add `<xhtml:link rel="alternate" hreflang>` entries when `BRAND.alternateLocales` populated.
21. Robots: keep `Allow: /`; add explicit `Sitemap:` line only once `BRAND.siteUrl` is set (already handled by current script).

### F. Programmatic guardrails (anti-doorway)
22. Add `src/lib/contentVariance.ts`: deterministic per-slug picker selecting 1-of-N intro variants and 1-of-N FAQ variants from token arrays. Prevents identical templated copy across 1000+ communities.
23. Document the variance contract in `REMIX_CHECKLIST.md`.

### G. Author + E-E-A-T
24. Render `AuthorBio` on every post; emit `Person` JSON-LD with `sameAs` from `AUTHORS[].profiles`.
25. Add `reviewedBy` token slot on community/region pages for expert-review trust signal.

### H. Verification
26. Run `bun seo:sitemap` and inspect output.
27. Run typecheck.
28. Trigger SEO scan after merge so the SEO panel reflects the new substrate.

## 5. Technical notes

- All new code stays trade-agnostic: every visible string flows through `MASTER_REMIX` tokens or per-entity data (`Hub`, `Region`, `Community`, `Post`, `Author`).
- No new runtime deps. Maps JS API loaded via `@googlemaps/js-api-loader` only if not already present (check first).
- `BlogPost` route is reintroduced under the existing `/blog/:hubSlug/:postSlug` pattern — no router restructure.
- Schema emitted via `react-helmet-async` so per-route nodes deduplicate against the sitewide Organization/WebSite anchors in `index.html`.

## 6. Out of scope (call out explicitly)

- No content authored. Hubs/posts/regions/communities remain blank scaffolds.
- No styling changes beyond minimal author byline + rail layouts inheriting existing tokens.
- No backend / Lovable Cloud work.
- No publishing or domain configuration.

## 7. Deliverable order

1. Foundation (A) — tokens, canonical helper, schema builders.
2. Blog upgrade (B).
3. Areas upgrade (C).
4. Bridges (D).
5. Sitemap + freshness (E).
6. Variance + E-E-A-T (F, G).
7. Verify + trigger SEO scan (H).
