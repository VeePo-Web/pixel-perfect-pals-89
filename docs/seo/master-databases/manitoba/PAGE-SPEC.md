# Manitoba Location Page — Rendered Output Spec

The anatomy of every rendered `pages/*.md` file. `WRITER-CONTRACT.md` governs the *authoring* JSON (input);
this governs the *rendered page* (output) an implementer wires into a site. One place → one URL → one page.

## 1. File & identity

- **Path**: `pages/<slug>.md` — `<slug>` is the URL slug, globally unique (disambiguated with `-rm` / `-cdNN`
  suffixes where a bare name collides).
- **URL**: locations at `/areas/<slug>`; the 8 regions at `/areas/region/<slug>`; the province hub at `/areas`.
- **Encoding**: UTF-8, Markdown. Static-render target (no client JS needed for any content or schema).

## 2. YAML frontmatter (page metadata)

Machine fields consumed by the site build: `id`, `slug`, `url`, `type` (`location` | `region` | `hub`),
`place`, `placeType`, `region`, `province`, `coordinates` (`lat, lng`), `population2021`, `population2016`,
`populationGrowthPct`, `seoScore`, `distanceFromWinnipegKm` (+ `distanceFromBrandonKm` where present).

SEO fields (all still tokenized — filled at deploy): `title`, `metaDescription`, `h1`, `primaryKeyword`,
`secondaryKeywords`, `longTailKeywords`, `questionKeywords`, `conversationalQueries`, `entityType`.

Image fields: `imageTier` (`region`), `imageFile` (`<slug>-<region>-mb.webp`), `imageAltGeo` (Layer-1,
geographic only), `imageAltRendered` (Layer-2, `{SERVICE_CATEGORY}`-prefixed), `imageLicense`
(`{IMAGE_LICENSE_TODO}`), `imageAttribution` (`{IMAGE_ASSET_TODO}`).

## 3. Body sections (in order)

1. `<!-- Breadcrumb: Home → Areas We Serve → <Region> → <Place> -->` (neighborhoods add the Winnipeg level).
2. `# <H1>` — the tokenized H1.
3. `## Need {SERVICE} in <Place>?` → **AI answer snippet** (answer-first, 40–60w, `.answer-first` class target
   for schema `speakable`, ends `Call {PHONE}.`).
4. `## About <Place>, Manitoba` → the **Long_Description** About body (the depth payload).
5. `## Serving <Place>` → **Short_Description** (unique local hook, contains `{PHONE}`).
6. `## <Place> at a glance` → **Local_Facts** bullets (5–7 grounded facts).
7. `## Our services in <Place>` → tokenized service list (`{SUBSERVICE_*}`, `{SERVICE_LIST}`).
8. `## Local proof` → tokenized testimonial scaffold (`{TESTIMONIAL_LOCAL}`, `{REVIEWER_NAME}`, `{REVIEW_COUNT}`).
9. `## Frequently asked questions` → 4 `### question` / answer pairs (FAQ_4 ends `Call {PHONE}.`).
10. `## Map` → static map placeholder keyed to coordinates (no live embed required).
11. `## Nearby areas we serve` → `Nearby_Links` (varied geo anchors, internal `/areas/<slug>`).
12. `## Region` → `Region_Link` (parent-region up-link).
13. `## From our blog` → `Blog_Links` (informational stubs).
14. JSON-LD `@graph` fenced block (see §4).
15. OGL-Canada attribution footer.

## 4. JSON-LD `@graph`

A single `application/ld+json`-ready `@graph` array with these nodes:

- **`Service`** (`#service`) — `serviceType`/`name` tokenized; `provider` → `{BRAND_URL}#business`;
  `areaServed[]` = the **primary place** (correctly typed — see mapping below) with `geo` +
  `containedInPlace: Manitoba`, then each nearby link, then a **`GeoCircle`** whose `geoRadius` is in **metres**
  (derived from the farthest nearby link, floor 10 km).
- **`WebPage`** (`#page`) — `dateModified`, `primaryImageOfPage`, and `speakable` → `.answer-first`.
- **`BreadcrumbList`** (`#breadcrumbs`) — Home → Areas → Region → Place (+ Winnipeg for neighborhoods).
- **`FAQPage`** (`#faq`) — the 4 Q&A pairs.
- **`ImageObject`** (`#img`) — `contentUrl` = image file; `license`/`creditText` = TODO tokens.

**Schema-type mapping (primary `areaServed` + entity):**

| Place kind | `@type` |
|---|---|
| City / Town / Village | `City` |
| Rural Municipality / Municipality | `AdministrativeArea` |
| Region | `AdministrativeArea` |
| First Nation / unincorporated community | `Place` |
| Winnipeg neighborhood | `Place` |

> **Implementer note:** *nearby* `areaServed` entries are emitted with a generic `"@type": "City"` for brevity;
> only the **primary** `areaServed` object is precisely typed per the table. Refine nearby types if strict
> per-entity typing is required downstream.

## 5. Token-fill contract

Every `{TOKEN}` is single-curly and filled at deploy from the tenant/niche config. Never any `{{double}}`.
Place facts are **never** tokenized (they are literal, grounded text). Deploy must supply values for all
business tokens (`{SERVICE}`, `{COMPANY_NAME}`, `{PHONE}`, `{PRICE_RANGE}`, …) plus the renderer-scaffold
tokens (`{SUBSERVICE_SLUG_1..4}`, `{TESTIMONIAL_LOCAL}`, `{REVIEWER_NAME}`, `{REVIEW_COUNT}`,
`{IMAGE_LICENSE_TODO}`, `{IMAGE_ASSET_TODO}`). Sourcing images and testimonials happens at implementation —
these tokens are deliberately left unfilled so nothing is fabricated.

## 6. Depth & uniqueness guarantees (enforced by the validator)

- No two pages share an About opener or an image alt; every page passes the find-and-replace test (swap the
  place name and the copy stops making sense) and carries ≥1 named `Info_Gain_Element`.
- Word-count floors: About body ≥400w (city-scale) / ≥300w (rural RM/community) / ≥280w (neighborhood);
  snippet 35–65w; short 80–165w; FAQ answers 30–72w.
- CTA discipline: snippet, short, and FAQ-4 each end on a `{PHONE}` call to action.
- `Entity_Description` is **token-free** pure fact (the AI entity anchor).
