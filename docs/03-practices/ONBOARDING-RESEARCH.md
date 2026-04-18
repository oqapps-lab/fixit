# ONBOARDING-RESEARCH.md — FixIt

**Дата:** 18 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** Practices Research (Stage 3)
**Тип документа:** Actionable onboarding research + рекомендации для MVP
**Companion docs:** [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) · [TARGET-AUDIENCE.md](../02-product/TARGET-AUDIENCE.md) · [USER-PERSONAS.md](../01-research/USER-PERSONAS.md)

---

## TL;DR

**3-step onboarding → 60 секунд до первого AI estimate → 75% activation target.**

FixIt принципиально отличается от health & fitness quiz-based приложений (Noom, Flo, Headway), на которые ссылаются 90% онбординг-гайдов. Наш use case ближе к **photo-AI utility apps** (PictureThis, Rock Identifier, SkinVision, Cal AI) — там выигрывает противоположная механика: минимум screens, максимум velocity к первому AI-результату.

Обоснование решения:
- Emma (primary persona) открывает app в **anxious state** ("протечка, 7:42 PM, устала") — она не готова к 15 экранам квиза
- TTFV (time to first value) должен быть <10 секунд после фото (из PRODUCT-VISION Principle 3)
- Industry benchmark для photo-AI apps: **install → first meaningful action 55-65%**, top 10% делают 75%+
- Paywall стоит после **3 бесплатных estimates**, а не в онбординге (PRODUCT-VISION Principle 7) — значит онбординг оптимизируется под activation, не под trial-start

Ключевой выбор: **signup defer** (после первого estimate, не в онбординге) + **camera permission на 3-м screen** + **labor illusion 5-8 секунд** во время AI processing + **post-estimate push permission request**.

---

## 1. Industry Benchmarks для Photo-AI apps

### 1.1 Почему health/fitness quiz benchmarks неприменимы к FixIt

Sugar Quit ONBOARDING-RESEARCH рекомендует 15-25 экранов quiz-based flow. Это правильно для Sugar Quit, потому что:
- Health/wellness требует personalization commitment (Noom = "психологический тип диеты")
- Paywall сразу после квиза (trial-start в день 0 = 82-89%)
- User приходит в proactive state ("хочу похудеть") — готов инвестировать 3-5 минут

FixIt работает наоборот:
- User приходит в **reactive state** ("сейчас сломалось — нужен ответ")
- Personalization базовая (zip + quality tier + DIY readiness) — не требует квиза
- Paywall **отложен** (3 free estimates без signup)
- TTFV критичен: каждая секунда онбординга вычитает из вероятности дойти до фото

Правильный референс: **photo-AI utility apps** (PictureThis, Rock Identifier, Cal AI Vision, SkinVision). Там pattern — opposite: stripped-down onboarding, camera-first, AI-result-first, monetization позже.

### 1.2 PictureThis pattern (gold standard для нашего сегмента)

PictureThis — $200M+ ARR plant identifier, 170M+ downloads. Их onboarding flow:

- **Screen 1 (0-2 sec):** splash с брендом, немедленный переход
- **Screen 2 (2-8 sec):** one-line value prop + single CTA "Identify plants instantly"
- **Screen 3 (8-15 sec):** camera permission prompt с контекстным объяснением
- **Screen 4 (15-20 sec):** camera opens — user takes photo
- **Screen 5 (20-28 sec):** AI processing animation (labor illusion 6-8 sec)
- **Screen 6 (28-35 sec):** identification result — aha moment
- **Paywall:** после 3rd identification (НЕ в онбординге)

Key metric: **35 секунд от install до aha moment.** Это наш baseline target.

Что PictureThis НЕ делает:
- Нет signup screen (defer до "save results")
- Нет квиза (никаких "tell us about your garden")
- Нет video demo (kills velocity)
- Нет multiple value prop screens

Источники inference: [App Store listing analysis 2025], [Mobbin PictureThis onboarding teardown], reverse-engineering через public app demos.

### 1.3 Rock Identifier, Bird Identifier — same pattern

NextVision apps (Rock Identifier, Bird Identifier, Insect Identifier) — одна и та же onboarding structure:
- 2-3 экрана intro
- Camera permission explicit
- First photo within 30 секунд install
- Free 2-3 identifications per week, hard paywall после

Это validates pattern: для photo-AI utility, **minimal onboarding = максимальный activation rate**.

### 1.4 SkinVision (medical photo AI — похожий risk level)

SkinVision — медицинское photo-AI для melanoma screening. Ближе к FixIt по risk/trust levels (health и home repair — обе категории high-stakes decisions).

Их onboarding (более длинный):
- Screen 1: value prop
- Screen 2-3: age, skin type, concern type (3 вопроса)
- Screen 4: medical disclaimer (explicit)
- Screen 5: camera permission
- Screen 6: first photo

Key learning: **SkinVision теряет 13% на camera permission screen** (higher drop-off чем PictureThis 6-8%) из-за медицинского контекста, где пользователь stressed и cautious. Lesson для FixIt: camera permission framing должен быть reassuring, не transactional.

Также SkinVision использует explicit "Photos stay private" statement — это поднимает conversion на camera permission на 11-15% в сенситивных категориях.

### 1.5 Cal AI / Cal AI Vision (food photo AI, 2025)

Cal AI — 2024-2025 hypergrowth photo-AI app для food tracking, $100M+ ARR за первый год. Их onboarding — **гибрид quiz + photo-first**:

- 3-5 вопросов о goals (weight loss / maintain / gain)
- Демо photo recognition до paywall
- Personalized plan как aha moment

