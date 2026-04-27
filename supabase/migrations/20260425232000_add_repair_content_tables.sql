-- Content tables for app UI data that previously lived in mock/repair.ts.

create table if not exists public.repair_templates (
  id text primary key,
  code text not null,
  title text not null,
  status text not null,
  summary text not null,
  impact text not null,
  impact_description text not null,
  severity text not null check (severity in ('low', 'moderate', 'high')),
  time_estimate text not null,
  time_unit text not null,
  progress numeric(4, 3) not null check (progress >= 0 and progress <= 1),
  stage_label text not null,
  tools text[] not null default '{}',
  route_options_json jsonb not null default '[]'::jsonb check (jsonb_typeof(route_options_json) = 'array'),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.repair_activities (
  id text primary key,
  title text not null,
  price text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_repair_templates_updated_at on public.repair_templates;
create trigger set_repair_templates_updated_at
before update on public.repair_templates
for each row
execute procedure public.set_timestamp_updated_at();

drop trigger if exists set_repair_activities_updated_at on public.repair_activities;
create trigger set_repair_activities_updated_at
before update on public.repair_activities
for each row
execute procedure public.set_timestamp_updated_at();

create index if not exists repair_activities_sort_order_idx
  on public.repair_activities (sort_order asc, created_at desc);

alter table public.repair_templates enable row level security;
alter table public.repair_activities enable row level security;

drop policy if exists "repair_templates_select_public" on public.repair_templates;
create policy "repair_templates_select_public"
  on public.repair_templates
  for select
  to anon, authenticated
  using (true);

drop policy if exists "repair_activities_select_public" on public.repair_activities;
create policy "repair_activities_select_public"
  on public.repair_activities
  for select
  to anon, authenticated
  using (true);
