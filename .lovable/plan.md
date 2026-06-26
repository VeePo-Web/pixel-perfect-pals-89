
## Goal

Bring VeePo.ca's world-class blog hub into this SEO Remix Template as a **generic, neutralized** system — same architecture, schema depth, and component palette, but no Cochrane/VeePo branding and no real posts. Live alongside the existing `/areas-we-serve` engine.

## What gets ported

**Data layer** (`src/lib/`)
- `blogData.ts` — `BlogPost` type + `getAllPosts/getFeaturedPost/getPostBySlug/getRelatedPosts/getPostsByHub`. Content reset to **2 placeholder posts** (1 pillar, 1 spoke) using `{BRAND_NAME}` / `{LOCALITY}` tokens.
- `blogUtils.ts` (TOC extraction, formatDate), `blogImages.ts`, `blogStyleGuide.ts`, `blogMapOverrides.ts`, `hubRegistry.ts`, `tocUtils.ts` — copied as-is, brand strings tokenized.

**Components** (`src/components/blog/`, moved out of `locations/`)
- `BlogHero`, `BlogCard`, `BlogContent`, `BlogSchema`, `AuthorCard`, `RelatedPosts`, `TableOfContents`, `ScrollProgressBar`, `PullQuote`, `EditorialImage`, `SocialShare`, `BlogCTA`, `MidPostCTA`, `MobileStickyCTA`, `LocationBlogCTA`, `HubNavigation`, `BlogOwnerThankYou`, `BlogMapEmbed` (rewired to existing `GoogleMapEmbed`).
- Cochrane wrappers (`CochraneSection/Container/FinalCTA/FAQ`, `CochraneHeader/Footer`, `ServiceHero`) → swapped for existing `TemplateLayout` / `TemplateNavigation` / `TemplateFooter` plus thin neutral `Section`/`Container` primitives.

**Pages**
- `src/pages/BlogHub.tsx` — featured + grid, breadcrumb + CollectionPage JSON-LD.
- `src/pages/BlogPost.tsx` — full article surface with `BlogSchema` (BlogPosting + FAQPage + speakable + breadcrumb), TOC, related posts, mid-post + final CTA, optional map.
- `src/pages/BlogHubPage.tsx` — sub-hub index driven by `hubRegistry` (e.g. trade-vertical clusters).

**Routes** (added to `src/App.tsx`)
```text
/blog                 → BlogHub
/blog/:hubSlug        → BlogHubPage   (only when slug matches hubRegistry)
/blog/:slug           → BlogPost      (fallback)
```
`/areas-we-serve` engine and root redirect stay untouched.

**SEO surfaces**
- `MetaTags.tsx` — skip `/blog*` like it already skips `/areas-we-serve*`; pages own their `<head>`.
- `TemplateNavigation` + `TemplateFooter` — add a "Blog" link.

## Explicitly out of scope (deferred — ask separately to add)

- **Downloads gate** (`BlogDownloadsSection`, `DownloadGateModal`, `useDownloadGate`, `downloadUtils`, `downloadMetrics`) — requires Lovable Cloud tables and email capture. Hooks in `BlogPost` are stubbed behind a `downloads={[]}` no-op so the slot exists.
- **FAQ analytics** (`useFAQAnalytics`) — Supabase-backed; replaced with a no-op hook.
- **Real blog content** — only 2 token-driven scaffold posts ship. Filling them is a later content pass.
- VeePo-specific pages (`TradesWebDesignHub`, business-card hubs, neighborhoods).

## Neutralization rules

- All "Cochrane", "Alberta", "VeePo", `veepo.ca` strings → `MASTER_REMIX.BRAND_NAME`, `MASTER_REMIX.SITE_URL`, `community/region` data, or placeholder tokens.
- Author bio in `AuthorCard` → generic `{AUTHOR_NAME}` + role from `MASTER_REMIX`.
- `BlogSchema` reads locality/region from the same `communities.ts` layer the Areas pages use — single source of truth.
- No hardcoded images; `blogImages.ts` returns a neutral default placeholder until real assets are added.

## Technical notes

- Component path move (`components/locations/blog` → `components/blog`) keeps the system trade-agnostic and avoids implying a per-location nesting.
- `BlogPost` interface keeps `hubGovernance`, `ctaConfig`, `faq`, `faqChangelog`, `intent`, `faqLastModified` — these power the JSON-LD richness that makes the hub "world-class". They stay optional so scaffold posts can omit most of it.
- `react-helmet-async` is already installed (used by `MetaTags`); no new deps.
- TypeScript strictness preserved; `tsgo --noEmit` must stay clean.

## Deliverable check

After build:
1. `/blog` renders with 1 featured + 1 regular placeholder card, valid CollectionPage + BreadcrumbList JSON-LD.
2. `/blog/<scaffold-slug>` renders hero, TOC, content, related, FAQ, CTAs, valid BlogPosting + FAQPage JSON-LD with no "Cochrane"/"VeePo" strings.
3. Nav + footer expose "Blog".
4. `rg -i "cochrane|veepo|alberta" src/components/blog src/pages/Blog* src/lib/blog*` returns nothing.
