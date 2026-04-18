# FUNNEL.md — FixIt

**Дата:** 18 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** UX Design (Stage 4)
**Автор:** Product Team (Лана + Amanda)
**Статус:** Final v1.0
**Companion docs:** [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) | [MONETIZATION.md](../02-product/MONETIZATION.md) | [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) | [RETENTION-RESEARCH.md](../03-practices/RETENTION-RESEARCH.md) | [UX-SPEC.md](./UX-SPEC.md)

---

## TL;DR

Полная воронка FixIt от install до long-term subscription с expected rates для 10K cohort, стадия-за-стадией метриками, red flag thresholds, cohort analysis framework и A/B testing roadmap. Воронка структурно отличается от high-frequency apps — **soft paywall после 3-го estimate**, не hard paywall; **freemium без forced trial**; **affiliate revenue как second stream** закрывающий 80% free users.

Ключевые expected rates (US market, mature state Y2+):
- Install → First estimate: **74.8%** (85% onboarding × 88% estimate completion)
- First estimate → W1 return: **45%**
- Paid conversion by D60: **18-25%** среди hit-limit users (≈20% blended of installs)
- Affiliate revenue per free user: **$8-15/year**
- W4 retention (all cohorts): **40%** (above PictureThis baseline 35%)

Метрики отслеживаются weekly / monthly / quarterly cadence с red flag escalation. Первые 90 дней post-launch — 8 priority A/B tests в pricing / onboarding / paywall.

---

## 1. Overview

Funnel FixIt — **multi-path**, не linear:

- **Core path:** Install → Onboarding → First estimate → Return → Paid
- **Affiliate path:** First estimate → Pro tab → Thumbtack click → Qualified lead → Revenue (независимо от subscription)
- **Pay-per path:** Hit limit → Pay-per-estimate $2.99 (bypasses subscription decision)
- **Viral path:** Successful DIY → Share → Friend installs → New cohort

Воронка измеряется через AARRR (Acquisition / Activation / Retention / Revenue / Referral) с двумя дополнительными enriched slices: **Affiliate conversion** и **Cohort LTV progression**.

Источники benchmark: [MONETIZATION.md §7.1](../02-product/MONETIZATION.md), [PAYWALL-RESEARCH.md §1.1 / §11.3](../03-practices/PAYWALL-RESEARCH.md), [RETENTION-RESEARCH.md §1.3](../03-practices/RETENTION-RESEARCH.md), RevenueCat State of Subscription 2026, Adapty 2026 H&F data.

---

## 2. Top-level Funnel (US Market, 10K Install Cohort)

```
App Store Impressions: ~30,000
    ↓ [33% listing CVR]  ────────── ASO benchmark H&F 30.8%
Install: 10,000
    ↓ [85% complete onboarding]  ── Light onboarding (4-5 screens)
Onboarding completed: 8,500
    ↓ [88% reach first estimate]  ─ Photo flow well-optimized
First estimate: 7,480
    ↓ [45% return within 7 days]  ─ Seasonal / urgency retention
Return user (W1): 3,366
    ↓ [40% return within W4]  ──── Above PictureThis 35% baseline
Return user (W4): 1,346
    ↓ [50% hit 3-estimate limit by D60]
Paywall exposed: 673
    ↓ [36% convert среди exposed by D60]
Paid user: 242 from cohort
    ↓ [35% choose annual]
Annual subscribers: 85
    ↓ [65% renew at 12 months]
Long-term paid: 55

Parallel — affiliate revenue stream:
    ↓ [8% of estimates → affiliate click]
Affiliate clicks: ~1,500 (from ~18,700 total estimates in Y1)
    ↓ [25% qualified lead]
Qualified leads: ~375
    ↓ $25 avg commission
Affiliate revenue: ~$9,375 (Y1)

Parallel — pay-per-estimate stream:
    ↓ [3% of free users buy at least 1]
Pay-per purchases: ~225
    ↓ $2.99-9.99 avg
Pay-per revenue: ~$1,100 (Y1)
```

