-- Allow guest/authenticated clients to upload repair photos to the private bucket.
-- Read access remains restricted; backend returns signed URLs when needed.

drop policy if exists "project_photos_insert" on storage.objects;
create policy "project_photos_insert"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'project-photos'
    and name like 'uploads/%'
  );
