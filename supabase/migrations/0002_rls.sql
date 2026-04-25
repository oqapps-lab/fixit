-- FixIt Stage 07 — Row Level Security: every user sees only their own rows.

alter table profiles enable row level security;
alter table photos enable row level security;
alter table estimates enable row level security;
alter table repairs enable row level security;
alter table room_metadata enable row level security;
alter table maintenance_tasks enable row level security;
alter table notifications enable row level security;
alter table referrals enable row level security;
alter table subscriptions enable row level security;

-- profiles: read own; update own; insert handled by trigger only.
create policy "profiles: select own" on profiles for select using (auth.uid() = id);
create policy "profiles: update own" on profiles for update using (auth.uid() = id);

-- photos
create policy "photos: select own" on photos for select using (auth.uid() = user_id);
create policy "photos: insert own" on photos for insert with check (auth.uid() = user_id);
create policy "photos: update own" on photos for update using (auth.uid() = user_id);
create policy "photos: delete own" on photos for delete using (auth.uid() = user_id);

-- estimates
create policy "estimates: select own" on estimates for select using (auth.uid() = user_id);
create policy "estimates: insert own" on estimates for insert with check (auth.uid() = user_id);
create policy "estimates: update own" on estimates for update using (auth.uid() = user_id);
create policy "estimates: delete own" on estimates for delete using (auth.uid() = user_id);

-- repairs
create policy "repairs: select own" on repairs for select using (auth.uid() = user_id);
create policy "repairs: insert own" on repairs for insert with check (auth.uid() = user_id);
create policy "repairs: update own" on repairs for update using (auth.uid() = user_id);
create policy "repairs: delete own" on repairs for delete using (auth.uid() = user_id);

-- room_metadata
create policy "room_metadata: select own" on room_metadata for select using (auth.uid() = user_id);
create policy "room_metadata: insert own" on room_metadata for insert with check (auth.uid() = user_id);
create policy "room_metadata: update own" on room_metadata for update using (auth.uid() = user_id);
create policy "room_metadata: delete own" on room_metadata for delete using (auth.uid() = user_id);

-- maintenance_tasks
create policy "maintenance_tasks: select own" on maintenance_tasks for select using (auth.uid() = user_id);
create policy "maintenance_tasks: insert own" on maintenance_tasks for insert with check (auth.uid() = user_id);
create policy "maintenance_tasks: update own" on maintenance_tasks for update using (auth.uid() = user_id);
create policy "maintenance_tasks: delete own" on maintenance_tasks for delete using (auth.uid() = user_id);

-- notifications
create policy "notifications: select own" on notifications for select using (auth.uid() = user_id);
create policy "notifications: insert own" on notifications for insert with check (auth.uid() = user_id);
create policy "notifications: update own" on notifications for update using (auth.uid() = user_id);
create policy "notifications: delete own" on notifications for delete using (auth.uid() = user_id);

-- referrals
create policy "referrals: select own" on referrals for select using (auth.uid() = user_id);
create policy "referrals: update own" on referrals for update using (auth.uid() = user_id);

-- subscriptions
create policy "subscriptions: select own" on subscriptions for select using (auth.uid() = user_id);
create policy "subscriptions: update own" on subscriptions for update using (auth.uid() = user_id);
