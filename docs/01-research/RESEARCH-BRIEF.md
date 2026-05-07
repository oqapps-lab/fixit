---
Проект: FixIt — AI home repair cost advisor
Документ: Research Brief — синтез всех Stage 1 документов
Дата: 2026-05-07
Версия: v2.0 — полная переработка на основе 8 research-документов
Статус: Final
---

# RESEARCH-BRIEF.md — FixIt

**Companion docs:** [MARKET-RESEARCH.md](./MARKET-RESEARCH.md) | [COMPETITOR-ANALYSIS.md](./COMPETITOR-ANALYSIS.md) | [COMPETITORS.md](./COMPETITORS.md) | [USER-PERSONAS.md](./USER-PERSONAS.md) | [DOMAIN-DEEP-DIVE.md](./DOMAIN-DEEP-DIVE.md) | [DOMAIN-RESEARCH.md](./DOMAIN-RESEARCH.md) | [INTERVIEW-GUIDE-EMMA.md](./INTERVIEW-GUIDE-EMMA.md)

---

## Elevator Pitch

> **FixIt — первый нейтральный AI-советник по ремонту дома: сфотографируй проблему, получи региональную оценку стоимости и три чётких маршрута (DIY / Hybrid / Pro) за 10 секунд — чтобы никогда больше не переплачивать из страха или незнания.**

---

## Скоринг по 7 критериям

| # | Критерий | Оценка | |
|---|----------|--------|-|
| 1 | Размер рынка | **10/10** | |
| 2 | Валидация боли | **10/10** | |
| 3 | Конкурентный gap | **9/10** | |
| 4 | Техническая выполнимость | **8/10** | |
| 5 | Бизнес-модель | **9/10** | |
| 6 | Timing | **7/10** | |
| 7 | Команда / исполнение | **7/10** | |
| | **ИТОГО** | **60/70 = 86%** | 🟢 GO |

---

### Критерий 1 — Размер рынка · 10/10

**Данные:**
- App-based in-home repair services (North America, 2026): **$6.4B**, CAGR 6.5% до $32.4B к 2035 [[MR §1.1]](./MARKET-RESEARCH.md)
- Global DIY home improvement market (2026): **$837B**, CAGR 3.9–6.9% [[MR §1.1]](./MARKET-RESEARCH.md)
- Consumer subscription TAM (US homeowners × $60 ARPU × 10% WTP): **$5–8B/year** [[MR §1.2]](./MARKET-RESEARCH.md)
- AI consumer apps — fastest growing sub-segment: **28–30% CAGR** (RevenueCat 2026) [[MR §4.6]](./MARKET-RESEARCH.md)

**Комментарий:** Рынок огромен даже в консервативном сценарии. FixIt адресует пересечение трёх растущих слоёв: app-based services + AI apps + DIY demand. Repair-сегмент (в отличие от renovation) **нецикличен** — non-discretionary spending не падает в рецессию. Year-round сезонность без мёртвых месяцев.

---

### Критерий 2 — Валидация боли · 10/10

