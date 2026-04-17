---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Аналитические события

## Конвенция именования

### Структура названия события

**Формат:** `[категория]_[сущность]_[действие]`

**Примеры:**
- `user_signup_completed`
- `button_subscribe_clicked`
- `feature_export_started`
- `error_api_failed`

### Правила именования

1. **Тип события** (префикс):
   - `user_` — события пользователя (signup, login, logout)
   - `page_` — просмотры страниц
   - `button_` / `element_` — взаимодействие с UI элементами
   - `feature_` — использование функций
   - `transaction_` — платежи и покупки
   - `error_` — ошибки и проблемы

2. **Именование**:
   - Lowercase с подчеркиванием
   - Максимум 3 слова
   - Понятное, неязыковое, консистентное

3. **Действия** (суффиксы):
   - `_started` — начало процесса
   - `_completed` / `_finished` — завершение
   - `_clicked` — нажатие кнопки
   - `_viewed` — просмотр
   - `_failed` — ошибка
   - `_canceled` — отмена

## Таблица событий

### Обязательные события (Core Events)

| Событие | Категория | Параметры | Триггер | Экран |
|---|---|---|---|---|
| `app_launched` | User | version, build | Первый открыт приложения | All |
| `user_signup_completed` | User | method (email/google/apple) | После регистрации | Signup |
| `user_login_completed` | User | method, days_since_signup | После логина | Login |
| `user_logout` | User | — | Logout нажата | Any |
| `user_profile_updated` | User | fields_changed | После обновления профиля | Profile |
| `page_viewed` | Page | page_name, referrer | Загрузка страницы | Any |
| `error_occurred` | Error | error_code, error_message | На ошибку | Any |

### Фичи и функционал

| Событие | Категория | Параметры | Триггер | Экран |
|---|---|---|---|---|
| [TODO: feature_1_started] | Feature | [TODO: params] | [TODO: trigger] | [TODO] |
| [TODO: feature_1_completed] | Feature | [TODO: params] | [TODO: trigger] | [TODO] |
| [TODO: feature_1_failed] | Feature | [TODO: params] | [TODO: trigger] | [TODO] |
| [TODO: feature_2_used] | Feature | [TODO: params] | [TODO: trigger] | [TODO] |

### UI Взаимодействия

| Событие | Категория | Параметры | Триггер | Экран |
|---|---|---|---|---|
| [TODO: button_cta_clicked] | Button | button_name, location | Нажата кнопка | [TODO] |
| [TODO: link_clicked] | Link | link_name, url | Нажата ссылка | [TODO] |
| [TODO: modal_opened] | Modal | modal_name | Открыта модаль | [TODO] |
| [TODO: modal_closed] | Modal | modal_name, action | Закрыта модаль | [TODO] |
| [TODO: tab_switched] | Tab | tab_name, from_tab | Переключение табов | [TODO] |

### Платежи и Монетизация

| Событие | Категория | Параметры | Триггер | Экран |
|---|---|---|---|---|
| `purchase_started` | Transaction | plan, price, currency | Нажата "Купить" | Pricing |
| `purchase_completed` | Transaction | plan, price, currency, transaction_id | Успешная покупка | [TODO] |
| `purchase_failed` | Transaction | plan, price, error_code | Ошибка платежа | [TODO] |
| `subscription_canceled` | Transaction | plan, reason | Отмена подписки | Settings |
| `tokens_purchased` | Transaction | amount, price, package | Куплены токены | Store |
| `paywall_shown` | Monetization | paywall_type, plan_count | Показана paywall | [TODO] |
| `paywall_dismissed` | Monetization | paywall_type, action | Закрыта paywall | [TODO] |

### Поиск и Обнаружение

| Событие | Категория | Параметры | Триггер | Экран |
|---|---|---|---|---|
| `search_started` | Search | — | Нажата поле поиска | [TODO] |
| `search_query` | Search | query, query_length | Введен запрос поиска | [TODO] |
| `search_results_viewed` | Search | query, result_count | Получены результаты | [TODO] |
| `search_result_clicked` | Search | query, position, result_id | Клик по результату | [TODO] |

### Контент и Медиа

| Событие | Категория | Параметры | Триггер | Экран |
|---|---|---|---|---|
| [TODO: content_shared] | Content | content_id, share_method | Шеринг контента | [TODO] |
| [TODO: content_downloaded] | Content | content_id, size | Скачивание | [TODO] |
| [TODO: media_played] | Media | media_id, media_type, duration | Start медиа | [TODO] |
| [TODO: media_paused] | Media | media_id, position | Пауза медиа | [TODO] |

## Параметры и пользовательские свойства

### Стандартные параметры (для всех событий)

```
- user_id: UUID пользователя
- session_id: ID сессии
- timestamp: Unix timestamp события
- platform: ios / android / web
- app_version: Версия приложения
- locale: Язык пользователя
- screen: Имя текущего экрана
```

### Дополнительные параметры

| Параметр | Тип | Примеры | Примечание |
|---|---|---|---|
| `referrer` | String | "deep_link", "app_store", "organic" | Откуда пришел юзер |
| `error_code` | String | "500", "network_error" | Код ошибки |
| `duration` | Integer | Milliseconds | Длительность процесса |
| `plan` | String | "free", "basic", "pro" | Тип подписки |
| `currency` | String | "USD", "EUR" | Валюта платежа |

## Обязательные события (Must-Have)

[TODO: Выбрать из списка выше]

### Для всех приложений

- [x] `app_launched`
- [x] `user_signup_completed`
- [x] `user_login_completed`
- [x] `page_viewed`
- [x] `error_occurred`
- [ ] [TODO: другие]

### Для монетизованных приложений

- [x] `paywall_shown`
- [x] `purchase_started`
- [x] `purchase_completed`
- [x] `purchase_failed`
- [ ] [TODO: другие]

### Для социальных приложений

- [ ] `user_followed`
- [ ] `content_shared`
- [ ] `user_invited`
- [ ] [TODO: другие]

## Реализация и отправка

### Аналитические сервисы

| Сервис | Событие | Параметры | API Key |
|---|---|---|---|
| Firebase Analytics | [TODO: выбранные события] | [TODO] | [TODO] |
| Mixpanel | [TODO: выбранные события] | [TODO] | [TODO] |
| Amplitude | [TODO: выбранные события] | [TODO] | [TODO] |
| Custom Backend | [TODO: выбранные события] | [TODO] | [TODO] |

### Отправка событий

```javascript
// Пример: Firebase Analytics (iOS/Android)
Analytics.logEvent("purchase_completed", {
  "plan": "pro",
  "price": 9.99,
  "currency": "USD",
  "transaction_id": "txn_123456"
});

// Пример: Web
fetch('/api/analytics/event', {
  method: 'POST',
  body: JSON.stringify({
    event: 'feature_used',
    params: { feature_name: 'export' }
  })
});
```

### Тестирование событий

- [TODO: Как локально тестировать события]
- [TODO: Staging/Production разделение]
- [TODO: Real-time validation в дашборде]

## Конфиденциальность и Compliance

### GDPR / CCPA

- [TODO: Какие данные требуют согласия]
- [TODO: Как обрабатывается opt-out]
- [TODO: Data retention policy]

### Чувствительные данные

- [TODO: Не логируем ли пароли, токены, платежные данные?]
- [TODO: Как обезличиваем ПИ?]

## Ссылки и источники
- [TODO: Ссылка на Firebase Console]
- [TODO: Ссылка на Mixpanel/Amplitude Account]
- [TODO: Ссылка на события в документе]
