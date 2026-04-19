# RETENTION-RESEARCH.md — FixIt

**Дата:** 2026-04-19
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** Practices Research (Stage 3) — rewritten v2.0 post-rescope
**Автор:** Product Team
**Статус:** Final v2.0 (под pure AI-advisor positioning)
**Companion docs:** [POSITIONING.md](../02-product/POSITIONING.md) | [FEATURES.md](../02-product/FEATURES.md) | [MONETIZATION.md](../02-product/MONETIZATION.md) | [USER-PERSONAS.md](../01-research/USER-PERSONAS.md)

---

## TL;DR

FixIt — **infrequent-use utility** (3–8 serious repair events в год для typical homeowner). Daily streak механики структурно невозможны — user физически не открывает app каждый день. После rescope 2026-04-19 (pure AI advisor, no marketplace) retention strategy ещё больше смещается от "marketplace re-engagement" к **utility-grade compounding value**: чем дольше user в app, тем больше weight несут saved projects, savings counter, home health dashboard, maintenance calendar.

Strategy на трёх pillars:

1. **Save-to-My-Home loop** — каждый estimate сохраняется в home profile; target 40% save rate. Это primary switching cost.
2. **Seasonal Home Health nudges** — 4 push/year по календарю + savings anniversary (1 push/year). Total budget 12–16 push/year.
3. **Savings as identity** — counter растёт с каждым DIY-выбором, превращается в "your FixIt savings: $847" — and trigger для виральности ("you saved $X going DIY — your neighbors might want to know").

**North Star:** **WEPA (Weekly Estimates Per Active Household)** + supporting **QAR (Quarterly Active Rate)**. Target Y1: WEPA 0.25, QAR 50%, W4 40%, D90 25%, D180 18%, annual 32%.

