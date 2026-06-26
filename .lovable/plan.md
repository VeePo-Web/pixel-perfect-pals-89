
## Goal

Leave the project shipping zero business-specific content while the Blog Hub and Areas We Serve engines together form a single, Victorious-SEO-grade topical authority machine. After this plan a remix author edits one config file (`remix-variables.ts`) plus two data files (`communities.ts`, `hubRegistry.ts`) and is live.

## 1. Audit findings (current state)

**Blog (hub-only, posts deleted ✅)**
- `blogData.ts` → `blogPosts = []` ✅ blank.
- `hubRegistry.ts` → still ships 2 scaffold hubs (`hub-one`, `hub-two`) with `{HUB_*}` token names — correct *intent* but the slugs and pillar URLs are not labelled clearly enough as "delete me, replace me".
- `BlogHub.tsx` / `BlogHubPage.tsx` → clean, Helmet-based, BreadcrumbList + CollectionPage JSON-LD already present.
- Missing for "world-class": `Article`/`BlogPosting` scaffolding hooks, author E-E-A-T surface, `mainEntityOfPage`, `isPartOf` Organization linkage, hub→service cross-links, related-hub rail, "no posts yet" state currently shows raw `<code>` instructions to the visitor (should be a marketing-safe empty state).
- No connection from a blog hub down into Areas We Serve, and no connection from a Community page up into a relevant blog hub. This is the single biggest topical-authority gap.

