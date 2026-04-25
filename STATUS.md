# Project FixIt — Status

**Last updated:** 2026-04-22 (Stage 06 day 3 — autonomous sprint)
**Current stage:** Stage 06 Development — ~52 screens shipped
**Current phase:** Batches 1-7 all complete. UX QA pass landed.

## Timeline

- [x] 01 Research
- [x] 02 Product
- [x] 03 Practices research
- [x] 04 UX
- [x] 05 Design (Noir v2, 2026-04-20)
- [-] 06 Development — IN PROGRESS, ~85% (Batches 1–7 done, 1 visual-parity polish pass left)
- [ ] 07 Implementation (real Supabase / Adapty / Claude API integration)
- [ ] 08 Deployment

## Last session (2026-04-22, autonomous 10h sprint, branch `qa-autonomous-2026-04-22`)

**What got done:**

### Phase 1 — Blocker cleanup
- Added `CheckGlyph` to `components/ui/NoirGlyphs.tsx` — was imported by
  `processing.tsx` + `paywall/success.tsx` but never exported, **crashed
  Processing screen mid-onboarding** (B1 from QA pass)
- Added `BookmarkGlyph / ShieldGlyph / DocumentGlyph` to NoirGlyphs,
  removed inline copies from `paywall/save.tsx + warranty.tsx + pdf.tsx`
- Added `colors.hairlineDanger` token, replaced inline `rgba(255,90,90,0.35)`
  in `error/ai-failed.tsx + sub-failed.tsx`
- Hardened `Label` and `DocRef`: accept `React.ReactNode`, flatten via
  recursive helper before `.toUpperCase()` — fixes the
  `<DocRef>STEP {n} OF 5</DocRef>` array-children crash (B2)

### Phase 2 — Batch 4 Settings (5 screens)
- `app/settings/_layout.tsx`
- `app/settings/index.tsx` — 5-row config menu
- `app/settings/account.tsx` — email, sign-in method, password reset,
  sign out, GDPR delete-account
- `app/settings/notifications.tsx` — 5 channel toggles + quiet hours
- `app/settings/appearance.tsx` — theme radio with swatches + amber-active
- `app/settings/privacy.tsx` — photo retention radio, analytics opt-out,
  crash reports, export JSON, delete photos, policy deeplinks

### Phase 3 — UX fixes from QA pass
- **H1 Location keyboard avoiding** — wrap content in
  `KeyboardAvoidingView` + `ScrollView`, drop `autoFocus`, auto-dismiss
  keyboard on 5 digits, `returnKey=done` + `onSubmitEditing`,
  `accessibilityValue` exposes ZIP correctly (also fixes L1)
- **M1 a11y on fix-selection** — `accessibilityLabel + accessibilityHint`
  on `RouteCard` Pressable
- **M2 status bar bleed** — `NoirScreen` renders top fade gradient
  (`insets.top + 12px`) by default, prop `topFade` to opt out
- **L2 low-contrast progress %** — repairs tab progress text now
  `textSecondary + monoMedium + labelSmall`, fixed-width right-aligned

### Phase 4 — Batch 5 Estimates (3 screens + mock)
- `mock/estimates.ts` — 6 sample estimates with diy/hybrid/pro ladders,
  chosenMode + actualPaid + savingsVsPro
- `app/estimates/_layout.tsx` + `index.tsx` — filter pills (5),
  3-way sort, long-press multi-select (cap 3), sticky compare dock
- `app/estimates/[id].tsx` — full detail: blueprint photo, diagnosis,
  impact hero, three mode radios, live savings card, share + export PDF
- `app/estimates/compare.tsx` — side-by-side 2-3, per-row mode picker,
  aggregated totals (PICKS / ALL DIY / ALL PRO / YOU SAVE)
- Wired entry from repairs tab "VIEW ALL →" + vault Saved Projects card

### Phase 5 — Batch 6 (6 screens)
- `app/home/_layout.tsx`
- `app/home/edit.tsx` — Home Profile Edit (3.2.2): home type radio,
  year-built ±10 stepper with progress track, rooms multi-select grid
- `app/home/room/[name].tsx` — Room Detail (3.2.3): per-room metadata,
  related estimates timeline, stats trio, 8 room presets
- `app/home/maintenance.tsx` — Maintenance Calendar (3.2.4): seasonal
  task list, status trio, upcoming-3, season filter pills, mark-done
- `app/notifications-center.tsx` — Inbox (6.1): 6 mock notifications,
  tone-coded ticks, mark-all-read, long-press dismiss
- `app/saved-projects.tsx` — Saved Projects (3.4.2): bookmark-toggle,
  free-tier banner with paywall route, empty state
- `app/invite.tsx` — Referral (3.4.4): big amber code, share-sheet via
  Share API, invited/earned stats, 3-step explainer
- Wired Systems tab: amber bell → notifications-center,
  SCHEDULE 3 DUE → maintenance, PROFILE METADATA → home/edit

**Screens implemented this session:** 14 new (5 settings + 3 estimates + 6 batch-6)
**Total FixIt screens now:** ~52 / 45 MVP (over MVP scope, polish-ready)

**Simulator:** iPhone 17 Pro `AF4951D7-668C-46F6-8FA1-0C564F0B7765` (slot 2),
Metro on port 8087 (8084 was occupied by freshcheck)

## Branch

All work committed on `qa-autonomous-2026-04-22` (NOT pushed):
- `phase 1: unblock render crashes + promote inline glyphs`
- `phase 2: Batch 4 Settings (5 screens) + wire from Vault`
- `phase 3: UX fixes from QA pass`
- `phase 4: Batch 5 — Estimates sub-screens (list · detail · compare)`
- `phase 5: Batch 6 — My Home + Notifications + Saved + Invite`
- `phase 6: STATUS update + final QA notes`

Diff against `main`: `git log main..qa-autonomous-2026-04-22 --oneline`
Inspect changes: `git diff main..qa-autonomous-2026-04-22 --stat`

## Blockers

- ~~**Glyphs consolidation**~~ → DONE
- ~~**hairlineDanger token missing**~~ → DONE
- **Placeholder URLs** — `error/force-update.tsx` has `idYOUR_APP_ID`
  placeholder — must be filled before App Store submission (Stage 08)
- **SignupAsk stubs** — social auth buttons `router.replace('/(tabs)')`
  without real Supabase/Apple/Google — real auth in Stage 07

## Open polish items (next pass)

- Light-mode swatches in Appearance are placeholder copy — actual light
  theme not wired (planned v0.3 per copy)
- `home-overview.tsx` (standalone) and `(tabs)/index.tsx` overlap —
  consolidate to one canonical Home view in next pass
- Narrow-device test (iPhone SE 375pt) not yet done — Phase 6 only
  covered iPhone 17 Pro 402pt
- Visual parity check vs Stitch references — last pass before ship

## Notes

- Design direction = **FixIt Noir**. See `docs/06-design/DESIGN-GUIDE.md`
- Design source = Stitch project `4884422333715047255`, 12 curated screens
  at `docs/06-design/stitch-raw/screenshots/`
- Metro runs on `--lan --port 8087` (port 8084 default in earlier docs is
  taken by freshcheck — use 8087 going forward)
- Expo Go cache: after code changes, `mobile_terminate_app host.exp.Exponent`
  + reopen URL
- Multi-agent parallelization: not used this session — built sequentially
  with consistent design-token usage
