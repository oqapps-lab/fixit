# Local Supabase (Docker)

## One-time setup

```bash
cd /Users/lanabey/dev/fixit
npm run supabase:start
npm run supabase:db:reset
```

What this does:
1. Starts local Supabase core services with Docker.
2. Applies migration `supabase/migrations/20260424010000_init_fixit_schema.sql`.
3. Applies migration `supabase/migrations/20260425232000_add_repair_content_tables.sql`.
4. Applies migration `supabase/migrations/20260426002000_add_estimate_guest_and_sources.sql`.
5. Runs `supabase/seed.sql` to populate UI content tables (`repair_templates`, `repair_activities`).

## Daily commands

Start services:
```bash
npm run supabase:start
```

Show env values (URL + keys):
```bash
npm run supabase:status
```

Reset DB to migration state:
```bash
npm run supabase:db:reset
```

Stop services:
```bash
npm run supabase:stop
```

## Edge Function (Claude analysis)

Set Anthropic key for local edge runtime:

```bash
cp supabase/functions/.env.example supabase/functions/.env
# edit supabase/functions/.env and set ANTHROPIC_API_KEY
```

Restart Supabase after changing function env:

```bash
npm run supabase:stop
npm run supabase:start
```

## Local endpoints
- API URL: `http://127.0.0.1:54321`
- Postgres: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`

Use `npm run supabase:status` to get current local URL and keys for app/server-side configuration.
