# SEO PLAYBOOK — How every Masters sub-service site ranks

> SEO is the moat. Every step in this playbook is **P0** unless tagged otherwise. If a step here conflicts with anything else, this wins.

---

## 1. Keyword research (do this BEFORE writing copy)

For each service from Phase 1:

- **10 head terms** — short, high-intent (e.g. `roof replacement Cochrane`, `asphalt shingle roofer`)
- **30 long-tails** — question + qualifier shape (e.g. `cost of asphalt shingle roof replacement Cochrane`, `how long does roof replacement take`)
- **Mapped to one specific page** — don't have two pages chasing the same head term (cannibalization)

For each priority-1 area:

- **5 patterns** — `<service> in <area>`, `<service> <area> cost`, `<service> near <area>`, `<area> <service> contractor`, `best <service> <area>`

**Sources**: founder interview ("what do customers literally type into Google?"), competitor audit (Phase 1), Google "People also ask", Google autocomplete, Search Console (post-launch).

Output: `src/master/seo/keyword-map.<trade>.md` with every keyword → page mapping.

## 2. Per-page on-page SEO

For every page (home, services, areas, FAQ, about, story):

| Element | Rule |
|---|---|
| `<title>` | ≤60 chars, primary keyword in first half, brand at end. UNIQUE per page. |
| Meta description | ≤155 chars, benefit-led, includes city. UNIQUE per page. |
| H1 | Exactly ONE. Matches user intent. Includes primary keyword. |
| H2 / H3 | Semantic — no skipped levels (H1 → H3 = ❌). H2s map to sections. |
| Canonical | `<link rel="canonical">` absolute URL pointing to self. |
| OG tags | Per-page `og:title`, `og:description`, `og:image` (not just home). |
| Twitter cards | Per-page `twitter:title`, `twitter:description`, `twitter:image`. |
| Internal links | ≥3 to other pages on this site. |
| Sister-site link | ≥1 from footer or sidebar widget. |

Verified by codebase scan in Phase 6.

## 3. Schema / JSON-LD per page type

### Home
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "<Trade name>",
  "image": "<OG image absolute URL>",
  "url": "<site URL>",
  "telephone": "<E.164>",
  "address": { "@type": "PostalAddress", "streetAddress": "...", "addressLocality": "...", "addressRegion": "...", "postalCode": "...", "addressCountry": "CA" },
  "geo": { "@type": "GeoCoordinates", "latitude": 51.1894, "longitude": -114.4669 },
  "openingHoursSpecification": [...],
  "priceRange": "$$",
  "areaServed": [...],
  "sameAs": ["<GBP URL>", "<Yelp URL>", ...]
}
```
Plus `Organization` + `WebSite` (with `potentialAction` SearchAction if site search exists).

### Service page (`/services/<slug>`)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "<Service>",
  "provider": { "@type": "LocalBusiness", "name": "..." },
  "areaServed": [...],
  "serviceType": "<Service>",
  "description": "<150–300 words>",
  "offers": { "@type": "Offer", "priceRange": "$$$" }
}
```
Plus `BreadcrumbList` + `FAQPage` (top 5 FAQs from the page).

