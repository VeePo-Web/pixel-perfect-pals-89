# Areas We Serve — SEO Architecture Design Plan
## Master Builders Template System | Cross-Site Local SEO Engine

**Document type:** Strategic Design Plan  
**Applies to:** All 150 VeePo Master Builder sub-sites  
**SEO classification:** Primary local ranking engine  
**Data source:** communities_master_v3.xlsx (131 communities)  
**Companion files:** ServiceArea.tsx, service-areas.ts, communities_master_v3.source.md  

---

## 1. Executive Summary

"Areas We Serve" is not a page. It is the entire local SEO infrastructure of the business.

Every contractor in Canada has a contact page. Many have a services page. Almost none have a properly engineered geographic intelligence system that tells Google — with surgical precision — exactly which streets, neighbourhoods, communities, and regions a business operates in, and exactly what it does there.

This plan defines a three-tier page architecture, a brand-injectable data model, a street-level content strategy, a schema markup system, and a phased implementation roadmap that turns 131 communities into a compounding SEO asset for all 150 Master Builder sub-sites.

The core thesis:

**For every service × every community = one rankable page.**  
**131 communities × 115 services = 15,065 potential indexed pages.**  
**Each one answers a real search query nobody else is answering.**

This is not theory. This is how local service businesses dominate Google in 2025 and beyond.

---

## 2. Why This Is The Primary SEO Engine

### 2.1 How Local Search Actually Works

When someone types "drywall contractor Riversong Cochrane" or asks Siri "who does drywall near me in Heritage Hills", Google is trying to answer one question: which business is most relevant to this specific location and service combination?

The businesses that win are the ones that have:

1. A dedicated page that explicitly mentions that community
2. Content that proves they know that community (streets, landmarks, schools, distances)
3. Schema markup that formally declares that community as a service area
4. Internal links between nearby communities that prove geographic authority
5. A conversion path on that specific page

The businesses that lose are the ones with a single "Areas We Serve" list that says "Calgary, Cochrane, Airdrie."

### 2.2 The Density Advantage

If Cochrane Drywall Masters has 131 community pages, each with 400–600 words of hyper-local content, and every major competitor has zero dedicated community pages, the SEO advantage is not incremental. It is structural.

Google's local ranking algorithm rewards:
- **Topical depth** — do you cover this location extensively?
- **Geographic specificity** — do you mention specific streets, schools, parks?
- **Authority** — do other pages on your site link into this content?
- **Relevance** — does every page clearly state what service is offered here?
- **Freshness** — does the content feel like a real local business or a scraped directory?

A system that provides all five of these signals at scale, across 131 communities, consistently updated and internally linked, will outrank any competitor who does not have the same system.

### 2.3 The 150-Site Multiplier

Because this is a template system serving 150 different trade businesses (Drywall Masters, Tile Masters, Insulation Masters, Flooring Masters, etc.), each sub-site inherits the same geographic infrastructure but injects its own:
- Trade name and service type
- Service-specific content per community
- Brand-specific CTA and contact
- Service-specific schema

So a single architecture decision here compounds across 150 businesses × 131 communities = 19,650 community pages in total across the VeePo ecosystem. Each one is unique because the service type is different. Each one answers a different search query. This is the moat.

---

## 3. Architecture Overview

### 3.1 Three-Tier Page System

```
TIER 1 — HUB PAGE
/areas-we-serve
"Every community we build in"
Purpose: Brand authority, regional overview, internal link hub
SEO target: "[Service] Cochrane Alberta" and regional brand queries

    ↓

TIER 2 — REGION PAGES
/areas-we-serve/cochrane
/areas-we-serve/calgary-northwest
/areas-we-serve/calgary-southwest
/areas-we-serve/springbank
/areas-we-serve/rocky-view
/areas-we-serve/bow-valley
/areas-we-serve/canmore
Purpose: Cluster all communities in a region, regional SEO targeting
SEO target: "[Service] [Region] Alberta" queries

        ↓

TIER 3 — COMMUNITY PAGES (the SEO powerhouse)
/areas-we-serve/cochrane/riversong
/areas-we-serve/cochrane/heritage-hills
/areas-we-serve/springbank/aventerra-estates
/areas-we-serve/calgary-southwest/aspen-woods
Purpose: One page per community, maximum geo-specificity
SEO target: "[Service] [Community Name] [City]" queries
```

### 3.2 Why Three Tiers

**Tier 1 (Hub):** Provides a single authoritative page that captures brand-level regional searches. Internal links from Tier 1 → Tier 2 pass authority downward. This page ranks for "Cochrane drywall contractor" type head terms.

**Tier 2 (Region):** Groups communities geographically so Google understands the spatial relationship between areas. A Springbank region page that mentions Aventerra Estates, Bearspaw, Elbow Valley, and Pinnacle Ridge in the same context tells Google "this business knows Springbank." It ranks for "[Region] [service]" queries and passes authority to community pages.

