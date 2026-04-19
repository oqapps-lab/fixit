# UX-BRIEF.md — FixIt

**Дата:** 2026-04-20
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** UX Design (Stage 4) — synthesis v2.0 post-rescope
**Автор:** Amanda (AI team lead) — synthesis поверх 5 UX-docs
**Статус:** Final v2.0 (pure AI-advisor utility positioning)
**Companion docs:** [POSITIONING.md](../02-product/POSITIONING.md) · [SCREEN-MAP.md](./SCREEN-MAP.md) · [USER-FLOWS.md](./USER-FLOWS.md) · [WIREFRAMES.md](./WIREFRAMES.md) · [UX-SPEC.md](./UX-SPEC.md) · [FUNNEL.md](./FUNNEL.md)

---

## TL;DR — что решили по UX после rescope

FixIt — это **photo-first utility app** с новым позиционированием "Know the price before the panic" (POSITIONING.md §2). Pure AI-advisor, не marketplace. Все 5 UX-докуметов переписаны под это:

Пять ключевых решений Stage 4 v2.0:

1. **Onboarding = 8 экранов, aha ≤90 сек.** Deferred signup (после aha). Photo-AI pattern (PictureThis / Rock Identifier / Cal AI), НЕ wellness quiz (Noom / Sugar Quit).
2. **4 main tabs:** Home / My Home / Estimates / Profile. Estimate Flow — sovereign full-screen overlay.
3. **Paywall — soft gate после 3-го estimate + 4 context paywalls** (не 5). Context paywalls: Save Project / Warranty / PDF Export / Price Alerts. **Pro Match context paywall удалён** — Find-a-Pro теперь бесплатный deeplink.
4. **Labor illusion 5-8 сек** с 5 animated stages. Без этого AI выглядит как cheap template.
5. **Haptics + dark mode + accessibility** — обязательные, не nice-to-have.

**Ключевое отличие от v1:** Find-a-Pro стал простым deeplink sheet (3 кнопки → Thumbtack / Google Maps / Yelp). Больше нет in-app pro marketplace UI, нет lead capture, нет partnership quotes. Мы помогаем Emma решить "DIY или звать мастера" — если мастер, указываем куда пойти.

42 screens (было 47), 19 wireframes (было 20). Revenue Y1 per 10K cohort: $9-11K (было $14-16K). Trade-off: ship faster, zero partnership risk.

---

## 1. Архитектура — photo-first utility, не quiz wellness

Sugar Quit — daily habit app (streak-механика, ежедневный вход). FixIt — **episodic utility** (4-12 раз в год на household, per PROBLEM-SOLUTION-FIT §3.2). Это задаёт всю UX-архитектуру:

- **North star ≠ DAU.** Это **WEPA** (Weekly Estimates Per Active Household) + **QAR** (Quarterly Active Rate). Мы не боремся за daily login — боремся за "когда что-то ломается через 3 месяца, она вспомнит про нас."
- **Streak-механика не работает.** Нечего чинить 7 дней подряд.
- **Onboarding = не quiz, не курс.** Emma в anxious state (капает вода). Любой screen "расскажите о себе" = bounce.

Эталон референса: **PictureThis** ($200M ARR), Rock Identifier ($50M ARR), Cal AI, SkinVision. Pattern: install → photo → result → paywall. Наш flow: install → photo → estimate → aha → paywall (отложенный до 3-го раза).

Из этого вытекают все UX-решения.

---

## 2. Onboarding — жёсткие правила

**8 экранов, ≤90 сек, signup после aha.**

Структура (SCREEN-MAP §1 + USER-FLOWS Flow 1):

1. Welcome — tagline **"Know the price before the panic"** (primary) или **"Take a photo. Know the price. Decide what to do."** (alt A/B) + "Take a photo" CTA
2. Location capture (ZIP/city auto-detect с fallback)
3. Camera Permission Priming (privacy statement + 4 problem sample thumbnails)
4. Camera View (in-camera guidance + gallery fallback + text fallback)
5. Pre-estimate Context (DIY readiness + quality tier — 2 быстрых тапа)
6. AI Processing (labor illusion 5-8 сек)
7. **First Estimate Result — aha moment** (DIY / Hybrid / Pro — 3 options)
8. Signup Ask (soft bottom-sheet с savings anchor "Save this estimate — $175 saved going DIY")

