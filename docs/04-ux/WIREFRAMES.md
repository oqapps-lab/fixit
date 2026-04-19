---
Проект: FixIt — AI home repair cost advisor
Дата: 2026-04-19
Статус: Draft v2.0 (post-rescope — pure AI-advisor utility, no marketplace)
Автор: UX Team (Лана + Amanda)
Stage: UX Design (Stage 4)
---

# WIREFRAMES.md — FixIt

**Companion docs:** [SCREEN-MAP.md](./SCREEN-MAP.md) · [USER-FLOWS.md](./USER-FLOWS.md) · [FEATURES.md](../02-product/FEATURES.md) · [POSITIONING.md](../02-product/POSITIONING.md) · [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) · [MONETIZATION.md](../02-product/MONETIZATION.md) · [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) · [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md)

---

## Обзор документа

Этот файл содержит ASCII-wireframes для **19 ключевых экранов** FixIt MVP v1.0. Каждый wireframe — низкодетальный текстовый макет, описывающий layout, иерархию элементов и primary CTA, но НЕ финальный визуальный дизайн. Финальная визуализация будет реализована на Stage 5 через Stitch/Figma с учётом design system (colors, typography, spacing).

### Что изменилось vs v1.0 (2026-04-19 rescope)

После ре-скоупинга FixIt из "AI estimate + pro marketplace hybrid" в **чистый AI-advisor утилиту без marketplace**, wireframes обновлены:

- **Pro Match** превратился из central feature (3 pro cards с photos / ratings / quotes) в **simple deeplink bottom sheet** (3 кнопки: Thumbtack / Google Maps / Yelp). Это больше НЕ revenue stream — просто honest handoff "если нужен мастер — вот где искать".
- **Context Paywall "Pro Match Gating" удалён** — Pro Match больше не gated premium feature, это free deeplink.
- **Subscription benefits переписаны** — вместо "priority pro matching" теперь "unlimited estimates + saved projects + price alerts + PDF export + Sonnet AI accuracy".
- **Brand voice сместился** — с "we'll connect you with pros" на "know the price, decide with confidence". Signature phrases: **Know / Decide / Understand**, НЕ "Connect / Match / Request".
- **Welcome tagline** — "Know the price before the panic" (primary USP per POSITIONING.md §2).

### Целевая аудитория wireframes

Ориентированы на Emma persona (first-time homeowner, 28-35 лет, Denver/Austin/Raleigh) — primary MVP audience. Вторичные persona (Mike, Sarah, Tyler, Ronald) учтены в copy variants и context states, но их отдельные entry flows — post-MVP.

### Ключевые принципы wireframing

- **Mobile-first, portrait orientation** — FixIt используется "с дивана в 20:00" или "на месте проблемы, в ванной с одной рукой".
- **Photo-first interaction** — camera — главный input; каждый entry point ведёт к фото.
- **Three options always** — DIY / Hybrid / Pro показываем параллельно, не sequence.
- **Bottom tab navigation** — 4 tabs (Home / My Home / Estimates / Me), стандартный iOS/Android паттерн.
- **One primary CTA per screen** — cognitive load минимален.
- **Advisor positioning, not marketplace pusher** — никакого "Request quote" / "Connect with pro" / "Match made" language. Calm, informed, decision-enabling tone.
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

Первый экран при cold install. Цель — одна: убедить Emma за 8 секунд, что этот app решает её проблему "ой, капает, сколько это стоит", и нажать "Take a photo". Никаких signup, email, video demo — kills velocity per ONBOARDING-RESEARCH §1.2.

Tagline переписан под новое позиционирование (POSITIONING.md §2) — primary USP "Know the price before the panic" эмоционально якорится на Emma-в-stress-moment.

