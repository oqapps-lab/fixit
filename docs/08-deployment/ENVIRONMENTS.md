---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Окружения (Environments)

## Таблица окружений

| Параметр | Development | Staging | Production |
|---|---|---|---|
| **URL** | `localhost:3000` | [TODO: staging.app.com] | [TODO: app.com] |
| **API базовый URL** | `http://localhost:8000/api` | [TODO: https://api-staging.app.com] | [TODO: https://api.app.com] |
| **БД** | Local PostgreSQL | [TODO: AWS RDS Staging] | [TODO: AWS RDS Prod] |
| **Тип трафика** | Local / Team | Internal + Testers | Public (All Users) |
| **Backups** | Manual | Daily | Hourly |
| **SLA Uptime** | N/A | 99% | 99.99% |
| **CDN** | None | CloudFlare | CloudFlare Premium |
| **SSL Cert** | Self-signed | [TODO: Let's Encrypt] | [TODO: Comodo SSL] |
| **Мониторинг** | Basic (console) | Sentry + Logs | Sentry + PagerDuty + NewRelic |
| **Масштабирование** | Manual | [TODO: k8s 2 replicas] | [TODO: k8s Auto-scaling] |

## Переменные окружения

### Frontend (.env файлы)

**Development (.env.development):**
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENV=development
REACT_APP_LOG_LEVEL=debug
REACT_APP_SENTRY_DSN=[TODO: staging key]
REACT_APP_ANALYTICS_ID=[TODO: staging]
```

**Staging (.env.staging):**
```
REACT_APP_API_URL=https://api-staging.app.com
REACT_APP_ENV=staging
REACT_APP_LOG_LEVEL=info
REACT_APP_SENTRY_DSN=[TODO: staging key]
REACT_APP_ANALYTICS_ID=[TODO: staging]
```

**Production (.env.production):**
```
REACT_APP_API_URL=https://api.app.com
REACT_APP_ENV=production
REACT_APP_LOG_LEVEL=warn
REACT_APP_SENTRY_DSN=[TODO: production key]
REACT_APP_ANALYTICS_ID=[TODO: production]
```

### Backend (Environment Variables)

**Development:**
```
NODE_ENV=development
PORT=8000
DATABASE_URL=postgresql://user:password@localhost:5432/app_dev
LOG_LEVEL=debug
JWT_SECRET=[TODO: dev-secret]
PAYMENT_PROVIDER=stripe_test
STRIPE_API_KEY=[TODO: sk_test_...]
SENDGRID_API_KEY=[TODO: SG... (test)]
```

**Staging:**
```
NODE_ENV=staging
PORT=8000
DATABASE_URL=[TODO: RDS staging URL]
LOG_LEVEL=info
JWT_SECRET=[TODO: staging-secret]
PAYMENT_PROVIDER=stripe_test
STRIPE_API_KEY=[TODO: sk_test_...]
SENDGRID_API_KEY=[TODO: SG... (staging)]
AWS_REGION=us-east-1
S3_BUCKET=[TODO: app-staging-uploads]
```

**Production:**
```
NODE_ENV=production
PORT=8000
DATABASE_URL=[TODO: RDS production URL]
LOG_LEVEL=warn
JWT_SECRET=[TODO: production-secret (stored in AWS Secrets Manager)]
PAYMENT_PROVIDER=stripe_live
STRIPE_API_KEY=[TODO: sk_live_...]
SENDGRID_API_KEY=[TODO: SG... (production)]
AWS_REGION=us-east-1
S3_BUCKET=[TODO: app-prod-uploads]
NEW_RELIC_API_KEY=[TODO: xxx]
```

### Управление secrets

- [TODO: AWS Secrets Manager / HashiCorp Vault / 1Password]
- [TODO: Кто имеет доступ к production secrets?]
- [TODO: Как ротировать ключи?]
- [TODO: Audit log для доступа к secrets]

## Supabase проекты

### Проекты по окружениям

| Окружение | Project URL | Project Ref | API Key (anon) | API Key (service) |
|---|---|---|---|---|
| **Development** | [TODO: supabase project] | [TODO] | [TODO] | [TODO] |
| **Staging** | [TODO: supabase project] | [TODO] | [TODO] | [TODO] |
| **Production** | [TODO: supabase project] | [TODO] | [TODO] | [TODO] |

### Database Replication

```
Production ← (Backup/Restore) → Staging
```

[TODO: Политика синхронизации данных между окружениями]

## Развертывание в окружениях

### Development

**Процесс:**
1. [TODO: Push код в main / dev branch]
2. [TODO: Auto-deploy via GitHub Actions / CI/CD]
3. [TODO: На localhost или dev server]

**Чистота:** [TODO: Свежие моки, test data, или production copy?]

**Reset frequency:** [TODO: Ежедневно / При необходимости]

### Staging

**Процесс:**
1. [TODO: Create pull request]
2. [TODO: Code review + QA approval]
3. [TODO: Merge → Auto-deploy to staging]
4. [TODO: Run smoke tests]

**Data policy:** [TODO: Production copy / Anonymized data / Test data]

**Duration:** [TODO: ~1-2 hours для тестирования перед prod]

### Production

**Процесс:**
1. [TODO: Release branch создан]
2. [TODO: Merge pull request (2 approvals required)]
3. [TODO: Run full test suite]
4. [TODO: Manual trigger для deployment]
5. [TODO: Smoke tests + Monitoring check]
6. [TODO: Go-live]

**Safety gates:**
- [TODO: Все тесты зелёные]
- [TODO: Staging прошла 24h без ошибок]
- [TODO: Changelog обновлён]
- [TODO: Миграции протестированы]

## Миграции базы данных

### Запуск миграций

**Development:**
```bash
npm run migrate:dev
```

**Staging:**
```bash
npm run migrate:staging
```

**Production:**
```bash
npm run migrate:prod
# или через CI/CD с ручным подтверждением
```

[TODO: Описать процесс rollback]

## Мониторинг и Логи

### Логирование

| Сервис | Dev | Staging | Prod |
|---|---|---|---|
| **Application Logs** | stdout/stderr | CloudWatch/ELK | CloudWatch/ELK + Sentry |
| **Database Logs** | PostgreSQL local | Supabase Logs | Supabase Logs + Datadog |
| **API Logs** | morgan/pino | Structured JSON | Structured JSON + DataDog |
| **Retention** | 7 days | 30 days | 90 days |

### Доступ к логам

```
Development: [TODO: Локально или tail?]
Staging: [TODO: AWS CloudWatch / DataDog / Logtail]
Production: [TODO: AWS CloudWatch / DataDog / Logtail]
```

[TODO: Инструкции по поиску ошибок в логах]

## Backup и Disaster Recovery

### Backup стратегия

| Окружение | Частота | Хранилище | Retention | RTO | RPO |
|---|---|---|---|---|---|
| **Staging** | [TODO: Daily] | [TODO: S3] | [TODO: 7 дней] | [TODO: 4 часа] | [TODO: 24 часа] |
| **Production** | [TODO: Hourly] | [TODO: S3 + Cross-region] | [TODO: 30 дней] | [TODO: 1 час] | [TODO: 1 час] |

### Восстановление из backup

```
[TODO: Шаг-за-шагом процесс восстановления]

Пример:
1. Уведомить team в Slack
2.停止 production API (если нужно)
3. Restore database из backup
4. Verify data integrity
5. Run smoke tests
6. Restart services
7. Monitor для ошибок
8. Post-mortem meeting
```

## Checklist для развертывания

### Перед деплоем в Production

- [ ] [TODO: Все PRs смерджены и reviewed]
- [ ] [TODO: Все тесты passing (unit, integration, e2e)]
- [ ] [TODO: Code coverage > [TODO: X%]]
- [ ] [TODO: Staging прошла 24h без критических ошибок]
- [ ] [TODO: Миграции протестированы]
- [ ] [TODO: Changelog обновлён]
- [ ] [TODO: Release notes написаны]
- [ ] [TODO: PagerDuty инцидент создан (опционально)]

### После деплоя

- [ ] [TODO: Smoke tests passed]
- [ ] [TODO: Мониторинг metrics в норме]
- [ ] [TODO: Error rate < [TODO: X%]]
- [ ] [TODO: API latency < [TODO: Xms]]
- [ ] [TODO: Uptime check успешен]
- [ ] [TODO: Пользователи reportят о корректной работе]

## Откат (Rollback)

### Когда откатываться

```
[TODO: Критерии для rollback]

Примеры:
- Критическая ошибка, которая влияет > 10% пользователей
- API down / 5xx errors > 5%
- Database corruption
- Security breach
```

### Процесс rollback

```
1. Уведомить team + stakeholders
2. Identify last known good version
3. Trigger rollback: git revert [commit] / docker rollback
4. Verify services are up
5. Monitor error rates
6. Post-incident review
```

## Ссылки и источники
- [TODO: Ссылка на AWS Console]
- [TODO: Ссылка на Supabase Project]
- [TODO: Ссылка на CI/CD Pipeline]
- [TODO: Ссылка на Monitoring Dashboard]