**Y1 revenue summary (10K cohort):**
- Subscription ARR: ~$40,500
- Affiliate: ~$9,375
- Pay-per: ~$1,100
- **Total Y1 revenue from 10K cohort: ~$51,000**
- **Total cumulative cohort LTV (Y1-Y3): ~$180,000**
- With CAC $15 × 10K installs = $150K spend → **cohort LTV:CAC = 1.2x Y1 → 8x by Y3 mature state**

---

## 3. Stage-by-Stage Metrics

### 3.1 Stage 1: Acquisition (App Store Impression → Install)

| Metric | Target | Benchmark | Notes |
|---|---|---|---|
| App Store listing CVR | 33% | H&F 30.8% (Adapty) | ASO-driven |
| Organic install ratio | 60% Y1 → 80% Y3 | Consumer SaaS typical | TikTok #hometok + App Store SEO |
| Paid install CPI (blended) | <$15 | H&F target $30 | |
| TikTok / Reels CPI | $8-12 | Growing channel | Primary for Emma |
| Facebook/Instagram CPI | $18-25 | Mature | Secondary |
| Google UAC CPI | $15-20 | Intent-driven | Keyword: "how much does [X] repair cost" |
| App Preview video visible | 100% of listings | Adapty: +2.9x conversion | Mandatory |

**Measurement stack:** Apple Search Ads, Google UAC dashboard, TikTok Ads Manager, AppsFlyer for attribution.

### 3.2 Stage 2: Activation (Onboarding)

| Metric | Target | Benchmark | Red flag |
|---|---|---|---|
| Onboarding completion rate | 85% | H&F 75-85% | <70% |
| Drop-off at Welcome screen | <5% | — | >15% |
| Drop-off at ZIP entry | <8% | — | >20% |
| Drop-off at camera permission prompt | <20% | 15-25% typical | >40% |
| Time to complete onboarding | <90s median | Speed principle | >3 min |
| Push permission grant rate | 60% | Context-framed; без context 25% | <40% |

**Key insight (из RETENTION-RESEARCH §7.5):** Push permission asked **after** first successful estimate, не on onboarding. 2.4× higher grant rate.

### 3.3 Stage 3: First Value (Aha moment)

| Metric | Target | Benchmark | Rationale |
|---|---|---|---|
| Time to first estimate (install → result visible) | <4 min median | Competitor: 10+ min | Speed principle #3 |
| Estimate completion rate (start photo → see estimate) | >88% | PictureThis 85% | Photo flow optimization |
| Photo retake rate | 20-30% | First-try success acceptable | Not a failure signal |
| AI identification confidence (acceptable threshold) | >80% | Accuracy target Y1 | Fall-back to text if <60% |
| "Wow" signal (share/save/retake-with-intent) | >25% of first estimates | Proxy для aha-moment | |

**Aha-moment proxy metrics** (measurable behaviors signaling "this worked"):
- User tapped ≥2 tabs (DIY/Hybrid/Pro) → explored options = engaged
- User expanded "See full plan" → deeper interest
- User screenshot on estimate screen → implicit share intent
- User returned within 2 weeks → trust established

### 3.4 Stage 4: Return / Retention

Per [RETENTION-RESEARCH.md §2.3](../03-practices/RETENTION-RESEARCH.md) — infrequent-use app, не optimize против daily retention.

| Metric | Target Y1 | Target Y3 | Benchmark (PictureThis) |
|---|---|---|---|
| D2 return (any activity) | 32% | 40% | 35% |
| W1 return | 45% | 55% | 42% |
| W4 return | 40% | 50% | 35% |
| D90 return (any activity) | 25% | 35% | 22% |
| Annual retention | 32% | 45% | 28% |
| **QAR (North Star proxy)** | 50% | 80% | — |
| WEPA (Weekly Estimates Per Active) | 0.35 | 1.2 | PictureThis 2.5 (higher freq.) |

