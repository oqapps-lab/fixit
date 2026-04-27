alter table public.estimates
  add column if not exists guest_session_id text,
  add column if not exists trusted_sources_json jsonb not null default '[]'::jsonb;

create index if not exists estimates_guest_session_id_created_at_idx
  on public.estimates (guest_session_id, created_at desc);
