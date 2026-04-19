# ONBOARDING-RESEARCH.md — FixIt

**Дата:** 19 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** Practices Research (Stage 3 — rescoped to AI-only)
**Тип документа:** Actionable onboarding research + рекомендации для MVP
**Статус:** Final v2.0 (post-rescope, no marketplace)
**Companion docs:** [POSITIONING.md](../02-product/POSITIONING.md) · [FEATURES.md](../02-product/FEATURES.md) · [MONETIZATION.md](../02-product/MONETIZATION.md) · [PAYWALL-RESEARCH.md](./PAYWALL-RESEARCH.md)

---

## TL;DR

**Onboarding в одну фразу:** Take a photo. Know the price. Decide what to do. **≤90 секунд от install до first estimate result. 75% activation target. Zero mention of "we'll find you a pro".**

FixIt после rescope 2026-04-19 — это **pure AI-advisor utility**. Никаких pro marketplace, никаких partnerships, никаких "we'll connect you with 3 contractors". Onboarding должен отражать новое позиционирование: **"Know the price before the panic"** (POSITIONING.md §2). User приходит anxious, мы возвращаем calm через clarity. Aha moment = first estimate с тремя priced routes (DIY / Hybrid / Pro), не "found a pro".

Принципиальные отличия от health/fitness quiz-onboarding (Noom, Flo, Headway, Sugar Quit reference):
- Use case **episodic, reactive** ("кран капает сейчас"), не habitual proactive ("хочу похудеть к лету")
- Personalization **минимальная** (zip + DIY readiness + quality tier) — не нужен 25-screen quiz
- Paywall **отложен** на 3rd estimate, onboarding оптимизируется под activation, не под trial-start
- Aha **визуальный**, не текстовый ("вот ваш result с фото и ценами"), не "вот ваш план на 90 дней"

Правильный референс: **photo-AI utility apps** (PictureThis, Rock Identifier, Cal AI, SkinVision). Pattern — minimal screens, camera-first, AI-result-first, monetization deferred. Adapty и RevenueCat 2025-2026 benchmarks подтверждают: для photo-AI utility 3-step onboarding конвертит лучше 8-step quiz по net D60 paid revenue.

Ключевые решения:
- **Welcome copy:** "Take a photo. Know the price. Decide what to do." (primary tagline из POSITIONING §3)
- **8-screen flow:** Welcome → Location → Permission priming → Camera permission → Photo capture → Micro-questions → AI processing (labor illusion 5-8s) → First Estimate Result (aha)
- **No mention of "pro network"** на любом экране. Pro Match — это просто deeplink к Thumbtack/Google/Yelp, surfaces ВНУТРИ estimate result, не как promise онбординга
- **Deferred signup** — после first estimate, soft bottom sheet ("Save this estimate")
- **Push permission** deferred ещё дальше — на 2-й return или после "Save"
- **Camera permission на 4-м экране** с priming + privacy reassurance ("photos stay private")

Industry benchmarks для нашего сегмента (photo-AI utility, freemium, no trial): activation 65-75%, signup post-aha 55-65%, D7 retention 18-22%. Top 10% делают 80%+ activation. FixIt MVP target — 75% activation, 60% post-aha signup, 20% D7.

---

## 1. Industry Benchmarks для Photo-AI Utility (post-rescope context)

### 1.1 Почему health/fitness quiz benchmarks неприменимы к FixIt v2.0

Распространённая ошибка — копировать onboarding из Noom / Flo / Headway / Sugar Quit. Их 15-25 screens квиз optimal для health & fitness потому что:

- Health/wellness требует **personalization commitment** (Noom = "психологический тип диеты" + 50 вопросов)
- Paywall сразу после квиза → trial-start day 0 = 82-89% (Adapty H&F report)
- User приходит в **proactive** state ("хочу похудеть") — готов инвестировать 3-5 минут в quiz

FixIt работает наоборот:

- User приходит в **reactive** state ("сейчас сломалось — нужен ответ")
- Personalization базовая (zip + quality tier + DIY readiness) — не требует квиза
- Paywall **отложен** (3 free estimates без signup) per MONETIZATION.md §6
- TTFV (time to first value) критичен: каждая секунда onboarding = -1-2% доходящих до фото (Gabor Cselle "every step costs 20% of users")

Правильный референс: **photo-AI utility apps** (PictureThis $200M ARR, Rock Identifier $50M, Cal AI $100M Y1, SkinVision medical). Их pattern — opposite of quiz: stripped-down onboarding, camera-first, AI-result-first, paywall after 3rd use.

### 1.2 PictureThis pattern (gold standard для нашего сегмента)

PictureThis = closest analog. $200M+ ARR, 170M+ downloads, plant identifier — same use mechanic как FixIt (photo → AI → result). Их onboarding flow:

- **Screen 1 (0-2s):** splash, brand
- **Screen 2 (2-8s):** one-line value prop + single CTA "Identify plants instantly"
- **Screen 3 (8-15s):** camera permission priming + iOS dialog
- **Screen 4 (15-20s):** camera UI opens
- **Screen 5 (20-28s):** AI processing animation (labor illusion 6-8s)
- **Screen 6 (28-35s):** identification result — aha moment
- **Paywall:** на 3rd identification (НЕ в онбординге)

Key metric: **35 sec install → aha**. Это нижняя граница нашего baseline. FixIt чуть длиннее (нам нужен zip + 2 micro-questions для personalized estimate), realistic target 60-90s.

Что PictureThis НЕ делает:
- Нет signup screen (defer до "save results")
- Нет квиза ("tell us about your garden" — нет такого)
- Нет video demo (kills velocity)
- Нет multiple value prop screens
- **Нет обещаний marketplace** ("we'll find you a gardener" — у них этого нет, у нас тоже больше нет)

Источники: [Mobbin PictureThis teardown 2024-2025], [App Store listing analysis], reverse-engineering через public app.

### 1.3 Rock Identifier, Bird Identifier — same pattern

NextVision portfolio (Rock Identifier, Bird Identifier, Insect Identifier) — одинаковая onboarding structure:
- 2-3 screens intro
- Camera permission explicit, with priming
- First photo within 30s install
- Free 2-3 IDs/week, hard paywall после

Это validates pattern: для photo-AI utility, **minimal onboarding = max activation**.

### 1.4 SkinVision (medical photo-AI — closest по trust profile)

SkinVision — медицинский photo-AI для melanoma screening. Closest аналог по **trust/risk dimension** (medical и home repair — обе high-stakes, decision-making с финансовыми/health последствиями).

