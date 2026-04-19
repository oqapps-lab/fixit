---
Проект: FixIt — AI home repair cost advisor
Дата: 2026-04-18
Статус: Draft v1.0
Автор: Product Team
Stage: Product Definition (Stage 2)
---

# FEATURES.md — FixIt

**Companion docs:** [RESEARCH-BRIEF.md](../01-research/RESEARCH-BRIEF.md) | [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) | [DOMAIN-DEEP-DIVE.md](../01-research/DOMAIN-DEEP-DIVE.md) | [COMPETITOR-ANALYSIS.md](../01-research/COMPETITOR-ANALYSIS.md)

---

## Overview

FixIt — это фотокамера ремонта. Пользователь (Emma, first-time homeowner) фотографирует протечку / трещину / сломанную мебель → AI за 10 секунд определяет проблему → выдаёт **три варианта** (DIY / Hybrid / Full Pro) с реальными ценами материалов из retailer API и labor rates для её zip-кода.

**MVP (v1.0)** — 10 фич, 4–6 месяцев с командой 2 человека + Claude Code. Фокус 100% на Emma. Top-30 категорий repair (не "infinite encyclopedia"). **Subscription-only monetization** (sub + pay-per fallback + Amazon Associates bonus). **NO partnerships, NO SKU curation, NO web scraping, NO affiliate marketplace in MVP.** Claude API делает всю heavy lifting: photo ID, cost estimation, DIY guides, material recommendations.

**Rescope decision (2026-04-19):** изначальный план включал Thumbtack/Angi/HomeAdvisor affiliate partnerships + Home Depot API + SKU curation + RSMeans subscription. Для Лана-solo-dev это блокеры. Variant C rescope (AI does everything) ships faster (4 vs 6-8 months), zero partnership risk, zero content curation workload. Trade-off: lose ~$8-15/user/yr affiliate revenue, gain 2+ months and 100% operational simplicity. Partnerships return как v1.5+ post-PMF feature. See MONETIZATION.md §7 for full change log.

**Post-MVP (v1.5–v3.0)** — expansion personas (Mike / Sarah / Tyler / Ronald), AR-интеграция, voice input, B2B tier, международное расширение.

Приоритизация по **RICE score** (Reach × Impact × Confidence / Effort). Целевые scores: >80 = MVP must-have, 40–80 = MVP nice-to-have, <40 = post-MVP.

---

## MVP (v1.0) — 10 Features (priority order by RICE)

### Feature #1: Photo Intake + AI Identification

**User story:**
> Как Emma, я хочу сфотографировать проблему в доме (протечку крана, трещину в стене, сломанную петлю шкафа), чтобы AI за 10 секунд сказал мне, что это такое и насколько серьёзно.

**What it does:**
- Большая центральная кнопка "Take a photo" на главном экране (1-tap entry)
- Camera UI с grid overlay + guidance ("show the whole area", "get close to damage")
- Поддержка до 3 фото одной проблемы (different angles)
- Upload from gallery как fallback (renters не всегда могут фоткать "прямо сейчас")
- AI classifies проблему в одну из 30 MVP-категорий + severity score (cosmetic / functional / urgent / emergency)
- Returns human-readable diagnosis: "Leak from P-trap under sink. Not emergency, but fix в течение 48 часов чтобы предотвратить mold."

**Technical approach:**
- **Claude Haiku Vision** (primary — cheapest at $0.003/inference) с structured prompt library для top-30 категорий
- Fallback к **Claude Sonnet Vision** если confidence < 70% (better accuracy at 3-5× cost)
- Prompt engineering: chain-of-thought "observe → classify → severity → next steps" pattern
- Image pre-processing: auto-rotate, compress, EXIF strip для privacy
- Mock data в `/mock/photo-analysis/` до Stage 6 (per CLAUDE.md rules)

**RICE:**
- **Reach:** 100% users (core entry point — no one uses FixIt without taking photo)
- **Impact:** 3 (massive — это the core product, без этого нет value prop)
- **Confidence:** 90% (Claude Vision proven tech, PictureThis validated similar mechanic at $200M ARR scale)
- **Effort:** 3 weeks (Medium — prompt engineering + 30 categories × 3-5 examples каждая = sizable dataset curation)
- **Score: 100 × 3 × 0.9 / 3 = 90**

**Edge cases:**
- Blurry photo / low light → AI returns "I can't see clearly — retake with more light" с sample photo guidance
- Multiple problems в одном фото → "I see both a cracked tile AND water staining. Which do you want to focus on?"
- Not-a-repair photo (cat, selfie, random scene) → "This doesn't look like a home repair issue. Try photographing the specific damage."
- Out-of-scope category (e.g. car repair, medical) → gentle redirect "FixIt focuses on home repairs. For this, try [relevant alternative]."
- AI uncertain (confidence 50-70%) → "I think this might be X or Y. Can you describe what happened?"

**Success criteria:**
- 80%+ accurate categorization for top-30 repair types (validated via user feedback loop)
- <10 seconds analysis time p95
- Retake rate <15% (проксируем user satisfaction with first photo result)
- NPS для photo accuracy > 40

**Dependencies:** Claude API setup, prompt library, 30-category taxonomy finalized, image upload infrastructure (Supabase Storage)

---

### Feature #2: Contextual Intake Questions

**User story:**
> Как Emma, после фото я хочу ответить на 3–4 быстрых вопроса (zip, quality tier, DIY comfort), чтобы получить персонализированный estimate а не generic "$100-$500".