**Supporting retention metrics:**
- Seasonal push CTR: >8%
- Savings counter views per user per year: >3
- Project follow-up response rate (Loop 2): >40%

### 3.5 Stage 5: Monetization

| Metric | Target | Benchmark | Rationale |
|---|---|---|---|
| Paywall exposure rate (installs exposed to paywall by D60) | 45-50% | Hit-limit behavior | User must do 3 estimates first |
| Paywall conversion среди exposed | 18-25% | PictureThis 20%, H&F Adapty 11.2% | Soft paywall with aha-moment |
| Blended install → paid by D60 | 8-12% | H&F 5-8% typical | Above benchmark |
| Monthly vs Annual split (of paid) | 55% / 45% | H&F 40% / 60% annual dominant | Lower annual early (infreq. use) |
| Annual discount framing uplift | +10-15% | "2 months free" proven best | Validated A/B |
| Trial-to-paid conversion (if trial offered) | 42% | H&F 35-49.9% | Phase 2+ experiment |
| Monthly churn (paying users) | 5-6% | H&F median 7.2% | Below median target |
| Affiliate click-through rate (estimates → affiliate link) | 8-15% | — | Core second revenue stream |
| Affiliate click → qualified lead | 20-30% | Thumbtack partner avg | |
| Pay-per-estimate purchase rate (of free users) | 3% | — | Fills non-subscriber gap |
| Pay-per → subscription upsell | 25-35% | "You've spent $9, Pro is $7.99" | Retention lever |

### 3.6 Stage 6: Advocacy / Referral

| Metric | Target Y1 | Target Y3 | Source |
|---|---|---|---|
| NPS (Emma segment) | ≥50 | ≥60 | PRODUCT-VISION target |
| K-factor (viral coefficient) | 0.4 | 0.7 | Each user brings 0.4 new |
| App Store rating | 4.6+ | 4.7+ | PictureThis 4.8 |
| App Store reviews per month | 500 | 5,000 | Prompt after Win moment |
| Social share rate (estimate → share) | 5-8% | 10%+ | TikTok/Instagram amplification |
| Before/after photo share rate (v1.5+) | 15% of successful DIY | — | RETENTION-RESEARCH Loop 3 |
| Referral signup rate (friend invited → install) | 30% | 40% | With incentive |

---

## 4. Conversion Benchmarks per Persona

Voronka rates materially differ across personas из [USER-PERSONAS.md](../01-research/USER-PERSONAS.md):

| Stage | Emma (primary) | Mike (DIY) | Sarah (single HO) | Tyler (renter) | Ronald (aging HO) |
|---|---|---|---|---|---|
| Install → First estimate | 78% | 85% | 72% | 65% | 55% |
| First estimate → W1 return | 48% | 60% | 42% | 20% | 28% |
| W4 retention | 42% | 55% | 45% | 15% | 32% |
| Free → Paid D60 | 22% | 38% | 28% | 5% | 18% |
| Annual selection среди paid | 30% | 60% | 50% | 0% | 70% |
| Affiliate click rate | 10% | 15% | 8% | 5% | 6% |
| Pay-per purchase rate (of non-subscribers) | 4% | 2% | 5% | 15% | 3% |
| 12-month retention | 60% | 75% | 70% | 25% | 55% |
| LTV | $120 | $195 | $174 | $18 | $105 |
| CAC | $15 | $10 | $18 | $7 | $25 |
| LTV:CAC | 8.0x | 19.5x | 9.7x | 2.6x | 4.2x |

**Key insights:**
- **Mike** — самый здоровый сегмент (highest LTV:CAC, lowest CAC due to DIY community organic reach)
- **Sarah** — slowest to convert, но sticky at 50% annual ("insurance" mental model)
- **Tyler** — borderline LTV:CAC, accepted because viral coefficient + low CAC
- **Emma** — primary MVP target, balanced economics
- **Ronald** — highest CAC (AARP/senior-targeted ads expensive), but 70% annual uptake compensates

