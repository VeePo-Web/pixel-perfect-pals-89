# Reference — Current Implementation Map (what you are templating)

Exact structural map of how the **Areas-We-Serve** and **Blog** systems work in this repo **today**.
This is the ground truth the build prompts extend. **Stack:** React 18 + Vite 5 + TypeScript 5 +
react-router-dom 6 + react-helmet-async + Tailwind 3 (TS design tokens). Verified 2026-06.

> Paths below are repo-relative.

---

## Framework & build
- **SEO head:** `react-helmet-async` (dynamic) + `src/lib/seo.ts` `setPageMeta()` + JSON-LD builders.
- **Sitemap:** `scripts/generate-sitemap.ts` runs on `predev`/`prebuild` → writes `public/sitemap.xml`.
- **Build:** `npm run build` (vite) with `prebuild` hook (sitemap + preflight). Target es2020. Manual
  chunks: react-vendor + motion-vendor.
- **Key scripts:** `seo:sitemap`, `images:generate`, `reviews:import`/`reviews:seed`.

---

## 1. Areas-We-Serve / Local SEO system

### Routing (`src/App.tsx`)
| URL | Tier | Page |
|---|---|---|
| `/areas-we-serve` | Hub (T1) | `AreasHub` — all regions + featured communities |
| `/areas-we-serve/:region` | Region (T2) | `RegionPage` — communities grouped by tier |
| `/areas-we-serve/:region/:community` | Community (T3) | `CommunityPage` — location detail + FAQs |

### Data layer (`src/data/communities.ts`)
**`Region`**: `slug, name, shortName, description, country?, province?, adjacentRegions[], heroImage?{url,alt}`
**`Community`**: `slug, name, region(FK), city, province, country?, coordinates{lat,lng}, tier(1|2|3),
shortDescription, fullDescription, streets[], landmarks[], primaryKeywords[], faqs[], nearestCommunities[],
heroImage?`
**`FAQ`**: `{question, answer}` · **`HeroImage`**: `{url, alt}`
**Helpers (exported):** `getRegion`, `getCommunity`, `getRegionCommunities`, `getNearestCommunities`,
`getAllRegionSlugs`, `getAllCommunitySlugs`, `resolveCommunityHeroImage`.

### Pages
- `src/pages/AreasHub.tsx` — Hero + trust strip + regions grid + featured (first 6). Schema:
  LocalBusiness + ItemList.
- `src/pages/RegionPage.tsx` — Hero + context + 3-tier community groups + adjacent regions + field
  notes (linked blog posts) + region FAQ. Schema: WebPage + BreadcrumbList + AdministrativeArea +
  Service + ItemList + FAQPage.
- `src/pages/CommunityPage.tsx` — Hero + breadcrumb + Google Map + streets + landmarks + **dynamic
  FAQs** + nearby communities + field notes. Schema: LocalBusiness + BreadcrumbList + Service +
  FAQPage. FAQs auto-built from `MASTER_REMIX.SERVICE` + community data (never hardcoded trade name).

### Components (`src/components/areas/`)
`AreasSEOSchema.tsx` (injects LocalBusiness + Breadcrumb + FAQ + Service into `document.head`),
`CommunityCard.tsx`, `GoogleMap.tsx`, `GoogleMapEmbed.tsx`, `NearbyAreasWidget.tsx`.

### Areas SEO formulas (current)
- **Title:** `{SERVICE_CATEGORY} {Community}, {City} | {BRAND_NAME}`
- **Meta:** `Looking for {service} in {community}? {brandName} serves {community} and nearby {n2}.
  {RESPONSE_PROMISE}.`
- **Breadcrumb:** Home → Areas We Serve → {Region} → {Community}
- **Service schema:** name `{serviceCategory} in {community}`, provider LocalBusiness (@id),
  `areaServed` Place + coordinates + address.
- **FAQPage:** `speakable` selectors `.faq-question`/`.faq-answer`; 4 dynamic, trade-agnostic FAQs.

---

## 2. Blog / content system

