# PAYWALL-RESEARCH.md — FixIt

**Дата:** 18 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** Practices Research (Stage 3)
**Автор:** Product Team (Лана + Amanda)
**Статус:** Final v1.0
**Companion docs:** [MONETIZATION.md](../02-product/MONETIZATION.md) | [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) | [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) | [RETENTION-RESEARCH.md](./RETENTION-RESEARCH.md)

---

## TL;DR

**Рекомендация:** Soft paywall после 3 free estimates + контекстные paywalls на премиум-фичах. **Hard paywall (first-screen) отвергнут** как модель для FixIt. Target conversion **18-25% free→paid на D60** — в диапазоне PictureThis (20%) и H&F benchmark (Adapty 11.2%).

**Ключевые решения:**
- **Модель:** Hybrid — soft paywall (trigger: hit лимита 3 estimates/mo) + context paywall (premium features) + time-based nudges (D14, D30)
- **Trial:** НЕ дефолт. Free estimates уже выполняют роль trial (product-first experience)
- **Pricing на paywall:** $7.99/mo vs $49.99/yr (48% annual savings), annual pre-selected
- **Pay-per fallback:** $2.99 single estimate для non-subscribers
- **A/B priority:** pricing > free-tier limit > annual discount framing > trial inclusion

**Почему НЕ hard paywall:** FixIt — приложение с infrequent use pattern (3-10 repairs/year, не daily). Эмма (primary persona) хочет сначала увидеть value ("wow, FixIt правда сэкономил мне $150"), только после этого готова платить. Hard paywall убьёт install→active conversion на 60-70% без proven brand equity (FixIt starts from 0).

**Ожидаемая экономика:** Blended 20% paying conversion × $55 paid ARPU = $11/free-install blended revenue. Paywall impressions target: 1.5-2.0 exposure per free user в первые 60 дней.

---

## 1. Типы Paywall — Industry Benchmarks

### 1.1 Сравнение моделей (с данными 2024-2026)

| Модель | D30-D60 conversion | RPI (Revenue per Install) D60 | Когда работает | Для FixIt? |
|---|---|---|---|---|
| **Hard paywall (first-screen)** | 10.7-12.1% (RevenueCat 2025) | $3.09 (8x выше freemium) | Established brands (Netflix, Spotify); quiz-heavy apps (Noom, Flo) | **REJECTED** |
| **Soft paywall (после trial experience)** | 3.5% average, 18-25% среди free users кто hit limit | $0.85-1.50 | Freemium, долгая воронка, infrequent use | **RECOMMENDED** |
| **Freemium без paywall push** | 2.1-2.18% passive | $0.38 | Massive virality-driven apps | Too passive |
| **Context paywall (premium action)** | 10-15% среди trigger events | Higher LTV per converter | Supplement для soft | **YES (secondary)** |
| **Hybrid soft + context** | Combined 18-25% D60 | $1.10-1.50 blended | Multi-persona apps с differential use patterns | **RECOMMENDED** |

