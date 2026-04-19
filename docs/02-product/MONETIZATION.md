# MONETIZATION.md — FixIt

**Дата:** 19 апреля 2026
**Стадия:** Product Definition (Stage 2 — rescoped to AI-only)
**Автор:** Product Team (Лана + Amanda)
**Статус:** Final v2.0 (post-rescope)
**Companion docs:** [RESEARCH-BRIEF.md](../01-research/RESEARCH-BRIEF.md) | [COMPETITOR-ANALYSIS.md](../01-research/COMPETITOR-ANALYSIS.md) | [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) | [PRODUCT-VISION.md](./PRODUCT-VISION.md) | [FEATURES.md](./FEATURES.md)

---

## TL;DR

Revenue model (MVP v1.0): **subscription-only + pay-per fallback**. No partnerships, no affiliate marketplace, no manual contractor onboarding.

Ключевые числа:
- **Free tier:** 3 estimates/month forever
- **Pro Monthly:** $9.99/month
- **Pro Annual:** $49.99/year (58% discount vs monthly, annual pre-selected)
- **Pay-per-estimate:** $2.99 single (bypass subscription decision for casual users)
- **Amazon Associates deeplinks** on materials recommendations — 1-3% bonus revenue, no partnership, simple Amazon affiliate signup
- **NO Thumbtack / Angi / HomeAdvisor / Home Depot partnerships** in MVP

Expected blended ARPU: **$22-35/year** across всю user base, **$45-55/year** per paying subscriber. Lower ceiling than v1 plan (which assumed $8-15/user/yr from Thumbtack affiliate), but:
- Zero partnership dependencies
- Zero lead management infrastructure
- Zero content curation workload
- Zero legal complications (affiliate disclosure, FTC compliance for lead sites)
- Fully shippable by 1 developer + Amanda support in 4-6 months

Path to $1M ARR через **~18,000 paying users** (realistic Y1-2 trajectory for focused utility app).

Partnerships (Thumbtack/Angi/HomeAdvisor) возвращаются как **post-PMF v1.5+** feature — когда у нас traction и Thumbtack одобряет partner application.

---

## 1. Почему subscription + pay-per (и больше ничего) для MVP

### 1.1 Сила упрощения

Первая версия плана включала multi-channel (sub + affiliate + pay-per + future B2B). Это выглядело красиво на бумаге. На практике для Лана-solo-dev + Amanda-support:

- **Thumbtack partnership** — email заявка, quality review, juridical agreement, quarterly quality audits. Успех для стартапа без traction = <30%.
- **SKU curation** для 30 категорий — 2-3 недели human work. Ongoing maintenance.
- **Scraping HomeAdvisor/Homewyse** — legal grey zone, fragile, нужен anti-bot bypass.
- **RSMeans** — $1500/yr subscription, integration work.
- **Legal disclosures** для affiliate — FTC rules, privacy policy updates, state-specific rules.

Каждый из этих пунктов — недели работы + ongoing maintenance. Для MVP которое нужно **запустить за 4-6 месяцев 1 developer'ом** — это блокеры.

**Решение: AI делает всё.** Claude API identifies problem, estimates costs from training knowledge + optional web search, generates DIY guides on-the-fly, suggests material types. User ищет мастеров через Google/Thumbtack сам (deeplink без нашей аффилиации). Мы зарабатываем только на subscription.

### 1.2 Экономическая логика

Subscription-only выглядит как "хуже", но при ближайшем рассмотрении:

| Метрика | Старый план (sub + affiliate) | Новый план (sub-only) |
|---|---|---|
| ARPU (blended) | $35-50/yr | $22-35/yr |
| ARPU (paying) | $60-80/yr | $45-55/yr |
| Dev time to launch | 6-8 months | 4-6 months |
| Ongoing maintenance | High (SKU, scraping, partnerships) | Low (Claude prompts only) |
| Partnership risk | High (Thumbtack can reject/cancel) | Zero |
| Legal complexity | Medium (affiliate disclosures) | Low |

**Net:** мы теряем ~$13-15/user/yr affiliate revenue, но экономим ~2 months of dev time + 100% of partnership maintenance overhead. На small team это огромно. Revenue ceiling ниже но timeline faster, risk lower, operations simpler.

### 1.3 Precedent — PictureThis модель без affiliate tail

