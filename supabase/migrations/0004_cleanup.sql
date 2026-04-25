-- FixIt Stage 07 cleanup
-- 1. Drop redundant idx_profiles_referral (UNIQUE constraint already creates index)
drop index if exists idx_profiles_referral;

-- 2. Document estimates.photo_id ON DELETE SET NULL choice
comment on column estimates.photo_id is
  'Nullable + ON DELETE SET NULL: deleting a photo retains the estimate (history preserved).';
