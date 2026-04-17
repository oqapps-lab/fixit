---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Архитектурные решения (ADR)

Этот документ содержит архитектурные решения проекта в формате ADR (Architecture Decision Records).

**Формат:** Каждое решение имеет номер, дату, статус и подробное описание.

---

## ADR-001: Выбор фреймворка для фронтенда

**Дата:** [TODO: 2026-01-15]
**Статус:** Accepted
**Автор:** [TODO: Имя разработчика]

### Контекст

[TODO: Описать проблему, которую нужно было решить]

Примеры контекста:
- Нужен фреймворк для быстрой разработки
- Требуется хорошая производительность для мобильных устройств
- Нужна большая экосистема компонентов

### Вариант 1: React
**Плюсы:**
- [TODO: Большая экосистема]
- [TODO: Хорошая документация]
- [TODO: Много вакансий]

**Минусы:**
- [TODO: Большой размер бандла]
- [TODO: Крутая кривая обучения]

### Вариант 2: Vue.js
**Плюсы:**
- [TODO: Простота обучения]
- [TODO: Легче в разработке]

**Минусы:**
- [TODO: Меньше экосистема]

### Вариант 3: Next.js
**Плюсы:**
- [TODO: Есть SSR]
- [TODO: Встроенный роутинг]

**Минусы:**
- [TODO: Более комплексно]

### Решение

**Выбран:** [TODO: React / Vue / Next.js / Svelte / Angular]

**Обоснование:**
```
[TODO: Четкое описание почему выбран этот вариант]

Пример:
"Выбран React потому что:
1. Команда уже имеет опыт в React
2. Большая экосистема компонентов
3. Хорошие возможности для масштабирования"
```

### Последствия

**Положительные:**
- [TODO: Быстрая разработка]
- [TODO: Хороший выбор библиотек]

**Отрицательные:**
- [TODO: Требует больше памяти]
- [TODO: Более сложная конфигурация]

### Альтернативы (рассматривались но отклонены)

- [TODO: Вариант A — почему отклонен]
- [TODO: Вариант B — почему отклонен]

---

## ADR-002: Выбор БД для основного хранилища

**Дата:** [TODO: 2026-01-20]
**Статус:** Accepted
**Автор:** [TODO: Имя разработчика]

### Контекст

[TODO: Почему нужно было выбирать БД?]

Примеры:
- Нужно хранить структурированные данные пользователей
- Требуется сложная логика запросов
- Нужна good ACID compliance

### Варианты

| БД | Плюсы | Минусы | Оценка |
|---|---|---|---|
| PostgreSQL | ACID, JSON support, GIS | Требует ресурсы | ⭐⭐⭐⭐⭐ |
| MongoDB | Schema flexibility, Scalability | Нет ACID (до v4.0) | ⭐⭐⭐⭐ |
| MySQL | Простота, Performance | Меньше функций | ⭐⭐⭐ |
| Firebase | Serverless, Real-time | Vendor lock-in | ⭐⭐⭐ |

### Решение

**Выбрана:** [TODO: PostgreSQL / MongoDB / MySQL / Firebase]

**Обоснование:**

```
[TODO: Технические причины выбора]

Пример:
"PostgreSQL был выбран потому что:
1. ACID compliance для финансовых операций
2. JSON support для гибкости
3. Широкая поддержка и экосистема инструментов"
```

### Последствия

**Плюсы:**
- [TODO: Надёжность]
- [TODO: Масштабируемость]

**Минусы:**
- [TODO: Требуется опытный DBA]
- [TODO: Больше ресурсов для начальной настройки]

### Связанные решения

- [TODO: ADR-003: ORM выбор (Prisma / TypeORM / Sequelize)]
- [TODO: ADR-004: Caching стратегия (Redis)]

---

## ADR-003: Архитектура микросервисов vs Монолит

**Дата:** [TODO: 2026-02-01]
**Статус:** Accepted
**Автор:** [TODO: Имя архитектора]

### Контекст

[TODO: На какой стадии проекта это решалось?]

### Варианты

**Монолит:**
```
Плюсы:
- Проще разрабатывать на ранней стадии
- Легче доплировать локально
- Одна база кода

Минусы:
- Сложнее масштабировать
- Deployment на всё сразу
- Тесная связь между компонентами
```

**Микросервисы:**
```
Плюсы:
- Независимое масштабирование
- Отдельные deployment
- Лучше для больших команд

Минусы:
- Сложнее разрабатывать
- Требует хорошую инфраструктуру
- Сложнее дебаггировать
```

### Решение

**Выбран:** [TODO: Монолит / Микросервисы / Монолит с планом миграции]

**Обоснование:**

```
[TODO: Стратегия]

Пример:
"Начинаем с монолита потому что:
1. Проект на ранней стадии
2. Команда небольшая (5 человек)
3. Кого масштабирование не критично на день 1

План миграции на микросервисы:
- Auth service (отдельно через день 100)
- Payment service (через день 150)
- Notification service (через день 200)"
```

### Последствия

- [TODO: Быстрая разработка MVP]
- [TODO: Возможное рефакторинг в будущем]

---

## ADR-004: Выбор фреймворка для бэкенда

**Дата:** [TODO: 2026-01-25]
**Статус:** Accepted
**Автор:** [TODO: Имя разработчика]

### Контекст

[TODO: Почему нужен был бэкенд фреймворк?]

