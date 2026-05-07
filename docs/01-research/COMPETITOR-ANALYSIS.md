# COMPETITOR-ANALYSIS.md — FixIt

**Дата:** 7 мая 2026
**Продукт:** FixIt — AI home repair cost advisor (photo → diagnosis → DIY / Hybrid / Full Pro estimate)
**Автор:** Research Team
**Статус:** v1.1 — добавлен Кластер 7: AI Mobile Repair Apps (SnapFix, Fix AI, YouFixedIt, iFixit FixBot, Toolbox.repair)
**Companion docs:** [MARKET-RESEARCH.md](./MARKET-RESEARCH.md), [COMPETITORS.md](./COMPETITORS.md), [DOMAIN-DEEP-DIVE.md](./DOMAIN-DEEP-DIVE.md)

---

## Executive Summary

Конкурентное поле FixIt **разбито на 7 кластеров**, которые НЕ объединены в одном продукте. Это и есть главная возможность: **никто не делает photo-in + AI-identification + real-time regional pricing + 3-mode output (DIY / Hybrid / Pro) в одном приложении**. Существующие игроки — либо lead-gen платформы без оценки стоимости (Thumbtack, HomeAdvisor, Angi, TaskRabbit), либо web-cost-calculators без мобильной / AI компоненты (HomeWyse, Fixr, HomeAdvisor True Cost Guide), либо DIY-контент без pricing (iFixit, YouTube, This Old House), либо AI-identifier apps в смежных нишах без repair-cost overlay (Rock Identifier, PictureThis), либо insurance-tools (Hover, Encircle), либо video-chat-repair (Frankie, Fix It Friends), либо **новый Кластер 7 — AI Mobile Repair Apps** (SnapFix, Fix AI, YouFixedIt, Toolbox.repair, iFixit FixBot) — ближайшие по UX паттерну, но каждый закрывает лишь 1–2 из 5 нужных компонентов.

**8 ключевых выводов (обновлено май 2026):**

1. **Top 3 threats = Thumbtack, HomeAdvisor/Angi, HomeWyse.** Thumbtack и HomeAdvisor имеют массивную base доверия + 300K+ pros, HomeWyse — самый близкий к FixIt по сути (cost estimator), но без мобайла и без AI photo-input.
2. **Lead-gen игроки — партнёры, не враги.** FixIt может монетизироваться через их affiliate ($15-40 per lead) вместо конкуренции.
3. **AI-identifier precedent работает:** PictureThis ($200M+ ARR) доказал что photo-input model конвертится при высокой эмоциональной нагрузке. Home repair — ещё выше emotion (страх лишних трат).
4. **Insurance claim apps (Hover, Encircle)** — индексная зона, но target на adjusters/contractors, не consumers. FixIt — consumer-first.
5. **YouTube DIY tutorials — основной текущий substitute.** 500M+ views/month на repair-related queries. Но они не знают *твой* regional price, не считают materials list, не комбинируют с pro-option.
6. **Никто не делает 3-mode output.** Все существующие продукты дают **либо** tutorial (DIY), **либо** quote (Pro). FixIt — первый, кто даёт все три варианта side-by-side + рекомендует optimal на основе user's skill/risk tolerance.
7. **Барьер входа для FixIt =** получить API access у Thumbtack/HomeAdvisor или построить proprietary labor rate DB. Оба варианта решаемы (см. DOMAIN-DEEP-DIVE для deep dive).
8. **Кластер 7 появился за апрель–май 2026.** SnapFix, Fix AI, YouFixedIt, Toolbox.repair — все вышли за последние 6 месяцев. Рынок разогревается. Ни один из них не добавил regional price localization — это остаётся незащищённым differentiator FixIt. **Окно сужается: 6–9 месяцев до насыщения.**

---

## Методология

Конкуренты сгруппированы по **функциональному сходству**, не по категории App Store. Для каждого:
- **Core value prop** — что именно продают
- **Ключевые метрики** (downloads / MAU / ARR / funding) — где публично доступны
- **Монетизация** — как зарабатывают
- **Сильные стороны** — чему научиться
- **Слабости** — где FixIt побеждает
- **Threat level для FixIt:** Low / Medium / High

