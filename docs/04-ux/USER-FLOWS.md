---
Проект: FixIt — AI home repair cost advisor
Дата: 2026-04-18
Статус: Draft v1.0
Автор: UX Team (Лана + Amanda)
Stage: UX Design (Stage 4)
---

# USER-FLOWS.md — FixIt

**Companion docs:** [FEATURES.md](../02-product/FEATURES.md) | [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) | [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) | [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) | [SCREEN-MAP.md](./SCREEN-MAP.md)

---

## Overview

Документ описывает **7 core user flows FixIt** — путей пользователя через product от первого install до retention loop и monetization. Каждый flow грунтован в research: Emma как primary persona (first-time homeowner, 28-55, anxious state при первом использовании), 3-step onboarding, soft paywall после 3rd estimate, affiliate revenue через Pro Match.

**Screen ID convention** (из SCREEN-MAP.md):
- **1.x** — Onboarding & auth (1.1 Welcome, 1.2 Location, 1.3 Camera Permission, 1.4 Camera View, 1.5 Photo Preview, 1.6 Push Permission Prime, 1.7 Signup Ask, 1.8 Signup Complete)
- **2.x** — Paywall (2.1 Soft Paywall, 2.2 Context Paywall, 2.3 Pay-per Checkout, 2.4 Subscription Confirmed)
- **3.x** — Home & navigation (3.1 Home Dashboard, 3.2 My Home Timeline, 3.3 Project Detail, 3.4 Settings, 3.5 Maintenance Calendar)
- **4.x** — Estimate flow (4.1 Photo Capture, 4.2 Photo Preview, 4.3 Context Questions, 4.4 AI Processing, 4.5 Estimate Result, 4.5.1 DIY Detail, 4.5.2 Hybrid Detail, 4.5.3 Pro Detail, 4.6 Shopping List, 4.7 DIY Guide)
- **5.x** — Pro Match (5.1 Pro List, 5.2 Pro Profile, 5.3 Quote Request, 5.4 Thumbtack Redirect)
- **6.x** — Sharing & viral (6.1 Share Card Preview, 6.2 Share Sheet, 6.3 Post-share Confirmation)
- **7.x** — Retention (7.1 Save to Home Modal, 7.2 Maintenance Reminder, 7.3 Seasonal Nudge)
- **8.x** — Errors & edge cases (8.1 No Internet, 8.2 Camera Denied, 8.3 Location Denied, 8.4 AI Uncertain, 8.5 Blurry Photo, 8.6 Out of Scope)

**Target persona distribution** (MVP):
- **Emma (primary):** Flows 1, 2, 3, 5, 6 — first-time homeowner, anxiety-driven activation
- **Mike:** Flows 2, 5 — DIY enthusiast, repeat user
- **Sarah:** Flow 4 — quote validator, Pro Match premium user
- **Tyler:** Flow 7 — pay-per user, move-out review

---

## Flow 1: First-time Install → First Estimate (Aha Moment)

**User:** Emma, 32, first-time homeowner в Denver. Только что заметила протечку под кухонной раковиной в 19:42 вторник. Скачала FixIt из TikTok ad "Plumber quoted $800, FixIt said $15 DIY."

**Trigger:** Install complete + first tap на app icon. User в anxious state ("кран капает, прибрать воду, что делать?").

**Goal:** За 60-90 секунд получить actionable repair estimate ("сколько стоит починить? DIY или звать мастера?") — без signup, без friction.

**Success criteria:** User дошёл до Screen 4.5 Estimate Result, провёл там >15 секунд (session replay indicator что aha landed), увидел три опции (DIY/Hybrid/Pro) с конкретными Denver prices.

**Expected duration:** 60-90 секунд от install до aha moment. Emma benchmark: <90 sec target, top-10% photo-AI apps (PictureThis, Rock Identifier) делают 45-60 sec.

**Screens involved:** 1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 4.3 → 4.4 → 4.5 → 1.7 → 3.1

### ASCII Diagram

```
[INSTALL COMPLETE]
      ↓
[Screen 1.1 Welcome]
  "Know the price of any home repair in 60 seconds"
      ↓ Tap "Take a photo of your problem"
      ↓
[Screen 1.2 Location]
  "Where do you live?" — ZIP или auto-detect
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
[Screen 1.5 Photo Preview]
  "Looks good? Retake if blurry."
      ↓ Tap "Analyze this"
      ↓
[Screen 4.3 Context Questions]
  Micro-screen, 2 taps:
  Q1: DIY readiness (Never / Some / Confident)
  Q2: Quality tier (Budget / Mid / Premium)
      ↓ Tap "Get my estimate"
      ↓
[Screen 4.4 AI Processing]   ← Labor illusion 5-8 sec
  Step 1 (0-2s): "Identifying the problem..."
  Step 2 (2-4s): "Checking Home Depot Denver prices..."
  Step 3 (4-6s): "Pulling local plumber rates..."
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
      ↓ Tap "DIY" / "Hybrid" / "Pro" card
      ↓
[Screen 4.5.1 DIY Detail]  (most common Emma choice)
  Shopping list preview + step-by-step guide preview
  "Save $260 by DIY" contrast
      ↓ Scroll / explore
      ↓
[Screen 1.7 Signup Ask]  ← Soft, bottom sheet
  "Save this estimate + get 2 more free"
  Apple / Google / Email buttons
  "Not now" (grey, small но visible)
      ↓ Tap Apple Sign-In (most common) OR Skip
      ↓
[Screen 3.1 Home Dashboard]
  First estimate saved on timeline
  CTA: "Take another photo" (encourages 2nd use)
  "3 free estimates this month" counter
      ↓
[FLOW COMPLETE]
```

### Step-by-step

