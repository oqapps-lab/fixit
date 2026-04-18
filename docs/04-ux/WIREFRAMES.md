---
Проект: FixIt — AI home repair cost advisor
Дата: 2026-04-18
Статус: Draft v1.0
Автор: UX Team (Лана + Amanda)
Stage: UX Design (Stage 4)
---

# WIREFRAMES.md — FixIt

**Companion docs:** [SCREEN-MAP.md](./SCREEN-MAP.md) · [USER-FLOWS.md](./USER-FLOWS.md) · [FEATURES.md](../02-product/FEATURES.md) · [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) · [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) · [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md)

---

## Обзор документа

Этот файл содержит ASCII-wireframes для 18 ключевых экранов FixIt MVP v1.0. Каждый wireframe — низкодетальный текстовый макет, описывающий layout, иерархию элементов и primary CTA, но НЕ финальный визуальный дизайн. Финальная визуализация будет реализована на Stage 5 через Stitch/Figma с учётом design system (colors, typography, spacing).

Wireframes ориентированы на Emma persona (first-time homeowner, 28-35 лет, Denver/Austin/Raleigh) — primary MVP audience. Вторичные persona (Mike, Sarah, Tyler, Ronald) учтены в context paywalls и expansion wireframes, но их отдельные entry flows — post-MVP.

Ключевые принципы wireframing:
- **Mobile-first, portrait orientation** — FixIt используется "с дивана в 20:00" или "на месте проблемы, в ванной с одной рукой".
- **Photo-first interaction** — camera — главный input; каждый entry point ведёт к фото.
- **Three options always** — DIY / Hybrid / Pro показываем параллельно, не sequence.
- **Bottom tab navigation** — 4 tabs (Home / My Home / Estimates / Me), стандартный iOS/Android паттерн.
- **One primary CTA per screen** — cognitive load минимален.
- **3-Layer Layout System** (per CLAUDE.md) — Background absolute → Content scroll → Floating UI absolute.

---

## Conventions

- `[BUTTON]` — interactive button
- `( )` — radio / selection
- `[    ]` — text input
- `───` — divider
- `[img]` — image placeholder
- `[icon]` — icon placeholder
- `◉` — filled / selected state
- `○` — empty / unselected state
- `▶` — chevron (navigation affordance)
- `🔒 / 💰 / 📷 / 🏠` — category/emotion icons (финальная иконография на Stage 5)

---

## Key Screens — Wireframes

### 1.1 Welcome Screen

Первый экран при cold install. Цель — одна: убедить Emma за 8 секунд, что этот app решает её проблему, и нажать "Take a photo". Никаких signup, email, video demo — kills velocity per ONBOARDING-RESEARCH §1.2.

```
┌────────────────────────────────┐
│                                │
│                                │
│         [FixIt logo]           │
│                                │
│                                │
│                                │
│   Know the price of any        │
│   home repair in 60 seconds    │
│                                │
│                                │
│   [img: photo→estimate hero]   │
│   (protyechka → $15 DIY /      │
│    $275 Pro comparison)        │
│                                │
│                                │
│                                │
│                                │
│                                │
│    [ Take a photo 📷 ]         │  ← primary CTA
│                                │
│    [or describe your problem]  │  ← fallback text link
│                                │
│    Already have account? Login │  ← subtle link
│                                │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 1.1 Welcome
**Purpose:** Reinforce value prop Emma видела в TikTok/podcast + accelerate к камере
**Primary CTA:** "Take a photo" — запускает camera permission flow (1.3)
**Secondary:** "Describe your problem" — text-only fallback (редкие cases, <5-8% per ONBOARDING §4)
**Tertiary:** Login link для returning users после re-install
**Design notes:**
- Hero image должен показывать breadth (plumbing + electrical + furniture + appliance), не только protyechku — иначе Emma с cracked tile думает "это только про сантехнику"
- Headline под 60 символов для читаемости
- НЕТ swipe-through tutorials (-15% activation в photo-AI category)
- НЕТ video demo (kills velocity)

---

### 1.2 Location Capture

Единственный onboarding question, который действительно needed для value delivery. Regional pricing — наш moat (±40% между zip), без zip Emma видит national average и aha-момент разрушен.

```
┌────────────────────────────────┐
│ [< back]                       │
│                                │
│                                │
│                                │
│       [map pin icon]           │
│                                │
│                                │
│   Where do you live?           │
│                                │
│   Prices vary 40%+ by region.  │
│   We pull accurate rates for   │
│   your area.                   │
│                                │
│                                │
│   ┌──────────────────────┐     │
│   │ ZIP code or city     │     │  ← text input
│   └──────────────────────┘     │
│                                │
│                                │
│    [ 📍 Use my location ]      │  ← auto-detect
│                                │
│                                │
│                                │
│   Skip for now                 │  ← soft skip link
│                                │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 1.2 Location
**Purpose:** Capture zip для regional pricing, который критичен для aha-moment
**Primary CTA:** "Use my location" (auto-detect через Expo Location API) — grant rate target 70%+
**Secondary:** Manual ZIP entry (текстовое поле)
**Tertiary:** Skip — allowed, но с soft prompt после первого estimate ("add ZIP for exact pricing")
**Edge cases:**
- Location permission denied → fallback к manual entry с reassurance copy
- Invalid ZIP (not 5 digits, international) → inline validation
- International user → soft gate "FixIt is US-only in v1. Waitlist for your region?"
**Target metrics:** 85% completion, <20% skip rate

---

### 1.3 Camera Permission Priming

Permission priming screen (custom) перед iOS/Android native permission dialog. Поднимает grant rate с ~60% cold до 85%+ (per Appcues Mobile Permission Priming 2024). SkinVision research: privacy statement добавляет +11-15% к permission grant в sensitive categories.

