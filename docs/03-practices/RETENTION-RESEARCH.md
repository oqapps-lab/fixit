# RETENTION-RESEARCH.md — FixIt

**Дата:** 18 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** Practices Research (Stage 3)
**Автор:** Product Team
**Статус:** Draft v1.0
**Companion docs:** [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) | [FEATURES.md](../02-product/FEATURES.md) | [USER-PERSONAS.md](../01-research/USER-PERSONAS.md)

---

## TL;DR

Retention challenge FixIt фундаментально отличается от high-frequency apps: это **infrequent-use app** (3–8 serious repair events в год для typical homeowner). Daily streaks а-ля Duolingo structurally не работают — user физически не может использовать FixIt ежедневно. Strategy строится на трёх pillars: **seasonal engagement** (home maintenance имеет чёткий календарь), **anchor events** (привязка к новому сезону, anniversary дома, completion прошлого проекта) и **shared value** (lifetime savings counter, before/after sharing, neighbor benchmarking).

Target retention: W4 **40%+**, D90 **25%+**, D180 **18%+**, annual **32%**. North Star — **Quarterly Active Rate (QAR)**, % users с ≥1 estimate за последние 90 дней. Annual push budget: 12–16/year (не 150–250 как health apps).

---

## 1. The Retention Problem для Infrequent Apps

### 1.1 Почему FixIt не Calm / Duolingo

Классический retention playbook (daily streaks, daily check-ins, 3–5 push/неделю) оптимизирован для high-frequency use cases. Для FixIt он неприменим:

| High-frequency apps | FixIt reality |
|---|---|
| Daily need (stress, language, cravings) | Need только когда что-то сломалось |
| Predictable usage pattern | Triggered by random breakage |
| Streak system motivates | Streak impossible — нет daily action |
| Push 3–5/неделю tolerable | Push >1/месяц вне контекста = uninstall |
| D1 → D7 → D30 classic funnel | Seasonal / cyclical pattern |

### 1.2 Правильный peer group

FixIt ближе к другим infrequent-use apps:

| App | Use frequency | Similarity |
|---|---|---|
| **TripIt** | 3–8/год | Triggered by travel events |
| **PictureThis** | 5–15/год | Seasonal garden work |
| **GoodRx** | 2–6/год | Triggered by prescription |
| **TurboTax** | 1/год | Annual event |

### 1.3 Benchmarks for peer group

| Категория | W1 | W4 | D90 | D180 |
|---|---|---|---|---|
| High-frequency (Calm/Duolingo) | 70% | 50% | 35% | 25% |
| Infrequent-use (TripIt) | 50% | 30% | 20% | 12% |
| Seasonal photo-AI (PictureThis) | 55% | 35% | 22% | 15% |
| **FixIt target** | **60%** | **40%** | **25%** | **18%** |

### 1.4 Core challenge: "out of sight, out of mind"

Gap между repairs реально — 2–6 месяцев. Конкретный scenario per persona:

- **Emma** зафиксила faucet в апреле. Следующее event — squeaky garage door в июне (gap 6 недель).
- **Tyler** зафиксил петлю шкафа, далее ничего до move-out (gap 4–9 месяцев).
- **Mike** закончил DIY-проект успешно. До следующего проекта — 2–3 месяца.
- **Sarah** validated quote от pro, hired. До следующего — 6–12 месяцев.
- **Ronald** ремонтирует только emergency. Gap 3–6+ месяцев.

За это время user может удалить app (iPhone storage освобождение), competitor может переключить внимание (Angi, Thumbtack ads), сам use case уйдёт из памяти ("я же использовал какое-то приложение, как оно называлось..."). Solution framework: **stay top-of-mind без спама** через seasonal + anchor + social.

### 1.5 Почему мы можем beat PictureThis baseline

