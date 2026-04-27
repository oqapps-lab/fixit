# FixIt Database Schema (Local Supabase)

## Source of truth
- Supabase migration: `supabase/migrations/20260424010000_init_fixit_schema.sql`
- Supabase migration: `supabase/migrations/20260425232000_add_repair_content_tables.sql`
- Supabase migration: `supabase/migrations/20260426002000_add_estimate_guest_and_sources.sql`

## Tables created

### `public.estimates`
Primary estimate records (photo + context + Claude output).

Key columns:
- `user_id` (nullable for pre-auth/transition flows)
- `guest_session_id` (auth-placeholder session tracking)
- `problem_category`, `zip_code`, `country_code`, `currency_code`
- `quality_tier`, `diy_comfort`
- `issue_json`, `estimate_json`
- `trusted_sources_json`
- `mode_chosen`

### `public.projects`
Saved project history for "My Home".

Key columns (from product spec):
- `user_id`, `estimate_id`
- `category`, `photo_urls`, `diagnosis`, `estimate_json`
- `mode_chosen`, `actual_cost`, `project_date`, `notes`, `room_tag`, `outcome_status`

### `public.user_subscriptions`
Subscription entitlements used by paywall gating.

Key columns:
- `user_id` (unique)
- `tier` (`free|monthly|annual|pay_per`)
- `status` (`active|canceled|expired|grace_period`)
- `expires_at`
- Adapty references: `adapty_profile_id`, `adapty_customer_user_id`

### `public.notification_preferences`
Per-user push notification settings.

Key columns:
- `transactional_enabled`, `lifecycle_enabled`, `seasonal_enabled`, `price_alerts_enabled`
- `quiet_hours_start`, `quiet_hours_end`, `timezone`

### `public.price_alerts`
Tracked items for price-drop notifications.

Key columns:
- `user_id`, `project_id`
- `item_name`, `region_code`, `baseline_price`, `target_drop_percent`
- `is_active`, `last_checked_at`, `last_notified_at`

### `public.estimate_cache`
Backend-only Claude response cache.

Key columns:
- `cache_key`
- `request_payload`, `response_payload`
- `expires_at`

### `public.repair_templates`
App content records used by repair detail and route-selection screens.

Key columns:
- `id`, `code`, `title`, `status`, `summary`
- `impact`, `impact_description`
- `severity`, `time_estimate`, `time_unit`, `progress`, `stage_label`
- `tools` (text array)
- `route_options_json` (json array for DIY/Hybrid/Pro cards)

### `public.repair_activities`
Home overview activity feed entries.

Key columns:
- `id`, `title`, `price`, `sort_order`

## Security model
- RLS enabled on all tables above.
- User-owned tables have `auth.uid() = user_id` policies.
- `estimate_cache` is denied to `anon`/`authenticated` clients (service-role only access from server-side context such as Supabase functions).
- `repair_templates` and `repair_activities` are read-only for `anon`/`authenticated` (public select policy).
