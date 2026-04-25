import { supabase } from '@/lib/supabase';
import type { ProfileRow, ReferralRow, SubscriptionRow } from '@/types/database';

export async function getMyProfile(): Promise<ProfileRow | null> {
  const { data, error } = await supabase.from('profiles').select('*').single();
  if (error) {
    if (error.code === 'PGRST116') return null; // 0 rows
    throw error;
  }
  return data;
}

export async function updateMyProfile(patch: Partial<ProfileRow>): Promise<ProfileRow> {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('Not signed in');
  const { data, error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', user.user.id)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function getMyReferral(): Promise<ReferralRow | null> {
  const { data, error } = await supabase.from('referrals').select('*').single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function getMySubscription(): Promise<SubscriptionRow | null> {
  const { data, error } = await supabase.from('subscriptions').select('*').single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}
