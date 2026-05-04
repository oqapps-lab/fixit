import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/config/env';
export const supabase = createClient(env.supabase.url, env.supabase.publishableKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
    },
});
