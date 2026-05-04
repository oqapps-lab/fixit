function requireEnv(name) {
  const value = Deno.env.get(name);
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  throw new Error(`Missing ${name} environment variable.`);
}

export function getFunctionConfig() {
  return {
    supabaseUrl: requireEnv('SUPABASE_URL'),
    serviceRoleKey: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    anthropicApiKey: requireEnv('ANTHROPIC_API_KEY'),
    anthropicEndpoint: 'https://api.anthropic.com/v1/messages',
    anthropicModel: Deno.env.get('ANTHROPIC_MODEL') ?? 'claude-sonnet-4-20250514',
  };
}