PictureThis ($200M ARR) — чистая subscription, без affiliate. Rock Identifier ($50M ARR) — то же самое. TripIt, CamScanner, Lifesum — все чистые subscription. Affiliate layer — дополнительный revenue driver в маркетплейсах (Thumbtack — утилита + маркетплейс), но для focused photo-AI utility чистая subscription проверенная pattern.

FixIt v1.0 = **PictureThis subscription engine**, без Thumbtack marketplace tail. Marketplace tail — возможная v1.5+ feature если получим Thumbtack partnership.

---

## 2. Revenue Streams (MVP)

### Stream 1: Subscription (primary, ~85% revenue)

| Tier | Price | What's included | Target persona |
|---|---|---|---|
| **Free** | $0 | 3 estimates/mo, basic DIY guide text, 1 saved history item, community-tier AI (Haiku) | Top-of-funnel для всех |
| **Pro Monthly** | **$9.99/mo** | Unlimited estimates, full Claude Sonnet AI (higher accuracy), full DIY guides, unlimited saved projects, price history, PDF export, priority support | Mike (DIY flexible), Emma monthly |
| **Pro Annual** | **$49.99/year** (эффективно $4.16/mo — 58% off monthly) | Всё из Pro + price alerts ("your repair category price dropped") + early access new features | Emma (annual), Sarah ("insurance against ripoff"), Ronald if daughter sets up |
| **Family (post-MVP v1.5+)** | **$14.99/mo или $99.99/year** | Up to 5 homes/accounts | Property managers, realtors, adult children managing parents' homes |

**Обоснование цен:**

- $9.99/mo — standard utility price point. Above PictureThis ($2.99/mo) because stakes are higher (repair $100-1000+ vs plant curiosity). Below iFixit Pro ($9.99/mo same tier) — we're AI-native.
- $49.99/yr — 58% discount vs monthly × 12 ($119.88). Annual pre-selection в paywall — industry standard dark pattern, acceptable for utility where user приходит редко.
- Annual tier capture target: 35-40% of paying users. Sarah and Emma skew annual, Mike flexibly tries monthly first.

**Обоснование лимита 3/mo на Free:**
- Industry benchmarks: PictureThis 3 IDs/week (high-frequency use case), FixIt 3/month (low-frequency episodic)
- Covers typical casual user (4-12 repairs/yr for household → 3/mo covers peaks)
- Intensive users (spring maintenance, post-move-in) hit limit and convert
- Generous enough для word-of-mouth ("tell your friend, they get 3 free")

### Stream 2: Pay-per-estimate (fallback для infrequent users)

| Option | Price | When shown |
|---|---|---|
| **Single estimate** | **$2.99** | Appears AFTER user hits 3-free limit + rejects subscription, OR as paywall bypass option |
| **Move-out bundle (Tyler persona, post-MVP)** | **$9.99** | 5 estimates for renters doing deposit-recovery sweep |

**Why pay-per matters:**
- Tyler persona (renter, infrequent, moves out once/year) — никогда не купит subscription, но заплатит $2.99 в момент нужды
- Ronald persona (senior, once/year repair) — same logic
- **Abandonment recovery:** ~15% users who reject subscription will pay $2.99 in the moment if the alternative is "wait 30 days for next free estimate or leave"

**Revenue impact:** expected ~10-15% of Y1 revenue from pay-per.

### Stream 3: Amazon Associates deeplinks (bonus, ~5% revenue, zero effort)

**What:**
- В shopping list (DIY mode), под каждой материальной рекомендацией — deeplink "Buy on Amazon" с Amazon Associates tracking
- 1-3% commission on purchases made through our link within 24hr
- No API integration, no SKU curation, no partnership — just Amazon Associates affiliate signup (takes 1 day, free)

**Why:**
- Emma/Mike часто buy materials через Amazon (Prime 2-day convenient)
- Incremental revenue with essentially zero incremental cost or effort
- Revenue target Y1: ~$500-2000 total (small but real)

**What we don't do:**
- ❌ Home Depot Product Advertising API — we'll recommend "search 'kitchen faucet cartridge kit' at Home Depot" without deep-linking or affiliate (v1.5+ if easy)
- ❌ Lowe's partnership — not pursuing
- ❌ Walmart, Target affiliate — not pursuing (focus)