```
┌────────────────────────────────┐
│                                │
│                                │
│         [FixIt logo]           │
│                                │
│                                │
│                                │
│   Know the price before        │
│   the panic.                   │
│                                │
│   Take a photo. Know the       │
│   price. Decide what to do.    │
│                                │
│   [img: photo→estimate hero]   │
│   (protyechka → $15 DIY /      │
│    $275 Pro comparison)        │
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
**Purpose:** Deliver new USP ("Know the price before the panic") at first impression + accelerate к камере
**Primary CTA:** "Take a photo" — запускает camera permission flow (1.3)
**Secondary:** "Describe your problem" — text-only fallback (редкие cases, <5-8% per ONBOARDING §4)
**Tertiary:** Login link для returning users после re-install
**Copy rationale:**
- **Primary tagline** "Know the price before the panic" — Emma emotional anchor (POSITIONING §2.1 primary USP)
- **Alt tagline** "Take a photo. Know the price. Decide what to do." — rational utility explanation (POSITIONING TL;DR one-liner)
- Оба варианта A/B-testable post-launch (POSITIONING §9 recommends #1 primary, fallback #2 если не резонирует через 1000 installs)
- Никакого "Find a pro fast" / "Connect with contractors" — это old v1.0 positioning
**Design notes:**
- Hero image должен показывать breadth (plumbing + electrical + furniture + appliance), не только protyechku — иначе Emma с cracked tile думает "это только про сантехнику"
- Headline под 60 символов для читаемости
- НЕТ swipe-through tutorials (-15% activation в photo-AI category)
- НЕТ video demo (kills velocity)
- НЕТ "we'll match you with local pros" subheadline — anti-USP per POSITIONING §2

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
- Privacy statement bold и первый в списке — single biggest lift в sensitive categories
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
│   ⏳ Checking Denver regional  │  ← step 2 (active)
│      pricing                   │
│   ○ Understanding DIY          │  ← step 3 (queued)
│      difficulty                │
│   ○ Calculating three routes   │  ← step 4
│                                │
│                                │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 1.6 AI Processing
**Purpose:** Fill 5-8 sec latency с credibility signals, не blank spinner
**Primary CTA:** NONE — intentional passive wait
**Copy rationale:**
- Steps phrased as "Identifying / Checking / Understanding / Calculating" — aligns с new brand voice "Know / Understand / Decide" (POSITIONING §7)
- НЕ "Finding you pros" — Pro Match больше не central
- "Three routes" language vs "options" — subtle framing per POSITIONING §2.2 ("Three options, one tap")
**Design notes:**
- Photo thumbnail pulsating (NOT static) — reinforces "AI actually looking at MY photo"
- Step copy специфичный ("Denver regional" not "retailer") — personalisation lifts perceived value
- НЕТ "tap to skip" — kills labor illusion
- НЕТ ads — Emma в peak-excitement moment, ad разбивает flow
**A/B тесты приоритет 3** (per ONBOARDING §9.3): 3s / 5s / 8s / 12s duration
**Ethics guardrail:** если Claude API отвечает за 0.5 sec (future model improvement), показывать ≤ actual + 20%, не fake 10s

---

### 1.7 First Estimate — AHA MOMENT

**Самый важный экран MVP.** Цель: за 15 секунд после photo → Emma видит три опции с real Denver prices и эмоционально реагирует "oh shit, this actually works — I know the price now". Aha-момент = $18 DIY vs $275 Pro contrast + "it's МОЁ фото analyzed" validation.

Под новое позиционирование (POSITIONING §5) ключевой messaging shift: было "Ready to find a pro?" → стало "Here are your three routes. Start with what feels right." Copy — calm advisor, не marketplace pusher.

```
┌────────────────────────────────┐
│ [< back]      [🔔] [📤 share] │
│                                │
│ Leaky Kitchen Faucet Supply    │
│ Line                           │
│ 📍 Denver, CO 80203            │
│                                │
│  ┌──────┐                      │
│  │[photo]│  Identified:        │
│  └──────┘  Supply line leak    │
│            Urgency: fix <48h   │
│                                │
│ ─── Your 3 routes ───          │
│                                │
│ ┌────────┐┌────────┐┌────────┐ │
│ │🔧 DIY  ││🤝 HYBRID││🏢 PRO │ │
│ │        ││        ││        │ │
│ │ $12-18 ││  $95   ││$175-275│ │
│ │        ││        ││        │ │
│ │ 30 min ││ 1 hr   ││Licensed│ │
│ │ Easy   ││ visit  ││plumber │ │
│ │ ⭐ 4/5 ││        ││        │ │
│ │        ││Buy +   ││Find on │ │
│ │ [View] ││ hire   ││Thumbtack│ │
│ │        ││ [View] ││ [View] │ │
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
**Purpose:** Deliver emotional + rational value in one screen — THE aha moment. User **knows the price** and can **decide with confidence**.
**Primary CTA:** "Save this estimate" (triggers soft signup ask на guest users) OR tap any of 3 option cards (→ detail 3.3.2)
**Secondary:** Share icon (top-right) — viral loop seed ("FixIt saved me $X" share moment per POSITIONING §5)
**Copy rationale:**
- "Your 3 routes" header (POSITIONING voice §7 — "Three routes, you decide")
- Pro card subtitle: "Find on Thumbtack" — honest handoff, not "Request quote from our pros" (we have no pros)
- "Why DIY for this" — 1-line AI explanation (agency through transparency)
- НЕТ "Recommended" badge поверх Pro — neutrality per POSITIONING anti-USP
- НЕТ "priority pro match available" — Pro Match free deeplink for everyone
**Design notes:**
- Three cards side-by-side SAME screen — агентность, не sequence ("we tell you what's best")
- Pre-select recommendation based on user's DIY readiness answer (if "Never tried" → Hybrid highlighted; "Confident" → DIY highlighted)
- Photo thumbnail top-left validates "MY photo, not generic demo"
- "Save $260" contrast — visceral, но не pushed (neutral-advisor positioning)
- Tab bar visible — context that this is part of app, не isolated flow
**Target metrics:** Screen time >15 sec (aha landing), <10 sec = aha не landed, redesign required

