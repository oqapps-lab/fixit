# FUNNEL.md — FixIt

**Дата:** 2026-04-20
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** UX Design (Stage 4) — rewritten v2.0 post-rescope
**Автор:** Product Team (Лана + Amanda)
**Статус:** Final v2.0 (subscription-only MVP)
**Companion docs:** [POSITIONING.md](../02-product/POSITIONING.md) | [MONETIZATION.md](../02-product/MONETIZATION.md) | [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) | [RETENTION-RESEARCH.md](../03-practices/RETENTION-RESEARCH.md) | [UX-SPEC.md](./UX-SPEC.md)

---

## TL;DR

Полная воронка FixIt от install до long-term subscription с expected rates для 10K cohort, стадия-за-стадией метриками, red flag thresholds, cohort framework и A/B testing roadmap. После rescope 2026-04-19 — **subscription-only + pay-per + tiny Amazon Associates bonus**. Аффилиатного стрима (Thumbtack/Angi $15-40/lead) больше нет.

Ключевые expected rates (US market, mature state Y2+):
- Install → First estimate: **74.8%** (85% onboarding × 88% estimate completion) — unchanged
- First estimate → W1 return: **45%** — unchanged
- Paid conversion by D60: **18-25%** среди hit-limit users (≈20% blended of installs) — unchanged
- **Amazon Associates revenue per active user: $0.05/year** (tiny, ~$500 Y1 на 10K cohort)
- W4 retention (all cohorts): **40%** (above PictureThis baseline 35%) — unchanged
- **Y1 revenue per 10K cohort: $9-11K** (было $14-16K с affiliate) — lower ceiling but zero partnership risk

Метрики отслеживаются weekly/monthly/quarterly cadence с red flag escalation. Первые 90 дней post-launch — 8 priority A/B tests в pricing / onboarding / paywall (affiliate-related tests removed, savings-anchor tests added).

---

## 1. Overview

Funnel FixIt — **simpler chain**, 3 parallel revenue streams (был 4):

- **Core subscription path:** Install → Onboarding → First estimate → Return → Paid
- **Pay-per path:** Hit limit → Pay-per-estimate $2.99 (bypasses subscription decision)
- **Amazon Associates path:** Shopping list click → Amazon purchase within 24hr → 1-3% commission (passive, tiny)
- **Viral path:** Successful DIY → Share savings → Friend installs → New cohort

**УДАЛЕНО v1 → v2:**
- ❌ Affiliate path (First estimate → Pro tab → Thumbtack click → Qualified lead → Revenue) — больше не existing в MVP

Воронка измеряется через AARRR (Acquisition / Activation / Retention / Revenue / Referral) с одним enriched slice: **Cohort LTV progression**.

Источники benchmark: [MONETIZATION.md §7.1](../02-product/MONETIZATION.md), [PAYWALL-RESEARCH.md §1.1 / §11.3](../03-practices/PAYWALL-RESEARCH.md), [RETENTION-RESEARCH.md §1.3](../03-practices/RETENTION-RESEARCH.md), RevenueCat State of Subscription 2026, Adapty 2026 H&F data.

---

## 2. Top-level Funnel (US Market, 10K Install Cohort)

```
App Store Impressions: ~30,000
    ↓ [33% listing CVR]  ────────── ASO benchmark Utilities 32-35%
Install: 10,000
    ↓ [85% complete onboarding]  ── Light onboarding (3-5 screens)
Onboarding completed: 8,500
    ↓ [88% reach first estimate]  ─ Photo flow well-optimized
First estimate: 7,480
    ↓ [45% return within 7 days]  ─ Seasonal/urgency retention
Return user (W1): 3,366
    ↓ [40% return within W4]  ──── Above PictureThis 35% baseline
Return user (W4): 1,346
    ↓ [50% hit 3-estimate limit by D60]
Paywall exposed: 673
    ↓ [36% convert среди exposed by D60] ── No affiliate to subsidize; conversion target matters MORE
Paid user: 242 from cohort
    ↓ [35% choose annual]
Annual subscribers: 85
    ↓ [65% renew at 12 months]
Long-term paid: 55

Parallel — pay-per-estimate stream:
    ↓ [3% of free users buy at least 1]
Pay-per purchases: ~225 × avg 1.5 purchases
Pay-per revenue: ~$1,010 (Y1)

Parallel — Amazon Associates (tiny):
    ↓ [~3% of DIY estimates → Amazon click → 25% convert]
Affiliate clicks: ~225 × 25% conversion × ~$0.90 avg commission
Amazon revenue: ~$50-200 (Y1)
```

