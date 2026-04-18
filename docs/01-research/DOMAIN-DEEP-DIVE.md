---
Проект: FixIt — AI home repair cost advisor
Дата: 2026-04-17
Статус: Draft v1
Автор: Research team (FixIt)
---

# DOMAIN DEEP DIVE — Home Repair, Pricing Data & AI Feasibility

**Назначение документа:** Technical + industry deep dive в домен home repair. Определяет **feasibility** продукта — можно ли в принципе собрать достоверный pricing-advisor на базе публичных API, AI-моделей и legal-допустимых источников данных. Если здесь "красные" флажки — дальше в продуктовую проработку можно не идти.

**Companion documents:** [MARKET-RESEARCH.md](./MARKET-RESEARCH.md), [COMPETITOR-ANALYSIS.md](./COMPETITOR-ANALYSIS.md), [USER-PERSONAS.md](./USER-PERSONAS.md).

**TL;DR для менеджмента:**

- Индустрия home repair в США — фрагментированная, сильно регулируемая по штатам, с огромной ценовой дисперсией. Средняя почасовая ставка лицензированного сантехника: $75–150, электрика: $50–130, HVAC: $75–150. Minimum service call — $100–300 почти везде.
- **Официальных product API у Home Depot нет.** Lowe's даёт partner-портал (apim.lowes.com), но только для существующих поставщиков/PROviders. Amazon PA-API имеет требование **10 orders / 30 days** — это killer для холодного старта. Walmart Marketplace API только для sellers.
- **Labor-rate данные** — либо BLS (бесплатно, но крупные категории), либо RSMeans (платная подписка ~$1500–3000+/год), либо scraping Thumbtack/HomeAdvisor публичных cost-guide страниц.
- **Thumbtack Pro API существует** (developers.thumbtack.com) — partner-only, но это реальный путь для lead-gen монетизации. Angi Leads API активируется через `crmintegrations@homeadvisor.com`.
- **AI feasibility:** Claude Vision + GPT-4V вполне определяют visible damage (протечки, трещины, сломанная мебель) с ~85–94% accuracy на controlled benchmarks. Скрытые проблемы (электрика за стеной, утечка газа, structural) — **NO-GO** для automated advice.
- **Legal red flag #1:** В большинстве штатов работы >$500–$2000 требуют licensed contractor. AI не может советовать "fix wiring yourself" для work требующего permit — это liability.
- **Unit economics (предварительно):** cost per estimate $0.05–0.15 (AI + API calls), revenue per paid user $10/мес или $15–40 за affiliate lead. Margin потенциально >70% при unit-volume.

---

## Оглавление

