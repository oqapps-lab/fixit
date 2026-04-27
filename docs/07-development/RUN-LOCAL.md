# RUN-LOCAL — запуск FixIt на симуляторе для тестирования дизайна

**Дата:** 2026-04-20
**Стек:** Expo SDK 55 + React Native 0.83 + TypeScript strict + expo-router v6
**Что получишь:** приложение FixIt Noir, загруженное в iOS Simulator, по которому можно тыкать — все 10 экранов + таб-бар + модалки.

---

## TL;DR — самое короткое

Mac с Xcode + Node 20+:

```bash
cd projects/fixit
npm install --legacy-peer-deps
npx expo start --ios
```

Дальше Expo сам откроет симулятор, поставит Expo Go, загрузит бандл (~30-60 сек первый раз), покажет Home Health Dashboard.

---

## Подробно

### 1. Требования

- **Node.js ≥ 20** (у меня 24.x работает — только не 25, там `ngrok` ломается на Windows)
- **npm ≥ 10**
- **Xcode** (только на Mac) — для iOS симулятора
- **Git** + доступ к `oqapps-lab/fixit`

Android Studio для эмулятора — по желанию. В инструкции ниже — iOS.

### 2. Клонирование

```bash
mkdir -p ~/dev/oqapps && cd ~/dev/oqapps
gh repo clone oqapps-lab/fixit
cd fixit
```

Если `gh` не авторизован: `gh auth login` → выбери GitHub.com → HTTPS → Login with a web browser.

### 3. Установка зависимостей

```bash
npm install --legacy-peer-deps
```

**`--legacy-peer-deps` обязателен** — reanimated v4 требует `react-native-worklets`, и без флага npm падает на peer conflict. Установка занимает ~2-5 минут (711 пакетов).

Если Metro потом напишет "expected version X.Y" — проверь `package.json`, версии там закреплены. Если очень хочется выровнять — `npx expo install --fix`.

### 4. Запуск Metro bundler

**Вариант A — ты на Mac и хочешь iOS симулятор (самое простое):**

```bash
npx expo start --ios
```

Expo сам:
1. Запустит Metro на `http://localhost:8081`
2. Откроет или загрузит iOS Simulator
3. Установит Expo Go в симулятор (если его там нет)
4. Загрузит бандл и откроет приложение

Первая сборка (cold bundle) занимает **30-60 секунд**. Потом hot reload на изменения — мгновенно.

**Вариант B — Metro на Windows/Linux, симулятор на Mac:**

Этот сценарий описан в `~/.claude/skills/expo-launch-on-mac-sim/SKILL.md` (runbook для VM-Claude). Кратко:

```bash
# на машине где будет Metro
npx expo start --lan --port 8082

# на Mac (в другом терминале или через mobile-mcp)
# узнать LAN IP Windows / Linux хоста, потом:
xcrun simctl openurl <UDID> "exp://<LAN-IP>:8082"
```

NB: `--tunnel` не работает на Node 25 Windows (`@expo/ngrok` сломан). Используй `--lan`.

### 5. Навигация по приложению

Старт — на **Home Health Dashboard** (кольцо 87, alert про roof inspection). Снизу — плавающий таб-бар (SYSTEMS / PROJECTS / BLUEPRINTS / VAULT).

| Откуда | Куда | Как |
|---|---|---|
| Home (Systems) | Repair Detail | Тап на amber alert card "Roof Inspection Recommended" |
| Projects tab | Your House | "+ NEW ESTIMATE" кнопка |
| Your House | Fix Selection | "Review fixes" кнопка |
| Fix Selection | Repair Detail | "SELECT PLAN" |
| Repair Detail | Repair Step | "DIY GUIDE" кнопка |
| Repair Detail | Find a Pro (модалка) | "FIND PRO" кнопка |
| Blueprints tab | Seasonal / Warranty / Home Overview | тапы по строкам списка |
| Vault tab | Your House | "Take a photo →" кнопка |

### 6. Hot reload и отладка

- Сохранил файл → Metro пересобирает только изменённый модуль → симулятор обновляется за <1 сек
- Если бандл сломался (синтаксис, missing import) → красный экран с ошибкой в симе
- **Cmd+D** в симуляторе (или "Shake") → developer menu (reload, toggle performance monitor)
- **Cmd+R** в симе → hard reload bundle

### 7. Частые ошибки и фиксы

| Симптом | Причина | Фикс |
|---|---|---|
| `ERESOLVE unable to resolve dependency tree` | reanimated 4 + RN peer range | `npm install --legacy-peer-deps` |
| `Cannot find module 'react-native-worklets/plugin'` | peer не поставился | `npm i react-native-worklets --legacy-peer-deps` |
| `NativeMicrotasksCxx could not be found` | RN версия не матчит Expo Go SDK | `npx expo install --fix` + пересобрать |
| "Opening project... This is taking much longer" | Metro не отвечает по LAN | Проверь firewall для 8081/8082, VPN отключи |
| Бандл собрался но UI старый | Expo Go закешил bundle | Terminate Expo Go + `openurl exp://...` снова |
| Port 8081 used by another process | предыдущий Metro висит | `--port 8082` или убить PID на 8081 |

### 8. Проверка сборки

```bash
npx expo export --platform ios --output-dir /tmp/fixit-export --clear
```

Если экспорт проходит без ошибок — проект корректно собирается на текущем JS-стеке. После правок в `src/components/ui/*` или `src/constants/tokens.js` прогоняй эту проверку перед коммитом.

### 9. Что НЕ поддерживается в текущем билде

- **Нативная камера-модуль Expo Camera** — используется `expo-image-picker` (camera/library launch), а не full custom camera UI.
- **Claude API** — интегрирован через Supabase Edge Function `analyze-issue`; нужен `ANTHROPIC_API_KEY` в `supabase/functions/.env` (см. `supabase/functions/.env.example`, затем `npm run supabase:stop && npm run supabase:start`).
- **Adapty / Store billing** — paywall пока placeholder-flow, без реального биллинга и entitlements.
- **Push notifications** — нет
- **Dark/light toggle** — всегда dark

Это design-review build, не shippable.

---

## Куда смотреть в коде

- `src/app/` — маршруты expo-router (filename-based)
- `src/components/ui/` — 14 дизайн-примитивов (`NoirScreen`, `NoirCard`, `AmberCTA`, …)
- `src/constants/tokens.js` — единственный источник цветов/радиусов/шрифтов/gradient-ов
- `src/lib/data/repair-content.js` — Supabase queries для экранных данных
- `src/hooks/useAppFonts.js` — загрузка Google Fonts
- `docs/06-design/DESIGN-GUIDE.md` — авторитетный guide по дизайн-языку
- `docs/06-design/stitch-raw/` — 12 исходных Noir-скриншотов из Stitch + design-theme

## Команда

- **Owner:** @gazetastreet (Amanda)
- **Manager:** @langbey (Лана)

---

**Проблема с запуском?** Проверь `~/.claude/skills/expo-launch-on-mac-sim/SKILL.md` — там детальный troubleshooting от Sugar Quit + FixIt.
