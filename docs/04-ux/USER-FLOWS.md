---
Проект: FixIt — AI home repair cost advisor (pure advisor utility)
Дата: 2026-04-19
Статус: v2.0 post-rescope
Автор: UX Team (Лана + Amanda)
Stage: UX Design (Stage 4)
---

# USER-FLOWS.md — FixIt

**Companion docs:** [POSITIONING.md](../02-product/POSITIONING.md) | [FEATURES.md](../02-product/FEATURES.md) | [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) | [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) | [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) | [SCREEN-MAP.md](./SCREEN-MAP.md)

---

## Overview

Документ описывает **7 core user flows FixIt** — путей пользователя через product от первого install до retention loop и monetization. Rescope 2026-04-19 радикально upрощил два flow'а:

- **Flow 4 был:** Context Paywall → Pro Match marketplace (Sarah получала filtered pros + quote requests). **Стал:** Quote Validator Flow (Sarah уже получила quote от pro, использует FixIt проверить честность, optionally shares screenshot).
- **Flow 7 был:** Pro Match → Thumbtack Affiliate Redirect (monetized lead generation). **Стал:** First estimate → DIY Success → Share savings viral loop ("I saved $185 going DIY").

Affiliate revenue stream полностью удалён. Pro handoff теперь простой deeplink sheet (см. SCREEN-MAP.md §7.1), не требует своего flow — он встроен в Flow 1/2 как side-branch.

Каждый flow грунтован в research: Emma как primary persona (first-time homeowner, 28-55, anxious state при первом использовании), 3-step onboarding, soft paywall после 3rd estimate, viral loop через savings-shared.

**Screen ID convention** (из SCREEN-MAP.md v2.0):
- **1.x** — Onboarding & auth (1.1 Welcome, 1.2 Location, 1.3 Camera Permission, 1.4 Camera View, 1.5 Pre-estimate Context, 1.6 AI Processing, 1.7 First Estimate Result, 1.8 Signup Ask)
- **2.x** — Auth (2.1 Sign Up, 2.2 Sign In)
- **3.x** — Main tabs (3.1 Home Dashboard, 3.2 My Home Timeline, 3.3 Estimates, 3.4 Profile, 3.5 Maintenance Calendar — in v1.5)
- **4.x** — Estimate Flow (4.1 Photo Capture, 4.2 Photo Preview, 4.3 Context Questions, 4.4 AI Processing, 4.5 Estimate Result, 4.5.1 DIY Tab, 4.5.2 Hybrid Tab, 4.5.3 Pro Tab, 4.6 Save, 4.7 Share)
- **5.x** — Paywall (5.1 Soft Paywall, 5.2.1-5.2.4 Context Paywalls [Save / Warranty / PDF / Price Alerts — **NO Pro Match paywall anymore**], 5.3 Subscription Success, 5.4 Subscription Management)
- **6.x** — Notifications (6.1 Notification Center, 6.2 Push Preferences)
- **7.x** — **Find-a-Pro Sheet (single screen, 7.1)** — bottom sheet with Thumbtack / Google Maps / Yelp deeplinks + disclaimer "We don't earn from these"
- **8.x** — Errors & edge cases (8.1 No Internet, 8.2 Camera Denied, 8.3 Location Denied, 8.4 AI Uncertain, 8.5 Blurry Photo, 8.6 Out of Scope)

**Target persona distribution** (MVP, post-rescope):
- **Emma (primary):** Flows 1, 2, 3, 5, 6, 7 — first-time homeowner, anxiety-driven activation, primary viral sharer
- **Mike:** Flows 2, 5 — DIY enthusiast, repeat user, maintenance calendar power user
- **Sarah:** Flow 4 (Quote Validator) — уже получила pro quote, использует FixIt второе мнение
- **Tyler:** Flow 3 (Pay-per) — move-out deposit recovery, one-off spender

**Главные changes vs v1.0:**
- Pro Match affiliate funnel ВЫРЕЗАН — нет revenue attribution, нет lead capture
- Flow 4 Sarah = quote validation (не marketplace); Flow 7 Emma = viral savings share (не pro redirect)
- Success metrics rewritten — убрали 50% "hire conversion" target, добавили "savings-shared per user" viral metric
- Copy сдвинут под "Know the price before the panic" tagline (per POSITIONING §9)

---

## Flow 1: First-time Install → First Estimate (Aha Moment)

**User:** Emma, 32, first-time homeowner в Denver. Только что заметила протечку под кухонной раковиной в 19:42 вторник. Скачала FixIt из TikTok ad "Plumber quoted $800, FixIt said $15 DIY."

**Trigger:** Install complete + first tap на app icon. User в anxious state ("кран капает, прибрать воду, что делать?").

**Goal:** За 60-90 секунд получить actionable repair estimate ("сколько стоит починить? DIY или звать мастера?") — без signup, без friction. Tagline validated — Emma должна feel **"Know the price before the panic"** работает.

**Success criteria:** User дошёл до Screen 4.5 Estimate Result, провёл там >15 секунд (session replay indicator что aha landed), увидел три опции (DIY/Hybrid/Pro) с конкретными Denver prices.

**Expected duration:** 60-90 секунд от install до aha moment. Emma benchmark: <90 sec target, top-10% photo-AI apps (PictureThis, Rock Identifier) делают 45-60 sec.

**Screens involved:** 1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 4.3 → 4.4 → 4.5 → 1.8 → 3.1

### ASCII Diagram

```
[INSTALL COMPLETE]
      ↓
[Screen 1.1 Welcome]
  "Know the price before the panic"
  "Photo → real cost in 60 seconds"
      ↓ Tap "Take a photo of your problem"
      ↓
[Screen 1.2 Location]
  "Where do you live?" — ZIP или auto-detect
  "Prices vary 40%+ by region. Denver ≠ Memphis."
      ↓ Allow location OR manual ZIP "80203"
      ↓
[Screen 1.3 Camera Permission]
  "Take a photo of what's broken" + 4 sample thumbnails
  Privacy: "Photos stay private to your account"
      ↓ Tap "Allow camera" → iOS permission dialog
      ↓ Grant (85% target)
      ↓
[Screen 1.4 Camera View]
  In-camera guidance: "Get close, good lighting"
  Top-right: "Use saved photo" fallback
  Top-left: "Describe with text" fallback
      ↓ Photo taken of leaky faucet
      ↓
[Screen 1.5 Pre-estimate Context]
  Micro-screen, 2 taps:
  Q1: DIY readiness (Never / Some / Confident)
  Q2: Quality tier (Budget / Mid / Premium)
      ↓ Tap "Get my estimate"
      ↓
[Screen 4.4 AI Processing]   ← Labor illusion 5-8 sec
  Step 1 (0-2s): "Identifying the problem..."
  Step 2 (2-4s): "Checking material prices in Denver..."
  Step 3 (4-6s): "Estimating local labor rates..."
  Step 4 (6-8s): "Calculating DIY difficulty..."
      ↓
[Screen 4.5 Estimate Result]   ← AHA MOMENT
  "Leaky Kitchen Faucet Supply Line — Denver, CO 80203"
  ┌─────────┬─────────┬─────────┐
  │ 🔧 DIY  │ 🤝 Hybrid│ 🏢 Pro  │
  │ $12-18  │ $15+$95 │ $175-275│
  │ 20 min  │ 1 hr    │ Licensed│
  └─────────┴─────────┴─────────┘
  Photo thumbnail top-left (validates "МОЁ фото")
  AI explanation: "Low-risk, common fix"
  Disclaimer: "AI estimate — actual prices ±25%"
      ↓ Tap "DIY" / "Hybrid" / "Pro" card
      ↓
[Screen 4.5.1 DIY Detail]  (most common Emma choice)
  Shopping list (Amazon / Home Depot / Lowe's search buttons)
  Step-by-step guide preview + YouTube search button
  "Save $260 going DIY" contrast
      ↓ Scroll / explore
      ↓
[Screen 1.8 Signup Ask]  ← Soft, bottom sheet
  "Save this estimate — $175 saved"   ← SAVINGS ANCHOR
  "+ 2 more estimates free this month"
  Apple / Google / Email buttons
  "Not now" (grey, small но visible)
      ↓ Tap Apple Sign-In (most common) OR Skip
      ↓
[Screen 3.1 Home Dashboard]
  First estimate saved on timeline
  CTA: "Take another photo"
  Greeting: "Anything new around the house?"
  "2/3 free estimates remaining"
      ↓
[FLOW COMPLETE]
```

### Step-by-step