**Areas We Serve**
- 3-tier routing (`AreasHub` → `RegionPage` → `CommunityPage`) intact ✅.
- `AreasSEOSchema.tsx` emits LocalBusiness + BreadcrumbList + FAQPage + Service ✅.
- `RegionPage.tsx` still imports `BookingClickHandler` from the legacy `@/config/drywall-booking` path → drag on remix portability.
- No `ItemList` schema on `AreasHub` (the directory page) or `RegionPage` (the community grid) — Google explicitly rewards `ItemList` for "areas we serve"-shaped pages.
- No `speakable` selectors on FAQ blocks (Victorious's voice-search recommendation).
- `MASTER_REMIX.BRAND_URL` is empty in scaffold mode → some schema `@id`s currently emit as `"/foo"` which is fine but the absolute-vs-relative pattern isn't documented.

## 2. Victorious-SEO blueprint we're implementing

Victorious's published playbook for service + content sites:

1. **Topic clusters** — one pillar page per hub, 4–8 spokes, internal links in both directions.
2. **Entity-rich schema** — `Organization` ↔ `WebSite` ↔ `WebPage`/`BlogPosting`/`Service` linked via `@id` URIs (graph stitching, not isolated blocks).
3. **Programmatic local pages** — every served place owns a page with geo coordinates, FAQ, nearby links, and a `LocalBusiness` with `areaServed`.
4. **E-E-A-T surface** — visible author, role, photo, bio, last-reviewed date.
5. **Speakable + FAQ** — `speakable` CSS selectors on Q/A blocks for assistant surfaces.
6. **Internal linking by intent** — service pages link out to informational hubs; informational hubs link down to commercial service pages; both link laterally to siblings.
7. **Sitemap + robots discipline** — one URL per indexable surface, no orphans.

## 3. Plan — Blog side

**3.1 Truly blank the hub registry**
- Replace the 2 scaffold hubs in `hubRegistry.ts` with `hubRegistry: Hub[] = []` and ship a single, heavily-commented `EXAMPLE_HUB` constant (not exported into the array) so a remix author copies a working shape into place without seeing fake topics in production.
- Update the `BlogHub.tsx` "Browse by topic" rail to render nothing when the registry is empty (already does — verify).

**3.2 Marketing-safe empty states**
- `BlogHub.tsx` → when `blogPosts` is empty, render a clean "Editorial coming soon" hero panel (still SEO-valid CollectionPage), not a developer note.
- `BlogHubPage.tsx` → same treatment instead of the current `<code>` instruction block.

**3.3 Schema stitching (the Victorious graph pattern)**
- Add a single `src/lib/seoGraph.ts` helper exporting `orgNode()`, `siteNode()`, `webPageNode({url,name,breadcrumb})`, `blogPostingNode(post)`, `serviceNode({region,communities})`, `localBusinessNode(community)`, and `breadcrumbNode(trail)`.
- Each node carries a stable `@id` derived from the page URL (e.g. `${url}#webpage`, `${url}#breadcrumb`).
- Every node references `Organization` via `publisher: { "@id": "/#organization" }` and `WebSite` via `isPartOf: { "@id": "/#website" }` — matching the sitewide JSON-LD already in `index.html`.
- Refactor `BlogHub`, `BlogHubPage`, `AreasSEOSchema`, and `RegionPage` to compose via these helpers instead of inlining JSON.

**3.4 Post-ready scaffolding (without shipping posts)**
- Define a `BlogPostingSchema` component (`src/components/blog/BlogPostingSchema.tsx`) that consumes a `BlogPost` and emits `BlogPosting` + `BreadcrumbList` + optional `FAQPage` w/ `speakable`. Unused today (blog ships empty) but documented + re-exported so the *first post added* lights up world-class schema automatically.
- Add an `AuthorBio` component (E-E-A-T) reading from `MASTER_REMIX.AUTHORS` — extend `remix-variables.ts` with an `AUTHORS` token map.

**3.5 Hub ↔ Service cross-links (Victorious "intent bridge")**
- Extend the `Hub` type with `linkedRegions: string[]` (region slugs in `communities.ts`).
- `BlogHubPage` renders a "Where we work on this" rail listing the linked regions/communities.
- `RegionPage` renders a "From the field notes" rail listing hubs whose `linkedRegions` includes the current region (read-side join — no duplication).

## 4. Plan — Areas We Serve side

**4.1 Portability fix**
- Replace `import type { BookingClickHandler } from "@/config/drywall-booking"` in `RegionPage.tsx` with `@/config/template/booking-schema` (mirrors `AreasHub` / `CommunityPage`).

**4.2 ItemList on directory + region pages**
- `AreasHub` → emit `ItemList` of all regions.
- `RegionPage` → emit `ItemList` of all communities in that region (in addition to existing `Service`).
- Folded into the new `seoGraph.ts` helpers.

**4.3 Speakable FAQ markers**
- `AreasSEOSchema` → wrap each emitted FAQ `mainEntity` with `speakable: { "@type": "SpeakableSpecification", cssSelector: [".faq-question", ".faq-answer"] }`.
- Add those class hooks to the actual FAQ DOM in `CommunityPage.tsx`.

**4.4 Nearby + adjacent linking (already partially present)**
- Verify `NearbyAreasWidget` is rendered on every Community page (audit during build) and that each region's `adjacentRegions` resolves to at least one valid sibling.

**4.5 Sitemap stays in sync**
- `scripts/generate-sitemap.ts` already pulls from `REGIONS`, `COMMUNITIES`, `hubRegistry` ✅. Hook it to `predev` + `prebuild` per the sitemap doc (currently only behind `bun seo:sitemap`).
- Keep `BASE_URL = ""` placeholder + TODO until project is published.

## 5. Plan — Shared remix surface

**5.1 `remix-variables.ts` additions**
- `AUTHORS: Record<string, { name; role; bio; image }>` — referenced by future blog posts.
- `BRAND_SOCIAL: string[]` — fed into `Organization.sameAs` (so the sitewide JSON-LD in `index.html` becomes a thin template that the runtime can hydrate too).
- Keep every value a placeholder token; never ship a real business name.

**5.2 One-page "Remix Checklist"**
- Add `REMIX_CHECKLIST.md` at project root listing the exact files to edit in order: `remix-variables.ts` → `communities.ts` → `hubRegistry.ts` → (optionally) add posts to `blogData.ts`. Each step links to the section of code with the tokens.

## 6. Out of scope (will not change)

- Visual design system, fonts, copper/forest palette.
- The booking modal, sticky CTA, page-transition layer.
- `GoogleMapEmbed` (keyless iframe is the right default for a blank template — flagged in the checklist if a remix wants the JS Maps API).
- Generating real blog posts or real geography — the template stays blank.

## 7. Technical details (for review)

```text
src/
├─ lib/
│  └─ seoGraph.ts                    NEW — JSON-LD node builders w/ stable @ids
├─ components/
│  ├─ blog/
│  │  ├─ BlogPostingSchema.tsx       NEW — post schema, dormant until posts exist
│  │  └─ AuthorBio.tsx               NEW — E-E-A-T surface
│  └─ areas/
│     └─ AreasSEOSchema.tsx          EDIT — add speakable; route through seoGraph
├─ pages/
│  ├─ AreasHub.tsx                   EDIT — add ItemList via seoGraph
│  ├─ RegionPage.tsx                 EDIT — fix import; add ItemList; add field-notes rail
│  ├─ CommunityPage.tsx              EDIT — add .faq-question/.faq-answer hooks
│  ├─ BlogHub.tsx                    EDIT — empty-state polish; route through seoGraph
│  └─ BlogHubPage.tsx                EDIT — empty-state polish; linked-regions rail
├─ lib/
│  ├─ hubRegistry.ts                 EDIT — empty array + EXAMPLE_HUB constant + linkedRegions
│  └─ blogData.ts                    (unchanged — already empty)
├─ config/template/
│  └─ remix-variables.ts             EDIT — AUTHORS, BRAND_SOCIAL tokens
└─ scripts/
   └─ generate-sitemap.ts            (already added; wire to predev/prebuild)

package.json                         EDIT — add predev/prebuild hooks for sitemap
REMIX_CHECKLIST.md                   NEW — one-page remix order-of-operations
```

After the plan runs, the project ships blank, every page emits a stitched JSON-LD graph, Areas ↔ Blog cross-link automatically, and the first post or first region a remix author adds inherits world-class SEO with no extra work.
