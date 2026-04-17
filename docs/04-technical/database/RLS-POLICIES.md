---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Row Level Security — Политики доступа

## Общий подход

[TODO: 2-3 предложения — общая стратегия. Пример: "RLS включён на всех таблицах. Каждый пользователь видит только свои данные. Публичные данные доступны всем аутентифицированным."]

**Принципы:**
- RLS включён на КАЖДОЙ таблице без исключений
- Deny by default — если нет политики, доступ закрыт
- [TODO: доменные правила, например "кураторы видят данные своих студентов"]
- Admin операции — только через `service_role` key на бэкенде

## Роли

### `anon`
[TODO: какой доступ есть у неаутентифицированного пользователя — обычно никакого]

### `authenticated`
Основная роль. Доступ определяется политиками ниже.

### `service_role`
Серверные операции (Edge Functions, триггеры). Полный доступ. НИКОГДА не используется на клиенте.

## Таблица политик

| Таблица | Операция | Политика | Описание |
|---------|----------|----------|----------|
| users | SELECT | own_profile | Пользователь видит только свой профиль |
| users | UPDATE | own_profile | Пользователь редактирует только свой профиль |
| [TODO: table] | [TODO: SELECT/INSERT/UPDATE/DELETE] | [TODO: policy_name] | [TODO: описание] |

## SQL политики

### users

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

### [TODO: Таблица 2]

```sql
ALTER TABLE [TODO: table] ENABLE ROW LEVEL SECURITY;

CREATE POLICY "[TODO: название политики]"
  ON [TODO: table] FOR [TODO: SELECT/...]
  USING ([TODO: условие]);
```

### [TODO: Таблица 3 — с JOIN через EXISTS]

```sql
-- Пример: доступ к ресурсу через существование связанной записи
ALTER TABLE [TODO: table] ENABLE ROW LEVEL SECURITY;

CREATE POLICY "[TODO: ...]"
  ON [TODO: table] FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM [TODO: другая_таблица]
      WHERE [TODO: условие связи]
      AND [TODO: дополнительное условие]
    )
  );
```

## Тестирование политик

```sql
-- Проверка всех политик для таблицы
SELECT * FROM pg_policies WHERE tablename = '[TODO: table]';

-- Тест от имени конкретного пользователя
SET request.jwt.claim.sub = '[TODO: user-uuid]';
SELECT * FROM [TODO: table];
```

## Ссылки

- Схема БД: [DATABASE-SCHEMA.md](DATABASE-SCHEMA.md)
- Миграции: [MIGRATIONS.md](MIGRATIONS.md)