**Данные:**
- **1.2M+ monthly searches** по "how much does it cost to fix ___" (US) [[MR §3]](./MARKET-RESEARCH.md)
- **83%** homeowners столкнулись с неожиданными ремонтами в 2024 [[UP §Emma]](./USER-PERSONAS.md)
- **81%** говорят что расходы на домовладение выше ожидаемых (US News, 2025) [[UP §Паттерны]](./USER-PERSONAS.md)
- **51%** испытывают тревогу при мысли "что-то сломается" (HomeServe, 2025) [[UP §Паттерны]](./USER-PERSONAS.md)
- **60%** откладывают ремонты из-за стоимости (Today's Homeowner, 2026) [[UP §Паттерны]](./USER-PERSONAS.md)
- **26%** рентеров теряют часть депозита при выезде (JoinRoost, 2024) [[UP §Tyler]](./USER-PERSONAS.md)

**Комментарий:** Боль (#1 вопрос на r/HomeImprovement 3.2M, r/FirstTimeHomeBuyer 700K): *"Сколько это стоит? Могу ли я сам? Справедлива ли эта цена?"* FixIt отвечает на все три в одном flow. Боль подтверждена количественно, качественно (Reddit) и поведенчески (поисковый объём). Real Reddit quote от Emma-сегмента — в [[UP]](./USER-PERSONAS.md).

---

### Критерий 3 — Конкурентный gap · 9/10

**Данные:**
- **17+ игроков, 7 кластеров** — ни один не комбинирует все 5 компонентов [[CA §Exec]](./COMPETITOR-ANALYSIS.md)
- Новый Кластер 7 (апрель–май 2026): SnapFix, Fix AI, YouFixedIt, Toolbox.repair, HomeMD.ai — каждый берёт 1–2 из 5 [[COMPETITORS.md]](./COMPETITORS.md)
- **Regional pricing** = незанятый differentiator: ни один AI-конкурент не делает zip-level локализацию [[MR §5.1]](./MARKET-RESEARCH.md)
- **3-mode output (DIY/Hybrid/Pro)** = незанятый differentiator: 0 из 17+ конкурентов [[COMPETITORS.md §GAP]](./COMPETITORS.md)
- GAP_SCORE = **1300–1600** (GOLD tier ≥1000), снижен с 2000–2500 в апреле из-за роста app_count 3→8 [[RB v1.1 §11]](./RESEARCH-BRIEF.md)

**Комментарий:** Снижение GAP_SCORE — управляемый сигнал. Оба оставшихся differentiator (regional pricing + 3-mode) технически сложнее скопировать overnight, чем фото-диагностику. Conflict of interest у всех конкурентов: Thumbtack/Angi зарабатывают на push к pros, iFixit — на запчастях. **FixIt — первый нейтральный советник**, монетизация через подписку, не транзакцию. -1 балл за ускорение конкуренции.

---

### Критерий 4 — Техническая выполнимость · 8/10

**Данные:**
- Claude Vision accuracy для home damage classification: **85–94%** на controlled benchmarks [[DD §7]](./DOMAIN-DEEP-DIVE.md)
- Специализированные CV-модели: **98.6% accuracy** для damage detection (ResNet50+GoogLeNet, PMC 2024) [[DR §2.2]](./DOMAIN-RESEARCH.md)
- Cost per estimate: **$0.03** (AI inference + API calls + compute) [[DD §9]](./DOMAIN-DEEP-DIVE.md)
- BLS OEWS labor rate data: **бесплатно**, обновляется ежегодно [[DD §5]](./DOMAIN-DEEP-DIVE.md)
- Региональная дисперсия: SF плumber = $150–250/ч, Memphis = $65–110/ч (**2× разница**) [[DD §1.3]](./DOMAIN-DEEP-DIVE.md)
- Регуляторные требования: disclaimers + 6 safety-blocked категорий + EPA RRP [[DR §3]](./DOMAIN-RESEARCH.md)

**Комментарий:** Claude Vision + structured JSON output + BLS data = рабочий stack с известными параметрами. Никаких неизвестных технологий. Ограничения (hidden damage, low-light photos, hallucinations) — все управляются через UX guardrails и disclaimers. -2 балла за: hidden problem NO-GO scope (gas/structural) сужает TAM; regional data требует quarterly refresh.

---

### Критерий 5 — Бизнес-модель · 9/10

**Данные:**
- Gross margin: **96%** ($0.03 cost / $0.85–1.50 blended revenue per estimate) [[DD §9]](./DOMAIN-DEEP-DIVE.md)
- LTV:CAC ratio: **$120 / $15 = 8x** для Emma (target ≥3x) [[RB v1.1 §6]](./RESEARCH-BRIEF.md)
- AI apps generate **41% more revenue per payer** ($30.16 vs $21.37 median ARPU), RevenueCat 2026 [[MR §4.6]](./MARKET-RESEARCH.md)
- Hard paywall Day-35 conversion: **10.7%** vs 2.1% freemium [[MR §4.6]](./MARKET-RESEARCH.md)
- Path to $10M ARR: **200K paying users** × $50 ARPU — Year 2 achievable [[DD §9]](./DOMAIN-DEEP-DIVE.md)
- 3 revenue streams не конкурируют: subscription (Emma/Marcus) + pay-per (Tyler) + Amazon Associates [[MONETIZATION.md]](../02-product/MONETIZATION.md)

**Комментарий:** Исключительные unit economics при минимальных COGS. Три независимых revenue stream покрывают три persona без каннибализации. Affiliate revenue с Day 1 устраняет dependence от subscription ramp. -1 балл за: AI annual retention только 21.1% (RevenueCat) — нужен strong habit loop.

---

### Критерий 6 — Timing · 7/10

**Данные:**
- AI phone-based diagnosis adoption **утроился за последние 6 месяцев** (Marketing Code, май 2026) [[MR §4.4]](./MARKET-RESEARCH.md)
- 5 новых AI-конкурентов запустились за апрель–май 2026 [[MR §5.2]](./MARKET-RESEARCH.md)
- Optimal entry window: **сейчас — сентябрь 2026** [[MR §8]](./MARKET-RESEARCH.md)
- Каждый месяц промедления = **-100–150 GAP_SCORE очков** [[RB v1.1 §11]](./RESEARCH-BRIEF.md)
- Toolbox.repair — вероятность добавить cost layer в течение 6 месяцев: **medium-high** [[CA §SWOT]](./COMPETITOR-ANALYSIS.md)

**Комментарий:** Категория создаётся прямо сейчас — AI home repair as an app category. Ранний выход = brand ownership в Google/App Store. -3 балла: окно уже закрывается (было 8/10 в апреле). MVP до Q4 2026 — не nice-to-have, а критично.

---

### Критерий 7 — Команда / Исполнение · 7/10

**Данные:**
- Команда: Лана (primary dev, Expo + React Native) + Amanda (architecture oversight) + Claude Code
- Стек: Expo SDK 55 / TypeScript strict / Supabase / Adapty / Claude API — всё проверенное
- MVP timeline: **4 месяца** при AI-only scope (rescope апрель 2026, убраны все API-партнёрства) [[FEATURES.md]](../02-product/FEATURES.md)
- 5 user interviews запланированы для валидации feature priorities [[INTERVIEW-GUIDE-EMMA.md]](./INTERVIEW-GUIDE-EMMA.md)

**Комментарий:** AI-only rescope устранил самые рискованные execution dependencies (Thumbtack API, Home Depot PA-API, RSMeans subscription). Claude Code accelerates dev 2–3× vs baseline. -3 балла: single primary developer создаёт key-person risk; Amanda поддержка частичная; нет выделенного маркетинга.

---

## Топ-5 инсайтов

### 1. Все конкуренты имеют conflict of interest — FixIt не имеет

Thumbtack/Angi зарабатывают на каждом matched contractor job → incentive говорить "вызови мастера". iFixit зарабатывает на запчастях → incentive чинить самому. Frontdoor зарабатывает на expert sessions → incentive эскалировать. **FixIt монетизирует информацию (подписка), не действие** — структурно нейтральный по отношению ко всем трём исходам. Это невозможно скопировать без изменения бизнес-модели. [[COMPETITORS.md §GAP]](./COMPETITORS.md)

### 2. Regional pricing — технически сложный moat, не просто фича

Zip-level labor rate — разница 2× между SF и Мемфисом для одной и той же работы. [[DD §1.3]](./DOMAIN-DEEP-DIVE.md) Ни один AI-конкурент это не делает — это не oversight, это **техническая сложность**: нужны BLS MSA-level данные + zip-to-MSA mapping + quarterly refresh pipeline. SnapFix и Fix AI не добавят regional pricing overnight. Это не UX-фича, это data infrastructure. Строить с первого дня.

### 3. Emma — не просто persona, это продуктовая стратегия

11–15M first-time homeowners в US, средний дом 1979 года, ни одного родственника с опытом — **постоянный поток мелких неожиданных проблем** каждые 2–3 месяца. Это значит: Emma — subscription user, а не pay-per. Её триггер (мокрое пятно вечером) не требует планирования — требует **instant answer**. Весь UX должен быть оптимизирован под стрессовый момент, а не плановое использование. [[UP §Emma]](./USER-PERSONAS.md)

### 4. PictureThis playbook — это не аналогия, это blueprint

$200M ARR, 300M downloads, photo-first AI, freemium → subscription. **Тот же механизм, более высокий emotional stakes** (сломанный дом $$$ vs любопытство о растении). PictureThis доказал: single-purpose AI app выигрывает у general ChatGPT-style решений; freemium с ограниченным free tier конвертируется; App Store + TikTok = acquisition formula. FixIt копирует playbook точно, не изобретает. [[MR §5.3, RB v1.1 §3.3]](./MARKET-RESEARCH.md)

### 5. Non-discretionary demand защищает от рецессии

Homeowners insurance +12% в 2025, contractor prices +25% с 2019, median home age 42 года. Ремонт — это не "хочу обновить кухню", это "труба течёт и нет выбора". **FixIt решает non-discretionary проблему** — это важно для retention и unit economics: пользователь не отменит подписку когда станет экономнее, а будет использовать FixIt чтобы экономить. [[MR §4.1–4.3]](./MARKET-RESEARCH.md)

---

## Риски

### Риск 1 — Toolbox.repair добавляет cost estimate · 🔴 HIGH

**Описание:** Toolbox.repair уже имеет photo AI + DIY guides + pro matching (3 из 5 компонентов). Стоимостной слой технически несложно добавить поверх. Если они добавят cost estimate раньше FixIt — gap сужается до только regional pricing.

**Вероятность:** Medium-High (6 месяцев)

**Mitigation:** Regional accuracy (BLS MSA-level) — не overnight. Ship с zip-accuracy как core differentiator в первом релизе. Speed is the primary hedge.

---

### Риск 2 — Сроки исполнения · 🔴 HIGH

**Описание:** Single primary developer (Лана) при 4-месячном timeline создаёт key-person risk. Болезнь, burnout или личные обстоятельства = сдвиг на 2–3 месяца. Каждый месяц промедления = -100–150 GAP_SCORE.

**Вероятность:** Medium

**Mitigation:** Amanda активно включена с месяца 2. Scope discipline (top-30 категорий, не encyclopedia). AI-only rescope уже убрал самые тяжёлые integration блоки.

---

### Риск 3 — AI annual retention 21.1% · 🟠 MEDIUM

**Описание:** RevenueCat 2026: AI apps имеют 12-month annual retention только 21.1% (vs 30.7% non-AI). Пользователи часто подписываются на волне хайпа, затем отменяют.

**Вероятность:** High (industrywide pattern)

**Mitigation:** "My Home" history tab (Feature #7) + push notifications (Feature #10) + savings counter ("You saved $480 with FixIt") создают habit loop и измеримую ценность. Retention research → [[RETENTION-RESEARCH.md]](../03-practices/RETENTION-RESEARCH.md).

---

### Риск 4 — App Store category crowding к Q4 2026 · 🟠 MEDIUM

**Описание:** 5 новых AI repair apps за 2 месяца. К Q4 2026 App Store категория "AI home repair" станет crowded. ASO CPL вырастет, organic discovery упадёт.

**Вероятность:** High

**Mitigation:** Ранний ASO capture (keywords "home repair cost estimator" + "plumber cost calculator") до конкуренции. TikTok #hometok awareness до насыщения. Первый brand = sticky. [[ASO-RESEARCH.md]](../03-practices/ASO-RESEARCH.md)

---

### Риск 5 — AI accuracy failures edge cases · 🟠 MEDIUM

**Описание:** Claude Vision не видит hidden damage (за стенами, под полом). Blurry/low-light photos снижают accuracy. Hallucinated cost estimates могут привести к неправильным решениям.

**Вероятность:** High (inevitable at scale)

**Mitigation:** Disclaimers D-1–D-4 [[DISCLAIMERS.md]](../DISCLAIMERS.md). Confidence threshold: fallback Haiku→Sonnet при <70%. Safety-blocked categories (gas/structural) → принудительный pro-only output. User feedback loop после каждого estimate.

---

## Гипотезы

Пять falsifiable гипотез для валидации через user interviews [[INTERVIEW-GUIDE-EMMA.md]](./INTERVIEW-GUIDE-EMMA.md) и A/B тесты в Stage 6.

### H1 — Основная боль = страх переплатить, не незнание что сломалось

> 70%+ пользователей Emma-сегмента назовут "не знаю, справедлива ли цена" как основную боль — больше чем "не знаю что сломалось".

**Значение:** если опровергнута → диагностика важнее оценки → переосмыслить порядок экранов результата (diagnosis first, price second).

**Метод проверки:** Блок 2 интервью [[INTERVIEW-GUIDE-EMMA.md §Блок 2]](./INTERVIEW-GUIDE-EMMA.md). Decision rule: 4/5 участников.

---

### H2 — Фото как точка входа: естественный и не требует объяснений

> 80%+ участников user testing воспринимают "сфотографируй проблему" как интуитивный entry point без дополнительного объяснения.

**Значение:** если опровергнута → добавить альтернативный text-input entry point в onboarding до launch.

**Метод проверки:** Concept test (Блок 4 интервью). A/B test в onboarding (A: только камера / B: камера + текст) в первые 2 недели после launch.

---

### H3 — 3-mode output (DIY/Hybrid/Pro) соответствует mental model пользователя

> Пользователи без подсказки описывают свои опции как "сам / частично сам / позвать мастера" — то есть 3-mode framework отражает их реальные категории мышления.

**Значение:** если опровергнута (например, users думают только "сам / не сам") → упростить до 2 режимов в v1, Hybrid → v1.5.

**Метод проверки:** Open-ended вопрос в Блоке 4 до показа концепта. Card sort (если позволяет формат).

---

### H4 — Региональная цена критична, generic national range не принимается

> 70%+ пользователей отвечают "региональная цена важнее" когда ставятся перед выбором "цена в вашем ZIP" vs "средняя по США".

**Значение:** если опровергнута → regional pricing не является key differentiator для пользователя (но остаётся для SEO и competitive moat). Не снимает его из roadmap, но снижает приоритет.

**Метод проверки:** Прямой вопрос в Блоке 4 [[INTERVIEW-GUIDE-EMMA.md]](./INTERVIEW-GUIDE-EMMA.md) + A/B test в Stage 6 (regional vs national range в результате).

---

### H5 — Freemium threshold 3 estimates/month оптимален

> Менее 20% пользователей Emma-сегмента назовут "3 бесплатных в месяц" недостаточным.

**Значение:** если опровергнута (3+ из 5 говорят "мало") → поднять до 5 free estimates. Это напрямую влияет на Feature #8 [[FEATURES.md]](../02-product/FEATURES.md) и paywall timing.

**Метод проверки:** Блок 5 интервью + frequency audit (как часто реально возникает ситуация).

---

## Рекомендации для MVP

### ✅ Делать

| Что | Почему |
|-----|--------|
| Photo-first UX (1 tap → camera) | Core differentiator + доказан PictureThis playbook |
| Regional pricing (zip-level, BLS MSA) | Единственный незанятый моат — строить с v1 |
| 3-mode output (DIY / Hybrid / Pro) | Нет ни у кого; напрямую закрывает Emma JTBD |
| Claude Haiku Vision (primary) → Sonnet fallback (<70% confidence) | Оптимальный cost/accuracy balance |
| Freemium 3 estimates/month → paywall | RevenueCat: hard paywall = 10.7% Day-35 conversion |
| Annual subscription $49.99 (preselected) | Emma WTP подтверждена; 41% AI revenue premium |
| Find a Pro deeplinks (Thumbtack / Google Maps / Yelp) | Zero partnership dependencies, Day 1 value |
| Disclaimers D-1–D-4 | Legal requirement (FTC, Apple App Store 5.1.2i) |
| Safety-blocked categories (gas / structural / main electrical) | Legal + ethical requirement; не переговариваемо |
| Top-30 repair categories scope | Disciplined focus; 80% of user needs covered |
| Amazon Associates deeplinks | $0 cost, Day 1 affiliate revenue |

### ❌ Не делать (в MVP)

| Что | Почему нет |
|-----|-----------|
| Thumbtack/Angi affiliate partnership | Partnership approval = 3–6 мес; zero-partnership deeplinks дают 80% value без risk |
| Home Depot / Lowe's product API | PA-API requires 10 orders/30 days minimum — cold start killer |
| RSMeans subscription ($1500+/год) | BLS OEWS + Claude training = достаточно для MVP accuracy |
| Video input | Toolbox.repair pattern; v2 feature — 3× complexity, <10% use cases в MVP |
| AI chat follow-up | Conversational AI = +2 месяца work; one-shot sufficient для MVP |
| AR measurement | Partner strategy (Magicplan) — не строить; v1.5+ |
| Community forum / Q&A | Moderation burden; Marcus-сегмент feature; v2.0 |
| International (non-US) | Data pipelines US-only в MVP; v2.0 с UK/CA/AU |
| Voice input | Ronald-сегмент feature; v1.5 |
| >30 repair categories | Scope discipline; encyclopedia = 6+ месяцев extra work |

### 💰 Монетизация (priority order)

| Поток | Запуск | Ожидаемый вклад |
|-------|--------|-----------------|
| **Subscription annual $49.99** | Day 1 (paywall после 3 free estimates) | 70% revenue; Emma + Marcus |
| **Pay-per-estimate $2.99** | Day 1 | 20% revenue; Tyler + casual users |
| **Amazon Associates deeplinks** | Day 1 (signup 1 день, бесплатно) | 5–10% revenue; бонус без усилий |
| **Thumbtack/Angi affiliate** | v1.5 post-PMF | +$15–40/lead; требует partnership approval |

**Freemium логика:** 3 free estimates/month → мягкий paywall → два CTA: "Subscribe ($49.99/yr)" + "Pay once ($2.99)". Annual preselected, скидка 58% vs monthly $9.99.

---

## Вердикт

```
MARKET SIZE       ██████████  10/10
PAIN VALIDATION   ██████████  10/10
COMPETITIVE GAP   █████████░   9/10
TECH FEASIBILITY  ████████░░   8/10
BUSINESS MODEL    █████████░   9/10
TIMING            ███████░░░   7/10
TEAM/EXECUTION    ███████░░░   7/10
──────────────────────────────────
TOTAL             60/70 = 86%
```

## 🟢 GO

**FixIt — валидный бизнес с сильным product-market fit. Рекомендуется к немедленной разработке.**

**Три причины GO:**

1. **GAP реален и незанят.** Никто из 17+ конкурентов не комбинирует regional pricing + 3-mode output. Это не opinion — это данные из feature matrix по 10 прямым конкурентам. [[COMPETITORS.md]](./COMPETITORS.md)

2. **Unit economics исключительные.** 96% gross margin, 8x LTV:CAC, 3 revenue stream без канибализации. Это не "хороший бизнес" — это **отличный бизнес**, если execution состоится.

3. **PictureThis доказал механику.** $200M ARR, те же mechanics (photo AI + subscription + App Store). FixIt не изобретает — копирует доказанный playbook в более высокоэмоциональный домен.

**Единственная оговорка: скорость.**

Окно — **сентябрь 2026** в худшем случае. Каждый месяц промедления = -100–150 GAP_SCORE. Toolbox.repair и SnapFix развиваются активно. Если MVP выходит после Q4 2026 — вердикт меняется на CAUTIOUS GO с риском устаревания дифференциации.

**Trigging NO-GO сценарий** (любой из трёх):
- Toolbox.repair добавляет zip-level cost estimate до FixIt launch
- User interviews (5 интервью, [[INTERVIEW-GUIDE-EMMA.md]](./INTERVIEW-GUIDE-EMMA.md)) показывают <50% H1+H3 validation
- Юридический review выявляет unexpected liability exposure для AI cost advice

---

## Источники

Полный research package (Stage 1, 2026-05-07):

| Документ | Версия | Строк | Ключевой вклад |
|----------|--------|-------|----------------|
| [MARKET-RESEARCH.md](./MARKET-RESEARCH.md) | v2.1 | ~620 | TAM/SAM/SOM, Google Trends, 7 конкурентов, 33 источника |
| [COMPETITOR-ANALYSIS.md](./COMPETITOR-ANALYSIS.md) | v1.1 | — | 7 кластеров, 17+ игроков, SWOT, positioning |
| [COMPETITORS.md](./COMPETITORS.md) | v1.0 | ~360 | App-level: рейтинги, отзывы, монетизация, GAP |
| [USER-PERSONAS.md](./USER-PERSONAS.md) | v2.0 | ~280 | Emma/Marcus/Tyler с Reddit-цитатами и триггерами |
| [DOMAIN-DEEP-DIVE.md](./DOMAIN-DEEP-DIVE.md) | v1.1 | ~1000+ | APIs, labor rates, AI feasibility, regulatory, unit economics |
| [DOMAIN-RESEARCH.md](./DOMAIN-RESEARCH.md) | v1.0 | ~450 | Глоссарий, 5 academic sources, disclaimers, content strategy |
| [INTERVIEW-GUIDE-EMMA.md](./INTERVIEW-GUIDE-EMMA.md) | v1.0 | ~200 | 5-интервью валидация, 6 гипотез, decision rules |
| [DISCLAIMERS.md](../DISCLAIMERS.md) | v1.0 | ~90 | D-1–D-4 финальные тексты, placement map |

**Total research output:** ~3000+ строк, 50K+ слов, 120+ источников.

---

**Дата:** 2026-05-07
**Версия:** v2.0 — полная переработка (синтез 8 документов Stage 1)
**Статус:** Final. Следующий milestone — Stage 6 Development после юр. review disclaimers и 5 user interviews.
