# PRACTICES-BRIEF.md — FixIt

**Дата:** 2026-04-19
**Продукт:** FixIt — AI home repair cost advisor
**Автор:** Practices Team (synthesis)
**Статус:** Final v2.0 — Synthesis of 4 practices research docs post-rescope
**Companion docs:** [POSITIONING.md](../02-product/POSITIONING.md) | [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) | [PAYWALL-RESEARCH.md](./PAYWALL-RESEARCH.md) | [RETENTION-RESEARCH.md](./RETENTION-RESEARCH.md) | [ASO-RESEARCH.md](./ASO-RESEARCH.md)

---

## TL;DR — Practices Playbook в одну страницу

После rescope 2026-04-19 FixIt — **pure AI-advisor photo utility**, не marketplace. Practices stack fundamentally переосмыслен под новое позиционирование **"Know the price before the panic"** (POSITIONING.md §2). Все 4 practices (onboarding / paywall / retention / ASO) synced под единый brand voice: **calm advisor, photo-first utility, не marketplace pusher**.

**Четыре pillar с едиными decisions:**

1. **Onboarding** — **8 screens, aha ≤90 sec**, deferred signup, NO "find you a pro" messaging anywhere. Pattern: PictureThis / Rock Identifier / Cal AI (photo-AI utility), НЕ Noom / Flo / Sugar Quit (quiz-based wellness).
2. **Paywall** — soft paywall после **3rd estimate** + **4 context paywalls** (reduced from 5 since Pro Match removed per rescope). Annual $49.99 pre-selected, "2 months free" framing. Trial deferred — freemium does that job.
3. **Retention** — **Savings anniversary** + **seasonal check-ins** + **Home Health** (NOT "new pros alert" — removed). North star WEPA + QAR. Push budget 12-16/year, не daily. Saved Projects + savings counter = switching cost engine.
4. **ASO** — **"home repair cost" / "AI repair advisor" / "DIY repair estimate" / "home maintenance calendar"** primary cluster. **REMOVED "plumber near me" / "find a contractor"** — we don't compete на marketplace keywords. Utilities category (not Services). Subtitle `Photo repair cost advisor`, not `Find trusted pros fast`.

**Unified target metrics (MVP):**

| Metric | Target | Industry benchmark |
|---|---|---|
| Install → first estimate | 75% | 55-65% photo-AI utility |
| Time to aha moment | ≤90 sec | 35 sec (PictureThis), 60s target realistic |
| Free → paid conversion (D60) | 18-25% | 20% (PictureThis baseline) |
| W4 retention | 40% | 30-35% photo-AI |
| QAR (Quarterly Active Rate) | 50% month 6, 65% Y1 | (FixIt-defined) |
| WEPA (Weekly Estimates per Active Household) | 0.25 month 6 | (FixIt-defined) |
| Paywall exposure → conversion | 18-22% | 18% (RevenueCat median) |
| App Store rating | 4.6+ launch, 4.7+ month 6 | 4.7 avg photo-AI top 10 |
| Keyword rank "home repair cost" | Top-5 month 6, Top-3 Y1 | — |
| Keyword rank "AI repair advisor" | #1 Y1 (category creator) | — |

**Что намеренно удалено из всего practices stack vs v1.0:**

- ❌ "We'll find you a pro" / "pro match" / "3 contractors responded" — любая marketplace-adjacent messaging
- ❌ "Pros near you" push notifications — no infrastructure
- ❌ "plumber near me" / "find a contractor" keywords — different category
- ❌ Screenshots с pro profile cards — doesn't exist
- ❌ "Services" App Store category — wrong positioning
- ❌ Affiliate pricing assumptions в LTV math — no affiliate в MVP

**Что добавлено / усилено:**

- ✅ "Know the price before the panic" primary tagline across all touchpoints (POSITIONING §2)
- ✅ Savings anniversary loop (RETENTION §5.5) — new yearly retention spike
- ✅ Savings-anchored viral share ("I saved $X going DIY" — POSITIONING §5) — replaces "I found a great pro"
- ✅ "Home Health" dashboard как retention engine — replaces marketplace re-engagement
- ✅ "AI repair advisor" ASO category-creator keyword
- ✅ "Home maintenance calendar" — new keyword/feature reflecting retention focus
- ✅ Review prompt timing: post-DIY success (peak positive), not post-3-estimates

---

## 1. Strategic Foundation — POSITIONING.md as Source of Truth

### 1.1 New USP

Primary USP (POSITIONING.md §2): **"Know the price before the panic."**

Это central hook для всех 4 practices:

- **Onboarding welcome screen:** "Take a photo. Know the price. Decide what to do."
- **Paywall hook:** "Unlock unlimited estimates + saved projects + seasonal check-ins"
- **Retention push:** "Anything new around the house?" + "Your savings crossed $500"
- **ASO subtitle:** "Photo repair cost advisor"
- **App Store description opening:** "Know the price before the panic."

Cross-doc consistency — **required**. Если в onboarding welcome screen одна версия tagline, а в ASO screenshot другая — cognitive mismatch, bad reviews, broken funnel.

### 1.2 Secondary USPs (POSITIONING §2)

1. **"Three options, one tap."** — DIY / Hybrid / Pro side-by-side. Reflected в onboarding Screen 8 layout, ASO Frame 2, paywall value prop.
2. **"AI that knows your zip."** — Regional pricing. Reflected в onboarding Screen 2 (zip capture), retention seasonal zip-specific push, ASO "for your zip" copy.
3. **"No marketplace, no hidden agenda."** — Trust signal. Reflected в paywall "no contractor kickbacks" messaging, retention "no sales calls" push copy, ASO "advisor not marketplace" description.

