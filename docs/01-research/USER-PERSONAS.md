# USER-PERSONAS.md — FixIt

**Дата:** 17 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Автор:** Research Team
**Статус:** Final v1.0
**Companion docs:** [MARKET-RESEARCH.md](./MARKET-RESEARCH.md), [COMPETITOR-ANALYSIS.md](./COMPETITOR-ANALYSIS.md), [DOMAIN-DEEP-DIVE.md](./DOMAIN-DEEP-DIVE.md)

---

## Executive Summary

5 personas, покрывающих **80% потенциальной аудитории FixIt**, упорядочены по приоритету для MVP:

| # | Persona | Возраст | Primary pain | MVP priority | Expected ARPU | CAC hypothesis |
|---|---|---|---|---|---|---|
| 1 | **Emma** — First-time homeowner | 30-38 | "Не знаю сколько что стоит, боюсь быть обманутой" | 🥇 **PRIMARY** | $48/год | $12-18 |
| 2 | **Mike** — DIY enthusiast | 35-55 | "Хочу сделать сам, но нужен checklist материалов и реальных цен" | 🥈 SECONDARY | $65/год | $8-12 |
| 3 | **Sarah** — Single female homeowner | 35-55 | "Мастер хочет $800 — это честно или меня обманывают?" | 🥈 SECONDARY | $58/год | $15-22 |
| 4 | **Tyler** — Renter (deposit-anxious) | 25-35 | "Сломал петлю шкафа — вычтут из депозита или починить самому?" | 🥉 TERTIARY | $12 (pay-per) | $5-8 |
| 5 | **Ronald** — Aging homeowner | 60-75 | "Дом нужно поддерживать, но pension ограничен" | 🥉 TERTIARY | $42/год | $20-30 |

**Primary target:** Emma (first-time homeowner). Почему:
- Самый большой сегмент (11-15M households в US alone¹)
- Highest pain intensity + highest willingness to pay в $5-15 range
- Digital-native (AI-first interfaces не проблема)
- Social amplification потенциал (TikTok / Instagram "first home" community)
- Наименьшая резистентность к subscription model

**Total addressable consumer pool (US):** ~55-65M adults соответствуют хотя бы одной persona.

---

## Методология

Personas построены на:
- **US Census American Housing Survey 2023** ² — homeownership demographics
- **JCHS Harvard State of Nation's Housing 2024** ³ — home maintenance spending patterns
- **Pew Research generational homeownership studies** (2024) ⁴
- **Nielsen home improvement consumer panel data** (2023) ⁵
- **Reddit anthropology** — анализ r/HomeImprovement (3.2M members), r/HomeOwners (400K), r/DIY (21M), r/FirstTimeHomeBuyer (700K)
- **Google Trends** для validation pain points (search volume "how much does it cost to fix ___" — 1.2M+ monthly searches cumulative)

Каждая persona включает JTBD (Jobs-to-be-Done) framework + sample scenario + acquisition channel hypothesis.

---

## Persona 1: Emma (First-Time Homeowner) 🥇 PRIMARY

### Demographics
- **Имя:** Emma Mitchell
- **Возраст:** 33
- **Локация:** Denver, Colorado (или Austin, TX / Raleigh, NC — similar cohort)
- **Семейный статус:** Замужем, 1 ребёнок (4 года), второй в планах
- **Доход:** $95K household
- **Жильё:** 3-bedroom single-family home, 1975 год постройки, купили в 2023 за $440K (FHA loan, 3.5% down)
- **Tech profile:** iPhone 15, Instagram (daily), TikTok (3-4x/day), YouTube (DIY videos occasionally), Reddit (r/FirstTimeHomeBuyer — reads daily)

### Psychographics
- **Ценности:** Family-first, financial security, "doing things right"
- **Страхи:**
  - Быть "обманутой" контрактором
  - Неправильно решить и потом переделывать (перерасходы)
  - Заведомо "stupid" questions — боится звонить мастеру и показать незнание
  - House "разваливается" и она не успевает за ремонтами
- **Мечты:** Превратить "fixer-upper" в dream home за 10 лет. Instagram-worthy before/after фото.

