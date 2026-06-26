# Prompt 03 — Social Proof Engine

> Paste this entire prompt into Claude Code or Lovable.
> Migrates the hardcoded reviews system to Supabase + adds AggregateRating JSON-LD.

---

```
═══════════════════════════════════════════════════════════════════════
 SOCIAL PROOF ENGINE — Supabase-Backed Reviews + Schema Markup
 Cochrane Master Builders Universal Template
═══════════════════════════════════════════════════════════════════════

─────────────────────────────────────────────────────────────────────
ROLE
─────────────────────────────────────────────────────────────────────
You are building the review system that drives Google rich-result
star ratings for the entire Cochrane Master Builders network. Your
output must produce both the Supabase data layer and the frontend
component that passes Google's AggregateRating structured data test.
The existing SocialProofEngine.tsx component is wired but reads from
a static TS file. Your job: migrate it to Supabase, add admin approval,
add JSON-LD schema, and add a Google Review import script.

─────────────────────────────────────────────────────────────────────
CODEBASE CONTEXT — read carefully before touching anything
─────────────────────────────────────────────────────────────────────
EXISTING (do not break):
  src/components/master/SocialProofEngine.tsx
    — Renders ReviewCard components with Before/After strip + Stars
    — Currently reads from: import { REVIEWS } from "@/config/reviews"
    — Props: reviews?, variant ("grid"|"featured"), maxItems, className
    — Used in: Home.tsx (variant="grid", maxItems=3),
               Reviews.tsx (variant="featured", maxItems=5)
    — Keep the visual component identical. Only change the data source.

  src/config/reviews.ts
    — Currently: hardcoded REVIEWS array + Review type
    — Review type: { name, community, service, rating, date, quote }
    — ReviewService type: "Repair"|"Installation"|"Painting"|"Garage"|"Basement"
    — Keep the type shape. Extend it with new fields.

Supabase client: src/integrations/supabase/client.ts
Supabase types:  src/integrations/supabase/types.ts
Existing tables: bookings, email_send_log, email_send_state,
                 email_unsubscribe_tokens, booking_submissions,
                 booking_rate_limits

─────────────────────────────────────────────────────────────────────
DELIVERABLES — in this order, no skipping
─────────────────────────────────────────────────────────────────────

STEP 1 — Database migration
Create: supabase/migrations/20260513000001_reviews.sql

  Table: public.reviews
    id               uuid PRIMARY KEY DEFAULT gen_random_uuid()
    site_slug        text NOT NULL DEFAULT 'master'
    service_slug     text
    reviewer_name    text NOT NULL
    community        text NOT NULL
    service          text NOT NULL
    rating           numeric(2,1) NOT NULL
    review_date      text NOT NULL            ← "March 2026" display format
    quote            text NOT NULL
    approved         boolean NOT NULL DEFAULT false
    source           text NOT NULL DEFAULT 'manual'  ← 'manual' | 'google'
    google_review_id text UNIQUE
    google_author_url text
    created_at       timestamptz NOT NULL DEFAULT now()

  Table: public.review_aggregate
    site_slug        text PRIMARY KEY
    total_reviews    integer NOT NULL DEFAULT 0
    average_rating   numeric(3,2) NOT NULL DEFAULT 0
    five_star_count  integer NOT NULL DEFAULT 0
    updated_at       timestamptz NOT NULL DEFAULT now()

  RLS:
    reviews — SELECT: anon can read approved=true rows only
              INSERT: anon can submit
              UPDATE/DELETE: service role only
    review_aggregate — SELECT open, UPDATE service role only

  Trigger: after INSERT/UPDATE on reviews where approved=true,
  recalculate review_aggregate for that site_slug.

STEP 2 — Update src/config/reviews.ts

  Extend Review interface:
    approved: boolean
    source: "manual" | "google"
    googleReviewId?: string
    siteSlug?: string
    serviceSlug?: string

  Keep all existing REVIEWS with: approved: true, source: "manual"
  This file is now only used as a SEED / local dev fallback.

STEP 3 — Create src/hooks/use-reviews.ts

  export function useReviews(opts?: {
    variant?: "grid" | "featured"
    maxItems?: number
    serviceSlug?: string
    siteSlug?: string
  }): { reviews: Review[]; isLoading: boolean; aggregate: ReviewAggregate | null }

  Logic:
    - Query Supabase: .from("reviews").select("*")
        .eq("approved", true)
        .eq("site_slug", MASTER_REMIX.TRADE_SLUG)
        .order("created_at", { ascending: false })
        .limit(opts.maxItems ?? 6)
    - Also query review_aggregate for the site_slug
    - Fall back to REVIEWS from reviews.ts if Supabase returns empty
    - Return { reviews, isLoading, aggregate }

STEP 4 — Update src/components/master/SocialProofEngine.tsx

  Replace the hardcoded REVIEWS import with useReviews() hook.
  Keep ALL existing visual code (ReviewCard, Stars, Before/After strip)
  completely unchanged.
  Add <AggregateRatingSchema /> below the review count line,
  rendered only when aggregate has ≥ 3 approved reviews.

STEP 5 — Create src/components/template/AggregateRatingSchema.tsx

  A <Helmet> component (react-helmet-async) injecting JSON-LD into <head>.
  Only renders when reviewCount ≥ 3.

  JSON-LD shape:
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": MASTER_REMIX.BRAND_NAME,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregate.average_rating.toFixed(1),
      "reviewCount": aggregate.total_reviews,
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  Also render individual Review schema for each displayed review.

STEP 6 — Create scripts/import-google-reviews.ts

  Reads GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID from env.
  Calls Google Places Details API for reviews.
  For each review: check google_review_id idempotency, insert with
  approved=false (admin must approve).
  Prints: inserted count, skipped (duplicate) count, errors.
  Run: GOOGLE_PLACES_API_KEY=xxx GOOGLE_PLACE_ID=xxx npx tsx scripts/import-google-reviews.ts

STEP 7 — Add npm scripts to package.json
  "reviews:import": "npx tsx scripts/import-google-reviews.ts"
  "reviews:seed": "npx tsx scripts/seed-reviews.ts"

STEP 8 — Create scripts/seed-reviews.ts
  Inserts all REVIEWS from src/config/reviews.ts into Supabase
  with approved=true. Idempotent.

─────────────────────────────────────────────────────────────────────
PERFORMANCE RULES
─────────────────────────────────────────────────────────────────────
- useReviews() must not block page render. Use suspense: false.
- Fall back to static REVIEWS array in < 0ms if Supabase is slow.
- AggregateRatingSchema renders server-side-safe (no window access).
- SocialProofEngine visual output must be pixel-identical to current.

─────────────────────────────────────────────────────────────────────
ACCEPTANCE GATES
─────────────────────────────────────────────────────────────────────
□ Migration creates both tables with correct RLS
□ Trigger recalculates review_aggregate when approved=true is set
□ useReviews() falls back to static array when Supabase returns empty
□ SocialProofEngine visual is pixel-identical before and after migration
□ AggregateRatingSchema only renders when reviewCount ≥ 3
□ Google's Rich Results Test passes on / and /reviews
□ Import script is idempotent (running twice doesn't duplicate)
□ Seed script inserts all existing reviews with approved=true
□ npm run reviews:import exits 0 with a printed summary
```