### 1.3 Anti-USPs (what we explicitly don't do)

Per POSITIONING §2 — "if someone's phrase sounds like 'we connect you with pros' — это НЕ FixIt":

- ❌ "Найдём вам 3 мастеров" — не делаем
- ❌ "Получите quotes от pros" — не делаем
- ❌ "Мы онбордим проверенных мастеров" — не делаем
- ❌ "Free estimates from our network" — нет network'а
- ❌ "Compare contractor bids" — нет

**Discipline across все practices docs.** Каждый screen, каждый push, каждый screenshot, каждый keyword проверяется против этого списка.

### 1.4 Brand voice (POSITIONING §7)

Под новое positioning — consistent voice:

- **Calm, not urgent.** "Here's what it costs. Breathe. Decide." Not "ACT NOW — water damage!"
- **Informative, not pushy.** "If you need a pro, here's where to find one." Not "Our pros standing by."
- **Honest about limits.** "AI estimates ±25%, actual prices vary."
- **Warm but precise.** "A leaky cartridge. An easy fix." Not "You got this, king 💪"
- **Celebrates user agency.** "You chose DIY — here's your guide." Not "Ready for pro match?"

Voice checkpoints: onboarding copy, paywall copy, push copy, ASO description, screenshot captions, review responses.

---

## 2. FixIt ≠ Sugar Quit Template (Architectural Decision)

### 2.1 Why we don't copy the wellness playbook

FixIt — **infrequent-use photo utility**. Sugar Quit reference (и Noom/Flo/Headway/Calm) — habit-change wellness apps. Structural differences drive different practices:

| Aspect | Sugar Quit / wellness pattern | FixIt / photo utility pattern |
|---|---|---|
| Use frequency | Daily (streaks) | 3-8 events/year |
| User state entering app | Proactive ("хочу похудеть") | Reactive ("что-то сломалось") |
| Onboarding | 15-25 screen quiz | 3-4 screens + camera |
| Personalization | Deep (25-Q quiz, plan generation) | Minimal (zip + DIY + tier) |
| Engagement metric | DAU/MAU | QAR / WEPA |
| Push budget | 150-250/year | 12-16/year |
| Retention anchor | Habit formation, streaks | Seasonal + savings counter |
| Peer group | Calm, Duolingo, Habitica, Noom | PictureThis, Rock ID, Cal AI, TripIt |

**Why this matters:** копируя Sugar Quit patterns без адаптации — получаем spammy push notifications (kills retention), broken onboarding (too long), misaligned paywall (too aggressive early).

### 2.2 Right peer group для каждой practice

| Practice | Primary reference | Secondary reference |
|---|---|---|
| Onboarding | PictureThis (35 sec install→aha) | SkinVision (medical photo-AI, trust framing) |
| Paywall | PictureThis (soft paywall after 3rd use) | Cal AI (hybrid freemium + optional trial) |
| Retention | TripIt (infrequent-use, annual recap) | PictureThis (seasonal + collection) |
| ASO | PictureThis (category own, photo-input subtitle) | Rock Identifier (utility category, minimal metadata) |

**Explicit rejections:**

- ❌ NOT Sugar Quit / Noom (wellness, quiz-heavy) — wrong category
- ❌ NOT Thumbtack / Angi (service marketplace) — wrong positioning
- ❌ NOT Houzz / HomeAdvisor (services + inspiration) — wrong category

### 2.3 Four Practice Pillars diagram

