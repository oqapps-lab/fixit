---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Файловое хранилище

## Бакеты

| Бакет | Назначение | Публичный | Max Size | Retention |
|-------|-----------|-----------|----------|-----------|
| [TODO: avatars] | [TODO: Аватары пользователей] | Да | [TODO: 5MB] | [TODO: Бессрочно / N дней] |
| [TODO: ...] | [TODO: ...] | Нет | [TODO: 100MB] | [TODO: ...] |

### Создание бакетов

```typescript
// Пример: публичный бакет
await supabase.storage.createBucket('[TODO: bucket_name]', {
  public: true,
  fileSizeLimit: [TODO: 5] * 1024 * 1024,
  allowedMimeTypes: ['[TODO: image/jpeg]', '[TODO: image/png]']
});

// Пример: приватный бакет
await supabase.storage.createBucket('[TODO: bucket_name]', {
  public: false,
  fileSizeLimit: [TODO: 100] * 1024 * 1024
});
```

## Политики доступа

### [TODO: Публичный бакет — например, avatars]

```sql
-- Все могут читать
CREATE POLICY "Public [TODO: bucket] access"
  ON storage.objects FOR SELECT
  USING (bucket_id = '[TODO: bucket_name]');

-- Пользователь загружает/обновляет только в свою папку
CREATE POLICY "Users can upload own [TODO: ...]"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = '[TODO: bucket_name]'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
```

### [TODO: Приватный бакет]

```sql
-- Доступ только если выполняется бизнес-условие (оплата / право доступа)
CREATE POLICY "[TODO: ...] access"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = '[TODO: bucket]'
    AND EXISTS (
      SELECT 1 FROM [TODO: related_table]
      WHERE [TODO: условие доступа]
    )
  );
```

## Примеры использования

### Загрузка файла

```typescript
const { data, error } = await supabase.storage
  .from('[TODO: bucket]')
  .upload(`${userId}/[TODO: filename]`, file, {
    cacheControl: '3600',
    upsert: true
  });
```

### Скачивание приватного файла (signed URL)

```typescript
const { data, error } = await supabase.storage
  .from('[TODO: bucket]')
  .createSignedUrl('[TODO: path/to/file]', 3600); // 1 час
```

### Публичный URL

```typescript
const { data } = supabase.storage
  .from('[TODO: bucket]')
  .getPublicUrl('[TODO: path/to/file]');
```

## Лимиты

| Параметр | Лимит |
|----------|-------|
| Максимальный размер [TODO: аватара] | [TODO: 5MB] |
| Максимальный размер [TODO: ...] | [TODO: ...] |
| Допустимые форматы [TODO: ...] | [TODO: JPEG, PNG, WebP] |

## Структура папок

```
[TODO: структура внутри бакетов]
avatars/
└── {user_id}/
    └── avatar.jpg

[TODO: bucket_2]/
└── [TODO: ...]
```

## Ссылки

- [Supabase Storage docs](https://supabase.com/docs/guides/storage)
