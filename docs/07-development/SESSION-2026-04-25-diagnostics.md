# FixIt — Полная диагностика и UI-QA (2026-04-25 → 2026-04-26)

**Mode:** автономный multi-agent. 4 read-only диагностических + 4 fix-агента + live UI walk + БД-миграция.
**Финал:** 2 коммита на `main`, запушено в `oqapps-lab/fixit`.

---

## TL;DR

Прогнал 4 параллельных read-only диагностики (TS strict / ESLint / npm audit / dead code, RLS + cross-user attacks, integration smoke на REST + Storage + Auth, code review каждого экрана) → 58 находок (2 BLOCKER + 23 HIGH + 20 MEDIUM + 13 LOW).

Применил исправления через 4 параллельных fix-агента, разделённых по файлам без коллизий. Закрыл оба BLOCKER, большую часть HIGH, ключевые MEDIUM. Применил миграцию `0004_cleanup.sql` к продакшен-БД. Удалил 2 deprecated dependency, добавил `expo-clipboard`, выровнял 8 пакетов под SDK 55.17. Снял 14 `as any` каст с router.push (typed routes теперь работают).

Live UI-walk прошёл на Claude QA sim (7CDEA30A) на demo и empty user'ах. Empty states работают. ZIP/maintenance/notifications/saved — все из живой БД, цифры корректны.

**TypeScript strict pass: 0 errors. Все 9 RLS политик блокируют cross-user attacks. 10/10 integration tests PASS.**

---

## Что заехало (commits)

```
fbfb95c fix(diagnostics): apply 58-finding sweep — BLOCKERs + HIGH + MEDIUM
8de8800 docs: Stage 07 session report
... (предыдущая сессия — Stage 07 base)
```

**21 файл, +1160/-752 строк, 1 новая SQL миграция.**

---

## Diagnostics результаты

### Diag A — Static analysis (read-only)

| # | Категория | Результат | Severity |
|---|---|---|---|
| 1 | TypeScript strict | 0 errors | INFO |
| 2 | ESLint | not configured | LOW |
| 3 | expo-doctor | 16/18 PASS — `newArchEnabled` legacy + 10 patch-stale | MEDIUM → **fixed** |
| 4 | npm audit | 12 moderate (build-toolchain only), 0 high/crit | LOW |
| 5 | Dead exports | 6 неиспользуемые service функции (запас для UI) | LOW |
| 6 | Unused npm deps | `base64-arraybuffer`, `expo-image` truly unused | LOW → **removed** |
| 7 | `console.*` | 0 occurrences | INFO |
| 8 | TODO/FIXME | 0 occurrences | INFO |
| 9 | `as any` casts | 17 (15 router.push defeats typedRoutes) | MEDIUM → **14 fixed** |
| 10 | Hardcoded URLs | 0 (всё через env) | INFO |

### Diag B — Supabase security audit

Все 9 таблиц RLS-enabled. Все CRUD-политики используют `auth.uid() = user_id`. Storage bucket `photos` приватный с 4 политиками. Индексы соответствуют query patterns. Auth trigger создаёт profile + referrals + subscriptions.

**Cross-user attack matrix (BLOCKER-class) — все 4 атаки блокированы:**
| Атака | Результат |
|---|---|
| GET /estimates как 2й user | `[]` — RLS hides |
| GET /estimates?user_id=eq.\<demo\> | `[]` — RLS still blocks |
| POST /estimates с user_id=\<demo\> | 403 / 42501 |
| PATCH /estimates?id=eq.\<demo's\> | 200 + `[]` body, демо-row не тронут |

**LOW** — `idx_profiles_referral` дублирует UNIQUE → **dropped в 0004**.
**MEDIUM** — `estimates.photo_id` ON DELETE SET NULL без коммента → **commented в 0004**.

### Diag C — Integration smoke (10 тестов)