**Y1 revenue summary (10K cohort):**

| Stream | Amount | % of total |
|---|---|---|
| Subscriptions (annual $49.99 × 85 + monthly partial × 103 × avg 5 mo) | ~$8,694 | ~86% |
| Pay-per ($2.99 × 225 purchases × avg 1.5) | ~$1,010 | ~10% |
| Amazon Associates (passive) | ~$150 | ~1.5% |
| **Total Y1 revenue (10K cohort):** | **~$9,854** | 100% |
| Y1 ARPU per install | $0.99 | |
| Y1 ARPU per paying user | ~$47 | |

**Y2 improvements** (annual renewals + cohort maturation):
- 65% annual renewal (~55 users × $49.99) = $2,750 in pure renewal revenue
- Y1 cohort late converts (~25 new paying in Y2) add ~$1,175
- Y2 cumulative cohort revenue: ~$15-18K

---

## 3. Stage-by-stage metrics (AARRR)

### Acquisition

| Metric | Target (mature) | Ramp period | Source |
|---|---|---|---|
| Impression → Install (listing CVR) | 33% | 25-28% first 30 days | Adapty ASO 2026 H&F Utilities |
| Organic install share | 70%+ | 50% first 90 days | ASO-driven, no paid marketing budget MVP |
| CPI (if paid) — cap | $3.50 | $5+ first test | Sanity-check; ASA if LTV/CAC allows |

### Activation

| Metric | Target | Status | Notes |
|---|---|---|---|
| Install → Onboarding complete | 85% | Core unchanged | 3-5 screens, camera permission priming |
| Onboarding → First estimate | 88% | Core unchanged | Photo flow well-optimized |
| Install → Aha moment (≤90 sec) | 74.8% | **Primary North Star** для activation | 85% × 88% |
| First estimate within 2 min of install | 70%+ | Tracking signal | If low, camera friction |

### Retention

| Metric | Target | Adjusted post-rescope? |
|---|---|---|
| D1 retention | 45% | Unchanged |
| W1 return | 45% | Unchanged |
| W4 return | 40% | Unchanged (above PictureThis 35%) |
| D90 retention | 25% | Unchanged |
| Save-to-My-Home rate (per estimate) | 40% | **NEW primary retention signal** |
| Push opt-in rate | 60%+ | Notification copy now savings/seasonal, not "pro updates" |
| Seasonal push open rate | 35% | Target per RETENTION-RESEARCH §3.2 |

### Revenue

| Metric | Target (v2.0) | Was (v1.0) | Why changed |
|---|---|---|---|
| Paywall exposure rate (hit 3-limit) | 50% of W4 | 50% | Unchanged |
| Paid conversion среди exposed (D60) | **36%** | 36% | Unchanged — critical target (no affiliate backstop) |
| Blended install → paid conversion | 18-25% | 18-25% | Unchanged |
| Annual tier share среди paid | 35% | 40% | Slightly lower without "best value" annual-only feature differentiation |
| Pay-per attach rate среди free rejecting sub | 3% | 3% | Unchanged |
| ~~Affiliate click rate per estimate~~ | ~~N/A~~ | ~~8-15%~~ | **REMOVED** |
| ~~Affiliate-to-qualified-lead~~ | ~~N/A~~ | ~~20-30%~~ | **REMOVED** |
| Amazon Associates click rate (DIY users) | 20-25% | — | NEW (small) |
| Amazon conversion (~25% of clicks) | ~25% | — | NEW (industry avg) |

### Referral

| Metric | Target | Notes |
|---|---|---|
| Share rate per aha user | **15%** | Was 12% — higher because savings-anchor share is stronger viral hook than "found a pro" |
| K-factor (viral coefficient) | **0.4-0.6** | Was 0.3 — savings social proof ("I saved $185") stronger |
| Share → install conversion | 18% | Utility benchmark |
| First-DIY-success share rate | 25% | Peak emotional positive moment |

---

## 4. Conversion benchmarks per persona

Assumed distribution (from USER-PERSONAS.md): Emma 40% / Mike 25% / Sarah 20% / Tyler 10% / Ronald 5%