**Источники:** App Store Rankings (Sensor Tower, data.ai), Crunchbase, SimilarWeb, собственные сайты продуктов, reviews аналитика (Apptopia, AppFigures), press releases.

---

## Competitive Landscape Map

```
                      PRICE AWARENESS
                      (Does it tell you cost?)
                               ↑
                               │
              HomeWyse ●       │         ● FixIt (target)
              Fixr.com ●       │
        HomeAdvisor            │     ● Fix AI (partial, no regional)
        Cost Guide ●           │     ● HomeMD.ai
                               │
   ─────────────────────────────────────────────────→
   DIY-focused                 │                  PRO-focused
                               │
              iFixit ●         │         ● Thumbtack / HomeAdvisor / Angi
         SnapFix ●             │         ● TaskRabbit
     Toolbox.repair ●          │         ● Yelp for Services
        YouFixedIt ●           │         ● Frankie / Fix It Friends
              YouTube DIY ●    │
                               ↓
                   AI-IDENTIFIER PRECEDENT
                   (PictureThis, Rock Identifier — adjacent)
```

**Пустой квадрант (top-right):** высокое price awareness + pro-friendly + photo-AI — **территория FixIt.** Новые Кластер-7 игроки находятся в нижней левой зоне (DIY-focused, без regional pricing) — им далеко до правого верхнего угла.

---

## Кластер 1: Lead-gen платформы (pro-focused, no cost estimation)

### 1.1 Thumbtack

| Метрика | Значение |
|---|---|
| Founded | 2008 |
| Last funding | $271M (Series H, 2021) |
| Valuation | $3.2B (2021) |
| Revenue 2024 | **$400M (+27% YoY)** ¹ |
| Pros on platform | 300K+ |
| App Store iOS rating | 4.8 (189K reviews) |
| Downloads (est.) | 10M+ |
| Monetization | Pay-per-lead от pros ($5-40/lead) |

**Value prop:** "Find a pro for anything" — маркетплейс, где consumer описывает задачу, получает 3-5 матчей от local pros.

**Сильные стороны:**
- Массовая pro-сеть (300K)
- Бренд доверия 10+ лет
- Pro API (developers.thumbtack.com) для партнёров — возможность FixIt-интеграции
- Real-time labor rate данные (они сами собирают их у pros)

**Слабости (FixIt opportunity):**
- **Не говорит сколько это стоит.** Consumer пишет "починить кран" → получает 3 pro-контакта → сам договаривается о цене с каждым → тратит полдня на quote-collection.
- Нет photo-identification (consumer сам пишет текстом)
- Нет DIY-варианта — если consumer хочет сделать сам, Thumbtack бесполезен
- Pros ожидают оплату за leads — это создаёт incentive для aggressive sales
- Нет оценки "стоит ли это чинить vs заменить"
- Жалобы consumer'ов на "too expensive pros on platform" (Reddit / Trustpilot reviews)

**Threat level для FixIt: MEDIUM-HIGH** — они могут добавить AI photo + cost estimator features и съесть FixIt. Но они focused на pro-monetization, не на consumer-advice. Реалистичный сценарий: **FixIt партнёрится с Thumbtack как affiliate**.

---

### 1.2 Angi (formerly Angie's List) + HomeAdvisor (same parent)

| Метрика | Значение |
|---|---|
| Parent company | Angi Inc. (NASDAQ: ANGI) |
| Revenue 2024 | $1.18B (Angi Inc. consolidated) ² |
| Projects completed 2025 | 16M |
| Pros | 200K+ |
| HomeAdvisor App iOS rating | 4.8 (480K reviews) |
| Monetization | Pay-per-lead + subscriptions + ads |

**Value prop:** Angi — Yelp-like reviews + booking. HomeAdvisor — pro-matching (купили в 2017).

