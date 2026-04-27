-- FixIt local Supabase schema bootstrap
-- Source: product structure in docs/02-product/FEATURES.md and backend cache contract.

create extension if not exists pgcrypto;

-- Shared trigger for updated_at maintenance.
create or replace function public.set_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- Enum-like checks via domains are avoided to keep migrations explicit and simple.

create table if not exists public.estimates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  problem_category text not null,
  photo_url text,
  zip_code text not null,
  country_code text not null default 'US',
  currency_code text not null default 'USD',
  quality_tier text not null check (quality_tier in ('budget', 'standard', 'premium')),
  diy_comfort text not null check (diy_comfort in ('never', 'basic', 'confident')),
  issue_json jsonb not null default '{}'::jsonb,
  estimate_json jsonb not null,
  mode_chosen text check (mode_chosen in ('diy', 'hybrid', 'pro')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists estimates_user_id_created_at_idx
  on public.estimates (user_id, created_at desc);

create index if not exists estimates_category_idx
  on public.estimates (problem_category);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  estimate_id uuid references public.estimates(id) on delete set null,
  category text not null,
  photo_urls jsonb not null default '[]'::jsonb,
  diagnosis text,
  estimate_json jsonb,
  mode_chosen text check (mode_chosen in ('diy', 'hybrid', 'pro')),
  actual_cost numeric(12, 2),
  project_date date,
  notes text,
  room_tag text,
  outcome_status text not null default 'draft' check (outcome_status in ('draft', 'in_progress', 'completed', 'abandoned')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists projects_user_id_created_at_idx
  on public.projects (user_id, created_at desc);

create table if not exists public.user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  tier text not null default 'free' check (tier in ('free', 'monthly', 'annual', 'pay_per')),
  status text not null default 'active' check (status in ('active', 'canceled', 'expired', 'grace_period')),
  expires_at timestamptz,
  source text not null default 'adapty' check (source in ('adapty', 'manual')),
  adapty_profile_id text,
  adapty_customer_user_id text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists user_subscriptions_expires_at_idx
  on public.user_subscriptions (expires_at);

create table if not exists public.notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  transactional_enabled boolean not null default true,
  lifecycle_enabled boolean not null default true,
  seasonal_enabled boolean not null default true,
  price_alerts_enabled boolean not null default true,
  quiet_hours_start time not null default '22:00:00',
  quiet_hours_end time not null default '07:00:00',
  timezone text not null default 'UTC',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.price_alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  item_name text not null,
  region_code text,
  baseline_price numeric(12, 2),
  target_drop_percent numeric(5, 2) not null default 10 check (target_drop_percent >= 0 and target_drop_percent <= 100),
  is_active boolean not null default true,
  last_checked_at timestamptz,
  last_notified_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists price_alerts_user_id_active_idx
  on public.price_alerts (user_id, is_active);

create table if not exists public.estimate_cache (
  cache_key text primary key,
  request_payload jsonb not null,
  response_payload jsonb not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists estimate_cache_expires_at_idx
  on public.estimate_cache (expires_at);

-- Keep updated_at in sync.

drop trigger if exists set_estimates_updated_at on public.estimates;
create trigger set_estimates_updated_at
before update on public.estimates
for each row
execute procedure public.set_timestamp_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row
execute procedure public.set_timestamp_updated_at();

drop trigger if exists set_user_subscriptions_updated_at on public.user_subscriptions;
create trigger set_user_subscriptions_updated_at
before update on public.user_subscriptions
for each row
execute procedure public.set_timestamp_updated_at();

drop trigger if exists set_notification_preferences_updated_at on public.notification_preferences;
create trigger set_notification_preferences_updated_at
before update on public.notification_preferences
for each row
execute procedure public.set_timestamp_updated_at();

drop trigger if exists set_price_alerts_updated_at on public.price_alerts;
create trigger set_price_alerts_updated_at
before update on public.price_alerts
for each row
execute procedure public.set_timestamp_updated_at();

drop trigger if exists set_estimate_cache_updated_at on public.estimate_cache;
create trigger set_estimate_cache_updated_at
before update on public.estimate_cache
for each row
execute procedure public.set_timestamp_updated_at();

-- RLS
alter table public.estimates enable row level security;
alter table public.projects enable row level security;
alter table public.user_subscriptions enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.price_alerts enable row level security;
alter table public.estimate_cache enable row level security;

-- estimates policies

drop policy if exists "estimates_select_own" on public.estimates;
create policy "estimates_select_own"
  on public.estimates
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "estimates_insert_own" on public.estimates;
create policy "estimates_insert_own"
  on public.estimates
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "estimates_update_own" on public.estimates;
create policy "estimates_update_own"
  on public.estimates
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "estimates_delete_own" on public.estimates;
create policy "estimates_delete_own"
  on public.estimates
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- projects policies

drop policy if exists "projects_select_own" on public.projects;
create policy "projects_select_own"
  on public.projects
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "projects_insert_own" on public.projects;
create policy "projects_insert_own"
  on public.projects
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "projects_update_own" on public.projects;
create policy "projects_update_own"
  on public.projects
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "projects_delete_own" on public.projects;
create policy "projects_delete_own"
  on public.projects
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- subscriptions policies

drop policy if exists "user_subscriptions_select_own" on public.user_subscriptions;
create policy "user_subscriptions_select_own"
  on public.user_subscriptions
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "user_subscriptions_insert_own" on public.user_subscriptions;
create policy "user_subscriptions_insert_own"
  on public.user_subscriptions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "user_subscriptions_update_own" on public.user_subscriptions;
create policy "user_subscriptions_update_own"
  on public.user_subscriptions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- notification preferences policies

drop policy if exists "notification_preferences_select_own" on public.notification_preferences;
create policy "notification_preferences_select_own"
  on public.notification_preferences
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "notification_preferences_insert_own" on public.notification_preferences;
create policy "notification_preferences_insert_own"
  on public.notification_preferences
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "notification_preferences_update_own" on public.notification_preferences;
create policy "notification_preferences_update_own"
  on public.notification_preferences
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- price alerts policies

drop policy if exists "price_alerts_select_own" on public.price_alerts;
create policy "price_alerts_select_own"
  on public.price_alerts
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "price_alerts_insert_own" on public.price_alerts;
create policy "price_alerts_insert_own"
  on public.price_alerts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "price_alerts_update_own" on public.price_alerts;
create policy "price_alerts_update_own"
  on public.price_alerts
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "price_alerts_delete_own" on public.price_alerts;
create policy "price_alerts_delete_own"
  on public.price_alerts
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- estimate_cache is backend-only (service role), deny direct client access.

drop policy if exists "estimate_cache_deny_client_select" on public.estimate_cache;
create policy "estimate_cache_deny_client_select"
  on public.estimate_cache
  for select
  to anon, authenticated
  using (false);

drop policy if exists "estimate_cache_deny_client_insert" on public.estimate_cache;
create policy "estimate_cache_deny_client_insert"
  on public.estimate_cache
  for insert
  to anon, authenticated
  with check (false);

drop policy if exists "estimate_cache_deny_client_update" on public.estimate_cache;
create policy "estimate_cache_deny_client_update"
  on public.estimate_cache
  for update
  to anon, authenticated
  using (false)
  with check (false);

drop policy if exists "estimate_cache_deny_client_delete" on public.estimate_cache;
create policy "estimate_cache_deny_client_delete"
  on public.estimate_cache
  for delete
  to anon, authenticated
  using (false);

-- Storage bucket for repair images.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-photos',
  'project-photos',
  false,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;