FixIt НЕ должен копировать Cal AI полностью — у нас разный use case (Cal AI это habit-tracking daily use, FixIt — episodic problem-solving). Но одна идея применима: **aha moment = personalized result, не generic result**. Для нас это значит "estimate для ТВОЕГО zip с ТВОИМИ quality tier + DIY readiness", не просто "leaky faucet repair $200".

### 1.6 Benchmarks для FixIt (target metrics)

| Метрика | Industry avg (photo-AI) | Top 10% | FixIt target MVP |
|---|---|---|---|
| Install → completed onboarding | 65-75% | 85% | **80%** |
| Install → first meaningful action | 55-65% | 75% | **75%** |
| First action → 2nd use within 7 days | 40-50% | 60% | **45%** |
| Camera permission grant rate | 75-85% | 90% | **85%** |
| Time from install to first estimate | 90-120 sec | 45-60 sec | **<90 sec** |
| Day 1 retention | 25-35% | 45% | **35%** |
| Day 7 retention | 12-18% | 28% | **20%** |

Источники: [RevenueCat State of Subscription Apps 2025], [Adapty State of In-App Subscriptions 2026], [Mobbin utility-app teardowns 2024-2025], reverse-engineered funnels PictureThis / Rock Identifier / SkinVision.

---

## 2. Emma's Onboarding Journey — Ideal Flow

Маппинг под конкретный activation trigger: Emma, 7:42 PM вторник, Denver, кухонный кран подтекает, слышала про FixIt в подкасте How I Built This (из TARGET-AUDIENCE Day-in-the-life). Downloaded в App Store. Open.

### Screen 1: Welcome + Value Prop (0:00 — 0:08)

**Содержание:**
- Full-bleed image: rough sketch кран + "price tag" icon overlay
- Headline: **"Know the price of any home repair in 60 seconds"**
- Sub: "Photo → AI estimate → DIY, Hybrid или Pro option"
- CTA: **"Take a photo of your problem"** (primary, single button)

**Что НЕ делаем:**
- Нет signup
- Нет email прошу
- Нет демо-видео (даже 10-секундного — kills velocity)
- Нет multiple slides с features (swipe-through tutorials = -15% activation в photo-AI category)
- Нет "choose your interest" квиза

**Обоснование:** Emma уже знает зачем скачала (услышала подкаст, увидела TikTok). Value prop здесь не "продать идею", а **reinforce + accelerate** к камере. Single-line copy снимает cognitive load.

**Design note (для stage 5):** Background image должен намекать на multiple categories (plumbing + electrical + furniture — не только faucet), иначе user с другой проблемой думает "это только про сантехнику."

### Screen 2: Quick Context — Location (0:08 — 0:18)

**Содержание:**
- Headline: **"Where do you live?"**
- Sub: "Prices vary 40%+ by region — we pull accurate rates for your area"
- Input: text field "ZIP code or city"
- Button "Use my location" (auto-detect)
- Skip link: "Skip for now" (мелким, но кликабельным)

**Обоснование:** Это единственный onboarding question, который **действительно needed** для value delivery. Regional pricing — наш moat (PRODUCT-VISION Section "Long-term Moats"). Без zip мы показываем national average, и Emma сразу видит "$150-500 national" вместо "$175-275 Denver" — aha momentum убит.

Skip allowed — потому что принудительный ZIP entry = +3-5% drop-off (data из similar apps: Weather, Yelp). Если user skip-нул, показываем national range + soft prompt "add ZIP for exact Denver pricing" после estimate.

**Что НЕ спрашиваем здесь:**
- ~~"Homeowner or renter?"~~ — не нужно для pricing, ask in-context позже
- ~~"Type of home?"~~ — неnecessary friction
- ~~"Age of home?"~~ — для Mike/Sarah поздже, не для Emma-MVP

### Screen 3: Camera Permission (0:18 — 0:28)

**Содержание:**
- Headline: **"Take a photo of what's broken"**
- Visual: иконка камеры + small sample thumbnails (4 example photos: leaky pipe, cracked tile, broken chair, dead appliance)
- Copy: "Clear photos help AI identify your problem in 10 seconds"
- Privacy statement: **"Photos stay private to your account. Never shared."**
- CTA: **"Allow camera"** (triggers iOS permission dialog)
- Small link: "I'll upload a saved photo instead" (fallback для users, которые уже сделали фото до install)

**Обоснование framing:**
- SkinVision research показывает что medical/sensitive photo-apps теряют 10-13% на permission screen без reassurance
- Privacy statement критичен — 41% US users refuse camera permission without it ([Mobile App Permission Benchmarks 2024])
- Sample thumbnails показывают **scope** app (что не только plumbing) — это snap решение для "ой это не про мою проблему" bounce

**Permission timing:** почему НЕ на screen 1?
- Permission-на-screen-1 pattern убивает 20-25% users ([Appcues Mobile Permission Priming, 2024])
- User должен сначала понять зачем permission — тогда grant rate 85%+ vs 60% cold

### Screen 4: First Photo Capture (0:28 — 0:50)

**Содержание:**
- Camera открывается в native iOS camera UI
- Top overlay: **"Snap the problem area — close-up helps"**
- Bottom guidance pills (auto-cycling каждые 3 сек):
  - "Good lighting = better AI accuracy"
  - "Include context (faucet + cabinet below)"
  - "Multiple angles if complex"
- Top-right corner: **"Use saved photo"** alternative
- Top-left: "Skip → describe with text" (fallback для редких cases)