**What it does:**
- После photo analysis — conversational form с 3–4 questions максимум
- **Q1: Region** — auto-detect zip из device location (with permission), fallback к manual entry. Zip-level precision критичен (SF vs Memphis — 2× цена разница, per DOMAIN-DEEP-DIVE §1.3)
- **Q2: Quality tier** — "Budget / Mid / Premium" с explain tooltip ("Budget = minimal lasting fix, Mid = standard repair, Premium = best materials, longest lasting")
- **Q3: DIY readiness** — "Never / Some / Confident DIYer" с emoji scale
- **Q4 (optional, AI decides):** "Is this a rental?" (unlocks tenant flow for Tyler segment post-MVP)
- Вопросы adapt к категории — например, для toilet repair NOT задаём про quality tier
- Skippable questions get sensible defaults (mid-tier + some DIY experience = middle-of-road estimate)

**Technical approach:**
- React Native conversational form component (stepper pattern)
- `Expo Location` для zip auto-detect
- Zip → region mapping через lightweight lookup table (MVP) → US Census ZCTA data
- Intake answers pass к Cost Estimate Engine (Feature #3) как structured params
- Local state (no server roundtrip for intake — only когда compute estimate)

**RICE:**
- **Reach:** 100% users (every estimate нужно persona + region context)
- **Impact:** 2.5 (без этого estimate был бы "generic $$" без regional precision — снижает trust dramatically)
- **Confidence:** 95% (straightforward UX pattern, zip-based pricing is industry standard per HomeWyse/Fixr)
- **Effort:** 1 week (Small — UI component + zip lookup + state management)
- **Score: 100 × 2.5 × 0.95 / 1 = ~238** (но effective RICE capped at product-level; practical value: must-have прямо after photo)

**Edge cases:**
- User denies location permission → manual zip entry с graceful "We need this для accurate pricing"
- Invalid zip (5 digits but not real) → validation error
- International zip (Canada, UK) → "FixIt is US-only in v1. Sign up для waitlist для your region" (soft gate)
- User at office, problem at home → manual zip override
- Apartment / rental context → skip "quality tier" (landlord chose materials) and flag as tenant scenario

**Success criteria:**
- 90%+ completion rate (не drop-off на intake)
- <30 seconds average time to complete
- Zip captured для 95%+ estimates (auto-detect + manual combined)

**Dependencies:** Feature #1 (photo first), Expo Location API, zip database, persona logic

---

### Feature #3: Cost Estimate Engine — 3-Mode Output (DIY / Hybrid / Pro)

**User story:**
> Как Emma, я хочу увидеть три чётких варианта ("сделай сам за $15", "ты купи — мастер поставит за $95", "профи за $275"), чтобы сравнить и выбрать по ситуации.

**What it does:**
- Outputs три cards on single scrollable screen:
  - **DIY mode:** Material cost ($X from Home Depot in your zip) + time estimate + difficulty rating (1–5) + confidence prediction ("7/10 for beginner")
  - **Hybrid mode:** Material cost (you buy) + handyman install cost (local labor rate × estimated time) + total
  - **Full Pro mode:** All-in range from 3+ local pros ("$175–$275 for licensed plumber in Denver 80203")
- Visual hierarchy — default recommended mode based on Q3 (DIY comfort): "Never" → Pro pre-selected, "Confident" → DIY pre-selected
- Fair-price calibration box: "If a pro quoted you more than $X, that's above market." (Critical for Sarah persona — validation against rip-off)
- "When in doubt call a pro" safety rail для gas/electrical/structural/load-bearing (red flag categories per DOMAIN-DEEP-DIVE §6)

**Technical approach (AI-only, no partnerships):**
- **Claude API generates entire estimate** in one structured prompt — no external APIs, no SKU database, no scraping, no manual curation.
- **Prompt structure:** photo + identified problem + user context (zip, quality tier, DIY level) → Claude returns JSON с three modes (DIY/Hybrid/Pro) each with cost range, time estimate, confidence, rationale.
- **Pricing source = Claude's training knowledge** + optional tool use (Claude can perform web search for current Home Depot/Lowe's material prices if needed, but not required — training knowledge is accurate to ±25% for common repairs).
- **Labor rates source = BLS OEWS public CSV** (free, refreshed annually) + Claude's knowledge of regional variation. No Thumbtack/Angi integration.
- **Regional accuracy:** Claude is given zip code в prompt, uses its training + BLS data for regional cost adjustment. SF plumber ≠ Memphis plumber, Claude knows this pattern.
- Estimate computed server-side (Supabase Edge Function calls Claude API) — client gets ready JSON, no pricing logic exposed.
- **Caching:** same category × same zip cached 24hr (reduces Claude API load + faster UX).

