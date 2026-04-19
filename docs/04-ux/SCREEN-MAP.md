# SCREEN-MAP.md — FixIt

**Дата:** 19 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor (pure advisor utility)
**Стадия:** UX Design (Stage 4, post-rescope v2.0)
**Тип документа:** Карта экранов MVP + roadmap expansions
**Companion docs:** [POSITIONING.md](../02-product/POSITIONING.md) · [FEATURES.md](../02-product/FEATURES.md) · [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) · [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md)

---

## TL;DR

FixIt — **photo-first advisor utility**. Rescope 2026-04-19 убрал marketplace layer: no pro profiles, no quote requests, no affiliate funnel. Pro Match превратился в **тонкий deeplink bottom sheet** (Thumbtack / Google Maps / Yelp — 3 кнопки, user выбирает сам). Это сильно упростило карту экранов.

Приоритеты:

- **Onboarding = 8 экранов**, target <90 sec до первого AI estimate (per ONBOARDING-RESEARCH §1.6). Copy выровнен под tagline **"Know the price before the panic"**.
- **4 main tabs:** Home / My Home / Estimates / Profile (после onboarding)
- **Estimate Flow** = sovereign full-screen flow поверх табов, повторяется каждый раз
- **Paywall** — soft gate после 3-го estimate + context paywalls на unlimited/save/PDF/price-alerts (НЕ на Pro Match — он free для всех)
- **Find-a-Pro Sheet** — один-единственный экран, bottom sheet с 3 deeplink кнопками + дисклеймер "We don't earn from these — choose whichever you trust"

**Итого MVP unique screens:** ~42 (было ~47 — минус 3 pro marketplace screens, минус Pro Match context paywall, плюс 1 simplified Find-a-Pro sheet)
**Итого включая states/variants:** ~62

---

## Карта экранов

```
FixIt App
│
├── 1. Onboarding Flow (не авторизован, первый запуск)
│   ├── 1.1 Welcome Screen (tagline "Know the price before the panic")
│   ├── 1.2 Location Capture (zip / city / auto-detect)
│   ├── 1.3 Camera Permission (privacy statement + sample thumbnails)
│   ├── 1.4 First Photo Capture (in-camera guidance + gallery fallback)
│   ├── 1.5 Pre-estimate Context Micro-screen (DIY readiness + quality tier)
│   ├── 1.6 AI Processing (labor illusion, 5-8 sec, animated steps)
│   ├── 1.7 First Estimate Result (aha moment — 3 options DIY/Hybrid/Pro)
│   └── 1.8 Signup Ask (soft bottom-sheet — "Save this estimate — $175 saved")
│
├── 2. Auth Screens (at signup moment)
│   ├── 2.1 Sign Up (Apple / Google / Email)
│   └── 2.2 Sign In (returning user / reinstall)
│
├── 3. Main Tabs (авторизован / после onboarding)
│   │
│   ├── 3.1 Home Tab (Tab 1 — default)
│   │   ├── [state: первый день — highlight key features]
│   │   ├── [state: с историей — last estimates + seasonal banner]
│   │   ├── [state: re-engagement — "Anything new around the house?"]
│   │   └── [state: limit reached — paywall nudge top banner]
│   │
│   ├── 3.2 My Home Tab (Tab 2 — progressive profile)
│   │   ├── 3.2.1 Home Dashboard (savings counter, history timeline, rooms)
│   │   ├── 3.2.2 Home Profile Edit (add rooms, year built, home type)
│   │   ├── 3.2.3 Room Detail (kitchen details, pipe type, warranty links)
│   │   └── 3.2.4 Maintenance Calendar (seasonal tasks suggested)
│   │
│   ├── 3.3 Estimates Tab (Tab 3)
│   │   ├── 3.3.1 Estimates List (all past, filter by room/status)
│   │   ├── 3.3.2 Estimate Detail (view past estimate с full breakdown)
│   │   └── 3.3.3 Estimate Comparison (side-by-side 2-3 past estimates)
│   │
│   └── 3.4 Profile Tab (Tab 4)
│       ├── [state: free user — shows "3 estimates/mo, upgrade" banner]
│       ├── [state: pro user — shows "Pro member since DATE"]
│       ├── 3.4.1 Settings
│       │   ├── 3.4.1.1 Account (email, password, logout, delete)
│       │   ├── 3.4.1.2 Notifications (per-category granular opt-in)
│       │   ├── 3.4.1.3 Appearance (light/dark/system)
│       │   ├── 3.4.1.4 Privacy (photo retention, data export, GDPR)
│       │   └── 3.4.1.5 Subscription Management (cancel/upgrade/restore)
│       ├── 3.4.2 Saved Projects (Pro feature preview for free users)
│       ├── 3.4.3 About / Support (contact, FAQ, terms, version)
│       └── 3.4.4 Invite Friends (referral program — viral loop "I saved $X")
│
├── 4. Estimate Flow (full-screen, поверх табов — повторяется после onboarding)
│   │
│   ├── 4.1 New Estimate Entry
│   │   ├── [state: camera view with in-camera guidance]
│   │   ├── [state: gallery picker fallback]
│   │   └── [state: text-only fallback — "describe the problem"]
│   │
│   ├── 4.2 Photo Captured (retake / confirm / add another angle)
│   │
│   ├── 4.3 Context Questions (region auto-confirm / DIY readiness / quality)
│   │
│   ├── 4.4 AI Processing (labor illusion, identical к onboarding 1.6)
│   │
│   ├── 4.5 Estimate Result — 3 modes (tabbed interface)
│   │   ├── 4.5.1 DIY Tab
│   │   │   ├── Materials list (AI-generated, Amazon/Home Depot/Lowe's search links)
│   │   │   ├── Step-by-step guide (AI-generated + YouTube search button)
│   │   │   └── Difficulty rating + time estimate + safety callouts
│   │   │
│   │   ├── 4.5.2 Hybrid Tab
│   │   │   ├── Materials list (you buy — same as DIY)
│   │   │   ├── Labor cost (hire handyman for install)
│   │   │   └── "Why Hybrid makes sense for this" AI explanation
│   │   │
│   │   └── 4.5.3 Full Pro Tab
│   │       ├── Quote range for your zip (median + spread)
│   │       ├── "Fair-price check" validator (if you got a quote, compare)
│   │       └── CTA "Find a pro" → opens 7.1 Find-a-Pro Sheet
│   │
│   ├── 4.6 Save Estimate (name + category + room + notes)
│   │
│   └── 4.7 Share Estimate (social + messaging + PDF export — "I saved $X going DIY")
│
├── 5. Paywall Screens
│   │
│   ├── 5.1 Soft Paywall — Primary (after 3rd free estimate hit limit)
│   │   ├── Hero "You've used your free estimates"
│   │   ├── Tier comparison (Monthly / Annual / Pay-per)
│   │   ├── Social proof + testimonials ("I saved $185 going DIY")
│   │   └── CTA "Unlock Unlimited Access"
│   │
│   ├── 5.2 Context Paywall (premium feature access)
│   │   ├── 5.2.1 "Save Project" paywall (after 5 free saves)
│   │   ├── 5.2.2 "Warranty Tracker" paywall (v1.5 feature gate)
│   │   ├── 5.2.3 "PDF Export" paywall (для insurance/resale reports)
│   │   └── 5.2.4 "Price Alerts" paywall (material price drop notify)
│   │
│   ├── 5.3 Subscription Success (post-purchase confirmation)
│   │
│   └── 5.4 Subscription Management (cancel / change tier / pause)
│
├── 6. Notifications
│   ├── 6.1 Notification Center (in-app list of recent pushes)
│   └── 6.2 Push Notification Preferences (granular per-category)
│
├── 7. Find a Pro (single-screen simplified handoff)
│   └── 7.1 Find-a-Pro Sheet (bottom sheet: 3 deeplink buttons + disclaimer)
│
└── 8. Error / Edge States
    ├── 8.1 No Internet (offline state с cached estimates)
    ├── 8.2 Camera Unavailable (hardware error, fallback gallery/text)
    ├── 8.3 AI Processing Failed (retry button + support link)
    ├── 8.4 Location Denied (manual zip prompt)
    ├── 8.5 Blurry Photo Detected (retake guidance)
    ├── 8.6 Unknown Problem (AI can't identify — redirect)
    ├── 8.7 Subscription Failed (Apple/Google billing error)
    ├── 8.8 Force Update Required (version gate)
    └── 8.9 Maintenance Mode (server downtime)
```

