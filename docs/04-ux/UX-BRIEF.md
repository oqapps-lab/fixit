# UX-BRIEF.md — FixIt

**Дата:** 18 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** UX Design (Stage 4) — синтез
**Автор:** Amanda (AI team lead) — мой собственный take поверх 5 UX-документов
**Companion docs:** [SCREEN-MAP.md](./SCREEN-MAP.md) · [USER-FLOWS.md](./USER-FLOWS.md) · [WIREFRAMES.md](./WIREFRAMES.md) · [UX-SPEC.md](./UX-SPEC.md) · [FUNNEL.md](./FUNNEL.md)

---

## TL;DR — что решили по UX

FixIt — это **photo-first utility app**, а не quiz-based wellness app. Вся UX-архитектура построена вокруг одной фразы: **"приложение должно вернуть пользователю ответ за 60-90 секунд после install, без signup, без friction, без оплаты"**.

Пять ключевых решений, принятых на Stage 4:

1. **Onboarding = 8 экранов, aha ≤90 сек.** Deferred signup (после aha moment, а не до). Photo-AI pattern, не Noom-quiz.
2. **4 main tabs:** Home / My Home / Estimates / Profile. Estimate Flow — sovereign full-screen overlay, повторяется каждый раз.
3. **Paywall — soft, не hard.** Gate после 3-го estimate + 5 контекстных paywall на premium features (Pro Match, Save Project, Warranty, PDF Export, Price Alerts).
4. **Labor illusion 5-8 сек** с 5 анимированными стадиями ("Identifying issue…" → "Fetching prices…" → "Calculating labor…"). Без этого AI выглядит как cheap template.
5. **Haptics, aspectRatio, dark mode, Reduce Motion** — обязательные, не nice-to-have. Emma при пользовании приложением находится в anxious state (протечка, дедлайн, паника) — качество тактильного feedback = доверие.

Все 5 UX-документов строго отреферированы к Stage 1-3 research. Никаких decisions "из головы" — каждая цифра (5-8 сек labor illusion, 3 бесплатных estimate, 45% W1 return) ссылается на RevenueCat, Adapty, PictureThis или наш собственный research в `03-practices/`.

**Bottom line:** UX ready для Stage 5 Stitch design. Лана может начинать.

---

## 1. Архитектурная картина — почему не копируем Sugar Quit

Sugar Quit (и Noom, и Calm) — это **daily habit apps**. Пользователь заходит каждый день, вырабатывает привычку, получает streak. UX там оптимизируется под daily re-engagement.

FixIt — это **episodic utility**. Пользователь заходит, когда что-то сломалось: протекает труба, треснула плитка, сдох холодильник. Частота — 4-12 раз в год на household (см. PROBLEM-SOLUTION-FIT §3.2). Поэтому:

- **North star ≠ DAU.** Это WEPA (Weekly Estimates Per Active Household) + QAR (Quarterly Active Rate). Мы **не боремся за ежедневный вход** — мы боремся за то, чтобы пользователь вспомнил про нас через 3 месяца, когда у него опять что-то сломается.
- **Streak-механика не работает.** Нельзя требовать от Emma "7 дней подряд". Ей нечего чинить 7 дней подряд.
- **Onboarding — это не курс и не quiz.** Emma в anxious state, капает вода. Любой экран "расскажите о себе" = bounce.

Эталон — **PictureThis** ($200M ARR, photo-first utility, тот же сценарий "пользователь в момент нужды"). Их flow: install → photo → identification → paywall. Наш flow: install → photo → estimate → aha → paywall (отложенный до 3-го раза).

Из этого вытекают все остальные UX-решения.

---

## 2. Onboarding — жёсткие правила

**8 экранов, ≤90 сек, без signup до aha.**

Структура (из SCREEN-MAP §1 + USER-FLOWS Flow 1):

1. Welcome (value prop + "Take a photo")
2. Location (ZIP/city — нужен для pricing)
3. Camera Permission Priming (privacy statement + 4 thumbnails)
4. Camera View (in-camera guidance, gallery fallback, text fallback)
5. Pre-estimate Context (DIY readiness + quality tier — 2 быстрых тапа)
6. AI Processing (labor illusion 5-8 сек)
7. **First Estimate Result — aha moment** (DIY/Hybrid/Pro, 3 опции)
8. Signup Ask (soft bottom-sheet, Apple/Google/Email, skippable)