| Metric | Emma | Mike | Sarah | Tyler | Ronald |
|---|---|---|---|---|---|
| Onboarding complete | 85% | 90% | 82% | 75% | 70% |
| First estimate | 88% | 92% | 85% | 80% | 75% |
| W1 return | 48% | 55% | 40% | 20% | 30% |
| Save-to-My-Home | 45% | 55% | 30% | 15% | 25% |
| Paywall exposed by D60 | 55% | 65% | 60% | 10% | 30% |
| Paid conversion среди exposed | 42% | 35% | 48% | 5% | 30% |
| Pay-per conversion | 2% | 1% | 3% | **20%** | **12%** |
| Amazon click (DIY) | 20% | 35% | 10% | 15% | 15% |
| Annual tier share (среди paid) | 45% | 28% | 60% | — | 55% |
| Share savings rate | 20% | 15% | 12% | 5% | 8% |

Key insights:
- **Sarah** — highest paid conversion (48%) but lower W1 return (her use case is episodic — she has specific quote to validate)
- **Tyler** — pay-per dominant (20% vs 2-3% others) because never subscribes
- **Mike** — highest Amazon click (35%) because DIY-heavy
- **Emma** — baseline across all metrics, balanced persona

---

## 5. Red Flag Thresholds

Что считать проблемой на каждой стадии funnel:

| Metric | Healthy | 🟡 Alarm | 🔴 Critical | Response |
|---|---|---|---|---|
| Install → First estimate | >70% | 60-70% | <60% | Critical: camera/onboarding broken, investigate within 7 days |
| W1 return | >40% | 30-40% | <30% | Aha moment not strong enough; redesign estimate result screen |
| Paywall exposed → Paid | >30% | 22-30% | <22% | Pricing/copy issue; run A/B immediately |
| Blended paid conversion | >18% | 13-18% | <13% | Kill-metric; pricing/paywall timing issue, major rework |
| Churn (monthly sub) | <6% | 6-10% | >10% | Retention broken; re-engagement email/push |
| Annual renewal rate | >60% | 50-60% | <50% | Value prop unclear at renewal; prompt refresh needed |
| Push opt-out rate | <3% | 3-5% | >5% | Notification fatigue; cut frequency |
| ~~Affiliate click rate~~ | ~~N/A — removed from MVP tracking~~ | | | |
| Save-to-My-Home | >35% | 25-35% | <25% | Savings prompts/UI not sticky |

**Protocol:** any 🔴 critical metric triggers weekly war-room until resolved. 🟡 alarm logs in Monday review.

---

## 6. Metrics Dashboard Priorities

### Weekly review (Monday standup)

| Dashboard | Source | Owner |
|---|---|---|
| Install + onboarding funnel | Supabase + Firebase Analytics | Лана |
| Paid conversion breakdown | Adapty dashboard | Amanda |
| Push open rates | Supabase (sent/opened tracking) | Лана |
| Crash-free rate | Sentry / Firebase Crashlytics | Лана |
| Save-to-My-Home rate | Supabase query | Amanda |

### Monthly review

| Dashboard | Source |
|---|---|
| Cohort retention curves (D1 / W1 / W4 / D90) | Mixpanel or custom | Amanda |
| MRR growth + churn | Adapty | Amanda |
| ASO ranking for key keywords | App Radar / AppTweak | Amanda |
| Review volume + sentiment | App Store Connect / Play Console | Amanda |
| Amazon Associates earnings (tiny stream, tracked for bonus) | Amazon Associates dashboard | Лана |

### Quarterly review

| Dashboard | Purpose |
|---|---|
| Financial projection vs actual | Cash flow management |
| Persona distribution actual vs target | Positioning validation |
| Competitive landscape update | Market awareness |
| Feature ROI (RICE retrospective) | Priority calibration |
| Partnership feasibility re-assessment | **NEW Q2 Y2:** Thumbtack/Angi possible partnership if we have traction (5K+ MAU) |

---

## 7. A/B Testing Roadmap (first 90 days post-launch)

8 priority tests:

### Pricing tests (highest impact)

1. **Monthly price elasticity** — $7.99 vs $9.99 vs $11.99 monthly. Does lower price increase conversion enough to offset ARPU hit? Target: identify sweet spot by D60.

2. **Annual anchor discount** — 48% vs 58% vs 65% off monthly (annual at $39.99 vs $49.99 vs $59.99). Does more aggressive discount drive more annual share? Target: annual share >40% with ARPU maintained.

3. **Free tier size** — 2 vs 3 vs 5 estimates/mo. Does generosity drive word-of-mouth + long-term paid conversion? Target: identify generosity sweet spot.

