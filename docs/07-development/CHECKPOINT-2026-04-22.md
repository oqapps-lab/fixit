# FixIt — Autonomous Sprint Checkpoint (2026-04-22)

**Paused at:** end of Phase 2 (Batch 4 Settings), мид-sprint
**Branch:** `qa-autonomous-2026-04-22` (local only, not pushed)

---

## Phase roadmap

| # | Phase | Status |
|---|---|---|
| 1 | Blockers cleanup (glyphs, hairlineDanger, B2 root cause) | ✅ Done + committed |
| 2 | Batch 4 Settings (5 screens) | ✅ Code done, tested Settings index on sim. Need commit |
| 3 | UX fixes (keyboard, a11y, status bar, contrast) | ⏳ Pending |
| 4 | Batch 5 Estimates sub-screens (3 screens) | ⏳ Pending |
| 5 | Batch 6 My Home + Notifications + Saved + Invite (6 screens) | ⏳ Pending (5 файлов уже pre-registered в root _layout linter'ом) |
| 6 | Final QA pass (narrow device + paywall/error sub-screens) | ⏳ Pending |

---

## Phase 1 — DONE (commit `ba22f05`)

**Unblock render crashes + promote inline glyphs.**

Files changed:
- `components/ui/NoirGlyphs.tsx` — added `CheckGlyph`, `BookmarkGlyph`, `ShieldGlyph`, `DocumentGlyph` exports
- `components/ui/Label.tsx` + `DocRef.tsx` — accept `React.ReactNode` + `flatten()` helper → `.toUpperCase()` safe
- `constants/tokens.ts` — added `hairlineDanger` token
- `app/paywall/save.tsx` + `warranty.tsx` + `pdf.tsx` — removed inline glyph funcs, import from NoirGlyphs
- `app/error/ai-failed.tsx` + `sub-failed.tsx` — replaced inline `rgba(255,90,90,0.35)` with `colors.hairlineDanger`
- `docs/07-development/QA-PASS-2026-04-22.md` — full QA report

**B2 root cause:** `<DocRef>STEP {stepN} OF 5</DocRef>` creates a children array (strings + number) — `array.toUpperCase()` is undefined. Now handled via `flatten()`.

**Verified on sim (slot 2 AF4951D7, iPhone 17 Pro, Metro 8087):** Processing screen no longer crashes, Blueprints tab renders cleanly.

---

## Phase 2 — Code done, NOT committed

**Batch 4 Settings — 5 screens built:**

New files:
- `app/settings/_layout.tsx` — Stack с slide_from_right
- `app/settings/index.tsx` — Settings menu (Profile + Data & Plan sections, 5 rows)
- `app/settings/account.tsx` — Email, Apple sign-in meta, password reset, sign out, delete account (Danger zone)
- `app/settings/notifications.tsx` — 5 channel toggles (progress / seasonal / pricedrop / savings / tips) + quiet hours switch
- `app/settings/appearance.tsx` — Theme radio (System / Dark / Light-preview locked)
- `app/settings/privacy.tsx` — Photo retention radio (30d/90d/forever) + analytics/crash toggles + Export JSON + Delete photos + policy links

Touched files:
- `app/_layout.tsx` — registered `settings` в root Stack; removed `(onboarding)/signup-ask` redundant registration (linter pre-added `estimates / home / notifications-center / saved-projects / invite` registrations — files будут созданы в фазе 4-5)
- `app/(tabs)/vault.tsx` — добавил `CollectionRow` helper, wired Collections + Account section (Settings, Invite friends)

**Tested:** Settings index экран rendered чисто на sim, все 5 rows видимы, design-system consistent с остальным приложением. Скриншот `/tmp/fixit_settings2.png`.

**Blockers для commit:**
- Linter pre-registered 5 Stack.Screen entries для файлов которые пока не существуют → Metro WARN но не crash. Создать эти файлы в фазе 4-5.
- `(tabs)/vault.tsx` — Saved Projects / Invite сейчас route'ятся на `/estimates` и `/invite` (пока не созданы) — сработают когда добавим в фазе 5.

---

## При продолжении

### 1. Восстановить среду

```bash
# Booted sim if needed
xcrun simctl boot AF4951D7-668C-46F6-8FA1-0C564F0B7765

# Start Metro
cd /Users/evgenij/Desktop/work/APP_DEVELOPMENT/FixIt
nohup npx expo start --lan --port 8087 > /tmp/fixit_metro.log 2>&1 &

# Launch Expo Go + open bundle
xcrun simctl launch AF4951D7-668C-46F6-8FA1-0C564F0B7765 host.exp.Exponent
sleep 3
xcrun simctl openurl AF4951D7-668C-46F6-8FA1-0C564F0B7765 "exp://192.168.50.60:8087"
```

### 2. Проверить git state

```bash
cd /Users/evgenij/Desktop/work/APP_DEVELOPMENT/FixIt
git status       # should show 7 changed/new файлов для Phase 2
git log --oneline -5
# ba22f05 phase 1: unblock render crashes + promote inline glyphs
```

### 3. Закоммитить Phase 2 (если ещё не закоммичено)

```bash
git add app/settings app/(tabs)/vault.tsx app/_layout.tsx
git commit -m "phase 2: Batch 4 Settings (5 screens) + wire from Vault"
```

### 4. Продолжить с Phase 3

Приоритет — UX fixes из QA-PASS-2026-04-22.md:
- **H1** Location step: обернуть в `KeyboardAvoidingView` behavior="padding"
- **M1** Option-cards: `<Pressable accessibilityRole="button" accessibilityLabel=...>` на Context + Fix-Selection
- **M2** Status bar overlap: top-gradient overlay в NoirScreen ИЛИ translucent=false + bg colour
- **L1** ZIP a11y: `accessibilityValue={{ text: zip || 'empty' }}`
- **L2** Progress % contrast: textDim → textSecondary
- **L3** "Roof Inspection Recommended" — expand UX (chevron + full body)

Тестовые экраны (для temporary redirect в index.tsx):
- `/(onboarding)/location` — проверить keyboard avoidance
- `/(onboarding)/context` — a11y options
- `/(tabs)` — status bar + low-contrast progress

---

## Environment notes

- **Sim slot 2:** `AF4951D7-668C-46F6-8FA1-0C564F0B7765` — iPhone 17 Pro, owned by FixIt
- **Metro port:** 8087 (8084 занят freshcheck)
- **LAN IP:** 192.168.50.60
- **Branch:** `qa-autonomous-2026-04-22` (local only — user подтвердит push)

Никакие чужие симуляторы не трогал. Только slot 2.
