import { supabase } from '@/lib/supabase';
import type { PhotoRow } from '@/types/database';

export async function listPhotos(): Promise<PhotoRow[]> {
  const { data, error } = await supabase.from('photos').select('*').order('captured_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function uploadPhoto(opts: {
  fileBytes: ArrayBuffer | Blob;
  contentType: string; // e.g., 'image/jpeg'
  caption?: string;
}): Promise<PhotoRow> {
  const { data: userResp } = await supabase.auth.getUser();
  const user = userResp.user;
  if (!user) throw new Error('Not signed in');

  const filename = `${Date.now()}.${opts.contentType.split('/')[1] ?? 'jpg'}`;
  const path = `${user.id}/${filename}`;

  const { error: upErr } = await supabase.storage
    .from('photos')
    .upload(path, opts.fileBytes, { contentType: opts.contentType, upsert: false });
  if (upErr) throw upErr;

  const { data: insertData, error: insErr } = await supabase
    .from('photos')
    .insert({ user_id: user.id, storage_path: path, caption: opts.caption ?? null })
    .select('*')
    .single();
  if (insErr) throw insErr;
  return insertData;
}

export async function getPhotoSignedUrl(storagePath: string, expiresInSec = 3600): Promise<string> {
  const { data, error } = await supabase.storage.from('photos').createSignedUrl(storagePath, expiresInSec);
  if (error) throw error;
  return data.signedUrl;
}
