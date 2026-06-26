-- ─────────────────────────────────────────────────────────────────────────────
-- Reviews & Aggregate — Cochrane Master Builders Universal Template
-- Migration: 20260513000001_reviews.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Tables ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.reviews (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  site_slug         text        NOT NULL DEFAULT 'master',
  service_slug      text,
  reviewer_name     text        NOT NULL,
  community         text        NOT NULL,
  service           text        NOT NULL,
  rating            numeric(2,1) NOT NULL
                    CHECK (rating >= 1.0 AND rating <= 5.0),
  review_date       text        NOT NULL,   -- display format: "March 2026"
  quote             text        NOT NULL,
  approved          boolean     NOT NULL DEFAULT false,
  source            text        NOT NULL DEFAULT 'manual'
                    CHECK (source IN ('manual', 'google')),
  google_review_id  text        UNIQUE,     -- idempotency key for imports
  google_author_url text,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.review_aggregate (
  site_slug       text        PRIMARY KEY,
  total_reviews   integer     NOT NULL DEFAULT 0,
  average_rating  numeric(3,2) NOT NULL DEFAULT 0,
  five_star_count integer     NOT NULL DEFAULT 0,
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- ── 2. Indexes ────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS reviews_site_slug_approved_idx
  ON public.reviews (site_slug, approved);

CREATE INDEX IF NOT EXISTS reviews_created_at_idx
  ON public.reviews (created_at DESC);

-- ── 3. Row-Level Security ─────────────────────────────────────────────────────

ALTER TABLE public.reviews         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_aggregate ENABLE ROW LEVEL SECURITY;

-- reviews: anon can read only approved rows
CREATE POLICY "reviews_anon_select"
  ON public.reviews FOR SELECT TO anon
  USING (approved = true);

-- reviews: anon can INSERT (homeowner submits a review)
CREATE POLICY "reviews_anon_insert"
  ON public.reviews FOR INSERT TO anon
  WITH CHECK (true);

-- reviews: authenticated (admin dashboard) can read all rows
CREATE POLICY "reviews_auth_select_all"
  ON public.reviews FOR SELECT TO authenticated
  USING (true);

-- reviews: service role has full access (scripts, triggers)
CREATE POLICY "reviews_service_all"
  ON public.reviews FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- review_aggregate: anyone can read
CREATE POLICY "aggregate_anon_select"
  ON public.review_aggregate FOR SELECT TO anon
  USING (true);

CREATE POLICY "aggregate_auth_select"
  ON public.review_aggregate FOR SELECT TO authenticated
  USING (true);

-- review_aggregate: only service role writes (trigger uses SECURITY DEFINER)
CREATE POLICY "aggregate_service_all"
  ON public.review_aggregate FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ── 4. Aggregate recalculation trigger ───────────────────────────────────────

CREATE OR REPLACE FUNCTION public.recalculate_review_aggregate()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_slug        text;
  v_total       integer;
  v_average     numeric(3,2);
  v_five_star   integer;
BEGIN
  -- Determine which site_slug changed
  v_slug := CASE
    WHEN TG_OP = 'DELETE' THEN OLD.site_slug
    ELSE NEW.site_slug
  END;

  -- Recalculate only when an approved row is affected.
  -- Also recalculate on UPDATE when approved flipped (true→false or false→true).
  IF NOT (
    (TG_OP = 'INSERT' AND NEW.approved = true) OR
    (TG_OP = 'DELETE' AND OLD.approved = true) OR
    (TG_OP = 'UPDATE' AND (NEW.approved = true OR OLD.approved = true))
  ) THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  SELECT
    COUNT(*)::integer,
    ROUND(AVG(rating)::numeric, 2),
    COUNT(*) FILTER (WHERE rating >= 4.9)::integer
  INTO v_total, v_average, v_five_star
  FROM public.reviews
  WHERE site_slug = v_slug
    AND approved  = true;

  INSERT INTO public.review_aggregate
    (site_slug, total_reviews, average_rating, five_star_count, updated_at)
  VALUES
    (v_slug, v_total, COALESCE(v_average, 0.00), v_five_star, now())
  ON CONFLICT (site_slug) DO UPDATE SET
    total_reviews   = EXCLUDED.total_reviews,
    average_rating  = EXCLUDED.average_rating,
    five_star_count = EXCLUDED.five_star_count,
    updated_at      = EXCLUDED.updated_at;

  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER reviews_aggregate_trigger
  AFTER INSERT OR UPDATE OR DELETE
  ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.recalculate_review_aggregate();