### Routing (`src/App.tsx`)
| URL | Page |
|---|---|
| `/blog` | `BlogHub` — index + featured post |
| `/blog/:hubSlug` | `BlogHubPage` — topic cluster (pillar + spokes) |
| `/blog/:hubSlug/:postSlug` | `BlogPost` — individual article |

Ships **empty** (hub-only) until data added. Routes return empty states / redirects when no data.

### Data (`src/lib/blogData.ts`)
**`BlogPost`**: `slug, title, metaTitle(≤60), metaDescription(≤155), excerpt, content(markdown),
author{name,role,image,bio}, publishedAt, modifiedAt, readingTime, category, tags[], featured,
featuredImage{url,alt,width,height}, ogImage?, twitterImage?, inlineImages?, faq?[{question,answer,
intent?}], faqLastUpdated?, ctaConfig?, hubGovernance?, about?{regionSlug?,communitySlug?}, tldr?,
outline?[], wordCount?`
Current: `blogPosts: BlogPost[] = []` (dormant).
**Selectors:** `getAllPosts, getFeaturedPost, getPostBySlug, getPostsByHub, getPostsByHubSlug,
getPostsByCategory, getRelatedPosts, getPostsAboutCommunity, getPostsAboutRegion`.

### Hub registry (`src/lib/hubRegistry.ts`) — topic clusters
**`Hub`**: `id, name, slug, pillarUrl, hubUrl, primaryTopic, primaryKeywordPattern, secondaryTopics[],
intentProfile, allowedLocations[], servicePages[], relatedHubs[], linkedRegions?[], linkedCommunities?[]`
**`HubGovernanceData`**: `hubId, hubName, hubSlug, postType(pillar|spoke|key_blog), internalLinks{hub,
pillar, servicePages[], relatedPosts[], crossHub?}, refreshCadence, cannibalizationRisk, hubIndexEntry?`
Current: `hubRegistry: Hub[] = []`.
**Selectors:** `getHubById, getHubBySlug, getAllHubs, getRelatedHubs`.

### Pages
- `src/pages/BlogHub.tsx` — hero + hub directory + featured + grid. Schema: BreadcrumbList +
  CollectionPage (hasPart: all posts).
- `src/pages/BlogHubPage.tsx` — hub title + pillar + spokes + linked regions. Schema: BreadcrumbList +
  CollectionPage.
- `src/pages/BlogPost.tsx` — breadcrumb + TL;DR + title + dates + author + markdown + FAQ + "Serving
  {Community}" card. Schema: BlogPosting (+ BreadcrumbList + FAQPage via component).

### Components (`src/components/blog/`)
`BlogCard.tsx`, `BlogPostingSchema.tsx` (injects BlogPosting + BreadcrumbList + FAQPage into head),
`AuthorBio.tsx`, `GuidesForLocation.tsx` (cross-surface rail; uses `getPostsAboutRegion` /
`getPostsAboutCommunity`).

### Blog SEO formulas (current)
- **Title:** `{post.metaTitle} | {BRAND_NAME}` · **Meta:** `post.metaDescription`
- **BlogPosting:** headline, description, datePublished/Modified, author Person(jobTitle,image),
  publisher Organization(ORG_ID), image ImageObject, keywords, articleSection, wordCount, inLanguage,
  mainEntityOfPage, isPartOf WebSite.

---

## 3. Intent bridge (Areas ↔ Blog)
- **Region page** → posts with `about.regionSlug` (via `GuidesForLocation`, ≤3).
- **Community page** → posts with `about.communitySlug` (via `GuidesForLocation`).
- **Blog hub page** → `hub.linkedRegions` (converts informational intent back to service-area discovery).

---

## 4. Shared SEO infrastructure
- **`src/components/template/MetaTags.tsx`** — react-helmet-async; routes under `/areas-we-serve/*`
  and `/blog/*` own their own head (skip MetaTags); other routes read `META_CONFIG`.
- **`src/lib/seo.ts`** `setPageMeta()` — runtime title/description/canonical/og:*/twitter:*; reads
  BASE_URL + OG_IMAGE from MASTER_REMIX.
