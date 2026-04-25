-- FixIt Stage 07 — initial schema.
-- Mirrors mock/* shapes so wiring screens stays mechanical.

-- ─────────────────────────────────────────────────────────────────────────────
-- Extensions
-- ─────────────────────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────────────────
-- Enums
-- ─────────────────────────────────────────────────────────────────────────────
create type severity as enum ('low','moderate','high');
create type chosen_mode as enum ('diy','hybrid','pro');
create type estimate_status as enum ('draft','in-progress','completed','archived');
create type room_kind as enum ('kitchen','bath','living','bedroom','exterior','laundry','garage','attic');
create type category_kind as enum ('plumbing','electrical','walls','appliance','roof','floor','hvac');
create type subscription_plan as enum ('free','pro_monthly','pro_yearly','lifetime');
create type subscription_status as enum ('active','expired','cancelled','grace');
create type notification_tone as enum ('info','success','warn','danger');
create type season_kind as enum ('spring','summer','fall','winter');
create type home_kind as enum ('house','apartment','condo','townhouse','other');

-- ─────────────────────────────────────────────────────────────────────────────
-- Helper: updated_at trigger
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$ language plpgsql;

-- ─────────────────────────────────────────────────────────────────────────────
-- profiles — one row per auth.users entry, auto-created on signup
-- ─────────────────────────────────────────────────────────────────────────────
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  home_kind home_kind default 'house',
  home_year_built int,
  home_zip text,
  rooms room_kind[] default array['kitchen','bath','living','bedroom']::room_kind[],
  referral_code text unique,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create trigger trg_profiles_updated before update on profiles for each row execute function set_updated_at();
create index idx_profiles_referral on profiles(referral_code);

-- ─────────────────────────────────────────────────────────────────────────────
-- photos — storage refs + analysis state
-- ─────────────────────────────────────────────────────────────────────────────
create table photos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null,
  caption text,
  ai_analyzed bool not null default false,
  ai_confidence numeric(3,2),
  captured_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);
create index idx_photos_user_captured on photos(user_id, captured_at desc);

-- ─────────────────────────────────────────────────────────────────────────────
-- estimates — AI-priced ladders with diy/hybrid/pro bands
-- ─────────────────────────────────────────────────────────────────────────────
create table estimates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  photo_id uuid references photos(id) on delete set null,
  code text not null, -- public-facing short code, e.g., EST-2026-0421-RL
  title text not null,
  room room_kind not null,
  category category_kind not null,
  diy_price numeric(10,2) not null,
  hybrid_price numeric(10,2) not null,
  pro_price numeric(10,2) not null,
  chosen_mode chosen_mode,
  actual_paid numeric(10,2),
  severity severity not null default 'low',
  diagnosis text not null,
  savings_vs_pro numeric(10,2) not null default 0,
  status estimate_status not null default 'draft',
  is_saved bool not null default false,
  captured_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create trigger trg_estimates_updated before update on estimates for each row execute function set_updated_at();
create index idx_estimates_user_captured on estimates(user_id, captured_at desc);
create index idx_estimates_user_saved on estimates(user_id) where is_saved = true;

-- ─────────────────────────────────────────────────────────────────────────────
-- repairs — full repair workflow guide for an estimate
-- ─────────────────────────────────────────────────────────────────────────────
create table repairs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  estimate_id uuid references estimates(id) on delete cascade,
  code text not null,
  title text not null,
  status text not null default 'Active Repair',
  summary text,
  impact text,
  impact_description text,
  severity severity not null default 'low',
  time_estimate text,
  time_unit text,
  progress numeric(3,2) not null default 0, -- 0..1
  stage_label text,
  tools text[] not null default array[]::text[],
  routes jsonb not null default '[]'::jsonb, -- [{key, label, price, meta, recommended?}]
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create trigger trg_repairs_updated before update on repairs for each row execute function set_updated_at();
create index idx_repairs_user on repairs(user_id, created_at desc);
create index idx_repairs_estimate on repairs(estimate_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- room_metadata — per-user per-room facts (brands, models, last inspected)
-- ─────────────────────────────────────────────────────────────────────────────
create table room_metadata (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  room room_kind not null,
  meta jsonb not null default '{}'::jsonb, -- e.g., {"faucet":"Moen 7294","dishwasher":"Bosch SHPM78Z55N"}
  last_inspected_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique(user_id, room)
);
create trigger trg_room_metadata_updated before update on room_metadata for each row execute function set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- maintenance_tasks — seasonal task list
-- ─────────────────────────────────────────────────────────────────────────────
create table maintenance_tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  season season_kind not null,
  due_date date,
  done_at timestamptz,
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);
create index idx_maintenance_user_due on maintenance_tasks(user_id, due_date);

-- ─────────────────────────────────────────────────────────────────────────────
-- notifications — inbox
-- ─────────────────────────────────────────────────────────────────────────────
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  meta text, -- e.g., "SENSOR 04 · 12 MINS AGO"
  tone notification_tone not null default 'info',
  read_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);
create index idx_notifications_user_unread on notifications(user_id, created_at desc) where read_at is null;

-- ─────────────────────────────────────────────────────────────────────────────
-- referrals — invite stats
-- ─────────────────────────────────────────────────────────────────────────────
create table referrals (
  user_id uuid primary key references auth.users(id) on delete cascade,
  invited_count int not null default 0,
  earned_count int not null default 0,
  updated_at timestamptz not null default timezone('utc', now())
);
create trigger trg_referrals_updated before update on referrals for each row execute function set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- subscriptions — stub for Adapty integration
-- ─────────────────────────────────────────────────────────────────────────────
create table subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan subscription_plan not null default 'free',
  status subscription_status not null default 'active',
  expires_at timestamptz,
  adapty_profile_id text,
  updated_at timestamptz not null default timezone('utc', now())
);
create trigger trg_subscriptions_updated before update on subscriptions for each row execute function set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Auto-bootstrap profile + referral_code + subscription on signup
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function handle_new_user() returns trigger as $$
declare
  base_code text;
  short_code text;
  attempt int := 0;
begin
  -- profiles row
  base_code := upper(coalesce(split_part(new.email, '@', 1), 'user'));
  base_code := regexp_replace(base_code, '[^A-Z0-9]', '', 'g');
  if length(base_code) = 0 then base_code := 'USER'; end if;
  loop
    short_code := 'FIXIT-' || base_code || '-' || (100 + floor(random() * 900))::int;
    exit when not exists (select 1 from profiles where referral_code = short_code) or attempt >= 5;
    attempt := attempt + 1;
  end loop;

  insert into profiles (id, email, referral_code)
  values (new.id, new.email, short_code);

  insert into referrals (user_id) values (new.id);
  insert into subscriptions (user_id) values (new.id);

  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();
