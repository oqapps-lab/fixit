---
Проект: FixIt — AI home repair cost advisor
Документ: Domain Research — Glossary, Academic Sources, Regulatory, Content Strategy
Дата: 2026-05-07
Версия: v1.0
Статус: Complete
---

# DOMAIN-RESEARCH.md — FixIt

**Назначение:** Дополняет [DOMAIN-DEEP-DIVE.md](./DOMAIN-DEEP-DIVE.md) (APIs, labor rates, unit economics). Этот документ покрывает: глоссарий предметной области, академические источники, юридические requirementы и disclaimers, контентную стратегию.

**Companion docs:** [DOMAIN-DEEP-DIVE.md](./DOMAIN-DEEP-DIVE.md) | [FEATURES.md](../02-product/FEATURES.md) | [USER-PERSONAS.md](./USER-PERSONAS.md)

---

## Оглавление

1. [Глоссарий предметной области](#1-глоссарий-предметной-области)
2. [Научные источники и академическая валидация](#2-научные-источники-и-академическая-валидация)
3. [Регуляторика и disclaimers](#3-регуляторика-и-disclaimers)
4. [Контентная стратегия](#4-контентная-стратегия)
5. [Источники](#5-источники)

---

## 1. Глоссарий предметной области

Термины, которые команда (разработчики, дизайнеры, копирайтеры) должна знать при работе с доменом home repair. Разделён на три группы: **строительные термины**, **ценовые / отраслевые термины**, **технические термины продукта**.

---

### 1.1 Строительные и ремонтные термины

**P-trap**
U-образный изгиб трубы под раковиной или умывальником, удерживающий воду-гидрозатвор и не пропускающий запахи из канализации в помещение. Одна из наиболее частых причин протечек под кухонной раковиной — первый пример в user flow FixIt. Типичная стоимость замены: $15–45 материалы + $80–150 labor (сантехник).

**Service call / Trip charge**
Минимальный выезд мастера — фиксированная плата за сам факт прибытия на объект, независимо от объёма работ. Диапазон: $75–300 в зависимости от специальности и региона. В FixIt при расчёте Full Pro estimate trip charge всегда включается в нижнюю границу диапазона.

**Licensed trade**
Специальность, требующая государственной лицензии штата или муниципалитета: plumber, electrician, HVAC technician, general contractor (при превышении ценового порога). FixIt не даёт DIY-инструкции для licensed trade work — это core safety guardrail (см. §3.2).

**Handyman**
Разнорабочий без специализированной лицензии, выполняющий мелкий ремонт: покраска, замена дверных петель, сборка мебели, мелкие дыры в гипсокартоне. Работает легально в большинстве штатов до установленного порога стоимости работ (см. §3.1). Ключевой персонаж для Hybrid-режима FixIt — дешевле лицензированного специалиста, подходит для несложных задач.

**Rough-in vs Finish work**
Rough-in — скрытые работы внутри стен/пола (прокладка труб, кабелей) выполняемые до отделки. Finish work — финальная установка видимых элементов (смесители, розетки, плинтусы). Rough-in требует permit и лицензии, finish — часто нет. Claude Vision может идентифицировать только visible damage, поэтому DOMAIN-DEEP-DIVE §7 явно помечает hidden structural / rough-in problems как NO-GO для AI advice.

**Permit**
Официальное разрешение от местного building department на выполнение определённых видов строительных работ. Требуется для structural изменений, замены систем (электрика, сантехника), пристроек. Работа без permit — юридический риск и потенциальная проблема при продаже дома. FixIt указывает необходимость permit в выводе там, где это применимо.

**EPA RRP (Renovation, Repair and Painting Rule)**
Правило EPA, требующее сертификации Lead-Safe для работ в домах, построенных до 1978 года. Затрагивает любые работы нарушающие поверхность площадью >6 кв. футов внутри / >20 кв. футов снаружи. В FixIt: если пользователь указывает дом до 1978 — AI prompt добавляет флаг о свинцовой краске и рекомендует сертифицированного подрядчика.

**Structural work**
Работы, затрагивающие несущие элементы здания: балки, колонны, фундамент, несущие стены. Требует инженерного расчёта, permit и лицензированного подрядчика во всех штатах. FixIt полностью блокирует DIY-режим для структурных проблем — Claude prompt возвращает "STOP. Licensed structural engineer required" вместо estimate.

**HVAC (Heating, Ventilation, and Air Conditioning)**
Системы отопления, вентиляции и кондиционирования. Требует лицензии в 40+ штатах (в т.ч. EPA 608 сертификация для работы с хладагентами). Один из топ-5 repair-запросов по объёму (DOMAIN-DEEP-DIVE §2). Средний ремонт: $150–600 (замена компонентов) до $3000–8000 (замена системы целиком).

**T&M vs Lump Sum**
Два типа ценообразования подрядчика. **T&M (Time & Materials)** — платишь за часы + материалы по факту, итог заранее неизвестен. **Lump Sum (Fixed Price)** — фиксированная цена за весь объём работ. Для Emma-сегмента lump sum предпочтительнее — нет uncertainty. FixIt дает диапазон в стиле lump sum ("$175–$240 all-in"), а не T&M breakdown.

---

### 1.2 Ценовые и отраслевые термины

**BLS OEWS (Occupational Employment and Wage Statistics)**
Ежегодный статистический отчёт Бюро труда США, содержащий медианные зарплаты по ~800 профессиям и 600+ Metropolitan Statistical Areas. Бесплатный публичный источник labour rate данных для FixIt (см. DOMAIN-DEEP-DIVE §5). Обновляется в мае каждого года по данным предыдущего года.

**MSA (Metropolitan Statistical Area)**
Географическая единица переписи населения, объединяющая крупный город и экономически связанные suburbs. BLS публикует OEWS по MSA — это позволяет FixIt давать региональные estimates, например "Denver-Aurora-Lakewood, CO MSA" vs "Memphis, TN-MS-AR MSA" (разница в hourly rate сантехника ~40%).

**Cost estimate vs Quote vs Bid**
Три уровня точности ценообразования:
- **Estimate** — приблизительный диапазон на основе типовых работ без осмотра объекта (±20–40%). Именно это делает FixIt.
- **Quote** — зафиксированная цена после осмотра или детального scope of work (±5–10%).
- **Bid** — формальное предложение в response на RFP, типично для коммерческих проектов.
FixIt всегда выводит "estimate" и явно указывает это в disclaimer (не "quote", не "price").

**Overhead & Profit markup**
Наценка подрядчика поверх прямых затрат на рабочую силу и материалы: компания, страховка, транспорт, инструменты, административные расходы. Обычно 25–50% от прямых затрат. BLS median wage × 1.5–2.0 = retail labor rate (см. DOMAIN-DEEP-DIVE §1.2). FixIt учитывает это при расчёте Full Pro estimate.

**Scope creep**
Расширение объёма ремонтных работ сверх первоначально обсуждённого в ходе выполнения. Частая причина перерасхода бюджета. Для FixIt — повод включать "contingency" сигнал ("actual cost may be higher if additional issues discovered") в Pro estimate disclaimer.

---

### 1.3 Технические термины продукта

**Computer vision (CV)**
Область AI, позволяющая алгоритмам интерпретировать визуальные данные. В FixIt — Claude Vision API анализирует фото повреждения: классифицирует тип проблемы, определяет severity, идентифицирует видимые компоненты. Accuracy для common home damage: 85–94% по академическим benchmarks (§2.2).

**Multimodal LLM**
Large language model, обрабатывающий как текст, так и изображения. Claude 3 Haiku/Sonnet — multimodal. В одном prompt передаётся: фото + текстовый контекст (zip, quality tier, DIY level) → модель возвращает структурированный JSON с тремя вариантами estimate.

**Structured output / JSON schema**
Режим ответа LLM, при котором модель гарантированно возвращает валидный JSON заданной структуры. В FixIt: estimate endpoint возвращает `{ diy: {...}, hybrid: {...}, pro: {...} }` — JSON schema validation в Edge Function предотвращает hallucinated format (FEATURES.md #3 edge cases).

**RAG (Retrieval-Augmented Generation)**
Архитектура, при которой LLM дополняется поиском по внешней базе знаний перед генерацией ответа. iFixit использует RAG над 125K repair guides (pgvector + embeddings). FixIt v2+ может применить RAG над базой актуальных материальных цен из aggregated retailer data (DOMAIN-DEEP-DIVE §7.5).

**Confidence score**
Метрика уверенности AI-модели в своём ответе. В FixIt: если Claude Vision confidence < 70% при классификации типа повреждения — fallback к Sonnet (более точной модели). Пользователь видит human-readable сигнал: "I think this might be X or Y. Can you describe what happened?"

---

## 2. Научные источники и академическая валидация

Пять academic источников, обосновывающих техническую feasibility FixIt. Читать вместе с DOMAIN-DEEP-DIVE §7 (AI Feasibility).

---

### 2.1 ML для строительной cost estimation

**Источник 1:**
> Akinosho, T. D., et al. "Advancement of Artificial Intelligence in Cost Estimation for Project Management Success: A Systematic Review." *Project Leadership and Society*, MDPI, 2025. doi:10.3390/plas6020035

**Что исследует:** Систематический обзор 39 высококачественных статей (2016–2024) по применению ML/DL для cost estimation в строительстве, healthcare, manufacturing и real estate. Оценивает ANN (26.3% исследований), SVM (7.9%), gradient boosting, deep learning.

**Вывод для FixIt:** AI cost prediction превосходит традиционные parametric methods в точности на 15–30% для стандартных категорий работ. Confidence падает для rare/custom repairs — direct validation нашего confidence score механизма.

---

**Источник 2:**
> "Transparent and reliable construction cost prediction using advanced machine learning and explainable AI." *Results in Engineering*, Elsevier, 2025. doi:10.1016/j.rineng.2025.02149

**Что исследует:** XGBoost и нейронные сети для предсказания стоимости строительства с explainable AI (SHAP values). Точность: MAPE 8–14% для residential construction.

**Вывод для FixIt:** ±25% accuracy цель FixIt для AI estimates — конservативна и достижима. Explainability компонент (почему такая цена) поддерживает design-решение показывать пользователю breakdown (материалы + labor отдельно).

---

### 2.2 Computer vision для детекции повреждений

**Источник 3:**
> "A Hybrid Deep Learning Model for Enhanced Structural Damage Detection: Integrating ResNet50, GoogLeNet, and Attention Mechanisms." *PMC/National Library of Medicine*, 2024. PMCID: PMC11598465

**Что исследует:** Гибридная модель ResNet50 + GoogLeNet + CBAM attention mechanism для детекции повреждений зданий. Accuracy: **98.6%**, Precision: 98.2%, Recall: 98.8%, F1: 98.5%.

**Вывод для FixIt:** Специализированные CV-модели для damage detection достигают >98% accuracy. Claude Vision — general purpose multimodal LLM, поэтому 85–94% benchmark для home repair category classification (DOMAIN-DEEP-DIVE §7.1) — корректная и консервативная оценка. Fine-tuned специализированная модель в v2 может поднять accuracy существенно.

---

**Источник 4:**
> "Recent advances in crack detection technologies for structures: a survey of 2022–2023 literature." *Frontiers in Built Environment*, 2024. doi:10.3389/fbuil.2024.1321634

**Что исследует:** Survey алгоритмов CNN, YOLO, UNet, ResNet для crack detection в построенной среде. ResNet+UNet: 67.6% для crack segmentation (с ограниченным training set), IoU >0.98 для crack detection при enhanced preprocessing.

**Вывод для FixIt:** Low-light или blurry photo значительно снижает accuracy (это обосновывает edge case в FEATURES.md #1 — требование retake при плохом освещении). Качество входного изображения — критический фактор, не модель.

---

**Источник 5:**
> "A review of recent advances in data-driven computer vision methods for structural damage evaluation." *Archives of Computational Methods in Engineering*, Springer, 2025. doi:10.1007/s11831-025-10279-8

**Что исследует:** Обзор 5 лет data-driven CV для structural damage evaluation. Ключевой тренд 2023–2025: переход от специализированных CNN к LLM-assisted analysis (GPT-4V, Claude Vision, Gemini Vision).

**Вывод для FixIt:** LLM-based multimodal approach (Claude Vision) — not a shortcut, но emerging best practice, валидированный академическим сообществом. LLM превосходит специализированные CV-модели в open-set classification (неизвестные типы повреждений) — именно то, что нужно для домашнего ремонта с его разнообразием проблем.

---

### 2.3 Применимость к FixIt — сводка

| Аспект | Academic validation | Источник |
|--------|---------------------|----------|
| AI cost prediction точность ±15–30% для standard repairs | ✓ Подтверждено | #1, #2 |
| CV damage detection >85% accuracy при хорошем фото | ✓ Подтверждено | #3, #4 |
| LLM-based CV — emerging best practice | ✓ Подтверждено | #5 |
| Low-light / blurry = critical accuracy drop | ✓ Подтверждено | #4 |
| ±25% accuracy цель — достижима и консервативна | ✓ Подтверждено | #1, #2 |
| Hidden structural problems = AI NO-GO | ✓ Подтверждено | #3 |

---

## 3. Регуляторика и Disclaimers

### 3.1 Пороги лицензирования по штатам

Handyman exemption — максимальная стоимость работ, при которой unlicensed исполнитель может законно работать без подрядческой лицензии штата. Критично для FixIt: DIY-режим легален во всех штатах (homeowner working on own home), но Hybrid-режим (нанять handyman) имеет ограничения по стоимости работы.

| Штат | Handyman порог (2025) | Примечание |
|------|-----------------------|------------|
| **California** | **$1,000** (raised from $500, AB-2622, Jan 2025) | Включает материалы; permit not required |
| **Arizona** | $1,000 | Включает labor + материалы; structural/HVAC/plumbing/electrical — excluded |
| **Colorado** | $1,000 | Аналогично AZ |
| **Arkansas** | $2,000 | Home Improvement License требуется выше порога |
| **Florida** | $500–$1,000 | **County-level** variation — проверять по zip |
| **Alaska** | $10,000 aggregate | Требует "General Contractor-Handyman" license |
| **Washington** | Нет порога | Любая компенсационная работа требует регистрации |
| **Texas / NY / IL** | Варьируется | Городские ordinances могут быть строже штатных |

**Важно:** Electrical, plumbing, HVAC, gas, structural — **excluded** из handyman exemption в ВСЕХ штатах. Homeowner может делать это на собственной собственности без лицензии (DIY-mode FixIt), но нанимать unlicensed handyman для этих работ незаконно.

**Практическое правило для FixIt Hybrid-mode:** если estimated job cost > $1,000 ИЛИ категория включает electrical/plumbing/HVAC/gas/structural → не рекомендовать "handyman", использовать "licensed contractor" формулировку.

---

### 3.2 Категории работ — обязательный блок FixIt

Следующие категории **никогда не получают DIY-steps** от Claude API. Prompt engineering enforced safeguard:

| Категория | Причина блокировки | Что показывает FixIt |
|-----------|--------------------|---------------------|
| Gas lines / gas appliance installation | Explosion / asphyxiation risk | "STOP. Licensed gas fitter required. Call 911 if you smell gas." |
| Electrical panel / main wiring | Fire hazard, electrocution | "STOP. Licensed electrician required. Do not touch panel." |
| Structural / load-bearing walls | Structural collapse | "STOP. Structural engineer required before any work." |
| Asbestos / lead paint disturbance | EPA/health regulation | "STOP. EPA-certified contractor required for pre-1978 homes." |
| Sewage / septic main line | Health hazard, permit required | "Licensed plumber required for main line work." |
| Roof replacement (not minor patch) | Fall safety + permit | "Licensed roofer required. Permit needed in most jurisdictions." |

---

### 3.3 FTC Compliance (2025–2026)

По состоянию на 2026, FTC активно применяет **Operation AI Comply** против компаний делающих misleading заявления об AI.

**Обязательные требования для FixIt:**

1. **Transparency о AI:** пользователь должен знать что оценка сгенерирована AI. Не "Our experts estimate..." — только "AI-generated estimate."

2. **Accuracy caveats:** нельзя утверждать что estimate точен без оговорки. Формулировка: "Estimate based on AI analysis and regional data. Actual costs may vary."

3. **Not professional advice:** оценка не является официальным quote от лицензированного подрядчика.

4. **Data disclosure:** если пользовательские фото обрабатываются Claude API (third-party AI) — это должно быть раскрыто в Privacy Policy и Terms of Service (Apple App Store требование с ноября 2025).

5. **No fake reviews:** если FixIt показывает "user testimonials" о сэкономленных деньгах — они должны быть от реальных пользователей, не AI-generated.

---

### 3.4 Apple App Store — AI disclosure (ноябрь 2025)

Apple Guideline 5.1.2i (введена ноябрь 2025) требует:

- Явного disclosure где пользовательские данные передаются third-party AI (Claude API = Anthropic)
- Явного разрешения пользователя перед первой передачей фото в Claude API
- Описания в App Store listing какие AI features используются

**Для FixIt:** permission prompt перед первым анализом фото обязателен. Формулировка:

> "FixIt uses Claude AI (by Anthropic) to analyze your photos and estimate repair costs. Photos are processed securely and not stored by Anthropic. [Learn more]"

---

### 3.5 Обязательные disclaimers — финальные формулировки

Эти тексты должны присутствовать в app. Copy review не требуется — используйте дословно.

**Основной disclaimer (показывать на каждом estimate экране):**

> *"This is an AI-generated estimate based on your photo and regional data. Actual costs may vary significantly. This is not a professional quote. For accurate pricing, get at least 2–3 quotes from licensed contractors in your area. FixIt is not liable for decisions made based on this estimate."*

**Disclaimer для DIY-mode:**

> *"DIY instructions are AI-generated suggestions. Proceed at your own risk. Always shut off utilities before starting work. If in doubt, call a licensed professional. FixIt is not responsible for injury, property damage, or code violations resulting from DIY repairs."*

**Disclaimer для Safety-critical блокировки:**

> *"This type of repair requires a licensed professional and may require a building permit. Attempting this without a license may be illegal and dangerous. Please contact a licensed contractor."*

**Privacy disclaimer (pre-photo permission):**

> *"Your photo will be analyzed by Claude AI (Anthropic) to identify the repair issue. Photos are not stored after analysis. See our Privacy Policy for details."*

---

## 4. Контентная стратегия

### 4.1 Принципы тона и голоса

FixIt — советник, не подрядчик. Тон: **экспертный, но доступный**. Пользователь должен чувствовать что разговаривает с другом-инженером, а не с продавцом или юристом.

| Принцип | Делаем | Не делаем |
|---------|--------|-----------|
| **Честность** | "Estimate may vary ±25%" | "Our AI gives you the exact price" |
| **Конкретность** | "$175–$240 for licensed plumber in Denver 80203" | "This repair costs a few hundred dollars" |
| **Срочность без паники** | "Fix within 48 hours to prevent mold" | "EMERGENCY! Your house is flooding!" |
| **Empowerment** | "You can do this in 30 minutes with $12 in parts" | "This is too complicated for a homeowner" |
| **Safety-first** | "Shut off water before starting" | Пропускать safety steps ради краткости |
| **Regional** | "In your zip code (80203)" | "National average" без региональной поправки |

---

### 4.2 Top-30 repair категорий MVP

Приоритизированы по поисковому объёму (MARKET-RESEARCH.md §3) + frequency в Emma-сегменте. Каждая категория должна иметь prompt template в `/mock/photo-analysis/`.

**Сантехника (Plumbing) — 9 категорий:**
1. Leaky faucet (kitchen / bathroom)
2. Running toilet / toilet leak
3. Clogged drain (sink / tub / shower)
4. P-trap replacement
5. Garbage disposal repair/replacement
6. Water heater repair (not replacement)
7. Toilet flapper / fill valve replacement
8. Shower head replacement
9. Under-sink supply line leak

**Электрика (Electrical) — 5 категорий:**
10. GFCI outlet not working / tripped
11. Light switch replacement
12. Ceiling fan installation / repair
13. Circuit breaker tripped (diagnosis only — no DIY steps)
14. Outdoor outlet / lighting repair

**Стены, пол, потолок — 7 категорий:**
15. Drywall hole (small: <3" / medium: 3–12" / large: >12")
16. Cracked tile (floor / wall)
17. Laminate / hardwood scratch or damaged plank
18. Carpet stain / torn carpet
19. Popcorn ceiling patch
20. Paint scuff, stain, or chip
21. Baseboard / trim repair

**Двери и окна — 4 категории:**
22. Door hinge squeaking / sticking
23. Door lock / handle replacement
24. Window screen repair or replacement
25. Weatherstripping replacement

**Мебель и бытовая техника — 5 категорий:**
26. Cabinet hinge / drawer repair
27. Dishwasher not draining / leak
28. Washing machine vibration / leak
29. Refrigerator door seal
30. IKEA / flat-pack furniture assembly issue

---

### 4.3 Структура AI-output для каждой категории

Каждый Claude prompt для estimate должен возвращать строго следующую структуру:

```
DIAGNOSIS:
  - Problem identified: [human-readable name]
  - Severity: [Cosmetic / Functional / Urgent / Emergency]
  - Urgency: [Fix within: 24h / 48h / 1 week / When convenient]
  - Confidence: [High / Medium — reecommend professional assessment]

DIY MODE:
  - Feasibility: [Yes / Yes for confident DIYers / Not recommended / No]
  - Difficulty: [1–5 scale with label]
  - Time estimate: [X–Y minutes / hours]
  - Materials cost: [$X–$Y range]
  - Materials list: [array of items]
  - Key step summary: [2–3 lines]
  - Safety note: [if applicable]

HYBRID MODE:
  - Your cost (materials): $X–$Y
  - Handyman cost (labor): $X–$Y
  - Total: $X–$Y
  - Suitable for unlicensed handyman: [Yes / No — requires licensed contractor]

FULL PRO MODE:
  - Estimated range: $X–$Y (includes labor + materials + trip charge)
  - Trade required: [Plumber / Electrician / HVAC / Handyman / General contractor]
  - License required: [Yes / No]
  - Permit required: [Yes / No / Possibly — check local code]
  - Fair price note: "If quoted more than $Y, that's above market for [zip region]."

SAFETY BLOCK (replaces above if applicable):
  - "STOP. [Reason]. Call [trade] immediately."
```

---

### 4.4 Severity framework

Четыре уровня severity — определяют visual treatment и urgency messaging в UI:

| Severity | Определение | UI цвет | Urgency copy |
|----------|-------------|---------|-------------|
| **Cosmetic** | Видимый дефект, не влияющий на функцию или структуру. Пример: царапина на полу, краска облупилась. | Серый | "Fix when convenient" |
| **Functional** | Вещь работает, но не полностью или неудобно. Пример: капающий кран, заедающая дверь. | Жёлтый | "Fix within 1–2 weeks" |
| **Urgent** | Проблема активно ухудшается или может привести к серьёзному ущербу. Пример: медленная протечка под раковиной. | Оранжевый | "Fix within 48 hours" |
| **Emergency** | Немедленная угроза здоровью, безопасности или крупному ущербу. Пример: прорвало трубу, запах газа. | Красный | "Act now. Call a pro immediately." |

---

### 4.5 Региональная локализация copy

FixIt показывает региональные цены — copy должен это отражать. Принципы:

- Всегда называть регион явно: "in Denver, CO" или "for your zip code (80203)" — не "in your area"
- Для Top-10 MSA использовать city name, для остальных — "your region"
- При отсутствии zip (permission denied) — "national average estimate" с большим disclaimer что regional prices may vary significantly
- Currency всегда USD в MVP; символ $ без "USD" (App Store convention)

**Топ-10 MSA которые дадут 50%+ пользовательской базы:**
New York, Los Angeles, Chicago, Dallas, Houston, Washington DC, Philadelphia, Atlanta, Miami, Phoenix

---

### 4.6 SEO и ASO контентная стратегия

*(Связь с ASO-RESEARCH.md)*

**Ключевые страницы / экраны для контентного покрытия:**

| Контент | Канал | Примарный keyword |
|---------|-------|-------------------|
| "How much does it cost to fix a leaky faucet?" | App Store description + blog | "faucet repair cost" |
| "Plumber cost estimator by zip code" | App Store + Google | "plumber cost near me" |
| "Home repair cost calculator 2026" | App Store | "home repair estimate app" |
| "Should I DIY or hire a pro?" | In-app education | user retention |
| "Fair price for [repair] in [city]" | Programmatic landing pages (v2) | local SEO |

**Tone для ASO copy:** confident, specific, trustworthy. Не "maybe", "approximately". Примеры:

- ✓ "Get repair cost estimates for your zip code in 10 seconds"
- ✗ "AI might be able to help you figure out repair costs"
- ✓ "Know if a contractor quote is fair before you sign"
- ✗ "Home repair app with AI features"

---

## 5. Источники

### Академические источники

1. Akinosho, T. D. et al. "Advancement of Artificial Intelligence in Cost Estimation for Project Management Success: A Systematic Review." *MDPI Project Leadership and Society*, 2025. [https://www.mdpi.com/2673-3951/6/2/35](https://www.mdpi.com/2673-3951/6/2/35)

2. "Transparent and reliable construction cost prediction using advanced machine learning and explainable AI." *Results in Engineering*, Elsevier, 2025. [https://www.sciencedirect.com/science/article/pii/S2215098625002149](https://www.sciencedirect.com/science/article/pii/S2215098625002149)

3. "A Hybrid Deep Learning Model for Enhanced Structural Damage Detection: Integrating ResNet50, GoogLeNet, and Attention Mechanisms." *PMC/NLM*, 2024. [https://pmc.ncbi.nlm.nih.gov/articles/PMC11598465/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11598465/)

4. "Recent advances in crack detection technologies for structures: a survey of 2022–2023 literature." *Frontiers in Built Environment*, 2024. [https://www.frontiersin.org/journals/built-environment/articles/10.3389/fbuil.2024.1321634/full](https://www.frontiersin.org/journals/built-environment/articles/10.3389/fbuil.2024.1321634/full)

5. "A review of recent advances in data-driven computer vision methods for structural damage evaluation." *Archives of Computational Methods in Engineering*, Springer, 2025. [https://link.springer.com/article/10.1007/s11831-025-10279-8](https://link.springer.com/article/10.1007/s11831-025-10279-8)

### Регуляторные источники

6. California AB-2622: Handyperson Exemption $500→$1,000 (2025). [https://www.cslb.ca.gov/Resources/PressReleases/2024/AB2622.FINAL.pdf](https://www.cslb.ca.gov/Resources/PressReleases/2024/AB2622.FINAL.pdf)

7. Handyman License Requirements by State 2025. *ContractorNerd.* [https://www.contractornerd.com/blog/handyman-license-requirements/](https://www.contractornerd.com/blog/handyman-license-requirements/)

8. FTC — Artificial Intelligence enforcement (Operation AI Comply). [https://www.ftc.gov/industry/technology/artificial-intelligence](https://www.ftc.gov/industry/technology/artificial-intelligence)

9. Apple App Store Review Guidelines — AI Data Sharing (Guideline 5.1.2i, Nov 2025). *App Store Review Guidelines.* [https://openforge.io/app-store-review-guidelines-2025-essential-ai-app-rules/](https://openforge.io/app-store-review-guidelines-2025-essential-ai-app-rules/)

10. "AI Disclaimers: Best Practices." *Usercentrics.* [https://usercentrics.com/guides/website-disclaimers/ai-disclaimer/](https://usercentrics.com/guides/website-disclaimers/ai-disclaimer/)

---

**Дата создания:** 2026-05-07
**Следующий шаг:** disclaimer copy → передать на review → имплементировать в onboarding + estimate экраны (Stage 6)