### Что критично

- **Signup после aha, не до.** Industry data: forced signup до value delivery режет activation 30-45%. В utility apps — режет ещё сильнее. ONBOARDING-RESEARCH §3.
- **Welcome tagline = новый USP.** "Know the price before the panic" (emotional anchor). Альтернатива — "Take a photo. Know the price. Decide what to do." (more functional). A/B test в первые 90 дней.
- **NO mention of "find a pro"** на Welcome. Это НЕ v1 positioning.
- **Camera permission priming — 4 sample thumbnails.** Leaky faucet, cracked tile, broken chair, dead dishwasher. +17% permission grant rate (68% → 85%).
- **Location — ZIP/auto-detect.** Нельзя skip — без ZIP generic estimate не landing as aha.
- **Pre-estimate context — 2 микровопроса.** Не больше. Любой вопрос не изменяющий output — удалить.

### Отложенный signup — technical

- Первый estimate сохраняется локально (AsyncStorage), без account.
- Screen 1.8 bottom-sheet с savings anchor ("$175 saved going DIY — сохранить?").
- Skip → estimate остаётся локально, 3-limit работает anon (device ID).
- Signup → локальные migrate в аккаунт.

USER-FLOWS Flow 1 — full decision tree.

---

## 3. Paywall — soft, не hard

FixIt **не будет** иметь hard paywall после onboarding. Причины (PAYWALL-RESEARCH §1.3):

1. **Utility с hard paywall режут activation 40-60%.** Пользователь не знает ценность — хочет один ответ. Заставишь платить до ответа — bounce.
2. **Freemium с soft gate даёт выше LTV** в long-tail cohort. Часть users платят после 3rd (habit established). Часть — pay-per $2.99. Часть — никогда не платят, но generate passive Amazon Associates revenue.
3. **Three free estimates — psychological magic number.** Не 1 (too little), не 10 (too generous). Три — закрепляет habit "сломалось → FixIt".

### 4 context paywalls (было 5)

Кроме soft gate после 3rd estimate:

1. **Save Project** — сохранение >90 дней
2. **Warranty Tracker** — appliance warranty log
3. **PDF Export** — estimate для landlord/insurance (high for Sarah persona)
4. **Price Alerts** — notify при падении цен на materials

**Удалено v1 → v2:** ~~Pro Match context paywall~~ — Find-a-Pro deeplink сейчас free. Deep-link к Thumbtack не премиум фича, потому что мы не earn от клика.

Каждый paywall — в контексте конкретной потребности. Не "upgrade to Pro", а "Track this warranty → unlock with Pro".

### Pricing

- **$9.99/мес или $49.99/год** (годовой = $4.16/мес, 58% скидка). Annual pre-selected.
- **Pay-per $2.99** — только после hit free limit (не показываем как option до, иначе $2.99 × 2 = $5.98 vs $49.99/год).
- **No trial.** Нет "free trial → auto-charge через 7 дней" friction.

MONETIZATION.md v2.0 full details.

---

## 4. Find a Pro (simplified) — ключевое отличие от v1

Было в v1: полноценный pro marketplace UI — 3 profile cards с ratings/quotes/availability/request form. Thumbtack/Angi affiliate $15-40/lead. Complex partnership dependencies.

Стало в v2: **bottom sheet, 3 кнопки** — Thumbtack / Google Maps / Yelp — pre-filled поиск ("plumber near 80203"). Disclaimer "We don't earn from these links — choose whichever you trust."

### Что это значит для UX

- **Screen 7.1 Find-a-Pro Sheet** заменил 4 screens (7.1-7.4) v1
- **One pattern across all Pro mode users** — независимо от persona
- **Zero partnership UI to maintain** — если Thumbtack API изменится, не наша проблема
- **Honest handoff** — мы показываем "вот куда люди ищут мастеров, выбирай сам." Emma respects это.

WIREFRAMES v2.0 Screen 18 — simplified. SCREEN-MAP §7.1 — updated. USER-FLOWS Flow 4 replaced entirely (Sarah Quote Validator flow).

