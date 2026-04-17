---
Проект: [PROJECT_NAME]
Дата: [YYYY-MM-DD]
Статус: Draft
Автор: [AUTHOR]
---

# Changelog

Все замечательные изменения этого проекта будут задокументированы в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
и этот проект придерживается [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- [TODO: Новая фича 1]
- [TODO: Новая фича 2]

### Changed
- [TODO: Изменённая фича 1]

### Fixed
- [TODO: Исправленная ошибка 1]

### Removed
- [TODO: Удалённая фича]

### Deprecated
- [TODO: Устаревающий API/функция]

---

## [1.0.0] - 2026-03-20

### Added
- [TODO: Initial release features]
  - [TODO: Feature 1]
  - [TODO: Feature 2]
  - [TODO: Feature 3]
- [TODO: Authentication system]
- [TODO: User profiles]
- [TODO: Core API endpoints]

### Changed
- [TODO: Updated UI design]
- [TODO: Improved performance]

### Fixed
- [TODO: Fixed initial bugs]

---

## Template Entry

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- [TODO: Новые возможности, добавленные в этой версии]
  - [TODO: Sub-feature или detalь]
  - [TODO: Sub-feature или деталь]
- [TODO: Another feature]

### Changed
- [TODO: Изменения в существующей функциональности]
- [TODO: Breaking changes (если есть, отметить как BREAKING)]

### Fixed
- [TODO: Исправленные ошибки]
- [TODO: Resolved issues]

### Removed
- [TODO: Удалённые функции (если какие-то)]
- [TODO: Deprecated в предыдущей версии]

### Deprecated
- [TODO: Функции, которые будут удалены в будущем]

### Security
- [TODO: Исправления безопасности]

### Performance
- [TODO: Улучшения производительности]

### Documentation
- [TODO: Улучшения документации]

### Known Issues
- [TODO: Известные проблемы и их обходные пути]
```

---

## Правила для changelog

### Общие правила

1. **Дата:** Используйте формат `YYYY-MM-DD` (ISO 8601)
2. **Версия:** Следуйте Semantic Versioning (MAJOR.MINOR.PATCH)
3. **Изменяемость:** Если вы удаляете или меняете функцию, убедитесь что это задокументировано
4. **Категории:**
   - `Added` — новые функции
   - `Changed` — изменения в функциональности
   - `Deprecated` — вскоре будет удалено
   - `Removed` — удалённые функции
   - `Fixed` — исправленные ошибки
   - `Security` — уязвимости
   - `Performance` — оптимизации
   - `Documentation` — документация

### Примеры форматирования

**Хорошо:**
```markdown
### Added
- User can now export data as CSV
- Dark mode support for all screens
- Two-factor authentication via authenticator apps

### Fixed
- Fixed crash when uploading files larger than 100MB (#1234)
- Corrected typo in settings page
```

**Плохо:**
```markdown
### Added
- Fixed stuff
- Improved performance
- Updated things

### Changes
- Made it better
```

### Linking Issues

Если изменение связано с issue или PR, добавьте ссылку:

```markdown
### Fixed
- Fixed user authentication bug (#123)
- Resolved memory leak in image processing (PR #456)
```

---

## Release Checklist

### Перед релизом

- [ ] [TODO: Все PR с фичами смерджены в main]
- [ ] [TODO: Все тесты passing]
- [ ] [TODO: Code review completed]
- [ ] [TODO: Staging deployment успешен]
- [ ] [TODO: QA approval получено]

### Создание релиза

- [ ] [TODO: Обновить версию в package.json]
- [ ] [TODO: Обновить CHANGELOG.md]
- [ ] [TODO: Создать git tag (v1.2.3)]
- [ ] [TODO: Push tag в GitHub/GitLab]
- [ ] [TODO: Create Release на GitHub/GitLab]

### После релиза

- [ ] [TODO: Deploy в production]
- [ ] [TODO: Notify team в Slack]
- [ ] [TODO: Update status page (если публичное приложение)]
- [ ] [TODO: Update app store descriptions (если мобильное)]

---

## Версионирование

### Когда увеличивать версию?

**MAJOR (v1.0.0 → v2.0.0):**
- Breaking changes в API
- Удаление функционала
- Смена основной архитектуры

**MINOR (v1.0.0 → v1.1.0):**
- Новые функции (backward compatible)
- Deprecated функции (но ещё работают)
- Performance improvements

**PATCH (v1.0.0 → v1.0.1):**
- Bug fixes
- Security patches
- Documentation updates

### Примеры

| Изменение | Текущая версия | Новая версия | Причина |
|---|---|---|---|
| New feature | v1.0.0 | v1.1.0 | Minor feature |
| Bug fix | v1.1.0 | v1.1.1 | Patch fix |
| API change | v1.1.1 | v2.0.0 | Breaking change |
| Performance | v1.1.1 | v1.2.0 | Enhancement |

---

## История Версий

| Версия | Дата | Статус | Примечание |
|---|---|---|---|
| [TODO: 1.0.0] | [TODO: 2026-03-20] | Released | Initial release |
| [TODO: 0.9.0] | [TODO: 2026-03-10] | Beta | Beta testing |
| [TODO: 0.1.0] | [TODO: 2026-01-01] | Alpha | Early development |

---

## Ссылки и источники
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [TODO: Ссылка на GitHub Releases]
- [TODO: Ссылка на Product Roadmap]
