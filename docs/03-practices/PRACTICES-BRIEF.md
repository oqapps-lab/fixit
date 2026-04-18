# PRACTICES-BRIEF.md — FixIt

**Дата:** 17 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Автор:** Practices Team (synthesis)
**Статус:** Final v1.0 — Synthesis of 4 practices research docs
**Companion docs:** [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) | [PAYWALL-RESEARCH.md](./PAYWALL-RESEARCH.md) | [RETENTION-RESEARCH.md](./RETENTION-RESEARCH.md) | [ASO-RESEARCH.md](./ASO-RESEARCH.md)

---

## TL;DR — Practices Playbook в одну страницу

**FixIt — это photo-AI utility app для infrequent-use case.** Поэтому его practices fundamentally отличаются от wellness/habit apps (Sugar Quit template):

1. **Onboarding** — не quiz на 15-25 screens (как Sugar Quit), а 3 screens + 60-90 sec to aha moment (как PictureThis)
2. **Paywall** — soft paywall после 3 free estimates (rejected hard) + context paywalls на premium features
3. **Retention** — challenge = infrequent use. Solution = seasonal anchors + savings counter + push budget 12-16/yr (vs 150-250 у health apps)
4. **ASO** — "home repair cost" keyword open field на 12-18 months. Own это — получим organic growth inbound

**Unified target metrics for MVP:**

| Metric | Target | Industry benchmark |
|---|---|---|
| Install → first estimate | 75% | 55-65% photo-AI apps |
| Time to aha moment | <90 sec | 35 sec (PictureThis) |
| Free → paid conversion (D60) | 18-25% | 20% (PictureThis) |
| W4 retention | 40% | 30-35% photo-AI |
| Quarterly Active Rate (QAR) — north star | 35% | — (FixIt defined) |
| Paywall exposure → conversion | 15-22% | 18% (RevenueCat median) |
| App Store rating | 4.6+ | 4.7 avg photo-AI top 10 |

---

## 1. Ключевые Architectural Решения

### 1.1 FixIt ≠ Sugar Quit template

Sugar Quit — wellness / habit app с daily use loop. FixIt — **utility / photo-AI app с infrequent use loop**. Поэтому:

| Aspect | Sugar Quit pattern | FixIt pattern |
|---|---|---|
| Onboarding | 15-25 screens quiz | 3 screens + camera |
| Daily use | Expected (streaks) | NOT expected (3-8/yr typical) |
| Engagement metric | DAU/MAU | QAR (Quarterly Active Rate) |
| Push budget | 150-250/year | 12-16/year |
| Retention anchor | Habit formation | Seasonal + savings counter |
| Primary peers | Calm, Duolingo, Habitica | PictureThis, Rock ID, TripIt |

**Why this matters:** если копируем Sugar Quit paterns без адаптации — получаем irritated users (спам push), падающую retention (нет daily hook), broken onboarding (длинный quiz).

### 1.2 Four Practice Pillars