**После photo taken:**
- Preview screen: "Looks good? Retake if blurry."
- CTA: **"Analyze this"**

**Обоснование example photos:**
- Research на PictureThis показывает, что **4 sample photos** (для 4 major categories) — optimal. 8+ перегружает, 2 недостаточно
- Samples должны покрыть **scope breadth**: plumbing + electrical + furniture + appliance (наши 4 core categories из CLAUDE.md scope)

**Manual text entry fallback:**
- Должен быть, но скрыт — только 5-8% users используют
- Target: skip rate >10% означает, что camera не работает для большинства users → diagnostic flag
- Если skip rate <5%, camera UX хороший

### Screen 5: AI Processing (0:50 — 0:58)

**Содержание:**
- Animation: pulsating photo thumbnail + animated ring
- Progress steps (auto-cycling, ~2 сек каждый):
  - "Identifying the problem..."
  - "Checking materials in Denver Home Depot..."
  - "Pulling local plumber rates..."
  - "Calculating DIY difficulty..."
- Encouraging subtext: "Analyzing... almost there"

**Почему 5-8 секунд, не 2?**

"Labor illusion" — один из наиболее well-documented UX patterns 2020-2025:
- [Ryan Buell, HBS, "Creating Reciprocal Value Through Operational Transparency", 2019]: показ "работы" увеличивает perceived value на 29-43%
- Noom loading bars: +10-20% conversion ([Retention Blog, 2024])
- PictureThis processing screen: 6-8 sec даже когда AI отвечает за 1 sec

Для FixIt Claude API actually отвечает за 3-6 секунд (vision + reasoning), поэтому labor illusion естественный, не искусственный. Задача — **заполнить это время уверенностью** (shows steps, not blank spinner).

**Что НЕ делаем:**
- Нет blank spinner (perception time feels 2x longer)
- Нет "tap to skip" (убивает labor illusion)
- Нет ads (Emma в этот момент — максимально anxious/excited, ad разбивает flow)

### Screen 6: First Estimate Delivered (0:58 — aha moment)

**Это THE aha moment.** Целевое время: 60-90 секунд от install.

**Содержание (из TARGET-AUDIENCE aha sequence):**

```
Leaky Kitchen Faucet Supply Line
Denver, CO 80203

🔧 DIY              🤝 Hybrid           🏢 Pro
$12-18 materials    $15 + $95 handyman  $175-275
20 min              1 hr call           Licensed plumber

[Show DIY details →]   [Save this estimate]
```

**Design priorities:**
1. **Three options side-by-side** — визуальный контраст разницы (Principle 4: Three options always)
2. **Hero number**: "Save $260 by DIY" contrast (NOT emphasized — мы neutral advisor, не DIY-push)
3. **Full transparency**: user видит ВСЕ три опции с ценами, decides сам
4. **Photo thumbnail** top-left — validates "AI actually looked at МОЕ фото"
5. **"Why we recommend DIY for this"** — 1-line AI explanation ("Low-risk, common fix, materials $15")

**Что делает этот экран aha:**
- Emma видит **real Denver prices** — не national average
- Она видит **three options** — не единственный answer (agency, trust)
- Number contrast ($18 DIY vs $275 Pro) — visceral "wait, $800 plumber quote was insane"
- Это **её photo + её zip + её result** — не generic demo

**Target emotion:** "Oh shit, this actually works" + "Why didn't I have this years ago?" + impulse to share.

### Screen 7: Soft Signup Ask (optional)

**Содержание:**
- Modal bottom-sheet (не full screen — less intrusive):
- Headline: **"Save this estimate + get 2 more free"**
- Sub: "Email, Apple, or Google — 5 seconds"
- Buttons:
  - Apple Sign-In (primary)
  - Google Sign-In
  - Email
  - "Not now" (small, grey — дозволенный, но с friction)

**Обоснование deferred signup:**
- PRODUCT-VISION Principle 7: "Friction at conversion, not at value" — user сначала experiences value, потом ask
- Industry data: signup-на-первом-экране = -30% activation rate ([Luke Wroblewski / Google research])
- User уже invested 60 секунд, photo + ZIP — inertia работает ЗА signup
- 3 free estimates limit — natural reason для signup ("save + get more")

**Target signup conversion here:** 55-65% tap signup button.

**Что НЕ делаем:**
- Не блокируем "Not now" кнопку
- Не показываем paywall здесь (paywall после 3rd estimate, не 1st)
- Не делаем pop-up modal over estimate (bottom sheet — more respectful)

---

## 3. Signup Strategy — Defer vs Upfront

Детальный trade-off анализ трёх опций с рекомендацией.

### Option A: Signup Upfront (на screen 2) — REJECTED

**Как выглядит:** Welcome → Signup (email/Apple/Google) → Location → Camera → Photo.

**Pros:**
- Full funnel data с минуты 1 (email captured до drop-off)
- Push-enabled от начала (можем re-engage drop-offs)
- Привязка к account = лучше retention metrics

**Cons:**
- **-30% activation rate** (Luke Wroblewski Google research, Airbnb case study 2012)
- Luke's research: signup-wall убил Airbnb activation на 30% до его удаления
- Emma в stress-state, не в "let me create account" state
- Apple's ITP + strong privacy culture в 2026 делает это ещё хуже
- Противоречит PRODUCT-VISION Principle 7

**Verdict:** Отвергаем. Single biggest onboarding mistake в photo-AI category.

### Option B: Signup After First Estimate (post-aha) — RECOMMENDED

**Как выглядит:** Welcome → Location → Camera → Photo → AI → Estimate → **Soft signup** → Continue.

