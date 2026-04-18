---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Публикация в сторы

## App Store (iOS) Чеклист

### Подготовка бинарника

- [ ] [TODO: App версия обновлена в Xcode]
- [ ] [TODO: Build number incremented]
- [ ] [TODO: Signing certificate актуален]
- [ ] [TODO: Provisioning profile актуален]
- [ ] [TODO: Все ошибки и warnings исправлены]
- [ ] [TODO: Compiled successfully на релиз конфигурации]

### App Store Connect Preparation

- [ ] [TODO: Bundle ID корректен]
- [ ] [TODO: Privacy Policy установлена]
- [ ] [TODO: IDFA tracking disclosed (если используется)]
- [ ] [TODO: App Type selected (Game/App/VoIP/etc)]
- [ ] [TODO: Content ratings заполнены]

### Информация о приложении

| Параметр | Значение |
|---|---|
| **App Name** | [TODO: Название как в App Store] |
| **Subtitle** | [TODO: Краткое описание] |
| **Bundle ID** | [TODO: com.company.app] |
| **Primary Category** | [TODO: Game / Productivity / Social / etc] |
| **Secondary Category** | [TODO: если есть] |

### Description & Metadata

- [ ] [TODO: App Description написано (до 4000 символов)]
  ```
  Структура:
  - Что делает приложение
  - Ключевые функции (2-3 пункта)
  - Преимущества
  - Call to action
  ```

- [ ] [TODO: Keyword list добавлены (до 100 символов)]
  ```
  Примеры: feature1, feature2, category, use-case
  Разделять запятыми, без скобок
  ```

- [ ] [TODO: Support URL установлена]
- [ ] [TODO: Privacy Policy URL установлена]
- [ ] [TODO: Marketing URL установлена (опционально)]

### Screenshots & Preview Video

**Размеры (Latest):**
- iPhone 6.7": 1284×2778 px
- iPhone 6.5": 1242×2688 px
- iPhone 5.8": 1125×2436 px
- iPad 12.9": 2048×2732 px

- [ ] [TODO: 2-5 скриншотов на английском языке]
- [ ] [TODO: Скриншоты показывают ключевые функции]
- [ ] [TODO: Скриншоты в правильном порядке (самый привлекательный первый)]
- [ ] [TODO: Текст на скриншотах читаем]
- [ ] [TODO: Preview video (опционально, макс 30 сек)]

**Рекомендации:**
- Используйте контрастные цвета
- Добавьте текстовые описания функций
- Покажите UI в действии
- Включите hands-on демонстрацию

### App Preview

- [ ] [TODO: App Preview создан (опционально)]
  - Макс 30 секунд
  - Не может содержать звука
  - Должен показать основные фичи
  - Форматы: MP4 или MOV

### Сборка и загрузка

- [ ] [TODO: Archive created через Xcode]
- [ ] [TODO: Bitcode enabled (если требуется)]
- [ ] [TODO: Validate успешен]
- [ ] [TODO: Uploaded в App Store Connect]
- [ ] [TODO: Status: "Waiting for Review"]

### Review Information

- [ ] [TODO: Demo Account заполнена (если нужна)]
  ```
  Email: [TODO]
  Password: [TODO]
  Notes: [TODO: Как использовать дем аккаунт]
  ```

- [ ] [TODO: Review Notes]
  ```
  Описать:
  - Что нового в этой версии
  - Как получить доступ к фичам (если за paywall)
  - Любые special permissions (camera, location, etc)
  ```

- [ ] [TODO: Age Rating Questionnaire заполнена]
- [ ] [TODO: Export Compliance Information (если используется криптография)]
- [ ] [TODO: Advertising Identifier (IDFA) выбран]

### App Review Вероятные Issue

| Issue | Решение |
|---|---|
| Требует login/demo account | Предоставить рабочий demo account |
| Crashes on launch | Тестировать на всех поддерживаемых iOS версиях |
| Требует internet в offline | Документировать требование |
| Не соответствует гайдлайнам | Обновить UI/content согласно гайдлайнам |

---

## Google Play (Android) Чеклист

### Подготовка APK/AAB

- [ ] [TODO: Version code incremented]
- [ ] [TODO: Version name updated]
- [ ] [TODO: All native code compiled]
- [ ] [TODO: All graphics assets included]
- [ ] [TODO: Signed with release key]
- [ ] [TODO: Build успешен]
- [ ] [TODO: Проверены все фичи перед релизом]

### Google Play Console Setup

- [ ] [TODO: App created в Google Play Console]
- [ ] [TODO: Package name корректен]
- [ ] [TODO: App category selected]
- [ ] [TODO: Target audience определена]

### Информация о приложении

| Параметр | Значение |
|---|---|
| **App Name** | [TODO: Название] |
| **Short Description** | [TODO: 80 символов max] |
| **Full Description** | [TODO: До 4000 символов] |
| **Package Name** | [TODO: com.company.app] |
| **Target API Level** | [TODO: Текущее minimum + 2] |
| **Min API Level** | [TODO: Поддерживаемая версия] |

### Content Rating Questionnaire

- [ ] [TODO: Content rating questionnaire заполнена]
- [ ] [TODO: Выбран Content Rating (4+, 12+, 16+, 18+)]
- [ ] [TODO: Согласуется с контентом приложения]

### Screenshots & Graphics

**Размеры:**
- Phone: 1080×1920 px (JPEG or 24-bit PNG)
- Tablet: 1536×2048 px
- Android TV: 1920×1080 px

- [ ] [TODO: Minimum 2 скриншота (макс 8)]
- [ ] [TODO: 1 Feature Graphic (1024×500 px)]
- [ ] [TODO: 1 Icon (512×512 px)]
- [ ] [TODO: 1 Promo Graphic (180×120 px, опционально)]
- [ ] [TODO: 1 Video Preview (опционально)]