**Сильные стороны:**
- Reviews infrastructure (10M+ verified reviews)
- **HomeAdvisor True Cost Guide** — их публичная база cost data по 300+ категориям
- Angi Leads API через `crmintegrations@homeadvisor.com`
- Membership tier ($30/year) — precedent для consumer-paid home services

**Слабости (FixIt opportunity):**
- Cost Guide это **web-article**, не приложение → слабая mobile UX
- **Нет photo-input** — consumer сам classifies проблему
- Заполнен ads + upsells — UX drops trust
- App Store reviews: "too many calls from pros", "hard to get actual price without committing"

**Threat level для FixIt: MEDIUM.** Партнёрство возможно: Angi Leads API → FixIt отправляет user к pro → комиссия.

---

### 1.3 TaskRabbit

| Метрика | Значение |
|---|---|
| Founded | 2008 |
| Acquired by | IKEA (2017) |
| Countries | 9 (US, UK, DE, FR, CA, ES, IT, PT, PL) |
| Gig workers ("Taskers") | 140K+ |
| Hourly rate range | $25-125/hr |
| App Store iOS rating | 4.8 (160K reviews) |
| Monetization | Platform fee 15% от Tasker earnings + service fee от customer |

**Value prop:** hourly workers для handyman-level tasks (IKEA assembly dominant, moving, cleaning, simple repairs).

**Сильные стороны:** IKEA partnership на furniture assembly, clear hourly rates, fast booking.

**Слабости:** Не для licensed trades (plumbing/electrical/HVAC), нет cost estimator, нет DIY.

**Threat level: LOW-MEDIUM** — overlap только на furniture assembly. Partnership: FixIt отправляет "light repair" leads к TaskRabbit.

---

### 1.4 Yelp for Services

**Value prop:** Search + reviews for service providers.
**Threat level: LOW** — не специализирован.

---

## Кластер 2: Web Cost Calculators (closest to FixIt по сути)

### 2.1 HomeWyse ⭐ **САМЫЙ БЛИЗКИЙ КОНКУРЕНТ**

| Метрика | Значение |
|---|---|
| Type | Web cost calculator (no app) |
| Founded | ~2005 |
| Categories | 500+ project types |
| Monetization | AdSense + contractor lead-gen |
| Traffic (SimilarWeb est.) | ~2M visits/mo |
| Mobile UX | Responsive web, но не app |

**Value prop:** "How much does it cost to [install / repair / replace] [X] in [my zip]?" — user вводит zip + project type → получает breakdown (low / average / high) + materials + labor.

**Сильные стороны:**
- **Самая детальная public cost data** в индустрии
- Zip-code localization
- Breakdown на materials / labor / equipment
- 20 лет history — trusted by contractors as reference

**Слабости (FixIt opportunity):**
- **Нет мобильного приложения**
- Нет photo-input — user должен знать что именно чинить (classification bottleneck)
- Нет AI — static calculators
- Выглядит как 2008 web (UX)
- Нет integrations с retailer для actual material prices (показывает ranges, не live)
- Нет DIY-guidance
- Нет pro-matching

**Threat level для FixIt: HIGH** — HomeWyse может запустить mobile app + AI и стать угрозой. Но они небольшая команда, давно не инновируют. Window opportunity пока открыт.

**Наш ход:** FixIt это **HomeWyse + AI photo + mobile-native + 3-mode output + retailer API integration**.

---

### 2.2 Fixr.com + HomeGuide

Похожи на HomeWyse — web-only, aggregator cost data. Fixr — упор на larger projects (kitchen remodel, bathroom). HomeGuide — content-marketing heavy.

**Threat level: LOW-MEDIUM.**

---

## Кластер 3: DIY Tutorial / Content

### 3.1 iFixit

| Метрика | Значение |
|---|---|
| Focus | **Device repair** (phones / laptops / appliances), не home repair |
| Model | Free repair guides + paid parts store + AI subscription |
| Monetization | Parts sales ($50M+ ARR est.) + FixBot Premium $4.99/мес или $50/год |
| Content | **125K+** guides (wiki-style, community-powered) |
| FixBot launch | **Декабрь 2025** — возврат в App Store после 10-летнего бана |
| Mobile app | Yes (iOS + Android), App Store rating **4.8** |