```
T1 Sign-up via /auth/v1/signup           PASS (с caveat: .test TLD reject)
T2 Auto-bootstrap trigger                 PASS
T3 Sign-in password grant                 PASS (token len=802)
T4 Token refresh                          PASS
T5 CRUD estimates (insert/select/update/delete)  PASS
T6 Bookmark toggle is_saved               PASS
T7 Notification mark-read + unread count  PASS
T8 Storage upload + signed URL            PASS (PNG round-trips bit-for-bit)
T9 Sign-out                                PASS (refresh revoked, JWT валиден до exp)
T10 Wrong password                        PASS (400 invalid_credentials)
```

T1 caveat: GoTrue валидатор отклоняет `.test`/`example` TLD'ы и срабатывает email rate limit. Реальные пользователи с `@gmail.com` etc. — без проблем. Sign-up.tsx теперь маппит обе ошибки в человеческие сообщения.

### Diag D — Code review каждого экрана

**58 находок** по 33 экранам:
- 2 BLOCKER, 23 HIGH, 20 MEDIUM, 13 LOW

Самые частые паттерны:
- `catch {}` swallow на 4 (tabs) экранах → fixed (error banner)
- Hardcoded mock-данные на placeholder экранах (`your-house`, `seasonal`, `warranty`, `home-overview`, `repair-step`, `processing` стадии) → 3 wired, остальные оставлены как pre-Stage-08 mock'и
- Optimistic mutation без rollback (3 места) → fixed
- Missing `numberOfLines` на динамическом контенте → fixed на критичных
- 2 deprecated API (Clipboard, MediaTypeOptions) → fixed
- 3 dead `onPress={() => {}}` CTA → fixed

---

## Fix-агенты — что починили (4 параллельно)

### Agent 1 — notifications + dead buttons
- **BLOCKER notif nav:** `isAllowedRoute()` allow-list для `n.meta` → silent no-op для невалидных
- **BLOCKER batch delete:** `Promise.all` → последовательный loop с per-id failure tracking
- **markAll rollback:** snapshot + restore on failure
- Long-press affordance text "tap & hold to dismiss"
- 3 dead onPress wired: home-overview "+New Fix" → capture, seasonal "Start Checklist" → maintenance, warranty "+Add Receipt" → disabled "coming soon"
- home-overview error state distinct from empty

### Agent 2 — tabs error swallow + numberOfLines (4 файла)
- Все 4 (tabs) screens: `error` state + outlined `NoirCard` banner с `colors.hairlineDanger`
- (tabs)/index: `refetchAlive` ref для cancel-guard, `featured.diagnosis` numberOfLines={3}, hardcoded "HVAC filter, gutters..." → derived из upcoming task titles
- (tabs)/repairs: empty cards для ACTIVE и PAST, `numberOfLines={2}` на title, HeroNumber `maxWidth: 110`
- (tabs)/blueprints: empty card "No estimates yet · snap a photo to begin"
- (tabs)/vault: `displayName` numberOfLines={1} ellipsis, "WARRANTY · 3 TRACKED" → "COMING SOON" + disabled

### Agent 3 — deprecated APIs + rollbacks + signup-ask + fix-selection
- capture.tsx: `MediaTypeOptions.Images` → `['images']` (expo-image-picker 16+)
- capture.tsx: Retry button под error
- invite.tsx: deprecated RN `Clipboard` → `expo-clipboard.setStringAsync`
- signup-ask.tsx: hardcoded $165 → `?savings=N` query param
- estimates/[id]: handlePick rollback + 3s pickError toast
- estimates/[id]: onMarkComplete friendlier alert
- saved-projects: unsave rollback + unsaveError toast, row restructured (no nested Pressables, anti-bubbling), PAID/EST консистентно с estimates list
- fix-selection: убрал fake $15/$45/$180 fallback prices, empty card с "Open estimates" CTA, Select Plan disabled когда no repair
- sign-up.tsx: `friendlyAuthError(raw)` для GoTrue email_address_invalid + over_email_send_rate_limit

