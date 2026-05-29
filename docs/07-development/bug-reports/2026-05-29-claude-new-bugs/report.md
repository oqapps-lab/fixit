# Баг-репорт — 29 мая 2026 (new-bugs)

**Дата:** 2026-05-29  
**Метод:** Targeted grep pass — dead buttons, mock data, hardcoded stubs  
**Ветка:** main  
**Тестировал:** Claude (automated)

---

## Итог

| # | Баг | Файл:Строка | Приоритет |
|---|-----|------------|-----------|
| FX-N1 | Продакшн-экран Repairs рендерит хардкоженные фиктивные ремонты | `src/app/(tabs)/repairs.js:16` | HIGH |
| FX-N2 | Кнопка "+ Add Receipt PDF" — мёртвая (`onPress={() => { }}`) | `src/app/warranty.js:44` | MEDIUM |
| FX-N3 | Кнопка "+ New Fix" — мёртвая (`onPress={() => { }}`) | `src/app/home-overview.js:111` | MEDIUM |
| FX-N4 | Кнопка "Start Checklist" — мёртвая (`onPress={() => { }}`) | `src/app/seasonal.js:66` | MEDIUM |

---

## FX-N1: Хардкоженные ремонты в продакшн-экране

**Где:** `src/app/(tabs)/repairs.js`, строки 16–23  
**Что вижу:**

```js
const ACTIVE_REPAIRS = [
    { id: 'rp-002', code: 'RP-002', title: 'Roof Leak', severity: 'moderate', progress: 0.35, impact: '$450' },
    { id: 'rp-003', code: 'RP-003', title: 'Attic Moisture', severity: 'low', progress: 0.15, impact: '$80' },
];
const PAST_REPAIRS = [
    { id: 'rp-001', title: 'Kitchen Tap Replacement', impact: '$145' },
    { id: 'rp-000', title: 'Bathroom Tile Grout', impact: '$320' },
];
```

Экран `RepairsTab` рендерит эти массивы напрямую — у каждого пользователя отображаются одни и те же "Roof Leak" и "Attic Moisture". Данные из базы не подгружаются.

Кнопка `onPress={() => router.push('/repair/${r.id}')}` при нажатии пытается открыть `/repair/rp-002`, `/repair/rp-003` — эти маршруты скорее всего не существуют либо откроют пустой экран.

**Приоритет:** HIGH — все пользователи видят чужие фиктивные ремонты

---

## FX-N2: Мёртвая кнопка "+ Add Receipt PDF"

**Где:** `src/app/warranty.js:44`

```js
<AmberCTA label="+ Add Receipt PDF" variant="outlined" onPress={() => { }} ... />
```

Нажатие не делает ничего. Предположительно должна открывать document picker для загрузки PDF гарантийного талона.

**Приоритет:** MEDIUM

---

## FX-N3: Мёртвая кнопка "+ New Fix"

**Где:** `src/app/home-overview.js:111`

```js
<AmberCTA label="+ New Fix" variant="primary" onPress={() => { }} ... />
```

Ключевой CTA на главном экране. Нажатие не делает ничего. Предположительно должна открывать форму создания нового ремонта.

**Приоритет:** MEDIUM

---

## FX-N4: Мёртвая кнопка "Start Checklist"

**Где:** `src/app/seasonal.js:66`

```js
<AmberCTA label="Start Checklist" ... onPress={() => { }} />
```

Нажатие не делает ничего.

**Приоритет:** MEDIUM