### Post-PMF upgrade path (v1.5+)

Если получим Thumbtack partnership approval после traction (5K+ MAU):
- Добавить affiliate tag в Thumbtack URL — `&partner=fixit`
- Zero UX change
- Revenue bonus $15-40/lead if user books through their app

Trivial engineering add. Позиционирование остаётся "advisor, not marketplace" — affiliate invisible к user.

---

## 5. Retention — не daily, а episodic

RETENTION-RESEARCH v2.0 north star: **WEPA** + **QAR**. 40% W4 target (above PictureThis 35%). Realistic для episodic utility.

### Retention triggers (updated под новое positioning)

- **Save-to-My-Home loop** (40% save rate target) — estimate → save → revisit через 90 дней "ещё планируешь?"
- **Savings anniversary push** (1 push/year) — "You saved $500 this year!" — viral + retention combined
- **Seasonal Home Health nudges** (4 push/year) — spring/summer/fall/winter maintenance tips
- **Re-engagement email** (30 days silent) — "Seen anything new?" (NOT "pros near you available")
- **Home Health score** — persistent dashboard что ухудшается если user не chinит

**12-16 push/year** total budget. Open rate target 35%.

### Удалено v1 → v2

- ❌ "New pros in your area" push — no pro network
- ❌ "Pro Joe responded to your quote" — no quote system
- ❌ "Weekly pro availability update" — no pros

### Новые retention hooks под rescope

- "Your savings crossed $500" (milestone push)
- "Spring check-in — 3 small fixes worth knowing" (seasonal)
- "Home Health dropped to 75 — something needs attention" (dashboard pull)

---

## 6. Labor illusion — critical UX detail

Это та деталь которая отличает $200M ARR утилиту от $2M ARR утилиты. 5-8 сек wait с animated progress + reasoning-like copy.

**5 stages (WIREFRAMES Screen 5 + UX-SPEC §3.2):**

1. "Identifying the issue…" (1.2 сек) — **NOT "Matching with pros"**
2. "Understanding scope…" (1.8 сек) — **NOT "Finding trusted contractors"**
3. "Calculating labor rates for your area…" (1.5 сек) — unchanged
4. "Comparing DIY vs. Pro options…" (1.3 сек) — unchanged
5. "Finalizing your three routes…" (0.7 сек) — "three routes" per POSITIONING signature phrase

Total 6.5 сек (±20% randomized). Copy обновлено под advisor voice в v2.0.

PictureThis (4-6 сек), Rock Identifier (5-8 сек) — industry convention validates our timing.

UX-SPEC §3.2 — motion specs.

---

## 7. Brand voice — calm advisor

POSITIONING §7 задал voice. UX-SPEC §13 закрепил в copy guidelines:

### Voice pillars (5)

1. **Calm, not urgent** — "Here's what it costs. Breathe. Decide." NOT "ACT NOW — water damage $5K!"
2. **Informative, not pushy** — "If you need a pro, here's where." NOT "Our pros standing by."
3. **Honest about limits** — "These are AI estimates — actual prices ±25%." Transparency over promises.
4. **Warm but precise** — "A leaky cartridge. An easy fix." NOT "You got this, king 💪"
5. **Celebrates user agency** — "You chose DIY — here's your guide." NOT "Ready for pro match?"

### Signature phrases (UX-SPEC §13.2)

- "Know the price before the panic" (welcome hero)
- "Three routes forward" (estimate result)
- "Find a pro near you" (pro sheet, factual not salesy)
- "We don't earn from these links" (pro sheet disclaimer — builds trust)
- "You saved $X going DIY" (share moment, retention)

### Anti-copy (never use)

- ❌ "Connect with pros" / "Match with trusted contractors" / "Request quotes"
- ❌ "Pros standing by" / "Your pro network" / "Compare bids"
- ❌ "Vetted" / "Priority pro matching" / "Book now"
- ❌ "Lead submitted" / "A contractor will contact you"

Это язык marketplace, не advisor.

---

## 8. Accessibility + Dark Mode — не negotiable

UX-SPEC §6-7 — mandatory WCAG 2.1 AA:

- **Touch targets** — минимум 44pt (48pt для primary CTAs, 72pt для Pro Match sheet pills)
- **VoiceOver labels** — на все interactive elements, "Three routes" container labeled properly
- **Dynamic Type** — все text styles поддерживают iOS text size scaling до 200%
- **Reduce Motion** — отключает labor illusion animation (процесс всё равно 5-8 сек, просто static overlay)
- **Dark Mode** — token-paired colors, user's photos никогда не инвертируются (photo = product DNA)

Contrast ratios: 7:1 (AAA) primary text, 4.5:1 (AA) secondary, 3:1 interactive.

---

## 9. Error states

4 custom error screens (WIREFRAMES):

- **8.1 No Internet** — offline mode, last 3 cached estimates + "Try when online". NOT generic "no connection" (kills trust).
- **8.5 Blurry Photo** — "We couldn't make out the issue. Retake with more light, or describe in text." Dual fallback.
- **8.6 Out of Scope** — user фоткнул кота. Light "We focus on home repair. Try again?" No shame.
- **8.2/8.3 Permission Denied** — re-request flow via Settings (iOS rule — нельзя retry permission in-app).

---

## 10. Metrics — судим UX по этим числам

Что считаем успехом (FUNNEL v2.0):

| Метрика | Target (US, mature Y2) |
|---|---|
| Install → Onboarding complete | 85% |
| Onboarding → First estimate | 88% |
| Install → Aha (≤90 сек) | 74.8% |
| First estimate → W1 return | 45% |
| W4 retention | 40% |
| Save-to-My-Home | 40% |
| Paid conversion среди exposed D60 | 36% |
| Blended install → paid | 18-25% |
| **Pay-per attach (среди rejecting sub)** | **3%** (new primary tracking) |
| Share savings rate | 15% |
| K-factor | 0.4-0.6 |
| **~~Affiliate click rate~~** | ~~REMOVED~~ |

**Red flags:** W1 return <30% → aha not strong; paid conversion среди exposed <22% → pricing/paywall broken; blended paid <13% → major rework.

---

## 11. Открытые вопросы для Stage 5

Resolve при Stitch design + post-launch:

### Для Ланы (resolved в Stage 5)

1. **Color system** — WIREFRAMES §Handoff дали гипотезу (trust-blue primary, warm accent для DIY/savings). Финализация в Stitch.
2. **Iconography** — SF Symbols для UI chrome + custom 6-10 illustrations для empty states и category cards.
3. **Typography** — SF Pro vs Rounded. Rounded — friendlier (Sugar Quit). Standard — professional. Лана решает.
4. **Welcome screen visual** — photo illustration vs animated scene. Test 3 в Stitch, A/B на Day 1 installs.
5. **Dark mode** — full (все screens) vs partial (main tabs only). Full takes +3-4 days. Голосую full (Emma demographic 35% Dark Mode).

### Для post-launch A/B

1. **3 estimates free** — right number? A/B 2 / 3 / 5.
2. **Labor illusion 5-8 сек** — too long? Test 3-4 сек for repeat users.
3. **Pay-per visibility** — cannibalizes sub? A/B visible vs hidden-until-reject.
4. **Savings anchor vs feature list** в paywall — which converts higher?
5. **Welcome tagline** — "Know the price" vs "Take a photo. Know. Decide." vs "Snap. Know. Decide."

---

## 12. Stage 5 handoff — что Лана получает

В папке `04-ux/` всё необходимое:

- **SCREEN-MAP v2.0** — 42 screens с priority (P0/P1/P2), cross-reference к features
- **USER-FLOWS v2.0** — 7 core flows с ASCII diagrams + decision points
- **WIREFRAMES v2.0** — 19 ASCII wireframes + component library
- **UX-SPEC v2.0** — все interaction specs (haptics, animations, typography, accessibility, copy/voice)
- **FUNNEL v2.0** — expected conversion rates per stage, A/B testing roadmap
- **UX-BRIEF v2.0** (этот документ) — synthesis

### Рекомендуемый порядок Stitch работы

**Week 1:**
1. Design system (colors, typography, spacing) — Stitch prompt base
2. Welcome + Camera Permission + Camera View (1.1, 1.3, 1.4) — core onboarding
3. **First Estimate Result (1.7)** — главный экран приложения. Больше всего времени

