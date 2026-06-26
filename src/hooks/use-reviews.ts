/**
 * useReviews — Supabase-backed reviews with static fallback.
 *
 * Query priority:
 *   1. Supabase: approved=true rows for this site_slug, newest first
 *   2. Static REVIEWS array (local dev / before any rows are seeded)
 *
 * Never blocks page render — starts as isLoading=false with the static
 * fallback, then swaps to Supabase data when the query resolves.
 */

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { REVIEWS, type Review, type ReviewAggregate } from "@/config/reviews";
import { MASTER_REMIX } from "@/config/template/remix-variables";

// ─── DB row shape (Supabase returns snake_case) ───────────────────────────────
interface DbReview {
  id: string;
  site_slug: string;
  service_slug: string | null;
  reviewer_name: string;
  community: string;
  service: string;
  rating: number;
  review_date: string;
  quote: string;
  approved: boolean;
  source: string;
  google_review_id: string | null;
  google_author_url: string | null;
  created_at: string;
}

interface DbAggregate {
  site_slug: string;
  total_reviews: number;
  average_rating: number;
  five_star_count: number;
  updated_at: string;
}

// ─── Map DB row → frontend Review type ────────────────────────────────────────
const mapRow = (row: DbReview): Review => ({
  name: row.reviewer_name,
  community: row.community as Review["community"],
  service: row.service as Review["service"],
  rating: Number(row.rating),
  date: row.review_date,
  quote: row.quote,
  approved: row.approved,
  source: row.source as "manual" | "google",
  googleReviewId: row.google_review_id ?? undefined,
  siteSlug: row.site_slug,
  serviceSlug: row.service_slug ?? undefined,
});

// ─── Hook options ─────────────────────────────────────────────────────────────
interface UseReviewsOpts {
  variant?: "grid" | "featured";
  maxItems?: number;
  serviceSlug?: string;
  /** Override MASTER_REMIX.TRADE_SLUG — useful in multi-site contexts. */
  siteSlug?: string;
}

interface UseReviewsResult {
  reviews: Review[];
  isLoading: boolean;
  aggregate: ReviewAggregate | null;
}

// ─── Build a static aggregate from the fallback array ────────────────────────
const staticAggregate = (reviews: Review[]): ReviewAggregate => {
  const approved = reviews.filter((r) => r.approved);
  const total = approved.length;
  const avg = total > 0
    ? approved.reduce((s, r) => s + r.rating, 0) / total
    : 0;
  const fiveStar = approved.filter((r) => r.rating >= 4.9).length;
  return {
    siteSlug: MASTER_REMIX.TRADE_SLUG,
    totalReviews: total,
    averageRating: Math.round(avg * 100) / 100,
    fiveStarCount: fiveStar,
  };
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useReviews(opts: UseReviewsOpts = {}): UseReviewsResult {
  const {
    maxItems = 6,
    serviceSlug,
    siteSlug = MASTER_REMIX.TRADE_SLUG,
  } = opts;

  // Start with static data so the page renders instantly (no loading flash)
  const [reviews, setReviews] = useState<Review[]>(
    REVIEWS.slice(0, maxItems)
  );
  const [aggregate, setAggregate] = useState<ReviewAggregate | null>(
    REVIEWS.length > 0 ? staticAggregate(REVIEWS) : null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const fetch = async () => {
      try {
        // ── Reviews query ────────────────────────────────────────────────
        let query = (supabase as any)
          .from("reviews")
          .select("*")
          .eq("approved", true)
          .eq("site_slug", siteSlug)
          .order("created_at", { ascending: false })
          .limit(maxItems);

        if (serviceSlug) {
          query = query.eq("service_slug", serviceSlug);
        }

        const { data: rows, error: reviewErr } = await query;

        // ── Aggregate query ──────────────────────────────────────────────
        const { data: agg, error: aggErr } = await (supabase as any)
          .from("review_aggregate")
          .select("*")
          .eq("site_slug", siteSlug)
          .maybeSingle();

        if (cancelled) return;

        // If Supabase returns data, use it — otherwise keep static fallback
        if (!reviewErr && rows && rows.length > 0) {
          setReviews((rows as DbReview[]).map(mapRow));
        }
        // else: static REVIEWS remain in state — no flash, no blank state

        if (!aggErr && agg) {
          const a = agg as DbAggregate;
          setAggregate({
            siteSlug: a.site_slug,
            totalReviews: a.total_reviews,
            averageRating: Number(a.average_rating),
            fiveStarCount: a.five_star_count,
          });
        }
      } catch {
        // Network failure — static fallback already in state, just stop loading
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [siteSlug, serviceSlug, maxItems]);

  return { reviews, isLoading, aggregate };
}