**Value prop:** "You can fix it yourself" — step-by-step teardown guides + AI-ассистент FixBot + tool/parts store.

**Что изменилось (декабрь 2025):** iFixit вернулся в App Store с FixBot — AI поверх 125K гайдов, форума и PDF мануалов. Бесплатно базово, $4.99/мес за голосовое управление и загрузку документов. Ранние отзывы позитивные. Усиление позиции — но домен остаётся **электроника и гаджеты**, не home repair.

**Сильные стороны:** Legendary brand trust, community-powered, parts store monetization, теперь + FixBot AI.

**Слабости (FixIt opportunity):** Только electronics/appliances teardown, **не home repair** (стены / сантехника / HVAC / мебель вне scope). Нет cost estimator. Нет regional pricing. Нет pro-matching.

**Threat level для FixIt: LOW** — разные домены. Inspiration для brand trust + free-tier AI паттерн.

---

### 3.2 YouTube DIY aggregators

- **This Old House** (TOH) — 1.9M subs, 200M+ lifetime views
- **Family Handyman** — 500K subs
- **Home RenoVision DIY** — 3M subs

**Value prop:** Видео-уроки для DIY.

**Сильные стороны:** Visual learning, free, community comments.

**Слабости (FixIt opportunity):**
- **Нет стоимостной стороны**
- **Нет personalization** — видео общие, не на *твою* проблему
- Нет интеграции с материалами
- YouTube-fatigue
- Нет "когда звать мастера" guidance

**Threat level: MEDIUM** — main substitute сейчас. FixIt побеждает через personalization + cost overlay + decision support.

---

### 3.3 Home Depot / Lowe's DIY content

Home Depot: 23M YouTube subs. Lowe's: 3M subs.

**Threat level: LOW** — они заточены продавать материалы.
**Партнёрство:** Home Depot Product Advertising API → FixIt показывает real-time prices их products.

---

## Кластер 4: AI-Identifier Apps (precedent для photo-input model)

### 4.1 PictureThis (Plant Identifier) ⭐ BLUEPRINT

| Метрика | Значение |
|---|---|
| Founded | 2017 |
| Parent | Glority |
| Downloads | 300M+ |
| MAU | 40M+ (est.) |
| ARR | **$200M+** (2024) ³ |
| Monetization | Freemium (3 free IDs / week) → $29.99/year premium |

**Value prop:** "Snap a photo of any plant → learn what it is."

**Почему важен для FixIt:**
- **Доказывает photo-input AI model работает в consumer apps** at scale
- **Доказывает freemium + subscription конвертится** ($200M ARR)
- **Доказывает что single-purpose AI app выигрывает у general-purpose** (plant id > Google Lens for plants)
- UI/UX паттерн photo → AI → advice → upsell — можно копировать

**Как FixIt отличается:** home repair — **выше emotion** (страх трат $$$), **выше stakes** (ремонт может стоить тысячи vs растение — curiosity).

**Threat level: NONE** — другой domain. Direct blueprint для FixIt.

---

### 4.2 Rock Identifier, Seek, SkinVision

- **Rock Identifier:** 20M+ downloads, ARR ~$15M. Same playbook as PictureThis.
- **Seek (iNaturalist):** Non-commercial, free. **Threat: NONE.**
- **SkinVision:** FDA cleared medical identifier. ARR ~$10M. Learning: FixIt без FDA нагрузки, но нужна careful liability boilerplate.

---

## Кластер 5: Insurance / Construction-focused (adjacent)

### 5.1 Hover

| Метрика | Значение |
|---|---|
| Founded | 2011 |
| Last funding | $60M (Series E, 2021) |
| Valuation | ~$500M |
| Customers | Insurance companies + contractors |
| Key feature | Aerial/3D measurement через фото |

**Value prop:** "Take photos of house → 3D model → exterior measurements for siding/roofing/paint quotes."