- **Higher emotional stakes** — money ($200–$2000 impact per decision) vs curiosity ($0.50 если plant не identified). Stronger memory encoding.
- **More pronounced seasonal cycles** — spring tune-up, fall winterization — distinct peaks.
- **Social sharing potency** — home before/after = Instagram Reels / TikTok #hometok (4B views) vs niche plant community.
- **Compounding personal history** — после 5 estimates home profile растёт, switching cost повышается.

---

## 2. Retention Metrics Framework

### 2.1 North Star: Quarterly Active Rate (QAR)

**QAR = % users с ≥1 completed estimate за последние 90 дней.**

Почему квартал, а не week/month:
- Покрывает 1 full seasonal cycle
- Typical homeowner имеет 1.5–2 repair events в квартал — realistic ритм
- Aligns с subscription renewal cycles

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
| Seasonal push CTR | >8% | Validates relevance |
| Savings counter views | >3/user/year | Standalone dashboard value |

### 2.3 Anti-metric: D1/D7 weekly retention

Меряем, но не optimiz против. User structurally не должен open FixIt через 7 дней если ничего не сломалось. Low D7 ≠ failure.

---

## 3. Home Maintenance Seasonal Calendar

Home maintenance имеет чёткий календарь — используем как backbone retention.

### 3.1 Spring (март–май) — HIGH activity

**Events:** HVAC tune-up, roof inspection после зимы, gutter cleaning, lawn/garden prep, exterior paint assessment, window screens.

**Push copy:** "Denver spring check: top 5 repairs neighbors asking about — gutters, AC tune-up, roof shingles. Tap to see costs."

**Send window:** Last week Feb для Sun Belt, third week March для Midwest/Northeast.

### 3.2 Summer (июнь–август) — MEDIUM activity

**Events:** AC repairs (PEAK), deck repairs, pool maintenance (Sun Belt), storm damage, appliance failure.

**Push copy:** "AC not cooling well? Denver HVAC pros booked out 3 weeks — estimate your fix in 60 seconds first."

**Send window:** Trigger-based — first heatwave of region.

### 3.3 Fall (сентябрь–ноябрь) — HIGH activity

**Events:** Winterization (pipes, outdoor faucets), heating tune-up, storm windows, gutter cleanup, chimney inspection, weatherstripping.

**Push copy:** "Fall prep: 5 things to fix before winter. Most homeowners save $400+ by doing these now."

**Send window:** First week Oct для Northeast/Midwest, first week Nov для Sun Belt.

### 3.4 Winter (декабрь–февраль) — LOW-MEDIUM activity

**Events:** Emergency fixes (burst pipes, furnace failure), indoor projects (paint, flooring), holiday damage, insulation/weatherstripping.

**Push copy:** "Indoor project season: 3 kitchen refresh ideas under $500. See what neighbors в Denver are fixing this month."

**Send window:** Early Jan (post-holiday "new year, new home" psychology).

### 3.5 Region-specific adjustments

Generic "spring" push не работает для Arizona (март = лето) и Minnesota (март = ещё зима). С MVP+3 months внедряем climate zone mapping (zip → USDA zone → seasonal calendar adjustment) + event-triggered push (первый снег, первая жара).

Stack: OpenWeatherMap free tier + NOAA climate data.

---

## 4. Engagement Loops

### 4.1 Loop 1: Seasonal push
**Trigger:** Seasonal window (regional-adjusted)
**Action:** User opens "Home maintenance to-do" dashboard
**Value:** Proactive cost awareness
**Hook:** "3 items recommended for your Denver home — estimated $180–$350 total"
**Target CTR:** >8%

### 4.2 Loop 2: Project follow-up
**Trigger:** 7 days after estimate completion
**Action:** Check-in "Did you complete the repair?" (Yes / Not yet / Abandoned)
**Value:** Accountability, AI feedback data
**Hook:** "Share before/after photo — earn $5 credit"
**Target response rate:** 40%