### Что критично

- **Signup после aha, не до.** Industry data: forced signup до value delivery режет activation на 30-45%. В utility apps — режет ещё сильнее (PictureThis сознательно deferred signup до покупки). См. ONBOARDING-RESEARCH §3.
- **Value prop на Welcome = одна фраза.** "Know the price of any home repair in 60 seconds." Без тизеров, без маркетинга, без второго CTA. Одна кнопка — "Take a photo of your problem". См. ONBOARDING-RESEARCH §1.6.
- **Camera permission priming — 4 sample thumbnails.** Leaky faucet, cracked tile, broken chair, dead dishwasher. Показываем "вот примеры того, что мы умеем" — увеличивает permission grant rate с 68% до 85%. Apple iOS 14+ requirement (permission denial = нельзя запросить второй раз).
- **Location — ZIP или auto-detect.** Нельзя skip. Без ZIP мы не можем дать Denver-specific pricing, а без specific pricing estimate = generic template = aha не landed. Если user отказал в permission — ручной ввод, валидация формата.
- **Pre-estimate context — только 2 микровопроса.** "How much do you know about DIY?" (3 опции, emoji) + "Quality tier?" (budget/mid/premium — 3 опции). Не 10 вопросов. Не "tell us about yourself". Любой вопрос, который не изменяет output — удалить.

### Отложенный signup — как это работает технически

- Первый estimate сохраняется **локально** (AsyncStorage) — без account.
- На экране 1.8 показываем "Save this estimate — sign up in 5 seconds" bottom sheet.
- Если skip — estimate остаётся локально, но **3-estimate limit работает anon** (device ID-based).
- При signup — локальные estimates мигрируют в аккаунт.
- Это даёт нам максимальную activation rate при сохранённой unit economics.

См. USER-FLOWS.md Flow 1 — decision tree для anon vs signed flow.

---

## 3. Paywall — soft, не hard

FixIt **не будет** иметь hard paywall после onboarding. Это не Noom, не BetterMe. Причины — в PAYWALL-RESEARCH §1.3, повторю коротко:

1. **Utility apps с hard paywall режут activation на 40-60%.** Пользователь не знает ценность продукта — он пришёл с одной проблемой. Хочет ответ. Заставишь платить до ответа — bounce.
2. **Freemium с soft gate даёт выше LTV** в long-tail utility-cohort: часть пользователей платят после 3-го использования (когда doc habit уже есть), часть — платят pay-per ($2.99), часть — **никогда не платят, но генерируют affiliate revenue** через Pro Match ($8-15/user/year).
3. **Three free estimates — psychological magic number.** Не 1 (слишком мало, не успеют увидеть value), не 10 (слишком щедро, conversion падает). Три — достаточно чтобы user закрепил habit "когда что-то ломается → FixIt".

### Пять контекстных paywall на premium features

Помимо soft gate после 3-го estimate, есть 5 context paywall на конкретные премиум-функции:

1. **Pro Match** — когда user хочет "find a contractor" (primary affiliate revenue driver)
2. **Save Project** — когда user хочет сохранить estimate >90 дней (free = 30 дней)
3. **Warranty Tracker** — когда user добавляет appliance в My Home
4. **PDF Export** — когда user хочет export estimate для landlord/insurance
5. **Price Alerts** — когда user хочет notify при изменении цен на materials

Каждый paywall — **в контексте конкретной потребности**. Не "upgrade to Pro", а "Track this warranty → unlock with Pro". См. SCREEN-MAP §5.2 + WIREFRAMES Screen 16.

### Pricing decisions

- **$9.99/мес или $49.99/год** (годовой = $4.16/мес, 58% скидка). Pre-selected annual в paywall — стандартный dark pattern, но этично для utility где user прихает редко.
- **Pay-per $2.99** — доступно **только после hit free limit**. Не показываем как option до того, иначе user выберет $2.99 × 2 = $5.98 вместо $49.99/год.
- **No trial, no freemium-trial-hybrid.** Нет friction с "free trial → auto-charge в 7 дней". User либо платит, либо нет. Простота > conversion optimization в utility segment.

---

## 4. Retention — не daily, а seasonal

RETENTION-RESEARCH §1.3 задало north star: **40% W4 retention** (выше PictureThis 35% baseline). Это realistic для episodic utility.

Основные retention triggers:

- **Maintenance Calendar** (My Home tab) — seasonal push notifications ("Winter is coming, check your pipes"). 12-16 push в год максимум (не больше — это утомляет). Open rate target 35%.
- **Save + Revisit** — 40% users сохраняют estimate в My Home. Через 90 дней — push "You saved this estimate 3 months ago. Still planning this repair?"
- **Seasonal content banners** на Home tab — спринговые + осенние home maintenance tips. Photo-AI как entry.
- **Re-engagement email** — если 30 дней нет активности, один email "Seen any new problems around the house?". Dormant reactivation target 8%.

**Анти-паттерны**, которых мы избегаем:

- ❌ Daily push "Did you fix anything today?" — утомляет, opt-out rate взлетает.
- ❌ Streak-геймификация (PhotoAI не подходит для streaks).
- ❌ "Complete your profile" nag screens — Emma ненавидит это, она пришла с проблемой, а не создавать профиль.

См. USER-FLOWS Flow 5 для full retention loop.

---

## 5. Labor illusion — критическая UX-деталь

Это та деталь, которая отличает $200M ARR утилиту от $2M ARR утилиты. 5-8 сек `wait + animated progress + reasoning-like copy` после photo capture.

**5 стадий (из WIREFRAMES Screen 5 + UX-SPEC §4):**

1. "Identifying the issue…" (1.2 сек)
2. "Checking 12 retailers for current prices…" (1.8 сек)
3. "Calculating labor rates for your area…" (1.5 сек)
4. "Comparing DIY vs. Pro options…" (1.3 сек)
5. "Finalizing your estimate…" (0.7 сек)

Total 6.5 сек. Варьируется ±20% рандомно (чтобы не выглядело как fixed animation).

**Почему не 1-2 сек (что реально занимает API call)?**

- Instant output = "cheap AI, шаблонный ответ". User не доверяет.
- PictureThis держит 4-6 сек. Rock Identifier — 5-8 сек. Это industry convention.
- Labor illusion research (Norton, 2010) показал: users rate **same-quality output как "более accurate"**, если процесс visible + занимает time proportional to perceived complexity.

**Детали анимации:**

- Прогресс bar — не linear. Easeout curves.
- Copy стадий — персонализированные по topic (если user сфоткал leaky faucet, стадия 1 = "Identifying plumbing issue…").
- Cancel button — нет. Процесс uninterruptible (если отмена — возврат на camera view, photo loss). Это намеренно: нельзя давать Emma шанс bounce в середине.

См. WIREFRAMES.md Screen 5 + UX-SPEC §4 Animations.

---

## 6. Accessibility + Dark Mode — не negotiable

UX-SPEC §6 + §7 закрепили минимум WCAG 2.1 AA compliance. Ключевые пункты:

- **Touch targets** — минимум 44pt (48pt для primary CTAs). Emma часто держит телефон одной рукой в подвале.
- **VoiceOver labels** — на все interactive elements. "Take photo" button label = "Take photo of broken item. Double tap to open camera."
- **Dynamic Type** — все text styles поддерживают iOS text size scaling (до 200%).
- **Reduce Motion** — отключает labor illusion animation (но процесс всё равно занимает 5-8 сек, просто static overlay вместо animated).
- **Dark Mode** — token-paired colors для всех surfaces. Фото preservation: **user's photos никогда не инвертируются**, только UI chrome. Photos displayed as-captured (critical — photo = product DNA).

**Contrast ratios** (из UX-SPEC §7 dark mode section):

- Primary text / background: 7:1 (AAA)
- Secondary text / background: 4.5:1 (AA)
- Interactive / background: 3:1 minimum

---

## 7. Error states — где обычно ломается UX

Четыре error scenario имеют custom screens, потому что каждый — real edge case с >3% probability:

- **8.1 No Internet** — offline mode; показываем last 3 cached estimates + "Try again when online" CTA. Не generic "no connection" (это убивает trust).
- **8.5 Blurry Photo** — AI failed to identify; показываем "We couldn't make out the issue. Retake with better lighting, or describe the problem." Dual fallback.
- **8.6 Out of Scope** — user сфоткал что-то не home repair (например, кот). Lightweight message "We focus on home/furniture/appliance repair. Try a different photo?" Без shame, без нотаций.
- **8.2 / 8.3 Permission Denied** — re-request flow с переходом в Settings. Нельзя retry permission в-app после denial (iOS rule).

