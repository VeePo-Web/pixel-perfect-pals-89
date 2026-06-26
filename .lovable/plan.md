## Goal

Make the template fully neutral (no Cochrane Master Builders logo, no "Book Now" trade CTA), then drop in **reference-only** data from two source projects so a remix author can see what populated content looks like — without the substrate appearing branded.

---

## 1. Neutralize the logo

**`src/components/template/TemplateNavigation.tsx`** and **`src/components/template/TemplateFooter.tsx`**
- Replace `<MasterLogo slot="nav" />` / `slot="footer"` with a neutral wordmark: render `{MASTER_REMIX.BRAND_NAME}` ("{BRAND_NAME}" by default) in Space Grotesk, tracked uppercase, no image. Same for footer monumental sign-off (already text — leave as is).
- Remove the `MasterLogo` import. Leave the `@/master` barrel untouched (other surfaces may still use it; we're only stopping the template chrome from rendering the CMB raster).

## 2. Neutralize the CTA

**`TemplateNavigation.tsx`** + **`TemplateFooter.tsx`**
- Replace the "Book Now" buttons and the booking-modal click handler with a neutral `<Link to="/areas-we-serve">` styled the same way, label `"Explore Coverage"` (sourced from `MASTER_REMIX.CTA_PRIMARY`, new token, default `"Explore Coverage"`).
- Drop the `onBookClick` prop from `TemplateLayout`, `TemplateNavigation`, `TemplateFooter`. Remove the booking-modal mount from `App.tsx` (template is generic — no trade booking funnel).
- Remove `cta-forest` color reliance — use neutral tokens (`bg-charcoal text-bone hover:bg-graphite`) so it isn't visually tied to the drywall forest palette.

**`src/config/template/remix-variables.ts`** — add `CTA_PRIMARY: "Explore Coverage"`.

## 3. Reference data — Areas We Serve (from CMB Template)

Create **`src/data/communities.reference.ts`** (NOT imported anywhere by default). Top of file:

```ts
/**
 * REFERENCE ONLY — DO NOT IMPORT IN PRODUCTION.
 *
 * Snapshot of a populated communities dataset (Cochrane Master Builders)
 * so a remix author can see the expected shape, density, and SEO copy
 * patterns. To activate, copy entries into `communities.ts` and adapt to
 * your geography. The live data layer remains `communities.ts`.
 */
```

- Copy `REGIONS` (9 regions) + a representative slice of `COMMUNITIES` (~12 across the regions, tier-balanced) from `cross_project:d1fda0a9.../src/data/communities.ts`.
- Keep the external Wikimedia/Unsplash `heroImage` URLs intact — these are the area background images the user wants visible.

**Wire the hero images into the live scaffold:** add `heroImage` fields to the 2 placeholder regions in `communities.ts` pointing to two of the copied Unsplash/Wikimedia URLs, so the current Areas / Region / Community pages render with real background imagery out of the box. Mark them with a comment: `// reference image — swap when you populate real regions`.

## 4. Reference data — Blog (from VeePo.ca)

Create **`src/lib/blogData.reference.ts`** with the same header banner. Copy ONE post (`hvac-website-design-cochrane`) from `cross_project:e0b2454a.../src/lib/blogData.ts` including its `hubGovernance`, `faq`, `outline`, `tldr` shape. Do **not** push it into `blogPosts` — leave the live array empty. Add a one-line README comment explaining how to activate.

Also copy the matching hub entry from VeePo's `hubRegistry.ts` into **`src/lib/hubRegistry.reference.ts`** so the reference post resolves cleanly if someone temporarily wires it up.

## 5. Documentation

Update **`REMIX_CHECKLIST.md`** with a new "Reference snapshots" section pointing at the three `*.reference.ts` files and stating the activation pattern (copy → adapt → never import the reference file in production).

---

## Files touched

- `src/components/template/TemplateNavigation.tsx` — neutral wordmark + CTA
- `src/components/template/TemplateFooter.tsx` — neutral wordmark + CTA
- `src/components/template/TemplateLayout.tsx` — drop `onBookClick`
- `src/App.tsx` — drop booking modal mount + handler
- `src/config/template/remix-variables.ts` — add `CTA_PRIMARY`
- `src/data/communities.ts` — wire 2 reference hero images into placeholder regions
- `src/data/communities.reference.ts` *(new)*
- `src/lib/blogData.reference.ts` *(new)*
- `src/lib/hubRegistry.reference.ts` *(new)*
- `REMIX_CHECKLIST.md` — document reference snapshots

## Out of scope

- Editing `@/master` barrel or `MasterLogo` itself (other consumers still exist).
- Replacing the favicon / OG images (already neutralized in earlier turns).
- Generating new imagery — we reuse the CMB Template's copyright-cleared URLs.