**RICE:**
- **Reach:** 100% users (every photo → estimate)
- **Impact:** 3 (THE value prop — this is what users pay for; competitor gap #1 per COMPETITOR-ANALYSIS)
- **Confidence:** 85% (Claude's training accurate to ±25% for common repairs; no partnership dependencies to break; fallback to web search for edge cases)
- **Effort:** 2 weeks (Medium — prompt engineering + JSON schema + caching + edge function logic + testing; much smaller than original 4 weeks because no API integration)
- **Score: 100 × 3 × 0.85 / 2 = ~128**

**Edge cases:**
- Rare / unusual repair not in Claude's training → Claude returns "Confidence low — this is my best estimate but recommend quote from pro" flag
- No clear DIY path (pro-only work like gas line, panel upgrade) → DIY mode grayed out, "Licensed work — permit required" messaging
- Claude hallucinates / returns inconsistent values → JSON schema validation + sanity bounds (min/max cost) + regenerate on fail
- Material prices shift over time → Claude given "as of DATE" timestamp in prompt, output includes "prices approximate, check current"
- User in non-US region → Claude given country code, adjusts for UK/Canada/Australia pricing patterns (still ±25% accuracy)
- Emergency category (burst pipe, smoking outlet) → Claude prompt flags "URGENT — call pro now, DIY not recommended"

**Success criteria:**
- Estimate within ±25% of actual paid cost (crowd-sourced validation post-completion)
- 70%+ users rate estimate "helpful" or "very helpful"
- Mode-selection distribution: 40% DIY / 25% Hybrid / 35% Pro (healthy spread indicates people use all options)
- Estimate-to-action conversion: 50%+ users do something within 24hr (buy materials / call pro / share)

**Dependencies:** Features #1, #2; Claude API (primary) + BLS OEWS CSV (one-time download, free), Supabase Edge Functions, JSON schema validator

---

### Feature #4: Material Shopping List (AI-generated + Amazon deeplinks)

**User story:**
> Как Emma в DIY-mode, я хочу одним тапом увидеть shopping list с названиями материалов, approximate ценами, и кнопкой "искать на Amazon / Home Depot / Lowe's", чтобы купить нужное без 3 поездок.

**What it does:**
- After DIY-mode estimate, a "Shopping list" sheet opens с 3-8 recommended items
- Each item: **generic product name** + quantity + approximate price range + suggested retailer search
- **Three retailer action buttons per item:** "Search Amazon" (Amazon Associates deeplink — our only affiliate) + "Search Home Depot" (simple web search link) + "Search Lowe's" (simple web search link)
- Copy-to-clipboard full list для Apple Reminders / Google Keep export
- "What you already own" — checkbox items (plumber's tape, pliers, basic tools) чтобы Mike not re-buy existing tools
- Approximate total cost summary at bottom

**Technical approach (AI-only):**
- **Claude API generates list** as part of estimate response — given the identified problem + DIY path, Claude returns structured items array with name, quantity, price_range, category
- **No SKU table, no product API, no curation.** Claude knows что O-ring kit для kitchen faucet стоит $5-10, что plumber's tape ~$3, etc. from training.
- **Retailer search links are pure URL construction:** `amazon.com/s?k=kitchen+faucet+cartridge+kit&tag=OUR_AFFILIATE_TAG` (Amazon Associates — our only partnership), `homedepot.com/s/kitchen+faucet+cartridge+kit` (plain search, no affiliate, no partnership needed), `lowes.com/search?searchTerm=kitchen+faucet+cartridge+kit` (plain search)
- **No store locator API** — users comfortable searching own address on retailer sites
- Amazon Associates = simple account signup (free, 1 day), automatic affiliate tag appending в URL
- Zero ongoing curation work

**RICE:**
- **Reach:** ~40% users (DIY and Hybrid mode selectors)
- **Impact:** 2 (helpful — saves 30-60min research — но less "wow" than original spec because no prices on items themselves, just ranges)
- **Confidence:** 90% (pure URL construction + Claude generation, zero integration risk)
- **Effort:** 0.5 weeks (Small — just UI + Amazon Associates signup + Claude prompt addition; massive reduction from original 2 weeks due to no API integration)
- **Score: 40 × 2 × 0.9 / 0.5 = 144**

**Edge cases:**
- User in non-US region → retailer links adapt (amazon.ca, amazon.co.uk, etc.), some retailers unavailable
- Amazon Associates tag not yet approved → fallback to plain amazon.com link (no commission, no broken link)
- Material has very wide price range (e.g. faucet $30-300) → show range "budget $30 / mid $80 / premium $200"
- Rare material — Claude suggests generic equivalent ("look for any 1/2-inch brass ball valve")
- Category where materials not needed (e.g. "tighten this screw") → no shopping list, show "You already have what you need"

**Success criteria:**
- 60%+ DIY-mode users open shopping list
- 20%+ click at least one "Search retailer" link
- Amazon Associates revenue $100-2000/year total (small but bonus)
- Shopping list perceived usefulness >70% (post-repair survey)

**Dependencies:** Feature #3 (estimate generates list), Amazon Associates signup (1 day, free), URL construction helper

---

### Feature #5: Step-by-Step DIY Guide (AI-generated per problem)

**User story:**
> Как Emma, выбрав DIY mode, я хочу пошаговый guide адаптированный к моей конкретной проблеме, чтобы уверенно починить. И чтобы была кнопка "YouTube video" если я визуал.

**What it does:**
- 5–10 numbered steps, generated by Claude specifically for THIS problem (not a static guide template)
- Each step: action + warning (e.g. "don't over-tighten plastic threads") + estimated time + tool check
- **YouTube search button at top:** "Watch videos of this repair" — opens YouTube with pre-filled search query (Claude generates the query). User picks own video. We don't curate or embed.
- "I'm stuck" escape hatch on any step → surfaces "Find a pro" deeplink (Feature #6)
- Safety check at start if applicable: "This repair requires shutting off water. Here's how."
- Progress tracker ("Step 3 of 7")
- Completion check at end: "Did it work?" → logs outcome to Saved Projects (Feature #7)

**Technical approach (AI-only, no content production):**
- **Claude API generates guide on-demand** as part of DIY-mode estimate response
- **No 30 static guide templates.** No human content editor. No illustration commissioning. No legal review on per-guide basis.
- **Safety guardrails in Claude prompt:** "If repair involves gas, structural work, panel electrical, or asbestos — output 'STOP. Licensed professional required' instead of DIY steps"
- **Generic disclaimer** at top of each guide: "These are AI-generated suggestions. Use at your own risk. When in doubt, call a licensed professional." — one-time legal review, applies everywhere.
- **YouTube search query** generated by Claude в prompt response (e.g. "how to replace kitchen faucet cartridge DIY"), button deeplinks to `youtube.com/results?search_query=...`
- **Step-level personalization** (free for Claude): Claude adjusts tone based on user's DIY level (Beginner → more reassurance, Confident → faster pace, same technical content)

**RICE:**
- **Reach:** ~25% users (DIY-mode selectors, ~40% × 60% execute)
- **Impact:** 3 (converts DIY claim into DIY success)
- **Confidence:** 80% (Claude generates reasonable repair guides for common categories; safety guardrails prevent dangerous advice)
- **Effort:** 1 week (Small — prompt engineering + UI + guardrails + YouTube search URL construction; massive reduction from 4 weeks because no static content production)
- **Score: 25 × 3 × 0.8 / 1 = 60**

**Edge cases:**
- User starts guide, realizes beyond skill → "Find a pro" deeplink preserves context (category + zip)
- Safety-critical step (e.g. gas) → Claude blocks DIY, shows "Licensed work required" + pro deeplink
- Claude hallucinates wrong step → user feedback loop ("this step didn't work") triggers retry with updated prompt
- User wants video not text → prominent YouTube search button at top of guide
- Rare repair → Claude says "I don't have confident steps for this — here's a YouTube search + 'find a pro' option"
- User completes DIY → celebratory UI + "share your savings" (viral loop in Feature #8 area)

**Success criteria:**
- 70%+ guide starters reach final step
- 60%+ self-reported DIY success rate
- <5% safety incidents (tracked via user feedback)
- YouTube search button click-through >30% (indicates Claude's search query is good)

**Dependencies:** Features #3, #4; Claude API (same endpoint as estimate), one-time legal disclaimer review

---

### Feature #6: Find a Pro (simple deeplink, no affiliate, no partnership)

**User story:**
> Как Emma, если DIY страшно или проблема сложная, я хочу одним тапом попасть на Thumbtack / Google Maps / Yelp с предзаполненным поиском "plumber near 80203", чтобы сразу начать искать мастера без того чтобы самой копировать-вставлять.

**What it does:**
- "Find a pro" button в Full Pro mode card (Feature #3) + в estimate detail screen
- On tap, shows a bottom sheet with **three deeplink options:**
  - 🔵 **Thumbtack** — opens Thumbtack search (web or app) pre-filled с category + user's zip
  - 🔴 **Google Maps** — opens Google Maps search for "[category] near me"
  - 🟢 **Yelp** — opens Yelp search for pros in category + zip
- User chooses, leaves FixIt, continues на their terms
- **No affiliate tracking** — we don't earn from the click. We help Emma quickly, she trusts us.
- Optional post-visit follow-up ping (72h later): "Did you find a pro? Want to log the job in My Home?" — soft re-engagement, not annoying

**Technical approach (zero integration, zero partnership):**
- Pure URL construction:
  - Thumbtack: `thumbtack.com/search?category=plumber&zip_code=80203` (opens their app if installed, otherwise web)
  - Google Maps: `google.com/maps/search/plumber+near+80203`
  - Yelp: `yelp.com/search?find_desc=plumber&find_loc=80203`
- No API integration, no partner application, no lead attribution, no FTC affiliate disclosures needed
- Category mapped from Claude's identified problem type (plumbing → "plumber", electrical → "electrician", etc.) — simple dictionary
- **v1.5+ upgrade path:** если мы получим Thumbtack partnership approval позже, можем добавить affiliate tag к URL (same UX, just earns us $15-40/lead). Зero re-engineering needed.

**RICE:**
- **Reach:** ~30% users (Pro mode selectors)
- **Impact:** 1.5 (helpful but not magical — user still shops pros themselves; main value is zero-friction handoff vs user typing "plumber denver 80203" in google themselves)
- **Confidence:** 100% (pure URL construction, nothing can break)
- **Effort:** 0.5 weeks (Small — bottom sheet UI + URL mapper + category dictionary)
- **Score: 30 × 1.5 × 1.0 / 0.5 = 90**

**Edge cases:**
- User's device has no Thumbtack/Yelp app → deeplink fallback to web version (standard iOS behavior)
- Non-US user → Google Maps works globally, Thumbtack/Yelp US-only (we show only Google option internationally)
- Emergency category → priority sort: Thumbtack/Google first (faster response), Yelp last
- User comes back and says "the pro Thumbtack suggested was bad" → not our problem, but we could collect feedback for future (post-MVP quality signal)

**Success criteria:**
- 40%+ of Full Pro mode viewers click "Find a pro" button (high because of low friction)
- 60%+ of clickers actually complete a deeplink (vs close sheet)
- Follow-up 72h check-in click-through 15%+ (retention signal)
- User trust — no complaints about us "pushing them to Thumbtack for money" because we literally don't earn from it

**Dependencies:** Feature #3 (Pro mode exists), simple URL library, category → search-term dictionary

**Revenue note:** this feature generates $0 direct revenue in MVP. All monetization через subscription/pay-per. Affiliate revenue возможна как v1.5+ post-PMF feature if Thumbtack/Angi approve us as partners after we have traction — trivial add (just append affiliate tag to URL), no UX change.

---

### Feature #7: Saved Projects History ("My Home")

**User story:**
> Как Emma, я хочу видеть все свои предыдущие ремонты (когда, что, сколько потратила, результат), чтобы через год помнить что я делала и вернуться к этому при следующей проблеме.

**What it does:**
- "My Home" tab в bottom navigation
- Timeline view: каждый проект card (photo thumbnail + category + date + cost + mode chosen + outcome)
- Filter by room (kitchen / bathroom / yard / etc.)
- Project detail: original diagnosis, estimate range, what user actually paid, photos before/after, notes
- "Home profile" stats: "You've saved $X via DIY this year" (motivating) + "Next suggested maintenance: HVAC filter due in 2 weeks"
- Export to PDF for records (insurance claims, resale disclosures)

**Technical approach:**
- Supabase table: `projects` (user_id, category, photo_urls, diagnosis, estimate_json, mode_chosen, actual_cost, date, notes, room_tag, outcome_status)
- Auto-capture at estimate time — every estimate creates project draft
- "Mark complete" flow (optional) — user returns to app to log actual outcome + receipts
- PDF export via server-side rendering (supabase edge function)
- Room tags auto-inferred from AI photo analysis (kitchen sink → kitchen)

**RICE:**
- **Reach:** ~50% users (active users returning after first estimate — retention-critical)
- **Impact:** 2 (huge retention driver, но not day-1 value — becomes valuable at month 2+)
- **Confidence:** 85% (straightforward CRUD, pattern proven in apps like 1Password / Things)
- **Effort:** 2 weeks (Medium — DB schema, list/detail UI, export function)
- **Score: 50 × 2 × 0.85 / 2 = 42.5**

**Edge cases:**
- Project auto-draft never completed by user → cleanup after 30 days OR ask "did you fix this?"
- User sells home → "Export full home report" for listing disclosures (expansion value)
- Shared home (spouse uses same account) → multi-user projects post-MVP v1.5
- Photo storage limit exceeded (free tier 500MB) → compress or upsell premium
- Project outcome privacy — all projects private by default, opt-in for community sharing (post-MVP)
- Deleted project → soft-delete с 30-day undo window

**Success criteria:**
- 40%+ users return to "My Home" tab within 30 days
- Average projects per user at day 90: 2.5+
- 20% of users log outcome / actual cost (feedback data для estimate accuracy improvements)

**Dependencies:** Feature #3 (estimate creates draft project), Supabase DB, cloud storage for photos

---

### Feature #8: Pricing Tier (Freemium Gate + Subscription)

**User story:**
> Как Emma, я хочу попробовать FixIt бесплатно (3 estimates/мес), и если полезно — платить $7.99/мес за unlimited, потому что $8 < чем даже одна ошибка при ремонте.

**What it does:**
- Freemium: **3 estimates/month free** (reset monthly on account creation date)
- After 3rd estimate in month → paywall: "You've used your free estimates. Subscribe для unlimited OR pay $2.99 one-off."
- Paywall surfaces value: "Upgrade → unlimited estimates + pro pricing alerts + saved projects history unlimited" (per RESEARCH-BRIEF §6.2)
- Tiers:
  - **Free:** 3/month
  - **Monthly:** $7.99
  - **Annual:** $49.99 (48% discount — anchor price per PictureThis playbook)
  - **Pay-per:** $2.99 single estimate
- Premium features gated:
  - Unlimited estimates
  - Saved projects unlimited (free capped at 5 projects)
  - Price tracking alerts ("HVAC prices dropped в your area — good time to fix?")
  - Shareable reports (for Sarah validating pro quotes)
- Paywall UX: soft gate (не blocking) — "Continue with 1 estimate today или upgrade"

**Technical approach:**
- **Adapty** (per CLAUDE.md stack) для subscription management — handles App Store + Google Play billing
- Entitlement logic in Supabase: `user_subscriptions` table tracks tier + expiry
- Free tier counter: monthly rolling window based on created_at, не calendar month (fair для mid-month signups)
- Paywall component — shown after 3rd estimate generated в period
- A/B testing framework via Adapty для paywall variants (messaging, pricing tiers)

**RICE:**
- **Reach:** 100% users (everyone hits monetization layer)
- **Impact:** 3 (без monetization нет business — this is existential)
- **Confidence:** 80% (Adapty proven, freemium model validated by PictureThis)
- **Effort:** 2 weeks (Medium — Adapty integration + paywall UX + gating logic)
- **Score: 100 × 3 × 0.8 / 2 = 120**

**Edge cases:**
- User's 3 free estimates were all low-quality photos (retake loop) → don't count retakes against quota (be generous)
- Subscription cancellation → retain access till end of period + win-back flow (30 days later: "50% off next month")
- Family sharing (Apple Family) → test whether Apple allows FixIt sharing; если да — support это
- Restore purchase flow critical (required by App Store)
- Refund after estimate viewed → grace — refund но не return estimate access
- Annual subscriber downgrades → wait till renewal + notify
- Pay-per user wants to save estimate after paying → upsell к subscription ("Save this + all future estimates? Upgrade сейчас")

**Success criteria:**
- Free-to-paid conversion 3-5% (PictureThis benchmark)
- Annual tier mix 40%+ (per Emma persona research)
- MRR at month 6: $15K+ (validation milestone)
- Churn <8%/month (industry median for utility apps)

**Dependencies:** Adapty setup, Apple + Google developer accounts, paywall design, App Store subscription approval

---

### Feature #9: Onboarding Flow (3 steps max)

**User story:**
> Как Emma скачавшая FixIt из TikTok ad, я хочу за 30 секунд понять что это такое и сразу попробовать — без 8 экранов "please enable notifications".

**What it does:**
- **Screen 1: Value prop** — "Snap a photo, get repair cost in 10 seconds" (с visual demo — looping video of photo → estimate transition)
- **Screen 2: One permission** — location (для регионального pricing), with clear "why we need it"
- **Screen 3: First estimate** — "Let's try it now. Photo something broken at home." → straight into camera
- NO email/account required at this stage — anonymous guest mode allows first estimate
- After 1st successful estimate → soft prompt "Create account to save this project" (timing capitalizes on success moment)
- Push notification permission — deferred to natural moment (after 1st estimate shown, ask "want price alerts?")
- Option to skip tutorial entirely (returning / referred users)

**Technical approach:**
- Expo Router: `/onboarding/[step]` routes
- Anonymous auth via Supabase (guest session) — upgrades to full account on email signup
- Haptics.impactAsync() on advancing (per CLAUDE.md rules)
- Lottie animation для value prop screen (lightweight)
- Skip-to-camera button always visible

**RICE:**
- **Reach:** 100% users (everyone onboards)
- **Impact:** 2 (impacts activation rate — 10% activation improvement = 10% more paid users downstream)
- **Confidence:** 85% (short onboarding is industry best practice, validated across apps)
- **Effort:** 1 week (Small — 3 screens, permission prompts, guest mode setup)
- **Score: 100 × 2 × 0.85 / 1 = 170**

**Edge cases:**
- User denies location → skip to manual zip flow later, don't block onboarding
- User skips all screens → land на empty home with clear "Start your first estimate" CTA
- Push permission denied → alternative engagement (email, в-app banners)
- Offline during onboarding → cached screens work, first estimate waits для connectivity
- Returning user (uninstalled + reinstalled) → detect via Apple ID / Google → resume where left
- Guest user with 3 free estimates exhausted → must create account to continue (acquisition moment)

**Success criteria:**
- 85%+ onboarding completion
- <45 seconds average onboarding time
- 70%+ users take first photo within 2 minutes of opening app (activation metric)
- Location permission grant rate >70%

**Dependencies:** Expo Router setup, Supabase guest auth, Feature #1 (camera ready после onboarding)

---

### Feature #10: Push Notifications (lifecycle + engagement)

**User story:**
> Как Emma, я хочу получать умные напоминания (pick up materials tomorrow, follow-up on completed project, price drops для items в моей wishlist) — но не быть завалена spam-сообщениями.

**What it does:**
- **Transactional notifications:**
  - "Your estimate is ready" (после background analysis)
  - "Shopping list saved — Home Depot pickup tomorrow?"
  - "Pro Joe Smith responded to your quote request"
- **Lifecycle nudges:**
  - Day 2 after estimate: "Did you fix it? Log outcome + earn accuracy points"
  - Month 3 without estimate: "Any home issues lately? New season = new problems"
  - Price alerts: "HVAC materials dropped 15% в your area — good time?"
- **Educational drip (opt-in):**
  - Weekly "Home tip Tuesday": seasonal maintenance reminders
- Frequency cap: maximum 2 notifications/week unless user initiated (avoid annoying Emma)
- Settings panel для notification types — granular per category
- Quiet hours auto-detected (no notifications 10pm-7am user local time)

**Technical approach:**
- **Expo Notifications** для push delivery
- Supabase edge function scheduled jobs (cron) для lifecycle triggers
- User preferences table — per-category opt-out granularity
- Price alert logic — compare current material prices vs saved estimate baseline weekly
- Analytics: track open-rate per notification type, kill underperformers

**RICE:**
- **Reach:** ~60% users (granted push permission)
- **Impact:** 2 (retention lever — apps with push have 2-3× MAU vs without, per industry data)
- **Confidence:** 80% (standard push infra, patterns well-understood)
- **Effort:** 2 weeks (Medium — Expo setup + cron jobs + settings UI + analytics)
- **Score: 60 × 2 × 0.8 / 2 = 48**

**Edge cases:**
- User disables push later → gracefully degrade to in-app banners + email (if captured)
- Over-notification complaints → automatic cooldown after user ignores 3 notifications
- Time zone errors (user travels) → use device TZ, не account TZ
- Price drop false positive (single retailer dropped, others didn't) → only alert if aggregate 10%+ drop
- User без completed projects gets lifecycle nudge → skip "did you fix it" для users who didn't start repair
- Pro response notification for user who already hired different pro → respectful "you already hired Joe" dedup

**Success criteria:**
- 30%+ click-through rate on transactional notifications
- 15%+ click-through rate on lifecycle nudges
- <2% users disable all notifications (indicator of spam perception)
- DAU uplift +20% vs no-push cohort

**Dependencies:** Feature #9 (permission grant), Supabase edge functions, Feature #7 (projects for lifecycle targeting)

---

## MVP Features List (Top 10, ordered by RICE priority — updated for AI-only scope)

| # | Feature | RICE Score | Effort | Critical Path? |
|---|---------|-----------|--------|----------------|
| 1 | **Photo Intake + AI Identification** | 90 | 3w | YES — core entry |
| 2 | **Contextual Intake Questions** (region, quality, DIY) | 238 | 1w | YES — estimate dependency |
| 3 | **Cost Estimate Engine** — 3-mode output (**AI-only**) | **128** | **2w** | YES — core value prop |
| 4 | **Material Shopping List** (**AI-generated + Amazon deeplinks**) | **144** | **0.5w** | Partial — DIY path |
| 5 | **Step-by-step DIY Guide** (**AI-generated per problem**) | **60** | **1w** | Partial — DIY path |
| 6 | **Find a Pro** (**simple deeplinks**, no affiliate) | **90** | **0.5w** | NO — handoff utility |
| 7 | **Saved Projects History** ("My Home") | 42 | 2w | NO — retention |
| 8 | **Pricing Tier** (freemium + subscription, no affiliate revenue) | 120 | 2w | YES — monetization |
| 9 | **Onboarding flow** (3 steps) | 170 | 1w | YES — activation |
| 10 | **Push Notifications** (lifecycle + transactional) | 48 | 2w | NO — retention |

**Total effort:** ~15 weeks serial → **~11-12 weeks с parallelization** (team of 2). **4 months MVP target achievable** (down from 6-month original plan) because removed API integrations (#3, #4, #6) and content curation (#5).

**Massive RICE uplift on #3/#4/#5/#6** — their scores jumped because effort dropped while Impact/Reach stayed similar. This is the "AI does the heavy lifting" leverage in practice.

---

## Post-MVP (v1.5 — months 4-8)

Expansion features, triggered after product-market fit signal from MVP:

- **Photo multi-angle** — 360° capture для larger projects (deck replace, room paint scope)
- **Voice input** — "tell me about the problem" для hands-dirty users OR accessibility (Ronald persona)
- **AR measurement integration** — via Magicplan / Canvas partnership (NOT build own AR — partner strategy)
- **Warranty tracker** — log appliance warranty expirations, automated reminders 30 days before
- **Home maintenance calendar** — seasonal reminders (HVAC filter every 3mo, gutters bi-annually)
- **Neighbor benchmarking** — "Others in your zip paid $X for similar fixes" (crowd-sourced, privacy-preserving)
- **Quote validator (Sarah feature)** — upload photo of pro's written quote → AI parses line items, flags overcharges
- **Multi-user household** — shared family account for spouse + adult kids
- **Insurance-ready report** — auto-format estimate as claim attachment для homeowners insurance

---

## v2.0 (Year 2)

Scale + expansion:

- **B2B tier for property managers** — bulk estimates across multi-unit portfolios
- **Insurance integration** — auto-generate claim docs, direct submission к Allstate/Geico partners
- **Expand categories 30 → 150** — covers long-tail (pool maintenance, solar panel cleaning, septic systems, water softeners)
- **International launch** — UK / Canada / Australia (localized retailer + labor data)
- **Community Q&A forum** — Reddit-style layer, user helps user (Mike persona loves это)
- **Video walkthroughs** — commissioned custom video tutorials для top-20 categories (replace YouTube embeds)
- **Contractor directory direct** — move beyond Thumbtack affiliate к FixIt-native marketplace
- **Chat follow-up** — post-estimate AI chat ("what if the valve is different model?")

---

## v3.0+ (Year 3+)

Platform moves:

- **Crowd-sourced pricing database** — users upload their actual paid receipts, aggregate data becomes most accurate pricing source in industry (data moat)
- **Contractor reputation scoring** — FixIt's own scoring algorithm (job outcomes + photo verification) competes with Yelp/Angi
- **"Home OS"** — full digital profile of house (everything ever fixed, warranties, next predicted repairs based on age + climate)
- **Home inspection partnerships** — integration with inspection services (user uploads inspection report, FixIt prioritizes fixes by cost/urgency)
- **Predictive maintenance AI** — "Your water heater is 12 years old — likely to fail within 18 months, budget $1500"
- **Insurance underwriting data partnership** — sell aggregate repair trend data to insurance industry (anonymized, B2B revenue stream)

---

## Feature Detail Template (for reference, copy for new features)

Each detailed feature has:
- **User story** (As [persona], I want [action], so that [outcome])
- **What it does** (3-5 bullets of concrete behavior)
- **Technical approach** (stack choices, data sources, AI model, API dependencies)
- **RICE score с обоснованием** (numbers + reasoning for each dimension)
- **Edge cases** (3-5 failure modes with mitigation)
- **Success criteria** (measurable KPIs)
- **Dependencies** (other features, external services, team skills)

---

## Dependencies Graph

**Critical path (blocks MVP launch):**

```
Onboarding (#9) ──► Photo Intake (#1) ──► Intake Questions (#2) ──► Cost Engine (#3) ──► [3 output modes]
                                                                          │
                                                                          ├──► Shopping List (#4) [DIY/Hybrid]
                                                                          │
                                                                          ├──► DIY Guide (#5) [DIY mode]
                                                                          │
                                                                          └──► Pro Match (#6) [Pro/Hybrid mode]

Pricing Tier (#8) ──► gates access after 3 free estimates
Saved Projects (#7) ──► auto-creates from Cost Engine output
Push Notifications (#10) ──► triggered by Saved Projects + Pro Match events
```

**Parallel workstreams (independent):**
- Team Member A: Features #1, #2, #3 (core AI pipeline)
- Team Member B: Features #4, #6 (retailer + pro integrations) в parallel
- Both: Features #5, #7, #8, #9, #10 sequenced after core

---

## Explicit NON-features (NOT building in MVP)

Explicit scope discipline (per RESEARCH-BRIEF §9.4):

| NON-feature | Почему НЕ делаем |
|------------|-------------------|
| **AR measurement** | Partner с Magicplan вместо построения. Native AR = 3-6 months of work, partner integration = 2 weeks. |
| **Custom video tutorials** | YouTube embeds serve 80% of value. Own production — $500-2000/video × 30 categories = $30K+ в один раз. v2.0 maybe. |
| **AI chat for follow-up questions** | Scope creep. Current AI is one-shot analysis. Conversational AI = 2 months additional work. v1.5. |
| **Voice input** | Не primary для Emma (types comfortably). Important для Ronald (senior) — v1.5 when that persona targeted. |
| **Community forum / Q&A** | Moderation burden. Mike persona feature — v2.0. |
| **Home inspection report ingestion** | Complex doc parsing. v3.0 platform feature. |
| **International (non-US)** | Data pipelines US-only in MVP. International = 2-3× the data work. v2.0. |
| **Multi-user household** | Adds auth complexity. Single-user is 80% of value. v1.5. |
| **Warranty tracking** | Nice-to-have retention feature. v1.5. |
| **Recipe-style "project planner"** | Mike-specific feature for multi-step renovations. v1.5 Pro tier. |
| **Calorie-equivalent gimmicks / gamification** | Not core loop. Sugar Quit works because habit, FixIt works because utility. No badges for the sake of badges. |
| **Chatbot-style AI** (ongoing dialog) | One-shot Q&A sufficient for MVP. Conversational v1.5. |
| **Тестирование smoke / air / water quality** | Out of domain. FixIt is visual-damage identification, не lab testing. |

---

## Effort Estimates

**Team:** Лана (primary dev) + Amanda (architecture support on complex modules) + Claude Code (accelerator)

| Feature | Effort (weeks) | Owner |
|---------|---------------|-------|
| #1 Photo Intake | 3 | Лана |
| #2 Intake Questions | 1 | Лана |
| #3 Cost Engine (AI-only) | **2** | Лана + Amanda |
| #4 Shopping List (AI + Amazon deeplinks) | **0.5** | Лана |
| #5 DIY Guide (AI-generated) | **1** | Лана |
| #6 Find a Pro (deeplinks) | **0.5** | Лана |
| #7 Saved Projects | 2 | Лана |
| #8 Pricing Tier | 2 | Лана |
| #9 Onboarding | 1 | Лана |
| #10 Push Notifications | 2 | Лана |
| **Total serial** | **15 weeks** | |
| **Parallelized (realistic)** | **~11-12 weeks** | (~3 months) |

**Buffer для unknown:** +50% → **4 months** realistic MVP timeline.

**Non-dev workstreams parallel (much shorter than v1 plan):**
- Legal review (liability disclaimers, AI-generated content disclaimer, Amazon Associates disclosure) — 1 week, month 1 (much simpler than v1 plan because no partnership contracts)
- Amazon Associates signup — 1 day, month 1
- App Store submission — 2 weeks, month 3-4

**NO partnership outreach** (removed from MVP — возможно v1.5+). **NO content creation** (Claude generates guides per request). **NO SKU curation** (Claude knows typical materials from training).

---

## Success Metrics Per Feature

Each feature has specific KPIs tracked from Day 1:

| Feature | Primary metric | Target |
|---------|---------------|--------|
| #1 Photo AI | Categorization accuracy (top-30) | >80% |
| #1 Photo AI | Retake rate | <15% |
| #2 Intake | Completion rate | >90% |
| #3 Cost Engine | Estimate vs actual accuracy (±%) | Within 25% |
| #3 Cost Engine | User helpfulness rating | >70% "helpful+" |
| #4 Shopping List | Open rate (DIY users) | >60% |
| #4 Shopping List | Affiliate click-through | >30% |
| #5 DIY Guide | Guide completion rate | >80% starters finish |
| #5 DIY Guide | Self-reported DIY success | >70% |
| #6 Pro Match | Quote request rate | >30% of pro-mode viewers |
| #6 Pro Match | Hire conversion | >50% (Thumbtack bench) |
| #7 Saved Projects | Return rate to tab | >40% in 30 days |
| #8 Pricing Tier | Free-to-paid conversion | 3-5% |
| #8 Pricing Tier | Annual tier mix | >40% |
| #9 Onboarding | Completion rate | >85% |
| #9 Onboarding | Time to first photo | <2 min |
| #10 Push | Transactional CTR | >30% |
| #10 Push | Opt-out rate | <2% |

**North Star Metric:** **Weekly Active Estimates per User (WAEU)** — measures если users returning к app for repeat value, не просто one-and-done. Target: 0.3 WAEU by month 3 = users come back ~once per month for new problem.

**Secondary NSM:** **Money Saved Per User Per Year** — self-reported, validates value prop. Target: $150+ average saved via DIY vs pro quotes.

---

## Open Questions / Future Research

Feature decisions requiring further validation:

1. **Freemium quota** — is 3/month the right number? Test 2 / 3 / 5 in A/B.
2. **Pro Match exclusivity** — Thumbtack-only vs multi-marketplace?
3. **DIY guide ownership** — AI-generated vs human-edited content split?
4. **Price alert frequency** — weekly vs event-based?
5. **Emergency category routing** — bypass AI and straight-to-pro для burst pipe / no heat / smoking outlet?
6. **Regional data refresh cadence** — quarterly vs monthly vs real-time?

---

## Приложение: связь с research documents

Каждое feature decision traces back к research artifact:

- **Photo AI + intake flow** — validated by Emma persona JTBD (`USER-PERSONAS.md §Persona 1`) + PictureThis precedent (`RESEARCH-BRIEF.md §3.3`)
- **3-mode output (DIY/Hybrid/Pro)** — direct response к competitor gap (`COMPETITOR-ANALYSIS.md §Exec Summary` — nobody does all-in-one)
- **Zip-level pricing** — validated by regional dispersion data (`DOMAIN-DEEP-DIVE.md §1.3` — 2× price range SF vs Memphis)
- **Retailer integration** — feasibility confirmed in `DOMAIN-DEEP-DIVE.md §4` (Home Depot PA-API free tier)
- **Pro Match affiliate** — revenue model validated in `DOMAIN-DEEP-DIVE.md §5` (Thumbtack API + Angi API)
- **Freemium + subscription** — precedent в PictureThis success (`RESEARCH-BRIEF.md §3.3`) + willingness-to-pay data (`USER-PERSONAS.md §Emma WTP`)
- **Top-30 categories scope** — explicit recommendation (`RESEARCH-BRIEF.md §9.4` — disciplined scope)
- **Safety rails (licensed-work flagging)** — regulatory requirement (`DOMAIN-DEEP-DIVE.md §6`)

---

**Дата последнего обновления:** 2026-04-18
**Next step:** `TARGET-AUDIENCE.md` (deep Emma validation) + `MONETIZATION.md` (pricing model finalization)
**Approval needed:** Amanda + Лана