### Area page (`/areas/<slug>`)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "<Trade> in <Area>",
  "areaServed": { "@type": "Place", "name": "<Area>" },
  ...
}
```
Plus `BreadcrumbList`.

### FAQ page
`FAQPage` with all ≥20 Q&A entities.

### About
`AboutPage` referencing the `LocalBusiness`.

**Validate every page** with [Google Rich Results Test](https://search.google.com/test/rich-results) before launch.

## 4. The service-area network (the actual moat)

Every area in the Phase 1 spreadsheet gets its own page at `/areas/<slug>`:

- H1: `<Trade> in <Area>`
- **Unique 80–150-word intro** referencing real local landmarks/neighborhoods (NEVER duplicated across pages — n-gram diff in Phase 6)
- Mentions area name 3–5x naturally
- Lists 3–5 real neighborhoods within the area
- Embeds Google Map centered on the area
- Lists services we provide in this area (chips → /services/<slug>)
- Links to 3 nearest areas (next/prev pattern)
- Links to 3–5 sister sites from the backlink map
- LocalBusiness JSON-LD with `areaServed` set to THIS area (not the catch-all)

Math: ~100 areas × ~10 sister sites ≈ 1,000 unique localized pages per network — ranks across hundreds of long-tail "service + area" queries.

## 5. Internal linking matrix

Every site renders these "related" widgets:

- On `/services/<slug>` → 2 sibling services (drives engagement, distributes PageRank)
- On `/services/<slug>` → top 3 areas (drives "service in area" rankings)
- On `/areas/<slug>` → 3 nearest areas
- On `/areas/<slug>` → all services we offer in this area
- Footer → all top-level pages

Build the matrix as a table in `src/master/seo/internal-linking.<trade>.md` before wiring components.

## 6. Sister-site cross-linking

Per Phase 1 backlink map. The `<SisterSites />` component renders in:

- Footer of every page
- Body widget on every area page

Anchor text follows the approved variants — never "click here", never "more info". Update `src/master/trades.ts` with this site's URL once live so sister sites pick it up on next deploy.

## 7. External backlink targets (do within 7 days of launch)

Submission checklist (P1):

1. Google Business Profile (P0 — see §10)
2. Yelp
3. BBB
4. HomeStars
5. Houzz
6. Trade-specific directory (e.g. RCABC for roofing in BC)
7. Local Chamber of Commerce
8. Better Business Bureau Canada
9. Provincial trade association
10. One industry-relevant Reddit / forum profile (no spam — real participation)

## 8. sitemap.xml + robots.txt

- `sitemap.xml` includes EVERY page + every service + every area, with accurate `<lastmod>`. Generated at build time from the route manifest + `SERVICE_AREAS`. Don't hand-edit — it gets overwritten.
- `robots.txt` allows all by default, disallows `/brand` and any internal `/admin` routes, references the sitemap.
- Submitted to Google Search Console + Bing Webmaster in Phase 9.

## 9. NAP consistency

Name / Address / Phone must be **byte-identical** across:

- Site footer
- Contact page
- LocalBusiness JSON-LD
- Google Business Profile
- Every directory listing

"Suite 5" vs "#5" vs "Unit 5" counts as drift and hurts local rankings.

## 10. Google Business Profile

Claim and verify within 24 hours of launch. Configure:

- Primary category (most specific available)
- Secondary categories (up to 9, all relevant)
- Services (every service from Phase 1)
- Hours (matches site)
- ≥10 photos of real work
- Q&A seeded with 5 entries (you can answer your own)
- Posts: weekly for the first month
- Reviews: ask first 5 customers within 30 days

## 11. Search Console + Bing Webmaster

- Add property (domain or URL prefix)
- Verify ownership
- Submit sitemap
- Enable Core Web Vitals + Index Coverage reports
- Request indexing on top 5 commercial pages (home + 4 top services)
- Same in Bing (often imports from GSC in one click — free traffic)

## 12. Core Web Vitals (CWV is a ranking factor)

- LCP < 2.5s on mobile
- INP < 200ms
- CLS < 0.1

Lighthouse mobile ≥ 90 on Performance + SEO. See `PERFORMANCE_PLAYBOOK.md` for techniques.

## 13. E-E-A-T signals (rendered, not buried)

- License # + insurance # + WCB # in footer
- Founder bio with photo of WORK (not face) on /about
- Years-in-business stated
- Real customer testimonials with name + city
- Photos of real completed work in real jurisdictions
- Warranty page exists, linked from footer
- HTTPS, no mixed content
- Privacy + Terms linked from footer

---

## What NOT to do

- ❌ Keyword stuff: "Cochrane drywall Cochrane drywall installer Cochrane" → penalty
- ❌ Duplicate paragraphs across sister sites → duplicate-content filter
- ❌ Same OG image across sister sites → looks spammy
- ❌ Ship without an area page for every area → orphaned schema
- ❌ Hide license # only on /terms → E-E-A-T miss
- ❌ Use stock photos of strangers → master rule + AI image rule
- ❌ Buy backlinks from PBNs → manual penalty risk
- ❌ Forget to update `src/master/trades.ts` with the live URL → sister network never links back

---

## Sign-off

Phase 6 signs off when:

1. Every page has unique title + meta + H1 (scan-verified)
2. Every page emits the right JSON-LD (Rich Results Test green)
3. Every Phase 1 area has a unique-intro page
4. Internal linking matrix matches the rendered widgets
5. NAP audit shows zero drift
6. CWV pass on mobile + desktop
7. GBP claimed, GSC + Bing verified, sitemap submitted
