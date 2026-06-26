# Report 04 — JSON-LD Schema Cookbook (copy-paste, validated shapes)

> **What this is.** Copy-paste-ready, validated JSON-LD for every page type in the Areas + Maps + Blog template. Placeholders are `{UPPER_SNAKE}`. All shapes must ship **prerendered into the initial HTML** (not `useEffect`-injected) — see `../prompts/01`.
> Synthesizes `../research/02` (geo schema), `../research/03` (AI/entity), `../research/08` (GBP parity). **Spec only — no code changed.**

---

## Rules that apply to every shape

- **Render statically** in the page `<head>` (AI crawlers don't run JS).
- **NAP byte-identical** across every node, the footer, GBP, and citations.
- **No self-serving `aggregateRating`/`review`** on your own business (Google's stated rule). Third-party review counts go in GBP, not your schema.
- **`geoRadius` is metres** (30 mi = 48280).
- Add **`@id`** (Wikidata) to `City`/`AdministrativeArea` where you have it — strengthens AI entity disambiguation.
- `Service`/`areaServed`/`GeoCircle`/`hasMap` produce **no SERP rich result** — they're for *understanding* (Google) and *disambiguation* (AI). Include them anyway.
- Use **one `@graph`** per page so nodes can cross-reference by `@id`.
- Validate every page in the **Rich Results Test** + **Schema.org validator**: 0 errors before ship.

---

## 1. Sitewide brand entity — `LocalBusiness` (emit on every page)

Define once (e.g. from `src/config/template/*`) and include in every page's `@graph`. Other nodes reference it by `@id`.

```json
{
  "@type": "{LOCALBUSINESS_TYPE}",
  "@id": "{SITE_URL}/#business",
  "name": "{BRAND_NAME}",
  "url": "{SITE_URL}",
  "telephone": "{PHONE_E164}",
  "image": "{LOGO_OR_PHOTO_URL}",
  "priceRange": "{PRICE_RANGE}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{STREET}",
    "addressLocality": "{CITY}",
    "addressRegion": "{REGION_CODE}",
    "postalCode": "{POSTAL}",
    "addressCountry": "{CA_OR_US}"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": {BASE_LAT}, "longitude": {BASE_LNG} },
  "hasMap": "https://www.google.com/maps/place/?q=place_id:{PLACE_ID}",
  "sameAs": [
    "https://www.google.com/maps/place/?q=place_id:{PLACE_ID}",
    "{FACEBOOK_URL}", "{LINKEDIN_URL}", "{INSTAGRAM_URL}", "{YELP_URL}"
  ],
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00", "closes": "17:00" }
  ]
}
```
> For a **pure SAB with no public storefront**, you may omit `address.streetAddress` and rely on `areaServed` (see §3). Keep whatever NAP you *do* show identical to GBP.

---

## 2. National hub `/areas-we-serve/` — `CollectionPage` + `BreadcrumbList`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": "{SITE_URL}/#website", "url": "{SITE_URL}", "name": "{BRAND_NAME}",
      "publisher": { "@id": "{SITE_URL}/#business" } },
    { "@type": "CollectionPage", "@id": "{SITE_URL}/areas-we-serve/#page",
      "url": "{SITE_URL}/areas-we-serve/", "name": "Areas We Serve — {BRAND_NAME}",
      "isPartOf": { "@id": "{SITE_URL}/#website" },
      "about": { "@id": "{SITE_URL}/#business" },
      "dateModified": "{ISO_DATE}" },
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "{SITE_URL}/" },
      { "@type": "ListItem", "position": 2, "name": "Areas We Serve", "item": "{SITE_URL}/areas-we-serve/" }
    ] }
  ]
}
```

---

## 3. Community leaf `/areas-we-serve/{region}/{community}/` — the core page

The highest-value schema in the template. `Service` + town-scoped `areaServed`, referencing the sitewide business.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "{LOCALBUSINESS_TYPE}", "@id": "{SITE_URL}/#business" },

    { "@type": "Service",
      "@id": "{PAGE_URL}#service",
      "serviceType": "{SERVICE_CATEGORY}",
      "name": "{SERVICE_CATEGORY} in {COMMUNITY}",
      "provider": { "@id": "{SITE_URL}/#business" },
      "areaServed": {
        "@type": "City",
        "name": "{COMMUNITY}",
        "@id": "{WIKIDATA_URL_OPTIONAL}",
        "containedInPlace": { "@type": "AdministrativeArea", "name": "{PROVINCE_OR_STATE}" }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog", "name": "{SERVICE_CATEGORY} services in {COMMUNITY}",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "{SUBSERVICE_1}" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "{SUBSERVICE_2}" } }
        ]
      }
    },

    { "@type": "WebPage", "@id": "{PAGE_URL}#page", "url": "{PAGE_URL}",
      "name": "{SERVICE_CATEGORY} in {COMMUNITY}, {PROVINCE_OR_STATE} | {BRAND_NAME}",
      "isPartOf": { "@id": "{SITE_URL}/#website" },
      "primaryImageOfPage": "{HERO_IMAGE_URL}",
      "dateModified": "{ISO_DATE}",
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".answer-first"] } },

    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "{SITE_URL}/" },
      { "@type": "ListItem", "position": 2, "name": "Areas We Serve", "item": "{SITE_URL}/areas-we-serve/" },
      { "@type": "ListItem", "position": 3, "name": "{PROVINCE_OR_STATE}", "item": "{SITE_URL}/areas-we-serve/{REGION}/" },
      { "@type": "ListItem", "position": 4, "name": "{COMMUNITY}", "item": "{PAGE_URL}" }
    ] },

    { "@type": "FAQPage", "mainEntity": [
      { "@type": "Question", "name": "{GEO_FAQ_Q1}",
        "acceptedAnswer": { "@type": "Answer", "text": "{GEO_FAQ_A1}" } },
      { "@type": "Question", "name": "{GEO_FAQ_Q2}",
        "acceptedAnswer": { "@type": "Answer", "text": "{GEO_FAQ_A2}" } }
    ] }
  ]
}
```

