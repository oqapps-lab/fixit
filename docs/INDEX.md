# FixIt — Навигатор документации

> **Статус проекта:** UX Design complete (Stage 4 done) → Stage 5 Design in progress
> **Стек:** Expo SDK 55 / React Native / TypeScript strict
> **Бэкенд:** Supabase + Adapty + Claude API + Price aggregation APIs
> **Дата старта:** 2026-04-17
> **Последнее обновление:** 2026-05-07

---

## Структура документации

### 01 — Исследование (Research) ✅

| Файл | Описание | Статус | Версия |
|------|----------|--------|--------|
| [MARKET-RESEARCH.md](01-research/MARKET-RESEARCH.md) | TAM/SAM/SOM, Google Trends, тренды, GO/NO GO, Кластер 7 конкурентов | ✅ | v2.1 |
| [COMPETITOR-ANALYSIS.md](01-research/COMPETITOR-ANALYSIS.md) | 7 кластеров, 17+ игроков, SWOT, positioning | ✅ | v1.1 |
| [COMPETITORS.md](01-research/COMPETITORS.md) | App-level: рейтинги, отзывы, монетизация, фичи, GAP-анализ | ✅ | v1.0 |
| [USER-PERSONAS.md](01-research/USER-PERSONAS.md) | Emma (primary) + Marcus / Tyler — 3 контрастных персоны с Reddit-цитатами | ✅ | v2.0 |
| [INTERVIEW-GUIDE-EMMA.md](01-research/INTERVIEW-GUIDE-EMMA.md) | 5-интервью guide: 6 гипотез, скрипт, шаблон заметок, decision rules | ✅ | v1.0 |
| [DOMAIN-DEEP-DIVE.md](01-research/DOMAIN-DEEP-DIVE.md) | APIs, labor rates, regulatory, AI feasibility, unit economics | ✅ | v1.1 |
| [DOMAIN-RESEARCH.md](01-research/DOMAIN-RESEARCH.md) | Глоссарий 20 терминов, 5 academic sources, regulatory/disclaimers, контентная стратегия | ✅ | v1.0 |
| [RESEARCH-BRIEF.md](01-research/RESEARCH-BRIEF.md) | Synthesis: GO/NO GO, GAP_SCORE, риски, roadmap | ✅ | v1.1 |

### 02 — Продукт (Product) ✅

| Файл | Описание | Статус |
|------|----------|--------|
| [PRODUCT-VISION.md](02-product/PRODUCT-VISION.md) | WEPA north star, 7 принципов, flywheel | ✅ |
| [PROBLEM-SOLUTION-FIT.md](02-product/PROBLEM-SOLUTION-FIT.md) | 5 falsifiable hypotheses | ✅ |
| [FEATURES.md](02-product/FEATURES.md) | 10 MVP features с RICE prioritization | ✅ |
| [TARGET-AUDIENCE.md](02-product/TARGET-AUDIENCE.md) | Emma deep dive + secondary personas | ✅ |
| [MONETIZATION.md](02-product/MONETIZATION.md) | 4 revenue streams (sub + affiliate + pay-per + premium) | ✅ |

### 03 — Практики (Practices) ✅

| Файл | Описание | Статус |
|------|----------|--------|
| [ONBOARDING-RESEARCH.md](03-practices/ONBOARDING-RESEARCH.md) | 8-screen flow, <90 sec до aha | ✅ |
| [PAYWALL-RESEARCH.md](03-practices/PAYWALL-RESEARCH.md) | Soft after 3 free + 5 context paywalls | ✅ |
| [RETENTION-RESEARCH.md](03-practices/RETENTION-RESEARCH.md) | QAR north star, 12-16 push/year | ✅ |
| [ASO-RESEARCH.md](03-practices/ASO-RESEARCH.md) | "home repair cost" keyword strategy | ✅ |
| [PRACTICES-BRIEF.md](03-practices/PRACTICES-BRIEF.md) | Synthesis — unified playbook | ✅ |

### 04 — UX дизайн (UX) ✅

| Файл | Описание | Статус |
|------|----------|--------|
| [SCREEN-MAP.md](04-ux/SCREEN-MAP.md) | 47 уникальных экранов, 8 групп, priority | ✅ |
| [USER-FLOWS.md](04-ux/USER-FLOWS.md) | 7 core flows с ASCII diagrams | ✅ |
| [WIREFRAMES.md](04-ux/WIREFRAMES.md) | 20 ASCII wireframes + component library | ✅ |
| [UX-SPEC.md](04-ux/UX-SPEC.md) | Haptics, animations, accessibility, copy | ✅ |
| [FUNNEL.md](04-ux/FUNNEL.md) | 10K cohort projection + A/B roadmap | ✅ |
| [UX-BRIEF.md](04-ux/UX-BRIEF.md) | Synthesis — decisions + Stage 5 handoff | ✅ |

### Корневые документы

| Файл | Описание | Статус |
|------|----------|--------|
| [DISCLAIMERS.md](DISCLAIMERS.md) | Готовые тексты D-1–D-4, карта размещения, правила реализации | ✅ |

### 05 — База данных (Database) ⏳

Будет заполнено перед Stage 6 Development. DB schema, migrations, RLS policies.

### 06 — Дизайн (Design) ⏳

Stage 5 in progress — Лана делает Stitch prompts + design system.

### 07 — Разработка (Development) ⏳

Стадия 6. Implementation notes, coding guides.

### 08 — Деплой (Deployment) ⏳

Стадия 7. Store listings, release notes, CI/CD.

---

## Воронка проекта

```
Stage 1 Research     ✅ → 6 docs, ~27K words (обновлено 2026-05-07)
Stage 2 Product      ✅ → 5 docs, ~25.2K words
Stage 3 Practices    ✅ → 5 docs, ~24K words
Stage 4 UX Design    ✅ → 6 docs, ~40K words
Stage 5 Design       ⏳ Лана — Stitch + design system
Stage 6 Development  ⏳ Лана — Expo + React Native
Stage 7 Testing      ⏳
Stage 8 Deployment   ⏳
```

---

## Как пользоваться

1. **Если ты новый в команде** — начни с [RESEARCH-BRIEF](01-research/RESEARCH-BRIEF.md) → [PRACTICES-BRIEF](03-practices/PRACTICES-BRIEF.md) → [UX-BRIEF](04-ux/UX-BRIEF.md). Три synthesis-документа дают быстрое понимание продукта.
2. **Если ты дизайнер (Лана)** — начни с [UX-BRIEF](04-ux/UX-BRIEF.md) → [SCREEN-MAP](04-ux/SCREEN-MAP.md) → [WIREFRAMES](04-ux/WIREFRAMES.md). Это материал для Stitch.
3. **Если ты разработчик** — [CLAUDE.md](../CLAUDE.md) в корне проекта + [FEATURES.md](02-product/FEATURES.md) + [UX-SPEC.md](04-ux/UX-SPEC.md).
4. **Когда нужен benchmark** — [FUNNEL.md](04-ux/FUNNEL.md) имеет полную таблицу expected metrics.
