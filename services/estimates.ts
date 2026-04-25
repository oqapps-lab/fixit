import { supabase } from '@/lib/supabase';
import type { EstimateRow } from '@/types/database';

export async function listEstimates(): Promise<EstimateRow[]> {
  const { data, error } = await supabase
    .from('estimates')
    .select('*')
    .order('captured_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getEstimate(id: string): Promise<EstimateRow | null> {
  const { data, error } = await supabase.from('estimates').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function listSavedEstimates(): Promise<EstimateRow[]> {
  const { data, error } = await supabase
    .from('estimates')
    .select('*')
    .eq('is_saved', true)
    .order('captured_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function setEstimateSaved(id: string, isSaved: boolean): Promise<void> {
  const { error } = await supabase.from('estimates').update({ is_saved: isSaved }).eq('id', id);
  if (error) throw error;
}

export async function setEstimateMode(
  id: string,
  chosenMode: 'diy' | 'hybrid' | 'pro' | null,
): Promise<void> {
  const { error } = await supabase.from('estimates').update({ chosen_mode: chosenMode }).eq('id', id);
  if (error) throw error;
}

export function totalSavings(rows: EstimateRow[]): number {
  return rows.reduce((acc, e) => acc + Number(e.savings_vs_pro ?? 0), 0);
}

export function formatCapturedAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