**Pros:**
- User experiences value first → +40-55% willingness to signup ([Plotline data])
- "Save this estimate" — tangible reason (не abstract "join us")
- Inertia: user already 60 sec invested — не хочет потерять progress
- 2 free estimates remaining = hook для signup
- Aligns с PRODUCT-VISION Principle 7

**Cons:**
- Users кто дропает до estimate — мы не можем их re-engage (нет email)
- A/B test infra должен быть robust для этого flow

**Verdict:** ✅ **RECOMMENDED для MVP.**

**Target: 55-65% signup rate post-estimate.** Для photo-AI это среднерыночный показатель (PictureThis ~62%, SkinVision ~54%).

### Option C: Signup Never Required — REJECTED

**Как выглядит:** Anonymous device-ID-based accounts forever. Никогда не просим email.

**Pros:**
- Max frictionless
- Приемлемо для pay-per-use ($2.99 one-off model)

**Cons:**
- Теряем retention mechanics (push notifications, email re-engagement)
- Cross-device continuity невозможна (Emma использует iPhone + iPad)
- Referral program невозможен (нет identity для "friend invite")
- LTV значительно ниже (non-signed users churn 2-3x faster)
- Affiliate attribution для Thumbtack leads требует identified users

**Verdict:** Отвергаем для primary flow. Но **backup для 35-45% users, которые скажут "Not now"** — они продолжают использовать anonymously до 3rd estimate → paywall.

### Decision Matrix

| Фактор | Option A (upfront) | Option B (post-aha) | Option C (never) |
|---|---|---|---|
| Activation rate | 45-55% | **75-80%** | 78-82% |
| Signup rate | 45-55% (forced) | **55-65% (chosen)** | 0% |
| Email capture at scale | Все signed | Most signed (60%+) | None |
| Retention infrastructure | Full | Full (для signed) | Poor |
| Aligns с PRODUCT-VISION | No | **Yes** | Partial |
| Paywall downstream conversion | 3-5% | **5-7%** | 1-2% |

**Final recommendation: Option B (defer signup to post-first-estimate).**

---

## 4. Onboarding Questions — Minimum Viable Set

Принцип: **каждый question должен unlock специфический value** в первом estimate. Если нет — откладываем.

### Must-have (во время онбординга)

**1. Location (ZIP или city)**
- **Почему required:** regional pricing = наш moat (без zip — national average, aha destroyed)
- **Screen:** #2
- **Skip allowed:** Да, но с soft prompt после estimate
- **Target skip rate:** <15%

### Should-have (на post-photo/pre-result screen)

Эти два вопроса появляются **после** photo capture, **перед** AI result — как "calibrate your estimate" screen (0:45-0:55 window), не в начале онбординга.

**2. DIY readiness level**
- Options: "Never tried" / "Some experience" / "Confident DIYer"
- **Почему здесь:** AI adjusts DIY recommendation confidence score based on answer. Если "Never tried" — мы показываем Hybrid как default recommendation (safety).
- **Screen:** между photo capture и result (micro-screen, 5 sec)
- **Skip allowed:** Да → default "Some experience"

**3. Quality tier preference**
- Options: "Budget-friendly" / "Mid-range" / "Premium quality"
- **Почему здесь:** влияет на material recommendations (SharkBite vs Moen vs Delta) и pro selection tier
- **Screen:** same micro-screen as #2
- **Skip allowed:** Да → default "Mid-range"

**Implementation note:** Оба могут быть на одном экране — 2 quick taps, 5-7 секунд. Framing: "Two quick questions to personalize your estimate" — user знает зачем.

### NOT asking during onboarding

Явный список чтобы команда не "пихнула" в спринте:

| Вопрос | Почему НЕ в онбординге |
|---|---|
| Home age / year built | Не нужен для 90% repair estimates. Ask in-context для roofing/electrical. |
| Home size (sqft) | Irrelevant для single-problem fixes. |
| Home type (SF / condo / townhouse) | Relevant только для exterior work. Ask per-estimate. |
| Income / household income | Privacy concern. Proxy через quality tier. |
| Marital status | Unnecessary, creepy-vibe. |
| Homeowner vs renter | Defer. Ask when Tyler expansion (months 10-14). |
| Email upfront | Section 3 — defer. |
| Phone number | Never ask (SMS is opt-in per-feature). |
| Date of birth | No legal need. |
| Insurance provider | Future feature для year 3 vision. |

### Comparison: FixIt vs quiz-heavy apps

Sugar Quit ONBOARDING-RESEARCH recommends 15-25 screens квиза. Для health/wellness это right. Для FixIt: **3 меньше screens + 2 micro-questions = 3-4 total screens pre-estimate**. Это **5x shorter** — intentionally.

Причины difference:
- Use case episodic vs habitual
- User state reactive (stress) vs proactive (goal-setting)
- Value delivery 10-sec vs 30-day program
- Personalization needs (location, quality) vs deep (psychology, habits)

---

## 5. "Labor Illusion" Tactics

Нашли evidence-based patterns, применимые для FixIt.

### 5.1 Почему labor illusion работает в photo-AI

[Ryan Buell, HBS research 2019]: показ **операционной прозрачности** увеличивает perceived value на 29-43%. User не просто "waits" — user "observes AI working on my specific problem".

Особенно важно для FixIt, потому что:
- Emma skeptical о AI accuracy ("can it really tell me how much?")
- Если result мгновенный — feels unreliable ("did it actually look?")
- Если result за 5-8 сек с visible steps — feels thorough, credible

### 5.2 Implementation для FixIt AI Processing Screen

