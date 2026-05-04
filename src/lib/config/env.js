function requireString(value, key) {
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }
  throw new Error(`Missing ${key}`);
}

const supabaseUrl = requireString(process.env.EXPO_PUBLIC_SUPABASE_URL, 'EXPO_PUBLIC_SUPABASE_URL');
const supabasePublishableKey = requireString(
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  'EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or EXPO_PUBLIC_SUPABASE_ANON_KEY)',
);

export const env = {
  supabase: {
    url: supabaseUrl,
    publishableKey: supabasePublishableKey,
  },
};