**SAB serving many towns from one base — hybrid `areaServed`** (swap into the `Service` node):
```json
"areaServed": [
  { "@type": "City", "name": "{COMMUNITY}" },
  { "@type": "City", "name": "{NEAREST_1}" },
  { "@type": "City", "name": "{NEAREST_2}" },
  { "@type": "GeoCircle",
    "geoMidpoint": { "@type": "GeoCoordinates", "latitude": {BASE_LAT}, "longitude": {BASE_LNG} },
    "geoRadius": "{RADIUS_METRES}" }
]
```

> **FAQPage caveat:** FAQ *rich results* were removed from Google Search (May 7 2026). The markup stays valid and still aids **AI extraction** — keep it for AEO; the visible Q&A must match the schema text.

---

## 4. Region hub `/areas-we-serve/{region}/` — `CollectionPage` linking leaves

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "CollectionPage", "@id": "{REGION_URL}#page", "url": "{REGION_URL}",
      "name": "{SERVICE_CATEGORY} across {PROVINCE_OR_STATE} | {BRAND_NAME}",
      "about": { "@id": "{SITE_URL}/#business" }, "dateModified": "{ISO_DATE}",
      "mainEntity": { "@type": "ItemList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "{COMMUNITY_1}", "url": "{LEAF_URL_1}" },
        { "@type": "ListItem", "position": 2, "name": "{COMMUNITY_2}", "url": "{LEAF_URL_2}" }
      ] } },
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "{SITE_URL}/" },
      { "@type": "ListItem", "position": 2, "name": "Areas We Serve", "item": "{SITE_URL}/areas-we-serve/" },
      { "@type": "ListItem", "position": 3, "name": "{PROVINCE_OR_STATE}", "item": "{REGION_URL}" }
    ] }
  ]
}
```

---

## 5. Blog post `/blog/{slug}` — `BlogPosting` + author + breadcrumb

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BlogPosting", "@id": "{POST_URL}#post", "mainEntityOfPage": "{POST_URL}",
      "headline": "{HEADLINE_<=60_CHARS}",
      "description": "{META_DESCRIPTION}",
      "image": "{FEATURED_IMAGE_URL}",
      "datePublished": "{ISO_PUBLISH}", "dateModified": "{ISO_MODIFIED}",
      "author": { "@type": "Person", "name": "{AUTHOR_NAME}", "jobTitle": "{AUTHOR_TITLE}",
        "url": "{AUTHOR_PAGE_URL}", "sameAs": ["{AUTHOR_LINKEDIN}"] },
      "publisher": { "@id": "{SITE_URL}/#business" },
      "about": { "@type": "Thing", "name": "{TOPIC}" } },
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "{SITE_URL}/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "{SITE_URL}/blog/" },
      { "@type": "ListItem", "position": 3, "name": "{HEADLINE}", "item": "{POST_URL}" }
    ] },
    { "@type": "FAQPage", "mainEntity": [
      { "@type": "Question", "name": "{POST_FAQ_Q1}",
        "acceptedAnswer": { "@type": "Answer", "text": "{POST_FAQ_A1}" } }
    ] }
  ]
}
```

For a step-by-step post, add a `HowTo` node (`name`, `step[]` with `HowToStep` `name`+`text`).

---

## 6. Validation + parity checklist

- [ ] Each page emits **one `@graph`**; `@id` cross-references resolve.
- [ ] Rich Results Test + Schema.org validator: **0 errors.**
- [ ] NAP in schema === footer === GBP (character-for-character).
- [ ] No `aggregateRating`/`review` on your own business node.
- [ ] `geoRadius` in **metres**; `@id` Wikidata on `City` where available.
- [ ] FAQ schema text === visible Q&A text.
- [ ] `dateModified` === the visible "Updated {Month} 2026" and reflects a real change.
- [ ] All of it present in **view-source with JS disabled** (Gate A).
