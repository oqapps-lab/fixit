---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# API Эндпоинты

## Общие правила

### Authentication Headers

[TODO: Описание требуемых заголовков аутентификации]

```
Authorization: Bearer [JWT_TOKEN]
```

### Error Format

[TODO: Описание стандартного формата ошибок]

```json
{
  "error": "error_code",
  "message": "Human-readable message",
  "details": {}
}
```

### Status Codes

[TODO: Описать используемые HTTP статусы]

| Код | Значение |
|-----|----------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## Таблица эндпоинтов

| Метод | Путь | Описание | Auth | Rate Limit |
|-------|------|---------|------|-----------|
| [TODO] | [TODO] | [TODO] | [TODO] | [TODO] |

## Шаблон описания эндпоинта

### [МЕТОД] [ПУТЬ]

**Описание:** [TODO: Подробное описание]

**Аутентификация:** [TODO: Требуется ли, какие роли]

**Rate Limit:** [TODO: Лимиты на запросы]

#### Request

**Параметры пути:**

```
[TODO: :param - тип, описание]
```

**Query параметры:**

```json
{
  "param_name": "[TODO: тип, обязательность, описание]"
}
```

**Body (для POST/PUT):**

```json
{
  "field_name": "[TODO: тип, описание]"
}
```

#### Response

**Успешный ответ (200/201):**

```json
{
  "id": "uuid",
  "field_name": "[TODO: тип]",
  "created_at": "ISO 8601"
}
```

**Примеры ошибок:**

```json
{
  "error": "invalid_request",
  "message": "[TODO: Описание ошибки]"
}
```

#### Примеры

**Request:**

```bash
curl -X [METHOD] "https://api.example.com[PATH]" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Response:**

```json
[TODO: Пример ответа]
```

#### Примечания

- [TODO: Дополнительная информация]

## WebSocket endpoints

[TODO: Если используются WebSocket, описать их здесь]

## Versioning

[TODO: Описать стратегию версионирования API]

## Deprecated endpoints

[TODO: Перечислить устаревшие эндпоинты и их замены]

| Старый путь | Новый путь | Дата удаления |
|-------------|-----------|--------------|
| [TODO] | [TODO] | [TODO] |