```
┌─────────────────────────────────────────────────────────┐
│                   FIXIT PRACTICES                        │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │  ONBOARDING  │───▶│   ACTIVATION │                  │
│  │  3 screens   │    │  First est   │                  │
│  │  <90 sec     │    │  75% target  │                  │
│  └──────────────┘    └──────────────┘                  │
│         │                    │                           │
│         ▼                    ▼                           │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │  RETENTION   │    │   PAYWALL    │                  │
│  │  Seasonal    │◀──▶│  Soft + Ctx  │                  │
│  │  QAR 35%     │    │  20% conv    │                  │
│  └──────────────┘    └──────────────┘                  │
│         │                    │                           │
│         ▼                    ▼                           │
│  ┌──────────────┐                                       │
│  │     ASO      │                                       │
│  │ Own "cost"   │                                       │
│  │  keyword     │                                       │
│  └──────────────┘                                       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Onboarding — ключевые выводы

### 2.1 Structure (3 screens + 2 micro-questions)

1. **Welcome** — "Know the price of any home repair in 60 seconds" + single CTA "Take a photo"
2. **ZIP / City** — 1 question, auto-detect option, skip allowed
3. **Camera permission** — clear value + privacy statement

→ **First photo within 35-90 sec of install.** AI processing 5-8 sec (labor illusion). Then first 3-mode output (aha moment).

→ **Signup defer** — after first estimate, with hook "save this + get 2 more free".

→ **DIY readiness + quality tier** asked только на pre-estimate micro-screen, НЕ в onboarding.

### 2.2 Что НЕ делать

- ❌ Upfront signup (kills 30% install→active rate)
- ❌ Demo video (kills velocity)
- ❌ Home age / size / type questions (unnecessary friction)
- ❌ Push permission ask on screen 1 (rejection spike)

### 2.3 Metrics to hit (MVP)

- Install → completed onboarding: 85%
- Install → first estimate: 75%
- Time to first estimate: <180 sec median
- Camera permission grant rate: 85%
- 7-day return rate: 45%

### 2.4 A/B tests в v1.5 priority

1. Signup placement (before vs after estimate)
2. Example photos (4 vs 8 vs none)
3. Labor illusion duration (5s vs 10s vs instant)
4. Welcome screen (video vs static vs animation)
5. Camera permission copy

---

## 3. Paywall — ключевые выводы

### 3.1 Strategy: Soft + Context Hybrid

**Primary paywall:** soft после 3 free estimates. Context clear ("you've used your free estimates this month"). User has tasted value.

**Secondary paywalls:** context-triggered при попытке premium actions:
- "Pro Match" (find local contractor) → paywall
- "Save project" after N saves → paywall
- "Warranty tracker" → paywall
- "Multi-photo project" → paywall

**Rejected:** hard paywall (screen 1) — 10% conversion но -60% install→active rate.

### 3.2 Pricing Structure

| Tier | Price | What's inside |
|---|---|---|
| Free | $0 | 3 estimates/mo, basic DIY/Hybrid/Pro, last 5 saved |
| Pro monthly | $7.99/mo | Unlimited + full history + "My Home" profile |
| Pro annual | $49.99/yr | Same, saves $45/yr (48% discount) — **DEFAULT pre-selected** |
| Power (v1.5) | $12.99/mo | + tool tracking + advanced analytics |
| Pay-per | $2.99/est | For casual users (не convert к subscription) |

### 3.3 Paywall Screen Elements

**Required:**
1. Emotional hook — "You've saved $247 with FixIt" (personalized)
2. Clear tier comparison (Free / Pro / Pay-per)
3. Annual pre-selected с savings prominent
4. Social proof — user count / review stars
5. Money-back guarantee
6. Cancellation clarity (не dark pattern)

**Anti-patterns:**
- Hidden cancel
- Tier comparison >3 options
- 15+ feature lists
- Stock photos
- Time-pressure fake countdowns

### 3.4 Conversion funnel targets

- Paywall exposure → conversion: 18-22%
- Annual vs monthly split: 55/45 (annual default)
- Trial → paid: не использовать trial на launch (freemium = trial)
- Free → paid D60: 20% target
- Free → paid D90: 28% cumulative

### 3.5 A/B tests priority (Phase 1)

1. Pricing ($4.99 vs $7.99 vs $9.99)
2. Free tier (1 vs 3 vs 5 estimates)
3. Annual discount (40% vs 48% vs 55% off)
4. Trigger point (after 3 vs 5 estimates)
5. CTA copy ("Upgrade" vs "Start Saving" vs "Go Pro")

---

## 4. Retention — ключевые выводы

### 4.1 North Star: Quarterly Active Rate (QAR)

Vs traditional DAU/MAU — infrequent-use apps нужен 90-day window чтобы capture seasonal cycle.

**QAR formula:** % of registered users who opened app at least once in last 90 days.

**Target:** 35% QAR by month 6.

### 4.2 Seasonal Engagement Backbone

Push & content tied к home maintenance seasonal cycle:

| Season | Primary repairs | Push topics |
|---|---|---|
| **Spring** (Mar-May) | HVAC / gutters / lawn | "Spring checklist for your home" |
| **Summer** (Jun-Aug) | AC / decks / pools | "AC not cooling? Estimate in 60 sec" |
| **Fall** (Sep-Nov) | Winterization / heating | "Fall prep: 5 things before winter" |
| **Winter** (Dec-Feb) | Indoor / emergencies | "Indoor project season — paint/floor" |

**Regional customization:** OpenWeatherMap + NOAA climate zones. Push varies by user's zip.

### 4.3 Five Engagement Loops

1. **Seasonal push** (4-8/year) — proactive awareness
2. **Project follow-up** (7 days post-estimate) — "Did you complete?"
3. **Social sharing** — "Share your win" templates
4. **Re-engagement** (30 days no activity) — "Your savings so far: $X"
5. **Neighbor benchmarking** (v1.5) — "Your neighbors are fixing gutters this month"

### 4.4 Push Budget: 12-16/year (VERY important)

Why so low:
- Users don't want daily/weekly pings for infrequent use case
- 1 push/month max for seasonal
- +1 per project follow-up
- +1 per 30-day re-engagement
- Total ceiling: 16/year

**Compare:** Health apps send 150-250/year. FixIt = 10× fewer.

### 4.5 Retention по personas

| Persona | Primary anchor | Key metric |
|---|---|---|
| Emma | Seasonal reminders + Instagram sharing | Return within 45 days |
| Mike | Tool tracking + project calendar | Monthly active |
| Sarah | Quote validation + safety bookmarks | On-demand quarterly |
| Tyler | Lease-cycle (move-in/move-out) | 3-5 uses over 2-yr lease |
| Ronald | AARP + scam alerts + daughter-share | Monthly seasonal check-in |

### 4.6 Churn Prevention Playbook

- 30 days no open → seasonal push
- 45 days → email digest with value reminder
- 60 days → "We miss you" with incentive (50% off)
- 90 days → final save attempt

Acceptable monthly churn: 5-8%. Red flag: >12%.

### 4.7 Progressive Unlocks (Reward Retention)

- 1 estimate: Basic functionality
- 5 estimates: "My Home" profile unlocked
- 10 estimates: Social sharing badges
- 25 estimates: Community features (v1.5)

---

## 5. ASO — ключевые выводы

### 5.1 Metadata Strategy

**App Store Title:** `FixIt: Home Repair Costs` (24 chars)
- Brand first + top keywords ("home repair", "costs")
- No AI-stuffing (spammy, penalized)

**iOS Subtitle:** `Photo → real price, 60 sec` (26 chars)
- Unique differentiator (photo) + speed anchor

**Keywords field:** `diy,estimator,contractor,plumber,electrician,handyman,leak,quote,fix,tool,house,maintenance,hvac` (98/100 chars)
- Trade-specific (plumber, electrician, HVAC) + generic (diy, fix, tool, quote)

**Promotional text (170 chars):**
"You broke it. We tell you what to do. Photo → AI diagnosis → real costs for your ZIP → DIY guide or local pro. 50K homeowners use FixIt. Free 3 estimates/mo."

### 5.2 6 Screenshot Frames

1. **Problem** — panicked homeowner + broken faucet. "Wait. How much?"
2. **Magic** — photo → 3 options (DIY $15 / Hybrid $95 / Pro $275)
3. **Shopping List** — materials with Home Depot prices for user zip
4. **Quote Validation** — "Pro quote $800 — HIGH for your area"
5. **Savings Tracker** — "Lifetime savings $1,247" — gamification
6. **Categories Grid** — plumbing/electrical/HVAC/furniture/appliances

### 5.3 Icon & Positioning

- **Icon:** wrench + spark (repair + AI). **Warm orange** — стендаут vs blue/green competitors (Thumbtack blue, Angi green)
- **Category:** Lifestyle > Home Improvement (primary), Productivity (secondary)
- **Sub-category:** Tools (under Productivity)

### 5.4 Opportunity Gap

**"Home repair cost" keyword open field на 12-18 months:**
- Thumbtack оптимизирован под "find a pro"
- HomeAdvisor — под "services"
- HomeWyse — web-only, no app
- **FixIt может claim это keyword cluster полностью**

### 5.5 Rating Strategy

- **Target 4.6+ from day 1** (отгон middleware users через beta)
- **In-app rating prompt:** after savings milestone, NOT after first estimate (too early)
- **Response time:** 24h on все reviews (positive + negative)
- **Year 1 goal:** 2000+ reviews, 4.7+ avg

### 5.6 Custom Product Pages (CPPs)

Three CPPs targeting different acquisition sources:

1. **Cost Validator CPP** — for Sarah. Hero: "Is my contractor overcharging?"
2. **DIY Planner CPP** — for Mike. Hero: "Project plan + material list, one tap"
3. **First-time Homeowner CPP** — for Emma. Hero: "Every cost. Every decision. One app."

Each CPP deep-linked from paid campaigns targeting specific persona.

### 5.7 Localization Roadmap

- Y1: US → UK → CA → AU (English)
- Y2: Spanish (US Latinx + Mexico)
- Y2-3: German, French (EU expansion)

### 5.8 Critical Insight: Retention = ASO

Google switched к **retention-based ranking в 2025**. Apple следует аналогично. → Retention features (seasonal push, savings counter, progressive unlocks) serve **double duty** — keep users engaged AND boost ranking.

---

## 6. Unified Implementation Priorities

### 6.1 MVP v1.0 Must-Haves (весь practices stack)

**Onboarding:**
- [ ] 3-screen flow (welcome, zip, camera)
- [ ] 5-8 sec labor illusion
- [ ] Post-estimate signup ask
- [ ] Push permission deferred to post-estimate

**Paywall:**
- [ ] Soft paywall after 3rd estimate
- [ ] Context paywalls on premium features
- [ ] Annual-first screen
- [ ] Pay-per $2.99 visible option

**Retention:**
- [ ] Seasonal push (basic — 4/year)
- [ ] Project follow-up push (7 days)
- [ ] Re-engagement push (30 days)
- [ ] Savings counter ("lifetime saved $X")
- [ ] Basic "My Home" profile

**ASO:**
- [ ] Title + Subtitle + Keywords optimized
- [ ] 6 screenshots shipped
- [ ] Icon finalized (warm orange)
- [ ] App Store category set
- [ ] Rating prompts built (trigger after savings)

### 6.2 v1.5 Add-ons (months 4-8)

- A/B testing framework (Adapty + Split.io)
- Custom Product Pages (3 variants for targeted ads)
- Social sharing templates (Instagram/TikTok)
- Email digest (monthly, opt-in)
- Tool tracking (for Mike persona)

### 6.3 v2.0 (months 8-14)

- Community features
- Neighbor benchmarking
- Multi-photo project analysis
- Property manager B2B tier
- Expanded categories (30 → 150)

---

## 7. Cross-Practice Dependencies

**Onboarding → Paywall:**
Free tier limits set в onboarding. User knows from day 1 they get 3 free estimates.

**Paywall → Retention:**
Paid users get retention features (saved projects, history, warranty). Free users get limited retention hooks (soft push reminders только).

**Retention → ASO:**
Retention features = Google/Apple ranking algorithm love. Higher ranking = organic acquisition = lower CAC.

**ASO → Onboarding:**
ASO screenshot messaging sets expectation. Onboarding delivers on promise. Mismatch = bad reviews.

**All → Monetization:**
Good practices = healthy LTV = justifies marketing spend = growth compounds.

---

## 8. Risk Matrix

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Push spam perception | Medium | High | 12-16/year budget, personalization, easy opt-out |
| Paywall too aggressive | Medium | High | A/B test, monitor churn, soft > hard |
| Onboarding drop-off | Low | High | 3-screen flow, no signup upfront, clear CTAs |
| ASO competition intensifies | Medium | Medium | Own "home repair cost" keyword fast, defensive long-tails |
| Retention breaks at 90 days | High | High | QAR north star, seasonal push anchors, savings compound |
| Apple rejects subscription terms | Low | Medium | Compliance check pre-launch, easy cancel built-in |
| Review bombing при AI failure | Medium | High | Extensive QA pre-launch, 24h response, "retake photo" fallback |

---

## 9. KPIs Dashboard

### Weekly tracking

- Installs by source (organic / paid / referral)
- Install → onboarding completion %
- Install → first estimate %
- Time to first estimate (median)
- First estimate → 2nd estimate within 7 days
- Paywall exposures / week
- Paywall → conversion %
- Subscription MRR
- Affiliate revenue
- App Store rating (7-day moving avg)
- Push delivery rate + opt-out rate

### Monthly tracking

- Cohort retention curves (W1 / W4 / W12)
- Quarterly Active Rate (QAR)
- Free → paid D60/D90 conversion
- Churn rate (monthly)
- LTV by cohort
- NPS score
- App Store keyword rankings (top 20 tracked)
- Review volume + sentiment

### Quarterly tracking

- Seasonal engagement spike correlation
- Feature adoption rates (per feature)
- Persona segmentation analysis
- Unit economics review

---

## 10. Implementation Timeline

### Phase 1 — Pre-launch (weeks 1-12)
- Build onboarding (3-screen flow)
- Build paywall (soft + context)
- Build core retention features (savings counter, My Home)
- Optimize ASO metadata
- Ship to TestFlight (100 beta users)

### Phase 2 — Soft Launch (weeks 13-16)
- 1000-5000 users, selected markets (Denver, Austin, Raleigh)
- Monitor metrics vs targets
- Fix onboarding drop-off issues
- Tune paywall pricing

### Phase 3 — Public Launch (weeks 17-24)
- Full launch US + App Store editorial pitch
- Paid acquisition: $15K TikTok + $10K Google Ads
- First A/B tests (pricing, free tier size)
- Apple "New Apps We Love" submission

### Phase 4 — Scale (months 7-12)
- A/B test framework in production
- 3 CPPs live for targeted campaigns
- UK + Canada + Australia launch
- Community features (v1.5) beta

---

## 11. Success Criteria for Stage Transition → Stage 4 UX

✅ All 4 practices docs completed (DONE)
✅ PRACTICES-BRIEF synthesis available (DONE — this doc)
✅ Target metrics defined for each practice
✅ A/B test priorities ranked
✅ Risk matrix documented

**→ Ready to begin Stage 4 UX.**

UX documents to create:
1. **SCREEN-MAP.md** — все 15-20 экранов FixIt
2. **USER-FLOWS.md** — core flows (photo→estimate, paywall, settings, etc.)
3. **WIREFRAMES.md** — low-fi wireframes для каждого экрана
4. **UX-SPEC.md** — interactions, edge cases, error states
5. **FUNNEL.md** — full conversion funnel с metrics on каждом этапе

Practices research informs все 5 UX docs — особенно Onboarding SCREEN-MAP, Paywall WIREFRAMES, Retention USER-FLOWS, ASO FUNNEL.

---

## 12. Related Docs

- [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) — детальный onboarding playbook
- [PAYWALL-RESEARCH.md](./PAYWALL-RESEARCH.md) — paywall strategies + A/B tests
- [RETENTION-RESEARCH.md](./RETENTION-RESEARCH.md) — infrequent-use retention
- [ASO-RESEARCH.md](./ASO-RESEARCH.md) — App Store strategy
- [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) — WEPA north star alignment
- [MONETIZATION.md](../02-product/MONETIZATION.md) — revenue model (paywall feeds this)
- [TARGET-AUDIENCE.md](../02-product/TARGET-AUDIENCE.md) — Emma hooks for each practice

---

**Дата последнего обновления:** 2026-04-17
**Следующий шаг:** Stage 4 UX — начинаем с SCREEN-MAP.md
