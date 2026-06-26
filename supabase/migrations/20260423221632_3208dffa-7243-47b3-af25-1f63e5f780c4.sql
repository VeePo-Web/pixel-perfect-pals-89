-- Bookings submitted through the public booking modal
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  vehicle_type TEXT,
  custom_vehicle TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public form: anyone can submit a booking
CREATE POLICY "Anyone can submit a booking"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies — service role bypasses RLS for backend access