1. [Home Repair Industry Structure](#1-home-repair-industry-structure)
2. [Топ категорий repair-запросов](#2-типы-самых-популярных-repair-запросов)
3. [Furniture & Appliance Repair](#3-furniture--appliance-repair)
4. [Retailer APIs для material prices](#4-retailer-apis-для-real-time-material-prices)
5. [Labor Rate Data Sources](#5-labor-rate-data-sources)
6. [Regulatory / Legal considerations](#6-regulatory--legal-considerations)
7. [AI Feasibility](#7-ai-feasibility)
8. [Integration Complexity Matrix](#8-integration-complexity-matrix)
9. [Unit Economics Estimate](#9-unit-economics-estimate)
10. [Red flags / Risks](#10-red-flags--risks)
11. [Источники](#источники)

---

## 1. Home Repair Industry Structure

### 1.1 Licensed vs unlicensed trades

США делит домашние работы на **licensed trades** (требуют лицензии штата/муниципалитета) и **unlicensed handyman work** (не требуют до определённого ценового порога).

| Категория | Licensed требуется? | Почему |
|-----------|---------------------|--------|
| **Plumbing** (plumber) | ДА практически везде | Water supply & waste — риск заражения, протечек, затоплений |
| **Electrical** (electrician) | ДА практически везде | Пожарная безопасность, риск поражения током |
| **HVAC** (heating/AC) | ДА в 40+ штатах | Freon (EPA 608), gas lines, high-voltage |
| **Roofing** | В 30+ штатах | Fall safety, структурная нагрузка, code compliance |
| **Gas work** | ДА, всегда | Прямой риск взрыва/asphyxiation |
| **General contractor** (>$500–10000) | Зависит от штата | См. 1.4 |
| **Handyman** (painting, drywall patches, IKEA assembly, minor repairs) | Обычно НЕТ до $1000–2000 | Низкий risk tier |
| **Landscaper** | Обычно НЕТ | Кроме tree removal в некоторых штатах |
| **Painter** | Обычно НЕТ | EPA RRP lead-safe certification если дом до 1978 |

**Источник:** [Procore — Contractor License Requirements Guide](https://www.procore.com/library/contractors-license-guide-all-states), [NEXT Insurance — Handyman License by State](https://www.nextinsurance.com/blog/handyman-license-requirements/).

### 1.2 Средние почасовые ставки по трейдам (US, 2024–2025)

Данные из BLS OEWS May 2024 (medians), пересчитанные на hourly, плюс рыночные retail rates которые пользователь фактически платит (включают overhead, truck, insurance).

| Трейд | BLS median annual wage (2024) | BLS median hourly (wage, не retail) | Retail rate плательщика |
|-------|-------------------------------|-------------------------------------|-------------------------|
| **Plumber** | $62 970 | $30.27 | **$75–150/час**, master до $200 |
| **Electrician** | $62 350 | $29.98 | **$50–130/час** |
| **HVAC tech** | $59 810 | $28.76 | **$75–150/час** |
| **Roofer** | ~$51 000 | ~$24.50 | **$40–80/час**, но чаще per-square pricing |
| **Carpenter** | ~$56 000 | ~$26.90 | **$35–100/час** |
| **Painter** | ~$46 000 | ~$22.10 | **$20–50/час** |
| **Handyman** | N/A (no BLS code) | N/A | **$40–80/час** |

**Важно:** BLS wage = зарплата сотрудника. Retail rate = что платит homeowner, включает company overhead (40–60% markup), tools, truck, insurance, профит.

**Источники:**
- [BLS — Plumbers OOH](https://www.bls.gov/ooh/construction-and-extraction/plumbers-pipefitters-and-steamfitters.htm)
- [BLS — Electricians OOH](https://www.bls.gov/ooh/construction-and-extraction/electricians.htm)
- [BLS — HVAC Mechanics OOH](https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm)
- [Modernize — Plumber Cost per Hour 2025](https://modernize.com/plumbing/repair-cost/plumber-cost-per-hour)
- [ServiceTitan — Trades Salary Data](https://www.servicetitan.com/blog/trades-salary-data)

### 1.3 Региональная дисперсия

Labor rates значительно отличаются по регионам. Пример для entry-level plumber (source: ServiceTitan 2025):

| Регион | Entry-level hourly | Retail homeowner rate |
|--------|---------------------|----------------------|
| San Francisco Bay Area | $30.72 | $150–250 |
| New York City metro | $28–32 | $140–225 |
| Boston MSA | $26–30 | $130–200 |
| Chicago | $24–28 | $110–180 |
| Dallas-Fort Worth | $20–24 | $85–150 |
| Atlanta | $19–23 | $80–135 |
| Rural Midwest / Deep South | $16–22 | $65–110 |

**Продуктовый вывод:** FixIt **обязан** запрашивать ZIP при первом использовании. Цена сантехника в SF — почти 2× от цены в Мемфисе. Это не cosmetic detail, это core feature.

**Источник:** [ServiceTitan — Plumber Salary State-by-State](https://www.servicetitan.com/blog/plumber-salary)

### 1.4 Trip charge / minimum service call fees

Минимальная цена "приехать и посмотреть" — critical для всех оценок.

| Трейд | Service call / trip fee | Minimum billable |
|-------|-------------------------|------------------|
| Plumber | $50–100 flat (иногда включает 1й час) | 1–2 часа, итого $150–300 |
| Electrician | $75–150 | $100–200 минимум |
| HVAC | $75–200 (диагностика $89–129 типично) | 1 час минимум |
| Roofer | $50–150 (часто free для quote) | По проекту |
| Appliance repair | $75–130 diagnostic fee (часто крeditится в repair) | 1 час |

**Emergency/after-hours:** рейт вырастает на 50–100%. Ночной вызов сантехника = $150–300/час.

**Travel premium:** $1–2/миля после первых 10 миль — обычная практика.

**Источники:** [HomeGuide — Plumber Cost 2026](https://homeguide.com/costs/plumber-cost), [The Platinum Plumber — Service Call Costs](https://www.theplatinumplumber.com/blog-posts/how-much-is-a-plumber-service-call)

### 1.5 Labor vs material split

Общее правило для residential repair: **30–60% стоимости job — материалы, 40–70% — labor.** Но это сильно зависит от типа.

| Тип работы | Material share | Labor share | Комментарий |
|------------|----------------|-------------|-------------|
| Faucet replacement | 50–70% (зависит от fixture) | 30–50% | Дорогие fixtures = material-heavy |
| Outlet install (existing circuit) | 10–15% ($10–30 parts) | 85–90% ($150–320 labor) | **Labor-dominated** |
| Drywall patch (4" hole) | 15–25% | 75–85% | Labor-dominated |
| Water heater replace | 55–70% (unit $400–2000) | 30–45% ($300–800 install) | Material-heavy |
| HVAC condenser replace | 70–80% (unit $1500–5000) | 20–30% | Material-heavy |
| Roof shingle patch | 20–30% | 70–80% | Labor + access (ladder, safety) |
| Appliance diagnostic + repair | 30–50% (часть) | 50–70% | Часть + labor balanced |

**Продуктовый вывод:** для labor-dominated категорий (outlet install, drywall) retailer API почти не нужны — бóльшая часть цены это `labor_rate × time_estimate`. Для material-heavy (HVAC, water heater) — наоборот, SKU-level pricing критичен.

**Источники:** Анализ cross-reference [HomeAdvisor Cost Guide](https://www.homeadvisor.com/cost/), [Homewyse calculators](https://www.homewyse.com/).

---

## 2. Типы самых популярных repair-запросов

Данные агрегированы с HomeAdvisor True Cost Guide (300+ project types, 1M+ reported costs), Angi, Thumbtack, Fixr.com, HomeGuide. Volume estimates основаны на cross-reference cost-guide трафика и Thumbtack category lists (exact volume данных публично нет — flagged as "N/A — требует validation" где не подтверждено).

### 2.1 Топ-30 категорий

**Формат:** # | Категория | Avg cost | DIY feasibility (1–5) | DIY time | Pro time | Tools/Materials highlights

| # | Категория | Средняя цена (US) | DIY fe. | DIY time | Pro time | Key materials |
|---|-----------|-------------------|---------|----------|----------|---------------|
| 1 | **Leaky faucet repair** | $100–400 | 4 | 1–2ч | 30м | Washers, O-rings, cartridge ($5–60) |
| 2 | **Clogged drain** | $150–350 | 3 | 30м–2ч | 30м–1ч | Snake/auger, drain cleaner |
| 3 | **Toilet repair** (flapper/fill valve) | $80–250 | 4 | 30м–1ч | 30м | Flapper $5, fill valve $15 |
| 4 | **Drywall patch** (small/medium hole) | $300–800 | 3 | 2–4ч + dry time | 1–2ч + 1 day cure | Patch kit, spackle, paint ($15–40) |
| 5 | **Interior paint** (1 room) | $400–900 | 4 | 1–2 days | 1 day | Paint ($30–60/gal), brushes, tape ($30) |
| 6 | **Outlet replacement** (same circuit) | $100–350 | 3 | 30м (+ permit check) | 30м | Outlet $2–15, wire nuts |
| 7 | **Outlet install** (new wiring) | $300–1000 | 1 | DON'T DIY (permit + safety) | 1–3ч | Wire, box, breaker |
| 8 | **Light fixture replace** | $75–250 | 3 | 30м–1ч | 30м | Fixture + wire nuts |
| 9 | **Ceiling fan install** | $150–400 | 3 | 1–2ч | 1ч | Fan unit $80–300 |
| 10 | **Roof shingle patch** (few shingles) | $150–500 | 2 | 2–3ч + safety risk | 1–2ч | Shingles $30–100/bundle |
| 11 | **Gutter cleaning** | $115–450 | 4 | 1–3ч + ladder risk | 1–2ч | Gloves, bucket, leaf blower |
| 12 | **Gutter repair** (sagging/detached) | $200–600 | 2 | 2–4ч | 1–2ч | Hangers, sealant |
| 13 | **Window screen repair** | $40–150 | 5 | 30м–1ч | 30м | Screen mesh, spline ($10–20) |
| 14 | **Door knob/lock replace** | $50–200 | 5 | 30м | 15–30м | Knob $20–80 |
| 15 | **Hinge/door misalign** | $75–250 | 4 | 30м–1ч | 30м–1ч | Screws, shims |
| 16 | **Fence board replace** | $100–400 | 3 | 2–4ч | 1–2ч | Boards + screws |
| 17 | **Deck board replace** | $200–700 | 3 | 2–5ч | 2–3ч | Board $5–25/each |
| 18 | **Garage door spring replace** | $200–450 | 1 | **DON'T** — spring snap can kill | 30м–1ч | Specialty, pro only |
| 19 | **Garbage disposal replace** | $150–400 | 3 | 1–2ч | 1ч | Unit $70–250 |
| 20 | **Water heater replace** | $1000–3500 | 2 | 3–6ч (gas = permit) | 2–4ч | Unit $400–2000 |
| 21 | **Water heater repair** (thermostat/element) | $150–600 | 3 | 1–2ч | 1–2ч | Element $20–60 |
| 22 | **Dishwasher install/replace** | $200–550 | 3 | 2–3ч | 1–2ч | Unit $300–1200 |
| 23 | **Dishwasher repair** | $160–400 | 2 | N/A | 1–2ч | Parts vary |
| 24 | **Washer/dryer repair** | $125–450 | 2 | N/A | 1–2ч | Parts vary |
| 25 | **Refrigerator repair** | $150–400 (avg $275) | 2 | N/A | 1–2ч | Compressor $300–800 if major |
| 26 | **AC unit service/repair** | $150–450 (avg $319) | 2 | N/A | 1–2ч | Refrigerant (EPA license) |
| 27 | **Furnace repair** | $150–500 (avg $268) | 2 | N/A | 1–2ч | Igniter $40, blower $250 |
| 28 | **Caulk/grout refresh** (bathroom) | $75–300 | 5 | 1–3ч | 1–2ч | Caulk $5, tools $20 |
| 29 | **Weatherstripping** | $40–150 | 5 | 1ч | 30м | Stripping $10–30 |
| 30 | **IKEA / flat-pack furniture assembly** | $30–200 per piece | 4 | 1–4ч | 30м–2ч | Usually no extra materials |

**Flagged: точный annual volume per category — N/A — требует validation** через paid data (Statista Home Improvement, NAHB Remodeling Market Index, Harvard JCHS LIRA).

**Источники для цен:**
- [Angi — Leaky Faucet Cost 2026](https://www.angi.com/articles/plumber-cost-to-fix-leaky-faucet.htm)
- [Angi — Outlet Installation Cost](https://www.angi.com/articles/how-much-does-it-cost-install-outlet.htm)
- [Angi — Washing Machine Repair 2026](https://www.angi.com/articles/how-much-washing-machine-repair-costs.htm)
- [Angi — Refrigerator Repair 2026](https://www.angi.com/articles/how-much-does-refrigerator-repair-cost.htm)
- [Angi — HVAC Repair 2026](https://www.angi.com/articles/how-much-hvac-repair-cost.htm)
- [Angi — Roof Repair 2026](https://www.angi.com/articles/how-much-do-roof-repairs-cost.htm)
- [HomeGuide — Roof Repair Cost](https://homeguide.com/costs/roof-repair-cost)
- [HomeGuide — HVAC Repair Cost](https://homeguide.com/costs/hvac-repair-cost)
- [Today's Homeowner — Gutter Cleaning Cost](https://todayshomeowner.com/gutters/cost/gutter-cleaning-cost/)
- [Mr. Handyman — Top 10 Common Home Repairs](https://www.mrhandyman.com/blog/2025/june/top-10-most-common-home-repairs-and-when-to-call-a-pro/)
- [Family Handyman — 100 DIY Repairs](https://www.familyhandyman.com/list/home-repairs-you-can-do-yourself/)

### 2.2 DIY feasibility rubric

Шкала 1–5 для FixIt "DIY readiness" advisor. Разработана на основе risk + skill + permit considerations:

- **5 — TRUE DIY** — safe, no permit, minimal skill. Примеры: caulk, screen repair, door knob, IKEA assembly.
- **4 — DIY с tutorial** — нужен YouTube/pdf guide, basic tools. Faucet, toilet flapper, paint, simple drywall patch.
- **3 — Hybrid зона** — может DIY "если уверен", иначе риск redo $ × 2. Outlet swap same-circuit, fence board, disposal, fixture.
- **2 — NOT recommended** — специфические tools, высокий risk damage. Appliance diagnostics, roof patch, HVAC.
- **1 — DO NOT DIY** — safety-critical или permit-mandatory. Gas lines, new electrical wiring, garage door springs, structural, roof replacement.

**Продуктовое правило:** если DIY score ≤2, FixIt не показывает DIY option, только Hybrid (you buy parts) или Full Pro. Если DIY score = 1, не показывает даже Hybrid (только Pro).

---

## 3. Furniture & Appliance Repair

### 3.1 Appliance repair costs (US averages 2025)

| Категория | Diagnostic fee | Avg repair cost | Replace cost | Репейр window (age) |
|-----------|----------------|------------------|--------------|---------------------|
| **Washing machine** | $75–130 | **$180** (range $125–450) | $600–1800 | <8 лет → repair; >10 лет → replace |
| **Refrigerator** | $75–130 | **$275** (range $150–400) | $1200–3500 | <7 лет → repair; >10 + compressor → replace |
| **Dishwasher** | $75–130 | **$230** (range $160–400) | $400–1200 install | <7 лет → repair |
| **Oven/range** (electric) | $75–130 | **$220** (range $150–400) | $500–2500 | <10 лет → repair |
| **Microwave** | $75–130 | $100–200 (часто не стоит) | $80–500 | Почти всегда replace |
| **AC window unit** | $75–130 | $150–300 | $150–600 | Почти всегда replace при ломке |
| **AC central system** | $89–200 | $150–600 repair | $5000–12000 replace | <10 лет → repair |
| **Furnace** | $89–200 | $150–500 repair | $3000–7500 replace | <15 лет → repair |
| **Water heater** (tank) | $75–130 | $150–600 repair | $1000–3500 replace | <8 лет → repair |
| **Garbage disposal** | $75–130 | $100–250 repair | $150–400 replace | Replace dominant |

**Источники:**
- [HomeAdvisor — Washing Machine Repair 2025](https://www.homeadvisor.com/cost/kitchens/washing-machine-repair/)
- [Appliance Pickup Now — Appliance Repair Cost Guide](https://appliancepickupnow.com/appliance-repair-cost-guide/)
- [Spencer's TV — Appliance Repair Breakdown](https://www.spencerstv.com/blog/appliance-repair-cost-breakdown)
- [Best Appliance Repair — When to Repair vs Replace](https://best-appliancerepair.com/news/when-to-repair-vs-replace-your-appliances/)
- [CLT Appliance — Fix or Replace 2025](https://cltappliance.com/fixing-old-appliances-or-replacing-them/)

### 3.2 Replace vs Repair Rules (industry consensus)

**Правило 50%:** если repair > 50% от нового = replace.

**Возрастная калибровка 50%-правила:**

| Возраст прибора | Threshold для repair |
|-----------------|----------------------|
| <5 лет | Repair если <75% от replacement |
| 5–8 лет | Repair если <50% от replacement |
| 8–12 лет | Repair если <35% от replacement |
| >12 лет | Обычно replace |

Дополнительные флажки → **replace even if cheaper to repair:**
- Основные компоненты (компрессор холодильника, drum мотор стиралки, heat exchanger печи)
- Утечки freon / gas
- Energy-efficiency: старая AC 10 SEER vs. новая 16 SEER → replacement окупается за 3–5 лет
- Sealed system ремонт (холодильник) почти всегда >$500 + не долгий warranty → replace

**Средние expected lifespans (Consumer Reports / NAHB):**

| Прибор | Срок службы (лет) |
|--------|-------------------|
| Refrigerator | 10–15 |
| Washing machine | 10–14 |
| Dryer | 10–13 |
| Dishwasher | 9–12 |
| Range (electric) | 13–18 |
| Range (gas) | 15–18 |
| Microwave | 7–10 |
| Water heater (tank) | 8–12 |
| Water heater (tankless) | 15–20 |
| HVAC central | 12–17 |
| Furnace | 15–25 |

**Источник:** [Best Appliance Repair — Repair vs Replace Guide](https://best-appliancerepair.com/news/when-to-repair-vs-replace-your-appliances/), [CLT Appliance — 50% Rule with Age Calibration](https://cltappliance.com/fixing-old-appliances-or-replacing-them/).

### 3.3 Brand repairability

Фрагментированные отзывы (N/A для single authoritative source). Consumer Reports данные за 2023–2024:

- **Most repairable** (parts available, straightforward design): Whirlpool, Maytag, Frigidaire, GE (US brands), Speed Queen (commercial-grade washers).
- **Moderate:** Samsung, LG (modern electronics могут быть expensive to repair after warranty).
- **Least repairable** (proprietary parts, high cost): Bosch, Miele, Sub-Zero, Viking — premium brands с proprietary компонентами.

**Продуктовое правило:** FixIt может включить бренд в вопрос онбординга, но не рассчитывать на granular brand-level data — нет достоверного публичного источника SKU-level repairability. **Flagged: требует validation с paid Consumer Reports dataset или industry partnership.**

### 3.4 Furniture repair

| Категория | Avg cost | DIY feasibility | Notes |
|-----------|----------|------------------|-------|
| Chair leg/wobbly | $30–100 | 5 | Wood glue + clamps |
| Upholstery repair | $100–400 | 2 | Pro usually |
| Cabinet hinge | $30–80 | 5 | Hinge $5–15 |
| Drawer slide replace | $40–120 | 4 | Slide $10–40 |
| IKEA assembly | $30–200/piece | 4 (4–8h for novice) | TaskRabbit $38–81 via IKEA |
| Table refinishing | $150–600 | 3 | Sandpaper + stain + time |

**Источники:**
- [Fixr — Furniture Assembly Cost](https://www.fixr.com/costs/furniture-assembly)
- [HomeGuide — Furniture Assembly 2026](https://homeguide.com/costs/furniture-assembly-cost)
- [HomeGnome — IKEA Assembly Cost](https://homegnome.com/blog/cost/how-much-does-ikea-furniture-assembly-cost/)

---

## 4. Retailer APIs — для real-time material prices

### 4.1 Home Depot

**Official public API: НЕТ.** Home Depot не предоставляет public product/pricing API.

- **Pro Integrations** (homedepot.com/c/pro-integrations) — только для существующих pro-аккаунтов, quoting/ordering workflow integration. НЕ product search для сторонних apps.
- **Third-party wrapped APIs:**
  - **SerpApi Home Depot Product API** — scraped поиск по product listings. ~$50/мес startup tier, $250+/мес production.
  - **BigBox API (TrajectData)** — аналогично, pricing on-quote.
  - **Apify Home Depot scraper** — pay-per-result.
  - **RapidAPI community Home Depot endpoints** — небольшие free tiers, ненадёжные для production.

**Legal note:** scraping Home Depot напрямую нарушает их ToS. Третьепартийные "legal wrapper" API утверждают compliance, но этот статус fragile — Home Depot периодически блочит scrapers. **Риск:** закрытие source при scale.

**Cost estimate (третьепартийные):**
- Startup tier: $0.003–0.01 per query
- Scale (>10k queries/день): $0.001–0.003

**Источники:**
- [Home Depot Pro Integrations](https://www.homedepot.com/c/pro-integrations)
- [SerpApi Home Depot Product API](https://serpapi.com/home-depot-product)
- [BigBox API Trajectdata](https://trajectdata.com/ecommerce/big-box-api/)
- [Apify Home Depot API](https://apify.com/api/home-depot-api)

### 4.2 Lowe's

**Official API существует, но с restrictions:**

- **Developer Portal:** [developer.lowes.com/portal](https://developer.lowes.com/portal) — требует регистрации.
- **APIM portal:** [portal.apim.lowes.com](https://portal.apim.lowes.com/) — Microsoft Azure API Management, где после одобрения выдают ключ.
- **PROvider APIs** — 8 API для service providers: получение job details, update на complete jobs. Контакт: `SpecialtySalesSystemSupport@Lowes.com`.

**Для product/pricing data:** напрямую не публикуется как retail product search API. Lowe's API в большей степени orientated на B2B supplier/provider flows.

**Third-party alternatives:** Piloterr, WebScrapingAPI.

**Cost estimate (третьепартийные Lowe's):** $0.002–0.008 per query.

**Источники:**
- [Lowe's Developer Hub](https://developer.lowes.com/portal)
- [Lowe's APIM Portal](https://portal.apim.lowes.com/)
- [Syndigo — Lowe's API Quick Start](https://pages.syndigo.com/rs/539-CDH-942/images/Lowe's_API_Quick_Start_Guide.pdf)
- [Piloterr — Lowes Product Scraper](https://www.piloterr.com/library/lowes-product)

### 4.3 Amazon Product Advertising API (PA-API 5.0)

**Available. Но с жёсткими conditions:**

- **Rate limits:** стартует 1 TPS / 8 640 TPD.
- **Scaling:** +1 TPD за каждые $0.05 shipped revenue; до max 10 TPS.
- **Critical requirement (ноябрь 2025+):** нужно **минимум 10 qualifying orders за 30 дней** чтобы сохранить API access.
- **Implication для FixIt:** холодный старт без affiliate-sales history → аккаунт deprecate до первых orders. Надо либо параллельно растить Amazon affiliate revenue (embed tool links), либо стартовать с другого источника.
- **Error handling:** 429 TooManyRequests если overuse.
- **Best practice:** до 10 ASINs в одном GetItems request, используй batch.

**Cost:** free в рамках limits, но Amazon берёт revenue share от affiliate purchases.

**Источники:**
- [PA-API 5.0 Rate Limits](https://webservices.amazon.com/paapi5/documentation/troubleshooting/api-rates.html)
- [PA-API 5.0 Best Practices](https://webservices.amazon.com/paapi5/documentation/best-programming-practices.html)
- [KeywordRush — 10-Sales Rule](https://www.keywordrush.com/blog/amazon-pa-api-associatenoteligible-error-is-there-a-new-10-sales-rule/)
- [Amazon Associates Help](https://affiliate-program.amazon.com/help/node/topic/GLL6HEVVWUKMQDDQ)

### 4.4 Ace Hardware

**Official public API: НЕТ.** Ace — кооператив независимых магазинов, локальные цены отличаются store-by-store. SKU-level public API не публикуется.

**Workaround:** general third-party scraping (аналогично Home Depot), но volume trafficа низкий vs Home Depot/Lowe's.

**Vertical note:** Ace часто держит более специализированный niche hardware/tools — полезен для uncommon repair supplies. **Flagged: требует validation если окажется high-priority — возможно reach out partnership.**

### 4.5 Walmart Marketplace API

**Public product search API — НЕТ.** Walmart API — только для marketplace sellers: item management, orders, prices, inventory.

- **Developer portal:** [developer.walmart.com](https://developer.walmart.com/)
- **Access требует:** seller account, approval process.
- **Product search:** не поддерживается для public consumer-facing apps.

**Third-party:** WebScrapingAPI, Scrapfly — аналогичный pattern.

**Источники:**
- [Walmart Developer Home](https://developer.walmart.com/)
- [Walmart Marketplace Learn — API Integration](https://marketplacelearn.walmart.com/guides/Getting%20started/Getting%20ready%20to%20sell/Integration-methods-API)
- [Scrapfly — Walmart API Guide](https://scrapfly.io/blog/posts/guide-to-walmart-api)

### 4.6 Price comparison APIs — альтернатива retailer APIs

| Провайдер | Что даёт | Pricing |
|-----------|----------|---------|
| **PriceAPI (priceapi.com)** | Amazon + Google Shopping + eBay + 100+ источников в 30 странах | Credit-based, ~$0.001–0.005 per query |
| **Metoda Price API** | Same (enterprise) | Custom |
| **PricesAPI (pricesapi.io)** | Real-time pricing | Subscription tiers |
| **BuyBox API (Amazon-specific)** | Specifically BuyBox winner tracking | Для sellers, не для retail lookup |

**Legal note:** price comparison APIs обычно в grey zone ToS retailers. Они сами несут compliance risk, но это не 100% bulletproof для FixIt.

**Источники:** [PriceAPI](https://www.priceapi.com/), [PricesAPI](https://pricesapi.io/).

### 4.7 Рекомендация для MVP

**Layered approach:**

1. **Primary:** базовая SKU database (~2000 common repair parts) вручную составленная + price refresh через scheduled scrape via PriceAPI или SerpApi.
2. **Secondary:** Amazon PA-API для tool links (затем для affiliate revenue once we hit 10 sales/30d).
3. **Fallback:** static "typical range" estimates для edge cases (e.g. "washer drum motor: $80–180" без linked SKU).

**Это решает две проблемы:**
- Cost efficiency (most queries hit cached prices).
- Legal resilience (нет прямого real-time dependency на любой single retailer API).

---

## 5. Labor Rate Data Sources

### 5.1 Thumbtack Pro API

**Существует и документирован:**
- [developers.thumbtack.com](https://developers.thumbtack.com/) — Partner Platform.
- [API Reference](https://developers.thumbtack.com/api-reference).
- **Access:** partner-only, нужен Thumbtack Agency Partner status.
- **Функционал:** lead transfer, two-way messaging, scheduling workflows.
- **Lead pricing:** $10–100+ per lead в зависимости от категории/региона. Pay только если customer responds.
- **Pricing модель:** dynamic, обновляется еженедельно на основе supply/demand.

**Partnership pathway:** [thumbtack.com/partnerships](https://www.thumbtack.com/partnerships) — подаётся заявка на Agency Partner.

**Revenue share:** не публикуется, переговорно. Для affiliate-style referrer типичная ставка $15–40 per qualified lead.

**Источники:**
- [Thumbtack Developers Portal](https://developers.thumbtack.com/)
- [Thumbtack Press — Pro API Launch](https://press.thumbtack.com/announcements/thumbtack-launches-new-pro-api-to-help-service-professionals-grow-sustainably/)
- [Thumbtack Pay for Leads FAQ](https://help.thumbtack.com/article/pay-for-leads)
- [Thumbtack Partnerships](https://www.thumbtack.com/partnerships)

### 5.2 HomeAdvisor / Angi API

- **Activation:** email `crmintegrations@homeadvisor.com` для активации Angi Leads API.
- **Lead pricing:** $15–100 за lead (дороже — бóльшие проекты и competitive cities).
- **Affiliate program:** [homeadvisor.com/rfs/aboutus/affiliates/affiliateSignup.jsp](https://www.homeadvisor.com/rfs/aboutus/affiliates/affiliateSignup.jsp) — signup через partner affiliate network (CJ/Impact/Rakuten).
- **Corporate:** Angi Ads + HomeAdvisor = same parent (Angi Homeservices Inc.) → унифицированная data layer.

**Revenue share for affiliate referrer:** $8–35 per qualified lead (historical range).

**Источники:**
- [HomeAdvisor Affiliate Program](https://www.homeadvisor.com/rfs/aboutus/affiliates/affiliateSignup.jsp)
- [ClientTether — Angi Leads API Integration](https://support.clienttether.com/home-advisor/)
- [HomeAdvisor — How It Works](https://www.homeadvisor.com/spa/how-it-works)

### 5.3 Yelp Fusion API

- **Purpose:** фильтровать local service businesses (не labor rate per se, но business discovery).
- **Pricing:** Starter $7.99/1000 calls (300/day free trial). Plus $9.99, Enterprise $14.99.
- **Данные:** location, hours, reviews, ratings (до 160 chars preview).
- **Use case в FixIt:** показ "3 ближайших plumber с рейтингом 4.5+" без интеграции booking.

**Источники:**
- [Yelp Fusion API](https://business.yelp.com/data/products/fusion/)
- [Yelp Data Pricing](https://business.yelp.com/data/resources/pricing/)
- [TechCrunch — Yelp API Charges 2024](https://techcrunch.com/2024/08/02/yelps-lack-of-transparency-around-api-charges-angers-developers/)

### 5.4 BLS (Bureau of Labor Statistics)

- **Бесплатный, authoritative для US labor data.**
- **Resources:**
  - [Occupational Outlook Handbook](https://www.bls.gov/ooh/) — по профессиям (plumbers, electricians, HVAC, roofers…).
  - [OEWS — Occupational Employment & Wage Statistics](https://www.bls.gov/oes/) — на уровне state и MSA (metropolitan statistical area).
  - API: [bls.gov/developers](https://www.bls.gov/developers/) — до 500 queries/день бесплатно, registered key = 500/день с 50 series/query.
- **Granularity:** wage distribution percentiles (10th, 25th, 50th, 75th, 90th) на уровне штата/MSA.
- **Обновление:** Annual (May data published the following March/April).

**Limitation:** BLS = _wages_, не retail rates. Retail plumber charges $75–150/час, но BLS median wage $30.27/час. Нужен multiplier 2.5–3× для оценки retail ставки из BLS.

**Рекомендация:** использовать BLS как **base anchor**, умножать на regional markup coefficient (подбираемый из Thumbtack/HomeAdvisor observed prices).

### 5.5 RSMeans (industry standard для construction cost data)

- **Публикуется Gordian** — [rsmeans.com](https://www.rsmeans.com/).
- **Subscription tiers:** Core / Complete / Complete Plus (точные цены не публичны, но исторически $1500–3500+/год per user).
- **Альтернатива:** annual printed Cost Books ($250–450 per book), охватывают Building Construction Costs, Residential, Facilities Maintenance, etc.
- **Что внутри:** unit-level labor + material cost для 30 000+ construction tasks, по locality factors (тысячи городов).
- **Точность:** industry gold standard, используется insurance adjusters, контракторами, GCs.

**Для FixIt:** Complete subscription ($3000+/год) даёт гибкий API-like доступ к labor + material breakdowns. **Dealbreaker для pre-funding MVP**, но strong signal для later.

**Источники:**
- [RSMeans — 2025 Cost Books](https://www.rsmeans.com/products/books/2025-cost-data-books)
- [RSMeans Complete](https://www.rsmeans.com/complete)
- [Capterra — RSMeans Pricing](https://www.capterra.com/p/151681/RSMeans/)

### 5.6 Альтернативы RSMeans

| Источник | Что даёт | Cost |
|----------|----------|------|
| **Craftsman National Estimator** | Similar scope, Construction Estimator Books | $100–250/год per book |
| **Homewyse** | Free online calculators + API-like data | Free / ad-supported |
| **HomeAdvisor True Cost Guide** | 300+ категорий, локализация по ZIP | Free (scrape-able but ToS-restricted) |
| **Fixr.com Cost Guides** | 500+ категорий | Free |
| **Xactware** (insurance industry standard) | Extremely granular labor + material | Enterprise-only |

**Стратегия для FixIt MVP:** агрегировать Homewyse + Fixr + HomeAdvisor cost ranges для top 100 categories. Обновлять квартально. Стоимость: **$0 если manual, $200–500 если automated via scraping API.**

---

## 6. Regulatory / Legal Considerations

### 6.1 "Not professional advice" disclaimer

**Juridically:** disclaimer не делает вас immune. Courts consistently hold operators, not AI, liable.

**Cornerstone principles:**
- Disclaimer НЕ защищает от gross negligence или intentional misconduct.
- Courts scrutinize **clarity, prominence, reasonableness** of disclaimer relative to harm.
- "Technological veil" — не приемлем: если AI дало совет, компания ответственна как за human advice.

**Минимальный pattern для FixIt:**

1. **Onboarding disclaimer (обязательный accept):** "FixIt provides AI-generated estimates for informational purposes only. Estimates are NOT professional engineering, plumbing, electrical, or contracting advice. Always consult a licensed professional for any work involving electrical, gas, plumbing, structural, or roofing systems."
2. **Per-estimate inline banner** для high-risk категорий: "This work may require a licensed [plumber/electrician] in your area. Check local permit requirements."
3. **Limitation of liability в ToS:** cap damages at subscription fee × 12, exclude consequential/indirect damages.

**Практический вывод:** disclaimer — necessary but not sufficient. Нужен также **refusal logic** в AI: для gas leaks, structural cracks, ответ должен быть _only_ "call a licensed pro immediately."

**Источники:**
- [Law Insider — AI Disclaimer Clauses](https://www.lawinsider.com/clause/ai-disclaimer)
- [Termly — No-Responsibility Disclaimer Templates](https://termly.io/resources/articles/no-responsibility-disclaimers/)
- [Vasquez Law — AI Chatbot Liability](https://www.vasquezlawnc.com/blog/ai-chatbot-liability)
- [TechLifeFuture — AI Liability 2026](https://www.techlifefuture.com/ai-liability-professional-services/)
- [DR&A Law Firm — AI Contracts Waivers](https://danielrosslawfirm.com/2025/07/28/ai-and-contracts-why-you-need-waiver-and-limitation-of-liability-provisions-for-ai-tools/)

### 6.2 Building permit requirements

Общая логика: **permits нужны если работа меняет структуру, use, или safety systems.**

Typical permit-triggering work:

| Work | Permit? |
|------|---------|
| New electrical circuit / outlet (new wiring) | **YES** (almost always) |
| Replacing existing outlet same circuit | Обычно нет |
| Water heater replacement (gas) | **YES** |
| Water heater replacement (electric, same location) | Часто нет |
| New plumbing fixtures (move waste lines) | **YES** |
| Repair existing fixture | Нет |
| Major HVAC system change | **YES** |
| AC service/refrigerant refill | Нет |
| Roof replacement | **YES** (в большинстве юрисдикций) |
| Roof shingle patch | Зависит от размера (обычно нет) |
| Window replacement (same size opening) | Часто нет |
| Window enlargement / new cut | **YES** |
| Fence installation >6 ft | **YES** typically |
| Fence <6 ft | Зависит |
| Interior paint, caulk, cabinet | Нет |

**Муниципальная вариативность:** каждый город/county имеет свой код. FixIt не может дать authoritative permit-needed/not-needed verdict без municipal API. **Лучший подход:** always rec "verify with local building office" для permit-adjacent categories.

**Источники:**
- [Nolo — When Homeowners Must Obtain Permits](https://www.nolo.com/legal-encyclopedia/home-improvement/when-homeowners-must-obtain-permits-for-home-projects.html)
- [NYC Buildings — Do I Need a Permit](https://www.nyc.gov/site/buildings/property-or-business-owner/do-i-need-a-permit.page)
- [Portland.gov — Residential Permits](https://www.portland.gov/ppd/residential-permitting/do-you-need-permit/residential-permits)
- [2-10 Home Buyers Warranty — Permits Need Guide](https://www.2-10.com/blog/home-improvement-project-need-building-permit2-10-blog/)
- [Family Handyman — 13 DIY Projects That Need Permit](https://www.familyhandyman.com/list/diy-home-improvements-you-need-a-permit-for/)

### 6.3 Contractor licensing thresholds by state

Обзор sample thresholds для understanding scale:

| Штат | Unlicensed handyman job limit | Notes |
|------|-------------------------------|-------|
| **California** | $1000 (labor + materials combined) — AB 2622, с 1 янв 2025 | Прежде был $500 |
| **Arizona** | $1000 или permit-triggering | "Handyman exemption" |
| **Alaska** | $10 000 | High threshold, но business license still needed |
| **Arkansas** | $2000 | HIL license above |
| **Nevada** | $1000 или permit | |
| **Oregon** | $1000 (казуальное/минорное) | Most require CCB license |
| **Texas** | Нет state-level general license | Только для electrical/plumbing/HVAC |
| **Florida** | No state handyman license; но counties have | Licensed for elec/plumb/HVAC |
| **New York** | NYC: HIC license >$200 (!) | Strictest |
| **Массачусетс** | HIC for >$1000 | Home Improvement Contractor |

**Penalties for unlicensed work:** fines, stop-work orders, criminal charges, loss of lien rights.

**FixIt implications:**
- Cannot label "DIY this" for work >state threshold без red-flag permit notice.
- For Hybrid option, "you buy parts, hire installation" — install должен быть licensed pro для regulated trades.
- Regional logic: user ZIP → state licensing table → DIY availability gate.

**Источники:**
- [Procore — Contractor License Guide All States](https://www.procore.com/library/contractors-license-guide-all-states)
- [NEXT Insurance — Handyman License by State](https://www.nextinsurance.com/blog/handyman-license-requirements/)
- [Handyman Startup — Licenses and Laws](https://www.handymanstartup.com/handyman-licenses-and-laws/)
- [Contractors Licensing Schools — Legal Limits Blog](https://contractorslicensingschools.com/blog/understanding-the-legal-limits-of-handyman-work-in-2025/)
- [InvoiceFly — Handyman License by State](https://invoicefly.com/academy/handyman-license/)

### 6.4 Liability — кто виноват если AI дал плохой совет

**Legal consensus (2024–2026):**

- **FixIt (Anthropic клиент) несёт primary liability** за output своего продукта.
- Anthropic (provider LLM) _обычно_ NOT liable в downstream consumer harm если их API использовался в рамках usage policy.
- User's contributory negligence возможна (e.g., "I ignored the 'call a pro' warning"), но courts slant pro-consumer в сложных cases.
- Insurance: FixIt нужен **Tech E&O (Errors & Omissions)** + **General Liability**. Ballpark $3000–15000/year начинания.

**Продуктовые mitigations:**
- Explicit refusal logic для high-risk categories.
- Audit log каждого AI-reply, сохранять минимум 2 года.
- User must acknowledge final "you are responsible" checkbox before executing DIY based on estimate.
- Insurance policy with cyber / tech E&O coverage.

### 6.5 Insurance implications для affiliate leads

- Если FixIt направляет user к pro, а pro делает плохую работу — FixIt обычно NOT liable _если не утверждал_ endorsement ("best plumber in SF"). Нейтральная формулировка ("here are 3 options, choose one") safer.
- Formal partnerships с Thumbtack/Angi обычно включают indemnification clause (они покрывают liability for their pros).
- **Important:** не брать responsibility за pro's work quality. FixIt = discovery tool, not contractor aggregator.

### 6.6 GDPR / CCPA для user data

- **Photos = personal data** (могут show address, license plates, family). Must be treated как PII.
- **CCPA / CPRA (California):** user имеет право delete, access, opt-out of sale.
- **GDPR (EU users если продукт global):** consent, data minimization, right to erasure, DPO если >250 employees.
- **Product implications:**
  - Photos stored in Supabase storage с encryption at rest (Supabase has it by default).
  - 90-day retention default; user delete → purge from all backups within 30 days.
  - Consent modal при first photo upload.
  - Privacy policy с explicit mentions.

### 6.7 PCI DSS для payments

- Adapty (planned for subscriptions) handles PCI-compliant payment processing. FixIt never touches raw card data → **SAQ A** compliance level (easiest).
- Если позже добавим direct hiring flow (pay the plumber through FixIt), complexity растёт до **SAQ A-EP** or higher — **избегать до scale.**

---

## 7. AI Feasibility

### 7.1 Claude Vision / GPT-4V / Gemini Vision — что могут

**Reliably identify (visible damage):**

| Problem type | Confidence (controlled conditions) | Notes |
|--------------|-----------------------------------|-------|
| Leaky pipe (water visible) | 90–95% | Water stains, drip signature |
| Broken furniture (chair, table) | 85–90% | Obvious breaks |
| Cracked tile / drywall hole | 85–92% | Distinguishable from shadow |
| Missing shingles | 80–90% | Needs decent image quality |
| Appliance model ID (photo of sticker) | 95%+ (text reading) | OCR-backed |
| Faucet / fixture model (from photo) | 70–85% | Ambiguous без brand logo |
| Furniture brand (IKEA etc.) | 60–75% | Требует logo visible |
| Clogged drain | Limited — often not visible | User description > photo |

**Struggles / NO-GO:**

| Problem type | Confidence | Verdict |
|--------------|------------|---------|
| Hidden electrical (wiring in wall) | Cannot see | NO-GO |
| Gas leak (invisible, smell only) | Cannot see | NO-GO (safety-critical) |
| Structural foundation problems | Very low | NO-GO (requires engineer) |
| Mold (subcutaneous) | Low | Surface only; pro test needed |
| HVAC internal mechanical | Low | Sounds + diagnostic tools > photo |
| Slow leak behind drywall | Low | Water stain visible stage only |
| Roof underlayment | Very low | Surface shingles only |

**Продуктовое правило:** FixIt показывает "?" confidence indicator + always recommends pro inspection if confidence <75%.

**Источники:**
- [MIT News — Image Recognition Accuracy Challenge 2023](https://news.mit.edu/2023/image-recognition-accuracy-minimum-viewing-time-metric-1215)
- [Keylabs — Comparing AI Image Recognition Platforms](https://keylabs.ai/blog/the-recognition-giants-comparing-leading-ai-image-recognition-platforms/)
- [AIMultiple — Top Image Recognition Tools 2026](https://aimultiple.com/image-recognition-software)

### 7.2 Accuracy benchmarks из аналогичных identifier apps

Из отчётов bug/plant/skin identifier приложений (similar "photo → classify" pattern):

- **Seek by iNaturalist** (plants/animals) — 80–92% top-3 accuracy.
- **PictureThis** (plants) — claimed 98% accuracy, independent testing ~85–90%.
- **PlantNet** — 85–90% top-5.
- **Picture Mushroom** — 90%+ claimed, independent testing ~75–85%.
- **SkinVision** (skin lesions) — 95% sensitivity / 78% specificity (FDA-cleared).

**Hive Moderation** (AI-generated image detection) — 94% accuracy.

**Interpretation для FixIt:** с vanilla Claude Vision realistic accuracy для home repair visible problems = **80–90%**. Fine-tuning на domain-specific dataset может поднять до 92–95%, но требует curated 5000–20 000 image dataset = $15 000–80 000 investment.

### 7.3 Fine-tuning: need or not

**For MVP:** NO. Vanilla Claude Sonnet Vision + well-crafted prompt with few-shot examples = достаточно для 80–85% success.

**For v2 / scale:** YES, когда:
- Accumulated >10 000 user-uploaded photos + feedback ("was this right?").
- Identified specific failure modes (e.g., AI часто confused между "water stain" и "mold").
- Ready to invest $20 000+ в labelled dataset + Anthropic fine-tuning API.

**Alternative (cheaper):** RAG — store corrected examples as knowledge base, retrieve similar к user's photo. Cost: $200–500/мес vs $20 000 fine-tune.

### 7.4 Cost per inference comparison

На 1 image estimate (~1600 tokens image input, ~500 output):

| Модель | Input tokens | Cost per estimate (image + context + output) |
|--------|--------------|----------------------------------------------|
| **Claude Sonnet 4.6** | ~1600 image + 500 text | ~$0.008 (input) + $0.008 (output) = **~$0.016** |
| **Claude Opus 4.7** | ~4784 image + 500 text | ~$0.08 (input) + $0.04 (output) = **~$0.12** |
| **GPT-4o Vision** | ~1000–1600 image tokens | **~$0.005–0.012** |
| **GPT-5.2** | 1000+ | **~$0.018** |
| **Gemini 2.5 Pro** | $1.25/1M input under 200K context | **~$0.003–0.006** |
| **Gemini 2.5 Flash** | $0.075/1M input | **~$0.0005 (very cheap)** |

**Рекомендация:** стартуем с **Claude Sonnet 4.6 для primary vision/reasoning** ($0.015/estimate), fallback to **Gemini Flash для bulk pre-classification** ($0.0005/estimate). Routing logic: Flash для initial triage, Sonnet для tough cases.

**Источники:**
- [Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [IntuitionLabs — AI Pricing Comparison 2026](https://intuitionlabs.ai/articles/ai-api-pricing-comparison-grok-gemini-openai-claude)
- [Price Per Token — Claude Pricing](https://pricepertoken.com/pricing-page/model/anthropic-claude-3.7-sonnet)
- [Finout — Anthropic API Pricing 2026](https://www.finout.io/blog/anthropic-api-pricing)

---

## 8. Integration Complexity Matrix

Таблица: для каждой категории ремонта — required data, API complexity (1–5), AI complexity (1–5), overall feasibility.

Шкала: 1 = trivial, 5 = extremely complex.

| Категория | Data sources | API complexity | AI complexity | Overall feasibility MVP | Notes |
|-----------|--------------|----------------|---------------|-------------------------|-------|
| **Leaky faucet** | Home Depot/Lowe's parts + generic labor | 2 | 2 | ✅ High | Standard cartridge DB, easy vision |
| **Toilet repair** | Retailer parts + generic labor | 2 | 2 | ✅ High | Flapper/fill valve SKUs |
| **Drywall patch** | Patch kit + paint + labor | 1 | 2 | ✅ High | Mostly labor time estimate |
| **Interior paint** | Paint cost + supplies + labor | 1 | 3 | ✅ High | Surface area from photo is tricky but generally possible |
| **Outlet replacement** | Outlet SKU + licensed electrician | 2 | 3 | ✅ Medium | Permit check layer needed |
| **Outlet install new** | Wire + box + breaker + licensed electrician | 3 | 4 | ⚠️ Low (liability) | Не рекомендовать DIY |
| **Light fixture** | Fixture SKU + labor | 2 | 2 | ✅ High | |
| **Ceiling fan** | Fan SKU + electrician | 3 | 3 | ✅ Medium | |
| **Roof shingle patch** | Shingle bundle + roofer | 2 | 4 | ⚠️ Medium | Hard to estimate scope from photo |
| **Gutter cleaning** | Just labor | 1 | 1 | ✅ High | No parts |
| **Gutter repair** | Hangers + labor | 2 | 3 | ✅ Medium | |
| **Window screen** | Screen roll + spline | 1 | 2 | ✅ High | Easy DIY |
| **Door knob** | Knob SKU + labor | 1 | 1 | ✅ High | |
| **Hinge misalign** | Parts minimal + labor | 1 | 2 | ✅ High | |
| **Fence board** | Board + screws + labor | 1 | 2 | ✅ High | |
| **Garage door spring** | Spring (specialty) + pro-only | 3 | 3 | ⚠️ Low (safety) | Pro-only option |
| **Garbage disposal** | Unit + plumber/electrician | 2 | 2 | ✅ Medium | |
| **Water heater replace** | Unit + gas/electric/install labor | 4 | 3 | ⚠️ Medium | Permit + code complexity |
| **Dishwasher install** | Unit + install labor | 2 | 2 | ✅ Medium | |
| **Appliance repair** (any) | Parts DB (brand-specific!) + tech | 5 | 4 | ⚠️ Low | Brand parts DB = biggest gap |
| **HVAC repair** | Parts + licensed tech | 4 | 4 | ⚠️ Low | EPA 608 refrigerant, high complexity |
| **HVAC full replace** | System + install | 5 | 3 | ❌ Low | Extensive scope, require site visit |
| **Caulk/grout** | Tube + labor | 1 | 1 | ✅ High | |
| **Weatherstripping** | Stripping + labor | 1 | 1 | ✅ High | |
| **IKEA assembly** | No parts, just time × hourly | 1 | 2 | ✅ High | TaskRabbit benchmark $30–200 |
| **Furniture repair** (general) | Minimal parts + labor | 2 | 3 | ✅ Medium | Wide variety |
| **Foundation crack** | Engineer consult, no parts | 4 | 5 | ❌ Low | Cannot assess structural from photo |
| **Mold remediation** | Testing + removal + HVAC check | 5 | 5 | ❌ Low | Regulated, liability high |
| **Sewer line** | Camera inspection required | 5 | 5 | ❌ Low | Not visible |

### 8.1 MVP scope decision

**IN SCOPE for MVP (top 20 visibly identifiable):**
Leaky faucet, toilet, drywall patch, paint, outlet swap (existing), light fixture, ceiling fan, gutter cleaning, gutter repair, window screen, door knob, hinge, fence board, disposal, dishwasher install, caulk/grout, weatherstripping, IKEA assembly, furniture repair, minor roof shingle patch.

**OUT of MVP scope (defer to v2 or never):**
New electrical wiring, HVAC full replace, foundation, mold, sewer, gas appliance install, garage door springs.

**Пограничная зона (show "Pro only" estimate, not DIY):**
Water heater replace, appliance repair (brand-specific), HVAC repair, roof replace.

---

## 9. Unit Economics Estimate

### 9.1 Cost per estimate

**Assumptions:** average estimate = 1 photo + 2–3 clarifying questions + AI response + 2–5 price lookups.

| Cost item | Amount per estimate |
|-----------|---------------------|
| Claude Sonnet 4.6 vision+reasoning | $0.015 |
| Retailer API calls (2–5 SKU lookups, cached) | $0.002 ($0.01 if uncached) |
| Labor rate lookup (BLS cached / internal DB) | $0.000 (preloaded) |
| Supabase storage / compute (photo store, DB query) | $0.003 |
| Server compute (API layer, auth, request handling) | $0.002 |
| CDN / image resize | $0.001 |
| **Total typical cost** | **~$0.023 per estimate** |
| Total with high-accuracy Opus fallback (10% of cases) | ~$0.035 avg |

**Worst-case scenario (uncached, new category, Opus):** ~$0.15.

### 9.2 Revenue per estimate (monetization paths)

| Monetization | Revenue per user/estimate | Conversion expected |
|--------------|----------------------------|---------------------|
| Subscription ($9.99/mo unlimited) | If user uses 5 estimates/mo → $2 per estimate | ~3–5% free→paid (industry avg) |
| Pay-per-estimate ($2.99) | $2.99 (minus Adapty 20% = $2.39 net) | Low, but high intent |
| Affiliate lead to Thumbtack / Angi | $15–40 per qualified lead | ~2–5% of estimates → lead |
| Amazon affiliate tools/materials | 3–8% of purchase, avg order $30 = $1–2.40 | ~5–10% click → buy rate |

### 9.3 Gross margin modeling

**Scenario A — Subscription-primary:**
- ARPU $9.99 × 80% after Apple/Google 30% (or 15% after year 1) = $7.00
- Usage: avg 4 estimates/мес = $0.092 cost
- GM per subscriber: ($7.00 - $0.092) / $7.00 ≈ **98.7% gross margin** on ARPU.
- После subtraction of CAC, infra, team → net economic per MRR dollar ~50–60%.

**Scenario B — Free user + affiliate:**
- 0 direct revenue.
- 3% conversion to lead @$25 avg = $0.75 expected revenue per estimate.
- Cost $0.023.
- GM: ($0.75 - $0.023) / $0.75 ≈ **97% GM on affiliate revenue.**
- Очень зависит от conversion rate. Если 1% lead conversion → $0.25 rev vs $0.023 cost, still ~90%.

**Scenario C — Pay-per:**
- $2.99 revenue - $0.60 (Apple IAP fee) = $2.39 net.
- Cost $0.023.
- GM ~99% per purchase.
- Limited by low repeat (occasional users).

**Combined outlook:** при любом из трёх путей unit economics прибыльные. Risk — в **CAC** (acquisition cost) и **retention**, не в per-estimate margin. MVP финансово viable при CAC < $15 и 30-day retention >25%.

### 9.4 Break-even arithmetic

Если $9.99/мес subscription, 15% annual churn (85% retain to month 12):
- LTV = $9.99 × 7 × 0.80 (store fee) ≈ $55 per customer (conservative 7-mo avg life).
- Max sustainable CAC ~$18 for 3× LTV/CAC ratio.

---

## 10. Red Flags / Risks

### 10.1 Retailer API cutoffs

- Home Depot / Lowe's не имеют public API → third-party scraping API **может быть закрыт** в любой момент.
- Amazon PA-API: 10-orders-per-30-days rule может disable access при early-stage product.
- **Mitigation:** build fallback to manual SKU database (~2000 most common items), refreshed weekly via multi-source.

### 10.2 Thumbtack / HomeAdvisor affiliate enforcement

- Both platforms strict о "affiliate-like behavior" — cannot aggregate quotes and represent them as app's own data.
- Both have terms prohibiting "competing aggregator" positioning.
- **Mitigation:** строго partner/referrer model — направляем user к их платформе, не пытаемся брать quote data и perezazhigat как внутренний.

### 10.3 Labor rates устаревают быстро

- BLS refresh — annual.
- RSMeans refresh — quarterly.
- Local rates могут меняться 10–20% за год (inflation, skill shortage).
- **Mitigation:** quarterly refresh cycle + user-feedback loop ("was this quote accurate?" → signal для correction).

### 10.4 Scam rings через affiliate links

- Risk: мошеннические контракторы, появляющиеся в Thumbtack/Angi result sets, FixIt рекомендует, customer loses money.
- **Mitigation:** только Thumbtack/Angi official partners (их quality screening); never direct/untagged pros; Yelp rating filter ≥4.0 + 20+ reviews.

### 10.5 User gaming / abuse

- **Freemium abuse:** multiple accounts для обхода 3-estimates/mo limit.
- **Photo spoofing:** user uploads photo of friend's problem, or stock image, для "free" quota consumption.
- **Mitigation:**
  - Device fingerprinting (IDFV / AAID) to detect multi-account.
  - Phone verification at sign-up.
  - Reverse-image-search check for top common "stock" home repair images.
  - EXIF metadata check — recent photos have device+timestamp; stock images don't.

### 10.6 Accuracy-liability tightrope

- Too cautious AI ("always call a pro") → product useless, users churn.
- Too confident AI ("DIY this wiring!") → lawsuits.
- **Mitigation:** confidence thresholds carefully calibrated + A/B test 3 risk-tolerance settings + legal review of every category-specific response template.

### 10.7 Seasonal demand

- Home repair highly seasonal: spring/summer peak (April–August), winter dip (Dec–Feb).
- **Mitigation:** budget accordingly; secondary revenue stream через appliance/furniture (less seasonal).

### 10.8 Geographic mismatch — приложение global, но data US-heavy

- Richest data US. EU/UK/Canada pricing + trade structure differs значительно.
- **Mitigation:** v1 US-only default; EU expansion требует dedicated data ingestion (likely 6+ месяцев post-MVP).

### 10.9 Regulatory risk — AI liability regulation

- EU AI Act, CA AB 2013, NY state AI bills — всё в движении.
- **Mitigation:** compliance review every 6 months; feature flag high-risk recommendations для conservative default.

### 10.10 Insurance partner risk

- Some home warranty/insurance companies видят FixIt как competing advisor → могут препятствовать partnerships (e.g., American Home Shield, Select Home Warranty).
- **Mitigation:** position как complementary tool ("we estimate, they cover"), pitch integration not competition.

---

## Источники

### Industry / labor rates

- [BLS — Plumbers OOH](https://www.bls.gov/ooh/construction-and-extraction/plumbers-pipefitters-and-steamfitters.htm)
- [BLS — Electricians OOH](https://www.bls.gov/ooh/construction-and-extraction/electricians.htm)
- [BLS — HVAC Mechanics OOH](https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm)
- [BLS — OEWS May 2024 National Data](https://www.bls.gov/news.release/ocwage.t01.htm)
- [BLS Developers API](https://www.bls.gov/developers/)
- [ServiceTitan — Plumber Salary 2026](https://www.servicetitan.com/blog/plumber-salary)
- [ServiceTitan — HVAC Tech Salary 2026](https://www.servicetitan.com/blog/hvac-technician-salary)
- [ServiceTitan — Trades Salary Data](https://www.servicetitan.com/blog/trades-salary-data)
- [TradeCareerPath — 2026 Skilled Trades Salaries](https://tradecareerpath.com/guides/national-trade-salaries/)
- [RSMeans Data](https://www.rsmeans.com/)
- [RSMeans 2025 Cost Books](https://www.rsmeans.com/products/books/2025-cost-data-books)
- [RSMeans Complete Subscription](https://www.rsmeans.com/complete)
- [Capterra — RSMeans Software Pricing](https://www.capterra.com/p/151681/RSMeans/)

### Cost-guide / category data

- [HomeAdvisor Cost Guide](https://www.homeadvisor.com/cost/)
- [HomeAdvisor — Plumber Cost 2025](https://www.homeadvisor.com/cost/plumbing/hire-a-plumber/)
- [HomeAdvisor — Washing Machine Repair](https://www.homeadvisor.com/cost/kitchens/washing-machine-repair/)
- [HomeAdvisor — Repair Water Heater](https://www.homeadvisor.com/cost/plumbing/repair-a-water-heater/)
- [HomeAdvisor — Leaky Faucet](https://www.homeadvisor.com/cost/plumbing/repair-leaking-faucet/)
- [HomeAdvisor — HVAC Maintenance](https://www.homeadvisor.com/cost/heating-and-cooling/service-maintain-ac-unit/)
- [HomeAdvisor — Major Home Repairs](https://www.homeadvisor.com/cost/additions-and-remodels/perform-major-home-repairs/)
- [Angi — Leaky Faucet Cost](https://www.angi.com/articles/plumber-cost-to-fix-leaky-faucet.htm)
- [Angi — Plumbing Repair Cost](https://www.angi.com/articles/plumber-cost.htm)
- [Angi — Washing Machine Repair](https://www.angi.com/articles/how-much-washing-machine-repair-costs.htm)
- [Angi — Refrigerator Repair](https://www.angi.com/articles/how-much-does-refrigerator-repair-cost.htm)
- [Angi — HVAC Repair](https://www.angi.com/articles/how-much-hvac-repair-cost.htm)
- [Angi — Roof Repair](https://www.angi.com/articles/how-much-do-roof-repairs-cost.htm)
- [Angi — Outlet Installation](https://www.angi.com/articles/how-much-does-it-cost-install-outlet.htm)
- [Angi — Outlet Repair](https://www.angi.com/articles/electrical-outlet-repair-cost.htm)
- [Angi — Replace Outlet](https://www.angi.com/articles/cost-replace-27-electrical-outlets.htm)
- [HomeGuide — Plumber Cost](https://homeguide.com/costs/plumber-cost)
- [HomeGuide — Electrical Outlet Install](https://homeguide.com/costs/cost-to-install-electrical-outlet)
- [HomeGuide — HVAC Repair](https://homeguide.com/costs/hvac-repair-cost)
- [HomeGuide — Roof Repair](https://homeguide.com/costs/roof-repair-cost)
- [HomeGuide — Furniture Assembly](https://homeguide.com/costs/furniture-assembly-cost)
- [HomeGuide — Average Plumbing Estimates](https://homeguide.com/costs/average-plumbing-estimates)
- [Modernize — Plumber Cost per Hour](https://modernize.com/plumbing/repair-cost/plumber-cost-per-hour)
- [Today's Homeowner — Gutter Cleaning Cost](https://todayshomeowner.com/gutters/cost/gutter-cleaning-cost/)
- [Today's Homeowner — Roof Repair Cost](https://todayshomeowner.com/roofing/cost/roof-repair-cost/)
- [Fixr — Furniture Assembly Cost](https://www.fixr.com/costs/furniture-assembly)
- [Homewyse — Install Electrical Outlet](https://www.homewyse.com/services/cost_to_install_electrical_outlet.html)
- [Homewyse — Repair Leaking Faucet](https://www.homewyse.com/services/cost_to_repair_leaking_faucet.html)
- [Appliance Pickup Now — Repair Cost Guide](https://appliancepickupnow.com/appliance-repair-cost-guide/)
- [Best Appliance Repair — Repair vs Replace](https://best-appliancerepair.com/news/when-to-repair-vs-replace-your-appliances/)
- [CLT Appliance — Fix or Replace 2025](https://cltappliance.com/fixing-old-appliances-or-replacing-them/)
- [The Appliance Directory — 2025 Repair Guide](https://www.theappliancedirectory.com/blog/how-much-does-appliance-repair-cost-2025-price-guide)
- [Spencer's TV — Appliance Repair Breakdown](https://www.spencerstv.com/blog/appliance-repair-cost-breakdown)
- [Mr. Handyman — Top 10 Common Home Repairs](https://www.mrhandyman.com/blog/2025/june/top-10-most-common-home-repairs-and-when-to-call-a-pro/)
- [Mr. Handyman — IKEA Assembly](https://www.mrhandyman.com/handyman-services/assembly/ikea-furniture/)
- [HomeGnome — IKEA Assembly Cost](https://homegnome.com/blog/cost/how-much-does-ikea-furniture-assembly-cost/)
- [Family Handyman — 100 DIY Repairs](https://www.familyhandyman.com/list/home-repairs-you-can-do-yourself/)
- [Family Handyman — DIY Permit Projects](https://www.familyhandyman.com/list/diy-home-improvements-you-need-a-permit-for/)

### Retailer API

- [Home Depot — Pro Integrations](https://www.homedepot.com/c/pro-integrations)
- [SerpApi — Home Depot Product API](https://serpapi.com/home-depot-product)
- [BigBox API — Home Depot Data](https://trajectdata.com/ecommerce/big-box-api/)
- [Apify — Home Depot API](https://apify.com/api/home-depot-api)
- [Lowe's Developer Hub](https://developer.lowes.com/portal)
- [Lowe's APIM Portal](https://portal.apim.lowes.com/)
- [Syndigo — Lowe's API Quick Start](https://pages.syndigo.com/rs/539-CDH-942/images/Lowe's_API_Quick_Start_Guide.pdf)
- [Piloterr — Lowes Product Scraper](https://www.piloterr.com/library/lowes-product)
- [Amazon PA-API 5.0 Rate Limits](https://webservices.amazon.com/paapi5/documentation/troubleshooting/api-rates.html)
- [Amazon PA-API 5.0 Best Practices](https://webservices.amazon.com/paapi5/documentation/best-programming-practices.html)
- [Amazon Associates Central](https://affiliate-program.amazon.com/help/node/topic/GLL6HEVVWUKMQDDQ)
- [KeywordRush — Amazon 10-Sales Rule](https://www.keywordrush.com/blog/amazon-pa-api-associatenoteligible-error-is-there-a-new-10-sales-rule/)
- [Walmart Developer Portal](https://developer.walmart.com/)
- [Walmart Marketplace API Integration Guide](https://marketplacelearn.walmart.com/guides/Getting%20started/Getting%20ready%20to%20sell/Integration-methods-API)
- [Scrapfly — Walmart API Guide](https://scrapfly.io/blog/posts/guide-to-walmart-api)
- [PriceAPI](https://www.priceapi.com/)
- [PriceAPI Plans](https://www.priceapi.com/en/price/plans/)
- [PricesAPI](https://pricesapi.io/)

### Lead-gen / service marketplaces

- [Thumbtack Developers Portal](https://developers.thumbtack.com/)
- [Thumbtack API Reference](https://developers.thumbtack.com/api-reference)
- [Thumbtack Pro API Launch Announcement](https://press.thumbtack.com/announcements/thumbtack-launches-new-pro-api-to-help-service-professionals-grow-sustainably/)
- [Thumbtack Pay for Leads](https://help.thumbtack.com/article/pay-for-leads)
- [Thumbtack Partnerships](https://www.thumbtack.com/partnerships)
- [HomeAdvisor Affiliate Program](https://www.homeadvisor.com/rfs/aboutus/affiliates/affiliateSignup.jsp)
- [HomeAdvisor — How It Works](https://www.homeadvisor.com/spa/how-it-works)
- [ClientTether — Angi Leads API Integration](https://support.clienttether.com/home-advisor/)
- [Earnifyhub — Angi vs HomeAdvisor 2026](https://earnifyhub.com/blog/angi-vs-homeadvisor-contractor.php)
- [Yelp Fusion API](https://business.yelp.com/data/products/fusion/)
- [Yelp Data Pricing](https://business.yelp.com/data/resources/pricing/)
- [Yelp Developers](https://www.yelp.com/developers)

### Legal / regulatory

- [Nolo — When Homeowners Must Obtain Permits](https://www.nolo.com/legal-encyclopedia/home-improvement/when-homeowners-must-obtain-permits-for-home-projects.html)
- [NYC Buildings — Permit Requirements](https://www.nyc.gov/site/buildings/property-or-business-owner/do-i-need-a-permit.page)
- [Portland.gov — Residential Permits](https://www.portland.gov/ppd/residential-permitting/do-you-need-permit/residential-permits)
- [Mass.gov — Home Improvement Law](https://www.mass.gov/info-details/massachusetts-law-about-home-improvement)
- [2-10 Home Buyers Warranty — Permits Guide](https://www.2-10.com/blog/home-improvement-project-need-building-permit2-10-blog/)
- [Procore — Contractor License Guide](https://www.procore.com/library/contractors-license-guide-all-states)
- [NEXT Insurance — Handyman License](https://www.nextinsurance.com/blog/handyman-license-requirements/)
- [Handyman Startup — Licenses and Laws](https://www.handymanstartup.com/handyman-licenses-and-laws/)
- [Contractors Licensing Schools — Legal Limits](https://contractorslicensingschools.com/blog/understanding-the-legal-limits-of-handyman-work-in-2025/)
- [InvoiceFly — Handyman License](https://invoicefly.com/academy/handyman-license/)
- [ContractorNerd — State License Requirements](https://www.contractornerd.com/blog/handyman-license-requirements/)
- [Law Insider — AI Disclaimer Clauses](https://www.lawinsider.com/clause/ai-disclaimer)
- [Termly — No-Responsibility Disclaimers](https://termly.io/resources/articles/no-responsibility-disclaimers/)
- [DR&A Law Firm — AI Waivers](https://danielrosslawfirm.com/2025/07/28/ai-and-contracts-why-you-need-waiver-and-limitation-of-liability-provisions-for-ai-tools/)
- [Vasquez Law — AI Chatbot Liability](https://www.vasquezlawnc.com/blog/ai-chatbot-liability)
- [TechLifeFuture — AI Liability](https://www.techlifefuture.com/ai-liability-professional-services/)
- [Ward Hadaway — AI Legal Liability](https://www.wardhadaway.com/insights/updates/artificial-intelligence-legal-liability-using-ai-what-happens-when-artificial-intelligence-goes-wrong/)

### AI / vision

- [Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Claude Vision API Docs](https://platform.claude.com/docs/en/build-with-claude/vision)
- [IntuitionLabs — LLM Pricing 2025](https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025)
- [IntuitionLabs — AI API Comparison 2026](https://intuitionlabs.ai/articles/ai-api-pricing-comparison-grok-gemini-openai-claude)
- [Finout — Anthropic Pricing 2026](https://www.finout.io/blog/anthropic-api-pricing)
- [Price Per Token — Claude](https://pricepertoken.com/pricing-page/model/anthropic-claude-3.7-sonnet)
- [MIT News — Image Recognition Accuracy](https://news.mit.edu/2023/image-recognition-accuracy-minimum-viewing-time-metric-1215)
- [Keylabs — AI Image Recognition Platforms](https://keylabs.ai/blog/the-recognition-giants-comparing-leading-ai-image-recognition-platforms/)
- [AIMultiple — Image Recognition Tools](https://aimultiple.com/image-recognition-software)
- [Nyckel — Image Recognition APIs](https://www.nyckel.com/blog/8-best-image-recognition-apis/)
- [DDIY — AI Image Detection 2026](https://ddiy.co/ai-image-detection-tools/)
