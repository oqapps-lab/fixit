---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Сборка и деплой

## Команды сборки

### Frontend

**Installation:**
```bash
npm install
# или
yarn install
```

**Development сервер:**
```bash
npm run dev
# или
yarn dev
# Запустит: [TODO: localhost:3000 / localhost:5173 / etc]
```

**Production build:**
```bash
npm run build
# Outputs: [TODO: dist/ / build/]
# Size: ~[TODO: XXX KB] (gzipped)
```

**Preview production build (locally):**
```bash
npm run preview
```

**Lint и форматирование:**
```bash
npm run lint
npm run format
```

**Тесты:**
```bash
npm run test
npm run test:e2e
npm run test:coverage
```

### Backend

**Installation:**
```bash
npm install
# или
yarn install
```

**Development сервер:**
```bash
npm run dev
# Запустит: [TODO: localhost:8000 / localhost:3001 / etc]
```

**Production build:**
```bash
npm run build
# Outputs: [TODO: dist/]
```

**Запуск:**
```bash
npm start
```

**Lint и форматирование:**
```bash
npm run lint
npm run format
```

**Тесты:**
```bash
npm run test
npm run test:e2e
```

**Миграции БД:**
```bash
npm run migrate:up     # Применить все pending миграции
npm run migrate:down   # Откатить последнюю миграцию
npm run migrate:reset  # Откатить все и заново применить
```

### Docker (если используется)

**Build image:**
```bash
docker build -t app:latest .
```

**Run container:**
```bash
docker run -p 8000:8000 app:latest
```

**Docker Compose:**
```bash
docker-compose up -d
docker-compose logs -f
docker-compose down
```

## CI/CD Pipeline

### GitHub Actions / GitLab CI

**Trigger:** [TODO: On push / On pull request / On release tag]

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - [TODO: Deploy to staging]

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - [TODO: Manual approval]
      - [TODO: Deploy to production]
