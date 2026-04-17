---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Сторонние сервисы

## Список интеграций

[TODO: Перечислить все сторонние сервисы, интегрированные в проект]

| Сервис | Назначение | API Key Location | Документация | Статус | Цена |
|--------|-----------|-----------------|--------------|--------|------|
| [TODO] | [TODO] | [TODO] | [TODO] | Active/Inactive | [TODO] |

## Примеры интеграций

### Интеграция 1: [НАЗВАНИЕ СЕРВИСА]

**Назначение:** [TODO: Описание того, для чего используется сервис]

**Провайдер:** [TODO: Имя провайдера]

**API Key:**
- Переменная окружения: `[VAR_NAME]`
- Где хранится: [TODO: .env / Supabase Secrets / AWS Secrets Manager]

**Документация:** [TODO: Ссылка на documentation]

**Конфигурация:**

```typescript
const client = new ServiceClient({
  apiKey: Deno.env.get('SERVICE_API_KEY'),
  baseUrl: 'https://api.service.com'
});
```

**Использование:**

```typescript
// [TODO: Пример использования]
const result = await client.doSomething({
  param1: 'value',
  param2: 'value'
});
```

**Rate Limits:**
- [TODO: Requests per minute]
- [TODO: Daily limit]

**Error Handling:**

```typescript
try {
  const response = await client.method();
} catch (error) {
  if (error.code === 'RATE_LIMIT') {
    // [TODO: Обработка лимита]
  } else if (error.code === 'UNAUTHORIZED') {
    // [TODO: Обновить ключ]
  }
}
```

**Стоимость:** [TODO: Free/Paid с указанием цены]

**Альтернативы:** [TODO: Другие сервисы с похожей функциональностью]

---

### Интеграция 2: [НАЗВАНИЕ СЕРВИСА]

**Назначение:** [TODO: Описание]

**Провайдер:** [TODO]

**API Key:**
- Переменная окружения: `[VAR_NAME]`
- Где хранится: [TODO]

**Документация:** [TODO]

**Конфигурация:**

```typescript
// [TODO: Пример конфигурации]
```

**Использование:**

```typescript
// [TODO: Пример кода]
```

**Rate Limits:**
- [TODO]

**Стоимость:** [TODO]

---

### Интеграция 3: [НАЗВАНИЕ СЕРВИСА]

[TODO: Повторить структуру для остальных сервисов]

---

## Управление API ключами

[TODO: Описать процесс управления и ротации ключей]

### Где хранятся ключи

**Локальная разработка:**
```
.env.local (не коммитить в git!)
```

**Production:**
```
Supabase Secrets / AWS Secrets Manager / [TODO]
```

### Ротация ключей

[TODO: Описать, как часто нужно обновлять ключи]

**Процесс ротации:**
1. [TODO: Шаг 1]
2. [TODO: Шаг 2]
3. [TODO: Шаг 3]

**Мониторинг использованных ключей:**

```bash
# [TODO: Команда для просмотра активных ключей]
```

### Revoke старых ключей

[TODO: Описать процесс отзыва старых ключей]

```typescript
// [TODO: Пример кода для отзыва]
```

## Мониторинг и Health Checks

[TODO: Описать мониторинг статуса сторонних сервисов]

**Status Pages:**

| Сервис | Status Page | Чек Interval |
|--------|------------|--------------|
| [TODO] | [TODO] | [TODO] |

**Проверка доступности:**

```typescript
async function checkServiceHealth() {
  const services = [
    { name: 'service-1', endpoint: 'https://api.service1.com/health' },
    { name: 'service-2', endpoint: 'https://api.service2.com/status' }
  ];

  for (const service of services) {
    try {
      const response = await fetch(service.endpoint, { timeout: 5000 });
      console.log(`${service.name}: ${response.ok ? 'OK' : 'ERROR'}`);
    } catch (error) {
      console.error(`${service.name}: UNAVAILABLE`, error.message);
    }
  }
}
```

## Fallback и Backup стратегии

[TODO: Описать, что делать при недоступности сервиса]

| Сервис | Fallback | Backup Plan |
|--------|----------|------------|
| [TODO] | [TODO] | [TODO] |

**Пример fallback:**

```typescript
async function callServiceWithFallback(data) {
  try {
    return await primaryService.call(data);
  } catch (error) {
    console.warn('Primary service failed, using fallback');
    return await fallbackService.call(data);
  }
}
```

## Billing и Cost Management

[TODO: Описать управление расходами на сторонние сервисы]

**Месячные расходы по сервисам:**

| Сервис | Месячная плата | Основано на | Мониторинг |
|--------|---------------|-----------|-----------|
| [TODO] | [TODO] | [TODO] | [TODO] |

**Общий бюджет:** [TODO]

**Оповещения:**
- При [TODO]% от бюджета: [TODO: Что произойдет]
- При превышении: [TODO: Что произойдет]

## Compliance и Security

[TODO: Описать требования безопасности для интеграций]

- [TODO: GDPR compliance]
- [TODO: Data encryption]
- [TODO: API security]
- [TODO: Audit logging]

## Миграция на новый сервис

[TODO: Описать процесс замены одного сервиса на другой]

**Шаги миграции:**
1. [TODO: Подготовка]
2. [TODO: Настройка нового]
3. [TODO: Тестирование]
4. [TODO: Переключение трафика]
5. [TODO: Отключение старого]

## Problematic Services

[TODO: Описать проблемы с сервисами и их решения]

| Сервис | Проблема | Решение | Статус |
|--------|----------|--------|--------|
| [TODO] | [TODO] | [TODO] | [TODO] |
