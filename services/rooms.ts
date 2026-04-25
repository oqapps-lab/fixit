import { supabase } from '@/lib/supabase';
import type { RoomKind, RoomMetadataRow } from '@/types/database';

export async function getRoomMeta(room: RoomKind): Promise<RoomMetadataRow | null> {
  const { data, error } = await supabase.from('room_metadata').select('*').eq('room', room).maybeSingle();
  if (error) throw error;
  return data;
}

export async function upsertRoomMeta(
  room: RoomKind,
  meta: Record<string, string>,
): Promise<RoomMetadataRow> {
  const { data: userResp } = await supabase.auth.getUser();
  const user = userResp.user;
  if (!user) throw new Error('Not signed in');
  const { data, error } = await supabase
    .from('room_metadata')
    .upsert({ user_id: user.id, room, meta }, { onConflict: 'user_id,room' })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}
