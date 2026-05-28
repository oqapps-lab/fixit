# Баг-репорт — 28 мая 2026 (back-nav-audit)

**Дата:** 2026-05-28  
**Метод:** ui-qa playbook `back-navigation-traps.md` — grep + статический анализ  
**Ветка:** main  
**Тестировал:** Claude (automated audit)

---

## Итог

| # | Баг | Файл:Строка | Приоритет |
|---|-----|------------|-----------|
| BN5 | `router.back()` без `canGoBack()` на onboarding capture | `src/app/(onboarding)/capture.js:112` | MAJOR |

---

## BN5: `router.back()` без guard на onboarding capture

**Где:** `src/app/(onboarding)/capture.js`, строка 112  
**Что вижу:**

```js
<Pressable onPress={() => router.back()} hitSlop={12}>
  <ChevronLeftGlyph />
</Pressable>
```

`capture.js` — onboarding экран захвата фото. При нормальном flow стек есть (Welcome → location → capture). Но если пользователь попадает на экран через deep-link или push-уведомление напрямую на `/capture`, стек пуст и `router.back()` — silent no-op.

**Как должно быть:**

```js
onPress={() => {
  if (router.canGoBack()) router.back();
  else router.replace('/(tabs)');
}}
```

**Приоритет:** MAJOR — пользователь не может выйти с onboarding при deep-link входе.
