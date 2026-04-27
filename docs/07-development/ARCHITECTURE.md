# FixIt Architecture (v0)

## Goal
Keep architecture simple:
- Mobile app (Expo React Native) in this repo.
- Supabase as the backend platform (Auth, Postgres, Storage, RLS).
- No custom Node/Nest middleware layer.

## Runtime boundaries

### Frontend app
- `src/app/` routes and screens
- `src/components/` UI and feature components
- `src/constants/`, `src/hooks/`
- `src/lib/supabase/client.js` direct Supabase client
- `src/lib/data/` typed data access for app content tables
- `src/lib/estimate/` photo + intake + analyze pipeline (frontend orchestration)

### Backend platform (managed)
- `supabase/` local config and SQL migrations
- DB schema + RLS policies live in migrations
- UI seed content lives in `supabase/seed.sql` (no runtime mock files)
- `supabase/functions/analyze-issue` handles secure Anthropic API calls + estimate persistence

### Documentation
- `docs/` research/product/design/ux/dev/deployment docs

## Data access pattern
1. Frontend uses `src/lib/supabase/client.js`.
2. Frontend reads/writes directly to Supabase tables (respecting RLS).
3. No app-owned REST server in this repository.

## Current schema source
- `supabase/migrations/20260424010000_init_fixit_schema.sql`
- `supabase/migrations/20260425232000_add_repair_content_tables.sql`
- `supabase/migrations/20260426002000_add_estimate_guest_and_sources.sql`
- Summary: `docs/05-database/SCHEMA.md`

## Local development flow
1. Start Supabase: `npm run supabase:start`
2. Apply/reset schema: `npm run supabase:db:reset`
3. Export local keys: `npm run supabase:status`
4. Set `.env` from `.env.example`
5. Run mobile app: `npm run start` / `npm run ios` / `npm run android`
