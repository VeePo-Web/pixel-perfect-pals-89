# New Brunswick — Areas We Serve Build Report & Final Audit

> Mode-B (no spreadsheet) programmatic location-page build for **New Brunswick**, generated July 2026 by
> the Universal Location-Page Architect run. Services stay niche-agnostic `{TOKENS}`; every place fact is
> real and grounded. This is the auditable record of the run: what was enumerated, what was built, what
> was deferred and why, and the full defect sweep.
>
> **Update (completeness audit):** the enumeration was later cross-validated against a second independent
> gazetteer (GeoNames) and a **neighbourhood tier** was added. The definitive INTENDED set is now
> **2,391 places**, with **73 place pages built** (66 locations + 7 neighbourhoods) and **81 total URLs**.
> See [`COVERAGE-AUDIT.md`](COVERAGE-AUDIT.md) for the full two-source reconciliation. Numbers below reflect
> the original 66-location run; the coverage audit supersedes the totals.

## 1. Mode & grounding sources

**Mode B** — no NB master SEO spreadsheet exists in the source zips, so every place was enumerated and
grounded from authoritative open data (all OGL-Canada / public domain, no proprietary postal data):

| Source | Used for | License |
|---|---|---|
| StatCan 2021 Census, table 98-10-0002 | Every census subdivision (CSD): 2021 & 2016 population, dwellings, occupied dwellings, land area, density | OGL-Canada |
| StatCan 2021 Geographic Attribute File (92-151-X) | Authoritative CSD legal type (City/Town/Village/Rural Community/Regional Municipality/Parish/Reserve) + CMA/MIZ + representative coordinates | OGL-Canada |
| NRCan Canadian Geographical Names (CGN), NB CSV | Place coordinates + sub-CSD community enumeration (populated places) | OGL-Canada |

FSA-only policy honoured (no 6-char postal codes). OGL-Canada attribution appears in every page footer.

## 2. Enumeration → scoring → gate

**Unified score** (identical formula to the Nova Scotia pilot, hubs swapped to Moncton + Saint John):

```
SEO_Priority_Score (0–100) =
  Population 30  : min(30, log10(pop)/log10(2,794,356)*30)
  Search Vol 25  : population bands (100k→24 … <200→1)
  Competition 20 : INVERSE population bands (100k→4 … <1k→18)
  Proximity 15   : max((1 − min(km to nearer of Moncton/Saint John)/500)*15, 0)   # haversine
  Economic 10    : legal type (City/Regional Muni→8 · Town/Rural Community→5 · Village→3 · else→1)
```

**Publish gate:** BUILD = legal municipality **AND** score ≥ 50 **AND** real 2021 census population **AND**
real coordinates **AND** ≥4 local signals **AND** ≥1 info-gain element. Everything else is DEFERRED
(noindex / kept out of sitemap) — the doorway-penalty firewall.

## 3. Coverage reconciliation (INTENDED = BUILT + DEFERRED)

**INTENDED = 2,225 places** (266 census subdivisions + 1,959 CGN sub-CSD communities).
Every place lands in exactly one bucket.

| Bucket | Count | |
|---|---:|---|
| **BUILT** (published pages) | **66** | 8 City · 25 Town · 24 Village · 8 Rural Community · 1 Regional Municipality |
| DEFERRED — parishes | 142 | Parish = administrative geography that name-clashes with its municipality → cannibalization risk; covered by the municipal pages |
| DEFERRED — First Nations reserves | 20 | Not an appropriate third-party service-landing-page target; excluded by policy |
| DEFERRED — municipalities scoring < 50 | 38 | Below the publish threshold (37 villages + 1 town, Saint-Léonard 49.9) — expansion candidates for a later tier |
| DEFERRED — CGN communities (no census population) | 1,959 | Localities/dispersed rural communities with no standalone census population → fail the real-population gate; candidate neighbourhood pages only where real signals emerge |
| **DEFERRED total** | **2,159** | listed row-by-row in `data/nb_master_locations.csv` + `data/nb_communities_deferred.csv` |

BUILT score range: **50.0 – 72.7** (Moncton 72.7 · Saint John 72.5 · Dieppe 70.5 · Fredericton 69.7 …).

