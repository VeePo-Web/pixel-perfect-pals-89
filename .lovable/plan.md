## Goal
Strip the project down to only the **Areas We Serve** system (hub → region → community), so we can expand it to cover all of Canada and the USA without distraction from other pages. No new features added — just staging.

## Changes

### 1. `src/App.tsx` — rewrite routing
- Remove all `Template*` lazy imports (Home, BrandStory, WhyWeLove, Services, ServiceDetail, Pricing, Gallery, Reviews, About, Contact, Privacy, Terms, ThankYou, Guarantee, FAQ, NotFound).
- Keep only `AreasHub`, `RegionPage`, `CommunityPage`.
- Routes:
  - `/` → redirect to `/areas-we-serve` (via `<Navigate>`).
  - `/areas-we-serve` → `AreasHub`
  - `/areas-we-serve/:region` → `RegionPage`
  - `/areas-we-serve/:region/:community` → `CommunityPage`
  - `*` → redirect to `/areas-we-serve`.
- Keep the booking modal + handlers wired (the Areas pages accept `onBookClick`), Sticky CTA, BackToTop, MetaTags, providers — untouched.
- Remove the `prefetchIdle([...])` call (its targets no longer exist).

### 2. Delete page files
Delete the entire `src/pages/template/` directory:
- `Home.tsx`, `BrandStory.tsx`, `WhyWeLoveService.tsx`, `Services.tsx`, `ServiceDetail.tsx`, `Pricing.tsx`, `Gallery.tsx`, `Reviews.tsx`, `About.tsx`, `Contact.tsx`, `Privacy.tsx`, `Terms.tsx`, `ThankYou.tsx`, `Guarantee.tsx`, `FAQ.tsx`, `NotFound.tsx`, `AreasWeServe.tsx` (re-export shim, no longer needed).

Keep:
- `src/pages/AreasHub.tsx`
- `src/pages/RegionPage.tsx`
- `src/pages/CommunityPage.tsx`

### 3. Leave everything else in place (staged, not deleted)
Components, config, knowledge, scripts, supabase functions, and the booking modal stay. The Areas pages depend on `TemplateLayout`, `BookingModal`, `MetaTags`, `SmoothScrollProvider`, `PageTransition`, `areas/*` components, `data/communities`, `config/template/*`, etc. — all preserved so the Areas system keeps rendering and we have the substrate to expand on.

No content, copy, or data changes. No new Canada/USA data added yet — that's the next step after this stage.

## Verification
- Typecheck passes (no dangling imports to deleted pages).
- `/` redirects to `/areas-we-serve` and renders.
- `/areas-we-serve/:region/:community` still renders a community page.
- Booking modal still opens from Areas pages' CTAs.
