import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
if (supabaseUrl === undefined || supabaseUrl.length === 0) {
    throw new Error('Missing EXPO_PUBLIC_SUPABASE_URL');
}
if (supabasePublicKey === undefined || supabasePublicKey.length === 0) {
    throw new Error('Missing EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or EXPO_PUBLIC_SUPABASE_ANON_KEY)');
}
export const supabase = createClient(supabaseUrl, supabasePublicKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
    },
});