---

### 3.1 Home Tab (Active User, D8+)

Главный экран returning user. Показывает **savings anchor** ("$1,247 saved"), recent estimates как история, и always-available "New estimate" CTA. Seasonal tip — retention hook (весна = gutters, осень = HVAC).

Under new positioning (POSITIONING §5) home greeting переписан: было "Welcome back. Need a pro for something?" → стало "Welcome back. Anything new around the house?" Calm advisor, not marketplace pusher.

```
┌────────────────────────────────┐
│ FixIt       [🔔 3]      [⚙]   │
│                                │
│ 🏠 Welcome back, Emma          │
│    Anything new around the     │
│    house?                      │
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
│ ─── Seasonal check-in ───      │
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
**Secondary:** Recent estimates (browse history), seasonal check-in (pre-empt next problem)
**Copy rationale:**
- "Anything new around the house?" — open-ended, not pushy toward pros (POSITIONING §5)
- "Seasonal check-in" (not "seasonal tip" / "home alert") — calm advisor tone
- "$1,247 saved" — viral-ready framing per POSITIONING §5 (new share moment = "I saved $X")
**Design notes:**
- Savings anchor first — Emma-specific motivation (per POSITIONING §4 Emma value prop)
- Tap recent estimate → 3.3.2 Estimate Detail
- Seasonal check-in rotates based on month/region (April = gutters для Denver, October = furnace filter)
- Notification badge (🔔 3) = unread notifications (savings milestones, price drops, seasonal check-ins — NOT "pro replies" anymore)
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
**Pro-tier gated:** unlimited rooms, PDF export, predictive timeline, price alerts. Free tier capped at 5 projects total.

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
│ ─── All routes (saved) ───     │
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
- "All routes" header matches new voice (per 1.7 — "routes" not "options" when referring to three paths)

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
│ │ Unlimited + saved projects │ │
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
- Upsell sub-copy "Unlimited + saved projects" — aligned с new Pro benefits (не "priority pro matching")
- Preferences editable — user может update zip если moved, DIY level если gained experience
- Settings standard iOS/Android list pattern
- "Delete account" available per GDPR compliance

---

### 3.4-Pro Profile (Pro Tier)

Pro tier показывает different "Plan" card — unlimited badge + renewal date + subscription management. Features list переписан под new Pro benefits (POSITIONING §10 + MONETIZATION §2 Pro Annual value prop).

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
│ ✓ Saved projects unlimited     │
│ ✓ Price alerts                 │
│ ✓ PDF export                   │
│ ✓ Sonnet AI (higher accuracy)  │
│ ✓ Full project history         │
│ ✓ My Home profile              │
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
**Copy rationale (updated 2026-04-19):**
- REMOVED: "✓ Priority pro matching" — Pro Match free deeplink for everyone, больше не Pro-gated feature
- ADDED: "✓ Saved projects unlimited" — new Pro benefit (MONETIZATION §2)
- ADDED: "✓ Price alerts" — new Pro benefit (Home Depot / Amazon price drops для tracked projects)
- ADDED: "✓ PDF export" — explicit Pro gating (insurance/resale reports)
- ADDED: "✓ Sonnet AI (higher accuracy)" — AI tier differentiator (Free = Haiku, Pro = Sonnet per MONETIZATION §5)
**Design notes:**
- Pro badge (⭐) на avatar visual — status reinforcement
- Renewal date visible — no surprise billing (trust signal per PAYWALL-RESEARCH §8)
- Savings summary reminds value ("$1,247 saved" >> $49.99 cost)

---

### 5.1 Soft Paywall (Primary Trigger)

Показывается при попытке 4-го estimate в месяц — user уже validated value на 3 estimates, now natural decision point. Annual pre-selected per industry pattern (67% H&F subscribers prefer annual, RevenueCat 2026).

Под rescope v2.0 copy полностью переписан — убрано "priority matching" (не существует больше), добавлены новые Pro benefits (POSITIONING §5 key messaging matrix: "Unlock unlimited estimates, saved projects, price alerts").

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
│   Unlock unlimited estimates   │
│   + saved projects + alerts    │
│                                │
│                                │
│ ┌──────────────────────────┐   │
│ │ ⭐ ANNUAL · BEST VALUE    │ ◉ │  ← pre-selected
│ │                          │   │    (visually highlighted)
│ │ $49.99/year              │   │
│ │ = $4.17/month            │   │
│ │ Save $70 vs monthly      │   │
│ │ (2 months free)          │   │
│ │                          │   │
│ │ ✓ Unlimited estimates    │   │
│ │ ✓ Saved projects         │   │
│ │ ✓ Price alerts           │   │
│ │ ✓ PDF export             │   │
│ │ ✓ Sonnet AI (accuracy)   │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ Monthly · $9.99/mo    ○  │   │
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
**Copy rationale (updated 2026-04-19):**
- Headline: "Unlock unlimited estimates + saved projects + alerts" (POSITIONING §5 — replaces old "Unlock unlimited estimates AND priority pro matching")
- Feature bullets — 5 items, all aligned с new Pro benefits package:
  - Unlimited estimates (core)
  - Saved projects (retention moat)
  - Price alerts (new — Amazon / Home Depot price drops на tracked materials)
  - PDF export (insurance/resale)
  - Sonnet AI accuracy (tier differentiator)
- REMOVED: "Priority pro matching" — больше не существует как Pro-gated feature
**Design notes:**
- Personalized hook ("$247 saved") — +17% conversion per Adapty
- Annual pre-selected + "2 months free" framing (winner per historical H&F A/B tests)
- 5-feature benefits list (per §2.1 — 15+ features = overwhelming)
- Trust signals bottom: cancel anytime, restore purchase, T&P links
- Pricing reflects MONETIZATION §2: $49.99/yr, $9.99/mo, $2.99 pay-per
**Target metrics:** 18-25% conversion среди exposed users (PAYWALL §1.1)

---

### 5.2 Subscription Success

Post-purchase confirmation. Celebration moment (not subdued) + next-action prompts (use new feature immediately — reinforces purchase). Receipt sent to email async.

Pro benefits list обновлён под v2.0 — убрано "priority pro matching", добавлены новые subscriber-only features (POSITIONING §10 + MONETIZATION §2).

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
│   ✓ Saved projects unlimited   │
│   ✓ Price alerts               │
│   ✓ PDF export                 │
│   ✓ Sonnet AI (higher accuracy)│
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

**SCREEN-MAP ID:** 5.2 Subscription Success (was 5.3, re-numbered после removal of 5.2 Context Paywall Pro Match)
**Purpose:** Confirm purchase + celebrate + drive immediate use (reduces buyer's remorse)
**Primary CTA:** "Continue to estimate" (return user к exactly где они были — seamless)
**Copy rationale (updated 2026-04-19):**
- Feature checklist matches exactly Profile Pro (3.4-Pro) + Soft Paywall (5.1) — consistency reduces confusion
- REMOVED: "Priority pro matching" — больше нет
- ADDED: Saved projects unlimited / Price alerts / PDF export / Sonnet AI — new Pro-tier value stack
**Design notes:**
- Confetti animation (Lottie, lightweight) — emotional reward
- Feature checklist reminds what they got (анти-churn)
- Receipt to email = trust signal per PAYWALL §8.2
- NO upsell prompts here — respect the moment, upsell позже

---

### 7.1 Pro Match (Simple Deeplink Bottom Sheet)

**⚠ Major rewrite 2026-04-19 — was full Pro Match Results screen с 3 vetted pro cards, now simple deeplink handoff.**

Под rescope v2.0 FixIt — чистый advisor без marketplace (POSITIONING §1). Pro Match больше не broker (no pro onboarding, no Thumbtack API integration, no affiliate revenue). Вместо этого — **honest "find one yourself" handoff** к популярным pro-discovery platforms. User выбирает куда пойти (Thumbtack = marketplace / Google Maps = local search / Yelp = review-first), FixIt просто deeplinks туда с pre-filled context где возможно.

Это не revenue stream — это просто **completeness of advisor role**. Если AI говорит "Pro route = $175-275", user должен знать где pro найти. Мы не партнёры с этими платформами — тонкий disclaimer это подчёркивает.

```
┌────────────────────────────────┐
│ [X close]                      │
│                                │
│                                │
│                                │
│  🔍 Find a pro near you        │
│                                │
│  Supply line leak · Denver     │
│  Estimated range: $175-275     │
│                                │
│                                │
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │   🔵 Thumbtack           │  │
│  │      Get multiple quotes │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │   🟢 Google Maps         │  │
│  │      Plumbers near 80203 │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │   🔴 Yelp                │  │
│  │      Reviews first       │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│                                │
│  We don't earn from these      │
│  links. You find. You decide.  │
│                                │
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 7.1 Pro Match (Deeplink Sheet)
**Purpose:** Honest handoff к external pro-discovery platforms — user decides where to search. We don't broker.
**Primary CTA:** Three large pill buttons, equal hierarchy — **Thumbtack / Google Maps / Yelp**. User выбирает свой preferred channel.
**Secondary:** [X close] — dismisses sheet, returns к estimate screen (1.7)
**Deeplink construction:**
- **Thumbtack:** `https://www.thumbtack.com/k/[category-slug]/near-me/?zip=[80203]` (e.g., `plumbing/near-me/?zip=80203`)
- **Google Maps:** `https://www.google.com/maps/search/?api=1&query=[plumber+near+80203]` (pre-filled query with category + zip)
- **Yelp:** `https://www.yelp.com/search?find_desc=[plumber]&find_loc=[Denver%2C+CO+80203]`
- No affiliate tags, no UTM tracking revenue (per MONETIZATION §1.2 — partnership-free v1.0)
- На iOS — opens in Safari or native app if installed (deeplink protocol)
- На Android — intent chooser falls back к browser if app not installed
**Copy rationale (updated 2026-04-19):**
- Header: "Find a pro near you" — calm, no urgency ("Get 3 quotes NOW!" = old v1.0 pusher tone)
- Context line: estimated range repeats от estimate screen — user видит price benchmark перед выходом в marketplace (quote validation enabled)
- Pill sub-labels describe **what user gets** (not what we offer): "Get multiple quotes" / "Plumbers near 80203" / "Reviews first"
- Disclaimer "We don't earn from these links. You find. You decide." — **critical trust signal** per POSITIONING §2 anti-USP ("No marketplace, no hidden agenda")
- НЕТ "Request quote" / "Match me with pros" / "We'll connect you" — this is old v1.0 copy, verboten in v2.0
- НЕТ pro photos / ratings / experience years / availability — we have no pros, не нужно pretending
**Design notes:**
- Bottom sheet presentation (not full screen) — lightweight, easy dismissal
- 3 large pill buttons equal-weight — no preferred partner, neutral advisor
- Icon colors match each brand (Thumbtack blue, Google green, Yelp red) for instant recognition
- Disclaimer text small but visible, не hidden
- Sheet height ~60% screen — enough room for context + 3 buttons + disclaimer, not overwhelming
**Why this UX vs old Pro Match Results:**
| Old v1.0 (Pro Match Results) | New v2.0 (Deeplink Sheet) |
|---|---|
| 3 pro cards с avatars / reviews / quotes / availability | 3 platform buttons, no pro-specific data |
| "Request quote" CTA triggers Thumbtack API call + affiliate attribution | Deeplink opens external site/app, no API, no attribution |
| Revenue stream ($15-40 per qualified lead) | Zero revenue |
| Requires Thumbtack partnership approval | No partnership needed |
| Implies "our vetted pros" (we have none) | Honest "find one yourself" handoff |
| Full screen (feels central) | Bottom sheet (feels like utility) |
**Target metrics:** Informational only — track deeplink click-through (% users who tap any of 3) for product insights, NOT revenue. Expected ~15-25% of Pro-tier estimate viewers tap through.

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
│   No internet connection       │
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
**Copy rationale (updated 2026-04-19):**
- REMOVED from "Not available": "✗ Pro match" line — Pro Match deeplink теперь simply opens external app; если нет интернета, external app anyway не откроется, не нужно отдельно это упоминать (Thumbtack/Google/Yelp показывают собственный offline fallback)
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

