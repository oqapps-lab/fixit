# SCREEN-MAP.md — FixIt

**Дата:** 18 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** UX Design (Stage 4)
**Тип документа:** Карта экранов MVP + roadmap expansions
**Companion docs:** [FEATURES.md](../02-product/FEATURES.md) · [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) · [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md)

---

## TL;DR

FixIt — **photo-first utility app**, поэтому структура экранов радикально отличается от quiz-based приложений (Noom, Sugar Quit). Приоритеты:

- **Onboarding = 8 экранов**, target <90 sec до первого AI estimate (per ONBOARDING-RESEARCH §1.6)
- **4 main tabs:** Home / My Home / Estimates / Profile (после onboarding)
- **Estimate Flow** = sovereign full-screen flow поверх табов, повторяется каждый раз
- **Paywall** — soft gate после 3-го estimate + context paywalls на premium features (per PAYWALL-RESEARCH §1.3)
- **Pro Match** — отдельный sub-flow внутри Estimate Flow, но с собственными screens для lead generation

**Итого MVP unique screens:** ~47
**Итого включая states/variants:** ~68

---

## Карта экранов

```
FixIt App
│
├── 1. Onboarding Flow (не авторизован, первый запуск)
│   ├── 1.1 Welcome Screen (value prop + CTA "Take a photo")
│   ├── 1.2 Location Capture (zip / city / auto-detect)
│   ├── 1.3 Camera Permission (privacy statement + sample thumbnails)
│   ├── 1.4 First Photo Capture (in-camera guidance + gallery fallback)
│   ├── 1.5 Pre-estimate Context Micro-screen (DIY readiness + quality tier)
│   ├── 1.6 AI Processing (labor illusion, 5-8 sec, animated steps)
│   ├── 1.7 First Estimate Result (aha moment — 3 options DIY/Hybrid/Pro)
│   └── 1.8 Signup Ask (soft bottom-sheet after aha)
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
│   │   ├── [state: re-engagement — "Welcome back!" + last estimate card]
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
│       └── 3.4.4 Invite Friends (referral program — post-MVP hook)
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
│   │   │   ├── Materials list (with retailer prices + store locator)
│   │   │   ├── Step-by-step guide (video embed + text + photos)
│   │   │   └── Difficulty rating + time estimate + safety callouts
│   │   │
│   │   ├── 4.5.2 Hybrid Tab
│   │   │   ├── Materials list (you buy — same as DIY)
│   │   │   ├── Labor cost (hire handyman for install)
│   │   │   └── "Why Hybrid makes sense for this" AI explanation
│   │   │
│   │   └── 4.5.3 Full Pro Tab
│   │       ├── Quote range for your zip (median + spread)
│   │       ├── 3-5 local pros (Thumbtack/Angi affiliate)
│   │       └── "Fair-price check" validator
│   │
│   ├── 4.6 Save Estimate (name + category + room + notes)
│   │
│   └── 4.7 Share Estimate (social + messaging + PDF export)
│
├── 5. Paywall Screens
│   │
│   ├── 5.1 Soft Paywall — Primary (after 3rd free estimate hit limit)
│   │   ├── Hero "You've used your free estimates"
│   │   ├── Tier comparison (Monthly / Annual / Pay-per)
│   │   ├── Social proof + testimonials
│   │   └── CTA "Unlock Unlimited Access"
│   │
│   ├── 5.2 Context Paywall (premium feature access)
│   │   ├── 5.2.1 "Pro Match" paywall (для licensed-tier pros)
│   │   ├── 5.2.2 "Save Project" paywall (after 5 free saves)
│   │   ├── 5.2.3 "Warranty Tracker" paywall (v1.5 feature gate)
│   │   ├── 5.2.4 "PDF Export" paywall (для insurance/resale reports)
│   │   └── 5.2.5 "Price Alerts" paywall (material price drop notify)
│   │
│   ├── 5.3 Subscription Success (post-purchase confirmation)
│   │
│   └── 5.4 Subscription Management (cancel / change tier / pause)
│
├── 6. Notifications
│   ├── 6.1 Notification Center (in-app list of recent pushes)
│   └── 6.2 Push Notification Preferences (granular per-category)
│
├── 7. Pro Match Flow (sub-flow запускается из 4.5.3)
│   ├── 7.1 Pro Match Results (list of 3-5 pros с ratings)
│   ├── 7.2 Pro Profile (rating, reviews, photos, estimated cost)
│   ├── 7.3 Quote Request (form: context auto-filled, confirm + send)
│   └── 7.4 Contact Pro (in-app deep link к Thumbtack/Angi)
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
| Paywall | 4 + 5 context variants = 9 | 11 |
| Notifications | 2 | 2 |
| Pro Match | 4 | 5 |
| Error states | 9 | 9 |
| **Итого MVP** | **~47** | **~68** |

---

## Подробные описания экранов

### 1. Onboarding Flow

Target: <90 секунд install → first estimate completed (per ONBOARDING-RESEARCH §1.6). 3-step priming + photo flow + post-aha signup. **No quiz.** Photo-AI utility pattern (PictureThis / Rock Identifier reference).

#### 1.1 Welcome Screen

| Поле | Описание |
|---|---|
| **Назначение** | Reinforce value prop + accelerate к камере (Emma already saw TikTok ad) |
| **Откуда** | App Store → First open / reinstall |
| **Куда** | → Location Capture (1.2) |
| **Ключевые элементы** | Hero image (multi-category: faucet + electrical + chair), headline "Know the price of any home repair in 60 seconds", subheadline "Photo → AI estimate → DIY, Hybrid или Pro option", single CTA "Take a photo of your problem" |
| **Primary action** | "Take a photo" (переход к location capture) |
| **Secondary actions** | Нет (single-button screen — минимальный cognitive load) |
| **Фича** | F9 (Onboarding) |
| **Design notes** | Background hints at plumbing + electrical + furniture — иначе Emma с другой проблемой думает "это только про сантехнику" |

#### 1.2 Location Capture

| Поле | Описание |
|---|---|
| **Назначение** | Единственный required onboarding question — regional pricing = наш moat |
| **Откуда** | Welcome (1.1) |
| **Куда** | → Camera Permission (1.3) (если permission дан раньше — сразу 1.4) |
| **Ключевые элементы** | Headline "Where do you live?", sub "Prices vary 40%+ by region", ZIP input field, "Use my location" button (auto-detect via Expo Location), skip link "Skip for now" |
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
| **Ключевые элементы** | Photo thumbnail (user's actual photo pulsating), animated scanning ring, auto-cycling progress steps: "Identifying the problem..." → "Checking Home Depot prices in [ZIP]..." → "Pulling local plumber rates..." → "Calculating DIY difficulty..." |
| **Primary action** | (passive — 5-8 sec auto) |
| **Secondary actions** | Нет "tap to skip" (убивает labor illusion) |
| **Фича** | F1 + F3 (Cost Engine) + F9 (Onboarding UX pattern) |
| **Design notes** | Duration matches actual Claude API response time (3-6 sec) + 1-2 sec visual buffer. Никогда не показываем blank spinner. Abandon rate target <5% |

#### 1.7 First Estimate Result (AHA MOMENT)

| Поле | Описание |
|---|---|
| **Назначение** | THE aha moment. 60-90 секунд от install. Value demonstrated ДО paywall и signup |
| **Откуда** | AI Processing (1.6) |
| **Куда** | → Signup Ask (1.8) — soft bottom sheet |
| **Ключевые элементы** | Photo thumbnail (top-left, validates "AI actually looked at МОЕ фото"), diagnosis headline ("Leaky Kitchen Faucet Supply Line — Denver, CO 80203"), three options side-by-side (DIY $12-18 / Hybrid $15+$95 / Pro $175-275), "Why we recommend [mode] for this" AI 1-line explanation, "Save $260 by DIY" savings contrast |
| **Primary action** | Tap any mode card → expanded detail view (leads to full Estimate Result screen 4.5) |
| **Secondary actions** | "Save this estimate" (triggers 1.8 signup ask), share button |
| **Фича** | F3 (Cost Estimate Engine — 3-Mode Output) |
| **Design notes** | Three options side-by-side визуально — контраст $18 DIY vs $275 Pro = visceral aha. Result screen time target >15 sec (user читает и осмысливает) |

#### 1.8 Signup Ask (Soft Bottom Sheet)

| Поле | Описание |
|---|---|
| **Назначение** | Deferred signup post-value — +40-55% willingness vs upfront (per ONBOARDING-RESEARCH §3) |
| **Откуда** | First Estimate Result (1.7) — trigger на "Save" tap OR 15 sec after result shown |
| **Куда** | → Auth (2.1) OR → Home Tab (3.1) if "Not now" |
| **Ключевые элементы** | Bottom sheet (не full screen — less intrusive), headline "Save this estimate + get 2 more free", Apple Sign-In button (primary iOS), Google Sign-In, Email button, small grey "Not now" |
| **Primary action** | Apple/Google/Email signup |
| **Secondary actions** | "Not now" (allowed — continues as guest to Home) |
| **Фича** | F8 (Pricing Tier — freemium) + F9 (Onboarding) |
| **Design notes** | Target 55-65% signup rate post-aha. Не показываем paywall здесь — paywall только после 3rd estimate |

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
| **Ключевые элементы** | Hero: large floating "Take a photo / New Estimate" button (center), "Estimates this month: 2/3" counter (free tier) OR "Unlimited" (pro), last estimate card (thumbnail + cost + date), seasonal banner ("Spring maintenance season — 5 common April fixes"), quick actions row (Browse past / Maintenance tips / Invite friends) |
| **Primary action** | "Take a photo" button → Estimate Flow (4.1) |
| **Secondary actions** | Tap last estimate card → Estimate Detail, seasonal banner → browse recommendations |
| **Фича** | F1 (Photo Intake entry point) + F7 (My Home hook) |
| **States** | - `first-day`: highlight key features (guided tour overlay) <br> - `with-history`: last estimates + seasonal <br> - `re-engagement`: "Welcome back!" banner (user returned after 7+ days absence) <br> - `limit-reached`: top banner "3/3 free used — Upgrade" |

#### 3.2 My Home Tab (Progressive Profile)

Emma's home data накапливается постепенно — НЕ собираем front-load в onboarding (ONBOARDING-RESEARCH §7).

##### 3.2.1 Home Dashboard

| Поле | Описание |
|---|---|
| **Назначение** | Обзор home profile: saved rooms, savings tracker, maintenance calendar preview |
| **Откуда** | Tab bar |
| **Куда** | → Home Profile Edit (3.2.2), → Room Detail (3.2.3), → Maintenance Calendar (3.2.4), → Estimate Detail (3.3.2) |
| **Ключевые элементы** | Hero: "You've saved $X with FixIt" counter (motivational), rooms grid (Kitchen / Bathroom / Living Room / Garage — each with repair count), next maintenance task card ("HVAC filter due in 12 days"), past projects timeline (last 5 projects с thumbnails) |
| **Primary action** | Tap room → Room Detail OR tap "Add room" → Home Profile Edit |
| **Secondary actions** | Export home report (PDF — Pro feature, triggers 5.2.4 paywall), maintenance calendar link |
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
| **Куда** | → Share (4.7), → PDF Export (triggers paywall 5.2.4), → Re-estimate |
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
| **Ключевые элементы** | Categories: Project progress / Material delivery / Seasonal maintenance / Price drop alerts / FixIt tips. Each toggle. Quiet hours (10pm-7am auto) |
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
| **Куда** | → Estimate Detail, → Paywall 5.2.2 if free limit hit |
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
| **Назначение** | Referral program — free estimates за invite (viral loop для Emma) |
| **Ключевые элементы** | Personal referral code, share sheet, "You've invited X friends, earned Y free estimates", leaderboard (optional) |
| **Фича** | Post-MVP v1.5 — stub в MVP |

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
| **Назначение** | The core deliverable. Tabbed interface — DIY / Hybrid / Pro — default tab based on DIY readiness answer |
| **Откуда** | AI Processing (4.4), Estimate Detail (3.3.2) re-view |
| **Куда** | → DIY materials/guide (4.5.1), Hybrid handyman (4.5.2), Pro Match (4.5.3 → 7.x), Save (4.6), Share (4.7) |
| **Ключевые элементы** | Photo thumbnail + diagnosis top, three mode tabs (DIY / Hybrid / Pro), mode detail below, "Save" + "Share" floating buttons bottom |
| **Фича** | F3 (Cost Estimate Engine — 3-Mode Output) |

##### 4.5.1 DIY Tab

| Поле | Описание |
|---|---|
| **Ключевые элементы** | Material cost range ($12-18), time estimate (20 min), difficulty rating (2/5), materials list with prices + retailer badges (tap → Feature #4 shopping list flow), "Get step-by-step guide" CTA (→ Feature #5), safety callouts (red flags для gas/electrical) |
| **Primary action** | "Start DIY guide" → opens 5-10 step guide (embedded video + text) |
| **Secondary actions** | "Order materials" (deep-link к Home Depot), "Bail out to Pro" (switches к 4.5.3) |
| **Фича** | F3 + F4 (Shopping List) + F5 (DIY Guide) |

##### 4.5.2 Hybrid Tab

| Поле | Описание |
|---|---|
| **Ключевые элементы** | Material cost (you buy — same list as DIY tab), labor cost (handyman install — e.g. $95 for 1hr), total, "Why Hybrid" AI explanation, "Find handyman" CTA |
| **Primary action** | "Order materials + find handyman" (dual action) |
| **Secondary actions** | View materials list only, switch к Pro mode |
| **Фича** | F3 + F4 + F6 (Pro Match — for handyman) |

##### 4.5.3 Full Pro Tab

| Поле | Описание |
|---|---|
| **Ключевые элементы** | Quote range ($175-275), "Based on 3 local pros in 80203", fair-price check ("If pro quoted >$350, that's above market"), "See pros" CTA (→ 7.1 Pro Match Results), 3-5 pro preview cards |
| **Primary action** | "See all pros" → 7.1 Pro Match Results |
| **Secondary actions** | Tap individual pro card → 7.2 Pro Profile |
| **Фича** | F3 + F6 (Pro Match) |

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
| **Paywall trigger** | Free users — after 5 saved projects → 5.2.2 Context Paywall |

#### 4.7 Share Estimate

| Поле | Описание |
|---|---|
| **Назначение** | Native iOS/Android share sheet + PDF export (Pro feature) |
| **Откуда** | Estimate Result (4.5), Estimate Detail (3.3.2) |
| **Куда** | External app (messaging, email, social) OR PDF viewer |
| **Ключевые элементы** | Share sheet (iOS native), "Export as PDF" (Pro feature — triggers 5.2.4 if free), share card preview с branding |
| **Primary action** | Share via chosen app |
| **Secondary actions** | Export PDF (Pro), copy link |
| **Фича** | Viral loop support (Emma shares → friend downloads) |

---

### 5. Paywall Screens

Based on PAYWALL-RESEARCH recommendations: **soft paywall** после 3rd estimate + **context paywalls** на premium features. NO hard paywall (убивает install→active на 60-70% без brand equity).

#### 5.1 Soft Paywall (Primary — After 3rd Free Estimate)

| Поле | Описание |
|---|---|
| **Назначение** | Конвертировать free → paid после value demonstrated. Target 18-25% conversion среди hit-limit users |
| **Откуда** | Estimate Flow attempt when limit hit (4.1 blocked), Home Tab (3.1) banner tap |
| **Куда** | → Subscription Success (5.3) OR back к app (free user, 1 pay-per option) |
| **Ключевые элементы** | Hero animated header (user's recent estimate photo), personalized emotional hook ("You've saved $247 on 3 repairs with FixIt 💪"), 4 clear benefits (Unlimited estimates / Full project history / Save "my home" / Priority pro matching), tier comparison cards: Annual $49.99/yr (pre-selected, "BEST VALUE" badge, "= $4.17/month, SAVE 48%") / Monthly $7.99 / Pay-per $2.99, social proof (★★★★★ 4.8 — 12,400 reviews + testimonial), dominant CTA "UNLOCK UNLIMITED ACCESS" (orange brand color), trust signals ("Cancel anytime · Restore purchase") |
| **Primary action** | "Unlock Unlimited" (triggers Adapty purchase flow) |
| **Secondary actions** | "Pay as you go $2.99" (single estimate), close X (не dark-patterned — visible) |
| **Фича** | F8 (Pricing Tier — freemium gate) |
| **Design notes** | Wireframe detail в PAYWALL-RESEARCH §2.3. NO 15+ feature list (overwhelming), NO stock photos, NO 3+ tier complexity. Pre-selected annual = +15-20% annual uptake (Mojo benchmark) |

#### 5.2 Context Paywall (Secondary — Premium Feature Access)

Срабатывает при tap на premium action. Лower raw conversion (10-15%) но higher LTV per converter — user commits к specific value.

##### 5.2.1 "Pro Match" Context Paywall

| Поле | Описание |
|---|---|
| **Trigger** | Free user taps "See all pros" в Full Pro Tab (4.5.3) OR "Contact pro" |
| **Ключевые элементы** | Hook "Connect with verified, vetted pros", screenshot preview Pro Match UI, benefits (Pre-vetted quotes / Priority response / No spam calls), single dominant CTA "Try Pro — $49.99/year", small link "Other plans", "Not now" exit |
| **Conversion target** | 10-12% |

##### 5.2.2 "Save Project" Context Paywall

| Поле | Описание |
|---|---|
| **Trigger** | Free user tries to save 6th project (5 free saves — cap per FEATURES §F7) |
| **Ключевые элементы** | Hook "Save unlimited projects to Your Home", screenshot preview My Home tab organized view, benefits (Unlimited saves / Warranty reminders / Room organization), CTA "Upgrade" |
| **Conversion target** | 12-15% |

##### 5.2.3 "Warranty Tracker" Context Paywall

| Поле | Описание |
|---|---|
| **Trigger** | Free user taps "Add warranty" на any estimate/project (v1.5 feature gate) |
| **Ключевые элементы** | Hook "Never miss a warranty expiration", benefits, CTA |
| **Conversion target** | 8-10% |

##### 5.2.4 "PDF Export" Context Paywall

| Поле | Описание |
|---|---|
| **Trigger** | Free user taps "Export as PDF" — insurance reports / resale disclosures |
| **Ключевые элементы** | Hook "Share professional reports с insurance, realtors", benefits, CTA |
| **Conversion target** | 8-10% |

##### 5.2.5 "Price Alerts" Context Paywall

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
| **Ключевые элементы** | Celebration animation (confetti), "Welcome to FixIt Pro!" headline, activated benefits list (visual checkmarks), "Start your next estimate" CTA, receipt email confirmation note |
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
| **Куда** | → Estimate Detail, → Pro Match (для pro response notifications), → material shopping list (для delivery reminders) |
| **Ключевые элементы** | Chronological list, each item: icon + title + body + relative time + read-state indicator |
| **Primary action** | Tap notification → deep-link к relevant screen |
| **Secondary actions** | Mark all read, clear, swipe-delete |
| **Фича** | F10 (Push Notifications) |

#### 6.2 Push Notification Preferences

| Поле | Описание |
|---|---|
| **Назначение** | Granular opt-in per category (Emma fears spam — trust builder) |
| **Откуда** | Profile → Settings → Notifications (3.4.1.2) OR post-signup priming screen |
| **Ключевые элементы** | Priming screen first ("Never lose track of a repair project" per ONBOARDING-RESEARCH §6.2) — triggers iOS permission after user taps "Enable", then settings screen с categories: Project progress / Material delivery / Seasonal maintenance / Price drops / FixIt tips (marketing default OFF) |
| **Фича** | F10 |

---

### 7. Pro Match Flow

Sub-flow запускается из Estimate Result Full Pro tab (4.5.3). Critical для revenue — $15-40 per qualified lead (per FEATURES §F6).

#### 7.1 Pro Match Results

| Поле | Описание |
|---|---|
| **Назначение** | List 3-5 local pros для текущего estimate + zip |
| **Откуда** | Estimate Result Full Pro Tab (4.5.3) "See all pros" |
| **Куда** | → Pro Profile (7.2), back к Estimate |
| **Ключевые элементы** | Filter bar (All / Licensed / Available this week), each pro card: profile photo, name, years experience, license badge, rating stars, review count, estimated cost для this job, availability snippet ("Can come Wed 2-4pm"), "View profile" tap target |
| **Primary action** | Tap pro → Pro Profile |
| **Secondary actions** | Filter, sort (by rating / availability / cost) |
| **Фича** | F6 (Pro Match) |
| **Paywall** | 5.2.1 triggers for free users trying to contact pro |

#### 7.2 Pro Profile

| Поле | Описание |
|---|---|
| **Назначение** | Detailed pro view — trust + decision-making |
| **Откуда** | Pro Match Results (7.1) |
| **Куда** | → Quote Request (7.3), back к Results |
| **Ключевые элементы** | Large profile photo, name, years in business, license + BBB badges, full review list (scrollable), portfolio photos, typical response time, estimated cost для this job, "Request quote" CTA |
| **Primary action** | "Request quote" → 7.3 Quote Request |
| **Secondary actions** | Call pro (direct phone — Pro feature, gated), message pro |
| **Фича** | F6 (Pro Match) |

#### 7.3 Quote Request

| Поле | Описание |
|---|---|
| **Назначение** | Send lead с full context к pro (photo + diagnosis + zip + quality tier auto-packaged) |
| **Откуда** | Pro Profile (7.2) |
| **Куда** | → Contact Pro (7.4) OR back |
| **Ключевые элементы** | Context preview ("Sending: your photo + diagnosis + Denver 80203 + quality tier: mid-range"), editable message field (optional user note), availability preference picker, "Send request" CTA |
| **Primary action** | Send request (triggers Thumbtack/Angi API) |
| **Secondary actions** | Cancel, edit context |
| **Фича** | F6 (Pro Match — lead generation) |
| **Revenue** | Affiliate attribution $15-40 per qualified lead |

#### 7.4 Contact Pro

| Поле | Описание |
|---|---|
| **Назначение** | Deep-link handoff к Thumbtack или Angi app (или stay in-app если white-label possible) |
| **Откуда** | Quote Request (7.3) success |
| **Куда** | External (Thumbtack app) OR in-app pro chat (if partnership allows) |
| **Ключевые элементы** | Success confirmation, "Pro will respond within X hours", tracking link "Check status" (48hr follow-up notification scheduled) |
| **Primary action** | "Open Thumbtack" (external app launch) |
| **Secondary actions** | Stay in FixIt, check estimate saved |
| **Фича** | F6 |

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
| **Ключевые элементы** | "We couldn't identify this issue. Could you describe it?", text input, "Retake photo", "Chat with pro" alternate path (Pro Match direct) |

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
| 5.2.1 | Pro Match Paywall | Paywall Context | F6 + F8 | P1 |
| 5.2.2 | Save Project Paywall | Paywall Context | F7 + F8 | P1 |
| 5.2.3 | Warranty Paywall | Paywall Context | F8 | P2 |
| 5.2.4 | PDF Export Paywall | Paywall Context | F8 | P1 |
| 5.2.5 | Price Alerts Paywall | Paywall Context | F8 + F10 | P2 |
| 5.3 | Subscription Success | Paywall | F8 | P0 |
| 5.4 | Subscription Management | Paywall | F8 | P0 |
| 6.1 | Notification Center | Notifications | F10 | P1 |
| 6.2 | Push Preferences | Notifications | F10 | P1 |
| 7.1 | Pro Match Results | Pro Match | F6 | P0 |
| 7.2 | Pro Profile | Pro Match | F6 | P0 |
| 7.3 | Quote Request | Pro Match | F6 | P0 |
| 7.4 | Contact Pro | Pro Match | F6 | P0 |
| 8.1-8.9 | Error / Edge States | System | — | P1 |

**Итого MVP уникальных screens:** ~47
**Итого P0 (critical path):** ~32
**Итого P1 (important, ship-month-1-2):** ~13
**Итого P2 (post-MVP v1.5):** ~4

---

## Roadmap Expansions (Post-MVP)

### v1.5 Новые экраны (месяцы 4-8)

- **Warranty Tracker** — list view всех appliances warranties + reminder settings
- **Voice Input Screen** — альтернатива camera (Mike/Ronald personas)
- **AR Measurement** — partnership с Magicplan integration screen
- **Multi-user Household** — shared family account management
- **Quote Validator** — upload pro quote PDF, AI parses + flags overcharges (Sarah persona)
- **Referral Program** — expanded invite flow с rewards tracker
- **Insurance Report** — auto-format estimate как claim attachment
- **Neighbor Benchmarking** — "Others in 80203 paid $X для similar fixes"

### v2.0 Новые экраны (год 2)

- **B2B Portal** — property manager bulk estimates dashboard
- **International Variants** — UK / Canada / Australia localized screens
- **Community Q&A Forum** — Reddit-style thread list / detail (Mike persona)
- **Video Walkthroughs** — custom video tutorial player (replaces YouTube embeds)
- **Contractor Directory Direct** — FixIt-native marketplace (move beyond Thumbtack)
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

### Haptics (per CLAUDE.md)

`Haptics.impactAsync()` on:
- CTA button taps (все primary actions)
- Photo shutter (camera screens)
- Estimate mode tab switch (4.5.1/2/3)
- Saved confirmation (4.6)
- Paywall tier selection

### aspectRatio Enforcement

FixIt = photo-centric app. Strict aspectRatio на:
- Photo thumbnails everywhere (cards, list items)
- Hero images в onboarding, paywalls
- Pro profile photos (7.2)
- Material preview images в shopping list (4.5.1)

### Dark Mode Support

Все screens поддерживают light/dark/system (per 3.4.1.3 Appearance settings). Critical для evening usage window (20:00-22:00 prime time per ONBOARDING-RESEARCH §6.4).

### Accessibility (WCAG AA baseline)

- Color contrast 4.5:1 minimum для text
- Touch target 44×44 pt minimum
- VoiceOver labels для all interactive elements
- Dynamic Type support
- Reduced motion variant для labor illusion animation

---

## Cross-Reference: Экраны ↔ Features

| Feature | Основные экраны | Поддерживающие |
|---|---|---|
| **F1 Photo Intake + AI** | 1.3, 1.4, 4.1, 4.2, 4.4 | 8.2, 8.3, 8.5, 8.6 |
| **F2 Intake Questions** | 1.2, 1.5, 4.3 | 8.4 |
| **F3 Cost Estimate Engine** | 1.7, 4.5.1, 4.5.2, 4.5.3 | 3.3.2, 3.3.3 |
| **F4 Material Shopping List** | 4.5.1 (inline), 4.5.2 | — |
| **F5 DIY Guide** | 4.5.1 (expandable inline) | — |
| **F6 Pro Match** | 4.5.3, 7.1, 7.2, 7.3, 7.4 | 5.2.1 |
| **F7 Saved Projects** | 3.2.1-3.2.3, 3.3.1-3.3.3, 4.6 | 5.2.2, 5.2.4 |
| **F8 Pricing Tier** | 5.1, 5.2.1-5.2.5, 5.3, 5.4, 1.8, 2.1 | 3.4.1.5 |
| **F9 Onboarding** | 1.1-1.8 | — |
| **F10 Push Notifications** | 6.1, 6.2, 3.4.1.2 | — |

Все экраны trace back к feature из FEATURES.md — нет "orphan" screens без feature ownership.

---

## Open Questions для Stage 5 (Design)

Для handoff в design stage требуются решения:

1. **Camera UI treatment** — native iOS camera vs custom FixIt camera UI (custom = больше control над guidance overlay, но effort)
2. **Estimate Result layout** — tabs (current spec) vs vertical cards vs carousel swipe — A/B test в Stage 6
3. **Paywall animation** — static / Lottie / video (per PAYWALL-RESEARCH §10.1 test #8)
4. **My Home visual metaphor** — floorplan-style vs room grid vs timeline
5. **Onboarding hero imagery** — photography vs illustration vs abstract
6. **Pro Match card design** — dating-app-style swipe vs list vs map view
7. **Dark mode palette** — full rebrand или inversion

---

## Related Docs

- [FEATURES.md](../02-product/FEATURES.md) — 10 MVP features + RICE prioritization
- [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) — 3-step flow rationale, activation benchmarks
- [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) — soft paywall + context paywall strategy
- USER-FLOWS.md (to be written, stage 4) — pixel-level flow diagrams между screens
- WIREFRAMES.md (to be written, stage 4) — low-fi wireframes per screen
- DESIGN-SYSTEM.md (to be written, stage 5) — components, tokens, типография

---

**Дата последнего обновления:** 2026-04-18
**Автор:** UX Team
**Статус:** v1.0 для stage 4 review → handoff к stage 5 (Design System + Wireframes)
**Следующий шаг:** USER-FLOWS.md — детализация happy-path и edge-path flows между screens
