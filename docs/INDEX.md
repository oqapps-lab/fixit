# [PROJECT_NAME] — Навигатор документации

> **Статус проекта:** [TODO: Planning / In Development / Live / Paused]
> **Стек:** [TODO: Flutter / React Native / Next.js / FlutterFlow]
> **Бэкенд:** [TODO: Supabase / Firebase / Custom]
> **Дата старта:** YYYY-MM-DD
> **Последнее обновление:** YYYY-MM-DD

---

## Структура документации

### 00 — Мета
Служебные файлы проекта: глоссарий, контакты, правила ведения документации.

| Файл | Описание |
|------|----------|
| [GLOSSARY.md](00-meta/GLOSSARY.md) | Глоссарий терминов проекта |
| [CONVENTIONS.md](00-meta/CONVENTIONS.md) | Соглашения: как вести документы, нейминг, версионирование |

### 01 — Исследование (Research)
Большие исследовательские документы по нише, рынку, конкурентам, пользователям.

| Файл | Описание |
|------|----------|
| [MARKET-RESEARCH.md](01-research/MARKET-RESEARCH.md) | Исследование рынка и ниши (50-150 стр) |
| [COMPETITOR-ANALYSIS.md](01-research/COMPETITOR-ANALYSIS.md) | Разбор конкурентов |
| [USER-PERSONAS.md](01-research/USER-PERSONAS.md) | Портреты пользователей, сегменты аудитории |
| [DOMAIN-DEEP-DIVE.md](01-research/DOMAIN-DEEP-DIVE.md) | Глубокое погружение в предметную область |

### 02 — Продукт (Product)
Что приложение делает, как себя ведёт, какие фичи, какие экраны.

| Файл | Описание |
|------|----------|
| [VISION.md](02-product/VISION.md) | Видение продукта, цели, метрики успеха |
| [FEATURES.md](02-product/FEATURES.md) | Полный список функционала с приоритетами |
| [USER-FLOWS.md](02-product/USER-FLOWS.md) | Пользовательские сценарии (onboarding, core loop, retention) |
| [SCREENS.md](02-product/SCREENS.md) | Карта экранов с описанием каждого |
| [ROADMAP.md](02-product/ROADMAP.md) | Дорожная карта: что делаем когда |

### 03 — Дизайн (Design)
Всё про UI/UX, стилистику, компоненты.

| Файл | Описание |
|------|----------|
| [DESIGN-SYSTEM.md](03-design/DESIGN-SYSTEM.md) | Цвета, шрифты, отступы, компоненты |
| [UI-KIT.md](03-design/UI-KIT.md) | Описание UI-компонентов (кнопки, карточки, модалки) |
| [NAVIGATION.md](03-design/NAVIGATION.md) | Навигационная структура приложения (табы, стеки) |

### 04 — Техническая документация (Technical)
Ядро: база данных, API, функции, интеграции.

| Файл | Описание |
|------|----------|
| [ARCHITECTURE.md](04-technical/ARCHITECTURE.md) | Общая архитектура системы (диаграмма + описание) |
| **База данных** | |
| [DATABASE-SCHEMA.md](04-technical/database/DATABASE-SCHEMA.md) | Схема БД: таблицы, связи, индексы |
| [RLS-POLICIES.md](04-technical/database/RLS-POLICIES.md) | Row Level Security — политики доступа Supabase |
| [MIGRATIONS.md](04-technical/database/MIGRATIONS.md) | Лог миграций базы данных |
| **API и функции** | |
| [API-ENDPOINTS.md](04-technical/api/API-ENDPOINTS.md) | Все API эндпоинты (Edge Functions, REST) |
| [EDGE-FUNCTIONS.md](04-technical/functions/EDGE-FUNCTIONS.md) | Описание каждой Edge Function: что делает, триггеры |
| [TRIGGERS-WEBHOOKS.md](04-technical/functions/TRIGGERS-WEBHOOKS.md) | Триггеры БД, вебхуки, cron-задачи |
| **Интеграции** | |
| [AUTH.md](04-technical/integrations/AUTH.md) | Аутентификация (Supabase Auth, OAuth провайдеры) |
| [STORAGE.md](04-technical/integrations/STORAGE.md) | Файловое хранилище (Supabase Storage, CDN) |
| [AI-INTEGRATIONS.md](04-technical/integrations/AI-INTEGRATIONS.md) | AI-сервисы (OpenAI, Anthropic и т.д.) |
| [PUSH-NOTIFICATIONS.md](04-technical/integrations/PUSH-NOTIFICATIONS.md) | Пуш-уведомления (FCM, APNs) |
| [THIRD-PARTY.md](04-technical/integrations/THIRD-PARTY.md) | Прочие внешние сервисы (аналитика, крашлитика) |

### 05 — Бизнес-модель (Business)
Монетизация, цены, подписки, юнит-экономика.

| Файл | Описание |
|------|----------|
| [MONETIZATION.md](05-business/MONETIZATION.md) | Модель монетизации: подписки, токены, in-app purchases |
| [PRICING.md](05-business/PRICING.md) | Ценообразование, тарифы, пакеты |
| [UNIT-ECONOMICS.md](05-business/UNIT-ECONOMICS.md) | Юнит-экономика: LTV, CAC, ARPU, retention |
| [TOKEN-SYSTEM.md](05-business/TOKEN-SYSTEM.md) | Система токенов / кредитов (если есть) |

### 06 — Аналитика (Analytics)
Трекинг, метрики, события.

| Файл | Описание |
|------|----------|
| [EVENTS.md](06-analytics/EVENTS.md) | Список всех аналитических событий |
| [KPI-DASHBOARD.md](06-analytics/KPI-DASHBOARD.md) | Ключевые метрики и как их отслеживать |
| [AB-TESTS.md](06-analytics/AB-TESTS.md) | A/B тесты: что тестируем, результаты |

### 07 — Деплой (Deployment)
Сборка, публикация, CI/CD, среды.

| Файл | Описание |
|------|----------|
| [ENVIRONMENTS.md](07-deployment/ENVIRONMENTS.md) | Dev / Staging / Prod — настройки окружений |
| [BUILD-DEPLOY.md](07-deployment/BUILD-DEPLOY.md) | Как собирать и деплоить |
| [APP-STORE.md](07-deployment/APP-STORE.md) | Публикация в App Store / Google Play |

### 08 — Changelog
История изменений.

| Файл | Описание |
|------|----------|
| [CHANGELOG.md](08-changelog/CHANGELOG.md) | Лог всех значимых изменений по датам |
| [DECISIONS.md](08-changelog/DECISIONS.md) | Архитектурные решения (ADR): почему выбрали X вместо Y |

---

## Как пользоваться

1. **Склонируй или скачай** репо `project-docs-template`, переименуй папку под свой проект
2. **Найди и замени** `[PROJECT_NAME]`, `[AUTHOR]`, `YYYY-MM-DD` на свои значения во всех файлах
3. **Пройдись по `[TODO: ...]`** плейсхолдерам — они подсказывают, что писать в каждое место
4. **Заполняй постепенно** — не нужно всё сразу. Минимальный стартовый набор:
   - `02-product/VISION.md` — зачем делаем
   - `02-product/FEATURES.md` — что делаем
   - `04-technical/ARCHITECTURE.md` — как делаем
   - `00-meta/GLOSSARY.md` — словарь терминов
5. **Каждый файл** — самостоятельный документ. Не бойся копировать контекст между файлами
6. **Передавай AI** нужный файл для работы, а не весь проект целиком — так точнее и дешевле по токенам
7. **Обновляй `Дата:`** в метаблоке при значимых изменениях
