-- FixIt Stage 07 — Storage bucket for user-uploaded photos.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'photos',
  'photos',
  false, -- private; access via RLS
  10 * 1024 * 1024, -- 10 MiB max per photo
  array['image/jpeg','image/png','image/webp','image/heic']
)
on conflict (id) do nothing;

-- RLS for storage.objects on bucket 'photos'
-- Users can read/write only objects under their own user_id prefix:
--   photos/<user_id>/<filename>
create policy "photos bucket: select own" on storage.objects for select
  using (bucket_id = 'photos' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "photos bucket: insert own" on storage.objects for insert
  with check (bucket_id = 'photos' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "photos bucket: update own" on storage.objects for update
  using (bucket_id = 'photos' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "photos bucket: delete own" on storage.objects for delete
  using (bucket_id = 'photos' and auth.uid()::text = (storage.foldername(name))[1]);
