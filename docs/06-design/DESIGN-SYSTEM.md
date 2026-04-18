---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Дизайн-система

## Цветовая палитра

### Primary (основные)
- **Background**: `[TODO: #HEX]` — основной фон
- **Surface / Cards**: `[TODO: #HEX]` — фон карточек и секций
- **Accent**: `[TODO: #HEX]` — акцентный цвет, CTA, ссылки

### Secondary (вторичные)
- **Text Primary**: `[TODO: #HEX]`
- **Text Secondary**: `[TODO: #HEX]`
- **Border / Divider**: `[TODO: #HEX]`

### Neutral (нейтральные)
- **White**: `#FFFFFF`
- **Gray-100 / 200 / 400**: `[TODO: ...]`
- **Black**: `#000000`

### Semantic
- **Success**: `[TODO: #HEX]`
- **Warning**: `[TODO: #HEX]`
- **Error**: `[TODO: #HEX]`
- **Info**: `[TODO: #HEX]`

## Типографика

### Шрифты

| Использование | Шрифт | Начертание |
|---|---|---|
| Заголовки | [TODO: напр. Inter / Manrope] | Bold (700) |
| Подзаголовки | [TODO: ...] | SemiBold (600) |
| Основной текст | [TODO: ...] | Regular (400) |

### Размеры шрифтов и высота строки

| Размер | px | Line height | Использование |
|--------|----|--------------|---------------|
| H1 | [TODO: 36] | [TODO: 1.2] | Заголовки страниц |
| H2 | [TODO: 24] | [TODO: 1.3] | Подзаголовки секций |
| H3 | [TODO: 18] | [TODO: 1.3] | Заголовки карточек |
| Body Large | [TODO: 16] | 1.5 | Основной текст |
| Body Regular | [TODO: 14] | 1.5 | Описания |
| Body Small | [TODO: 12] | 1.4 | Подписи, мета |
| Caption | [TODO: 10] | 1.4 | Метки, бейджи |

## Отступы и сетка

### Основная сетка
- **Базовый шаг:** [TODO: 4px / 8px]
- **Ширина контейнера:** [TODO: desktop / tablet / mobile]
- **Margin контейнера:** [TODO: mobile 16 / tablet 24 / desktop 32]

### Шкала отступов (Spacing Scale)
```
xs:  [TODO: 4px]
sm:  [TODO: 8px]
md:  [TODO: 16px]
lg:  [TODO: 24px]
xl:  [TODO: 36px]
2xl: [TODO: 52px]
3xl: [TODO: 64px]
```

## Скругления (Border Radius)

```
sm:   [TODO: 8px]   — мелкие элементы
md:   [TODO: 16px]  — карточки, кнопки, инпуты
lg:   [TODO: 32px]  — крупные кнопки
full: 9999px — аватары, круглые иконки
```

## Иконки

- **Набор:** [TODO: напр. Lucide / Huge Icons / Material Symbols]
- **Стили:** [TODO: Outline / Solid / Duotone]
- **Размеры:** [TODO: 16px, 24px, 32px]

## Анимации

### Длительность
- **Fast:** 150ms — hover, микровзаимодействия
- **Normal:** 300ms — переходы между состояниями
- **Slow:** 500ms — модалки, переходы страниц

### Easing
- **Ease In Out:** `cubic-bezier(0.4, 0, 0.2, 1)` — основной
- **Ease Out:** `cubic-bezier(0, 0, 0.2, 1)` — появление
- **Ease In:** `cubic-bezier(0.4, 0, 1, 1)` — уход

## Адаптивные брейкпоинты

| Брейкпоинт | Ширина | Описание |
|------------|--------|----------|
| Mobile | [TODO: 375px] | [TODO: ...] |
| Tablet | [TODO: 768px] | [TODO: ...] |
| Desktop | [TODO: 1440px] | [TODO: ...] |

## Ссылки

- Figma: [TODO: ссылка на файл макетов]
- Tokens (если есть Design Tokens / Tailwind config): [TODO: путь]
