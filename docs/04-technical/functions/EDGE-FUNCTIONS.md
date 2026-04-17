---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Edge Functions (Supabase)

## Список функций

[TODO: Перечислить все Edge Functions]

| Название | Описание | Триггер | Статус |
|----------|---------|--------|--------|
| [TODO] | [TODO] | [TODO] | [TODO] |

## Шаблон Edge Function

### [НАЗВАНИЕ_ФУНКЦИИ]

**Триггер:** [TODO: HTTP / Database trigger / Cron job]

**Входные данные:**

```typescript
// [TODO: Описать входные параметры]
interface Input {
  field_name: string;
  // [TODO: Добавить поля]
}
```

**Логика:**

[TODO: Описание основной логики функции]

**Выходные данные:**

```typescript
// [TODO: Описать выходные данные]
interface Response {
  success: boolean;
  data?: {
    id: string;
    // [TODO: Добавить поля]
  };
  error?: string;
}
```

**Ошибки:**

- [TODO: Возможная ошибка 1]: [Как обрабатывается]
- [TODO: Возможная ошибка 2]: [Как обрабатывается]

**Пример использования:**

```typescript
// HTTP trigger
const response = await fetch('https://[project].supabase.co/functions/v1/[function-name]', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    field_name: 'value'
  })
});
```

**Примечания:**

- [TODO: Дополнительная информация]
- Timeout: [TODO: Указать timeout]
- Memory: [TODO: Память]

---

## Переменные окружения

[TODO: Описать переменные окружения, используемые в Edge Functions]

| Переменная | Назначение | Где хранится | Пример значения |
|------------|-----------|--------------|-----------------|
| [TODO] | [TODO] | [TODO] | [TODO] |

### Как установить переменные окружения

```bash
supabase secrets set KEY=value
```

### Доступ к переменным в коде

```typescript
const apiKey = Deno.env.get('API_KEY');
```

## Логирование и отладка

[TODO: Описать стратегию логирования в Edge Functions]

```typescript
console.log('Debug message');
console.error('Error message');
```

**Просмотр логов:**

```bash
supabase functions logs [function-name]
```

## Развертывание

[TODO: Описать процесс развертывания]

```bash
supabase functions deploy [function-name]
```

## Мониторинг

[TODO: Описать мониторинг функций]

- Ошибки: [TODO]
- Производительность: [TODO]
- Использование ресурсов: [TODO]