### Typical day / Relationship with home
6am wake up, замечает что кран подтекает. К 8am уезжает на работу, думает "надо бы починить". Вечером проверяет — стало хуже. Гуглит "leaky faucet repair cost" — получает 20 разных answers, $50-$500. Паника. Муж говорит "завтра посмотрю на YouTube" — но ни у кого нет времени.

### Pain points (топ-7)
1. **"Я не знаю сколько что стоит"** — каждый repair quote кажется либо too cheap либо too expensive
2. **Нет trusted source** для quick price validation
3. **Муж "посмотрит на YouTube"** но потом не делает
4. **Страх permit violations**
5. **Google даёт противоречия** — разные articles, цены, советы
6. **Contractors не отвечают** (contractor shortage — booking 6+ weeks out)
7. **Не успевает изучать каждый repair** — работа, ребёнок, mortgage

### Jobs-to-be-Done (JTBD)

> **Когда** я вижу что-то сломанное или подтекающее в доме,
> **я хочу** быстро понять сколько это стоит починить и могу ли я сделать сам,
> **чтобы** не потратить лишнего, не быть обманутой мастером и чувствовать уверенность в своих решениях по дому.

Secondary JTBD:
> **Когда** мастер выставил мне quote,
> **я хочу** проверить честная ли это цена для моего региона,
> **чтобы** не переплатить из-за того что я "cute young лицо".

### Current solutions и почему они не работают

| Что делает сейчас | Почему не работает |
|---|---|
| Google "repair cost" | 10+ contradictory sources, overwhelming |
| Спрашивает маму / папу / свёкра | Их советы 2005-года |
| Зовёт 3 contractors для quotes | 2 недели booking + каждый пытается upsell |
| YouTube туториалы | Боится ошибиться, 15-min videos overwhelming |
| Facebook neighborhood group | Random советы, нет verification |
| Reddit r/HomeImprovement | Slow (response в hours), no privacy |

### Как FixIt помогает Emma

1. **10-second photo → instant answer** — "протечка под кухонным краном, обычно $75-150 самой, $300-500 мастером в Denver"
2. **"Это в пределах DIY range"** — confidence boost, step-by-step guide
3. **"Permit не нужен"** — explicit статус
4. **Material list с ценами из Home Depot Denver** — shopping list ready
5. **"Если не справишься — вот 3 local plumbers with real prices"** — fallback через Thumbtack partnership
6. **"Сегодня мастер выставил $800 — это high end для Denver"** — calibration tool

### Willingness to pay
- **Free tier:** примет без колебаний (3 estimates/мес)
- **Subscription $7.99/mo:** "если мне это помогает 2-3 раза в год — totally worth it"
- **Annual $49.99:** "если использую часто — да" (42% prefer annual после trial)
- **Pay-per $2.99-4.99:** backup для non-subscribers

**Expected LTV:** $48 × 2.5 years avg retention = **$120 LTV**

