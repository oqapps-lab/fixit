---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# AI-интеграции

## Используемые модели

[TODO: Описание AI моделей, используемых в проекте]

| Модель | Провайдер | Назначение | Версия |
|--------|-----------|-----------|--------|
| [TODO] | [TODO] | [TODO] | [TODO] |

### Модель 1

**Провайдер:** [TODO: OpenAI/Anthropic/etc]

**ID модели:** [TODO]

**Примеры запросов:**

```typescript
const response = await openai.chat.completions.create({
  model: '[model-id]',
  messages: [
    { role: 'user', content: 'Hello' }
  ]
});
```

## API Ключи

[TODO: Описание, где хранятся API ключи]

**Хранилище:**
- Переменные окружения: [TODO: Какие переменные]
- Supabase Secrets: [TODO: Какие секреты]
- [TODO: Другие способы]

**Управление ключами:**

```typescript
// Загрузка из переменных окружения
const apiKey = Deno.env.get('OPENAI_API_KEY');

// Загрузка из Supabase Secrets
const secretKey = await supabase.from('secrets').select('value');
```

**Безопасность:**
- [TODO: Ротация ключей]
- [TODO: Мониторинг использования]
- [TODO: Revoke старых ключей]

## Промпты

[TODO: Описание где хранятся и как управляются промпты]

**Хранилище промптов:**
- [TODO: Отдельные файлы в `/prompts`]
- [TODO: БД таблица]
- [TODO: Переменные окружения]

### Шаблон промпта

**Название:** [TODO]

**Назначение:** [TODO: Для чего используется]

**Контекст:** [TODO: Общие инструкции модели]

**Пример:**

```
You are a helpful assistant that [PURPOSE].

[CONTEXT]

User input: {user_input}
```

**Использование в коде:**

```typescript
import { getPrompt } from './prompts';

const prompt = getPrompt('prompt-name');
const response = await openai.chat.completions.create({
  messages: [{ role: 'user', content: prompt }]
});
```

## Лимиты и Costs

[TODO: Описание лимитов использования и стоимости]

### Rate Limits

| Модель | Requests/мин | Tokens/мин | Burst |
|--------|--------------|-----------|-------|
| [TODO] | [TODO] | [TODO] | [TODO] |

### Стоимость

[TODO: Описать структуру затрат]

| Модель | Input (за 1K tokens) | Output (за 1K tokens) |
|--------|---------------------|----------------------|
| [TODO] | [TODO] | [TODO] |

### Мониторинг затрат

```typescript
// Логирование использования
interface AIUsage {
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  timestamp: Date;
}

// Сохранение в БД
await supabase
  .from('ai_usage')
  .insert([usageRecord]);
```

### Бюджет

**Месячный бюджет:** [TODO]

**Оповещения:**
- При [TODO]% использования: [TODO: Что произойдет]
- При достижении лимита: [TODO: Что произойдет]

## Fallback Стратегии

[TODO: Описание, что делать при недоступности AI сервиса]

### Обработка ошибок

```typescript
try {
  const response = await callAIModel(input);
  return response;
} catch (error) {
  // Fallback стратегия
  return await callFallbackService(input);
}
```

### Fallback сервисы

| Первичный | Fallback 1 | Fallback 2 |
|-----------|-----------|-----------|
| [TODO] | [TODO] | [TODO] |

### Caching результатов

[TODO: Описание кэширования результатов для часто используемых запросов]

```typescript
// Проверка кэша перед запросом
const cached = await supabase
  .from('ai_cache')
  .select('response')
  .eq('prompt_hash', hash(prompt))
  .single();

if (cached) {
  return cached.response;
}

// Если нет в кэше, вызваем API и сохраняем результат
```

## Мониторинг

[TODO: Описать мониторинг AI интеграций]

**Метрики:**
- [TODO: Успешные запросы]
- [TODO: Ошибки]
- [TODO: Время ответа]
- [TODO: Использование бюджета]

**Логирование:**

```typescript
console.log({
  model: 'gpt-4',
  timestamp: new Date(),
  inputTokens: 150,
  outputTokens: 250,
  latency: 1200,
  status: 'success'
});
```

## Примеры использования

[TODO: Описать типичные case-study AI интеграций]

### Пример 1: [НАЗВАНИЕ]

[TODO: Описание и код]

```typescript
[TODO: Пример кода]
```

## Ограничения и известные проблемы

[TODO: Описать ограничения и проблемы]

- [TODO: Проблема 1]
- [TODO: Проблема 2]
- [TODO: Решение]
