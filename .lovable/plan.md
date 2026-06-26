
## Goal

Two parts:
1. **Audit/finalize** what was already staged in the last turn (neutral logo, neutral CTA, reference snapshots from CMB + VeePo, background imagery on Areas).
2. **Layer in conversion improvements** across every live page (Areas Hub, Region, Community, Blog Hub index, Blog Hub cluster, Blog Post) — without breaking the "blank, trade-agnostic" rule.

---

## Part 1 — Audit & finalize the neutral substrate

Quick verification pass (no changes if already clean):

- `TemplateNavigation.tsx` — confirm wordmark renders `MASTER_REMIX.BRAND_NAME` as text only (no SVG/image logo) and the desktop + mobile CTA reads `MASTER_REMIX.CTA_PRIMARY` ("Explore Coverage") linking to `/areas-we-serve`.
- `TemplateFooter.tsx` — same neutral wordmark + CTA, no booking artifacts.
- `App.tsx` — no `BookingModal`, no `onBookClick` prop drilling, no `StickyCTA`.
- `src/data/communities.reference.ts`, `src/lib/hubRegistry.reference.ts`, `src/lib/blogData.reference.ts` — confirm each file has a top-of-file `REFERENCE ONLY — do not import at runtime` banner and is not imported anywhere in `src/`.
- `src/data/communities.ts` — confirm the two scaffold regions/communities have working Wikimedia/Unsplash hero URLs wired into `heroImage`.

Anything missing from the above gets patched to match.

---

## Part 2 — Conversion upgrades (per page)

All additions stay token-driven (`MASTER_REMIX.*`) so they remain blank/agnostic for any trade.

### New tokens in `src/config/template/remix-variables.ts`

```ts
CTA_PRIMARY:        "Explore Coverage"          // exists
CTA_SECONDARY:      "Get a Free Quote"          // new — neutral conversion CTA
CTA_TERTIARY:       "Call {PHONE}"              // new — phone-driven
PHONE:              "+1-000-000-0000"           // new — tel: link target
PHONE_DISPLAY:      "(000) 000-0000"            // new — visible label
RESPONSE_PROMISE:   "Replies within 1 business hour."
SOCIAL_PROOF_LINE:  "Trusted by homeowners across {SERVICE_REGION}."
RISK_REVERSAL:      "No-obligation estimate. {GUARANTEE_LABEL}."
```

These become the levers a remix author flips once; every page picks them up.

### New shared component: `src/components/template/ConversionBar.tsx`

A slim, reusable inline panel with: headline, primary CTA, phone CTA, response promise, risk reversal. Used at the bottom of every Region, Community, Blog Hub, and Blog Post page. Sticky variant for mobile.

### Page-by-page additions

**Areas Hub (`/areas-we-serve`)**
- Above-the-fold trust strip already exists — add `RESPONSE_PROMISE` micro-line under the H1.
- Add a single ConversionBar between "Featured communities" and the full region list.
- Add `ItemList` second pass with `position` ordering for top 6 (already partially there) — improves rich result eligibility = clicks.

**Region page (`/areas-we-serve/:region`)**
- Sticky mobile ConversionBar (CTA_SECONDARY + tel link).
- "Why neighbours choose us in {REGION}" trust row (3 bullets pulled from `MASTER_REMIX.TRUST_BULLETS` — new token, array of 3 strings).
- Inline FAQ block (already on Community) lifted to Region with 3 region-scoped Q&As driven by `MASTER_REMIX.REGION_FAQ_TEMPLATE` (3 string templates with `{REGION}` placeholder) → also emits `FAQPage` JSON-LD.
- "Field Notes from {REGION}" rail (already wired) — keep.

**Community page (`/areas-we-serve/:region/:community`)**
- Promote the lead form intent: replace generic CTA with `CTA_SECONDARY` + nearby phone link.
- Add a `LocalBusiness` `aggregateRating` placeholder hook (commented; activated by setting `MASTER_REMIX.RATING` to non-null).
- Add `speakable` to the existing FAQ (already done) + `breadcrumb` with `position` numerics confirmed.
- Add an "As recently completed nearby" placeholder slot (uses `RemixSlot` so it's blank but documented).

**Blog Hub index (`/blog`)**
- Empty-state already polished. Add a single ConversionBar below the empty state so even with zero posts the page converts to `/areas-we-serve`.

**Blog Hub cluster (`/blog/:hubSlug`)**
- TOC sidebar already present in post — for cluster, add a right-rail "Serving these areas" using `Hub.linkedRegions` (cross-link reinforcement).
- ConversionBar at the bottom.

**Blog Post (`/blog/:hubSlug/:postSlug`)**
- Add `MobileStickyCTA` (already exists in the ported VeePo components — wire it on post route only).
- AuthorBio (exists) gets a `sameAs` link list from `BRAND_SOCIAL` for E-E-A-T.
- "Get a quote for {ABOUT_TOPIC}" inline CTA after the first H2 (1/3 down the article) — single placement, not spammy.
- End-of-post ConversionBar with `RISK_REVERSAL`.

### Sitemap / schema reinforcement

- `scripts/generate-sitemap.ts` — add `<image:image>` entries for region/community hero images (Google Image Sitemap protocol). Boosts image search → traffic → conversion.
- `seoGraph.ts` — add `Offer` node builder (price-free, `priceSpecification` optional) so Service nodes can declare a `hasOffer` with `availability: InStock` for free quotes.

---

## Files touched

```
src/config/template/remix-variables.ts          (new tokens)
src/components/template/ConversionBar.tsx        (new)
src/components/template/TemplateNavigation.tsx   (verify)
src/components/template/TemplateFooter.tsx       (verify + phone link)
src/pages/AreasHub.tsx                           (response promise + bar)
src/pages/RegionPage.tsx                         (trust row, FAQ, sticky bar)
src/pages/CommunityPage.tsx                      (CTA swap, slots)
src/pages/BlogHub.tsx                            (empty-state bar)
src/pages/BlogHubPage.tsx                        (linked areas rail + bar)
src/pages/BlogPost.tsx                           (sticky CTA, inline CTA, end bar)
src/lib/seoGraph.ts                              (Offer node)
scripts/generate-sitemap.ts                      (image sitemap entries)
REMIX_CHECKLIST.md                               (document new tokens)
```

No data files (`communities.ts`, `hubRegistry.ts`, `blogData.ts`) change — the substrate stays blank.

---

## What stays out

- No hardcoded brand, phone, or region values — every visible string comes from `MASTER_REMIX`.
- No new pages, no booking modal resurrection, no third-party widgets.
- Reference snapshot files remain inert (no imports added).
