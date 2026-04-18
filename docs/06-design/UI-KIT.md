---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# UI-компоненты

## Кнопки

### Варианты кнопок

| Вариант | Описание | Использование |
|---|---|---|
| **Primary** | [TODO: Основная кнопка] | Основное действие (Submit, Continue) |
| **Secondary** | [TODO: Вторичная кнопка] | Альтернативное действие |
| **Tertiary** | [TODO: Третичная кнопка] | Низкоприоритетное действие |
| **Danger** | [TODO: Опасная кнопка] | Деструктивные действия (Delete) |
| **Ghost** | [TODO: Прозрачная кнопка] | Минимальное уважение иерархии |

### Размеры
- **Small**: `[TODO: размер]` - для компактных элементов
- **Medium**: `[TODO: размер]` - стандартный размер
- **Large**: `[TODO: размер]` - для ключевых действий

### Состояния

| Состояние | Описание |
|---|---|
| **Default** | [TODO: Описание стиля] |
| **Hover** | [TODO: Описание стиля] |
| **Active** | [TODO: Описание стиля] |
| **Disabled** | [TODO: Описание стиля] |
| **Loading** | [TODO: Описание стиля] |

## Инпуты

### Типы инпутов

| Тип | Описание | Варианты |
|---|---|---|
| **Text Input** | Текстовое поле | Single-line, Multi-line |
| **Email Input** | Поле для email | [TODO] |
| **Password Input** | Скрытое поле | Show/Hide toggle |
| **Number Input** | Числовое поле | С шагом/без |
| **Select/Dropdown** | Выпадающий список | Single, Multi |
| **Checkbox** | Переключатель | [TODO] |
| **Radio Button** | Радиокнопка | [TODO] |
| **Toggle** | Переключатель вкл/выкл | [TODO] |
| **Date Picker** | Выбор даты | Calendar, Input |
| **Search** | Поиск с автодополнением | [TODO] |

### Состояния инпутов

| Состояние | Описание |
|---|---|
| **Empty** | [TODO: Описание] |
| **Filled** | [TODO: Описание] |
| **Focused** | [TODO: Описание] |
| **Disabled** | [TODO: Описание] |
| **Error** | [TODO: Описание с сообщением об ошибке] |
| **Success** | [TODO: Описание] |

### Валидация и хелперы

- [TODO: Правила валидации]
- [TODO: Сообщения об ошибках]
- [TODO: Вспомогательный текст]
- [TODO: Иконки статуса]

## Карточки

### Типы карточек

| Тип | Описание | Структура |
|---|---|---|
| **Simple Card** | Базовая карточка | Title, Description, [Action] |
| **Image Card** | С изображением | Image, Title, Description |
| **Product Card** | Товар/услуга | Image, Title, Price, Rating, Action |
| **Profile Card** | Профиль/контакт | Avatar, Name, Description, CTA |
| **Stat Card** | Статистика | Value, Label, Trend |

### Размеры

- **Small**: `[TODO: размер]`
- **Medium**: `[TODO: размер]`
- **Large**: `[TODO: размер]`

### Состояния

| Состояние | Описание |
|---|---|
| **Default** | [TODO] |
| **Hover** | [TODO] |
| **Active/Selected** | [TODO] |
| **Disabled** | [TODO] |
| **Loading** | [TODO] |

## Модалки

### Типы модалок

| Тип | Описание | Использование |
|---|---|---|
| **Alert** | Модальное окно с информацией | Подтверждение, предупреждение |
| **Dialog** | Форма или контент | Ввод данных, редактирование |
| **Bottom Sheet** | Нижний лист | Mobile, быстрые действия |
| **Popover** | Всплывающая подсказка | Контекстная информация |

### Структура модалки
- Header: Title, [Close button]
- Body: Content
- Footer: [Actions - Primary/Secondary buttons]

### Поведение

- [TODO: Anимация появления]
- [TODO: Закрытие: крестик, click outside, ESC]
- [TODO: Scrollable content]
- [TODO: Fixed vs Absolute positioning]

## Навигация

### Типы навигационных компонентов

| Тип | Описание |
|---|---|
| **Top Navigation Bar** | Навигация в шапке |
| **Bottom Navigation** | Нижняя навигация (mobile) |
| **Sidebar** | Боковая панель |
| **Tabs** | Вкладки |
| **Breadcrumbs** | Хлебные крошки |
| **Pagination** | Постраничная навигация |
| **Stepper** | Пошаговая навигация |

### Состояния навигационных элементов

| Состояние | Описание |
|---|---|
| **Default** | [TODO] |
| **Active** | [TODO] |
| **Hover** | [TODO] |
| **Disabled** | [TODO] |

## Списки

### Типы списков

| Тип | Описание | Примеры использования |
|---|---|---|
| **Simple List** | Простой список | Меню, перечень элементов |
| **List with Icons** | Список с иконками | История, действия |
| **List with Avatars** | Список с аватарами | Контакты, пользователи |
| **Grouped List** | Сгруппированный список | Категории, фильтры |
| **Expandable List** | Раскрываемый список | Аккордион, древовидная структура |

### Элементы списка

```
[Icon] Label [Badge] [Chevron]
      Subtitle/Description
```

### Состояния элементов списка

| Состояние | Описание |
|---|---|
| **Default** | [TODO] |
| **Hover** | [TODO] |
| **Selected** | [TODO] |
| **Disabled** | [TODO] |
| **Empty State** | [TODO] |

## Ссылки и источники
- [TODO: Ссылка на Figma компоненты]
- [TODO: Ссылка на реализацию в коде]