### Обновления и Версионирование

**Release Notes:**
- [ ] [TODO: Четко описаны изменения]
- [ ] [TODO: До 500 символов]
- [ ] [TODO: На английском (и локализованы, если нужно)]

**Примеры:**
```
Version 1.2.0 - March 20, 2026
- Added feature X
- Fixed crash on Android 13+
- Improved performance
```

### Загрузка

- [ ] [TODO: AAB (Android App Bundle) загружен]
  ```
  Преимущества AAB:
  - Меньше размер для пользователя
  - Автоматическая оптимизация
  - Required для новых apps
  ```

- [ ] [TODO: Или APK, если AAB не поддерживается]
- [ ] [TODO: Signed с правильным ключом]
- [ ] [TODO: Uploaded успешно]

### Privacy Policy & Permissions

- [ ] [TODO: Privacy Policy URL установлена]
- [ ] [TODO: Support email предоставлена]
- [ ] [TODO: Policy согласуется с используемыми permissions]

**Requested Permissions:**
- [ ] [TODO: Camera (если используется)]
- [ ] [TODO: Location (если используется)]
- [ ] [TODO: Contacts (если используется)]
- [ ] [TODO: Microphone (если используется)]
- [ ] [TODO: Storage (если требуется)]

### Store Listing Optimization

- [ ] [TODO: App Icon профессионального качества]
- [ ] [TODO: Screenshots показывают ценность]
- [ ] [TODO: Description содержит ключевые слова]
- [ ] [TODO: Feature Graphic привлекательна]

### Monetization & Pricing

- [ ] [TODO: Pricing установлена (если платная)]
- [ ] [TODO: In-app purchases добавлены (если есть)]
- [ ] [TODO: Ad policy соответствует гайдлайнам]

### Publishing

- [ ] [TODO: Все required fields заполнены]
- [ ] [TODO: Нет ошибок валидации]
- [ ] [TODO: Status: "Ready to publish"]
- [ ] [TODO: Click "Publish" или schedule release]

---

## ASO (App Store Optimization)

### Описание (Description)

**iOS:**
```
Максимум 4000 символов
Структура:
1. Hook (первые 2 строки)
2. Основные функции (3-5 пунктов)
3. Benefits (почему нужно)
4. CTA (скачать сейчас / начните бесплатно)

Примеры хороких описаний:
- Подумайте о вашей главной боли
- Почему пользователь хочет это приложение?
- Какие преимущества?
- Что делает его уникальным?
```

**Android:**
```
Максимум 4000 символов
Аналогично iOS
+ Add features you think are important
```

### Ключевые слова (Keywords)

**iOS (100 символов максимум):**
```
feature1, feature2, category, use-case, brand

Примеры:
- fitness, workout, training, gym, exercises
- photo, editor, filter, adjust, enhance
- notes, productivity, task, todo, organize

Советы:
- Используйте наиболее специфичные ключевые слова
- Не повторяйте основное название
- Исследуйте что ищут пользователи
- Проверьте что ищут конкуренты
```

**Android:**
```
Full description уже оптимизирована для поиска
Но используйте keywords в разных местах
```

### Скриншоты и превью

**Требования:**
- Первый скриншот — самый привлекательный
- Показывайте реальные UI экраны
- Добавляйте текстовые описания
- Используйте контрастные цвета
- Убедитесь что текст читаем

**Рекомендуемая структура:**
1. **First Screenshot:** Главное значение предложения (value prop)
2. **Second Screenshot:** Ключевая фича 1
3. **Third Screenshot:** Ключевая фича 2
4. **Fourth Screenshot:** Social proof / testimonials (если есть)
5. **Fifth Screenshot:** CTA или рейтинг

### Рейтинг и отзывы

- [TODO: Отвечать на отзывы (положительные и отрицательные)]
- [TODO: Исправлять issues, упомянутые в отзывах]
- [TODO: Поддерживать rating выше 4.0 звёзд]
- [TODO: Просить у пользователей оценить приложение]

### Локализация (если планируется)

| Язык | Статус | Чеклист |
|---|---|---|
| [TODO: English] | Live | ✓ |
| [TODO: Spanish] | [TODO] | [ ] Description [ ] Screenshots [ ] Keywords |
| [TODO: French] | [TODO] | [ ] Description [ ] Screenshots [ ] Keywords |
| [TODO: Russian] | [TODO] | [ ] Description [ ] Screenshots [ ] Keywords |

## Трекинг и аналитика релиза

### Метрики для отслеживания

| Метрика | Платформа | Инструмент | Целевое значение |
|---|---|---|---|
| Install velocity | Both | App Store Connect / Google Play Console | [TODO: X installs/day] |
| Rating | Both | Store | > 4.0 ⭐ |
| Crash rate | Both | Firebase / Sentry | < 1% |
| Retention D1 | Both | Firebase / Analytics | > [TODO: X%] |
| Update adoption | Both | Store | > [TODO: X%] within 7 days |

### Post-Release Tasks

- [ ] [TODO: Мониторить crash rate первые 48 часов]
- [ ] [TODO: Ответить на первые отзывы]
- [ ] [TODO: Проверить что фичи работают как ожидается]
- [ ] [TODO: Отслеживать install rate]
- [ ] [TODO: Планировать follow-up обновления]

## Ссылки и источники
- [TODO: Ссылка на App Store Connect]
- [TODO: Ссылка на Google Play Console]
- [TODO: Ссылка на Apple Guidelines]
- [TODO: Ссылка на Google Play Policy]
- [TODO: Ссылка на ASO Guide]