### Paywall tests

4. **Savings anchor in soft paywall** — "You've saved $485 — keep going" (savings-anchored) vs "Unlock unlimited estimates" (feature-anchored). Which converts higher? Hypothesis: savings-anchored wins for Emma/Sarah, feature-anchored for Mike.

5. **Pay-per visibility** — show $2.99 option in soft paywall vs hide until sub rejected. Hypothesis: visible option cannibalizes subscription, should be hidden OR shown only after rejection.

### Onboarding tests

6. **Welcome tagline** — "Know the price before the panic" vs "Take a photo. Know the price. Decide what to do." vs "Snap. Know. Decide." Which drives highest Install → First estimate conversion?

7. **Permission priming sequence** — camera permission priming screen YES/NO before system dialog. Does priming lift grant rate from 68% to 85%?

### Share tests

8. **Share card format** — "I saved $185 going DIY" text card vs painted scene card vs before/after photo. Which drives highest share rate + K-factor?

### REMOVED v1 → v2

- ~~**Pro Match conversion test** — different pro-list layouts~~ — feature removed
- ~~**Affiliate attribution test** — Thumbtack vs Angi routing~~ — stream removed
- ~~**Pro Match context paywall copy**~~ — paywall removed

---

## 8. Growth Loops

3 growth loops (было 4 — affiliate loop удалён):

### Loop 1: Viral (primary — savings share)

**Mechanism:** Successful DIY → celebratory UI → "I saved $185 going DIY with FixIt" share card → friend installs → new cohort.

K-factor target: 0.4-0.6. Stronger than v1 (0.3) because savings claim is concrete + impressive ("$185 saved" vs generic "check this app").

**Key drivers:**
- First DIY success rate >60%
- Share rate per success moment >25%
- Share → install conversion >18%

### Loop 2: Content (ASO-driven)

**Mechanism:** Long-tail "home repair cost" searches → App Store listing → install → organic ASO lift from reviews.

Target: 70% organic install share by Y2 H1.

**Key drivers:**
- Keyword rankings (top-5 for "home repair cost", top-10 for "repair estimate")
- Review volume (aim 4.5+ stars, 500+ reviews by Y1 Q4)
- Category leader positioning in Utilities/Tools

### Loop 3: Data (estimate accuracy flywheel)

**Mechanism:** User completes fix → self-reports actual cost → feeds back into Claude prompt accuracy → better estimates for next user → higher NPS → more reviews → more installs.

Not immediate revenue driver but defensibility layer (data moat grows with scale).

**Key drivers:**
- Mark-complete rate >20% of estimates
- Self-reported actual cost accuracy within 25% of estimate (validation signal)

### REMOVED

- ~~Loop 4 Affiliate — removed~~

---

## 9. Cohort Analysis Framework

Stratify cohorts по 7 slices для понимания что работает:

1. **Acquisition source** — organic vs paid vs viral vs referral
2. **Device** — iOS vs Android (different payment flows)
3. **Geography** — US vs UK/CA/AU (post-v1.5)
4. **Season** — spring (maintenance) vs fall (winter prep) vs emergency (plumbing winter)
5. **Persona signal** — based on onboarding answers (DIY level + quality tier → proxy для Emma/Mike/Sarah)
6. **First-estimate category** — plumbing vs electrical vs furniture (different engagement patterns)
7. **Urgency** — emergency (broken pipe) vs preventive (seasonal) — different retention

Compare cohorts on:
- D30 / D60 / D90 retention
- Paid conversion
- LTV
- Share rate
- Most-used features

**Example insight:** Spring-acquired Emma cohort may show 55% paid conversion (high urgency + "before summer" planning) vs Fall-acquired Emma 35% (less urgency until winter).

---

## 10. Financial Projection Y1-Y3 (post-rescope)

**Break-even analysis:**

Cost side (monthly, per 10K cohort, month 6):
- Claude API (Haiku + Sonnet mix): ~$120/mo at scale (3K estimates/mo cohort-wide)
- Supabase (Pro plan + storage): ~$45/mo
- Adapty ($25/mo minimum for subscription infra): $25/mo
- App Store + Google Play fees: 30% of gross revenue first year
- Total fixed ops: ~$190/mo

Revenue Y1 trajectory (per 10K cohort, cumulative):