```
┌────────────────────────────────┐
│ [< back]                       │
│                                │
│                                │
│      [camera icon large]       │
│                                │
│                                │
│   Take a photo of what's       │
│   broken                       │
│                                │
│   Clear photos help AI         │
│   identify your problem in     │
│   10 seconds                   │
│                                │
│   ───────────────              │
│                                │
│   [img] [img] [img] [img]      │  ← sample thumbnails
│   pipe  wall  chair  fridge    │    (scope breadth)
│                                │
│   ───────────────              │
│                                │
│   🔒 Photos stay private to    │
│      your account              │
│   🌍 We use your ZIP for       │
│      accurate local pricing    │
│   ⚡ Results in ~60 seconds    │
│                                │
│                                │
│    [  Allow Camera  ]          │  ← primary — triggers iOS dialog
│                                │
│    I have a saved photo        │  ← upload fallback
│                                │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 1.3 Camera Permission
**Purpose:** Priming перед iOS native permission dialog; framing reassures privacy-anxious Emma
**Primary CTA:** "Allow Camera" → triggers native permission prompt
**Secondary:** "I have a saved photo" → gallery picker (для users, уже сделавших фото до install — например, пришли из quote-checking ad)
**Design notes:**
- 4 sample thumbnails (plumbing/wall/furniture/appliance) = sweet spot per PictureThis teardown (2 недостаточно, 8 перегружает)
- Privacy statement bold и первый в списке — single biggest lift in sensitive categories
- Если user denied permission на native dialog → soft fallback screen "Change in Settings" + gallery-only mode
**Target metrics:** 85% grant rate на этом экране

---

### 1.4 Camera View (Capture)

Сам момент фотографии. В идеале — native iOS camera UI с overlay guidance. Auto-cycling tips помогают Emma сделать photo, которое AI правильно распознает.

```
┌────────────────────────────────┐
│ [X close]           [?  help]  │
│                                │
│  💡 Snap the problem area —    │  ← top guidance (auto-cycle)
│     close-up helps             │
│                                │
│   ┌──────────────────────┐     │
│   │                      │     │
│   │                      │     │
│   │   [camera viewport]  │     │
│   │                      │     │
│   │   [image of problem] │     │
│   │                      │     │
│   │                      │     │
│   └──────────────────────┘     │
│                                │
│   💡 Good lighting +           │  ← rotating tips
│      include context           │    (every 3 sec)
│                                │
│                                │
│      ┌──────────┐              │
│      │   [ o ]  │              │  ← capture button
│      └──────────┘              │     (large, thumb-reach)
│                                │
│  [🖼 Gallery]    [✏ Describe] │  ← fallbacks
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 1.4 Camera View
**Purpose:** Capture photo с AI-friendly качеством (lighting, framing, closeness)
**Primary CTA:** capture button (tap or voice "take photo" для accessibility)
**Secondary:** Gallery (upload saved), Describe (text fallback)
**Design notes:**
- Auto-cycle guidance tips каждые 3 sec — reduces retake rate (target <15%)
- [?] help opens inline guidance overlay (не отдельный screen — preserves context)
- После capture → preview screen с "Retake" / "Analyze this" (1.5, not wireframed separately — standard pattern)
**Edge cases:**
- Low light → on-device check warns "More light helps accuracy" до submit
- Blurry → auto-detect via Claude Vision confidence score, redirect to retake
- Not-a-repair (cat, selfie) → gentle error (1.5 retake)

---

### 1.6 AI Processing (Labor Illusion)

Labor illusion screen длится 5-8 секунд (matches actual Claude API latency) с visible steps. Per Ryan Buell HBS research — operational transparency увеличивает perceived value на 29-43%. Blank spinner = perceived 2× longer.

```
┌────────────────────────────────┐
│                                │
│                                │
│                                │
│                                │
│      ┌─────────────┐           │
│      │             │           │
│      │  [photo]    │           │  ← thumbnail of user's photo
│      │  pulsating  │           │    (validates "MY photo analyzed")
│      │             │           │
│      └─────────────┘           │
│                                │
│                                │
│      ⚙  Analyzing...           │
│                                │
│   ─────────●──────── 45%       │  ← progress indicator
│                                │
│                                │
│   ✓ Identifying problem        │  ← step 1 (done)
│   ⏳ Checking Denver Home      │  ← step 2 (active)
│      Depot pricing             │
│   ○ Pulling local plumber      │  ← step 3 (queued)
│      rates                     │
│   ○ Calculating DIY difficulty │  ← step 4
│                                │
│                                │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 1.6 AI Processing
**Purpose:** Fill 5-8 sec latency с credibility signals, не blank spinner
**Primary CTA:** NONE — intentional passive wait
**Design notes:**
- Photo thumbnail pulsating (NOT static) — reinforces "AI actually looking at MY photo"
- Step copy специфичный ("Denver Home Depot" not "retailer") — personalisation lifts perceived value
- НЕТ "tap to skip" — kills labor illusion
- НЕТ ads — Emma в peak-excitement moment, ad разбивает flow
**A/B тесты приоритет 3** (per ONBOARDING §9.3): 3s / 5s / 8s / 12s duration
**Ethics guardrail:** если Claude API отвечает за 0.5 sec (future model improvement), показывать ≤ actual + 20%, не fake 10s

---

### 1.7 First Estimate — AHA MOMENT

**Самый важный экран MVP.** Цель: за 15 секунд после photo → Emma видит три опции с real Denver prices и эмоционально реагирует "oh shit, this actually works". Aha-моент = $18 DIY vs $275 Pro contrast + "it's МОЁ фото analyzed" validation.

```
┌────────────────────────────────┐
│ [< back]      [🔔] [📤 share] │
│                                │
│ Leaky Kitchen Faucet Supply    │
│ Line                           │
│ 📍 Denver, CO 80203            │
│                                │
│  ┌──────┐                      │
│  │[photo]│  Identified:         │
│  └──────┘  Supply line leak    │
│            Urgency: fix <48h   │
│                                │
│ ─── Your 3 options ───         │
│                                │
│ ┌────────┐┌────────┐┌────────┐ │
│ │🔧 DIY  ││🤝 HYBRID││🏢 PRO │ │
│ │        ││        ││        │ │
│ │ $12-18 ││  $95   ││$175-275│ │
│ │        ││        ││        │ │
│ │ 30 min ││ 1 hr   ││Licensed│ │
│ │ Easy   ││ visit  ││plumber │ │
│ │ ⭐ 4/5 ││        ││        │ │
│ │        ││Buy +   ││Does all│ │
│ │ [View] ││ hire   ││ [View] │ │
│ │        ││ [View] ││        │ │
│ └────────┘└────────┘└────────┘ │
│                                │
│  💡 Why DIY for this: common   │
│  fix, low risk, $15 in parts   │
│                                │
│  💰 You could save $260 vs pro │
│                                │
│  [ 💾 Save this estimate ]     │
│                                │
│ ──────────────────────────     │
│ [Home][My Home][Est][Me]       │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 1.7 First Estimate (Aha)
**Purpose:** Deliver emotional + rational value in one screen — THE aha moment
**Primary CTA:** "Save this estimate" (triggers soft signup ask на guest users) OR tap any of 3 option cards (→ detail 3.3.2)
**Secondary:** Share icon (top-right) — viral loop seed
**Design notes:**
- Three cards side-by-side SAME screen — агентность, не sequence ("we tell you what's best")
- Pre-select recommendation based on user's DIY readiness answer (if "Never tried" → Hybrid highlighted; "Confident" → DIY highlighted)
- Photo thumbnail top-left validates "MY photo, not generic demo"
- "Save $260" contrast — visceral, но не pushed (Emma neutral-advisor positioning)
- "Why DIY for this" — 1-line AI explanation (agency through transparency)
- Tab bar visible — context that this is part of app, не isolated flow
**Target metrics:** Screen time >15 sec (aha landing), <10 sec = aha не landed, redesign required