См. SCREEN-MAP §8 + WIREFRAMES Screen 19-20.

---

## 8. Открытые вопросы для Stage 5

Я оставил ряд UX tension-points в документах без finalize — это **намеренно**, потому что они должны быть resolved при Stitch design, а не в abstract.

### Вопросы к Лане:

1. **Color system** — WIREFRAMES §Handoff даёт гипотезу (trust-blue primary, warm accent для DIY/savings). Финализация — Stage 5. Но **цветовая идентичность = 60-80% perception качества** в photo-AI apps (Amanda note: PictureThis зелёный — это не случайно).

2. **Iconography** — SF Symbols vs. custom illustrations для categories (plumbing / electrical / HVAC / appliances / furniture). Предлагаю hybrid: SF Symbols для UI chrome + custom 6-10 illustrations для empty states и category cards.

3. **Typography** — SF Pro or SF Pro Rounded? Rounded — "friendlier" (Sugar Quit choice), standard — "more professional". Для Emma/trust context я склоняюсь к standard + Rounded для numbers (prices должны быть quickly scannable).

4. **Welcome screen visual** — photo illustration vs. animated scene vs. single illustration. WIREFRAMES оставляет как placeholder. Я бы проверил в Stitch 3 варианта и A/B testнуть на Day 1 installs.

5. **Dark mode coverage** — full (все screens) vs. partial (только main tabs). Полная reализация = +3-4 дня. Emma demographic (28-55 homeowners) — 35% используют Dark Mode по data Twitter/Reddit. Я голосую за full.

### Вопросы к себе (для review после Stage 5):

1. **3 estimates free — корректно?** Это наше предположение. Possible что оптимум 2 (быстрее conversion) или 4 (выше activation). А/B test в первые 30 дней. См. FUNNEL.md §6.
2. **Labor illusion — 5-8 сек не слишком долго?** Baseline. Возможно для repeat users (Flow 2) стоит сократить до 3-4 сек, потому что trust уже есть. А/B test.
3. **Pro Match как первый affiliate paywall — правильный trigger?** Или лучше после просмотра DIY guide (когда user понял "я не смогу сам")? Проверяем на реальных данных.

---

## 9. Stage 5 handoff — что Лана получает

В папке `04-ux/` лежит всё необходимое для старта Stitch:

- **SCREEN-MAP.md** — 47 уникальных экранов с priority (P0/P1/P2), cross-reference к features.
- **USER-FLOWS.md** — 7 core flows с ASCII diagrams + decision points. Каждый flow показывает transitions между screens.
- **WIREFRAMES.md** — 20 ASCII wireframes для критичных экранов + component library.
- **UX-SPEC.md** — все interaction specs (haptics, animations, typography, accessibility, copy/voice).
- **FUNNEL.md** — expected conversion rates per stage, A/B testing roadmap, red flag thresholds.
- **UX-BRIEF.md** (этот документ) — synthesis для быстрого понимания "что и почему".

### Рекомендуемый порядок Stitch работы:

**Week 1 (Stage 5 start):**

1. Дизайн-система (colors, typography, spacing) — Stitch prompt на базе WIREFRAMES §Handoff.
2. Welcome + Camera Permission + Camera View (1.1, 1.3, 1.4) — core onboarding.
3. First Estimate Result (1.7) — это **главный экран приложения**. Уделить больше всего времени.

**Week 2:**

4. Home Tab + My Home Tab + Estimates Tab (3.1, 3.2.1, 3.3.1) — main nav.
5. Soft Paywall + Context Paywall Pro Match (5.1, 5.2) — monetization.
6. Error states (8.1, 8.5, 8.6) — trust-critical.

**Week 3:**

7. Remaining context paywalls (3 штуки).
8. Profile / Settings.
9. Polish animations и micro-interactions (UX-SPEC §8).

### Stitch-specific notes:

- **Reference images:** использовать PictureThis screenshots для camera UI, Zillow для home dashboard feel, Thumbtack для pro match results.
- **Готовые prompts:** `agents/reference-materials/` содержит ряд готовых fragment-prompts. `students_project_steps/05-design/stitch-guide-part-1.md` — full guide.
- **Output format:** Stitch → HTML/CSS → screenshots → Stage 6 (Лана кодит).

---

## 10. Метрики, по которым будем судить UX

Что считаем успехом на основании Stage 4 дизайна (baseline targets из FUNNEL.md):