**Threat level: LOW-MEDIUM** — B2B2C для contractors/insurance. FixIt consumer-first. Но Hover технология (photogrammetry) — inspiration для FixIt measurement features.

---

### 5.2 Encircle, Magicplan, Moasure

Insurance claims documentation, AR-measurement apps для rooms. **Threat: LOW.**

---

## Кластер 6: Video Chat Repair (emerging)

### 6.1 Frankie (formerly Fix It Friends)

**Value prop:** 15-min video call with handyman for remote troubleshooting. $29-49 per call.

**Threat level: LOW** — different modality (human-interactive), higher ARPU но lower volume. Complement, не конкурент.

---

## Кластер 7: AI Mobile Repair Apps ⭐ НОВЫЙ (апрель–май 2026)

> Этот кластер не существовал на момент первой версии (апрель 2026). Появился за один месяц — сигнал разогрева рынка.

### 7.1 SnapFix — AI Home Repair Help

| Метрика | Значение |
|---|---|
| Тип | AI Photo Diagnosis mobile app |
| Запуск | 2025 |
| App Store rating | Недостаточно оценок (новое) |
| Монетизация | Подписка (точная цена не объявлена) |
| Охват | Сантехника, стены/потолок, бытовая техника, коды ошибок, вредители, мебель |

**Value prop:** "Snap a photo → AI instantly recognizes the problem → step-by-step guide + shopping list + basic cost estimate."

**Сильные стороны:** Photo-first UX — ближайший к FixIt паттерн интеграции; широкий охват домашних категорий; простота.

**Слабости (FixIt opportunity):**
- Нет regional price localization — базовые ranges без zip-привязки
- Нет pro matching (нельзя вызвать мастера из приложения)
- Нет 3-mode output (только DIY-путь)
- Нет brand recognition (неизвестный разработчик)

**Threat level: 🔴 HIGH** — прямой конкурент по core UX паттерну. Если добавят regional pricing + pro matching — станут серьёзным соперником.

---

### 7.2 Fix AI — Repair & Home Design

| Метрика | Значение |
|---|---|
| Тип | AI Photo Damage Detection + Cost Estimate |
| Запуск | 2025 |
| App Store rating | Ограниченные данные |
| Монетизация | $4.99/нед или **$29.99/год** (3-day free trial) |
| Фичи | Photo → damage detection → cost estimate → DIY guide + элементы AR home design |

**Value prop:** "Detect damage, estimate cost, get a repair guide — from one photo."

**Сильные стороны:** Единственный из новых, кто реально комбинирует photo + cost estimate; доступная цена ($29.99/год); AR-компонент для визуализации.

**Слабости (FixIt opportunity):**
- Нет regional price localization (стоимость — универсальные ranges, не zip-based)
- Нет pro matching
- Нет 3-mode output (Hybrid вариант отсутствует)
- Слабый brand

**Threat level: 🔴 HIGH** — ближайший по функционалу к FixIt из всего поля. Ключевое отличие FixIt: regional pricing + 3-mode + pro affiliate.

---

### 7.3 YouFixedIt — AI Home Repair

| Метрика | Значение |
|---|---|
| Тип | AI Text-based Repair Advisor |
| Запуск | Март 2026 |
| App Store rating | Нет отзывов |
| Монетизация | 14-day free trial → подписка (цена не объявлена) |
| Основатель | Практикующий электрик, 20+ лет опыта |
| Категории | HVAC, appliances, construction, general maintenance |

**Value prop:** "Decades of real repair expertise, now in your pocket — step-by-step advice + local contractor connections."

**Сильные стороны:** Построен практиком — экспертиза реальная; охват релевантных домашних категорий; contractor connection feature.

**Слабости (FixIt opportunity):**
- **Нет photo-input** — только текстовый ввод
- Нет cost estimate вообще
- Нет отзывов (слишком новое)
- Pricing неизвестен

**Threat level: 🟠 MEDIUM** — конкурирует за того же пользователя, но без photo и cost estimate значительно слабее по ценностному предложению.

---

### 7.4 Toolbox.repair