### 4.3 Loop 3: Social sharing
**Trigger:** Successful DIY completion (Loop 2 = "Yes")
**Action:** "Share your win" с pre-filled template
**Value:** Social currency, Instagram-worthy moment
**Hook:** "Just fixed [problem] myself. Saved $[amount]. Before → after ↓"
**Target:** 15% of successful DIY users share

### 4.4 Loop 4: Re-engagement escalation
**Trigger:** 30 days no activity
**Value:** Reminder of past savings
**Hook:** "Your lifetime savings so far: $[X]. Season change — anything worth a quick estimate?"

Escalation ladder:
- Day 30: Soft seasonal push
- Day 45: Email digest (if opted in)
- Day 60: "We miss you" + incentive (priority estimate free)
- Day 90: Final save attempt — subscription 50% off
- Day 120+: Accept churn

### 4.5 Loop 5: Neighbor benchmarking (v1.5)
**Trigger:** New trend в zip detected (3+ similar estimates last 14 days)
**Value:** Hyperlocal social proof + FOMO
**Hook:** "12 neighbors in 80203 fixed gutter issues this week — fall rains starting"
**Privacy:** Aggregated к zip-level only, minimum 5 users/zip before visible.

---

## 5. Retention Features в продукте

Features, which create retention независимо от push.

### 5.1 "My Home" dashboard
Personal home profile, растёт по мере использования:
- Home basics (type, year built, sqft, zip) — captured gradually
- Past repairs log chronologically
- Maintenance calendar predictions (v1.5)
- **Life-to-date savings counter** — всегда visible
- Before/after photo gallery (v1.5)

**Retention mechanism:** Dashboard становится valuable asset, creating organic switching cost.

### 5.2 Before/after photo gallery
User's portfolio of DIY wins. Pride → positive association. Sharing templates amplify external.

### 5.3 Project history with outcomes
Automatic follow-up:
- "3 months ago you fixed leaky faucet. Still holding?"
- "1 year ago: water heater flush. Annual maintenance reminder."

Creates feedback loop + reminds user of past value. Если prior fix failed → user returns to us, not к Google.

### 5.4 Savings counter as primary UI
Always visible на home screen:
> **Your FixIt savings: $847** (across 6 completed repairs)

Psychological mechanisms:
- **Achievement feeling** каждый раз когда открываешь app — positive reinforcement
- **Sunk cost fallacy:** "I've saved $847 here, I trust FixIt для next repair" — loss aversion если uninstall
- **Social currency:** conversation starter ("let me check my FixIt savings")
- **Compounding effect:** counter grows over time → стоимость switching к competitor растёт

### 5.5 Persona-adapted dashboards (v1.5)

Different primary widget per detected persona (via behavioral signals — estimate types, quality tier preferences):

- **Emma:** seasonal maintenance card + savings counter
- **Mike:** tool inventory + project history
- **Sarah:** "Recent quote validations" + safe pros list
- **Tyler:** deposit risk score + move-out checklist
- **Ronald:** large-button "recent estimates" + scam alerts

---

## 6. Retention by Persona

### 6.1 Emma (Primary)
**Anchors:**
1. Seasonal maintenance reminders (Emma не знает home calendar — we teach)
2. Before/after Instagram sharing (daily Instagram user)
3. "Home score" gamification ("top 30% maintenance for homes of similar age в Denver")
4. Lifetime savings counter (family budget relevance)
5. First-time homeowner community (v1.5)

**Anti-pattern:** Daily streaks, daily check-ins.
**Key metric:** Return within 45 days of first estimate. If yes → 65% annual retention; if no → 25%.

### 6.2 Mike (Secondary)
**Anchors:**
1. Tool tracking (v1.5) — "bought impact driver March, here's projects that need it"
2. DIY project ideas (quarterly digest)
3. Maintenance schedule (proactive appreciation)
4. YouTube integrations (Mike heavy YouTube)
5. Project plan exports

**Key metric:** Monthly active (realistic cadence given project planning behavior).