**Week 2:**
4. Home Tab + My Home + Estimates Tab (3.1, 3.2.1, 3.3.1)
5. **Soft Paywall (5.1)** — monetization critical
6. **Find-a-Pro Sheet (7.1) — NEW, simplified** — 3 deeplink pills
7. Error states (8.1, 8.5, 8.6)

**Week 3:**
8. 4 context paywalls (Save/Warranty/PDF/Alerts) — было 5
9. Profile / Settings
10. Polish animations + micro-interactions (UX-SPEC §3, §7)

### Stitch-specific

- **Reference images:** PictureThis screenshots для camera UI, Zillow для home dashboard feel. **NOT** Thumbtack (wrong category).
- **Ready prompts** уже в `06-design/stitch-prompts/`
- **Output format:** Stitch → HTML/CSS → screenshots → Stage 6 (код)

---

## 13. Change log v1.0 → v2.0

| Что | v1.0 | v2.0 |
|---|---|---|
| Positioning tagline | "Find trusted pros fast" | **"Know the price before the panic"** |
| Screens total | 47 | **42** (5 pro screens removed, 1 added) |
| Wireframes | 20 | **19** (Pro Match context paywall removed, Screen 18 simplified) |
| Context paywalls | 5 | **4** (Pro Match removed) |
| User flows | 7 | **7** (Flow 4 + Flow 7 fully rewritten) |
| Revenue streams | 4 | **3** (affiliate removed) |
| Y1 revenue / 10K | $14-16K | **$9-11K** |
| Pro Match UI | Marketplace (3 pro cards + quotes + request) | **Deeplink sheet (3 buttons)** |
| Brand voice | Helpful mediator | **Calm advisor** |
| Push copy examples | "Pro Joe responded" | **"You saved $500 this year"** |
| North star share hook | "I found a great plumber" | **"I saved $185 going DIY"** |

---

## 14. Ownership + Next step

**Stage 4 v2.0 owner:** Amanda (team lead, synthesis + review)
**Stage 5 owner:** Лана (design + Stitch)
**Stage 6 owner:** Лана (dev, Expo/React Native)

**Immediate next action for Лана:**

1. Read все 6 docs в `04-ux/` v2.0 + `POSITIONING.md` foundation
2. Read `students_project_steps/05-design/stitch-guide-part-1.md` для Stitch workflow
3. Setup Google Stitch проект "FixIt"
4. Start Week 1 plan — design system → welcome → camera → aha screen
5. Каждый экран → screenshot → commit в `06-design/` → review со мной

**Amanda на связь:**

- Stitch результат не convinces → пересматриваем prompt, не дизайн
- Новые open questions → добавлять в §11, не переделывать UX-SPEC
- User research противоречит гипотезам → Stage 1 revisit, не Stage 4

---

## Итог

UX pipeline v2.0 complete. 6 документов (SCREEN-MAP + USER-FLOWS + WIREFRAMES + UX-SPEC + FUNNEL + этот BRIEF) = ~45K слов. Все решения traced к POSITIONING.md + research docs + rescope logic.

**Критичные правила для Stitch:**

1. Photo-first, utility, не quiz. Emma в anxious state.
2. 60-90 сек до aha. Нет friction, нет signup до value.
3. Labor illusion 5-8 сек — trust critical.
4. Soft paywall, не hard. Free = 3 estimates. Pay-per $2.99 fallback.
5. Find-a-Pro = deeplink sheet (not marketplace UI).
6. Haptics + dark mode + accessibility — mandatory.
7. Brand voice: calm advisor, не marketplace pusher.

Stage 4 v2.0 done. Передаём Лане.

---

**Related docs:**

- [Stage 1 — RESEARCH-BRIEF](../01-research/RESEARCH-BRIEF.md)
- [Stage 2 — POSITIONING](../02-product/POSITIONING.md)
- [Stage 2 — PROBLEM-SOLUTION-FIT](../02-product/PROBLEM-SOLUTION-FIT.md)
- [Stage 3 — PRACTICES-BRIEF](../03-practices/PRACTICES-BRIEF.md)
- [Stage 5 guide — stitch-guide-part-1.md](../../../../students_project_steps/05-design/stitch-guide-part-1.md)
