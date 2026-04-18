# PRODUCT-VISION.md — FixIt

**Дата:** 18 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** Product Definition (Stage 2)
**Автор:** Product Team
**Статус:** Draft v1.0
**Source docs:** [RESEARCH-BRIEF.md](../01-research/RESEARCH-BRIEF.md) | [MARKET-RESEARCH.md](../01-research/MARKET-RESEARCH.md) | [COMPETITOR-ANALYSIS.md](../01-research/COMPETITOR-ANALYSIS.md) | [USER-PERSONAS.md](../01-research/USER-PERSONAS.md)

---

## Elevator Pitch

**FixIt — это PictureThis для ремонта дома.** Сфотографировал протечку, трещину в стене или умершую стиральную машину — через 10 секунд получаешь честный ответ: что сломано, сколько стоят материалы в твоём zip-коде, и три пути починки — сделать самому, нанять handyman на установку или вызвать licensed pro с реальными quotes. Мы отвечаем на вопрос, который каждый homeowner задаёт десятки раз в год: **"Сколько это стоит — и могу ли я сделать сам?"**

---

## Vision Statement

### 1 Year — Own the "first-time homeowner" niche (США)

К апрелю 2027 FixIt — **приложение по умолчанию** для миллениала, который впервые купил дом и увидел первую протечку. Конкретные milestones:

- **500K downloads** в США, primary через TikTok #hometok и App Store SEO
- **25K paying subscribers** (5% free→paid conversion, в line с RevenueCat utility-app benchmark)
- **$1.2–1.6M ARR** (subscription $9.99/мес + affiliate leads $15–40 + pay-per-estimate)
- **Top-30 repair categories** покрыты с AI accuracy ≥80% (validated через user feedback)
- **NPS ≥50** в сегменте Emma (first-time homeowner) — это критерий "fit нашли"
- **Два affiliate партнёра live:** Thumbtack или Angi Leads + Home Depot Product Advertising API
- **Brand recognition:** когда в r/FirstTimeHomeBuyer кто-то спрашивает "how much should this cost?", кто-то в threads отвечает "try FixIt"

### 3 Years — Category leader в consumer home-repair intelligence

К апрелю 2029 FixIt — глобальный лидер в новой категории **"AI home advisor"**, которой сегодня не существует. Мы не конкурируем с Thumbtack и HomeWyse — мы определяем новую категорию, в которой они становятся партнёрами или последователями.

- **5–8M downloads globally** (US + UK + Canada + Australia + Western Europe)
- **350–560K paying subscribers**, $32–50M ARR
- **150+ repair categories**, включая furniture assembly и appliance diagnostics
- **Proprietary regional pricing dataset** — crowd-sourced ground truth от 1M+ completed estimates, точнее чем HomeWyse и Fixr
- **B2B pilot:** property managers, small landlords, insurance adjusters используют FixIt API для claims triage
- **Partnerships defensible:** Thumbtack/Angi affiliate locked-in multi-year, Home Depot/Lowe's co-marketing, insurance companies pilot

### 5 Years — "Home Operating System"

К 2031 каждый дом имеет FixIt-профиль — так же, как каждое растение имеет PictureThis-идентификацию. Это переход от **reactive repair advisor** к **proactive home intelligence platform**. User не открывает приложение когда что-то сломалось — FixIt знает возраст дома, материалы, историю ремонтов и предсказывает что сломается следующим.

- **Home profile** как основная единица — не отдельный estimate, а persistent digital twin of the home
- **Predictive maintenance alerts** — "твой water heater 2011 года выпуска, 85% вероятность отказа в следующие 18 месяцев, цена replacement сегодня $1,240"
- **Insurance integration** — FixIt report становится accepted document для claims ($500B+ US home insurance рынок)
- **20M+ homes с active FixIt profile** — достаточно для network effects на пригородном и городском уровне ("средний квартал в Остине платит $X за замену крыши")
- **Exit scenarios open:** acquisition target для Angi, Thumbtack, Home Depot, или insurance conglomerate (Allstate, State Farm); либо independent path к IPO по модели PictureThis/Duolingo (consumer-subscription category leader)

---

## Mission

**Мы даём homeowners ту уверенность, которую сегодня имеют только люди с "другом-мастером".**