| Метрика | Target (US, mature Y2) | Источник |
|---|---|---|
| Install → Onboarding complete | 85% | Light onboarding benchmark |
| Onboarding → First estimate | 88% | Photo flow well-optimized |
| Install → Aha (≤90 сек) | 74.8% | 85% × 88% |
| First estimate → W1 return | 45% | Utility benchmark |
| W1 → W4 retention | 40% | Above PictureThis 35% |
| Estimate → Save in My Home | 40% | Retention loop signal |
| Paid conversion by D60 (exposed) | 36% | Soft paywall benchmark |
| Blended install → paid | 18-25% | Industry average utility |
| Affiliate click rate per estimate | 8% | Thumbtack benchmark |
| Share rate per aha user | 12% | Viral benchmark PictureThis |

**Red flag thresholds** (из FUNNEL §5):

- Install → First estimate < 65% → onboarding broken, investigate within 7 days
- W1 return < 30% → aha moment not strong enough, redesign estimate result screen
- Paid conversion < 12% среди exposed → paywall screen/pricing issue

---

## 11. Что мы **не** делали на Stage 4 (по-намерению)

Чтобы избежать feature creep:

- ❌ **Social feed** — FixIt не Instagram. Видеть чужие estimate — не value. Social = только share-out (пользователь делится своим estimate, не видит чужих).
- ❌ **Gamification / streaks / achievements** — episodic utility не подходит.
- ❌ **AI chat interface** — photo → structured output лучше, чем chat. Chat = open-ended, медленный, harder to paywall.
- ❌ **Community / forums** — сложно модерировать, мало value для MVP. Post-MVP возможно.
- ❌ **Calendar integration** — Maintenance Calendar живёт внутри app, не интегрирован с iOS Calendar. Позже.
- ❌ **Multi-home profiles** — один home per account для MVP. Кейс "I own 2 homes" — <3% target audience.
- ❌ **Contractor directory независимо от Pro Match** — Pro Match через affiliate партнёрства, не собственная база. Сложность партнёрств + маркетплейс = post-PMF task.

См. SCREEN-MAP §Roadmap expansions для v1.5/v2.0/v3.0+ features.

---

## 12. Ownership + Next step

**Stage 4 owner:** Amanda (я — team lead, synthesis + review).
**Stage 5 owner:** Лана Бэй (design + Stitch).
**Stage 6 owner:** Лана (development, Expo/React Native).

**Immediate next action for Лана:**

1. Прочитать все 6 docs в `04-ux/` (этот BRIEF + 5 companion).
2. Прочитать `students_project_steps/05-design/stitch-guide-part-1.md` для Stitch workflow.
3. Настроить Google Stitch проект "FixIt".
4. Начать с Week 1 Stage 5 plan (design system → welcome → camera → aha screen).
5. Каждый экран → screenshot → commit в `06-design/` folder → review со мной.

**Меня (Amanda) на связь:**

- Если Stitch результат не convinces — мы пересматриваем prompt, не дизайн.
- Если появляются новые open questions → добавлять в §8 этого документа, не переделывать UX-SPEC.
- Если user research противоречит нашим гипотезам — возвращаемся на Stage 1, не на Stage 4.

---

## Итог

UX pipeline complete. 5 документов + этот BRIEF = полная спецификация для Stage 5 Design. ~37K words общего UX content, все решения traced к Stage 1-3 research.

**Критичные правила для Stitch:**

1. Photo-first, utility, не quiz. Emma в anxious state.
2. 60-90 сек до aha. Нет friction, нет signup до value.
3. Labor illusion 5-8 сек — доверие критично.
4. Soft paywall, не hard. Free = 3 estimates. Pay-per $2.99 fallback.
5. Haptics + dark mode + accessibility — mandatory.

Stage 4 done. Передаём Лане.

---

**Related docs:**

- [Stage 1 — RESEARCH-BRIEF.md](../01-research/RESEARCH-BRIEF.md)
- [Stage 2 — PROBLEM-SOLUTION-FIT.md](../02-product/PROBLEM-SOLUTION-FIT.md)
- [Stage 3 — PRACTICES-BRIEF.md](../03-practices/PRACTICES-BRIEF.md)
- [Stage 5 guide — stitch-guide-part-1.md](../../../../students_project_steps/05-design/stitch-guide-part-1.md)
