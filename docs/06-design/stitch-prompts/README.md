# FixIt — Stitch prompts для Welcome screen (style direction exploration)

**Дата:** 2026-04-18
**Экран:** Onboarding Welcome (1.1) — первый экран что видит Emma
**Цель:** выбрать стилистическое направление для всего приложения через hero welcome screen с heavy illustrated graphics

Один и тот же экран — Welcome с hero illustration + CTA "Take a photo of your problem" — в 5 разных стилистиках. Каждый промпт содержит directives для:
- **Large hero illustration** (центральная scene)
- **Custom patterned background** (linen / graph paper / gradient sky / etc — стиль-specific)
- **Decorative marginalia / ornaments** (flourishes, icons, small illustrated elements)
- **Animated-feeling static elements** (water drops, particles, glows, drifting clouds)
- **Scene-style hero area** (не icon, а small illustrated world)
- **Illustrated secondary elements** (sample problem thumbnails, decorative stripes)

## Варианты

| # | Стиль | Философия | Hero illustration |
|---|---|---|---|
| v1 | [Craftsman Editorial](./v1-craftsman-editorial.md) | Warm workshop honesty. Lamp-light over workbench. | Aged-oak workbench + amber lamp + linen-wrapped problem + pencil sketches |
| v2 | [Calm Clarity](./v2-calm-clarity.md) | Architectural precision. Technical schematic made friendly. | House cross-section line-drawing + teal pinpoints where problems live |
| v3 | [Forecast Panel](./v3-forecast-panel.md) | Weather atmospheric — house under moving sky. | Aerial house scene + weather zones + golden-hour sky |
| v4 | [Field Notes](./v4-field-notes.md) | Workshop journal + cutaway drawing. | Hand-drawn house cross-section + margin annotations + paper-clipped Polaroids |
| v5 | [Price Weather](./v5-price-weather.md) | Three climate zones for one house. | House triptych: same house in three weather moods |

## Как выбирать

1. Запусти все 5 промптов в Stitch Pro **без картинок на вход** (no reference images, no add-ons)
2. Смотри на hero illustration quality + decorative density + background pattern coherence
3. Ключевой тест: **exit test** — через 3 секунды после первого взгляда, хочется ли тапнуть "Take a photo"? Если да — style работает для anxious Emma.

## После выбора

1. Победитель → `06-design/STITCH-STYLE-DIRECTION.md` как canonical
2. Пишу ещё 3-4 промпта в том же стиле (Camera / First Estimate / Home / Soft Paywall)
3. Проверяем consistency серии
4. Design system на основе direction