1. **Install complete:** Emma видит иконку FixIt на home screen, tap.
2. **Screen 1.1 Welcome:** Full-bleed visual (sketch faucet + price tag icon). Headline **"Know the price before the panic"** (primary tagline per POSITIONING §9). Sub "Photo → real cost in 60 seconds. DIY, Hybrid или Pro — you choose." Single CTA button "Take a photo of your problem". NO signup, NO email ask, NO demo video (kills velocity per ONBOARDING-RESEARCH §1.2).
3. **Screen 1.2 Location:** "Where do you live?" — explanatory sub "Prices vary 40%+ by region. Denver ≠ Memphis." Emma taps "Use my location" → iOS location permission dialog → grant → auto-fill "80203 Denver, CO". Skip link available (melким grey) но 85% target for location capture.
4. **Screen 1.3 Camera Permission (priming):** Custom screen BEFORE iOS dialog. Headline "Take a photo of what's broken". 4 sample thumbnails (plumbing/electrical/furniture/appliance) — demonstrates scope. Privacy statement critical: "Photos stay private to your account. Never shared." CTA "Allow camera" triggers iOS dialog. Target grant rate 85%.
5. **Screen 1.4 Camera View:** Native camera UI с top overlay "Snap the problem area — close-up helps". Bottom auto-cycling guidance pills ("Good lighting", "Include context", "Multiple angles"). Emma фотографирует под раковиной — P-trap leak visible.
6. **Screen 1.5 Pre-estimate Context:** Micro-screen между photo и result (2 quick taps, 5-7 sec total). Q1 DIY readiness: Emma taps "Some experience" (she's homeowner, handled basic tasks). Q2 Quality tier: Emma taps "Mid-range". Button "Get my estimate".
7. **Screen 4.4 AI Processing:** 5-8 sec labor illusion с 4 animated steps. Photo thumbnail pulsates. Emma видит "Checking material prices in Denver..." — builds trust that AI actually работает над её problem, не generic. Copy **не упоминает** "Home Depot API" или партнёрств — просто "material prices" (per POSITIONING §8 — мы не retailer-partnered утилита).
8. **Screen 4.5 Estimate Result — AHA MOMENT:** Three-option card side-by-side. DIY $12-18 / Hybrid $110 / Pro $175-275. Emma видит concrete Denver prices, не national averages. Hero emotional moment: "wait, plumber quote was $500 — FixIt says $18 DIY?" Session replay target: >15 sec on screen. Honesty disclaimer inline: "AI estimate — actual prices ±25%" (per POSITIONING §7 brand voice).
9. **Screen 4.5.1 DIY Detail (branch):** Emma taps DIY card. Expandable sheet shows shopping list (silicone tape + supply line + wrench) с three retailer search buttons per item (Amazon / Home Depot plain search / Lowe's plain search — per FEATURES §F4) + step-by-step guide (AI-generated per her exact problem, per F5) + YouTube search button at top.
10. **Screen 1.8 Signup Ask (soft):** Bottom sheet appears after 10+ sec on 4.5.1. Headline **"Save this estimate — $175 saved"** (savings anchor, persona-lizedDIY vs Pro delta). Sub "+ 2 more estimates free this month". Apple Sign-In (primary, iOS prefers), Google, Email, "Not now" grey. Target conversion 55-65% post-aha.
11. **Screen 3.1 Home:** Emma signed up via Apple. First estimate now saved as card on Home timeline. Greeting **"Anything new around the house?"** (per POSITIONING §5 copy shift — НЕ "Need a pro for something?"). Counter "2 free estimates remaining this month". CTA "Take another photo" — seed для Flow 2.
12. **Flow complete.** Emma achieved aha в <90 sec от install, signed up (or skipped, still in guest mode). Она calmer — знает cheapest path ($18) и worst case ($275). Decision с confidence.

### Decision Points / Branches

- **At step 3 (location):** User denies location permission → falls to manual ZIP entry. Emma types "80203", proceeds. If user skips entirely → national average shown на 4.5 с soft prompt "add ZIP for exact Denver pricing".
- **At step 4 (camera permission):** User denies camera → fallback к Gallery Picker (choose saved photo) OR Text Description Entry ("describe the problem in words"). Expected path for 15% of users. Emma scenario — she's already в kitchen with leak, so camera granted.
- **At step 6 (context questions):** Skip available → defaults to "Some experience" + "Mid-range". Reduces friction for impatient users.
- **At step 8 (aha moment):** If estimate low-confidence (AI uncertain < 70%) → Screen 8.4 displays "I think this might be leaky faucet OR clogged trap. Describe what happened?" Text input → AI re-analyzes. Worst case → 8.6 with Find-a-Pro fallback ("Not sure? Find a local pro who can diagnose on-site" → 7.1 Sheet).
- **At step 9 (mode selection):** User taps Hybrid → Screen 4.5.2 Hybrid Detail (handyman labor $95 + materials + "Find a handyman" button → 7.1 Find-a-Pro Sheet). User taps Pro → Screen 4.5.3 Pro Detail (fair-price validator + "Find a pro" button → 7.1 Sheet). **Ни один из этих путей не триггерит paywall** — Find-a-Pro free для всех в v2.0.
- **At step 10 (signup):** User taps "Not now" → stays as guest, estimate saved in device-only session. Still counts against 3-free quota (via device ID). Signup friction re-applied на 2nd estimate.

### Edge Cases

- **Blurry photo:** AI returns confidence <50% → Screen 8.5 "Retake with more light" с sample reference image. 15% target retake rate (below = camera UX winning).
- **No internet при step 7 AI processing:** Screen 8.1 "No connection. Checking cache..." — if similar-category cached estimate exists from another user in same zip, show с disclaimer "based on similar repair in Denver". Otherwise hard fail: "Reconnect to get estimate."
- **AI can't identify (category not in top-30 MVP):** Screen 8.6 "FixIt covers plumbing, electrical, furniture, appliances. This looks like [e.g., car repair] — try [alternative app suggestion]. OR find a local pro who can diagnose on-site → Find-a-Pro Sheet."
- **Emma's zip has no pricing data (rural):** Show generic Colorado state-level estimate с disclaimer "Denver metro prices — nearest data". Future: expand to state-level pricing для all 50 states.
- **Photo with multiple problems (leak + cracked tile):** AI detects → 4.5 shows "I see both a leaking pipe AND water-damaged tile. Which to focus on?" Two-choice modal → user picks primary.
- **App crash mid-flow:** Session state persisted in Supabase guest auth. Re-open app → resume at last completed step ("You were taking a photo — continue?").
- **Emma skipped signup, closes app:** 24hr later returns → anonymous session intact (device ID), но "Save your estimates by signing up" banner на Home.
- **Pro mode taps "Find a pro" → 7.1 Sheet:** Sheet opens instantly (no paywall). Emma sees 3 buttons: Thumbtack / Google Maps / Yelp + disclaimer "We don't earn from these — choose whichever you trust." Tap any → external app/web.

### Metrics to Track

| Metric | Target | Industry top-10% |
|---|---|---|
| Install → Screen 1.1 view | 95% | 97% |
| Screen 1.1 → Screen 1.2 (tap "Take photo") | 85% | 92% |
| Location permission grant rate | 75% | 85% |
| Camera permission grant rate | 85% | 90% |
| Camera → Photo taken | 90% | 95% |
| Photo → Analyze tap (skip retake) | 85% | 92% |
| Context questions completion | 90% | 95% |
| AI processing abandon rate | <5% | <3% |
| **Install → Estimate Result (Aha)** | **75%** | **85%** |
| Time from install to aha | <90 sec | 45-60 sec |
| Aha screen time (engagement) | >15 sec | >25 sec |
| Signup conversion post-aha | 55-65% | 70% |
| Flow 1 completion rate (end-to-end) | 70% | 80% |
| Find-a-Pro Sheet open rate (among Pro-tab viewers) | 40% | — |
| Find-a-Pro deeplink click rate (among sheet openers) | 60% | — |

Source: ONBOARDING-RESEARCH §1.6 benchmarks tables.

### Related Flows

- **Flow 2 (Returning User)** — branches from end of Flow 1 (Emma returns next week with new problem).
- **Flow 7 (Viral Savings Share)** — triggered if Emma впечатлена savings и делится ("I saved $185 going DIY!").
- **Find-a-Pro Sheet (7.1)** — side-branch from Hybrid/Pro tab, not primary flow anymore (Sheet is single screen, not a flow).

---

## Flow 2: Returning User → Second+ Estimate

**User:** Emma, 32, Day 8 после first install. Первый estimate был leaky faucet (successful DIY fix $15). Теперь в subway station замечает что garage door hinge скрипит. Открывает FixIt в 20:15.

**Trigger:** Organic return — user remembers app helped last time, opens без push notification (demonstrates product-market fit).

**Goal:** Быстро (в 3x faster чем first time) получить estimate, потому что user already knows the flow. Skip unnecessary steps.

**Success criteria:** User completes 2nd estimate в <45 seconds. Engages с estimate (saves to My Home OR acts on it — shopping list / share).

**Expected duration:** 30-45 seconds (skips onboarding overhead).

**Screens involved:** 3.1 → 4.1 → 4.2 → 4.3 → 4.4 → 4.5 → 4.5.1 → 4.6 (Save)

### ASCII Diagram

```
[APP OPEN — returning user]
      ↓
[Screen 3.1 Home Dashboard]
  Greeting: "Anything new around the house?"
  Timeline shows first estimate (leaky faucet)
  Counter: "2 free estimates remaining"
  Big CTA: "+" or "Take another photo"
      ↓ Tap "+"
      ↓
[Screen 4.1 New Estimate Entry]   ← Skip welcome, location, permissions
  (all already granted, ZIP remembered)
  Camera view direct
      ↓ Photo taken (garage door hinge)
      ↓
[Screen 4.2 Photo Preview]
      ↓ Tap "Analyze"
      ↓
[Screen 4.3 Context Questions]
  ← Pre-filled с last time (Some experience / Mid-range)
  "Same preferences? [Yes] / Change"
      ↓ Tap "Yes, same"
      ↓
[Screen 4.4 AI Processing]  (5-8 sec labor illusion)
      ↓
[Screen 4.5 Estimate Result]
  "Squeaky Garage Door Hinge — Denver"
  DIY $4 (WD-40) / Hybrid N/A / Pro $85 service call
      ↓ Tap DIY card
      ↓
[Screen 4.5.1 DIY Detail]
  Shopping: WD-40 $4.99 (Amazon / HD / Lowe's buttons), 5 min job
  YouTube search: "how to fix squeaky garage door hinge"
      ↓ Tap "Save to My Home"
      ↓
[Screen 4.6 Save to Home Modal]
  Room tag: auto-detected "Garage"
  Date: Today
  Status: "Planning to fix"
      ↓ Tap "Save"
      ↓
[Screen 3.1 Home Dashboard — updated]
  Timeline: 2 projects (faucet + garage door)
  Stats: "You've saved $X via DIY so far"
      ↓
[FLOW COMPLETE]
```

### Step-by-step

1. **App open:** Emma taps FixIt icon. Home screen 3.1 loads в <2 sec (cached state).
2. **Screen 3.1 Home:** Emma видит timeline с первым проектом (leaky faucet, marked "Completed DIY $15"). Greeting "Anything new around the house?" persists (per POSITIONING §5 copy). Large "+" button (или "Take another photo" CTA) prominent в bottom-right floating UI.
3. **Camera direct:** Tap "+" skips ALL onboarding (welcome, location, permissions already granted). Goes directly to Screen 4.1 Camera View. This is massive time save vs Flow 1.
4. **Screen 4.1:** Emma photographs hinge. Similar camera UX but user knows the drill — no guidance pills needed (can dismiss).
5. **Screen 4.2 Preview:** Tap "Analyze".
6. **Screen 4.3 Context Questions:** Pre-filled с last session's answers. Fast path: "Same preferences (Some experience, Mid-range)? [Yes, proceed]" — single tap skip. Or "Change preferences" for edge cases.
7. **Screen 4.4 AI Processing:** Same 5-8 sec labor illusion. Could be reduced for repeat users (A/B test: 3 sec variant for 2nd+ estimates).
8. **Screen 4.5 Estimate Result:** Aha still lands (new problem, new discovery), but expectation is lower — Emma already trusts the system.
9. **Screen 4.5.1 DIY Detail:** Emma sees simple fix — WD-40, 5 min. Shopping list has Amazon Associates deeplink (bonus revenue 1-3%) + Home Depot plain search + Lowe's plain search.
10. **Screen 4.6 Save to Home Modal:** Small bottom sheet. Auto-detected "Garage" room tag (from AI photo analysis). Emma taps "Save" (one tap, no text entry).
11. **Home updated:** Timeline now 2 projects. Stat counter updates ("You've saved $X via DIY"). This savings counter — **primary motivator** per POSITIONING §6 (not "pros hired").
12. **Flow complete.** Emma may now branch to Flow 7 (viral savings share) или simply close app to actually fix the hinge.

### Decision Points / Branches

- **At step 2 (Home):** User может alternatively tap existing project on timeline → goes to 3.3.2 Estimate Detail (deep-link to past estimate). This supports "remind me what I did last time" use case.
- **At step 6 (context questions):** If 2 weeks passed since last estimate → prompt "Still in Denver? [Yes] / Update location" — validates regional pricing not stale.
- **At step 8 (estimate):** If this is 3rd free estimate в calendar month → proceeds normally, but 4.5 result screen shows banner "This was your 3rd free estimate. Next one: upgrade OR pay-per-estimate." Seeds Flow 3.
- **At step 9 (mode selection):** If Emma taps Pro card → 4.5.3 → "Find a pro" button → 7.1 Find-a-Pro Sheet. **No paywall** — free для всех. Emma picks Thumbtack/Google/Yelp, leaves app. Optional 72h follow-up push "Did you find a pro? Log the job?"
- **At step 10 (save):** User can skip "Save to Home" — estimate auto-saves к timeline regardless. Modal is opt-in для adding room tag + notes.

### Edge Cases

- **User tries 4th estimate after hitting 3-free limit:** Flow 2 branches at step 2 → Screen 5.1 Soft Paywall appears INSTEAD of camera. See Flow 3.
- **User has been inactive 30+ days:** Home 3.1 shows "Anything new around the house?" banner + optional re-onboarding prompt (update ZIP, quality preference refresh).
- **User tries photo of unchanged category (another faucet):** AI detects similarity to past estimate → 4.5 shows "Similar to your Oct 3 estimate ($15 DIY) — same fix?" Saves compute время + reinforces value.
- **User in different zip (traveling):** Manual override на 4.3 context questions — "Currently in Austin? [Yes, use Austin pricing] / No, Denver default".
- **Subscription user (paid tier):** Skip всех paywall friction. Free-user counter hidden. Unlimited estimates.

### Metrics to Track

| Metric | Target |
|---|---|
| **Day 7 return rate** | 20% |
| **Day 30 return rate** | 35% |
| 2nd estimate completion rate (among returners) | 85% |
| Time to 2nd estimate (from app open) | <45 sec |
| Save-to-Home tap rate | 40% |
| Same preferences "Yes" tap (skip context) | 80% |
| Multi-estimate users (2+ per month) | 30% |

### Related Flows

- **Flow 3 (Free → Paid Conversion)** — triggered when returning user hits 3rd estimate limit.
- **Flow 5 (Estimate → Save → Maintenance)** — natural extension; saved projects feed into maintenance calendar.
- **Flow 7 (Viral Savings Share)** — repeat users more likely to share (established trust + accumulated savings).

---

## Flow 3: Free → Paid Conversion (Soft Paywall)

**User:** Emma, 32, Day 18. Использовала 3 free estimates в этом месяце (leaky faucet, garage hinge, dishwasher not draining). Сейчас замечает водяное пятно на потолке ванной — хочет 4-й estimate.

**Trigger:** User taps "+" / "Take another photo" на Home → system detects free quota exhausted for rolling 30-day window.

**Goal:** Convert free user в paid subscriber (target tier: annual $49.99, per PAYWALL-RESEARCH §3). Alternative: pay-per-estimate ($2.99) если user subscription-averse.

**Success criteria:** User either (a) subscribes to annual tier (preferred, target 22% conversion per PAYWALL-RESEARCH §5), (b) buys pay-per-estimate ($2.99 fallback), or (c) dismisses and returns next month when quota resets.

**Expected duration:** 20-60 seconds on paywall screen (decision time).

**Screens involved:** 3.1 → 5.1 → (Apple/Google Pay) → 5.3 → 4.3 → 4.4 → 4.5 (resumes Flow 2)

### ASCII Diagram

```
[Screen 3.1 Home — user taps "+"]
      ↓ (System detects quota exhausted)
      ↓
[Screen 5.1 Soft Paywall]   ← PRIMARY MONETIZATION TOUCHPOINT
  Header: "You've saved $247 so far on 3 repairs with FixIt"
                           ↑ SAVINGS ANCHOR, not "pros hired"
  "Keep the momentum going:"
  ✓ Unlimited estimates
  ✓ Saved projects unlimited
  ✓ PDF export (insurance · resale)
  ✓ Price alerts when materials drop
                           ↑ NO "priority pros" (deprecated in v2.0)
  ┌──────────────────────────────┐
  │ ● ANNUAL (BEST VALUE)         │  ← PRE-SELECTED
  │   $49.99/year  =  $4.17/mo    │
  │   SAVE 48% vs monthly         │
  └──────────────────────────────┘
  ┌──────────────────────────────┐
  │ ○ Monthly  $9.99/mo           │
  └──────────────────────────────┘
  ┌──────────────────────────────┐
  │ ○ Pay-per  $2.99/estimate     │  ← fallback
  └──────────────────────────────┘
  Social proof: ★★★★★ 4.8 — 12,400 reviews
  "I saved $400 going DIY" — Emma, Denver
                           ↑ COPY SHIFT: savings, not "found a pro"
  CTA: "UNLOCK UNLIMITED ACCESS"
  Small: Cancel anytime · Restore · Terms
      ↓
     ┌────────────┬────────────┬────────────┐
     │  Annual    │   Monthly  │  Pay-per   │
     │  ✓ TAP     │            │            │
     ↓            ↓            ↓
[Apple/Google Pay native flow]
     ↓ Success
     ↓
[Screen 5.3 Subscription Confirmed]
  "Welcome to FixIt Pro!"
  ✅ Unlimited estimates
  ✅ Unlimited saves
  ✅ PDF export
  ✅ Price alerts
      ↓ Tap "Continue"
      ↓
[Screen 4.3 Context Questions]  ← Resumes original intent
  (ceiling water stain estimate continues)
      ↓
[Screen 4.4 → 4.5]  ← Same as Flow 2
      ↓
[FLOW COMPLETE — paid user]

Alternative branch: Pay-per selected
      ↓
[Pay-per Checkout]
  "$2.99 for this estimate"
  Apple Pay / Google Pay / card
      ↓ Paid
      ↓
[Screen 4.3 → 4.4 → 4.5]
      ↓
[FLOW COMPLETE — pay-per user]

Alternative branch: Dismiss paywall
      ↓ Tap [X close] on 5.1
      ↓
[Screen 3.1 Home — quota bar visible]
  Banner: "Your quota resets on [date]"
  "Want to use now? Upgrade anytime"
```

### Step-by-step

1. **User intent:** Emma taps "+" на Home 3.1 intending to start 4th estimate (ceiling water stain).
2. **Quota check:** Backend (Supabase edge function) detects user has exhausted 3 free estimates in rolling 30-day window. Instead of routing к camera, routes к Screen 5.1.
3. **Screen 5.1 Soft Paywall:** Full-screen modal (not dismissible via swipe — must tap X or CTA). Personalized emotional hook top: **"You've saved $247 so far on 3 repairs with FixIt"** — савингс anchor (per POSITIONING §5 messaging matrix). Copy **not** "Ready to connect with more pros?" (this was v1.0 marketplace framing, dead). 4 clear benefit bullets **under new positioning**:
   - ✓ Unlimited estimates
   - ✓ Saved projects unlimited
   - ✓ PDF export (insurance reports, resale disclosures)
   - ✓ Price alerts when materials drop in your area
   
   **Deliberately NOT listed:** "Priority pros" / "Verified contractors" / "Exclusive pro network" — это всё marketplace language, которое убрали в rescope. FixIt = advisor, not broker.
4. **Pricing presentation:** Annual $49.99 (= $4.17/mo) pre-selected. Monthly $9.99 visible но не пушится. Pay-per $2.99 as fallback (target: 5-10% of non-subscribers use this, per PAYWALL-RESEARCH §9).
5. **Social proof:** ★★★★★ 4.8 rating + testimonial snippet **"I saved $400 going DIY"** — Emma, Denver. Savings-shifted copy (per POSITIONING §5 — was "FixIt saved me $400 + found great plumber" в v1.0, теперь только savings).
6. **CTA button:** "UNLOCK UNLIMITED ACCESS" — benefit-driven copy (not "Subscribe"). Primary color, dominant visual weight.
7. **Decision branch A (Annual selected — target 22%):** Emma taps CTA → Apple Pay native flow → success → Screen 5.3 Subscription Confirmed → "Welcome to FixIt Pro!" с feature checklist animation → tap "Continue" → resumes flow к 4.3 Context Questions для originally-intended 4th estimate.
8. **Decision branch B (Monthly selected):** Same flow, different tier. Lower commitment, higher churn risk. Monthly users get drip nudge месяц 6 "Upgrade to annual, save $46".
9. **Decision branch C (Pay-per selected — fallback):** Emma taps "Pay as you go". Routes к Pay-per Checkout. Single-transaction $2.99 Apple Pay. After success → directly к 4.3 Context Questions. Estimate limited к single-use (не saved to My Home for pay-per unless she later subscribes).
10. **Decision branch D (Dismiss):** Emma taps X (top-left close). Returns to 3.1 Home с banner "Your quota resets on [date]. Upgrade anytime." No paywall shown for 7 days (avoid spam per PAYWALL-RESEARCH §4.3).
11. **Post-purchase onboarding:** Subscription Confirmed screen emphasizes что unlocked. First post-paywall estimate particularly important — validates the purchase decision (buyer's remorse mitigation).

### Decision Points / Branches

- **Screen 5.1 tier selection:** Annual default drives 45-55% annual mix (PAYWALL-RESEARCH §6.2). User can switch radio to Monthly or Pay-per.
- **If user previously saw paywall и dismissed:** 2nd exposure (day 45-60) shows slightly different framing — "Your 3 free estimates are back. Plus Pro gets you unlimited." Lower-pressure re-engagement (23% conversions happen 6+ weeks post-install per Adapty).
- **If user in unusual state (e.g., partial month, proration):** Paywall shows "You have 2 days left in trial/quota" — urgency framing for last-chance converters.
- **If subscription fails (payment declined):** Error State "Payment didn't go through. Try another card or Apple Pay" with clear retry path.
- **If user is on iOS Family Sharing и parent already subscribed:** Detect via Apple receipt → skip paywall, show "Your family's subscription is active" + confirm.

### Edge Cases

- **Refund request:** User refunds within 48hrs → access revoked, data preserved. Win-back email in 30 days: "50% off next month if you return."
- **Expired subscription:** Auto-retry billing 3 attempts (per App Store default). If all fail → downgrade к free tier gracefully (no data loss).
- **Restore Purchase:** Screen 5.1 has small "Restore Purchase" link (App Store requirement). User who reinstalled или switched devices can recover paid status.
- **User outside US (future):** Regional pricing per zip (PAYWALL-RESEARCH §10.2 A/B). MVP US-only, so international users see "Premium coming to your region soon" + waitlist.
- **User accidentally bought pay-per when meant subscribe:** 24hr grace window "Upgrade to annual, credit your $2.99" prompt.
- **Returning subscriber (previously cancelled):** Win-back paywall variant "Welcome back. Get 2 months free на annual."

### Metrics to Track

| Metric | Target | Industry benchmark |
|---|---|---|
| **Soft paywall exposure rate** | 40-50% of installs | — |
| **Paywall impression → conversion** | 18-25% | PictureThis 20% |
| **Tier selection split** | Annual 45-55% / Monthly 30-40% / Pay-per 10-15% | H&F median 60% annual |
| **CTA tap rate (Paywall → Checkout)** | 25-30% | — |
| **Bounce rate (close без convert)** | <65% | — |
| **Time on paywall screen** | 15-45 sec | — |
| **Second-exposure conversion (day 45-60)** | 5-8% of prior dismissers | — |
| **Pay-per → subscription upsell rate** | 25-35% | PAYWALL-RESEARCH §9.3 |
| **D60 total conversion** | 18-25% | Target (PictureThis ~20%) |
| **Refund rate** | <6% | Above = messaging misleading |
| **Churn rate (monthly, first 60 days)** | <8% | H&F median 4.7% |

### Related Flows

- **Flow 2 (Returning User)** — Flow 3 is direct interruption of Flow 2 at quota exhaustion.
- **Flow 5 (Save to My Home)** — unlocked premium feature post-subscription.
- **Flow 4 (Quote Validator — Sarah)** — alternative conversion path; Sarah triggers paywall differently (via perceived value, not quota).

---

## Flow 4: Quote Validator (Sarah — Second Opinion Before Hiring)

**User:** Sarah, 41, second-time homeowner. Electrician приехал, осмотрел её electrical panel, дал written quote: **$3,400** for 200-amp panel upgrade. Quote lies on her counter. Sarah gut-checks "это звучит дорого?" Скачала FixIt specifically to validate ("plumber quoted $800, FixIt said $15 DIY" — тот же TikTok ad что Emma видела).

**Trigger:** Sarah opens FixIt не для "найти мастера", а для **проверить — честен ли уже полученный quote**. Это новая valueprop под rescope (per POSITIONING §4 persona section — Sarah = "quote validator").

**Goal:** Дать Sarah **confidence** that she's not getting ripped off. Show fair-price range. Optionally help her share screenshot с electrician для negotiation ("FixIt says fair range $2,200-2,800 — can you match?"). No Pro Match marketplace — Sarah уже выбрала своего pro, она просто хочет second opinion.

**Success criteria:** Sarah completes estimate flow, sees FixIt's fair-price range, internalizes whether her quote is fair/high/low. Bonus: она shares estimate screenshot (PDF export или native share) с electrician для negotiation. Bonus: она subscribes (because validation value proved).

**Expected duration:** 3-5 минут (Sarah analytical, spends more time reading than Emma). Multiple photos possible (panel + existing wiring + breaker labels).

**Screens involved:** 1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 4.4 → 4.5 → 4.5.3 → 4.7 → (optional 5.1 if hits quota later)

### ASCII Diagram

```
[INSTALL — Sarah specifically seeking validation]
      ↓
[Screen 1.1 Welcome]
  "Know the price before the panic"
  Sarah skips past quickly — she already panicking
      ↓ Tap "Take a photo"
      ↓
[Screens 1.2-1.5: Location / Camera / Context]
  Sarah: "Denver 80203 / Confident DIYer [lie: analytical] / Premium"
      ↓
[Screen 4.4 AI Processing]  (5-8 sec)
      ↓
[Screen 4.5 Estimate Result]
  "200-Amp Electrical Panel Upgrade — Denver, CO 80203"
  ┌─────────┬─────────┬─────────┐
  │ 🔧 DIY  │ 🤝 Hybrid│ 🏢 Pro  │
  │   N/A   │   N/A   │ $2,200- │
  │ Licensed│ Licensed│  $2,800 │
  │ work    │ work    │         │
  └─────────┴─────────┴─────────┘
  Safety banner: "⚠️ Licensed work — permit required"
  Red-flag: DIY/Hybrid greyed (electrical = pros only)
      ↓ Sarah taps Pro card
      ↓
[Screen 4.5.3 Full Pro Tab]   ← KEY MOMENT FOR SARAH
  Quote range: $2,200 - $2,800 (Denver 80203 market)
  
  ╔════════════════════════════════════╗
  ║   FAIR-PRICE VALIDATOR             ║
  ║   ─────────────────────            ║
  ║   If you got a quote higher than   ║
  ║   $2,900, that's above market.     ║
  ║   Consider negotiating or getting  ║
  ║   a second opinion.                ║
  ╚════════════════════════════════════╝
  
  Sarah's quote: $3,400  → $600 ABOVE market
  "Negotiation room: 18% over fair range"
  
  AI explanation: "Panel upgrade complexity varies
  by existing wiring. Above $2,800 usually means
  additional work (re-wiring, sub-panels) — ask
  your electrician what's driving the extra cost."
  
  [Share this estimate →]  ← PRIMARY ACTION for Sarah
  [Find a second opinion →]  ← Opens 7.1 Find-a-Pro Sheet
  [Save to My Home]
      ↓ Sarah taps "Share this estimate"
      ↓
[Screen 4.7 Share Estimate]
  Native iOS/Android share sheet
  Option: Export as PDF (Pro feature — triggers 5.2.3 if free)
  Option: Share via SMS (to her electrician)
  Option: Screenshot
  
  Share card copy:
  "FixIt estimate for 200A panel upgrade, Denver:
   Fair range $2,200-2,800. My quote: $3,400.
   Let's talk about the delta."
      ↓ Sarah shares via SMS to electrician
      ↓
[Electrician receives SMS with FixIt estimate]
      ↓ (Off-app negotiation happens)
      ↓
[Sarah returns to FixIt — optional day 2]
  Maybe saves project, maybe hits paywall on 4th use
  Potentially converts via Flow 3 soft paywall later
      ↓
[FLOW COMPLETE — Sarah validated, possibly negotiated, FixIt trust earned]
```

### Step-by-step

1. **Entry state:** Sarah уже получила written quote ($3,400) от электрика. Installed FixIt specifically to validate. Skips past Welcome copy quickly — she's on a mission.
2. **Screens 1.1-1.5 (Onboarding):** Stock flow. Sarah inputs Denver 80203, selects "Confident" DIY (analytical persona — overestimates own ability), "Premium" quality (она wants high-end panel). Fotos: panel front + breaker labels + nearby wiring (3 photos — F1 supports multi-angle).
3. **Screen 4.4 AI Processing:** Same labor illusion as Emma.
4. **Screen 4.5 Estimate Result:** Sarah видит three-option card. **DIY is GREYED OUT** с copy "Licensed work — permit required" (red-flag category per FEATURES §F3 — safety rail). Hybrid также N/A для electrical. Only Pro mode actionable. Full Pro range: **$2,200-$2,800**.
5. **Screen 4.5.3 Full Pro Tab — KEY MOMENT:** Sarah clicks Pro card. This is the critical screen for her persona. Key elements:
   - **Fair-price validator box** (prominent): "If you got a quote higher than $2,900, that's above market. Consider negotiating or getting a second opinion."
   - **Personalized comparison** (if Sarah manually entered her quote — optional field): "Your quote: $3,400 → $600 ABOVE market. Negotiation room: 18% over fair range."
   - **AI-generated explanation** of why prices vary: "Panel upgrade complexity varies by existing wiring. Above $2,800 usually means additional work (re-wiring, sub-panels) — ask your electrician what's driving the extra cost."
   - **Two action buttons**:
     - **"Share this estimate"** (primary for Sarah — enables negotiation)
     - **"Find a second opinion"** → 7.1 Find-a-Pro Sheet (Thumbtack / Google / Yelp for alternate electrician)
   - Plus standard "Save to My Home"
6. **Screen 4.7 Share Estimate (Sarah's primary action):** Native share sheet. Options:
   - **Export as PDF** (Pro feature — if free user triggers 5.2.3 context paywall, highest-conversion paywall для Sarah because она already sees value)
   - **Share via SMS/iMessage/WhatsApp** (send directly к electrician)
   - **Screenshot save** (для later use)
   
   Share card copy templated around validation: **"FixIt estimate for 200A panel upgrade, Denver: Fair range $2,200-2,800. My quote: $3,400. Let's talk about the delta."** Analytical, non-confrontational — Sarah persona fits.
7. **Off-app negotiation (external):** Sarah SMS's electrician. Electrician receives FixIt estimate screenshot. Conversation ensues. Three typical outcomes:
   - **Electrician reduces to $2,900** — Sarah saved $500, FixIt earned her trust forever, viral share incoming
   - **Electrician explains legitimate extras (re-wiring costs justified $600 extra)** — Sarah understands, pays fair, FixIt still earned trust (validated fairness, not just "cheap")
   - **Electrician refuses to budge** — Sarah taps "Find a second opinion" → 7.1 Sheet → opens Thumbtack для alternate pros
8. **Sarah returns to FixIt (optional, day 2):** Maybe to save project, maybe with new problem. Eventually hits paywall quota (Flow 3) or context paywall for PDF export (Flow 4 fallback).
9. **Flow complete.** Sarah's journey is **validation-first, not connection-first**. FixIt becomes her "home repair second opinion tool" — the trust-builder that may convert to annual subscription later.

### Decision Points / Branches

- **Step 4 (estimate result):** If Sarah's quote falls WITHIN fair range ($2,200-2,800) → validator shows "Your quote is fair — no red flags" с green checkmark. Different emotional tone (reassurance vs negotiation). Sarah still может share "FixIt confirmed this quote is fair" — demonstrates FixIt honesty, not just "find cheaper".
- **Step 5 (optional quote input field):** UX decision — should we ASK Sarah "Did you get a quote? What is it?" upfront? **v1.0 answer: optional text field after context questions** ("Got a quote from a pro? Share it so we can compare."). If provided, comparison shown inline. If not, just show FixIt's range.
- **Step 6 (PDF export paywall):** If Sarah hits PDF export paywall (5.2.3) и её конкретный use case — quote validation — 10-15% conversion expected (высокий intent). Copy: "Share FixIt's fair-price analysis c your contractor to negotiate — $7.99/mo for unlimited PDF reports."
- **Step 7 (Find a second opinion):** If Sarah taps "Find a second opinion" → 7.1 Sheet opens (same as Flow 1/2 branch). 3 deeplink buttons. **No paywall, no affiliate** — Sarah picks Thumbtack/Google/Yelp, leaves app. Optional 72h follow-up ping.
- **Step 8 (return to FixIt):** If Sarah validated her quote и electrician matched → high-trust moment. We send smart follow-up push day 14 "Did the work go well? Log the actual cost — helps improve FixIt accuracy for others." Crowdsourced data value.

### Edge Cases

- **Sarah's quote is BELOW market range (e.g., $1,800 on $2,200-$2,800 panel):** Validator shows "Below market — verify licensing and insurance before hiring. Unusually low prices sometimes indicate cut corners." Honest, not just "cheap = good." Brand voice authenticity.
- **Claude AI low confidence on Sarah's photo (unusual panel type):** Screen 8.4 "We're less sure about this panel type. Want to describe specifics?" Text input. Failing that, "Get a second opinion from a licensed electrician — tap to find one" → 7.1 Sheet.
- **Sarah's zip has no pricing data:** Fallback to state-level range + disclaimer "Based on Colorado state data, not specific to Denver. Actual variance possible."
- **Sarah is free tier, hits 3-estimate quota mid-validation:** Routes to Flow 3 soft paywall. Copy emphasizes validation use case: "You've already saved potential $600 on your electrician quote — unlock unlimited validations."
- **Sarah shares estimate, electrician challenges FixIt's accuracy:** We maintain ±25% disclaimer prominently в share card + в Estimate Result. Protects integrity — we're AI advisor, not claim to perfect.
- **Multiple quotes Sarah wants to compare:** v1.0 — she enters each quote manually в optional field и takes screenshots. v1.5 — dedicated "Quote Comparison" screen (3.3.3 multi-select, existing) extended с quote input fields.
- **Sarah realizes she needs multiple electricians for bidding:** Taps "Find a second opinion" → 7.1 Sheet → Thumbtack. Leaves FixIt. Might return later if new quotes came in (she now has 3 quotes to compare). FixIt quote comparison feature supports this use case.

### Metrics to Track

| Metric | Target | Notes |
|---|---|---|
| **Sarah-persona install rate** | 10-15% of total installs | Persona acquisition mix |
| **Quote input field usage (optional)** | 30% of Sarah-path users | If высокий → make it more prominent |
| **Fair-price validator view time** | >20 sec | Indicates analytical engagement |
| **Share tap rate (on 4.5.3)** | 35% of Sarah-path | Primary action for this persona |
| **PDF export paywall conversion (5.2.3)** | 12-15% | High-intent use case |
| **Second opinion sheet open rate (7.1 from 4.5.3)** | 15% | Lower than Emma's — Sarah already has pro |
| **Sarah-path → subscription conversion** | 25-30% | Higher than Emma (22%) — specific value crystal clear |
| **Return rate day 7** | 25% | Validates trust — Sarah uses FixIt for future decisions |
| **Actual cost logged (day 14+ post-estimate)** | 15% | Crowdsourced accuracy data |
| **NPS for Quote Validator use case** | >45 | Persona-specific promoter score |

### Related Flows

- **Flow 1 (First-time Install)** — Sarah's Flow 4 branches from Flow 1 at step 5 (when она taps Pro card). Flow 4 specifically tracks Sarah-path beyond that point.
- **Flow 3 (Soft Paywall)** — Sarah hits quota paywall eventually; conversion copy emphasizes validation value.
- **Flow 6 (Share)** — Sarah sharing "FixIt confirmed my quote" или "FixIt showed me I can negotiate" overlaps with Flow 7 viral savings loop (different emotional framing, same underlying share mechanic).
- **Find-a-Pro Sheet (7.1)** — Sarah's "second opinion" path routes here. Same sheet as Emma's, no special treatment.

---

## Flow 5: Estimate → Save to My Home → Maintenance Calendar

**User:** Emma, 32, Day 45. Has completed 3 successful DIY repairs (faucet, garage hinge, dishwasher). Wants to start treating her home as a managed entity (retention behavior — high-LTV user signal).

**Trigger:** On Screen 4.5 Estimate Result (just completed 4th estimate for HVAC filter replacement), taps "Save to My Home" button. OR reaches milestone prompt "You've saved 3 projects. Want to set up Maintenance Calendar?"

**Goal:** Convert one-time estimates в managed home profile. Create retention loop through seasonal maintenance reminders. User starts thinking of FixIt as "my home's assistant," not just "quick estimate tool."

**Success criteria:** User creates first entry in Maintenance Calendar (Feature post-MVP v1.5, but MVP-lite version exists as "Save project + reminder" combo). Returns within 30 days via maintenance push notification.

**Expected duration:** 45-90 seconds (multi-step, some text/date entry).

**Screens involved:** 4.5 → 4.6 → 3.2.1 → 3.3.2 → 3.2.4 → 6.1 (push later)

### ASCII Diagram

```
[Screen 4.5 Estimate Result — HVAC filter]
  DIY $18 (filter MERV 11) / Hybrid N/A / Pro $45 service call
  Recommendation: DIY — "Simple, every 3 months"
      ↓ Tap DIY → Screen 4.5.1 Detail
      ↓ Scroll to bottom
      ↓
[Screen 4.6 Save to My Home Modal]
  Bottom sheet prompt
  "Save this to your home profile?"
  Auto-detected:
    Room: "HVAC / Basement" 
    Category: "HVAC maintenance"
    Recurring: ☑ "Every 3 months" (AI-suggested)
    Next due: Jan 18, 2026
    Notes: (optional text field)
  CTA: "Save + set reminder"
      ↓ Tap "Save + set reminder"
      ↓
[Screen 4.6.1 Confirmation]
  "Saved! We'll remind you Jan 18"
  Haptic feedback + checkmark animation
      ↓ Auto-dismiss 2 sec
      ↓
[Screen 3.2.1 My Home Dashboard]
  All projects listed chronologically
  Savings counter: "You've saved $X with FixIt"   ← PRIMARY retention signal
  New entry: "HVAC filter — Oct 18, 2025"
  Status pill: "Scheduled for Jan 18"
      ↓ Tap new entry
      ↓
[Screen 3.3.2 Estimate Detail]
  Full project view:
  - Original photo thumbnail
  - Diagnosis text
  - Estimate range
  - What actually paid: [input field]
  - Notes
  - Photos before/after
  - Warranty expiration: [optional input]
  - Maintenance schedule: Every 3 months
  - "Mark complete" / "Edit" / "Share"
      ↓ Tap "Maintenance Calendar" icon (top right)
      ↓
[Screen 3.2.4 Maintenance Calendar]
  Month view: October 2025
  Upcoming:
  - Oct 18: HVAC filter ✓ Done
  - Jan 18: HVAC filter (next)
  - Apr 15: Gutters clean (seasonal AI-suggested)
  - May 3: AC service (predicted by AI from age+climate)
  + [Add custom reminder]
      ↓ Emma explores, closes app
      ↓
      ...
      ↓ 90 days later
      ↓
[Maintenance Reminder Push]
  "Time to change your HVAC filter 🔧"
  "Spring is coming — three small fixes worth knowing about."
                           ↑ COPY: seasonal, not "pro availability"
      ↓ Tap push
      ↓
[App opens — direct к Screen 3.3.2 Estimate Detail]
  Pre-filled estimate ready
  Shopping list 1-tap Amazon/HD/Lowe's search
      ↓
[FLOW COMPLETE — retention loop activated]
```

### Step-by-step

1. **Entry state:** Emma на Screen 4.5.1 DIY Detail for HVAC filter replacement. Scrolling through step-by-step AI-generated guide, reaches bottom.
2. **Screen 4.6 Save to My Home Modal:** Bottom sheet slides up. Key UX elements:
   - **Auto-detected fields** (AI pre-fills to reduce friction):
     - Room: "HVAC / Basement" (inferred from photo analysis)
     - Category: "HVAC maintenance"
     - Recurring checkbox: pre-checked with AI-suggested frequency ("Every 3 months")
     - Next due date: auto-calculated (today + 90 days)
   - **Optional text field** for personal notes (e.g., "bought MERV 13 at Home Depot Lakewood")
   - **Single CTA:** "Save + set reminder" — combines save + reminder action (reduces 2 taps to 1).
3. **Screen 4.6.1 Confirmation:** Micro-confirmation (2 sec auto-dismiss). "Saved! We'll remind you Jan 18." Haptic + checkmark animation — celebratory moment that reinforces behavior.
4. **Screen 3.2.1 My Home Dashboard:** Now includes HVAC entry. Savings counter updates: **"You've saved $X with FixIt"** — visible retention signal (per POSITIONING §6 — savings is our north-star display). Timeline organizes by date, filter by room/category available. Each entry has status pill ("Scheduled", "Done", "Planning"). Empty states for new rooms encourage adding more projects.
5. **Screen 3.3.2 Estimate Detail:** User can tap entry для full detail. Fields include:
   - Original photo (thumbnail)
   - AI diagnosis text (preserved from estimate)
   - Original estimate range
   - Input: "What you actually paid" (crowd-sources accuracy data)
   - Notes (freeform)
   - Before/after photo uploads
   - Optional: Warranty expiration (30/60/90 day or custom)
   - Maintenance schedule (editable)
   - Outcome status: Completed / In progress / Abandoned
6. **Screen 3.2.4 Maintenance Calendar:** Tap calendar icon top-right of Estimate Detail. Month view of all recurring/scheduled maintenance. AI-suggested seasonal items auto-appear (gutters in fall, AC service in spring) with "Add to my home?" prompt. User can dismiss suggestions.
7. **Push notification (later, 90 days):** Scheduled push triggers. Message копирайт перевёрнут под новое positioning: **"Spring is coming — three small fixes worth knowing about."** (per POSITIONING §5 messaging matrix — was "Your weekly pro availability update" в v1.0). Tap opens app directly to 3.3.2 Estimate Detail с pre-filled quick-action "Reorder filter via Home Depot" (plain search link).
8. **Flow complete.** Emma now in retention loop. Each maintenance cycle reinforces FixIt as "home's assistant."

### Decision Points / Branches

- **Step 2 (Save modal):** User can edit auto-detected room tag (e.g., "This goes in 'Utility' not 'HVAC'"). Crowd-sources taxonomy for AI improvement.
- **Step 2 (recurring checkbox):** Default checked для maintenance items (HVAC, gutters, smoke detector batteries). Unchecked для one-time repairs (leak fix, hinge squeak) — smart defaults reduce cognitive load.
- **Step 5 (Estimate Detail):** "What you actually paid" is opt-in, never required. 20% target fill rate — valuable data для improving estimates для other users (crowdsourced pricing).
- **Step 6 (Maintenance Calendar):** AI-suggested seasonal items can be individually accepted/dismissed. Overly pushy = user disables feature.
- **Step 7 (push):** Push timing per ONBOARDING-RESEARCH §6.4 — 19:30-20:30 weekday (Emma window), never 22:30-06:30.

### Edge Cases

- **User on free tier (projects limit 5):** After 5th save, bottom sheet shows "You've saved 5 projects (free limit). Upgrade for unlimited tracking." Routes to Screen 5.2.1 Context Paywall (Save project variant).
- **User saved но never completes project:** 30-day stale check: "Still planning to fix HVAC filter?" → snooze / abandon / mark complete prompt.
- **User uploaded wrong photo to project (typo during save):** Edit flow на 3.3.2 Estimate Detail allows photo replacement + re-run AI analysis.
- **Maintenance reminder while user on vacation:** Snooze options in push (1 week / 1 month). Smart reschedule rather than hard miss.
- **Multiple family members сохраняют overlapping projects:** MVP single-user — post-MVP v1.5 multi-user (household). Now: single account only.
- **User's maintenance schedule has no pro availability conflict (was concern в v1.0):** v2.0 — no such conflict exists, we don't track pro availability anymore. Just reminds user.
- **Push permission never granted:** Maintenance reminders fall back to in-app banner (Home dashboard sticky banner) + email (if captured).
- **Project deleted accidentally:** Soft-delete с 30-day undo window (Edit → Delete → snackbar "Deleted. Undo?").

### Metrics to Track

| Metric | Target | Rationale |
|---|---|---|
| **Save-to-Home rate (of estimates)** | 40% | Feature #7 target |
| **Projects per user at Day 90** | 2.5+ | Feature #7 retention metric |
| **Recurring vs one-time save split** | 35% recurring / 65% one-time | Reflects real home maintenance mix |
| **Maintenance reminder open rate** | 35% | Feature #10 target |
| **Reminder → app open rate** | 25% | — |
| **Actual cost entered (crowdsourcing)** | 20% | Feature #7 metric |
| **Day 30 return rate (any reason)** | 40% | Feature #7 primary |
| **Day 90 return via maintenance push** | 15-20% | Retention loop validation |
| **Free user hits 5-project cap** | 25% of free users | Paywall trigger rate |
| **Context paywall conversion (Save trigger)** | 12-15% | PAYWALL-RESEARCH benchmark |
| **Savings counter view time on 3.2.1** | >10 sec | Proxies "Emma proud of her savings" moment |

### Related Flows

- **Flow 2 (Returning User)** — user returning via maintenance push re-enters Flow 2 directly (skip onboarding, direct to estimate).
- **Flow 7 (Viral Savings Share)** — completed maintenance projects (with before/after photos + "saved $X" counter) are prime share candidates.
- **Flow 4 (Context Paywall)** — free user saving 6th project hits Save-trigger paywall.

---

## Flow 6: Estimate → Share Social (Viral Loop)

**User:** Emma, 32, just finished 4th estimate (bathroom tile replacement). DIY option $85 vs contractor $750. "Wait, this is insane savings — let me tell Jessica." Emma shares to Instagram Stories.

**Trigger:** On Screen 4.5 Estimate Result or Screen 4.5.1 DIY Detail, user taps "Share" icon (top-right of screen). Emotional moment — contrast between DIY and Pro price creates impulse to share.

**Goal:** Drive viral acquisition via user-generated shares. Each Emma-share seeds 2-3 installs (target per USER-PERSONAS viral coefficient). Primary growth channel alongside paid acquisition. **Copy shift:** was "I found a great plumber" в v1.0, стало **"I saved $185 going DIY with FixIt"** — savings anchor (per POSITIONING §5).

**Success criteria:** User completes share to at least one platform (Instagram/TikTok/iMessage). Share card posts. New user taps link in share → install → enters Flow 1 with attribution tag.

**Expected duration:** 20-40 seconds.

**Screens involved:** 4.5 → 4.7 → (Native share sheet) → 3.1

### ASCII Diagram

```
[Screen 4.5 Estimate Result — Bathroom tile]
  DIY $85 / Hybrid $220 / Pro $750
  "Save $665 going DIY!" contrast banner
      ↓ Tap Share icon (top-right)
      ↓
[Screen 4.7 Share Card Preview]
  Dynamic generated card:
  ┌──────────────────────────────┐
  │  FixIt                        │
  │  Home Repair Cost Advisor     │
  │                               │
  │  💰 I saved $665              │
  │     going DIY with FixIt      │   ← NEW COPY (was "found a plumber")
  │                               │
  │  Pro quoted: $750             │
  │  FixIt showed me DIY: $85     │
  │                               │
  │  🔧 Materials at Home Depot   │
  │  📱 Step-by-step guide        │
  │                               │
  │  Get FixIt → fixit.app        │
  └──────────────────────────────┘
  
  Options:
  [ ] Hide my photo (default off)
  [ ] Hide specific $ amount (default off)
  [✓] Include referral code (5% off friend)
  
  [Customize] [Share]
      ↓ Tap "Share"
      ↓
[Native Share Sheet]
  iOS/Android native sheet:
  - Instagram Stories (primary for Emma)
  - TikTok
  - iMessage
  - Messages
  - Twitter/X
  - Copy link
  - Save image
      ↓ Tap "Instagram Stories"
      ↓
[Instagram Stories opens with card]
  Emma adds sticker "Try this app!"
  Taps "Share to Story"
      ↓
[Back to FixIt]
      ↓
[Post-share Confirmation]
  Haptic + "Shared! 💜"
  "Your share could help 3 friends save money"
  "Refer a friend → get 1 month Pro free"
      ↓ Tap "Continue"
      ↓
[Screen 3.1 Home Dashboard]
      ↓
[FLOW COMPLETE — viral content live]

--- VIRAL IMPACT (parallel) ---

[Jessica sees Emma's Story on Instagram]
      ↓ Tap "Visit" link on sticker
      ↓
[App Store listing — FixIt]
  Attribution: "shared by Emma / ref code EMMA-4U92"
      ↓ Install
      ↓
[Enters Flow 1 — First-time Install]
  Welcome screen has "Referred by Emma" badge
      ↓ (rest of Flow 1)
      ↓
[Both Emma + Jessica get 1 month Pro free on Jessica's first paid]
```

### Step-by-step

1. **Entry state:** Emma on Screen 4.5 Estimate Result для bathroom tile. DIY/Pro contrast massive ($85 vs $750 — $665 savings). Emotional high point.
2. **Share trigger:** Share icon (top-right header) visible throughout 4.5/4.5.1/4.5.2/4.5.3. Tap triggers share card generation.
3. **Screen 4.7 Share Card Preview:** Dynamic card generated based on current estimate. Key elements:
   - **FixIt branding** (logo + tagline "Know the price before the panic")
   - **Personalized savings claim** — **"I saved $665 going DIY with FixIt"** (rewritten from v1.0 "I just saved $665 on a bathroom repair" — now explicitly ties savings к DIY choice, per POSITIONING §5)
   - **Contrast numbers** — Pro quote vs DIY cost (visceral impact)
   - **Value callouts** — "Materials at Home Depot" + "Step-by-step guide"
   - **CTA** — "Get FixIt → fixit.app" (short URL для virality)
   - **Privacy options**:
     - Hide my photo (default: off — but available for Sarah-types uncomfortable with photo exposure)
     - Hide specific $ amount (default: off — but available for privacy)
     - Include referral code (default: ON — drives viral loop)
4. **Customize option:** Power users can tweak card (accent colors, headline variants). Most skip (90%+) — default works.
5. **Native Share Sheet:** Tap "Share" triggers iOS/Android native share sheet. Emma picks Instagram Stories (TARGET-AUDIENCE confirms Instagram = Emma's primary).
6. **Instagram integration:** FixIt passes card image + deep-link URL к Instagram. Emma can add stickers, text overlays, music в IG (native flow — FixIt doesn't interfere).
7. **Post completion:** Emma posts Story. Instagram closes, returns to FixIt.
8. **Post-share Confirmation:** Micro-celebration. Haptic + "Shared! 💜". Secondary messaging: "Your share could help 3 friends save money" (social impact framing) + "Refer a friend — get 1 month Pro free" (direct incentive).
9. **Viral downstream (parallel flow):**
   - Jessica sees Emma's Story.
   - Taps link (Instagram sticker или swipe-up if eligible).
   - Lands on App Store FixIt listing with attribution tag.
   - Installs → enters Flow 1 with "Referred by Emma" badge на Welcome screen.
   - Referral attribution persists through signup.
   - Both Emma + Jessica get 1 month Pro free when Jessica first converts к paid (Flow 3).
10. **Flow complete.** Emma returns to 3.1 Home. Share event logged for analytics.

### Decision Points / Branches

- **Step 3 privacy options:** Emma-persona: default all privacy OFF (comfortable sharing full detail). Sarah-persona: hide $ amount default ON (more privacy-conscious). Personalize based on persona signals (or user preferences in Settings).
- **Step 5 platform choice:**
  - **Instagram Stories:** Emma's primary (65% of shares)
  - **iMessage:** high-trust 1:1 share (25% — "share with partner before fixing")
  - **TikTok:** high-virality (5% но highest reach per share)
  - **Twitter/X:** low volume for Emma segment (3%)
  - **Copy link:** Mike/analytical persona fallback (2%)
- **Step 9 attribution:** Deep-link via branch.io or Apple Smart App Banner. Falls back к App Store search if link expired.
- **If Emma shares from Hybrid or Pro card (not DIY):** Different headline variant:
  - **Hybrid share:** "I saved $135 going Hybrid (I bought parts, handyman installed)"
  - **Pro share (Sarah scenario):** "FixIt showed me my quote was $600 above market. I negotiated it down." — quote validation framing, per POSITIONING §5
- **If Emma doesn't have Instagram:** Share sheet shows OS default options (SMS, email, other). No hard dependency on IG.

### Edge Cases

- **Photo contains PII (person's face, home address, etc.):** AI auto-crops to damage area only. Pre-share "We removed personal details from photo" confirmation.
- **Share card generation fails (server timeout):** Fallback to text-only share **"I saved $665 going DIY with FixIt. Try it: fixit.app"**. Reduced visual impact but still viral.
- **Emma tries to share but has no referral code (edge case для new signups):** Generated just-in-time (EMMA-[random 4 char]). Backfilled if account deletes later.
- **Negative estimate (Pro quote was FAIR — Sarah scenario):** Different share framing — "FixIt confirmed my $3,400 quote was fair. No surprises." Validates system honesty (not just "savings always").
- **User shares multiple times within 1 hour:** Detect and throttle — "Shared 3 times today. Cooldown для more later." Prevents spam.
- **Share link clicked но no install (Jessica busy):** Link tracked via browser cookie, attribution persists 7 days if Jessica installs later.
- **User opts out of attribution tracking:** Privacy setting в Settings disables referral codes. Still allows share, but no attribution benefit.

### Metrics to Track

| Metric | Target | Rationale |
|---|---|---|
| **Share icon tap rate (per estimate viewed)** | 8-12% | ONBOARDING-RESEARCH secondary metric |
| **Share completion rate (tap → posted)** | 70% | After tapping share, how many finish |
| **Platform distribution** | 60% IG, 25% iMessage, 10% TikTok | Emma-weighted |
| **Viral coefficient (k-factor)** | 0.2-0.4 | Each sharer → 0.2-0.4 new installs |
| **Referral install rate (per share)** | 0.3-0.5 | Of 3 friends who see, 1-2 install |
| **Referred install conversion (free → paid)** | 28-32% | Higher than organic (trust primed) |
| **Referral reward redemption** | 15% | Users claim the "1 month free" |
| **Privacy opt-out rate** | <10% | — |
| **Share card generation failure rate** | <2% | Server stability |
| **"Savings-shared" per active user per year** | 3+ | NEW viral metric per POSITIONING §6 |

### Related Flows

- **Flow 1 (First-time Install)** — referred installs enter Flow 1 with attribution badge.
- **Flow 3 (Free → Paid)** — referred users have higher conversion (trust-primed).
- **Flow 2 (Returning User)** — shares often happen on 2nd+ estimates (repeat wow moments).
- **Flow 7 (Viral Savings Loop)** — Flow 6 is THE mechanic; Flow 7 is Emma's first-time DIY-success trigger.

---

## Flow 7: First DIY Success → Share Savings (Viral Loop Activation)

**User:** Emma, 32, Day 3. Completed her first DIY repair (leaky faucet from Flow 1). Fix worked — no more drips. Shopping list cost $15.79 at Home Depot. She's proud, validated, calm.

**Trigger:** Emma marks project as "Completed DIY" в My Home (3.3.2 Estimate Detail → "Mark complete" button). System detects **first DIY success moment** for this user (special trigger — not generic save). Fires celebratory UI + share prompt.

**Goal:** Activate the **viral savings loop** at its peak emotional moment — NOT just after estimate viewed, но after **actual DIY success validated**. This is the strongest viral trigger: Emma has proof she saved money, она emotional, she wants to tell friends. Per POSITIONING §6 — "Savings-shared per active user" is new primary viral metric (replacing "Pro Match click-through" which was old revenue metric).

**Success criteria:** User shares to at least one platform within 5 min of marking complete. Share card features actual realized savings ("$185 saved" based on Pro-quote-that-would-have-been vs DIY-actually-paid). Share generates 0.3-0.5 referral installs.

**Expected duration:** 30-60 seconds from "Mark complete" tap to share posted.

**Screens involved:** 3.3.2 → (celebration modal) → 4.7 → (Native share sheet) → 3.2.1

### ASCII Diagram

```
[Screen 3.3.2 Estimate Detail — Leaky Faucet, saved 3 days ago]
  Photo thumbnail + diagnosis + estimate range ($12-18 DIY)
  Field: "What did you actually pay?"
  Status: "Planning to fix"
      ↓ Emma enters $15.79 and taps "Mark complete"
      ↓
[SYSTEM DETECTS: First DIY Success for this user]
      ↓ Trigger celebratory flow
      ↓
[Celebration Modal — Full-screen takeover]
  🎉 Confetti animation
  
  "Nice work, Emma!"
  
  ┌──────────────────────────────┐
  │                               │
  │   💰 You just saved $259      │
  │                               │
  │   Pro quote would've been:    │
  │   $175-275                    │
  │                               │
  │   You paid:                   │
  │   $15.79                      │
  │                               │
  │   That's 94% saved.           │
  │                               │
  └──────────────────────────────┘
  
  "Your first DIY fix. Let's tell the world."
  
  Primary CTA: [📱 Share the win]
  Secondary: [Save for later]
  Tertiary: [Just mark complete]
      ↓ Tap "Share the win"
      ↓
[Screen 4.7 Share Card Preview]
  Dynamic card (tuned for "first DIY success" variant):
  ┌──────────────────────────────┐
  │  FixIt                        │
  │  Home Repair Cost Advisor     │
  │                               │
  │  🎉 I saved $259              │
  │     going DIY with FixIt!     │
  │                               │
  │  Plumber quote:  $175-275     │
  │  I paid:         $15.79       │
  │                               │
  │  First time fixing a faucet.  │
  │  FixIt walked me through it.  │
  │                               │
  │  Get FixIt → fixit.app        │
  │  ref EMMA-4U92 (5% off)       │
  └──────────────────────────────┘
  
  Options:
  [ ] Hide my photo (default off)
  [ ] Hide specific $ amount (default off)
  [✓] Include referral code (ON)
  
  [Customize] [Share]
      ↓ Tap Share
      ↓
[Native Share Sheet]
  Instagram Stories / TikTok / iMessage / etc.
      ↓ Emma picks Instagram Stories
      ↓
[Instagram composer]
  Sticker overlays, music, etc.
  Emma adds: "Sis don't pay the plumber"
  Posts to Story
      ↓
[Back to FixIt]
      ↓
[Post-share Celebration]
  "Shared! Your friends might save too 💜"
  "You've now shared 1 savings story. Keep it up!"
      ↓
[Screen 3.2.1 My Home Dashboard]
  Timeline updated: Leaky faucet ✓ Completed (saved $259)
  Savings counter updates: "You've saved $259 with FixIt"
  ↑ Retention anchor — every time Emma opens app, she sees this grow
      ↓
[FLOW COMPLETE — viral loop activated]

--- VIRAL IMPACT (parallel, same as Flow 6) ---

[Jessica sees Emma's Story]
  "I saved $259 going DIY with FixIt!"
      ↓ Taps link
      ↓
[App Store — install]
  Attribution: shared by Emma
      ↓
[Jessica enters Flow 1 as referred user]
  Welcome: "Referred by Emma — 5% off your first month"
      ↓
[Jessica's Flow 1 → 2 → 3 ... → possible Flow 7 herself]

--- SECOND-ORDER VIRAL LOOP ---

[Jessica completes her own first DIY fix — Week 2]
      ↓
[Jessica triggers her own Flow 7]
      ↓
[Jessica shares "I saved $120 going DIY with FixIt!"]
      ↓
[Reaches Jessica's own network — compound growth]
```

### Step-by-step

1. **Entry state:** Emma on Screen 3.3.2 Estimate Detail. Это её leaky faucet project от Flow 1, saved 3 days ago. Since then она went к Home Depot, купила supply line ($15.79), watched YouTube video suggested в guide, заменила её. Faucet no longer drips. Она пришла в app отметить "готово".
2. **Mark complete trigger:** Emma enters "$15.79" в "What did you actually pay?" field и taps "Mark complete" button. System records outcome: **actual_cost=$15.79, status=completed, mode_chosen=DIY, success=true**.
3. **System detects FIRST DIY SUCCESS:** Backend check — is this user's first ever "completed DIY" status? If yes → trigger celebratory flow (not generic save confirmation). If not first, standard save flow (less fanfare, but still acknowledges savings).
4. **Celebration Modal (full-screen takeover):** Key UX:
   - **Confetti animation** (Lottie, 3 sec)
   - **"Nice work, Emma!"** — personalized greeting, warm tone (per POSITIONING §7 brand voice — "Calm authority, как дед-мастер, не sales rep")
   - **Savings number prominently**: **"You just saved $259"** — calculated from (median of Pro quote range $175-275 = $225) − ($15.79 actual) = $209; rounded and prominently displayed. Alternative calc: upper-bound savings ($275 − $15.79 = $259.21, rounded to $259) — even more visceral.
   - **Breakdown context**: "Pro quote would've been: $175-275. You paid: $15.79. That's 94% saved." — Emma внутренне понимает шкалу своей экономии.
   - **Three CTA options** (priority order):
     - Primary: **"📱 Share the win"** — triggers share flow
     - Secondary: "Save для later" — dismisses modal, but shows "Share" button on 3.3.2 prominently so Emma может share позже
     - Tertiary: "Just mark complete" — skips share entirely (respects users who privacy-first)
5. **Emma taps "Share the win":** Routes to Screen 4.7 Share Card Preview с **"first DIY success" variant** — different card copy than standard Flow 6:
   - Headline: **"🎉 I saved $259 going DIY with FixIt!"** (emoji лёгкий, acknowledged as celebration)
   - Sub-context: **"First time fixing a faucet. FixIt walked me through it."** — persona-authentic (Emma first-time homeowner, это её first self-repair)
   - Price breakdown: "Plumber quote: $175-275 / I paid: $15.79"
   - Referral code prominently: "ref EMMA-4U92 (5% off)"
6. **Native Share Sheet:** Same as Flow 6. Emma picks Instagram Stories (65% of Emma-persona shares).
7. **Instagram composer:** Emma adds sticker overlay ("Sis don't pay the plumber"), music, posts to Story.
8. **Return to FixIt — Post-share Celebration:** Different from standard share confirmation:
   - "Shared! Your friends might save too 💜"
   - Counter: **"You've now shared 1 savings story. Keep it up!"** — gamification-adjacent, acknowledges ongoing viral contribution
9. **Screen 3.2.1 My Home Dashboard updated:**
   - Timeline: Leaky faucet marked with ✓ Completed + "saved $259" callout
   - **Top savings counter ticks up**: "You've saved $259 with FixIt" — visible every time Emma opens app, retention anchor
10. **Viral downstream (parallel, same as Flow 6):** Jessica sees Story, taps link, installs, enters Flow 1 with "Referred by Emma" badge. **Second-order viral loop:** Jessica completes own first DIY fix week 2, triggers her own Flow 7, shares, reaches her network. **Compound growth** if mechanic works.
11. **Flow complete.** Emma in strongest retention + virality state — она validated fix, shared savings, established habit.

### Decision Points / Branches

- **Step 3 (first DIY detection):** If this is 2nd or later DIY success, modal is less fanfare — "Another win! Total saved: $X" с still-a-share prompt but smaller. Maintains celebration but avoids spam.
- **Step 4 (savings calc):** How do we calculate savings? v1.0 approach:
  - Upper-bound Pro quote − actual_cost = savings displayed
  - Median Pro quote − actual_cost = "conservative" savings (used в counters)
  - A/B test which performs better for share conversion
- **Step 5 (share variant selection):** First DIY success = celebration variant. Standard Flow 6 variants:
  - Repeat DIY: "Another one — saved $X" (less celebratory)
  - Hybrid success: "I saved $X going Hybrid"
  - Validated Pro quote (Sarah): "FixIt confirmed my quote was fair"
  - Negotiated Pro quote (Sarah): "FixIt helped me negotiate $X off a quote"
- **Step 8 (post-share):** If user has shared 5+ times, show different copy: "You're a FixIt ambassador. Keep helping friends save." No gamification leaderboard в MVP (post-MVP v1.5 feature).
- **Step 10 (viral downstream):** If Jessica installs within 24hr of Emma's share, attribution strong. 7-day cookie fallback. If Jessica installs via App Store search (no deeplink), partial attribution via survey "How did you hear about FixIt?"

### Edge Cases

- **Emma marks complete but DIDN'T save money (actual_cost > Pro quote — rare but possible for beginners):** No celebration modal. Instead gentle "Thanks for logging. Next time might be different — every fix teaches you something." No shaming. Don't trigger share (would be awkward).
- **Emma's DIY failed (marks "Abandoned DIY, hired pro after all"):** Different flow — "Sometimes it's worth calling a pro. Want to log the final cost?" Feeds Pro Match experience но NO share trigger (negative moment, не viral).
- **Emma completes but doesn't enter actual_cost:** Savings calc uses DIY estimate mid-point as proxy. Less accurate but still allows celebration. Prompt: "For accurate savings, log what you paid (helps other users too)."
- **Multi-item project (complex repair с several line items):** Savings aggregated across line items. Share card shows total. v1.5 may allow per-item share.
- **User privacy-first — opts out of savings sharing entirely (Settings):** Modal still fires for personal celebration, but share button absent. Still contributes to personal savings counter.
- **Claude API returned bad Pro quote estimate initially:** If actual_cost is dramatically off от estimate (user paid $800 when estimate said $175-275), flag для accuracy review. Don't block share, but internal data quality loop.
- **User returns 6 months later to log completion:** Still valid, still fires celebration (within reason — if 12+ months, just simple save). Handles "I finally got around to it" edge case.
- **Jessica (referred user) never shares herself but subscribes:** Flow 7 succeeded in acquisition + monetization без second-order viral. Still net positive.

### Metrics to Track

| Metric | Target | Rationale |
|---|---|---|
| **First DIY success rate (% of saved DIY projects)** | 60% | Feature #5 success criterion |
| **Time from estimate → DIY completion** | <14 days median | Behavioural validation of DIY path |
| **"Mark complete" tap rate** | 40% of DIY-saved projects | Proxies active engagement |
| **Share CTA tap (from celebration modal)** | 45% | Highest viral moment в app |
| **Share completion (tap → posted)** | 75% | Higher than Flow 6 general share (70%) — emotional high |
| **Savings reported (actual_cost entered)** | 50% | Critical for crowdsourced data |
| **Avg savings per reported DIY** | $150-250 | POSITIONING §6 target "$150+ saved per user/yr" |
| **Viral K-factor from Flow 7 specifically** | 0.4-0.6 | Higher than generic share K=0.3 — emotional peak |
| **Second-order viral rate (Jessica shares her own)** | 10-15% of referred users | Compound loop validation |
| **"Savings-shared per active user per year"** | 3+ | NEW primary viral metric |
| **DIY success NPS (measured via post-complete survey)** | >60 | Validates "we help decide" promise |
| **Referred install → paid conversion** | 30-35% | Higher than organic (trust primed) |

**Removed from v1.0 metrics (no longer tracked):**
- ~~Pro Match click-through rate~~ (affiliate gone)
- ~~Hire conversion (Thumbtack funnel)~~ — no longer a revenue metric, not tracked
- ~~Affiliate revenue per active user~~ — we don't earn from Find-a-Pro clicks
- ~~Pro NPS (pros rate FixIt lead quality)~~ — no pro supply side anymore

### Related Flows

- **Flow 1 (First-time Install)** — seed for Flow 7 (Emma's first estimate creates the DIY project that she'll complete here).
- **Flow 2 (Returning User)** — Emma returns Day 3 to mark complete → triggers Flow 7.
- **Flow 5 (Save → Maintenance)** — saved projects (Flow 5) are the data layer that Flow 7 activates upon completion.
- **Flow 6 (General Share)** — Flow 7 is the supercharged variant; Flow 6 handles non-celebration shares (pre-fix, Sarah validation, etc.).
- **Flow 3 (Paid Conversion)** — referred users from Flow 7 viral downstream enter Flow 3 with higher conversion rates.

---

## Cross-Flow Dependency Graph

Диаграмма показывает how flows connect в lifecycle (updated under rescope):

```
              ┌────────────────────────┐
              │  Flow 1: First Install │
              │  → First Estimate (Aha)│
              └───────────┬────────────┘
                          │
                          ↓
              ┌────────────────────────┐
              │  Flow 2: Returning     │
              │  User (2nd+ estimate)  │
              └─────┬──────────┬───────┘
                    │          │
       (hit quota)  │          │  (save to home + complete DIY)
                    ↓          ↓
      ┌─────────────────┐  ┌──────────────────────┐
      │ Flow 3: Soft    │  │ Flow 5: Save →       │
      │ Paywall         │  │ Maintenance Loop     │
      └────────┬────────┘  └────────┬─────────────┘
               │                    │
               ↓                    │
      ┌─────────────────┐          │
      │ Subscribed user │          │
      └────────┬────────┘          │
               │                    │
               ↓                    ↓
      ┌─────────────────┐   ┌──────────────────────┐
      │ Long-term       │   │  Flow 7: DIY Success │
      │ retention +     │   │  → Share Savings     │
      │ maintenance     │   │  (VIRAL LOOP)        │
      │ calendar use    │   └──────┬───────────────┘
      └─────────────────┘          │
                                    │
                                    ↓
                            [Referred installs]
                                    │
                                    ↓
                            [Back into Flow 1]

Side branches (parallel, trigger-based):

Flow 4 (Sarah — Quote Validator)
  ↓ Triggered when user has pre-existing pro quote
  ↓ Runs parallel to Flow 1 (она still does basic onboarding)
  ↓ Primary share outcome: validation/negotiation evidence
  ↓ Can convert via PDF export paywall (5.2.3)

Flow 6 (General Share)
  ↓ Can trigger anywhere post-estimate
  ↓ Handles non-celebration shares (Sarah validation, mid-fix updates)

Find-a-Pro Sheet (7.1)
  ↓ Single-screen side-branch from 4.5.2 (Hybrid) or 4.5.3 (Pro)
  ↓ Zero monetization, pure handoff utility
  ↓ Accessible free to all users (no paywall)
```

**Primary lifecycle progression:**
- Flow 1 (acquire) → Flow 2 (re-engage) → Flow 3 (monetize) → Flow 5 (retain)
- Flow 7 (viral) triggers off DIY success, feeds back into Flow 1 through referral installs
- Flow 4 (Sarah) branches parallel to Flow 1 for quote-validation persona
- Flow 6 (general share) supports all flows, trigger-agnostic

**Revenue streams по flows (post-rescope v2.0):**
- Flow 3 soft paywall: 60% of total subscription revenue (up from 55% — primary now)
- Flow 4 PDF export context paywall (Sarah-path): 15% of subscription revenue
- Other context paywalls (Save/Warranty/Price alerts): 15% of subscription revenue
- Amazon Associates (shopping list bonus): <5% total revenue, $100-2000/yr total
- Pay-per estimate ($2.99 one-off): 5% of total revenue
- **REMOVED:** Pro Match affiliate (was $0.75-1.50/user/month in v1.0 — zero in v2.0)

**Viral streams по flows:**
- Flow 7 first DIY success share: K-factor 0.4-0.6 (primary viral driver)
- Flow 6 general share: K-factor 0.2-0.3 (supporting)
- Overall target: **blended K-factor 0.3** → each active user seeds 0.3 new users via viral
- Indirect CAC reduction from virality: 20-30%

---

## Flow Completion Metrics Summary

| Flow | Primary conversion metric | Target | Industry benchmark |
|---|---|---|---|
| **Flow 1: First Estimate (Aha)** | Install → Estimate Result | **75%** | PictureThis 85% |
| **Flow 2: Returning User** | Day 30 return rate | **35%** | Utility apps 40% |
| **Flow 3: Soft Paywall** | Paywall → Paid conversion | **22%** | PictureThis 20% |
| **Flow 4: Quote Validator (Sarah)** | Sarah-path → subscription (30-day) | **25-30%** | Higher intent than Emma |
| **Flow 5: Save + Maintenance** | Return via push (D90) | **15-20%** | — |
| **Flow 6: General Social Share** | Share completion rate | **70%** | — |
| **Flow 7: DIY Success → Viral** | Share CTA tap (from celebration) | **45%** | New metric |
| **Flow 7 (overall)** | Viral K-factor | **0.4-0.6** | Calm K=0.25 |

**Removed from v1.0 summary (no longer applicable):**
- ~~Flow 7: Pro Match / Hire conversion / 50% target~~ (affiliate gone)
- ~~Flow 4: Context Paywall Pro Match / 12-15% target~~ (replaced с Quote Validator)
- ~~Affiliate revenue per active user / $0.75-1.50/mo~~ (no affiliate)

---

## Testing & Validation

### Pre-launch usability testing

Перед v1.0 ship, валидировать каждый flow через:

- **10 beta Emmas** для Flow 1 — benchmark <90 sec to aha. Validate "Know the price before the panic" tagline resonance.
- **5 beta Mikes** для Flow 2 — benchmark 30-45 sec 2nd estimate.
- **10 beta users** на Flow 3 paywall UX — A/B first exposure copy variants (savings anchor vs generic).
- **5 Sarah-type users** на Flow 4 Quote Validator — measure fair-price validator comprehension + share-to-electrician usage.
- **5 Emmas + 5 Mikes** на Flow 5 maintenance calendar — feature discovery test.
- **5 Emmas** на Flow 6 share UX — what privacy defaults fit their comfort?
- **5 Emmas** на Flow 7 celebration modal — does "first DIY success" trigger виральность? Is savings number emotionally resonant?
- **3 Emma-Jessica pairs** (actual friends) — Emma shares via Flow 7, Jessica installs via referral link — full viral loop end-to-end.

### Post-launch A/B test priority

Tied directly к PAYWALL-RESEARCH §10 и ONBOARDING-RESEARCH §9:

1. Flow 3 tier pricing ($7.99 vs $9.99 vs $12.99 monthly)
2. Flow 1 camera permission priming copy
3. Flow 3 paywall CTA copy ("Unlock Unlimited" vs "Start Saving")
4. Flow 4 fair-price validator framing (banner prominence, copy variants)
5. Flow 6 share card templates (before/after vs savings vs contrast)
6. Flow 7 savings calculation (upper-bound vs median anchor)
7. Flow 7 celebration modal timing (immediately on mark-complete vs 1-second delay for anticipation)
8. Flow 5 save modal auto-suggestions accuracy

---

## Related Docs

- [POSITIONING.md](../02-product/POSITIONING.md) — new USP + brand voice + copy matrix (foundation для flow copy)
- [SCREEN-MAP.md](./SCREEN-MAP.md) — screens referenced in flows (updated under same rescope, Find-a-Pro Sheet replaces Pro Match sub-flow)
- [FEATURES.md](../02-product/FEATURES.md) — 10 MVP features с RICE scores (F6 simplified к deeplinks)
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — Emma / Mike / Sarah / Tyler / Ronald profiles
- [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) — Flow 1 deep research
- [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) — Flows 3, 4 monetization detail
- [RETENTION-RESEARCH.md](../03-practices/RETENTION-RESEARCH.md) — Flow 5 retention loop detail
- [MONETIZATION.md](../02-product/MONETIZATION.md) — post-rescope revenue model (no affiliate)
- [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) — principles guiding flow design

---

**Дата последнего обновления:** 2026-04-19 (rescope v2.0 — AI-only advisor, no marketplace)
**Автор:** UX Team (Лана + Amanda)
**Статус:** v2.0 post-rescope — Flow 4 replaced (Pro Match Context Paywall → Quote Validator), Flow 7 replaced (Thumbtack Affiliate → Viral Savings Share)
**Следующий шаг:** WIREFRAMES.md updates (delete Screens 18 Pro Match Results, create Find-a-Pro Sheet + First DIY Success Celebration Modal wireframes)