**Tier 3 (Community):** The individual community page is the main event. It is where the real long-tail traffic lives. "Drywall contractor Heritage Hills Cochrane" is a low-competition, high-intent query. A well-built community page with street names, local landmarks, and 500 words of specific content will dominate that query. Multiply by 131 communities.

---

## 4. URL Structure

### 4.1 URL Format Rules

```
Base:     /areas-we-serve
Region:   /areas-we-serve/{region-slug}
Community:/areas-we-serve/{region-slug}/{community-slug}
```

### 4.2 Region Slugs

| Region Name | Slug |
|---|---|
| Cochrane | cochrane |
| Calgary Northwest | calgary-northwest |
| Calgary Southwest | calgary-southwest |
| Springbank | springbank |
| Rocky View County | rocky-view-county |
| Bow Valley Corridor | bow-valley |
| Canmore & Area | canmore |
| Ghost Lake Area | ghost-lake |
| Elbow Valley | elbow-valley |

### 4.3 Community Slug Rules

- All lowercase, hyphen-separated
- Remove parenthetical qualifiers: "Aventerra Estates (Springbank)" → `aventerra-estates`
- Keep geographic qualifiers if they distinguish: "Three Sisters Mountain Village (Canmore)" → `three-sisters`
- Special characters removed: "Bel‑Aire" → `bel-aire`

### 4.4 Canonical Cross-Site Pattern

Each of the 150 sub-sites uses the same URL structure. The service brand is not in the URL — the domain provides that signal. Example:

```
drywallmasters.cochrane.ca/areas-we-serve/cochrane/riversong
tilemasters.cochrane.ca/areas-we-serve/cochrane/riversong
insulationmasters.cochrane.ca/areas-we-serve/cochrane/riversong
```

Same geographic structure. Different service content on each.

---

## 5. Data Model

### 5.1 Community Interface

```typescript
interface Community {
  slug: string;                    // URL slug
  name: string;                    // Display name
  region: Region;                  // Parent region
  
  // Geographic signals
  city: string;                    // "Cochrane" | "Calgary" | "Canmore"
  province: string;                // "Alberta"
  coordinates?: { lat: number; lng: number };
  distanceFromCochrane?: number;   // km, used for internal linking
  
  // SEO content
  headline: string;                // H1 for community page
  shortDescription: string;        // 1–2 sentences for region page card
  fullDescription: string;         // 400–600 words for community page body
  
  // Hyper-local signals (THE KEY SEO LAYER)
  streets: string[];               // Specific streets within community
  landmarks: string[];             // Golf courses, parks, schools, lakes
  neighborhoods: string[];         // Sub-areas within the community
  nearbyHighways: string[];        // "Highway 1A", "Trans-Canada"
  
  // SEO metadata
  primaryKeywords: string[];       // Pull from communities_master_v3
  secondaryKeywords: string[];
  faqs: FAQ[];                     // For FAQPage schema + voice search
  
  // Classification
  tier: 'primary' | 'secondary' | 'tertiary';
  propertyTypes: PropertyType[];   // estate | acreage | condo | townhome | bungalow
  priceRange?: { min: number; max: number };
  
  // Internal linking
  nearestCommunities: string[];    // slugs of 3–5 nearby communities
}

interface Region {
  slug: string;
  name: string;
  communities: Community[];
  headline: string;
  description: string;
}

interface FAQ {
  question: string;               // Matches natural voice search phrasing
  answer: string;                 // 40–80 words, specific to community + service
}
```

### 5.2 Brand Injection Interface

This is how the 150 sites make the same community page theirs:

```typescript
interface BrandConfig {
  // Identity
  brandName: string;              // "Cochrane Drywall Masters"
  tradeName: string;              // "Drywall"
  serviceType: string;            // "Drywall Installation & Finishing"
  serviceDescription: string;     // Used in community page body
  
  // Geographic footprint
  primaryCity: string;            // "Cochrane"
  servedRegions: string[];        // Subset of all 9 regions
  servedCommunities: string[];    // Subset of all 131 communities (or "all")
  
  // Contact & conversion
  phone: string;
  email: string;
  address: string;
  primaryCTA: string;             // "Get a Free Drywall Estimate"
  secondaryCTA: string;           // "See Our Drywall Work"
  
  // SEO
  googleBusinessProfile?: string;
  licenseNumber?: string;
  yearsInBusiness?: number;
}
```

### 5.3 Community Page Content Template

Each community page body is assembled from three layers:

**Layer 1 — Geographic Intelligence (from communities_master_v3)**
- The community description (verbatim or lightly adapted)
- Nearby landmarks, schools, golf courses, parks
- Highway access, distances, travel times
- Price range and property types

**Layer 2 — Brand Injection (from BrandConfig)**
- Service type woven into every paragraph
- "[Trade] contractor in [Community]" phrasing
- Brand name and contact information
- Service-specific CTA