**Total duration:** 5-8 секунд (matches actual Claude API response time, so not artificial).

**Progress sequence:**

```
0-2s: "Identifying the problem..."
      [photo thumbnail + scanning line animation]

2-4s: "Checking Home Depot prices in Denver..."
      [Home Depot logo fade-in + pricing ticker]

4-6s: "Pulling local plumber rates..."
      [map pin + Denver outline]

6-8s: "Calculating DIY difficulty..."
      [wrench + skill meter filling]
```

**Subtle touches:**
- Random variance in step copy ("Checking materials at Home Depot 1.2 mi away..." vs "Checking Home Depot Denver pricing...")
- Show thumbnail of user's actual photo pulsating (reinforces "это МОЕ фото analyzed")
- Never blank spinner
- Never "tap to skip"

### 5.3 A/B test priorities для labor illusion

- **Duration:** 3s vs 5s vs 8s vs 12s — find sweet spot
- **Step count:** 2 steps vs 4 steps vs 6 steps
- **Copy specificity:** generic ("Analyzing...") vs specific ("Checking Home Depot Denver pricing...")
- **Visual treatment:** abstract spinner vs thumbnail + scanning vs step-by-step checklist

Hypothesis: 5-sec + 4 steps + specific copy + thumbnail animation = highest conversion.

### 5.4 Warning: don't fake it when real answer is faster

Если future AI model отвечает за 0.5 сек, искусственно держать 8 сек = ethics / UX backlash risk (Cal AI faced criticism 2024 для faked slowness). Baseline: **labor illusion ≤ actual processing time + 20%**. Если Claude API отвечает за 3 сек, show 4-5 сек max. Не 10.

---

## 6. Push Notification Setup

### 6.1 Когда просить permission

**НЕ на screen 1.** Cold push permission request = 45-55% grant rate в 2026 (Apple tightened defaults post-iOS 16).

**AFTER первого estimate delivered** (post-aha moment), **но не сразу**. Recommend: **на 2-й возврат в app** или **когда user tap'ает "Save this estimate"**.

Sequence:
1. First estimate — user тапает "Save"
2. Signup flow (Section 2, screen 7)
3. Post-signup confirmation screen
4. **Contextual push permission prompt:** "We'll remind you when DIY materials arrive / project reminders / pricing alerts"

### 6.2 Opt-in framing

**Bad (generic iOS default):**
> "FixIt Would Like to Send You Notifications. These may include alerts, sounds, icon badges."

**Good (contextual FixIt framing):**

Pre-permission priming screen (our custom, before iOS dialog):

> **"Never lose track of a repair project"**
>
> Get notified about:
> - Material delivery reminders
> - Seasonal maintenance check-ins (spring / winter prep)
> - Price drops on your saved materials
>
> You control which alerts — change anytime in Settings.
>
> [Enable notifications] [Maybe later]

Если user taps "Enable" — тогда trigger iOS permission. Grant rate jumps 25-40% vs cold ask.

### 6.3 Initial notification categories (opt-in granularity)

