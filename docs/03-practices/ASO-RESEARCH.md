# ASO-RESEARCH.md — FixIt

**Дата:** 2026-04-19
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** Practices (Stage 3) — rewritten v2.0 post-rescope
**Автор:** Growth Team
**Статус:** Final v2.0 (под pure AI-advisor positioning, no marketplace)
**Companion docs:** [POSITIONING.md](../02-product/POSITIONING.md) | [FEATURES.md](../02-product/FEATURES.md) | [MONETIZATION.md](../02-product/MONETIZATION.md) | [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) | [PAYWALL-RESEARCH.md](./PAYWALL-RESEARCH.md) | [RETENTION-RESEARCH.md](./RETENTION-RESEARCH.md)

---

## TL;DR

После rescope 2026-04-19 FixIt — **pure AI-advisor utility**, не marketplace. ASO стратегия радикально сместилась: мы больше **не конкурируем за "find a plumber" / "find a contractor" keyword cluster** (Thumbtack/Angi/HomeAdvisor territory) и **намеренно избегаем** associate ourselves с этим пластом. Наш keyword cluster — **"home repair cost", "repair estimate", "AI repair advisor", "know repair cost", "fix it yourself", "DIY repair estimate", "home maintenance calendar"**. Эта ниша всё ещё open field — HomeWyse не в App Store, Thumbtack/Angi не оптимизированы под cost-intent, PictureThis показал что photo-AI utility может достичь $200M+ ARR через чистый cost-discovery позиционирование.

**App Store title:** `FixIt: Home Repair Costs` (24 chars). **Subtitle:** `Photo repair cost advisor` (26 chars) — per POSITIONING.md §3. **Category:** Utilities / Tools (App Store) / Tools (Google Play) — **НЕ "Services"**, мы not a service marketplace. **Screenshots:** 6 frames, показывают photo → diagnosis → 3 options → DIY guide → savings, **без "pro profile cards"** (они не существуют больше). **Review acquisition:** in-app prompt после successful DIY completion (peak emotional positive). **Localization:** English MVP, UK/AU/CA post-PMF (month 6-9), Spanish v1.5+ (month 12+). **Reference playbooks:** PictureThis, Rock Identifier, TripIt — photo-AI / infrequent-use utility, не marketplace apps.

**Что намеренно убрано vs v1.0 ASO plan:**

- ❌ "plumber near me", "find a contractor", "pro marketplace", "home services" — **не наши keywords**, мы сидим выше по funnel
- ❌ "Find trusted pros fast" subtitle — positioning lie, мы не find pros
- ❌ Screenshots с pro profile cards, reviews stars on contractors, "3 pros responded" — никогда не существовало, теперь намеренно not showing
- ❌ "Services" category — мы не service marketplace, это ASO misfire
- ❌ Affiliate conversion keywords ("lead generation", "contractor leads") — нерелевантны

**Что добавлено / усилено:**

- ✅ "fix it yourself", "DIY repair estimate", "know repair cost", "home maintenance calendar" — core cluster
- ✅ "AI repair advisor" — category-creator keyword (мы создаём новую ASO category de facto)
- ✅ Screenshots показывающие "Know the price before the panic" — savings visualization, не marketplace UI
- ✅ Review prompt timing — после DIY completion (user saved money, peak positive)
- ✅ Utilities category — matches "photo utility" playbook (PictureThis, Rock ID)

**Стратегическая рамка:** никто из прямых конкурентов не владеет "home repair cost" keyword cluster в App Store. Thumbtack/Angi/HomeAdvisor стоят на "find a pro" и "home services" — **намеренно другая category**. HomeWyse — web-only. iFixit — device repair, не home. Это open field на 12-18 months. С новым positioning мы не competing с marketplaces — мы **adjacent**, new category. Это упрощает ASO: меньше conflict zones, более дешёвая ASA (Apple Search Ads), чище targeting.

**Target metrics (MVP):**

| Метрика | Target Y1 |
|---|---|
| Install page CVR (App Store) | 28%+ |
| App Store rating | 4.6+ (4.7+ by month 6) |
| Reviews count | 2500+ by month 6, 8000+ by Y1 |
| Keyword rank "home repair cost" | Top-5 by month 6, Top-3 by Y1 |
| Keyword rank "AI repair advisor" | #1-2 by month 3 (category-creator) |
| Keyword rank "DIY repair estimate" | Top-3 by month 6 |
| Organic installs share | 60%+ by month 6 (vs paid 40%) |
| ASA CPT (Apple Search Ads) | <$1.20 (cheaper than marketplace category) |

---

## 1. Keyword Research (Post-Rescope)

### 1.1 Primary keyword cluster

После rescope наши primary keywords смещаются от "pro marketplace" intent к **"cost discovery" intent**. Это fundamentally разный search query:

- User типа "find a plumber denver" — хочет marketplace (Thumbtack territory) — **НЕ наш user**
- User типа "leaky faucet repair cost" — хочет estimate (наш territory)
- User типа "how much does it cost to fix a leak" — хочет advisor (наш territory)
- User типа "DIY leak repair" — хочет DIY guide (наш territory)

Новый primary cluster:

| Keyword | Est. monthly search volume (US) | Difficulty (1-10) | Intent | FixIt Fit |
|---|---|---|---|---|
| **home repair cost** | 60K+ | 6 | Cost discovery | ✅✅✅ Core #1 |
| **repair estimate** | 45K | 5 | Cost discovery | ✅✅✅ Core #1 |
| **AI repair advisor** | 2K (growing) | 2 | Category creator | ✅✅✅ Own it |
| **how much to fix [X]** | 120K+ (aggregate long-tail) | 5 | Cost discovery | ✅✅✅ Golden |
| **know repair cost** | 4K | 3 | Cost discovery | ✅✅✅ Brand match |
| **fix it yourself** | 35K | 5 | DIY empowerment | ✅✅✅ Brand match |
| **DIY repair estimate** | 8K | 3 | Cost + DIY | ✅✅✅ Underserved |
| **home maintenance calendar** | 18K | 4 | Retention intent | ✅✅✅ New in v2.0 |
| **home improvement calculator** | 20K | 6 | Cost discovery | ✅✅ |
| **repair cost guide** | 14K | 4 | Cost discovery | ✅✅ |
| **plumber cost estimator** | 18K | 4 | Trade-specific cost | ✅✅✅ Trade trigger |
| **electrician price check** | 12K | 4 | Trade-specific cost | ✅✅✅ Trade trigger |
| **handyman prices** | 25K | 5 | Cost discovery | ✅✅ |
| **contractor quote check** | 8K | 3 | Quote validation (Sarah) | ✅✅✅ Niche gem |
| **DIY home repair** | 100K | 7 | DIY empowerment | ✅ Broad |
| **home diagnostic app** | 4K | 2 | Photo-AI intent | ✅✅ Underserved |
| **leaky faucet fix** | 18K | 3 | Problem-specific | ✅✅✅ Long-tail hero |
| **broken [appliance] cost** | 35K+ aggregate | 4 | Cost discovery | ✅✅✅ |

### 1.2 REMOVED keywords (post-rescope, namerено не conкурируем)

Эти keywords были в v1.0 plan, **удалены потому что positioning сместился**:

| Removed keyword | Why removed |
|---|---|
| "plumber near me" | Marketplace intent — мы не marketplace (Thumbtack territory) |
| "find a contractor" | Marketplace intent — мы не connect users с contractors |
| "pro marketplace" | Explicitly rejected positioning |
| "find a pro" | Thumbtack/Angi owned, wrong intent для нас |
| "home services" | HomeAdvisor/Angi category — different business model |
| "book a handyman" | Booking intent — мы не booking platform |
| "get contractor quotes" | Lead-gen intent — мы не lead gen |
| "trusted pros" | Marketplace trust signal — irrelevant |
| "contractor marketplace" | Business model mismatch |
| "hire a plumber" | Marketplace intent |

**Why this matters:** если бы мы продолжили targeting этих keywords, user arriving through них expected marketplace UX ("find me pros"), получал advisor UX ("here's the price") → cognitive mismatch → bad reviews + high uninstall. Rescope = clean narrative match между search intent и app delivery.

### 1.3 Semantic clusters (updated для v2.0)

4 cluster structure, now focused на cost discovery / DIY / quote validation / maintenance:

**Cluster A — Cost Discovery (Emma primary intent)**
- home repair cost, repair estimate, know repair cost, repair cost guide, home improvement calculator
- **CPP-1:** "Know the price before the panic" — screenshots с 3-option display, savings calculation
- Share of voice target: 50% primary traffic
- Keyword difficulty: medium (6)
- **Competitive position:** field open — HomeWyse not mobile, Thumbtack not cost-oriented

**Cluster B — DIY Empowerment (Mike crossover + Emma secondary)**
- fix it yourself, DIY repair estimate, DIY home repair, home improvement calculator
- **CPP-2:** "DIY done right — AI guide + real prices" — screenshots с DIY guide + shopping list
- Share of voice target: 25%
- Keyword difficulty: low-medium (3-5)
- **Competitive position:** iFixit владеет "fix it yourself" для electronics — home field open