**Layer 3 — Hyper-Local Signals (manually researched or API-sourced)**
- Specific street names within the community
- Intersection-level references (e.g., "homes along Heritage Gate Drive and Heritage Parkway")
- Local business cross-references
- Project-type references matched to property types

---

## 6. Tier 1: Hub Page Design

### 6.1 URL
`/areas-we-serve`

### 6.2 H1
`[Service] Across Cochrane, Calgary, and the Bow Valley — Built Local.`

Example: "Drywall Installation Across Cochrane, Calgary, and the Bow Valley — Built Local."

### 6.3 Page Sections (in order)

**Hero Block**
- Full-width image: aerial view or mountain-framed landscape of the service region
- Overline: "Where We Work"
- H1 (above)
- Sub-headline: "From the foothills of Cochrane to the estate communities of Springbank and the mountain hamlets of the Bow Valley — [Brand] brings master-craft [service] to [X] communities across [region]."
- Primary CTA button

**Trust Anchor Strip**
- 3–4 simple stats: "131 Communities Served" | "Cochrane-Based, Family Owned" | "[X] Years Serving Alberta" | "Licensed & Insured"

**Regional Grid**
- 9 region cards (one per region)
- Each card: region name, number of communities, 1-sentence description, "View Communities →" link
- This is the main internal link distribution point to Tier 2

**Community Spotlight Section**
- 6 featured community cards (the highest-tier, most valuable communities)
- Each card: community name, landmark photo, 1-sentence description, direct link to community page
- These 6 are selected from Tier 1 communities (Bearspaw, Elbow Valley, Springbank Hill, GlenEagles, Aventerra Estates, Stonepine)

**SEO Copy Block**
- 200–300 words of geographic copy that naturally names all 9 regions
- Uses service keyword 3–4 times naturally
- Mentions key anchor communities by name to build topical authority
- Not a list — written as natural editorial prose

**CTA Close**
- "Don't see your community? Text us."
- Contact form or phone link

### 6.4 Schema for Hub Page

```json
{
  "@type": "LocalBusiness",
  "name": "[Brand Name]",
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 51.189,
      "longitude": -114.467
    },
    "geoRadius": "80000"
  },
  "areaServed": [
    { "@type": "City", "name": "Cochrane" },
    { "@type": "City", "name": "Calgary" },
    { "@type": "City", "name": "Canmore" },
    { "@type": "AdministrativeArea", "name": "Rocky View County" }
  ]
}
```

---

## 7. Tier 2: Region Page Design

### 7.1 URL Pattern
`/areas-we-serve/{region-slug}`

### 7.2 H1 Pattern
`[Service] in [Region Name], Alberta`

Example: "Drywall Services in Springbank, Alberta"

### 7.3 Page Sections

**Hero Block**
- Regional landscape image (mountain view, acreage terrain, or community-specific aerial)
- Overline: "[Region] Communities"
- H1 (above)
- Sub-headline using the region's unique character: "Springbank's acreage estates and ridge-top communities trust [Brand] for master-craft [service] — from [Community A] to [Community B]."

**Region Introduction Copy**
- 150–250 words of editorial prose about the region
- Naturally names 5–10 communities within that region
- Mentions service type 2–3 times
- References key landmarks (golf courses, parks, highways) that define the region

**Community Directory Grid**
- All communities in this region, presented as a card grid
- Each card: community name, property type badges, 1-sentence description, CTA link
- Sorted by tier (primary communities first)

**Why [Brand] in [Region]**
- 3 trust points specific to the region
- Example for Springbank: "We know acreage build constraints" | "Familiar with Springbank architectural controls" | "Built across 12+ Springbank communities"

**Internal Links**
- "Also serving nearby regions:" — links to 2–3 adjacent region pages

**CTA Close**

### 7.4 Schema for Region Page

```json
{
  "@type": "Service",
  "name": "[Service Type]",
  "provider": { "@type": "LocalBusiness", "name": "[Brand]" },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "[Region Name]",
    "containsPlace": [
      { "@type": "Place", "name": "Aventerra Estates" },
      { "@type": "Place", "name": "Bearspaw" }
    ]
  }
}
```

---

## 8. Tier 3: Community Page Design (The SEO Powerhouse)

This is the most important page in the entire system. Every decision here is optimized for ranking the specific query "[Service] [Community Name] Alberta."

### 8.1 URL Pattern
`/areas-we-serve/{region-slug}/{community-slug}`

### 8.2 H1 Pattern (the most important tag on the page)
`[Service] in [Community Name], [City] — [Brand]`

Example: "Drywall Contractor in Riversong, Cochrane — Cochrane Drywall Masters"

### 8.3 Title Tag Pattern
`[Service] [Community Name] [City] | [Brand Name] | Alberta`

Example: "Drywall Contractors Riversong Cochrane | Cochrane Drywall Masters | Alberta"

### 8.4 Meta Description Pattern
`Looking for [service] in [Community]? [Brand] is a Cochrane-based [trade] contractor serving [Community] and nearby [Neighbour1], [Neighbour2]. Family-owned. Licensed. Call today.`

