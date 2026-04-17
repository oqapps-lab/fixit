---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Триггеры, вебхуки, cron-задачи

## Database Triggers

[TODO: Описание использования Database Triggers]

| Таблица | Событие | Триггер | Функция | Описание |
|---------|--------|--------|---------|---------|
| [TODO] | INSERT/UPDATE/DELETE | [TODO] | [TODO] | [TODO] |

### Шаблон Database Trigger

```sql
-- Создание функции
CREATE OR REPLACE FUNCTION [function_name]()
RETURNS TRIGGER AS $$
BEGIN
  [TODO: Логика функции]
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Создание триггера
CREATE TRIGGER [trigger_name]
AFTER INSERT ON [table_name]
FOR EACH ROW
EXECUTE FUNCTION [function_name]();
```

**Примеры:**

- [TODO: Пример 1]
- [TODO: Пример 2]

## Webhooks

[TODO: Описание конфигурации вебхуков]

| Таблица | Событие | Webhook URL | Активен |
|---------|--------|------------|---------|
| [TODO] | INSERT/UPDATE/DELETE | [TODO] | [TODO] |

### Конфигурация webhook

```sql
-- Включение логирования изменений (для webhooks)
ALTER TABLE [table_name] ENABLE REPLICA IDENTITY FULL;

-- Создание webhook через UI Supabase или API
```

### Payload формат

```json
{
  "type": "INSERT",
  "table": "table_name",
  "record": {
    "id": "uuid",
    "field_name": "value"
  },
  "schema": "public",
  "old_record": null
}
```

### Обработка webhook

[TODO: Описать, как обрабатываются входящие вебхуки]

```typescript
// Пример обработчика
export async function handleWebhook(event: WebhookEvent) {
  const { type, table, record } = event;

  switch (table) {
    case '[table_name]':
      // [TODO: Обработка]
      break;
  }
}
```

## Cron Jobs (pg_cron)

[TODO: Описание использования pg_cron для регулярных задач]

| Название | Расписание | Функция | Описание |
|----------|-----------|--------|---------|
| [TODO] | [TODO: cron expression] | [TODO] | [TODO] |

### Установка pg_cron

```sql
CREATE EXTENSION IF NOT EXISTS pg_cron;
```

### Примеры расписаний

```sql
-- Каждый день в 00:00
'0 0 * * *'

-- Каждый час
'0 * * * *'

-- Каждый понедельник в 08:00
'0 8 * * 1'

-- Каждый 1-й день месяца
'0 0 1 * *'
```

### Создание cron задачи

```sql
SELECT cron.schedule('job_name', '0 0 * * *', $$
  UPDATE [table_name]
  SET updated_at = NOW()
  WHERE [condition];
$$);
```

### Управление cron задачами

```sql
-- Просмотр всех задач
SELECT * FROM cron.job;

-- Удаление задачи
SELECT cron.unschedule('job_name');

-- Отключение задачи
UPDATE cron.job SET active = false WHERE jobname = 'job_name';
```

## Мониторинг и отладка

[TODO: Описать мониторинг триггеров, вебхуков и cron-задач]

### Логирование триггеров

```sql
-- Таблица логов
CREATE TABLE IF NOT EXISTS trigger_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trigger_name TEXT,
  table_name TEXT,
  event TEXT,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- В функции триггера
INSERT INTO trigger_logs (trigger_name, table_name, event, new_data)
VALUES ('[trigger_name]', '[table_name]', TG_OP, to_jsonb(NEW));
```

### Проверка выполнения cron-задач

```sql
SELECT * FROM cron.job_run_details
ORDER BY start_time DESC
LIMIT 10;
```

## Проблемы и решения

[TODO: Описать типичные проблемы и их решения]

| Проблема | Причина | Решение |
|----------|--------|--------|
| [TODO] | [TODO] | [TODO] |