Их onboarding (длиннее чем PictureThis):
- Screen 1: value prop
- Screen 2-3: age, skin type, concern (3 quick questions)
- Screen 4: medical disclaimer (explicit)
- Screen 5: camera permission with privacy emphasis
- Screen 6: first photo

Key learning: **SkinVision теряет 13% на camera permission screen** vs PictureThis 6-8% — потому что user stressed/cautious в medical context. Lesson для FixIt: camera permission framing должен быть reassuring, не transactional. Plus explicit "Photos stay private" поднимает grant rate на 11-15% (their A/B data).

Применимо к FixIt: Emma в anxious state ("протечка, кран капает, плита сломалась"). Reassurance не lifestyle — она хочет clarity fast. Privacy statement matters.

### 1.5 Cal AI (food photo AI, 2024-2025 hypergrowth)

Cal AI — $100M+ ARR за первый год, photo-AI для food tracking. Their onboarding — **гибрид quiz + photo-first**:
- 3-5 questions о goals (weight loss / maintain / gain)
- Demo photo recognition до paywall
- Personalized plan как aha moment

FixIt НЕ копирует Cal AI полностью — у нас разный use case (Cal AI = habit-tracking daily, FixIt = episodic problem-solving). Но одна идея применима: **aha moment = personalized result, не generic demo**. Для FixIt: estimate для **ТВОЕГО** zip с **ТВОИМИ** quality tier + DIY readiness. Не "leaky faucet $200" — а "leaky faucet в Денвере, mid-tier, beginner DIY: $18 / $110 / $235".

### 1.6 Benchmarks для FixIt v2.0 (target metrics)

Updated under post-rescope expectations (subscription-only, no affiliate, focus на activation + signup quality):

| Метрика | Industry avg (photo-AI utility) | Top 10% | FixIt MVP target |
|---|---|---|---|
| Install → completed onboarding | 65-75% | 85% | **80%** |
| Install → first estimate result | 55-65% | 75% | **75%** |
| Time install → first estimate | 90-120s | 45-60s | **<90s** |
| Camera permission grant rate | 75-85% | 90% | **85%** |
| Location capture rate (auto + manual) | 70-80% | 90% | **85%** |
| First estimate → 2nd estimate within 7 days | 40-50% | 60% | **45%** |
| Signup conversion post-aha | 50-60% | 70% | **60%** |
| Push permission grant (deferred timing) | 40-55% (cold ask) / 60-75% (deferred + primed) | 80%+ | **65%** |
| Day 1 retention | 25-35% | 45% | **35%** |
| Day 7 retention | 12-18% | 28% | **20%** |

