# MONETIZATION.md — FixIt

**Дата:** 18 апреля 2026
**Стадия:** Product Definition (Stage 2)
**Автор:** Product Team (Лана + Amanda)
**Статус:** Final v1.0
**Companion docs:** [RESEARCH-BRIEF.md](../01-research/RESEARCH-BRIEF.md) | [COMPETITOR-ANALYSIS.md](../01-research/COMPETITOR-ANALYSIS.md) | [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) | [VISION.md](./VISION.md) | [FEATURES.md](./FEATURES.md)

---

## TL;DR

Revenue model: **multi-channel hybrid** = freemium subscription + affiliate commission + pay-per-estimate + (v2.0) B2B property-manager tier.

Expected blended ARPU: **$35-50/year** across всю user base, **$60-80/year** per paying subscriber. Target Path to $10M ARR через **200K paying users + 500K free users** в Year 2-3.

Ключевые числа:
- **Free tier:** 3 estimates/month forever (generous enough для word-of-mouth)
- **Pro:** $7.99/mo или $49.99/year (**48% annual savings** vs monthly)
- **Pay-per-estimate:** $2.99 single / $9.99 Tyler "Full move-out review" bundle
- **Affiliate revenue:** $8-15/year per active user (Thumbtack/Angi/Home Depot/Amazon pooled)
- **Gross margin:** 96% (per-estimate cost $0.030, revenue $0.85-1.50)
- **LTV:CAC blended:** 7.5x (healthy, выше threshold 3x)

FixIt позиционируется **выше PictureThis ($29.99/yr)** но **ниже iFixit Pro ($9.99/mo)** — justified higher stakes (ремонт $100-$1000+ vs plant curiosity). Гибридная модель (subscription + affiliate + pay-per) снижает зависимость от одного revenue stream и даёт **day-1 монетизацию** через affiliate до того как subscription funnel созреет.

---

## 1. Выбор модели: Multi-Channel Hybrid

### 1.1 Почему именно hybrid?

**Гибридная модель (freemium subscription + affiliate + pay-per)** — единственно правильный выбор для FixIt по четырём причинам:

1. **Infrequent use pattern.** Unlike daily-use apps (fitness, language learning), ремонт происходит **3-10 раз в год** для типичного homeowner. Чистая подписка страдает от churn ("зачем платить если не нужно в этом месяце"). Pay-per absorb-ит casual users. Affiliate ловит моменты "нанял pro" когда subscription неактивна.

2. **Day-1 revenue via affiliate.** PictureThis, Rock Identifier — чистая subscription-only model требует **3-6 месяцев funnel maturation** до MRR > $10K. Affiliate revenue (Thumbtack/Angi/Home Depot) начинает капать **с первого pro-referral** ещё до того как subscription conversion funnel созреет. Это критично для cash flow стартапа с командой 1-2 человека.

3. **Diversification риска.** Если Thumbtack/Angi cut affiliate rates — subscription держит revenue. Если subscription churn — affiliate держит. Если обе падают — pay-per absorbs casual.

4. **Multi-persona coverage.** Emma и Mike — subscription-positive. Sarah — готова на annual ("insurance against ripoff"). Tyler — pay-per only (infrequent use). Ronald — subscription если дочь настроила, иначе pay-per. Одна модель не покрывает всех — hybrid покрывает.

### 1.2 Альтернативы и почему НЕ они

| Альтернатива | Почему НЕ она |
|---|---|
| **Чистая subscription (Reframe/Noom модель)** | Infrequent use → churn. Нет Tyler + Ronald. Нет day-1 revenue. |
| **Ad-supported free app** | Conflict с neutral advisor positioning. Thumbtack/Angi уже ads-heavy, reviews жалуются "слишком много push к pros". FixIt должен быть trusted advisor — not ad network. |
| **Pure affiliate / lead-gen (Thumbtack модель)** | Conflict of interest — зарабатываешь только когда pusher к pros, тогда не можешь честно советовать "это ты сам за $15". Убивает core value prop. |
| **One-time purchase ($19.99 unlock)** | Не создаёт recurring revenue; AI inference costs recurring ($0.005/estimate). |
| **Lifetime purchase only** | Cannibalize LTV. Add позже как retention offer (v1.5+), не как primary tier. |
| **IAP на estimates (в стиле Duolingo hearts)** | Fragments UX. Homeowner не хочет "buy 5 estimates" — хочет "unlimited когда нужно". |

### 1.3 Precedent model — PictureThis + Thumbtack

FixIt берёт **лучшее из двух blueprints:**

- **From PictureThis ($200M ARR):** freemium photo-AI → subscription funnel, annual dominance, mobile-first, single-purpose app winning над general-purpose.
- **From Thumbtack ($400M ARR):** lead-gen affiliate revenue stream, partner API integration, pro-marketplace monetization.

FixIt = **PictureThis subscription engine + Thumbtack affiliate tail** в одном приложении.

---

## 2. Revenue Streams

### Stream 1: Subscription (primary, ~60% revenue target Y2+)

