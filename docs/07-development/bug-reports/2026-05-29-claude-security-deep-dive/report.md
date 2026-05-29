# Баг-репорт — 29 мая 2026 (security-deep-dive)

**Дата:** 2026-05-29  
**Метод:** Security audit — code-security-auditor + security-auditor + threat-model SKILLs  
**Ветка:** main  
**Тестировал:** Claude (automated security audit)  
**Фокус:** Edge functions auth, storage policies, paywall bypass, token storage

---

## Итог

| # | Баг | Файл:Строка | Приоритет |
|---|-----|------------|-----------|
| FX-S1 | `analyze-issue` edge function: нет проверки авторизации — анонимный вызов триггерит платный AI и читает любой файл из storage | `supabase/functions/analyze-issue/index.js:288` | CRITICAL |
| FX-S2 | Storage INSERT policy: `anon` может загружать файлы под любым путём без UID-привязки | `supabase/migrations/20260426004000_add_project_photos_storage_policy.sql` | CRITICAL |
| FX-S3 | Paywall-счётчик в AsyncStorage — trivially bypassed, нет серверного enforcement | `src/lib/subscription/placeholder.js` | HIGH |
| FX-S4 | JWT хранится в plaintext AsyncStorage (implicit default adapter) | `src/lib/supabase/client.js` | HIGH |
| FX-S5 | `guestSessionId` берётся из тела запроса клиента без валидации | `supabase/functions/analyze-issue/index.js:382` | LOW |

---

## FX-S1: `analyze-issue` без проверки авторизации — CRITICAL

**Где:** `supabase/functions/analyze-issue/index.js`, строки 288–410  
**Что вижу:**

```js
const requestUserId = await resolveAuthenticatedUserId(supabase, req);
// resolveAuthenticatedUserId возвращает null при отсутствии JWT
// --- нет проверки на null ---
const signedUrl = await adminClient.storage  // admin client обходит bucket RLS
  .from('project-photos')
  .createSignedUrl(payload.storagePath, 120);
// ...
await adminClient.from('estimates').insert({ user_id: requestUserId, ... });
// user_id: null — допустимо, т.к. колонка nullable
```

Функция вызывает `resolveAuthenticatedUserId()`, но **никогда не проверяет, что результат не null**. Если JWT отсутствует — выполнение продолжается с `requestUserId = null`.

**Что может сделать анонимный атакующий:**
1. Вызвать платный Anthropic API вызов за счёт владельца
2. Получить signed URL на **любой файл** в bucket `project-photos` через admin client (обходит RLS)
3. Записать строку в таблицу `estimates` с `user_id = null`

**Как должно быть:**

```js
const requestUserId = await resolveAuthenticatedUserId(supabase, req);
if (!requestUserId) {
  return json({ error: 'Unauthorized' }, 401);
}
```

**Приоритет:** CRITICAL

---

## FX-S2: Storage INSERT policy позволяет anon загружать файлы под чужим UID — CRITICAL

**Где:** `supabase/migrations/20260426004000_add_project_photos_storage_policy.sql`  
**Что вижу:**

```sql
create policy "project_photos_insert"
  on storage.objects for insert
  to anon, authenticated
  with check (
    bucket_id = 'project-photos'
    and name like 'uploads/%'
  );
```

Политика:
- Разрешает роли `anon` (без авторизации) загружать файлы
- Не привязывает путь к UID пользователя — `authenticated`-пользователь может загрузить в `uploads/<other-user-uuid>/file.jpg`, перезаписав путь другого пользователя

В сочетании с FX-S1: атакующий загружает файл под чужим UUID, затем передаёт этот `storagePath` в `analyze-issue` (которая не проверяет auth).

**Как должно быть:**

```sql
create policy "project_photos_insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'project-photos'
    and name like 'uploads/' || (select auth.uid()::text) || '/%'
  );
```

Убрать `anon` из policy. Привязать путь к `auth.uid()`.

**Приоритет:** CRITICAL

---

## FX-S3: Paywall-счётчик в AsyncStorage — обходится за 2 секунды

**Где:** `src/lib/subscription/placeholder.js`, `src/app/your-house.js:42`  
**Что вижу:**

```js
const count = await AsyncStorage.getItem('fixit.subscription.estimate_count');
if (count >= 3) {
  // показать paywall
}
```

Счётчик бесплатных оценок хранится в plaintext AsyncStorage. На рутованном устройстве или через dev tools:
```js
AsyncStorage.setItem('fixit.subscription.estimate_count', '0')
```
— paywall обойдён навсегда. Нет серверного ограничения: edge function `analyze-issue` не проверяет квоту.

**Как должно быть:**

Добавить в `analyze-issue` серверную проверку лимита через `service_role`:
```js
const { count } = await adminClient
  .from('estimates')
  .select('*', { count: 'exact', head: true })
  .eq('user_id', requestUserId);
if (count >= 3 && !userProfile.is_premium) {
  return json({ error: 'free_limit_reached' }, 402);
}
```

**Приоритет:** HIGH

---

## FX-S4: JWT в plaintext AsyncStorage

**Где:** `src/lib/supabase/client.js`  
**Что вижу:**

```js
createClient(env.supabase.url, env.supabase.publishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    // storage не указан → supabase-js использует AsyncStorage по умолчанию
  }
})
```

Без явного `storage` supabase-js в React Native окружении использует `@react-native-async-storage/async-storage` — plaintext хранилище.

Дополнительно: поле называется `publishableKey` вместо стандартного `anonKey`. Необходимо убедиться, что там действительно anon-ключ, а не service role key.

**Как должно быть:**

```js
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};

createClient(env.supabase.url, env.supabase.anonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    persistSession: true,
    autoRefreshToken: true,
  }
})
```

**Приоритет:** HIGH

---

## FX-S5: `guestSessionId` из тела запроса без валидации

**Где:** `supabase/functions/analyze-issue/index.js`, строка 382  
**Что вижу:**

```js
guest_session_id: isNonEmptyString(payload.guestSessionId) ? payload.guestSessionId : null,
```

`guest_session_id` в таблице `estimates` устанавливается напрямую из клиентского запроса. Гость может установить `guestSessionId` равным session ID другого гостя и записывать строки под его сессией.

**Как должно быть:** Генерировать `guest_session_id` на сервере или валидировать формат (UUID regex) перед сохранением.

**Приоритет:** LOW