Source: [RevenueCat State of Subscription 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/), [Adapty 2026](https://adapty.io/state-of-in-app-subscriptions/), [Airbridge Hard vs Soft Paywall](https://www.airbridge.io/en/blog/hard-vs-soft-paywalls).

### 1.2 Почему Hard Paywall REJECTED для FixIt

Hard paywall (показ подписки до onboarding/первого experience) конвертирует в 5-6x лучше soft по установке → оплата — НО только при 3 условиях, ни одно из которых у FixIt НЕ выполнено:

1. **Proven brand / high intent install.** Netflix, Spotify, Duolingo — пользователь уже хочет продукт. FixIt — unknown brand, 0% recognition в момент install. Intent формируется через experience, а не preexisting awareness.

2. **Quiz-driven psychological commitment (Noom/Flo modell).** 80+ экранов quiz строят эмоциональную инвестицию, оправдывающую paywall до value moment. FixIt onboarding — 3-4 screen max ("добро пожаловать → region → DIY experience → photo"). Нет базы для hard paywall.

3. **Immediate critical value.** Rootd (panic attack) — пользователь уже в acute pain при install, готов платить instantly. FixIt user — casual problem-solver ("кран капает, посмотрим что скажет приложение") — не emergency mindset.

**Дополнительный risk:** Install → active funnel падает на 60-70% с hard paywall (Airbridge). Для FixIt, где word-of-mouth через Emma ("я сэкономила $200, скачай") = основной growth lever, убить install→active = убить virality. Hard paywall режет virality в source.

**Cases когда hard paywall worked БЫ для FixIt (но не случай):**
- Если бы FixIt был extension trusted brand (Home Depot app, Thumbtack premium tier) — intent+trust уже присутствует
- Если бы был extended quiz-onboarding (30+ screens) создающий commitment — но это conflict с "10-second answer" value prop

### 1.3 Почему Soft Paywall RECOMMENDED

Три ключевых аргумента:

**A. Infrequent use pattern.** Emma делает 5-10 repairs/year, не daily app opens. Hard paywall в Day 0 — "зачем платить если я не знаю буду ли пользоваться". Soft paywall — "я уже делал 3 estimates, они были полезны, теперь upgrade = easy decision".

**B. Value-first experience убеждает.** "Wow moment" после первого estimate (Emma увидела что DIY возможен, сэкономила $150) — **эмоциональный anchor** для будущего subscription decision. Без этого момента пользователь не понимает что платит.

**C. Word-of-mouth через free users.** 80% free users никогда не subscribe → НО каждый генерирует $0.85/year через affiliate + evangelism ("моя подруга скачала тоже"). Hard paywall убил бы 80% free pool.

**Trade-off:** D60 conversion ниже (3.5% vs 10.7% для hard), но overall revenue higher благодаря:
- Higher install→active (+85-90% vs 30-40%)
- Affiliate revenue tail от free users
- Viral coefficient (free Emma → 2-3 друзей скачивают)

### 1.4 Context Paywall как дополнение

Вторичный layer — показ paywall при попытке premium action:

| Action | Context paywall copy | Target conversion |
|---|---|---|
| "Save project" (after 1 free save) | "Unlock unlimited saves для tracking your home projects" | 12-15% |
| "Pro Match" (connect к Thumbtack contractor) | "Get verified pros с pre-vetted quotes" | 10-12% |
| "Warranty tracker" (v1.5) | "Track all your repairs warranty periods" | 8-10% |
| "Batch photo upload" (Power tier) | "Upload 10+ photos at once" | 5-8% |
| "Tool tracking" (Power tier) | "Never buy duplicate tool again" | 6-8% |

Context paywalls имеют LOWER raw conversion (~10-15%), но HIGHER LTV per converter — пользователь коммитится к specific value, не к vague "premium".

---

## 2. Paywall Screen Structure — Best Practices

### 2.1 Critical elements (must-have)

На основе анализа Noom, Calm, PictureThis, Fitbod, Headspace и best practices [Adapty](https://adapty.io/blog/how-to-design-a-paywall-for-a-mobile-app/), [Apphud](https://apphud.com/blog/design-high-converting-subscription-app-paywalls), [Superwall](https://superwall.com/blog/superwall-best-practices-winning-paywall-strategies-and-experiments-to/):

1. **Emotional hook (personalized)** — "You've saved $247 so far с FixIt. Keep going" — **+17% conversion** (Adapty). Для Emma: акцент на empowerment. Для Sarah: на "fair protection". Для Mike: на "tool efficiency".

2. **Clear tier comparison (максимум 2-3 options)** — Monthly vs Annual (default), опционально Power tier. **>3 options = decision paralysis** (закон Хика-Хаймана).

3. **Dominant CTA button (benefit-driven copy)** — НЕ "Subscribe", А **"Unlock Unlimited Estimates"** или "Start Saving on Repairs". Один яркий элемент на экране.

4. **Social proof (concrete numbers)** — "Join 50,000+ homeowners who plan smarter" + 1-2 testimonial snippets. Конкретные числа > абстрактные заявления. Social proof **+72% install-to-trial** (Adapty 2026).

5. **Money-back guarantee / cancel anytime** — "Cancel в 1 клик в любой момент" — снижает checkout anxiety. Как Blinkist — прозрачный timeline +23% conv.

6. **Small print про subscription terms** — соответствие App Store Guidelines (required), но не доминирующий.

7. **Price anchoring** — "$7.99/mo vs $4.17/mo annual (save 48%)" и "$49.99/year = less than one plumber visit".

### 2.2 Anti-patterns — ИЗБЕГАЕМ

- **Dark patterns** — скрытая cancel кнопка, auto-renew без предупреждения, pre-selected expensive option без flagging. Как Fabulous с "pay what you want" → auto-annual $70 = массовые жалобы. FixIt не идёт этим путём (reputation risk).
- **15+ features list** — overwhelming. Максимум 4-5 bullet-поинтов.
- **Stock photos** — low trust. FixIt uses real home repair before/after imagery.
- **Complex tier comparison (>3 options)** — увеличивает bounce.
- **Forced registration до paywall** — raises friction. Paywall shows до mandatory signup (optional account creation).
- **"Skip this offer" маленькими буквами** — дешёвый трюк, репутация ляжет.

### 2.3 Wireframe-level mockup — FixIt Soft Paywall (Primary)

```
┌─────────────────────────────────────┐
│  [← X close]                        │
│                                     │
│  [ANIMATED HEADER]                  │  ← Video/Lottie animation
│  Recent estimate hero image         │
│  (photo of repair, subtle anim)     │
│                                     │
│  💪 You've saved $247               │  ← PERSONALIZED emotional hook
│  on 3 repairs with FixIt            │  (pulled from user history)
│                                     │
│  ─────────────────────────────      │
│                                     │
│  Keep the momentum going:            │
│                                     │
│  ✓ Unlimited estimates              │  ← 4 clear benefits
│  ✓ Full project history             │
│  ✓ Save "my home" projects          │
│  ✓ Priority pro matching            │
│                                     │
│  ─────────────────────────────      │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ● ANNUAL (BEST VALUE)        │   │  ← PRE-SELECTED (default)
│  │   $49.99/year                │   │  visually highlighted
│  │   = $4.17/month              │   │
│  │   SAVE 48% vs monthly        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ○ Monthly                    │   │
│  │   $7.99/month                │   │
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
│  "FixIt saved me $400 on sink       │
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

### 2.4 Wireframe — FixIt Context Paywall (Secondary)

Срабатывает при tap на premium feature (e.g., "Save to my home"):

```
┌─────────────────────────────────────┐
│  [← back]                           │
│                                     │
│  🏠 Save projects to "My Home"      │  ← Context-specific hook
│                                     │
│  Track every repair, every           │
│  warranty, every estimate —          │
│  organized по room, by date.         │
│                                     │
│  [Screenshot of "My Home" UI]        │  ← Demo visual
│                                     │
│  Unlock with FixIt Pro:             │
│  ✓ Save unlimited projects          │
│  ✓ Warranty reminders                │
│  ✓ Unlimited estimates               │
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

Context paywall имеет ONE dominant option (annual) — Mojo достиг +15-20% annual uptake через этот паттерн.

---

## 3. Pricing Tiers — Validated Through Competitor Analysis

### 3.1 FixIt tier structure (from MONETIZATION.md)

| Tier | Price | Positioning | Target persona |
|---|---|---|---|
| **Free** | $0 | 3 estimates/mo, basic DIY/Hybrid/Pro output, limited history (last 5) | Top-of-funnel всех, Tyler's regular use |
| **Pro Monthly** | $7.99/mo | Unlimited estimates, full history, save projects, priority support | Mike, Emma flex |
| **Pro Annual** | $49.99/yr (48% off) | Всё Pro + early access, priority support | Emma, Sarah, Ronald (via daughter) |
| **Power (v1.5+)** | $12.99/mo или $89.99/yr | Pro + tool tracking, batch photo, advanced analytics, warranty tracker | Mike heavy-DIY, property managers pre-B2B |

### 3.2 Pricing psychology validation

- **$7.99/mo** — под $8 threshold (Anderson & Simester research: "less than $8" ощущается meaningfully дешевле "$8"). Ниже iFixit Pro ($9.99) — hair under для price sensitivity.
- **$49.99/yr** — anchors к $95.88 monthly × 12 → showcases "save $46". RevenueCat H&F median annual $38.42, upper quartile $46-50 — FixIt в upper quartile = premium positioning без luxury.
- **$2.99 pay-per** — impulse threshold. Ниже $3 — "I won't even think about it."
- **Annual savings framing** — A/B test "Save 48%" vs "$4.17/mo" vs "2 months free" (last wins per historical H&F data).

### 3.3 A/B tests (priority order)

| Priority | Test | Variants | Hypothesis | Success metric |
|---|---|---|---|---|
| **1** | Monthly price | $4.99 / $7.99 / $9.99 | $7.99 — sweet spot volume × ARPU | D90 Revenue per Install |
| **2** | Free tier limit | 1 / **3** / 5 estimates/mo | 3 = sweet spot balance trial & upgrade pressure | Free→Paid + Retention |
| **3** | Annual price | $39.99 / **$49.99** / $59.99 | $49.99 under "$50 psychological" | Annual % of paid |
| **4** | Annual discount framing | "Save 48%" / "$4.17/mo" / "2 months free" | "2 months free" easiest to parse | Annual uptake |
| **5** | Trial inclusion | No trial / 7-day / 14-day | No trial optimal для FixIt (freemium does the work) | Trial→Paid × net revenue |
| **6** | Paywall trigger | After 1 / **3** / 5 estimates | 3 = PictureThis proven | Conversion + churn |
| **7** | CTA copy | "Upgrade" / "Start Saving" / "Go Pro" / "Unlock Unlimited" | Benefit-driven winner | Tap rate |
| **8** | Social proof | Numbers only / Testimonial / Reviews 4.8★ | Testimonial + numbers combo | CTR |

Adapty: pricing experiments дают **2-5x больший uplift** чем визуальные — поэтому priority 1-4 = pricing.

---

## 4. Paywall Triggers — When to Show

### 4.1 Primary triggers (soft paywall)

**Trigger 1: Free limit hit (highest conversion moment)**
- User уже has experienced value (did 3 estimates)
- Context clear ("you want a 4th estimate — upgrade")
- Expected conversion: 18-25% среди hitters (PictureThis 20% benchmark)
- **Copy:** "You've used all 3 free estimates this month. Upgrade for unlimited"
- **Screen:** Primary soft paywall (§2.3)

**Trigger 2: Premium feature click (context paywall)**
- User taps "Save project", "Pro Match", "Warranty Tracker", "Tool tracking"
- Expected conversion: 10-15% среди trigger events
- **Copy:** feature-specific ("Save unlimited projects с Pro")
- **Screen:** Context paywall (§2.4)

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

- **На splash screen / первый open** — противоречит soft paywall rationale, убивает install→active
- **В середине estimate flow** — UX violation, пользователь не готов
- **Каждый возврат app** — spam, leads to app deletion
- **После negative experience** (estimate не helpful) — неэтично

### 4.4 Trigger sequencing timeline

```
Day 0 — Install, onboarding, first estimate
Day 0-14 — Natural use (1-3 free estimates, no paywall push)
Day 14 — IF engaged, low-pressure nudge #1 (time-based)
Day X — WHEN hit limit (typically day 15-25 for active users) → SOFT PAYWALL (primary exposure)
Day 30-45 — Context paywalls as user tries premium features
Day 45-60 — IF still not converted + still active → second soft paywall exposure
Day 60+ — Re-engagement paywalls при return after absence
```

---

## 5. Emma's Paywall Journey (Primary Persona)

Emma — primary target, detailed journey validates entire paywall strategy.

**Day 1:** Install (discovered через TikTok). Onboarding 3-screen → first estimate (leaky faucet). AI выдаёт DIY/Hybrid/Pro options. Emma выбирает DIY, сэкономила $150. **Wow moment locked in.**

**Day 3-5:** Garage door squeak → second estimate. Emma уверенно решает сама. **Experience reinforced.**

**Day 10-14:** Emma показала FixIt подруге Jessica (виральность). Делает 3rd estimate (bathroom vent fan). Потратила 3/3 free limit.

**Day 15-20:** Emma видит clogged drain → хочет 4th estimate → **SOFT PAYWALL TRIGGERED**. 

- Screen: "You've saved $X so far на 3 repairs. Unlock unlimited."
- Annual $49.99 pre-selected.
- Emma paygraph: **22% convert immediately** (between PictureThis 20% и H&F 25%)
- Если не converted — option "Pay as you go $2.99 for this estimate"

**Day 20-40 (если не converted):**
- Seasonal push ("spring maintenance season!") → re-engages
- Context paywall (Emma пытается save project) → 12% conversion chance

**Day 45-60:**
- Second soft paywall exposure с refresher value prop
- Many free users need 2-3 exposures (Adapty data)
- Cumulative conversion reaches 20-24% by D60

**Day 60-180 (если still free):**
- Continues as free user generating $0.85/year affiliate revenue
- Still represents viral value ("моя подруга скачала тоже")
- May convert at seasonal peaks (fall/spring)

### 5.1 Emma-specific copy

- **Empowering tone:** "You've saved $247 so far with FixIt"
- **Agency-focused:** "Unlock your home project workspace"
- **Peer validation:** "Join 50K homeowners who plan smarter"
- НЕ: patronizing, doom-based, aggressive urgency (Emma hates pressure sales)

---

## 6. Annual vs Monthly Strategy

### 6.1 Industry pattern data

- **40-60% подписчиков выбирают annual** when both presented (Airbridge: добавление annual → +31% к annual uptake vs solo monthly)
- **RevenueCat H&F 2026:** 60.6% revenue от annual plans, 67% subscribers prefer annual
- **Annual reduces churn by 60%+** — monthly 2-year retention 6.7% vs annual 36% (DEV Community)
- **Annual = lower CAC payback** (upfront cash, более predictable LTV)

### 6.2 FixIt approach

**Paywall defaults:**
- Annual pre-selected (radio button checked)
- Annual card visually highlighted ("BEST VALUE" badge)
- Savings prominent: "$49.99/year vs $95.88 if monthly"
- Daily equivalent: "= $4.17/month = price of one coffee/week"

**But monthly still visible:**
- Monthly option available (not hidden под "other plans")
- For Emma flex cohort (30% who prefer monthly initially) — trial-like psychology
- After 6 months of monthly subscription → "Upgrade to annual, save $46" prompt

### 6.3 Annual discount framing A/B

Per [monetization-research.md](../../../agents/reference-materials/monetization/monetization-research.md):

| Framing | Expected Annual uptake | Risk |
|---|---|---|
| "Save 48%" | Baseline | Abstract % |
| "$4.17/mo (billed annually)" | +5-8% | Requires math |
| **"2 months free"** | +10-15% (winner per prior tests) | Easiest parse |
| "Save $46/year" | +5% | Concrete but anchoring to monthly |

**Winner to validate:** "2 months free" — simplest mental model.

---

## 7. Free Trial Consideration

### 7.1 Option A: 7-day free trial (then $7.99/mo)

**Pros:**
- Benchmarks: 35-49.9% trial→paid (RevenueCat H&F 2026)
- 7-day = sweet spot (52% H&F apps use, [Adapty](https://adapty.io/state-of-in-app-subscriptions/))
- Higher Revenue per Install upper bound

**Cons:**
- Lower install rate (trial card requirement raises friction)
- Emma's infrequent use pattern (3-10 repairs/year) doesn't match daily-use trial psychology
- Critical 0-day cancellation spike: 55% of 3-day trial cancels happen Day 0

### 7.2 Option B: Freemium, no trial (RECOMMENDED default)

**Pros:**
- Low signup friction (matches Emma's casual discovery)
- Free estimates ARE the trial — 3 estimates perform same role
- Better word-of-mouth viability (free forever base)
- Affiliate revenue на free users

**Cons:**
- Slower direct monetization curve
- D60 conversion lower than trial model

**Why recommended:** Emma's persona — "I'll see if it's useful, then decide." Trial feels artificial because use is sporadic. Freemium + soft paywall = natural decision point when she hits limit.

### 7.3 Option C: Hybrid — 3 free estimates + optional 7-day trial (A/B TEST)

Post-launch experiment:
- Control: freemium (3 estimates/mo, no trial)
- Variant: freemium + optional trial button on paywall ("Try Pro free for 7 days")
- Metric: D60 net revenue per install

If variant wins by >10%, adopt hybrid. Likely scenario based on data: **adoption by Emma-flex cohort**, adds 2-4% конверсии but also cancellation risk.

### 7.4 Decision

**Phase 1 (launch to month 3):** Option B (freemium no trial). Clean funnel, measure baseline.

**Phase 2 (month 3+):** Introduce Option C as A/B. Data-driven decision.

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

- **One-tap cancellation** inside app (deep-link to iOS Subscriptions) — builds trust
- **Refund-friendly policy** — auto-refund within 48 hours of accidental subscribe
- **Receipt email** immediately после purchase
- **Renewal reminder** email за 3 дня до annual renewal (reduce chargebacks)
- **Pause subscription** option (feature for months user doesn't need it — keeps LTV)

### 8.3 Dark patterns ИЗБЕГАЕМ

- Hidden cancel flow (>3 steps)
- Pre-checked paid option без disclosure
- Misleading "free" when immediate payment required
- Auto-upgrade tier без consent

FixIt reputation critical — neutral trustworthy advisor. Dark patterns conflict с core positioning.

---

## 9. Pay-per-Estimate Strategy

### 9.1 Why pay-per matters

Covers users who **explicitly don't want subscription** but occasionally need FixIt:

- **Tyler (renter)** — infrequent use (1-2 estimates per lease cycle), subscription доесн't match pattern
- **Casual curious users** — "once in a while" checkers
- **Ronald's daughter** — "I'll buy parent one estimate" gift use case

### 9.2 Pay-per offerings

| Product | Price | Target use case |
|---|---|---|
| **Single estimate** | $2.99 | Tyler one-off, casual users, contractor quote validation add-on |
| **Full project analysis** | $9.99 | Deeper detail для complex repairs (HVAC, electrical), multi-step plan |
| **Move-out review bundle** | $19.99 | Tyler specific: scan 10-15 walls/fixtures |
| **Pre-move-in documentation** | $9.99 | Document apartment condition at lease start |
| **Contractor quote validation** | $4.99 | Sarah specific: upload pro PDF → FixIt parses + validates |

### 9.3 Integration with paywall

Pay-per **visible on soft paywall as fallback**:

- Annual (default, highlighted)
- Monthly
- Pay as you go ($2.99 single) ← visible but not pushed

Copy: "Don't want subscription? This estimate only $2.99"

**Conversion path:** If user bought 2-3 pay-per в том же месяце ($6-9 spent) → automatic suggestion "You've spent $9. Pro is $7.99/mo unlimited — switch?" Expected upsell conversion: 25-35%.

### 9.4 Unit economics

- Pay-per revenue margin: $2.99 - $0.03 cost = **99% margin**
- Per-estimate AI + API cost $0.03 regardless of model
- Pay-per = NOT loss leader, пure revenue add

---

## 10. Paywall A/B Tests — Priority Order

Based on [Adapty experimenting data](https://adapty.io/blog/paywall-experiments-playbook/): pricing tests дают 2-5x uplift vs визуальные.

### 10.1 Test matrix (first 90 days post-launch)

| # | Test | Hypothesis | Sample size needed | Success metric |
|---|---|---|---|---|
| 1 | **Monthly price** $4.99 / $7.99 / $9.99 | $7.99 maximizes Rev × Conversion | 3K users/variant | Revenue per Install D90 |
| 2 | **Free tier limit** 1 / 3 / 5 estimates | 3 = sweet spot | 2K users/variant | Free→Paid D60 |
| 3 | **Annual discount framing** "Save 48%" / "2 months free" / "$4.17/mo" | "2 months free" wins | 2K/variant | Annual % of paid |
| 4 | **Trial inclusion** No trial / 7-day trial / 7-day opt-out trial | No trial optimal для FixIt | 2K/variant | Net revenue per install |
| 5 | **Paywall trigger position** After 3 / 5 estimates | 3 = standard | 2K/variant | Conversion + 60-day retention |
| 6 | **CTA copy** "Upgrade" / "Start Saving" / "Go Pro" / "Unlock Unlimited" | Benefit-driven wins | 2K/variant | CTA tap rate |
| 7 | **Social proof** Numbers / Testimonial / Reviews 4.8★ / Combo | Combo wins | 2K/variant | CTR to paywall convert |
| 8 | **Paywall visuals** Static / Animated / Video hero | Animated +2.9x (Adapty) | 2K/variant | Conversion rate |

### 10.2 Regional A/B

- **US vs EU vs LatAm** — cultural differences in price sensitivity
- **High-income zips vs mid-income zips** — validate $7.99 vs $5.99 regional pricing
- **Property-heavy markets (TX, FL, CA) vs renters-heavy (NY, SF)** — tier mix different

### 10.3 What NOT to test (yet)

- **Branding/logo** — too early to pivot identity
- **Tier structure (Pro vs Power vs Family)** — wait until v1.5
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

- **Free → Paid conversion curve** (days 0-90) — target 18-25% by D60
- **Annual vs Monthly split** — target 45-55% annual (H&F median 60%)
- **Churn rate** — monthly target <5% (H&F median 4.7%)
- **LTV 12-month** — target $55 per paid user
- **Re-subscribe rate** — лtarget 25-30% of churned

### 11.3 Funnel integrity

```
Install → Onboarding complete (target 70%)
   → First estimate (target 65-75%)
      → 3rd estimate (target 40-50%)
         → Paywall exposure (target 40-50% of installs)
            → Conversion (target 18-25% среди exposed)
               → Annual selection (target 40-55% среди paid)
                  → Year-2 retention (target 45%+ first year)
```

### 11.4 Affiliate/pay-per complementary

- **Affiliate click rate среди free users** (target 8-15% estimates → click)
- **Pay-per purchase rate** (target 3% of free users buy at least 1)
- **Pay-per → Subscription upsell rate** (target 25-35%)

### 11.5 Red flags требующие intervention

- D60 conversion <12% — paywall broken, investigate
- Annual uptake <30% — framing weak, test alternatives
- Install→active <75% — onboarding or paywall-too-early
- Refund rate >6% — messaging misleading, trust issue
- App rating drop после paywall launch — dark pattern detection

---

## 12. Paywall Copy Examples

Persona-tuned messaging:

### 12.1 For Emma (Empowering tone)

- **Hook:** "You've saved $247 so far with FixIt 💪"
- **Value:** "Unlock unlimited estimates + full project history"
- **Social proof:** "Join 50,000+ homeowners planning smarter"
- **CTA:** "Start Saving on Repairs"
- **Trust:** "Cancel anytime. No contractor sales calls."

### 12.2 For Mike (Value/DIY-oriented)

- **Hook:** "Plan projects like a pro"
- **Value:** "Unlimited estimates + tool tracking + price history across Home Depot, Lowe's, Amazon"
- **ROI frame:** "$49.99/year = less than one pro visit"
- **Social proof:** "12,400+ DIYers use FixIt"
- **CTA:** "Go Pro"

### 12.3 For Sarah (Trust/protection-focused)

- **Hook:** "Get unlimited protection from overpay"
- **Value:** "Fair pricing every time. Validate any contractor quote."
- **Trust:** "No kickbacks. No sales calls. Just honest estimates."
- **Social proof:** "Trusted by 50K+ homeowners"
- **CTA:** "Protect My Home Budget"

### 12.4 For Ronald (Simple/safe)

- **Hook:** "Home maintenance made simple"
- **Value:** "Unlimited estimates. Flag suspicious quotes. Share with family."
- **Trust:** "AARP member discount available"
- **CTA:** "Get Full Access"

### 12.5 For Tyler (Pay-per focus)

- **Hook (pay-per variant):** "Just this one estimate? $2.99"
- **Hook (move-out):** "Move-out review bundle — $9.99. Save your deposit."
- **Value:** "Know exactly what to fix and what NOT to"
- **CTA:** "Get This Estimate"

### 12.6 Universal paywall (generic users)

- **Hook:** "3 estimates down. Unlimited ahead?"
- **Value:** "Unlimited estimates · Full history · Save projects · Priority pro matching"
- **Price anchor:** "$49.99/year = $4.17/month = price of one coffee/week"
- **Social proof:** "★★★★★ 4.8 — 12,400 reviews"
- **CTA:** "Unlock Unlimited Access"

---

## 13. Implementation Roadmap

### Phase 1 (MVP Launch, month 1-2)

- Single soft paywall variant (universal copy)
- 2 tier options (Monthly + Annual)
- Pay-per as fallback
- Analytics instrumentation baseline
- **NO trial** (freemium only)

### Phase 2 (Optimization, month 3-6)

- A/B tests 1-4 (pricing, limit, framing, trial)
- Context paywalls для Save project, Pro Match
- Persona-tuned copy (Emma vs Mike initially)

### Phase 3 (Maturation, month 6-12)

- A/B tests 5-8 (trigger timing, CTA, social proof, visuals)
- Annual upgrade prompt для monthly subscribers (month 6+)
- Second-exposure logic для non-converters
- Power tier introduction (v1.5)

### Phase 4 (Scale, month 12+)

- Regional pricing experiments
- Family plan introduction
- B2B tier preview paywall
- ML-driven dynamic paywall (intent scoring à la Superwall)

---

## 14. Related Docs

- [MONETIZATION.md](../02-product/MONETIZATION.md) — revenue model, pricing rationale, unit economics
- [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) — path to paywall, first-estimate funnel
- [RETENTION-RESEARCH.md](./RETENTION-RESEARCH.md) — re-engagement flows, seasonal triggers
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — persona-specific willingness to pay
- [ASO-RESEARCH.md](./ASO-RESEARCH.md) — install quality and intent

---

**Дата последнего обновления:** 2026-04-18
**Следующий шаг:** ONBOARDING-RESEARCH.md — детализация funnel до paywall exposure.
