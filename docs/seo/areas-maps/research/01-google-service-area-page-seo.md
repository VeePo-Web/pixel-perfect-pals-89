# Research 01 — World-Class SEO for "Areas We Serve" / Service-Area Pages

> Deep-research findings brief. Scope: the **on-site** location landing pages (not Google Business Profile itself). Sources current to 2025–2026. Cite inline like (BrightLocal 2025).

The on-site "Areas We Serve" system is the single highest-leverage local SEO asset for a service-area business (SAB) — and the easiest to get penalized. The entire discipline reduces to one tension: **each location page must be an independent ranking asset that is genuinely useful to a person in that town**, not a templated clone that exists only to rank.

## 1. Architecture that ranks: one URL per location, hub-and-spoke

The proven structure is a **two-to-three-level hub-and-spoke geo-hierarchy** (Whitespark 2025; RicketyRoo 2025):

- **Hub (index):** `/areas-we-serve/` — a directory that links to every primary city page (crawl/discovery layer, not a ranking target).
- **Region/city spoke:** `/areas-we-serve/[region]/[city]/` — the primary ranking target.
- **Neighborhood spoke:** `/areas-we-serve/[region]/[city]/[neighborhood]/` — built **only** after the city hub is complete and ranking.

**URL rules:** lowercase, hyphenated, descriptive slugs — never query parameters (`?location=cochrane` is not crawled as a separate page), ≤3 levels deep, city name in the URL (BrightLocal 2025).