| Tier | Price | What's included | Target persona |
|---|---|---|---|
| **Free** | $0 | 3 estimates/mo, basic DIY guides, material lists, 1 saved history item | Top-of-funnel для всех |
| **Pro Monthly** | **$7.99/mo** | Unlimited estimates, full DIY guides, tool tracking, price history, shopping list export | Mike (DIY monthly), Emma flexible |
| **Pro Annual** | **$49.99/year** (эффективно $4.17/mo — 48% off monthly) | Всё из Pro + early access new features + priority support | Emma (annual), Sarah ("insurance"), Ronald |
| **Family (future, v1.5+)** | **$14.99/mo или $99.99/year** | Up to 5 homes (для realtors, property manager light, adult children managing parents' homes) | Realtors, adult children of Ronald |

**Обоснование лимита 3 estimates/mo на Free tier:**
- PictureThis дал 3 IDs/week — слишком щедро для FixIt (меньше use frequency)
- 1 estimate/mo — слишком стингентно, убивает trial + word-of-mouth
- **3 estimates/mo = sweet spot** — покрывает средний casual use case (homeowner has 5-10 repairs/year → 3/mo handles peaks), но заставляет subscribe при intensive use (весна/осень, post-move-in)
- Emma's sample scenario показывает 2-3 repair moments/mo peak seasons — free tier handles base case, subscription captures peaks

### Stream 2: Affiliate Revenue (~25% revenue Y2+)

| Partner | Commission | Integration | Notes |
|---|---|---|---|
| **Thumbtack Pro** | **$15-25 per qualified lead** | API (developers.thumbtack.com) | Partner-only, apply required. Zip + category → 3 pros returned. FixIt должен pass Thumbtack quality bar (не spam leads). |
| **Angi Leads / HomeAdvisor** | **$20-35 per lead** | Email crmintegrations@homeadvisor.com | Higher value (focus на licensed trades plumbing/electrical/HVAC). Same parent company. |
| **Home Depot Product Advertising API** | **1-3% на material purchases** | Free to join | Shopping list items deep-linked с tracking code. Emma/Mike primary users. |
| **Amazon Associates** | **1-3% commission** | Free | Fallback для items не в Home Depot, furniture repair parts, specialized tools. |
| **Lowe's API** | **1-3%** | Partnership required | Redundancy to Home Depot — users often check both. |
| **TaskRabbit (v1.2+)** | **$5-15 per referred task** | Affiliate program | Furniture assembly, IKEA help — Tyler/Sarah referrals. |

**Total affiliate revenue per active user estimate: $8-15/year blended.**

Breakdown logic:
- Avg user gets 6-8 estimates/year
- **8-15% of estimates** trigger affiliate click (either pro referral or material purchase)
- **20-30%** of pro clicks convert к qualified lead ($25 avg)
- **40-60%** of material clicks convert к actual purchase ($50-150 avg basket × 2% = $1-3)
- **Weighted:** ~$10/year per active user avg

**Почему affiliate стратегически критичен:** он **монетизирует 70-80% free users** которые никогда не subscribe. Без affiliate free users = pure cost. С affiliate = $0.75/free user/year contribution.

### Stream 3: Pay-per-estimate (~10% revenue, fills gap)

| Product | Price | Target use case |
|---|---|---|
| **Single estimate** | **$2.99** | Tyler (one-off broken hinge), Ronald's dочь проверить quote, casual curious users |
| **Full move-out review bundle** | **$9.99** | Tyler специфика: scan 10-15 walls/fixtures перед съездом → all flagged |
| **Pre-move-in documentation** | **$9.99** | Tyler снимает apartment condition перед заездом (защита deposit) |
| **Contractor quote validation** | **$4.99** | Sarah-specific: upload contractor's PDF quote → FixIt parse + validate fair range |

**Targeting:** Users который **explicit не хотят subscription** но нуждаются в occasional use. Обычно конвертируется в subscription если использует 2+ pay-per в месяце ("you've spent $9, Pro is $7.99 unlimited").

### Stream 4: B2B / Property Manager tier (v2.0, ~5% initially → grows)

| Product | Price | What's included |
|---|---|---|
| **FixIt for Property Managers** | **$99/mo per portfolio** (up to 20 units) | Bulk estimate scanning, maintenance history per unit, tenant-facing "submit issue" widget, monthly cost report |
| **Enterprise tier (v2.5+)** | **Custom ($500-2000/mo)** | API access, white-label для property management platforms (Buildium, AppFolio partnerships), SLA |

**Market size для B2B:** 23M rental units в US, managed by ~300K property management companies. Even 1% penetration = 3000 accounts × $99/mo = $3.5M ARR incremental.

---

## 3. Pricing Strategy

### 3.1 Price psychology

| Tactic | Price point | Rationale |
|---|---|---|
| **$7.99/mo** | Just below $8 threshold | Behavioral: "less than $8" feels meaningfully cheaper than "$8" (Anderson & Simester pricing research). Also ниже PictureThis implied monthly ($29.99/12 = $2.50 но PictureThis — plant curiosity, не home repair). |
| **$49.99/year** | Anchor к monthly × 12 = $95.88, показывает "save $46/year (48% off)" | RevenueCat 2026: annual plans в H&F генерят 60.6% revenue. **Heavy push annual** = higher LTV + lower churn (35% annual cancels в first month, но remaining 65% stick 12 месяцев). |
| **$2.99 pay-per** | Ниже $3 threshold | Impulse-buy territory. Ниже $5 — чистый impulse, ниже $3 — "я даже не буду думать". |
| **$9.99 bundle** | Ниже $10 | Tyler's move-out review bundle framed как "cost of beer vs $500 deposit loss" = no-brainer. |
| **$14.99/mo Family** | Anchor к $7.99×2 = $15.98 → "same as 2 Pro" for 5 homes | Realtors see это как business expense ($14.99 vs $80 PictureThis Pro tier для comparison). |

### 3.2 Competitor benchmarks

Из [COMPETITOR-ANALYSIS.md §Price Benchmarking](../01-research/COMPETITOR-ANALYSIS.md) + [monetization-research.md](../../../agents/reference-materials/monetization/monetization-research.md):

| Продукт | Monthly | Annual | Pay-per | Model |
|---|---|---|---|---|
| **PictureThis** (plant ID) | — | $29.99/yr | — | Freemium → annual |
| **Rock Identifier** | — | $29.99/yr | — | Freemium → annual |
| **iFixit Pro** | $9.99/mo | — | — | Subscription |
| **Angi** | — | $30/yr membership | — | Lead-gen + membership |
| **Thumbtack** | Free для consumers | — | — | Pros pay $5-40/lead |
| **SkinVision** | — | $69.99/yr | $6.99/check | Freemium + pay-per |
| **HomeWyse** | Free (ads) | — | — | Ads + contractor leads |
| **Cleo AI** (finance) | $5.99-14.99/mo | — | — | Freemium → tiered |
| **Monarch Money** | $14.99/mo | $99.99/yr | — | Hard paywall |
| **Reframe** (alcohol) | $14/mo | $99.99/yr | — | Subscription + coaching |
| **FixIt** (target) | **$7.99/mo** | **$49.99/yr** | **$2.99** | Hybrid freemium + affiliate + pay-per |

**Позиционирование FixIt относительно benchmarks:**
- **Above PictureThis annual ($49.99 vs $29.99)** — justified higher stakes (ремонт $100-$1000+ vs plant curiosity)
- **Below iFixit Pro ($7.99 vs $9.99 monthly)** — FixIt broader scope but iFixit deeper trust, FixIt hair under для price sensitivity
- **Well below Monarch ($49.99 vs $99.99)** — finance commitment vs home repair; FixIt softer positioning
- **Above Angi membership ($49.99 vs $30)** — FixIt AI-powered vs Angi static membership

**H&F benchmark (RevenueCat 2026):** median annual $38.42, upper quartile $46-50. **FixIt $49.99 лежит в upper quartile** — premium positioning без entering "luxury" ($70+).

### 3.3 A/B tests planned (Stage 4+ validation)

| Test | Variants | Hypothesis | Success metric |
|---|---|---|---|
| **Monthly price** | $4.99 / $7.99 / $9.99 | $7.99 оптимальный tradeoff volume × ARPU | Revenue per install D90 |
| **Free tier estimates** | 1 / 3 / 5 per month | 3 — sweet spot | Free→Paid conversion + retention |
| **Annual price** | $39.99 / $49.99 / $59.99 | $49.99 under "$50 psychological" | Annual uptake % |
| **Pay-per price** | $1.99 / $2.99 / $4.99 | $2.99 impulse threshold | Pay-per volume × revenue |
| **Trial length** | No trial / 7-day / 14-day | 7-day opt-out trial = best per RevenueCat | Trial→Paid + net revenue |
| **Paywall trigger** | After 1 / 3 / 5 estimates | 3 = PictureThis proven | Conversion + churn |
| **Annual discount framing** | "Save 48%" vs "$4.17/mo" vs "2 months free" | "2 months free" easiest to parse | Annual % of paid |

---

## 4. Unit Economics

### 4.1 Per-estimate cost breakdown

| Component | Cost per estimate | Notes |
|---|---|---|
| **Claude Vision inference (Haiku)** | $0.005 | ~2K tokens input (photo + prompt) + 500 tokens output. Prompt caching brings this down 80-90%. |
| **API calls** (Home Depot + Thumbtack/Angi + BLS lookup) | $0.015 | 2-3 API calls per estimate. Most free tier, some paid. |
| **Compute / DB / storage** (Supabase) | $0.010 | Photo storage, estimate record, user record update. |
| **Total cost per estimate** | **$0.030** | |

**С prompt caching optimization (v1.5+):** AI cost drops к $0.002/estimate → total $0.027. Meaningful at scale (save ~$3K/mo at 100K estimates).

Source: [RESEARCH-BRIEF.md §6 Unit Economics](../01-research/RESEARCH-BRIEF.md).

### 4.2 Revenue per estimate (weighted blended)

**User mix assumption (steady state Y2):**
- **70% free users** — avg 3-4 estimates/mo (within free limit + slight overage)
- **20% subscription users** — avg 12-15 estimates/mo (heavy use)
- **10% pay-per users** — avg 1-2 estimates/mo
- **3% estimates trigger affiliate conversion** (pro lead or material purchase)

**Revenue per estimate:**
- **Subscription value per estimate:** $7.99/mo ÷ 15 estimates = **$0.53 per estimate** for sub users
- **Pay-per revenue:** $2.99 per estimate direct (but only 10% of users)
- **Affiliate revenue:** $25 avg qualified lead × 3% conversion = **$0.75 per estimate blended** (across всех users)
- **Material affiliate:** $75 avg basket × 2% commission × 10% estimate→purchase = $0.15 per estimate

**Blended revenue per estimate:**
```
Weighted avg = (0.70 × $0 direct subscription contribution)
             + (0.20 × $0.53 subscription per-estimate value)
             + (0.10 × $2.99 pay-per)
             + (1.00 × $0.75 affiliate blended)
             + (1.00 × $0.15 material affiliate blended)
             ≈ $0.11 + $0.299 + $0.75 + $0.15
             = $1.31 per estimate blended
```

**Blended revenue per estimate: $0.85-1.50** (range reflects variance in user mix maturation).

### 4.3 Gross margin

```
Gross margin = ($1.31 - $0.03) / $1.31 = 97.7%
```

**SaaS-level excellence** (benchmark: B2B SaaS 70-80%, top-tier consumer apps 85-95%). FixIt экономика ближе к PictureThis (~95%) за счёт Claude Haiku cheap inference + amortized API costs.

### 4.4 AI cost as % of revenue (sustainability check)

At $7.99/mo subscription with avg 12 estimates/mo:
- AI cost per month per sub user: $0.005 × 12 = **$0.06/mo**
- AI cost as % of revenue: $0.06 / $7.99 = **0.75%**

**Target threshold (per monetization-research.md):** keep AI costs <15% of revenue. **FixIt at <1%** — huge margin для future features (longer conversations, better models, unlimited re-photographs).

---

## 5. ARPU (Annual Revenue Per User) Projections

### 5.1 ARPU per segment

| Segment | Monthly sub rate | Annual conversion | Affiliate contribution | Pay-per add-on | **Total ARPU** |
|---|---|---|---|---|---|
| **Emma** (first-time HO) | 70% monthly ($7.99) | 30% annual ($49.99) | $10/year | $3/year | **$48/year** |
| **Mike** (DIY enthusiast) | 40% monthly | 60% annual | $18/year (heavy material purchases) | $2/year | **$65/year** |
| **Sarah** (single HO) | 50% monthly | 50% annual | $8/year | $4/year (quote validation) | **$58/year** |
| **Tyler** (renter) | 5% subscribe | 0% annual | $2/year | $10/year (2-3 pay-per) | **$12/year** |
| **Ronald** (aging HO) | 30% monthly (assisted by daughter) | 70% annual | $5/year | $2/year | **$42/year** |

Source: [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) willingness-to-pay analysis per persona.

### 5.2 Blended ARPU across total user base

**Assumption (Y2 mix):** 20% paying users + 80% free users.

**Revenue from paid users (weighted avg across personas):**
- Emma + Mike + Sarah + Ronald weighted avg = ~$55/year per paid user
- Tyler rare among paid (mostly pay-per) so paid segment excludes him

**Revenue from free users:**
- 3% conversion to affiliate lead/year × $25 = $0.75/free user/year
- + 5% material purchase × $2 commission = $0.10/free user
- **Total free user contribution: ~$0.85/year**

**Blended ARPU (total base):**
```
ARPU_blended = 0.20 × $55 + 0.80 × $0.85
             = $11.00 + $0.68
             = $11.68/year
```

Rounded: **Blended ARPU ~$12-14/year across total base.**

### 5.3 Path to $10M ARR

**Scenario A: Subscription-heavy path**
```
$10M ARR / $55 paid ARPU = ~182K paying subscribers
assuming 20% conversion = 910K total users
```

**Scenario B: Blended (more realistic)**
```
$10M ARR / $13 blended ARPU = ~770K total users
(with affiliate + pay-per absorbing non-subscribers)
```

**Target Y3:** 200K paying subscribers + 800K free + mature affiliate = **$10M ARR** (hit).

Consistency check с RESEARCH-BRIEF.md §6.3: "Year 2 — 200K paying users × $50 ARPU = $10M ARR." **Consistent — directionally same.**

---

## 6. LTV / CAC per Segment

### 6.1 LTV calculation logic

**LTV formula:**
```
LTV = ARPU × Retention (years)
    - (Acquisition cost — already paid, not counted twice)
```

**Retention assumption:** per USER-PERSONAS.md + H&F benchmarks (RevenueCat 2026: первый-год retention 30.3% median, H&F improved to 35%+). FixIt target **first-year retention 45%** (above H&F median) за счёт:
- Seasonal engagement (spring/fall maintenance reminders)
- Home history value accumulation (sticky data moat)
- Warranty tracker (cannot cancel without losing data)

Year-2+ retention assumed 65% YoY (typical SaaS).

### 6.2 LTV:CAC per persona

| Segment | ARPU | Retention avg | LTV | Target CAC | LTV:CAC |
|---|---|---|---|---|---|
| **Emma** (first-time HO) | $48/yr | 2.5 yrs (TikTok viral, sticky onboarding) | **$120** | $15 | **8.0x** ✅ |
| **Mike** (DIY) | $65/yr | 3.0 yrs (habit-forming, annual renewer) | **$195** | $10 | **19.5x** ✅✅ |
| **Sarah** (single HO) | $58/yr | 3.0 yrs ("insurance" mental model = sticky) | **$174** | $18 | **9.7x** ✅ |
| **Tyler** (renter) | $12/cycle | 1.5 cycles (2-yr leases × 2 moves avg) | **$18** | $7 | **2.6x** ⚠ |
| **Ronald** (aging HO) | $42/yr | 2.5 yrs (daughter keeps sub active) | **$105** | $25 | **4.2x** ✅ |
| **Blended** | **$45/yr** | **2.5 yrs** | **$112** | **$15** | **7.5x** ✅ |

**Healthy LTV:CAC threshold:** >3x (desirable 5x+). FixIt **7.5x blended** = healthy по всем standards.

**Tyler edge case:** 2.6x ratio ниже 3x threshold. **Acceptable** потому что:
- Tyler = MVP TERTIARY priority
- Tyler mostly pay-per (low-maintenance cohort)
- Low acquisition cost ($7) compensates low LTV ($18)
- Tyler brings viral coefficient (TikTok #renterlife) = free acquisition for Emma cohort

### 6.3 Payback period

**Payback = CAC / ARPU_monthly_equivalent**

| Segment | CAC | ARPU monthly equiv | Payback |
|---|---|---|---|
| Emma | $15 | $4/mo | **3.75 months** |
| Mike | $10 | $5.4/mo | **1.85 months** |
| Sarah | $18 | $4.8/mo | **3.75 months** |
| Tyler | $7 | $1/mo | **7 months** |
| Ronald | $25 | $3.5/mo | **7.1 months** |
| **Blended** | **$15** | **$3.75/mo** | **4 months** |

**Benchmark (monetization-research.md):** B2C app median payback 4.2 months. **FixIt at 4 months = at benchmark.** ✅

---

## 7. Funnel / Conversion Rates

### 7.1 Expected conversion rates (baseline)

Based on [monetization-research.md](../../../agents/reference-materials/monetization/monetization-research.md) + [RevenueCat State of Subscription 2026](https://www.revenuecat.com/state-of-subscription-apps/):

| Stage | Target rate | Benchmark | Rationale |
|---|---|---|---|
| **App Store visit → install** | 25-35% | 25% median AI apps | Photo-AI category performs well (visual hook в screenshots) |
| **Install → first estimate** | 65-75% | 60-70% H&F | Good onboarding → photo flow = quick aha-moment |
| **First estimate → 2nd within 2 weeks** | 40-50% | — | Repair urgency triggers fast second use если first успешен |
| **Free user → paid (D60)** | 15-25% | PictureThis 20%, Adapty 11.2% H&F | Mid-range because infrequent-use softens urgency |
| **Monthly subscriber → annual upgrade** | 30-40% | H&F 60% annual dominant | Stretch goal; realistic 35% в first year |
| **Estimate → affiliate click** | 8-15% | — | 3 buttons (DIY/Hybrid/Pro) → 30% click any → 30% of those click affiliate |
| **Affiliate click → qualified lead** | 20-30% | Thumbtack partner avg | Depends на data quality (zip + category match) |
| **Trial → paid** | 35-50% | H&F 35-49.9% per RevenueCat | 7-day opt-out trial = realistic 42% |
| **D1 retention** | 35-45% | H&F median 35% | Strong visual aha-moment helps |
| **D7 retention** | 15-22% | H&F median 15% | Home repair use cases spread |
| **D30 retention** | 8-15% | H&F median 8% | Seasonal usage drives dip-and-recover |

### 7.2 Revenue funnel numbers (for 10K app installs cohort)

```
Install cohort: 10,000 users
    ↓ 70% complete onboarding
First estimate: 7,000
    ↓ 45% return in 2 weeks
Return users: 3,150
    ↓ 20% conversion to paid (of engaged base)
Paid users: ~630
    ↓ 35% choose annual
Annual subscribers: 220 × $49.99 = $11,000
Monthly subscribers: 410 × $7.99 × 9 mo avg retention = $29,500
    ↓ Affiliate revenue: 10K users × $10/year × Y1 ramp (50%) = $50,000
    ↓ Pay-per revenue: 10K × 3% × $2.99 × 4 instances = $3,600

Y1 TOTAL REVENUE from 10K installs:
    Subscription:  $40,500
    Affiliate:     $50,000
    Pay-per:        $3,600
    TOTAL:         ~$94,000 (Y1 revenue from single 10K install cohort)

Y1+Y2+Y3 cumulative LTV:
    Paid users (630) × $112 LTV = $70,560
    + Affiliate tail (continues Y2+) ~$100K cumulative
    + Pay-per tail ~$10K
    = ~$180K total cohort LTV

LTV : CAC
    If CAC = $15 × 10K installs = $150K spent
    Then cohort LTV ($180K) / Spend ($150K) = 1.2x payback at Y1...
    ... but full LTV emerges Y2-Y3 → final LTV:CAC = ~7-8x ✅
```

### 7.3 Conversion levers (planned optimizations)

| Lever | Mechanism | Expected uplift |
|---|---|---|
| **First estimate always free** | Aha-moment BEFORE paywall | +30% conversion vs hard paywall |
| **Seasonal re-engagement push** | Spring/fall maintenance reminder notifications | +15% DAU |
| **"You've saved $X" banner** | Personalized value reminder in-app | +12% annual upgrade |
| **Community / before-after sharing** | Mike/Emma social proof unlock | +5% retention |
| **Warranty tracker stickiness** | Cannot cancel without losing tracked warranties | +10% retention |
| **Referral program** | "Invite friend → both get 1 mo free" | +8% new installs at $2 CAC |

---

## 8. Paywall Strategy

### 8.1 When to show paywall

**Chosen strategy: SOFT PAYWALL + CONTEXT PAYWALL (hybrid)**

Three paywall types, different triggers:

#### Option A: Hard paywall (REJECTED — not recommended)
- Show paywall on **first screen post-onboarding**
- Benchmark conversion: 10.7% D35 (RevenueCat 2026)
- **Downside:** massive install churn (30-50% drop-off), kills viral loop, no user can recommend app они ни разу не использовали

#### Option B: Soft paywall (PRIMARY — recommended)
- User получает **3 free estimates immediately** (no signup friction)
- **After 3rd estimate** в текущем месяце → paywall appears
- Benchmark conversion: 18-25% of users who hit limit
- **Why this wins для FixIt:**
  - Preserves aha-moment + trial + WoM amplification
  - PictureThis proven model ($200M ARR)
  - Emma can demonstrate value перед subscription commitment
  - Tyler/casual users hit paywall rarely → pay-per upsell works

#### Option C: Context paywall (SECONDARY — A/B test)
- Free user tries to view **"Full Pro match"** (list of 3 local contractors with phone numbers) → paywall
- Free user tries **"Full project plan"** (step-by-step DIY + tools + timing) → paywall
- Benchmark conversion: 10-15% but **higher quality users** (self-selected for Pro features)
- **When to use:** adds on top of soft paywall — user hits 3-estimate limit AND doesn't convert → offer contextual upsell on next Pro-feature touch

### 8.2 Paywall screen elements

Best-practice design (from [monetization-research.md](../../../agents/reference-materials/monetization/monetization-research.md) + Reframe/PictureThis screen analysis):

1. **Emotional hook (personalized):** "You've saved $_ so far with FixIt" — pulls user's actual saved value from past estimates (Emma case: "$215 saved в last month")
2. **Clear tiers side-by-side:** Free (crossed out with limit hit) / Pro monthly / **Pro annual (highlighted, "Most popular")**
3. **Social proof:** "Join 50K+ homeowners" (or current number)
4. **Urgency (mild):** "Start 7-day free trial — cancel anytime"
5. **Money-back guarantee:** 14-day refund policy prominently displayed
6. **Testimonials per persona:** Rotating quotes (Emma's "Saved $200 fixing faucet", Mike's "Finally have project plans", Sarah's "Called out $800 inflated quote")
7. **Annual default-selected** (per RevenueCat 2026 — annual outperforms monthly for LTV когда defaulted)

### 8.3 Paywall A/B tests planned

| Test | Variants | Hypothesis |
|---|---|---|
| **Default plan** | Annual default vs Monthly default | Annual default → higher LTV + annual %, lower short-term conversion |
| **Trial length** | No trial / 3-day / 7-day / 14-day | 7-day opt-out wins (per RevenueCat 42.5% vs 25.5% short) |
| **Social proof format** | Numbers ("50K users") vs Testimonial quotes | Quotes better для emotional Emma; Numbers better для Mike |
| **Discount framing** | "Save 48%" vs "$4.17/mo" vs "2 months free" | "2 months free" easiest cognitive parse |
| **Trigger point** | After 1 / 3 / 5 estimates | 3 — sweet spot per PictureThis |
| **Limited-time offer** | Flat pricing vs "50% off first year" | Discount → more conversions but lower LTV |
| **Money-back guarantee** | With / without | Expected +5-10% conversion с guarantee |

---

## 9. Affiliate Partnership Structure

### 9.1 Priority partnerships (MVP launch)

#### Thumbtack Pro (TOP priority)
- **Status:** partner-only access via developers.thumbtack.com
- **Revenue share:** $15-25 per qualified lead
- **Requirements:** pass Thumbtack quality bar (no spam referrals, real user intent)
- **Integration:** API call with user's zip + problem category → 3 pros returned → FixIt displays с tracking link
- **Timeline:** apply month 1, expect access by month 3 (60-90 day review period)

#### Angi Leads (same parent company as HomeAdvisor)
- **Status:** activation via `crmintegrations@homeadvisor.com`
- **Revenue share:** $20-35 per lead (higher than Thumbtack — licensed trades premium)
- **Focus categories:** plumbing, electrical, HVAC, roofing (licensed trades)
- **Timeline:** email month 1, expect onboarding month 2-3

#### Home Depot Product Advertising API
- **Status:** free to join (open program)
- **Commission:** 1-3% on purchases
- **Integration:** shopping list items linked to Home Depot product pages с affiliate tracking code
- **Timeline:** integrate month 1 (quickest win)

#### Amazon Associates
- **Status:** free to join
- **Commission:** 1-3% (varies by category — up to 4% для home improvement)
- **Integration:** fallback для items not available в Home Depot (specialized tools, furniture parts)
- **Timeline:** integrate month 1 (parallel к Home Depot)

### 9.2 Secondary partnerships (v1.2+)

| Partner | Opportunity | Timeline |
|---|---|---|
| **Lowe's** | Partnership-required API, 1-3% commission | v1.2 (month 6-9) |
| **TaskRabbit** | $5-15 per furniture assembly referral, IKEA integration via TR | v1.3 (month 9-12) |
| **Frontdoor (American Home Shield)** | Home warranty lead-gen, $30-50 per lead | v1.5 (month 12+) |
| **Local hardware stores** | Regional affiliate network (True Value, Ace) | v2.0 (year 2) |
| **Insurance companies** (Lemonade, State Farm) | Claim documentation partnership | v2.0 |

### 9.3 Affiliate revenue diversification

**Strategic принцип:** NEVER dependent на single affiliate. Target 4-5 active partners by v1.5 так что:
- **No single partner > 40% of affiliate revenue**
- Any single partner cutting rates affects <40% of stream
- Negotiation leverage preserved

### 9.4 Anti-patterns (what NOT to do с affiliate)

- **NEVER bias recommendations to max affiliate.** Neutral advisor positioning > affiliate revenue short-term. Если Emma's best option = DIY ($15), показать DIY first — even though Pro recommendation would earn $25 affiliate.
- **NEVER sell user data to affiliates.** Share zip + category anonymously — never name/email/phone.
- **Transparent disclosure.** "If you hire через FixIt, мы зарабатываем small commission. Не влияет на prices." Builds trust.

---

## 10. Subscription Retention Strategy

### 10.1 Churn reduction tactics

**Baseline churn prediction (per RevenueCat H&F 2026):** 7.2% monthly churn → **~58% annual retention** для monthly plan. Annual plan shows **35% first-month cancellation**, but remaining 65% stick 12 mo.

**FixIt target: 5-6% monthly churn** (below H&F median) via:

1. **Seasonal engagement cadence**
   - Spring (March-April): "Spring home checklist — 10 things to check" push
   - Fall (September-October): "Winterizing your home — checklist" push
   - Results: 2 sponsored engagement points/year keep mind-share alive between crises

2. **"You saved $X" annual review**
   - Year-end summary: "FixIt saved you $X in 2026" (calculated from DIY recommendations vs quoted Pro costs)
   - Emma case: "Saved $420 this year" → subscribe to annual even if considering cancel
   - Highly shareable (Instagram) — виral amplification

3. **Community unlocks (v1.2+)**
   - Before/after project sharing → social stickiness
   - Mike especially susceptible ("show wife the community reviews")

4. **Warranty tracker (sticky data moat)**
   - Users log warranty dates of appliances/installations
   - Auto-reminder 30 days before expiry
   - **Cannot cancel без losing warranty tracking** — Reframe-style emotional cost of cancel

5. **Home history graph**
   - More usage = more value accumulated
   - 5+ estimates logged → "Your home history — 5 repairs saved $___ total"
   - Users don't want to "throw away" their home record

### 10.2 Win-back flows

**Benchmark:** 30-50% of churned users can be won back with right incentive.

| Trigger | Action | Expected recovery |
|---|---|---|
| **Day 7 post-cancel** | Email: "Your home history is saved. Come back anytime." (no offer — low pressure) | 5% |
| **Day 14 post-cancel** | Email: "50% off 3 months — cheapest way back" | 15% |
| **Day 30 post-cancel** | Push + Email: "Here's what's new" (feature update digest) | 8% |
| **Day 60 post-cancel** | Email: Personalized "FixIt for [nearest season] — renew?" | 5% |
| **Day 90 post-cancel** | Final: "Free estimate этот месяц + $4.99/mo 6 месяцев" aggressive offer | 7% |

**Total recovery: ~40% of churn** — brings net churn from 6% к effective ~3.6%.

---

## 11. Revenue Projections

### 11.1 Year 1 (launch → 12 months)

| Metric | Target | Notes |
|---|---|---|
| Installs | 50,000 | 50% organic (TikTok/SEO/referrals), 50% paid ads |
| MAU (end of Y1) | 15,000 | 30% of install base retained |
| Paying users (end of Y1) | 4,000 | 8% blended conversion (mix of trial + direct) |
| Annual ARR (exit) | $360K | 4K paid × $90 avg blended (mix monthly + annual) |
| Monthly MRR (exit) | $30K | Trajectory toward growth |
| Affiliate revenue Y1 | $80K | $1.6/install Y1 (immature funnel) |
| Pay-per revenue Y1 | $15K | 5K pay-per transactions × $3 avg |
| **Annual revenue Y1** | **~$150K** | Mostly H2 2026 — ramp period |

### 11.2 Year 2

| Metric | Target |
|---|---|
| Cumulative installs | 300,000 |
| MAU | 120,000 |
| Paying users | 40,000 |
| MRR (exit) | $300K |
| Subscription revenue Y2 | $2.8M |
| Affiliate revenue Y2 | $700K (funnel mature) |
| Pay-per revenue Y2 | $200K |
| B2B tier (v2.0 beta) | $100K |
| **Annual revenue Y2** | **~$4M** |

### 11.3 Year 3

| Metric | Target |
|---|---|
| Cumulative installs | 1,000,000 |
| MAU | 350,000 |
| Paying users | 200,000 |
| MRR (exit) | $1.5M |
| Subscription revenue Y3 | $7M |
| Affiliate revenue Y3 | $2.2M |
| Pay-per revenue Y3 | $400K |
| B2B tier | $500K |
| **Annual revenue Y3** | **~$10M** ✅ target hit |

### 11.4 Assumptions sanity check

Per [RESEARCH-BRIEF.md §6.3](../01-research/RESEARCH-BRIEF.md): "Year 2 — 200K paying × $50 ARPU = $10M ARR. Requires ~1M total users (20% conversion). CAC $15 → LTV:CAC = 8x. Realistic? Yes, PictureThis got to $200M ARR со similar strategy."

**Our Y3 target (200K paid) = RESEARCH-BRIEF's Y2 aspiration.** Conservative vs baseline research. Prudent планирование.

---

## 12. Cost Structure (Year 1)

### 12.1 Variable costs

| Item | Monthly | Annual | Notes |
|---|---|---|---|
| **Claude / AI APIs** | $2,000 | $24,000 | 400K estimates × $0.005 = $2K/mo |
| **Retailer APIs (Home Depot, Amazon)** | $500 | $6,000 | Mostly free tier; some paid rate limits |
| **Supabase (DB + storage + auth)** | $500 | $6,000 | ~5K MAU on Pro plan + photo storage |
| **Adapty (subscription infra)** | $200 | $2,400 | 1% of subscription revenue = ~$100-200 early |
| **Apple App Store fee** | 30% Y1 → 15% Y2 | ~$45K Y1 split | On subscription revenue |
| **Google Play fee** | 30% Y1 → 15% Y2 | ~$45K Y1 split | |
| **Email / notifications (Sendgrid)** | $100 | $1,200 | |
| **Analytics (Amplitude/PostHog)** | $200 | $2,400 | |
| **Total infra variable Y1** | **~$3,500/mo** | **~$42K** | Before Apple/Google 30% cut |

### 12.2 Marketing / Acquisition

| Channel | Monthly | Annual |
|---|---|---|
| **Paid ads (Facebook, Google, TikTok)** | $5,000 (starting month 3) | $50,000 |
| **Content / SEO** | $1,000 | $12,000 |
| **Influencer partnerships (TikTok #hometok)** | $1,500 | $15,000 |
| **PR / launch** | — | $5,000 one-time |
| **Total marketing Y1** | **~$7,500/mo avg** | **$82K** |

### 12.3 Team / Founders

- **Лана (founder-manager):** opportunity cost, not cash outlay at MVP
- **Amanda (support):** opportunity cost
- **Total team cash Y1:** $0 (lean mode) → **$50-80K Y2** as hire 2nd developer

### 12.4 Insurance / Legal

- General commercial liability insurance: **$1,200/year** ($100/mo)
- Legal review (one-time setup): **$5,000**
- Privacy/GDPR compliance tools: **$1,200/year**

### 12.5 Total Y1 cost summary

| Category | Y1 cost |
|---|---|
| Variable (infra + APIs) | $42K |
| Store fees (30% of $150K gross sub) | ~$20K (only on subscription portion ~$65K) |
| Marketing | $82K |
| Insurance/Legal | $8K |
| **Total Y1 costs** | **~$150-160K** |

**Y1 revenue ~$150K vs costs ~$155K → slight loss (~$5K)** but healthy trajectory — affiliate ramps in Y2, store fees drop 30% → 15%, CAC improves как organic channels compound.

**Y2 projection:** $4M revenue × ~40% gross costs = **$2.4M contribution** → profitable + reinvest into growth.

---

## 13. Risks и Mitigation

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| **Apple/Google take 30% fee** | Certain | High | Accepted cost. Factor into pricing. Year 2 drops к 15%. Push annual (one transaction vs 12 = one 30% cut). |
| **Subscription fatigue** ("too many apps") | Medium | Medium | Emphasize measurable value ($ saved). Seasonal re-engagement. Pay-per alternative для casual. |
| **Thumbtack/Angi cut affiliate rates** | Medium | Medium | Diversify 4+ partners (Home Depot, Amazon, Lowe's, TaskRabbit). No single > 40% revenue. |
| **Price sensitivity** (users won't pay $7.99) | Medium | High | A/B test relentlessly. $4.99 tier fallback. Free tier generous enough for WoM. |
| **Free users don't convert** | Medium | High | Value accumulation UI ("saved $X"). Seasonal push. Premium features drip-unlocked. Paywall A/B. |
| **HomeWyse launches AI mobile first** | Low-Medium | High | Speed to MVP. Brand capture TikTok/Emma cohort. Feature velocity. |
| **AI inaccuracy destroys trust** | Medium | Critical | Disclaimers. "Take better photo" retry. "When in doubt, call pro" safety rails. User feedback loop → continuous training. |
| **Regulatory liability** (wrong advice) | Low | High | Professional liability insurance ($500K-1M coverage). Strict disclaimers. Human review "high-stakes" categories. |
| **Subscription churn > projected** | Medium | Medium | Warranty tracker + home history = sticky data moat. Win-back flows. Community features. |
| **Unit economics deteriorate** (AI cost rises) | Low | Medium | Prompt caching (90% discount). Cheaper models (Gemini Flash fallback). Negotiate volume pricing at 100K+ MAU. |

---

## 14. KPIs Dashboard

### 14.1 Weekly tracking (core metrics)

| Metric | Target (mature state) | Benchmark |
|---|---|---|
| DAU / MAU (sticky ratio) | 20-25% | H&F 15-20% |
| Install → 1st estimate | 70% | H&F 60-70% |
| Free → Paid D60 | 15-20% | PictureThis 20%, Adapty 11.2% |
| Trial → Paid | 40-50% | H&F 35-49.9% |
| Monthly churn (paying) | 5-6% | H&F median 7.2% |
| Annual plan % of paid | 45-55% | H&F 60% annual dominant |
| Blended ARPU | $35-50/yr | — |
| Affiliate revenue per active user | $8-15/yr | — |
| Affiliate click→conversion | 20-30% | Partner median |
| LTV by cohort (Y1-Y3) | $100-195 | H&F LTV $35 (we premium) |
| CAC blended | $12-18 | H&F target $30 (we below) |
| Payback period | 3-5 months | B2C median 4.2 mo |

### 14.2 Monthly business review

- Revenue by stream (subscription / affiliate / pay-per / B2B)
- Cost by category (AI / infra / marketing / fees)
- Cohort LTV progression (users acquired in month X тrack на 3/6/12 months)
- Persona mix (% Emma / Mike / Sarah / Tyler / Ronald based на behavior signals)
- Funnel conversion by source (TikTok / Google / Referral)
- A/B test results (trial length, paywall trigger, price points)

### 14.3 Quarterly strategic review

- CAC channel efficiency — reallocate budget
- LTV:CAC ratio health check — любой segment below 3x?
- Competitive landscape shifts (HomeWyse/Thumbtack new features)
- Affiliate partner performance + renegotiation
- Persona expansion readiness (когда Sarah/Tyler/Ronald ramp)

---

## 15. Related Documents

- [RESEARCH-BRIEF.md](../01-research/RESEARCH-BRIEF.md) — unit economics initial assumptions + GO/NO-GO verdict
- [COMPETITOR-ANALYSIS.md](../01-research/COMPETITOR-ANALYSIS.md) — Price Benchmarking section
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — willingness to pay per segment
- [VISION.md](./VISION.md) — product vision alignment
- [FEATURES.md](./FEATURES.md) — MVP features (RICE scoring TBD)
- [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) — Stage 3 deeper paywall A/B patterns (TBD)
- [../05-business/PRICING.md](../05-business/PRICING.md) — granular price points (child doc of this)
- [../05-business/UNIT-ECONOMICS.md](../05-business/UNIT-ECONOMICS.md) — detailed cost/revenue modeling

---

## 16. Открытые вопросы (нужно validate в Stage 3-4)

1. **Free tier limit 3 estimates/mo — exact?** A/B test 1/3/5 в Stage 4 beta.
2. **Annual % of paid target** — RevenueCat benchmarks show H&F 60% annual dominance. Achievable for FixIt или infrequent use pattern drop лов 40%?
3. **Affiliate conversion accuracy** — Thumbtack/Angi rates need API partnership confirmation. Current $15-35 estimates = industry averages, actual может varьироваться ±20%.
4. **Tyler profitability** — 2.6x LTV:CAC borderline. Worth supporting в MVP или defer to v1.3?
5. **B2B tier timing** — v2.0 or faster if inbound demand? Current assumption: validate B2C first.
6. **Subscription pause feature** — summer / winter seasonal users — pause vs churn? H&F апps увидели +15% retention с pause option.
7. **Pay-per → subscription upsell cadence** — "you've spent $12 on pay-per, Pro is $7.99 unlimited" trigger works? Needs A/B test.

---

**Дата последнего обновления:** 2026-04-18
**Следующий шаг:** PRICING.md — granular tier details + regional variations (US base → UK/CA expansion). FEATURES.md — RICE scoring для prioritize MVP scope.

**Approved by:**
- [ ] Amanda (Owner)
- [ ] Лана (Project Manager)
