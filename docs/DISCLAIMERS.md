---
Проект: FixIt — AI home repair cost advisor
Документ: Disclaimer Copy & Placement Spec
Дата: 2026-05-07
Версия: v1.0
Статус: Ready for implementation (Stage 6)
---

# DISCLAIMERS.md

Готовые тексты для copy-paste в приложение. Не редактировать без юридического review.

**Источник:** [DOMAIN-RESEARCH.md §3](01-research/DOMAIN-RESEARCH.md#3-регуляторика-и-disclaimers) — обоснование, регуляторный контекст, FTC + Apple App Store требования.

---

## Тексты

### D-1 — Основной (estimate экран)

> *This is an AI-generated estimate based on your photo and regional data. Actual costs may vary significantly. This is not a professional quote. For accurate pricing, get at least 2–3 quotes from licensed contractors in your area. FixIt is not liable for decisions made based on this estimate.*

**Показывать:** на экране результата (estimate screen), под тремя вариантами (DIY / Hybrid / Pro). Всегда, каждый estimate.

---

### D-2 — DIY mode

> *DIY instructions are AI-generated suggestions. Proceed at your own risk. Always shut off utilities before starting work. If in doubt, call a licensed professional. FixIt is not responsible for injury, property damage, or code violations resulting from DIY repairs.*

**Показывать:** вверху DIY guide экрана, до первого шага. Не скрывать под scroll.

---

### D-3 — Safety блокировка

> *This type of repair requires a licensed professional and may require a building permit. Attempting this without a license may be illegal and dangerous. Please contact a licensed contractor.*

**Показывать:** вместо estimate когда Claude возвращает `severity: "emergency"` или категория из safety-blocked list (gas, structural, main electrical). Заменяет все три режима целиком.

---

### D-4 — Privacy (pre-photo permission)

> *Your photo will be analyzed by Claude AI (Anthropic) to identify the repair issue. Photos are not stored after analysis. See our Privacy Policy for details.*

**Показывать:** один раз при первом запуске — permission prompt перед первой передачей фото в API. После согласия — не показывать повторно. Обязательно по Apple App Store Guideline 5.1.2i (ноябрь 2025).

---

## Карта размещения

| Экран | Disclaimer | Позиция | Поведение |
|-------|-----------|---------|-----------|
| Onboarding — шаг с camera permission | D-4 | Модальный alert | Блокирующий: Accept / Decline |
| Estimate result | D-1 | Под тремя картами, inline | Не скрывается, не dismissible |
| DIY guide | D-2 | Вверху экрана до шагов | Inline, не скрывается |
| Safety блок | D-3 | Вместо estimate экрана | Полноэкранный, заменяет весь результат |

---

## Правила реализации

1. **Шрифт:** минимум 12pt / 11sp, цвет — secondary text (не ghost серый).
2. **Не за accordions:** D-1 и D-2 не прятать под "Read more". Они должны быть видны без tap.
3. **D-4 — не пропускаемый:** пользователь должен явно принять, иначе фото не отправляется в API.
4. **D-3 — полный экран:** не partial warning. Estimate не рассчитывается при safety block.
5. **Локализация:** MVP — только английский. Не переводить до v2.
6. **Ссылки:** "Privacy Policy" в D-4 → ссылка на `/legal/privacy`. "Licensed contractor" в D-3 → deeplink на Find a Pro (Feature #6).

---

## Статус review

| Disclaimer | Текст готов | Юр. review | Имплементирован |
|-----------|-------------|------------|-----------------|
| D-1 Основной | ✅ | ⏳ Нужен | ⏳ |
| D-2 DIY | ✅ | ⏳ Нужен | ⏳ |
| D-3 Safety | ✅ | ⏳ Нужен | ⏳ |
| D-4 Privacy | ✅ | ⏳ Нужен | ⏳ |

**Следующий шаг:** передать D-1–D-4 на юридический review → подтвердить тексты → имплементировать в Stage 6.
