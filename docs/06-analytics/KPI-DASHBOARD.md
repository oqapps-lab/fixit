---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# KPI и метрики

## North Star Metric (Главная метрика)

### Выбранная North Star

**[TODO: Выбрать одну главную метрику]**

| Кандидат | Описание | Почему / Почему нет |
|---|---|---|
| MAU | Monthly Active Users | [TODO] |
| DAU | Daily Active Users | [TODO] |
| Retention D30 | 30-дневная удержание | [TODO] |
| MRR | Monthly Recurring Revenue | [TODO] |
| [TODO: Другая] | [TODO] | [TODO] |

### Определение North Star

```
North Star = [TODO: Точное определение метрики]

Пример:
"Monthly Active Users (MAU) — количество уникальных пользователей
совершивших хотя бы одно действие в мобильном приложении в течение месяца"

Текущее значение: [TODO: X]
Целевое значение (12 месяцев): [TODO: Y]
Периодичность измерения: Ежедневно/Еженедельно/Ежемесячно
```

### Почему эта метрика?

[TODO: Обоснование выбора]

## Пирамида метрик (Metrics Pyramid)

```
                    [North Star]
                        |
              ┌─────────┼─────────┐
              |         |         |
           [KPI 1]   [KPI 2]   [KPI 3]
              |         |         |
        ┌─────┼──┐  ┌────┴────┐  └──┐
        |     |  |  |    |    |     |
      Input metrics for tracking
```

### Наша пирамида

**Tier 1: North Star**
- [TODO: Главная метрика]

**Tier 2: Key Performance Indicators (KPIs)**
- [TODO: KPI 1 - влияет на North Star]
- [TODO: KPI 2 - влияет на North Star]
- [TODO: KPI 3 - влияет на North Star]

**Tier 3: Input Metrics**
- [TODO: Метрика 1 - драйвер KPI]
- [TODO: Метрика 2 - драйвер KPI]
- [TODO: Метрика 3 - драйвер KPI]

## KPI по категориям

### Growth (Рост)

| KPI | Формула | Текущее | Целевое | Частота |
|---|---|---|---|---|
| **DAU (Daily Active Users)** | Unique users with activity/day | [TODO] | [TODO] | Ежедневно |
| **MAU (Monthly Active Users)** | Unique users with activity/month | [TODO] | [TODO] | Ежемесячно |
| **New Users** | New signups/period | [TODO] | [TODO] | Ежедневно |
| **WAU (Weekly Active Users)** | Unique users with activity/week | [TODO] | [TODO] | Еженедельно |
| **Installsно** | App installs | [TODO] | [TODO] | Ежедневно |

### Engagement (Вовлеченность)

| KPI | Формула | Текущее | Целевое | Частота |
|---|---|---|---|---|
| **DAU/MAU Ratio** | DAU / MAU | [TODO: X%] | [TODO: Y%] | Ежемесячно |
| **Session Length** | Avg time per session | [TODO: X min] | [TODO: Y min] | Ежедневно |
| **Session Frequency** | Avg sessions per user | [TODO: X] | [TODO: Y] | Ежемесячно |
| **Feature Adoption** | % users using feature | [TODO: X%] | [TODO: Y%] | Еженедельно |
| **Screens per Session** | Avg screens per session | [TODO: X] | [TODO: Y] | Ежедневно |

### Retention (Удержание)

| KPI | Формула | Текущее | Целевое | Частота |
|---|---|---|---|---|
| **D1 Retention** | Users back on Day 1 / Day 0 | [TODO: X%] | [TODO: Y%] | Ежедневно |
| **D7 Retention** | Users back on Day 7 / Day 0 | [TODO: X%] | [TODO: Y%] | Еженедельно |
| **D30 Retention** | Users back on Day 30 / Day 0 | [TODO: X%] | [TODO: Y%] | Ежемесячно |
| **Monthly Churn** | % users lost per month | [TODO: X%] | [TODO: Y%] | Ежемесячно |
| **Payback Period** | Months to recover CAC | [TODO: X мес] | [TODO: Y мес] | Ежемесячно |

### Monetization (Монетизация)

| KPI | Формула | Текущее | Целевое | Частота |
|---|---|---|---|---|
| **Conversion Rate** | Paying users / All users | [TODO: X%] | [TODO: Y%] | Ежемесячно |
| **ARPU** | Total revenue / All users | [TODO: $X] | [TODO: $Y] | Ежемесячно |
| **ARPPU** | Total revenue / Paying users | [TODO: $X] | [TODO: $Y] | Ежемесячно |
| **LTV** | Lifetime Value | [TODO: $X] | [TODO: $Y] | Квартально |
| **MRR** | Monthly Recurring Revenue | [TODO: $X] | [TODO: $Y] | Ежемесячно |
| **Refund Rate** | Refunds / Purchases | [TODO: X%] | [TODO: Y%] | Ежемесячно |

