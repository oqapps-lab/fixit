# FixIt — Stitch prompts для First Estimate Result screen

**Дата:** 2026-04-18
**Цель:** выбрать стилистическое направление для всего приложения через aha-screen

Один и тот же экран (First Estimate Result — aha moment) в 5 разных стилистиках. Копируешь каждый в Stitch Pro, смотришь что выходит, выбираешь направление.

Экран: Emma сфоткала протекающий смеситель. FixIt идентифицировал "Leaky Kitchen Faucet Cartridge". Показывает 3 опции: DIY ($15) / Hybrid ($45) / Pro ($180). Возможная экономия. CTA: "Start DIY" / "Find a Pro". Фото проблемы thumbnail. Это самый важный экран приложения — aha moment landing.

## Варианты

| # | Стиль | Философия | Target mood |
|---|---|---|---|
| v1 | [Craftsman Editorial](./v1-craftsman-editorial.md) | Warm honest wood + linen palette. Tools on workbench. Handmade trust. | Reassuring, tactile, human |
| v2 | [Calm Clarity](./v2-calm-clarity.md) | Cool slate-blue architecture. Precision instruments. Trust-through-engineering. | Confident, precise, calming |
| v3 | [Forecast Panel](./v3-forecast-panel.md) | Weather report for home problems. Screen-wide narrative gradient. | Editorial, atmospheric |
| v4 | [Field Notes](./v4-field-notes.md) | Workshop journal aesthetic. Blueprint grid. Measurements and marginalia. | Technical, thorough, nerdy |
| v5 | [Price Weather](./v5-price-weather.md) | Each option is a weather zone. Temperature = difficulty. | Playful, informative |

## Как выбирать

1. Запусти все 5 промптов в Stitch Pro — один прогон, без картинок, без add-ons
2. Смотри какой выход даёт **правильное эмоциональное ощущение** для Emma в anxious state (она в панике, хочет быстро понять что делать)
3. Ключевой тест: **через 3 секунды после первого взгляда на скрин — хочется нажать на DIY?** Если да — стиль работает.

## После выбора

1. Копируем победителя в `06-design/STITCH-STYLE-DIRECTION.md` как canonical
2. Пишем ещё 2-3 промпта в том же стиле для остальных ключевых экранов (Welcome, Camera, Home Dashboard, Soft Paywall)
3. Проверяем consistency серии
4. Design system на основе этого направления