---

### 3.1 Home Tab (Active User, D8+)

Главный экран returning user. Показывает streak-равивалент ("$1,247 saved"), recent estimates как история, и always-available "New estimate" CTA. Seasonal tip — retention hook (весна = gutters, осень = HVAC).

```
┌────────────────────────────────┐
│ FixIt       [🔔 3]      [⚙]   │
│                                │
│ 🏠 Welcome back, Emma          │
│                                │
│ ─── Quick action ───           │
│ ┌────────────────────────────┐ │
│ │ 📷  New estimate           │ │  ← main CTA (large)
│ │     Take a photo           │ │
│ └────────────────────────────┘ │
│                                │
│ ─── Your savings ───           │
│ ┌────────────────────────────┐ │
│ │ 💰 $1,247 saved this year  │ │
│ │ ░░░░░░██████████████ 62%   │ │  ← progress vs goal
│ │ 4 DIY wins · 1 fair quote  │ │
│ └────────────────────────────┘ │
│                                │
│ ─── Recent estimates ───       │
│ ┌────────────────────────────┐ │
│ │ 📷 Faucet leak             │ │
│ │    $15 DIY · Apr 18      ▶│ │
│ ├────────────────────────────┤ │
│ │ 📷 Wall crack              │ │
│ │    $40 DIY · Apr 10      ▶│ │
│ ├────────────────────────────┤ │
│ │ 📷 Garage door squeak      │ │
│ │    $180 Pro · Mar 28     ▶│ │
│ └────────────────────────────┘ │
│                                │
│ ─── Seasonal tip ───           │
│ 🌱 Spring prep: check gutters  │
│ before April rains start       │
│ [ Snap a photo → ]             │
│                                │
│ ──────────────────────────     │
│ [🏠 Home][🏡 My Home][📊 Est][👤 Me]
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 3.1 Home Tab
**Purpose:** Re-engage returning user, surface savings (motivation), lower friction к next estimate
**Primary CTA:** "New estimate" (photo icon, large, dominant)
**Secondary:** Recent estimates (browse history), seasonal tip (pre-empt next problem)
**Design notes:**
- "$1,247 saved" — Emma-specific motivation (per TARGET-AUDIENCE: Emma loves проof of value)
- Tap recent estimate → 3.3.2 Estimate Detail
- Seasonal tip rotates based on month/region (April = gutters для Denver, October = furnace filter)
- Notification badge (🔔 3) = unread notifications (pro replies, price drops, saved project reminders)
**Target metrics:** 40%+ return rate to Home tab в 30 days (per FEATURES #7)

---

### 3.2.1 My Home Dashboard

Emma's home profile — прогрессивно обогащаемый через use. Не front-loaded onboarding, а organic accrete ("you estimated 2 kitchen repairs — save kitchen details?"). Отражает Emma's persona как owning her home journey.

```
┌────────────────────────────────┐
│                          [+ add]
│ 🏡 My Home                     │
│                                │
│ 123 Maple St · Denver 80203    │
│ Single family · Built 1998     │
│                                │
│ ─── Rooms ───                  │
│ ┌──────────┐ ┌──────────┐      │
│ │ 🍳       │ │ 🛁       │      │
│ │ Kitchen  │ │ Bathroom │      │
│ │ 4 proj.  │ │ 2 proj.  │      │
│ └──────────┘ └──────────┘      │
│ ┌──────────┐ ┌──────────┐      │
│ │ 🚪       │ │ 🌿       │      │
│ │ Garage   │ │ Yard     │      │
│ │ 1 proj.  │ │ 0 proj.  │      │
│ └──────────┘ └──────────┘      │
│                                │
│ ─── Systems ───                │
│ ┌────────────────────────────┐ │
│ │ 🔥 HVAC · filter due Apr 30│ │  ← maintenance calendar
│ ├────────────────────────────┤ │
│ │ 💧 Water heater · 12 yrs   │ │
│ │    Predicted: failure in   │ │
│ │    18 months ($1,500)      │ │
│ ├────────────────────────────┤ │
│ │ 🏠 Roof · age 8 yrs · OK   │ │
│ └────────────────────────────┘ │
│                                │
│ ─── Savings summary ───        │
│ 💰 $1,247 saved · 5 projects   │
│ [ Export home report (PDF) ]   │  ← insurance/resale
│                                │
│ ──────────────────────────     │
│ [🏠][🏡 My Home][📊][👤]       │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 3.2.1 My Home Dashboard
**Purpose:** Retention moat — switching cost растёт с каждым added project/room
**Primary CTA:** Tap room/system → drill-down to category-filtered estimates list
**Secondary:** "+ add" (top right) — add room / system / appliance manually
**Design notes:**
- Rooms auto-inferred from AI photo analysis (kitchen sink → kitchen tag)
- Systems (HVAC/water heater/roof) — added via explicit "add system" flow (year + model) for predictive maintenance
- PDF export = Pro-tier feature (gated for free users — teases Pro)
- Predictive text ("failure in 18 months") = v1.5+ feature, shown as preview для Pro users
**Pro-tier gated:** unlimited rooms, PDF export, predictive timeline. Free tier capped at 5 projects total.

---

### 3.3.1 Estimates List

Scrollable timeline всех предыдущих estimates с filter/search. Free users capped at last 5, Pro — unlimited.

