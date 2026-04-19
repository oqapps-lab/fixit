# POSITIONING.md — FixIt

**Дата:** 2026-04-19
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** Product Definition (post-rescope v2.0)
**Статус:** Final — foundation для Stage 3 + Stage 4 rewrites
**Companion docs:** [CLAUDE.md](../../CLAUDE.md) · [FEATURES.md](./FEATURES.md) · [MONETIZATION.md](./MONETIZATION.md)

---

## TL;DR

Позиционирование FixIt **радикально сместилось** после rescope 2026-04-19. Мы больше не "AI estimate + pro marketplace hybrid". Мы — **чистый AI-advisor утилита** без marketplace.

Новое позиционирование в одну строку:

> **"Take a photo. Know the price. Decide what to do."**

Не "find a plumber". Не "get 3 quotes". Не "our pros will call you". Просто: сфоткал → понял сколько стоит → решил сам что делать с этим знанием.

---

## 1. Старое vs Новое позиционирование

### Старое (v1.0, до 2026-04-19)

**Elevator pitch:** "FixIt is the PictureThis for home repairs — snap a photo, get real prices for DIY / Hybrid / Pro options, with licensed pros available in one tap through our Thumbtack partnership."

**USP:** "We tell you what it costs AND find you the pro."

**Core promise:** Three paths + pro match in one app — we broker the entire repair journey.