FixIt существует потому что рынок home repair построен на информационной асимметрии. Contractor знает реальную цену — homeowner не знает. Plumber знает, можно ли починить за 15 минут или это реально $400 работа — homeowner не знает. YouTube знает как, HomeWyse знает сколько, Thumbtack знает кого — но никто не собирает эти три куска информации вместе, для конкретной фотографии конкретной проблемы в конкретном zip-коде конкретного user.

Мы не строим ещё один lead-gen marketplace (Thumbtack уже есть). Мы не строим DIY энциклопедию (YouTube уже есть). Мы не строим price calculator (HomeWyse уже есть). Мы строим **neutral intelligence layer** между homeowner и рынком — как Google Flights для авиабилетов, как Zillow для недвижимости. После нас homeowner знает что делать, знает сколько это стоит, и выбирает свой путь осознанно — а не от страха, что его разведут.

Longer term мы верим что это расширяется до **"every home deserves financial transparency, not just every car or every apartment rental"**. Carfax дал transparency авторынку. Zillow — рынку недвижимости. FixIt делает это для repair/maintenance — категории, в которую американская семья тратит $2,000–5,000/год без reliable способа проверить, справедливы ли цены.

---

## North Star Metric

**Weekly Estimates Per Active Household (WEPA).**

Определение: среднее число completed estimates в неделю на active household (household = user, закончивший хотя бы один estimate за последние 30 дней).

### Почему именно эта метрика

Она **одновременно отражает три критичных условия product-market fit**:

1. **Trust** — если user вернулся за вторым estimate, значит первый был полезен. Без trust нет retention.
2. **Habit formation** — home repair — низкочастотный use case (средняя семья сталкивается с проблемой 4–8 раз в год). Если мы видим ≥0.3 estimates/week/household, значит user использует нас для mundane вопросов (сколько стоит поменять кран? заменить прокладку? починить ручку двери?), а не только для emergency. Это означает мы успешно превратились из "скачай когда что-то большое сломается" в "открой перед каждым household-решением".
3. **Monetization surface** — каждый estimate = opportunity к affiliate conversion ($25 avg lead) + опцион на subscription upgrade + данные для обучения AI. Все ценности продукта линейно масштабируются с WEPA.

### Target trajectory

| Stage | WEPA | Интерпретация |
|---|---|---|
| MVP beta (month 3) | 0.15 | Пользователь возвращается раз в 6–7 недель, single-use случаи |
| Launch (month 6) | 0.35 | Возвращение раз в 3 недели — есть trust, но не habit |
| Year 1 | 0.6 | Приблизительно раз в 10 дней — product-market fit достигнут |
| Year 3 | 1.2 | Еженедельное использование — мы стали default tool для home decisions |

Для сравнения: плант-приложения типа PictureThis имеют WEPA ~2.5 (сезонный пик), но их use case fundamentally more frequent. Для home repair 1.2 — это потолок "extremely high engagement".

### Supporting metrics

North Star не живёт в вакууме. Мы отслеживаем её через три proxy-метрики, каждая из которых должна двигаться в правильную сторону:

- **Estimate completion rate** (>70%) — user не бросает flow после photo upload
- **Estimate→action conversion** (>40%) — user не просто посмотрел цену, а начал делать что-то: купил материал, нанял pro, сохранил estimate
- **W4 retention** (>35%) — user возвращается через месяц (benchmark PictureThis = 38%)

---

## Product Principles

Семь принципов, к которым мы возвращаемся в каждом дизайн-решении:

### 1. Neutral advisor, not a sales funnel