```
┌────────────────────────────────┐
│ ← Estimates         [🔍 search]│
│                                │
│ [ All ][ DIY ][ Hybrid ][ Pro ]│  ← filter chips
│                                │
│ ─── This month ───             │
│ ┌────────────────────────────┐ │
│ │ [img] Faucet leak          │ │
│ │       🔧 DIY · $15         │ │
│ │       Apr 18 · Kitchen   ▶│ │
│ ├────────────────────────────┤ │
│ │ [img] Wall crack           │ │
│ │       🔧 DIY · $40         │ │
│ │       Apr 10 · Bedroom   ▶│ │
│ └────────────────────────────┘ │
│                                │
│ ─── Last month ───             │
│ ┌────────────────────────────┐ │
│ │ [img] Garage door squeak   │ │
│ │       🏢 Pro · $180        │ │
│ │       Mar 28 · Garage    ▶│ │
│ ├────────────────────────────┤ │
│ │ [img] Cabinet hinge        │ │
│ │       🔧 DIY · $8          │ │
│ │       Mar 15 · Kitchen   ▶│ │
│ └────────────────────────────┘ │
│                                │
│ ─── February ───               │
│ ┌────────────────────────────┐ │
│ │ [img] Toilet running       │ │
│ │       🤝 Hybrid · $95      │ │
│ │       Feb 22 · Bathroom  ▶│ │
│ └────────────────────────────┘ │
│                                │
│ 🔒 2 more estimates from       │  ← Free tier limit
│    before Feb · Upgrade to     │
│    see full history            │
│                                │
│ ──────────────────────────     │
│ [🏠][🏡][📊 Estimates][👤]     │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 3.3.1 Estimates List
**Purpose:** Browse past estimates, find previous fix details, context for insurance/resale
**Primary CTA:** Tap estimate card → 3.3.2 Estimate Detail
**Secondary:** Filter chips (All / DIY / Hybrid / Pro), search icon (top-right) keyword search
**Design notes:**
- Grouped by time period — natural chronological mental model
- Photo thumbnails = quick visual recall ("oh right, the leak from last month")
- Free tier paywall locked as "blur + upgrade" after 5th — soft paywall trigger
- Mode chip color-coded (🔧 green DIY / 🤝 orange Hybrid / 🏢 blue Pro)
**Empty state (D1 user):** "Your estimates appear here. Take your first photo →"

---

### 3.3.2 Estimate Detail

Detail view отдельного estimate. Показывает full breakdown (diagnosis + 3 options + action taken) + outcome logging ("did it work?"). Critical для feedback loop (data для ML improvement).

```
┌────────────────────────────────┐
│ [< back]      [📤 share] [⋯]   │
│                                │
│ Faucet leak                    │
│ Apr 18 · Kitchen               │
│                                │
│ ┌────────────────────────────┐ │
│ │                            │ │
│ │     [photo full-width]     │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│ ─── Diagnosis ───              │
│ Supply line leak from P-trap   │
│ Urgency: fix within 48 hours   │
│ Cause: aging rubber washer     │
│                                │
│ ─── Your choice ───            │
│ ✓ DIY — Completed Apr 19       │
│   Actual cost: $15             │
│   Time: 25 min                 │
│   Outcome: ✓ Fixed             │
│                                │
│ ─── All options (saved) ───    │
│ 🔧 DIY      $12-18  ✓ chose    │
│ 🤝 Hybrid   $95                │
│ 🏢 Pro      $175-275           │
│                                │
│ ─── Materials used ───         │
│ • SharkBite 1/2" washer $3.99  │
│ • Plumber's tape $4.99         │
│ • [2 more items]               │
│ [ View full shopping list ]    │
│                                │
│ ─── Notes ───                  │
│ "Turned off water at main      │
│  first. Easy fix, 20 min."     │
│ [ ✏ Edit notes ]               │
│                                │
│ [ 📄 Export PDF (insurance) ]  │  ← Pro-gated
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 3.3.2 Estimate Detail
**Purpose:** Full context recall + outcome logging (closes feedback loop)
**Primary CTA:** "Edit notes" (if outcome not logged — "Log outcome")
**Secondary:** Share (social/family), Export PDF (Pro-gated), View shopping list
**Design notes:**
- Outcome logging drives AI accuracy improvement (20% target per FEATURES #7)
- ⋯ menu: Delete estimate, Duplicate (for recurring issue), Re-analyze with new photo
- PDF export only for Pro users — blur-teaser для free
- Share card preserves privacy (no personal address, zip ok)

---

### 3.4 Profile (Free Tier)

Minimal free-tier profile. Key visible: usage quota (X/3 this month), account info, settings. Pro upsell prominently.

```
┌────────────────────────────────┐
│ 👤 Me                   [⚙]    │
│                                │
│       ┌─────┐                  │
│       │ 👤  │                  │
│       └─────┘                  │
│       Emma Thompson            │
│       emma@gmail.com           │
│       Member since Apr 2026    │
│                                │
│ ─── Plan ───                   │
│ ┌────────────────────────────┐ │
│ │ 🆓 Free · 1/3 estimates    │ │
│ │    left this month         │ │
│ │ ─────────────────          │ │
│ │ Resets May 18              │ │
│ │                            │ │
│ │ [ Upgrade to Pro → ]       │ │  ← context upsell
│ │ Unlimited + save history   │ │
│ └────────────────────────────┘ │
│                                │
│ ─── Preferences ───            │
│ [ 📍 Location · Denver 80203 ▶]│
│ [ 🔧 DIY level · Some exp.  ▶]│
│ [ 💵 Quality tier · Mid     ▶]│
│                                │
│ ─── Settings ───               │
│ [ 🔔 Notifications          ▶]│
│ [ 🔒 Privacy                ▶]│
│ [ 📄 Terms & Policies       ▶]│
│ [ ❓ Help & FAQ             ▶]│
│ [ 📧 Contact support        ▶]│
│                                │
│ [ Log out ]                    │
│ [ Delete account ]             │
│                                │
│ v1.0.0                         │
│                                │
│ ──────────────────────────     │
│ [🏠][🏡][📊][👤 Me]            │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 3.4 Profile (Free)
**Purpose:** Account management + prominent Pro upsell (natural conversion point)
**Primary CTA:** "Upgrade to Pro" — routes to Soft Paywall (5.1)
**Secondary:** Settings drilldowns (location, preferences, notifications)
**Design notes:**
- Quota card first — natural urgency ("1/3 left")
- Preferences editable — user может update zip если moved, DIY level если gained experience
- Settings standard iOS/Android list pattern
- "Delete account" available per GDPR compliance

---

### 3.4-Pro Profile (Pro Tier)

Pro tier показывает different "Plan" card — unlimited badge + renewal date + subscription management.

```
┌────────────────────────────────┐
│ 👤 Me                   [⚙]    │
│                                │
│       ┌─────┐                  │
│       │ 👤 ⭐│  ← Pro badge    │
│       └─────┘                  │
│       Emma Thompson            │
│       emma@gmail.com           │
│       Pro member since Apr 26  │
│                                │
│ ─── Plan ───                   │
│ ┌────────────────────────────┐ │
│ │ ⭐ Pro · Unlimited          │ │
│ │ ─────────────────          │ │
│ │ Annual · $49.99            │ │
│ │ Renews Apr 18, 2027        │ │
│ │                            │ │
│ │ [ Manage subscription → ]  │ │
│ └────────────────────────────┘ │
│                                │
│ ─── Your savings ───           │
│ 💰 $1,247 saved this year      │
│ 📊 5 projects completed        │
│ ⭐ Pro features unlocked       │
│                                │
│ ─── Pro features ───           │
│ ✓ Unlimited estimates          │
│ ✓ Full project history         │
│ ✓ My Home profile              │
│ ✓ PDF export                   │
│ ✓ Priority pro matching        │
│ ✓ Price drop alerts            │
│                                │
│ ─── Preferences ───            │
│ [ 📍 Location · Denver 80203 ▶]│
│ [ 🔧 DIY level · Some exp.  ▶]│
│ [ 💵 Quality tier · Mid     ▶]│
│                                │
│ ─── Settings ───               │
│ [ 🔔 Notifications          ▶]│
│ [ 🔒 Privacy                ▶]│
│ [ 📄 Terms & Policies       ▶]│
│ [ ❓ Help & FAQ             ▶]│
│                                │
│ [ Log out ]                    │
│                                │
│ ──────────────────────────     │
│ [🏠][🏡][📊][👤 Me]            │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 3.4 Profile (Pro)
**Purpose:** Subscription management + reinforcement of value ("you got all this")
**Primary CTA:** "Manage subscription" → Adapty-managed flow (pause, cancel, upgrade)
**Secondary:** Feature checklist reminds user what они paying for (reduces churn)
**Design notes:**
- Pro badge (⭐) на avatar visual — status reinforcement
- Renewal date visible — no surprise billing (trust signal per PAYWALL-RESEARCH §8)
- Savings summary reminds value ("$1,247 saved" >> $49.99 cost)

---

### 5.1 Soft Paywall (Primary Trigger)

Показывается при попытке 4-го estimate в месяц — user уже validated value на 3 estimates, now natural decision point. Annual pre-selected per industry pattern (67% H&F subscribers prefer annual, RevenueCat 2026).

```
┌────────────────────────────────┐
│                    [X close]   │
│                                │
│      [FixIt logo + sparkles]   │
│                                │
│                                │
│   💪 You've saved $247 with    │
│      FixIt on 3 repairs        │
│                                │
│   Keep the momentum with Pro   │
│                                │
│                                │
│ ┌──────────────────────────┐   │
│ │ ⭐ ANNUAL · BEST VALUE    │ ◉ │  ← pre-selected
│ │                          │   │    (visually highlighted)
│ │ $49.99/year              │   │
│ │ = $4.17/month            │   │
│ │ Save $45 vs monthly      │   │
│ │ (2 months free)          │   │
│ │                          │   │
│ │ ✓ Unlimited estimates    │   │
│ │ ✓ Full project history   │   │
│ │ ✓ My Home profile        │   │
│ │ ✓ Priority pro matching  │   │
│ │ ✓ PDF export             │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ Monthly · $7.99/mo    ○  │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ Pay-as-you-go · $2.99 ○  │   │  ← one-off fallback
│ │ for this estimate only   │   │
│ └──────────────────────────┘   │
│                                │
│    [ 🔓 Unlock Unlimited ]     │  ← dominant CTA
│                                │
│   ⭐⭐⭐⭐⭐ 4.8 · 12,400 reviews │
│   "FixIt saved me $400 on      │
│    my sink" — Emma, Denver     │
│                                │
│   Cancel anytime · Restore     │
│   Terms · Privacy              │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 5.1 Soft Paywall
**Purpose:** Convert free user at hit-limit moment (highest-intent conversion window)
**Primary CTA:** "Unlock Unlimited" — benefit-driven copy (per PAYWALL-RESEARCH §12 — "Upgrade" was weakest variant)
**Secondary:** Monthly option (visible, not hidden), Pay-per fallback
**Tertiary:** [X close] — allows dismiss without friction (no dark patterns per PAYWALL §2.2)
**Design notes:**
- Personalized hook ("$247 saved") — +17% conversion per Adapty
- Annual pre-selected + "2 months free" framing (winner per historical H&F A/B tests)
- 5-feature benefits list (per §2.1 — 15+ features = overwhelming)
- Trust signals bottom: cancel anytime, restore purchase, T&P links
**Target metrics:** 18-25% conversion среди exposed users (PAYWALL §1.1)

---

### 5.2 Context Paywall — Pro Match Gating

Срабатывает когда free user tap'ает "Find a pro" (premium feature). Single dominant option (annual), Monthly/Pay-per hidden под "Other plans" link. Context-specific hook.

```
┌────────────────────────────────┐
│ [< back]                       │
│                                │
│                                │
│      [pro matching hero image] │
│                                │
│                                │
│   🏢 Find verified local pros  │
│                                │
│   Skip the 10 phone calls.     │
│   Get 3 vetted pros with real  │
│   quotes for THIS job, in      │
│   minutes.                     │
│                                │
│                                │
│   With Pro, you unlock:        │
│   ✓ 3 local vetted pros        │
│   ✓ Pre-screened reviews       │
│   ✓ Quote within 24 hrs        │
│   ✓ Unlimited estimates        │
│   ✓ Full project history       │
│                                │
│                                │
│ ┌──────────────────────────┐   │
│ │                          │   │
│ │  Try Pro · $49.99/year   │   │  ← single dominant
│ │  (= $4.17/month)         │   │    (per PAYWALL §2.4)
│ │                          │   │
│ └──────────────────────────┘   │
│                                │
│   See other plans →            │  ← small link
│                                │
│                                │
│   Not now, thanks              │  ← easy exit
│                                │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 5.2 Context Paywall (Pro Match)
**Purpose:** Convert at specific-value moment (user already mentally invested в pro-hiring)
**Primary CTA:** "Try Pro" — single dominant (Mojo pattern: +15-20% annual uptake)
**Secondary:** "See other plans" (small link — for Emma-flex cohort wanting monthly)
**Tertiary:** "Not now, thanks" — explicit exit, no dark pattern
**Design notes:**
- Context-specific hook: "Skip the 10 phone calls" — Emma pain point
- Benefits 1-3 are pro-match specific, 4-5 general Pro
- Single-option funnel — highest LTV per converter (commitment к specific value)
**Target metrics:** 10-12% conversion среди Pro-match triggers (lower raw than soft paywall, higher LTV)

---

### 5.3 Subscription Success

Post-purchase confirmation. Celebration moment (not subdued) + next-action prompts (use new feature immediately — reinforces purchase). Receipt sent to email async.

```
┌────────────────────────────────┐
│                                │
│                                │
│                                │
│         [✨ confetti ✨]        │
│                                │
│          ⭐                     │
│                                │
│      Welcome to Pro,           │
│          Emma!                 │
│                                │
│     $49.99/year · renews       │
│     April 18, 2027             │
│                                │
│   ─── You just unlocked ───    │
│                                │
│   ✓ Unlimited estimates        │
│   ✓ Full project history       │
│   ✓ My Home profile            │
│   ✓ Priority pro matching      │
│   ✓ PDF export                 │
│                                │
│                                │
│   [ Continue to estimate → ]   │  ← primary
│                                │
│                                │
│   📧 Receipt sent to your      │
│      email                     │
│                                │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 5.3 Subscription Success
**Purpose:** Confirm purchase + celebrate + drive immediate use (reduces buyer's remorse)
**Primary CTA:** "Continue to estimate" (return user к exactly где они были — seamless)
**Design notes:**
- Confetti animation (Lottie, lightweight) — emotional reward
- Feature checklist reminds what they got (анти-churn)
- Receipt to email = trust signal per PAYWALL §8.2
- NO upsell prompts here — respect the moment, upsell позже

---

### 7.1 Pro Match Results

Возвращает 3 pros для user's zip с pre-filled context. Affiliate revenue flows to FixIt на qualified leads ($15-40 per per FEATURES #6).

```
┌────────────────────────────────┐
│ [< back]  Pro matches          │
│                                │
│ 📷 Supply line leak · Denver   │
│                                │
│ Top 3 pros for your job:       │
│                                │
│ ┌────────────────────────────┐ │
│ │ [avatar] Joe Martinez      │ │
│ │          ⭐ 4.8 · 127 rev  │ │
│ │          ✓ Licensed · BBB  │ │
│ │          12 yrs experience │ │
│ │                            │ │
│ │ Estimated: $185-220        │ │
│ │ Available: Wed 2-4pm       │ │
│ │                            │ │
│ │ [ Request quote ]          │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ [avatar] Sarah Kim          │ │
│ │          ⭐ 4.9 · 89 rev   │ │
│ │          ✓ Licensed        │ │
│ │          8 yrs experience  │ │
│ │                            │ │
│ │ Estimated: $195-240        │ │
│ │ Available: Thu 10am-12pm   │ │
│ │                            │ │
│ │ [ Request quote ]          │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ [avatar] Mike's Plumbing   │ │
│ │          ⭐ 4.6 · 203 rev  │ │
│ │          ✓ Licensed · BBB  │ │
│ │          15 yrs experience │ │
│ │                            │ │
│ │ Estimated: $210-275        │ │
│ │ Available: Fri morning     │ │
│ │                            │ │
│ │ [ Request quote ]          │ │
│ └────────────────────────────┘ │
│                                │
│ 💡 We share your photo +       │
│    diagnosis — pros quote      │
│    faster with context.        │
│                                │
│ [ Show more pros (3 more) ]    │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 7.1 Pro Match Results
**Purpose:** Broker match между Emma и local pros (white-label — user stays в FixIt funnel)
**Primary CTA:** "Request quote" per pro card — sends photo + diagnosis + zip к pro via Thumbtack/Angi API
**Secondary:** "Show more pros" (3 more, expanded radius)
**Design notes:**
- 3 pros = optimal (per FEATURES #6 — more overwhelms, fewer seems thin)
- Reviews threshold: 3.5+ stars, min 10 reviews — quality floor
- "Estimated" range для this job (from Thumbtack pricing API) — validates против FixIt's own estimate
- Availability upfront — key Emma pain ("I don't know when they can come")
- "We share your photo" transparency — privacy reassurance
**Attribution:** Lead tracking webhook when user taps "Request quote" — $15-40 revenue on conversion

---

### 8.1 No Internet Error

Offline state. Per FEATURES architecture — основная функция (photo → AI) требует internet, но history + previous estimates доступны cached. Soft degradation.

```
┌────────────────────────────────┐
│                                │
│                                │
│      [wifi-off icon]           │
│                                │
│                                │
│   No internet connection        │
│                                │
│   FixIt needs internet to      │
│   analyze new photos           │
│                                │
│   ─── Available offline ───    │
│   ✓ View saved estimates (5)   │
│   ✓ Read your project history  │
│   ✓ View shopping lists        │
│                                │
│   ─── Not available ───        │
│   ✗ New estimate (AI required) │
│   ✗ Pro match                  │
│   ✗ Price updates              │
│                                │
│                                │
│    [ 🔄 Try again ]            │
│                                │
│    [ View saved estimates ]    │  ← graceful fallback
│                                │
│                                │
│   💡 Tip: your estimate will   │
│   sync when you're back online │
│                                │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 8.1 No Internet
**Purpose:** Graceful degradation — не just "error", а "here's what you CAN do"
**Primary CTA:** "Try again" — retry network check
**Secondary:** "View saved estimates" — fallback к cached content
**Design notes:**
- Explicit "Available / Not available" lists — reduces frustration
- Queue-and-sync для photos taken offline (saved locally, analyzed when online)
- НЕТ punishment tone ("You're offline!") — supportive
- Seasonal tip here если connectivity long-term lost

---

### 8.5 Blurry Photo Error

AI returns low-confidence score → polite retake prompt с sample "good photo" comparison. Critical UX — per FEATURES #1 target retake rate <15%.

```
┌────────────────────────────────┐
│ [< back]                       │
│                                │
│                                │
│      [camera icon + alert]     │
│                                │
│                                │
│   Photo not clear enough       │
│                                │
│   Our AI couldn't identify     │
│   the problem from this        │
│   photo. Try again with:       │
│                                │
│                                │
│   ─── Your photo ───           │
│   ┌──────────────┐             │
│   │ [user photo] │             │  ← what they sent
│   │ (blurry/dark)│             │
│   └──────────────┘             │
│                                │
│   ─── Better example ───       │
│   ┌──────────────┐             │
│   │ [good photo] │             │  ← sample for same category
│   │ (sharp, lit) │             │
│   └──────────────┘             │
│                                │
│   💡 Tips:                     │
│   • More light (turn on lamps) │
│   • Get closer (8-12 inches)   │
│   • Hold phone steady          │
│   • Include context (area      │
│     around damage)             │
│                                │
│                                │
│    [ 📷 Retake photo ]         │  ← primary
│                                │
│    [ 🖼 Try from gallery ]     │  ← secondary
│                                │
│    Describe with text instead  │
│                                │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 8.5 Blurry Photo Error
**Purpose:** Recover failed photo attempt без shaming user
**Primary CTA:** "Retake photo" — back to camera (1.4) with guidance overlay
**Secondary:** Gallery upload, text description fallback
**Design notes:**
- Side-by-side comparison (user photo vs "good" sample) = learning moment, не criticism
- Tips list specific и actionable ("8-12 inches", not "closer")
- Retake doesn't cost против free tier quota (per FEATURES #8 edge cases — retakes forgiven)
- If 3+ retake attempts → escalate к text-only flow ("Let's try describing in words")
**Target:** successful retake within 2 attempts for 85%+ of trigger cases

---

### 4.1 Shopping List (DIY Mode)

Bottom sheet или full screen после user choose DIY on estimate screen (1.7). Critical для конversion DIY-claim → DIY-action. Affiliate revenue на retailer clicks (Amazon Associates 1-3%, Home Depot PA-API).

```
┌────────────────────────────────┐
│ [< back]  Shopping list        │
│                                │
│ Faucet leak repair · DIY       │
│                                │
│ ─── You need ───               │
│ ┌────────────────────────────┐ │
│ │ ☐ [img] SharkBite 1/2"     │ │
│ │         washer · $3.99     │ │
│ │         🏠 Home Depot      │ │
│ ├────────────────────────────┤ │
│ │ ☐ [img] Plumber's tape     │ │
│ │         $4.99              │ │
│ │         🏠 Home Depot      │ │
│ ├────────────────────────────┤ │
│ │ ☐ [img] Supply line 16"    │ │
│ │         $7.99              │ │
│ │         🏠 Home Depot      │ │
│ └────────────────────────────┘ │
│                                │
│ ─── You likely have ───        │
│ ☐ Adjustable wrench            │
│ ☐ Towel                        │
│ ☐ Flashlight                   │
│                                │
│ ─── Total ───                  │
│ $16.97 at Home Depot           │
│                                │
│ ─── Nearest store ───          │
│ 📍 Home Depot · 1.2 mi away   │
│    Cherry Creek · Open till    │
│    10pm                        │
│                                │
│ [ 🏠 Open in Home Depot app ]  │  ← primary (deep link)
│                                │
│ [ 📦 Order on Amazon instead ] │  ← alt fulfillment
│                                │
│ [ 📋 Add to Reminders ]        │  ← checklist export
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 4.1 Shopping List (DIY)
**Purpose:** Convert DIY-mode selection → actual material purchase (60%+ open rate target)
**Primary CTA:** "Open in Home Depot app" (deep-link homedepot://product/[sku]) — highest affiliate revenue
**Secondary:** "Order on Amazon" — fallback for rural (no nearby HD) or convenience preference
**Tertiary:** "Add to Reminders" — for users shopping later, checklist export
**Design notes:**
- "You likely have" section (unchecked by default) — prevents Emma from over-buying
- Nearest store with distance + hours — removes "which store?" friction
- Price per-item + total — transparent, no surprises
- Affiliate attribution через deep-link UTM / Amazon Associates tag
**Target metrics:** 60%+ DIY users open shopping list, 30%+ click retailer link

---

### 5.1-alt Trial Paywall Variant (Phase 2 A/B)

Post-launch A/B test variant — adds optional 7-day free trial button. Per PAYWALL-RESEARCH §7.3, hypothesis = hybrid freemium+trial adds 2-4% to conversion для Emma-flex cohort.

```
┌────────────────────────────────┐
│                    [X close]   │
│                                │
│      [FixIt logo + sparkles]   │
│                                │
│                                │
│   💪 You've saved $247 with    │
│      FixIt on 3 repairs        │
│                                │
│   Try Pro free for 7 days      │
│                                │
│                                │
│ ┌──────────────────────────┐   │
│ │ 🎁 FREE TRIAL · 7 days   │ ◉ │  ← pre-selected
│ │                          │   │
│ │ Then $49.99/year         │   │
│ │ = $4.17/month            │   │
│ │ Save 48% vs monthly      │   │
│ │                          │   │
│ │ ✓ Unlimited estimates    │   │
│ │ ✓ Full project history   │   │
│ │ ✓ My Home profile        │   │
│ │ ✓ Priority pro matching  │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ No trial · $49.99/yr  ○  │   │  ← immediate pay
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ Monthly · $7.99/mo    ○  │   │
│ └──────────────────────────┘   │
│                                │
│    [ Start free trial → ]      │  ← dominant CTA
│                                │
│   📅 How trial works:          │
│   • Day 1: full access now     │
│   • Day 5: reminder sent       │
│   • Day 7: auto-renews at      │
│     $49.99 unless canceled     │
│                                │
│   Cancel anytime · Restore     │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 5.1-alt Trial Paywall (Phase 2 A/B)
**Purpose:** Test if trial improves net revenue per install (vs clean freemium)
**Primary CTA:** "Start free trial" — 7-day trial → auto-convert unless cancel
**Secondary:** No-trial immediate pay, Monthly option
**Design notes:**
- Trial timeline transparent ("Day 5 reminder") — anti-dark-pattern per PAYWALL §8.3
- "Cancel anytime" prominent — trust signal
- 7-day = industry sweet spot (52% H&F apps, per Adapty 2026)
- A/B measure: net revenue per install (D60) — if variant wins by >10%, adopt hybrid
**Rollout:** Phase 2 (month 3+) — baseline Option B (freemium no trial) ships first

---

## Design Notes — Global Principles

Применимо ко всем wireframes:

- **Mobile-first, portrait orientation** — минимум 95% usage по данным competitor analysis similar apps (PictureThis, Thumbtack)
- **iOS + Android parity** — design decisions не должны depend на platform-specific patterns (Expo cross-platform)
- **Bottom tab bar (4 tabs)** — Home / My Home / Estimates / Me — стандарт для utility apps
- **Photo-first interaction** — каждый entry point имеет camera CTA as primary
- **Card-based presentation** — estimates, history, pro matches — all card layout (scannable, tappable)
- **Clear CTAs — one primary per screen** — cognitive load discipline (per PAYWALL §2.1)
- **Haptic feedback** — Haptics.impactAsync() on all button taps (per CLAUDE.md rules)
- **aspectRatio enforcement** — photos critical, не допускать stretched/distorted (per CLAUDE.md)
- **Safe area insets** — useSafeAreaInsets() на всех screens с floating UI (per CLAUDE.md)
- **Seasonal theme** — subtle color shift based on time of year (v1.5 feature)
- **Accessibility baseline** — WCAG AA contrast, VoiceOver labels на каждом interactive element, dynamic type support (accessibility deep dive — post-MVP)

---

## Component Library (to build в Stitch / Figma на Stage 5)

Общие компоненты, которые появляются across wireframes:

**Buttons:**
- Primary button — large, dominant, one per screen (e.g. "Take a photo", "Unlock Unlimited")
- Secondary button — outline / subtle (e.g. "Use saved photo")
- Text link — tertiary (e.g. "Skip for now", "Not now, thanks")
- Icon button — for floating UI (close X, help ?, back <)

**Cards:**
- Estimate card (list view) — photo thumbnail + title + mode chip + price + date
- Option card (DIY/Hybrid/Pro on estimate screen) — mode icon + price range + time + difficulty + CTA
- History card — similar to estimate card, smaller
- Pro match card — avatar + name + rating + experience + estimate + availability + CTA
- Tip card — icon + copy + optional CTA

**Tabs & Nav:**
- Bottom tab bar (4 tabs) — Home / My Home / Estimates / Me
- Filter chip row (All / DIY / Hybrid / Pro on estimates list)
- Segmented control (for sub-navigation within tabs, post-MVP)

**Lists:**
- Estimates timeline (grouped by period)
- Shopping list items (checkbox + photo + price + retailer)
- Materials list (grouped by retailer)
- Pro matches (3 cards vertically stacked)

**Inputs:**
- Text input (ZIP, name, email, notes)
- Camera button (capture)
- Gallery picker
- Radio/checkbox selection (paywall tier selection)

**Modals & Sheets:**
- Paywall modal (full-screen or bottom sheet variants)
- Permission priming screen
- Soft signup bottom sheet (post-estimate)
- Confirmation dialogs (delete, cancel subscription)
- Share sheet (native platform)

**States:**
- Empty state (no estimates yet, onboarding prompt)
- Loading state (AI processing with labor illusion)
- Error state (no internet, blurry photo, unsupported category)
- Success state (subscription success, DIY completion celebration)
- Locked state (free-tier paywall blur, feature gate)

---

## Screens NOT Wireframed в v1.0 (Post-MVP or Lower Priority)

Следующие экраны существуют в SCREEN-MAP, но их wireframes откладываем на post-MVP или standard patterns:

- **1.5 Photo Preview** — стандартный iOS pattern "Retake / Use photo", не требует custom wireframe
- **2.x Signup flows** — standard Apple/Google/Email sign-in patterns
- **3.3.3 Shopping List Detail** — variant of 4.1 с expanded product info
- **4.2 DIY Guide Step** — post-MVP detail; template-based, не per-category wireframe
- **6.x Notification Settings** — standard iOS toggle list pattern
- **7.2 Pro Detail / Request Quote form** — standard form pattern
- **8.x Other error states** — standard patterns (404, 500, auth errors)
- **Pay-per-estimate checkout** — one-off purchase variant of paywall flow
- **v1.5+ screens:** Warranty tracker, maintenance calendar detail, quote validator, voice input, multi-user switcher, referral program

Эти screens могут быть added в subsequent iterations документа, когда приоритет пришёл. Для MVP design sprint 18 wireframes выше покрывают critical path (activation → aha → monetization → retention).

---

## Screens Wireframed (Summary Index)

| # | Screen | SCREEN-MAP ID | Flow stage |
|---|--------|---------------|-----------|
| 1 | Welcome | 1.1 | Onboarding |
| 2 | Location Capture | 1.2 | Onboarding |
| 3 | Camera Permission Priming | 1.3 | Onboarding |
| 4 | Camera View | 1.4 | Core loop |
| 5 | AI Processing (labor illusion) | 1.6 | Core loop |
| 6 | First Estimate (AHA) | 1.7 | Core loop |
| 7 | Home Tab (returning user) | 3.1 | Retention |
| 8 | My Home Dashboard | 3.2.1 | Retention |
| 9 | Estimates List | 3.3.1 | Retention |
| 10 | Estimate Detail | 3.3.2 | Retention |
| 11 | Profile (Free tier) | 3.4 | Account |
| 12 | Profile (Pro tier) | 3.4 | Account |
| 13 | Shopping List (DIY) | 4.1 | Core loop |
| 14 | Soft Paywall | 5.1 | Monetization |
| 15 | Trial Paywall Variant (A/B) | 5.1-alt | Monetization |
| 16 | Context Paywall (Pro Match) | 5.2 | Monetization |
| 17 | Subscription Success | 5.3 | Monetization |
| 18 | Pro Match Results | 7.1 | Revenue |
| 19 | No Internet Error | 8.1 | Error state |
| 20 | Blurry Photo Error | 8.5 | Error state |

**Total:** 20 wireframes покрывают full MVP funnel от install до retention loop.

---

## Handoff Notes (для Stage 5 — Visual Design в Stitch)

Рекомендации для дизайнера / Stitch prompt engineering:

1. **Tone:** neutral advisor, not "cheerleading". Emma hates pushy sales — ни upbeat exclamation marks, ни patronizing. Think Thumbtack + Mint + (light touch of) Duolingo.

2. **Visual hierarchy priority:**
   - Primary CTA button — must be largest, highest contrast, single per screen
   - Key data (price, diagnosis, mode) — bold, scannable без reading
   - Secondary info — body size, muted color

3. **Color system (hypothesis, finalize в design system doc):**
   - Primary: warm blue / trust (house + technology metaphor)
   - DIY mode: green (success, empowerment)
   - Hybrid mode: orange (balance)
   - Pro mode: deep blue (professional, reassuring)
   - Accent: soft yellow (attention, savings highlight)
   - Error / urgent: warm red (not aggressive)

4. **Typography:**
   - Headline: 24-32px, bold, max 2 lines
   - Body: 16px, readable at arm's length (Emma reads от divana)
   - Price display: 28-36px, bold, monospace digits для alignment
   - Caption / meta: 12-14px, muted

5. **Spacing:**
   - Generous whitespace — Emma в stress-state, не переполнение
   - Card padding: 16-20px internal, 12-16px между cards
   - Safe area margins: 20-24px горизонтально

6. **Iconography:**
   - Emoji везде где подходит (universal recognition, playful)
   - Для mode indicators: 🔧 DIY / 🤝 Hybrid / 🏢 Pro consistent
   - Custom icons только где emoji не работает (app logo, specific system status)

7. **Imagery:**
   - Photos real repair scenarios (before/after) — NOT stock "happy family"
   - Sample photos diverse (различные rooms, appliances, damage types)
   - Avoid rendering gender/race primary in hero (inclusive)

8. **Dark mode:** required в v1.0 (iOS users expect). Test contrast в обоих modes.

9. **Animation:**
   - Labor illusion screen — Lottie / native animation (5-8 sec)
   - Subscription success — confetti Lottie
   - Page transitions — native iOS / Android (no custom custom)
   - Button press — haptic + subtle scale (0.95) + color feedback

10. **Localization readiness:** copy should allow 30% length expansion (German, French). Hardcoded strings avoided — all в i18n bundle (English only MVP, но infrastructure ready).

---

## Related Docs

- [SCREEN-MAP.md](./SCREEN-MAP.md) — hierarchical list всех screens с IDs
- [USER-FLOWS.md](./USER-FLOWS.md) — flow diagrams соединяющие screens
- [FEATURES.md](../02-product/FEATURES.md) — 10 MVP features с RICE priority
- [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) — design principles, long-term vision
- [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) — обоснование 3-step onboarding, labor illusion, signup defer
- [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) — обоснование soft paywall timing, pricing tiers, context paywalls
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — Emma primary persona, activation triggers
- [TARGET-AUDIENCE.md](../02-product/TARGET-AUDIENCE.md) — Day-in-the-life timing, aha moment sequence
- [MONETIZATION.md](../02-product/MONETIZATION.md) — tier pricing, revenue model
- (Stage 5 outputs) — Stitch generated hi-fi mockups, design system tokens

---

**Дата последнего обновления:** 2026-04-18
**Автор:** UX Team (Лана + Amanda)
**Статус:** v1.0 ready для Stage 5 visual design handoff
**Следующий шаг:** Stitch prompt engineering на основе этих wireframes → hi-fi mockups → prototype для beta testing с 10 Emmas (criterion 8/10 reach first estimate <90 sec per ONBOARDING §11.4)