### Acquisition channels
1. **TikTok** — viral DIY/home content (#hometok — 4B views)
2. **Instagram Reels** — before/after renovation content
3. **Google Ads** — "how much does it cost to fix [X]" (huge volume, CPC $1.20-2.00)
4. **Reddit ads** — r/FirstTimeHomeBuyer / r/HomeImprovement
5. **Referral** — Emma showing друзьям
6. **Content marketing** — SEO на "how much does it cost to [X]"

### Sample scenario — "Leaky Kitchen Faucet"

**7:42 PM, Tuesday** — Emma моет посуду, замечает капли под раковиной. Мокро в шкафчике.

**7:44 PM** — вспоминает про FixIt (слышала в подкасте How I Built This). Скачивает.

**7:45 PM** — открывает app. "Photo of the problem." Фотографирует мокрое пятно + сам кран.

**7:46 PM** — AI: "Похоже на утечку из supply line. Это плавный drip — не emergency, но нужно исправить в 48 часов." Вопросы:
- Region: "Denver, CO 80203" (auto-detect)
- DIY experience: "Low"
- Quality tier: "Mid"

**7:47 PM** — Результат:
- **🔧 DIY:** $12-18 материалы (1/2" SharkBite или compression coupling + plumber's tape), 20-30 min, 1-step video inside. Confidence: 7/10 для beginner.
- **🤝 Hybrid:** $15 материалы + $80-120 handyman (1 hour call). Fixr.com avg для Denver: $95.
- **🏢 Full Pro:** $175-275 for licensed plumber. Real rates from 3 Denver plumbers via Thumbtack partnership.

**Emma выбирает:** DIY (confidence + $150 saved).

**7:48 PM** — "Shopping list ready": SharkBite 1/2" × 2 ($6 at Home Depot 1mi away), plumber's tape ($2). Total $8. "Pick up tomorrow?" → adds to Apple Reminders.

**Wednesday 6:30 PM** — Emma doing repair, following 3-min video. Works.
**Wednesday 7:00 PM** — Emma shares on Instagram: "Just saved $200 fixing my own faucet 💪🔧"
**3 friends ask in DMs** — 2 download FixIt in next 24 hours.

**Retention:** Emma uses FixIt снова 6 weeks later (garage door squeaking) → subscribes annual.

---

## Persona 2: Mike (DIY Enthusiast) 🥈 SECONDARY

### Demographics
- **Имя:** Mike Thompson
- **Возраст:** 47
- **Локация:** Suburban Atlanta, GA
- **Семейный статус:** Женат, 2 детей (14 и 16 лет)
- **Доход:** $135K (warehouse manager)
- **Жильё:** 4-bed, 2100 sqft, 1998. Владеет 11 лет. Garage full of tools.
- **Tech profile:** Android (Pixel), YouTube heavy (2hr/день DIY + sports), Reddit (r/DIY, r/HomeImprovement, r/Tools)

### Psychographics
- **Ценности:** Self-reliance, practical knowledge, "men fix their own stuff"
- **Страхи:** Неправильно сделать → ещё дороже платить мастеру чтобы исправить; купить wrong materials
- **Мечты:** Передать DIY skills сыну, renovate basement сам

### Pain points (топ-6)
1. **"Подготовка занимает больше чем сам ремонт"** — tracking materials, tools, prices, sequencing
2. **"Нет одного места"** где можно получить full project plan
3. **Price check** — fair ли цена материалов Home Depot vs Lowe's vs online
4. **Missing tools** — регулярно начинает проект, понимает "блин, мне ещё impact driver нужен"
5. **"Over my head" moments** — иногда понимает "это мне не по силам" → нужен quick pivot к pro
6. **Wife skeptical** — "are you sure?" — нужна objective validation

### JTBD
> **Когда** я беру новый DIY проект,
> **я хочу** получить полный список материалов и инструментов с ценами + пошаговый план,
> **чтобы** не тратить время на research, не возвращаться в Home Depot 3 раза и уверенно сказать жене "yes I can do this."

### How FixIt помогает Mike
1. **One-tap всё что нужно** — materials + tools + steps + time + difficulty
2. **"Objective difficulty"** — "6/10 для intermediate DIYer, тебе понадобится ___"
3. **Price check across retailers** — Home Depot vs Lowe's vs Amazon
4. **"Bail-out option"** — если не справляется, instant link к Thumbtack
5. **Shared "home projects" history** — tracks всё что делал + когда повторять
6. **"Tell wife" feature** — shareable report

### Willingness to pay
- **Annual $49.99** (prefers annual)
- **Pro tier $12.99/mo** — Tool tracking + home maintenance calendar
- LTV: **$195** (3 years avg retention)

### Acquisition
1. YouTube pre-roll на DIY channels
2. Reddit r/DIY, r/HomeImprovement
3. Home Depot / Lowe's in-store QR codes (partnership)
4. Podcast ads — House Talk, Ask This Old House
5. Tool review blogs — Pro Tool Reviews

---

## Persona 3: Sarah (Single Female Homeowner) 🥈 SECONDARY

### Demographics
- **Имя:** Sarah Chen
- **Возраст:** 43
- **Локация:** Suburban Chicago, IL
- **Семейный статус:** Разведена, 1 ребёнок (8 лет) с ней 50% времени
- **Доход:** $88K (RN — registered nurse)
- **Жильё:** 2-bed townhouse, 1995, купила post-divorce в 2020 за $280K
- **Tech profile:** iPhone, Facebook primary, Instagram casual, Google heavy, NOT на TikTok

### Psychographics
- **Ценности:** Independence, "I can figure things out", protect daughter, no trust for strangers
- **Страхи:**
  - Contractors "играют на её единственности" — берут больше
  - Dangerous strangers в доме
  - Сделать плохое решение → мать критикует

### Pain points
1. **"Мастер быстро сказал $800 — я не знаю что делать"** — нет бенчмарка
2. **Hesitates звать мастеров** — страх that "takes advantage of her"
3. **Ex-husband был DIY, теперь всё сама** — steep learning curve
4. **Friends рекомендуют contractors** — но она не знает честных ли цен они тоже берут
5. **Small fixes copy up** — mental fatigue

### JTBD
> **Когда** мастер выставляет мне quote за работу,
> **я хочу** мгновенно узнать fair market range для этой работы в моём zip,
> **чтобы** я могла торговаться с confidence и чтобы меня не обманывали как "single woman."

### How FixIt helps
1. **Instant fair-price validation** — photo of what pro quoted → AI extracts scope → fair range for Chicago zip
2. **"Is this DIY-able for non-DIYer?"** — honest assessment
3. **Gender-neutral language** — не patronizing
4. **Background-checked pros from Thumbtack only** — safety filter
5. **"Second opinion" workflow** — photo of pro's invoice → AI breaks down fair/overcharged

### Willingness to pay
- **$7.99/mo** — Sarah видит FixIt как "insurance against being ripped off"
- LTV: $58 × 3 years = **$174**

### Acquisition
- Facebook ads targeted at single female homeowners 35-55
- Nextdoor ads (community trust)
- Divorce / single mom blog networking
- PR — "FixIt helps women avoid contractor ripoff" story

---

## Persona 4: Tyler (Renter, Deposit-Anxious) 🥉 TERTIARY

### Demographics
- **Имя:** Tyler Ramirez
- **Возраст:** 28
- **Локация:** Brooklyn, NY
- **Семейный статус:** Unmarried, roommate situation
- **Доход:** $72K (junior designer в startup)
- **Жильё:** Rental 1-bed, $2700/mo (deposit $5400)
- **Tech profile:** iPhone, TikTok heavy, Twitter/X, Reddit (r/nyc, r/NYCapartments), financial anxious

### Pain points
1. **"Сломал дверцу шкафа — платить из deposit $500 или починить за $20?"**
2. **Не может call contractors в rental** (violation of lease)
3. **Move-out inspection** — что можно fix самому
4. **Landlord says "major damage" = $800** — реально так?

### JTBD
> **Когда** я повредил что-то в съёмной квартире,
> **я хочу** знать реально сколько это стоит исправить и можно ли я сам,
> **чтобы** защитить свой deposit.

### How FixIt helps
1. **Photo + "tenant flow"** — specific output для renters: "this is $25 fix, take 15 min — do it yourself"
2. **Before move-out checklist** — snap photos walls/floors/fixtures → flag deposit risks
3. **Pre-move-in documentation** — защита на старте

### Willingness to pay
- **Pay-per model** лучше (infrequent use) — $2.99 за single estimate
- $19.99 для "Full move-out review" bundle
- LTV: $12 за rental cycle (3-5 uses over 2-year lease)

### Acquisition
- TikTok #renterlife content
- r/NYCapartments, r/LegalAdvice rental (organic content marketing)
- Partnership с rental platforms (Zillow, Apartments.com)

---

## Persona 5: Ronald (Aging Homeowner) 🥉 TERTIARY

### Demographics
- **Имя:** Ronald "Ron" Peterson
- **Возраст:** 68
- **Локация:** Rural Pennsylvania
- **Семейный статус:** Женат (жена 65), дети взрослые
- **Доход:** $52K (pension + partial SS)
- **Жильё:** 3-bed rancher, 1968, владеют 35 лет, mortgage paid off
- **Tech profile:** iPad (daughter setup), Facebook primary

### Pain points
1. **"Раньше делал сам — теперь спина не разрешает"**
2. **Contractor scams targeting seniors** — $4000 "emergency" quotes
3. **Deferred maintenance** — 20 лет ничего крупного
4. **"Дочь предлагает помощь но не хочу ей platить"**
5. **Fixed income** — нужны truly cheap options

### JTBD
> **Когда** что-то нужно починить,
> **я хочу** cheap options и flag obvious scam-quotes,
> **чтобы** stay в своём доме на pension долго.

### How FixIt helps
1. **Scam flagging** — quote 3x выше average → red flag alert
2. **"Super-cheap mode"** — absolute minimum cost + "temporary fix" vs "permanent"
3. **Senior-friendly UX** — большие шрифты, voice input
4. **"Call my daughter" sharing** — one-tap share estimate с детьми
5. **Senior-focused pros** — AARP/BBB badges filter

### Willingness to pay
- $49.99/year — Ron готов если дочь настроит
- Acquisition challenge: нужна дочь intermediary
- LTV: **$125** (if onboarded)

### Acquisition
- **AARP partnership** (magazine / website / discount program)
- **NextDoor** — seniors active
- **Facebook ads** target 60+ "scam protection" angle
- **PBS / NPR** sponsorship
- **Referral through adult children**

---

## Сегментация и приоритизация

### Размер каждого сегмента (US, estimated)

| Persona | US population match | Core demographic | TAM (persona alone) |
|---|---|---|---|
| Emma (first-time HO) | 11-15M households | First-gen homeowners 25-40 | $1.5B - $2.5B |
| Mike (DIY enthusiast) | 25-30M adults | DIY-active homeowners 35-60 | $1.8B |
| Sarah (single female HO) | 20M+ (record 2025) ⁶ | Single women homeowners 35-65 | $1.2B |
| Tyler (renter) | 45M renter households | Renters 25-40 urban | $600M |
| Ronald (aging HO) | 30M (homeowners 65+) | Older homeowners fixed income | $800M |

**Total consumer TAM FixIt:** ~$6-8B в США (20% adoption + realistic ARPU).

### Priority recommendations

**MVP launch — focus on Emma 100%:**
- Tightest product-market fit
- Highest amplification potential
- Easiest positioning
- Largest segment + growing

**Expansion order:**
1. **Emma** (MVP) → months 1-6
2. **Mike** (DIY) → months 4-10 (add Pro tier, tool tracking)
3. **Sarah** (single female) → months 6-12 (add quote validation, safety filter)
4. **Tyler** (renter) → months 10-14 (add tenant flow, before/after photos)
5. **Ronald** (senior) → months 12-18 (add AARP partnership, simplified UI)

---

## Anti-personas (НЕ target для MVP)

- **Licensed contractors** — у них своя toolbox
- **Real estate flippers** — heavy-duty B2B needs
- **Luxury homeowners ($1M+)** — property managers handle everything
- **High-end remodelers planning $50K renovations** — используют Houzz + designer

---

## Validation plan

Research validation нужно сделать перед feature finalization:

1. **5 interviews per persona** (25 total) — remote via Zoom
2. **Reddit mini-survey** (r/FirstTimeHomeBuyer, r/HomeImprovement) — 200 respondents
3. **Ad creative test** — Facebook/Google ads для each persona, measure CTR
4. **Landing page w/ email signup** — measure "would you pay for this" conversion

Expected timeline: 2 недели, budget ~$500.

---

## Источники

¹ US Census Housing Vacancies and Homeownership (2025 Q1)
² US Census American Housing Survey 2023
³ Joint Center for Housing Studies at Harvard — "State of the Nation's Housing 2024"
⁴ Pew Research — "Young Adult Homeownership Trends 2024"
⁵ Nielsen — "US Home Improvement Consumer Panel 2023"
⁶ National Association of Realtors — "Single Women Homeownership Record 2025"

Plus qualitative research:
- r/FirstTimeHomeBuyer sentiment analysis
- r/HomeImprovement top posts 2024-2026 (Mike's problems)
- r/SingleMom + financial Q&A forums (Sarah's anxiety)
- r/NYCapartments + r/LegalAdvice/rental (Tyler)
- AARP Elderly Scam Report 2024 (Ronald)

---

**Дата последнего обновления:** 2026-04-17
**Следующий шаг:** RESEARCH-BRIEF.md — синтез + GO/NO-GO verdict.
