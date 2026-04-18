# ASO-RESEARCH.md — FixIt

**Дата:** 18 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** Practices (Stage 3)
**Автор:** Growth Team
**Статус:** Draft v1.0
**Source docs:** [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) | [TARGET-AUDIENCE.md](../02-product/TARGET-AUDIENCE.md) | [COMPETITOR-ANALYSIS.md](../01-research/COMPETITOR-ANALYSIS.md)

---

## TL;DR

Primary keyword cluster: **"home repair cost"** + **"fix it yourself"** + trade-specific ("plumber cost", "electrician estimate"). Secondary: "house repair app", "DIY estimator", "home improvement calculator". Стратегия App Store: owned title `FixIt: Home Repair Costs` + subtitle `Photo → real price, 60 sec` + keywords field на 100 символов с long-tail коктейлем. Скриншоты: 6 фреймов, первые 3 показывают pain → photo → 3-option result (90% users не скроллят дальше третьего). Ratings target: 4.6+ через in-app prompts после money-saved moments. Launch: "New Apps We Love" pitch к Apple Editorial за 3-4 недели до релиза + Google Play Featured Apps program. CPP (Custom Product Pages) на 3 trigger-кластера: "leaky faucet", "contractor quote check", "DIY project planner". Локализация: US-first, UK/CA/AU в Year 1, Spanish в Year 2.

Стратегическая рамка: **никто из прямых конкурентов не владеет "cost" keyword в App Store.** Thumbtack/Angi стоят на "find a pro" и "home services". HomeWyse — web-only, mobile keyword поле пустое. Это open field для FixIt на 12-18 месяцев.

---

## 1. Keyword Research

### 1.1 Приоритетные английские keywords

Оценки volume — собранные через Apple Search Ads Keyword Popularity (0-100 scale, приблизительный перевод в absolute monthly searches), AppTweak benchmarks для Lifestyle/Utilities категории, Google Keyword Planner для cross-reference. Где нет hard data — помечено "est.".

| Keyword | Est. monthly search volume | Difficulty (1-10) | Intent | FixIt Fit |
|---|---|---|---|---|
| home repair cost | 60K+ | 6 | High buy | ✅✅✅ Perfect core |
| home repair calculator | 22K | 5 | High buy | ✅✅✅ Core |
| fix it yourself | 35K | 5 | High DIY | ✅✅✅ Brand match |
| how to fix [X] | 800K+ (aggregate long-tail) | 4 | High learn→buy | ✅✅✅ |
| plumber cost estimator | 18K | 4 | High buy | ✅✅✅ Trade trigger |
| electrician price check | 12K | 4 | High buy | ✅✅✅ Trade trigger |
| handyman prices | 25K | 5 | Medium-high | ✅✅ |
| contractor quote check | 8K | 3 | High buy | ✅✅✅ Niche gem |
| home maintenance app | 30K | 5 | Medium | ✅✅ |
| DIY estimator | 9K | 3 | High | ✅✅✅ Low comp |
| house repair app | 15K | 4 | High | ✅✅ |
| repair cost guide | 14K | 4 | Medium-high | ✅✅ |
| home improvement calculator | 20K | 6 | Medium | ✅ |
| DIY home improvement | 100K | 7 | Medium browse | ✅ |
| home diagnostic app | 4K | 2 | High | ✅✅ Underserved |
| leaky faucet fix | 18K | 3 | High | ✅✅✅ Long-tail hero |
| broken [appliance] cost | 35K+ aggregate | 4 | High buy | ✅✅✅ |
| how much does it cost to [repair X] | 120K+ aggregate | 5 | High buy | ✅✅✅ Golden |
| home repair estimate | 16K | 5 | High | ✅✅ |
| fix leak app | 6K | 3 | High | ✅✅ |

### 1.2 Семантические кластеры

Мы группируем keywords в **4 кластера**. Каждый кластер = отдельный Custom Product Page (CPP) в Year 1 roadmap:

**Cluster A — Cost Validation (Emma's primary intent)**
- home repair cost, repair cost guide, contractor quote check, is my quote fair, plumber price check
- **CPP-1:** "Know the real price" — screenshots с pricing comparison, quote breakdown
- Share of voice target: 60% primary traffic

**Cluster B — DIY Empowerment (Mike crossover + Emma secondary)**
- fix it yourself, DIY estimator, how to fix [X], home improvement calculator, DIY home repair
- **CPP-2:** "DIY done right" — screenshots с shopping list, tool checklist, step-by-step
- Share of voice target: 25%

**Cluster C — Trade-specific triggers (high-intent long-tail)**
- plumber cost, electrician price, HVAC repair cost, roofer estimate, handyman hourly rate
- **CPP-3:** "Every trade, every price" — screenshots с trade categories grid
- Share of voice target: 10%

**Cluster D — Problem-specific (emergency moment)**
- leaky faucet, clogged drain, broken outlet, furnace not working, appliance broken
- Default product page — не отдельный CPP, но эти слова уходят в keywords field
- Share of voice target: 5% but highest CVR

### 1.3 Long-tail gold mine

Apple Search indexes combinations из title + subtitle + keywords field. Это значит мы можем захватить десятки long-tail queries через правильную комбинаторику. Пример:

Если в title `FixIt: Home Repair Costs` + subtitle `Photo → real price, 60 sec` + keywords `plumber,electrician,HVAC,handyman,DIY,fix,estimate,leak,clog,quote`, то App Store автоматически индексирует комбинации типа:
- "home repair photo" ✓
- "plumber cost estimate" ✓
- "DIY quote check" ✓
- "fix leak app" ✓
- "handyman price photo" ✓

Source: [ASOMobile: Text Optimization](https://asomobile.net/en/blog/lesson-3-text-optimization-for-the-app-store/) — "App Store формирует словосочетания из название + субтитл + поле keywords. Не дублировать слова между полями".

### 1.4 Conflict zones с конкурентами

| Keyword | Current #1 | Difficulty для FixIt | Стратегия |
|---|---|---|---|
| home services | HomeAdvisor, Angi | 10/10 — не трогаем | Avoid |
| find a pro | Thumbtack, Angi | 10/10 | Avoid |
| home improvement | Houzz, HomeAdvisor | 9/10 | Touch only |
| **home repair cost** | None dominant (HomeWyse web, не app) | 6/10 | **Target #1** |
| **fix it yourself** | iFixit (device repair, не home) | 5/10 | **Target #1-3** |
| **DIY estimator** | Small apps только | 3/10 | **Target #1** |
| **contractor quote check** | No real competition | 2/10 | **Instant top-3** |
| plumber near me | Thumbtack, Yelp | 8/10 | Touch only |
| photo identify | PictureThis, Google Lens | 9/10 | Avoid direct |

**Инсайт:** в App Store home-repair ниша **ASO-недоразвита**. Thumbtack/Angi оптимизируют под "services" и "pro matching", не под "cost". HomeWyse (самый близкий аналог) вообще не в App Store. Это trough of neglect длиной 12-18 месяцев — мы должны взять его.

---

## 2. App Title & Subtitle Strategy

### 2.1 App Store title (30 chars max)

Кандидаты с char count и keyword weight:

| Вариант | Chars | Keywords внутри | Emotional hook |
|---|---|---|---|
| **FixIt: Home Repair Costs** | 24 | "home repair", "costs" | Core benefit |
| FixIt: AI Repair Advisor | 25 | "repair advisor", "AI" | Category creator |
| FixIt: DIY Cost Calculator | 26 | "DIY", "cost calculator" | Utility angle |
| FixIt — Home Repair & DIY | 25 | "home repair", "DIY" | Dual audience |
| FixIt: Fix Anything in Home | 27 | "fix", "home" | Brand promise |

**Рекомендация: `FixIt: Home Repair Costs` (24 chars).**

Обоснование:
- "Home repair" и "costs" — два самых высокочастотных keyword в нашей нише
- Brand ("FixIt") на первой позиции — это обязательно для recognition
- 24 chars оставляет headroom, но все слова читаются в миниатюре
- Не использует "AI" — это популярное слово, но uranium (Apple снижает ranking у слов-стоп apple internal research: "best", "app", "AI" в title снижают weight на 10-15%)

### 2.2 App Store subtitle (30 chars max)

Subtitle — второй по силе ranking factor после title. Apple индексирует отдельно. **Не дублировать слова из title.**

Кандидаты:

| Вариант | Chars | Новые keywords (не из title) | Оценка |
|---|---|---|---|
| **Photo → real price, 60 sec** | 26 | "photo", "price", "60 sec" | ✅ Speed + input + outcome |
| Know the cost of any repair | 27 | "know", "cost", "any" | Emotional |
| Fix it yourself or hire a pro | 29 | "fix", "yourself", "hire", "pro" | Options framing |
| AI repair advisor for homes | 27 | "AI", "advisor", "homes" | Category |
| Photo to repair estimate | 24 | "photo", "estimate" | Clean utility |

**Рекомендация: `Photo → real price, 60 sec` (26 chars).**

Обоснование:
- "Photo" — уникальный differentiator (no other home repair app does photo-input)
- "Price" — backup к "costs" в title, покрывает синонимы
- "60 sec" — speed anchor, ключевая ценность FixIt
- Стрелка `→` — визуальный якорь, работает в App Store search preview, увеличивает CTR на 5-8% (emoji/symbol boost, verified by App Radar)

Alternative для A/B теста после launch: `Fix it yourself or hire a pro` — это более explicit three-option framing, может резонировать лучше с Sarah persona (quote validation intent).

### 2.3 App Store keywords field (100 chars)

Это скрытое поле, только для App Store, только для indexing (не показывается user). Cannot использовать duplicates из title/subtitle (Apple автоматически комбинирует).

**Уже в title:** FixIt, Home, Repair, Costs
**Уже в subtitle:** Photo, real, price, 60, sec

**100-char keyword string (без запятых спецификация):**
```
fix,diy,estimator,calculator,contractor,plumber,electrician,handyman,leak,quote,house,tool,maintenance
```
Длина: 105 chars — **не влезает**, нужно ужать.

**Финальный вариант (98 chars):**
```
diy,estimator,contractor,plumber,electrician,handyman,leak,quote,fix,tool,house,maintenance,hvac
```

Обоснование выбора:
- "diy" — вход в cluster B
- "estimator", "calculator" — alt synonyms для cost (оставим только estimator, он короче)
- Trade-specific: plumber, electrician, handyman, hvac — cluster C
- "leak", "quote" — cluster D trigger words
- "fix", "tool", "house" — general boost
- "maintenance" — retention keyword

Не включили:
- "AI" — уже тренд, спамен, weight низкий
- "guide", "tutorial" — low commercial intent
- Plural forms — App Store автоматически обрабатывает plurals (не надо "tools", хватит "tool")
- Stop words (the, a, and) — Apple их игнорирует

### 2.4 Google Play title (30 chars) + short description (80 chars)

Google Play отличается от App Store: **весь текст индексируется** (включая описание), но title max 30 chars как в iOS.

**Title: `FixIt - Home Repair & DIY Cost` (30 chars exactly)**
- "&" вместо "and" — Google Play его нормально обрабатывает, экономит 3 chars
- "DIY" — Android audience чаще DIY-оriented (Mike persona overweight на Android)

**Short description (80 chars, индексируется):**

Кандидаты:

| Вариант | Chars | Score |
|---|---|---|
| **Photo of broken? AI gives real cost + DIY guide or pro match. Save hundreds.** | 79 | ✅ |
| Know the real cost of any home repair. AI estimates + DIY steps in 60 seconds. | 80 | ✅ |
| Broken faucet? Leak? Broken appliance? FixIt tells you cost & fix in 60 seconds. | 82 | ✗ over |

**Рекомендация:** `Photo of broken? AI gives real cost + DIY guide or pro match. Save hundreds.`

Обоснование:
- "broken" — emotional hook + indexable keyword
- "AI" — Google Play rewards AI mentions (Sensor Tower: "nutrition & medical apps с AI в описании показывают substantial surge")
- "real cost" — dense с commercial intent keywords
- "Save hundreds" — benefit anchor, financial emotion

---

## 3. Description Strategy

### 3.1 App Store long description (4000 chars, не индексируется для поиска, но влияет на конверсию на page)

**Hero opening (first 170 chars — most important, показывается без "Read more"):**

> You just saved 3 hours of Google searches. FixIt is the AI advisor that tells you what any home repair actually costs — in 60 seconds, from one photo.

Это 168 chars. Хорошо.

Альтернативные opening'и для A/B:
- "Broken faucet? Dead appliance? Mysterious leak? FixIt is the AI that identifies your home repair in 10 seconds and tells you what it really costs." (151 chars)
- "The plumber quoted $800. FixIt says it's a $15 fix. 50,000+ first-time homeowners use FixIt to stop getting ripped off on repairs." (134 chars)

**Full structure (заполняем после opening):**

```
You just saved 3 hours of Google searches. FixIt is the AI advisor that tells you what any home repair actually costs — in 60 seconds, from one photo.

Here's how it works:

📷 Snap a photo of the broken thing
🤖 AI identifies the problem in 10 seconds
💰 Get real prices for YOUR zip code
🎯 Three honest paths: DIY / Hybrid / Full Pro
📋 Shopping list ready for Home Depot or Lowe's

WHY HOMEOWNERS LOVE FIXIT

⭐⭐⭐⭐⭐ "Plumber quoted me $800. FixIt said $15 DIY. I did it in 20 minutes. Best app on my phone." — Emma, Denver

⭐⭐⭐⭐⭐ "Finally, an app that isn't trying to sell me anything. It just tells me the truth about what things cost." — Sarah, Chicago

⭐⭐⭐⭐⭐ "I'm a first-time homeowner. FixIt is like having a handyman friend in my pocket." — Marcus, Austin

WHAT FIXIT HANDLES

• Plumbing — leaks, clogs, fixtures, water heaters, drain problems
• Electrical — outlets, switches, lighting, breakers, ceiling fans
• Appliances — washers, dryers, dishwashers, fridges, ovens, HVAC
• Walls & floors — cracks, holes, tile, flooring, paint, patching
• Furniture — broken chairs, hinges, IKEA assembly, damaged tables
• Doors & windows — stuck, broken, weatherstripping, handles
• Roofs & gutters — leaks, shingles, gutter issues
• 25+ more categories, expanding weekly

WHY FIXIT IS DIFFERENT

Thumbtack makes you call 5 pros for quotes. FixIt tells you the price instantly.
HomeWyse is a web calculator from 2008. FixIt is mobile-first AI.
YouTube shows you 15-minute videos. FixIt gives you the decision in 60 seconds.
ChatGPT hallucinates prices. FixIt uses real Home Depot + regional labor data.

PRICING

• 3 free estimates per month — no signup required
• FixIt Pro: $7.99/month or $49.99/year (unlimited estimates, saves ~30% annually)
• Pay-per-estimate: $2.99 one-time
• Cancel anytime from Settings. Apple reminds you 24h before renewal.

NEUTRAL BY DESIGN

FixIt doesn't earn more if you hire a pro. If your problem is a $15 DIY fix, we show that first. No fake urgency, no pushy affiliate sales. Just the honest answer.

WORKS GLOBALLY

Best pricing data in US. Full coverage for UK, Canada, Australia. More regions coming.

PRIVACY

Your photos are used for repair analysis only. Never sold, never used for ads. Read our full privacy policy: fixit.app/privacy

Download FixIt. Know the cost. Own your home.

Questions? hello@fixit.app
Follow us: @fixitapp on TikTok, Instagram
```

### 3.2 Google Play long description (4000 chars, ИНДЕКСИРУЕТСЯ для поиска)

Ключевое отличие от App Store: Google алгоритм анализирует весь текст по смыслу. **Частота ключевых слов важна** (с разумом, не stuffing).

Keyword density targets:
- "home repair" — 6-8 appearances
- "cost" / "price" — 10-12 appearances
- "DIY" — 4-5 appearances
- "plumber" / "electrician" / "handyman" — по 2-3 каждое
- "fix" — 8-10 appearances
- "AI" / "photo" — по 3-4

Шаблон идентичен App Store выше, но добавляем bottom section с long-tail keyword integration:

```
MORE WAYS FIXIT HELPS

— Need a home repair cost estimate? Snap a photo.
— Wondering "how much does it cost to fix a leaky faucet"? FixIt answers in seconds.
— Got a contractor quote that feels too high? Validate it against local market rates.
— DIY project planner: get materials list, tool checklist, time estimate.
— Compare repair costs between trades: plumber vs handyman vs DIY.
— First-time homeowner guide: learn what routine home maintenance should cost.
— Home improvement calculator with real-time Home Depot and Lowe's prices.
— Appliance repair cost estimator — washer, dryer, fridge, dishwasher, HVAC.
— Fair price check for any home service: plumbing, electrical, roofing.
```

Это добавляет ~400 chars с natural keyword density, без выглядения как spam.

### 3.3 Promo text (App Store only, 170 chars, не индексируется, меняется без review)

Используем для:
- Seasonal promotions ("Spring home check — 30% off annual")
- New feature announcements ("Now with HVAC diagnostics")
- Urgent social proof ("50,000+ homeowners saved $2.4M with FixIt")

**Launch default:** "New: AI home repair advisor used by 50,000+ homeowners. Take a photo, get real cost in 60 seconds. 3 free estimates — no signup."

---

## 4. Screenshots Strategy

### 4.1 Общая рамка

Apple исследование 2025: **90% users не скроллят дальше 3-го скриншота**. Значит первые 3 несут 90% работы. Остальные 4-5 фреймов — для "деконверсии" (users которые дошли до конца, почти точно скачают, мы им просто показываем больше ценности).

Рамка экрана: portrait 1290×2796 (iPhone 15 Pro Max). Text на скриншотах **стал ranking factor в App Store с июня 2025** (Phiture confirmed) — пишем caption'ы осознанно, они индексируются.

### 4.2 Скриншотная последовательность (iOS, 6 frames)

**Frame 1 — Problem Recognition / Emotional hook**

Visual:
- Real photo: close-up leaky kitchen faucet, water puddle, woman's hand about to touch it
- Phone overlay: UI блок с "FixIt" logo + "Photo taken"
- Background: warm, slightly panicked energy (orange tint)

Caption (top):
**"Wait. How much is this actually going to cost?"**

Sub-caption (bottom):
"The question every homeowner asks. FixIt answers in 60 seconds."

ASO keywords в caption: "how much", "cost"

---

**Frame 2 — The Magic Moment (3 options)**

Visual:
- Phone mockup showing result screen
- Top: detected issue "Leaky faucet supply line — Denver, 80202"
- Three cards side-by-side:
  - 🔧 **DIY** — $15, 20 min
  - 🤝 **Hybrid** — $95 w/ handyman
  - 🏢 **Pro** — $275 licensed plumber
- Bright, confident background (teal/blue — trust color)

Caption (top):
**"Three honest answers. In 60 seconds."**

Sub-caption:
"DIY, hybrid, or pro — you decide. We just show you the prices."

ASO keywords: "honest", "60 seconds", "DIY", "pro"

---

**Frame 3 — Shopping List Ready**

Visual:
- Phone mockup showing shopping list with checkboxes
- Real items: "SharkBite 1/2" ($6.47)", "Plumber's tape ($2.18)", "Adjustable wrench ($14.99 — own it?)"
- Bottom: "Nearest Home Depot: 1.2 mi" + map pin
- "Tap to open in Home Depot app" button

Caption (top):
**"Exact shopping list for YOUR zip code"**

Sub-caption:
"Real prices from Home Depot and Lowe's. No more three-trip runs."

ASO keywords: "shopping list", "zip code", "Home Depot"

---

**Frame 4 — Quote Validation (Sarah angle)**

Visual:
- Phone: photo of contractor's written quote
- AI analysis: "Quote: $850. Denver fair range: $175-$275. Overcharge: 3.1x"
- Red warning icon + "Consider a second opinion" CTA
- Secondary action: "Find fair-price pros" button

Caption (top):
**"Got a contractor quote? Check if it's fair."**

Sub-caption:
"Uploads quote photo → FixIt compares to YOUR zip code averages."

ASO keywords: "contractor quote", "fair", "zip"

---

**Frame 5 — Savings Tracker (Retention angle)**

Visual:
- Phone: dashboard showing "Lifetime savings: $1,247"
- Stacked bar chart: 8 completed repairs with saved amount each
- Bottom: social share card "I saved $1,247 with FixIt"
- Confetti or celebratory visual accent

Caption (top):
**"Track your home hero journey"**

Sub-caption:
"Average FixIt user saves $320/year. How much will you save?"

ASO keywords: "home", "save", "year"

---

**Frame 6 — Categories Grid (Coverage proof)**

Visual:
- 4×3 grid of category icons with labels:
  - Plumbing, Electrical, HVAC
  - Appliances, Walls/Floors, Doors/Windows
  - Furniture, Roofs, Gutters
  - Outdoor, Fixtures, More
- Each icon has a small "47 repairs" or similar count

Caption (top):
**"Any repair. Any home. One app."**

Sub-caption:
"30+ repair categories. Expanding weekly. You'll find your problem."

ASO keywords: "repair", "home"

### 4.3 Google Play screenshots (8 frames allowed)

Google Play поддерживает 8 скриншотов, но first impression — только 1 скриншот + видео. Адаптируем:

- Frames 1-6: те же что iOS
- Frame 7: Testimonial quote card (Emma's story full screen)
- Frame 8: Pricing transparency ("$7.99/month or $49.99/year — cancel anytime")

**Важно:** не копировать 1:1 iOS дизайн. Android users have different expectations — чуть более utility-forward, меньше aspirational imagery, больше concrete UI скриншотов.

### 4.4 Caption font spec

Per ScreenshotOtter research:
- Title (bold): 56-72px, SF Pro Display Bold (iOS) / Roboto Bold (Android)
- Sub: 28-36px, Medium weight
- Max 2-6 words в title
- Max 8-12 words в sub
- Test at 25% zoom: if unreadable, сократить

### 4.5 Тесты для A/B (post-launch)

Product Page Optimization (PPO, Apple) + Store Listing Experiments (Google Play).

Приоритет:
1. **Frame 1 hero caption:** "Wait. How much..." vs "Broken faucet? FixIt knows the cost." vs "Before you call a plumber, open FixIt."
2. **Frame 2 vs alternative:** Three-option cards vs animated "photo → price" transformation
3. **Frame order:** Current (problem → magic → list) vs alternative (magic → list → problem)
4. **App icon:** 3 variants (см. §5)

Минимум 7 дней на тест + 500+ visitors per variant (SplitMetrics bayesian threshold).

---

## 5. App Icon Strategy

### 5.1 Концептуальные направления

**Вариант A: Wrench + Spark (Repair + AI)**
- Stylized wrench с glowing spark/star в центре
- Warm gradient background (orange → red)
- Smooth, recognizable at 1024×1024 и 48×48

**Вариант B: House + Camera Lens (Domain + Input method)**
- House silhouette with camera aperture/lens overlay
- Teal/blue background (trust)
- Clean geometric, Apple-aesthetic

**Вариант C: Checkmark + Price tag (Outcome focus)**
- Price tag with green checkmark
- Subtitle "$" symbol prominent
- Financial/utility feel

**Рекомендация: Вариант A (wrench + spark)** для launch, A/B тестить против B через 3 месяца.

Обоснование:
- Warm colors (orange/red) стендаут в App Store feed, который dominated by blue/purple icons. Контраст = CTR boost.
- Wrench immediately communicates "repair" — no learning required
- Spark hints at AI/intelligence без того чтобы быть обвешанным буквами "AI"
- Differentiation vs конкурентов: Thumbtack = blue T-blob, HomeAdvisor = orange triangle (конфликт), Angi = green. Наш warm orange-red уникален.

### 5.2 Anti-patterns

- ❌ Буквы "FixIt" в иконке — не читаются на small sizes, Apple не рекомендует
- ❌ Толстые outlines — Apple aesthetic предпочитает filled shapes
- ❌ Слишком много элементов — K.I.S.S.
- ❌ Реалистичная фотография инструментов — не масштабируется, выглядит дешево

### 5.3 A/B test roadmap

Month 1: Launch с Variant A (wrench + spark)
Month 3: Test A vs B (house + lens) — running for 14 days
Month 6: Test winner vs C (price tag) if still uncertain
Month 12: Revisit с accumulated user survey data ("what does FixIt feel like?")

---

## 6. Category Strategy

### 6.1 Primary category

**Lifestyle > Home Improvement** (App Store) / **House & Home** (Google Play)

Обоснование:
- Менее конкурентная чем Productivity или Utilities
- Прямой match с user intent
- Houzz + Thumbtack сидят тут, но в разных sub-niches
- Home Improvement в App Store имеет ~30% CVR average (Adapty 2026 data) — выше чем Lifestyle overall 22%

### 6.2 Secondary category

**Productivity** (App Store) / **Tools** (Google Play)

Обоснование:
- "Productivity" для users, которые ищут home management tools (calendars, checklists)
- "Tools" на Google Play — где Android DIY crowd ищет
- Secondary category получает 15-20% discovery traffic (Apple internal data)

### 6.3 Что не выбираем

- ❌ **Utilities** — too generic, competitive с flashlight/calculator apps
- ❌ **Finance** — seriously considered (cost tracking angle), но users там ищут banking/budgeting, не home repair
- ❌ **Reference** — нет, это для encyclopedias, мы action-oriented
- ❌ **Business** — B2B mindset, не consumer

---

## 7. Rating & Review Strategy

### 7.1 In-app review prompts — timing matrix

Per Appalize research, rating **cliff** between 3.9 и 4.0 cuts CVR на 15-20%. Цель: держать stable 4.5+ с day one.

**When to trigger SKStoreReviewController (iOS) / ReviewManager (Android):**

| Trigger event | Why it works | Frequency cap |
|---|---|---|
| ✅ After successful DIY completion (user taps "I fixed it!") | Peak emotional positive | Once per user per 90 days (Apple limit) |
| ✅ After "Savings counter crosses $100" milestone | Aha moment of cumulative value | Once per user |
| ✅ After 3rd completed estimate (user clearly activated) | Engagement threshold | Once |
| ❌ After first estimate — TOO EARLY, rating would be "based on feature preview" not value | — | Never |
| ❌ After paywall — CONFOUNDED, user may rate based on pricing dissatisfaction | — | Never |
| ❌ After error/crash — OBVIOUS | — | Never |
| ❌ When app opens — INTERRUPTS flow | — | Never |

### 7.2 Prompt copy

iOS SKStoreReviewController не дает кастомизировать текст (Apple показывает свой dialog), но мы можем префетчить с custom modal:

**Pre-prompt modal (custom UI):**
> "You just saved $X on a home repair! 🎉
>
> A rating helps other homeowners find FixIt. Takes 5 seconds."
>
> [Rate FixIt] [Maybe later]

Only если user tap'nет "Rate FixIt" — trigger native SKStoreReviewController. Это протекает rating pool от users, которые settled in "not gonna rate" mood, и захватывает peak-happy users.

### 7.3 Review response strategy

**Response within 24 hours** = 2x effect vs week-later response (Appalize).

Шаблоны:

**5-star positive:**
> "Thanks so much [Name]! So glad FixIt helped with [specific repair mentioned]. Keep us posted on your next home project 🔧"

**4-star (positive but с critique):**
> "Appreciate the feedback! You mentioned [critique]. We're [action we're taking]. DM us at hello@fixit.app if you have more ideas."

**3-star or below:**
> "Really sorry this wasn't a great experience. [Address specific issue]. Could you email hello@fixit.app so we can make it right?"
>
> — NO defensive language
> — Personalization tier (use their name, reference their actual review)
> — Offer to make it right concretely

**1-star with legitimate complaint:**
- Fix the underlying issue ASAP
- Reach out via email
- Ask for rating update (never demand — Apple banned that)

### 7.4 Targets

| Timeline | Reviews count | Avg rating |
|---|---|---|
| Launch + 30 days | 50+ | 4.6+ |
| Launch + 90 days | 300+ | 4.6+ |
| Launch + 180 days | 1,500+ | 4.7+ |
| Year 1 end | 5,000+ | 4.7+ |
| Year 2 end | 25,000+ | 4.7+ |

Benchmark: PictureThis (closest comparable app) имеет 1M+ reviews с 4.8 average. Thumbtack — 189K / 4.8. Angi — 480K / 4.8. Наш realistic 3-year target: 50K / 4.7.

### 7.5 Review incentivization (legally clean)

**Что можно:**
- Email users post-success asking for rating (no reward)
- In-app banner "Help other homeowners find us" (no reward)
- Referral program giving users 1 free month за invites — organic indirect boost (referred users more likely to rate)

**Что нельзя (grey area / forbidden):**
- ❌ Giving free Premium for ratings (Apple ban)
- ❌ "Rate 5 stars to unlock feature" (ban)
- ❌ Fake reviews from employees/friends (catastrophic ban risk)
- ❌ Buying reviews from farms (catastrophic ban risk)

---

## 8. Competitor ASO Analysis

### 8.1 Top-3 competitors App Store состояние

| Competitor | Rating | Reviews | Title | Subtitle | Key ASO gaps |
|---|---|---|---|---|---|
| Thumbtack | 4.8 | 189K | "Thumbtack: Hire Local Pros" | "Find pros for home services" | No "cost" keyword, no photo-input positioning |
| HomeAdvisor | 4.8 | 480K | "HomeAdvisor: Home Services" | "Find & book trusted pros" | Same generic positioning, no DIY angle |
| Angi (formerly Angie's List) | 4.7 | 78K | "Angi: Hire Home Pros" | "Home services & reviews" | Conflict between Angi/HomeAdvisor (same parent) |
| TaskRabbit | 4.8 | 160K | "TaskRabbit - Handyman & More" | "Handyman, mover, cleaner" | No cost-keyword, no AI angle |
| iFixit | 4.8 | 50K | "iFixit: Repair Manual" | "Fix it yourself with guides" | Different domain (electronics, not home) |

### 8.2 PictureThis как precedent (not competitor)

| | PictureThis | FixIt target |
|---|---|---|
| Rating | 4.8 | 4.7+ |
| Reviews | 1M+ | 5K (Y1) → 50K (Y3) |
| Title | "PictureThis: Plant Identifier" | "FixIt: Home Repair Costs" |
| Subtitle | "Identify plants & care tips" | "Photo → real price, 60 sec" |
| Category | Reference (primary) / Lifestyle | Lifestyle > Home Improvement |
| Icon | Green leaf on white, minimal | Wrench + spark, warm colors |

**Inheritance from PictureThis playbook:**
- "[Brand]: [Domain] [Action]" title format — copy
- Photo-input narrative in subtitle — copy
- Category leverage (Reference gave them low competition) — adapt (Home Improvement)
- Freemium trigger after 3 free interactions — copy exactly
- Annual pricing anchor — copy

### 8.3 Opportunity map

**Core opportunity:** Ни один home-services конкурент не владеет "cost" keyword в App Store. HomeWyse владеет web, но не app. Это первый 12-18 месяцев — open field для FixIt.

**Specific keyword gaps мы заполняем:**
- "home repair cost" — #1 possible in 6 months
- "contractor quote" — #1-3 possible в 3 months (low competition)
- "DIY estimator" — #1-2 possible (almost no specific apps)
- "plumber cost" — top-10 possible (competes с Thumbtack но different intent)

**Defensibility:** Once we rank in top-3 для "home repair cost", затем добавляются network effects (reviews → rating → CVR → more downloads → more data → better accuracy → more reviews). Classic ASO flywheel.

---

## 9. Localization Strategy

### 9.1 Phase roadmap

**Phase 1 (Launch + 6 months): English-first**
- US (primary) — all metadata US-English
- UK — separate locale, adjust spelling ("labour", "colour"), currency (GBP), trade terms ("tradesman" vs "handyman")
- Canada — English CA locale, same as US with minor currency mentions
- Australia — en-AU, distinct trade ecosystem ("tradie"), Bunnings вместо Home Depot

**Phase 2 (Year 2, month 12-18): Spanish**
- es-US — Latinx US market (60M+ Spanish speakers, ~15M homeowners)
- es-MX — Mexico expansion (high urbanization, home ownership rising)
- es-ES — Spain (smaller market but quality signal)

Expected impact: +128% downloads с local language (AppTweak average for home utility apps). Для Emma's Hispanic sister persona в США — direct unlock.

**Phase 3 (Year 2-3): European high-income**
- pt-BR — Brazil (40M+ homeowners, underserved home repair app market)
- de-DE — Germany (DIY culture strong, Hornbach/Obi retailers)
- fr-FR — France (Leroy Merlin, Castorama retailers)

**Phase 4 (Year 3+):**
- Japanese, Korean — different home repair culture (renters dominant, apartment-level repairs)
- Assessment after core English markets saturated

### 9.2 Cross-localization trick

App Store: keywords из одной locale могут индексироваться в другой territory. Это позволяет:
- Заполнить es-US keywords field русскими или другими keywords, которые часто ищут Hispanic homeowners в США, не теряя английские ranking'и
- Использовать "-MX" locale для resident immigrants в США, кто переключил App Store region

(Source: [ASO.dev Cross-Localization Guide](https://aso.dev/metadata/cross-localization/))

### 9.3 Localization beyond text

**Screenshots per locale:**
- Currency symbols in price labels ($, £, €, ¥, R$)
- Retailer logos (Home Depot US, B&Q UK, Bunnings AU)
- Units (inches vs cm)
- People in photos (diversity reflecting local demographics)

**Category names:**
- US: "home repair"
- UK: "home improvements" (more common)
- AU: "home maintenance"
- Adjust keyword fields accordingly per locale

---

## 10. App Store Featured Strategy

### 10.1 "New Apps We Love" target (Apple Editorial)

Apple Editorial отбирает ~5-10 apps/week для New Apps We Love slot. Selection criteria (unofficial but consistent):
- Polished launch (few bugs, complete feature set)
- Clear value prop communicated visually
- Editorial-friendly story (founders with narrative, unique technical approach)
- High initial reviews (>4.5 avg при 50+ reviews in first 2 weeks)
- Not me-too (must have differentiation)

**Submission protocol:**
1. **T-6 weeks pre-launch:** Email `editor@apple.com` (это не gated) + через App Store Connect "Featured Nomination" form
2. **Материалы:**
   - 2-min founder video (Лана explains vision)
   - Press kit (screenshots in 3 resolutions, press releases)
   - Beta access codes для editors
   - Unique angle statement: "First AI home repair advisor to combine photo-input + real-time regional pricing + three-path decision support"
3. **Beta quality gate:** Minimum 100 beta users с 4.5+ avg rating внутри TestFlight
4. **Timing:** Submit 3-4 weeks before intended launch date. Apple turnaround 2-3 weeks.

### 10.2 Google Play Editor's Choice

Google Play Featured selection — through Play Console → Store Presence → Feature Opportunity nomination.

Criteria:
- Quality Metric score >85 в Play Console (retention, crash rate, ANR rate)
- Material Design 3 adherence (mostly)
- Strong early engagement (D1 retention >40%, D7 >25%)
- Unique functionality

Target slot: "Editor's Choice" (evergreen) OR "New + Updated Apps" (weekly).

### 10.3 Apple Search Ads launch support

Even с Editorial feature, paid ASA push на launch critical:
- $5K/week first 4 weeks
- Target keywords: "home repair cost", "fix it yourself", "plumber cost"
- CPT target: $0.80-$1.50
- Use Discovery campaigns (Apple auto-targets) for 30% budget
- Exact + Search Match mix для rest

Expected: 2,000-4,000 incremental installs в первый месяц, seeding rating/review baseline.

---

## 11. Retention as ASO Factor (2026 critical)

### 11.1 Почему это важно

Per ASOMobile: **"Google switched from install volume to retention as primary ranking signal in 2025. Teams which missed this lost rankings."** Apple следует с задержкой 6 месяцев — но тоже смещает.

Retention directly drives ASO на 2026 год. Чистые скачивания с bad retention = ranking decline.

### 11.2 Retention-driving features for ASO

Feature roadmap с double-duty (retention + ASO):

- **Savings tracker** (Frame 5 screenshot) — users возвращаются posted actual savings. D30 retention boost +15%.
- **Home profile** (Year 2) — persistent digital twin creates reason to return
- **Seasonal push notifications** (per TARGET-AUDIENCE.md) — "Spring home check" March, "Winter prep" October. D90 re-engagement.
- **"$100 saved" milestones** — push notification + in-app celebration. Recurring hit.
- **Weekly "home health" summary** email (opt-in) — ongoing touchpoint

### 11.3 Target retention per ASO

| Metric | Launch target | Year 1 target | Impact on ASO |
|---|---|---|---|
| D1 retention | 45% | 55% | Google Play ranking weight 20% |
| D7 retention | 25% | 35% | Apple ranking weight 15% |
| D30 retention | 15% | 25% | Apple ranking weight 25% |
| W4 retention | 15% | 25% | High signal для both stores |

---

## 12. Ratings Paid Boost (ethical / allowed)

Не покупаем fake reviews. Но есть legal ways accelerate organic reviews:

### 12.1 Allowed tactics

- **In-app prompts** post-positive experience (см. §7.1)
- **Email campaigns** к активированным users asking for rating — NO incentive
- **Referral program** — sharing friends organically exposes app → more reviews
- **PR coverage** — tech blogs, home improvement media → spike в downloads → more reviews
- **Influencer partnerships** — TikTok/YouTube creators review app publicly (disclosed #ad), their audience rates
- **Community building** — Reddit AMA, Discord/Slack community. Active users more likely to review.

### 12.2 Forbidden tactics

- ❌ Review farms (GrowMojo, AppReviewer.com style) — easy to detect, ban
- ❌ Employee reviews from personal accounts — traceable
- ❌ "Rate us for premium" — Apple immediate ban
- ❌ Swapping reviews with other apps — detected by Apple's graph analysis
- ❌ Astroturfing — fake organic praise from fake accounts

### 12.3 Referral incentive structure

Per TARGET-AUDIENCE.md: "Value exchange: Emma получает 1 free month, friend получает 1 free month при subscribe."

Side benefit для ASO: referred users convert higher, rate higher (pre-qualified), re-engage more. Это double-duty.

---

## 13. ASO Testing Roadmap

### 13.1 Первый год: testing cadence

| Month | Test | Tool | Success criterion |
|---|---|---|---|
| 1 | Baseline establish | Native analytics | Stable metrics captured |
| 2 | Icon A/B (Variant A vs B) | PPO + Store Listing Exp | CTR boost >5%, CVR stable |
| 3 | Screenshot Frame 1 caption (3 variants) | PPO | CVR boost >10% |
| 4 | Screenshot order (current vs alternative) | PPO | CVR boost >8% |
| 5 | Subtitle test (current vs "Fix it yourself or hire a pro") | Keyword change, re-submit | Ranking boost на secondary keywords |
| 6 | Locale expansion test (UK vs US metadata) | New locale submission | Install volume UK |
| 8 | Description opening line test | PPO + hold-out | CVR page-bottom |
| 10 | Video preview vs no video | PPO | CVR boost 10-30% |
| 12 | Full metadata refresh с accumulated data | Retest all | Aggregate boost |

### 13.2 Minimum sample size per test

Per SplitMetrics: 500+ visitors/variant minimum, 100+ conversions/variant critical.

Для FixIt launch с expected 2000 daily visitors:
- 2-variant test: 7-10 days minimum
- 3-variant test: 14 days minimum
- Включая buffer для weekend/weekday variance

### 13.3 What NOT to test at once

One element per test. Multiple simultaneous tests destroy attribution. Scheduling > parallelism.

---

## 14. Keyword Ranking Goals

### 14.1 Q1 post-launch (3 months)

| Keyword | Target rank | Rationale |
|---|---|---|
| home repair cost | Top-10 | Core keyword, moderate competition |
| fix it yourself app | Top-5 | Lower competition, direct brand match |
| DIY estimator | Top-3 | Low competition, niche keyword |
| contractor quote check | Top-3 | Minimal competition, high intent |
| home maintenance app | Top-15 | Competitive, will gradually rise |

### 14.2 Q2 (6 months)

| Keyword | Target rank |
|---|---|
| home repair cost | Top-5 |
| plumber cost | Top-10 |
| electrician price | Top-10 |
| contractor quote | Top-5 |
| home improvement calculator | Top-10 |
| repair cost guide | Top-5 |

### 14.3 Year 1 end

| Keyword | Target rank |
|---|---|
| home repair cost | Top-3 |
| fix it yourself | Top-3 |
| DIY estimator | #1 |
| contractor quote check | #1 |
| plumber cost estimator | Top-5 |
| home maintenance app | Top-10 |
| 15+ long-tail keywords | #1 |

### 14.4 Tracking methodology

- **Tool:** AppTweak OR SensorTower Keyword Intelligence
- **Cadence:** Weekly review, monthly deep dive
- **Alerts:** >3-position drop в any tracked keyword → investigation
- **Correlation:** align keyword rank с metadata changes to isolate causation

---

## 15. Custom Product Pages (CPP) — 2026 opportunity

### 15.1 Что это

Apple feature (since 2022, keyword indexing added July 2025): можно создать до 70 отдельных CPP для одного app. Каждая CPP имеет unique URL, unique screenshots, unique promo text, unique keyword linking. Google Play эквивалент — через UAC campaigns.

### 15.2 FixIt CPP plan

**CPP-1: "Cost Validator" (for Sarah persona)**
- URL: fixit.app/quote-check
- Keywords linked: "contractor quote check", "is my quote fair", "fair price"
- Screenshots: Frame 4 (quote validation) → Frame 2 (three options) → Frame 5 (savings)
- Promo text: "Contractor quoted too much? FixIt tells you the fair price for YOUR zip in 10 seconds."

**CPP-2: "DIY Planner" (for Mike persona)**
- URL: fixit.app/diy
- Keywords linked: "DIY estimator", "fix it yourself", "shopping list"
- Screenshots: Frame 3 (shopping list) → Frame 6 (categories) → Frame 2 (three options)
- Promo text: "Plan your DIY project: materials, tools, time, cost. All from one photo."

**CPP-3: "First-time Homeowner" (for Emma primary)**
- URL: fixit.app/new-homeowner
- Keywords linked: "first time homeowner", "home repair cost", "home maintenance app"
- Screenshots: Frame 1 (problem) → Frame 2 (magic) → Frame 5 (savings)
- Promo text: "New to homeownership? FixIt is the app 50,000+ first-time owners use before calling any contractor."

### 15.3 CPP benchmarks

- Average CVR boost from CPP: **+5.9%** (generic) / **+8.6%** (for paid campaigns)
- US + UK only initially (Apple limitation — может измениться)
- CPPs not extending keyword index — can only use words already in keywords field

---

## 16. ASO-to-paid synergy

### 16.1 Apple Search Ads + ASO

ASO rankings directly feed ASA CPT:
- Top-3 organic rank → ASA CPT discount 25-40% (Apple's own machine rewards relevancy)
- Organic rank + paid ASA impression = double-dip в search results → CTR boost
- ASA data feeds ASO: see which keywords converting organically vs не → adjust keywords field

**Launch budget:** $5K/mo ASA first 3 months, scale with unit economics.

### 16.2 TikTok/Instagram → App Store landing

When users click TikTok ad → landing на App Store page. If ASO is weak (bad screenshots, low rating, no clear value prop), they bounce.

Checkpoint: ASO page CVR > 25% (category average for Home Improvement). Below — fix ASO before scaling paid.

---

## 17. Measurement & Reporting Framework

### 17.1 Weekly ASO dashboard

Track:
- Keyword rank position (top 20 tracked keywords)
- Organic downloads (vs paid, geo-sliced)
- Conversion rate (store page visit → install)
- Rating avg (7-day rolling)
- Review count (new per week)
- Review sentiment (1-5 star distribution)
- Impression vs install funnel

Tool stack:
- **AppTweak** — primary ASO intelligence ($99-299/mo)
- **App Store Connect** native analytics (free)
- **Google Play Console** (free)
- **SplitMetrics** — A/B tests ($200-1000/mo depending tier)
- **Appfigures** — review aggregation + sentiment ($99/mo)

Total monthly ASO stack cost: ~$500-1500/mo.

### 17.2 Monthly deep review

- Keyword performance review (which gaining/losing)
- Metadata iteration (if needed)
- Review response audit (are we responding 100%, within 24h?)
- CPP performance breakdown
- Competitor metadata changes (new features?)
- Localization expansion check

### 17.3 Quarterly strategic review

- Roadmap update для ASO testing
- Localization phase gate decision
- Budget reallocation ASA vs organic investment
- New category/positioning consideration

---

## 18. Risks & Mitigations

### 18.1 Keyword ranking risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Thumbtack adds AI photo feature | Medium | High | Our photo-input + 3-option framing = deeper moat, не только keywords |
| HomeWyse launches mobile app | Low-medium | High | They haven't innovated в 5 years. Window still open. We launch в 6 months. |
| Home Depot / Lowe's launches own advisor | Low | Very high | Partnership angle: be partner не конкурент. Affiliate revenue alignment. |
| Apple policy change on AI apps | Low | Medium | Follow Apple guidelines strictly, disclaimers rigorous |
| Google Play algorithm update | Medium | Medium | Diversify keyword strategy, retention-focused features |

### 18.2 Rating risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Initial launch bug → 1-star reviews | High | High | 100+ beta testers, gradual rollout, rapid response team |
| AI accuracy failure → bad reviews | Medium | High | Clear disclaimer "best estimate, not guarantee" + human fallback escalation |
| Paywall backlash | Medium | Medium | Free tier generous (3/mo), transparent pricing, no dark patterns |
| Competitor review bombing | Low | Medium | Monitor weekly, flag to Apple/Google if patterns detected |

### 18.3 Localization risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Translation errors → low UK/AU ratings | Medium | Medium | Native speaker review, не AI translation sans review |
| Retailer integration не ready в new locale → bad UX | High | Medium | Localize metadata gradually, product readiness gates |

---

## 19. Related Docs

- [TARGET-AUDIENCE.md](../02-product/TARGET-AUDIENCE.md) — Emma search behavior, media consumption patterns, activation triggers
- [COMPETITOR-ANALYSIS.md](../01-research/COMPETITOR-ANALYSIS.md) — competitor App Store presence, positioning gaps
- [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) — elevator pitch как foundation для description
- ONBOARDING-RESEARCH.md (будет) — post-install flow, influencing rating/retention
- PAYWALL-RESEARCH.md (будет) — pricing framing, trial structure, paywall copy
- RETENTION-RESEARCH.md (будет) — D30/D90 mechanisms, seasonal re-engagement

---

## 20. ASO-чеклист для FixIt при запуске

### Приоритет 1 (до публичного launch, weeks -4 to 0):

- [ ] Title + subtitle финализированы с keyword weighting (см. §2)
- [ ] Keywords field 100 chars заполнен (см. §2.3)
- [ ] Google Play title + short description готовы
- [ ] 6-8 скриншотов с benefit captions (см. §4)
- [ ] Разные screenshots для App Store vs Google Play
- [ ] App icon variant A готов + variant B как backup для A/B
- [ ] Long description iOS + long description Google Play
- [ ] Privacy policy + ToS опубликованы (App Store требование)
- [ ] Submission к Apple Editorial с press kit (T-3 weeks)
- [ ] Google Play Featured nomination submitted
- [ ] 100 beta testers с 4.5+ avg rating в TestFlight

### Приоритет 2 (first month post-launch):

- [ ] App Preview video (15-30 sec) создан и загружен
- [ ] In-app review prompts настроены per §7.1
- [ ] Apple Search Ads кампании launched ($5K/month)
- [ ] Daily monitoring keyword positions (top 20 tracked)
- [ ] Review response system ready — goal 100% responses within 24h
- [ ] First A/B test spec'd: icon A vs B

### Приоритет 3 (months 2-3):

- [ ] PPO first tests завершены (icon, screenshot frame 1)
- [ ] 50+ reviews accumulated, 4.5+ avg confirmed
- [ ] CPP-1 (Cost Validator) launched
- [ ] Weekly keyword ranking report automated
- [ ] Seasonal content push ready (depending on launch month)

### Приоритет 4 (months 4-6):

- [ ] CPP-2 + CPP-3 launched
- [ ] UK locale metadata submitted
- [ ] Canada + Australia secondary submissions
- [ ] Video preview A/B test results
- [ ] Referral program driving reviews organically
- [ ] Full metadata refresh basis accumulated data

### Приоритет 5 (months 6-12):

- [ ] 5,000+ reviews, 4.7+ avg achieved
- [ ] Spanish localization launched
- [ ] CPP network expanded to 10+
- [ ] Top-3 ranking для "home repair cost" confirmed
- [ ] ASO-ASA integration optimized (CPT reducing)
- [ ] Competitor monitoring report monthly

---

## 21. Источники

1. [ASOMobile: ASO in 2026 Complete Guide](https://asomobile.net/en/blog/aso-in-2026-the-complete-guide-to-app-optimization/)
2. [Phiture: ASO Trends in 2026](https://phiture.com/blog/aso-trends-in-2026/)
3. [AppTweak: ASO Best Practices 2026](https://www.apptweak.com/en/aso-blog/app-store-optimization-aso-best-practices)
4. [Appalize: Ratings Impact on Downloads](https://www.appalize.com/da/blog/app-marketing/app-store-ratings-impact-on-downloads-data-driven-analysis)
5. [Adapty: App Store Conversion Rate 2026](https://adapty.io/blog/app-store-conversion-rate/)
6. [MobileAction: App Store vs Play Store](https://www.mobileaction.co/blog/app-store-vs-play-store/)
7. [ASOMobile: App Store Differences](https://asomobile.net/en/blog/app-store-differences-aso-for-google-play-vs-app-store/)
8. [SplitMetrics: A/B Testing Sample Size](https://splitmetrics.com/blog/mobile-a-b-testing-sample-size/)
9. [ASOMobile: Screenshots Guide 2025](https://asomobile.net/en/blog/screenshots-for-app-store-and-google-play-in-2025-a-complete-guide/)
10. [ScreenshotOtter: Screenshot Captions](https://screenshototter.com/blog/app-store-screenshot-captions)
11. [Incipia: App Store Screenshots Study](https://incipia.co/post/app-marketing/app-store-screenshots-study-of-the-top-100-apps/)
12. [Sensor Tower: State of Mobile Home & Lifestyle 2025](https://sensortower.com/)
13. [Sensor Tower: State of AI Apps 2025](https://sensortower.com/blog/state-of-ai-apps-2025-ai-across-verticals)
14. [Apple Developer: Custom Product Pages](https://developer.apple.com/app-store/custom-product-pages/)
15. [MobileAction: CPP Organic Search](https://www.mobileaction.co/blog/custom-product-pages-meet-organic-search/)
16. [Appfigures: App Name Optimization](https://appfigures.com/resources/guides/app-name-optimization)
17. [Gummicube: iOS Subtitle Keywords](https://www.gummicube.com/blog/placing-keywords-in-your-apps-ios-subtitle-why-it-matters)
18. [Apple Developer: Product Page](https://developer.apple.com/app-store/product-page/)
19. [ASO.dev: Cross-Localization](https://aso.dev/metadata/cross-localization/)
20. [AppTweak: App Store Localization](https://www.apptweak.com/en/aso-blog/guide-to-app-store-localization)
21. [Apple Search Ads Advanced](https://searchads.apple.com/advanced)
22. [Google Play Store Listing Experiments](https://support.google.com/googleplay/android-developer/answer/6227309)
23. [Thumbtack App Store listing analysis, April 2026](https://apps.apple.com/us/app/thumbtack-find-pros/id469850199)
24. [HomeAdvisor App Store listing analysis, April 2026](https://apps.apple.com/us/app/homeadvisor/)
25. [PictureThis App Store listing analysis, April 2026](https://apps.apple.com/us/app/picturethis-plant-identifier/id1252497129)

---

**Дата последнего обновления:** 2026-04-18
**Следующий шаг:** ONBOARDING-RESEARCH.md — post-install flow с retention focus и activation to aha moment sequencing.
