## Audit of the previous deletion

Confirmed:
- `src/pages/template/` directory is gone (verified: `ls src/pages` returns only `AreasHub.tsx`, `CommunityPage.tsx`, `RegionPage.tsx`).
- `src/App.tsx` routes only `/areas-we-serve`, `/areas-we-serve/:region`, `/areas-we-serve/:region/:community`; `/` and `*` redirect to the hub.
- `PrefetchLink.tsx` no longer references deleted pages.
- Typecheck passes (last `tsgo --noEmit` exited 0).

So pages-level deletion is complete. What remains is **brand-specific copy and data baked into the surviving Areas surface** — that's what blocks reuse as a general SEO remix template.

## Goal

Turn the surviving Areas We Serve surface into a **trade-agnostic, location-agnostic** SEO remix template, ready to be populated for any service and any geography (Canada, USA, anywhere). No new content added. Cochrane / Master Builders / Alberta / drywall references stripped from anything that renders or governs the runtime, replaced with neutral placeholder tokens consistent with the existing `{SERVICE}`-style remix vocabulary.

Out of scope: knowledge/playbook docs under `src/master/**`, `knowledge/**`, and source-doc markdown — those are remix reference material, not part of the running template, and the user explicitly said "don't add anything." We're only neutralizing what runs.

## Changes

### 1. Generalize `MASTER_REMIX` defaults — `src/config/template/remix-variables.ts`
Replace Cochrane/CMB-specific defaults with neutral placeholder tokens (matching the existing `{SERVICE}` convention so a remixer immediately sees what to swap):
- `BRAND_NAME`: `"Cochrane Master Builders"` → `"{BRAND_NAME}"`
- `COMMUNITIES`: Cochrane list → `["{COMMUNITY_1}", "{COMMUNITY_2}", "{COMMUNITY_3}", "{COMMUNITY_4}"]`
- `PARENT_BRAND_URL`, `BRAND_URL`: cochrane URLs → `""`
- `PHONE`: `+14030000000` → `""`
- `MONOGRAM_LETTERS`: `["C","M","B"]` → `["B","R","D"]` (BRAND placeholder)
- `BRAND_SLOGAN`: keep generic legacy line OR neutralize to `"{BRAND_SLOGAN}"` — neutralize.
- `MATERIAL_PRIMARY` / `MATERIAL_SUBSURFACE`: drywall vocab → `"{MATERIAL_PRIMARY}"` / `"{MATERIAL_SUBSURFACE}"`
- Update the file-header doc comment from "150 future Cochrane Master Builders sub-brand sites" to "Generic SEO remix template — bind these in your own trade.config.ts."

### 2. Generalize the three Areas pages

**`src/pages/AreasHub.tsx`**
- Strip `TRUST_STATS` hardcoded labels ("120+ Communities Served", "Cochrane-Based, Family Owned", "15-Year Structural Guarantee") → neutral tokens (`"{TRUST_COMMUNITIES}"`, `"{TRUST_LOCATION}"`, `"{TRUST_CERTIFICATION}"`, `"{TRUST_GUARANTEE}"`). `{SERVICE_CATEGORY}` line stays.
- `FEATURED_SLUGS` Cochrane-community hardcoded list → derive from first 6 `COMMUNITIES` in the data layer (or empty array fallback when data is empty).
- Hero H1 `"{SERVICE_PLURAL} Across Cochrane, Calgary & the Bow Valley"` → `"{SERVICE_PLURAL} Across {SERVICE_REGION_TAGLINE}"` driven by a new `MASTER_REMIX.SERVICE_REGION_TAGLINE` token (default `"{SERVICE_REGION_TAGLINE}"`).
- Hero lede, "Our Coverage" editorial block, and final CTA: remove every hardcoded Cochrane/Calgary/Springbank/Elbow/Bow/Canmore paragraph; replace the multi-paragraph editorial with a single neutral paragraph driven by `MASTER_REMIX.COVERAGE_BLURB` (new token; default `"{COVERAGE_BLURB}"`).
- LocalBusiness JSON-LD: drop hardcoded Cochrane address + Alberta + city list; build `address` and `areaServed` from `REGIONS` data instead. If REGIONS is empty, omit those fields.