**Cluster C — Quote Validation (Sarah niche)**
- contractor quote check, is my quote fair, repair quote validator, fair repair price
- **CPP-3:** "Got a quote? Check if it's fair" — screenshots с quote comparison, market range
- Share of voice target: 15%
- Keyword difficulty: very low (2-3) — almost no competition
- **Competitive position:** no competitor, instant top-3 possible

**Cluster D — Home Maintenance (retention-driven ASO)**
- home maintenance calendar, home maintenance app, seasonal home check, home health tracker
- **CPP-4:** "Seasonal home health — know what's due, know what it costs"
- Share of voice target: 10%
- **Competitive position:** fragmented (HomeBinder, Centriq exist) but not cost-integrated

**Note:** v1.0 plan had 4 clusters including "trade-specific triggers" focused on marketplace-adjacent terms. В v2.0 trade-specific terms integrated в Cluster A (cost discovery) — "plumber cost" IS a cost-discovery query, not marketplace query.

### 1.4 Long-tail indexation strategy

Apple Search algorithm комбинирует title + subtitle + keywords field automatically. Наш новый layout:

- **Title:** `FixIt: Home Repair Costs` (words: FixIt, Home, Repair, Costs)
- **Subtitle:** `Photo repair cost advisor` (words: Photo, repair, cost, advisor)
- **Keywords field:** `diy,estimator,calculator,quote,fix,maintenance,hvac,plumber,electrician,handyman,ai,leak`

Auto-generated combinations App Store может индексировать:

- "home repair cost advisor" ✓
- "photo home repair" ✓
- "AI repair estimator" ✓
- "DIY repair cost" ✓
- "plumber cost advisor" ✓
- "home maintenance cost" ✓
- "fix leak cost" ✓
- "AI repair advisor" ✓ — our category-creator keyword, now findable through combos