### 8.5 Page Sections — FULL ANATOMY

---

**Section 1: Breadcrumb Navigation**
```
Home → Areas We Serve → [Region] → [Community Name]
```
- Renders as both visual breadcrumb and BreadcrumbList schema
- Entire breadcrumb is linked — never orphaned

---

**Section 2: Community Hero**
- Image: ideally the community itself, or a related mountain/acreage/lake view
- Overline: "[Community Name] · [Region] · [City], Alberta"
- H1: "[Service] in [Community Name], [City]"
- Sub-headline: Pulls from the community's `shortDescription`, adapted with service type
- Trust badges: Licensed | Insured | Local | [X] Years
- Primary CTA button

---

**Section 3: About This Community (THE KEY SEO SECTION)**

This section is 400–600 words. It is where the geographic intelligence lives.

**Structure:**
- **Opening paragraph:** What makes this community unique — from communities_master_v3. Natural, editorial tone. Mentions the community name, city, and province in first 100 words.
- **The service connection paragraph:** How this community's specific property types, home values, and construction character make [service type] especially important here. Example: "Riversong's estate homes and semi-detached units along the Bow River valley are built to premium standards — which is why homeowners here don't settle for average [service]. They call [Brand]."
- **Streets and streets paragraph (THE HYPER-LOCAL LAYER):** "We regularly work in homes along Rivercroft Close, Riverview Circle, Rivermead Drive, and Riverstone Place — the kinds of streets where precision [service] isn't just expected, it's required."
- **Landmarks paragraph:** Names the specific golf courses, parks, schools, shopping centres, or lakes that define the community — uses natural language, not a list. "Homeowners near the Cochrane Golf Club and the Spray Lake Sawmills Recreation Centre know us well. We've worked across projects throughout Riversong's natural reserve lands and the pathway network that runs to the Bow River."
- **Distance and access paragraph:** "We're based in Cochrane — which means [Community] is [X] minutes away. No travel fees, no delays, no excuses."

---

**Section 4: Services In This Community**

- Headline: "What We Do In [Community Name]"
- Grid of 4–6 service cards, each showing the specific service name and a 1-sentence description
- Each service card links to the relevant service page
- This section creates internal links from community pages to service pages — a two-way authority flow

---

**Section 5: Street-Level Proof (The Trust Layer)**

- Headline: "We Know [Community Name]"
- 3 proof elements:
  1. Named streets or intersections where past work was done
  2. Property type specifics (e.g., "Most Riversong homes have open-concept layouts requiring [specific technique]")
  3. Local context (e.g., "The Bow River valley humidity patterns affect [service-specific consideration] — here's how we handle it")
- This section is unique per community and signals genuine local expertise to both humans and Google

---

**Section 6: Nearby Communities (Internal Linking Engine)**

- Headline: "Also Serving Communities Near [Community Name]"
- 3–5 community cards: nearest areas from the `nearestCommunities` field
- Each card: community name, distance, 1-sentence description, link
- This is the internal PageRank distribution mechanism — every community page links to nearby communities, creating a web that passes authority throughout the geographic cluster

---

**Section 7: FAQ Block**

- 4–6 questions in FAQPage schema
- Questions follow natural voice search phrasing:
  - "Do you [service] in [Community Name]?"
  - "How much does [service] cost in [Community]?"
  - "Are you licensed to [service] in [City]?"
  - "How quickly can you start a [service] project in [Community]?"
  - "What areas near [Community] do you also serve?"
- Answers are 40–80 words, conversational, mention community name
- This section captures voice search and featured snippet opportunities

---

**Section 8: Community-Specific CTA**

- Headline: "Ready to Start Your [Service] Project in [Community Name]?"
- Sub-copy: Community-specific line (e.g., "We've worked on estate homes and river-view properties throughout Riversong. We know this neighbourhood.")
- Primary CTA: "Get a Free Estimate in [Community Name]"
- Secondary CTA: "See Our Work →"
- Contact form pre-filled with community name in hidden field (feeds CRM)

---

### 8.6 Schema Markup — Community Page

Full schema stack for maximum local SEO signal:

```json
[
  {
    "@type": "LocalBusiness",
    "name": "[Brand Name]",
    "address": { "@type": "PostalAddress", "addressLocality": "Cochrane", "addressRegion": "AB" },
    "areaServed": { "@type": "Place", "name": "[Community Name]" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "[Service Type] in [Community Name]"
    }
  },
  {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Areas We Serve", "item": "/areas-we-serve" },
      { "@type": "ListItem", "position": 3, "name": "[Region]", "item": "/areas-we-serve/[region]" },
      { "@type": "ListItem", "position": 4, "name": "[Community]", "item": "/areas-we-serve/[region]/[community]" }
    ]
  },
  {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you [service] in [Community Name]?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — [Brand] serves [Community Name] and surrounding areas in [City]. We're Cochrane-based, so we're typically on-site within [X] days."
        }
      }
    ]
  },
  {
    "@type": "Service",
    "name": "[Service Type]",
    "provider": { "@type": "LocalBusiness", "name": "[Brand]" },
    "areaServed": {
      "@type": "Place",
      "name": "[Community Name]",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "[lat]",
        "longitude": "[lng]"
      }
    }
  }
]
```