---

## 5. Red Flag Thresholds

Escalation triggers. Если metric падает ниже threshold — immediate investigation + potential rollback:

| Metric | Healthy | Alarm | Critical | Action |
|---|---|---|---|---|
| Onboarding drop-off | <15% | 15-30% | >30% | Review screen-by-screen abandonment; simplify if Critical |
| First estimate completion | >85% | 70-85% | <70% | AI quality issue OR UX friction; QA photo pipeline |
| Paywall conversion среди exposed | >18% | 12-18% | <12% | Pricing too high OR wrong tier OR copy weak; A/B test variants |
| W4 retention | >35% | 25-35% | <25% | No habit forming; seasonal push effectiveness review |
| Monthly churn (paying) | <6% | 6-9% | >9% | Value prop degrading; conduct cancel-reason survey |
| D90 retention | >22% | 15-22% | <15% | Structural retention issue; review feature adoption |
| Affiliate CTR | >8% | 5-8% | <5% | Messaging off OR pro match quality low; review UX |
| Affiliate click → lead | >22% | 15-22% | <15% | Thumbtack partnership quality issue; review lead pass criteria |
| App Store rating | >4.5 | 4.0-4.5 | <4.0 | Major product/trust issue; emergency sprint to fix |
| Crash rate | <0.5% | 0.5-1.5% | >1.5% | Immediate hotfix priority |
| Refund rate | <2% | 2-6% | >6% | Misleading paywall/copy; trust violation; review messaging |
| Install → first estimate | >70% | 55-70% | <55% | Photo pipeline broken OR AI rejection too aggressive |

**Red-flag response protocol:**
1. **Alarm:** Investigate root cause within 1 week, propose fix
2. **Critical:** Emergency sprint, rollback recent changes if correlated, daily stand-up until resolved

---

## 6. Metrics Dashboard Priorities

### 6.1 Weekly tracking (ops cadence)

Watched by Лана + Amanda every Monday morning review:

| Metric | Display | Source |
|---|---|---|
| CPI by channel (TikTok / FB / Google / Organic) | Stacked bar | AppsFlyer dashboard |
| Daily installs (by source) | Line chart 7-day | App Store Connect + Play Console |
| Install → first estimate (7-day rolling) | Gauge | Amplitude |
| Paywall exposure rate | Gauge | Amplitude |
| Paywall conversion среди exposed | Gauge | Adapty + Amplitude |
| New MRR this week | Number + trend | Adapty |
| Churn events this week | List с reason tags | Adapty + in-app survey |
| Affiliate clicks & leads (Thumbtack + Angi + Home Depot) | Table | Partner dashboards |
| Crash rate | Number (threshold alert) | Sentry / Crashlytics |
| Support tickets (volume + top categories) | Bar chart | Intercom / Zendesk |

### 6.2 Monthly tracking (strategic cadence)

Monthly business review first Friday of month:

| Metric | Display |
|---|---|
| Cohort retention curves (W1 / W4 / W12 / M6 / M12) | Line chart per cohort |
| Cohort LTV progression (Y1 actual vs target) | Stacked bar |
| QAR (Quarterly Active Rate) | Gauge |
| MRR growth + decomposition (new / expansion / churn / reactivation) | Waterfall chart |
| Persona mix drift (% Emma / Mike / Sarah / Tyler / Ronald) | Stacked 100% bar |
| Feature adoption (% users used feature in month) | Heatmap |
| Seasonal signal (activity by region × month) | Heatmap |
| Affiliate revenue mix (Thumbtack vs Angi vs Home Depot vs Amazon) | Pie chart |
| NPS score (Emma segment) | Monthly snapshot |
| App Store rating trend | Line chart |