| Метрика | Значение |
|---|---|
| Тип | AI Video + Audio + Photo Diagnosis |
| Запуск | Апрель 2026 |
| Монетизация | $9.99/мес или $89.99/год |
| Фичи | Video + audio + photo diagnosis, DIY guides, safety assessment, pro matching |

**Value prop:** "Record a video of your problem — AI diagnoses it and finds you a pro."

**Сильные стороны:** Video + audio input — богаче чем только photo; DIY + pro matching одновременно; aggressive pricing как у FixIt.

**Слабости (FixIt opportunity):**
- Нет cost estimate (нет ни labor, ни materials pricing)
- Нет materials list
- Нет 3-mode output
- Нет региональной привязки цен

**Threat level: 🔴 HIGH** — наиболее технически продвинутый новый конкурент. Если добавят cost layer — прямая угроза. Watch closely.

---

### 7.5 HomeMD.ai

| Метрика | Значение |
|---|---|
| Тип | AI Photo Diagnosis + Cost Estimate (product SKU) |
| Монетизация | $7.99/мес |
| Фичи | Photo diagnosis через product SKU analysis, cost estimate |

**Value prop:** "AI diagnoses what's wrong with your home systems."

**Сильные стороны:** Photo + cost в одном; affordable pricing.

**Слабости (FixIt opportunity):** Нет DIY guides, нет pro matching, нет 3-mode output, узкий coverage (appliances/systems, не всё home repair).

**Threat level: 🟠 MEDIUM**

---

### Сводка по Кластеру 7

| Игрок | Photo AI | Cost Est | Regional | DIY | Pro | 3-mode | Threat |
|-------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| SnapFix | ✅ | ⚠ basic | ❌ | ✅ | ❌ | ❌ | 🔴 HIGH |
| Fix AI | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | 🔴 HIGH |
| YouFixedIt | ❌ | ❌ | ❌ | ✅ | ⚠ | ❌ | 🟠 MED |
| Toolbox.repair | ✅ video | ❌ | ❌ | ✅ | ✅ | ❌ | 🔴 HIGH |
| HomeMD.ai | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | 🟠 MED |
| **FixIt** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |

**Паттерн:** Все 5 игроков — частичные решения. Regional price localization + 3-mode output остаются незанятыми ни у кого. Это устойчивый differentiator FixIt на ближайшие 6–12 месяцев.

---

## Сводная таблица конкурентов (критическая)

| Продукт | Cat | ARR | Downloads | Photo AI | Cost Est | Regional | DIY guide | Pro match | 3-mode | Threat |
|---|---|---|---|---|---|---|---|---|---|---|
| **Thumbtack** | Lead-gen | $400M | 10M+ | ❌ | ❌ | ❌ | ❌ | ✅✅✅ | ❌ | 🟠 MED-HIGH |
| **Angi / HomeAdvisor** | Lead-gen | $1.18B | 20M+ | ❌ | ⚠ web | ⚠ web | ❌ | ✅✅✅ | ❌ | 🟠 MED |
| **TaskRabbit** | Gig | $200M (est) | 10M+ | ❌ | ⚠ hourly | ❌ | ❌ | ✅✅ | ❌ | 🟢 LOW-MED |
| **HomeWyse** | Web calc | ~$5M (ads) | web-only | ❌ | ✅✅✅ | ✅ zip | ❌ | ❌ | ❌ | 🔴 HIGH ⭐ |
| **Fixr.com** | Web calc | — | web-only | ❌ | ✅✅ | ⚠ | ❌ | ❌ | ❌ | 🟢 LOW-MED |
| **iFixit + FixBot** | DIY + AI | $50M+ | 10M+ | ❌ | ⚠ parts | ❌ | ✅✅ (devices) | ❌ | ❌ | 🟢 LOW |
| **YouTube DIY** | Content | — | massive | ❌ | ❌ | ❌ | ✅✅✅ | ❌ | ❌ | 🟠 MED |
| **PictureThis** | Plant AI | **$200M** | 300M | ✅✅✅ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟢 LOW (blueprint) |
| **Hover** | Measure | $80M (est) | pro-only | ⚠ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟢 LOW |
| **Frankie** | Video chat | — | <100K | ❌ | ❌ | ❌ | ❌ | ⚠ remote | ❌ | 🟢 LOW |
| **SnapFix** ⚡ NEW | AI mobile | early | <100K | ✅ | ⚠ basic | ❌ | ✅ | ❌ | ❌ | 🔴 HIGH |
| **Fix AI** ⚡ NEW | AI mobile | early | <100K | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | 🔴 HIGH |
| **YouFixedIt** ⚡ NEW | AI mobile | early | <50K | ❌ | ❌ | ❌ | ✅ | ⚠ | ❌ | 🟠 MED |
| **Toolbox.repair** ⚡ NEW | AI mobile | early | <100K | ✅ video | ❌ | ❌ | ✅ | ✅ | ❌ | 🔴 HIGH |
| **HomeMD.ai** ⚡ NEW | AI mobile | early | <50K | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | 🟠 MED |
| **FixIt** (target) | AI Advisor | — | — | ✅✅✅ | ✅✅✅ | ✅✅✅ | ✅✅✅ | ✅✅ | ✅✅✅ | — |

