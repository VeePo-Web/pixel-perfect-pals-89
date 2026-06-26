-- Create public storage bucket for booking media (photos and videos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('booking-media', 'booking-media', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can upload to booking-media (homeowners attaching photos with their request)
CREATE POLICY "Anyone can upload booking media"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'booking-media');

-- Anyone can view booking media (public bucket — team views in dashboard via URL)
CREATE POLICY "Booking media is publicly viewable"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'booking-media');