Bottom sheet или full screen после user choose DIY on estimate screen (1.7). Critical для конversion DIY-claim → DIY-action. Amazon Associates deeplinks — bonus revenue stream (MONETIZATION §2 Stream 3, 1-3% commission).

Примечание: Home Depot deeplinks без affiliate (partnership-free v1.0 per MONETIZATION §2). Amazon Associates — единственный affiliate, signed up отдельно, без partnership complexity.

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
│ $16.97 estimated               │
│                                │
│ ─── Nearest store ───          │
│ 📍 Home Depot · 1.2 mi away   │
│    Cherry Creek · Open till    │
│    10pm                        │
│                                │
│ [ 🏠 Open in Home Depot app ]  │  ← primary (deep link)
│                                │
│ [ 📦 Order on Amazon instead ] │  ← alt fulfillment (affiliate)
│                                │
│ [ 📋 Add to Reminders ]        │  ← checklist export
│                                │
└────────────────────────────────┘
```

**SCREEN-MAP ID:** 4.1 Shopping List (DIY)
**Purpose:** Convert DIY-mode selection → actual material purchase (60%+ open rate target)
**Primary CTA:** "Open in Home Depot app" (deep-link homedepot://search/?q=[product]) — no affiliate, just convenience
**Secondary:** "Order on Amazon" — Amazon Associates affiliate, 1-3% commission bonus
**Tertiary:** "Add to Reminders" — for users shopping later, checklist export
**Design notes:**
- "You likely have" section (unchecked by default) — prevents Emma from over-buying
- Nearest store with distance + hours — removes "which store?" friction
- Price per-item + total — transparent, no surprises
- Amazon Associates disclosure in app footer (not here — keeps shopping list clean)
**Target metrics:** 60%+ DIY users open shopping list, 30%+ click retailer link

---

### 5.1-alt Trial Paywall Variant (Phase 2 A/B)

Post-launch A/B test variant — adds optional 7-day free trial button. Per PAYWALL-RESEARCH §7.3, hypothesis = hybrid freemium+trial adds 2-4% to conversion для Emma-flex cohort.

Benefits list обновлён аналогично 5.1 Soft Paywall — new Pro value stack без "priority matching".

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
│ │ Save 58% vs monthly      │   │
│ │                          │   │
│ │ ✓ Unlimited estimates    │   │
│ │ ✓ Saved projects         │   │
│ │ ✓ Price alerts           │   │
│ │ ✓ PDF export             │   │
│ │ ✓ Sonnet AI accuracy     │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ No trial · $49.99/yr  ○  │   │  ← immediate pay
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ Monthly · $9.99/mo    ○  │   │
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
**Copy rationale (updated 2026-04-19):**
- Benefits list matches 5.1 Soft Paywall exactly — consistency
- REMOVED: "Priority pro matching" — aligned с v2.0 Pro benefit stack
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
- **Card-based presentation** — estimates, history — all card layout (scannable, tappable). Pro Match — exception (single sheet с 3 pills, not cards per item)
- **Clear CTAs — one primary per screen** — cognitive load discipline (per PAYWALL §2.1)
- **Advisor tone, not marketplace pusher** — copy discipline per POSITIONING §7 (voice guidelines)
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
- **Platform pill button (new)** — large rounded rectangle с brand-colored icon + 2-line text. Used в Pro Match sheet (Thumbtack/Google Maps/Yelp). Not styled as "CTA" — equal-weight trio.

**Cards:**
- Estimate card (list view) — photo thumbnail + title + mode chip + price + date
- Option card (DIY/Hybrid/Pro on estimate screen) — mode icon + price range + time + difficulty + CTA
- History card — similar to estimate card, smaller
- Tip card — icon + copy + optional CTA
- **REMOVED from library:** Pro match card (avatar + name + rating + experience + estimate + availability + CTA) — no longer exists post-rescope

**Tabs & Nav:**
- Bottom tab bar (4 tabs) — Home / My Home / Estimates / Me
- Filter chip row (All / DIY / Hybrid / Pro on estimates list)
- Segmented control (for sub-navigation within tabs, post-MVP)

**Lists:**
- Estimates timeline (grouped by period)
- Shopping list items (checkbox + photo + price + retailer)
- Materials list (grouped by retailer)
- **REMOVED from library:** Pro matches (3 cards vertically stacked) — no longer exists

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
- **Pro Match deeplink sheet (new)** — bottom sheet с header + context line + 3 platform pills + disclaimer. Height ~60% screen.

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
- **8.x Other error states** — standard patterns (404, 500, auth errors)
- **Pay-per-estimate checkout** — one-off purchase variant of paywall flow
- **v1.5+ screens:** Warranty tracker, maintenance calendar detail, quote validator, voice input, multi-user switcher, referral program, Family tier management

**REMOVED from v1.0 scope (post-rescope 2026-04-19):**
- **7.2 Pro Detail / Request Quote form** — deleted entirely. FixIt doesn't broker pros, no request flow, no quote form. User выходит в external app via deeplink.
- **5.2 Context Paywall Pro Match Gating** — deleted entirely. Pro Match is free deeplink, not premium feature, no paywall needed.

Эти screens могут быть added в subsequent iterations документа, когда приоритет пришёл. Для MVP design sprint 19 wireframes выше покрывают critical path (activation → aha → monetization → retention).

---

## Screens Wireframed (Summary Index)

| # | Screen | SCREEN-MAP ID | Flow stage | v2.0 status |
|---|--------|---------------|-----------|---|
| 1 | Welcome | 1.1 | Onboarding | copy updated (new tagline) |
| 2 | Location Capture | 1.2 | Onboarding | unchanged |
| 3 | Camera Permission Priming | 1.3 | Onboarding | unchanged |
| 4 | Camera View | 1.4 | Core loop | unchanged |
| 5 | AI Processing (labor illusion) | 1.6 | Core loop | step copy updated (voice) |
| 6 | First Estimate (AHA) | 1.7 | Core loop | Pro card sub-CTA updated ("Find on Thumbtack") |
| 7 | Home Tab (returning user) | 3.1 | Retention | greeting copy updated |
| 8 | My Home Dashboard | 3.2.1 | Retention | unchanged |
| 9 | Estimates List | 3.3.1 | Retention | unchanged |
| 10 | Estimate Detail | 3.3.2 | Retention | "routes" vs "options" voice |
| 11 | Profile (Free tier) | 3.4 | Account | upsell sub-copy updated |
| 12 | Profile (Pro tier) | 3.4 | Account | Pro features list rewritten |
| 13 | Shopping List (DIY) | 4.1 | Core loop | affiliate disclosure updated |
| 14 | Soft Paywall | 5.1 | Monetization | benefits list rewritten (no priority matching) |
| 15 | Trial Paywall Variant (A/B) | 5.1-alt | Monetization | benefits list rewritten |
| 16 | Subscription Success | 5.2 (was 5.3) | Monetization | renumbered, benefits list rewritten |
| 17 | Pro Match (Deeplink Sheet) | 7.1 | Handoff | **MAJOR REWRITE** — simple 3-pill sheet |
| 18 | No Internet Error | 8.1 | Error state | removed "Pro match" from unavailable list |
| 19 | Blurry Photo Error | 8.5 | Error state | unchanged |

**Total:** 19 wireframes (was 20). Removed — 5.2 Context Paywall Pro Match Gating (Pro Match больше не premium feature). Simplified — 7.1 Pro Match from 3-card full-screen to simple deeplink sheet.

**Key v2.0 changes summary:**
1. Welcome tagline → "Know the price before the panic" primary USP
2. All Pro benefits lists rewritten (no "priority pro matching" — added saved projects / price alerts / PDF export / Sonnet AI)
3. Pro Match — dramatic UX simplification (full screen → bottom sheet, 3 pro cards → 3 platform pills, affiliate revenue → honest free handoff)
4. Context Paywall Pro Match — REMOVED
5. Voice/copy shift — "routes" / "know" / "decide" instead of "options" / "connect" / "match"
6. Notification badge examples updated (savings milestones, seasonal check-ins, not "pro replies")

---

## Handoff Notes (для Stage 5 — Visual Design в Stitch)

Рекомендации для дизайнера / Stitch prompt engineering. Обновлены под v2.0 post-rescope:

1. **Tone:** calm advisor, not "cheerleading", and absolutely not marketplace pusher. Emma hates pushy sales. Think **Mint + Apple Weather + (light touch of) Duolingo**. **Removed from reference:** Thumbtack (was in v1.0 list — no longer our tone reference since we're not a marketplace). Signature phrases: **"Know" / "Decide" / "Understand"**. Never: "Connect" / "Match" / "Request quote" (POSITIONING §7 brand voice).

2. **Brand positioning in visuals:**
   - Pro Match sheet must feel **lightweight, utility-like** — not "premium marketplace". It's a **handoff**, not a destination.
   - Disclaimer "We don't earn from these links" must be visible, not hidden in fine print — это trust anchor (POSITIONING §2 anti-USP "No marketplace, no hidden agenda").
   - No "Recommended pro" badges anywhere — we don't recommend pros.

3. **Visual hierarchy priority:**
   - Primary CTA button — must be largest, highest contrast, single per screen
   - Key data (price, diagnosis, mode) — bold, scannable без reading
   - Secondary info — body size, muted color
   - Pro Match pills — equal weight, NOT hierarchied (no primary/secondary among Thumbtack/Google/Yelp)

4. **Color system (hypothesis, finalize в design system doc):**
   - Primary: warm blue / trust (house + technology metaphor)
   - DIY mode: green (success, empowerment)
   - Hybrid mode: orange (balance)
   - Pro mode: deep blue (professional, reassuring)
   - Accent: soft yellow (attention, savings highlight)
   - Error / urgent: warm red (not aggressive)
   - **Pro Match platform pills:** native brand colors (Thumbtack blue #009FD9, Google green #34A853, Yelp red #AF0606) — instant recognition

5. **Typography:**
   - Headline: 24-32px, bold, max 2 lines
   - Body: 16px, readable at arm's length (Emma reads от divana)
   - Price display: 28-36px, bold, monospace digits для alignment
   - Caption / meta: 12-14px, muted
   - Disclaimer ("We don't earn..."): 13-14px, muted but readable (NOT legal-fine-print tiny)

6. **Spacing:**
   - Generous whitespace — Emma в stress-state, не переполнение
   - Card padding: 16-20px internal, 12-16px между cards
   - Safe area margins: 20-24px горизонтально
   - Pro Match sheet: buttons 72pt height (больше чем обычная pill — emphasize tap-ability)

7. **Iconography:**
   - Emoji везде где подходит (universal recognition, playful)
   - Для mode indicators: 🔧 DIY / 🤝 Hybrid / 🏢 Pro consistent
   - Custom icons только где emoji не работает (app logo, specific system status)
   - Pro Match platform icons: real brand logos (Thumbtack / Google Maps / Yelp) — not emoji substitutes

8. **Imagery:**
   - Photos real repair scenarios (before/after) — NOT stock "happy family"
   - Sample photos diverse (различные rooms, appliances, damage types)
   - Avoid rendering gender/race primary in hero (inclusive)
   - **No pro avatars / contractor headshots** anywhere in MVP — we have no pros, not pretending

9. **Dark mode:** required в v1.0 (iOS users expect). Test contrast в обоих modes. Pro Match platform pills must be legible in both modes — brand colors may need tint adjustment.

10. **Animation:**
    - Labor illusion screen — Lottie / native animation (5-8 sec)
    - Subscription success — confetti Lottie
    - Page transitions — native iOS / Android (no custom custom)
    - Button press — haptic + subtle scale (0.95) + color feedback
    - Pro Match sheet present — standard iOS bottom sheet slide-up, 300ms ease-out

11. **Localization readiness:** copy should allow 30% length expansion (German, French). Hardcoded strings avoided — all в i18n bundle (English only MVP, но infrastructure ready).

### Stitch prompt engineering notes for Pro Match sheet specifically

Если Лана делает Pro Match через Stitch — ключевые prompt anchors:

- "Simple bottom sheet, NOT full screen"
- "Three large equal-weight pill buttons — Thumbtack (blue), Google Maps (green), Yelp (red)"
- "No avatars, no ratings, no quotes — just platform logos + 'Find a pro near you' header"
- "Small italic disclaimer at bottom: 'We don't earn from these links'"
- "Lightweight utility feel, not premium marketplace — think iOS Shortcuts sheet, not Thumbtack app"

Избегать в prompts:
- ❌ "Pro cards with reviews"
- ❌ "Booking interface"
- ❌ "Request quote form"
- ❌ "Vetted contractors"

---

## Related Docs

- [POSITIONING.md](../02-product/POSITIONING.md) — **primary reference for v2.0 voice/messaging**
- [MONETIZATION.md](../02-product/MONETIZATION.md) — **primary reference for Pro benefits stack**
- [SCREEN-MAP.md](./SCREEN-MAP.md) — hierarchical list всех screens с IDs
- [USER-FLOWS.md](./USER-FLOWS.md) — flow diagrams соединяющие screens
- [FEATURES.md](../02-product/FEATURES.md) — 10 MVP features с RICE priority
- [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) — design principles, long-term vision
- [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) — обоснование 3-step onboarding, labor illusion, signup defer
- [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) — обоснование soft paywall timing, pricing tiers
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — Emma primary persona, activation triggers
- [TARGET-AUDIENCE.md](../02-product/TARGET-AUDIENCE.md) — Day-in-the-life timing, aha moment sequence
- (Stage 5 outputs) — Stitch generated hi-fi mockups, design system tokens

---

**Дата последнего обновления:** 2026-04-19 (post-rescope to pure AI-advisor utility)
**Автор:** UX Team (Лана + Amanda)
**Статус:** v2.0 ready для Stage 5 visual design handoff
**Следующий шаг:** Stitch prompt engineering на основе этих wireframes → hi-fi mockups → prototype для beta testing с 10 Emmas (criterion 8/10 reach first estimate <90 sec per ONBOARDING §11.4)

**Changelog v2.0:**
- 2026-04-19 — rescope update: removed Context Paywall Pro Match (1 wireframe), simplified Pro Match Results → Deeplink Sheet (major UX change), updated all Pro benefits lists (removed "priority pro matching", added saved projects / price alerts / PDF export / Sonnet AI), welcome tagline updated to "Know the price before the panic", brand voice shift (Know/Decide/Understand vs Connect/Match/Request), renumbered Subscription Success 5.3 → 5.2.
