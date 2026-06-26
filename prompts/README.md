# Cochrane Master Builders — System Prompts

Copy-paste prompts for building out the universal template.
Each prompt is self-contained and can be pasted into Claude Code or Lovable.

## Execution Order

| # | Prompt | What it builds | Depends on |
|---|--------|---------------|------------|
| 01 | [Trade Remix Generator](./01-trade-remix-generator.md) | `remix-variables.ts`, `cross-sell-map.ts` entry, seed reviews | Nothing — run first per trade |
| 02 | [Per-Trade SEO Copy System](./02-per-trade-seo-copy-system.md) | Meta tags, `why-we-love-copy.ts`, `MetaTags.tsx` | 01 (trade inputs) |
| 03 | [Social Proof Engine](./03-social-proof-engine.md) | Supabase reviews table, `useReviews()`, Google import | Supabase project |
| 04 | [Google Schema Markup](./04-google-schema-markup-system.md) | `SiteSchemaEngine.tsx`, JSON-LD for all routes | 02 (react-helmet-async) |
| 05 | [Performance Budget](./05-performance-budget-system.md) | Lighthouse 95+, font preload, CLS fixes, srcset | None (run anytime) |
| 06 | [Post-Booking Email Sequence](./06-post-booking-email-sequence.md) | Client confirm email, 7-day follow-up, Resend pipeline | Booking Modal |

## How to use

1. Open the prompt file
2. Fill in the TRADE INPUTS block at the top (where applicable)
3. Copy the entire code block
4. Paste into Claude Code or Lovable

## Built systems (already in codebase)

- **Booking Modal + Thank-You** — `src/components/template/BookingModal.tsx`
- **Heirloom Brand System** — `src/components/template/bespoke/`
- **Areas We Serve SEO** — `src/pages/AreasHub.tsx`, `RegionPage`, `CommunityPage`
- **Image Manifest + Generator** — `src/config/template/image-manifest.ts`, `scripts/regenerate-images.ts`
- **Knowledge System** — `knowledge/`

## Next prompts to build

See the "what else should I build prompts for" list in the project notes.
Highest remaining priorities:
- Sitemap + robots.txt system
- Admin dashboard (lead management + review approval)
- Google Business Profile data bridge
- Privacy policy + terms generator (Alberta/PIPEDA compliant)
- Internal linking engine
- Trade Configuration CLI (`npm run remix:new`)