Мы **не зарабатываем больше**, если user выбирает Full Pro вместо DIY. Affiliate revenue присутствует, но не определяет UI. Если AI считает что проблема решается DIY за $15 — мы показываем это первым, даже когда affiliate commission за pro-referral была бы $40. Long-term trust > short-term revenue. Это структурно отличает нас от Thumbtack и Angi, у которых conflict of interest вшит в модель (они зарабатывают **только** на push'е к pros).

### 2. Photo-first, text-supported

Фото — primary input. Не "добавьте фото для точности" — **без фото нет estimate**. Мы делаем выбор дизайна в пользу photo upload flow (60% экранов onboarding и main flow посвящены photo capture UX). Text (описание проблемы, location, quality tier) поддерживает, но не заменяет. Это дисциплина: photo-first создаёт 10× better data quality для AI, а мы работаем в visual-damage domain, где photo purely essential.

### 3. Speed > completeness на первом экране

10-секундный TTFV (time to first value) — non-negotiable. Первый экран результата показывает: **что это, сколько стоит diapason, три option'а one-line each**. Деталь, чертежи, материалы, tutorial — на следующих экранах. Мы жертвуем completeness для ощущения магии. User в момент проблемы находится в анxious state — он хочет немедленного ответа, не academic report.

### 4. Three options, always

DIY / Hybrid / Full Pro — всегда три варианта, никогда не один. Это философский выбор: мы **не говорим пользователю что делать**, мы показываем ему diapason возможностей. User решает сам. Это respects his agency и defuses the "AI told me to do something stupid" liability risk. Даже если одна опция очевидно плохая, мы показываем её с честным "not recommended because..." — так user видит full picture.

### 5. Regional truth, not national averages

Если мы показываем "plumber costs $120/hr", это **120 в его zip**, не national average. Regional pricing data — это то, где мы кладём самые дорогие ресурсы (APIs, manual curation, crowd-sourced corrections). Это источник defensibility. Конкурент может скопировать UI за месяц, но не может скопировать 3 года regional pricing calibration за любые деньги.

### 6. Disclaimers где надо, не где хочется

Gas lines, full electrical rewiring, structural work, load-bearing walls — hard stop, "call licensed pro", no DIY option shown. Мы не пытаемся быть heroes для high-liability cases. Для всего остального — light-touch disclaimer, но не fear-mongering. Baseline: "мы не несём ответственности за outcome, но мы честно даём our best estimate" — то же что Zillow делает с Zestimate.

### 7. Friction at conversion, not at value

Paywall стоит после демонстрации ценности, не до. Первые 3 estimates — free, без signup. User уже увидел работает ли продукт, прежде чем мы просим email или деньги. Это противоположно industry pattern (paywall на 2-м экране) — но для нашего use case (низкочастотный, trust-dependent) это единственный способ достичь organic virality и word-of-mouth.

---

## Unique Value Proposition

**FixIt — единственный продукт, который соединяет photo AI + real-time material pricing + regional labor data + DIY/Hybrid/Pro routing в одном 10-секундном flow.**

Сравнение с "кусочными" конкурентами — всё уже есть, но фрагментарно:

| Конкурент | Что решает | Что не решает |
|---|---|---|
| **Thumbtack / Angi** | Находит pro | Не говорит "можешь ли ты сделать сам"; не говорит сколько это "по-честному" стоит; conflict of interest |
| **HomeWyse / Fixr** | Cost ranges в виде web-статей | Нет photo-input (ты должен сам описать проблему); нет mobile app; нет DIY alternative; нет AI personalization |
| **YouTube DIY / iFixit** | Показывает как сделать | Не говорит сколько стоят материалы сегодня в твоём zip; не говорит стоит ли вообще DIY или проще нанять; нет pro fallback |
| **PictureThis** | Photo-AI identifies | Не home repair domain; нет cost / action routing |
| **ChatGPT / Gemini Vision** | General photo description | Curiosity-level accuracy; нет verified pricing data; нет trust infrastructure; галлюцинирует числа |

Наша категория — **первая**, которая кладёт четыре куска в один flow. Это не incremental improvement, это **category creation**. User пробовал все перечисленные продукты (потому что все пробовали Google Search), но **никогда не пробовал получить все четыре ответа из одного фото за 10 секунд**. Тот самый "aha-момент" — момент first estimate — product sells itself.

Конкретная positioning statement: *"Для first-time homeowner, которому страшно позвонить contractor не зная реальной цены, FixIt даёт честный diapason стоимости и три пути починки за 10 секунд по фото, в отличие от Thumbtack/HomeWyse/YouTube, которые решают только часть проблемы."*

---

## Target Customer Outcomes

После 30 дней с FixIt первичный user (Emma — first-time homeowner) получает следующие measurable outcomes:

### Financial

- **Экономит $180–$480 в среднем на одной repair decision** (конкретнее: 65% users обнаруживают что проблема решается DIY за <$50 вместо контрактора за $200–500)
- **Избегает 30–40% overcharge** от unscrupulous pros (baseline: survey Consumer Reports 2024 о "repair overcharging")
- **$1,200–$2,400/год потенциальная экономия** для active household с 4–6 репейр-событиями в год

### Temporal

- **Принимает решение за 3 минуты** вместо 2–3 часов (Google research → 5 YouTube videos → 3 квотов от pros)
- **Time to first answer <10 seconds** — от photo upload до первого screen результата
- **Full estimate <2 minutes** — включая answers на follow-up questions (quality tier, DIY readiness, region confirmation)

### Emotional / Confidence

- **Уверенность позвонить contractor** — "я знаю что это должно стоить $150–$250, если он говорит $500 я возражаю"
- **Уверенность отказаться от contractor** — "я могу сделать сам, у меня есть список материалов и video tutorial"
- **Чувство контроля над home** — для first-time homeowner это emotionally load-bearing. Home перестаёт быть scary black box.

### Relational

- **Снижение конфликтов в семье** о deciding "чинить самим или звать pro" — FixIt даёт third-party neutral answer
- **Social currency** — user become "the friend who knows home stuff", делится FixIt с кругом

Эти outcomes — не маркетинговые claims, это **измеряемые в app metrics**: мы треkаем "avg estimate range" vs "user final action", "time on screen", и шестимесячный NPS-survey для сегмента Emma.

---

## Growth Flywheel

FixIt растёт через self-reinforcing loop из шести звеньев. Каждая новая user increases value для следующего user:

```
  ┌─────────────────────────────────────────────────────────────┐
  │                                                              │
  ▼                                                              │
1. User takes photo of broken thing                              │
  │                                                              │
  ▼                                                              │
2. AI identifies + shows $ range + 3 options                     │
  │                                                              │
  ▼                                                              │
3. User saves $150–$500 on real decision                         │
  │                                                              │
  ▼                                                              │
4. User tells friends / posts TikTok / reviews App Store         │
  │  ("OMG this app saved me $400 on a plumber")                 │
  ▼                                                              │
5. Friend downloads, repeats cycle — but also:                   │
  │                                                              │
  ▼                                                              │
6. Each estimate contributes crowd-sourced pricing data          │
  │  → AI gets smarter → next estimate more accurate             │
  │  → data moat deepens → harder для конкурентов догнать        │
  └─────────────────────────────────────────────────────────────┘
```

### Три вида growth loops внутри flywheel

**(a) Viral loop (k-factor)** — Emma сегмент органически шерит в TikTok. Single viral video = 50K–200K downloads observed в similar утилити-apps. Target k-factor год 1: 0.4 (каждый user приводит 0.4 другого). К году 3 с network effects: 0.7+.

**(b) Content loop** — каждый completed estimate → optionally generates public "cost guide" entry (anonymized). SEO page "how much does it cost to replace a faucet in Austin TX" ranks organically, driving top-of-funnel. Similar strategy довела Zillow до $7B+ valuation.

**(c) Data moat loop** — crowd-sourced price corrections ("actual cost was $80 not $120") feed back в pricing AI. После 1M estimates мы имеем hyper-local pricing data, которое ни один конкурент не может купить (потому что это не продаётся — его надо накопить).

### Почему это real flywheel, не метафора

Каждая звено связана с measurable метрикой и независимым budget:
- Link 3 (user saves money) — tracked через post-estimate survey
- Link 4 (sharing) — tracked через k-factor, referral attribution
- Link 6 (data compounds) — tracked через AI accuracy week-over-week

Если любая из звеньев ломается (user не экономит → не шерит → data не растёт), мы замечаем raньше чем flywheel разваливается.

---

## Long-term Moats

Через 3 года конкурент (HomeWyse с capital, Thumbtack с audience, или новая AI-first startup) будет смотреть на FixIt и видеть **три слоя defensibility**, каждый из которых требует годы или большие деньги чтобы построить:

### 1. Proprietary regional pricing dataset (самый сильный moat)

После 3M+ completed estimates мы имеем regional pricing database, которая **accurate на уровне zip-кода**. HomeWyse дает pricing на уровне штата. Fixr — на уровне country average. Чтобы нас догнать, конкуренту нужны либо:

- 3 года накопления data с conversion-competitive UX (мы за это время ушли дальше)
- Покупка dataset — но он не продаётся (это не single company asset, это compound of millions of user interactions)
- Reverse-engineer через scraping — нелегально + technically сложно (naши данные hashed + не public-facing в raw form)

Это тот же moat, который имеет Zillow (Zestimate) и Google Maps (traffic data). **Он не копируется быстрыми деньгами.**

### 2. Affiliate partnership network

Year 1 — affiliate lock-ins с Thumbtack/Angi/Home Depot/Lowe's. Эти партнёрства multi-year exclusivity в определённых категориях. Конкурент не может повторить их без аналогичного volume (chicken-and-egg: партнёры дают хорошие rates только при volume, volume требует партнёров).

### 3. Brand trust в "first-time homeowner" niche

Owning a keyword в consumer mind — самый durable moat в consumer apps. PictureThis = plants. Duolingo = languages. FixIt = "can I do this myself?" Если мы first и достаточно хороши, сегмент связывает category с нашим brand на 5–10 лет. Новый entrant тратит десятки миллионов чтобы расшатать эту ассоциацию.

### 4. Network effect через crowd-sourced corrections (secondary moat)

Users rate accuracy ("this estimate was $X off"), feeding back в model. Чем больше users, тем точнее estimates, тем больше users. Classical data network effect — medium strength (не как социальная сеть, но reliable).

### 5. Proprietary AI fine-tuning

За 3 года мы обучим proprietary vision model на home-repair-specific corpus (millions labeled photos + cost outcomes). General LLM (Claude/GPT/Gemini) остаётся лучше в generalist tasks, но мы становимся лучше specifically в "identify home repair issue from photo". Similar playbook: Grammarly's moat vs generic LLM writing.

### Чего у нас НЕ будет в moats (сознательный выбор)

- **Физическая инфраструктура** — мы не строим labor marketplace, не нанимаем contractors. Это капиталоёмко и не scalable.
- **Hardware** — никаких sensors, IoT devices, AR measurement tools. Мы остаёмся software-first.
- **Content library** — мы не пишем 10,000 DIY tutorials. Мы компилируем существующий YouTube/iFixit контент через AI. Content — commodity.

---

## Anti-goals

Четкая декларация что FixIt **не станет**, даже если рынок будет подталкивать:

### ❌ Marketplace для pros

Thumbtack / Angi / HomeAdvisor уже это делают и зарабатывают на этом миллиарды. Мы — **advisor**, не marketplace. Мы не храним pro profiles, не обрабатываем платежи between user и contractor, не берем cut от transaction. Это осознанное structural-level решение: у нас нет conflict of interest, который есть у них. Это — наш moat № 3 (neutral advisor). Попытка стать marketplace уничтожит продукт.

### ❌ DIY-энциклопедия

YouTube + iFixit + Reddit + Wikihow — уже существующая DIY library. Мы не пишем 10,000 how-to guides. Мы show the best existing tutorial (linked из YouTube), с cost context который YouTube не даёт. Content creation — это workload in hundreds of millions of dollars, который нам не нужен.

### ❌ B2B tool для contractors (для них — нет)

Есть soblazn monetize contractor side (FixIt как estimation tool для handymen). Мы от этого отказываемся, потому что это immediately создаёт conflict of interest с consumer side. Long term есть B2B tier для property managers и insurance adjusters — но не для contractors directly. Линию держим.

### ❌ AR measurement app

Magicplan / Canvas / RoomScan — AR-measurement для home planning. Это adjacent category, technically interesting — но это **другой продукт, другая команда, другой path to market**. Мы осознанно остаёмся в "photo → estimate" flow и не расширяемся в AR/measurement до years 4–5.

### ❌ Home renovation / remodeling platform

Houzz уже занял эту нишу ($500M+ ARR). Renovation — discretionary spend, cyclical, требует design consultation и project management. FixIt — **repair and maintenance**, non-discretionary, transactional. Это другой psychology, другой UX, другой sales cycle. Мы не пересекаемся с Houzz.

### ❌ Generalist home assistant / voice assistant

"Alexa, how do I fix..." — это Amazon/Google play. Мы не конкурируем с voice assistants и не пытаемся быть general home AI. Мы deliberately narrow: photo → cost → three options. Focus is a feature.

### ❌ Free forever с ads

Advertising model создаёт misalignment — мы оптимизируем для eyeballs, не outcomes. Freemium + subscription + affiliate — это всё aligned incentives (user получает value → user становится paying). Никогда не будет banner ads, никогда не будет "sponsored recommendations" в результатах estimate.

---

## Product Evolution Roadmap

Высокоуровневый (не feature-list — для features см. [FEATURES.md](./FEATURES.md)):

### Year 1 (2026–2027) — "Photo-to-estimate для США"

- Consumer AI advisor для top-30 US repair categories
- iOS + Android, English only
- Primary: Emma sergment (first-time homeowner 28–38 y/o)
- Freemium (3 free estimates → $9.99/мес) + pay-per-estimate ($2.99) + affiliate leads
- Partnerships live: Thumbtack OR Angi + Home Depot Product API

### Year 2 (2027–2028) — "English-speaking expansion + category deepening"

- UK + Canada + Australia launch (localized labor rates, currency, retailer APIs)
- Expansion to 150 categories (furniture assembly, major appliances, HVAC diagnostics)
- Add "Home Profile" — персистентный digital twin дома
- Warranty tracker, maintenance calendar, seasonal reminders
- Apple Watch companion (quick check для small repairs)
- Secondary persona activation: Sarah (single female HO) + Mike (DIY enthusiast)

### Year 3 (2028–2029) — "B2B tier + insurance integration"

- B2B dashboard для property managers (small landlords 5–50 units)
- Pilot partnerships с 2–3 insurance carriers для claims triage
- Spanish + Portuguese localization
- Crowd-sourced pricing corrections launch (users contribute actual costs)
- Proprietary fine-tuned vision model (отказ от сплошной зависимости на Claude API)

### Year 5 (2030–2031) — "Home Operating System"

- Predictive maintenance — notifications за 3–18 мес до expected failure
- Integration со smart home (Nest, Ring, SmartThings) — автоматический trigger estimate при обнаружении аномалии
- Insurance API — FixIt report как standard document для claims
- B2C tier splits: Basic / Pro ($19.99/мес, включая home history + priority support) / Family ($29.99/мес, multiple properties)
- 20M+ households с active FixIt profile globally

---

## Metrics Framework

Метрики, которые мы watchаем на каждом этапе жизненного цикла пользователя (AARRR + обогащения):

### Acquisition

| Метрика | Target Year 1 | Target Year 3 |
|---|---|---|
| DAU | 15K | 400K |
| MAU | 50K | 2M |
| DAU/MAU ratio | 30% | 45% |
| Signup conversion (install → account) | 55% | 70% |
| CAC blended | <$15 | <$8 |
| Organic/paid mix | 60/40 | 80/20 |

### Activation

| Метрика | Target Year 1 |
|---|---|
| First estimate completion rate (signup → first estimate finished) | >75% |
| Time to first "aha" (install → first estimate result) | <4 min median |
| Onboarding completion rate | >80% |
| Photo upload success rate (first attempt) | >85% |

### Retention

| Метрика | Target Year 1 | Target Year 3 |
|---|---|---|
| W1 retention | >40% | >55% |
| W4 retention | >25% | >40% |
| W12 retention | >15% | >28% |
| Estimates per user per month | 0.8 | 2.5 |
| **North Star: WEPA** | 0.35 | 1.2 |

### Revenue

| Метрика | Target Year 1 | Target Year 3 |
|---|---|---|
| ARPU (paying users) | $48/год | $70/год |
| LTV (paying users) | $120 | $195 |
| LTV:CAC ratio | 6x | 9x |
| Free→paid conversion | 5% | 8% |
| Estimate→affiliate conversion | 3% | 5% |
| Blended revenue per estimate | $0.85 | $1.60 |
| Gross margin | 94% | 96% |

### Referral

| Метрика | Target Year 1 | Target Year 3 |
|---|---|---|
| NPS (Emma segment) | ≥50 | ≥60 |
| K-factor (viral coefficient) | 0.4 | 0.7 |
| App Store rating | 4.6+ | 4.7+ |
| App Store reviews/month | 500 | 5K |

### Product quality (supporting)

| Метрика | Target |
|---|---|
| AI identification accuracy (top-30 categories) | ≥82% (Year 1), ≥90% (Year 3) |
| Price accuracy (within ±20% of actual outcome) | ≥70% (Year 1), ≥85% (Year 3) |
| Crash rate | <0.5% |
| API uptime | 99.7% |

Детальная decomposition и каденция ревью — в отдельном [FUNNEL.md](../04-ux/FUNNEL.md), который создаётся на Stage 4.

---

## Guiding Beliefs

Семь продуктовых убеждений, на которых built FixIt. Это не hypotheses (которые проверяются и опровергаются) — это **аксиомы**, из которых растут product decisions. Если хоть одна из них окажется неверна, FixIt как концепт не работает:

### 1. "Fear of overpaying is a bigger emotional driver than cost of repair itself"

Homeowner, который теряет $200 на необходимом repair — расстроен, но принимает. Homeowner, который теряет $200 потому что **его развели** — ragequits и ищет инструмент. Наш UX apellируют к this emotion: "честная цена" > "низкая цена". Это психология, которая определяет copy, paywall framing, маркетинг.

### 2. "People want confidence before action, not just information"

Google даёт information. FixIt даёт **confidence to act**. Разница: information = "faucet repair стоит $50–250". Confidence = "ты можешь починить это сам за $15 и 20 минут, вот шаги, вот материалы, вот video". Confidence requires personalization + decisiveness + authority. Мы строим продукт, который не боится быть authoritative (с proper disclaimers).

### 3. "Neutrality is a product feature, not a positioning"

На рынке, где все marketplace'ы conflict'ed by design, neutrality становится **structural differentiator**. User sense'ит когда он на funnel, и когда он — на honest advice. Neutrality — это не то что пишем в маркетинге, это то как строим business model (мы отказываемся от monetization paths, которые compromise'ят neutrality).