---

## SWOT — FixIt vs. конкурентное поле

### Strengths
- **First** в своём сочетании (photo AI + cost + DIY/Hybrid/Pro в одном)
- **Neutral advisor positioning** — не зарабатывает на push к "hire a pro" как Thumbtack/Angi
- **Mobile-native** vs HomeWyse/Fixr (web-only)
- **Global scope** (приоритет US для data)
- **Multi-channel monetization** — subscription + affiliate + pay-per (diversified)

### Weaknesses
- **Нет brand awareness** (starting from 0)
- **Labor rate data** — нужно partnership с Thumbtack/Angi API или собирать proprietary
- **Single-founder risk** (Лана одна на старте)
- **AI-accuracy risk** — если Claude Vision путает "мокрое пятно от посудомойки" с "плесень" — wrong advice

### Opportunities
- **Contractor shortage + labor rate inflation** — users хотят DIY
- **Insurance premium rises** — люди ищут способы сэкономить
- **Aging housing stock** — massive backlog repairs
- **Affiliate revenue** через Thumbtack/Angi — win-win
- **Voice input / AR** future feature
- **International expansion** после US validation

### Threats
- **HomeWyse запускает mobile app + AI** — самый страшный сценарий (их regional data + AI = прямой конкурент)
- **Toolbox.repair добавляет cost estimate layer** — они уже в нужном рынке, недостаёт только pricing
- **SnapFix / Fix AI добавляют regional pricing** — технически несложно, если найдут data source
- **Thumbtack добавляет AI photo-identify** в свой app
- **Home Depot / Lowe's launches** собственный AI advisor (Magic Apron + mobile)
- **Google / OpenAI General AI** — Gemini/ChatGPT photo-input может частично выполнять FixIt функции
- **Категориальное насыщение** — 5 новых игроков за 2 месяца, окно закрывается к Q4 2026

---

## Price Benchmarking — сколько берут конкуренты

| Продукт | Free tier | Paid tier | Pay-per |
|---|---|---|---|
| Thumbtack | Free for consumers | — | Pros pay $5-40/lead |
| Angi | Free | $30/yr membership | — |
| HomeWyse | Free (ads) | — | — |
| iFixit | Free guides | $9.99/mo iFixit Pro | — |
| PictureThis | 3 IDs/wk | $29.99/yr | — |
| Rock Identifier | Limited | $29.99/yr | — |
| SkinVision | Limited | $69.99/yr | $6.99/check |
| Frankie | — | — | $29-49/call |

**Инференс для FixIt pricing:**
- **Free tier:** 3 estimates/мес (как PictureThis)
- **Subscription:** $7.99-9.99/мес или $49.99/yr (annual discount)
- **Pay-per:** $2.99-4.99 за single estimate
- **Bonus affiliate:** $15-40 за каждый lead Thumbtack/Angi