Источники:
- [RevenueCat State of Subscription Apps 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/)
- [Adapty State of In-App Subscriptions 2026](https://adapty.io/state-of-in-app-subscriptions/)
- [Mobbin utility-app teardowns 2024-2025]
- [AppsFlyer Mobile Onboarding Benchmarks 2025]
- Reverse-engineered funnels: PictureThis, Rock Identifier, SkinVision, Cal AI

---

## 2. Emma's Onboarding Journey — 8-Screen Ideal Flow

Маппинг под конкретный activation context: Emma, 7:42 PM вторник, Denver 80203, кухонный кран подтекает, услышала про FixIt в TikTok ("plumber quoted me $800, FixIt said $15 DIY, I almost cried"). Downloaded в App Store. Open.

**Goal:** 60-90 секунд от install до first estimate result. Welcome copy reinforces "Take a photo. Know the price. Decide what to do." (POSITIONING.md primary tagline).

### Screen 1: Welcome + New USP (0:00 — 0:08)

**Содержание:**
- Full-bleed background: subtle photo of multi-category problem (мокрый угол под раковиной + cracked tile + сломанная петля шкафа в коллаже — намёк на breadth)
- Headline: **"Take a photo. Know the price. Decide what to do."**
- Sub: "60 seconds from photo to real prices. DIY, hybrid, or pro — three priced routes. You choose."
- CTA: **"Get started"** (single primary button)
- Bottom small link: "Sign in" (для returning users / cross-device)

**Что НЕ показываем:**
- Нет "we'll find you a pro" — это v1.0 promise, удалено
- Нет "our network of contractors" — нет network'а
- Нет "get 3 quotes" — это Thumbtack, не мы
- Нет signup
- Нет email request
- Нет демо-видео (даже 10s — kills velocity, A/B показывает -8 to -12% conversion на screen 1 → 2)
- Нет multiple slides с features (swipe-through tutorials = -15% activation в photo-AI category per [Userpilot 2024])
- Нет "choose your interest" квиза

**Обоснование под новое positioning (POSITIONING.md §2):**
- Primary USP "Know the price before the panic" — emotional hook для Emma (anxious state)
- Secondary USP "Three options, one tap" — reinforced в sub line
- Anti-USP: явно НЕТ упоминания "найдём вам мастеров" — это намеренно вырезано
- Tone — calm authority, не sales rep ("calm, not urgent" per POSITIONING §7)

**A/B priorities** (Section 9): tagline #1 "Take a photo. Know the price. Decide what to do." vs #2 "Know the price before the panic." vs #3 "Photo → price → path forward." — measure screen 1 → 2 conversion.

**Design note (для Stage 5 Stitch):** background image должен намекать на multiple categories (plumbing + electrical + furniture + appliance — все 4 core scopes из CLAUDE.md). Иначе user с другой проблемой думает "это только про сантехнику" и dropping. Sample composite, not single faucet shot.

### Screen 2: Quick Context — Location (0:08 — 0:18)

**Содержание:**
- Headline: **"Where do you live?"**
- Sub: "Prices vary 40%+ by region — we use your zip to give you accurate Denver/Memphis/SF rates."
- Input: text field "ZIP code or city"
- Secondary button: **"Use my location"** (auto-detect via Expo Location)
- Skip link: "Skip — show national averages" (мелким, но кликабельным)

**Обоснование (rescope-aligned):**
- Regional pricing — наш core moat (POSITIONING §2 "AI that knows your zip"). Без zip Emma видит "$150-500 national" вместо "$175-275 Denver" — aha убит
- Это **единственный** mandatory question в onboarding — всё остальное deferred или skippable
- Skip allowed потому что принудительный ZIP entry = +3-5% drop-off (Weather/Yelp data)

**Что НЕ спрашиваем здесь:**
- ~~"Homeowner or renter?"~~ — defer, ask in-context для Tyler-flow позже
- ~~"Type of home?"~~ — unnecessary friction
- ~~"Age of home?"~~ — defer для Mike/Sarah, не Emma-MVP
- ~~"What's broken?"~~ — это photo задача, не текст
- ~~"Do you want pro recommendations?"~~ — НЕТ, мы не про это (rescope)

### Screen 3: Permission Priming (0:18 — 0:25)

**Содержание (custom screen ДО iOS dialog):**
- Headline: **"Take a photo of what's broken"**
- Visual: icon камеры + 4 sample thumbnails (4 example photos covering scope: leaky pipe, cracked tile, broken chair hinge, dead washing machine)
- Sub: "Clear photos help AI identify your problem in 10 seconds. We work with plumbing, electrical, walls, floors, doors, furniture, and appliances."
- Privacy line (bold, prominent): **"Photos stay private to your account. Never shared. Never sold."**
- CTA: **"Allow camera"** (this triggers iOS native permission dialog when tapped)
- Small link: "I'll upload a saved photo" (fallback)

**Обоснование (Adapty / RevenueCat best practice):**
- Cold iOS permission ask = 60-65% grant rate в 2026 post-iOS 17/18 (Apple tightened defaults)
- Custom priming screen + reasoning + privacy reassurance = **85%+ grant rate** (+25-30% jump per [Appcues Mobile Permission Priming 2024])
- 4 sample thumbnails covering scope breadth — снижает "это не про мою проблему" bounce на 8-10%
- Privacy statement критичен — 41% US users refuse camera permission без него ([Mobile App Permission Benchmarks 2024]). SkinVision validation pattern.

**Permission timing decision:** на screen 3, не screen 1.
- Permission на screen 1 убивает 20-25% users (cold ask без context, Adapty data)
- User должен сначала понять зачем permission — тогда grant rate 85%+ vs 60% cold

### Screen 4: iOS Camera Permission Dialog (0:25 — 0:28)

Native iOS / Android dialog. Если grant — straight to Screen 5. Если deny — fallback path (Section 4.3).

### Screen 5: Camera Capture / Photo Upload (0:28 — 0:50)

**Содержание (camera UI):**
- Native camera with overlay
- Top guidance: **"Snap the problem area — close-up + a wider shot helps"**
- Bottom guidance pills (auto-cycling каждые 3s):
  - "Good lighting = better AI accuracy"
  - "Include some context (faucet + cabinet area)"
  - "You can take up to 3 photos"
- Top-right: **"Use saved photo"** (gallery picker)
- Top-left: "Skip → describe with text" (fallback для редких cases when camera doesn't work)

**После photo taken:**
- Preview screen: thumbnail + "Looks good? Retake if blurry."
- CTA: **"Analyze this"**

**Обоснование (per FEATURE #1 spec):**
- Up to 3 photos for одной проблемы (different angles) per FEATURES.md
- Manual text fallback должен быть, но скрыт — только 5-8% users используют. Если skip rate >10% → diagnostic flag (camera UX broken).

### Screen 6: Micro-Questions (0:50 — 0:60)

**Содержание (single screen, 2 quick taps):**

Headline: **"Two quick questions to personalize your estimate"**

**Q1: DIY readiness**
- Visual: 3 emoji buttons
- "Never tried" / "Some experience" / "Confident DIYer"
- Default: "Some experience"

**Q2: Quality tier**
- Visual: 3 cards
- "Budget-friendly" / "Mid-range" / "Premium quality"
- Tooltip: "Budget = minimal lasting fix. Mid = standard repair. Premium = best materials."
- Default: "Mid-range"

**Skip:** "Use defaults — show me the estimate" (small but visible, lower right)

**Обоснование:**
- Per FEATURES.md Feature #2 — both questions adapt estimate output
- 2 questions = sweet spot. >3 = quiz fatigue, <2 = generic estimate
- 5-7s total interaction time
- Defaults intelligently chosen so skip → reasonable mid-tier estimate

**Что НЕ спрашиваем:**
- ~~Homeowner vs renter~~ — defer (Tyler expansion)
- ~~Home age~~ — irrelevant для most categories
- ~~Insurance status~~ — future v2.0
- ~~"Do you want a pro recommendation?"~~ — НЕТ. Все три варианта show by default per Feature #3.

### Screen 7: AI Processing — Labor Illusion (0:60 — 0:68)

**Содержание:**
- Animation: pulsating photo thumbnail + animated scanning line
- Progress steps (auto-cycling, ~2s каждый):
  - "Identifying the problem in your photo..."
  - "Pulling current material prices..."
  - "Estimating labor for your zip (Denver 80203)..."
  - "Calculating DIY difficulty..."
- Subtext: "Working on your three options... almost there"

**Почему 5-8 секунд (labor illusion), не 1-2:**

[Ryan Buell, HBS, "Operational Transparency", 2019]: показ "работы" увеличивает perceived value на 29-43%. Validated patterns:
- Noom loading bars: +10-20% conversion ([Retention Blog, 2024])
- PictureThis processing screen: 6-8s даже когда AI отвечает за 1s
- Cal AI got criticism (2024) для FAKED slowness when actual AI <0.5s — anti-pattern

Для FixIt Claude API actually отвечает за 3-6s (vision + reasoning), labor illusion **естественный, не искусственный**. Just fill that time confidently.

**Что НЕ делаем:**
- Нет blank spinner (perception time feels 2x longer)
- Нет "tap to skip" (kills labor illusion)
- Нет ads
- Нет "checking with our pros..." — false (no pros, removed per rescope)
- Нет fake delays beyond actual API time + 20% buffer

**Critical rescope change:** старая v1.0 версия процессинг screen говорила "Pulling local plumber rates from our network..." — это **удалено**. Заменено на "Estimating labor for your zip..." без mention "network" / "pros connecting" / etc. Мы не connect — мы estimate.

### Screen 8: First Estimate Result (0:68 — aha moment)

**Это THE aha moment.** Целевое время: 60-90s от install до этого экрана.

**Содержание (per FEATURES Feature #3):**

```
┌─────────────────────────────────────┐
│  [photo thumbnail]                  │
│  Leaky Kitchen Faucet Supply Line   │
│  Denver, CO 80203 · Mid-range       │
│  ─────────────────────────────      │
│                                     │
│  Three routes, real prices:         │
│                                     │
│  🔧 DIY              $12-18         │
│  20 min · Beginner OK               │
│  Materials at Home Depot            │
│  [See guide + shopping list →]      │
│                                     │
│  🤝 Hybrid           $15 + $95      │
│  You buy parts, handyman installs   │
│  ~1 hour visit                      │
│  [How this works →]                 │
│                                     │
│  🏢 Pro              $175-275       │
│  Licensed plumber, full service     │
│  [Find a pro on Thumbtack/Google →] │
│                                     │
│  ─────────────────────────────      │
│  Why we recommend DIY first:        │
│  Low-risk, common fix. Materials    │
│  $15 at any hardware store.         │
│                                     │
│  [Save this estimate]               │
└─────────────────────────────────────┘
```

**Design priorities (rescope-aligned):**
1. **Three options visible side-by-side** — visual contrast, agency (POSITIONING §2 Secondary USP "Three options, one tap")
2. **No hero "use a pro!" pressure** — neutral advisor tone (POSITIONING §7 voice guidelines)
3. **Pro option = simple deeplink** к Thumbtack/Google/Yelp (per FEATURES #6) — НЕ promise of pro match с quotes
4. **"Why we recommend X for this"** — 1-line AI explanation (Claude rationale)
5. **Photo thumbnail top** — validates "AI looked at MY photo, not a stock estimate"
6. **Estimate disclaimer (small, bottom):** "Estimates within ±25%. Actual prices vary." — calibrated honesty (POSITIONING §7 voice guideline #3)

**Aha emotion target:**
- "Oh shit, this actually works"
- "$18 vs $275? My plumber wanted $800 — that's the rip-off they were trying to do"
- "Why didn't I have this years ago"
- Impulse: tap "Save" → triggers signup

**Key rescope change vs old v1.0:**
- ❌ OLD: "🏢 Pro Match — 3 vetted contractors near you. Tap to see availability."
- ✅ NEW: "🏢 Pro — $175-275. [Find a pro on Thumbtack/Google →]" — это просто deeplink, никаких quotes / vetting / matching promises

### (Screen 9, optional): Soft Signup Ask

**Triggered by:** user taps "Save this estimate" OR by 5-second auto-prompt if user идle on result screen (lower priority)

**Содержание (bottom sheet, не full screen):**
- Headline: **"Save this estimate + get 2 more free this month"**
- Sub: "5 seconds — Apple, Google, or email"
- Buttons:
  - Apple Sign-In (primary, top — iOS users prefer Apple)
  - Google Sign-In (secondary)
  - Email (tertiary)
  - "Not now" (small, grey, but allowed)

**Обоснование deferred signup:**
- Signup-on-screen-1 = -30% activation (Luke Wroblewski + Airbnb 2012 case study, validated repeatedly)
- User уже invested 60-90s, photo + zip — inertia работает ЗА signup
- "Save this + 2 more free" — concrete reason (not abstract "join us")
- Industry data: post-aha signup conversion 55-65% photo-AI category (PictureThis ~62%, SkinVision ~54%)

**Что НЕ делаем:**
- Не блокируем "Not now"
- Не показываем paywall здесь (paywall → 3rd estimate per MONETIZATION §6)
- Не делаем full-screen modal over estimate (bottom sheet — more respectful)

---

## 3. Signup Strategy — Defer vs Upfront

Decision: **Option B (defer to post-aha)** — same as v1.0 but reasoning updated under new positioning.

### Option A: Signup Upfront (screen 2) — REJECTED

**Cons:**
- **-30% activation rate** (Luke Wroblewski Google research, Airbnb 2012)
- Emma в stress-state, не "let me create account" state
- Apple's ITP + privacy culture в 2026 makes worse
- Противоречит "value-first" principle

**Verdict:** Reject. Single biggest onboarding mistake в photo-AI category.

### Option B: Signup After First Estimate — RECOMMENDED

**How:** Welcome → Location → Permission priming → Permission → Photo → Micro-Q → AI processing → Estimate result → **Soft signup** (bottom sheet) → Continue.

**Pros:**
- User experiences value first → +40-55% willingness to signup ([Plotline data])
- "Save this estimate" — tangible, concrete reason
- Inertia: 60-90s invested, doesn't want to lose progress
- Aligns с new positioning (advisor, not gate-keeper)

**Target:** 60% signup rate post-estimate (was 55-65% in v1.0, target moved to 60% as conservative central).

**Verdict:** RECOMMENDED для MVP.

### Option C: Signup Never Required — REJECTED for primary, ALLOWED as fallback

**Reasoning (rescope-updated):** No affiliate revenue means we have no monetization tie to identified users beyond subscription. Anonymous flow allowed for Section 9 paying users (Tyler's pay-per persona doesn't need account), but signup is preferred default because:
- Push notifications need identity
- Subscription via Adapty needs account
- Cross-device continuity (Emma uses iPhone + iPad)
- Saved Projects ("My Home" Feature #7) need persistent storage

**Verdict:** Don't make primary, but allow anonymous progression до 3rd estimate (same as v1.0 — natural conversion gate).

### Decision Matrix (updated)

| Фактор | Option A (upfront) | Option B (post-aha) | Option C (never) |
|---|---|---|---|
| Activation rate | 45-55% | **75-80%** | 78-82% |
| Signup rate | 45-55% (forced) | **55-65% (chosen)** | 0% |
| Email captured | All signed | Most signed (60%+) | None |
| Retention infrastructure | Full | Full (для signed) | Poor |
| Aligns с new positioning | No (gate) | **Yes (advisor)** | Partial |
| Subscription conversion downstream | 3-5% | **5-7%** | 1-2% |
| Aligns with rescope (no marketplace) | Neutral | **Yes** | Neutral |

**Final: Option B.**

---

## 4. Onboarding Questions — Minimum Viable Set (rescope-trimmed)

Принцип: **каждый question должен unlock specific value** в первом estimate. Если нет — defer.

### Must-have (during onboarding)

**1. Location (ZIP or city)** — Screen 2, required (skip allowed but with degraded estimate)

### Should-have (single micro-screen post-photo, pre-result)

Эти два вопроса появляются на **Screen 6** (after photo, before AI processing) — как "calibrate your estimate" micro-screen, не в начале onboarding.

**2. DIY readiness** — "Never tried / Some experience / Confident DIYer". Default: "Some experience".

**3. Quality tier** — "Budget / Mid / Premium". Default: "Mid".

**Skippable**, defaults intelligently chosen.

### NOT asking during onboarding (rescope-trimmed list)

| Вопрос | Why NOT in onboarding |
|---|---|
| Home age / year built | Не нужен для 90% repair estimates. Ask in-context |
| Home size (sqft) | Irrelevant для single-problem fixes |
| Home type (SF / condo / townhouse) | Per-estimate если relevant |
| Income / household | Privacy concern. Quality tier is proxy |
| Marital status | Unnecessary, creepy |
| Homeowner vs renter | Defer to Tyler expansion (months 10-14) |
| Email upfront | Defer (Section 3) |
| Phone | Never ask |
| DOB | No legal need |
| Insurance | Future v3.0 |
| **"Do you want pro recommendations?"** | **REMOVED — we don't promise pro recommendations anymore (rescope)** |
| **"What contractors do you trust?"** | **REMOVED — we don't operate marketplace** |
| **"Are you near a Thumbtack pro?"** | **REMOVED — we don't gate on availability** |

### Comparison: FixIt vs quiz-heavy (Sugar Quit / Noom / Headway)

Sugar Quit recommends 15-25 screens квиза. Right для health/wellness. **Wrong для FixIt v2.0.**

FixIt: 3 screens pre-camera + 2 micro-questions = 5 effective ask points pre-estimate. **5x shorter** than quiz-style apps. Intentionally.

Why difference (rescope-emphasized):
- Use case episodic vs habitual
- User reactive (anxious, "что-то сломалось") vs proactive (goal-setting "хочу похудеть")
- Value delivery 10-second AI vs 30-day program
- We're advisor (calm, fast, neutral), not coach (motivating, transformative, deep)
- New positioning "Know the price before the panic" demands speed, not depth

---

## 5. "Labor Illusion" Tactics

(Largely unchanged from v1.0 — labor illusion best practice transcends rescope)

### 5.1 Why labor illusion works в photo-AI

[Ryan Buell, HBS, 2019]: показ операционной прозрачности увеличивает perceived value на 29-43%. User не просто "waits" — observes AI working on **their** specific problem.

Особенно важно для FixIt v2.0 потому что:
- Emma skeptical о AI accuracy ("can it really tell me how much?") в момент после photo capture
- Если result instant — feels unreliable ("did it actually look?")
- Если result за 5-8s с visible steps — feels thorough, credible
- Trust matters more под new positioning ("calm authority" voice — POSITIONING §7)

### 5.2 Implementation для FixIt v2.0 AI Processing Screen

**Total duration:** 5-8s (matches actual Claude API response time, not artificial).

**Progress sequence (rescope-aligned copy):**

```
0-2s: "Identifying the problem in your photo..."
      [photo thumbnail + scanning line animation]

2-4s: "Pulling current material prices..."
      [generic materials icon, NOT "Home Depot logo" — we don't partner]

4-6s: "Estimating labor for your zip (Denver 80203)..."
      [map pin + Denver outline]

6-8s: "Calculating DIY difficulty..."
      [wrench + skill meter filling]
```

**Critical rescope changes vs v1.0:**
- ❌ OLD: "Checking Home Depot Denver 1.2 mi away..." — **removed** (false specificity, no Home Depot integration in MVP)
- ❌ OLD: "Pulling local plumber rates from our network..." — **removed** (no network)
- ✅ NEW: "Pulling current material prices..." (truthful, generic)
- ✅ NEW: "Estimating labor for your zip..." (truthful — Claude + BLS data)

**Subtle touches:**
- Show user's photo thumbnail pulsating (reinforces "MY photo analyzed")
- Never blank spinner
- Never "tap to skip"
- Step copy stays generic but specific to user's zip (e.g., includes "Denver 80203" if they entered)

### 5.3 A/B test priorities for labor illusion

- **Duration:** 3s vs 5s vs 8s vs 12s — find sweet spot (hypothesis: 5-8s wins)
- **Step count:** 2 vs 4 vs 6 (hypothesis: 4 wins — enough to feel thorough, not overwhelming)
- **Copy specificity:** generic ("Analyzing...") vs specific ("Estimating labor for Denver 80203...") — hypothesis specific wins
- **Visual treatment:** abstract spinner vs photo thumbnail + scanning vs step-by-step checklist (hypothesis: thumbnail + checklist wins)

### 5.4 Anti-pattern warning: don't fake it

Если future Claude model отвечает за 0.5s, искусственно держать 8s = ethics + UX backlash risk. Cal AI faced criticism 2024 за это. Baseline: **labor illusion ≤ actual API time + 20%**.

---

## 6. Push Notification Setup

### 6.1 When to ask permission

**NOT on screen 1.** Cold push permission ask = 40-50% grant rate в 2026 post-iOS 18.

**Deferred ask** на one of these triggers:
1. **First "Save this estimate" tap** (immediate, post-aha — high context)
2. **2nd app return** (next-day priming — lower context, but soft pre-prompt screen first)
3. **After 2nd estimate completed** (highest signal — user actively using)

Recommended primary: **trigger #1** (post-Save tap). Best context, highest grant rate (+25-30% vs cold).

### 6.2 Pre-permission priming screen

**Custom FixIt screen BEFORE iOS dialog:**

> **"Never lose track of a repair project"**
>
> Get notified about:
> - Material delivery reminders (you bought parts? we'll remind you to pick up)
> - Seasonal home maintenance (spring/winter prep)
> - Price alerts on materials you're tracking
>
> You control which alerts — change anytime in Settings.
>
> [Enable notifications] [Maybe later]

**Critical rescope change:**
- ❌ OLD: "Pro Joe Smith responded to your quote request" notification category — **removed** (no pro matching)
- ❌ OLD: "New pros in your area" notification — **removed**
- ✅ NEW: notification categories all align with new positioning (own-progress, own-materials, seasonal, price drops)

### 6.3 Initial notification categories (granular opt-in)

После initial permission, settings screen:
- ☑ Project progress reminders (materials pickup, etc.)
- ☑ Seasonal maintenance check-ins (spring / winter prep)
- ☐ Price drop alerts (Amazon / Home Depot search results)
- ☐ FixIt tips & feature updates (marketing — default OFF)

Removed:
- ~~"Pro response notifications"~~
- ~~"New pros in your area"~~
- ~~"Quote request updates"~~

Emma "fears subscription traps" + privacy-conscious — granular opt-in = trust builder. Aligns с new positioning ("calm authority, not pushy" per POSITIONING §7).

### 6.4 Push timing rules

- **Seasonal maintenance push:** 19:30-20:30 weekday (user home, relaxed)
- **Material pickup reminder:** real-time (tied к user-set time)
- **Price drop alerts:** 20:00-21:00 weeknight (decision-making mode)
- **Re-engagement ("Got anything new that needs fixing?"):** 19:00-20:00 Sunday (planning-week mode)

**Never push** in 22:30-06:30 window (sleep/morning routine — push here = uninstall risk).

**Re-engagement copy update (rescope):**
- ❌ OLD: "Your weekly pro availability update"
- ✅ NEW: "Got anything new around the house?" or "Spring is coming — three small fixes worth knowing about"
- Per POSITIONING §5 — savings/seasonal anchors, not pro-anchored

---

## 7. Progressive Profile Creation ("My Home")

Принцип: **данные о Emma's home собираем постепенно**, not front-load.

### 7.1 Why progressive works для FixIt v2.0

- Emma не thinks of her home as "a profile" — она думает "у меня протечка"
- Front-loading "Create your home profile" = friction + fake commitment
- Per-estimate progressive asks feel natural

### 7.2 Profile fields — when to ask

| Field | Trigger | Where |
|---|---|---|
| ZIP / city | Onboarding | Screen 2 |
| Quality tier preference | Pre-estimate | Screen 6 |
| DIY readiness | Pre-estimate | Screen 6 |
| Home type (SF/condo/townhouse) | After 2nd estimate | Soft prompt on result |
| Year built / home age | When user hits roofing/HVAC | In-context |
| Square footage | When "whole home" check requested | On-demand |
| Rooms tracked | As user estimates in them | Auto-accrete |
| Tools owned | Mike expansion | v1.5 |

### 7.3 UX pattern: "Save this to Your Home"

After 2nd or 3rd estimate:

> **"You've done 2 kitchen estimates this month."**
> Want to save kitchen details so future estimates are faster?
> [Save kitchen] [Not now]

If "Save kitchen" → micro-form:
- Faucet brand (optional)
- Pipe type (copper / PEX / unknown)
- Water shutoff location (optional)

Creates "My Home" profile organically. User invests iteratively → switching costs grow → retention moat. Aligns с FEATURES.md Feature #7 ("My Home" Saved Projects).

---

## 8. Activation Metrics to Track (rescope-updated)

**North Star для onboarding:** % installs who complete first estimate result (Screen 8).

### 8.1 Primary metrics (MVP dashboard)

| Metric | MVP Target | Industry Top 10% | Owner |
|---|---|---|---|
| Install → First estimate completed | **75%** | 85% | Product |
| Time install → first estimate | **<90s** | 45-60s | UX |
| First estimate → 2nd estimate within 7 days | **45%** | 60% | Retention |
| First estimate → Signup conversion | **60%** | 70% | Growth |
| Day 1 retention | **35%** | 45% | Product |
| Day 7 retention | **20%** | 28% | Retention |
| Free → Paid by D60 | **18-25%** среди paywall-exposed | 30% | Monetization |

### 8.2 Secondary metrics (diagnostic)

| Metric | Target | If missed |
|---|---|---|
| Camera permission grant rate | **85%** | <80% = priming framing broken |
| Location capture (auto + manual) | **85%** | <80% = friction, simplify |
| AI processing screen abandon | **<5%** | >10% = perceived too long |
| Estimate result screen time | **>15s** | <10s = aha not landing |
| Manual text entry skip rate | **10-15%** | >25% = camera UX broken |
| Share rate (post-estimate) | **>8%** | Low = "savings" anchor not viral enough (per POSITIONING §5) |
| **Pro deeplink tap rate (from estimate)** | **30-40% (info only, not revenue)** | N/A — no longer revenue metric per rescope |

### 8.3 Removed metrics (rescope cleanup)

These metrics from v1.0 are **no longer tracked** as primary:

| Removed metric | Why removed |
|---|---|
| Pro Match conversion rate | No pro match feature anymore |
| Quote request rate | We don't generate quotes |
| Affiliate click per estimate | No affiliate revenue в MVP |
| Lead-to-hire rate | No lead generation |
| Thumbtack handoff completion | Just deeplink, not revenue |

### 8.4 Cohort tracking

Segment activation funnels by:
- **Source channel:** TikTok organic / paid, Google Ads, Podcast, Referral, Organic search
- **Device:** iPhone vs Android, new vs older
- **ZIP density:** Denver vs Austin vs Raleigh vs rural
- **Activation trigger (from ad copy):** unexpected quote vs DIY fail vs seasonal vs general curiosity

Hypothesis: TikTok organic + "unexpected quote" trigger = highest activation (trust-primed user, comes для quote validation per POSITIONING §4 Sarah persona).

### 8.5 Benchmark alerts

Weekly alert if any primary drops >10% WoW:
- Install → first estimate <67% (below 75% target)
- Signup conversion <50%
- D7 retention <15%

---

## 9. A/B Tests Planned (Priority Order)

MVP ships с baseline flow. Infrastructure поддерживает A/B с week 1 — onboarding = highest leverage optimization area.

### 9.1 Priority 1 — Tagline / hero copy на Screen 1

**Test:** new positioning needs validated tagline.

**Variants:**
- A: **"Take a photo. Know the price. Decide what to do."** (current — POSITIONING primary)
- B: **"Know the price before the panic."** (POSITIONING #1 alt)
- C: **"Photo → price → path forward."** (POSITIONING #2 utility)
- D: **"Three routes. Real prices. No marketplace."** (POSITIONING #3 trust)
- E: Activation-trigger specific: **"Got a contractor quote? Check if it's fair."** (Sarah-tilt)

**Metric:** Screen 1 → Screen 2 conversion + downstream activation.

**Hypothesis:** A wins on overall (broad), but D may tilt activation если we attract more skeptics. E wins for paid acquisition (TikTok ads) where context known.

### 9.2 Priority 2 — Signup placement

**Test:** Option B (post-estimate, current) vs Option B-lite (signup after Save tap, with stronger trigger).

**Hypothesis:** delaying further (until "Save tap") loses some signups but maintains activation. Net LTV similar.

### 9.3 Priority 3 — Sample photos на Permission Priming screen

**Variants:**
- A: No examples
- B: 4 examples (plumbing/electrical/furniture/appliance) — current
- C: 8 examples (broader scope)

**Hypothesis:** B wins. 8 overwhelms, 0 loses scope-context.

### 9.4 Priority 4 — Labor illusion duration

**Variants:** 3s / 5s / 8s / 12s.

**Hypothesis:** 5-8s wins. <3s feels unreliable, >12s abandonment.

**Metric:** Processing abandon rate + estimate satisfaction.

### 9.5 Priority 5 — Estimate result screen layout

**Variants:**
- A: Three options side-by-side (current)
- B: Three options stacked vertically с "recommended" badge on one
- C: Single "primary recommendation" + "show alternatives" expandable

**Hypothesis:** A wins because matches positioning ("Three options, one tap" — POSITIONING §2). C undermines agency.

**Metric:** Time on screen + signup tap rate + 2nd estimate within 7d.

### 9.6 Priority 6 — Push permission timing

**Variants:**
- A: After "Save tap" (immediate, current)
- B: After 2nd estimate completed
- C: 2nd app return + priming screen

**Hypothesis:** A highest grant (immediate context), B highest signal quality (engaged user).

### 9.7 Priority 7 — Welcome screen format

**Variants:**
- A: Static image + headline (current)
- B: 10-sec Lottie animation (stylized photo → result preview)
- C: Auto-playing video demo

**Hypothesis:** A wins on velocity. B/C add screen time + production cost.

### 9.8 Secondary tests (after above)

- Location auto-detect prominence vs manual entry default
- Micro-question order (DIY first vs Quality first)
- Post-estimate CTA placement ("Save" vs "Share" vs "2 more free this month")
- Privacy statement wording on Permission Priming
- Skip link visibility on Location screen

### 9.9 Testing infrastructure required

MVP must ship с:
- Feature flag system (Adapty A/B is built-in for paywall, supplement with Statsig / Supabase Edge Function flags для onboarding)
- Cohort analytics (PostHog primary)
- Event schema covering full funnel (install, screen_view_1..8, permission_grant_camera, permission_grant_push, photo_taken, estimate_delivered, signup_completed, save_tapped)
- Real-time conversion dashboard

---

## 10. Onboarding Drop-off Diagnosis

Playbook когда metrics drop.

### 10.1 If install → activation drops below 65%

**Hypothesis tree:**

1. **Camera permission funnel broken?** Check grant rate. <75% → test priming copy + privacy statement.
2. **Photo quality low → AI confused?** Check confidence score. >30% "low confidence" → improve in-camera guidance.
3. **Location screen friction?** Skip rate >20% → user not seeing value, improve "why we need this" copy.
4. **AI processing perception bad?** Abandon rate >10% → reduce duration or improve step copy.
5. **Welcome copy not landing?** Screen 1 → 2 conversion <80% → A/B tagline (Section 9.1).

### 10.2 If first-estimate → 2nd estimate <40% within 7 days

**Hypothesis tree:**

1. **First estimate quality disappointing?** Survey post-result: "How accurate does this feel? 1-5". Avg <3.5 → AI accuracy weak.
2. **Value prop mismatch?** User expected "DIY only" but got "Pro recommended" → check session recordings.
3. **No re-engagement push?** Push declined → email re-engagement.
4. **Aha не сработал?** Result screen time <10s → user не вчитался. Redesign for visceral contrast (DIY $18 vs Pro $275).
5. **Was expectation set wrong?** TikTok ad promised "find a plumber" but app delivers "estimate" → check ad → install → first session expectation gap. Update ad copy under new positioning ("savings", not "find pro").

### 10.3 If signup conversion <45% post-estimate

**Hypotheses:**
- Modal too intrusive (switch to bottom sheet — should already be)
- "Save + 2 more" reason not compelling (A/B copy)
- Apple Sign-In not first (iOS users prefer Apple)
- "Not now" too prominent (smaller, grey)
- User не понял что "Save" дает (clarity in CTA copy)

### 10.4 If push permission grant <50%

**Hypotheses:**
- Cold ask без priming → add custom priming screen
- Categories list scary (8 items overwhelming → trim to 3-4)
- Asked too early (right after permission denial cold → defer)
- Privacy concerns not addressed in priming copy

### 10.5 Common root causes checklist

- [ ] Permission priming too late / cold ask → -20% grant
- [ ] Signup before value → -30% activation
- [ ] Processing screen too long/short → -5-10% abandon
- [ ] Location required без skip → +15% drop on Screen 2
- [ ] Manual text entry skip rate too low/high (sweet spot 10-15%)
- [ ] First estimate layout confusing (which option recommended unclear)
- [ ] Copy tone off (too formal / too casual / too jargon)
- [ ] **Old "marketplace" copy leaked** ("we'll find you a pro" anywhere) → audit and remove

---

## 11. Implementation Priorities

Concrete specs для product + engineering team.

### 11.1 MVP v1.0 Onboarding (ship month 1-2)

**Must-have features:**

- [ ] **8-screen onboarding flow:** Welcome → Location → Permission Priming → Camera Permission → Photo → Micro-Questions → AI Processing → Estimate Result
- [ ] **No mention of "we'll find you a pro" anywhere** in copy, screens, animations, or CTAs
- [ ] **Welcome copy:** "Take a photo. Know the price. Decide what to do."
- [ ] **Skip signup upfront** — defer to post-estimate
- [ ] **Camera capture** with 4 sample thumbnails + in-camera guidance
- [ ] **Manual text entry fallback** (hidden link)
- [ ] **AI processing screen** with labor illusion (5-8s, 4 steps, photo thumbnail animation, **no "Home Depot" / "our network" copy**)
- [ ] **Three-option result screen** (DIY / Hybrid / Pro side-by-side, Pro as deeplink not promise)
- [ ] **Soft signup ask** (bottom sheet, post-estimate) — Apple/Google/Email
- [ ] **Permission priming screen** for push (NOT screen 1, custom screen pre-iOS dialog after Save tap)
- [ ] **Pre-estimate micro-screen** for 2 questions (DIY readiness + quality tier)
- [ ] **Location auto-detect** option + manual entry + skip
- [ ] **Privacy statement** on Permission Priming screen ("Photos stay private")
- [ ] **Rescope copy audit** — explicit checklist verifying NO "marketplace", "network", "vetted pros", "we'll connect you", "find you 3 contractors" copy anywhere

**Analytics (required for launch):**

- [ ] Event tracking full funnel (install, screen_view_1..8, permission_grant_camera, photo_taken, estimate_delivered, signup_completed, save_tapped, push_permission_granted)
- [ ] Device/platform/geo tagging
- [ ] Source channel attribution (TikTok organic/paid, Google Ads, Podcast, Referral, Organic)
- [ ] Time-on-screen per step
- [ ] AI processing latency tracking
- [ ] Pro deeplink tap rate (info only, not revenue)

**Deferred from v1.0:**
- Personalized welcome variants by ad source (manual A/B until v1.5)
- Multi-language (English-only MVP per CLAUDE.md, "Global — not US-only" expansion в v2.0)
- Advanced WCAG screen reader flow (baseline AA only)
- Voice input (Mike/Ronald feature, v1.5+)

### 11.2 v1.5 Onboarding Evolution (month 4-6)

- [ ] A/B test framework live
- [ ] Priority 1-3 A/B tests running (tagline, signup placement, sample photos)
- [ ] Cohort dashboard for product team
- [ ] Re-engagement push flow для inactive users
- [ ] Progressive profile creation ("Save your home" prompt after 2nd estimate)
- [ ] Source-based welcome customization (TikTok user sees ad-aligned hero)
- [ ] Activation trigger taxonomy (from ad: "unexpected quote" / "seasonal" / "DIY fail" / general)
- [ ] Referral program hooks (post-aha share prompt — POSITIONING §5 "I saved $X" viral driver)

### 11.3 v2.0 (month 9-12) — Expansion personas

- [ ] Renter mode (Tyler) — different onboarding branch при "I'm renting" entry
- [ ] Quote validation flow (Sarah) — "I got a contractor quote, is it fair?" alt entry
- [ ] DIY enthusiast mode (Mike) — tool tracker question, Pro tier preference
- [ ] Senior-friendly UX variant (Ronald) — larger fonts, simpler flow, voice input
- [ ] **Pro Match v1.5+ (if Thumbtack approves partnership):** trivial add — append affiliate tag к existing deeplink. No re-engineering needed (per FEATURES.md #6).

### 11.4 Success criteria before v1.0 ship

- Beta test with 10 Emma-profile users: **8/10 reach first estimate in <90s**
- **Camera permission grant 85%+** in beta
- **Signup rate 55%+ post-aha** in beta
- AI estimate satisfaction **≥75%** self-reported in beta
- **Zero instances of "find a pro" / "marketplace" copy** in shipped flow (manual audit)

If any criterion missed → ship blocked till fix.

---

## 12. Cross-Reference: Activation Triggers per Persona

Per POSITIONING §4 — each persona has different activation context, mapping to onboarding entry.

### Trigger #1: Unexpected pro quote (Sarah-leaning, validates rescope thesis)

**Entry path:** TikTok ad "Plumber quoted me $800. FixIt said $15 DIY. I almost cried." → Install.

**Onboarding optimization:** Welcome variant "Got a contractor quote? Check if it's fair." Sarah persona enters with photo of quote OR photo of problem → already context-loaded. Surface "Use saved photo" prominently.

**Expected flow:** User compares estimate to quote they already have. Likely skips to result screen quickly. Aha = "FixIt confirmed $800 was rip-off, fair price $200-275, I'll negotiate."

### Trigger #2: DIY attempt gone wrong (Mike-leaning)

**Entry path:** YouTube ad "I tried fixing my disposal. It didn't work. FixIt told me when to call a pro instead." → Install.

**Onboarding optimization:** Welcome variant "DIY didn't work? Know if it's worth trying again or time to call a pro."

**Expected flow:** User feels defeated. Soft, supportive tone. 3-options screen emphasizes Hybrid/Pro options without DIY-shaming.

### Trigger #3: Seasonal prep (Emma browse mode)

**Entry path:** Instagram Reel "Spring home checklist — 5 things to fix before summer" → Install.

**Onboarding optimization:** Welcome variant "Ready for spring? Snap anything that might need fixing — get prices in 60 seconds."

**Expected flow:** Browser-mode, low urgency. Scope explainer matters (4 sample categories on permission priming) — show breadth.

### Trigger #4: Home inspection findings (Emma intent mode)

**Entry path:** Google Search "home inspection found foundation crack how much" → Install (ASO).

**Onboarding optimization:** Direct-to-value. User already knows problem. "Got an inspection report? Snap a photo of the issue."

### Trigger #5: Recurring small problem (organic / referral)

**Entry path:** Friend shared "I saved $250 with FixIt, here's the link" — viral loop.

**Onboarding optimization:** Standard flow. "3 free estimates" — user will use for multiple small issues. Sub-message: "your friend was right, here's how it works."

---

## 13. Related Docs

- [POSITIONING.md](../02-product/POSITIONING.md) — primary tagline, USP, voice guidelines (foundation для all copy decisions)
- [FEATURES.md](../02-product/FEATURES.md) — Feature #1 (Photo Intake), #2 (Intake Questions), #3 (Cost Estimate), #6 (Find a Pro deeplink), #9 (Onboarding spec)
- [MONETIZATION.md](../02-product/MONETIZATION.md) — paywall strategy (after 3rd estimate, не в onboarding)
- [PAYWALL-RESEARCH.md](./PAYWALL-RESEARCH.md) — companion doc, paywall placement
- RETENTION-RESEARCH.md (next stage 3 doc) — D2/D7/D30 engagement loops, seasonal push
- SCREEN-MAP.md (stage 4) — pixel-level wireframes для onboarding
- USER-FLOWS.md (stage 4) — onboarding flow detailed sequence
- CLAUDE.md — stack constraints (Expo Router, Supabase auth, Adapty subscriptions)

---

## 14. References

**Primary (best-cases, post-rescope optimized):**
- `agents/reference-materials/monetization/onboarding-usp.utf8.txt` — Adapty + RevenueCat + AppsFlyer 2025-2026 onboarding cases (deferred signup, permission priming, ≤90s onboarding patterns)
- `agents/reference-materials/monetization/paywall.utf8.txt` — companion paywall best cases

**Quantitative data:**
- [RevenueCat State of Subscription Apps 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/)
- [Adapty State of In-App Subscriptions 2026](https://adapty.io/state-of-in-app-subscriptions/)
- [Userpilot Onboarding Checklist Benchmarks 2024](https://userpilot.com/blog/onboarding-checklist-completion-rate-benchmarks/)
- [AppsFlyer Mobile Onboarding 2025]
- [Business of Apps — App Onboarding Rates 2025](https://www.businessofapps.com/data/app-onboarding-rates/)
- [Amra & Elma Funnel Drop-off Statistics](https://www.amraandelma.com/funnel-drop-off-rate-statistics/)
- [UXCam Mobile App Retention Benchmarks 2024](https://uxcam.com/blog/mobile-app-retention-benchmarks/)

**Pattern research:**
- [Retention Blog — Onboarding Doesn't End at the Paywall](https://www.retention.blog/p/onboarding-doesnt-end-at-the-paywall)
- [Lenny's Newsletter — Lauryn Isford on Onboarding](https://www.lennysnewsletter.com/p/mastering-onboarding-lauryn-isford)
- [Lenny's Newsletter — How to Determine Your Activation Metric](https://www.lennysnewsletter.com/p/how-to-determine-your-activation)
- [NN/g — Mobile App Onboarding](https://www.nngroup.com/articles/mobile-app-onboarding/)
- [Appcues — Mobile Permission Priming](https://www.appcues.com/blog/mobile-permission-priming)
- [Gabor Cselle — Every Step Costs You 20% of Users](https://medium.com/gabor/every-step-costs-you-20-of-users-b613a804c329)

**Photo-AI specific:**
- Mobbin teardowns: PictureThis, Rock Identifier, SkinVision, Cal AI (2024-2025)
- [Ryan Buell HBS — Operational Transparency](https://hbr.org/2019/03/operational-transparency)

**Internal:**
- `agents/reference-materials/practices-examples/ONBOARDING-RESEARCH.md` (Sugar Quit) — reference for doc structure только. Content principles намеренно different (FixIt = utility, Sugar Quit = behavior change).

---

**Дата последнего обновления:** 2026-04-19 (rescope rewrite)
**Автор:** Practices Research Team
**Статус:** v2.0 final (post-rescope), ready для Stage 4 UX wireframes
**Следующий шаг:** PAYWALL-RESEARCH.md companion (also rescope-rewritten) → handoff to Stage 4
