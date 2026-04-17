---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Навигационная структура

## Тип навигации

### Выбранный паттерн
**[TODO: Выбрать одна или комбинировать]**

| Тип | Описание | Использование в проекте |
|---|---|---|
| **Tabs** | Вкладки для переключения контента на одном уровне | [TODO] |
| **Drawer/Sidebar** | Боковое меню | [TODO] |
| **Stack Navigation** | Иерархическая навигация (push/pop) | [TODO] |
| **Bottom Navigation** | Нижние вкладки (mobile) | [TODO] |
| **Hamburger Menu** | Скрытое меню (мобильное) | [TODO] |

### Навигационные компоненты

- **Top Bar**: [TODO: Описание]
- **Tabs**: [TODO: Описание]
- **Bottom Navigation**: [TODO: Описание]
- **Breadcrumbs**: [TODO: Описание]

## Карта переходов (User Flow)

```
[TODO: ASCII диаграмма или описание основных потоков]

Основные потоки:
1. Onboarding → Home → Main Feature → [Sub-flows]
2. Authentication → Dashboard → Settings
3. Search → Results → Detail → Action

```

### Уровни навигации

**Level 1 (Main):**
- [TODO: Home/Dashboard]
- [TODO: Explore/Discover]
- [TODO: Profile/Account]
- [TODO: Settings]

**Level 2 (Secondary):**
- [TODO: Под-меню для каждого уровня 1]

**Level 3 (Tertiary):**
- [TODO: Детальные страницы, параметры]

## Переходы между экранами

### Главные экраны

| Экран | Путь | Родитель | Возможные переходы |
|---|---|---|---|
| [TODO: Имя экрана] | [TODO: URL/Route] | [TODO] | [TODO: Список возможных переходов] |
| [TODO: Имя экрана] | [TODO: URL/Route] | [TODO] | [TODO: Список возможных переходов] |
| [TODO: Имя экрана] | [TODO: URL/Route] | [TODO] | [TODO: Список возможных переходов] |

### Модальные переходы (Modal Flows)

| Модаль | Триггер | Родитель | Действие закрытия |
|---|---|---|---|
| [TODO: Имя модали] | [TODO: Событие, кнопка] | [TODO: На каком экране] | [TODO: Возврат, сохранение] |
| [TODO: Имя модали] | [TODO: Событие, кнопка] | [TODO: На каком экране] | [TODO: Возврат, сохранение] |

## Deep Links (Глубокие ссылки)

### Конвенция Deep Links

**Формат:** `app://[domain]/[path]?[params]`

или

**Формат:** `https://[domain]/[path]?[params]`

### Примеры Deep Links

| Название | Deep Link | Экран | Параметры |
|---|---|---|---|
| [TODO: Home] | `app://home` | Home | - |
| [TODO: Профиль пользователя] | `app://user/:userId` | Profile | `userId=123` |
| [TODO: Товар] | `app://product/:productId` | Product Detail | `productId=abc` |
| [TODO: Поиск] | `app://search` | Search Results | `query=keyword` |
| [TODO: Настройки] | `app://settings/:section` | Settings | `section=account` |

### Обработка Deep Links

```
[TODO: Описание логики обработки]

- Проверка авторизации
- Загрузка необходимых данных
- Отображение экрана
- Обработка ошибок (экран не найден, нет доступа)
```

## Навигация для разных состояний

### Неавторизованный пользователь
```
[TODO: Возможные экраны и переходы]
- Login/SignUp
- Home
- Public Pages
```

### Авторизованный пользователь
```
[TODO: Возможные экраны и переходы]
- Dashboard
- Main Features
- Profile
- Settings
```

### Специальные состояния
- [TODO: Offline navigation]
- [TODO: Loading states]
- [TODO: Error states]

## Обратная навигация (Back Navigation)

### Правила back-навигации
- [TODO: Описать логику Back button]
- [TODO: Стек навигации]
- [TODO: Обработка глубоких ссылок при возврате]

### Недопустимые переходы при back
```
[TODO: Ситуации, когда back кнопка должна скрываться или быть неактивной]
```

## Ссылки и источники
- [TODO: Ссылка на Figma Wireframes]
- [TODO: Ссылка на реализацию навигации в коде]
- [TODO: Ссылка на документацию роутинга]