**Что выкинуто из v1 plan (partnership-era retention):**
- ❌ "New pros in your area" push (нет network'а — нет такого push)
- ❌ "Pro availability update" push (мы не tracking pro availability)
- ❌ "Joe Smith responded to your quote" push (нет lead infrastructure)
- ❌ "Rate your pro experience" push (мы не posredник)

**Что добавлено:**
- ✅ "Your savings crossed $500 this year" — savings anniversary, новый retention hook
- ✅ "You saved $X going DIY — your neighbors might want to know" — share prompt (виральность через savings, не через "found a pro")
- ✅ "Anything new around the house?" — calm seasonal check-in instead of "need a pro?"
- ✅ "Spring check-in — 3 small fixes worth knowing about" — proactive home health, value-first

---

## 1. The Retention Problem для Infrequent Apps

### 1.1 Почему FixIt не Calm / Duolingo

Классический retention playbook (daily streaks, daily check-ins, 3–5 push/неделю) оптимизирован для high-frequency use cases. Для FixIt он неприменим.

| High-frequency apps | FixIt reality |
|---|---|
| Daily need (stress, language, cravings) | Need только когда что-то сломалось |
| Predictable usage pattern | Triggered by random breakage |
| Streak system motivates | Streak impossible — нет daily action |
| Push 3–5/неделю tolerable | Push >1/месяц вне контекста = uninstall |
| D1 → D7 → D30 classic funnel | Seasonal / cyclical pattern |

### 1.2 Правильный peer group

FixIt ближе к infrequent-use утилитам:

| App | Use frequency | Retention pattern | Что adapt'им |
|---|---|---|---|
| **PictureThis** | 5–15/год | Seasonal garden + plant emergencies | Save-to-collection + seasonal push + savings-equivalent ("you ID'd 47 plants") |
| **Rock Identifier** | 3–10/год | Travel-triggered + curiosity | Lifetime ID counter + collection album |
| **TripIt** | 3–8/год | Triggered by travel events | Itinerary archive + smart calendar |
| **GoodRx** | 2–6/год | Triggered by prescription | Personal pharmacy + price alerts |
| **TurboTax** | 1/год | Annual event | Annual archive + early reminder |

**Что у них общего и что мы заимствуем:**
- Personal archive растёт со временем (compounding value, switching cost)
- Push tied к real-world triggers, не к app calendar
- Counter / dashboard как visible reminder of accumulated value
- Annual recap moment ("year in review") — high engagement event

### 1.3 Benchmarks для peer group

| Категория | W1 | W4 | D90 | D180 | Annual |
|---|---|---|---|---|---|
| High-frequency (Calm/Duolingo) | 70% | 50% | 35% | 25% | 18% |
| Infrequent-use marketplace (Thumbtack) | 45% | 25% | 15% | 8% | 5% |
| Photo-AI utility (PictureThis) | 55% | 35% | 22% | 15% | 12% |
| Photo-AI utility (Rock ID) | 50% | 30% | 18% | 12% | 8% |
| **FixIt target Y1** | **60%** | **40%** | **25%** | **18%** | **32%** |
| **FixIt target Y2** | 65% | 45% | 30% | 22% | 38% |

**Why FixIt может beat PictureThis baseline:**
- **Higher emotional stakes** — money ($200–$2000 impact per decision) vs curiosity ($0.50 если plant не identified). Stronger memory encoding, stronger "I'll come back" intent.
- **More pronounced seasonal cycles** — spring tune-up, fall winterization — distinct peaks с clear push hooks.
- **Compounding personal history** — после 5 estimates home profile растёт, switching cost повышается. PictureThis collection — nice but не finance-relevant.
- **Savings as identity hook** — "$847 saved" работает как finance-app reminder (sticky), не просто "47 plants" (curiosity).

### 1.4 Core challenge: "out of sight, out of mind"

Gap между repairs реально — 2–6 месяцев. Per persona:

- **Emma** зафиксила faucet в апреле. Следующее event — squeaky garage door в июне (gap 6 недель).
- **Tyler** зафиксил петлю шкафа, далее ничего до move-out (gap 4–9 месяцев).
- **Mike** закончил DIY-проект успешно. До следующего проекта — 2–3 месяца.
- **Sarah** validated quote от pro, hired. До следующего — 6–12 месяцев.
- **Ronald** ремонтирует только emergency. Gap 3–6+ месяцев.

За это время user может удалить app (storage cleanup), competitor может переключить внимание (Thumbtack/Angi ads), сам use case уйдёт из памяти ("я же использовал какое-то приложение, как оно называлось…"). Solution framework: **stay top-of-mind через value-first touchpoints, не через "we miss you" pleading**.

### 1.5 Objection handling — "Why come back if I already have my answer?"

Это **самый критичный objection** для AI-advisor utility. User получил estimate в апреле, fixed leak, doesn't think about FixIt в мае. Почему он open в июне?

**Wrong answer:** "Because we'll send you push notifications until you do."
**Right answer:** "Because the answer accumulates — каждый estimate adds к home profile, savings tracker, maintenance calendar. App становится more valuable over time, not less."

Concrete value drivers post-first-estimate:

| Trigger | Value reason to return | Frequency expected |
|---|---|---|
| New problem in house | Fresh estimate (core use) | 3–8/year |
| Pre-purchase research (looking at house, planning reno) | "Quick check what this would cost" | 1–3/year |
| Quote validation — pro gave quote, user wants second opinion | "Snap quote photo, AI compares to range" (Sarah core) | 1–3/year |
| Maintenance calendar reminder | "HVAC filter due — should I DIY or call?" | 4/year |
| Savings anniversary | "You saved $500 this year — see breakdown" | 1/year |
| Home health check-in (seasonal) | "3 small fixes worth knowing about before winter" | 4/year |
| Friend asking about repair | "Let me check FixIt for the price range" | 1–2/year |

**Aggregate:** typical Emma has ~12–18 reasons/year to open FixIt (vs ~4–8 for marketplace-style "find a pro" app). The compounding makes it sticky.

---

## 2. Retention Metrics Framework

### 2.1 North Star: WEPA + QAR

**WEPA (Weekly Estimates Per Active Household) — primary north star.**

Formula: `total_estimates_in_week / unique_active_households_in_week`

Per FEATURES.md → POSITIONING.md alignment, WEPA — наша primary measure of value delivered. Она reflects:
- Actual usage of core loop (estimate generation)
- Per-household efficiency (1 home = 1 unit, не per-individual)
- Weekly granularity (smooth seasonal noise но не slow as quarterly)

Target trajectory:

| Период | WEPA | Интерпретация |
|---|---|---|
| Month 3 beta | 0.15 | Single estimates dominate, low repeat |
| Month 6 launch | 0.25 | Returning users start to drive volume |
| Year 1 | 0.35 | Healthy compound |
| Year 3 | 0.50+ | Default tool — multi-estimate weeks normalized |

**QAR (Quarterly Active Rate) — supporting north star.**

Formula: `% of registered households with ≥1 completed estimate in last 90 days`

Почему quarterly:
- Покрывает 1 full seasonal cycle
- Typical homeowner имеет 1.5–2 repair events в квартал — realistic ритм
- Aligns с subscription renewal cycles
- Captures "I forgot about FixIt for 2 months but came back in spring" — a healthy pattern

Target trajectory:

| Период | QAR | Интерпретация |
|---|---|---|
| Month 3 beta | 35% | Single-use downloads dominate |
| Month 6 launch | 50% | Seasonal push catching up |
| Year 1 | 65% | Product-market fit achieved |
| Year 3 | 80% | Default tool for home decisions |

### 2.2 Supporting metrics

| Метрика | Target Y1 | Почему важно |
|---|---|---|
| W4 retention | 40% | First seasonal touch delivered |
| D90 retention | 25% | One seasonal cycle passed |
| D180 retention | 18% | Two seasonal cycles |
| Annual retention | 32% | Full calendar |
| Save-to-My-Home rate | 40% of estimates | Switching cost driver |
| Seasonal push CTR | >8% | Validates relevance |
| Savings anniversary push CTR | >12% | Personalized milestone signal |
| Savings counter views per active user | >3/year | Standalone dashboard value |
| Estimates per active household / quarter | 2.5+ | Multi-use validation |

### 2.3 Anti-metric: D1/D7 weekly retention

Меряем, но не optimize против. User structurally не должен open FixIt через 7 дней если ничего не сломалось. Low D7 ≠ failure. Если D7 ниже 25% но D90 healthy — это normal infrequent-use pattern, не bug.

Inverse: high D1/D7 без healthy D90 = bot/fake traffic indicator.

### 2.4 Removed metrics (post-rescope)

Метрики, которые мы больше **не tracking** (были в v1 plan под marketplace model):

- ❌ **Pro Match click-through** — не revenue driver больше, не critical (см. POSITIONING §6)
- ❌ **Affiliate click per estimate** — нет affiliate
- ❌ **Pro response time** — мы не posredник
- ❌ **Quote request rate** — мы не lead site
- ❌ **Pro hire conversion** — happens вне FixIt, мы не tracking

Новые метрики, которые добавили:

- ✅ **Savings shared per active user** — viral driver (per POSITIONING.md §6)
- ✅ **DIY success rate** (self-reported) — validates "we help decide" promise
- ✅ **Save-to-My-Home rate** — switching cost proxy
- ✅ **Home Health check-in CTR** — seasonal nudge effectiveness

---

## 3. Save-to-My-Home Loop (Central Retention Mechanism)

После rescope, **saved projects стали primary switching cost driver.** Без marketplace re-engagement (no "your pro" push), без affiliate flow — value compounds исключительно в personal archive. Поэтому save rate — leading indicator всей retention curve.

### 3.1 The loop

```
User takes photo
       ↓
AI returns estimate (3 modes)
       ↓
User views result
       ↓
[Auto-save draft to "My Home"] ← happens silently, default ON
       ↓
Optional: user adds notes / completes / shares
       ↓
6 weeks later: "Did the leak hold? Quick check-in?" (Loop 2)
       ↓
6 months later: "Spring check — 3 fixes for your home" (seasonal)
       ↓
1 year later: "Your savings crossed $500" (anniversary)
```

### 3.2 Save rate targets

| Tier | Save rate (auto + manual) | What we're capturing |
|---|---|---|
| **Auto-draft** (default ON) | 100% | Every estimate → draft project |
| **User-completed** (added notes / marked done) | 40% | Active engagement signal |
| **Photo'd outcome** (before/after) | 15% | High-engagement subset, viral candidates |
| **Annual deletion / cleanup** | <5% | Indicates value stays relevant |

**Critical UX choice:** auto-draft default ON, single-tap to delete. Не "Want to save this?" friction. PictureThis pattern — every plant ID auto-saves to collection без asking. We follow same default.

### 3.3 What "My Home" contains

Per FEATURES.md #7, "My Home" tab включает:

- **Timeline view** — каждый projet card (photo thumbnail, category, date, estimated cost, mode chosen, outcome)
- **Filter by room** (kitchen / bathroom / yard / etc. — auto-tagged from AI photo analysis)
- **Project detail** — original diagnosis, estimate range, what user actually paid (if logged), photos before/after, notes
- **Home profile stats:** "You've saved $X via DIY this year" + "Next suggested maintenance: HVAC filter due in 2 weeks"
- **PDF export** — for insurance claims, resale disclosures (Pro feature)

### 3.4 Retention mechanism = compounding archive

Каждый saved project делает app marginally более valuable. После 5 estimates у Emma есть:
- Reference list of past fixes (когда меняла cartridge — год назад? два?)
- Cost history (как изменились labor rates за год)
- Maintenance prediction footing (AC tune-up was last June → due now)
- Savings narrative ("$847 saved across 6 projects" — story с numbers)

Switching к competitor = losing all это. Это **the retention moat** for utility-only model.

---

## 4. Home Maintenance Seasonal Calendar

Home maintenance имеет чёткий календарь — используем как backbone для proactive engagement (не reactive "we miss you").

### 4.1 Spring (март–май) — HIGH activity

**Events:** HVAC tune-up, roof inspection после зимы, gutter cleaning, lawn/garden prep, exterior paint assessment, window screens.

**Push copy:** "Spring check-in — 3 small fixes worth knowing about before summer hits."

**Send window:** Last week Feb для Sun Belt, third week March для Midwest/Northeast.

**Why this works:** "knowing about" frame = informational, не sales. User opens dashboard, sees suggestions с estimated costs ($45–$200 for typical spring cluster), can choose to estimate or ignore. No urgency dark pattern.

### 4.2 Summer (июнь–август) — MEDIUM activity

**Events:** AC repairs (PEAK), deck repairs, pool maintenance (Sun Belt), storm damage, appliance failure.

**Push copy:** "AC season — know what's normal to pay before you call."

**Send window:** Trigger-based — first heatwave of region (OpenWeatherMap free tier API).

**Why this works:** "before you call" = positions FixIt as pre-funnel consultation (per POSITIONING §8). User не должен hire через FixIt — мы advise, он решает.

### 4.3 Fall (сентябрь–ноябрь) — HIGH activity

**Events:** Winterization (pipes, outdoor faucets), heating tune-up, storm windows, gutter cleanup, chimney inspection, weatherstripping.

**Push copy:** "Fall prep — 5 things worth fixing before frost. Most homeowners save $400+ doing them now."

**Send window:** First week Oct для Northeast/Midwest, first week Nov для Sun Belt.

### 4.4 Winter (декабрь–февраль) — LOW-MEDIUM activity

**Events:** Emergency fixes (burst pipes, furnace failure), indoor projects (paint, flooring), holiday damage, insulation/weatherstripping.

**Push copy:** "Indoor project season — check costs before you start that bathroom refresh."

**Send window:** Early Jan (post-holiday "new year, new home" psychology).

### 4.5 Region-specific adjustments

Generic "spring" push не работает для Arizona (март = лето) и Minnesota (март = ещё зима). С MVP+3 months внедряем climate zone mapping (zip → USDA zone → seasonal calendar adjustment) + event-triggered push (первый снег, первая жара).

Stack: OpenWeatherMap free tier + NOAA climate data — both free, no partnership needed.

---

## 5. Engagement Loops

### 5.1 Loop 1: Seasonal Home Health Check (4×/year)

**Trigger:** Seasonal window (regional-adjusted)
**Action:** User opens "Home Health" dashboard with 3–5 suggested estimates
**Value:** Proactive cost awareness, no hard sell
**Hook:** "Spring check-in — 3 small fixes worth knowing about"
**Target CTR:** >8%

**Why redesigned post-rescope:** old version был "new pros в your area" — pushed marketplace. New version = informational dashboard, value-first.

### 5.2 Loop 2: Project Follow-Up (event-triggered)

**Trigger:** 7–14 days after estimate completion
**Action:** Check-in "Did the fix hold? Mark complete or note an issue."
**Value:** Personal accountability, AI feedback data, save-to-My-Home reinforcement
**Hook:** "How did the kitchen faucet repair go? 30-sec check-in."
**Target response rate:** 40%

**Why redesigned:** old version had "share before/after — earn $5 credit" (gamified). New version is calm — credit removed, just data + reflection. Sugar Quit lessons: pleading > works once, not twice.

### 5.3 Loop 3: Savings Share Prompt (виральный)

**Trigger:** User self-reports DIY success in Loop 2 → "Yes, I fixed it"
**Action:** Auto-suggest share card "Saved $X going DIY — your neighbors might want to know"
**Value:** Social currency + viral acquisition
**Hook (in-app):** "You just saved $185. Share so a neighbor doesn't pay $800 for the same fix."
**Target:** 15% of successful DIY users share (vs 8% in v1 plan when share was "found a pro")

**Why this is new:** виральный hook сместился — old plan was "I found a great plumber via FixIt" (review of pro), new plan is "FixIt saved me $185 — I did it myself" (review of self + tool). Personal pride + financial savings = much stronger share trigger.

Per POSITIONING.md §6: "Savings стало новым гео-якорем виральности. Не 'found a pro' — 'saved $X'."

### 5.4 Loop 4: Re-engagement Escalation (dormant user)

**Trigger:** 30 days no activity
**Value:** Reminder of past savings + low-pressure value sample
**Hook:** "Your lifetime savings so far: $847. Anything new around the house?"

Escalation ladder:

| Day | Channel | Copy | Target CTR |
|---|---|---|---|
| 30 | Push | "Your lifetime savings: $X. Anything new around the house?" | 6% |
| 45 | Email (opt-in) | "Spring is coming — sample fix you might want to estimate" | 4% open, 1.5% click |
| 60 | Push | "We have a sample fix for your home — want to see it?" | 4% |
| 90 | Email | Win-back with 50% off annual subscription | 8% open, 2.5% click |
| 120+ | — | Accept churn, surface in retargeting paid ads only | — |

**Critical change:** day 60 push is "see a sample fix?" — **NOT "pros near you"**. The value sample is a Home Health suggestion (e.g., "want to see what AC tune-up costs in your zip?"), not a pro listing.

Old language we removed:
- ❌ "New pros joined your area"
- ❌ "Pro X is now available"
- ❌ "Reply rate up in Denver"

### 5.5 Loop 5: Savings Anniversary (yearly)

**Trigger:** 1 year after first estimate, OR savings counter crosses $500 / $1000 / $2500 (whichever first)
**Action:** Personalized "Year in Review" or "Milestone Crossed" screen
**Value:** Identity reinforcement, share moment, subscription renewal nudge
**Hook:** "Your savings crossed $500 this year. Here's the breakdown."
**Target CTR:** >12% (personalized milestones outperform generic by ~2×)

**Anniversary screen contents:**
- Lifetime savings counter prominent
- Top 3 biggest "saves" (estimate vs. actual paid, or DIY vs. quoted-pro range)
- Number of repairs handled
- Maintenance category most frequented
- Share template ("$X saved with FixIt this year — DIY for the win")
- Optional renewal upsell if subscription expiring within 60 days

**Why this is new:** v1 plan didn't have anniversary as separate loop. This is direct adopt of Spotify Wrapped / TripIt year-in-review pattern, which drives 30–40% engagement spike one day per year for utility apps.

### 5.6 Loop 6: Neighbor Benchmarking (v1.5+, post-MVP)

**Trigger:** New trend in zip detected (3+ similar estimates last 14 days)
**Value:** Hyperlocal social proof, community awareness
**Hook:** "12 households in 80203 estimated gutter repairs this week — fall rains starting"
**Privacy:** Aggregated к zip-level only, minimum 5 households/zip before visible.

**Note:** Not in MVP — needs density of users per zip. Plan для post-PMF when we have 100+ users in target zips.

---

## 6. Retention Features в продукте

Features which create retention независимо от push.

### 6.1 "My Home" dashboard (primary retention asset)

Personal home profile, растёт по мере использования:
- **Home basics** (type, year built, sqft, zip) — captured gradually, never all-at-once form
- **Past repairs log** chronologically (auto-populated from estimates)
- **Maintenance calendar** with predictions (HVAC filter / gutter / smoke detector batteries)
- **Lifetime savings counter** — always visible
- **Home Health score** — composite (seasonal completeness + maintenance currency)
- **Before/after photo gallery** (v1.5)

**Retention mechanism:** Dashboard становится valuable asset, creating organic switching cost. Critical post-rescope — without marketplace, this IS the retention engine.

### 6.2 Savings counter as primary UI element

Always visible на home tab:

> **Your FixIt savings: $847** (across 6 completed repairs)

Psychological mechanisms:
- **Achievement feeling** каждый раз когда открываешь app — positive reinforcement
- **Sunk cost / loss aversion:** "I've saved $847 here, I trust FixIt for next repair" — uninstall feels like losing accumulated value
- **Social currency:** conversation starter ("let me check my FixIt savings")
- **Compounding effect:** counter grows over time → стоимость switching к competitor растёт

**Calculation methodology** (transparency matters — user should trust the number):
- DIY mode chosen → savings = (Pro mode mid-estimate) − (DIY material cost)
- Hybrid mode chosen → savings = (Pro mode mid-estimate) − (Hybrid total)
- Quote validation result (Sarah path) → savings = (pro's quoted price) − (FixIt's mid-estimate range), only if user reports actually negotiating
- Tap on counter → breakdown screen with each repair contributing to total

**Honesty principle:** показываем "estimated savings" с small disclaimer, не "guaranteed savings". Estimated honestly > inflated and untrusted.

### 6.3 Home Health Score (v1.0 simple, v1.5 full)

MVP simple version: 4 seasonal checkboxes (spring done? summer done? fall done? winter done?) → percentage.

V1.5 full version: weighted score considering:
- Maintenance category coverage (HVAC, plumbing, exterior, electrical) — 40%
- Recency of estimates / repairs — 30%
- Outcome logging completeness — 20%
- Anniversary milestones hit — 10%

Visible on home tab as small widget. Increases when user completes seasonal recommendations. Drives nudge "your home health is 65% — here's how to get to 80%".

### 6.4 Project history with outcomes

Automatic follow-up:
- "3 months ago you fixed leaky faucet. Still holding?"
- "1 year ago: water heater flush. Annual maintenance reminder."

Creates feedback loop + reminds user of past value. Если prior fix failed → user returns to us for new estimate, not к Google. Если fix held → positive reinforcement, more likely to share.

### 6.5 Persona-adapted dashboards (v1.5)

Different primary widget per detected persona (via behavioral signals — estimate types, quality tier preferences, mode-selection ratio):

- **Emma:** seasonal maintenance card + savings counter prominent
- **Mike:** project history + DIY success rate + tool checklist
- **Sarah:** "Recent quote validations" + estimate-vs-quoted comparison
- **Tyler:** deposit risk score + move-out checklist
- **Ronald:** large-button "recent estimates" + seasonal one-tap check

---

## 7. Retention by Persona

### 7.1 Emma (Primary)

**Anchors (post-rescope):**
1. Seasonal home health check (Emma не знает home calendar — we teach proactively, not pushily)
2. Savings counter + anniversary milestones (family budget relevance, identity hook)
3. Save-to-My-Home as default (becomes home journal she didn't know she wanted)
4. Share-savings template (Instagram-friendly, social pride)
5. First-time homeowner community (v1.5)

**Anti-pattern (and removed from v1 plan):**
- ❌ Daily streaks (structurally impossible)
- ❌ "Pros near you" pushes (we have no pros — always was untrue, now truthfully gone)
- ❌ "Your weekly home digest" (over-cadence — kills permission)
- ❌ Gamified credits / points ("$5 credit for sharing" — feels transactional, not calm)

**Key metric:** Return within 45 days of first estimate. If yes → 65% annual retention; if no → 25%. Therefore Loop 2 (project follow-up at 7–14 days) is critical to set up the second touchpoint.

### 7.2 Mike (Secondary)

**Anchors:**
1. Project history archive (Mike loves logs — past projects = his receipt of skill development)
2. DIY success rate (badge of competence)
3. Maintenance schedule (proactive appreciation, fits his planner mindset)
4. YouTube search button (fits his preferred research mode)
5. Project plan exports (PDF of estimate + steps + materials)

**Key metric:** Monthly active (realistic cadence given project planning behavior — он thinks ahead 4–6 weeks).

### 7.3 Sarah (Secondary)

**Anchors:**
1. Quote validation history (snap pro's quote, archive comparison) — discrete high-value use
2. Repeat-validator badge ("verified 12 quotes — 8 saved you money")
3. Home value tracking (v1.5) — "maintenance preserves home value $X"
4. Quarterly update push ("HVAC quotes trending в Chicago — typical range $X")

**Note:** Removed "safe pro bookmarks" from v1 plan — это marketplace feature, мы больше не tracking pros. Sarah uses Yelp/Google для finding pros, мы just validate prices.

**Key metric:** Return on-demand quarterly (typical estimate density для her use case).

### 7.4 Tyler (Tertiary)

**Anchors:** Lease-cycle touchpoints (move-in, mid-lease, move-out), rental property guide, tenant rights content.

**Key metric:** Lease-cycle usage (3–5 uses over 2-year lease). Pay-per-estimate model лучше subscription для него (per MONETIZATION §2).

### 7.5 Ronald (Tertiary)

**Anchors:** Simple seasonal check-in, daughter-shared estimates (v1.5 multi-user), large-button UI, no gamification.

**Removed:** "AARP scam alerts" was in v1 plan — useful but не MVP scope. Will revisit v1.5+.

**Key metric:** Quarterly seasonal check-in (one push-triggered open/quarter = success).

---

## 8. Push Notification Strategy

### 8.1 Annual budget per user: 12–16 pushes (unchanged)

| Category | Pushes/year | Notes |
|---|---|---|
| Seasonal Home Health (4 seasons) | 4 | Spring/summer/fall/winter |
| Project follow-up (event-triggered) | 1–3 | Per estimate completion |
| Re-engagement escalation | 0–3 | Dormant user ladder |
| Savings anniversary / milestones | 1–2 | Yearly + amount thresholds |
| Maintenance calendar reminders (v1.5) | 2–4 | HVAC filter, smoke alarms |
| **Total ceiling** | **12–16** | |

Compare: Sugar Quit ~150–250/year. FixIt 10× меньше. Этот constraint critical — over-cadence = uninstall.

### 8.2 Timing

- **Time:** 19:00–20:00 local (Emma post-dinner window); Ronald earlier — 17:00
- **Day:** Tuesday–Thursday primary (not weekends — family time; not Monday morning — work chaos)
- **Seasonal:** trigger-based, не calendar-based (first snow, first heatwave detected via OpenWeatherMap)

### 8.3 Copy principles (post-rescope)

- **Calm, not urgent** — "Anything new around the house?" > "ACT NOW — water damage costs $5K!"
- **Informational, not pushing** — "3 fixes worth knowing about" > "Find a pro now"
- **Local когда возможно** — city/zip name when copy benefits
- **Character limit:** <90 chars, <10 words в headline (2× CTR)
- **Voice:** calm advisor, не sales rep (per POSITIONING §7)

### 8.4 Examples — Good vs Bad

**Good (post-rescope):**
- "Anything new around the house? Spring check-in is ready."
- "Spring check-in — 3 small fixes worth knowing about"
- "Your savings crossed $500 this year. See the breakdown."
- "You saved $185 going DIY — your neighbors might want to know."
- "AC season — know what's normal to pay before you call."
- "6 months ago you fixed your faucet. Still working? 30-sec check-in."

**Bad (removed from v1 plan):**
- ❌ "New pros joined your area!" (no pros in MVP)
- ❌ "Pro Joe Smith responded to your quote" (no pro infrastructure)
- ❌ "Your weekly pro availability update" (we don't track that)
- ❌ "Come back to FixIt!" (generic, pleading)
- ❌ "You haven't used FixIt in a while" (guilt-based)
- ❌ "Save on home repair!" (vague, promotional)

### 8.5 Permission request timing

DO NOT ask на onboarding. Ask **после first successful estimate**, context-framed:

> "Want a heads-up when seasonal home maintenance is due? About 1 push per month, never spam."

Grant rate с контекстом: ~60%. Без — ~25%. 2.4× difference в permission grant rate напрямую транслируется в retention — user без push permission имеет 2× выше churn.

### 8.6 Push fatigue safeguards

- **Skip logic:** если user tapped last 2 pushes → позволить следующий. Если ignored 2 в ряд → skip next scheduled push.
- **Quiet periods:** Holidays (Christmas week, Thanksgiving week, July 4th week) — no non-emergency push.
- **Emergency override:** Weather alerts (hurricane, freeze warning) bypass regular budget, но max 2/year.
- **User-controlled cadence:** in-app "Remind me less / more often" toggle (default monthly).

---

## 9. Email as Secondary Channel

Push permission rate ~60%. **Email gives channel к оставшимся 40%.** Plus email allows longer-form content (year in review, seasonal guides).

| Email | Frequency | Purpose | Default opt-in? |
|---|---|---|---|
| Welcome | 1× after signup | Value reinforcement, save first estimate ask | Yes |
| Monthly digest | Optional 1×/month | Savings + seasonal suggestions | No (toggle) |
| Seasonal guide | 4×/year | "Fall maintenance guide для Denver" | Yes |
| Annual recap | 1×/year | "2026: you saved $X" — Spotify Wrapped style | Yes |
| Re-engagement | Triggered | Loop 4 escalation | Yes for first 2, then opt-out only |

Benchmarks (Home & Lifestyle category): open 20–25%, CTR 2.5%. FixIt targets similar или slightly higher (action-oriented home content).

**Removed from v1 plan:** "Pro recommendation digest" email — был partnership-tied, gone with rescope.

---

## 10. Churn Prevention

### 10.1 Churn predictors

| Signal | 90-day churn probability |
|---|---|
| 30 days no open | 40% |
| No estimate в 60 days несмотря на seasonal push | 55% |
| Negative feedback без follow-up | 60% |
| Ignored first 2 seasonal pushes | 50% |
| 1 estimate, no return in 45 days | 70% |
| Save-to-My-Home rate <20% (auto-draft deletes) | 65% |

### 10.2 Acceptable churn levels

Infrequent-use apps must accept higher gross churn than daily-use apps:

| Monthly churn | Interpretation |
|---|---|
| 5–8% | Healthy для FixIt |
| 9–11% | Elevated — investigate |
| >12% | Structural red flag |

Annual net retention target: 60%+ of active-after-month-1. Compares favorably to Thumbtack-style marketplace (~40% annual net retention per public filings).

### 10.3 Delete protection

На sign-out / delete account flow intercept с value reminder:

> "Wait — you've saved $847 with FixIt across 6 repairs. Sign out keeps your account; delete removes your home history."

Per Sugar Quit reference: ~30% of would-be deleters reverse decision when value reminder shown at exit point.

### 10.4 Subscription churn — separate from app churn

Subscription cancellation (per MONETIZATION §6) gets:
- Pre-cancel survey (1 question, optional)
- Win-back flow: 30 days later "50% off next month" if user reactivates
- Account preserved (no data loss for sub-cancellers — they can pay-per-estimate $2.99 if needed)

---

## 11. Community Retention (v1.5+)

Не MVP priority. Levers для v1.5+:

- **User-generated before/after gallery** (opt-in public mode) — "see what neighbors fixed"
- **Ask community** — "Should I DIY this or call a pro?" Photo + AI + community responses
- **Expert AMAs** — YouTube DIYer partnerships monthly
- **Neighbor meetups** (v2.0+) — hyperlocal tool-share

**Anti-patterns:**
- Toxicity (Reddit-style) — Sarah persona avoids forums; heavy moderation needed
- Over-gamification of community — no "most helpful commenter" streaks
- Fake engagement — community output, not force-factor

---

## 12. Progressive Unlocks

Level ladder tied к estimate count — gentle gamification без streaks:

| Estimates | Unlock |
|---|---|
| 1 | Basic functionality + savings counter starts |
| 3 | "My Home" dashboard + maintenance calendar preview |
| 5 | Before/after gallery + sharing templates |
| 10 | Social sharing badges ("Denver homeowner", "5 DIY wins") |
| 15 | Tool inventory tracker (Mike-targeted) — v1.5 |
| 25 | Community features (Ask / AMA participation) — v1.5 |
| 50 | "FixIt expert" status |

**Why works for infrequent use:** levels not timer-based — stable между uses. Duolingo streak ломается через один день; FixIt level постоянен.

**Anti-patterns:**
- Pay-to-unlock (annoys free users — keep level system free)
- Over-leveling (stop at 25–50, не infinite ladder)
- Visible friction ("UPGRADE TO UNLOCK!!!")

---

## 13. Experiments Plan

### 13.1 Stage 1 (Month 1–3): Baseline + foundational

- Cohort tracking baseline (W1, W4, D90, D180 by signup month)
- Push permission timing A/B (onboarding vs post-first-estimate — expected 2.4× grant rate)
- Seasonal push creative test (generic vs zip-personalized — expected 2× CTR diff)
- Auto-save-to-My-Home default A/B (default ON vs default OFF with prompt — hypothesis: ON wins on retention)

### 13.2 Stage 2 (Month 4–6): Engagement loop calibration

- Email digest opt-in rate
- Savings counter visibility test (always-visible на home tab vs dashboard-only — hypothesis: always-visible +15% W4)
- Loop 2 timing (7-day vs 14-day project follow-up — hypothesis: 14 better, more time to actually attempt fix)
- Anniversary push timing (exactly 1 year vs $500 milestone — which drives more re-engagement?)

### 13.3 Stage 3 (Month 7–12): Advanced retention

- Neighbor trend alerts pilot (Denver + Austin — 2 highest-density zips)
- Re-engagement ladder calibration (which day in 30/45/60/90 ladder drives most return?)
- Home Health Score visibility test (badge vs full widget vs no widget)
- Persona-detected dashboard A/B (v1.5 prep)

### 13.4 Quarterly review

- Cohort curves by signup month
- Persona-split retention
- Push effectiveness per category (seasonal / follow-up / anniversary / re-engagement)
- Churn cohort analysis with predictor signal validation

---

## 14. What Changed Post-Rescope (Summary)

For commit history readability:

| Area | v1 (partnership-era) | v2 (AI-only post-rescope) |
|---|---|---|
| North star | QAR only | WEPA + QAR (WEPA primary) |
| Push messaging | "Find a pro" centric | "Anything new around the house?" calm |
| Loop 1 (seasonal) | "New pros in your area" | "Spring check-in — 3 fixes worth knowing about" |
| Loop 2 (follow-up) | "Rate your pro" + $5 credit | "Did the fix hold? Mark complete" — no credit |
| Loop 3 (sharing) | "I found a great plumber via FixIt" | "FixIt saved me $185 — I did it myself" |
| Loop 4 (re-engagement) | "Pros near you available" | "See a sample fix?" + savings reminder |
| Loop 5 (NEW) | — | Savings anniversary / milestone |
| Switching cost | Lead-gen relationships + saved pros | Saved projects + savings counter + Home Health |
| Sarah retention | "Safe pro" bookmarks | Quote validation history |
| Removed metrics | Pro response time, lead conversion, affiliate CTR | (gone) |
| Added metrics | Save-to-My-Home rate, savings shared, DIY success | |

---

## 15. Related Docs

- [POSITIONING.md](../02-product/POSITIONING.md) — foundation for all retention copy decisions
- [FEATURES.md](../02-product/FEATURES.md) — retention features в MVP (#7 Saved Projects, #10 Push)
- [MONETIZATION.md](../02-product/MONETIZATION.md) — subscription cycle, win-back flow
- [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) — first-time setup, permission timing
- [PAYWALL-RESEARCH.md](./PAYWALL-RESEARCH.md) — paid conversion, upgrade cadence
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — persona motivations и retention anchors

---

**Дата последнего обновления:** 2026-04-19
**Следующий шаг:** ASO-RESEARCH.md и PRACTICES-BRIEF.md синтез — same rewrite cycle.