### Agent 4 — deps + app.json + DB cleanup + typed routes
- app.json: убрал legacy `newArchEnabled: true`
- `expo install --fix`: bumped 8 packages (expo 55.0.17, expo-router 55.0.13, expo-splash-screen 55.0.19, expo-system-ui 55.0.16, expo-linking 55.0.14, react-native 0.83.6, react-native-worklets 0.7.4)
- `npm uninstall base64-arraybuffer expo-image`
- expo-clipboard добавлен (auto-added by `--fix`, теперь используется в invite.tsx)
- 14 `router.push(... as any)` → чистые literals (typed routes принимают через `.expo/types/router.d.ts`)
- 1 оставлен в notifications-center (Agent 1 владеет, фиксит через allow-list)
- **NEW migration 0004_cleanup.sql** применена через psql:
  - `DROP INDEX idx_profiles_referral` (UNIQUE уже создаёт implicit)
  - `COMMENT ON COLUMN estimates.photo_id` объясняет ON DELETE SET NULL

---

## Live UI walk

### Демо-юзер (`demo@fixit.test` / 6 estimates / 6 notifications / etc.)
| Маршрут | Результат |
|---|---|
| sign-in | ✅ DEV link залогинил |
| (tabs)/index Home | ✅ Health 80 FAIR, ROOF/WALLS/PLUMBING/APPLIANCES статусы из DB |
| (tabs)/repairs Projects | ✅ ACTIVE 1 (Roof Leak $450 35%), DUE 4 archive |
| (tabs)/blueprints | ✅ "PLANS · 6" + первая карточка |
| (tabs)/vault | ✅ "Amanda Demo / 6 estimates · 2 saved" |
| /estimates list | ✅ 6 estimates · total saved $1,184 (math verified) |
| /estimates/[id] | ✅ Roof Leak detail |
| /estimates/compare?ids=2 | ✅ math verified ($77 picks · all DIY $47 · all Pro $770 · save $693) |
| /saved-projects | ✅ 2 saved · 3 free slots |
| /notifications-center | ✅ 6/6 unread, tone bars + relative time |
| /home/maintenance | ✅ 3 upcoming с computed days-to-due |
| /home/edit | ✅ Single-family / 1998 |
| /invite | ✅ FIXIT-DEMO-557 + invited 2 / earned 2 |
| /settings | ✅ 5 sub-screens |
| /paywall/{save,warranty,pdf,alerts} | ✅ scrim + CTA |
| /error/{sub-failed,ai-failed,...} | ✅ hairlineDanger + retry |

### Empty user (`empty-user@fixit.test` — без seed-данных, удалён в конце)
| Маршрут | Результат |
|---|---|
| (tabs)/index Home | ✅ Health **100 GOOD**, 0 estimates, 0 repairs (no crash) |
| (tabs)/repairs | ✅ "No active repairs · tap a problem photo to start" + "Past repairs will appear here." |
| (tabs)/blueprints | ✅ "No estimates yet · snap a photo to begin" |
| (tabs)/vault | ✅ "Emma Empty / 0 estimates · 0 saved" |
| /notifications-center | ✅ "0 unread / 0 total" пустой список без crash |

---

## Bugs found во время live walk + fixed

| # | Bug | Fix |
|---|---|---|
| 1 | find-a-pro: header "Найти мастера" (русский) посреди English UI | → "Find a pro" |
| 2 | Worklets babel mismatch (0.7.4 vs 0.7.2) после dep bump | clear cache + restart Metro |
| 3 | Modal не дисмисс'ится при deep-link nav (paywall/alerts → /(auth)/sign-up) | Открыто как #51, не критично, отложено |

---

## Что НЕ сделано (явные scope-cuts)

1. **Narrow device live UI** на iPhone SE (375pt). Создал sim, но WDA timeout — не смог тапать. Сделал static-анализ: 3 файла с `maxWidth: 360` (margin OK), 10 крупных fontSize 40-44 (могут переноситься на узких экранах). Sim удалён.
2. **Offline test через сеть** на симуляторе. Network Link Conditioner требует GUI. Error banner code в tabs (Agent 2) покрывает реальный offline path.
3. **Race condition test** на rapid-tap. Логически покрыто optimistic+rollback паттерном.
4. **VoiceOver / dynamic type** — не тестировал.
5. **iOS push notifications** — нет токена / setup.
6. **Real photo upload через камеру** — `expo-camera` нет (требует dev client).