### 6.3 Sarah (Secondary)
**Anchors:**
1. Quote validation (discrete high-value use)
2. "Safe pro" bookmarks (portable contact book)
3. Home value tracking (v1.5) — "maintenance preserves home value $X"
4. Scam alerts ("pros в Chicago charging 40% above average this quarter")
5. Second-opinion workflow (photo of invoice → fair/overcharged breakdown)

**Key metric:** Return on-demand quarterly.

### 6.4 Tyler (Tertiary)
**Anchors:** Lease-cycle touchpoints (move-in, mid-lease, move-out), rental property guide, tenant rights content.
**Key metric:** Lease-cycle usage (3–5 uses over 2-year lease). Pay-per-estimate model лучше subscription.

### 6.5 Ronald (Tertiary)
**Anchors:** AARP scam alerts (highly scam-anxious), daughter-shared estimates, simple maintenance calendar, senior-friendly UX.
**Key metric:** Monthly seasonal check-in (one push-triggered open/month = success).

---

## 7. Push Notification Strategy

### 7.1 Annual budget per user: 12–16 pushes

| Category | Pushes/year |
|---|---|
| Seasonal maintenance | 4–8 |
| Project follow-up | 1–3 |
| Re-engagement | 0–3 |
| Neighbor trend alerts (v1.5) | 2–4 |
| Milestone celebrations | 1–2 |

Compare: Sugar Quit ~150–250/year. FixIt 10× меньше. Этот constraint critical.

### 7.2 Timing

- **Time:** 19:00–20:00 local (Emma post-dinner window); Ronald earlier — 17:00
- **Day:** Tuesday–Thursday primary (not weekends — family time; not Monday morning — work chaos)
- **Seasonal:** trigger-based, not calendar-based (first snow, first heatwave)

### 7.3 Copy principles

- **Specific, not generic** — "Denver HVAC pros booked out 3 weeks" > "AC season is here"
- **Value-first, not pleading** — "Estimate before calling" > "Come back!"
- **Local (zip-based)** — всегда city name
- **Character limit:** <90 chars, <10 words in headline (2× CTR)

### 7.4 Examples

**Good:**
- "Denver HVAC pros booked out 3 weeks — estimate your fix before calling"
- "Your lifetime savings: $340. Anything else worth a quick estimate?"
- "12 neighbors in 80203 fixed gutters this week — fall rains starting"
- "6 months ago you fixed your faucet. Still working? 30-sec check-in"

**Bad:**
- "Come back to FixIt! Here's what's new" (generic, pleading)
- "Save on home repair!" (vague, promotional)
- "You haven't used FixIt in a while" (guilt-based)

### 7.5 Permission request timing

DO NOT ask на onboarding. Ask **после first successful estimate**, context-framed: "Want us to remind you для seasonal home maintenance? About 1 push per month, never spam."

Grant rate с контекстом: ~60%. Без — ~25%. 2.4× разница в permission grant rate напрямую транслируется в retention — user без push permission имеет 2× выше churn.

### 7.6 Push fatigue safeguards

- **Skip logic:** если user tapped last 2 pushes → позволить следующий. Если ignored 2 в ряд → skip next scheduled push.
- **Quiet periods:** Holidays (Christmas week, Thanksgiving week, July 4th week) — no non-emergency push.
- **Emergency override:** Weather alerts (hurricane, freeze warning) bypass regular budget, но max 2/year.
- **User-controlled cadence:** in-app "Remind me less / more often" toggle (default monthly).

---

## 8. Email as Secondary Channel

Push permission rate ~60%. **Email gives channel к оставшимся 40%.** Plus email allows longer-form content.

| Email | Frequency | Purpose |
|---|---|---|
| Welcome | 1× after signup | Value reinforcement |
| Monthly digest | Optional 1×/month | Savings + neighbor trends |
| Seasonal guide | 4×/year | "Fall maintenance guide для Denver" |
| Annual recap | 1×/year | "2026 you saved $X" — Spotify Wrapped style |
| Re-engagement | Triggered | Loop 4 escalation |

