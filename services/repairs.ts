import { supabase } from '@/lib/supabase';
import type { RepairRow } from '@/types/database';

export async function listRepairs(): Promise<RepairRow[]> {
  const { data, error } = await supabase.from('repairs').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as RepairRow[];
}

export async function getRepair(id: string): Promise<RepairRow | null> {
  const { data, error } = await supabase.from('repairs').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as RepairRow | null;
}

export async function setRepairProgress(id: string, progress: number): Promise<void> {
  const { error } = await supabase.from('repairs').update({ progress }).eq('id', id);
  if (error) throw error;
}