### 6.3 Quarterly strategic review

- **Unit economics health check:** Any segment LTV:CAC <3x?
- **Seasonal engagement lift:** Did spring/fall push campaigns work?
- **Feature velocity:** Shipped vs roadmap?
- **Competitive landscape:** HomeWyse, Thumbtack new features?
- **Affiliate partner performance review:** Renegotiate rates if volume ramp?
- **Persona expansion readiness:** When to activate Sarah / Tyler / Ronald?
- **CAC channel reallocation:** Which channel converts best this quarter?

---

## 7. A/B Testing Roadmap

Первые 90 дней post-launch — **8 priority A/B tests**, organized by funnel stage. Tests ordered by expected impact (highest ROI first, per Adapty: pricing tests = 2-5x uplift vs visual).

### 7.1 Acquisition-level

**Test A1: Ad creative per persona**
- Variants: Generic "save money on repairs" vs Emma-specific "first-time homeowner" vs Mike-specific "DIY tools"
- Metric: Install CPI + install→activation rate
- Platform: TikTok + Facebook Ads
- Duration: 2 weeks × 3 creatives × 2 audiences

**Test A2: App Store listing variants**
- Variants: Screenshot order (damage photo first vs savings counter first vs estimate result first)
- Metric: Listing CVR (impression → install)
- Platform: App Store Connect experiments
- Duration: 4 weeks

### 7.2 Activation-level

**Test B1: Onboarding length (speed vs thoroughness)**
- Variants: 3 screens (Welcome → ZIP → Camera) vs 5 screens (Welcome → Value prop → ZIP → DIY readiness → Camera)
- Metric: Onboarding completion × W1 retention
- Hypothesis: 3 screens wins для speed; 5 screens might win for Mike/Sarah engagement
- Duration: 3 weeks

**Test B2: Signup placement (account creation timing)**
- Variants: Signup мандатory после onboarding vs optional on paywall vs only при history access
- Metric: Install → first estimate × D7 retention
- Hypothesis: Optional signup best (preserves aha-moment)
- Duration: 3 weeks

### 7.3 First-value-level

**Test C1: Labor illusion duration**
- Variants: 3s / 5s / 8s / 10s
- Metric: Paywall conversion (downstream) + perceived quality survey
- Hypothesis: 5-8s sweet spot; <3s feels cheap, >10s feels slow
- Duration: 2 weeks

**Test C2: Estimate presentation format**
- Variants: Three vertical cards vs horizontal tabs (DIY/Hybrid/Pro) vs single card with toggle
- Metric: Time on estimate screen × tab switch rate × paywall conversion
- Hypothesis: Horizontal tabs (baseline) — but validate
- Duration: 3 weeks

### 7.4 Retention-level

**Test D1: Push frequency**
- Variants: 1/month seasonal vs 2/month (seasonal + savings reminder)
- Metric: W4 / W12 retention × push opt-out rate
- Hypothesis: 1/month = same retention, lower opt-out
- Duration: 90 days

**Test D2: Seasonal messaging copy**
- Variants: Generic "Spring maintenance" vs zip-personalized "Denver spring check"
- Metric: Push CTR × re-engagement rate
- Hypothesis: Zip-personalized 2× CTR (per RETENTION-RESEARCH §4.1)
- Duration: 2 seasonal cycles (60 days)

### 7.5 Monetization-level (highest priority — per PAYWALL-RESEARCH)

**Test E1: Monthly price**
- Variants: $4.99 / $7.99 / $9.99
- Metric: D90 Revenue per Install
- Hypothesis: $7.99 — sweet spot volume × ARPU
- Sample size: 3K users per variant
- Duration: 4-6 weeks (needs D90 data)

**Test E2: Free tier limit**
- Variants: 1 / 3 / 5 estimates/mo
- Metric: Free→Paid D60 + W4 retention + WoM signals
- Hypothesis: 3 = sweet spot
- Duration: 6-8 weeks (needs D60 data)