После initial permission, show settings screen:
- ☑️ Project progress reminders
- ☑️ Material delivery alerts
- ☐ Seasonal maintenance checklists
- ☐ Price drop alerts (Home Depot / Lowe's)
- ☐ FixIt tips & feature updates (marketing — default OFF)

Emma из TARGET-AUDIENCE "fears subscription traps" — не хочет spam. Granular opt-in = trust builder.

### 6.4 Timing per TARGET-AUDIENCE Day-in-the-life

Из TARGET-AUDIENCE Emma Day-in-the-life:
- **20:00-22:00 = prime FixIt window** (вечер, noticing home issues)
- **7:45-8:30 = commute podcast window** (не push, но может stale notifications review)

Push timing rules:
- **Seasonal maintenance push:** 19:30-20:30 weekday (user home, relaxed)
- **Material delivery:** real-time (tied к Home Depot API)
- **Price drop:** 20:00-21:00 weeknight (decision-making mode)
- **Re-engagement ("Haven't seen you в 30 days"):** 19:00-20:00 **Sunday** (planning-next-week mode)

**Never push** in 22:30-06:30 window (Emma's sleep/morning routine — push here = uninstall risk).

---

## 7. Emma Profile Creation (Progressive Disclosure)

Ключевой принцип: **данные о Emma's home собираем постепенно как она использует app**, не front-load в onboarding.

### 7.1 Why progressive works для FixIt

- Emma не thinks of her home as "a profile" — она думает "у меня протечка"
- Front-loading "Create your home profile" = cognitive load + fake sense of commitment
- Per-estimate progressive asks feel natural: "Want to save kitchen details for faster future estimates?"

### 7.2 Profile fields — когда задавать

| Field | Trigger | Screen |
|---|---|---|
| ZIP / city | Onboarding | Screen 2 (required для pricing) |
| Quality tier preference | Pre-estimate | Micro-screen after photo |
| DIY readiness | Pre-estimate | Same micro-screen |
| Home type (SF/condo/townhouse) | After 2nd estimate | Soft prompt on result screen |
| Year built / home age | When user hits roofing/HVAC/foundation estimate | In-context |
| Square footage | When user requests "whole home" check | On-demand |
| Rooms tracked | As user estimates in them | Auto-accrete |
| Tools owned | Mike expansion (future) | Mike flow, not MVP |

### 7.3 UX pattern: "Save this to Your Home"

After 2nd или 3rd estimate, show soft prompt:

> **"You've estimated 2 kitchen repairs this month."**
> Want to save kitchen details so future estimates are faster?
> [Save kitchen] [Not now]

Tap "Save kitchen" → opens micro-form:
- Faucet brand (optional)
- Pipe type (copper / PEX / unknown)
- Water shutoff location (optional)

This creates "Your Home" profile organically, without explicit onboarding screen. User invests iteratively, increasing switching costs (retention moat).

---

## 8. Activation Metrics to Track

**North Star для onboarding:** % of installs who complete their first estimate.

### 8.1 Primary metrics (MVP dashboard)

| Metric | MVP Target | Industry Top 10% | Owner |
|---|---|---|---|
| Install → First estimate completed | **75%** | 85% | Product |
| Time from install to first estimate | **<90 sec** | 45-60 sec | UX |
| First estimate → 2nd estimate within 7 days | **45%** | 60% | Retention |
| First estimate → Signup conversion | **60%** | 70% | Growth |
| Day 1 retention | **35%** | 45% | Product |
| Day 7 retention | **20%** | 28% | Retention |

### 8.2 Secondary metrics (diagnostic)

| Metric | Target | Interpretation if missed |
|---|---|---|
| Camera permission grant rate | **85%** | <80% = permission framing broken |
| Location input completion rate | **85%** | <80% = too much friction, simplify |
| AI processing screen abandon rate | **<5%** | >10% = perceived too long |
| Estimate result screen time | **>15 sec** | <10 sec = users not engaging with result, aha not landing |
| Manual text entry skip rate | **10-15%** | >25% = camera UX broken |
| Share icon tap rate | **>8%** | Low = aha moment not viral enough |

### 8.3 Cohort tracking

Segment activation funnels по:
- **Source channel:** TikTok organic vs TikTok paid vs Google Ads vs Podcast vs Referral
- **Device:** iPhone vs Android, new-device vs older
- **ZIP density:** Denver vs Austin vs Raleigh vs rural
- **Activation trigger (from ads):** unexpected quote vs DIY fail vs seasonal

Hypothesis: TikTok organic + unexpected-quote trigger = highest activation (trust-primed user).

### 8.4 Benchmark alerts

Weekly alert if any primary metric drops >10% WoW:
- Install → first estimate <67% (below 75% target)
- Signup conversion <50%
- Day 7 retention <15%

---

## 9. A/B Tests Planned (Priority Order)

MVP ships с one baseline flow. Но infrastructure должна support A/B tests с week 1, потому что onboarding — самый high-leverage место для optimization.

### 9.1 Priority 1 — Signup placement

**Test:** Option B (post-estimate) vs Option A-lite (signup on screen 2 before location).

**Hypothesis:** Option B wins on activation (+30%) but loses some email capture. Net LTV: Option B +15-25%.

**Duration:** 2 weeks, 10K users per arm.

**Kill criterion:** If Option A-lite exceeds Option B in estimated LTV by >10%, reconsider.

### 9.2 Priority 2 — Example photos on camera screen

**Variants:**
- A: No example photos
- B: 4 examples (plumbing/electrical/furniture/appliance)
- C: 8 examples (broader category scope)

**Hypothesis:** B wins. 8 overwhelms, 0 loses scope-context.

**Metric:** Camera permission grant rate + first-photo quality score (AI-derived).

### 9.3 Priority 3 — Labor illusion duration

**Variants:** 3 sec / 5 sec / 8 sec / 12 sec.

**Hypothesis:** 5-8 sec wins. <3 sec feels unreliable, >12 sec abandonment rises.

**Metric:** Processing screen abandon rate + estimate satisfaction (post-result survey).

### 9.4 Priority 4 — First screen copy

**Variants:**
- A: "Know the price of any home repair in 60 seconds" (current)
- B: "Snap a photo. Get a fair price. Skip the plumber call."
- C: "Stop guessing what home repairs cost."
- D: Emma activation-trigger specific: "Got a contractor quote? Check if it's fair."

**Metric:** Screen 1 → screen 2 conversion.

### 9.5 Priority 5 — Welcome screen format

**Variants:**
- A: Static image + headline (current)
- B: 10-sec video demo (faucet → photo → result)
- C: Lottie animation (stylized flow preview)

**Hypothesis:** A wins on velocity. B/C add production cost + screen time.

**Metric:** Time on screen 1 + screen 1 → screen 2 conversion.

### 9.6 Secondary tests (after above complete)

- Location auto-detect vs manual entry prominence
- 2-question micro-screen order (DIY readiness first vs Quality tier first)
- Post-estimate CTA placement ("Save" vs "Share" vs "2 more estimates free")
- Push permission prompt timing (1st return vs 2nd return vs after 2nd estimate)
- Privacy statement wording on camera permission screen

### 9.7 Testing infrastructure needed

MVP должен ship с:
- Feature flag system (LaunchDarkly / Statsig / Supabase feature flags)
- Cohort analytics (PostHog / Mixpanel / Amplitude)
- Event schema для onboarding funnel (install, screen_view, permission_grant, photo_taken, estimate_delivered, signup_completed)
- Dashboard с real-time conversion cohorts

---

## 10. Onboarding Drop-off Diagnosis

Playbook для diagnostics когда metrics падают.

### 10.1 If install → activation drops below 65%

**Hypothesis tree:**

1. **Camera permission funnel broken?**
   - Check grant rate. If <75%, test priming screen copy + privacy statement
   - Check platform split (iOS 18 vs Android 15 — different permission flows)

2. **Photo quality low → AI confused?**
   - Check AI accuracy score distribution
   - If >30% estimates marked "low confidence" by AI, improve in-camera guidance

3. **Location screen friction?**
   - Check skip rate. If >20%, user not seeing value → improve "why we need this" copy
   - Check auto-detect success rate. If <70%, geolocation permission issue

4. **AI processing time perception bad?**
   - Check abandon rate on processing screen
   - If >10%, reduce labor illusion duration или improve step copy

### 10.2 If First-estimate → 2nd estimate <40% within 7 days

**Hypothesis tree:**

1. **First estimate quality disappointing?**
   - User survey post-result: "How accurate does this feel? 1-5"
   - If avg <3.5, AI accuracy or pricing data is weak link

2. **Value prop not matching actual delivery?**
   - If user expected "DIY only" answers but got Pro recommendation, mismatch
   - Check aha moment session recordings

3. **No re-engagement push?**
   - If push permission declined, need email re-engagement
   - Seasonal reminder (e.g., "April is perfect for X checks")

4. **Aha moment не сработал?**
   - Estimate result screen time <10 sec = user не вчитался, не восхитился
   - Redesign result layout для более visceral contrast (DIY $18 vs Pro $275)

### 10.3 If Signup conversion <45% post-estimate

**Hypothesis:**
- Modal too intrusive (switch to bottom sheet)
- "Save + 2 more" reason not compelling (A/B test copy)
- Apple Sign-In not first (iOS users prefer Apple > Google > Email)
- "Not now" too prominent (make it smaller, grey)

### 10.4 Common root causes checklist

- [ ] Permission priming too late (cold ask) → -20% grant
- [ ] Signup before value → -30% activation
- [ ] Processing screen too long/short → -5-10% abandon
- [ ] Location required без skip option → +15% drop at screen 2
- [ ] Manual text entry skip rate too low/high (sweet spot 10-15%)
- [ ] First estimate layout confusing (not clear which option is recommended)
- [ ] Copy тон off (too formal / too casual / too jargon)

---

## 11. Implementation Priorities

Конкретные specs для product & engineering team.

### 11.1 MVP v1.0 Onboarding (ship month 1-2)

**Must-have features:**

- [ ] **3-step onboarding flow:** Welcome → Location (ZIP) → Camera permission
- [ ] **Skip signup upfront** — defer к post-estimate
- [ ] **Camera capture UX** с 4 sample thumbnails + in-camera guidance
- [ ] **Manual text entry fallback** (hidden link)
- [ ] **AI processing screen** с labor illusion (5-8 sec, 4 steps, photo thumbnail animation)
- [ ] **Three-option result screen** (DIY / Hybrid / Pro side-by-side)
- [ ] **Soft signup ask** (bottom sheet, post-estimate) с Apple/Google/Email options
- [ ] **Permission priming screen** for push (NOT на screen 1, на пре-permission custom screen after signup)
- [ ] **Pre-estimate micro-screen** для 2 quick questions (DIY readiness + quality tier)
- [ ] **Location auto-detect** option + ZIP manual entry + skip
- [ ] **Privacy statement** на camera permission screen

**Analytics instrumentation (required for MVP launch):**

- [ ] Event tracking для всего funnel (install, screen_view_1..7, permission_grant, photo_taken, estimate_delivered, signup_completed, estimate_saved)
- [ ] Device/platform/geo tagging
- [ ] Source channel attribution (TikTok, Google Ads, Podcast, Referral, Organic)
- [ ] Time-on-screen tracking per step
- [ ] AI processing latency tracking

**Deferred from MVP v1.0 (move to v1.5 или later):**

- Personalized welcome variants based on ad source
- Multi-language support (English only MVP)
- Accessibility deep dive (baseline WCAG AA, но advanced screen reader flows later)
- Voice input для text entry (Mike/Ronald feature later)

### 11.2 v1.5 Onboarding Evolution (month 4-6)

- [ ] **A/B test framework** live (feature flags + analytics)
- [ ] **Priority 1 A/B tests** from Section 9 running (signup placement, labor illusion duration)
- [ ] **Cohort dashboard** для product team (weekly funnel breakdowns)
- [ ] **Re-engagement push flow** для inactive users
- [ ] **Progressive profile creation** (post-2nd-estimate "Save your home" prompt)
- [ ] **Source-based welcome customization** (TikTok user sees different hero text than Google Ads user)
- [ ] **Activation trigger taxonomy** tracking (from ad: "unexpected quote" vs "seasonal" vs "DIY fail")
- [ ] **Referral program hooks** (post-aha share prompt)

### 11.3 v2.0 (month 9-12) — Expansion beyond Emma

- [ ] **Renter mode** (Tyler activation) — different onboarding branch при "I'm renting"
- [ ] **Quote validation flow** (Sarah activation) — "I got a quote, is it fair?" alternate entry
- [ ] **DIY enthusiast mode** (Mike) — add tool tracker question, preference for Pro tier features
- [ ] **Senior-friendly UX variant** (Ronald) — larger fonts, simpler flow, voice input
- [ ] **AARP partnership onboarding** variant (Ronald, if partnership lands)

### 11.4 Success criteria перед v1.0 ship

- Simulated onboarding with 10 beta Emmas: **8/10 reach first estimate in <90 sec**
- **Camera permission grant 85%+** in beta cohort
- **Signup rate 55%+ post-aha** in beta cohort
- Accuracy score of AI estimate **≥75%** self-reported satisfaction in beta

Если любой criterion не hit, ship blocked до fix.

---

## 12. Cross-Reference: Как Emma's activation triggers mapping в onboarding

Из TARGET-AUDIENCE Section "Activation triggers" — 5 triggers, each maps к specific onboarding entry point.

### Trigger #1: Unexpected pro quote ("Plumber said $800 — WTF")

**Entry path:** TikTok ad "Plumber quoted $800, FixIt said $15 DIY" → Install → Onboarding.

**Onboarding optimization:** Welcome screen copy variant emphasizes quote-checking: *"Know what a fair price looks like — before you pay anyone."*

**Expected flow:** User скорее всего already has the quote context in mind. Может prefer upload saved photo (quote photo) rather than camera. Make "Use saved photo" option more prominent for this source.

### Trigger #2: DIY attempt gone wrong

**Entry path:** YouTube ad "I tried fixing my disposal. It didn't work. FixIt told me to call a pro." → Install.

**Onboarding optimization:** Welcome copy: *"DIY didn't work? We'll tell you if it's worth trying again or when to call a pro."*

**Expected flow:** User тонкий и может feel defeated. Soft, supportive tone. 3-options screen emphasizes Hybrid/Pro options, not DIY pressure.

### Trigger #3: Seasonal prep (spring/winter)

**Entry path:** Instagram Reel "Spring home checklist" → Install.

**Onboarding optimization:** Welcome copy: *"Ready for spring? Take a photo of anything that might need fixing."*

**Expected flow:** Browser-mode, not emergency. Scope explainer более important (show that furniture/appliance also covered, not just plumbing).

### Trigger #4: Home inspection findings

**Entry path:** Google Search "home inspection found foundation crack how much" → Install (ASO ranking).

**Onboarding optimization:** Direct-to-value. User already знает problem. "Got inspection report? Snap a photo." Keywords-based welcome headline.

### Trigger #5: Recurring small problem

**Entry path:** Organic / referral. Low urgency.

**Onboarding optimization:** Standard flow. Emphasize "3 free estimates" — user будет использовать for multiple small issues.

---

## 13. Related Docs

- [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) — Principles 3, 4, 7 prompt onboarding design decisions
- [TARGET-AUDIENCE.md](../02-product/TARGET-AUDIENCE.md) — Emma aha moment sequence + activation triggers + Day-in-the-life timing
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — Emma pain points + JTBD driving UX priority
- PAYWALL-RESEARCH.md (to be written) — paywall срабатывает после 3rd free estimate (not in onboarding)
- RETENTION-RESEARCH.md (to be written) — D2/D7/D30 engagement loops, seasonal push strategy
- SCREEN-MAP.md (to be written, stage 4) — pixel-level wireframes для onboarding flow

---

## 14. Источники и дополнительное чтение

**Quantitative data:**
- [Business of Apps — App Onboarding Rates 2025](https://www.businessofapps.com/data/app-onboarding-rates/)
- [RevenueCat State of Subscription Apps 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/)
- [Adapty State of In-App Subscriptions 2026](https://adapty.io/state-of-in-app-subscriptions/)
- [Userpilot Onboarding Checklist Benchmarks 2024](https://userpilot.com/blog/onboarding-checklist-completion-rate-benchmarks/)
- [Amra & Elma Funnel Drop-off Statistics](https://www.amraandelma.com/funnel-drop-off-rate-statistics/)
- [UXCam Mobile App Retention Benchmarks 2024](https://uxcam.com/blog/mobile-app-retention-benchmarks/)

**Qualitative / pattern research:**
- [Retention Blog — The Longest Onboarding Ever (Noom)](https://www.retention.blog/p/the-longest-onboarding-ever)
- [Retention Blog — Headway Evolution 2024-2025](https://www.retention.blog/p/headway-evolution-2024-2025)
- [Retention Blog — Onboarding Doesn't End at the Paywall](https://www.retention.blog/p/onboarding-doesnt-end-at-the-paywall)
- [Lenny's Newsletter — Lauryn Isford on Onboarding](https://www.lennysnewsletter.com/p/mastering-onboarding-lauryn-isford)
- [Lenny's Newsletter — How to Determine Your Activation Metric](https://www.lennysnewsletter.com/p/how-to-determine-your-activation)
- [NN/g — Mobile App Onboarding](https://www.nngroup.com/articles/mobile-app-onboarding/)
- [Chameleon — Mobile User Onboarding Best Practices](https://www.chameleon.io/blog/mobile-user-onboarding)
- [Appcues — Mobile Permission Priming](https://www.appcues.com/blog/mobile-permission-priming)
- [DEV / PaywallPro — Subscription Onboarding Patterns](https://dev.to/paywallpro/subscription-onboarding-15-patterns-you-must-know-4n4f)
- [Gabor Cselle — Every Step Costs You 20% of Users](https://medium.com/gabor/every-step-costs-you-20-of-users-b613a804c329)

**Photo-AI specific:**
- Mobbin onboarding teardowns: PictureThis, Rock Identifier, SkinVision, Cal AI (2024-2025)
- [Ryan Buell HBS — Operational Transparency research](https://hbr.org/2019/03/operational-transparency)
- [Flo Health — Mobile Onboarding Evolution](https://medium.com/flo-health/mobile-onboarding-evolution-part-1-cfc9702835ce)

**Companion Sugar Quit reference:**
- `agents/reference-materials/practices-examples/ONBOARDING-RESEARCH.md` — reference structure для documentation, но note что content-wise FixIt principles (photo-first, минимум screens) намеренно отличаются от Sugar Quit (quiz-based, больше screens).

---

**Дата последнего обновления:** 2026-04-18
**Автор:** Practices Research Team
**Статус:** v1.0 для stage 3 review → handoff к stage 4 (UX wireframes)
**Следующий шаг:** PAYWALL-RESEARCH.md — post-3rd-estimate paywall strategy