- **`src/lib/seoGraph.ts`** — pure JSON-LD builders: `ORG_ID`="/#organization", `SITE_ID`="/#website";
  `breadcrumbNode, webPageNode, collectionPageNode, itemListNode, serviceNode, localBusinessNode,
  placeNode, administrativeAreaNode, faqPageNode`; `buildGraph`/`stringifyGraph` wrap in `@graph`.
- **`src/config/template/meta-config.ts`** — `META_CONFIG` route→PageMeta map (currently `/` only).
- **`src/config/template/remix-variables.ts`** — `MASTER_REMIX` single source of truth: `SERVICE,
  SERVICE_PLURAL, SERVICE_CATEGORY, BRAND_NAME, BRAND_URL, SERVICE_REGION_TAGLINE, RESPONSE_PROMISE,
  TRUST_BULLETS, TRUST_STATS_LABELS, COVERAGE_BLURB, REGION_FAQ_TEMPLATE, PHONE, OG_IMAGE`, etc.
- **`index.html`** — static sitewide `Organization` (`@id` /#organization, with `sameAs:[]`) + `WebSite`
  (`@id` /#website, `potentialAction` SearchAction). Tokens are placeholders; real values resolve at
  runtime via MetaTags/setPageMeta.
- **`public/robots.txt`** — allows all; Sitemap line commented out pending BRAND_URL.
- **No `llms.txt` yet.**
- **`scripts/generate-sitemap.ts`** — enumerates regions, communities, blog hubs, posts; image
  entries; priority tiers (`/`=1.0 weekly … community=0.7 monthly … post=0.6 monthly).

---

## 5. Design tokens & layout (`src/lib/tokens/`, `src/components/template/`)
Tokens: `colors.ts` (seam, forest, charcoal, clay, copper, bone, paper, graphite, mist),
`typography.ts`, `spacing.ts`, `motion.ts`, `contrast.ts`, `elevation.ts`.
Layout: `TemplateLayout.tsx` (Nav + Footer + SmoothScrollProvider), `TemplateNavigation.tsx`,
`TemplateFooter.tsx`, `SectionFrame.tsx` (tone forest|paper|bone, size sm|md|lg|xl),
`ConversionBar.tsx`.

---

## 6. The remix contract (how this is already a template)
1. **Trade-agnostic copy** — all service language from `MASTER_REMIX` (`remix-variables.ts`), never
   hardcoded in components.
2. **Dynamic FAQs** — community FAQs auto-generate from service + community data (no hardcoding).
3. **Intent bridge** — posts declare `about:{regionSlug,communitySlug}`; cross-surface rails wire
   research ↔ service areas.
4. **Schema layering** — stable sitewide Organization + WebSite in `index.html`; per-page nodes link
   back via `@id`.
5. **Sitemap automation** — pre-build reads data arrays → full sitemap with images + priorities.
6. **Empty-by-default** — `hubRegistry`/`blogPosts` ship empty; remix authors drop data in.

> **To remix:** edit `remix-variables.ts` + populate `communities.ts`, `blogData.ts`, `hubRegistry.ts`.
> Pages update everywhere automatically.

---

## 7. Gaps the build prompts must close (vs. research 01–03)
1. **Static rendering** — pages are client-rendered SPA; schema partly injected via `useEffect`. AI
   crawlers see little. → prerender/SSG + move schema into initial HTML (`prompts/04`).
2. **No `llms.txt`**; robots.txt has no explicit AI-crawler allows + Sitemap line commented (`prompts/04`).
3. **No publish/uniqueness gate** — nothing enforces ≥4-of-8 local signals before a page exists
   (`prompts/01`).
4. **Geography is placeholder** (region-one / community-a) — needs the full CA + US scaffold
   (`prompts/01`).
5. **`areaServed`** uses Place/coordinates — research prefers GeoCircle/GeoShape for SABs (`prompts/04`).
6. **Self-serving review schema risk** — ensure no `aggregateRating`/`review` on own org (`prompts/04`).
7. **Honest `lastmod`** — ensure sitemap lastmod reflects real content changes, not deploy time
   (`prompts/04`).
