---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Аутентификация

## Провайдеры

### [TODO: Email/Password — основной метод]

[TODO: короткое описание. Какой сервис, какой SDK.]

**Конфигурация (пример для Supabase):**

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
});
```

**Требования к паролю:**
- Минимальная длина: [TODO: 8] символов
- [TODO: дополнительные требования — заглавная, цифра, спецсимвол]

### [TODO: OAuth провайдеры, если есть]
- [TODO: Google / Apple / GitHub — как настроены, redirect URL]

### [TODO: Magic Link / OTP, если есть]
- [TODO: ...]

## Flows

### Sign Up (Регистрация)

[TODO: сколько шагов, какие данные собираются]

```typescript
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: name,
    }
  }
});
```

**Шаги:**
1. [TODO: ...]
2. [TODO: ...]
3. [TODO: confirmation email → активация]
4. [TODO: триггер в БД создаёт запись в `users`]
5. [TODO: редирект на Main page]

### Sign In (Вход)

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});
```

### Password Reset (Восстановление пароля)

```typescript
const { data, error } = await supabase.auth.resetPasswordForEmail(
  email,
  { redirectTo: '[TODO: https://yourapp.com/auth/reset-password]' }
);
```

### Sign Out (Выход)

```typescript
const { error } = await supabase.auth.signOut();
```

## Token Management

### Access Token
**Время жизни:** [TODO: 3600 секунд (1 час)]

### Refresh Token
**Время жизни:** [TODO: 30 дней]

### Token Refresh Strategy
- [TODO: напр. `@supabase/ssr` автоматически обновляет токены через middleware]
- При истечении access token — [TODO: автоматический refresh]
- При истечении refresh token — [TODO: редирект на логин]

## Session Handling

[TODO: Как хранится сессия в конкретном фреймворке]

```typescript
// Пример middleware для Next.js + @supabase/ssr
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { /* cookie handlers */ } }
  );
  await supabase.auth.getUser();
  return response;
}
```

### Защита маршрутов

```typescript
const { data: { user } } = await supabase.auth.getUser();
if (!user) redirect('[TODO: /auth/login]');
```

## Security

- HTTPS обязателен на всех соединениях
- Cookies: `httpOnly`, `secure`, `sameSite='lax'`
- CSRF: [TODO: как защищаемся]
- Rate limiting: [TODO: где и какие лимиты]
- Confirmation email: [TODO: обязателен / опционален]

## Email Configuration

**SMTP:** [TODO: где настраивается — Supabase Dashboard / custom SMTP]

**Email Templates:**

| Template | Назначение | Переменные |
|----------|------------|------------|
| Confirmation | Подтверждение email при регистрации | `{{ .ConfirmationURL }}` |
| Recovery | Восстановление пароля | `{{ .ConfirmationURL }}` |
| [TODO: Magic Link] | [TODO: ...] | [TODO: ...] |