### Quality (Качество)

| KPI | Формула | Текущее | Целевое | Частота |
|---|---|---|---|---|
| **Crash Rate** | Crashes / Sessions | [TODO: X%] | [TODO: Y%] | Ежедневно |
| **ANR Rate** | App Not Responding / Sessions | [TODO: X%] | [TODO: Y%] | Ежедневно |
| **Error Rate** | Errors / API calls | [TODO: X%] | [TODO: Y%] | Ежедневно |
| **API Latency** | Avg response time | [TODO: Xms] | [TODO: Yms] | Ежедневно |
| **Uptime** | % time service available | [TODO: X%] | [TODO: Y%] | Ежедневно |

## Дашборды

### Основной дашборд (Executive Dashboard)

**Обновляется:** Ежедневно

```
┌─────────────────────────────────────────────────────────┐
│              EXECUTIVE DASHBOARD                         │
├──────────────────┬──────────────────┬──────────────────┤
│  North Star: X   │   Revenue: $Y    │   Churn: Z%      │
│  (Trend: ↑ 15%)  │   (MoM: +20%)    │   (Target: <5%)  │
├──────────────────┼──────────────────┼──────────────────┤
│     DAU: X       │   New Users: Y   │   D7 Retention   │
│   (WoW: +5%)     │   (YoY: +50%)    │     [TODO: Z%]   │
├──────────────────┼──────────────────┼──────────────────┤
│  [Chart 1]       │  [Chart 2]       │  [Chart 3]       │
│  Growth Trend    │  Revenue Trend   │  Retention Curve │
└──────────────────┴──────────────────┴──────────────────┘
```

**Элементы:**
- [TODO: North Star метрика с трендом]
- [TODO: Основные KPIs]
- [TODO: Графики тренда]

### Product Analytics Dashboard

**Обновляется:** Ежедневно/Еженедельно

- [TODO: DAU/MAU тренды]
- [TODO: Feature adoption by feature]
- [TODO: User segments analysis]
- [TODO: Funnel analysis]

### Business Dashboard

**Обновляется:** Ежемесячно

- [TODO: Revenue breakdown]
- [TODO: Conversion funnel]
- [TODO: ARPU/ARPPU]
- [TODO: Subscription status]

### Engineering / Quality Dashboard

**Обновляется:** Ежедневно (Real-time)

- [TODO: Crash rate]
- [TODO: API latency]
- [TODO: Error rate]
- [TODO: Uptime]

## Алерты

### Критические алерты

| Алерт | Условие | Действие |
|---|---|---|
| [TODO: Crash spike] | Crash rate > [TODO: X%] | Notify: [TODO: Team/Slack] |
| [TODO: Revenue drop] | MRR < [TODO: Y$ или -X%] | Notify: [TODO: Leadership/Slack] |
| [TODO: Churn surge] | Churn > [TODO: X%] | Notify: [TODO: Product/Slack] |
| [TODO: API outage] | Uptime < [TODO: X%] | Notify: [TODO: Engineering/Slack] |

### Предупредительные алерты

| Алерт | Условие | Действие |
|---|---|---|
| [TODO: Retention drop] | D7 < 20% (базовое значение) | Daily digest |
| [TODO: CAC increase] | CAC > $[TODO] | Weekly digest |
| [TODO: Engagement decline] | DAU/MAU < [TODO: X%] | Weekly digest |

### Настройка алертов

```
[TODO: Инструмент настройки алертов]
- Slack integrация
- Email notifications
- SMS alerts (для critical)
- PagerDuty для on-call
```

## Data Ownership

| Метрика | Владелец | Обновление | Отчетность |
|---|---|---|---|
| [TODO: DAU] | [TODO: Product] | Ежедневно | Weekly |
| [TODO: Revenue] | [TODO: Finance] | Ежемесячно | Monthly |
| [TODO: Churn] | [TODO: Retention] | Ежемесячно | Monthly |
| [TODO: Quality] | [TODO: Engineering] | Ежедневно | Weekly |

## Компоненты дашборда (Tools)

| Платформа | Метрики | Доступ |
|---|---|---|
| [TODO: Google Analytics 4] | Page views, events | [TODO: Команда] |
| [TODO: Mixpanel/Amplitude] | Custom events, retention | [TODO: Команда] |
| [TODO: Firebase Console] | Crashes, ANR | [TODO: Команда] |
| [TODO: Custom Backend] | Custom metrics | [TODO: Команда] |
| [TODO: Tableau/Metabase] | Executive dashboards | [TODO: Команда] |

## Ссылки и источники
- [TODO: Ссылка на Mixpanel/Amplitude аккаунт]
- [TODO: Ссылка на Google Sheets с метриками]
- [TODO: Ссылка на Tableau/Metabase дашборд]
- [TODO: Ссылка на Slack канал с алертами]