---

## Screen Count Summary

| Группа | Уникальных экранов | С состояниями/вариантами |
|---|---|---|
| Onboarding | 8 | 10 |
| Auth | 2 | 2 |
| Main Tabs | 4 tabs + ~11 sub-screens = 15 | ~18 |
| Estimate Flow | 7 screens (4.5 = 3 tabs) | ~12 |
| Paywall | 4 + 4 context variants = 8 | 10 |
| Notifications | 2 | 2 |
| Find a Pro | 1 | 1 |
| Error states | 9 | 9 |
| **Итого MVP** | **~42** | **~62** |

**Изменения vs v1.0 (pre-rescope):** -3 экрана Pro Match marketplace (Pro List / Pro Profile / Quote Request / Thumbtack Redirect — 4 экрана → 1 simplified sheet), -1 context paywall (Pro Match paywall удалён, т.к. Find-a-Pro теперь free для всех). Net: 47 → 42.

---

## Подробные описания экранов

### 1. Onboarding Flow

Target: <90 секунд install → first estimate completed (per ONBOARDING-RESEARCH §1.6). 3-step priming + photo flow + post-aha signup. **No quiz.** Photo-AI utility pattern (PictureThis / Rock Identifier reference). Copy выровнен под new positioning: **"Know the price before the panic. Decide with confidence."**

#### 1.1 Welcome Screen

| Поле | Описание |
|---|---|
| **Назначение** | Reinforce value prop + accelerate к камере (Emma already saw TikTok ad) |
| **Откуда** | App Store → First open / reinstall |
| **Куда** | → Location Capture (1.2) |
| **Ключевые элементы** | Hero image (multi-category: faucet + electrical + chair), headline "Know the price before the panic", subheadline "Photo → real cost in 60 seconds. DIY, Hybrid или Pro — you choose.", single CTA "Take a photo of your problem" |
| **Primary action** | "Take a photo" (переход к location capture) |
| **Secondary actions** | Нет (single-button screen — минимальный cognitive load) |
| **Фича** | F9 (Onboarding) |
| **Design notes** | Background hints at plumbing + electrical + furniture — иначе Emma с другой проблемой думает "это только про сантехнику". Tagline — emotional anchor (per POSITIONING §9), не утилитарный. |

#### 1.2 Location Capture

| Поле | Описание |
|---|---|
| **Назначение** | Единственный required onboarding question — regional pricing = наш moat |
| **Откуда** | Welcome (1.1) |
| **Куда** | → Camera Permission (1.3) (если permission дан раньше — сразу 1.4) |
| **Ключевые элементы** | Headline "Where do you live?", sub "Prices vary 40%+ by region. Denver ≠ Memphis.", ZIP input field, "Use my location" button (auto-detect via Expo Location), skip link "Skip for now" |
| **Primary action** | Auto-detect OR submit ZIP |
| **Secondary actions** | Skip (с soft prompt после estimate) |
| **Фича** | F2 (Contextual Intake Questions) |
| **Design notes** | Skip rate target <15%. Без zip показываем national average — aha destroyed |

#### 1.3 Camera Permission

| Поле | Описание |
|---|---|
| **Назначение** | Priming screen ДО iOS permission dialog — повышает grant rate с 60% до 85%+ |
| **Откуда** | Location (1.2) |
| **Куда** | → First Photo Capture (1.4) |
| **Ключевые элементы** | Headline "Take a photo of what's broken", 4 sample thumbnail photos (leaky pipe, cracked tile, broken chair, dead appliance), privacy statement "Photos stay private to your account. Never shared.", CTA "Allow camera", link "I'll upload a saved photo instead" |
| **Primary action** | "Allow camera" → triggers iOS permission dialog |
| **Secondary actions** | "Upload saved photo" (gallery fallback) |
| **Фича** | F1 (Photo Intake) + F9 (Onboarding) |
| **Design notes** | Privacy statement критичен — 41% US users refuse permission without it (SkinVision benchmark, ONBOARDING-RESEARCH §1.4) |

#### 1.4 First Photo Capture

| Поле | Описание |
|---|---|
| **Назначение** | Первое фото — moment of truth для Photo Intake feature (F1) |
| **Откуда** | Camera Permission (1.3) |
| **Куда** | → Pre-estimate Context (1.5) после confirm |
| **Ключевые элементы** | Native iOS camera UI, top overlay "Snap the problem area — close-up helps", bottom auto-cycling guidance pills ("Good lighting", "Include context", "Multiple angles if complex"), top-right "Use saved photo", top-left "Skip → describe with text" |
| **Primary action** | Shutter button |
| **Secondary actions** | Gallery picker, text-only fallback, retake |
| **Фича** | F1 (Photo Intake + AI Identification) |
| **States** | camera-view / gallery-picker / text-fallback / preview-confirm |
| **Design notes** | После фото — preview "Looks good? Retake if blurry." + CTA "Analyze this" |

#### 1.5 Pre-estimate Context Micro-screen

| Поле | Описание |
|---|---|
| **Назначение** | Быстрая калибровка — 2 вопроса перед AI для персонализации output (DIY vs Pro recommendation) |
| **Откуда** | Photo Captured (1.4) |
| **Куда** | → AI Processing (1.6) |
| **Ключевые элементы** | Headline "Two quick questions to personalize your estimate", Q1: DIY readiness (3 options с emoji: Never tried / Some experience / Confident DIYer), Q2: Quality tier (Budget / Mid-range / Premium) |
| **Primary action** | "Continue" button (both questions answered или skipped к defaults) |
| **Secondary actions** | Skip → defaults ("Some experience" + "Mid-range") |
| **Фича** | F2 (Contextual Intake Questions) |
| **Design notes** | 5-7 секунд time budget, 2 taps max. Framing "Two quick questions" — user знает зачем |

#### 1.6 AI Processing (Labor Illusion)

