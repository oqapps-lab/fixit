# Баг-репорт — 28 мая 2026 (code-review)

**Дата:** 2026-05-28  
**Метод:** code-review SKILL — 5 измерений (Security, Performance, Correctness, Maintainability, Testing)  
**Ветка:** main (коммит `e38c0e3`)  
**Тестировал:** Claude (automated code review)  
**Фокус:** onboarding flow, authentication, animations

---

## Итог

| # | Баг | Файл:Строка | Приоритет |
|---|-----|------------|-----------|
| FX1 | `expo-location` плагин удалён из `app.json`, API всё ещё вызывается — location feature сломана | `app.json` + `src/app/(onboarding)/context.js:6` | CRITICAL |
| FX2 | `withRepeat(-1)` анимация не отменяется при размонтировании | `src/app/(onboarding)/processing.js:34` | MAJOR |
| FX3 | Кнопка "TEXT" вызывает `onPickFromGallery` — copy-paste баг | `src/app/(onboarding)/capture.js:144` | MAJOR |
| FX4 | `signUpWithEmail` переходит на `/(tabs)` без проверки email confirmation | `src/app/(auth)/sign-up.js:39` | MINOR |

---

## FX1: `expo-location` плагин удалён — location feature сломана в нативном билде

**Где:** `app.json` (plugins) + `src/app/(onboarding)/context.js:6`  
**Что вижу:**

```json
// app.json — текущее состояние
"plugins": ["expo-router", "expo-font", "expo-web-browser", "expo-image"]
// expo-location отсутствует
```

```js
// context.js:6 — API всё ещё используется
import * as Location from 'expo-location';
// строки 76–88: requestForegroundPermissionsAsync, getCurrentPositionAsync, reverseGeocodeAsync
```

`expo-location` требует плагин для инжекции `NSLocationWhenInUseUsageDescription` (iOS) и `ACCESS_FINE_LOCATION` (Android) при сборке. Без плагина нативный билд запускается, но тап "Use current location" либо крашит приложение, либо всегда возвращает `denied` без диалога разрешений.

**Как должно быть:**

```json
"plugins": [
  "expo-router",
  "expo-font",
  "expo-web-browser",
  "expo-image",
  [
    "expo-location",
    {
      "locationWhenInUsePermission": "FixIt uses your location to price repairs accurately for your region."
    }
  ]
]
```

**Приоритет:** CRITICAL — функция «Определить ZIP автоматически» полностью не работает в нативном билде.

---

## FX2: `withRepeat(-1)` анимация без `cancelAnimation` cleanup

**Где:** `src/app/(onboarding)/processing.js`, строка 34  
**Что вижу:**

```js
ring.value = withRepeat(withTiming(360, { duration: 3000, easing: Easing.linear }), -1, false);

return () => {
  isMounted = false;
  clearInterval(stageTimer);
  // cancelAnimation(ring) — ОТСУТСТВУЕТ
};
```

При навигации с экрана компонент размонтируется, но `ring.value` продолжает обновляться. Утечка CPU/памяти при каждом проходе через экран обработки.

**Как должно быть:**

```js
import { cancelAnimation } from 'react-native-reanimated';
// ...
return () => {
  isMounted = false;
  clearInterval(stageTimer);
  cancelAnimation(ring);
};
```

**Приоритет:** MAJOR

---

## FX3: Кнопка "TEXT" вызывает `onPickFromGallery` — copy-paste баг

**Где:** `src/app/(onboarding)/capture.js`, строка 144  
**Что вижу:**

```jsx
// Кнопка GALLERY (строка 134) — правильно:
<Pressable onPress={onPickFromGallery} accessibilityLabel="Use saved photo">
  <Text>GALLERY</Text>
</Pressable>

// Кнопка TEXT (строка 144) — НЕПРАВИЛЬНО:
<Pressable onPress={onPickFromGallery} accessibilityLabel="Describe with text">
  <Text>TEXT</Text>
</Pressable>
```

Обе кнопки вызывают `onPickFromGallery`. `accessibilityLabel="Describe with text"` подтверждает, что кнопка TEXT должна открывать текстовый ввод. Пользователь не может описать проблему текстом — всегда открывается галерея.

**Как должно быть:**

```jsx
const onDescribeWithText = () => {
  router.push('/(onboarding)/context');
};

<Pressable onPress={onDescribeWithText} accessibilityLabel="Describe with text">
  <Text>TEXT</Text>
</Pressable>
```

**Приоритет:** MAJOR — режим текстового описания полностью недоступен.

---

## FX4: `signUpWithEmail` переходит в приложение без проверки email confirmation

**Где:** `src/app/(auth)/sign-up.js`, строка 39  
**Что вижу:**

```js
await signUpWithEmail({ email, password });
onSuccess(); // → router.replace('/(tabs)')
```

При включённом `confirm email` (дефолт для production Supabase) `supabase.auth.signUp()` создаёт пользователя без сессии. Код всё равно переходит на `/(tabs)` — protected экраны без валидного токена.

**Как должно быть:**

```js
const data = await signUpWithEmail({ email, password });
if (!data?.session) {
  setErrorMessage('Проверьте почту и перейдите по ссылке для подтверждения.');
  return;
}
onSuccess();
```

**Приоритет:** MINOR — зависит от конфигурации Supabase (на local dev `confirm email = false`), критично в production.