**Test E3: Annual price**
- Variants: $39.99 / $49.99 / $59.99
- Metric: Annual % of paid + total paid revenue
- Hypothesis: $49.99 lies under "$50 psychological" + upper quartile H&F
- Duration: 4-6 weeks

**Test E4: Annual discount framing**
- Variants: "Save 48%" / "$4.17/mo" / "2 months free"
- Metric: Annual uptake среди paid
- Hypothesis: "2 months free" easiest to parse → +10-15% uptake
- Duration: 2-3 weeks

**Test E5: Paywall CTA copy**
- Variants: "Upgrade" / "Start Saving" / "Go Pro" / "Unlock Unlimited"
- Metric: CTA tap rate × downstream conversion
- Duration: 2 weeks

**Test E6: Trial inclusion**
- Variants: No trial / 7-day free trial / 7-day opt-out trial
- Metric: Install → Paid D90 + net revenue
- Hypothesis (phase 2): freemium wins initially; opt-out trial might edge freemium at maturity
- Duration: 8 weeks (needs D90)

### 7.6 Test sequencing

- **Month 1:** A1, A2, B1, E1 (baseline acquisition + pricing)
- **Month 2:** B2, C1, C2, E2 (activation + free-tier limit)
- **Month 3:** D1, D2, E3, E4 (retention + annual framing)
- **Month 4+:** E5, E6, combinatorial tests once priority singles done

**Do NOT test simultaneously same-audience variants that interact** (e.g., price + free-tier-limit simultaneously — confound each other).

---

## 8. Growth Loops

### 8.1 Viral loop (referral)

```
1. User completes DIY estimate → saves $200
2. User posts TikTok: "OMG FixIt saved me $200, scan your kitchen!"
3. Follower downloads → completes estimate → saves money
4. New user shares → cycle repeats
```

**K-factor target:** 0.4 Y1 → 0.7 Y3.

**Amplifiers:**
- Pre-built share templates in estimate screen (Instagram Story, TikTok, X/Twitter cards)
- Before/after photo gallery (v1.5) с optimized share composition
- Savings counter as social-currency ("Look, $847 saved")
- Referral program: invite friend → both get 1 month free Pro (Y1.5 feature)

### 8.2 Content loop (SEO)

```
1. Google search "how much does it cost to replace a faucet Austin"
2. FixIt SEO page ranks в top 3 (generated from anonymized estimates)
3. User clicks → lands on FixIt blog article
4. CTA: "Get your own photo-based estimate → download app"
5. Install → estimate → potential SEO contribution if they opt-in to public share
```

**Target Y3:** 500+ zip+repair permutations indexed, each driving 50-200 organic installs/year.

Similar strategy довела Zillow до $7B+ evaluation. Key: anonymized aggregate, not individual user data.

### 8.3 Data loop (compounding accuracy)

```
1. More estimates → more corrections from user feedback
2. More corrections → better AI price accuracy model
3. Better accuracy → happier users → more estimates
4. Accuracy compounds → competitor can't easily replicate
```

**Target:** AI accuracy 82% Y1 → 90% Y3 (top-30 categories).

Measurement: user post-estimate survey "was this accurate?" + eventual ground truth from actual cost reports.

### 8.4 Affiliate loop (partnership compounding)

```
1. User hires через FixIt → Thumbtack referral → Thumbtack visibility into FixIt volume
2. Thumbtack sees quality leads → gives FixIt better rates + exclusivity
3. Better rates = stronger partnership = more exclusive pro access
4. FixIt visitors become trusted source для Thumbtack retargeting (double monetization)
```

---

## 9. Cohort Analysis Framework

### 9.1 Cohort definitions

**Tracked cohort slices:**