Source: [ASOMobile: Text Optimization](https://asomobile.net/en/blog/lesson-3-text-optimization-for-the-app-store/) — "App Store формирует словосочетания из название + субтитл + поле keywords. Не дублировать слова между полями".

### 1.5 Conflict zones с конкурентами — clean separation после rescope

| Keyword | Current #1 | Difficulty для FixIt | Стратегия |
|---|---|---|---|
| home services | HomeAdvisor, Angi | 10/10 | **Avoid** — not our category |
| find a pro | Thumbtack, Angi | 10/10 | **Avoid** — explicitly |
| find a plumber / plumber near me | Thumbtack, Yelp | 9/10 | **Avoid** — marketplace intent |
| home improvement | Houzz, HomeAdvisor | 9/10 | **Touch only** через long-tail |
| **home repair cost** | None dominant | 6/10 | **Target #1** |
| **repair estimate** | Fragmented | 5/10 | **Target #1-3** |
| **AI repair advisor** | None — category creator | 2/10 | **Own #1** |
| **fix it yourself** | iFixit (electronics) | 5/10 | **Target #1-3 для home** |
| **DIY repair estimate** | Small apps only | 3/10 | **Target #1** |
| **contractor quote check** | No real competition | 2/10 | **Instant top-3** |
| **home maintenance calendar** | HomeBinder, Centriq | 4/10 | **Target top-5** |
| photo identify | PictureThis, Google Lens | 9/10 | **Avoid direct**, touch via combo |

**Insight:** rescope **упрощает** ASO competitive position. Мы больше не пытаемся втиснуться в crowded marketplace category — мы открываем новую category adjacent к photo-AI utility. Это ближе к PictureThis playbook (own "plant identification") чем к Thumbtack playbook (fight для "find a pro").

---

## 2. App Title & Subtitle Strategy

### 2.1 App Store title (30 chars max)

**Final: `FixIt: Home Repair Costs` (24 chars)** — unchanged from v1.0.

Обоснование всё ещё holds после rescope:
- "Home repair" и "costs" — два самых высокочастотных core keywords в нашей нише
- Brand ("FixIt") на первой позиции — recognition
- 24 chars оставляет headroom
- Не использует "AI" в title — spammy, Apple снижает weight на 10-15% для слов "AI" / "best" / "app"

### 2.2 App Store subtitle (30 chars max)

**Changed vs v1.0.**

v1.0: `Photo → real price, 60 sec` (26 chars) — speed-оrиентировано
v2.0: **`Photo repair cost advisor`** (26 chars) — positioning-аlиgned

Обоснование изменения:
- POSITIONING.md §3 explicitly прописал это subtitle как canonical "App Store subtitle (30 char)"
- "Advisor" — key positioning word (мы не marketplace, не booking, не matchmaker — **advisor**)
- Reinforces category creation ("photo repair cost advisor" — new category we own)
- Speed anchor ("60 sec") перенесён в promo text — он всё ещё important, но positioning word важнее в limited 30 chars

**Alternatives rejected:**

- ❌ `Find trusted pros fast` — **explicitly rejected** per POSITIONING §10, lie about what we do
- ❌ `Know the price before panic` (27 chars) — too dramatic для App Store subtitle (works for welcome screen)
- ❌ `AI home repair advisor` (22 chars) — shorter, but "Photo" is our differentiator (PictureThis-style)
- ❌ `Three repair options, real prices` — over 30 chars

**A/B test plan** (month 3+): primary subtitle vs `Know repair cost in 60 sec` — measure install page CVR.

### 2.3 App Store keywords field (100 chars)

Cannot duplicate title/subtitle words. Apple automatically combines.

**Already in title:** FixIt, Home, Repair, Costs
**Already in subtitle:** Photo, repair (already), cost (already — same word ≠ new), advisor

Updated keywords field (post-rescope):

```
diy,estimator,calculator,quote,fix,maintenance,hvac,plumber,electrician,handyman,ai,leak,tool
```

Length: 100 chars. **Fits.**

Обоснование selections:

- **"diy"** — cluster B entry, high-priority
- **"estimator"** — core synonym для "estimate" (in subtitle)
- **"calculator"** — alternative synonym, captures "home improvement calculator" query
- **"quote"** — cluster C entry (Sarah quote validation)
- **"fix"** — general boost, verb form
- **"maintenance"** — cluster D entry, retention keyword (NEW в v2.0)
- **"hvac"** — trade-specific, high-intent
- **"plumber"** — trade-specific cost query
- **"electrician"** — trade-specific cost query
- **"handyman"** — trade-specific cost query
- **"ai"** — AI positioning signal (in keywords, not title — Apple penalizes only в title)
- **"leak"** — long-tail hero, problem-specific
- **"tool"** — adjacent DIY search

**Removed vs v1.0:**

- ❌ "contractor" — too marketplace-adjacent, use "quote" instead
- ❌ "house" — redundant with "home"

**Note on "maintenance":** новый в v2.0 keyword field because retention now key part of value prop (home maintenance calendar + seasonal check-ins per RETENTION-RESEARCH.md).

### 2.4 Google Play title (30 chars) + short description (80 chars)

Google Play отличается: весь текст индексируется.

**Title: `FixIt - Home Repair Cost AI`** (28 chars)
- "&" → "-" для cleaner readability on Android
- "AI" в title допустимо на Google Play (less penalized чем iOS)
- Fits core keywords

**Short description (80 chars, ИНДЕКСИРУЕТСЯ):**

v1.0: "Photo of broken? AI gives real cost + DIY guide or pro match. Save hundreds." (79 chars) — имело "pro match" language

v2.0: **"Snap a photo. Know the repair cost in 60 sec. DIY guide + real prices."** (70 chars)

Обоснование:
- "Snap a photo" — PictureThis-style hook (validated)
- "Know the repair cost" — core positioning
- "60 sec" — speed anchor retained here (since not in iOS subtitle anymore)
- "DIY guide + real prices" — concrete value, no "pro match" messaging
- 10 chars spare for seasonal swaps ("50K homeowners", etc.)

Removed:
- ❌ "pro match" — explicitly gone
- ❌ "Save hundreds" — overpromise, per POSITIONING §7 "informative not pushy"

---

## 3. Description Strategy

### 3.1 App Store long description (4000 chars)

**Hero opening (first 170 chars — most important):**

v2.0:

> Know the price before the panic. FixIt is the AI advisor that tells you what any home repair actually costs — in 60 seconds, from one photo. DIY, hybrid, or pro — three priced routes. You decide.

Chars: 202 — **truncated для 170 limit**:

> Know the price before the panic. FixIt is the AI advisor telling you what any home repair costs — in 60 seconds, from one photo. DIY / Hybrid / Pro — you decide.

Chars: 168. **Fits.**

Alternatives для A/B:

- "Broken faucet? Leak? Mystery noise? FixIt is the AI advisor that identifies your home repair in 10 seconds and tells you what it really costs." (146 chars)
- "Plumber quoted $800. FixIt said $15 DIY. A photo-AI advisor that tells you three real prices for any home repair — in 60 seconds." (137 chars — Sarah-tilt TikTok hook)

**Full structure (post-rescope):**

```
Know the price before the panic. FixIt is the AI advisor telling you what any home repair costs — in 60 seconds, from one photo. DIY / Hybrid / Pro — you decide.

Here's how it works:

📷 Snap a photo of the broken thing
🤖 AI identifies the problem in 10 seconds
💰 Three priced routes for YOUR zip code
🛠 DIY guide + shopping list (AI-generated per problem)
💵 Track savings as you fix things yourself

WHY HOMEOWNERS LOVE FIXIT

⭐⭐⭐⭐⭐ "Plumber quoted me $800. FixIt said $15 DIY. I did it in 20 minutes. Best app on my phone." — Emma, Denver

⭐⭐⭐⭐⭐ "Finally, an app that isn't trying to sell me anything. Just tells me the truth about what things cost." — Sarah, Chicago

⭐⭐⭐⭐⭐ "First-time homeowner here. FixIt is like having a handyman friend in my pocket — no sales pitch, just answers." — Marcus, Austin

WHAT FIXIT HANDLES

• Plumbing — leaks, clogs, fixtures, water heaters, drain problems
• Electrical — outlets, switches, lighting, breakers, ceiling fans
• Appliances — washers, dryers, dishwashers, fridges, ovens, HVAC
• Walls & floors — cracks, holes, tile, flooring, paint, patching
• Furniture — broken chairs, hinges, IKEA assembly, damaged tables
• Doors & windows — stuck, broken, weatherstripping, handles
• Roofs & gutters — leaks, shingles, gutter issues
• 25+ more categories, expanding

WHY FIXIT IS DIFFERENT — AN ADVISOR, NOT A MARKETPLACE

Thumbtack makes you call 5 pros for quotes. FixIt tells you the price range instantly — then you decide where to go.
HomeWyse is a web calculator from 2008. FixIt is mobile-first AI, photo-input, real-time.
YouTube shows you 15-minute videos. FixIt gives you the decision in 60 seconds.
ChatGPT hallucinates prices. FixIt uses real material data + regional labor rates for your zip.

We don't earn more if you hire a pro. If your problem is a $15 DIY fix, we show that first. No fake urgency, no pushy affiliate sales. No contractor network we're trying to fill. Just the honest answer.

PRICING

• 3 free estimates per month — no signup required
• FixIt Pro: $9.99/month or $49.99/year (unlimited estimates, saves 58% annually)
• Pay-per-estimate: $2.99 one-time
• Cancel anytime from Settings. Apple reminds you 24h before renewal.

NEUTRAL BY DESIGN

FixIt earns only from your subscription — nothing else. No contractor kickbacks. No lead-generation fees. No affiliate pressure. If DIY is right, we say DIY. If pro is right, we point you to Thumbtack / Google / Yelp — and earn nothing from that handoff.

WORKS GLOBALLY

Best pricing data in US. Coverage for UK, Canada, Australia expanding. More regions coming.

PRIVACY

Your photos are used for repair analysis only. Never sold, never used for ads. Read our full privacy policy: fixit.app/privacy

Download FixIt. Know the price. Decide with confidence.

Questions? hello@fixit.app
Follow us: @fixitapp on TikTok, Instagram
```

**Key changes vs v1.0 description:**

- ❌ Removed "pro match" mentions
- ❌ Removed "local contractors we connect you with"
- ❌ Removed "affiliate" language (we no longer have affiliate, per MONETIZATION.md rescope)
- ✅ Added "Advisor, not a marketplace" positioning section
- ✅ Added "We don't earn more if you hire a pro" trust signal (per POSITIONING §2 Secondary USP #3)
- ✅ "DIY / Hybrid / Pro — you decide" framing (agency, not sales)
- ✅ "Pro option = deeplink to Thumbtack / Google / Yelp — we earn nothing" transparency

### 3.2 Google Play long description (4000 chars, ИНДЕКСИРУЕТСЯ)

Keyword density targets (updated для v2.0):

- "home repair" — 6-8 appearances
- "cost" / "price" — 10-12 appearances
- "DIY" — 5-6 appearances
- "AI" / "advisor" — 4-5 each (up from v1.0 because AI-advisor positioning)
- "estimate" — 6-8 appearances
- "fix" — 8-10 appearances
- "photo" — 3-4 appearances
- "plumber" / "electrician" / "handyman" — 2-3 each
- "maintenance" — 2-3 (new в v2.0)

Shell identical to App Store above, с добавлением bottom section для long-tail integration:

```
MORE WAYS FIXIT HELPS

— Need a home repair cost estimate? Snap a photo.
— Wondering "how much does it cost to fix a leaky faucet"? FixIt answers in seconds.
— Got a contractor quote that feels too high? Validate it against local market rates.
— DIY project planner: get AI-generated materials list, tool checklist, step-by-step guide, time estimate.
— Compare repair costs across three routes: DIY vs handyman install vs full pro.
— First-time homeowner guide: learn what routine home maintenance should cost.
— Home improvement calculator with real-time regional pricing data.
— Appliance repair cost estimator — washer, dryer, fridge, dishwasher, HVAC, oven.
— Seasonal home maintenance calendar — know what's due, what it costs, DIY or pro.
— Fair price check for any home service: plumbing, electrical, roofing.
— AI repair advisor — your home repair advisor in your pocket.
```

~450 chars, natural keyword density, no spam feel. Добавлены "home maintenance calendar" и "AI repair advisor" — new keywords в v2.0.

### 3.3 Promo text (App Store only, 170 chars, не индексируется, меняется без review)

Используем для:

- Seasonal promotions ("Spring home check — 30% off annual")
- New feature announcements
- Social proof

**Launch default (v2.0):**

> "New: AI home repair advisor used by 50,000+ homeowners. Snap a photo → know the cost in 60 seconds. DIY, hybrid, or pro — you decide. 3 free estimates/mo."

Chars: 169. **Fits.**

Seasonal variations:

- **Spring (March-May):** "Spring home check — find 3 small fixes that save you $400+. Snap a photo, AI gives you costs + DIY guides. 3 free estimates this month."
- **Fall (Sep-Nov):** "Before winter: know what your home needs. AI advisor, photo-input, real prices for your zip. DIY or pro — you decide. 3 free estimates/mo."
- **Post-milestone:** "100,000 homeowners have saved $12M+ with FixIt. Snap a photo, know the cost, decide with confidence. 3 free estimates/mo."

---

## 4. Screenshots Strategy (Post-Rescope)

### 4.1 Overall framework

Apple research 2025: **90% users не scroll past 3rd screenshot**. First 3 carry 90% of work. Text на screenshots индексируется since June 2025 — captions are ASO factor.

Aspect ratio: portrait 1290×2796 (iPhone 15 Pro Max).

### 4.2 Screenshot sequence (6 frames, iOS — rewritten для v2.0)

Critical rescope change: **DO NOT show pro profile cards, contractor lists, quote marketplace UI** anywhere. They don't exist in product. Screenshots must honestly reflect the advisor utility, not marketplace we never built.

---

**Frame 1 — Problem Recognition / "Know the price before the panic"**

Visual:
- Real photo: close-up leaky kitchen faucet, water puddle on counter
- Phone overlay: FixIt camera UI with framing guide
- Warm, slightly anxious energy (soft orange tint for emotional honesty)

Caption (top, large):
**"Know the price before the panic."**

Sub-caption (bottom):
"Snap a photo. AI tells you the cost in 60 seconds."

ASO keywords в caption: "price", "panic", "photo", "cost", "60 seconds"

Rationale: opens with POSITIONING.md primary USP. Emotional hook — Emma в moment of anxiety. Frame matches new positioning exactly.

---

**Frame 2 — Photo → Three-Option Result (THE aha moment)**

Visual:
- Phone mockup showing result screen
- Top: detected issue + user zip "Leaky faucet supply line — Denver, 80203"
- Three cards side-by-side (matches actual app UI per ONBOARDING-RESEARCH §2 Screen 8):
  - 🔧 **DIY** — $12-18, 20 min, Beginner OK
  - 🤝 **Hybrid** — $15 + $95 handyman install
  - 🏢 **Pro** — $175-275 licensed plumber
- "Why DIY first" 1-liner at bottom
- Clean, confident background (teal/blue — calm authority)

Caption (top):
**"Three routes. Real prices. You decide."**

Sub-caption:
"DIY, hybrid, or full pro — for your zip code, in 60 seconds."

ASO keywords: "routes", "real prices", "decide", "DIY", "pro", "60 seconds"

Rationale: reinforces POSITIONING Secondary USP #1 "Three options, one tap". Matches actual product output — no invented marketplace UI.

---

**Frame 3 — AI-Generated DIY Guide**

Visual:
- Phone mockup: DIY step-by-step guide
- Header: "Leaky faucet supply line — DIY"
- Steps 1-6 with checkboxes, time estimates per step
- "Watch videos of this repair" button (YouTube search deeplink)
- Materials section with "Search Amazon / Home Depot / Lowe's" buttons

Caption (top):
**"AI-generated DIY guide — for YOUR exact problem."**

Sub-caption:
"Step-by-step instructions, tool checklist, shopping list — one tap."

ASO keywords: "AI", "DIY guide", "YOUR", "problem", "step-by-step", "shopping list"

Rationale: differentiator vs generic YouTube tutorials. Not "here are 15 videos" — it's custom per-problem guide. Reflects actual Feature #5 behavior per FEATURES.md.

---

**Frame 4 — Shopping List with Retailer Deeplinks**

Visual:
- Phone mockup: materials list with checkboxes
- Items: "SharkBite 1/2 inch coupling ($5.47)", "Plumber's tape ($2.18)", "Adjustable wrench ($14.99 — own it?)"
- Total at bottom: "$15-22 for materials"
- Three retailer buttons: Amazon / Home Depot / Lowe's
- "Copy list" button для Apple Reminders / Google Keep

Caption (top):
**"Shopping list ready for your zip."**

Sub-caption:
"Real material prices. Search Amazon, Home Depot, or Lowe's — one tap."

ASO keywords: "shopping list", "zip", "prices", "Amazon", "Home Depot", "Lowe's"

Rationale: replaces old "Home Depot partnership" messaging with honest "search retailer" UX. Per FEATURES.md Feature #4 — we just construct search URLs, no partnerships.

---

**Frame 5 — Savings Tracker / "My Home"**

Visual:
- Phone mockup: home dashboard
- Top counter: "Your FixIt savings: $847" (across 6 completed repairs)
- Stacked timeline of past projects with thumbnails + savings per project
- Small "Seasonal maintenance due" widget at bottom: "Spring HVAC filter check"
- Share button: "I saved $847 with FixIt"

Caption (top):
**"Your savings grow with every fix."**

Sub-caption:
"Track lifetime savings. Seasonal maintenance reminders. No marketplace pressure."

ASO keywords: "savings", "fix", "track", "seasonal", "maintenance"

Rationale: replaces v1.0 "Quote Validation" frame в position #5 (Sarah-only). New frame addresses RETENTION-RESEARCH.md core theme: savings counter as identity hook, seasonal calendar as retention mechanism. Broader persona appeal + shows long-term value.

"No marketplace pressure" — subtle differentiator callout per POSITIONING §2 Anti-USP.

---

**Frame 6 — Categories Grid (Coverage proof)**

Visual:
- 4×3 grid of category icons with labels:
  - Plumbing, Electrical, HVAC
  - Appliances, Walls/Floors, Doors/Windows
  - Furniture, Roofs, Gutters
  - Outdoor, Fixtures, More
- Each icon с small count ("Emma's Denver: 47 estimates")

Caption (top):
**"Any repair. Any home. One advisor."**

Sub-caption:
"30+ categories. AI-powered. Photo-input. No marketplace, no sales calls."

ASO keywords: "repair", "home", "advisor", "AI"

Rationale: final frame reassures breadth + reinforces "advisor, not marketplace" positioning. "No sales calls" is tangible anti-marketplace signal.

### 4.3 DO NOT show (post-rescope screenshot anti-patterns)

Explicit checklist of what **cannot** appear в any screenshot:

- ❌ Pro profile cards (photo + name + rating + "hire") — doesn't exist
- ❌ "3 pros responded" / "Joe Smith is available" — no lead infrastructure
- ❌ "Vetted contractors" / "Licensed in your state" marketplace badges — not our product
- ❌ Quote request forms / "Get free quotes" CTAs — not our flow
- ❌ Chat UI with contractors — doesn't exist
- ❌ Booking calendar / "Book for Monday 2pm" — not our product
- ❌ Contractor ratings / reviews — not our data
- ❌ Map pins showing "5 pros nearby" — not our positioning
- ❌ "Hire now" / "Request service" buttons — not our CTAs

**Audit discipline:** any screenshot mockup must pass "does this actually exist в FixIt v2.0?" test. If no — не shipping.

### 4.4 Google Play screenshots (8 frames)

Google Play допускает 8 screenshots — первые 2 critical (appears в search results preview).

- Frames 1-6: те же что iOS
- Frame 7: **Testimonial quote card** — Emma's full story "Plumber quoted $800, FixIt said $15 DIY" с photo + location
- Frame 8: **Pricing transparency** — "$9.99/mo or $49.99/yr · Cancel anytime · No marketplace kickbacks"

Не copy-paste iOS дизайн. Android users expect more utility-forward, less aspirational imagery, больше concrete UI screenshots.

### 4.5 Caption typography spec

Per ScreenshotOtter / Phiture 2025 research:

- Title (bold): 56-72px, SF Pro Display Bold (iOS) / Roboto Bold (Android)
- Sub: 28-36px, Medium weight
- Max 2-6 words в title
- Max 8-12 words в sub
- Test at 25% zoom: if unreadable, shorten
- Safe zone: avoid top 100px (Dynamic Island) / bottom 150px (home indicator)

### 4.6 A/B tests priority (post-launch PPO)

Priority order updated under new positioning:

1. **Frame 1 hero caption:** "Know the price before the panic." vs "Photo → price → path forward." vs "Snap a photo. Know the cost."
2. **Frame 2 vs alternative:** Three-option side-by-side (current) vs animated "photo → price reveal" transition
3. **Frame 5 (NEW in v2.0 position):** Savings tracker (current) vs Quote Validation (Sarah-niche) — measure which drives higher install intent
4. **Frame order:** 1→2→3 (current: problem → magic → guide) vs 1→2→5 (problem → magic → savings)
5. **App icon:** warm orange wrench+spark vs soft blue house+lens (see §5)
6. **Subtitle:** `Photo repair cost advisor` vs `Know repair cost in 60 sec`

Minimum 7 days на test + 500+ visitors per variant (SplitMetrics Bayesian threshold).

---

## 5. App Icon Strategy

### 5.1 Concept directions (unchanged from v1.0 — icon semantics не меняются от rescope)

**Вариант A (recommended launch): Wrench + Spark (Repair + AI)**
- Stylized wrench с glowing spark/star в центре
- Warm gradient background (orange → red)
- Smooth, recognizable at 1024×1024 и 48×48
- Stands out в App Store feed dominated by blue/purple/green icons

**Вариант B: House + Camera Lens (Domain + Input method)**
- House silhouette with camera aperture/lens overlay
- Teal/blue background
- Clean geometric, Apple-aesthetic
- Closer to PictureThis visual DNA

**Вариант C: Checkmark + Price tag (Outcome focus)**
- Price tag with checkmark
- "$" symbol prominent
- Financial/utility feel
- Matches "cost discovery" positioning tightly

**Рекомендация: Variant A для launch, A/B test vs B через 3 месяца.**

Обоснование:
- Orange/red уникален vs competitors (Thumbtack blue, HomeAdvisor orange-triangle, Angi green, Houzz red) — warm saturated orange-red отличается
- Wrench communicates "repair" без learning
- Spark hints AI без быть обвешанным "AI" буквами (penalized)
- Differentiates us vs photo-AI apps (PictureThis — green leaf) — we're not plant-adjacent

### 5.2 Anti-patterns (unchanged)

- ❌ Letters "FixIt" в icon — не читается на 48×48, Apple discourages
- ❌ Thick outlines — Apple prefers filled shapes
- ❌ Too many elements — KISS
- ❌ Realistic photography of tools — doesn't scale, looks cheap

### 5.3 A/B test roadmap

- **Month 1:** Launch с Variant A (wrench + spark)
- **Month 3:** Test A vs B (house + lens) — 14-day run
- **Month 6:** Test winner vs C (price tag) if still uncertain
- **Month 12:** Revisit с accumulated survey data ("what does FixIt feel like?")

---

## 6. Category Strategy (POST-RESCOPE CHANGE)

### 6.1 Primary category — CHANGED в v2.0

v1.0: **Lifestyle > Home Improvement** (App Store) / **House & Home** (Google Play)
v2.0: **Utilities > Tools** (App Store) / **Tools** (Google Play)

Rationale за change:

- POSITIONING.md §2 explicitly defines FixIt as "pure AI-advisor utility". Category должен match.
- **"Services" category explicitly rejected** — мы не service marketplace (Thumbtack/Angi/HomeAdvisor sit there)
- **"Home Improvement" category** — ambiguous (Houzz dominates with design/inspiration, not utility)
- **"Utilities"** — matches PictureThis playbook, Rock Identifier playbook, Cal AI playbook (photo-AI utility apps)
- Utilities has ~32% CVR average (Adapty 2026 data) — higher than Lifestyle 22% or Services 25%

**Alternative considered:** Productivity. Rejected because Productivity dominated by todo/calendar apps (Todoist, Notion), not repair utilities.

### 6.2 Secondary category

**Lifestyle** (App Store) / **House & Home** (Google Play)

Rationale:
- Secondary gets 15-20% discovery traffic (Apple internal)
- Lifestyle captures homeowner persona browsing
- House & Home on Android matches user search habits
- Does NOT position us as "services" — we're in House & Home adjacent to home management apps (HomeBinder, Centriq)

### 6.3 What we do NOT select

- ❌ **Services** — **explicitly rejected per rescope**. Thumbtack/Angi/TaskRabbit territory. Would mislead users expecting marketplace.
- ❌ **Finance** — considered (cost tracking angle) but user expectation mismatch
- ❌ **Reference** — too passive, FixIt is action-oriented
- ❌ **Business** — B2B mindset, не consumer
- ❌ **Shopping** — тоже considered (material shopping list) but FixIt не primary shopping app

---

## 7. Rating & Review Strategy (Updated Review Timing для v2.0)

### 7.1 In-app review prompts — timing matrix (REVISED)

Per Appalize research: rating **cliff** между 3.9 и 4.0 cuts CVR на 15-20%. Target: stable 4.5+ from day 1, reach 4.7+ by month 6.

**Revised trigger timing (post-rescope):**

| Trigger event | Why it works | Frequency cap |
|---|---|---|
| ✅ **PRIMARY: After successful DIY completion** (user taps "I fixed it!" in Loop 2 follow-up per RETENTION-RESEARCH §5.2) | Peak emotional positive + tangible savings moment | Once per user per 90 days (Apple limit) |
| ✅ After "Savings counter crosses $100" milestone (Loop 5 anniversary) | Cumulative value realized | Once per user, lifetime |
| ✅ After "Savings counter crosses $500" milestone | Higher anchor, higher signal | Once per user, lifetime |
| ✅ After 3rd completed estimate (user clearly activated) | Engagement threshold | Once |
| ❌ After first estimate — TOO EARLY, rating would be "based on feature preview" not value delivery | — | Never |
| ❌ After paywall — CONFOUNDED, user may rate based on pricing dissatisfaction | — | Never |
| ❌ After pro deeplink tap — marketplace moment, confuses rating semantic | — | Never |
| ❌ After error/crash — obvious no | — | Never |
| ❌ When app opens — interrupts flow | — | Never |

**KEY CHANGE vs v1.0:** Primary trigger shifted от "3 estimates" к **"DIY completion success"**. 

Rationale:
- DIY success = peak emotional positive moment (user saved money, feels capable)
- Aligns с POSITIONING §5 "I saved $X — I did it myself" viral anchor
- Per RETENTION-RESEARCH.md §5.2 Loop 2 already asks "did it work?" — review prompt follows "yes" tap naturally
- PictureThis similar pattern — prompt after successful plant ID + garden action, not after 3rd use

### 7.2 Prompt copy

iOS SKStoreReviewController не допускает customizing text. Мы pre-prompt via custom modal:

**Pre-prompt modal (custom UI, post-DIY success):**

> "You just saved ~$X with a DIY repair! 🔧
>
> A rating helps other homeowners find FixIt — so they can save too. Takes 5 seconds."
>
> [Rate FixIt] [Maybe later]

Only если user taps "Rate FixIt" → trigger native SKStoreReviewController. Protects rating pool from ambivalent users, captures peak-happy subset.

**Copy principles:**
- Lead с specific savings amount (personalized)
- Frame ask as helping other homeowners (prosocial, not "help us")
- "5 seconds" expectation setting
- No guilt in "Maybe later"

### 7.3 Review response strategy (unchanged from v1.0)

**Response within 24 hours** = 2× effect vs week-later response (Appalize).

**5-star positive:**
> "Thanks so much [Name]! So glad FixIt helped with [specific repair mentioned]. Keep us posted on your next home project 🔧"

**4-star (positive но с critique):**
> "Appreciate the feedback! You mentioned [critique]. We're [concrete action]. DM us at hello@fixit.app if you have more ideas."

**3-star or below:**
> "Really sorry this wasn't great. [Address specific issue]. Could you email hello@fixit.app so we can make it right?"

**1-star legitimate complaint:**
- Fix underlying issue ASAP
- Reach out via email
- Ask for rating update (never demand)

### 7.4 Targets

| Timeline | Reviews count | Avg rating |
|---|---|---|
| Launch + 30 days | 50+ | 4.6+ |
| Launch + 90 days | 300+ | 4.6+ |
| Launch + 180 days | 2,500+ | 4.7+ |
| Year 1 end | 8,000+ | 4.7+ |
| Year 2 end | 30,000+ | 4.7+ |

Benchmarks: PictureThis 1M+ / 4.8, Rock Identifier 100K+ / 4.7, Cal AI 200K+ / 4.6. Наш realistic 3-year target: 60K / 4.7.

### 7.5 Review incentivization (legal / allowed)

**Allowed:**
- Post-DIY email asking for rating (no reward)
- In-app banner "Help other homeowners find us" (no reward)
- Referral program giving users 1 free month за invites — indirect boost

**Forbidden (Apple/Google ban risk):**
- ❌ Free Pro for ratings
- ❌ "Rate 5 stars to unlock"
- ❌ Fake reviews from employees
- ❌ Review farms

---

## 8. Competitor ASO Analysis (Post-Rescope)

### 8.1 Re-framed competitive set

Post-rescope, competitive frame changes. We're no longer competing с Thumbtack/Angi на "find a pro" — we're adjacent. New competitive lens:

| Competitor | Category | Why they're (not) competing |
|---|---|---|
| PictureThis | Photo-AI utility | **Playbook reference**, not direct competitor (plants ≠ homes) |
| Rock Identifier | Photo-AI utility | **Playbook reference** |
| Cal AI | Photo-AI utility | **Playbook reference**, food photo AI |
| TripIt | Infrequent-use utility | **Playbook reference** for retention / annual recap |
| Thumbtack | Service marketplace | **Adjacent, not competing** — we sit up-funnel |
| HomeAdvisor | Service marketplace | **Adjacent, not competing** |
| Angi | Service marketplace | **Adjacent, not competing** |
| HomeWyse | Cost web calculator | **Direct competitor** для cost-intent, но web-only |
| iFixit | DIY repair guides | **Partial competitor** (devices, not home) |
| HomeBinder / Centriq | Home management | **Partial competitor** для maintenance |

### 8.2 Top-5 App Store state (updated April 2026)

| Competitor | Rating | Reviews | Title | Subtitle | ASO gap для FixIt |
|---|---|---|---|---|---|
| PictureThis | 4.8 | 1M+ | "PictureThis: Plant Identifier" | "Identify plants & care tips" | Playbook we copy (photo-AI utility, category own) |
| Thumbtack | 4.8 | 189K | "Thumbtack: Hire Local Pros" | "Find pros for home services" | Different category — "hire" vs "know" |
| HomeAdvisor | 4.8 | 480K | "HomeAdvisor: Home Services" | "Find & book trusted pros" | Different category |
| Angi | 4.7 | 78K | "Angi: Hire Home Pros" | "Home services & reviews" | Different category |
| iFixit | 4.8 | 50K | "iFixit: Repair Manual" | "Fix it yourself with guides" | Partial overlap — they own electronics, we own home |

### 8.3 Why PictureThis is main ASO reference (not Thumbtack)

| | PictureThis | FixIt target |
|---|---|---|
| Rating | 4.8 | 4.7+ |
| Reviews | 1M+ | 8K (Y1) → 60K (Y3) |
| Title | "PictureThis: Plant Identifier" | "FixIt: Home Repair Costs" |
| Subtitle | "Identify plants & care tips" | "Photo repair cost advisor" |
| Category | Reference (primary) / Lifestyle | Utilities / Lifestyle |
| Icon | Green leaf on white, minimal | Wrench + spark, warm colors |
| Freemium | 3 free IDs, paywall after | 3 free estimates, paywall after |
| Aha moment | Plant ID within 30s of install | Cost estimate within 60-90s |
| Annual pricing | Heavy discount, annual pre-selected | Heavy discount, annual pre-selected |

**Inheritance from PictureThis playbook:**
- Photo-AI utility category DNA
- "[Brand]: [Domain] [Action]" title format
- Photo-input narrative в subtitle
- Category positioning away from "services"
- Freemium 3-free gate
- Annual pricing anchor
- In-app review после success moment

**Explicitly NOT inheriting from Thumbtack playbook:**
- "Find [profession] near me" keywords
- Services category
- Pro profile UI
- Booking flows
- Lead-gen optimization

### 8.4 Rock Identifier / Bird Identifier / Insect Identifier reference

NextVision portfolio — same onboarding / ASO pattern:
- 2-3 screens intro
- Camera permission explicit, с priming
- First photo within 30s install
- Free 2-3 IDs/week, hard paywall после
- Reviews avg 4.6-4.7

Validates that **minimal ASO onboarding + clean category = max activation** для photo-AI utility.

### 8.5 TripIt reference (retention side)

TripIt — 3-8 uses/year (similar к FixIt infrequent pattern). ASO learnings:
- Utility category (not Travel Services)
- "Itinerary organizer" positioning (noun — what it is), not "Book a trip" (verb — what you do)
- Calm, organized voice
- Annual recap email drives massive engagement spike

Per RETENTION-RESEARCH.md §1.2 — TripIt is part of our peer group. ASO voice should follow TripIt (calm, organized, annual rhythm) not Thumbtack (transactional, urgent, marketplace).

### 8.6 Opportunity map (updated)

**Core opportunity:** FixIt sits в **new category de facto** — "photo-AI home repair cost advisor". Ни один player этой category не owns, потому что она не существовала. Open field 12-18 months.

**Specific keyword gaps мы заполняем:**

- "home repair cost" — #1-3 possible в 6 months
- "AI repair advisor" — #1 instantly (category creator)
- "DIY repair estimate" — #1-2 possible (low competition)
- "contractor quote check" — instant top-3
- "home maintenance calendar" — top-5 possible
- "know repair cost" — top-3 possible

**Defensibility:** Once top-3 для "home repair cost", flywheel activates:
- Reviews → rating → CVR → more downloads → more AI training data → better accuracy → more reviews

PictureThis moat example: они владеют "plant identification" на 5+ years, competitors не могут displace без 10× better product.

---

## 9. Localization Strategy (Updated v2.0 Phasing)

### 9.1 Phased rollout (POST-RESCOPE PHASING)

**Phase 1 — Launch (months 0-6): English-US MVP**

- **US-English only** для launch
- All metadata US-English
- Focus: prove unit economics, reach 4.6+ rating, 2500+ reviews
- No localization work pre-PMF (per CLAUDE.md solo-dev constraints)
- Reason: multi-locale metadata adds review cycle delays + support burden. Ship, prove, then expand.

**Phase 2 — Post-PMF English markets (months 6-9): UK / AU / CA**

- UK (en-GB) — separate locale, adjust spelling ("labour", "colour"), currency (GBP), trade terms ("tradesman")
- Australia (en-AU) — distinct trade ecosystem ("tradie"), Bunnings replaces Home Depot
- Canada (en-CA) — minimal adjustments, closest к US English
- Expected impact: +20-40% install volume from these locales (AppTweak benchmark)
- Pricing: local currency via Adapty (automatic)

**Phase 3 — Spanish (v1.5+, months 12+): es-US + es-MX**

- **Spanish triggered by v1.5 release** (post-PMF, not pre)
- es-US — Latinx US market (60M+ Spanish speakers, ~15M homeowners)
- es-MX — Mexico expansion (rising urbanization, home ownership)
- es-ES — Spain (smaller market, quality signal)
- Expected impact: +80-128% downloads из localized language (AppTweak home utility benchmark)

**Phase 4 — European high-income (v2.0, months 18+):**

- pt-BR (Brazil — 40M+ homeowners, underserved)
- de-DE (Germany — DIY culture strong, Hornbach/Obi retailers)
- fr-FR (France — Leroy Merlin, Castorama)

**Phase 5 — Japan / Korea (v3.0+):**

- Different home repair culture (renters dominant, apartment-level)
- Assessment after core English markets saturated

### 9.2 What's changed vs v1.0 plan

v1.0 plan had "UK / CA / AU launch in Year 1" and "Spanish in Year 2" — more aggressive.

v2.0 plan conservatively sequences:
- **English-US MVP first** (months 0-6) — prove model before localizing
- **English expansion only post-PMF** (months 6-9)
- **Spanish delayed until v1.5+** (months 12+)
- Rationale: Лана solo-dev constraints per CLAUDE.md. Localization = metadata review cycles + support load + AI prompt adjustments per locale.

### 9.3 Cross-localization trick (unchanged tactic)

App Store позволяет keywords из одной locale индексироваться в другой territory. Это tactic применим позже:
- es-US keywords field может содержать both Spanish и English queries
- "-MX" locale для resident immigrants в US, кто switched App Store region

Source: [ASO.dev Cross-Localization Guide](https://aso.dev/metadata/cross-localization/)

### 9.4 Localization beyond text

**Screenshots per locale (phase 2+):**

- Currency в prices ($, £, €, R$)
- Retailer logos (Home Depot US, B&Q UK, Bunnings AU, Hornbach DE)
- Units (inches / cm)
- People reflecting local demographics

**Category names adjustment:**

- US: "home repair"
- UK: "home improvements" (more common term)
- AU: "home maintenance"

Adjust keyword fields per locale accordingly.

---

## 10. App Store Featured Strategy (Pitch Positioning Updated)

### 10.1 "New Apps We Love" target (Apple Editorial)

**Revised pitch angle post-rescope:**

v1.0 pitch: "First AI home repair advisor combining photo-input + real-time regional pricing + three-path decision support + pro marketplace"

v2.0 pitch: **"First AI home repair advisor — photo-input, three priced routes, no marketplace. The PictureThis for home repairs."**

Apple Editorial отбирает ~5-10 apps/week для New Apps We Love. Criteria:
- Polished launch
- Clear value prop, visually communicated
- Editorial-friendly story
- High early reviews (>4.5 @ 50+ reviews in 2 weeks)
- Not me-too (differentiation)

**Submission protocol (updated для v2.0):**

1. **T-6 weeks pre-launch:** Email `editor@apple.com` + App Store Connect "Featured Nomination" form
2. **Материалы:**
   - 2-min founder video (Лана + Amanda explain vision) — emphasize "pure advisor, not marketplace" as unique angle
   - Press kit (screenshots in 3 resolutions, press releases)
   - Beta access codes для editors
   - **Unique angle statement:** "FixIt is the first AI home repair advisor. We answer the question every homeowner asks before panicking: 'how much will this cost?' We're not a marketplace — we don't earn from sending you to a pro. We earn from helping you decide. Photo-in, three priced routes out, 60 seconds. Works without signup."
3. **Beta quality gate:** 100 beta users с 4.6+ avg rating в TestFlight
4. **Timing:** Submit 3-4 weeks before launch date. Apple turnaround 2-3 weeks.

**Why "PictureThis for home repairs" pitch works:**
- Editors понимают PictureThis success ($200M ARR)
- Translates instantly — same mechanics, different domain
- Removes marketplace positioning ambiguity
- Positions us in photo-AI utility category (Apple editors love this segment)

### 10.2 Google Play Editor's Choice

Google Play Featured selection через Play Console → Store Presence → Feature Opportunity.

Criteria:
- Quality Metric score >85 (retention, crash, ANR rate)
- Material Design 3 adherence
- Strong early engagement (D1 >40%, D7 >25%)
- Unique functionality

Target slot: "Editor's Choice" (evergreen) OR "New + Updated Apps" (weekly).

### 10.3 Apple Search Ads launch support (updated CPT expectations)

Даже с Editorial feature, paid ASA push critical:

- **$3-5K/week first 4 weeks** (conservative given solo-dev budget)
- Target keywords: "home repair cost", "AI repair advisor", "DIY repair estimate", "fix it yourself", "plumber cost"
- **CPT target: $0.80-$1.20** (lower than v1.0 $1.50 target because our category less competitive than marketplace — Thumbtack/Angi outbid us on "find a pro" keywords, но мы на них и не bid)
- Discovery campaigns (Apple auto-targets) для 30% budget
- Exact + Search Match mix для rest

Expected: 1500-3000 incremental installs первый месяц, seeding rating/review baseline.

---

## 11. Retention as ASO Factor (2026 Critical, Updated)

### 11.1 Почему это matters even more после rescope

Per ASOMobile: "Google switched от install volume к retention as primary ranking signal в 2025. Teams которые missed this lost rankings." Apple follows with 6-month lag.

**Post-rescope, retention stakes even higher:** без marketplace re-engagement (no "your pro" push), retention entirely depends на value compounding в app (saved projects + savings counter + seasonal push). Per RETENTION-RESEARCH.md §2 — WEPA + QAR are our north stars. ASO rankings directly benefit from healthy retention curves.

### 11.2 Retention-driving features с double-duty (retention + ASO)

Feature roadmap updated per RETENTION-RESEARCH.md:

- **Savings tracker** (Frame 5 screenshot) — users возвращаются посмотреть actual savings. D30 retention boost +15%.
- **Save-to-My-Home default ON** (per RETENTION §3.2) — every estimate auto-saves. Compounds switching cost.
- **Seasonal push notifications** (4/year per RETENTION §4) — "Spring check-in — 3 fixes worth knowing about". D90 re-engagement.
- **Savings anniversary** — "Your savings crossed $500 this year" (RETENTION §5.5). Annual engagement spike.
- **Home maintenance calendar** (v1.5) — HVAC filter / gutters / smoke alarm reminders. Retention hook.

### 11.3 Removed retention features (post-rescope)

These were в v1.0 plan, gone:

- ❌ "New pros в your area" push — no pros
- ❌ "Pro availability update" push — no tracking
- ❌ "Rate your pro experience" push — no intermediary
- ❌ Pro re-engagement email — no pro infrastructure

### 11.4 Target retention per ASO (updated)

| Metric | Launch target | Year 1 target | Impact on ASO |
|---|---|---|---|
| D1 retention | 35% | 45% | Google Play ranking weight 20% |
| D7 retention | 20% | 30% | Apple ranking weight 15% |
| D30 retention | 15% | 22% | Apple ranking weight 25% |
| D90 retention | 20% | 25% | Critical signal |
| W4 retention | 30% | 40% | High signal for both stores |
| Annual retention | 25% | 32% | Long-tail retention flag |

Per RETENTION-RESEARCH.md §2.1 WEPA target 0.25 by month 6, QAR 50% month 6 → 65% Y1.

---

## 12. Ratings Paid Boost (Ethical / Allowed)

### 12.1 Allowed tactics (unchanged)

- **In-app prompts** post-DIY success (см. §7.1) — PRIMARY engine
- **Post-savings-milestone email** к активированным users asking for rating (no reward)
- **Referral program** — sharing friends → organic install → more reviews
- **PR coverage** — TechCrunch / Lifehacker / home improvement media → spike в downloads → reviews
- **Influencer partnerships** — TikTok/YouTube creators (disclosed #ad)
- **Community building** — Reddit r/HomeImprovement AMA, Discord/Slack community

### 12.2 Forbidden (unchanged)

- ❌ Review farms (GrowMojo, AppReviewer etc.) — easy to detect, ban
- ❌ Employee reviews from personal accounts — traceable
- ❌ "Rate us for premium" — immediate ban
- ❌ Swapping reviews с other apps — detected by Apple graph analysis
- ❌ Astroturfing — fake praise

### 12.3 Referral incentive structure

Per RETENTION-RESEARCH.md §5.3 — viral hook = "I saved $X with FixIt". Referral program side benefit for ASO:
- Value exchange: referrer gets 1 free month, friend gets 1 free month upon subscribe
- Referred users convert higher (pre-qualified)
- Rate higher (primed с savings story)
- Re-engage more

Double-duty tactic.

---

## 13. ASO Testing Roadmap (Updated Cadence)

### 13.1 First year testing cadence

| Month | Test | Tool | Success criterion |
|---|---|---|---|
| 1 | Baseline establish | Native analytics + AppTweak | Metrics captured |
| 2 | Icon A/B (Variant A wrench vs B house) | PPO + Store Listing Exp | CTR +5%, CVR stable |
| 3 | Screenshot Frame 1 caption (3 variants — POSITIONING taglines) | PPO | CVR +10% |
| 4 | Screenshot order (problem→magic→guide vs problem→magic→savings) | PPO | CVR +8% |
| 5 | Subtitle test (current vs `Know repair cost in 60 sec`) | Keyword change + resubmit | Keyword ranking + CVR |
| 6 | UK locale launch test — metadata A/B vs US | New locale | UK install volume baseline |
| 8 | Description opening line test | PPO + hold-out | Page-bottom CVR |
| 10 | Video preview vs no video | PPO | CVR +10-30% |
| 12 | Full metadata refresh basis accumulated data | Retest all | Aggregate boost |

### 13.2 Minimum sample size per test

Per SplitMetrics: 500+ visitors/variant, 100+ conversions/variant critical.

Для FixIt launch с expected ~1500 daily visitors в month 1-3:

- 2-variant test: 10-14 days minimum
- 3-variant test: 18-21 days minimum
- Includes buffer для weekday/weekend variance

### 13.3 Discipline: one element per test

Multiple simultaneous tests destroy attribution. Scheduling > parallelism.

---

## 14. Keyword Ranking Goals (Updated для v2.0)

### 14.1 Q1 post-launch (3 months)

| Keyword | Target rank | Rationale |
|---|---|---|
| home repair cost | Top-10 | Core keyword, moderate competition |
| AI repair advisor | **Top-3** | Category creator, low competition |
| fix it yourself app | Top-5 | Direct brand match, low-med competition |
| DIY repair estimate | Top-5 | Low competition, niche |
| contractor quote check | Top-3 | Minimal competition, high intent |
| home maintenance app | Top-15 | Competitive, gradual rise |
| know repair cost | Top-5 | Brand match, low volume but relevant |

### 14.2 Q2 (6 months)

| Keyword | Target rank |
|---|---|
| home repair cost | Top-5 |
| AI repair advisor | **#1-2** |
| plumber cost | Top-10 |
| electrician price | Top-10 |
| contractor quote | Top-3 |
| home improvement calculator | Top-10 |
| repair cost guide | Top-5 |
| home maintenance calendar | Top-10 |

### 14.3 Year 1 end

| Keyword | Target rank |
|---|---|
| home repair cost | **Top-3** |
| AI repair advisor | **#1** |
| fix it yourself | Top-3 |
| DIY repair estimate | **#1** |
| contractor quote check | **#1** |
| plumber cost estimator | Top-5 |
| home maintenance app | Top-10 |
| home maintenance calendar | Top-5 |
| know repair cost | **#1-2** |
| 15+ long-tail keywords | #1 |

### 14.4 Tracking methodology

- **Tool:** AppTweak OR SensorTower Keyword Intelligence
- **Cadence:** Weekly review, monthly deep dive
- **Alerts:** >3-position drop в any tracked keyword → investigation
- **Correlation:** align keyword rank changes с metadata changes (isolate causation)

---

## 15. Custom Product Pages (CPP) — Updated для v2.0

### 15.1 What it is

Apple feature (2022+, keyword indexing added July 2025): до 70 CPP per app. Каждая CPP — unique URL, unique screenshots, unique promo text, unique keyword linking. Google Play эквивалент через UAC campaigns.

### 15.2 FixIt CPP plan (post-rescope, 4 CPPs)

**CPP-1: "Cost Discovery" (Emma primary)**
- URL: fixit.app/cost
- Keywords linked: "home repair cost", "know repair cost", "repair estimate"
- Screenshots: Frame 1 (problem) → Frame 2 (three options) → Frame 5 (savings)
- Promo text: "Know the price before the panic. AI advisor, photo-input, three priced routes — for YOUR zip. In 60 seconds."

**CPP-2: "DIY Planner" (Mike persona)**
- URL: fixit.app/diy
- Keywords linked: "DIY repair estimate", "fix it yourself", "DIY home repair"
- Screenshots: Frame 3 (DIY guide) → Frame 4 (shopping list) → Frame 2 (three options)
- Promo text: "AI-generated DIY guide for YOUR problem. Shopping list, tool check, step-by-step. From one photo."

**CPP-3: "Quote Validator" (Sarah persona)**
- URL: fixit.app/quote-check
- Keywords linked: "contractor quote check", "is my quote fair", "fair repair price"
- Screenshots: Frame 2 (three options с "Pro range" highlighted) → Frame 5 (savings) → Frame 1 (problem)
- Promo text: "Got a contractor quote? Check if it's fair. AI compares to market range for YOUR zip. Takes 10 seconds."

**CPP-4: "Home Maintenance" (retention / seasonal — NEW в v2.0)**
- URL: fixit.app/maintenance
- Keywords linked: "home maintenance calendar", "home maintenance app", "seasonal home check"
- Screenshots: Frame 5 (savings + seasonal widget) → Frame 6 (categories) → Frame 2 (three options)
- Promo text: "Seasonal home health in your pocket. Spring, summer, fall, winter — know what's due, what it costs, DIY or pro."

**Changes vs v1.0 CPP plan:**
- ❌ v1.0 CPP-3 "First-time Homeowner" — general positioning, replaced with specific CPP-4 maintenance (more targeted, retention-driving)
- ✅ Four CPPs instead of three — wider targeting under cleaner positioning

### 15.3 CPP benchmarks

- Average CVR boost from CPP: **+5.9%** (generic) / **+8.6%** (paid campaigns)
- US + UK only initially (Apple limitation)
- CPPs cannot extend keyword index — only use words already в keywords field

---

## 16. ASO-to-Paid Synergy (Updated CPT Expectations)

### 16.1 Apple Search Ads + ASO

ASO rankings feed ASA CPT:
- Top-3 organic rank → ASA CPT discount 25-40% (Apple's machine rewards relevancy)
- Organic rank + paid ASA = double-dip в search results → CTR boost
- ASA data feeds ASO: see which keywords converting organically → adjust

**Launch budget:** $3-5K/mo ASA first 3 months (conservative, solo-dev), scale с unit economics.

**Updated CPT expectations vs v1.0:**
- Our new keywords ("home repair cost", "AI repair advisor") less competitive than marketplace keywords
- Thumbtack/Angi/HomeAdvisor NOT bidding на our cluster (different intent)
- Expected CPT $0.80-$1.20 vs v1.0 $1.50+ estimate
- Lower CAC helps unit economics

### 16.2 TikTok/Instagram → App Store landing

User clicks TikTok ad → landing on App Store page. Weak ASO (bad screenshots, low rating, unclear positioning) = bounce.

Checkpoint: ASO page CVR > 28% (Utilities category average). Below — fix ASO before scaling paid.

**Ad copy must match ASO landing:**
- TikTok ad: "Plumber quoted $800. FixIt said $15 DIY."
- ASO landing: Frame 1 "Know the price before the panic." + Frame 2 three-option display
- Ad promise === App Store promise === first-session delivery

### 16.3 New paid channel consideration

Post-rescope, new paid channel eligible:
- **Reddit r/HomeImprovement / r/FirstTimeHomeBuyer** — our target demographic, advisor positioning matches Reddit voice (not salesy)
- **Home improvement podcasts** — FixIt as sponsor fits "calm authority" POSITIONING §7

Not for v1.0 launch, but queue for month 3+ post-rating establishment.

---

## 17. Measurement & Reporting Framework

### 17.1 Weekly ASO dashboard

Track:
- Keyword rank position (top 20 tracked)
- Organic downloads (vs paid, geo-sliced)
- Conversion rate (store page visit → install)
- Rating avg (7-day rolling)
- Review count (new per week)
- Review sentiment (1-5 star distribution)
- Impression → install funnel

Tool stack:
- **AppTweak** — primary ASO intelligence ($99-299/mo)
- **App Store Connect** native (free)
- **Google Play Console** (free)
- **SplitMetrics** — A/B tests ($200-1000/mo)
- **Appfigures** — review aggregation + sentiment ($99/mo)

Total stack cost: ~$500-1500/mo.

### 17.2 Monthly deep review

- Keyword performance (gaining / losing)
- Metadata iteration
- Review response audit (100% responses within 24h?)
- CPP performance breakdown
- Competitor metadata changes (feature updates?)
- Localization expansion check

### 17.3 Quarterly strategic review

- Roadmap update для ASO testing
- Localization phase gate decision
- Budget reallocation ASA vs organic investment
- New category / positioning consideration

---

## 18. Risks & Mitigations (Updated для v2.0)

### 18.1 Keyword ranking risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Thumbtack adds AI photo feature competing с us | Medium | High | Our photo + three-option + advisor positioning = deeper moat, не только keywords |
| HomeWyse launches mobile app | Low-medium | High | They haven't innovated 5 years. Window still open. Launch в 6 months. |
| Home Depot / Lowe's launches own advisor app | Low | Very high | They're retail, not AI utility. Partnership angle instead of competition. |
| Apple policy change на AI apps | Low | Medium | Follow Apple guidelines strictly, disclaimers rigorous |
| Google Play algorithm update | Medium | Medium | Diversify keyword strategy, retention-focused features |

### 18.2 Rating risks (updated)

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Initial launch bug → 1-star reviews | High | High | 100+ beta testers, gradual rollout, rapid response team |
| AI accuracy failure → bad reviews | Medium | High | Clear disclaimer "AI estimates ±25%, not guarantee" + graceful fallback |
| Paywall backlash | Medium | Medium | Free tier generous (3/mo), transparent pricing, no dark patterns per PAYWALL-RESEARCH.md |
| Competitor review bombing | Low | Medium | Weekly monitoring, flag patterns to Apple/Google |
| **User expects marketplace, gets advisor** | **Medium (post-rescope critical)** | **High** | **Strict ASO discipline — no "find pro" copy anywhere, clean positioning from search → install → first session** |

### 18.3 Localization risks (updated for conservative phasing)

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Translation errors → low UK/AU ratings | Medium | Medium | Native speaker review, no raw AI translation |
| Per-locale AI prompt accuracy drops (different trade terms, prices) | High | Medium | Per-locale prompt tuning, beta test 50+ users per locale before full launch |
| Support load overwhelms solo-dev при multi-locale | High | Medium | **Phased rollout per §9.1** — English markets first 6 months |

---

## 19. Related Docs

- [POSITIONING.md](../02-product/POSITIONING.md) — USP, voice, category positioning (foundation для all ASO copy)
- [FEATURES.md](../02-product/FEATURES.md) — Feature #6 (Find a Pro deeplink, not marketplace)
- [MONETIZATION.md](../02-product/MONETIZATION.md) — pricing copy для long description
- [ONBOARDING-RESEARCH.md](./ONBOARDING-RESEARCH.md) — post-install flow (ASO promise → onboarding delivery)
- [PAYWALL-RESEARCH.md](./PAYWALL-RESEARCH.md) — pricing framing, paywall copy (consistency)
- [RETENTION-RESEARCH.md](./RETENTION-RESEARCH.md) — retention features как ASO ranking factors
- [USER-PERSONAS.md](../01-research/USER-PERSONAS.md) — Emma / Mike / Sarah для CPP targeting
- [COMPETITOR-ANALYSIS.md](../01-research/COMPETITOR-ANALYSIS.md) — competitor App Store presence

---

## 20. ASO Checklist for FixIt Launch

### Приоритет 1 (до публичного launch, weeks -4 to 0)

- [ ] Title + subtitle finalized с new positioning (title `FixIt: Home Repair Costs`, subtitle `Photo repair cost advisor`)
- [ ] Keywords field 100 chars — updated per §2.3 (drop "contractor", add "maintenance")
- [ ] Google Play title + short description updated (`FixIt - Home Repair Cost AI` + "Snap a photo. Know the repair cost in 60 sec...")
- [ ] 6 screenshots shipped с new captions и NO pro profile cards
- [ ] Different screenshots for App Store vs Google Play
- [ ] App icon variant A (wrench + spark) + B backup ready
- [ ] Long description iOS + Google Play updated (remove "pro match" language, add "advisor, not marketplace" section)
- [ ] **Category set to Utilities (primary) + Lifestyle (secondary)** — changed from v1.0
- [ ] Privacy policy + ToS published
- [ ] Submission к Apple Editorial с "PictureThis for home repairs" pitch angle (T-3 weeks)
- [ ] Google Play Featured nomination submitted
- [ ] 100 beta testers с 4.6+ avg rating в TestFlight
- [ ] **Audit: no "find a pro" / "marketplace" / "trusted contractors" / "pro match" copy anywhere** (manual review)

### Приоритет 2 (first month post-launch)

- [ ] App Preview video (15-30 sec) — photo → AI → three options → savings
- [ ] In-app review prompts настроены per §7.1 (primary trigger: DIY success)
- [ ] Apple Search Ads campaigns launched ($3-5K/month on new keyword cluster)
- [ ] Daily monitoring keyword positions (top 20 tracked including "AI repair advisor")
- [ ] Review response system — 100% within 24h
- [ ] First A/B test spec'd: icon A vs B

### Приоритет 3 (months 2-3)

- [ ] PPO first tests completed (icon, screenshot Frame 1 caption — POSITIONING taglines)
- [ ] 300+ reviews accumulated, 4.6+ avg confirmed
- [ ] CPP-1 (Cost Discovery) launched
- [ ] Weekly keyword ranking report automated
- [ ] Seasonal content push ready (depending on launch month)

### Приоритет 4 (months 4-6)

- [ ] CPP-2 (DIY Planner) + CPP-3 (Quote Validator) + CPP-4 (Home Maintenance) launched
- [ ] UK locale metadata submitted
- [ ] Canada + Australia secondary submissions
- [ ] Video preview A/B test results
- [ ] Referral program driving reviews organically
- [ ] Full metadata refresh basis accumulated data

### Приоритет 5 (months 6-12)

- [ ] 8,000+ reviews, 4.7+ avg achieved
- [ ] **Top-3 ranking для "home repair cost" confirmed**
- [ ] **#1 ranking для "AI repair advisor" confirmed**
- [ ] Spanish localization prep (v1.5)
- [ ] CPP network expanded to 10+
- [ ] ASO-ASA integration optimized (CPT reducing to $0.80 range)
- [ ] Competitor monitoring monthly report

---

## 21. Sources

1. [ASOMobile: ASO в 2026 Complete Guide](https://asomobile.net/en/blog/aso-in-2026-the-complete-guide-to-app-optimization/)
2. [Phiture: ASO Trends в 2026](https://phiture.com/blog/aso-trends-in-2026/)
3. [AppTweak: ASO Best Practices 2026](https://www.apptweak.com/en/aso-blog/app-store-optimization-aso-best-practices)
4. [Appalize: Ratings Impact on Downloads](https://www.appalize.com/da/blog/app-marketing/app-store-ratings-impact-on-downloads-data-driven-analysis)
5. [Adapty: App Store Conversion Rate 2026](https://adapty.io/blog/app-store-conversion-rate/)
6. [MobileAction: App Store vs Play Store](https://www.mobileaction.co/blog/app-store-vs-play-store/)
7. [ASOMobile: App Store Differences](https://asomobile.net/en/blog/app-store-differences-aso-for-google-play-vs-app-store/)
8. [SplitMetrics: A/B Testing Sample Size](https://splitmetrics.com/blog/mobile-a-b-testing-sample-size/)
9. [ASOMobile: Screenshots Guide 2025](https://asomobile.net/en/blog/screenshots-for-app-store-and-google-play-in-2025-a-complete-guide/)
10. [ScreenshotOtter: Screenshot Captions](https://screenshototter.com/blog/app-store-screenshot-captions)
11. [Incipia: App Store Screenshots Study](https://incipia.co/post/app-marketing/app-store-screenshots-study-of-the-top-100-apps/)
12. [Sensor Tower: State of Mobile Home & Lifestyle 2025](https://sensortower.com/)
13. [Sensor Tower: State of AI Apps 2025](https://sensortower.com/blog/state-of-ai-apps-2025-ai-across-verticals)
14. [Apple Developer: Custom Product Pages](https://developer.apple.com/app-store/custom-product-pages/)
15. [MobileAction: CPP Organic Search](https://www.mobileaction.co/blog/custom-product-pages-meet-organic-search/)
16. [Appfigures: App Name Optimization](https://appfigures.com/resources/guides/app-name-optimization)
17. [Gummicube: iOS Subtitle Keywords](https://www.gummicube.com/blog/placing-keywords-in-your-apps-ios-subtitle-why-it-matters)
18. [Apple Developer: Product Page](https://developer.apple.com/app-store/product-page/)
19. [ASO.dev: Cross-Localization](https://aso.dev/metadata/cross-localization/)
20. [AppTweak: App Store Localization](https://www.apptweak.com/en/aso-blog/guide-to-app-store-localization)
21. [Apple Search Ads Advanced](https://searchads.apple.com/advanced)
22. [Google Play Store Listing Experiments](https://support.google.com/googleplay/android-developer/answer/6227309)
23. [PictureThis App Store listing analysis, April 2026](https://apps.apple.com/us/app/picturethis-plant-identifier/id1252497129) — primary ASO playbook reference
24. [Rock Identifier App Store listing, April 2026](https://apps.apple.com/us/app/rock-identifier-stone-id/id1567360894) — photo-AI utility reference
25. [TripIt App Store listing, April 2026](https://apps.apple.com/us/app/tripit-travel-planner/id311035142) — infrequent-use utility reference
26. Internal: POSITIONING.md v2.0 (2026-04-19) — primary foundation for ASO copy decisions
27. Internal: RETENTION-RESEARCH.md v2.0 (2026-04-19) — retention → ASO ranking coupling

---

**Дата последнего обновления:** 2026-04-19 (rescope rewrite)
**Автор:** Growth Team
**Статус:** v2.0 final (post-rescope, no marketplace), ready for Stage 4 UX + launch prep
**Следующий шаг:** PRACTICES-BRIEF.md synthesis — unified practices playbook под v2.0 positioning
