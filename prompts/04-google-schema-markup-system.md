# Prompt 04 — Google Schema Markup System

> Paste this entire prompt into Claude Code or Lovable.
> Requires react-helmet-async (installed by Prompt 02 if run first).

---

```
═══════════════════════════════════════════════════════════════════════
 GOOGLE SCHEMA MARKUP SYSTEM — Full JSON-LD Engine
 Cochrane Master Builders Universal Template
═══════════════════════════════════════════════════════════════════════

─────────────────────────────────────────────────────────────────────
ROLE
─────────────────────────────────────────────────────────────────────
You are building the structured data layer that drives Google rich
results, Map Pack ranking, and "People Also Ask" boxes for the entire
Cochrane Master Builders network. A single component reads MASTER_REMIX
and the current URL, then outputs the correct JSON-LD for every route.
Zero manual schema management per-page. One component. Every route.

─────────────────────────────────────────────────────────────────────
CODEBASE CONTEXT
─────────────────────────────────────────────────────────────────────
Routes in App.tsx that need schema:
  /                    LocalBusiness + AggregateRating + WebSite
  /brand-story         LocalBusiness + BreadcrumbList
  /why-we-love         LocalBusiness + BreadcrumbList
  /services            LocalBusiness + BreadcrumbList + ItemList (sub-services)
  /services/:slug      LocalBusiness + BreadcrumbList + Service + FAQPage
  /pricing             LocalBusiness + BreadcrumbList + FAQPage
  /gallery             LocalBusiness + BreadcrumbList
  /reviews             LocalBusiness + BreadcrumbList + AggregateRating
  /about               LocalBusiness + BreadcrumbList + Organization
  /contact             LocalBusiness + BreadcrumbList
  /areas-we-serve      LocalBusiness + BreadcrumbList + ItemList (regions)
  /areas-we-serve/:r   LocalBusiness + BreadcrumbList + Service (regional)
  /areas-we-serve/:r/:c LocalBusiness + BreadcrumbList + Service (community)
    Note: community pages have partial schema via AreasSEOSchema.tsx.
    Add to it, do not duplicate or replace.
  /thank-you           none — noindex page
  /privacy, /terms     none

MASTER_REMIX fields available:
  BRAND_NAME, SERVICE, SERVICE_CATEGORY, COMMUNITIES[], SUB_SERVICES[],
  PRICE_BANDS[], FAQS[], TRUST_NUMBERS[], TRADE_SLUG, FOUNDATION_YEAR

Geographic data:
  Cochrane, Alberta coordinates: lat 51.1947, lng -114.4672
  Service radius: ~80km from Cochrane

Existing partial schema:
  src/components/areas/AreasSEOSchema.tsx — keep, supplement only

react-helmet-async: install if not already present.
Wrap App.tsx in <HelmetProvider> if not already done.

─────────────────────────────────────────────────────────────────────
DELIVERABLES
─────────────────────────────────────────────────────────────────────

STEP 1 — Create src/config/template/schema-config.ts

  Export SCHEMA_BUSINESS: SchemaLocalBusiness — the base LocalBusiness
  object populated from MASTER_REMIX. Used by all routes.

  Shape:
  {
    "@type": "LocalBusiness",
    "@id": "https://{TRADE_SLUG}.cochrane-master-builders.com/#business",
    "name": BRAND_NAME,
    "description": "{SERVICE_CATEGORY} in {COMMUNITIES[0]}, Alberta",
    "url": "https://{TRADE_SLUG}.cochrane-master-builders.com",
    "telephone": "",
    "foundingDate": FOUNDATION_YEAR.toString(),
    "areaServed": COMMUNITIES.map(c => ({ "@type": "City", "name": c + ", Alberta, Canada" })),
    "geo": { "@type": "GeoCoordinates", "latitude": 51.1947, "longitude": -114.4672 },
    "priceRange": "$$",
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "07:00", "closes": "18:00"
    }],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": SERVICE_CATEGORY,
      "itemListElement": SUB_SERVICES.map((s, i) => ({
        "@type": "Offer", "position": i+1, "name": s.title, "description": s.summary
      }))
    }
  }

  Export helpers:
    buildBreadcrumbs(items: {name:string, url:string}[]): BreadcrumbList
    buildFAQSchema(faqs: {question:string, answer:string}[]): FAQPage

STEP 2 — Create src/components/template/SiteSchemaEngine.tsx

  Singleton. Mount once in App.tsx below MetaTags.
  Uses useLocation() to determine schemas.

  For every route: inject SCHEMA_BUSINESS + BreadcrumbList via Helmet.

  Additional schemas per route:
    / — WebSite (with SearchAction sitelinks) + AggregateRating if available
    /services/:slug — Service + FAQPage (MASTER_REMIX.FAQS)
    /pricing — FAQPage (MASTER_REMIX.FAQS)
    /reviews — AggregateRating (always render)
    /about — Organization schema
    /areas-we-serve — ItemList of regions
    /areas-we-serve/:region — Service at region level

  Rules:
    - One <script type="application/ld+json"> per schema type
    - Do NOT concatenate multiple schemas in one script tag
    - All @id values must be unique per page

STEP 3 — Mount SiteSchemaEngine in App.tsx
  Render <SiteSchemaEngine /> just below <MetaTags />.
  No other changes to App.tsx.

STEP 4 — Update AreasSEOSchema.tsx
  Import SCHEMA_BUSINESS from schema-config.ts.
  Use it as the base for LocalBusiness. Remove duplicated field
  construction. Keep all else identical.

─────────────────────────────────────────────────────────────────────
ACCEPTANCE GATES
─────────────────────────────────────────────────────────────────────
□ Google Rich Results Test passes on /, /services, /reviews, /pricing
□ No duplicate @type LocalBusiness on any page
□ BreadcrumbList present on every non-home route
□ FAQPage on /pricing contains all 6 MASTER_REMIX.FAQS
□ AggregateRating on / and /reviews only renders when data exists
□ Community pages do not duplicate schema (AreasSEOSchema + SiteSchemaEngine additive)
□ /thank-you emits no schema
□ WebSite schema with SearchAction on / only
□ All @id values unique per page
```