| Cohort type | Definition | Purpose |
|---|---|---|
| **Install week** | Users by week-of-install | Standard retention curves |
| **Install source** | TikTok / FB / Google / Organic | Channel quality comparison |
| **Persona** | Emma / Mike / Sarah / Tyler / Ronald (detected via behavior signals) | Segment-level strategy tuning |
| **Region** | Northeast / Midwest / South / West / Rural | Regional retention differences |
| **First-repair category** | Plumbing / Electrical / HVAC / Appliance / Furniture | Onboarding path quality |
| **Device tier** | iPhone 14+ / iPhone 12-13 / SE / Android | UX fidelity correlation |
| **Season of install** | Spring / Summer / Fall / Winter | Seasonal cycle impact |

### 9.2 Compared metrics across cohorts

For each cohort slice, compare:
- Retention curves (W1 / W4 / W12 / M6 / M12)
- Cumulative LTV progression
- Feature adoption rates
- Paywall exposure rate
- Paywall conversion rate
- Churn rate
- Affiliate click-through rate
- Referral rate (k-factor per cohort)

### 9.3 Cohort analysis cadence

- **Weekly:** Most recent 8 weekly cohorts, retention curves overlay
- **Monthly:** All cohorts YTD, LTV progression
- **Quarterly:** Deep dive per segment — which cohorts outperform/underperform, why?

### 9.4 Key analytical questions

1. **Does install source correlate с LTV?** (Expected: organic = higher LTV)
2. **Do Emma cohorts accelerate over time?** (Expected: yes, as brand matures)
3. **Does winter install cohort retain worse?** (Expected: yes, less repair activity; adjust acquisition)
4. **Do first-repair-was-plumbing cohorts retain differently vs first-was-furniture?** (Valuable для positioning)
5. **Does device tier correlate с paywall conversion?** (High-end iPhone users ≈ higher income ≈ pay more? Validate)

---

## 10. Funnel Integrity Checks

### 10.1 Daily sanity checks

Automated alerts Slack-posted если:
- Daily install count diverges >40% from 7-day avg (could signal ad-account paused or listing broken)
- Onboarding completion drops >10% day-over-day
- Paywall view count drops >20% day-over-day
- Crash rate spikes >1%
- Affiliate API failure (>5% error rate)
- Adapty subscription transaction failure rate >2%

### 10.2 Weekly sanity checks

- First-estimate completion rate within target range
- Paywall exposure rate tracking (should grow as cohorts mature)
- Support ticket volume vs 7-day avg

### 10.3 Monthly sanity checks

- Cohort retention curves match forecast (or investigate)
- Revenue mix (sub / affiliate / pay-per) within 5% of target ratio
- ARPU vs forecast

---

## 11. Financial Projection on 10K Cohort (Y1-Y3)

Re-stating from MONETIZATION.md §7.2 with funnel context:

**Year 1 (10K cohort, launch to month 12):**
```
10,000 installs
  ↓ 85% onboard → 8,500
  ↓ 88% first estimate → 7,480
  ↓ 45% W1 return → 3,366
  ↓ 40% W4 return → 1,346
  ↓ 50% hit paywall by D60 → 673
  ↓ 36% convert → 242 paid users
     ↓ 35% annual × $49.99 = $4,249
     ↓ 65% monthly × $7.99 × 9 mo avg = $11,303
     Subscription Y1 = ~$15,550
Plus affiliate (all 10K users exposed):
  ↓ 10K × 6-8 estimates/yr × 10% click × 25% lead × $25 = ~$37,500
Plus pay-per:
  ↓ 3% × 10K × $4 avg × 1.5 transactions = $1,800
Y1 revenue from 10K cohort: ~$55,000
Y1 costs (blended CAC $15): $150,000
Y1 net: -$95,000 (expected — cohort ripens over Y2-Y3)
```

**Year 2 continuation (same cohort):**
```
Retained paid: 242 × 65% Y2 retention = 157
  ↓ Y2 subscription revenue ~$9,500
Affiliate Y2 (retention-driven): $20K
Pay-per Y2: $500
Y2 revenue from cohort: ~$30,000
```