Benchmarks (H&F/Lifestyle): open 20–25%, CTR 2.5%. FixIt targets similar или slightly higher (action-oriented home content).

Default opt-in: welcome + annual recap только. Monthly digest — explicit toggle после first estimate.

---

## 9. Churn Prevention

### 9.1 Churn predictors

| Signal | 90-day churn probability |
|---|---|
| 30 days no open | 40% |
| No estimate в 60 days несмотря на seasonal push | 55% |
| Negative feedback без follow-up | 60% |
| Ignored first 2 seasonal pushes | 50% |
| 1 estimate, no return in 45 days | 70% |

### 9.2 Acceptable churn levels

Infrequent-use apps must accept higher gross churn:

| Monthly churn | Interpretation |
|---|---|
| 5–8% | Healthy для FixIt |
| 9–11% | Elevated — investigate |
| >12% | Structural red flag |

Annual net retention target: 60%+ of active-after-month-1.

### 9.3 Delete protection

На sign-out flow intercept с value reminder: "Wait — you've saved $847 with FixIt. Sign out keeps account; delete loses history."

---

## 10. Community Retention (v1.5+)

Не MVP priority. Levers для v1.5+:

- **User-generated before/after gallery** (opt-in public mode)
- **Ask community** — "Should I DIY this or call a pro?" Photo + AI + community responses
- **Expert AMAs** — YouTube DIYer partnerships monthly
- **Neighbor meetups** (v2.0+) — hyperlocal tool-share

**Anti-patterns:**
- Toxicity (Reddit-style) — Sarah persona avoids forums; heavy moderation needed
- Over-gamification of community — no "most helpful commenter" streaks
- Fake engagement — community output, not force-factor

---

## 11. Progressive Unlocks

Level ladder tied к estimate count — gentle gamification без streaks:

| Estimates | Unlock |
|---|---|
| 1 | Basic functionality + savings counter starts |
| 3 | "My Home" dashboard + maintenance calendar preview |
| 5 | Before/after gallery + sharing templates |
| 10 | Social sharing badges ("Denver homeowner", "5 DIY wins") |
| 15 | Tool inventory (Mike-targeted) |
| 25 | Community features (Ask / AMA participation) |
| 50 | "FixIt expert" status |

**Why works for infrequent use:** levels not timer-based — stable между uses. Duolingo streak ломается через один день; FixIt level постоянен.

**Anti-patterns:** pay-to-unlock (annoys free users), over-leveling (stop at 25–50), visible friction ("UPGRADE TO UNLOCK!!!").

---

## 12. Experiments Plan

**Stage 1 (Month 1–3):** baseline cohort tracking, push permission A/B (onboarding vs post-first-estimate), seasonal push creative test (generic vs zip-personalized — expected 2× CTR diff).

**Stage 2 (Month 4–6):** email digest opt-in rate, savings counter visibility test (always-visible vs dashboard-only — hypothesis: +15% W4), Loop 2 timing (7-day vs 14-day).

**Stage 3 (Month 7–12):** neighbor trend alerts pilot (Denver + Austin), re-engagement ladder calibration, community feature A/B.

**Quarterly review:** cohort curves by signup month, persona-split retention, push effectiveness, churn cohort analysis.

---

## 13. Related Docs

- [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) — first-time setup, permission timing, TTFV
- [PAYWALL-RESEARCH.md](./PAYWALL-RESEARCH.md) — conversion к paid, upgrade cadence
- [FEATURES.md](../02-product/FEATURES.md) — retention features в MVP
- [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) — North Star WEPA context
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — persona motivations и retention anchors

---

**Дата последнего обновления:** 2026-04-18
**Следующий шаг:** ASO-RESEARCH.md — App Store Optimization amplifying organic reach.