### 4. "Photo is always faster than typing"

Для visible damage input через photo — 3 секунды vs 30 секунд typing. В moment of stress (leak на полу) user хочет fastest possible path. Мы optim'изируем под photo flow и воспринимаем любой text-heavy input как design failure.

### 5. "Regional truth beats national averages at 10x"

Пользователь в Austin не хочет знать national average. Он хочет знать "сколько это стоит в Austin". Точность местного estimate — 10× ценнее чем полнота categories. Лучше 30 categories с accurate regional data, чем 300 categories с national averages (HomeWyse-style).

### 6. "Three options respect user agency; one recommendation insults it"

Если мы говорим "сделай сам" — half of users игнорируют (они не comfortable с DIY). Если говорим "позвони pro" — half игнорируют (они budget-constrained). **Три опции** работают потому что user sees himself в одной из них, и чувствует empowerment выбрать. Это respect > prescription.

### 7. "Home repair is a sequence, not a transaction"

Owning home — это serial sequence из 40–200 repair decisions over 10 years. Продукт, который запомнил прошлый repair и use'ит контекст для следующего, owns the relationship. Transactional продукты (look up once, forget) losing в long run. Мы строим для sequence.

---

## Дополнение: связь с Research

Это vision синтезировано из следующих research finding'ов (ссылки для deep dive):