**Legal:** standard Amazon Associates disclosure in app footer + Privacy Policy. No FTC complications.

---

## 3. Revenue Projections (10K cohort, conservative)

Based on FUNNEL.md expected rates, adjusted for subscription-only model:

```
Install: 10,000
├── Onboarding complete (85%): 8,500
├── First estimate reached (88%): 7,480
├── Returning W1 (45%): 3,366
├── Hit 3-estimate limit (D60, 50% of W4): 673
├── Paid conversion among exposed (28%): 188
│   ├── Annual ($49.99, 38% of paid): 71 × $49.99 = $3,549
│   ├── Monthly ($9.99 × avg 5mo lifetime, 55% of paid): 103 × $49.95 = $5,145
│   └── (7% trials/cancels early, no revenue)
└── Pay-per-estimate ($2.99, ~3% of non-paying users × avg 1.5 purchases): 250 × $4.49 = $1,123

Amazon Associates (~3% of estimates click, ~25% convert, avg 3% commission on $30 cart):
  ~ 225 clicks × 25% × $0.90 = ~$200

Y1 Total Revenue (10K cohort): ~$10,017
Y1 Blended ARPU per install: $1.00
Y1 ARPU per paying user: ~$47
```

**Y2 improvements** (annual renewals + maturation):
- Annual renewal rate ~65% → 46 users × $49.99 = $2,300 in renewals
- Plus Y1 cohort converts more через Y2 (another ~25 paying users late conversion)
- Y2 cumulative revenue (10K cohort): ~$18-22K

**Path to $1M ARR:**
- Need ~22,000 paying subscribers concurrently
- At 2% install→paid conversion, need ~1.1M installs
- Realistic by Y2 H2 with ASO-driven growth + reasonable paid marketing spend

---

## 4. Pricing — WTP research validation

Based on USER-PERSONAS.md + DOMAIN-DEEP-DIVE.md WTP signals:

| Persona | Anchoring | Probable tier | Likely behavior |
|---|---|---|---|
| **Emma** (primary) | "$50/yr < one ripoff quote" | Annual | Tries free 3 estimates, hits limit after Spring burst, subscribes annual |
| **Mike** (DIY enthusiast) | "$10/mo = one YouTube premium" | Monthly first, annual after 3 mo | Cycles between monthly/annual based on project density |
| **Sarah** (quote validator) | "$50/yr = insurance against $500 ripoff" | Annual | Subscribes on first hit of free limit |
| **Tyler** (renter) | "$3 once = less than Starbucks" | Pay-per only | Never subscribes, pays per estimate as needed |
| **Ronald** (senior) | "$50/yr if daughter recommends" | Annual (if daughter sets up) OR pay-per | Variable — depends on entry point |

**Sensitivity tests planned (A/B in first 90 days):**
- $7.99 vs $9.99 monthly — does lower price increase conversion enough to offset?
- $39.99 vs $49.99 vs $59.99 annual — finding sweet spot
- 2 vs 3 vs 5 free estimates/month — does generosity drive higher conversion long-term?

---

## 5. Unit economics

**Cost per estimate:**
- Claude Haiku Vision (free tier): ~$0.003/estimate
- Claude Sonnet Vision (paid tier only, better accuracy): ~$0.015/estimate
- Supabase storage + DB: negligible (<$0.001/estimate amortized)
- **Total cost:** $0.005-0.020 per estimate depending on tier

**Revenue per estimate:**
- Free user (3/mo × $0 + amortized Amazon click): ~$0 direct, ~$0.05 affiliate
- Monthly paid user (avg 4 estimates/mo × $9.99/4): ~$2.50/estimate
- Annual paid user (avg 3 estimates/mo × $49.99/36): ~$1.40/estimate
- Pay-per user: $2.99/estimate

**Gross margin:**
- Free: -$0.005 per estimate (loss leader for conversion)
- Paid monthly: 99% ($2.50 - $0.02)
- Paid annual: 98.5% ($1.40 - $0.02)
- Pay-per: 99.3% ($2.99 - $0.02)

**Blended gross margin:** ~97% (after subsidizing free tier). Industry-leading for AI utility.

