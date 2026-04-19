# PAYWALL-RESEARCH.md — FixIt

**Дата:** 19 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** Practices Research (Stage 3, post-rescope v2.0)
**Автор:** Product Team (Лана + Amanda)
**Статус:** Final v2.0 — rewritten под AI-only monetization (no partnerships, no affiliate)
**Companion docs:** [MONETIZATION.md](../02-product/MONETIZATION.md) | [POSITIONING.md](../02-product/POSITIONING.md) | [FEATURES.md](../02-product/FEATURES.md) | [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) | [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) | [RETENTION-RESEARCH.md](./RETENTION-RESEARCH.md)

---

## TL;DR

**Рекомендация:** Soft paywall после 3 free estimates + 4 контекстных paywalls на премиум-фичах. **Hard paywall (first-screen) отвергнут** для FixIt. Target conversion **18-25% blended install→paid на D60** — в диапазоне PictureThis (20%) и RevenueCat H&F benchmark (Adapty 11.2%).

**Ключевые решения (v2.0 post-rescope):**
- **Модель:** Hybrid — soft paywall (trigger: hit лимита 3 estimates/mo) + 4 context paywalls (premium features) + time-based nudges (D14, D30)
- **Single revenue stream:** subscription + pay-per. NO affiliate backstop, NO Thumbtack lead revenue.
- **Pricing на paywall:** **$9.99/mo vs $49.99/yr (58% annual savings), annual pre-selected**
- **Pay-per fallback:** $2.99 single estimate для non-subscribers
- **NO trial** (freemium does the job — 3 free estimates выполняют роль trial)
- **A/B priority:** free-tier limit > pricing > annual framing > CTA copy

**Почему НЕ hard paywall:** FixIt — утилита с infrequent use pattern (3-10 repairs/year, не daily). Emma (primary persona) хочет сначала увидеть value ("photo → DIY за $15 вместо quote за $800"). Hard paywall убьёт install→active conversion на 60-70% без proven brand equity.

**Почему paywall strategy стал проще чем в v1.0:** мы убрали affiliate revenue cushion. Раньше можно было think "80% free users не subscribe, но affiliate clicks + lead fees дают $8-15/user/yr". Теперь free user = $0.05/user/yr (только Amazon Associates bonus). Это **повышает importance каждой paid conversion**, но не меняет фундаментальной логики: soft paywall после value demonstration.

**Ожидаемая экономика (v2.0):** Blended 20% paying conversion × $47 paid ARPU = **~$9.40/install blended revenue** (vs $11 в v1.0 plan с affiliate). Paywall impressions target: 1.5-2.0 exposure per free user в первые 60 дней.

---

## 1. Типы Paywall — Industry Benchmarks

### 1.1 Сравнение моделей (с данными 2024-2026)

| Модель | D30-D60 conversion | RPI (Revenue per Install) D60 | Когда работает | Для FixIt? |
|---|---|---|---|---|
| **Hard paywall (first-screen)** | 10.7-12.1% (RevenueCat 2025) | $3.09 (8x выше freemium) | Established brands (Netflix, Spotify); quiz-heavy apps (Noom, Flo); acute pain apps (Rootd) | **REJECTED** |
| **Soft paywall (после value experience)** | 3.5% passive, 18-25% среди hit-limit users | $0.85-1.50 | Freemium utility, infrequent use, долгая воронка | **RECOMMENDED** |
| **Freemium без paywall push** | 2.1-2.18% passive | $0.38 | Massive virality-driven apps | Too passive |
| **Context paywall (premium action)** | 10-15% среди trigger events | Higher LTV per converter | Supplement для soft | **YES (secondary)** |
| **Hybrid soft + context** | Combined 18-25% D60 | $1.10-1.50 blended | Multi-persona apps с differential use patterns | **RECOMMENDED (chosen)** |