- **Market size & growth** → [MARKET-RESEARCH.md §1](../01-research/MARKET-RESEARCH.md): $6–8B consumer TAM US, 9–10.5% CAGR home services
- **GO verdict rationale** → [RESEARCH-BRIEF.md §10](../01-research/RESEARCH-BRIEF.md#10-final-decision-framework): why every pillar supports продолжение
- **Competitive white space** → [RESEARCH-BRIEF.md §3.1](../01-research/RESEARCH-BRIEF.md): нет all-in-one player, clear category creation opportunity
- **Primary persona (Emma)** → [RESEARCH-BRIEF.md §4](../01-research/RESEARCH-BRIEF.md): 11–15M TAM, high product-market fit signals
- **Unit economics** → [RESEARCH-BRIEF.md §6](../01-research/RESEARCH-BRIEF.md): 96% gross margin, 8x LTV:CAC
- **Risks & mitigation** → [RESEARCH-BRIEF.md §7](../01-research/RESEARCH-BRIEF.md): medium risk profile, no showstoppers

---

**Next steps в Stage 2:**

1. [TARGET-AUDIENCE.md](./TARGET-AUDIENCE.md) — deep dive в Emma persona с JTBD framework
2. [PROBLEM-SOLUTION-FIT.md](./PROBLEM-SOLUTION-FIT.md) — value proposition canvas
3. [FEATURES.md](./FEATURES.md) — top-10 MVP features с RICE prioritization
4. [MONETIZATION.md](./MONETIZATION.md) — pricing tiers + affiliate strategy + ARPU model

---

*Этот документ — основа для всех product decisions на ближайшие 18 месяцев. Ревизия раз в квартал или при major pivot'е.*