---

## 9. Street-Level Content Layer

This is the layer that separates a world-class "Areas We Serve" system from a generic contractor directory.

### 9.1 Why Streets Matter

When Google's algorithm evaluates whether a business genuinely serves a community, it looks for specificity. A page that says "We serve Riversong" could be written by anyone. A page that says "We work on homes along Rivercroft Close, Rivermead Drive, and Riverstone Place near the Cochrane Golf Club" can only have been written by someone who actually goes to those streets.

Streets are trust signals. They eliminate the pattern of generic AI-generated content that says "We serve [Community], a beautiful area with [amenity1] and [amenity2]." Streets make it real.

### 9.2 Street Data Sources (in priority order)

1. **Google Maps / OpenStreetMap API** — Programmatic extraction of street names within community polygon bounds. Most accurate. Can be batched across all 131 communities.
2. **Alberta Land Titles / Municipal parcel data** — Official street name registries for Rocky View County, MD of Bighorn, City of Calgary, Town of Cochrane.
3. **Real estate listing data** — Aggregate from publicly available sold listings to identify the most common streets per community.
4. **Manual research** — For smaller communities (Ghost Lake Village, Waiparous, hamlets), manual Google Maps review and screenshot.
5. **Resident memory / project history** — As the business completes projects, update community pages with actual street names from completed work.

### 9.3 Minimum Street Count Per Community

| Community Tier | Minimum Named Streets |
|---|---|
| Primary (Cochrane neighbourhoods, major Calgary SW) | 8–12 streets |
| Secondary (Springbank micro-communities, Bow Valley) | 4–8 streets |
| Tertiary (small hamlets, very small enclaves) | 2–4 streets or intersection references |

### 9.4 How Streets Are Presented on the Page

Streets are never shown as a bare list. They are woven into prose:

**Wrong:**
```
Streets we serve in Riversong:
- Rivercroft Close
- Rivermead Drive
- Riverstone Place
```

**Right:**
```
We've completed [service] projects in homes throughout Riversong, including along 
Rivercroft Close and Rivermead Drive near the community's main pathway entrance, 
and further into the neighbourhood on Riverstone Place and Riverglen Drive. 
If you live on any of these streets — or anywhere in Riversong — we're your 
local [trade] contractor.
```

The prose format signals human authorship, reads better for users, and creates natural keyword co-occurrence for Google.

### 9.5 Landmark Integration Pattern

Each community page must name at least 3 landmarks from the communities_master_v3 data. Landmarks are woven into the prose with service context:

```
"Homeowners near the Links of GlenEagles golf course know that Cochrane's 
hillside views come with specific challenges for [service] — and we've 
handled every one of them. Whether you're near the GlenEagles trail network 
or further into the community along the Bow River valley escarpment, 
we've been there."
```

---

## 10. Cross-Site Brand Injection System

### 10.1 The Template Principle

All 150 sites share the same component tree. The brand makes it specific. This means:

- Same React component: `<CommunityPage />`
- Same data structure: `communities_master_v3` + region structure
- Same URL architecture: `/areas-we-serve/{region}/{community}`
- Different: `brandConfig` object, service-specific copy blocks, trade-specific FAQs

### 10.2 What Changes Per Site

| Element | Cochrane Drywall Masters | Cochrane Tile Masters |
|---|---|---|
| H1 | "Drywall Contractor in Riversong, Cochrane" | "Tile Installation in Riversong, Cochrane" |
| Service copy | References drywall techniques, taping, finishing | References tile setting, grout, waterproofing |
| FAQ answers | Drywall-specific questions answered | Tile-specific questions answered |
| Services grid | Drywall services only | Tile services only |
| Schema `name` | "Drywall Installation in Riversong" | "Tile Installation in Riversong" |
| CTA text | "Get a Free Drywall Estimate" | "Get a Free Tile Estimate" |

### 10.3 What Stays the Same Per Site

| Element | Shared Across All Sites |
|---|---|
| Community name, description, geography | Same from communities_master_v3 |
| Street names | Same |
| Landmark names | Same |
| Nearby communities | Same |
| Region groupings | Same |
| Breadcrumb structure | Same |
| Image regions | Same (trade-agnostic landscape/community photos) |
| Distance data | Same |

### 10.4 Service-Specific Content Blocks

Each trade maintains a `serviceBlocks.config.ts` file that contains community-level content variations:

```typescript
const drywallBlocks = {
  communityBodyInsert: (community: Community) =>
    `Homes in ${community.name} — particularly the ${community.propertyTypes.join(" and ")} 
    units that characterize this area — require precision drywall installation that holds 
    up to Alberta's temperature and humidity swings. Cochrane Drywall Masters brings 
    master-craft finishing to every project.`,
  
  streetConnectionLine: (street: string, service: string) =>
    `We've worked on homes along ${street} and know exactly what the construction 
    standards are here.`,
};
```

---

## 11. Internal Linking Engine

### 11.1 The Authority Flow Map

```
Hub Page (/areas-we-serve)
  → All 9 Region Pages
    → All 131 Community Pages
      → 3–5 Nearest Community Pages (bidirectional)
      → 4–6 Service Pages
      → 1 Region Page (parent)
      → Hub Page (via breadcrumb)
```

Every community page receives links from:
1. Its parent Region Page
2. The Hub Page (if it's a featured community)
3. 3–5 nearest community pages

Every community page sends links to:
1. Its parent Region Page (breadcrumb)
2. The Hub Page (breadcrumb)
3. 3–5 nearest community pages
4. 4–6 service pages

This creates a geographic link web. Every page in the system is connected to every other page through at most 3 hops. PageRank flows throughout the entire structure.

### 11.2 Nearest Communities Logic

The `getNearestCommunities()` function in `service-areas.ts` calculates distance using coordinates and returns the 5 nearest communities. These become the "Also Serving" cards at the bottom of every community page.

Priority rule: prefer communities in the same region. Cross-region links are allowed but capped at 2 per page.

### 11.3 Service Page ↔ Community Page Cross-Linking

Service pages (e.g., `/services/drywall-installation`) include an "Areas We Serve" section that links to the top 6 community pages relevant to that service. Community pages link back to service pages in their "Services In This Community" grid.

This two-way cross-link between service pages and community pages creates a dense authority mesh that reinforces both geographic and service-topic relevance.

---

## 12. SEO Technical Requirements

### 12.1 Page Speed

All community pages must score 90+ on Google PageSpeed Insights mobile. Because there are potentially 131+ pages per site, any performance issue compounds.

Requirements:
- Images: WebP format, lazy-loaded, max 120kb per image
- Fonts: subset to characters used, max 2 font files
- No render-blocking scripts on community pages
- Static generation (SSG) for all community pages — not server-rendered

### 12.2 Static Generation Strategy

Community pages are pre-built at deploy time, not rendered on request. This means:
- Zero server latency on load
- Fully crawlable HTML — Google sees all content without JavaScript execution
- Can be cached on CDN (Cloudflare, Vercel Edge)

Implementation: Vite SSG or Next.js `getStaticPaths` / `generateStaticParams` for all community slugs.

### 12.3 XML Sitemap

A dedicated sitemap for the Areas We Serve section:
```xml
<urlset>
  <url>
    <loc>https://[domain]/areas-we-serve</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://[domain]/areas-we-serve/cochrane</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://[domain]/areas-we-serve/cochrane/riversong</loc>
    <priority>0.7</priority>
  </url>
  <!-- repeat for all 131 communities -->
</urlset>
```

### 12.4 Canonical Tags

Every community page includes a self-referencing canonical to prevent duplication signals if the same community appears across multiple route paths.

### 12.5 Image Alt Text SEO Pattern

All images on community pages use:
```
alt="[Service] project in [Community Name], [City], Alberta — [Brand Name]"
```

Example: `alt="Drywall installation in Riversong, Cochrane, Alberta — Cochrane Drywall Masters"`

---

## 13. Community Page Content Generation Strategy

### 13.1 Sourcing Content From communities_master_v3

The communities_master_v3 spreadsheet contains 131 community entries with rich SEO descriptions. The content generation strategy is:

1. **Use the spreadsheet description as the geographic intelligence layer** — Do not summarize or rewrite. Use the character, landmarks, price ranges, property types, and key phrases verbatim or very close to verbatim.

2. **Inject the service brand layer on top** — After the geographic prose, weave in service-specific content using the `serviceBlocks.config.ts` template.

3. **Add the street-level layer separately** — Research and write the streets paragraph for each community as a distinct content block.

4. **Write FAQs fresh per community** — Do not template FAQ answers too heavily. Each FAQ answer should mention the community name and service type naturally.

### 13.2 Content Minimum Per Community Page

| Element | Minimum Word Count |
|---|---|
| About This Community (geographic) | 200 words |
| Service connection paragraph | 80 words |
| Streets and landmarks paragraph | 100 words |
| Services grid descriptions | 30 words × 4 services = 120 words |
| FAQ answers | 60 words × 4 questions = 240 words |
| CTA copy | 30 words |
| **Total per page** | **~770 words minimum** |

This is enough for Google to consider the page substantive. Target 900–1,100 words for top-tier communities.

### 13.3 Content Uniqueness Rules

- No two community pages may share the same opening paragraph
- The service connection paragraph template may be shared, but must include the community-specific property type reference
- Streets paragraphs are always unique (they name different streets)
- FAQ questions follow the same pattern but answers must name the specific community

---

## 14. Implementation Roadmap

### Phase 1 — Foundation (Build first)

1. Create the `communities.config.ts` file with all 131 communities fully populated from communities_master_v3
2. Build the Hub Page (`/areas-we-serve`) with region grid and featured community spotlights
3. Build the Region Page template (`/areas-we-serve/{region}`) — one template, 9 instances
4. Build the Community Page template (`/areas-we-serve/{region}/{community}`) — one template, 131 instances
5. Wire up static generation for all community slugs
6. Add all schema markup (LocalBusiness, BreadcrumbList, FAQPage, Service)
7. Generate XML sitemap for all areas pages

### Phase 2 — Content Depth (Fill in after structure is live)

8. Write all community page descriptions using communities_master_v3 data
9. Research and add street names for all Tier 1 communities (Cochrane + top Calgary areas)
10. Research and add street names for all Tier 2 communities (Springbank + Bow Valley)
11. Write all FAQ blocks per community
12. Add community photos or regional landscape photos to each page

### Phase 3 — Internal Linking Activation

13. Implement `getNearestCommunities()` function and render "Also Serving" cards on all community pages
14. Add "Areas We Serve" grid to all service pages with links to relevant community pages
15. Add "Services In This Community" grid to all community pages with links to relevant service pages
16. Run internal link audit — confirm every community page has at minimum 5 inbound links and 8 outbound links

### Phase 4 — Cross-Site Deployment

17. Extract all brand-specific config into `brand.config.ts` and `serviceBlocks.config.ts`
18. Test community page rendering across 3 different brand configs (Drywall, Tile, Insulation)
19. Confirm URL structure is consistent across all sub-sites
20. Deploy across all 150 VeePo sites

### Phase 5 — Ongoing Optimization

21. Monthly: Update community pages with actual street names from completed projects
22. Quarterly: Add new testimonials with community name references
23. Quarterly: Add new FAQ entries based on actual customer questions
24. Annually: Review all 131 community descriptions for freshness
25. Ongoing: Track rankings per community × service combination and escalate depth for lagging pages

---

## 15. Community Tier Classification

### Tier 1 — Primary SEO Priority (build and populate first)

These communities have the highest search volume, highest home values, and most direct proximity to Cochrane. Full content depth: 900–1,100 words, 8–12 streets, 5+ landmarks.

- Cochrane (all sub-communities): Heritage Hills, Sunset Ridge, Riversong, GlenEagles, Heartland, West Terrace & West Pointe, Cochrane Heights, Glenbow, East End & Downtown Cochrane, Fireside
- Bearspaw (including Watermark)
- Elbow Valley (and all sub-communities)
- Springbank Hill
- Aspen Woods
- Bragg Creek & Redwood Meadows
- CottageClub at Ghost Lake

### Tier 2 — Secondary SEO Priority

Substantial content: 700–900 words, 4–8 streets, 3+ landmarks.

- All Springbank micro-communities (Aventerra Estates, Devonian Ridge, Silverhorn, Morning Vista Estates, Pinnacle Ridge, Swift Creek Estates, etc.)
- Calgary Southwest inner communities (Altadore, Discovery Ridge, Eagle Ridge, Elbow Park, Signal Hill)
- Calgary Northwest (Arbour Lake, Cougar Ridge, Crestmont)
- Canmore area (Three Sisters, Silvertip, Benchlands, Eagle Terrace)
- Heritage Pointe

### Tier 3 — Long-Tail Capture

Lean content: 500–700 words, 2–4 streets, 1–2 landmarks. Still fully published — captures zero-competition niche queries.

- Small Bow Valley hamlets: Exshaw, Lac des Arcs, Harvie Heights, Dead Man's Flats
- Small Springbank enclaves: Crocus Ridge, Idlewind, Panorama, Springland, Vantage Ridge
- Ghost Lake area: Ghost Lake Village, Waiparous Village
- Calgary inner-city: Beltline, Inglewood, Shaganappi, Seton

---

## 16. The "Areas We Serve" Section Across All 150 Websites

### 16.1 What Stays The Same

- All 131 community data entries
- URL architecture
- Component structure
- Schema markup patterns
- Internal linking logic
- FAQ format

### 16.2 What Is Brand-Specific

Each of the 150 sites specifies:
- Which communities they serve (a subset, or all 131)
- What service they offer in each community
- Their brand name and contact details
- Their service-specific FAQ answers
- Their service-specific copy blocks

Example: Cochrane Insulation Masters may only serve Cochrane + Rocky View County (not inner Calgary). Their `servedCommunities` array is a filtered subset. Their community pages only render for those communities.

### 16.3 The Compound Advantage

After Phase 4 (cross-site deployment), the VeePo ecosystem will have:
- 150 sites
- Each with up to 131 community pages
- Each community page unique by trade
- Each answering a specific "[Trade] in [Community]" query
- All internally linked within each site
- All backed by LocalBusiness schema with unique addresses/phones

No competitor is building this. No contractor in Cochrane, Springbank, or the Bow Valley is doing this at scale. The first mover builds an SEO moat that compounds every month Google crawls these pages.

---

## 17. KPIs and Success Metrics

### 17.1 Technical KPIs (track from day 1)

- Total community pages indexed: target 131 within 60 days of launch
- Average PageSpeed score: target 90+ on all community pages
- Sitemap submission and crawl coverage: 100%
- Internal link density: minimum 5 inbound links per community page

### 17.2 SEO KPIs (track monthly)

- Organic impressions for "[Service] [Community]" queries: set baseline at launch
- Average position for community-level keywords: target top 3 within 90 days
- Click-through rate on community pages: target 4%+
- Number of community pages ranking in top 10: monthly growth curve

### 17.3 Business KPIs (track per community)

- Leads attributed to community pages (CRM UTM tagging required)
- Community × service combination with highest lead volume → escalate content depth
- Customer inquiries that mention community name → validate pages are working

---

## Appendix A — Region-to-Community Mapping

| Region | Communities |
|---|---|
| Cochrane | Heritage Hills, Sunset Ridge, Riversong, GlenEagles, Heartland, West Terrace, West Pointe, Cochrane Heights, Glenbow, East End, Downtown Cochrane |
| Rocky View County | Bearspaw, Watermark, Silverhorn, Heritage Pointe |
| Springbank | Aventerra, Aventerra Estates, Crocus Ridge, Devonian Ridge Estates, Escarpment, Gracewood, Grandview Park, Hillcrest, Idlewind, Livingstone, Lott Creek, Mackenas Country Estates, Mogan's Rise, Morning Vista, Morning Vista Estates, Mountain Pine Estates, Panorama, Partridge, Pinnacle Ridge, Pradera Springs, River Ridge Estates, Riverfront Estates, Rodeo Ridge, Rosewood Estates, Spring Shire, Spring View Estates, Springbank Creek, Springbank Heights, Springbank Links, Springbank Meadows, Springland, Sterling Springs, Swift Creek Estates, Uplands, Vantage Ridge, Villosa Ridge, Westbluff, Westview, Windhorse Manor, Alandale Estates |
| Elbow Valley | Braemar Ranch/Estates, Clearwater Estates, Elbow Ridge, Elbow River Estates, Elbow Valley West, Lott Creek Estates, Stone Pine, Stonepine, Swift Creek Villas, West Meadows, Elbow Valley (core) |
| Calgary Southwest | Altadore (Marda Loop), Aspen Woods, Bel-Aire, Beltline, Britannia, Cougar Ridge, Discovery Ridge, Eagle Ridge, Elbow Park, Elboya, Inglewood, Lake Bonavista, Lake Bonavista Estates, Parkhill, Patterson, Pump Hill, Roxboro, Shaganappi, Signal Hill, Springbank Hill, Strathcona Park, Upper Mount Royal, West Springs |
| Calgary Northwest | Arbour Lake, Crestmont, Crestmont View, Livingston, Rockland Park |
| Calgary Southeast | Auburn Bay, Cranston, Mahogany, Seton |
| Bow Valley | CottageClub at Ghost Lake, Dead Man's Flats, Exshaw, Ghost Lake Village, Harvie Heights, Lac des Arcs, Waiparous Village |
| Canmore & Area | Benchlands, Cougar Creek, Eagle Terrace, Larch, Peaks of Grassi, Quarry Pines, Rundleview, Silvertip Resort, Spring Creek Mountain Village, Three Sisters Mountain Village |

---

## Appendix B — SEO Quick Reference Per Community Page

| Checklist Item | Required | Notes |
|---|---|---|
| Unique H1 with service + community + city | ✅ | Never generic |
| Community name in first 100 words of body | ✅ | |
| Service type in first 100 words of body | ✅ | |
| Named streets (minimum by tier) | ✅ | Prose, not list |
| Named landmarks (minimum 3) | ✅ | Golf, parks, schools, highways |
| Highway/distance reference | ✅ | "X min from Cochrane" |
| LocalBusiness schema | ✅ | |
| BreadcrumbList schema | ✅ | |
| FAQPage schema | ✅ | Min 4 questions |
| Service schema with areaServed | ✅ | |
| Internal links to 3–5 nearby communities | ✅ | |
| Internal links to 4–6 service pages | ✅ | |
| Link back to region page | ✅ | Via breadcrumb + body |
| Link to hub page | ✅ | Via breadcrumb |
| Community-specific CTA | ✅ | Names the community |
| Image alt text with community + service | ✅ | |
| Canonical tag (self-referencing) | ✅ | |
| Page in XML sitemap | ✅ | |
| Static generation (SSG) | ✅ | No server render |
| Mobile score 90+ | ✅ | |

---

**End of Areas We Serve SEO Architecture Design Plan**  
*This document governs the geographic SEO infrastructure for all 150 VeePo Master Builder sub-sites.*
