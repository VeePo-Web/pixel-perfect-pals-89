ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS service_type text,
  ADD COLUMN IF NOT EXISTS damage_scope text,
  ADD COLUMN IF NOT EXISTS scheduled_date date,
  ADD COLUMN IF NOT EXISTS scheduled_time text,
  ADD COLUMN IF NOT EXISTS flexibility_15min boolean,
  ADD COLUMN IF NOT EXISTS address jsonb,
  ADD COLUMN IF NOT EXISTS site_readiness jsonb,
  ADD COLUMN IF NOT EXISTS media text[];