**LTV calculations:**
- Monthly sub LTV: $9.99 × avg 5 months × 0.97 margin = $48
- Annual sub LTV: $49.99 × 1.65 renewals × 0.97 margin = $80
- Pay-per LTV: $2.99 × avg 2 purchases × 0.97 margin = $5.80

**CAC target:** $15-25 blended via ASO + low-cost social

**LTV:CAC target:** 3-5x (healthy utility app benchmark)

---

## 6. Paywall strategy (reference PAYWALL-RESEARCH.md)

Per PAYWALL-RESEARCH §1.3 — **soft paywall after 3rd estimate**, not hard on onboarding.

Key dynamics:
- **First 3 estimates completely free** — no signup required, local storage
- **After 3rd estimate:** soft bottom sheet "You've had 3 on us. Want more?"
- **Three options visible:**
  1. Annual $49.99 (pre-selected, "BEST VALUE" ribbon)
  2. Monthly $9.99 (alternative)
  3. Pay-per $2.99 (fallback, smaller, lower in hierarchy)
- **Politely exit:** "Not now, back to home" — we respect the no
- **Context paywalls** on 5 premium features: Pro Match (deeplink still free but reports premium), Save Project (free limited to 1), Warranty Tracker, PDF Export, Price Alerts

No forced trial (avoid auto-charge friction). No loss aversion dark patterns. Clean, honest, utility-grade.

---

## 7. What changed from v1 plan (partnership-heavy)

Summary of rescoping decisions (for anyone reading the commit history):

| Feature / Stream | v1 (partnership) | v2 (AI-only MVP) | Decision |
|---|---|---|---|
| Cost Estimate Engine | Home Depot + Amazon + RSMeans + BLS + scraping | Claude API + BLS public CSV | Simpler, faster, accuracy -10% but 80% of value |
| Pro Match | Thumbtack/Angi API with affiliate $15-40/lead | Deeplink to Thumbtack/Google Maps (no affiliate) | Lose $8-15/user/yr revenue but skip partnership dependency |
| Shopping List | Home Depot API + curated SKUs + Amazon | Claude generates list + Amazon Associates deeplinks only | Skip SKU curation work, keep Amazon bonus |
| DIY Guide | 30 curated guides × content editor × legal review | Claude generates per-problem + suggests YouTube search query | Skip content production workload entirely |
| Affiliate revenue | $8-15/user/yr target | $0.05/user/yr target (Amazon only) | Revenue hit: -$130-150K ARR on 10K cohort |
| Subscription revenue | Same as new plan | Unchanged | $9.99/$49.99 unchanged |
| Time to MVP | 6-8 months | 4-6 months | Ship sooner, iterate on data |

**Revenue trade-off:** lose ~$130-150K ARR per 10K cohort annually from affiliate. Gain:
- 2+ months dev time saved
- Zero partnership maintenance
- Zero legal complications
- Zero content production
- Zero scraping infrastructure

Amanda's decision (2026-04-19): **ship sooner, add affiliate as v1.5+ post-PMF feature if Thumbtack approves partnership after we have traction.**

---

## 8. Decision log

| Дата | Решение | Причина |
|---|---|---|
| 2026-04-18 | Multi-channel hybrid (sub + affiliate + pay-per) | Initial plan based on "best of both worlds" PictureThis + Thumbtack |
| 2026-04-19 | **Rescope to subscription-only + pay-per** | Partnership dependencies too complex for solo-dev MVP. AI can do 80% of the value without Thumbtack/Angi. Ship faster, add partnerships post-PMF if approved. |

---

## 9. Open questions (for sensitivity testing post-launch)

1. **Free tier size (2 vs 3 vs 5 estimates/mo)** — does generosity drive long-term paid conversion?
2. **Monthly price ($7.99 vs $9.99 vs $11.99)** — elasticity test
3. **Annual anchor discount (48% vs 58% vs 65%)** — pushes more annual?
4. **Pay-per inclusion in paywall** — does showing $2.99 option kill subscription conversion?
5. **Amazon Associates disclosure placement** — footer vs per-item?
6. **Emergency pricing** (burst pipe, no heat) — premium priority lane for urgent?

---

**Next step:** Stage 5 Design (Лана starts Stitch work). Monetization doc referenced in paywall screens.

**Approval needed:** Amanda (confirmed 2026-04-19 — "переделываем под AI-only") + Лана (to be briefed).
