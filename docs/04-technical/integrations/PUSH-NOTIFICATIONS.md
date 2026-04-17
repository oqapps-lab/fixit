---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Push-уведомления

## Провайдер

[TODO: Описание провайдера push-уведомлений]

**Провайдер:** [TODO: Firebase Cloud Messaging / OneSignal / etc]

**Документация:** [TODO: Ссылка на docs]

### Конфигурация

**API Ключ:** [TODO: Где хранится]

**Сертификаты:**
- iOS: [TODO: Путь к сертификату]
- Android: [TODO: Путь к ключу]

**Инициализация:**

```typescript
// [TODO: Пример инициализации провайдера]
```

## Типы уведомлений

[TODO: Описание типов уведомлений, отправляемых в приложении]

| Тип | Триггер | Приоритет | Время жизни |
|-----|--------|----------|-----------|
| [TODO] | [TODO] | [TODO] | [TODO] |

### Пример типов

- **Уведомление 1:** [TODO: Описание]
  - Заголовок: [TODO]
  - Тело: [TODO]
  - Иконка: [TODO]
  - Действия: [TODO]

- **Уведомление 2:** [TODO: Описание]
  - Заголовок: [TODO]
  - Тело: [TODO]
  - Иконка: [TODO]
  - Действия: [TODO]

## Шаблоны

[TODO: Описание хранения и управления шаблонами уведомлений]

**Хранилище:** [TODO: БД таблица / JSON файлы / etc]

### Шаблон уведомления

**ID:** [TODO]

**Название:** [TODO]

**Заголовок (title):**

```
[TODO: Шаблон с переменными, например {{user_name}}, {{action}}]
```

**Тело (body):**

```
[TODO: Шаблон с переменными]
```

**Данные (data payload):**

```json
{
  "action": "[TODO: действие при клике]",
  "deeplink": "[TODO: ссылка в приложение]",
  "metadata": {
    "id": "[TODO]",
    "type": "[TODO]"
  }
}
```

### Пример шаблона в коде

```typescript
interface NotificationTemplate {
  id: string;
  title: string;
  body: string;
  data: Record<string, string>;
  channels?: {
    ios?: { sound: string };
    android?: { color: string };
  };
}

const templates: NotificationTemplate[] = [
  {
    id: 'welcome',
    title: 'Добро пожаловать, {{user_name}}!',
    body: 'Начните использовать приложение',
    data: {
      action: 'open_home'
    }
  }
];
```

## Триггеры отправки

[TODO: Описание событий, которые запускают отправку уведомлений]

| Событие | Таблица БД | Условие | Шаблон |
|---------|-----------|--------|--------|
| [TODO] | [TODO] | [TODO] | [TODO] |

### Реализация триггера

```typescript
// Пример: отправить уведомление при новом сообщении
const sendNotificationOnNewMessage = async (messageId: string) => {
  const message = await supabase
    .from('messages')
    .select('*')
    .eq('id', messageId)
    .single();

  const recipient = await supabase
    .from('users')
    .select('fcm_token')
    .eq('id', message.recipient_id)
    .single();

  if (recipient.fcm_token) {
    await sendPushNotification({
      tokens: [recipient.fcm_token],
      templateId: 'new_message',
      variables: {
        sender_name: message.sender_name,
        preview: message.content.substring(0, 50)
      }
    });
  }
};
```

### Webhook для отправки

```typescript
// Edge Function для отправки notifications
export async function handleNotificationTrigger(event: any) {
  const { record, eventType } = event;

  switch (eventType) {
    case 'INSERT':
      await sendNotificationForNewRecord(record);
      break;
    case 'UPDATE':
      await sendNotificationForUpdate(record);
      break;
  }
}
```

## Управление подписками

[TODO: Описание управления FCM токенами и подписками]

### Сохранение FCM токена

```typescript
// На клиенте (мобильное приложение)
const token = await messaging.getToken();

// Отправить на сервер
await supabase
  .from('user_devices')
  .upsert({
    user_id: userId,
    fcm_token: token,
    platform: 'ios', // или 'android'
    device_name: deviceName
  });
```

### Отписка от уведомлений

```typescript
await supabase
  .from('user_notification_preferences')
  .update({ enabled: false })
  .eq('user_id', userId)
  .eq('notification_type', 'marketing');
```

## Analytics и отслеживание

[TODO: Описание сбора статистики по уведомлениям]

**Метрики:**
- [TODO: Отправлено]
- [TODO: Доставлено]
- [TODO: Открыто]
- [TODO: Клики]

### Логирование событий

```typescript
async function logNotificationEvent(
  notificationId: string,
  event: 'sent' | 'delivered' | 'opened' | 'clicked',
  data?: Record<string, any>
) {
  await supabase
    .from('notification_events')
    .insert({
      notification_id: notificationId,
      event_type: event,
      timestamp: new Date(),
      ...data
    });
}
```

## Troubleshooting

[TODO: Описать решение типичных проблем]

| Проблема | Причина | Решение |
|----------|--------|--------|
| [TODO] | [TODO] | [TODO] |

**Типичные проблемы:**
- [TODO: Токен истек]
- [TODO: Лимиты провайдера]
- [TODO: Неверный формат payload]
- [TODO: Отключены уведомления на устройстве]
