# Alberta Blog Engine — Hub-and-Spoke Topic Matrix (Phase 3)

> Companion to `alberta-publishable-tier-v1.json` (95 hub location pages, 10 region pages).
> Blogs own **informational** intent only; the area pages own `{SERVICE} {LOCATION}` transactional
> intent. Every spoke links DOWN to its hub area page with a contextual geo-anchor; every area page
> links to 2–4 of its spokes (already encoded per row in `Blog_Links`). No orphans.

## 1. The matrix formula (encode once — do not pre-expand)

```
spoke = {content-type} × {SERVICE_SLUG} × {location | region}
```

| # | Content type | Scope | Slug pattern | Notes |
|---|---|---|---|---|
| ① | Cost / price guide (2026) | per location (top tier first) | `/blog/{SERVICE_SLUG}-cost-{location-slug}-2026` | #1 AI-citation magnet. Real `{PRICE_RANGE}` figure in the first paragraph. Year in title. |
| ② | How to choose a {SERVICE} provider | per location | `/blog/choose-{SERVICE_SLUG}-{location-slug}` | Even-handed buyer's guide, NOT a self-listicle. |
| ③ | Permit / bylaw guide | per municipality, ONLY where a real bylaw/permit fact is grounded | `/blog/{SERVICE_SLUG}-permits-{location-slug}` | Requires a verified municipal code reference — `{DATA_POINT_TODO}` gate; start with the 20 cities. |
| ④ | Seasonal / timing guide | **per REGION** (never per city — anti-clone) | `/blog/{SERVICE_SLUG}-seasonal-guide-{region-slug}` | 10 region guides total; grounded in the region fact bundles (chinook belt, hail alley, boreal freeze…). |
| ⑤ | Neighbourhood / landmark guide | flagship cities only (Calgary, Edmonton, Red Deer, Lethbridge) | `/blog/{SERVICE_SLUG}-{neighbourhood-slug}-guide` | Only where real neighbourhood signals exist. |
| ⑥ | Local project case study | wherever a real project exists | `/blog/{SERVICE_SLUG}-project-{location-slug}` | First-party photos + named street; per-business, post-launch. |
| ⑦ | Problem/symptom diagnostic · comparison table · FAQ roundup | per region | `/blog/{topic}-{region-slug}` | Fills the cluster after ①–④. |

**Rollout order (depth over coverage):** ④ the 10 region seasonal guides → ①+② for the top-20
locations → ③ permits for the 20 cities (verified bylaws only) → expand down the score ladder.
**Cadence:** generate in batches but drip-publish ~one/day via `publishDate`; `dateModified` only on
real edits.

## 2. The 10 region seasonal guides (spoke ④ — write these first)

| Region | Hook the guide is grounded in (from the region fact bundle) |
|---|---|
| Calgary Region | Chinook freeze-thaw swings + Canada's hailstorm alley |
| Edmonton Region | Deep frost, snow load, -30 to -40°C snaps, Industrial Heartland corridor |
| Central Alberta | Parkland freeze-thaw shoulders, QE2 corridor access, hail-bearing storms |
| Southern Alberta | Chinook belt wind (Lethbridge/Pincher Creek), irrigation-season timing |
| Southeast Alberta | Palliser's Triangle sun/heat exposure, driest region |
| Canadian Rockies | Bow Valley snow loads + alpine UV; Yellowhead boreal winters |
| Northern Alberta | Boreal winters, wildfire season (Slave Lake 2011 rebuild lessons) |
| Peace Region | Northernmost grain belt: long daylight, short intense season |
| Wood Buffalo | Subarctic winters, post-2016 rebuild codes, fly-in workforce timing |
| Lakeland Region | Lake-country cottage seasonality, CFB Cold Lake tempo |

## 3. Anti-duplication hard gates (per spoke)

≥500 unique words · 30–40% differentiation vs sibling posts · ≥1 verifiable unique data point
(never fabricate — leave `{DATA_POINT_TODO}`) · ≥4-of-8 local signals · passes the
find-and-replace test · borderline posts ship `noindex` until they earn indexing.

**Answer-first/AEO:** 40–60w direct answer under each question H2 · 3–6 H2s (≥1 a real question) ·
3+ FAQs (≥1 geo-specific) · Grade 6–8 · lists/tables · year in title · title ≤60 · meta ≤160.

## 4. Frontmatter template (encode once)

```yaml
title: ""            # ≤60, year for cost guides
slug: ""             # per matrix above; freeze once indexed
description: ""      # ≤160, answer-first
publishDate: ""      # drip schedule
updatedDate: ""      # = visible "Updated {Month} {Year}" — bump only on real edits
author: { name: "{AUTHOR_NAME}", url: "{AUTHOR_URL}" }   # Person + ≥3 sameAs in schema
cluster: ""          # cost | choose | permits | seasonal | neighbourhood | case-study
hubPage: "/areas/{location-slug}"     # the DOWN link target
primaryKeyword: ""   # informational only — never "{SERVICE} {LOCATION}"
secondaryKeywords: []
schema: { type: "BlogPosting+FAQPage+BreadcrumbList+WebPage", faqPresent: true }
localSignals: []     # named real signals used
```

**Internal-link rule per spoke:** 3–5 contextual in-body links — ≥1 descriptive geo-anchor DOWN to
the hub area page, ≥1 UP to the region page, 2 to sibling spokes. Each area page already carries its
2–4 spoke links in `Blog_Links`.

## 5. Schema stack per post

`BlogPosting` (headline ≤60, `image`, ISO `datePublished`/`dateModified`, `author` Person + ≥3
`sameAs`, `publisher:{@id {BRAND_URL}#business}`, `about`) + `FAQPage` (matches visible Q&A verbatim)
+ `BreadcrumbList` (Home → Blog → headline) + `WebPage` (`speakable` on the answer block).