### Варианты

| Фреймворк | Язык | Плюсы | Минусы |
|---|---|---|---|
| Express.js | Node.js | Простота, npm экосистема | Мало встроенного |
| NestJS | Node.js | Структура, TypeScript | Более heavy |
| Django | Python | Batteries included, ORM | Менее гибкий |
| FastAPI | Python | Производительность, async | Молодой |
| Spring Boot | Java | Мощь, Масштабируемость | Сложный |

### Решение

**Выбран:** [TODO: Express.js / NestJS / Django / FastAPI / Spring Boot]

**Обоснование:**
```
[TODO: Причины выбора]
```

### Последствия

[TODO: Влияние на разработку]

---

## ADR-005: Authentication стратегия

**Дата:** [TODO: 2026-02-10]
**Статус:** Accepted
**Автор:** [TODO: Имя разработчика]

### Контекст

[TODO: Требования к аутентификации]

### Варианты

- JWT (JSON Web Tokens)
- Session-based (cookies)
- OAuth / OpenID Connect
- Custom implementation

### Решение

**Выбран:** [TODO: JWT / Sessions / OAuth]

**Деталь реализации:**

```
[TODO: Технические детали]

Пример для JWT:
- Access token: 15 minutes TTL
- Refresh token: 7 days TTL
- Stored in httpOnly cookie (для безопасности)
- Подпись HS256 / RS256

Пример для Sessions:
- Server-side session storage (Redis)
- Secure httpOnly cookies
- CSRF protection
- 24-hour session timeout
```

---

## ADR-006: Развертывание и инфраструктура

**Дата:** [TODO: 2026-02-15]
**Статус:** Accepted
**Автор:** [TODO: Имя DevOps]

### Контекст

[TODO: Требования к инфраструктуре]

### Варианты

- Traditional VPS (AWS EC2 / DigitalOcean)
- Containers (Docker + Kubernetes)
- Serverless (AWS Lambda / Google Cloud Functions)
- PaaS (Heroku / Vercel / Render)

### Решение

**Выбран:** [TODO: Docker + Kubernetes / Serverless / Traditional]

**Описание стека:**
```
[TODO: Полная инфраструктура]

Пример:
- Docker для контейнеризации
- Kubernetes на AWS EKS
- PostgreSQL на AWS RDS
- Redis на AWS ElastiCache
- S3 для хранения файлов
- CloudFlare для CDN
- Route53 для DNS
```

---

## ADR-007: API дизайн

**Дата:** [TODO: 2026-02-20]
**Статус:** Accepted
**Автор:** [TODO: Имя разработчика]

### Контекст

[TODO: Требования к API]

### Варианты

- REST (Representational State Transfer)
- GraphQL
- gRPC
- WebSocket (для real-time)

### Решение

**Выбран:** [TODO: REST / GraphQL / Hybrid]

**Стандарты:**

```
[TODO: API стандарты]

REST пример:
- Versioning: /api/v1/users
- Resources: GET /users, POST /users
- Status codes: 200, 201, 400, 401, 404, 500
- Pagination: ?page=1&limit=20
- Error response: { "error": "message", "code": "ERROR_CODE" }
```

---

## Template для нового ADR

```markdown
## ADR-00X: [Название решения]

**Дата:** [YYYY-MM-DD]
**Статус:** [Proposed / Accepted / Deprecated / Superseded]
**Автор:** [Имя]

### Контекст

[TODO: Описать фон и причины, почему это решение понадобилось]

### Варианты

[TODO: Описать альтернативные подходы]

| Вариант | Плюсы | Минусы | Рекомендация |
|---|---|---|---|
| Option A | [TODO] | [TODO] | ✓ Recommended |
| Option B | [TODO] | [TODO] | |
| Option C | [TODO] | [TODO] | |

### Решение

**Выбран:** [Вариант A]

**Обоснование:**
```
[TODO: Четкое объяснение почему]
```

### Последствия

**Положительные:**
- [TODO]

**Отрицательные:**
- [TODO]

**Долгосрочные:**
- [TODO]

### Альтернативы

- [TODO: Почему не выбран вариант B]
- [TODO: Почему не выбран вариант C]

### Связанные решения

- [TODO: ADR-XXX: Связанное решение]

### История

| Дата | Событие |
|---|---|
| [YYYY-MM-DD] | Создано |
| [YYYY-MM-DD] | Accepted |
```

---

## Указатель всех ADR

| № | Название | Статус | Дата |
|---|---|---|---|
| ADR-001 | Выбор фреймворка (Frontend) | Accepted | [TODO] |
| ADR-002 | Выбор БД | Accepted | [TODO] |
| ADR-003 | Архитектура (Mono vs Micro) | Accepted | [TODO] |
| ADR-004 | Фреймворк (Backend) | Accepted | [TODO] |
| ADR-005 | Authentication | Accepted | [TODO] |
| ADR-006 | Инфраструктура | Accepted | [TODO] |
| ADR-007 | API дизайн | Accepted | [TODO] |
| [TODO] | [TODO] | [TODO] | [TODO] |

## Ссылки и источники

- [ADR на GitHub](https://github.com/joelparkerhenderson/architecture_decision_record)
- [MADR - Markdown Any Decision Records](https://adr.github.io/madr/)
- [ADR на ThoughtWorks](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records)
- [TODO: Ссылка на архив решений]
