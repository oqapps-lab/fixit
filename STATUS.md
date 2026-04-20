# Project FixIt — Status

**Last updated:** 2026-04-20 (Stage 06 day 1)
**Current stage:** Stage 06 Development — ~30 screens shipped
**Current phase:** Batches 1-2-3-7 complete. Batches 4-5-6 pending.

## Timeline

- [x] 01 Research
- [x] 02 Product
- [x] 03 Practices research
- [x] 04 UX
- [x] 05 Design (Noir v2, 2026-04-20)
- [-] 06 Development — IN PROGRESS
- [ ] 07 Implementation
- [ ] 08 Deployment

## Last session (2026-04-20, Stage 06 batch 1-2-3-7)

**What got done:**
- Wrote `docs/07-development/NAVIGATION-MAP.md` — full route table + edge graph + batch dependency chart
- **Batch 1 Onboarding (7 files)** — `(onboarding)/_layout + welcome + location + camera-primer + capture + context + processing + signup-ask`. Full onboarding flow end-to-end.
- **Batch 2 Auth (3 files, via agent)** — `(auth)/_layout + sign-up + sign-in`. Apple / Google / Email buttons stubbed to `/(tabs)`.
- **Batch 3 Paywall (8 files, via agent)** — `paywall/_layout + index (5.1) + save (5.2.1) + warranty (5.2.2) + pdf (5.2.3) + alerts (5.2.4) + success (5.3) + manage (5.4)`. Annual $49.99 preselected, monthly $9.99, pay-per $2.99 fallback.
- **Batch 7 Error (10 files, via agent)** — `error/_layout + offline + camera-unavailable + ai-failed + location-denied + blurry + unknown-problem + sub-failed + force-update + maintenance`. 7 transparentModal sheets + 2 fullscreen blockers.
- Added `'secondary' | 'tertiary' | 'mint'` tones to `SerifHero` primitive
- Registered `(onboarding) / (auth) / paywall / error` Stacks in root `app/_layout.tsx`
- Verified on sim: Welcome + Location + Camera Primer rendered correctly

**Screens implemented this session:** 28 (7 onboarding + 3 auth + 8 paywall + 10 error)
**Total FixIt screens now:** ~38 / 45 MVP

**Simulator:** iPhone Air `DE5CF528-48EA-4E46-A718-F4D1A46194E5`, Metro on port 8084 (LAN `192.168.50.61`)

**Next action for next session (Batches 4-5-6):**
- Read `docs/04-ux/SCREEN-MAP.md` sections 3.x (Tab sub-screens)
- Build **Batch 4** — Settings + Account + Notifications Prefs + Appearance + Privacy (5 screens under `app/settings/`)
- Build **Batch 5** — Estimates sub-screens: list / detail / comparison (3 screens)
- Build **Batch 6** — My Home sub-screens: profile edit / room detail / maintenance calendar (3 screens) + Notifications Center + Saved Projects + Invite Friends
- Then L3 visual parity pass + full flow walk on sim + final push

## Blockers

- **Glyphs consolidation** (flagged by paywall-agent) — CheckGlyph/BookmarkGlyph/ShieldGlyph/DocumentGlyph need to be promoted from inline SVGs in paywall/* into `components/ui/NoirGlyphs.tsx` for reuse in warranty/saved-projects/notifications
- **hairlineDanger token missing** (flagged by error-agent) — `rgba(255,90,90,0.35)` used inline in `ai-failed.tsx` + `sub-failed.tsx`. Add to `constants/tokens.ts`
- **Placeholder URLs** — `error/force-update.tsx` has `idYOUR_APP_ID` placeholder, must be filled before ship
- **SignupAsk stubs** — social auth buttons `router.replace('/(tabs)')` without real Supabase/Apple/Google — real auth in Stage 07

## Notes

- Design direction = **FixIt Noir**. See `docs/06-design/DESIGN-GUIDE.md`
- Design source = Stitch project `4884422333715047255`, 12 curated screens at `docs/06-design/stitch-raw/screenshots/`
- Metro runs on `--lan --port 8084` for Windows-VM-Claude (NOT 8081/8082 which other agents use)
- Expo Go cache: after code changes, `mobile_terminate_app host.exp.Exponent` + reopen URL
- Multi-agent parallelization worked well: 3 agents wrote 21 files simultaneously in ~5-6 min each