**Expected ARPU:** $35-50/год (mix of subscription + affiliate).

---

## Positioning Statement для FixIt

> "**FixIt — единственное приложение, которое показывает тебе и как сделать самому, и во что обойдётся нанять мастера, из одной фотографии.** Thumbtack заставляет звонить пяти мастерам для quote. HomeWyse — это web-сайт 2008-го. YouTube DIY не знает *твои* материалы в *твоём* Home Depot. FixIt — один tap, real-time цены, три варианта: сделай сам / купи материалы + найми на установку / позови контрактора с квотой."

### 5 differentiation pillars

1. **Photo-first intake** (один тап vs тексты в Thumbtack)
2. **Real-time material pricing** через retailer API (vs static cost ranges HomeWyse)
3. **3-mode output** (DIY / Hybrid / Pro) — никто другой не даёт side-by-side
4. **Neutral advisor** — не зарабатываем на push к pros, даём honest "это ты сам можешь" в 60% случаев
5. **Global** — не US-only (HomeWyse/Fixr — US-only, Angi — US+Canada)

---

## Рекомендации стратегии

### Short-term (MVP, первые 6 месяцев)
- **Focus US market first** — лучший data ecosystem
- **Top 30 repair categories only** — по cost-report volume HomeAdvisor (+ IKEA furniture + top 10 appliance)
- **Affiliate monetization from day 1** — Thumbtack Pro API + Angi Leads
- **Free tier generous** (3-5 estimates/mo)
- **Positioning vs Thumbtack:** "Know the price before you call a pro"

### Medium-term (6-18 months)
- Expand categories (50 → 150)
- UK + Canada + Australia launch
- Partnership с insurance company
- B2B launch: **FixIt for Property Managers**

### Long-term (18+ months)
- AR-measurement (partner или build)
- Voice-first interaction
- Home history graph
- Crowd-sourced repair price data

---

## Источники

¹ Thumbtack Press — "Thumbtack 2024 Revenue Report" (February 2025)
² Angi Inc. — SEC 10-K filings 2024
³ Glority / PictureThis — public financial estimates + SimilarWeb (cross-referenced)
⁴ TaskRabbit / IKEA partnership announcement (March 2025)
⁵ App Store rankings via Sensor Tower (April 2026)
⁶ Crunchbase company profiles (accessed April 2026)
⁷ HomeAdvisor True Cost Guide (homeadvisor.com/cost)
⁸ HomeWyse.com direct analysis
⁹ SimilarWeb traffic data (April 2026)
¹⁰ iFixit PitchBook revenue estimates
¹¹ PictureThis Apptopia / AppFigures — trend data 2022-2025
¹² SkinVision FDA clearance announcement (2019)
¹³ 9to5Mac, "iFixit launches FixBot AI repair helper, with free and paid versions" (декабрь 2025) — https://9to5mac.com/2025/12/09/ifixit-launches-fixbot-ai-repair-helper-with-free-and-paid-versions/
¹⁴ App Store: SnapFix — AI Home Repair Help — https://apps.apple.com/us/app/snapfix-ai-home-repair-help/id6758781226
¹⁵ App Store: Fix AI — Repair & Home Design — https://apps.apple.com/us/app/fix-ai-repair-home-design/id6746446379
¹⁶ App Store: YouFixedIt — AI Home Repair — https://apps.apple.com/ca/app/youfixedit-ai-home-repair/id6757339556
¹⁷ Toolbox.repair — https://toolbox.repair/best-home-repair-apps
¹⁸ HomeMD.ai, "Best AI Home Repair Tools in 2026" — https://homemd.ai/guides/best-ai-home-repair-tools-2026-comparison

---

**Дата последнего обновления:** 2026-05-07
**Изменения v1.1:** Добавлен Кластер 7 (5 новых AI mobile игроков); обновлён iFixit (FixBot декабрь 2025); расширена сводная таблица; обновлены SWOT Threats; добавлен Competitive Landscape Map.
**Следующий шаг:** Переходить к Design (Stage 5). Следующий review — июль 2026.