---

## Известные мелкие косяки (отложены)

- **#51 Modal dismiss-on-deep-link** — paywall/alerts открытый как transparentModal остаётся поверх deep-link nav. Workaround: cold-restart app.
- **Mock screens оставлены as-is** до Stage 08:
  - `your-house` — статичный "2 ISSUES FOUND"
  - `seasonal` — TASKS const
  - `warranty` — все цифры hardcoded ("423 days")
  - `home-overview` — HEALTH 87 hardcoded (а в (tabs)/index уже computed)
  - `repair-step` — RU placeholder text
  - `processing` — STAGES list ("LEAKY CARTRIDGE", "Denver labor rates") hardcoded
- **iOS status bar "AI-Girlfriends"** в верхнем-левом углу — это iOS chrome из чужого приложения preinstalled на Claude QA sim, не моё.
- **`expo-clipboard` auto-added** через `expo install --fix` — теперь используется в invite.tsx, OK.
- **2 dead-onPress в paywall/manage.tsx** ("change/pause/restore/support" → /error/sub-failed) — намеренный stub для UX-демо до Adapty.
- **paywall/index.tsx handleSubscribe** сразу ведёт на /paywall/success без real purchase — Adapty integration в Stage 08.

---

## Окружение на момент выхода

- **Sim Claude QA** (7CDEA30A) — booted, Expo Go alive, FixIt session — empty-user был залогинен (теперь удалён, но AsyncStorage может держать stale token до cold restart)
- **Metro** — bash task `bomrj9kn5` (или его replacement), порт 8087
- **Чужие sim'ы** (ShiftRest, SugarQuit, deskcare, Vitaminico, AI-Girlfriends, bikeRoutes, iPhone 17 Pro Max) — НЕ тронуты ни одним кликом
- **iPhone SE narrow QA sim** — создан, использован, удалён
- **Cron loop** `4076d45f` — каждые 30 минут, на rate-limit safety
- **Branch:** `main`, запушено в `oqapps-lab/fixit`
- **Demo accounts:**
  - `demo@fixit.test` / `demo12345` — основной (с seeded data)
  - `empty-user@fixit.test` / `empty12345` — удалён после теста
  - DEV sign-in кнопки на (auth)/sign-in для обоих

---

## Финальные метрики

| Метрика | Значение |
|---|---|
| TypeScript strict errors | 0 |
| ESLint findings | n/a (не настроен — LOW рекомендация) |
| npm audit moderate | 12 (build-toolchain, не runtime) |
| RLS policies (9 таблиц) | 100% покрытие |
| Cross-user attack vectors | 4/4 заблокированы |
| Integration tests | 10/10 PASS |
| Diag findings — total | 58 |
| Diag findings — fixed | 2 BLOCKER, 17 HIGH, 11 MEDIUM, 0 LOW (по выбору) |
| Live UI screens verified | 27 (demo + empty user) |
| Files modified этой сессией | 21 |
| Lines changed | +1160 / -752 |

---

## Следующие шаги (рекомендации)

1. **Stage 08 — AI диагностика** (Edge Function + Claude vision) — главный gap, без него app остаётся demo с seeded data.
2. **Adapty subscriptions** — раскомментировать stub'ы в paywall/manage и paywall/index.
3. **Mock screens cleanup** — wire `your-house`, `seasonal`, `warranty`, `repair-step`, `processing` к реальным данным как только AI Stage 08 готов.
4. **Modal dismiss fix** — `useFocusEffect` с router.dismissAll() или явный close на deep-link nav.
5. **iPhone SE narrow device pass** — нужен EAS Build dev client (Expo Go WDA с новым sim таймаутит).
6. **VoiceOver pass** — accessibility audit на VoiceOver enabled.
7. **Cleanup mock files** — `mock/estimates.ts`, `mock/repair.ts` теперь unused, можно удалить.
8. **ESLint setup** — Diag A LOW рекомендация.
9. **Real-time inbox** через Supabase Realtime channel.