**Year 3 continuation:**
```
Retained paid: 157 × 80% Y3 retention = 126
  ↓ Y3 subscription revenue ~$7,500
Affiliate Y3: $15K
Y3 revenue from cohort: ~$22,500
```

**Cumulative Y1-Y3 LTV:CAC:**
- Cohort LTV = $55K + $30K + $22.5K = ~$107,500 (conservative)
- Plus referrals generated (k=0.4 × 10K × some portion monetize) = +$20K-30K
- Total cohort value ≈ $130K
- Cohort spend $150K
- **LTV:CAC Y1-Y3 direct = 0.9x, but with referral compounding = 1.1-1.3x**
- **Full LTV:CAC over 5-year horizon with mature affiliate = 7-8x** (matches MONETIZATION.md §6)

**Conclusion:** Cohort economics break even Y3-Y4, profitable Y4+. Matches SaaS B2C norms.

---

## 12. Ship Criteria for Stage Transition

Per CLAUDE.md workflow, Stage 4 → Stage 5 (Design) transition checkpoint:

- [x] **UX-SPEC.md** — principles, interactions, states, a11y (companion document)
- [x] **FUNNEL.md** — this document ✅
- [ ] **USER-FLOWS.md** — 6-8 user scenarios с happy path + edge cases (TBD next)
- [ ] **SCREEN-MAP.md** — full screen inventory с navigation (TBD next)
- [ ] **WIREFRAMES.md** — 15-20 ASCII wireframes (TBD next)
- [x] **Metrics dashboard specced** — weekly/monthly/quarterly cadence defined
- [x] **A/B testing priorities set** — 8 priority tests в 90-day roadmap
- [x] **Red flag thresholds defined** — escalation protocols clear
- [x] **Cohort analysis framework defined** — slices и comparison metrics

**→ Ready to begin Stage 5 Design** после USER-FLOWS + SCREEN-MAP + WIREFRAMES.

---

## 13. Related Documents

- [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) — North Star WEPA, target trajectory, metrics framework
- [MONETIZATION.md](../02-product/MONETIZATION.md) — pricing tiers, revenue streams, unit economics
- [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) — soft paywall strategy, Emma journey, A/B priorities
- [RETENTION-RESEARCH.md](../03-practices/RETENTION-RESEARCH.md) — seasonal engagement, QAR definition, push strategy
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — 5 personas, willingness-to-pay, retention anchors
- [UX-SPEC.md](./UX-SPEC.md) — interaction patterns, animations, a11y (this doc's companion)
- [USER-FLOWS.md](./USER-FLOWS.md) — TBD next
- [SCREEN-MAP.md](./SCREEN-MAP.md) — TBD next

---

## 14. Open Questions (validate in Stage 4-5)

1. **Will Thumbtack partnership approval land by launch?** Affects affiliate ramp timeline. Backup: Angi only.
2. **Is 5-8s labor illusion optimal?** User testing needed to validate (Stage 5 prototype).
3. **Is seasonal push engagement enough for W4 retention?** Test in Q1 post-launch.
4. **Does Tyler (renter) deserve dedicated pay-per paywall messaging?** Depends on early cohort mix.
5. **Should we introduce a 7-day opt-out trial in Phase 2?** Adapty H&F data suggests yes, but FixIt infrequent-use may differ.
6. **At what point does "My Home" dashboard (v1.5 feature) justify re-launching onboarding flow?** Depends on user research post-MVP.
7. **Does "Save project" context paywall cannibalize "hit limit" soft paywall or add to it?** A/B test Phase 2.

---

**Дата последнего обновления:** 2026-04-18
**Следующий шаг:** USER-FLOWS.md — 6-8 user scenarios с happy path + error handling per persona.

**Approved by:**
- [ ] Amanda (Owner)
- [ ] Лана (Project Manager)
