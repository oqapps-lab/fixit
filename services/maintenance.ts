import { supabase } from '@/lib/supabase';
import type { MaintenanceTaskRow, SeasonKind } from '@/types/database';

export async function listMaintenance(season?: SeasonKind): Promise<MaintenanceTaskRow[]> {
  let q = supabase.from('maintenance_tasks').select('*').order('due_date', { ascending: true });
  if (season) q = q.eq('season', season);
  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

export async function markTaskDone(id: string, done: boolean): Promise<void> {
  const { error } = await supabase
    .from('maintenance_tasks')
    .update({ done_at: done ? new Date().toISOString() : null })
    .eq('id', id);
  if (error) throw error;
}
