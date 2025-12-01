-- Enable storage policies for missing_persons_photos bucket

-- Allow anyone to upload photos (for crisis response - no auth required)
CREATE POLICY "Anyone can upload photos"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'missing_persons_photos');

-- Allow anyone to view/download photos (public bucket)
CREATE POLICY "Anyone can view photos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'missing_persons_photos');

-- Allow anyone to update their uploaded photos
CREATE POLICY "Anyone can update photos"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'missing_persons_photos');