**Internal linking pyramid** (the authority-distribution mechanism — spokes don't rank without it): homepage + primary service pages link to the hub; the hub links to all city pages; each city page links to its neighborhood spokes; neighborhood spokes link back up via breadcrumb; and **adjacent city pages cross-link** ("we also serve…"). Descriptive anchor text, never "click here."

## 2. The thin-content / doorway penalty — the minimum bar

This is the make-or-break risk. Google's **doorway abuse** policy explicitly names the SAB failure mode: *"Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page"* (Google Search Central, Spam Policies). The **scaled content abuse** policy targets *"many pages…generated for the primary purpose of manipulating search rankings and not helping users"* and flags *"cookie-cutter sites or templates with the same or similar content replicated within the same site."* The March 2024 + December 2024 + August 2025 spam/core updates enforced this aggressively against city-page farms (GSQI 2024; SearchX 2025).

**The minimum bar to survive:**
- **40–60% of page content must be unique to that location** — the safe threshold to justify the URL (BrightLocal 2025). A find-and-replace page (only the city name changes) is a doorway page by definition.
- Differentiate via **two distinct levers** (Sterling Sky / Joy Hawkins): **personalization** (content obviously written by someone who knows the area) and **uniqueness** (content that differs page to page).
- Assemble **multiple local-specificity signals** per page (see §4). A page that can't clear *"Would a homeowner in this city find this truly helpful?"* should not be published.
- **Don't build a page for every city.** Build pages only for cities where you can compete / generate revenue. Over-expansion into every neighborhood is the #1 doorway trigger.

## 3. On-page elements that move rankings

- **Title (50–60 chars):** `[Service] in [City], [State] | [Brand]` with a unique highlight. Winning pattern: *"Dependable Plumbing Services in Eugene, OR | 24-Hour Emergency Help"* (Search Engine Land 2025).
- **One H1:** `[Service] in [City] – [differentiator]`.
- **Meta description (150–160):** action-oriented, city + specific services + CTA + phone.
- **Semantic HTML:** one `<h1>`, logical heading hierarchy, `<address>`, embedded map of the service radius.
- **Image SEO:** geo-descriptive filenames (`hvac-repair-pensacola.webp`), descriptive alt text, real local job-site / before-after photos (not stock).
- **NAP consistency:** identical name + phone across every page, GBP, and citations. For SABs **do not publish a customer-facing address** if clients don't visit — use the city name + phone instead.
- **Embedded reviews** from customers **in that specific city**, with `Review`/`AggregateRating` markup.

**Schema (JSON-LD):** `LocalBusiness` (or subtype) + `Service` with `areaServed` scoped to that city/region, plus `BreadcrumbList` and `FAQPage`. For SABs, omit `streetAddress` and use `areaServed` (City/State/GeoShape). Structured data is now also how AI Overviews, ChatGPT Search, and Perplexity identify a business for "[service] in [city]" queries.

## 4. Localized content depth — what actually wins

Word count is **not** the lever; local specificity is. The winning ingredients (BrightLocal 2025; Sterling Sky):

- **First-party data:** your own pricing ranges, job-cost data, response times for that area.
- **Local conditions tied to the service:** climate/geology that affects the work (Memphis galvanized pipes; chinook freeze-thaw cycles).
- **Local regulations / permit notes** specific to that municipality.
- **Named local project references** (a subdivision or street you worked on).
- **Local landmarks, neighborhoods, events, Chamber/charity ties**, employee residency.
- **Local testimonials + local FAQ** (at least one question only that town would ask), with `FAQPage` schema.
- **Staff/expertise** (bios, photos, certs).

Proof it works: an optimized SAP rebuild took **Minars Dermatology from 35 → 1,350 daily clicks and 670 → 1,920 monthly leads** (BrightLocal case study).

## 5. Crawl, discovery & scale without bloat

- **XML sitemap:** include only live, indexable city pages. **Never list a `noindex` page in the sitemap** — the conflicting signal makes Google distrust the whole sitemap. Regenerate at build time.
- **HTML "All Areas We Serve" directory** for crawl paths and internal links.
- **`noindex` decision:** ultra-thin pages you must keep for users (tiny communities) should be `noindexed` until they clear the 40–60% uniqueness bar — far safer than letting hundreds of thin pages drag domain quality down. Build major-revenue cities first.
- **Freshness:** rotate reviews, offers, PR, and `dateModified`.

## 6. Common mistakes that tank service-area pages

1. **Find-and-replace clones** (only the city name changes) → doorway/thin penalty.
2. **Building a page for every neighborhood at once** before the city hub ranks → scaled-content trigger.
3. **City-name keyword stuffing.**
4. **One "Areas We Serve" list page** trying to rank for all cities — a list is not an architecture.
5. **Publishing a fake address** for an SAB → guideline violation.
6. **Orphan pages** (no internal links in) → zero authority.
7. **Inconsistent NAP or schema across pages.**
8. **`noindex` pages left in the sitemap** → sitemap distrust.

## Sources

- Google Search Central — Spam Policies: https://developers.google.com/search/docs/essentials/spam-policies
- Sterling Sky — Unique & Helpful Service Area Pages: https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/
- BrightLocal — Service Area Page SEO: https://www.brightlocal.com/learn/service-area-pages/
- BrightLocal — Unique & Helpful Location Pages: https://www.brightlocal.com/learn/location-pages/
- Whitespark — Perfect Service Area Landing Page: https://whitespark.ca/guides/guide-to-the-perfect-service-area-landing-page/
- Search Engine Land — Service Area Pages guide: https://searchengineland.com/guide/service-area-pages
- GSQI (Glenn Gabe) — Dec 2024 Spam Update case studies: https://www.gsqi.com/marketing-blog/google-december-2024-spam-update-case-studies/
- SearchX — How Google Detects Content Spam in 2025: https://searchxpro.com/how-google-detects-content-spam-in-2025/
- RicketyRoo — Hub and Spoke SEO Model: https://ricketyroo.com/blog/the-importance-of-hub-and-spoke-content-models/
- Sitebulb — Technical SEO for Local Businesses: https://sitebulb.com/resources/guides/technical-seo-considerations-for-local-businesses-and-local-rankings/
- schema.org — LocalBusiness / areaServed / Service
- AuthorityNW — SAB Schema & GBP Setup: https://authoritynw.com/blog/service-area-businesses-gmb-schema-setup/