## 4. Page set (74 URLs)

- **1 hub** — `/areas` (province index, links all 7 regions + busiest areas)
- **7 region pages** — `/areas/region/{slug}`: greater-moncton-southeast (18 communities) · fundy-saint-john (14) ·
  capital-river-valley (15) · northwest-madawaska (4) · restigouche-chaleur (4) · miramichi-river (4) ·
  acadian-peninsula-chaleur (7)
- **66 location pages** — `/areas/{slug}`, full §6 anatomy: breadcrumb · hero · answer-first snippet ·
  entity description · 400–600w deep local body · local-facts widget · tokenized services grid ·
  info-gain proof block · 5 answer-first FAQs · map facade · nearby-areas backlinks · blog backlinks ·
  reviews slot · honest "Updated July 2026" · JSON-LD @graph (Service + areaServed + GeoCircle in metres,
  WebPage + speakable, BreadcrumbList, FAQPage, ImageObject).

7 regions map to the 15 NB counties; region assignment is by county. Slugs are ASCII-folded, deduped, frozen.

## 5. Defect sweep (automated, whole set) — all zero

| Check | Count |
|---|---:|
| Duplicate slugs | 0 |
| `{{double-curly}}` defects | 0 |
| Duplicate image-alt strings | 0 |
| Orphan pages (no inbound link) | 0 |
| Pages sharing a primary keyword | 0 |
| Missing `{PHONE}` CTAs (need 3/page) | 0 |
| Missing region up-link | 0 |
| Nearby-area links below 3 | 0 |
| Blog links below 2 | 0 |
| JSON-LD parse errors | 0 |
| FAQPage under 4 Q&A | 0 |
| `geoRadius` not in metres | 0 |
| `dateModified` ≠ 2026-07-10 | 0 |
| Word-count flags (snippet/body) | 0 |
| Missing OGL-Canada footer | 0 |
| Multiple / missing H1 | 0 |
| SEO title > 60 after fill | 0 |
| Duplicate About-openers between siblings | 0 |
| Missing image-tier record | 0 |

The only remaining cross-page string match is the navigational **"Part of our [Region] service region"**
UP-backlink line (a §7-required structured internal link, not body content) on some pages — permitted.

## 6. Images

All 74 pages use the **flag tier** of the fallback chain (no verified copyright-free per-place photo was
grounded during the run). Per the fallback rule, **all** image metadata — filename, two-layer alt, caption,
EXIF geo-tag, `ImageObject` — describes the **place/region**, never the flag. Filenames follow
`{place-slug}-{region-slug}-nb.webp`. Full per-image record in `data/image-manifest.csv`. Upgrade path:
swap in verified CC0/Unsplash/CC-BY place photos and bump the tier; alt strings are already place-accurate.

## 7. Static-render / crawler readiness

- Every BUILT URL is in `data/sitemap-areas.xml` with honest `<lastmod>` and score-derived `<priority>`.
- `data/robots-additions.txt` allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot,
  PerplexityBot, ClaudeBot, Google-Extended.
- All body copy + all JSON-LD are in the static markup (no JS-injected content); the map is a click-to-load
  facade. Business copy is 100% single-curly `{TOKENS}`; resolve one `nicheConfig` to rebrand for any trade.

## 8. Files in this directory

```
PAGE-SPEC.md            binding per-page contract used for the build
BUILD-REPORT.md         this report
pages/*.md              66 location pages
pages/regions/*.md      7 region pages
pages/areas-hub.md      province hub page
data/nb_master_locations.csv    266 CSDs: geo + scores + BUILT/DEFERRED + reasons + nearby links
data/nb_communities_deferred.csv 1,959 CGN communities, deferred with reasons
data/image-manifest.csv          74 images: tier, filename, two-layer alts, EXIF, license
data/sitemap-areas.xml           74-URL sitemap (tokenized {BRAND_URL})
data/robots-additions.txt        crawler allow-list snippet
```

*Grounded in StatCan 2021 Census (98-10-0002), StatCan GAF (92-151-X), and NRCan CGN — all OGL-Canada.
Contains information licensed under the Open Government Licence – Canada.*
