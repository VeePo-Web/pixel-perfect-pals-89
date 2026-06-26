# PROMPT 03 — Per-Business Data Population (make the template rank for YOUR business)

> **Role:** World-class local + AI SEO operator. The template (`prompts/01`, `02`, `04`) is already
> built and in the repo. You now **populate it with one real business** so its Areas pages and blog
> rank #1 in Google and get cited by AI — by swapping data only, never editing components.
>
> **Read first:** `reference/current-implementation-map.md` (the remix contract, §6),
> `reference/qa-ship-gates.md` (all gates), `research/01` & `research/02` (the "why").
>
> **Run this once per project/client.** Everything here is data + config; do not touch component logic.

---

## Inputs to gather from the business (ask for these first)

1. **Identity / NAP:** legal business name, address (or "service-area business, no storefront"),
   **one** canonical phone format, email, hours, `BUSINESS_SCHEMA_TYPE` (e.g. Plumber, Electrician,
   HomeAndConstructionBusiness), GBP URL, Google Maps place URL, social URLs (for `sameAs`).
2. **Offer:** the service(s) — `SERVICE`, `SERVICE_PLURAL`, `SERVICE_CATEGORY`, response promise,
   trust stats, real **price ranges** per service (first-party gold).
3. **Real service areas:** the actual towns/cities/neighbourhoods they serve and can deliver in
   (NOT aspirational — research/01 §1). For each, the local substance (below).
4. **First-party proof:** named testimonials (first name + area), completed projects (named
   subdivision/street), photos of real work, credentials/awards/PR.
5. **Topic expertise:** what real questions customers ask; what original data/experience the business
   has (for blog information-gain).

---

## Step 1 — Brand & schema config (`src/config/template/remix-variables.ts`, `index.html`)

- Set every `MASTER_REMIX` value: `BRAND_NAME, BRAND_URL, SERVICE*, SERVICE_CATEGORY, PHONE` (E.164 +
  display), `RESPONSE_PROMISE, TRUST_*`, `BUSINESS_SCHEMA_TYPE`, `OG_IMAGE`, etc.
- Fill the sitewide `Organization` `sameAs[]` (GBP, Maps, socials) and **real NAP** — must be
  **byte-identical** to the footer and every page's schema.
- Regenerate `llms.txt` + enable the `Sitemap:` line in `robots.txt` with the real `BRAND_URL`.

---

## Step 2 — Activate ONLY real service areas, each passing GATE B

For each town the business genuinely serves, create a `Community` (using the CA/US scaffold for
coordinates/region) and **fill the first-party local fields until it clears the uniqueness gate**
(`evaluateCommunity` → `cleared === true`, i.e. **≥ 4 of 8 signals + ≥ 1 first-party element**):

- `streets[]` / `landmarks[]` — real local references.
- `localConditions` — a service-relevant local condition ("chinook freeze-thaw cracks drywall here").
- `localProjects[]` — a real completed project (named area).
- `localCode` — a real permit/bylaw note for that jurisdiction.
- `localCommunity` — a real community/event reference.
- `coverageNote` — why this business specifically serves this town (crew base, supplier, proximity).
- `testimonials[]` — a **named** local review (first name + neighbourhood).
- `faqs[]` — ≥ 1 **town-specific** question (e.g. a local permit threshold) + the cost answer.

**Do NOT activate a town you can't make genuinely local.** A skipped town is correct; a thin town
page suppresses the whole domain (research/01 §0). Build **region/state hubs before community spokes**,
and **revenue cities first** (research/01 §1). Verify each page passes the **find-and-replace test**.

---

## Step 3 — Build the blog clusters (topical authority)

- Define 1–3 **pillars** (one per core service/topic) in `hubRegistry.ts`; map **8–15 spokes** each
  (research/02 §1). Map keywords to **informational intent only**.
- For each post (`blogData.ts`): set `informationGain` (a real first-party stat/case/quote — required),
  `keyAnswer` (40–60-word front-loaded answer), answer-first `content`, `faq[]` (self-contained
  chunks), a **named real author** (from the author registry, with `sameAs`), `publishedAt`/`modifiedAt`.
- Wire internal links: each spoke → pillar + 2 adjacent; set `about.{region|community}` where
  geo-relevant and include the **down-link into the matching Areas page**.
- Run the cluster gate; fix cannibalization; aim each cluster toward ≥ 8 spokes before claiming
  authority.

---

## Step 4 — Verify every page against the gates

- **GATE A** (universal), **GATE B** (every Areas page), **GATE C** (every blog post), **GATE D**
  (site-wide AI hardening) in `reference/qa-ship-gates.md`.
- **Static check:** a sample Areas page + blog post, **fetched with JS disabled**, show content + all
  JSON-LD (incl. `GeoCircle` areaServed and `Person` `sameAs`).
- **Build:** `tsc --noEmit` clean, `vite build` green, sitemap lists only gate-cleared pages with
  honest lastmod.

---

## Step 5 — Off-site / entity work (research/03 §5) — operator checklist (outside the repo)
- Claim/optimize **GBP**; primary category = the money category; keywords in business title where
  truthful.
- **NAP byte-identical** across GBP, Yelp, YellowPages, BBB, industry directories.
- Build **review velocity** (steady new reviews, respond to all); encourage service+city keywords in
  reviews.
- Earn **brand mentions** on third-party/industry sources (and, where authentic, community forums) —
  raises AI citation odds.
- Submit sitemap in Search Console; monitor PAA wins + queries ranking 11–30 (→ new spokes).

---

## Step 6 — Ongoing (research/01 §9, research/02 §9)
- **Re-audit cadence:** keep NAP/hours/offers accurate; refresh pillars + high-traffic spokes every
  6–12 months (update a stat, expand a section, bump `modifiedAt` + visible "Last updated").
- **Track AI visibility** separately from rankings (a GEO citation tracker / manual prompt panel).
- **Prune** any page that has gone thin or stale (domain-drag guard).

---

## Never do
- Activate a service area you can't make genuinely local (find-and-replace = deindex risk).
- Edit component logic to force a town live — the gate is the protection, respect it.
- Publish a blog post with empty `informationGain` or commercial-intent targeting.
- Let NAP drift between site, schema, GBP, and citations.
- Emit self-serving review schema.