| Month | Cumulative paid users | Monthly revenue | Cumulative revenue |
|---|---|---|---|
| 1 | 8 | $65 | $65 |
| 2 | 22 | $180 | $245 |
| 3 | 55 | $450 | $695 |
| 6 | 142 | $1,160 | $4,280 |
| 9 | 200 | $1,630 | $8,600 |
| 12 | 242 | $1,970 | **$9,854** |

Per-install economics:
- **Y1 ARPU per install: $0.99**
- **Y1 ARPU per paying user: ~$47**
- **Gross margin: ~97%** (Claude API ~$0.02/estimate, revenue ~$0.50-$2.50/estimate)
- **Blended LTV Y1: ~$35-50** (accounting for churn + renewal)
- **CAC target (blended): $15-20** via ASO + low-cost viral
- **LTV:CAC ratio: 2.5-3.5x Y1, improving to 4-5x Y2-3**

**Path to $1M ARR:**
- Need ~18,000 paying subscribers concurrently (at $47 ARPU)
- At 2% install → paid blended, need **900,000 installs cumulative**
- Realistic by **Y2 H2** with ASO-driven + viral growth + modest ASA spend

**Path to $10M ARR:**
- Need 180,000 paying users
- Requires ~9M installs cumulative
- Y3-4 territory with scaled acquisition

---

## 11. Ship Criteria (Stage 4 → Stage 5 checkpoint)

Before starting Stage 5 Design, verify:

- [x] POSITIONING.md finalized
- [x] FEATURES.md rewritten under AI-only model
- [x] MONETIZATION.md v2.0 (subscription-only)
- [x] SCREEN-MAP.md v2.0 (42 screens, Pro Match simplified)
- [x] USER-FLOWS.md v2.0 (7 flows, Flow 4 & 7 rewritten)
- [x] WIREFRAMES.md v2.0 (19 wireframes, Pro Match sheet simplified)
- [x] UX-SPEC.md v2.0 (brand voice updated)
- [x] ONBOARDING-RESEARCH v2.0
- [x] PAYWALL-RESEARCH v2.0 (4 context paywalls, no Pro Match gate)
- [x] RETENTION-RESEARCH v2.0 (savings anniversary, seasonal, home health — no "new pros")
- [x] ASO-RESEARCH v2.0 ("home repair cost" keyword primary)
- [x] PRACTICES-BRIEF v2.0 (synthesis)
- [x] FUNNEL v2.0 (this doc — affiliate stream removed)
- [ ] UX-BRIEF v2.0 (next — synthesis of Stage 4)

**Status:** 13/14 ready. Finalizing UX-BRIEF next.

---

## 12. Open questions for post-launch validation

1. **Savings anchor effectiveness** — does "$X saved this year" in soft paywall actually convert better than feature-list framing? (A/B test 4 above)
2. **Pay-per cannibalization** — does $2.99 option kill sub conversion? (A/B test 5)
3. **Find-a-Pro sheet abandonment** — do users actually click Thumbtack/Google/Yelp or just close? If <30% click-through, rethink UX.
4. **Emma vs Sarah persona actual distribution** — USER-PERSONAS projected 40% Emma / 20% Sarah; may shift based on actual traffic mix.
5. **Seasonal push fatigue** — do 4 seasonal push/year feel helpful or annoying? Opt-out rate tracks this.
6. **Home Health score engagement** — do users actually check their home health after initial reveal? Retention signal for My Home tab depth.
7. **Partnership readiness signal** — at what MAU threshold (5K? 10K?) should we apply for Thumbtack partnership? Plus affiliate tag to existing deeplink = trivial add once approved.

---

## 13. Change log v1.0 → v2.0

| Area | v1.0 | v2.0 |
|---|---|---|
| Revenue streams | 4 (sub + affiliate + pay-per + future B2B) | **3** (sub + pay-per + tiny Amazon Associates) |
| Y1 revenue per 10K cohort | $14-16K | **$9-11K** |
| Blended ARPU per install | $1.40 | **$0.99** |
| Growth loops | 4 (viral + content + data + affiliate) | **3** (viral + content + data) |
| A/B tests priority | 8 (including Pro Match + affiliate routing) | **8** (Pro Match tests replaced with savings anchor + share card format) |
| Red flag metrics | Includes affiliate CR threshold | **Affiliate row removed** |
| Funnel diagram parallel paths | 4 (core + affiliate + pay-per + viral) | **3** (core + pay-per + viral) + tiny passive Amazon |

---

**Approval:** Amanda 2026-04-19 (rescope decision). Лана briefed. Stage 5 Design proceeds with simplified Pro Match UX.