**`src/pages/RegionPage.tsx`**
- Remove `const BASE_URL = "https://cochranedrywall.ca"` → use `MASTER_REMIX.BRAND_URL` (fallback to `""`).
- Strip every `", Alberta"` literal from titles, descriptions, H1 → use `region.country || ""` and `region.province || ""` from the `Region` shape (add optional `country`/`province` fields — already implied by community data).
- Replace "Cochrane-based" / "minutes from most of these areas" copy with neutral, region-driven phrasing.
- "Why {Region} Homeowners Choose {bn}" three trust cards — neutralize copy; remove "Cochrane-Based. Close By." card heading.

**`src/pages/CommunityPage.tsx`**
- Same: replace hardcoded "Cochrane" / "Alberta" references in the FAQ generator and copy with `community.city` / `community.province` / `community.country`.
- Remove "We're based in Cochrane, so…" — use a generic "We service this area on the typical 1–3 week schedule" line.

### 3. Reset the `data/communities.ts` data layer (stage for Canada + USA)
- Reduce from 120 Cochrane communities to a **minimal documented scaffold**: 2 example regions, 2 communities each, all with placeholder names like `"Region One"` / `"Community A"`, generic coordinates (`0,0`), empty `streets`, `landmarks`, `faqs`, `nearestCommunities`, and no `heroImage`.
- Extend `Region` interface with optional `country?: string` and `province?: string`. Extend `Community` interface with optional `country?: string` (defaults handled in pages).
- Keep the helper functions (`getRegion`, `getRegionCommunities`, `getCommunity`, `getNearestCommunities`, `REGIONS`, `COMMUNITIES`) intact — they're the API the pages call.
- Add a top-of-file doc comment: "Replace with your real region/community data. The shape is the contract — the Areas pages read everything from this file."

### 4. Generalize nav & footer chrome — they wrap every Areas page

**`src/components/template/TemplateNavigation.tsx`**
- Desktop `desktop` nav array currently filters for `/services`, `/pricing`, `/gallery`, `/reviews`, `/about` — those pages don't exist. Reduce to `["/", "/areas-we-serve"]`.
- Mobile drawer iterates `TEMPLATE_COPY.nav` (full list of deleted pages). Replace with the same 2-link list (or read from a new `TEMPLATE_COPY.areasNav` constant).
- Hard-coded `aria-label="Cochrane Master Builders — home"` → `${MASTER_REMIX.BRAND_NAME} — home`.

**`src/components/template/TemplateFooter.tsx`**
- `services` and `company` filtered link groups all point to deleted pages → remove both columns.
- "Cochrane & area" column heading → `"{SERVICE_REGION_LABEL}"` (or simply `"Service area"`), and list from `MASTER_REMIX.COMMUNITIES` (already does, will now show placeholder tokens).
- Privacy / Terms PrefetchLinks at bottom point to deleted pages → remove (or convert to plain `<span>` "© placeholder" — remove).
- Sign-off block already uses `MASTER_REMIX.BRAND_NAME` — fine.

### 5. SEO chrome cleanup
- `index.html`: title/description currently Cochrane Master Builders → neutral placeholder ("SEO Remix Template — Areas We Serve").
- `public/site.webmanifest`: same.
- `src/lib/seo.ts`: audit for hardcoded brand strings (likely just defaults); replace with `MASTER_REMIX` reads.

### 6. Don't touch
- `src/master/**` knowledge/playbooks/brand docs — remix reference material, not runtime.
- `knowledge/**` source/partner docs.
- `src/config/manifesto/drywall.manifesto.ts`, `src/config/brand-identity*.ts`, `src/config/business*.ts`, etc. — no longer imported by any rendered page after this pass; leave for now (deleting is a separate cleanup the user can request). The plan keeps the runtime clean even with these dormant.
- Booking modal, sticky CTA, page transition, smooth scroll — keep as-is (functional chrome).

## Verification
- `tsgo --noEmit` exits 0 after edits.
- `rg -i "cochrane|drywall|master builder|alberta|bow valley|calgary|springbank" src/pages src/components/template src/components/areas src/config/template/remix-variables.ts src/data/communities.ts index.html public/site.webmanifest src/lib/seo.ts` returns zero matches.
- Browser check via Playwright: `/` redirects to `/areas-we-serve` and renders with placeholder tokens visible; `/areas-we-serve/region-one` renders; `/areas-we-serve/region-one/community-a` renders; booking modal still opens from the CTAs.