```

### Stages of CI/CD

| Stage | Назначение | Duration | Failure Action |
|---|---|---|---|
| **Lint** | Проверка кода стиля | ~1 min | Fail |
| **Unit Tests** | Тестирование компонентов | ~5 min | Fail |
| **Build** | Сборка приложения | ~3 min | Fail |
| **Integration Tests** | Тестирование интеграции | ~10 min | Fail |
| **E2E Tests** | Полные сценарии | ~15 min | Fail |
| **Deploy to Staging** | Развертывание на staging | ~5 min | Manual Review |
| **Smoke Tests (Staging)** | Быстрая проверка staging | ~2 min | Fail |
| **Deploy to Production** | Развертывание на prod | ~5 min | Manual Approval |

## Развертывание

### Staging Deployment

**Автоматическое:**
```bash
git push origin develop → Auto-deploy to staging
```

**Ручное:**
```bash
npm run deploy:staging
# или через AWS Console / Vercel / Heroku / Custom script
```

**Проверка:**
```bash
curl https://staging.app.com/health
# Ожидаем: { "status": "ok" }
```

### Production Deployment

**Через GitHub Actions:**
```bash
1. Merge pull request в main
2. GitHub Actions запускает тесты
3. Требует manual approval
4. Деплоит в production
```

**Ручной деплой:**
```bash
npm run deploy:prod
```

**Версионирование:**
```bash
# Tag для release
git tag v1.2.3
git push origin v1.2.3
# Trigger: Deploy v1.2.3 to production
```

### Deployment Strategies

**Blue-Green Deploy:**
```
Текущий production (Blue) запущен
Развертываем новую версию (Green)
Тестируем Green
Переключаем трафик Blue → Green
Если ошибка: откатываем трафик обратно
```

**Canary Deploy:**
```
Развертываем на 5% трафика
Мониторим ошибки
Если ок: постепенно увеличиваем до 100%
Если ошибка: откатываем
```

**Rolling Deploy:**
```
Постепенно меняем instances
Instance 1: Stop → Update → Start
Instance 2: Stop → Update → Start
...
Всегда есть running instances для трафика
```

[TODO: Выбрать стратегию]

## Чеклист перед релизом

### За 1 день до релиза

- [ ] [TODO: Finale code review completed]
- [ ] [TODO: Merge all PRs in release branch]
- [ ] [TODO: Run full test suite locally]
- [ ] [TODO: Create release branch (if needed)]
- [ ] [TODO: Update version in package.json]

### Тестирование на staging

- [ ] [TODO: Deploy to staging successful]
- [ ] [TODO: Run smoke tests]
- [ ] [TODO: Manual QA testing checklist completed]
- [ ] [TODO: No regressions in critical features]
- [ ] [TODO: Performance is acceptable]
- [ ] [TODO: No new error messages in Sentry]
- [ ] [TODO: 24 hours stable (no crashes)]

### Before Production Deploy

- [ ] [TODO: Database migrations tested in staging]
- [ ] [TODO: Rollback plan documented]
- [ ] [TODO: Monitoring alerts configured]
- [ ] [TODO: PagerDuty on-call ready]
- [ ] [TODO: Slack notification setup]
- [ ] [TODO: Release notes prepared]
- [ ] [TODO: Changelog updated]
- [ ] [TODO: Blog/Marketing notified (if public)]

### Deployment Day

- [ ] [TODO: Team online and ready]
- [ ] [TODO: No other deployments happening]
- [ ] [TODO: Not during peak traffic hours]
- [ ] [TODO: Backup recent database]
- [ ] [TODO: Final health checks on staging]

### During Production Deploy

- [ ] [TODO: Start deployment]
- [ ] [TODO: Monitor error rates (real-time)]
- [ ] [TODO: Check API latency]
- [ ] [TODO: Verify critical user flows work]
- [ ] [TODO: Monitor memory/CPU usage]
- [ ] [TODO: Check logs for errors]

### After Production Deploy

- [ ] [TODO: Smoke tests passed]
- [ ] [TODO: Key metrics stable]
- [ ] [TODO: No spike in error rates]
- [ ] [TODO: No customer complaints]
- [ ] [TODO: Post deployment in #deployments Slack]
- [ ] [TODO: Update status page]
- [ ] [TODO: Keep monitoring for 1 hour]

### Если что-то пошло не так

- [ ] [TODO: Trigger rollback immediately]
- [ ] [TODO: Notify team in Slack]
- [ ] [TODO: Assess damage]
- [ ] [TODO: Communicate to users (status page)]
- [ ] [TODO: Root cause analysis (post-mortem)]
- [ ] [TODO: Create action items to prevent]

## Откат (Rollback)

### Автоматический откат

```bash
# Через GitHub Actions
npm run rollback:prod

# Или вручную
git revert [commit-hash]
git push origin main
# Trigger: Auto-deploy rolled back version
```

### Ручной откат

```bash
# Docker
docker stop [container-id]
docker run -d -p 8000:8000 app:previous

# Vercel / Heroku
vercel rollback
# или через UI
```

### Проверка после rollback

- [TODO: API health check]
- [TODO: Database consistency check]
- [TODO: Error rate normalization]

## Мониторинг деплоя

### Real-time Dashboard

```
URL: [TODO: Grafana / Datadog / New Relic]

Метрики:
- Error rate
- API latency
- Request rate
- CPU / Memory usage
- Database connections
- Disk space
```

### Алерты

```
Alert if:
- Error rate > [TODO: 5%]
- Response time > [TODO: 5000ms]
- CPU > [TODO: 80%]
- Memory > [TODO: 85%]
- Disk > [TODO: 90%]

Action: Page on-call engineer via PagerDuty
```

## Версионирование

### Semantic Versioning

```
MAJOR.MINOR.PATCH
v1.2.3

MAJOR: Breaking changes
MINOR: New features (backward compatible)
PATCH: Bug fixes
```

**Примеры:**
- v1.0.0 → v1.0.1: Bug fix
- v1.0.1 → v1.1.0: New feature
- v1.1.0 → v2.0.0: Breaking change

### Changelog Формат

```
## [1.2.3] - 2026-03-20
### Added
- New feature X
- New feature Y

### Changed
- Updated dependency Z

### Fixed
- Fixed bug in feature X
- Fixed crash on Android

### Removed
- Deprecated API endpoint
```

## Ссылки и источники
- [TODO: Ссылка на CI/CD pipeline]
- [TODO: Ссылка на deployment guide]
- [TODO: Ссылка на rollback guide]
- [TODO: Ссылка на monitoring dashboard]