```
┌─────────────────────────────────────────────────────────┐
│                FIXIT PRACTICES v2.0                      │
│         (post-rescope pure AI-advisor utility)           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │  ONBOARDING  │───▶│  ACTIVATION  │                   │
│  │  8 screens   │    │  First est   │                   │
│  │  ≤90 sec     │    │  75% target  │                   │
│  │  NO "pros"   │    │  aha moment  │                   │
│  └──────────────┘    └──────────────┘                   │
│         │                    │                            │
│         ▼                    ▼                            │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │  RETENTION   │    │   PAYWALL    │                   │
│  │  Seasonal +  │◀──▶│  Soft after  │                   │
│  │  Savings +   │    │  3rd est +   │                   │
│  │  Home Health │    │  4 context   │                   │
│  │  QAR / WEPA  │    │  20% conv    │                   │
│  └──────────────┘    └──────────────┘                   │
│         │                    │                            │
│         └────────┬───────────┘                            │
│                  ▼                                         │
│         ┌──────────────┐                                  │
│         │     ASO      │                                  │
│         │ "home repair │                                  │
│         │   cost" +    │                                  │
│         │ "AI advisor" │                                  │
│         │ category     │                                  │
│         └──────────────┘                                  │
│                                                            │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Onboarding — Key Decisions (recap from ONBOARDING-RESEARCH.md)

### 3.1 Structure: 8 screens, aha ≤90 sec, deferred signup

Per ONBOARDING-RESEARCH §2 — 8-screen ideal flow:

1. **Welcome** — "Take a photo. Know the price. Decide what to do."
2. **Location (zip/city)** — 1 mandatory question, skip allowed с degraded estimate
3. **Permission priming** — custom screen с 4 sample categories + "Photos stay private"
4. **iOS camera permission dialog** — native
5. **Camera capture** — up to 3 photos, manual text fallback hidden
6. **Micro-questions** — DIY readiness + quality tier (2 questions, defaults sensible)
7. **AI processing** — 5-8s labor illusion, 4 step messages
8. **First Estimate Result** — THE aha moment, three options side-by-side

**Signup deferred** — appears as bottom sheet after "Save this estimate" tap. Apple / Google / Email options. Never blocks progression pre-estimate.

**Push permission deferred** — asked after Save tap или after 2nd estimate, NOT onboarding.

### 3.2 What we explicitly DON'T do

- ❌ Upfront signup (kills 30% activation)
- ❌ "We'll find you a pro" messaging (rescope violation)
- ❌ "Our pro network" / "3 contractors responded" (doesn't exist)
- ❌ Demo video on Screen 1 (kills velocity -8 to -12%)
- ❌ Home age / size / type questions (unnecessary friction)
- ❌ Push permission on Screen 1 (cold ask, 60-65% grant rate)
- ❌ "Do you want pro recommendations?" (rescope violation)
- ❌ Multiple swipe-through value prop screens (-15% activation)

### 3.3 Metrics target (MVP)

- Install → completed onboarding: **80%**
- Install → first estimate: **75%**
- Time to first estimate: **≤90 sec**
- Camera permission grant rate: **85%** (with priming)
- Location capture rate: **85%**
- Signup conversion post-aha: **60%**
- Day 7 retention: **20%**

### 3.4 Copy audit — no marketplace language

Per ONBOARDING-RESEARCH §11.1 — **explicit audit required**:

Zero instances of following in shipped onboarding:
- "marketplace"
- "network" (в context pros)
- "vetted pros"
- "we'll connect you"
- "find you 3 contractors"
- "our pros"
- "local experts we work with"

Any copy matching these patterns = ship blocker.

### 3.5 A/B tests priority (post-launch)

Per ONBOARDING-RESEARCH §9:

1. Tagline on Screen 1 (POSITIONING variants A/B/C/D/E)
2. Signup placement (post-aha vs after Save tap)
3. Sample photos on Permission Priming (0 vs 4 vs 8)
4. Labor illusion duration (3s / 5s / 8s / 12s)
5. Estimate result layout (side-by-side vs stacked)
6. Push permission timing (post-Save vs 2nd estimate vs return)

---

## 4. Paywall — Key Decisions (recap, updated for v2.0)

### 4.1 Strategy: Soft + Context Hybrid

**Primary paywall:** soft после 3 free estimates. Context clear ("you've used your free estimates this month"). User has tasted value, inertia high.

**Secondary paywalls (4 context paywalls, reduced from 5):**

Per rescope, Pro Match context paywall **removed** because Pro Match itself is simplified to deeplink (Feature #6), not premium feature. Remaining 4 context paywalls:

1. **"Save project"** (after 1 free save) — "Unlock unlimited saves для tracking your home projects"
2. **"Warranty tracker"** (v1.5) — "Track all your repairs warranty periods"
3. **"Batch photo upload"** (Power tier) — "Upload 10+ photos at once"
4. **"PDF export / reports"** — "Export estimates for insurance, resale disclosure"

**REMOVED paywall (per rescope):** ~~"Pro Match priority matching"~~ — no longer exists as premium tier.

**Rejected:** hard paywall (screen 1) — 10% conversion но -60% install→active rate. Wrong для unknown brand + reactive use case.

### 4.2 Pricing Structure (aligned with CLAUDE.md)

| Tier | Price | What's inside |
|---|---|---|
| Free | $0 | 3 estimates/mo, basic DIY/Hybrid/Pro, last 5 saved |
| Pro monthly | **$9.99/mo** (per CLAUDE.md) | Unlimited estimates, full history, saved projects, price alerts |
| Pro annual | **$49.99/yr** (58% off per CLAUDE.md) | Same as monthly, **DEFAULT pre-selected** |
| Pay-per | $2.99/estimate | For casual users not wanting subscription (Tyler persona) |

**Note:** v1.0 pricing was $7.99/mo. CLAUDE.md finalized $9.99/mo, keeping $49.99/yr (larger savings = 58% vs 48%). Deeper discount compensates for higher monthly anchor, annual uptake expected stronger.

**Power tier (v1.5):** $12.99/mo or $89.99/yr — tool tracking, batch photo, advanced analytics, warranty tracker. Not in MVP.

### 4.3 Paywall Screen Elements

**Required (per PAYWALL-RESEARCH §2):**

1. Emotional hook personalized — "You've saved $247 with FixIt" (pulled from user history)
2. Clear tier comparison (Annual default / Monthly / Pay-per) — max 3 options
3. Annual pre-selected with savings prominent
4. Social proof — user count / review stars
5. Cancel anytime + Restore purchase (App Store compliance)
6. Dominant CTA — "Unlock Unlimited Estimates" (benefit-driven, not "Subscribe")

**Anti-patterns (avoided):**

- Hidden cancel
- Tier comparison >3 options
- 15+ feature lists
- Stock photos
- Time-pressure fake countdowns
- Pre-checked expensive option without disclosure

### 4.4 Paywall copy (rescope-updated)

**Primary paywall hook** (per PAYWALL-RESEARCH §12.6):

- **Hook:** "3 estimates down. Unlimited ahead?"
- **Value:** "Unlimited estimates · Full history · Saved projects · Price alerts"
- **Price anchor:** "$49.99/year = $4.17/month = price of one coffee/week"
- **Social proof:** "★★★★★ 4.7 — 8,000+ reviews"
- **CTA:** "Unlock Unlimited Access"
- **Trust:** "Cancel anytime. No contractor sales calls."

**Key rescope changes в copy:**

- ❌ OLD: "Unlock unlimited estimates AND priority pro matching"
- ✅ NEW: "Unlock unlimited estimates, saved projects, price alerts"
- ❌ OLD: "Join 50K homeowners finding pros faster"
- ✅ NEW: "Join 50K homeowners planning smarter"
- ❌ OLD: "Premium includes priority contractor matching"
- ✅ NEW: "No contractor sales calls. Just honest answers." (trust signal)

### 4.5 Conversion funnel targets

- Paywall exposure → conversion: **18-22%**
- Annual vs monthly split: **55/45** (annual default)
- Trial: **no trial на launch** — freemium = trial (A/B test hybrid в month 3+)
- Free → paid D60: **20%** target
- Free → paid D90: **28%** cumulative

### 4.6 A/B tests priority (Phase 1, Months 1-3)

1. Monthly price ($4.99 / $7.99 / $9.99) — though $9.99 locked per CLAUDE.md, test $7.99 variant permissible
2. Free tier limit (1 / 3 / 5 estimates)
3. Annual discount framing ("Save 58%" / "2 months free" / "$4.17/mo")
4. Trigger point (after 3 / 5 estimates)
5. CTA copy ("Upgrade" / "Start Saving" / "Go Pro" / "Unlock Unlimited")

### 4.7 What the paywall is NOT

Post-rescope, paywall explicitly isn't:

- Not a gate to "better pros" (no pros)
- Not a route to "priority matching" (no matching)
- Not tied to affiliate revenue assumptions (no affiliate)
- Not a lead generation conversion point (no leads)

It's purely: "Want unlimited photo-to-price, full saved history, seasonal maintenance calendar, PDF exports? Pay subscription." Clean value exchange.

---

## 5. Retention — Key Decisions (recap from RETENTION-RESEARCH.md)

### 5.1 North Star: WEPA + QAR

**WEPA (Weekly Estimates Per Active Household):** primary north star. Measures actual value delivered per-household per-week.

**QAR (Quarterly Active Rate):** supporting north star. % households with ≥1 completed estimate in last 90 days. Captures seasonal cycles.

Targets:

| Period | WEPA | QAR | W4 | D90 | Annual |
|---|---|---|---|---|---|
| Month 3 beta | 0.15 | 35% | 35% | 20% | — |
| Month 6 launch | 0.25 | 50% | 40% | 25% | — |
| Year 1 | 0.35 | 65% | 45% | 30% | 32% |
| Year 3 | 0.50 | 80% | 55% | 40% | 40% |

### 5.2 Three retention pillars (RETENTION §TL;DR)

1. **Save-to-My-Home loop** — every estimate auto-saves. Target 40% user-completed save rate. **Primary switching cost.**
2. **Seasonal Home Health nudges** — 4 pushes/year по calendar + savings anniversary (1 push/year). Total 12-16/year budget.
3. **Savings as identity** — counter grows с каждым DIY choice. "Your FixIt savings: $847". Viral trigger.

### 5.3 Six engagement loops (RETENTION §5)

| Loop | Trigger | Frequency | Key copy (rescope-aligned) |
|---|---|---|---|
| **1. Seasonal Home Health** | 4×/year по regional calendar | 4 pushes/yr | "Spring check-in — 3 small fixes worth knowing about" |
| **2. Project Follow-Up** | 7-14 days after estimate | 1-3 pushes/yr | "Did the fix hold? 30-sec check-in." |
| **3. Savings Share (viral)** | Post-DIY success | Event-triggered | "You saved $185 — your neighbors might want to know" |
| **4. Re-engagement Escalation** | 30d no activity | Ladder: 30d/45d/60d/90d | "Anything new around the house?" + savings reminder |
| **5. Savings Anniversary (NEW)** | 1yr OR $500/$1000/$2500 crossed | 1-2/yr | "Your savings crossed $500 this year. See breakdown." |
| **6. Neighbor Benchmarking** (v1.5+) | Zip trend detected | TBD | "12 households in 80203 estimated gutter repairs" |

### 5.4 Removed retention features (post-rescope)

Per RETENTION §TL;DR — these GONE from v2.0 retention strategy:

- ❌ "New pros в your area" push
- ❌ "Pro availability update" push
- ❌ "Joe Smith responded to your quote" push
- ❌ "Rate your pro experience" push
- ❌ Pro re-engagement email
- ❌ "Safe pro bookmarks" feature для Sarah

### 5.5 Push notification strategy

**Budget:** 12-16 pushes/year. 10× less than wellness apps (Sugar Quit ~150-250/yr).

**Timing:**

- Weekday 19:00-20:00 local (post-dinner window)
- Tuesday-Thursday primary (not weekends, not Monday morning)
- Seasonal: trigger-based (first snow, first heatwave via OpenWeatherMap)
- Never 22:30-06:30

**Copy principles (per RETENTION §8.3):**

- Calm, not urgent
- Informational, not pushing
- Local когда possible
- <90 chars, <10 words в headline
- Voice: calm advisor, не sales rep

**Permission timing:** deferred to **post-first-successful-estimate**, not onboarding. Grant rate с context ~60% vs ~25% cold.

### 5.6 Retention by persona (post-rescope anchors)

| Persona | Primary anchor | Key metric |
|---|---|---|
| Emma | Seasonal + savings counter + savings share | Return within 45 days |
| Mike | Project history + DIY success + maintenance calendar | Monthly active |
| Sarah | Quote validation history | On-demand quarterly |
| Tyler | Lease-cycle (move-in/out) + deposit risk score | 3-5 uses over 2-yr lease |
| Ronald | Large-button seasonal check-in | Quarterly active |

### 5.7 Churn prevention

Acceptable monthly churn: 5-8%. Red flag: >12%.

Escalation:
- 30d no open → seasonal/sample-fix push
- 45d → email digest с value reminder (savings so far)
- 60d → low-pressure "see a sample fix?" push
- 90d → win-back 50% off annual
- 120d+ → accept churn, retargeting only

**Delete protection:** на sign-out / delete flow:
> "Wait — you've saved $847 with FixIt across 6 repairs. Sign out keeps your account; delete removes your home history."

---

## 6. ASO — Key Decisions (recap from ASO-RESEARCH.md)

### 6.1 Metadata Strategy (post-rescope)

**App Store Title:** `FixIt: Home Repair Costs` (24 chars) — unchanged
**App Store Subtitle:** `Photo repair cost advisor` (26 chars) — **CHANGED** from v1.0 "Photo → real price, 60 sec"
**Keywords field (100 chars):** `diy,estimator,calculator,quote,fix,maintenance,hvac,plumber,electrician,handyman,ai,leak,tool`
**Google Play title:** `FixIt - Home Repair Cost AI` (28 chars)
**Google Play short desc:** "Snap a photo. Know the repair cost in 60 sec. DIY guide + real prices." (70 chars)

### 6.2 Primary keyword cluster (post-rescope)

**OWNED keywords:**

- **home repair cost** — core #1, 60K+ monthly searches
- **repair estimate** — core #1, 45K
- **AI repair advisor** — category creator, #1 possible instantly
- **fix it yourself** — brand match, 35K
- **DIY repair estimate** — niche gem, 8K
- **know repair cost** — brand match, 4K
- **home maintenance calendar** — retention keyword, 18K (NEW в v2.0)
- **contractor quote check** — Sarah niche, 8K
- **how much to fix [X]** — long-tail aggregate 120K+

**REMOVED keywords (per rescope):**

- ❌ "plumber near me" — marketplace intent, Thumbtack territory
- ❌ "find a contractor" — marketplace intent
- ❌ "pro marketplace" — rejected positioning
- ❌ "find a pro" — Thumbtack/Angi owned
- ❌ "home services" — HomeAdvisor/Angi category
- ❌ "hire a plumber" — marketplace intent
- ❌ "book a handyman" — booking intent

### 6.3 Category (CHANGED в v2.0)

**Primary:** Utilities / Tools (App Store) / Tools (Google Play)
**Secondary:** Lifestyle (App Store) / House & Home (Google Play)

v1.0 was Lifestyle > Home Improvement. Changed because:
- POSITIONING.md §2 defines FixIt as "pure AI-advisor utility"
- **NOT Services** — explicitly rejected (Thumbtack territory)
- Matches PictureThis / Rock Identifier / Cal AI playbook
- Utilities ~32% CVR avg vs Lifestyle 22%

### 6.4 Screenshots (6 frames, post-rescope)

| # | Caption | Content | Rescope change |
|---|---|---|---|
| 1 | "Know the price before the panic." | Photo of leaky faucet + camera UI | Primary USP from POSITIONING §2 |
| 2 | "Three routes. Real prices. You decide." | Three-option result (DIY $18 / Hybrid $110 / Pro $235) | Matches actual app, no marketplace UI |
| 3 | "AI-generated DIY guide — for YOUR exact problem." | DIY steps + YouTube search button | Feature #5 accurate |
| 4 | "Shopping list ready for your zip." | Materials list + Amazon/Home Depot/Lowe's search buttons | Feature #4, no partnership claim |
| 5 | "Your savings grow with every fix." | Dashboard с $847 counter + seasonal widget | **NEW frame** replacing v1.0 "Quote Validation" |
| 6 | "Any repair. Any home. One advisor." | Categories grid + "No marketplace, no sales calls" | Advisor positioning reinforced |

**EXPLICITLY NOT showing:**

- ❌ Pro profile cards
- ❌ "3 pros responded" UI
- ❌ Contractor ratings / booking calendars
- ❌ "Vetted contractors" badges
- ❌ Map pins с pro locations
- ❌ "Hire now" / "Request service" CTAs

### 6.5 Icon & Positioning

- **Icon:** wrench + spark (repair + AI). **Warm orange-red** — differentiates vs Thumbtack blue, HomeAdvisor orange-triangle, Angi green
- **Pitch angle для Apple Editorial:** "PictureThis for home repairs — photo-AI utility with subscription revenue, no marketplace complexity"

### 6.6 Rating Strategy

- **Target 4.6+ from day 1**, 4.7+ by month 6
- **In-app rating prompt:** PRIMARY trigger = after DIY success tap (peak emotional positive), NOT after first estimate (too early)
- **Response time:** 24h on all reviews
- **Year 1 goal:** 8,000+ reviews, 4.7+ avg

### 6.7 Custom Product Pages (4 CPPs)

Per ASO-RESEARCH §15:

1. **CPP-1 "Cost Discovery"** (Emma primary) — "Know the price before the panic"
2. **CPP-2 "DIY Planner"** (Mike) — "AI-generated DIY guide для YOUR problem"
3. **CPP-3 "Quote Validator"** (Sarah) — "Got a contractor quote? Check if it's fair"
4. **CPP-4 "Home Maintenance"** (retention/seasonal, NEW в v2.0) — "Seasonal home health в your pocket"

### 6.8 Localization Roadmap (CONSERVATIVE phasing)

- **Phase 1 (months 0-6):** US English only MVP
- **Phase 2 (months 6-9):** UK / AU / CA (post-PMF)
- **Phase 3 (months 12+):** Spanish (v1.5+)
- **Phase 4 (months 18+):** German, French, Portuguese

Changed from v1.0 aggressive "UK/CA/AU Y1 + Spanish Y2". Reflects solo-dev constraints per CLAUDE.md.

### 6.9 Retention = ASO (2026 critical)

Google switched to retention-based ranking в 2025. Apple follows. Retention features (seasonal push, savings counter, progressive unlocks) serve **double duty** — retain users AND boost ranking.

Post-rescope critical: без marketplace re-engagement, retention entirely depends on compounding value (saved projects + savings + seasonal). Lower retention = worse ASO rank = less organic install → vicious cycle. Therefore retention features = highest ROI priority.

---

## 7. Unified Implementation Priorities

### 7.1 MVP v1.0 Must-Haves (integrated practices stack)

**Onboarding (per ONBOARDING-RESEARCH §11.1):**
- [ ] 8-screen flow (welcome, location, permission priming, camera permission, photo, micro-Q, processing, result)
- [ ] Welcome copy: "Take a photo. Know the price. Decide what to do."
- [ ] Zero "find a pro" / "marketplace" copy anywhere (manual audit)
- [ ] 5-8s labor illusion с 4 truthful step messages (no "checking our network")
- [ ] Soft signup bottom sheet post-estimate (Apple/Google/Email)
- [ ] Push permission deferred к post-Save tap
- [ ] Three-option result screen layout (DIY/Hybrid/Pro side-by-side)
- [ ] Pro option = simple deeplink (Thumbtack/Google/Yelp buttons)

**Paywall (per PAYWALL-RESEARCH + rescope):**
- [ ] Soft paywall after 3rd estimate
- [ ] 4 context paywalls (Save project, Warranty tracker [v1.5], Batch upload, PDF export)
- [ ] Annual $49.99 pre-selected
- [ ] Monthly $9.99 secondary
- [ ] Pay-per $2.99 visible as fallback
- [ ] Copy: "No contractor sales calls. Just honest answers."
- [ ] Zero "priority pro matching" language
- [ ] Apple/Google compliance (auto-renew, cancel anytime, restore purchase)

**Retention (per RETENTION-RESEARCH):**
- [ ] Save-to-My-Home default ON (auto-draft every estimate)
- [ ] Seasonal push scheduling (4/year, regional-adjusted)
- [ ] Project follow-up push (7-14 days post-estimate)
- [ ] Re-engagement ladder (30/45/60/90 day)
- [ ] Savings anniversary push (1yr + milestones $500/$1000/$2500)
- [ ] Savings counter always visible on Home tab
- [ ] Home Health score (simple MVP version — 4 seasonal checkboxes)
- [ ] Push permission priming screen (post-Save tap)
- [ ] Granular push category opt-in
- [ ] Delete protection с savings reminder
- [ ] Zero "new pros" / "pro availability" push copy

**ASO (per ASO-RESEARCH):**
- [ ] Title: `FixIt: Home Repair Costs`
- [ ] Subtitle: `Photo repair cost advisor`
- [ ] Keywords field (100 chars, post-rescope cluster)
- [ ] Category: Utilities (primary) / Lifestyle (secondary) — NOT Services
- [ ] 6 screenshots shipped, NO pro profile cards
- [ ] Icon warm orange wrench+spark
- [ ] In-app review prompts: trigger after DIY success
- [ ] Apple Editorial pitch: "PictureThis for home repairs"
- [ ] Manual copy audit: no marketplace language anywhere
- [ ] App Store description updated (remove "pro match", add "advisor not marketplace" section)

### 7.2 v1.5 Add-ons (months 4-8)

- A/B testing framework (Adapty для paywall + Statsig для onboarding)
- Custom Product Pages (4 live)
- Social sharing templates (Instagram/TikTok "I saved $X")
- Email digest (monthly, opt-in)
- Tool tracking (Mike persona)
- Warranty tracker feature
- Home maintenance calendar full version
- UK / AU / CA locale launches

### 7.3 v2.0 (months 8-14)

- Spanish localization launch
- Neighbor benchmarking (hyperlocal trends)
- Quote validator dedicated flow (Sarah)
- Multi-photo project analysis
- Persona-adapted dashboards
- Power tier (Mike/property managers)
- Expanded categories (30 → 150)
- **Pro Match v1.5+ (IF Thumbtack/Angi approve affiliate partnership):** trivial add — append affiliate tag to existing deeplink. Zero re-engineering. Adds $15-40/lead revenue stream.

---

## 8. Cross-Practice Dependencies

Сonsistency между practices критична. Breaking any dependency = broken funnel.

**Onboarding → Paywall:**
- Free tier limit (3 estimates) set в onboarding expectations
- User knows from day 1: 3 free, paywall после
- Paywall trigger expected (not surprise)

**Paywall → Retention:**
- Paid users get full retention features (unlimited saved projects, price alerts, PDF export)
- Free users get limited retention (savings counter, 5-project cap, seasonal push still available)
- Subscription = retention mechanism itself (sunk cost, expectation)

**Retention → ASO:**
- Retention metrics (D1/D7/D30/QAR) = Google Play + Apple ranking algorithm inputs
- Higher retention → higher rank → lower CAC → more paid conversions
- Savings counter UI = screenshot Frame 5 = ASO asset AND retention asset (double duty)

**ASO → Onboarding:**
- ASO screenshot promise must match onboarding delivery
- Frame 1 "Know the price before the panic" = Welcome screen copy
- Frame 2 three-option display = Screen 8 result
- Mismatch → bad reviews → ASO rank drops → vicious cycle

**ASO → Paywall:**
- ASO description mentions "$9.99/mo or $49.99/yr" — must match paywall exactly
- Pricing discrepancy между ASO page and in-app paywall = App Store policy violation + user distrust

**All → POSITIONING:**
- POSITIONING.md is source of truth. If practice doc conflicts with positioning — positioning wins.
- Every copy decision (welcome, paywall hook, push copy, ASO caption) traces к POSITIONING §2 USPs and §7 voice guidelines.

**All → MONETIZATION:**
- Good practices = healthy LTV = justifies marketing spend = growth compounds
- Subscription-only revenue per CLAUDE.md — no affiliate fallback, so practices must drive conversion hard

---

## 9. Risk Matrix (Updated для v2.0)

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| **User expects marketplace, gets advisor** | Medium (post-rescope critical) | High | Strict copy audit across all practices — no "find a pro" language anywhere from ASO → onboarding → push → paywall |
| Onboarding drop-off >25% | Low | High | 8-screen flow с deferred signup, no cold permission asks, labor illusion proven |
| Paywall too aggressive → high churn | Medium | High | Soft > hard, A/B test pricing, monitor refund rate |
| Push spam perception | Low | High | 12-16/year budget, granular opt-in, easy toggle |
| AI estimate accuracy failure | Medium | High | Clear ±25% disclaimer, graceful "low confidence" fallback, regenerate logic |
| ASO competition intensifies | Medium | Medium | Own "home repair cost" + "AI repair advisor" fast; defensive long-tails |
| Retention breaks at 90 days | Medium | High | QAR north star, seasonal anchors, savings compound effect, delete protection |
| Review bombing при bug | Medium | High | 100+ beta, gradual rollout, 24h response protocol |
| Localization blowup multi-locale | High if rushed | Medium | Phased launch: US only 6mo, then English markets, Spanish v1.5+ |
| Apple rejects subscription terms | Low | Medium | Compliance check pre-launch (auto-renew clarity, cancel flow, restore) |
| **Thumbtack launches AI photo feature** | Medium | High | Our moat isn't just keywords — it's positioning (advisor vs marketplace). They can't easily pivot. |
| **Pro Match v1.5 partnership falls through** | Medium | Low | Deeplink approach means no dependency — we ship without partnership, add tag later if approved |

---

## 10. KPIs Dashboard (Unified)

### 10.1 Weekly tracking

- Installs by source (organic / paid / referral) — geo-sliced
- Install → onboarding completion %
- Install → first estimate %
- Time to first estimate (median)
- First estimate → 2nd estimate within 7 days
- Save-to-My-Home rate (auto + user-completed)
- Paywall exposures / week
- Paywall → conversion %
- Subscription MRR
- App Store rating (7-day moving avg)
- Review count + sentiment distribution
- Push delivery rate + opt-out rate
- Pro deeplink tap rate (info only, not revenue)

### 10.2 Monthly tracking

- Cohort retention curves (W1 / W4 / W12)
- WEPA (Weekly Estimates per Active Household)
- QAR (Quarterly Active Rate)
- Free → paid D60/D90 conversion
- Churn rate (monthly)
- LTV by cohort
- NPS score
- App Store keyword rankings (top 20 tracked)
- Review response compliance (100% within 24h?)
- Savings counter total (lifetime savings across user base — viral proxy)
- DIY success rate (self-reported)

### 10.3 Quarterly tracking

- Seasonal engagement spike correlation
- Feature adoption rates per feature
- Persona segmentation analysis
- Unit economics review
- Localization ROI (when applicable)
- Competitor ASO moves
- POSITIONING voice drift audit (manual review of shipped copy vs POSITIONING §7)

### 10.4 Removed metrics (post-rescope)

No longer tracked:

- ❌ Pro Match conversion rate
- ❌ Quote request rate
- ❌ Affiliate click per estimate
- ❌ Lead-to-hire rate
- ❌ Thumbtack handoff completion as revenue event
- ❌ Pro response time
- ❌ Pro hire conversion

### 10.5 Added metrics (new в v2.0)

- ✅ Savings shared per active user (viral driver)
- ✅ DIY success rate (validates "we help decide" promise)
- ✅ Save-to-My-Home rate (switching cost proxy)
- ✅ Home Health check-in CTR (seasonal nudge effectiveness)
- ✅ Savings anniversary push CTR (milestone retention)
- ✅ Savings counter views per active user (dashboard value)

---

## 11. Implementation Timeline (Unified)

### Phase 1 — Pre-launch (weeks 1-12)

- Build 8-screen onboarding flow
- Build paywall (soft + 4 context paywalls)
- Build core retention features (savings counter, My Home, seasonal push scheduler)
- Optimize ASO metadata, screenshots, icon
- Copy audit: zero marketplace language anywhere
- Ship to TestFlight (100 beta users)

### Phase 2 — Soft Launch (weeks 13-16)

- 1000-5000 users в selected markets (Denver, Austin, Raleigh)
- Monitor metrics vs targets
- Fix onboarding drop-off issues
- Tune paywall pricing
- Validate 4.6+ rating before public launch

### Phase 3 — Public Launch (weeks 17-24)

- Full US launch + App Store Editorial pitch ("PictureThis for home repairs")
- Paid acquisition: $3-5K ASA + TikTok/Instagram paid
- First A/B tests (pricing, free tier size, screenshot captions)
- Apple "New Apps We Love" submission
- Review response protocol live (24h SLA)

### Phase 4 — Scale (months 7-12)

- A/B test framework в production
- 4 CPPs live for targeted campaigns
- UK + Canada + Australia launch (months 6-9)
- Community features prep (v1.5)
- Spanish localization prep (v1.5+)
- Savings anniversary / milestone feature live

---

## 12. Success Criteria for Stage Transition → Stage 4 UX

- [x] All 4 practices docs completed v2.0 (ONBOARDING, PAYWALL, RETENTION, ASO)
- [x] PRACTICES-BRIEF synthesis available (this doc)
- [x] Target metrics defined for each practice
- [x] A/B test priorities ranked per practice
- [x] Risk matrix documented
- [x] Copy audit discipline established (no marketplace language)
- [x] POSITIONING alignment validated across all 4 practices

**→ Ready to begin Stage 4 UX.**

UX documents to create (per CLAUDE.md file structure):

1. **SCREEN-MAP.md** — all 18-22 screens FixIt (8 onboarding + paywall + result + My Home + settings + etc.)
2. **USER-FLOWS.md** — core flows (photo→estimate, paywall, settings, seasonal check-in)
3. **WIREFRAMES.md** — low-fi wireframes per screen
4. **UX-SPEC.md** — interactions, edge cases, error states, voice/copy per POSITIONING §7
5. **FUNNEL.md** — full conversion funnel с metrics per stage
6. **UX-BRIEF.md** — synthesis under new positioning

Practices research informs все 6 UX docs — особенно:
- SCREEN-MAP: ONBOARDING 8-screen flow + result screen + paywall contexts
- WIREFRAMES: PAYWALL paywall UI, RETENTION My Home dashboard, ASO screenshot-ready states
- USER-FLOWS: RETENTION seasonal push → open → save → complete
- UX-SPEC: POSITIONING §7 voice guidelines applied per copy
- FUNNEL: ONBOARDING activation metrics + PAYWALL conversion + RETENTION re-engagement
- UX-BRIEF: synthesis across all practices under POSITIONING v2.0

---

## 13. Related Docs

- [POSITIONING.md](../02-product/POSITIONING.md) — source of truth for all brand/copy decisions
- [FEATURES.md](../02-product/FEATURES.md) — 10 MVP features (Feature #6 Find a Pro now simple deeplink)
- [MONETIZATION.md](../02-product/MONETIZATION.md) — subscription-only model, no affiliate
- [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) v2.0 — 8-screen flow, deferred signup, no "pro" messaging
- [PAYWALL-RESEARCH.md](./PAYWALL-RESEARCH.md) — soft + 4 context paywalls
- [RETENTION-RESEARCH.md](./RETENTION-RESEARCH.md) v2.0 — WEPA/QAR, savings anniversary, seasonal
- [ASO-RESEARCH.md](./ASO-RESEARCH.md) v2.0 — "home repair cost" cluster, Utilities category
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — Emma / Mike / Sarah / Tyler / Ronald
- [COMPETITOR-ANALYSIS.md](../01-research/COMPETITOR-ANALYSIS.md) — PictureThis / Thumbtack / HomeAdvisor
- [CLAUDE.md](../../CLAUDE.md) — stack, scope, pricing ($9.99/$49.99), subscription-only monetization

---

## 14. Change Log vs v1.0 (Summary)

For git history readability:

| Practice | v1.0 (partnership era) | v2.0 (AI-only post-rescope) |
|---|---|---|
| Onboarding screens | 3 screens | **8 screens** (more detailed, с deferred signup) |
| Onboarding welcome copy | Mixed "find pros" messaging | **"Take a photo. Know the price. Decide what to do."** |
| Processing screen copy | "Pulling local plumber rates from our network..." | "Estimating labor for your zip..." (no "network") |
| Result screen Pro option | Full Pro Match card с 3 contractors | Simple deeplink to Thumbtack/Google/Yelp |
| Paywall value prop | "Unlimited estimates + priority pro matching" | "Unlimited estimates + saved projects + price alerts" |
| Paywall context gates | 5 contexts (incl. Pro Match) | **4 contexts** (Pro Match removed) |
| Paywall pricing | $7.99/mo (prior v1.0) | **$9.99/mo per CLAUDE.md finalization** |
| Retention north star | QAR only | **WEPA + QAR (WEPA primary)** |
| Retention loops | 4 loops | **6 loops (+ Savings Anniversary, Neighbor Benchmarking v1.5)** |
| Push copy examples | "New pros в your area" / "Pro availability" | **"Anything new around the house?" / "Savings crossed $500"** |
| Push removed categories | — | "Pro response" / "New pros" / "Pro availability" all removed |
| Share copy | "I found a great plumber via FixIt" | **"FixIt saved me $185 — I did it myself"** |
| ASO subtitle | "Photo → real price, 60 sec" | **"Photo repair cost advisor"** |
| ASO keywords removed | — | "plumber near me", "find a contractor", "pro marketplace" removed |
| ASO keywords added | — | "fix it yourself", "DIY repair estimate", "know repair cost", "home maintenance calendar" added |
| ASO category | Lifestyle > Home Improvement | **Utilities / Tools** (Services explicitly rejected) |
| ASO screenshots | 6 frames incl. pro profile cards | **6 frames, NO pro profile cards**; Frame 5 = Savings tracker (new) |
| ASO review prompt trigger | After 3rd estimate | **After DIY success tap (peak positive)** |
| ASO localization pace | Aggressive (UK/CA/AU Y1 + Spanish Y2) | **Conservative** (US only 6mo, English markets 6-9mo, Spanish v1.5+) |
| CPP count | 3 CPPs | **4 CPPs** (added "Home Maintenance" для retention) |
| Removed metrics | — | Pro Match CTR, affiliate clicks, quote request rate, lead-to-hire, Pro response time |
| Added metrics | — | Savings shared, DIY success rate, Save-to-My-Home rate, Home Health CTR, Savings anniversary CTR |

---

**Дата последнего обновления:** 2026-04-19 (rescope synthesis)
**Автор:** Practices Team
**Статус:** v2.0 final (post-rescope), ready for Stage 4 UX
**Следующий шаг:** Stage 4 UX — start with SCREEN-MAP.md using PRACTICES-BRIEF as foundation