1. **Install complete:** Emma видит иконку FixIt на home screen, tap.
2. **Screen 1.1 Welcome:** Full-bleed visual (sketch faucet + price tag icon). Headline "Know the price of any home repair in 60 seconds". Single CTA button "Take a photo of your problem". NO signup, NO email ask, NO demo video (kills velocity per ONBOARDING-RESEARCH §1.2).
3. **Screen 1.2 Location:** "Where do you live?" — explanatory sub "Prices vary 40%+ by region". Emma taps "Use my location" → iOS location permission dialog → grant → auto-fill "80203 Denver, CO". Skip link available (melким grey) но 85% target for location capture.
4. **Screen 1.3 Camera Permission (priming):** Custom screen BEFORE iOS dialog. Headline "Take a photo of what's broken". 4 sample thumbnails (plumbing/electrical/furniture/appliance) — demonstrates scope. Privacy statement critical: "Photos stay private to your account. Never shared." CTA "Allow camera" triggers iOS dialog. Target grant rate 85%.
5. **Screen 1.4 Camera View:** Native camera UI с top overlay "Snap the problem area — close-up helps". Bottom auto-cycling guidance pills ("Good lighting", "Include context", "Multiple angles"). Emma фотографирует под раковиной — P-trap leak visible.
6. **Screen 1.5 Photo Preview:** "Looks good? Retake if blurry." CTA "Analyze this". Emma tap "Analyze this".
7. **Screen 4.3 Context Questions:** Micro-screen между photo и result (2 quick taps, 5-7 sec total). Q1 DIY readiness: Emma taps "Some experience" (she's homeowner, handled basic tasks). Q2 Quality tier: Emma taps "Mid-range". Button "Get my estimate".
8. **Screen 4.4 AI Processing:** 5-8 sec labor illusion с 4 animated steps. Photo thumbnail pulsates. Emma видит "Checking Home Depot Denver prices..." — builds trust that AI actually работает над её problem, не generic.
9. **Screen 4.5 Estimate Result — AHA MOMENT:** Three-option card side-by-side. DIY $12-18 / Hybrid $110 / Pro $175-275. Emma видит concrete Denver prices, не national averages. Hero emotional moment: "wait, plumber quote was $500 — FixIt says $18 DIY?" Session replay target: >15 sec on screen.
10. **Screen 4.5.1 DIY Detail (branch):** Emma taps DIY card. Expandable sheet shows shopping list preview (silicone tape + supply line + wrench) + step-by-step guide preview + embedded YouTube video link.
11. **Screen 1.7 Signup Ask (soft):** Bottom sheet appears after 10+ sec on 4.5.1. "Save this estimate + get 2 more free". Apple Sign-In (primary, iOS prefers), Google, Email, "Not now" grey. Target conversion 55-65% post-aha.
12. **Screen 3.1 Home:** Emma signed up via Apple. First estimate now saved as card on Home timeline. Counter "2 free estimates remaining this month". CTA "Take another photo" — seed for Flow 2.
13. **Flow complete.** Emma achieved aha в <90 sec от install, signed up (or skipped, still in guest mode).

### Decision Points / Branches

- **At step 3 (location):** User denies location permission → falls to Screen 1.2.1 Manual ZIP entry. Emma types "80203", proceeds. If user skips entirely → national average shown on 4.5 с soft prompt "add ZIP for exact Denver pricing".
- **At step 4 (camera permission):** User denies camera → fallback к Screen 4.1.1 Gallery Picker (choose saved photo) OR Screen 4.1.2 Text Description Entry ("describe the problem in words"). Expected path for 15% of users. Emma scenario — she's already в kitchen with leak, so camera granted.
- **At step 7 (context questions):** Skip available → defaults to "Some experience" + "Mid-range". Reduces friction for impatient users.
- **At step 9 (aha moment):** If estimate low-confidence (AI uncertain < 70%) → Screen 8.4 displays "I think this might be leaky faucet OR clogged trap. Describe what happened?" Text input → AI re-analyzes.
- **At step 10 (mode selection):** User taps Hybrid → Screen 4.5.2 Hybrid Detail (handyman labor $95 + materials). User taps Pro → Screen 4.5.3 Pro Detail (triggers Flow 7 affiliate).
- **At step 11 (signup):** User taps "Not now" → stays as guest, estimate saved in device-only session. Still counts against 3-free quota (via device ID). Signup friction re-applied на 2nd estimate.

### Edge Cases

- **Blurry photo:** AI returns confidence <50% → Screen 8.5 "Retake with more light" с sample reference image. 15% target retake rate (below = camera UX winning).
- **No internet при step 8 AI processing:** Screen 8.1 "No connection. Checking cache..." — if similar-category cached estimate exists from another user in same zip, show с disclaimer "based on similar repair in Denver". Otherwise hard fail: "Reconnect to get estimate."
- **AI can't identify (category not in top-30 MVP):** Screen 8.6 "FixIt covers plumbing, electrical, furniture, appliances. This looks like [e.g., car repair] — try [alternative app suggestion]."
- **Emma's zip has no pricing data (rural):** Show generic Colorado state-level estimate с disclaimer "Denver metro prices — nearest data". Future: expand to state-level pricing для all 50 states.
- **Photo with multiple problems (leak + cracked tile):** AI detects → 4.5 shows "I see both a leaking pipe AND water-damaged tile. Which to focus on?" Two-choice modal → user picks primary.
- **App crash mid-flow:** Session state persisted in Supabase guest auth. Re-open app → resume at last completed step ("You were taking a photo — continue?").
- **Emma skipped signup, closes app:** 24hr later returns → anonymous session intact (device ID), но "Save your estimates by signing up" banner на Home.

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

Source: ONBOARDING-RESEARCH §1.6 benchmarks tables.

### Related Flows

- **Flow 2 (Returning User)** — branches from end of Flow 1 (Emma returns next week with new problem).
- **Flow 6 (Social Share)** — triggered from "Share" button на 4.5 Estimate Result, если Emma хочет impress подругу.
- **Flow 7 (Pro Match)** — triggered if Emma на step 10 выбрала Pro card → 4.5.3 → 5.1.

---

## Flow 2: Returning User → Second+ Estimate

**User:** Emma, 32, Day 8 после first install. Первый estimate был leaky faucet (successful DIY fix $15). Теперь в subway station замечает что garage door hinge скрипит. Открывает FixIt в 20:15.

**Trigger:** Organic return — user remembers app helped last time, opens без push notification (demonstrates product-market fit).

**Goal:** Быстро (в 3x faster чем first time) получить estimate, потому что user already knows the flow. Skip unnecessary steps.

**Success criteria:** User completes 2nd estimate в <45 seconds. Engages с estimate (saves to My Home OR acts on it — shopping list / share).

**Expected duration:** 30-45 seconds (skips onboarding overhead).

**Screens involved:** 3.1 → 1.4 → 1.5 → 4.3 → 4.4 → 4.5 → 4.5.1 → 7.1

### ASCII Diagram

```
[APP OPEN — returning user]
      ↓
[Screen 3.1 Home Dashboard]
  Timeline shows first estimate (leaky faucet)
  Counter: "2 free estimates remaining"
  Big CTA: "+" or "Take another photo"
      ↓ Tap "+"
      ↓
[Screen 1.4 Camera View]   ← Skip welcome, location, permissions
  (all already granted, ZIP remembered)
      ↓ Photo taken (garage door hinge)
      ↓
[Screen 1.5 Photo Preview]
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
  Shopping: WD-40 $4.99, 5 min job
      ↓ Tap "Save to My Home"
      ↓
[Screen 7.1 Save to Home Modal]
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

1. **App open:** Emma taps FixIt icon. Home screen 3.1 loads in <2 sec (cached state).
2. **Screen 3.1 Home:** Emma видит timeline с первым проектом (leaky faucet, marked "Completed DIY $15"). Large "+" button (или "Take another photo" CTA) prominent в bottom-right floating UI.
3. **Camera direct:** Tap "+" skips ALL onboarding (welcome, location, permissions already granted). Goes directly to Screen 1.4 Camera View. This is massive time save vs Flow 1.
4. **Screen 1.4:** Emma photographs hinge. Similar camera UX but user knows the drill — no guidance pills needed (can dismiss).
5. **Screen 1.5 Preview:** Tap "Analyze".
6. **Screen 4.3 Context Questions:** Pre-filled с last session's answers. Fast path: "Same preferences (Some experience, Mid-range)? [Yes, proceed]" — single tap skip. Or "Change preferences" for edge cases.
7. **Screen 4.4 AI Processing:** Same 5-8 sec labor illusion. Could be reduced for repeat users (A/B test: 3 sec variant for 2nd+ estimates).
8. **Screen 4.5 Estimate Result:** Aha still lands (new problem, new discovery), but expectation is lower — Emma already trusts the system.
9. **Screen 4.5.1 DIY Detail:** Emma sees simple fix — WD-40, 5 min. 
10. **Screen 7.1 Save to Home Modal:** Small bottom sheet. Auto-detected "Garage" room tag (from AI photo analysis). Emma taps "Save" (one tap, no text entry).
11. **Home updated:** Timeline now 2 projects. Stat counter updates ("You've saved $X via DIY").
12. **Flow complete.** Emma may now branch to Flow 6 (share) или simply close app to actually fix the hinge.

### Decision Points / Branches

- **At step 3 (Home):** User может alternatively tap existing project on timeline → goes to 3.3 Project Detail (deep-link to past estimate). This supports "remind me what I did last time" use case.
- **At step 6 (context questions):** If 2 weeks passed since last estimate → prompt "Still in Denver? [Yes] / Update location" — validates regional pricing not stale.
- **At step 8 (estimate):** If this is 3rd free estimate в calendar month → proceeds normally, but 4.5 result screen shows banner "This was your 3rd free estimate. Next one: upgrade OR pay-per-estimate." Seeds Flow 3.
- **At step 10 (save):** User can skip "Save to Home" — estimate auto-saves к timeline regardless. Modal is opt-in для adding room tag + notes.

### Edge Cases

- **User tries 4th estimate after hitting 3-free limit:** Flow 2 branches at step 3 → Screen 2.1 Soft Paywall appears INSTEAD of camera. See Flow 3.
- **User has been inactive 30+ days:** Home 3.1 shows "Welcome back! Any new home issues?" banner + optional re-onboarding prompt (update ZIP, quality preference refresh).
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
- **Flow 6 (Social Share)** — repeat users more likely to share (established trust).

---

## Flow 3: Free → Paid Conversion (Soft Paywall)

**User:** Emma, 32, Day 18. Использовала 3 free estimates в этом месяце (leaky faucet, garage hinge, dishwasher not draining). Сейчас замечает водяное пятно на потолке ванной — хочет 4-й estimate.

**Trigger:** User taps "+" / "Take another photo" на Home → system detects free quota exhausted for rolling 30-day window.

**Goal:** Convert free user в paid subscriber (target tier: annual $49.99, per PAYWALL-RESEARCH §3). Alternative: pay-per-estimate ($2.99) если user subscription-averse.

**Success criteria:** User either (a) subscribes to annual tier (preferred, target 22% conversion per PAYWALL-RESEARCH §5), (b) buys pay-per-estimate ($2.99 fallback), or (c) dismisses and returns next month when quota resets.

**Expected duration:** 20-60 seconds on paywall screen (decision time).

**Screens involved:** 3.1 → 2.1 → 2.3 или 2.4 → 4.3 → 4.4 → 4.5 (resumes Flow 2)

### ASCII Diagram

```
[Screen 3.1 Home — user taps "+"]
      ↓ (System detects quota exhausted)
      ↓
[Screen 2.1 Soft Paywall]   ← PRIMARY MONETIZATION TOUCHPOINT
  Header: "You've saved $247 so far on 3 repairs with FixIt"
  "Keep the momentum going:"
  ✓ Unlimited estimates
  ✓ Full project history
  ✓ Save "my home" projects
  ✓ Priority pro matching
  ┌──────────────────────────────┐
  │ ● ANNUAL (BEST VALUE)         │  ← PRE-SELECTED
  │   $49.99/year  =  $4.17/mo    │
  │   2 months free vs monthly    │
  └──────────────────────────────┘
  ┌──────────────────────────────┐
  │ ○ Monthly  $7.99/mo           │
  └──────────────────────────────┘
  ┌──────────────────────────────┐
  │ ○ Pay-per  $2.99/estimate     │  ← fallback
  └──────────────────────────────┘
  Social proof: ★★★★★ 4.8 — 12,400 reviews
  "FixIt saved me $400" — Emma, Denver
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
[Screen 2.4 Subscription Confirmed]
  "Welcome to Pro! 🎯"
  ✅ Unlimited estimates
  ✅ Full project history
  ✅ Priority Pro matching
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
[Screen 2.3 Pay-per Checkout]
  "$2.99 for this estimate"
  Apple Pay / Google Pay / card
      ↓ Paid
      ↓
[Screen 4.3 → 4.4 → 4.5]
      ↓
[FLOW COMPLETE — pay-per user]

Alternative branch: Dismiss paywall
      ↓ Tap [X close] on 2.1
      ↓
[Screen 3.1 Home — quota bar visible]
  Banner: "Your quota resets on [date]"
  "Want to use now? Upgrade anytime"
```

### Step-by-step

1. **User intent:** Emma taps "+" on Home 3.1 intending to start 4th estimate (ceiling water stain).
2. **Quota check:** Backend (Supabase edge function) detects user has exhausted 3 free estimates in rolling 30-day window. Instead of routing к camera, routes к Screen 2.1.
3. **Screen 2.1 Soft Paywall:** Full-screen modal (not dismissible via swipe — must tap X or CTA). Personalized emotional hook top: "You've saved $247 so far on 3 repairs" (pulled from user's project history — concrete, not abstract). 4 clear benefit bullets. Three tier options with annual pre-selected and visually highlighted ("BEST VALUE" badge).
4. **Pricing presentation:** Annual $49.99 (= $4.17/mo) pre-selected. Monthly $7.99 visible but not pushed. Pay-per $2.99 as fallback (target: 5-10% of non-subscribers use this, per PAYWALL-RESEARCH §9).
5. **Social proof:** ★★★★★ 4.8 rating + testimonial snippet ("FixIt saved me $400" — Emma, Denver). Concrete numbers > abstract claims per Adapty research (+72% install-to-trial effect).
6. **CTA button:** "UNLOCK UNLIMITED ACCESS" — benefit-driven copy (not "Subscribe"). Primary color, dominant visual weight.
7. **Decision branch A (Annual selected — target 22%):** Emma taps CTA → Apple Pay native flow → success → Screen 2.4 Subscription Confirmed → "Welcome to Pro!" с feature checklist animation → tap "Continue" → resumes flow к 4.3 Context Questions для originally-intended 4th estimate.
8. **Decision branch B (Monthly selected):** Same flow, different tier. Lower commitment, higher churn risk. Monthly users get drip nudge месяц 6 "Upgrade to annual, save $46".
9. **Decision branch C (Pay-per selected — fallback):** Emma taps "Pay as you go". Routes к Screen 2.3 Pay-per Checkout. Single-transaction $2.99 Apple Pay. After success → directly к 4.3 Context Questions. Estimate limited к single-use (не saved to My Home for pay-per unless she later subscribes).
10. **Decision branch D (Dismiss):** Emma taps X (top-left close). Returns to 3.1 Home с banner "Your quota resets on [date]. Upgrade anytime." No paywall shown for 7 days (avoid spam per PAYWALL-RESEARCH §4.3).
11. **Post-purchase onboarding:** Subscription Confirmed screen emphasizes что unlocked. First post-paywall estimate particularly important — validates the purchase decision (buyer's remorse mitigation).

### Decision Points / Branches

- **Screen 2.1 tier selection:** Annual default drives 45-55% annual mix (PAYWALL-RESEARCH §6.2). User can switch radio to Monthly or Pay-per.
- **If user previously saw paywall и dismissed:** 2nd exposure (day 45-60) shows slightly different framing — "Your 3 free estimates are back. Plus Pro gets you unlimited." Lower-pressure re-engagement (23% conversions happen 6+ weeks post-install per Adapty).
- **If user in unusual state (e.g., partial month, proration):** Paywall shows "You have 2 days left in trial/quota" — urgency framing for last-chance converters.
- **If subscription fails (payment declined):** Screen 2.1.1 Error State "Payment didn't go through. Try another card or Apple Pay" with clear retry path.
- **If user is on iOS Family Sharing и parent already subscribed:** Detect via Apple receipt → skip paywall, show "Your family's subscription is active" + confirm.

### Edge Cases

- **Refund request:** User refunds within 48hrs → access revoked, data preserved. Win-back email in 30 days: "50% off next month if you return."
- **Expired subscription:** Auto-retry billing 3 attempts (per App Store default). If all fail → downgrade к free tier gracefully (no data loss).
- **Restore Purchase:** Screen 2.1 has small "Restore Purchase" link (App Store requirement). User who reinstalled или switched devices can recover paid status.
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
- **Flow 4 (Context Paywall)** — different trigger (premium feature tap) but same 2.x paywall screens reused.
- **Flow 5 (Save to My Home)** — unlocked premium feature post-subscription.

---

## Flow 4: Context Paywall → Subscription (Pro Match Premium Trigger)

**User:** Sarah, 41, 2nd-time homeowner. Получила quote from licensed electrician for panel upgrade: $3,400. Chувствует что цена overpriced. Скачала FixIt specifically to validate quote ("plumber quoted $800, FixIt said $15 DIY" — тот же TikTok ad что Emma видела).

**Trigger:** Sarah already completed 1st estimate (panel upgrade — FixIt says fair range $2,200-2,800, her quote $600 above). Now she wants to try "Pro Match" feature (Feature #6) to get competing quotes from other licensed electricians.

**Goal:** Convert Sarah via **premium feature gate** — Pro Match with filtered/verified pros is premium-only feature (not included в free tier). Sarah is high-intent (she already sees value, ready to pay to validate).

**Success criteria:** Sarah subscribes to annual tier (her persona strongly prefers annual per USER-PERSONAS) OR purchases $4.99 quote validation pay-per product.

**Expected duration:** 30-90 seconds (Sarah is analytical, reads paywall fully).

**Screens involved:** 4.5 → 4.5.3 → 2.2 → 2.4 → 5.1 → 5.2

### ASCII Diagram

```
[Screen 4.5 Estimate Result — Panel upgrade]
  DIY N/A (licensed work)
  Hybrid N/A (licensed-only)
  Pro $2,200-2,800 (Denver, licensed)
  Sarah's quote: $3,400 ← RED FLAG
  "This quote is $600 above market range"
      ↓ Tap "Pro" card
      ↓
[Screen 4.5.3 Pro Detail]
  Banner: "Get competing quotes from 3 verified pros"
  CTA: "Find me licensed electricians" 🔒 PREMIUM
      ↓ Tap "Find me pros" (premium feature)
      ↓
[Screen 2.2 Context Paywall]   ← DIFFERENT from Flow 3 soft paywall
  🔒 Icon + "Pro Match is a Pro feature"
  "Get 3 verified, vetted pros with competing quotes"
  Visual: mockup of Pro Match UI с 3 pro cards
  
  Benefits:
  ✓ 3 pre-vetted, licensed pros (not random)
  ✓ Competing quotes для your exact job
  ✓ Verified license + BBB badge
  ✓ Background checks + insurance confirmed
  ✓ Plus: unlimited estimates + full history
  
  ┌──────────────────────────────┐
  │  Try Pro — $49.99/year       │  ← ONE dominant option
  │  (= $4.17/mo)                 │
  │  ONE competing quote saves    │
  │  $600 on this repair         │   ← Personalized ROI
  └──────────────────────────────┘
  
  [Small link: Other plans →]
  
  Or: "Just validate this one quote" → $4.99 pay-per
  
  [Not now, thanks]
      ↓ Tap "Try Pro — $49.99/year"
      ↓
[Apple Pay native flow]
      ↓ Success
      ↓
[Screen 2.4 Subscription Confirmed]
  "Welcome to Pro! Now let's find you those pros."
      ↓ Tap "Find My Pros" (auto-continues to Pro Match)
      ↓
[Screen 5.1 Pro List]
  3 pros for Sarah's job:
  ┌─────────────────────────────┐
  │ Mike Chen Electrical         │
  │ ⭐ 4.9 • 127 reviews         │
  │ $2,450 estimated            │
  │ Licensed • BBB A+ • Insured  │
  │ [Request Quote]             │
  └─────────────────────────────┘
  [+ 2 more pros shown]
      ↓ Tap pro of choice
      ↓
[Screen 5.2 Pro Profile]
  Full detail + review samples + availability
      ↓
[FLOW COMPLETE — paid user + engaged with premium feature]
```

### Step-by-step

1. **Entry state:** Sarah already on Screen 4.5 Estimate Result for panel upgrade. FixIt's range ($2,200-2,800) clearly below her quote ($3,400) — emotional hook activated ("overpay concern validated").
2. **Screen 4.5 message:** Red flag banner: "This quote is $600 above market range for Denver licensed electricians." Calls to action: "Find competing quotes" (primary) and "Save this to My Home".
3. **Screen 4.5.3 Pro Detail:** User taps Pro card → expanded detail view. Bottom CTA "Find me licensed electricians" has 🔒 premium lock icon. Tap triggers paywall intent.
4. **Screen 2.2 Context Paywall:** DIFFERENT from Flow 3 soft paywall. Key differences:
   - **Single dominant tier option** (annual only shown prominently) — context paywalls have ONE choice per PAYWALL-RESEARCH §2.4 (Mojo pattern, +15-20% annual uptake).
   - **Feature-specific benefit framing** — focused on Pro Match value (not general subscription).
   - **Personalized ROI framing** — "ONE competing quote saves $600 on this repair" — directly ties subscription cost to Sarah's current scenario ($49.99 vs $600 saved).
   - **Pay-per fallback visible** ("Just validate this quote — $4.99") — for Sarah-segment who hates subscriptions but wants one-off validation.
   - **Easy exit** — "Not now, thanks" (no dark pattern).
5. **Mockup visual:** Context paywall shows a screenshot preview of Pro Match UI (3 pro cards) — teases the unlock. Visual proof of value > copy alone.
6. **Decision branch A (Sarah taps "Try Pro $49.99/year"):** Apple Pay native → Screen 2.4 Subscription Confirmed → auto-routes к Screen 5.1 Pro List (NOT Home — keeps user in original intent flow).
7. **Decision branch B (Sarah taps "$4.99 pay-per quote validation"):** Pay-per checkout → receives validation but NOT ongoing access to Pro Match. Likely converts to subscription within 30 days if first validation proved valuable (25-35% upsell rate per PAYWALL-RESEARCH §9.3).
8. **Decision branch C (Sarah taps "Not now"):** Returns to 4.5.3 Pro Detail. Pro Match CTA remains locked. Sarah can still see FixIt's own price range. No paywall re-exposure for 7 days.
9. **Screen 2.4 Subscription Confirmed:** "Welcome to Pro! Now let's find you those pros." — messaging ties back to original feature intent. Avoids generic "thanks for subscribing" disconnect.
10. **Screen 5.1 Pro List:** 3 pros fetched via Thumbtack Pro API (or Angi fallback). Each card shows: photo, name, rating, review count, estimated cost для THIS specific job (from pro's pricing rules), license status, BBB badge, insurance confirmation.
11. **Screen 5.2 Pro Profile (branch):** User taps a pro → full detail. Review samples, availability calendar, previous similar jobs. CTA "Request Quote" → Flow 7 (affiliate redirect).

### Decision Points / Branches

- **Step 4 paywall:** Annual vs pay-per choice. Sarah-persona research: 70% analytical types prefer pay-per first (test before commit), convert to annual later after positive experience.
- **Step 7 (if pay-per):** After quote validation, upsell prompt on Home: "You've spent $9 in validations. Pro is $49/year — save more?"
- **Step 9 (Screen 2.4):** If user takes a long time на success screen (>10 sec), may trigger "Start exploring!" auto-advance button to prevent confusion.
- **Step 10 (Pro List):** If zero pros available in Sarah's zip (unlikely в Denver but possible in rural), show "No pros yet in your area. Check back in 7 days OR we'll email when available."

### Edge Cases

- **No Thumbtack API data для Sarah's zip:** Fallback to manual directory (top-20 US metros covered manually for MVP). If truly no pros, show apology + "Browse general Denver electricians" external link (unmonetized fallback preserves trust).
- **Pro ghosts Sarah (no response после quote request):** 48hr follow-up "Did Mike Chen reach out?" с alternate pros re-surfaced.
- **Sarah cancels subscription in 30 days:** Access retained через end of period. Win-back "We still have 3 electricians ready to quote you" if she re-opens app later.
- **Sarah on free tier tries Pro Match again після dismiss:** Context paywall re-shown (different messaging variant for re-engagement: "Still paying overpriced? Pro Match finds you better rates").
- **Pro Match requests batched (Sarah wants 2 projects quoted simultaneously):** Premium-only "Multi-project quote request" — MVP shows one at a time, v1.5 adds batching.
- **Quote validator ($4.99 pay-per) without subscription:** Single-use, no access to ongoing Pro Match. Clearly disclosed in pay-per checkout.

### Metrics to Track

| Metric | Target | Notes |
|---|---|---|
| **Pro Match tap rate (among Pro-mode viewers)** | 30% | Feature #6 success criterion |
| **Context paywall conversion (Pro Match trigger)** | 10-15% | Lower than soft paywall, higher LTV |
| **Pay-per quote validation rate** | 5-10% | Fallback option uptake |
| **Pay-per → subscription upsell (30-day)** | 25-35% | PAYWALL-RESEARCH benchmark |
| **Quote request submission rate** | 30% of Pro Match openers | Feature #6 metric |
| **Hire conversion (Thumbtack funnel)** | 50% in 14 days | Thumbtack benchmark |
| **Affiliate revenue per active user** | $0.75-1.50/mo | Feature #6 target |
| **Sarah-segment conversion rate** | 25% | Higher than Emma (28%) because specific intent |

### Related Flows

- **Flow 3 (Soft Paywall)** — alternative monetization path; some users hit soft paywall first, others (Sarah) hit context paywall first. Both use 2.x screen family.
- **Flow 7 (Pro Match → Thumbtack)** — direct continuation after paywall conversion; user enters affiliate redirect flow.
- **Flow 5 (Save to My Home)** — saved quote validation becomes permanent record в Sarah's home profile.

---

## Flow 5: Estimate → Save to My Home → Maintenance Calendar

**User:** Emma, 32, Day 45. Has completed 3 successful DIY repairs (faucet, garage hinge, dishwasher). Wants to start treating her home as a managed entity (retention behavior — high-LTV user signal).

**Trigger:** On Screen 4.5 Estimate Result (just completed 4th estimate for HVAC filter replacement), taps "Save to My Home" button. OR reaches milestone prompt "You've saved 3 projects. Want to set up Maintenance Calendar?"

**Goal:** Convert one-time estimates в managed home profile. Create retention loop through seasonal maintenance reminders. User starts thinking of FixIt as "my home's assistant," not just "quick estimate tool."

**Success criteria:** User creates first entry in Maintenance Calendar (Feature post-MVP v1.5, but MVP-lite version exists as "Save project + reminder" combo). Returns within 30 days via maintenance push notification.

**Expected duration:** 45-90 seconds (multi-step, some text/date entry).

**Screens involved:** 4.5 → 7.1 → 3.2 → 3.3 → 3.5 → 7.2 (push later)

### ASCII Diagram

```
[Screen 4.5 Estimate Result — HVAC filter]
  DIY $18 (filter MERV 11) / Hybrid N/A / Pro $45 service call
  Recommendation: DIY — "Simple, every 3 months"
      ↓ Tap DIY → Screen 4.5.1 Detail
      ↓ Scroll to bottom
      ↓
[Screen 7.1 Save to My Home Modal]
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
[Screen 7.1.1 Confirmation]
  "Saved! We'll remind you Jan 18"
  Haptic feedback + checkmark animation
      ↓ Auto-dismiss 2 sec
      ↓
[Screen 3.2 My Home Timeline]
  All projects listed chronologically
  New entry: "HVAC filter — Oct 18, 2025"
  Status pill: "Scheduled for Jan 18"
      ↓ Tap new entry
      ↓
[Screen 3.3 Project Detail]
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
[Screen 3.5 Maintenance Calendar]
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
[Screen 7.2 Maintenance Reminder Push]
  "Time to change your HVAC filter 🔧"
  "Your last one was 90 days ago. Tap to reorder via Home Depot."
      ↓ Tap push
      ↓
[App opens — direct к Screen 3.3 Project Detail]
  Pre-filled estimate ready
  Shopping list 1-tap reorder
      ↓
[FLOW COMPLETE — retention loop activated]
```

### Step-by-step

1. **Entry state:** Emma на Screen 4.5.1 DIY Detail for HVAC filter replacement. Scrolling through step-by-step guide, reaches bottom.
2. **Screen 7.1 Save to My Home Modal:** Bottom sheet slides up. Key UX elements:
   - **Auto-detected fields** (AI pre-fills to reduce friction):
     - Room: "HVAC / Basement" (inferred from photo analysis)
     - Category: "HVAC maintenance"
     - Recurring checkbox: pre-checked with AI-suggested frequency ("Every 3 months")
     - Next due date: auto-calculated (today + 90 days)
   - **Optional text field** for personal notes (e.g., "bought MERV 13 at Home Depot Lakewood")
   - **Single CTA:** "Save + set reminder" — combines save + reminder action (reduces 2 taps to 1).
3. **Screen 7.1.1 Confirmation:** Micro-confirmation (2 sec auto-dismiss). "Saved! We'll remind you Jan 18." Haptic + checkmark animation — celebratory moment that reinforces behavior.
4. **Screen 3.2 My Home Timeline:** Now includes HVAC entry. Timeline organizes by date, filter by room/category available. Each entry has status pill ("Scheduled", "Done", "Planning"). Empty states for new rooms encourage adding more projects.
5. **Screen 3.3 Project Detail:** User can tap entry для full detail. Fields include:
   - Original photo (thumbnail)
   - AI diagnosis text (preserved from estimate)
   - Original estimate range
   - Input: "What you actually paid" (crowd-sources accuracy data)
   - Notes (freeform)
   - Before/after photo uploads
   - Optional: Warranty expiration (30/60/90 day or custom)
   - Maintenance schedule (editable)
   - Outcome status: Completed / In progress / Abandoned
6. **Screen 3.5 Maintenance Calendar:** Tap calendar icon top-right of Project Detail. Month view of all recurring/scheduled maintenance. AI-suggested seasonal items auto-appear (gutters in fall, AC service in spring) with "Add to my home?" prompt. User can dismiss suggestions.
7. **Push notification (later, 90 days):** Screen 7.2 triggers as scheduled. Push message персонализирован ("Your last one was 90 days ago"). Tap opens app directly to 3.3 Project Detail с pre-filled quick-action "Reorder filter via Home Depot" (affiliate link).
8. **Flow complete.** Emma now in retention loop. Each maintenance cycle reinforces FixIt as "home's assistant."

### Decision Points / Branches

- **Step 2 (Save modal):** User can edit auto-detected room tag (e.g., "This goes in 'Utility' not 'HVAC'"). Crowd-sources taxonomy for AI improvement.
- **Step 2 (recurring checkbox):** Default checked for maintenance items (HVAC, gutters, smoke detector batteries). Unchecked for one-time repairs (leak fix, hinge squeak) — smart defaults reduce cognitive load.
- **Step 5 (Project Detail):** "What you actually paid" is opt-in, never required. 20% target fill rate — valuable data for improving estimates for other users (crowdsourced pricing).
- **Step 6 (Maintenance Calendar):** AI-suggested seasonal items can be individually accepted/dismissed. Overly pushy = user disables feature.
- **Step 7 (push):** Push timing per ONBOARDING-RESEARCH §6.4 — 19:30-20:30 weekday (Emma window), never 22:30-06:30.

### Edge Cases

- **User on free tier (projects limit 5):** After 5th save, bottom sheet shows "You've saved 5 projects (free limit). Upgrade for unlimited tracking." Routes to Screen 2.2 Context Paywall (Save project variant).
- **User saved но never completes project:** 30-day stale check: "Still planning to fix HVAC filter?" → snooze / abandon / mark complete prompt.
- **User uploaded wrong photo to project (typo during save):** Edit flow on 3.3 Project Detail allows photo replacement + re-run AI analysis.
- **Maintenance reminder while user on vacation:** Snooze options in push (1 week / 1 month). Smart reschedule rather than hard miss.
- **Multiple family members сохраняют overlapping projects:** MVP single-user — post-MVP v1.5 multi-user (household). Now: single account only.
- **User's maintenance schedule conflicts with pro availability:** Calendar shows both — "filter due Jan 18, but pro unavailable until Jan 22" with reschedule suggestions.
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

### Related Flows

- **Flow 2 (Returning User)** — user returning via maintenance push re-enters Flow 2 directly (skip onboarding, direct to estimate).
- **Flow 4 (Context Paywall)** — free user saving 6th project hits Save-trigger paywall.
- **Flow 6 (Share)** — completed maintenance projects (with before/after photos) are prime share candidates.

---

## Flow 6: Estimate → Share Social (Viral Loop)

**User:** Emma, 32, just finished 4th estimate (bathroom tile replacement). DIY option $85 vs contractor $750. "Wait, this is insane saving — let me tell Jessica." Emma shares to Instagram Stories.

**Trigger:** On Screen 4.5 Estimate Result or Screen 4.5.1 DIY Detail, user taps "Share" icon (top-right of screen). Emotional moment — contrast between DIY and Pro price creates impulse to share.

**Goal:** Drive viral acquisition via user-generated shares. Each Emma-share seeds 2-3 installs (target per USER-PERSONAS viral coefficient). Primary growth channel alongside paid acquisition.

**Success criteria:** User completes share to at least one platform (Instagram/TikTok/iMessage). Share card posts. New user taps link in share → install → enters Flow 1 with attribution tag.

**Expected duration:** 20-40 seconds.

**Screens involved:** 4.5 → 6.1 → 6.2 → 6.3

### ASCII Diagram

```
[Screen 4.5 Estimate Result — Bathroom tile]
  DIY $85 / Hybrid $220 / Pro $750
  "Save $665 by DIY!" contrast banner
      ↓ Tap Share icon (top-right)
      ↓
[Screen 6.1 Share Card Preview]
  Dynamic generated card:
  ┌──────────────────────────────┐
  │  FixIt                        │
  │  Home Repair Cost Advisor     │
  │                               │
  │  💰 I just saved $665         │
  │     on a bathroom repair      │
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
[Screen 6.2 Native Share Sheet]
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
  Emma adds sticker "Recommend this!"
  Taps "Share to Story"
      ↓
[Back to FixIt]
      ↓
[Screen 6.3 Post-share Confirmation]
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
3. **Screen 6.1 Share Card Preview:** Dynamic card generated based on current estimate. Key elements:
   - **FixIt branding** (logo + tagline)
   - **Personalized savings claim** — "I just saved $665"
   - **Contrast numbers** — Pro quote vs DIY cost (visceral impact)
   - **Value callouts** — "Materials at Home Depot" + "Step-by-step guide"
   - **CTA** — "Get FixIt → fixit.app" (short URL для virality)
   - **Privacy options**:
     - Hide my photo (default: off — but available for Sarah-types uncomfortable with photo exposure)
     - Hide specific $ amount (default: off — but available for privacy)
     - Include referral code (default: ON — drives viral loop)
4. **Customize option:** Power users can tweak card (accent colors, headline variants). Most skip (90%+) — default works.
5. **Screen 6.2 Native Share Sheet:** Tap "Share" triggers iOS/Android native share sheet. Emma picks Instagram Stories (TARGET-AUDIENCE confirms Instagram = Emma's primary).
6. **Instagram integration:** FixIt passes card image + deep-link URL к Instagram. Emma can add stickers, text overlays, music in IG (native flow — FixIt doesn't interfere).
7. **Post completion:** Emma posts Story. Instagram closes, returns to FixIt.
8. **Screen 6.3 Post-share Confirmation:** Micro-celebration. Haptic + "Shared! 💜". Secondary messaging: "Your share could help 3 friends save money" (social impact framing) + "Refer a friend — get 1 month Pro free" (direct incentive).
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
  - **TikTok:** high-virality (5% but highest reach per share)
  - **Twitter/X:** low volume for Emma segment (3%)
  - **Copy link:** Mike/analytical persona fallback (2%)
- **Step 9 attribution:** Deep-link via branch.io or Apple Smart App Banner. Falls back к App Store search if link expired.
- **If Emma shares from Hybrid or Pro card (not DIY):** Different headline — "FixIt helped me vet a fair quote" (Sarah variant). Smart copy per selected mode.
- **If Emma doesn't have Instagram:** Share sheet shows OS default options (SMS, email, other). No hard dependency on IG.

### Edge Cases

- **Photo contains PII (person's face, home address, etc.):** AI auto-crops to damage area only. Pre-share "We removed personal details from photo" confirmation.
- **Share card generation fails (server timeout):** Fallback to text-only share "I saved $665 on a home repair with FixIt. Try it: fixit.app". Reduced visual impact but still viral.
- **Emma tries to share but has no referral code (edge case for new signups):** Generated just-in-time (EMMA-[random 4 char]). Backfilled if account deletes later.
- **Negative estimate (Pro quote was FAIR — Sarah scenario):** Different share framing — "FixIt confirmed my $3,400 quote was fair. No surprises." Validates system honesty.
- **User shares multiple times within 1 hour:** Detect and throttle — "Shared 3 times today. Cooldown for more later." Prevents spam.
- **Share link clicked но no install (Jessica busy):** Link tracked via browser cookie, attribution persists 7 days if Jessica installs later.
- **User opts out of attribution tracking:** Privacy setting in Settings disables referral codes. Still allows share, but no attribution benefit.

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

### Related Flows

- **Flow 1 (First-time Install)** — referred installs enter Flow 1 with attribution badge.
- **Flow 3 (Free → Paid)** — referred users have higher conversion (trust-primed).
- **Flow 2 (Returning User)** — shares often happen on 2nd+ estimates (repeat wow moments).

---

## Flow 7: Pro Match → Thumbtack Affiliate Redirect (Monetization)

**User:** Emma, 32, Day 22. Completed 5 DIY estimates, hit paywall, subscribed to annual tier (Flow 3). Now faces a repair beyond her skill — main electrical panel showing signs of failure (buzzing, occasional flicker). This is NOT a DIY situation (licensed work + safety). She selects Pro mode.

**Trigger:** On Screen 4.5 Estimate Result, user taps Pro card → Screen 4.5.3 → "Find me a pro" button (now unlocked by subscription).

**Goal:** Connect Emma to a vetted local licensed electrician via Thumbtack affiliate API. Generate $15-40 affiliate revenue for FixIt while providing Emma value (3 verified pros с competing quotes, vs DIY calling 10 contractors).

**Success criteria:** Emma successfully submits a quote request to at least one pro via Thumbtack API. Attribution logged. Emma's journey continues on Thumbtack side (hired pro within 14 days — 50% target per Thumbtack benchmark). FixIt earns affiliate commission $15-40.

**Expected duration:** 2-5 minutes (decision-heavy step).

**Screens involved:** 4.5 → 4.5.3 → 5.1 → 5.2 → 5.3 → 5.4 (Thumbtack external) → 3.1

### ASCII Diagram

```
[Screen 4.5 Estimate Result — Electrical panel]
  DIY N/A (licensed + safety — red-flag category)
  Hybrid N/A (licensed-only)
  Pro $1,800-2,400 (Denver, 200-amp upgrade)
  Safety banner: "⚠️ Licensed work — permit required"
      ↓ Tap Pro card
      ↓
[Screen 4.5.3 Pro Detail]
  Safety-forward messaging:
  "Electrical panel upgrades require licensed pros"
  "Average Denver cost: $1,800-2,400"
  CTA: "Find me 3 licensed electricians"
      ↓ Tap CTA (Pro subscription unlocks)
      ↓
[Screen 5.1 Pro List]
  Header: "3 verified licensed electricians для your job"
  ┌──────────────────────────────┐
  │ 📷 Mike Chen Electrical       │
  │ ⭐ 4.9 (127 reviews)          │
  │ 💰 Est: $1,950                │
  │ 🎖 Licensed • BBB A+ • Insured│
  │ 📅 Available: Tuesday 2-4pm   │
  │ [Request Quote]               │
  └──────────────────────────────┘
  ┌──────────────────────────────┐
  │ 📷 Kirra Electrical Services  │
  │ ⭐ 4.8 (89 reviews)           │
  │ 💰 Est: $2,100                │
  │ [Request Quote]               │
  └──────────────────────────────┘
  ┌──────────────────────────────┐
  │ 📷 AllSafe Electric           │
  │ ⭐ 5.0 (34 reviews)           │
  │ 💰 Est: $2,280                │
  │ [Request Quote]               │
  └──────────────────────────────┘
  Sort: Best match / Price / Availability / Rating
  Filter: Zip radius / License tier
      ↓ Tap Mike Chen card
      ↓
[Screen 5.2 Pro Profile]
  Full profile:
  - Cover photo + portfolio gallery
  - Bio: "15 years in Denver metro"
  - License number + verify link
  - BBB badge (clickable)
  - Insurance confirmation
  - 10 review samples
  - Previous similar jobs (blur client names)
  - Availability calendar (7 days)
  - Response time: "Avg 2 hours"
      ↓ Tap "Request Quote"
      ↓
[Screen 5.3 Quote Request Form]
  Pre-filled with FixIt context:
  ✓ Photo attached (panel photo)
  ✓ Diagnosis: "200A panel upgrade needed"
  ✓ ZIP: 80203 Denver
  ✓ Quality tier: Mid
  ✓ Urgency: "Within 2 weeks"
  User adds:
  - Preferred callback time
  - Additional notes (optional)
  - Phone (optional — email default)
  CTA: "Send request to Mike Chen"
      ↓ Tap "Send request"
      ↓
[Screen 5.4 Thumbtack Redirect]
  "Sending to Mike Chen..."
  → API call: POST Thumbtack /leads
  → Includes attribution: source=fixit, user_id, estimate_id
  → Response: lead_id for tracking
      ↓ Success
      ↓
[In-app confirmation]
  "✅ Request sent to Mike Chen"
  "He typically responds in 2 hours"
  "You'll get notification when he replies"
  
  Options:
  - [Request from Kirra too] (multi-quote strategy)
  - [View in My Projects] → 3.3
  - [Back to Home] → 3.1
      ↓ Tap "Back to Home"
      ↓
[Screen 3.1 Home Dashboard]
  New project card: "Panel upgrade — waiting for pro"
  Status: "Quote pending from Mike Chen"
      ↓
[FLOW COMPLETE — affiliate attribution live]

--- 48 HOURS LATER ---
      ↓
[Push notification]
  "Mike Chen responded to your quote 📩"
      ↓ Tap push
      ↓
[Screen 3.3 Project Detail with pro response]
  Mike's detailed quote: $1,975 (3-day job)
  Options: [Accept], [Decline], [Ask question]
      ↓ If accepts → Thumbtack payment flow
      ↓ → FixIt earns $15-40 affiliate commission
      ↓
[Lifecycle continues on Thumbtack]
```

### Step-by-step

1. **Entry state:** Emma on Screen 4.5 для electrical panel. Critical feature: DIY option is DISABLED (Feature #3 safety rail per DOMAIN-DEEP-DIVE §6 — licensed-work flagging). Only Pro option viable. Red flag banner visible.
2. **Screen 4.5.3 Pro Detail:** Safety-forward messaging ("Licensed work — permit required"). Average Denver cost shown. CTA "Find me 3 licensed electricians" (already unlocked за счёт subscription).
3. **Screen 5.1 Pro List:** API call к Thumbtack Pro API (или Angi fallback). Returns 3 top-matched pros for electrical panel upgrade в 80203. Each card displays:
   - Profile photo
   - Name + business
   - Star rating + review count (>10 reviews threshold)
   - Estimated cost для THIS specific job (Thumbtack pricing API)
   - Credentials: Licensed + BBB badge + Insurance
   - Availability (next open slot)
   - Single CTA "Request Quote"
4. **Sort/filter:** Emma можно Sort by price (lowest first), availability (earliest), rating (highest). Filter by zip radius или license tier. Default "Best match" = Thumbtack's proprietary score.
5. **Screen 5.2 Pro Profile:** Emma taps Mike Chen Electrical. Expanded profile:
   - Cover + portfolio photos (previous jobs)
   - Bio paragraph
   - License number (clickable — external verify link to Colorado DORA)
   - BBB badge (clickable — external BBB profile)
   - Insurance confirmation (general liability + workers comp)
   - 10 recent review samples (full text)
   - Similar job history (panel upgrades w/ anonymized details)
   - 7-day availability calendar
   - Response time SLA ("Avg 2 hours")
6. **Screen 5.3 Quote Request Form:** Pre-filled с FixIt context (photo, diagnosis, zip, quality tier) — reduces friction for Emma, reduces pro's time-to-quote. User adds preferred callback time + optional notes + phone/email preference. CTA "Send request to Mike Chen".
7. **Screen 5.4 Thumbtack Redirect:** API call to Thumbtack Pro API. Payload includes:
   - Attribution: `source=fixit`, `user_id=emma_xxx`, `estimate_id=est_xxx`
   - Context: photo URL, diagnosis, zip, quality tier, urgency, notes
   - Contact: Emma's preferred method
   - Webhook: FixIt's webhook для tracking pro response + hire conversion
8. **In-app confirmation:** "Request sent to Mike Chen" + expected response time. Secondary options:
   - "Request from Kirra too" (multi-quote strategy — Emma gets competing quotes)
   - "View in My Projects" (project card includes pending quote status)
   - "Back to Home"
9. **Return to Home:** Project card on 3.1 timeline shows "Panel upgrade — waiting for pro" with status pill "Quote pending from Mike Chen".
10. **48 hours later (async):** Mike Chen responds via Thumbtack API. Webhook fires → FixIt sends push notification to Emma. Emma taps push → 3.3 Project Detail with pro response (quote $1,975, 3-day job). Emma accepts → Thumbtack payment flow takes over (FixIt gracefully exits once lead is qualified).
11. **Affiliate attribution:** FixIt webhook logs hire conversion. Thumbtack pays $15-40 per qualified lead. Revenue recorded в Supabase.
12. **Flow complete.** Emma has hired Mike Chen (off-app experience). FixIt retained её project в My Home timeline for future reference.

### Decision Points / Branches

- **Step 3 (Pro List):** Emma can request quotes from multiple pros simultaneously (2-3 is typical best practice). Each request = separate attribution to Thumbtack.
- **Step 6 (Quote Request):** If Emma wants to skip sending = "Save for later" (adds pros to her favorites without sending). Preserves choice fatigue escape.
- **Step 7 (Thumbtack API):** If Thumbtack API fails → fallback к Angi Leads API. If both fail → manual directory (top-20 metros — Denver covered). Worst case: external link out to Google search (unmonetized but preserves user trust).
- **Step 10 (pro response):** If Mike Chen ghosts (no response in 48hr) → automated follow-up push "Mike didn't reach out — try Kirra?" with alternate pro re-surfaced.
- **Emergency category (e.g., burst pipe):** Different flow — all 3 pros contacted simultaneously + "urgent" flag sent to pros (expected 1-hour response SLA). Pros opt into emergency queue separately.

### Edge Cases

- **No pros available в Emma's zip (rural):** Expand radius 30mi → if still zero, fallback message "Nearest pros 45 miles away. We'll email when closer pros join." Captures email + retains trust.
- **Pro accepts но later cancels:** FixIt notified via webhook → push to Emma "Mike cancelled — here are 2 replacement pros" with pre-filled context preserved.
- **Pro quotes significantly higher than FixIt estimate (±50%):** Banner warning "This quote is $X above market — consider additional quotes" — maintains FixIt's "fair price" positioning.
- **Emma reports pro no-show или bad experience:** Feedback form in 3.3 Project Detail. FixIt can de-list pro if pattern emerges (data quality lever).
- **Attribution dispute (pro claims FixIt didn't send lead):** Webhook + timestamp + user_id audit trail. Thumbtack dashboard confirms.
- **User on free tier clicks "Find me pros":** Routes к Flow 4 Context Paywall first. Post-subscription, resumes at step 3.
- **International user:** "Pros currently US-only. International expansion в v2.0" + waitlist.
- **Licensed vs unlicensed pro filtering:** MVP all Thumbtack pros must be licensed для electrical/plumbing/gas categories. Handyman category допускает unlicensed.

### Metrics to Track

| Metric | Target | Rationale |
|---|---|---|
| **Pro Match tap rate (among Pro viewers)** | 30% | Feature #6 target |
| **Pro List → Pro Profile tap** | 65% | Engagement depth |
| **Pro Profile → Quote Request submit** | 45% | Primary conversion |
| **Quote requests per user (avg)** | 1.8 | Multi-quote adoption |
| **Pro response rate (within 48hr)** | 80% | Thumbtack SLA |
| **Hire conversion (quote → paid)** | 50% in 14 days | Thumbtack benchmark |
| **Affiliate revenue per active user** | $0.75-1.50/mo | Feature #6 target |
| **Attribution accuracy** | >95% | Technical integrity |
| **Emergency category response time** | <1 hour | SLA для burst pipe/no-heat |
| **User NPS for Pro Match** | >40 | Feature #6 success |
| **Pro NPS (pros rate FixIt lead quality)** | >40 | Retention of pro supply side |

### Related Flows

- **Flow 4 (Context Paywall)** — pre-requisite for free users; Pro Match is premium-gated.
- **Flow 5 (Save to My Home)** — Pro Match projects auto-save to timeline for tracking.
- **Flow 2 (Returning User)** — post-hire, user may return for follow-up project или maintenance scheduling (HVAC tune-up after electrical upgrade).

---

## Cross-Flow Dependency Graph

Диаграмма показывает how flows connect в lifecycle:

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
       (hit quota)  │          │  (save to home)
                    ↓          ↓
      ┌─────────────────┐  ┌──────────────────┐
      │ Flow 3: Soft    │  │ Flow 5: Save →   │
      │ Paywall         │  │ Maintenance Loop │
      └────────┬────────┘  └────────┬─────────┘
               │                    │
               ↓                    ↓
      ┌─────────────────┐          │
      │ Subscribed user │          │
      └────────┬────────┘          │
               │                    │
    ┌──────────┼──────────┐        │
    │          │          │        │
    ↓          ↓          ↓        │
┌─────────┐ ┌──────┐ ┌──────────┐ │
│Flow 4:  │ │Flow 6│ │Flow 7:   │ │
│Context  │ │Social│ │Pro Match │ │
│Paywall  │ │Share │ │Affiliate │ │
│(if ever │ │      │ │          │ │
│hit)     │ │      │ │          │ │
└─────────┘ └──┬───┘ └────┬─────┘ │
               │          │        │
               ↓          ↓        ↓
         [Viral K=0.3] [Revenue] [Retention]
```

**Primary lifecycle progression:**
- Flow 1 (acquire) → Flow 2 (re-engage) → Flow 3 (monetize)
- Flow 5 (retain) supports all other flows via saved projects
- Flow 6 (viral) и Flow 7 (affiliate) are parallel monetization + growth channels

**Revenue streams по flows:**
- Flow 3 soft paywall: 55% of total subscription revenue
- Flow 4 context paywall: 30% of total subscription revenue
- Flow 7 Pro Match affiliate: $0.75-1.50/user/month (separate from subscription)
- Flow 6 virality: indirect (reduces CAC by 20-30%)

---

## Flow Completion Metrics Summary

| Flow | Primary conversion metric | Target | Current industry benchmark |
|---|---|---|---|
| **Flow 1: First Estimate (Aha)** | Install → Estimate Result | **75%** | PictureThis 85% |
| **Flow 2: Returning User** | Day 30 return rate | **35%** | Utility apps 40% |
| **Flow 3: Soft Paywall** | Paywall → Paid conversion | **22%** | PictureThis 20% |
| **Flow 4: Context Paywall** | Trigger → Paid conversion | **12-15%** | Apphud 10-15% |
| **Flow 5: Save + Maintenance** | Return via push (D90) | **15-20%** | — |
| **Flow 6: Social Share** | Viral K-factor | **0.3** | Calm K=0.25 |
| **Flow 7: Pro Match** | Hire conversion | **50%** | Thumbtack benchmark |

---

## Testing & Validation

### Pre-launch usability testing

Перед v1.0 ship, валидировать каждый flow через:

- **10 beta Emmas** для Flow 1 — benchmark <90 sec to aha.
- **5 beta Mikes** для Flow 2 — benchmark 30-45 sec 2nd estimate.
- **10 beta users** на Flow 3 paywall UX — A/B first exposure copy variants.
- **5 Sarah-type users** на Flow 4 context paywall — measure ROI framing resonance.
- **5 Emmas + 5 Mikes** на Flow 5 maintenance calendar — feature discovery test.
- **5 Emmas** на Flow 6 share UX — what privacy defaults fit their comfort?
- **5 users** на Flow 7 Pro Match full funnel — partnership validation.

### Post-launch A/B test priority

Tied directly к PAYWALL-RESEARCH §10 и ONBOARDING-RESEARCH §9:

1. Flow 3 tier pricing ($4.99 vs $7.99 vs $9.99 monthly)
2. Flow 1 camera permission priming copy
3. Flow 3 paywall CTA copy ("Unlock Unlimited" vs "Start Saving")
4. Flow 4 context paywall single vs multi-tier
5. Flow 6 share card templates (before/after vs savings vs contrast)
6. Flow 5 save modal auto-suggestions accuracy

---

## Related Docs

- [SCREEN-MAP.md](./SCREEN-MAP.md) — pixel-level wireframes per screen
- [FEATURES.md](../02-product/FEATURES.md) — 10 MVP features с RICE scores
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — Emma / Mike / Sarah / Tyler / Ronald profiles
- [ONBOARDING-RESEARCH.md](../03-practices/ONBOARDING-RESEARCH.md) — Flow 1 deep research
- [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) — Flows 3, 4 monetization detail
- [RETENTION-RESEARCH.md](../03-practices/RETENTION-RESEARCH.md) — Flow 5 retention loop detail
- [MONETIZATION.md](../02-product/MONETIZATION.md) — Flow 7 affiliate model
- [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) — principles guiding flow design

---

**Дата последнего обновления:** 2026-04-18
**Статус:** Draft v1.0 готов к review
**Следующий шаг:** SCREEN-MAP.md — pixel wireframes для всех 30+ unique screens
**Approval needed:** Лана + Amanda