| Поле | Описание |
|---|---|
| **Назначение** | Labor illusion — показ "работы" увеличивает perceived value на 29-43% (Ryan Buell HBS) |
| **Откуда** | Pre-estimate Context (1.5) |
| **Куда** | → First Estimate Result (1.7) |
| **Ключевые элементы** | Photo thumbnail (user's actual photo pulsating), animated scanning ring, auto-cycling progress steps: "Identifying the problem..." → "Checking material prices in [ZIP]..." → "Estimating labor rates..." → "Calculating DIY difficulty..." |
| **Primary action** | (passive — 5-8 sec auto) |
| **Secondary actions** | Нет "tap to skip" (убивает labor illusion) |
| **Фича** | F1 + F3 (Cost Engine) + F9 (Onboarding UX pattern) |
| **Design notes** | Duration matches actual Claude API response time (3-6 sec) + 1-2 sec visual buffer. Никогда не показываем blank spinner. Abandon rate target <5%. Copy избегает retailer partnerships language (больше нет "Home Depot API" — просто "material prices"). |

#### 1.7 First Estimate Result (AHA MOMENT)

| Поле | Описание |
|---|---|
| **Назначение** | THE aha moment. 60-90 секунд от install. Value demonstrated ДО paywall и signup. Tagline validated — Emma видит что знать цену ДЕЙСТВИТЕЛЬНО calming. |
| **Откуда** | AI Processing (1.6) |
| **Куда** | → Signup Ask (1.8) — soft bottom sheet |
| **Ключевые элементы** | Photo thumbnail (top-left, validates "AI actually looked at МОЕ фото"), diagnosis headline ("Leaky Kitchen Faucet Supply Line — Denver, CO 80203"), three options side-by-side (DIY $12-18 / Hybrid $15+$95 / Pro $175-275), "Why we recommend [mode] for this" AI 1-line explanation, "Save $260 by going DIY" savings contrast, honesty disclaimer "AI estimate — actual prices ±25%" |
| **Primary action** | Tap any mode card → expanded detail view (leads to full Estimate Result screen 4.5) |
| **Secondary actions** | "Save this estimate" (triggers 1.8 signup ask), share button |
| **Фича** | F3 (Cost Estimate Engine — 3-Mode Output) |
| **Design notes** | Three options side-by-side визуально — контраст $18 DIY vs $275 Pro = visceral aha. Result screen time target >15 sec (user читает и осмысливает). Copy **не** содержит "Our pros are standing by" или affiliate language — чисто advisor tone. |

#### 1.8 Signup Ask (Soft Bottom Sheet)

| Поле | Описание |
|---|---|
| **Назначение** | Deferred signup post-value — +40-55% willingness vs upfront (per ONBOARDING-RESEARCH §3). Savings anchor copy активирует loss aversion. |
| **Откуда** | First Estimate Result (1.7) — trigger на "Save" tap OR 15 sec after result shown |
| **Куда** | → Auth (2.1) OR → Home Tab (3.1) if "Not now" |
| **Ключевые элементы** | Bottom sheet (не full screen — less intrusive), headline **"Save this estimate — $175 saved"** (savings anchor, персонализированный от DIY vs Pro delta), sub "+ 2 more estimates free this month", Apple Sign-In button (primary iOS), Google Sign-In, Email button, small grey "Not now" |
| **Primary action** | Apple/Google/Email signup |
| **Secondary actions** | "Not now" (allowed — continues as guest to Home) |
| **Фича** | F8 (Pricing Tier — freemium) + F9 (Onboarding) |
| **Design notes** | Target 55-65% signup rate post-aha. Savings number dynamically computed (DIY low vs Pro high = saving potential). Не показываем paywall здесь — paywall только после 3rd estimate. |

---

### 2. Auth Screens

#### 2.1 Sign Up

| Поле | Описание |
|---|---|
| **Назначение** | Полноэкранный signup — срабатывает если user выбрал Email (не Apple/Google one-tap) |
| **Откуда** | Signup Ask (1.8), Paywall (5.1) CTA, Profile (3.4) "Upgrade from guest" |
| **Куда** | → Home Tab (3.1) при success |
| **Ключевые элементы** | Apple Sign-In (primary для iOS), Google Sign-In, Email + password form, privacy policy + terms links, "Already have account? Sign in" |
| **Primary action** | Sign up (any method) |
| **Secondary actions** | Switch to Sign In |
| **Фича** | F8 (Pricing Tier) — account для subscription tracking |

#### 2.2 Sign In

| Поле | Описание |
|---|---|
| **Назначение** | Returning user / reinstall flow |
| **Откуда** | Splash (если detected existing account), Sign Up (2.1) switch link |
| **Куда** | → Home Tab (3.1) при success |
| **Ключевые элементы** | Apple / Google / Email form, "Forgot password" link, "New here? Sign up" |
| **Primary action** | Sign in |
| **Secondary actions** | Password reset flow, switch to signup |

---

### 3. Main Tabs

4 таба после onboarding: **Home / My Home / Estimates / Profile**. Tab bar всегда внизу (bottom navigation).

#### 3.1 Home Tab (Default Landing)

| Поле | Описание |
|---|---|
| **Назначение** | Центральный хаб — большая "New Estimate" CTA + recent activity + seasonal prompts |
| **Откуда** | Tab bar, push notification, app open (authenticated) |
| **Куда** | → Estimate Flow entry (4.1), → Estimate Detail (3.3.2), → My Home (3.2), → Paywall (5.1) if limit hit |
| **Ключевые элементы** | Hero: large floating "Take a photo / New Estimate" button (center), greeting copy **"Anything new around the house?"** (НЕ "Need a pro for something?" — per POSITIONING §5), "Estimates this month: 2/3" counter (free tier) OR "Unlimited" (pro), last estimate card (thumbnail + cost + date), seasonal banner ("Spring maintenance — three small fixes worth knowing about"), quick actions row (Browse past / Maintenance tips / Invite friends) |
| **Primary action** | "Take a photo" button → Estimate Flow (4.1) |
| **Secondary actions** | Tap last estimate card → Estimate Detail, seasonal banner → browse recommendations |
| **Фича** | F1 (Photo Intake entry point) + F7 (My Home hook) |
| **States** | - `first-day`: highlight key features (guided tour overlay) <br> - `with-history`: last estimates + seasonal <br> - `re-engagement`: "Anything new around the house?" banner (user returned after 7+ days absence) <br> - `limit-reached`: top banner "3/3 free used — Upgrade" |

#### 3.2 My Home Tab (Progressive Profile)

Emma's home data накапливается постепенно — НЕ собираем front-load в onboarding (ONBOARDING-RESEARCH §7).

##### 3.2.1 Home Dashboard

| Поле | Описание |
|---|---|
| **Назначение** | Обзор home profile: saved rooms, savings tracker, maintenance calendar preview |
| **Откуда** | Tab bar |
| **Куда** | → Home Profile Edit (3.2.2), → Room Detail (3.2.3), → Maintenance Calendar (3.2.4), → Estimate Detail (3.3.2) |
| **Ключевые элементы** | Hero: **"You've saved $X with FixIt"** counter (motivational — это НОВЫЙ north-star display per POSITIONING §6), rooms grid (Kitchen / Bathroom / Living Room / Garage — each with repair count), next maintenance task card ("HVAC filter due in 12 days"), past projects timeline (last 5 projects с thumbnails) |
| **Primary action** | Tap room → Room Detail OR tap "Add room" → Home Profile Edit |
| **Secondary actions** | Export home report (PDF — Pro feature, triggers 5.2.3 paywall), maintenance calendar link |
| **Фича** | F7 (Saved Projects History — "My Home") |

##### 3.2.2 Home Profile Edit

| Поле | Описание |
|---|---|
| **Назначение** | Редактирование home metadata — year built, home type, rooms |
| **Откуда** | Home Dashboard (3.2.1) "Edit" button, в-context prompt после 2-го estimate |
| **Куда** | ← back к Dashboard |
| **Ключевые элементы** | Home type selector (Single-family / Condo / Townhouse / Apartment), year built slider, rooms checklist (Kitchen / Bath / Bedroom / Living / Garage / Yard / Other), save/cancel |
| **Primary action** | Save changes |
| **Secondary actions** | Cancel, individual field edit |
| **Фича** | F7 (Saved Projects — metadata layer) |

##### 3.2.3 Room Detail

| Поле | Описание |
|---|---|
| **Назначение** | Deep view одной комнаты — все estimates для kitchen + saved metadata (faucet brand, pipe type) |
| **Откуда** | Home Dashboard (3.2.1) → tap kitchen |
| **Куда** | → Estimate Detail (3.3.2), → New Estimate для этой room |
| **Ключевые элементы** | Room name + icon, all estimates для этой комнаты (timeline), metadata fields (faucet brand, pipe type, shutoff valve location — Pro feature), warranty links |
| **Primary action** | "New estimate for [room]" |
| **Secondary actions** | Edit metadata, view specific estimate |
| **Фича** | F7 (My Home — granular) |

##### 3.2.4 Maintenance Calendar

| Поле | Описание |
|---|---|
| **Назначение** | Seasonal / recurring tasks (HVAC filter каждые 3 мес, gutters bi-annual) |
| **Откуда** | Home Dashboard (3.2.1) |
| **Куда** | → New Estimate для suggested task |
| **Ключевые элементы** | Calendar view (monthly), upcoming tasks list, recommended seasonal (spring prep / winter prep / summer / fall), "Mark done" checkbox per task |
| **Primary action** | Tap task → "Start estimate" |
| **Secondary actions** | Mark done, snooze |
| **Фича** | Post-MVP v1.5 maintenance feature — preview entry в MVP |

#### 3.3 Estimates Tab

##### 3.3.1 Estimates List

| Поле | Описание |
|---|---|
| **Назначение** | All past estimates — browse, search, filter |
| **Откуда** | Tab bar |
| **Куда** | → Estimate Detail (3.3.2), → Estimate Comparison (3.3.3) |
| **Ключевые элементы** | Filter bar (All / Kitchen / Bath / etc. / Last 30 days / Last 90 days), sort (Recent / Highest cost / Lowest cost), list items (thumbnail + title + date + cost + mode chosen + status badge), multi-select mode для comparison |
| **Primary action** | Tap estimate → Estimate Detail |
| **Secondary actions** | Multi-select → Compare, filter, search |
| **Фича** | F7 (Saved Projects History) |

##### 3.3.2 Estimate Detail

| Поле | Описание |
|---|---|
| **Назначение** | Full view прошлого estimate — photo, diagnosis, все 3 mode breakdowns, actual cost logged |
| **Откуда** | Estimates List (3.3.1), Home Tab (3.1) last card, push notification, Room Detail (3.2.3) |
| **Куда** | → Share (4.7), → PDF Export (triggers paywall 5.2.3), → Re-estimate |
| **Ключевые элементы** | Photo thumbnail(s), diagnosis text, three mode breakdown (DIY / Hybrid / Pro — same как 4.5), "Mark complete" flow (user logs actual paid cost + outcome), notes field, related estimates |
| **Primary action** | "Mark complete" (log outcome) OR "Re-estimate this issue" |
| **Secondary actions** | Share, export PDF (Pro), delete |
| **Фича** | F7 (Saved Projects) |

##### 3.3.3 Estimate Comparison

| Поле | Описание |
|---|---|
| **Назначение** | Side-by-side 2-3 past estimates — для multi-item project planning (Mike persona + Sarah quote validation) |
| **Откуда** | Estimates List (3.3.1) multi-select |
| **Куда** | ← back |
| **Ключевые элементы** | Two-column (или three-column) layout, each estimate card mini, aggregated totals (All-DIY vs All-Pro scenarios), "Total if all DIY: $X" summary |
| **Primary action** | Select specific mode для each, see total |
| **Secondary actions** | Share comparison, export PDF |
| **Фича** | F7 + F3 (cross-estimate analytics) |

#### 3.4 Profile Tab

| Поле | Описание |
|---|---|
| **Назначение** | Account management + settings + subscription + support |
| **Откуда** | Tab bar |
| **Куда** | → Settings sub-screens, → Saved Projects (3.4.2), → About (3.4.3), → Referral (3.4.4), → Paywall (5.1) |
| **Ключевые элементы** | Avatar + name + email, subscription tier badge (Free / Pro), "Estimates this month: X/3" OR "Unlimited", sections: Settings / Saved Projects / About / Invite Friends, footer app version |
| **States** | - `free-user`: "Upgrade to Pro" banner prominent <br> - `pro-user`: "Pro member since MONTH YEAR" calm |

##### 3.4.1 Settings

###### 3.4.1.1 Account

| Поле | Описание |
|---|---|
| **Назначение** | Email, password, logout, account deletion |
| **Ключевые элементы** | Email field (read-only unless edit), change password link, logout button, "Delete account" (GDPR-compliant flow с confirmation) |
| **Фича** | F8 (Auth-adjacent) |

###### 3.4.1.2 Notifications

| Поле | Описание |
|---|---|
| **Назначение** | Granular per-category opt-in (per ONBOARDING-RESEARCH §6.3) |
| **Ключевые элементы** | Categories: Project progress / Seasonal maintenance / Price drop alerts / FixIt tips. Each toggle. Quiet hours (10pm-7am auto) |
| **Фича** | F10 (Push Notifications preferences) |

###### 3.4.1.3 Appearance

| Поле | Описание |
|---|---|
| **Назначение** | Light / Dark / System |
| **Ключевые элементы** | 3 radio options, preview swatch |

###### 3.4.1.4 Privacy

| Поле | Описание |
|---|---|
| **Назначение** | Photo retention policies, data export, GDPR compliance |
| **Ключевые элементы** | "Delete all my photos" button, "Export my data" (JSON download), policy links |

###### 3.4.1.5 Subscription Management

| Поле | Описание |
|---|---|
| **Назначение** | View current plan, upgrade/downgrade, cancel, restore purchase |
| **Ключевые элементы** | Current tier (Free / Monthly / Annual), next billing date, "Change plan" link, "Cancel subscription" (1-tap, no hidden flow — per PAYWALL-RESEARCH §8.3), "Restore purchase" (iOS required) |
| **Фича** | F8 (Pricing Tier — subscription management) |

##### 3.4.2 Saved Projects

| Поле | Описание |
|---|---|
| **Назначение** | Free users: last 5 saved projects. Pro users: unlimited (same as Estimates Tab но focused на "marked saved") |
| **Откуда** | Profile (3.4) |
| **Куда** | → Estimate Detail, → Paywall 5.2.1 if free limit hit |
| **Ключевые элементы** | List of saved-flagged estimates, "Save more — Upgrade" banner для free users approaching limit |
| **Фича** | F7 + F8 (freemium gating) |

##### 3.4.3 About / Support

| Поле | Описание |
|---|---|
| **Назначение** | FAQ, contact support, legal |
| **Ключевые элементы** | FAQ accordion, "Contact support" (email или in-app chat), Privacy Policy, Terms of Service, Licenses, App version, "Rate FixIt" (App Store link) |

##### 3.4.4 Invite Friends

| Поле | Описание |
|---|---|
| **Назначение** | Referral program — free estimates за invite (viral loop: savings-shared become new acquisition channel) |
| **Ключевые элементы** | Personal referral code, share sheet с pre-filled copy **"I saved $185 going DIY with FixIt — try it"** (per POSITIONING §5 share-copy shift), "You've invited X friends, earned Y free estimates", leaderboard (optional) |
| **Фича** | Post-MVP v1.5 polish — stub в MVP |

---

### 4. Estimate Flow (Full-screen, повторяется после onboarding)

Этот flow — сердце приложения. Каждый раз когда user жмёт "Take a photo" / "New Estimate" — он запускается заново. Идентичен onboarding 1.3-1.7, но без location screen (ZIP уже сохранён).

#### 4.1 New Estimate Entry

| Поле | Описание |
|---|---|
| **Назначение** | Point of entry — camera OR gallery OR text |
| **Откуда** | Home Tab (3.1) CTA, My Home "New estimate for room", Estimates Tab empty state, push notification "Start estimate" |
| **Куда** | → Photo Captured (4.2) |
| **Ключевые элементы** | Camera view (default), in-camera guidance overlay (same as 1.4), switch to gallery / text fallback |
| **States** | `camera-view` / `gallery-picker` / `text-only-fallback` |
| **Фича** | F1 (Photo Intake) |

#### 4.2 Photo Captured

| Поле | Описание |
|---|---|
| **Назначение** | Preview + retake + add another angle (up to 3 photos per estimate per FEATURES §F1) |
| **Откуда** | New Estimate Entry (4.1) |
| **Куда** | → Context Questions (4.3) |
| **Ключевые элементы** | Photo preview full-screen, "Retake" button, "Add another angle" (up to 3), "Looks good — Analyze" CTA, quality check ("Image blurry — retake?" if AI pre-check fails) |
| **Primary action** | "Analyze this" |
| **Secondary actions** | Retake, add angle, cancel |
| **Фича** | F1 (Photo Intake) |

#### 4.3 Context Questions

| Поле | Описание |
|---|---|
| **Назначение** | Re-confirm ZIP (auto from profile), DIY readiness (can re-select per-estimate), quality tier (can re-select) |
| **Откуда** | Photo Captured (4.2) |
| **Куда** | → AI Processing (4.4) |
| **Ключевые элементы** | ZIP preview ("Using Denver 80203 — change?"), DIY readiness picker (pre-filled из profile), quality tier picker (pre-filled) |
| **Primary action** | "Get estimate" |
| **Secondary actions** | Change ZIP, skip DIY/quality → defaults |
| **Фича** | F2 (Contextual Intake Questions) |
| **Design notes** | Smart defaults — минимальный friction, user tap "Continue" 1 раз если не нужны changes |

#### 4.4 AI Processing

| Поле | Описание |
|---|---|
| **Назначение** | Идентичен 1.6 — labor illusion 5-8 sec |
| **Откуда** | Context Questions (4.3) |
| **Куда** | → Estimate Result (4.5) |
| **Ключевые элементы** | См. 1.6 |
| **Фича** | F1 + F3 |

#### 4.5 Estimate Result (Three Modes)

| Поле | Описание |
|---|---|
| **Назначение** | The core deliverable. Tabbed interface — DIY / Hybrid / Pro — default tab based on DIY readiness answer. Copy avoids marketplace framing: "Here are your three routes. Start with what feels right." (per POSITIONING §5) |
| **Откуда** | AI Processing (4.4), Estimate Detail (3.3.2) re-view |
| **Куда** | → DIY materials/guide (4.5.1), Hybrid handyman (4.5.2), Pro Match handoff (4.5.3 → 7.1 Find-a-Pro Sheet), Save (4.6), Share (4.7) |
| **Ключевые элементы** | Photo thumbnail + diagnosis top, three mode tabs (DIY / Hybrid / Pro), mode detail below, "Save" + "Share" floating buttons bottom, honesty disclaimer "AI estimate — actual prices ±25%" |
| **Фича** | F3 (Cost Estimate Engine — 3-Mode Output) |

##### 4.5.1 DIY Tab

| Поле | Описание |
|---|---|
| **Ключевые элементы** | Material cost range ($12-18), time estimate (20 min), difficulty rating (2/5), AI-generated materials list с **three retailer search buttons per item** (Amazon Associates / Home Depot plain search / Lowe's plain search — per FEATURES §F4), "Get step-by-step guide" CTA (AI-generated per problem, opens expandable — per F5), safety callouts (red flags для gas/electrical), YouTube search button at top of guide ("Watch videos of this repair") |
| **Primary action** | "Start DIY guide" → opens 5-10 step AI-generated guide (text + YouTube search link) |
| **Secondary actions** | "Search materials" (Amazon/HD/Lowe's deeplinks), "Bail out to Pro" (switches к 4.5.3) |
| **Фича** | F3 + F4 (Shopping List) + F5 (DIY Guide) |

##### 4.5.2 Hybrid Tab

| Поле | Описание |
|---|---|
| **Ключевые элементы** | Material cost (you buy — same list as DIY tab), labor cost (handyman install — e.g. $95 for 1hr), total, "Why Hybrid" AI explanation, "Find a handyman" button — opens 7.1 Find-a-Pro Sheet (same 3 deeplinks) |
| **Primary action** | "Find a handyman" → Find-a-Pro Sheet (7.1) |
| **Secondary actions** | View materials list only, switch к Pro mode, save |
| **Фича** | F3 + F4 + F6 (Find a Pro) |

##### 4.5.3 Full Pro Tab

| Поле | Описание |
|---|---|
| **Ключевые элементы** | Quote range ($175-275), "Based on market rates in 80203", fair-price check ("If you got a quote higher than $350, that's above market — renegotiate"), **single CTA "Find a pro"** → opens 7.1 Find-a-Pro Sheet (bottom sheet с Thumbtack/Google/Yelp) |
| **Primary action** | "Find a pro" → 7.1 Find-a-Pro Sheet |
| **Secondary actions** | Save this as "quote to validate" (Sarah path), compare with past estimate |
| **Фича** | F3 + F6 (Find a Pro) |
| **Design notes** | Важно: **НЕТ pro cards preview здесь**. Раньше было "3-5 pro preview cards" — это marketplace UI. Новый подход: просто quote range + fair-price validator + deeplink handoff. Меньше визуальной сложности. |

#### 4.6 Save Estimate

| Поле | Описание |
|---|---|
| **Назначение** | Save к Estimates Tab + My Home profile — auto-captured на estimate creation, но user может rename + add notes |
| **Откуда** | Estimate Result (4.5) "Save" button |
| **Куда** | → Back к Estimate Result / Home Tab |
| **Ключевые элементы** | Auto-generated name (editable — "Leaky Kitchen Faucet"), category auto-selected, room picker (Kitchen / Bath / etc.), notes field, save/cancel |
| **Primary action** | "Save" |
| **Secondary actions** | Cancel, edit name |
| **Фича** | F7 (Saved Projects) |
| **Paywall trigger** | Free users — after 5 saved projects → 5.2.1 Context Paywall |

#### 4.7 Share Estimate

| Поле | Описание |
|---|---|
| **Назначение** | Native iOS/Android share sheet + PDF export (Pro feature). Share card copy shift — savings anchor вместо "found a great plumber". |
| **Откуда** | Estimate Result (4.5), Estimate Detail (3.3.2) |
| **Куда** | External app (messaging, email, social) OR PDF viewer |
| **Ключевые элементы** | Share sheet (iOS native), "Export as PDF" (Pro feature — triggers 5.2.3 if free), share card preview с copy **"I saved $185 going DIY with FixIt"** (НЕ "I found a great plumber" — per POSITIONING §5), FixIt branding, referral link |
| **Primary action** | Share via chosen app |
| **Secondary actions** | Export PDF (Pro), copy link |
| **Фича** | Viral loop support (Emma shares savings → friend downloads) |

---

### 5. Paywall Screens

Based on PAYWALL-RESEARCH recommendations: **soft paywall** после 3rd estimate + **context paywalls** на premium features. NO hard paywall (убивает install→active на 60-70% без brand equity). **Pro Match больше не paywall-gated** — он free для всех (deeplinks не приносят revenue, per rescope).

#### 5.1 Soft Paywall (Primary — After 3rd Free Estimate)

| Поле | Описание |
|---|---|
| **Назначение** | Конвертировать free → paid после value demonstrated. Target 18-25% conversion среди hit-limit users |
| **Откуда** | Estimate Flow attempt when limit hit (4.1 blocked), Home Tab (3.1) banner tap |
| **Куда** | → Subscription Success (5.3) OR back к app (free user, 1 pay-per option) |
| **Ключевые элементы** | Hero animated header (user's recent estimate photo), personalized emotional hook **"You've saved $247 across 3 repairs with FixIt"** (savings anchor — per POSITIONING §5), 4 clear benefits **under new positioning:** ✓ Unlimited estimates / ✓ Saved projects unlimited / ✓ PDF export для insurance · resale / ✓ Price alerts when materials drop (**НЕТ** "priority pros" — Pro Match free для всех), tier comparison cards: Annual $49.99/yr (pre-selected, "BEST VALUE" badge, "= $4.17/month, SAVE 48%") / Monthly $9.99 / Pay-per $2.99, social proof (★★★★★ 4.8 — 12,400 reviews + testimonial "I saved $400 going DIY — Emma, Denver"), dominant CTA "UNLOCK UNLIMITED ACCESS" (orange brand color), trust signals ("Cancel anytime · Restore purchase") |
| **Primary action** | "Unlock Unlimited" (triggers Adapty purchase flow) |
| **Secondary actions** | "Pay as you go $2.99" (single estimate), close X (не dark-patterned — visible) |
| **Фича** | F8 (Pricing Tier — freemium gate) |
| **Design notes** | Wireframe detail в PAYWALL-RESEARCH §2.3. NO 15+ feature list (overwhelming), NO stock photos, NO 3+ tier complexity. Pre-selected annual = +15-20% annual uptake (Mojo benchmark). Copy **strict** on new positioning — zero mentions of "priority pros" / "exclusive network" / "verified contractors" (это всё marketplace language, убрали). |

#### 5.2 Context Paywall (Secondary — Premium Feature Access)

Срабатывает при tap на premium action. Lower raw conversion (10-15%) но higher LTV per converter — user commits к specific value. **Pro Match context paywall УДАЛЁН** — Find-a-Pro теперь free.

##### 5.2.1 "Save Project" Context Paywall

| Поле | Описание |
|---|---|
| **Trigger** | Free user tries to save 6th project (5 free saves — cap per FEATURES §F7) |
| **Ключевые элементы** | Hook "Save unlimited projects to Your Home", screenshot preview My Home tab organized view, benefits (Unlimited saves / Warranty reminders / Room organization), CTA "Upgrade to Pro" |
| **Conversion target** | 12-15% |

##### 5.2.2 "Warranty Tracker" Context Paywall

| Поле | Описание |
|---|---|
| **Trigger** | Free user taps "Add warranty" на any estimate/project (v1.5 feature gate) |
| **Ключевые элементы** | Hook "Never miss a warranty expiration", benefits, CTA |
| **Conversion target** | 8-10% |

##### 5.2.3 "PDF Export" Context Paywall

| Поле | Описание |
|---|---|
| **Trigger** | Free user taps "Export as PDF" — insurance reports / resale disclosures / Sarah's quote validation sharing |
| **Ключевые элементы** | Hook "Share professional reports with insurance, realtors, pros", benefits, CTA. Emotional hook для Sarah persona: "Share FixIt's fair-price analysis с your contractor to negotiate down." |
| **Conversion target** | 8-10% |

##### 5.2.4 "Price Alerts" Context Paywall

| Поле | Описание |
|---|---|
| **Trigger** | Free user taps "Notify me if prices drop" на material item |
| **Ключевые элементы** | Hook "Buy materials at the best time — we watch prices for you", benefits, CTA |
| **Conversion target** | 8-10% |

#### 5.3 Subscription Success

| Поле | Описание |
|---|---|
| **Назначение** | Post-purchase confirmation — reduces anxiety, builds trust |
| **Откуда** | Paywall (5.1 or 5.2.x) после successful Adapty purchase |
| **Куда** | → Home Tab (3.1) |
| **Ключевые элементы** | Celebration animation (confetti), "Welcome to FixIt Pro!" headline, activated benefits list (visual checkmarks: unlimited estimates / unlimited saves / PDF export / price alerts), "Start your next estimate" CTA, receipt email confirmation note |
| **Primary action** | "Start estimating" → Home Tab |
| **Secondary actions** | "View receipt" (email resend), push permission prompt (if not yet granted) |
| **Фича** | F8 (Pricing Tier) |

#### 5.4 Subscription Management

| Поле | Описание |
|---|---|
| **Назначение** | Cancel / change tier / pause — **1-tap cancellation** (no dark patterns, per PAYWALL-RESEARCH §8.3) |
| **Откуда** | Profile → Settings → Subscription Management (3.4.1.5) |
| **Куда** | Back к Profile или iOS/Google subscription settings |
| **Ключевые элементы** | Current plan card, next billing date, "Change plan" (monthly ↔ annual upgrade), "Pause subscription" (pay-later until next season — retention feature), "Cancel subscription" (deep-link к iOS/Google subscription settings, 1-tap), cancel flow: win-back offer ("50% off next month" — per FEATURES §F8), "Restore purchase" |
| **Primary action** | Depends on intent — change/cancel/pause |
| **Secondary actions** | Win-back dismissal, restore |
| **Фича** | F8 (Pricing Tier management) |

---

### 6. Notifications

#### 6.1 Notification Center (In-App)

| Поле | Описание |
|---|---|
| **Назначение** | In-app list недавних push notifications (если user пропустил iOS dialog) |
| **Откуда** | Home Tab top bell icon |
| **Куда** | → Estimate Detail, → material shopping list (для delivery reminders), → Maintenance Calendar |
| **Ключевые элементы** | Chronological list, each item: icon + title + body + relative time + read-state indicator. Copy shift: seasonal nudges "Spring is coming — three small fixes worth knowing about" (per POSITIONING §5), NOT "your weekly pro availability update". |
| **Primary action** | Tap notification → deep-link к relevant screen |
| **Secondary actions** | Mark all read, clear, swipe-delete |
| **Фича** | F10 (Push Notifications) |

#### 6.2 Push Notification Preferences

| Поле | Описание |
|---|---|
| **Назначение** | Granular opt-in per category (Emma fears spam — trust builder) |
| **Откуда** | Profile → Settings → Notifications (3.4.1.2) OR post-signup priming screen |
| **Ключевые элементы** | Priming screen first ("Never lose track of a repair project" per ONBOARDING-RESEARCH §6.2) — triggers iOS permission после user taps "Enable", then settings screen с categories: **Project progress / Seasonal maintenance / Price drops / Savings anniversary ("Remember that $185 you saved? It's been a year!") / FixIt tips (marketing default OFF)** |
| **Фича** | F10 |

---

### 7. Find a Pro (simplified handoff)

Было: 4 screens (Pro List / Pro Profile / Quote Request / Thumbtack Redirect). Стало: **1 screen bottom sheet**. Вся marketplace complexity исчезла — user выбирает инструмент (Thumbtack / Google / Yelp), мы handoff'им и он сам шопится.

#### 7.1 Find-a-Pro Sheet

| Поле | Описание |
|---|---|
| **Назначение** | Frictionless handoff — user уже знает что хочет pro, мы предлагаем 3 trusted инструмента, НЕ broker'им сделку |
| **Откуда** | Estimate Result 4.5.2 Hybrid Tab ("Find a handyman"), 4.5.3 Full Pro Tab ("Find a pro"), Estimate Detail (3.3.2) |
| **Куда** | External app/web (Thumbtack / Google Maps / Yelp) — user leaves FixIt |
| **Ключевые элементы** | Bottom sheet (не full screen — не blocking), headline "Find a pro near you", context preview ("Plumber — Denver 80203"), three big tap-targets: <br>🔵 **Thumbtack** — "Request quotes from multiple pros" <br>🔴 **Google Maps** — "Browse local pros on the map" <br>🟢 **Yelp** — "Read reviews first" <br>**Honest disclaimer (1 line, key element):** "We don't earn from these — choose whichever you trust." <br>Close X top-right |
| **Primary action** | Tap any of the 3 deeplink buttons → opens external |
| **Secondary actions** | Close sheet (back to 4.5), "Save this estimate first" |
| **Фича** | F6 (Find a Pro — simple deeplink, no affiliate) |
| **Technical notes** | Pure URL construction (per FEATURES §F6): <br>- Thumbtack: `thumbtack.com/search?category=plumber&zip_code=80203` <br>- Google Maps: `google.com/maps/search/plumber+near+80203` <br>- Yelp: `yelp.com/search?find_desc=plumber&find_loc=80203` <br>Category auto-mapped from Claude's identified problem type. No API integration, no partnership, no attribution. |
| **Design notes** | Disclaimer **критичен** — это часть brand voice "honest about limits" (per POSITIONING §7). Делает clear что мы не продаём leads, не зарабатываем с выбора pros. Emma trust builder. <br>Optional 72h follow-up push: "Did you find a pro? Want to log the job in My Home?" — soft re-engagement, per FEATURES §F6. <br>**v1.5+ upgrade path:** если получим Thumbtack partnership approval — добавим affiliate tag к URL. Zero re-engineering, same UX, disclaimer можно обновить на "We may earn a small referral fee from Thumbtack — others are unaffiliated." |

---

### 8. Error / Edge States

#### 8.1 No Internet

| Поле | Описание |
|---|---|
| **Назначение** | Offline state — show cached estimates, disable AI features с clear messaging |
| **Откуда** | Network loss event anywhere |
| **Куда** | Auto-restore when connection returns |
| **Ключевые элементы** | Top banner "No internet. Some features unavailable.", cached estimates still viewable, camera disabled для new estimates с clear "Reconnect to analyze" message |

#### 8.2 Camera Unavailable

| Поле | Описание |
|---|---|
| **Назначение** | Hardware error (broken camera, permission revoked after grant) |
| **Ключевые элементы** | Icon + "Camera not available", fallback CTA "Upload from gallery" OR "Describe with text", settings link |

#### 8.3 AI Processing Failed

| Поле | Описание |
|---|---|
| **Назначение** | API failure / timeout — retry flow |
| **Ключевые элементы** | "Hmm, we couldn't analyze that. Try again?", "Retry" button, "Contact support" link, photo preserved для retry |

#### 8.4 Location Denied

| Поле | Описание |
|---|---|
| **Назначение** | User denied location permission — manual zip fallback |
| **Ключевые элементы** | "We use location для accurate pricing. Enter ZIP manually или enable location в Settings", manual ZIP input, settings deep-link |

#### 8.5 Blurry Photo Detected

| Поле | Описание |
|---|---|
| **Назначение** | AI pre-check failed quality threshold — retake guidance |
| **Ключевые элементы** | Photo preview с blur warning, "This photo is too blurry для accurate analysis", tips ("Better lighting / Get closer / Steady hands"), retake CTA, "Use anyway" bypass (low accuracy warning) |

#### 8.6 Unknown Problem (AI Can't Identify)

| Поле | Описание |
|---|---|
| **Назначение** | AI confidence <50% — can't classify into 30 MVP categories |
| **Ключевые элементы** | "We couldn't identify this issue. Could you describe it?", text input, "Retake photo", "Find a pro anyway" link → Find-a-Pro Sheet (7.1) — graceful fallback when AI fails |

#### 8.7 Subscription Failed

| Поле | Описание |
|---|---|
| **Назначение** | Apple/Google billing error — Adapty reports failure |
| **Ключевые элементы** | "Payment couldn't be processed", retry button, alternative payment, contact support |

#### 8.8 Force Update Required

| Поле | Описание |
|---|---|
| **Назначение** | Critical version gate — API contract breaking changes |
| **Откуда** | App launch, version check fails |
| **Куда** | → App Store / Google Play |
| **Ключевые элементы** | "An important update is available", changelog highlights, "Update now" CTA → store listing |

#### 8.9 Maintenance Mode

| Поле | Описание |
|---|---|
| **Назначение** | Backend downtime (planned или incident) |
| **Ключевые элементы** | "FixIt is undergoing maintenance", ETA, status page link, cached data still accessible |

---

## Итоговая таблица экранов с приоритетами

| # | Экран | Тип | Фича | Приоритет |
|---|---|---|---|---|
| 1.1 | Welcome | Onboarding | F9 | P0 |
| 1.2 | Location Capture | Onboarding | F2 + F9 | P0 |
| 1.3 | Camera Permission | Onboarding | F1 + F9 | P0 |
| 1.4 | First Photo Capture | Onboarding | F1 + F9 | P0 |
| 1.5 | Pre-estimate Context | Onboarding | F2 + F9 | P0 |
| 1.6 | AI Processing | Onboarding | F1 + F3 + F9 | P0 |
| 1.7 | First Estimate Result | Onboarding | F3 + F9 | P0 |
| 1.8 | Signup Ask | Onboarding | F8 + F9 | P0 |
| 2.1 | Sign Up | Auth | F8 | P0 |
| 2.2 | Sign In | Auth | F8 | P0 |
| 3.1 | Home Tab | Main Tab | F1 + F7 | P0 |
| 3.2.1 | Home Dashboard | Main Tab | F7 | P1 |
| 3.2.2 | Home Profile Edit | Main Tab | F7 | P1 |
| 3.2.3 | Room Detail | Main Tab | F7 | P1 |
| 3.2.4 | Maintenance Calendar | Main Tab | Post-MVP | P2 |
| 3.3.1 | Estimates List | Main Tab | F7 | P0 |
| 3.3.2 | Estimate Detail | Main Tab | F7 | P0 |
| 3.3.3 | Estimate Comparison | Main Tab | F7 + F3 | P1 |
| 3.4 | Profile Tab | Main Tab | F5/F8 | P0 |
| 3.4.1.1-5 | Settings sub-screens | Main Tab | F8 + F10 | P1 |
| 3.4.2 | Saved Projects | Main Tab | F7 + F8 | P1 |
| 3.4.3 | About / Support | Main Tab | — | P1 |
| 3.4.4 | Invite Friends | Main Tab | Post-MVP | P2 |
| 4.1 | New Estimate Entry | Estimate Flow | F1 | P0 |
| 4.2 | Photo Captured | Estimate Flow | F1 | P0 |
| 4.3 | Context Questions | Estimate Flow | F2 | P0 |
| 4.4 | AI Processing | Estimate Flow | F1 + F3 | P0 |
| 4.5.1 | DIY Tab | Estimate Flow | F3 + F4 + F5 | P0 |
| 4.5.2 | Hybrid Tab | Estimate Flow | F3 + F4 + F6 | P0 |
| 4.5.3 | Full Pro Tab | Estimate Flow | F3 + F6 | P0 |
| 4.6 | Save Estimate | Estimate Flow | F7 | P0 |
| 4.7 | Share Estimate | Estimate Flow | — | P1 |
| 5.1 | Soft Paywall (Primary) | Paywall | F8 | P0 |
| 5.2.1 | Save Project Paywall | Paywall Context | F7 + F8 | P1 |
| 5.2.2 | Warranty Paywall | Paywall Context | F8 | P2 |
| 5.2.3 | PDF Export Paywall | Paywall Context | F8 | P1 |
| 5.2.4 | Price Alerts Paywall | Paywall Context | F8 + F10 | P2 |
| 5.3 | Subscription Success | Paywall | F8 | P0 |
| 5.4 | Subscription Management | Paywall | F8 | P0 |
| 6.1 | Notification Center | Notifications | F10 | P1 |
| 6.2 | Push Preferences | Notifications | F10 | P1 |
| 7.1 | **Find-a-Pro Sheet** | **Find a Pro** | **F6** | **P1** |
| 8.1-8.9 | Error / Edge States | System | — | P1 |

**Итого MVP уникальных screens:** ~42
**Итого P0 (critical path):** ~30
**Итого P1 (important, ship-month-1-2):** ~9 (**Find-a-Pro sheet = P1**, не P0 — нет revenue от него, не блокирует aha moment)
**Итого P2 (post-MVP v1.5):** ~3

**Priority shift:** Find-a-Pro Sheet теперь P1, не P0. Логика: core aha moment (1.1-1.8 onboarding + 4.x Estimate Flow) работает без pro handoff. Если sheet не готов к launch day, user всё равно видит "Quote range $175-275" на 4.5.3 + fair-price validator — это всё ещё core value prop. Sheet можно ship через 1-2 недели после launch без потери activation.

---

## Roadmap Expansions (Post-MVP)

### v1.5 Новые экраны (месяцы 4-8)

- **Warranty Tracker** — list view всех appliances warranties + reminder settings
- **Voice Input Screen** — альтернатива camera (Mike/Ronald personas)
- **AR Measurement** — partnership с Magicplan integration screen
- **Multi-user Household** — shared family account management
- **Quote Validator (Sarah feature)** — upload photo of pro's written quote → AI parses line items, flags overcharges. Ships как dedicated upload flow post-MVP (в MVP Sarah использует обычный Estimate Flow + сравнивает с её quote вручную)
- **Referral Program** — expanded invite flow с rewards tracker + savings-shared leaderboard
- **Insurance Report** — auto-format estimate как claim attachment
- **Neighbor Benchmarking** — "Others in 80203 paid $X для similar fixes"
- **Find-a-Pro upgrades** — если Thumbtack partnership approved, добавляем affiliate tag к URL + обновляем disclaimer. Ноль UX changes.

### v2.0 Новые экраны (год 2)

- **B2B Portal** — property manager bulk estimates dashboard
- **International Variants** — UK / Canada / Australia localized screens
- **Community Q&A Forum** — Reddit-style thread list / detail (Mike persona)
- **Video Walkthroughs** — custom video tutorial player (replaces YouTube search)
- **FixIt-native pro marketplace** — если traction validates это, можем строить сами (НЕ MVP scope)
- **Chat Follow-up** — post-estimate AI chat screen

### v3.0+ Platform moves

- **Home OS Dashboard** — full digital profile экран
- **Predictive Maintenance** — "Your water heater likely fails in 18mo"
- **Inspection Report Ingestion** — upload + prioritization flow
- **Crowdsourced Pricing Data** — user receipt upload + community view

---

## Design Notes и Cross-cutting Patterns

### 3-Layer Layout (per CLAUDE.md)

Каждый screen использует:
1. **Background** — absolute, gradients/hero images, NOT inside ScrollView
2. **Content** — flex/scroll, cards, text, interactive elements
3. **Floating UI** — absolute, bottom CTAs / top headers

Особенно critical для:
- Estimate Result (4.5) — background photo, scrollable content с 3 mode cards, floating "Save" + "Share" buttons
- Soft Paywall (5.1) — animated hero, scrollable benefits + tiers, floating CTA
- Camera screens (1.4, 4.1) — camera view background, floating guidance + shutter
- Find-a-Pro Sheet (7.1) — modal backdrop, 3 deeplink buttons, disclaimer floating

### Haptics (per CLAUDE.md)

`Haptics.impactAsync()` on:
- CTA button taps (все primary actions)
- Photo shutter (camera screens)
- Estimate mode tab switch (4.5.1/2/3)
- Saved confirmation (4.6)
- Paywall tier selection
- Find-a-Pro deeplink tap (7.1) — user leaving app, tactile confirmation

### aspectRatio Enforcement

FixIt = photo-centric app. Strict aspectRatio на:
- Photo thumbnails everywhere (cards, list items)
- Hero images в onboarding, paywalls
- Material preview images в shopping list (4.5.1)

### Dark Mode Support

Все screens поддерживают light/dark/system (per 3.4.1.3 Appearance settings). Critical для evening usage window (20:00-22:00 prime time per ONBOARDING-RESEARCH §6.4).

### Accessibility (WCAG AA baseline)

- Color contrast 4.5:1 minimum для text
- Touch target 44×44 pt minimum
- VoiceOver labels для all interactive elements
- Dynamic Type support
- Reduced motion variant для labor illusion animation

### Brand Voice (per POSITIONING §7)

Все copy под новый voice:

- **Calm, not urgent.** НЕ "ACT NOW — water damage costs $5K!". ДА "Here's what it costs. Breathe. Decide."
- **Informative, not pushy.** НЕ "Our pros are standing by." ДА "If you need a pro, here's where to find one."
- **Honest about limits.** "These are AI estimates — actual prices vary by ±25%."
- **Warm but precise.** "A leaky cartridge. An easy fix." — НЕ "You got this, king"
- **Celebrates user agency.** "You chose DIY — here's your guide." — НЕ "Ready for pro match?"

---

## Cross-Reference: Экраны ↔ Features

| Feature | Основные экраны | Поддерживающие |
|---|---|---|
| **F1 Photo Intake + AI** | 1.3, 1.4, 4.1, 4.2, 4.4 | 8.2, 8.3, 8.5, 8.6 |
| **F2 Intake Questions** | 1.2, 1.5, 4.3 | 8.4 |
| **F3 Cost Estimate Engine** | 1.7, 4.5.1, 4.5.2, 4.5.3 | 3.3.2, 3.3.3 |
| **F4 Material Shopping List** | 4.5.1 (inline), 4.5.2 | — |
| **F5 DIY Guide** | 4.5.1 (expandable inline) | — |
| **F6 Find a Pro (simple deeplinks)** | **7.1 (single sheet)** | 4.5.2, 4.5.3, 8.6 (fallback) |
| **F7 Saved Projects** | 3.2.1-3.2.3, 3.3.1-3.3.3, 4.6 | 5.2.1, 5.2.3 |
| **F8 Pricing Tier** | 5.1, 5.2.1-5.2.4, 5.3, 5.4, 1.8, 2.1 | 3.4.1.5 |
| **F9 Onboarding** | 1.1-1.8 | — |
| **F10 Push Notifications** | 6.1, 6.2, 3.4.1.2 | — |

Все экраны trace back к feature из FEATURES.md — нет "orphan" screens без feature ownership. **F6 drastically simplified** — 4 screens → 1 sheet.

---

## Что удалено из v1.0 (rescope changes summary)

| Было (v1.0 pre-rescope) | Стало (v2.0) | Причина |
|---|---|---|
| 7.1 Pro Match Results (list of 3-5 pros) | УДАЛЕНО | Marketplace UI не нужен — simple deeplink достаточно |
| 7.2 Pro Profile (ratings, reviews, portfolio) | УДАЛЕНО | Thumbtack/Yelp уже делают это лучше нас |
| 7.3 Quote Request (form with context auto-fill) | УДАЛЕНО | Lead capture gone — нет affiliate revenue stream |
| 7.4 Contact Pro (Thumbtack deep-link) | Объединено в 7.1 Find-a-Pro Sheet | Consolidated — один sheet, 3 options |
| 5.2.1 "Pro Match" Context Paywall | УДАЛЕНО | Find-a-Pro free для всех — нет gating |
| 4.5.3 Full Pro Tab "3-5 pro preview cards" | УДАЛЕНО | Заменено на fair-price validator + single "Find a pro" button |
| Copy "Our pros are standing by" / "Priority pro matching" | Переписано | "We'll point you to Thumbtack / Google / Yelp — you choose" (per POSITIONING §5) |
| Share copy "I found a great plumber via FixIt" | Переписано | "I saved $185 going DIY with FixIt" (savings anchor) |
| Home greeting "Need a pro for something?" | Переписано | "Anything new around the house?" |
| Push: "Your weekly pro availability update" | Переписано | "Spring is coming — three small fixes worth knowing about" |

**Net change:** -3 screens (Pro Match sub-flow), -1 context paywall. +1 simplified Find-a-Pro sheet. Total: 47 → 42 unique screens.

---

## Open Questions для Stage 5 (Design)

Для handoff в design stage требуются решения:

1. **Camera UI treatment** — native iOS camera vs custom FixIt camera UI (custom = больше control над guidance overlay, но effort)
2. **Estimate Result layout** — tabs (current spec) vs vertical cards vs carousel swipe — A/B test в Stage 6
3. **Paywall animation** — static / Lottie / video (per PAYWALL-RESEARCH §10.1 test #8)
4. **My Home visual metaphor** — floorplan-style vs room grid vs timeline
5. **Onboarding hero imagery** — photography vs illustration vs abstract
6. **Find-a-Pro Sheet visual** — 3 logo buttons vs 3 coloured tiles vs list items. A/B для understanding which deeplink users prefer (Thumbtack vs Google vs Yelp по demographic)
7. **Dark mode palette** — full rebrand или inversion

---

## Related Docs

- [POSITIONING.md](../02-product/POSITIONING.md) — new USP + brand voice + copy matrix (foundation for copy rewrites)
- [FEATURES.md](../02-product/FEATURES.md) — 10 MVP features + RICE prioritization (post-rescope, F6 = simple deeplinks)
- [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) — 3-step flow rationale, activation benchmarks
- [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) — soft paywall + context paywall strategy
- USER-FLOWS.md — flow diagrams между screens (updated under same rescope)
- WIREFRAMES.md (to be updated, stage 4) — low-fi wireframes per screen (Screen 18 Pro Match Results needs deletion, Find-a-Pro Sheet needs creation)
- DESIGN-SYSTEM.md (to be written, stage 5) — components, tokens, типография

---

**Дата последнего обновления:** 2026-04-19 (rescope v2.0 — AI-only, no marketplace)
**Автор:** UX Team
**Статус:** v2.0 post-rescope для stage 4 review → handoff к stage 5 (Design System + Wireframes)
**Следующий шаг:** USER-FLOWS.md updated in parallel — Flow 4 (Quote Validator) + Flow 7 (Viral savings share loop) replaced