**Key feature spotlight:** Pro Match (Feature #6) with 3 local pros, quotes, availability, one-tap request.

### Новое (v2.0, 2026-04-19)

**Elevator pitch:** "FixIt is your home repair advisor in your pocket — snap a photo of what's broken, and in 60 seconds know if it's a $15 DIY fix or a $500 pro job. Then decide with clarity."

**USP:** "Know the price before the panic. Decide with confidence."

**Core promise:** Photo → diagnosis → three priced routes → you choose. We're the confidence-giver, not the marketplace.

**Key feature spotlight:** Cost Estimate Engine (Feature #3) with DIY / Hybrid / Pro breakdown. Pro Match is just a quiet "find one yourself via Thumbtack/Google/Yelp" handoff — not central.

---

## 2. New USP (unique selling proposition)

### Primary USP

**"Know the price before the panic."**

Это основная обещание. Emma в момент "ой, капает" не знает: это $15 или $800? Это срочно или подождёт? Сама починю или нужен мастер? **За 60 секунд FixIt даёт ответ на все три вопроса одновременно.**

### Secondary USPs (поддерживающие)

1. **"Three options, one tap."** DIY / Hybrid / Pro — все три варианта сразу, сравни и выбери. Не "спам нашим мастерам" — а calm, informed decision.
2. **"AI that knows your zip."** Цена в Денвере ≠ цена в Мемфисе. AI учитывает регион автоматически, без партнёрств с retailer'ами.
3. **"No marketplace, no hidden agenda."** Мы не зарабатываем больше если ты выбираешь Pro — значит советуем честно.

### Anti-USPs (чего мы НЕ делаем, намеренно)

- ❌ "Найдём вам 3 мастеров" — не делаем (это Thumbtack, не мы)
- ❌ "Получите quotes от pros" — не делаем (это Angi, не мы)
- ❌ "Мы онбордим проверенных мастеров" — не делаем, никогда
- ❌ "Free estimates from our network" — у нас нет network'а
- ❌ "Compare contractor bids" — нет

**Messaging discipline:** если чья-то фраза звучит как "we connect you with pros" — это НЕ FixIt. FixIt = "we tell you what it costs."

---

## 3. One-liner для разных контекстов

| Контекст | Формулировка |
|---|---|
| **App Store subtitle (30 char)** | "Photo repair cost advisor" |
| **App Store promo text** | "Snap a photo — know the cost in 60 seconds. DIY, hybrid, or pro — with real prices for your zip." |
| **TikTok ad hook** | "Plumber quoted me $800. FixIt said $15 DIY. I almost cried." |
| **Pitch к инвестору** | "PictureThis for home repairs. Photo-AI utility with subscription revenue, no marketplace complexity." |
| **Objection: 'isn't this just Thumbtack?'** | "Thumbtack is a marketplace. FixIt is an advisor. We don't earn from sending you to pros — we earn from helping you decide." |
| **Onboarding welcome screen** | "Know the price before it breaks you." |
| **Re-engagement push** | "Got anything new that needs fixing?" |

---

## 4. Ценностное предложение по personas

Старое позиционирование пыталось продать всем одно и то же ("pro match for everyone"). Новое — нарезает value differently per persona:

### Emma (primary — first-time homeowner, anxious)

**Before:** "Snap a photo, find pros fast."
**After (v2.0):** "Know if it's bad news before you call. Save yourself the rip-off."

Value: **эмоциональная уверенность**. До FixIt Emma звонит trembling. После FixIt — знает диапазон, звонит confident.

### Mike (DIY enthusiast)

**Before:** "See what pros charge so you can DIY cheaper."
**After (v2.0):** "AI-generated DIY guide + shopping list, per your specific problem."

Value: **persona-lization**. Не generic "how to fix a faucet" — а guide конкретно под его проблему.

### Sarah (quote validator — got a quote from pro, wants to verify it's fair)

**Before:** "Get 3 competing quotes on Thumbtack."
**After (v2.0):** "Snap the problem, see what it should cost. If the quote is higher — negotiate."

Value: **quote validation**. FixIt становится "second opinion" перед тем как принять pro's offer.

### Tyler (renter — fixing for deposit recovery)

**Before:** "Pay $2.99 for quick estimate."
**After (v2.0):** "Pay $2.99 once — know exactly which fixes to do before move-out."

Value: **deposit protection**. Tyler не хочет subscribe, но готов заплатить разово за clarity.

### Ronald (senior — age 65+)

**Before:** "Daughter sets this up for dad, he finds a trusted pro."
**After (v2.0):** "Photo → clear answer. No confusing apps, no 10-call carousel."

Value: **simplicity**. Senior-friendly UX, no flood of options.

---

## 5. Key messaging matrix

| Situation | Old message | New message |
|---|---|---|
| First-time open | "FixIt helps you find honest pros and save money" | "FixIt helps you understand what's broken and what it costs" |
| After first estimate | "Ready to find a pro?" | "Here are your three routes. Start with what feels right." |
| Soft paywall | "Unlock unlimited estimates AND priority pro matching" | "Unlock unlimited estimates, saved projects, price alerts" |
| Pro mode card | "Find a trusted pro → we'll handle the match" | "We'll point you to Thumbtack / Google / Yelp — you choose" |
| Home tab greeting | "Welcome back. Need a pro for something?" | "Welcome back. Anything new around the house?" |
| Retention push | "Your weekly pro availability update" | "Spring is coming — three small fixes worth knowing about" |
| Viral share | "I found a great plumber via FixIt" | "FixIt saved me $185 — I did it myself" |

Savings стало новым гео-якорем виральности. Не "found a pro" — "saved $X".

---

## 6. Funnel implications

Позиционирование меняет какие metrics важны:

| Metric | Old priority | New priority | Почему |
|---|---|---|---|
| Install → First estimate | High | **Very high** | Core loop стал центральным |
| Paid conversion | High | **Very high** | Единственный revenue stream |
| Pro Match click-through | High (revenue) | **Low** (just UX) | Больше не affiliate revenue |
| Affiliate click per estimate | Core metric | **Removed** | Нет affiliate |
| Savings-shared per active user | Medium | **High** (viral driver) | "I saved $X" новый share moment |
| DIY success rate | Medium | **High** | Validates "we help decide" promise |
| Home Health check-ins | Low | **Medium** (retention) | Re-engagement hook |

---

## 7. Brand voice

Под новое позиционирование — другой tone:

### Before (marketplace hybrid)

- Помощник-посредник
- "We'll connect you"
- "Our trusted network"
- Friendly but transactional

### After (pure advisor utility)

- Умный нейтральный друг
- "You'll know"
- "Three routes, you decide"
- Calm authority (как дед-мастер объясняет, не как sales rep)

**Voice guidelines:**

1. **Calm, not urgent.** Не "ACT NOW — water damage costs $5K!". Да "Here's what it costs. Breathe. Decide."
2. **Informative, not pushy.** Не "Our pros are standing by." Да "If you need a pro, here's where to find one."
3. **Honest about limits.** "These are AI estimates — actual prices vary by ±25%."
4. **Warm but precise.** "A leaky cartridge. An easy fix." — не "You got this, king 💪"
5. **Celebrates user agency.** "You chose DIY — here's your guide." — не "Ready for pro match?"

---

## 8. Competitive re-positioning

Раньше мы могли столкнуться с Thumbtack на их поле (pro marketplace). Теперь — **сайтом Thumbtack пользуются ПОСЛЕ того как мы дали им ответ**. Мы сидим выше по funnel.

**Competitive map:**

```
User has a home problem
         ↓
    ┌────────┐
    │ FixIt  │ ← Photo → diagnosis → 3 priced routes → decide
    └────────┘
         ↓
   ┌──────────────┐
   │ What next?   │
   └──────────────┘
    ↓    ↓    ↓
  DIY   Thumbtack/Yelp   Amazon/Home Depot
        (they still serve)   (we deeplink)
```

FixIt = **pre-funnel consultation**. Before you call Thumbtack. Before you buy materials. Before you panic.

Эта позиция:
- Меньше риска конфликта с Thumbtack (мы им направляем users, не конкурируем)
- Возможен future partnership (если Thumbtack одобрит affiliate tag — мы его просто добавляем к URL)
- Уникальная — Thumbtack сам эту задачу решать не будет (они пускают сразу к pros)

---

## 9. Tagline options (для A/B testing)

Варианты главного tagline для welcome screen + App Store:

1. **"Know the price before the panic."** (primary — Emma emotional)
2. **"Photo → price → path forward."** (utility — Mike functional)
3. **"Three routes. Real prices. No marketplace."** (positioning — Sarah trust)
4. **"Your home repair advisor in your pocket."** (general)
5. **"Snap. Know. Decide."** (minimal)

**Рекомендация для MVP launch:** #1 primary. Если не резонирует — A/B с #2 (более pragmatic) после 1000 installs.

---

## 10. Как это меняет downstream docs

Foundation для переделки:

| Stage 3 / 4 doc | Что меняется |
|---|---|
| ONBOARDING-RESEARCH | Убираем "we'll find you pros" messaging. Добавляем "know what it costs in 60 sec" как core promise. Welcome screen copy переписан под новый tagline. |
| PAYWALL-RESEARCH | Убираем messaging про "unlock pro priority". Добавляем "unlimited estimates + saved projects + PDF export + price alerts" как Pro tier value. No affiliate backstop в расчётах. |
| RETENTION-RESEARCH | Push copy смещается с "new pros in your area" на "seasonal maintenance" + "savings anniversary" + "home health check-in". |
| ASO-RESEARCH | Keyword strategy — "home repair cost" primary (не "find plumber"). Убираем keywords типа "plumber near me" — это не наши. |
| PRACTICES-BRIEF | Synthesis под новое positioning. |
| USER-FLOWS | Flow 4 (Pro Match — Sarah) переписан как simple deeplink. Flow 7 (Pro Match → Thumbtack Affiliate) удалён или переработан. |
| SCREEN-MAP | Pro Match screens упрощены — bottom sheet с 3 кнопками вместо полной pro marketplace UI. |
| WIREFRAMES | Wireframe Screen 18 (Pro Match Results) переделан — 3 buttons вместо 3 pro cards. |
| UX-SPEC | Voice/copy updates — new brand voice. |
| FUNNEL | Affiliate stream removed. Pro Match click-through больше не tracked как revenue metric. |
| UX-BRIEF | Synthesis под new positioning. |

---

## 11. Decision log

| Дата | Решение | Причина |
|---|---|---|
| 2026-04-17 | Initial positioning: "PictureThis + Thumbtack hybrid" | Covers max audience, dual revenue streams |
| 2026-04-19 | **Rescope: pure AI-advisor utility, no marketplace** | Partnership blockers for solo-dev. Ship sooner with cleaner positioning. |

---

**Next step:** переписать Stage 3 (Practices) + Stage 4 (UX) docs under this positioning. Параллельная работа — 4-5 docs в каждом этапе.

**Approval:** Amanda 2026-04-19.
