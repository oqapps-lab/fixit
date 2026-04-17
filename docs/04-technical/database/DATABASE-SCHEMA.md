---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Схема базы данных

## ER-диаграмма

```mermaid
erDiagram
    %% TODO: Замени пример ниже на связи в твоей БД.
    %% Синтаксис Mermaid ER: https://mermaid.js.org/syntax/entityRelationshipDiagram.html

    users ||--o{ [TODO: related_table] : "описание связи"

    users {
        uuid id PK
        string email
        string full_name
        string role
        timestamp created_at
    }

    %% TODO: добавь остальные таблицы по шаблону
```

## Список таблиц

| Таблица | Назначение | Связанные таблицы |
|---------|------------|-------------------|
| users | [TODO: Профили пользователей] | [TODO: ...] |
| [TODO: ...] | [TODO: ...] | [TODO: ...] |

---

## Таблицы

### users

**Назначение:** [TODO: напр. расширенный профиль пользователя (дополняет auth.users)]

**Колонки:**

| Колонка | Тип | Обязательна | Описание |
|---------|-----|-------------|----------|
| id | uuid | Да | PK [TODO: если Supabase — совпадает с auth.users.id] |
| email | text | Да | [TODO: ...] |
| full_name | text | Нет | [TODO: ...] |
| role | [TODO: user_role enum] | Да | [TODO: student / admin / ...] |
| created_at | timestamptz | Да | Дата создания |
| updated_at | timestamptz | Да | Дата обновления |

**Индексы:**

```sql
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
```

**Связи:**
- [TODO: `id` → `auth.users.id` (один-к-одному)]

---

### [TODO: Таблица 2]

**Назначение:** [TODO: ...]

**Колонки:**

| Колонка | Тип | Обязательна | Описание |
|---------|-----|-------------|----------|
| id | uuid | Да | PK |
| [TODO: ...] | [TODO: ...] | [TODO: Да/Нет] | [TODO: ...] |
| created_at | timestamptz | Да | Дата создания |

**Индексы:**

```sql
[TODO: CREATE INDEX ...]
```

---

## Enums

```sql
-- TODO: перечисли все кастомные enum-типы
CREATE TYPE user_role AS ENUM ('[TODO: значение1]', '[TODO: значение2]');
-- [TODO: ...]
```

## Общие паттерны

### Timestamps

Все таблицы используют `created_at` с дефолтным значением `now()`. Таблицы с изменяемыми данными имеют `updated_at` с триггером:

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON [TODO: table_name]
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### UUID as Primary Key

Все таблицы используют UUID v4 в качестве первичного ключа:

```sql
CREATE TABLE example (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY
);
```

### Soft Delete

[TODO: используется или нет. Если да — опиши конвенцию (`deleted_at` / `is_deleted`). Если нет — явно зафиксируй "hard delete с каскадом через FK".]

## Ссылки

- Миграции: [MIGRATIONS.md](MIGRATIONS.md)
- RLS-политики: [RLS-POLICIES.md](RLS-POLICIES.md)
