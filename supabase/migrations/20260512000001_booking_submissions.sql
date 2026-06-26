-- booking_submissions — universal booking table for all 150 trade sites.
-- Separate from the legacy `bookings` table (drywall-specific).

CREATE TABLE IF NOT EXISTS public.booking_submissions (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id   uuid        UNIQUE NOT NULL,          -- client-generated idempotency key
  site_slug       text        NOT NULL DEFAULT 'master',
  service_slug    text,
  name            text        NOT NULL,
  email           text        NOT NULL,
  phone           text        NOT NULL,
  details         text,
  media_urls      text[]      NOT NULL DEFAULT '{}',
  metadata        jsonb       NOT NULL DEFAULT '{}',    -- userAgent, referrer, source, etc.
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS booking_submissions_email_idx       ON public.booking_submissions (email);
CREATE INDEX IF NOT EXISTS booking_submissions_site_slug_idx   ON public.booking_submissions (site_slug);
CREATE INDEX IF NOT EXISTS booking_submissions_created_at_idx  ON public.booking_submissions (created_at DESC);

-- Rate-limit tracking (5 submissions / IP / 10 minutes)
CREATE TABLE IF NOT EXISTS public.booking_rate_limits (
  ip_hash    text        NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS booking_rate_limits_ip_created_idx
  ON public.booking_rate_limits (ip_hash, created_at DESC);

-- RLS — inserts via edge function (service role) only; anon cannot read
ALTER TABLE public.booking_submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_rate_limits  ENABLE ROW LEVEL SECURITY;

-- No policies means no access for anon/authenticated — edge function uses service role key

-- Storage bucket (idempotent create via policy comment)
-- Run manually in the Supabase dashboard:
--   Storage → New bucket → "booking-media" → Private
--   Add RLS policy: allow service_role to insert/select

COMMENT ON TABLE public.booking_submissions IS
  'Universal lead submissions for Cochrane Master Builders network. '
  'Inserted by the submit-booking edge function only.';