Sources: [RevenueCat State of Subscription 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/), [Adapty 2026](https://adapty.io/state-of-in-app-subscriptions/), [Airbridge Hard vs Soft Paywall](https://www.airbridge.io/en/blog/hard-vs-soft-paywalls), paywall.utf8.txt §2.

### 1.2 Почему Hard Paywall REJECTED для FixIt

Hard paywall (показ подписки до onboarding/первого experience) конвертирует в 5-6x лучше soft по установке → оплата — НО только при 3 условиях, ни одно из которых у FixIt НЕ выполнено:

1. **Proven brand / high intent install.** Netflix, Spotify, Duolingo — пользователь уже хочет продукт. FixIt — unknown brand, 0% recognition в момент install. Intent формируется через experience, а не preexisting awareness.

2. **Quiz-driven psychological commitment (Noom/Flo/Fabulous model).** 80+ экранов quiz строят эмоциональную инвестицию, оправдывающую paywall до value moment. FixIt onboarding — 3 screen max ("value prop → location permission → first photo"). Нет базы для hard paywall.

3. **Immediate acute critical value.** Rootd (panic attack) — пользователь уже в острой боли при install, готов платить instantly (и это объясняет их 5x revenue lift при hard paywall). FixIt user — calm problem-solver ("кран капает, посмотрим что скажет приложение") — не emergency mindset в 80% cases.

**Дополнительный risk:** Install → active funnel падает на 60-70% с hard paywall (Airbridge). Для FixIt, где word-of-mouth через Emma ("я сэкономила $200, скачай") = основной growth lever, убить install→active = убить virality в source.

**В v2.0 rescope этот аргумент только УСИЛИВАЕТСЯ:** без affiliate revenue каждый free user всё равно представляет value (viral coefficient, future conversion potential). Cутим affiliate revenue убрали — но viral importance free users осталась.

### 1.3 Почему Soft Paywall RECOMMENDED

Три ключевых аргумента:

**A. Infrequent use pattern.** Emma делает 5-10 repairs/year, не daily app opens. Hard paywall в Day 0 — "зачем платить если я не знаю буду ли пользоваться". Soft paywall — "я уже делал 3 estimates, они были полезны, теперь upgrade = easy decision".

**B. Value-first experience убеждает.** "Wow moment" после первого estimate (Emma увидела что DIY возможен, "plumber quoted $800, FixIt said $15") — **эмоциональный anchor** для будущего subscription decision. Без этого момента пользователь не понимает что платит. Core positioning — "Know the price before the panic" — требует демонстрации перед commitment.

**C. Word-of-mouth через free users (NEW v2.0 rationale).** В v1.0 мы писали "80% free users никогда не subscribe, но каждый генерирует $0.85/year через affiliate". В v2.0 affiliate ushel — но **free users всё ещё драйвят virality**. Emma говорит подруге "FixIt сказал что это $15 DIY" — подруга устанавливает — **возможно converts** (viral install often has higher conversion intent). Hard paywall убил бы этот viral pipeline.

**Trade-off:** D60 raw conversion ниже (3.5% vs 10.7% для hard), но overall revenue higher благодаря:
- Higher install→active (+85-90% vs 30-40%)
- Viral coefficient (free Emma → 2-3 друзей скачивают)
- Cleaner reputation (no "pushy money-first" perception) → higher App Store rating → higher organic installs

### 1.4 Context Paywall как дополнение

Вторичный layer — показ paywall при попытке premium action. **В v2.0 мы убрали 5-й context paywall (Pro Match) — см. §1.5.**

| # | Action | Context paywall copy | Target conversion |
|---|---|---|---|
| **1** | **Save project** (after 1 free save) | "Unlock unlimited saves для tracking your home projects" | 12-15% |
| **2** | **Warranty tracker** (v1.5 feature preview в MVP) | "Never miss a warranty expiration again" | 8-10% |
| **3** | **PDF export** of estimate/project | "Share polished reports с contractor, landlord, insurance" | 10-12% |
| **4** | **Price alerts** ("notify me when materials drop") | "Get alerts когда HVAC/plumbing prices drop in your zip" | 6-9% |

Context paywalls имеют LOWER raw conversion (~6-15%), но HIGHER LTV per converter — пользователь коммитится к specific value, не к vague "premium".

### 1.5 Почему 5-й context paywall (Pro Match) УДАЛЁН в v2.0

В v1.0 был пятый context paywall: "Pro Match — priority matching с verified contractors, $49.99/year". Это работало в marketplace hybrid model когда Thumbtack partnership давал affiliate revenue.

**В v2.0 Pro Match is just a deeplink** (Feature #6 in FEATURES.md). User taps "Find a pro" → bottom sheet с 3 кнопками (Thumbtack / Google Maps / Yelp) → leaves FixIt. **Это FREE feature для всех.**

Причины удаления paywall на Pro Match:
- No affiliate revenue — мы не зарабатываем с клика, значит нет смысла блокировать его за subscription
- Positioning violation — "we don't earn from sending you to pros" (POSITIONING.md §2). Paywall contradicts это promise
- UX friction — пользователь который хочет pro, нужен immediately. Ставить paywall между "I need a plumber" и "here's Google Maps" = убить trust
- Simpler tier story — 4 premium features вместо 5, clearer value prop ("unlimited + saved + PDF + alerts")

**Что убрали из paywall copy (v1.0 → v2.0):**
- ❌ "Priority pro matching"
- ❌ "Pre-vetted quotes from our pro network"
- ❌ "Verified contractors в your zip"
- ✅ "Unlimited estimates + saved projects + PDF export + price alerts"

---

## 2. Paywall Screen Structure — Best Practices

### 2.1 Critical elements (must-have)

На основе анализа Noom, Calm, PictureThis, Fitbod, Headspace, Finch, Rootd и best practices [Adapty](https://adapty.io/blog/how-to-design-a-paywall-for-a-mobile-app/), [Apphud](https://apphud.com/blog/design-high-converting-subscription-app-paywalls), [Superwall](https://superwall.com/blog/superwall-best-practices-winning-paywall-strategies-and-experiments-to/), plus paywall.utf8.txt:

1. **Emotional hook (personalized)** — "You've saved $247 so far с FixIt. Keep going" — **+17% conversion** (Adapty). Для Emma: акцент на empowerment + savings. Pull from user history: "3 estimates done, total savings $X vs pro quotes." Если нет history — generic "Know the price before the panic."

2. **Clear tier comparison (максимум 2-3 options)** — Monthly vs Annual (default pre-selected) + Pay-per fallback. **>3 options = decision paralysis** (закон Хика-Хаймана). Family tier убрано из MVP paywall (v1.5+).

3. **Dominant CTA button (benefit-driven copy)** — НЕ "Subscribe", А **"Unlock Unlimited Estimates"** или "Keep Knowing Prices". Один яркий элемент на экране.

4. **Social proof (concrete numbers)** — "Join 12,000+ homeowners who plan smarter" + 1-2 testimonial snippets. Конкретные числа > абстрактные заявления. Social proof **+72% install-to-trial** (Adapty 2026).

5. **Money-back reassurance / cancel anytime** — "Cancel в 1 клик в любой момент" — снижает checkout anxiety. Headspace "Honest Paywall" approach +23% conversion.

6. **Small print про subscription terms** — соответствие App Store Guidelines (required), но не доминирующий.

7. **Price anchoring** — "$49.99/year = $4.17/month — less than one pro visit." Per paywall.utf8.txt §6 — anchor к "cheaper than альтернатива" работает мощно ("дешевле чем сеанс у психолога" — здесь "дешевле чем one plumber call").

### 2.2 Anti-patterns — ИЗБЕГАЕМ

- **Dark patterns** — скрытая cancel кнопка, auto-renew без предупреждения, pre-selected expensive option без flagging. FixIt не идёт этим путём (reputation risk — мы "honest advisor" per POSITIONING.md §7).
- **Confirm-shaming на opt-out** — "No, I prefer overpaying" на cancel кнопке. **Avoid.** Use neutral "Not now, keep free tier."
- **15+ features list** — overwhelming. Максимум 4-5 bullet-поинтов.
- **Stock photos** — low trust. FixIt uses real home repair before/after imagery.
- **Complex tier comparison (>3 options)** — увеличивает bounce.
- **Forced registration до paywall** — raises friction. Paywall shows до mandatory signup (guest mode OK).
- **"Skip this offer" маленькими буквами** — дешёвый трюк, App Store может reject.
- **Fake urgency timers** — "offer expires in 5:00" если timer не real. FixIt is honest utility.

### 2.3 Wireframe-level mockup — FixIt Soft Paywall (Primary, v2.0)

```
┌─────────────────────────────────────┐
│  [← X close]                        │
│                                     │
│  [ANIMATED HEADER]                  │  ← Lottie animation
│  Recent estimate hero image         │  (photo → 3 estimate cards)
│  (photo of repair, subtle anim)     │
│                                     │
│  You've saved $247                  │  ← PERSONALIZED emotional hook
│  on 3 repairs with FixIt            │  (pulled from user history)
│                                     │
│  ─────────────────────────────      │
│                                     │
│  Keep knowing the price:            │
│                                     │
│  ✓ Unlimited estimates              │  ← 4 clear benefits
│  ✓ Save every project               │     (v2.0: NO "priority pro")
│  ✓ PDF export (share w/ contractor) │
│  ✓ Price alerts (your zip)          │
│                                     │
│  ─────────────────────────────      │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ● ANNUAL (BEST VALUE)        │   │  ← PRE-SELECTED (default)
│  │   $49.99/year                │   │  visually highlighted
│  │   = $4.17/month              │   │  "2 months free"
│  │   SAVE 58% vs monthly        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ○ Monthly                    │   │
│  │   $9.99/month                │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ○ Pay as you go              │   │  ← Pay-per fallback
│  │   $2.99 per estimate         │   │  (visible но not pushed)
│  └─────────────────────────────┘   │
│                                     │
│  ─────────────────────────────      │
│                                     │
│  ★★★★★ 4.8 — 12,400 reviews        │  ← Social proof
│  "FixIt saved me $400 on a sink     │
│  repair" — Emma, Denver             │
│                                     │
│  ─────────────────────────────      │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   UNLOCK UNLIMITED ACCESS   │   │  ← DOMINANT CTA
│  │   [orange/brand color]       │   │
│  └─────────────────────────────┘   │
│                                     │
│  Cancel anytime · Restore purchase  │  ← Trust signals
│  Terms · Privacy                    │
└─────────────────────────────────────┘
```

**Changes v1.0 → v2.0 noticable on screen:**
- Monthly price $7.99 → **$9.99** (per MONETIZATION.md v2.0 — matches iFixit Pro benchmark, stakes-appropriate)
- Annual discount "48% off" → **"58% off" / "2 months free"**
- 4th benefit "Priority pro matching" → **"Price alerts"**
- Benefits list reordered: unlimited first, saved projects second, PDF third, price alerts fourth

### 2.4 Wireframe — FixIt Context Paywall (Secondary)

Срабатывает при tap на premium feature. Пример для "Save to My Home":

```
┌─────────────────────────────────────┐
│  [← back]                           │
│                                     │
│  Save projects to "My Home"         │  ← Context-specific hook
│                                     │
│  Track every repair, every          │
│  warranty, every estimate —         │
│  organized по room, by date.        │
│                                     │
│  [Screenshot of "My Home" UI]       │  ← Demo visual
│                                     │
│  Unlock with FixIt Pro:             │
│  ✓ Save unlimited projects          │
│  ✓ PDF export для insurance         │
│  ✓ Price alerts                     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Try Pro — $49.99/year      │   │  ← Single dominant option
│  │  (= $4.17/month)             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [ small link: Other plans →]       │  ← Monthly/pay-per hidden
│                                     │
│  Not now, thanks                    │  ← Easy exit (no dark pattern)
└─────────────────────────────────────┘
```

Context paywall имеет ONE dominant option (annual) — per Mojo precedent (+15-20% annual uptake через этот паттерн), paywall.utf8.txt §1.

---

## 3. Pricing Tiers — Validated Through Competitor Analysis

### 3.1 FixIt tier structure (v2.0 post-rescope)

Из MONETIZATION.md §2:

| Tier | Price | Positioning | Target persona |
|---|---|---|---|
| **Free** | $0 | 3 estimates/mo, basic DIY/Hybrid/Pro output, 1 saved project, community-tier AI (Haiku) | Top-of-funnel всех, Tyler's occasional use |
| **Pro Monthly** | **$9.99/mo** | Unlimited estimates, Sonnet AI (higher accuracy), unlimited saved projects, PDF export, price alerts | Mike, Emma flex, month-to-month trial |
| **Pro Annual** | **$49.99/yr (58% off)** | Всё Pro + early access new features | Emma, Sarah, Ronald (via daughter) |
| **Pay-per** | $2.99/estimate | Single estimate без subscription | Tyler, Ronald one-time, casual |
| ~~Family tier~~ | ~~Removed from MVP paywall~~ | Reserved для v1.5+ post-PMF | Property managers, multi-home |
| ~~Power tier~~ | ~~Removed~~ | Не нужен в v2.0 — single Pro tier sufficient | — |

**Key v2.0 changes:**
- Monthly: **$7.99 → $9.99** (match iFixit Pro; stakes higher чем plant ID, правомерно premium)
- Annual: **48% → 58% discount** ($49.99 stays, monthly moved up, discount widened)
- Family tier: **removed from MVP** (simplicity, post-PMF v1.5)
- Power tier: **removed** (4 premium features fit in single Pro tier, no need для split)

### 3.2 Pricing psychology validation

- **$9.99/mo** — under $10 psychological threshold (Anderson & Simester research: "just under $10" sweet spot). Matches iFixit Pro ($9.99), Adapty H&F upper quartile. Ниже Calm ($12.99) — we're utility, не premium wellness.
- **$49.99/yr** — anchors к $119.88 monthly × 12 → showcases "save $70 = 2 months free framing." RevenueCat H&F 2026 median annual $38.42, upper quartile $46-50 — FixIt в upper quartile = premium-justified positioning.
- **$2.99 pay-per** — impulse threshold. Ниже $3 — "I won't even think about it." Matches PictureThis one-off pattern.
- **58% annual savings** — больше типичного 40-50% (Finch 43%, Rootd 50%), но оправдано: мы хотим push annual hard to reduce churn (annual 60%+ lower churn per DEV Community, RevenueCat).

### 3.3 Annual framing — "2 months free" WIN

Per paywall.utf8.txt §6 and prior research, A/B test expectations:

| Framing | Expected Annual uptake | Risk |
|---|---|---|
| "Save 58%" | Baseline | Abstract %, requires mental math |
| "$4.17/mo (billed annually)" | +5-8% | Requires division |
| **"2 months free"** | +10-15% (predicted winner) | Easiest parse, concrete |
| "Save $70/year" | +5% | Concrete но anchors к monthly |

**Primary framing on paywall:** combo — "$49.99/year · 2 months free" с secondary "($4.17/month)" as sub-text. Test as A/B post-launch.

### 3.4 A/B tests priority (v2.0)

| Priority | Test | Variants | Hypothesis | Success metric |
|---|---|---|---|---|
| **1** | **Free tier limit** | 2 / **3** / 5 estimates/mo | 3 = sweet spot (per MONETIZATION.md §9) | Free→Paid D60 × Retention D90 |
| **2** | **Monthly price** | $7.99 / **$9.99** / $11.99 | $9.99 optimal volume × ARPU | D90 Revenue per Install |
| **3** | **Annual price** | $39.99 / **$49.99** / $59.99 | $49.99 under "$50 psychological" while premium | Annual % of paid |
| **4** | **Annual framing** | "Save 58%" / **"2 months free"** / "$4.17/mo" | "2 months free" wins (easiest parse) | Annual uptake |
| **5** | **Pay-per inclusion** | Hide / Show prominent / Show minimal | Minimal — avoid cannibalizing sub | Total revenue per paywall exposure |
| **6** | **Paywall trigger timing** | After 2 / **3** / 4 estimates | 3 = PictureThis proven | Conversion + churn |
| **7** | **CTA copy** | "Upgrade" / "Keep Knowing Prices" / "Unlock Unlimited" / "Go Pro" | Benefit-driven wins | Tap rate |
| **8** | **Social proof copy** | Numbers only / Testimonial / Reviews 4.8★ / Combo | Combo wins | CTR |

Adapty research: pricing experiments дают **2-5x больший uplift** чем визуальные — поэтому priority 1-4 = pricing/limits.

---

## 4. Paywall Triggers — When to Show

### 4.1 Primary triggers (soft paywall)

**Trigger 1: Free limit hit (highest conversion moment)**
- User уже has experienced value (did 3 estimates)
- Context clear ("you want a 4th estimate — upgrade")
- Expected conversion: 18-25% среди hitters (PictureThis 20% benchmark)
- **Copy:** "You've used all 3 free estimates this month. Upgrade for unlimited — or pay $2.99 for just this one."
- **Screen:** Primary soft paywall (§2.3)

**Trigger 2: Premium feature click (context paywall)**
- User taps "Save project" (after 1 free save), "Warranty Tracker", "PDF Export", or "Price Alerts"
- Expected conversion: 6-15% среди trigger events (varies по feature)
- **Copy:** feature-specific ("Save unlimited projects с Pro", "Export polished PDF для insurance", etc.)
- **Screen:** Context paywall (§2.4)
- **NOT triggered by "Find a pro"** — deeplink is free (v2.0 change)

### 4.2 Secondary triggers (time-based nudges)

**Trigger 3: After 14 days of engagement (low-pressure)**
- User active, но не hit limit
- "Your value so far: $X saved. Upgrade to lock it in?"
- Expected conversion: 3-5% (low but positive)
- Shown **once** (не repeated spam)

**Trigger 4: Re-engagement (day 30+ returner)**
- Return user после 7+ дней absence
- "Welcome back. Continue free (1 estimate left this month), or unlock Pro?"
- Expected conversion: 5-8% среди returners

**Trigger 5: Second exposure for non-converters**
- User dismissed paywall 1x — shown again в day 45-60
- Many free users нуждаются в 2-3 exposures to convert (Adapty freemium data: 23% conversions happen 6+ weeks after install)
- Target total exposures: **1.5-2.0 per free user** в первые 90 дней

### 4.3 DO NOT trigger

- **На splash screen / первый open** — противоречит soft paywall rationale, убивает install→active, убивает virality
- **В середине estimate flow** — UX violation, пользователь не готов
- **Каждый возврат app** — spam, leads to app deletion
- **После negative experience** (estimate не helpful) — неэтично
- **На "Find a Pro" tap** — free feature (v2.0 change, см. §1.5)

### 4.4 Trigger sequencing timeline

```
Day 0 — Install, onboarding (3 screens), first estimate. Wow moment.
Day 0-14 — Natural use (1-3 free estimates, NO paywall push).
Day 14 — IF engaged, low-pressure nudge #1 (time-based Trigger 3).
Day X — WHEN hit limit (typically day 15-25 for active users) → SOFT PAYWALL (primary exposure).
Day 30-45 — Context paywalls as user tries premium features (Save / Warranty / PDF / Alerts).
Day 45-60 — IF still not converted + still active → second soft paywall exposure.
Day 60+ — Re-engagement paywalls при return after absence.
```

---

## 5. Emma's Paywall Journey (Primary Persona, v2.0)

Emma — primary target, detailed journey validates entire paywall strategy.

**Day 1:** Install (discovered через TikTok: "plumber quoted me $800, FixIt said $15"). Onboarding 3-screen → first estimate (leaky faucet). AI выдаёт DIY/Hybrid/Pro options. Emma выбирает DIY, сэкономила $150. **Wow moment locked in.**

**Day 3-5:** Garage door squeak → second estimate. Emma уверенно решает сама. **Experience reinforced.** Она показывает FixIt подруге Jessica — viral install (free, no paywall seen yet).

**Day 10-14:** Bathroom vent fan — 3rd estimate. Потратила 3/3 free limit. Приложение feels useful, она пока просто enjoys free tier.

**Day 15-20:** Emma видит clogged drain → хочет 4th estimate → **SOFT PAYWALL TRIGGERED**. 

- Screen: "You've saved $X so far на 3 repairs. Keep knowing the price."
- Annual $49.99 pre-selected ("2 months free" framing).
- Monthly $9.99 alternative.
- Pay-per $2.99 fallback (visible, not pushed).
- Emma's path:
  - **22% convert immediately** (between PictureThis 20% и Adapty 25% upper bound)
  - **~8% choose pay-per** (quick $2.99 для немедленной нужды)
  - **~70% close paywall** (not ready commit, continue in free tier)

**Day 20-40 (если не converted):**
- Seasonal push ("spring maintenance season!") → re-engages
- Context paywall (Emma пытается save 2nd project после 1 free save) → 12% conversion chance
- Context paywall (Emma tries PDF export для insurance claim) → 10-12% conversion

**Day 45-60:**
- Second soft paywall exposure с refreshed value prop ("you're still with us — last chance at annual discount?")
- Many free users need 2-3 exposures (Adapty data)
- Cumulative conversion reaches **20-24% by D60** (slightly below v1.0's 25% because no affiliate cushion — every non-converter genuinely не generates revenue in v2.0, beyond Amazon Associates pennies)

**Day 60-180 (если still free):**
- Continues as free user generating ~$0.05/year Amazon Associates revenue (negligible direct, но real)
- Still represents viral value ("моя подруга скачала тоже")
- May convert at seasonal peaks (fall HVAC prep, spring plumbing)

### 5.1 Emma-specific copy (v2.0)

- **Empowering tone:** "You've saved $247 so far with FixIt"
- **Agency-focused:** "Unlock your home project workspace — unlimited estimates, saved forever"
- **Peer validation:** "Join 12,000+ homeowners who know the price"
- **Honest anti-marketplace positioning:** "No sales calls. No pro fees. Just honest AI estimates."
- НЕ: patronizing, doom-based, aggressive urgency, "we'll find you pros" (marketplace language from v1.0 REMOVED)

---

## 6. Annual vs Monthly Strategy

### 6.1 Industry pattern data

- **40-60% подписчиков выбирают annual** when both presented (Airbridge: добавление annual → +31% к annual uptake vs solo monthly)
- **RevenueCat H&F 2026:** 60.6% revenue от annual plans, 67% subscribers prefer annual
- **Annual reduces churn by 60%+** — monthly 2-year retention 6.7% vs annual 36% (DEV Community)
- **Annual = lower CAC payback** (upfront cash, более predictable LTV)

### 6.2 FixIt approach (v2.0)

**Paywall defaults:**
- Annual pre-selected (radio button checked)
- Annual card visually highlighted ("BEST VALUE" badge + "2 months free")
- Savings prominent: "$49.99/year vs $119.88 if monthly"
- Daily equivalent: "= $4.17/month = less than one takeout lunch per month"

**But monthly still visible:**
- Monthly option available (not hidden под "other plans")
- For Emma flex cohort (30% who prefer monthly initially) — trial-like psychology
- After 6 months of monthly subscription → "Upgrade to annual, save $70" prompt (retention/upgrade motion)

### 6.3 Annual discount 58% — aggressive, intentional

В v1.0 был 48% discount ($7.99 monthly × 12 = $95.88 → $49.99 = 48% off).
В v2.0 discount стал 58% ($9.99 × 12 = $119.88 → $49.99 = 58% off).

**Почему agressive?**
1. **Без affiliate backstop** — каждый paying user critically valuable, annual reduces churn by 60%+
2. **"2 months free" framing** — лучше парсится чем abstract %, easier mental model
3. **Competitor benchmark:** Finch 43%, Rootd 50%, iFixit Pro не имеет annual discount — 58% differentiates
4. **Retention math:** annual sub LTV $80 vs monthly $48 (MONETIZATION.md §5). Annual worth investing in via discount.

**Risk:** too-aggressive discount может cheapen perceived value. Mitigation — framing as "2 months free" instead of "-58%" keeps it feeling premium.

---

## 7. Free Trial Consideration — NO TRIAL (v2.0 decision)

### 7.1 Option A: 7-day free trial (then $9.99/mo) — REJECTED

**Pros:**
- Benchmarks: 35-49.9% trial→paid (RevenueCat H&F 2026)
- 7-day = sweet spot (52% H&F apps use, Adapty)
- Higher Revenue per Install upper bound

**Cons:**
- Lower install rate (trial card requirement raises friction)
- Emma's infrequent use pattern (3-10 repairs/year) doesn't match daily-use trial psychology
- Critical 0-day cancellation spike: 55% of 3-day trial cancels happen Day 0
- **Auto-charge friction** — user signs up, forgets, gets charged, refund complaint, 1-star review. For FixIt (honest utility positioning) — это reputation risk мы avoid.

### 7.2 Option B: Freemium, no trial (CHOSEN for v2.0)

**Pros:**
- Low signup friction (matches Emma's casual discovery)
- Free estimates ARE the trial — 3 estimates perform same role
- Better word-of-mouth viability (free forever base)
- **No auto-charge trap** — user pays only when explicitly decides
- Matches POSITIONING.md §7 "calm authority, not pushy" voice

**Cons:**
- Slower direct monetization curve
- D60 conversion lower than trial model (but still 18-25% is healthy)

**Why recommended v2.0:** Emma's persona — "I'll see if it's useful, then decide." Trial feels artificial because use is sporadic. Freemium + soft paywall = natural decision point when she hits limit. **Plus — in v2.0 we removed affiliate backstop, so every paying user matters more; trial-cancel churn would hurt net revenue disproportionately.**

### 7.3 Option C: Hybrid — post-launch A/B test (future, не MVP)

Phase 3+ experiment (month 6+):
- Control: freemium (3 estimates/mo, no trial)
- Variant: freemium + optional "Try Pro free 7 days" button on paywall
- Metric: D60 net revenue per install
- If variant wins by >10%, adopt hybrid

**Expected result:** likely +2-4% conversion lift, но also +3-5% refund/cancellation rate. Net revenue impact ambiguous. Low priority for MVP.

### 7.4 Decision

**Phase 1 (launch to month 3): Option B (freemium no trial).** Clean funnel, measure baseline.

**Phase 3 (month 6+):** Optional hybrid trial as A/B. Data-driven decision.

---

## 8. Subscription Terms & Compliance

### 8.1 Required elements (App Store / Google Play)

- Clear **auto-renew language** — "Subscription renews automatically unless cancelled 24h before period ends"
- Explicit **price** per period
- **Duration** of subscription
- **Cancellation instructions** (how to manage via system settings)
- **Privacy policy + Terms** link
- **Restore purchase** button (iOS critical)

### 8.2 Best practices (beyond minimum)

- **One-tap cancellation** inside app (deep-link to iOS Subscriptions) — builds trust, matches honest positioning
- **Refund-friendly policy** — auto-refund within 48 hours of accidental subscribe
- **Receipt email** immediately после purchase
- **Renewal reminder** email за 3 дня до annual renewal (reduce chargebacks)
- **Pause subscription** option (for seasonal users — keeps LTV через dormant periods)
- **Amazon Associates disclosure** in footer (required for Amazon deeplinks per FTC) — simple line "As an Amazon Associate we earn from qualifying purchases." No per-item clutter.

### 8.3 Dark patterns ИЗБЕГАЕМ (reiterated — critical)

- Hidden cancel flow (>3 steps) — No
- Pre-checked paid option без disclosure — No
- Misleading "free" when immediate payment required — No
- Auto-upgrade tier без consent — No
- Fake urgency timers — No
- Confirm-shaming on opt-out — No

FixIt reputation critical — **"we don't earn more when you pick Pro — so we advise honestly" (POSITIONING.md §2).** Dark patterns directly conflict с core USP.

---

## 9. Pay-per-Estimate Strategy (v2.0)

### 9.1 Why pay-per matters

Covers users who **explicitly don't want subscription** but occasionally need FixIt:

- **Tyler (renter)** — infrequent use (1-2 estimates per lease cycle), subscription доесн't match pattern
- **Casual curious users** — "once in a while" checkers
- **Ronald's daughter** — "I'll buy parent one estimate" gift use case
- **Abandonment recovery** — ~15% users who reject subscription will pay $2.99 in the moment if alternative is "wait 30 days or leave"

### 9.2 Pay-per offerings (MVP)

| Product | Price | Target use case |
|---|---|---|
| **Single estimate** | **$2.99** | Tyler one-off, casual users, subscription-rejecter recovery |
| ~~Project analysis bundle~~ | — | Removed from MVP (simplicity), v1.5+ |
| ~~Move-out bundle~~ | — | v1.5 Tyler-specific feature (not in MVP paywall) |

**v2.0 simplification:** we dropped multi-SKU pay-per pricing complexity. Just one option — $2.99 single estimate. Easier paywall UX, easier to A/B test.

### 9.3 Integration with paywall

Pay-per **visible on soft paywall as fallback**:

- Annual (default, highlighted, "2 months free")
- Monthly ($9.99)
- Pay as you go ($2.99 single) ← visible but not pushed

Copy: "Don't want to commit? This estimate only $2.99."

**Conversion path:** If user bought 2-3 pay-per в том же месяце ($6-9 spent) → automatic suggestion "You've spent $9 this month. Pro is $9.99/mo unlimited — switch?" Expected upsell conversion: 25-35%.

### 9.4 Unit economics

- Pay-per revenue margin: $2.99 - $0.02 cost = **99.3% margin** (per MONETIZATION.md §5)
- Claude Sonnet AI cost $0.02 regardless of model tier
- Pay-per = NOT loss leader, pure revenue add
- Expected ~10-15% of Y1 revenue from pay-per (MONETIZATION.md §2)

### 9.5 Cannibalization concern

**Question:** does showing $2.99 option cannibalize subscription conversion?

**A/B test planned (priority 5 in §3.4):** hide pay-per vs show prominent vs show minimal. Hypothesis: minimal display ( smaller card, lower в hierarchy) captures Tyler/Ronald without pulling Emma/Mike away from subscription.

**Expected outcome:** showing pay-per minimally increases total paywall-exposure revenue by 8-12% (captures segment that would otherwise leave with $0), while reducing subscription conversion by 2-3% (some Emmas pay $2.99 instead of committing). Net positive.

---

## 10. Paywall A/B Tests — Priority Order (v2.0)

Based on [Adapty experimenting data](https://adapty.io/blog/paywall-experiments-playbook/): pricing tests дают 2-5x uplift vs визуальные.

### 10.1 Test matrix (first 90 days post-launch)

| # | Test | Hypothesis | Sample size needed | Success metric |
|---|---|---|---|---|
| 1 | **Free tier limit** 2 / 3 / 5 estimates | 3 = sweet spot | 2K users/variant | Free→Paid D60 |
| 2 | **Monthly price** $7.99 / **$9.99** / $11.99 | $9.99 maximizes Rev × Conversion | 3K users/variant | Revenue per Install D90 |
| 3 | **Annual discount framing** "Save 58%" / **"2 months free"** / "$4.17/mo" | "2 months free" wins | 2K/variant | Annual % of paid |
| 4 | **Annual price** $39.99 / **$49.99** / $59.99 | $49.99 sweet spot | 2K/variant | Annual % × Churn |
| 5 | **Pay-per visibility** Hidden / Minimal / Prominent | Minimal optimal | 2K/variant | Total rev per paywall exposure |
| 6 | **Paywall trigger timing** After 2 / **3** / 4 estimates | 3 = PictureThis proven | 2K/variant | Conversion + 60-day retention |
| 7 | **CTA copy** "Upgrade" / "Keep Knowing Prices" / "Go Pro" / "Unlock Unlimited" | Benefit-driven wins | 2K/variant | CTA tap rate |
| 8 | **Social proof** Numbers / Testimonial / Reviews 4.8★ / Combo | Combo wins | 2K/variant | CTR to paywall convert |
| 9 | **Paywall visuals** Static / Animated / Video hero | Animated +2.9x (Adapty) | 2K/variant | Conversion rate |
| 10 | **Trial inclusion (Phase 3)** No trial / 7-day / Opt-out trial | No trial optimal | 2K/variant | Net revenue per install |

**v2.0 changes from v1.0:** removed "Pro Match priority" test (feature no longer gated), added "Pay-per visibility" test (new importance без affiliate fallback), promoted "Free tier limit" to priority #1 (most impactful per MONETIZATION.md uncertainty).

### 10.2 Regional A/B

- **US vs EU vs LatAm** — cultural differences in price sensitivity (post-international launch)
- **High-income zips vs mid-income zips** — validate $9.99 vs $7.99 regional pricing
- **Property-heavy markets (TX, FL, CA) vs renters-heavy (NY, SF)** — tier mix different

### 10.3 What NOT to test (yet)

- **Branding/logo** — too early to pivot identity
- **Tier structure** (Family vs Power) — wait until v1.5 post-PMF
- **Non-English copy** — wait until international launch в Year 2

---

## 11. Metrics to Track

### 11.1 Per-paywall-exposure metrics

- **Conversion rate** per screen variant
- **Time on paywall screen** (too short = bounce, too long = confused)
- **Bounce rate** (close without converting)
- **CTA tap rate** (interest signal even if not converted)
- **Tier selection split** (Monthly vs Annual vs Pay-per)

### 11.2 Cohort-level metrics

- **Free → Paid conversion curve** (days 0-90) — target **18-25% blended by D60** (same as v1.0, no affiliate cushion adjustment)
- **Annual vs Monthly split** — target **45-55% annual** (H&F median 60%)
- **Churn rate** — monthly target <5% (H&F median 4.7%)
- **LTV 12-month** — target **$47 per paid user** (vs v1.0's $55 — lower without affiliate lift)
- **Re-subscribe rate** — target 25-30% of churned

### 11.3 Funnel integrity (v2.0)

```
Install → Onboarding complete (target 85%, per MONETIZATION.md §3)
   → First estimate (target 88%)
      → 3rd estimate (target 40-50%)
         → Paywall exposure (target 40-50% of installs hit limit)
            → Conversion (target 18-25% среди exposed)
               → Annual selection (target 45-55% среди paid)
                  → Year-2 retention (target 45%+ first year for annual)
```

### 11.4 Pay-per complementary (v2.0)

- **Pay-per purchase rate** (target 3% of free users buy at least 1)
- **Pay-per → Subscription upsell rate** (target 25-35% after 2-3 pay-per)
- **Pay-per LTV** — $5.80 (per MONETIZATION.md §5)
- **Amazon Associates click-through** (target 20-30% of DIY users click, 25% of clickers convert, ~$0.90 avg commission)

### 11.5 Red flags требующие intervention

- D60 conversion <12% — paywall broken, investigate (likely copy or pricing issue)
- Annual uptake <30% — framing weak, test "2 months free" vs alternatives
- Install→active <75% — onboarding or paywall-too-early
- Refund rate >6% — messaging misleading, trust issue
- App rating drop после paywall launch — dark pattern detection, UI review
- Pay-per cannibalization >5% — reduce pay-per visibility

---

## 12. Objection Handling — "Why pay if I can get estimate free from [competitor]?"

**Critical section для v2.0.** Competitor landscape includes:
- HomeAdvisor / Angi free "typical cost" pages
- Thumbtack free pro quotes (3 quotes typically)
- YouTube DIY guides (free, ubiquitous)
- Reddit r/HomeImprovement (free community advice)

Emma / Mike / Sarah might ask: "Why $49.99/year if I can google this?"

### 12.1 Our differentiated value (paywall messaging)

**Unlimited estimates per month (vs competitor 1-3 free quotes max):**
- HomeAdvisor: 1 "typical cost" lookup per problem, then pushes pros
- Thumbtack: 3 pro quotes, each requires contact info submission
- FixIt Pro: unlimited, instant, no contact info needed

**Saved projects history:**
- Competitors: no persistent history, you're starting fresh each time
- FixIt: "My Home" tracks every repair, warranty, estimate — timeline of your home

**Premium AI accuracy (Claude Sonnet):**
- HomeAdvisor: static ranges, one-size-fits-all, not zip-precise
- Thumbtack: pro quotes — but pros inflate, you don't know market price
- FixIt Pro: Claude Sonnet Vision trained on regional pricing, ±25% accuracy, zip-aware

**PDF export (for insurance / landlord / contractor):**
- Competitors: no export, you screenshot or copy-paste
- FixIt Pro: polished PDF with estimate, photos, recommendations — insurance-ready

**Price alerts in your zip:**
- Competitors: no tracking
- FixIt Pro: "HVAC materials dropped 15% in Denver — good time to fix?"

**Honest positioning (not a marketplace):**
- HomeAdvisor / Thumbtack earn from sending you to pros — incentive to push Pro even when DIY works
- FixIt earns only from you subscribing — incentive to be genuinely useful

### 12.2 Paywall copy capturing objection

**Section on paywall (collapsed "Why FixIt Pro?" expandable):**

> "Why pay when Google is free?
>
> Google shows 'typical HVAC cost $3K-8K' — that's 3x range, no help. FixIt Pro shows $4,200 for YOUR zip, YOUR system age, YOUR repair vs replace decision, with step-by-step DIY if applicable.
>
> Thumbtack pros give you quotes — after taking your contact info and calling you 8 times. FixIt Pro tells you what it SHOULD cost — before you talk to any pro, so you can validate their quote.
>
> $49.99/year is one overpriced repair. FixIt Pro pays for itself on your first save."

### 12.3 Persona-specific objection handling

**Emma (empowerment):** "You're not paying for estimates — you're paying for confidence. Never feel ripped off again."

**Mike (DIY value):** "Unlimited estimates = unlimited project planning. Price alerts = buy materials на low. PDF export = share with your partner / spouse for approval."

**Sarah (quote validation):** "Got a $500 plumber quote? FixIt Pro tells you if it's fair BEFORE you commit. One validated quote saves more than one year of Pro."

**Tyler (pay-per):** "Not subscribing — got it. $2.99 for just this estimate. No commitment, no follow-up sales."

**Ronald (simplicity):** "Daughter set this up for dad. One annual payment, unlimited help. No 10-call carousel of pros."

---

## 13. Paywall Copy Examples — Persona-Tuned

### 13.1 For Emma (Empowering, v2.0)

- **Hook:** "You've saved $247 so far with FixIt"
- **Value:** "Unlimited estimates. Save every project. Never feel ripped off again."
- **Social proof:** "Join 12,000+ homeowners planning smarter"
- **CTA:** "Keep Knowing Prices"
- **Trust:** "Cancel anytime. No sales calls. No affiliate pressure."

### 13.2 For Mike (Value/DIY-oriented)

- **Hook:** "Plan projects like a pro"
- **Value:** "Unlimited estimates + price alerts + PDF export for family approval"
- **ROI frame:** "$49.99/year = less than one overpriced repair"
- **Social proof:** "12,400+ DIYers use FixIt"
- **CTA:** "Go Pro"

### 13.3 For Sarah (Trust/protection)

- **Hook:** "Validate every contractor quote"
- **Value:** "Know fair price before you sign. No kickbacks. No sales calls."
- **Trust:** "We don't earn from sending you to pros. We earn from helping you decide."
- **Social proof:** "Trusted by 12K+ homeowners"
- **CTA:** "Protect My Budget"

### 13.4 For Ronald (Simple/safe, if targeted by daughter)

- **Hook:** "Home repair help, simplified"
- **Value:** "Photo → clear answer. No confusing pro carousels. Share with family."
- **Trust:** "Honest AI estimates. One annual payment, unlimited help."
- **CTA:** "Get Full Access"

### 13.5 For Tyler (Pay-per focus, v2.0)

- **Hook (pay-per variant):** "Just this one estimate? $2.99"
- **Value:** "Know exactly what to fix vs what NOT to. Keep your deposit."
- **CTA:** "Get This Estimate"

### 13.6 Universal paywall (generic users)

- **Hook:** "3 estimates down. Unlimited ahead?"
- **Value:** "Unlimited estimates · Saved projects · PDF export · Price alerts"
- **Price anchor:** "$49.99/year = $4.17/month = 2 months free"
- **Social proof:** "★★★★★ 4.8 — 12,400 reviews"
- **CTA:** "Unlock Unlimited Access"
- **Trust:** "Cancel anytime · No auto-upgrade · Honest utility"

### 13.7 v1.0 copy REMOVED (reference only — don't use)

Из v1.0 — these lines conflict с v2.0 positioning:
- ❌ "Priority pro matching"
- ❌ "Pre-vetted quotes from our pros"
- ❌ "Our trusted contractor network"
- ❌ "Verified pros in your area"
- ❌ "Lead fees waived with Pro"

Replaced with:
- ✅ "Price alerts in your zip"
- ✅ "PDF export for insurance"
- ✅ "Unlimited saved projects"
- ✅ "No sales calls. No pro fees."

---

## 14. Implementation Roadmap

### Phase 1 (MVP Launch, month 1-2)

- Single soft paywall variant (universal copy per §13.6)
- 3 tier options (Monthly $9.99 + Annual $49.99 + Pay-per $2.99)
- Pay-per visible as fallback (minimal position)
- 4 context paywalls live (Save, Warranty preview, PDF, Price Alerts) — NOT Pro Match
- Analytics instrumentation baseline (Adapty + Mixpanel)
- **NO trial** (freemium only)

### Phase 2 (Optimization, month 3-6)

- A/B tests 1-4 (free limit, pricing, annual framing)
- Persona-tuned copy variants (Emma vs Mike initial split based on onboarding answers)
- Context paywall conversion tracking per feature
- Refine "2 months free" framing language

### Phase 3 (Maturation, month 6-12)

- A/B tests 5-9 (pay-per visibility, trigger timing, CTA, social proof, visuals)
- Annual upgrade prompt для monthly subscribers (month 6+)
- Second-exposure logic для non-converters (day 45-60)
- Evaluate optional 7-day trial A/B (test 10)
- Introduce Family tier preview (post-PMF feature)

### Phase 4 (Scale, month 12+)

- Regional pricing experiments (int'l launch prep)
- Family plan introduction ($14.99/mo or $99.99/year)
- B2B tier preview paywall (property managers)
- ML-driven dynamic paywall (intent scoring à la Superwall)
- Affiliate reintroduction IF Thumbtack partnership approves post-PMF (MONETIZATION.md §7)

---

## 15. Decision Log (v2.0 changes)

| Дата | Решение | Причина |
|---|---|---|
| 2026-04-18 | v1.0: Soft paywall + 5 context paywalls (Pro Match, Save, Warranty, PDF, Price Alerts). Monthly $7.99 / Annual $49.99 (48% off). | Initial hybrid marketplace plan. |
| 2026-04-19 | **v2.0 rescope: 4 context paywalls (Pro Match REMOVED). Monthly $9.99 / Annual $49.99 (58% off / "2 months free"). Family + Power tiers REMOVED from MVP.** | Post-rescope AI-only monetization. No affiliate means no reason to gate Pro Match. Simpler pricing story matches clearer positioning. |
| 2026-04-19 | Pay-per SKUs simplified: only $2.99 single, removed move-out bundle / validation bundle. | Reduce paywall UI complexity. Bundles return v1.5+. |
| 2026-04-19 | Annual discount widened 48% → 58% | "2 months free" framing + retention math (annual reduces churn 60%+). Without affiliate backstop, annual LTV matters more. |
| 2026-04-19 | Added §12 objection handling — "why pay if Google is free" | Competitor differentiation critical without marketplace value prop. |
| 2026-04-19 | Target blended ARPU revised $55 → $47 per paid user | Removed affiliate $8-15/user/yr cushion. Pure subscription + Amazon Associates bonus. |

---

## 16. Related Docs

- [POSITIONING.md](../02-product/POSITIONING.md) — "Know the price before the panic" foundation
- [MONETIZATION.md](../02-product/MONETIZATION.md) — subscription-only model, pricing rationale, unit economics
- [FEATURES.md](../02-product/FEATURES.md) — Feature #8 Pricing Tier, Feature #6 Find a Pro (free deeplink)
- [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) — path to paywall, first-estimate funnel
- [RETENTION-RESEARCH.md](./RETENTION-RESEARCH.md) — re-engagement flows, seasonal triggers
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — persona-specific willingness to pay
- [ASO-RESEARCH.md](./ASO-RESEARCH.md) — install quality and intent
- `agents/reference-materials/monetization/paywall.utf8.txt` — primary paywall best practices (Finch, Rootd, Headspace cases)

---

**Дата последнего обновления:** 2026-04-19 (v2.0 post-rescope rewrite)
**Следующий шаг:** ONBOARDING-RESEARCH.md v2.0 rewrite — детализация funnel до paywall exposure под AI-only positioning.
**Approval:** Amanda 2026-04-19.
