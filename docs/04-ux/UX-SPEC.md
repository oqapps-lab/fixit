# UX-SPEC.md — FixIt

**Дата:** 18 апреля 2026
**Продукт:** FixIt — AI home repair cost advisor
**Стадия:** UX Design (Stage 4)
**Автор:** UX Team (Лана + Amanda)
**Статус:** Final v1.0
**Companion docs:** [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) | [MONETIZATION.md](../02-product/MONETIZATION.md) | [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) | [RETENTION-RESEARCH.md](../03-practices/RETENTION-RESEARCH.md) | [FUNNEL.md](./FUNNEL.md)

---

## TL;DR

UX-спецификация FixIt построена вокруг семи product principles из PRODUCT-VISION.md. Core interaction — **photo → estimate → three options** за 60 секунд. Приложение infrequent-use, поэтому UX оптимизирован под стрессовый момент ("что-то сломалось, надо решить сейчас"): один тап до фотокамеры с любого экрана, 5-8 секундная labor-illusion анимация после upload, tab-based presentation трёх опций (DIY / Hybrid / Pro) на едином экране.

Ключевые отличия от high-frequency apps: нет daily streaks (infrequent use), нет gamification через badges (конфликт с neutral advisor positioning), нет прогресс-баров "долга" (конфликт с "save money, stay smart"). Вместо этого — lifetime savings counter как персистентный anchor, seasonal maintenance cards как soft-retention hook, before/after gallery как social-currency driver.

Этот документ определяет interaction patterns, animations, haptics, accessibility, copy voice, empty/error/loading states и responsive behavior. Для флоу и screen map см. USER-FLOWS.md и SCREEN-MAP.md (создаются параллельно).

---

## 1. Design Principles (из PRODUCT-VISION)

Семь product principles → семь UX следствий:

### 1.1 Neutral advisor — не push к pros

**UX следствие:** Три опции (DIY / Hybrid / Pro) всегда показываются **в порядке возрастания цены**, не в порядке affiliate revenue. Если DIY стоит $15, он — первая вкладка на screen. Никаких "Recommended" badges поверх Pro option. Никаких красных-жёлтых флагов предупреждающих "сложно, лучше позвоните pro". Только honest disclaimer: "This option requires basic plumbing skills — see tutorial before deciding."

**Anti-pattern:** Thumbtack-style "Find a pro now →" huge CTA, скрывающая DIY. У нас DIY = first-class citizen в UI.

### 1.2 Photo-first, но text-supported

**UX следствие:** Primary CTA на home screen — **камера-кнопка 80×80pt в центре bottom tab bar**, визуально доминирующая. Text search (fallback для случаев "не могу фото сделать") — secondary path, доступен через "Can't take a photo?" link на camera screen, но не в primary nav. 60% onboarding screens посвящены photo-capture флоу (permission, composition tips, retake preview).

**Anti-pattern:** Text input поля на главном экране как primary CTA. Это структурный provoke к ChatGPT-style "describe your problem" который мы сознательно избегаем.

### 1.3 Speed > completeness на первом экране

**UX следствие:** Первый screen результата — **hero card + три option-карты с one-line каждая**. Никаких expanded details, материал lists, step-by-step tutorials. Детали разворачиваются tap-expand. Time-to-first-value target: **<60 секунд от open app до first estimate visible**. Labor illusion 5-8 сек создаёт perception "AI работает серьёзно", но не больше (пользователь anxious).

**Anti-pattern:** Quiz-heavy onboarding Noom-style (80+ screens) — убивает speed, не подходит к нашему use case ("leak на полу прямо сейчас").

### 1.4 Three options, always

**UX следствие:** Estimate-screen использует **horizontal swipe tabs** (DIY | Hybrid | Pro), не dropdown, не accordions. Три опции видны одновременно через tab indicator в top of screen. Tab selection с haptic + animated underline. Никогда один-option screen — даже если одна плохая, показываем с honest "Not recommended because..." текстом.

**Anti-pattern:** Hide expensive option если AI думает DIY лучше. Disrespect к user agency.

### 1.5 Regional truth — honest для user's ZIP

**UX следствие:** Каждая цена на screen сопровождается **location badge**: "$120 · Denver, CO 80203" not "$120 national avg". ZIP entry — required в onboarding, не optional. ZIP change — accessible из Settings через 2 тапа максимум. Если AI не имеет data для конкретного ZIP (rural, Alaska, Hawaii) — честный badge "Regional data limited, showing state average".

**Anti-pattern:** Silent fallback к national averages без disclosure. Ломает trust.

### 1.6 Selective disclaimers — only where needed

**UX следствие:** Gas lines / full electrical rewiring / structural / load-bearing walls → **hard stop screen**: "This repair requires a licensed professional. We don't provide DIY options for [category] due to safety and code compliance." + single CTA "Find a licensed pro." Для всего остального — light-touch disclaimer в small-print при bottom of estimate: "Estimate based on photo; actual cost may vary ±15%. Consult professional for complex cases."

**Anti-pattern:** Fear-mongering disclaimers на каждом screen ("DANGER! Could electrocute you!"). Конфликт с empowering tone.

### 1.7 Friction at conversion, not at value

**UX следствие:** Первые 3 estimates — **без signup, без email, без push permission request**. Paywall trigger — после 3rd estimate completion в данном месяце, с personalized "You've saved $X" hook. Push permission — после first successful estimate, не на onboarding. Email capture — опционально на paywall, не mandatory.

**Anti-pattern:** Hard paywall на screen 2 (PictureThis-reject из PAYWALL-RESEARCH §1.2). Убивает install→active.

---

## 2. Interaction Patterns

### 2.1 Tap / Touch targets

Следуем Apple HIG + Android Material Design minimums:

| Element | Size | Rationale |
|---|---|---|
| **Minimum interactive target** | 44×44pt | iOS HIG минимум; Android — 48dp |
| **Primary CTA buttons** | 56pt height, full-width minus 32pt margin | Thumb-comfortable, visually dominant |
| **Secondary buttons** | 44pt height, auto-width + 16pt padding | Standard chip behavior |
| **Tab bar** | 80pt total (включая 34pt safe area bottom) | Floating camera button needs room |
| **Camera CTA (center of tab bar)** | 64×64pt circular, elevated above tab bar | Primary action; visually distinct |
| **Icon-only buttons (close X, share)** | 44×44pt touch target (icon внутри 24×24pt) | Прыгающий padding для touch comfort |
| **List row tap targets** | 56pt min row height | Two-line rows (title + subtitle) |
| **Segmented control tabs (DIY/Hybrid/Pro)** | 44pt height, equal-width | iOS segmented control pattern |

### 2.2 Gestures

| Gesture | Screen | Action |
|---|---|---|
| **Swipe horizontal** | Estimate screen | Переключает DIY ↔ Hybrid ↔ Pro tabs |
| **Swipe horizontal** | Photo preview | Навигация между несколькими photos одного estimate |
| **Swipe vertical down** | Modal screens | Dismiss modal (paywall, photo viewer, share sheet) |
| **Swipe right** | Push-stacked screens | Back navigation (iOS standard) |
| **Pull-to-refresh** | History tab, saved projects | Reload с server |
| **Long-press** | Estimate card в History | Quick actions menu (Share / Delete / Re-estimate / Add note) |
| **Pinch-to-zoom** | Photo detail view, estimate results с photos | Inspect damage closer |
| **Double-tap** | Estimate hero photo | Zoom to fit / zoom out toggle |
| **Two-finger swipe up** | Estimate screen | Expand full details (alternative to "See full plan" tap) |
| **Shake device** | Any screen | Debug menu (dev-mode only) |

**Gesture conflicts avoided:**
- Tab bar swipe-between-tabs: отключено (bottom tabs — standard iOS, не swipeable globally)
- Force-touch / 3D Touch: не используем (deprecated в iOS 13+)
- Haptic Touch on camera button: вместо 3D Touch — long-press shows quick estimate history

### 2.3 Scrolling behavior

- **Vertical scroll:** Native momentum, bounce at edges (iOS), overscroll glow (Android)
- **Horizontal scroll:** Paginated для estimate tabs (snap to tab), smooth для photo galleries
- **Nested scroll:** Avoided — если screen имеет scrollable content, parent НЕ scrollable (prevents ambiguous gesture)
- **Scroll-to-top:** Tap на status bar — scrolls active screen to top (iOS standard)

---

## 3. Animations

Анимации служат трём целям: **feedback** (action acknowledged), **guidance** (направить attention), **illusion** (perceived speed/labor). Никогда — decoration без purpose.

### 3.1 Core animation library

| Animation | Duration | Easing | Where |
|---|---|---|---|
| **Labor illusion (AI processing)** | 5000-8000ms | Linear progress bar + stepped text reveals | After photo upload, before estimate reveal |
| **Estimate reveal** | 400ms | Ease-out (decelerate) | Hero card fade-in + 20pt upward translate |
| **Tab transition (DIY/Hybrid/Pro)** | 250ms | Spring (iOS UISpringTimingParameters) | Horizontal slide on tab select/swipe |
| **Count-up number (costs)** | 800ms | Ease-out | On estimate reveal: $0 → $247 rolling counter |
| **Modal present (paywall, photo viewer)** | 300ms | Ease-out | Slide up from bottom, 90% opacity backdrop fade |
| **Modal dismiss** | 250ms | Ease-in | Slide down, backdrop fade |
| **Button press** | 150ms | Spring | Scale 0.95 on tap down, spring back on release |
| **Toggle / switch** | 200ms | Ease-in-out | iOS UISwitch default |
| **Loading skeleton shimmer** | 1500ms loop | Ease-in-out | Gradient sweep left→right |
| **Savings counter increment** | 600ms | Ease-out + bounce | On paywall view, on history open |
| **Photo capture flash** | 200ms total | Ease-out opacity 0→1→0 | White overlay on shutter tap |
| **Haptic confirmation (post-capture)** | 300ms | Spring | Checkmark icon pop-in (scale 0→1.1→1.0) |
| **Tab bar camera button pulse** | 2000ms loop (only Day 1) | Ease-in-out | Subtle scale 1.0→1.05→1.0, только первый день |
| **Pull-to-refresh spinner** | Native | System default | iOS UIRefreshControl, Android SwipeRefresh |

### 3.2 Labor illusion detail

Самый важный animation в app. Цель: превратить 3-5 секунд API round-trip в **perceived 8-секундный "AI думает серьёзно" moment** → higher trust, higher subscription conversion.

**Structure:**
```
[0.0-1.5s]  "Analyzing your photo..."      [●○○○○]
[1.5-3.0s]  "Identifying materials..."     [●●○○○]
[3.0-4.5s]  "Pulling Denver prices..."     [●●●○○]
[4.5-6.0s]  "Calculating labor costs..."   [●●●●○]
[6.0-7.5s]  "Finalizing your options..."   [●●●●●]
[7.5-8.0s]  Smooth transition → result
```

Progress bar fills linearly. Text swaps every 1.5s. Location-personalized (ZIP → city name). No bail-out button (seals commitment → reduces early abandon rate).

**Если actual API finishes faster** (e.g., 2 секунды) → animation continues running to minimum 5 секунд, чтобы perceived value не "cheapen". Если API slower than 8 секунд → "Just a moment, finding the best estimate for your home..." extends gracefully without anxiety text.

### 3.3 Reduce Motion support

Если user включил "Reduce Motion" в iOS Settings:
- Labor illusion → static text "Analyzing..." без progress bar, минимум 2s delay (still needs pacing)
- Modal transitions → crossfade вместо slide
- Tab transitions → instant swap
- Count-up → instant display
- Shimmer → solid skeleton colour
- Button press → opacity change instead of scale
- Pulse animations → disabled entirely

Functional animations (tab switching direction indicator, loading spinners) остаются — они convey meaning, не decoration.

### 3.4 Anti-patterns

- **Parallax backgrounds** — motion sickness risk, low value
- **Confetti / celebration particles** — конфликт с "we saved you money, это не игра" tone; mimics gamification apps которых мы не хотим копировать
- **Bouncy springy everywhere** — appropriate на CTA, не на каждом tap
- **Auto-playing videos** — battery, data, attention cost; only opt-in
- **Slow fades >500ms на core actions** — feels laggy, не "premium"

---

## 4. Haptics (Haptics.impactAsync)

Haptic feedback — subtle, purposeful, never excessive. Android uses Haptics.impactAsync equivalents.

| Action | Haptic type | API call |
|---|---|---|
| Primary button tap (estimate CTA, Save, Subscribe) | Light impact | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` |
| Tab switch (DIY/Hybrid/Pro) | Selection | `Haptics.selectionAsync()` |
| Photo shutter success | Medium impact | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)` |
| Estimate reveal (first-time aha) | Success notification | `Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)` |
| Subscription purchase success | Heavy impact | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)` |
| Permission denied / photo failed | Error notification | `Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)` |
| Form validation error (invalid ZIP) | Error notification | `Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)` |
| Long-press quick actions menu | Medium impact | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)` |
| Pull-to-refresh trigger | Light impact | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` |
| Swipe dismiss modal | Selection | `Haptics.selectionAsync()` |
| Paywall tier select | Light impact | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` |

**Respect system setting:** If "Reduce Haptic Feedback" in Accessibility Settings → disable all but critical error notifications.

**Budget:** Максимум 1 haptic на 500ms. Avoid haptic spam (scroll-by-scroll или typing). Cheapens signal.

---

## 5. Accessibility

### 5.1 Стандарты

- **WCAG 2.1 Level AA** baseline
- **Apple HIG Accessibility** (iOS)
- **Material Design Accessibility** (Android)
- **Section 508** compliance для B2B tier (v2.0)

### 5.2 Requirements

| Requirement | Standard | Implementation |
|---|---|---|
| Color contrast | 4.5:1 text / 3:1 UI elements | Verify all colours через Contrast Checker; both light + dark modes |
| Touch target size | 44×44pt minimum | Enforced в design system tokens |
| Dynamic Type | iOS Dynamic Type support | Body default 17pt, min 14pt, max 28pt (Accessibility XL+) |
| VoiceOver labels | 100% interactive elements | `accessibilityLabel` + `accessibilityHint` на каждом component |
| VoiceOver order | Logical reading order | Explicit `accessibilityElements` для complex layouts |
| Reduce Motion | Respect system setting | Disable decorative animations (see §3.3) |
| Color independence | Don't rely only on colour | Icons + text + colour for all states (cost tier indicated by icon + label, не только цвет) |
| Captions / transcripts | Video tutorials | Closed captions на all linked YouTube content (uses YouTube's native CC) |
| Screen reader support | All text readable | No text baked into images (except brand logo) |
| Focus indicators | Keyboard/switch control | 2pt accent-color ring on focused element |

### 5.3 FixIt-specific A11y

| Element | A11y label |
|---|---|
| Camera CTA (home screen) | `accessibilityLabel: "Take a photo of the repair problem"`, `accessibilityHint: "Opens the camera to capture damage for cost estimate"` |
| Estimate tab (DIY) | `accessibilityLabel: "Do it yourself option, estimated $15, 20 minutes"`, `accessibilityRole: "tab"` |
| Estimate tab (Hybrid) | `accessibilityLabel: "Hybrid option, you buy materials and hire installer, estimated $95"` |
| Estimate tab (Pro) | `accessibilityLabel: "Full professional option, estimated $275"` |
| Savings counter | `accessibilityLabel: "Lifetime FixIt savings: $847 across 6 repairs"` |
| Photo thumbnail | `accessibilityLabel: "Photo of leaky kitchen faucet, taken April 18"` |
| Paywall tier cards | `accessibilityLabel: "Annual plan, $49.99 per year, equals $4.17 per month, 48% savings vs monthly, most popular"` |
| ZIP entry field | `accessibilityLabel: "Your ZIP code for regional pricing"`, `accessibilityHint: "Five digit US ZIP required for accurate labor rates"` |
| "Three options" screen container | `accessibilityLabel: "Three repair options: DIY, Hybrid, Pro. Swipe left and right to compare."` |

### 5.4 Typography scale

| Level | Default (17pt user setting) | Dynamic Type range | Usage |
|---|---|---|---|
| **H1 (Hero)** | 32pt Bold | 24-48pt | Cost numbers on estimate, screen titles |
| **H2 (Section)** | 24pt Semibold | 20-36pt | Screen section headers |
| **H3 (Card)** | 20pt Semibold | 16-30pt | Estimate card titles, modal titles |
| **Body** | 17pt Regular | 14-28pt | Primary content, descriptions |
| **Body small** | 15pt Regular | 13-24pt | Secondary content |
| **Caption** | 13pt Regular | 11-20pt | Timestamps, disclaimers, captions |
| **Button** | 17pt Semibold | 14-24pt | CTA text |
| **Tab label** | 10pt Medium | Fixed (no Dynamic Type) | Tab bar labels |

---

## 6. Dark Mode

### 6.1 Strategy

- **Automatic follow system** (default) — iOS `UIUserInterfaceStyle.unspecified`, respects user's OS preference
- **Manual override** в Settings → Appearance (Light / Dark / System)
- **All screens** designed for both modes from Day 1 (not retroactive)
- **Photo preservation** — repair photos NEVER invert / filter based on mode. Damage photos need true colours.

### 6.2 Colour tokens

Defined в `/constants/colors.ts` as token pairs:

```
brand/primary: light #E35F1B / dark #FF7A3D
brand/accent:  light #12936B / dark #28B587  (savings/DIY green)
surface/background: light #FFFFFF / dark #0E0F12
surface/card:       light #F7F7F9 / dark #1A1C20
text/primary:       light #0E0F12 / dark #F7F7F9
text/secondary:     light #6A6E76 / dark #A0A4AC
border/hairline:    light #E4E6EA / dark #2A2D33
danger/error:       light #D83A3A / dark #FF5A5A
```

### 6.3 Image handling

- **Estimate photos:** Always shown с natural colours (no inversion, no hue shift)
- **Tutorial thumbnails:** Dark mode — add 15% darker overlay to reduce glare
- **Brand logo:** Two-asset variant (light logo / dark logo) — auto-swap
- **Illustrations (empty states):** Two-asset variant (outlines + fills adapt)
- **Screenshots (App Store marketing):** Dark + light pair submitted

---

## 7. Micro-interactions

### 7.1 Photo capture flow

1. User taps camera CTA on home screen → haptic Light
2. Camera screen opens with overlay framing grid (rule of thirds guides)
3. Top-of-screen tip: "Frame the damage clearly in good light" (fade out after 3s)
4. Tap shutter → haptic Medium + **200ms white flash overlay** + native shutter sound
5. Preview screen appears с **checkmark icon animation** (scale 0→1.1→1.0, 300ms)
6. Primary CTA: "Use this photo" — appears with 150ms slide-up
7. Secondary CTA: "Retake" — less prominent, 44pt height
8. If user tapped "Use this photo" → transition to answer-questions step

### 7.2 Cost estimate reveal

1. After labor illusion finishes → background crossfades к estimate screen (400ms)
2. Hero card (photo + diagnosed problem) fades in с 20pt upward translate (400ms ease-out)
3. **Three option cards** stagger-reveal (100ms delay between each), each с subtle shimmer on edge (500ms)
4. Cost numbers **count-up animation** (800ms ease-out): $0 → $15 (DIY), $0 → $95 (Hybrid), $0 → $275 (Pro)
5. Cheapest option card gets subtle green tint border (success/accent) — signals "you could save"
6. Haptic Success notification fires at peak of count-up (300ms in)

### 7.3 Soft paywall enter

1. User taps 4th estimate button (limit hit) → haptic Light
2. Modal slides up from bottom (300ms ease-out) with 90% opacity backdrop fade
3. Hero animation plays inside modal (2s loop of repair photo с Ken Burns pan)
4. Personalized savings line reveals с count-up: "You've saved $247 on 3 repairs with FixIt"
5. Pre-selected Annual tier card has **1500ms subtle pulse** animation (scale 1.0→1.02→1.0)
6. Tap tier → 150ms border highlight + haptic Light
7. Tap "Unlock Unlimited Access" CTA → haptic Light + loading spinner replaces CTA text

### 7.4 History swipe actions

1. User swipes left on history row → reveals two actions (Share / Delete)
2. Each action 64pt wide, full row height, colour-coded (accent / danger)
3. Tap Share → native share sheet с pre-filled "I just saved $X on this [repair] using FixIt!"
4. Tap Delete → haptic Medium + confirmation inline banner "Delete this estimate? Undo" (5s window to undo)

### 7.5 Savings counter increment

Triggered на two moments:
1. **After estimate completion** когда user выбирает DIY (implied savings locked in):
   - Counter at top of home screen animates +$X (ease-out 600ms)
   - Subtle bounce at end
   - Badge "+$180 this repair" pops above counter for 2s then fades

2. **On app open** (after return visit):
   - Counter shows animated tally as if adding up past savings
   - "Your lifetime FixIt savings" subtitle

---

## 8. Empty States

Every list/collection screen has empty state — никогда blank screen.

### 8.1 Empty estimates (new user, first open after onboarding)

**Visual:** Large illustration — a house with a question mark + photo frame icon
**Headline:** "Your estimates will appear here"
**Body:** "Snap a photo of anything that needs fixing — we'll tell you what it costs and how to fix it."
**Primary CTA:** "Get your first estimate" (full-width 56pt)
**Secondary:** "See sample estimates" (tap → gallery of example estimates with mock data)

### 8.2 Empty history (after 30 days idle)

**Visual:** Clock with gentle reminder icon
**Headline:** "No past estimates yet"
**Body:** "Start by taking a photo of something that needs fixing in your home."
**Primary CTA:** "Take a photo"

### 8.3 Empty saved projects (paid user)

**Visual:** Folder icon с heart outline
**Headline:** "No saved projects yet"
**Body:** "Tap the bookmark icon on any estimate to save it here for later."
**Secondary CTA:** "Browse past estimates" (links to history tab)

### 8.4 Empty "My Home" dashboard (v1.5+)

**Visual:** House outline with gentle dots
**Headline:** "Your home profile is taking shape"
**Body:** "Add basics about your home (year built, square footage) to unlock maintenance predictions."
**Primary CTA:** "Set up my home" (opens profile wizard)

### 8.5 Empty seasonal recommendations

**Visual:** Seasonal icon (leaf, snowflake, sun)
**Headline:** "Nothing urgent this [season]"
**Body:** "We'll notify you when seasonal maintenance windows open for your area."

**Rule:** Every empty state answers two questions: (1) "What is this?" (2) "What should I do next?"

---

## 9. Loading States

### 9.1 AI processing (primary)

**Duration:** 5-8 sec labor illusion (см. §3.2)
**Visual:**
- Full-screen with subtle blurred background
- Central animated icon (AI brain + magnifying glass morph loop, 2s cycle)
- Progressive text updates (5 stages)
- Linear progress bar (5 segments, fills sequentially)
- **No bailout option** (seals commitment)

**Edge case:** If processing >15s (rare, AI timeout) → automatic retry с message "Taking a bit longer than usual... hang tight." If >30s → surface error с retry CTA.

### 9.2 Secondary loads (skeleton screens)

Rules:
- **Skeleton, not spinner** — shows layout of future content → reduces perceived wait
- Shimmer animation (1500ms loop, solid colour if Reduce Motion)
- Never blank white screen > 300ms

Где используется:
- **History list load:** 5 skeleton rows с avatar + 2 text lines
- **Estimate detail load:** Skeleton for hero photo, 3 tabs, cost cards
- **Profile / settings:** Skeleton for avatar, 3-4 settings rows

### 9.3 Thumbtack pro match loading

**Context:** User tapped "See local pros" on Pro tab → API call to Thumbtack partner endpoint
**Duration:** 2-4 sec typical
**Visual:** Inline loading card с text "Finding pros in Denver 80203..." and 3 skeleton pro cards
**Fallback:** If >8s or error → "Couldn't load pros right now. Try again in a moment."

### 9.4 Subscription purchase processing

**Trigger:** User taps "Unlock Unlimited Access" on paywall
**Visual:** CTA text replaces с spinner + "Processing..." (400ms minimum, max 6s)
**Success:** Haptic Heavy + checkmark animation + auto-dismiss paywall to "Welcome to Pro!" screen
**Error:** Haptic Error + "Payment didn't go through. Try again or use different card."

### 9.5 Pull-to-refresh

**Where:** History list, saved projects, My Home dashboard
**Behavior:** Native iOS UIRefreshControl / Android SwipeRefreshLayout
**Duration:** Usually 500ms-2s
**Haptic:** Light on trigger

---

## 10. Error States

Tone: **empathetic, actionable, never-blaming-user.**

### 10.1 Camera permission denied

**Headline:** "Camera access needed"
**Body:** "FixIt uses your camera to analyze repair problems. Enable camera in Settings to continue."
**Visual:** Screenshot thumbnail — small preview of iOS/Android Settings screen with camera toggle highlighted
**Primary CTA:** "Open Settings" (uses native deep-link)
**Secondary CTA:** "Continue with text input" (fallback — user describes problem instead)

### 10.2 Photo library permission denied

**Headline:** "Can't access photos"
**Body:** "Give FixIt permission to read photos in Settings, or retake with the camera."
**Primary CTA:** "Open Settings"
**Secondary CTA:** "Use camera instead"

### 10.3 No internet connection

**Visual:** Top banner (not full-screen modal) — subtle orange "Offline" indicator
**Body:** "You're offline. Some features are unavailable."
**Offline capabilities:**
- Browse past estimates (cached)
- View saved tutorials (if downloaded)
- Draft new photo (queued for upload when back online)
**Retry:** Bottom sheet banner с "Retry" button, auto-polls every 10s

### 10.4 AI can't identify problem

**Headline:** "We couldn't identify this clearly"
**Body:** "The photo might be too dark, blurry, or the problem isn't in frame. Try again with better lighting, or describe the problem in text."
**Three options:**
1. "Retake photo" (primary)
2. "Describe in text" (secondary, 44pt)
3. "Browse common repairs" (tertiary, link — opens category picker)

### 10.5 Photo too blurry / low-quality

**Pre-submit check:** If photo resolution <800×600 or blur score >threshold → inline warning before user taps "Use this photo"
**Headline:** "Photo looks a bit blurry"
**Body:** "For the most accurate estimate, retake in better light. Or use it anyway if it's the best you've got."
**Options:**
1. "Retake photo" (primary)
2. "Use it anyway" (secondary, 44pt)

### 10.6 Payment failed

**Headline:** "Payment didn't go through"
**Body:** "Your card wasn't charged. This usually means the card was declined or there's a temporary issue with the payment service."
**Options:**
1. "Try again" (primary)
2. "Use different card" (secondary — re-opens Apple Pay / Google Pay / card selector)
3. "Contact support" (tertiary link)

### 10.7 Thumbtack API unavailable

**Context:** User tapped "See local pros" — API returns error
**Inline error:** "Couldn't load pros in your area right now. Try again, or we can email them to you when available."
**Options:**
1. "Retry" (primary)
2. "Email when available" (secondary — captures email for async delivery)
3. "See DIY option instead" (tertiary — switches to DIY tab)

### 10.8 Generic fallback

If error type unknown / unhandled:
**Headline:** "Something went wrong"
**Body:** "We hit a snag. This isn't your fault. Try again, or let us know."
**Options:**
1. "Try again" (primary)
2. "Contact support" (secondary — opens mailto: с pre-filled error code)

**Rule:** Never technical jargon ("Error 500", "fetch failed", stack traces). Users should always understand what happened and what to do next.

---

## 11. Form Patterns

### 11.1 ZIP code entry (onboarding + Settings)

- Numeric keyboard (`keyboardType="numeric"`)
- Auto-focus on screen load
- Inline validation: 5 digits → auto-advance, <5 digits → muted primary CTA
- Format-as-you-type: spaces stripped, non-digits ignored
- **Auto-detect option** — "Use my location?" subtle link below field → triggers location permission → reverse-geocode
- Error: "Not a valid US ZIP code" (red inline text, haptic Error)
- v1.5: International — post-codes for UK/Canada (locale-aware keyboard + validation)

### 11.2 Email entry (optional signup / paywall)

- Email keyboard (`keyboardType="email-address"`, `autoCapitalize="none"`)
- Validation on blur (not on-every-keystroke — annoying)
- Apple ID / Google / Facebook prominent buttons ABOVE email field (social primary, email secondary)
- Error: "Double-check your email format" (polite, not "INVALID EMAIL!!!")

### 11.3 Search / text fallback (photo alternative)

**Context:** User tapped "Describe in text" from camera screen
- Text input с placeholder "e.g., leaky kitchen faucet, broken cabinet hinge"
- Autocomplete suggestions pull from top-30 repair categories (local static list)
- Below input: chips row — "Plumbing", "Electrical", "Walls", "Appliances", "Furniture" → tap jumps to category picker
- Min 3 characters before submit active
- Submit button → same labor illusion → estimate flow

### 11.4 Quality tier selection (during estimate flow)

**Context:** "What quality tier do you want?" answer step
- 3 radio cards horizontally (on tablet) or stacked (phone)
- Labels: "Budget" / "Mid-range" / "Premium"
- Each card has short description — "Off-brand, functional" / "Brand name, durable" / "Top-tier, lifetime"
- Default pre-selected: Mid-range
- Haptic Light on select, visual border highlight

### 11.5 DIY readiness self-assessment

- 3 options vertically stacked
- Cards: "Never done this before" / "I've done similar" / "Expert — I've done this type before"
- Pre-selected based on persona signals (if any from previous estimates)
- Affects DIY instructions verbosity (verbose for beginners, terse for experts)

---

## 12. Responsive Behavior

### 12.1 Supported devices

| Device class | Example | Handling |
|---|---|---|
| **iPhone SE (small)** | 4.7" 375×667 | Core MVP — verify все screens work |
| **iPhone 14 (standard)** | 6.1" 390×844 | Design baseline |
| **iPhone 15 Pro Max (large)** | 6.7" 430×932 | Test for excessive white-space |
| **iPhone landscape** | Various | Only estimate-detail supports landscape (more comfortable reading) |
| **Android phones** | Pixel 7, Galaxy S23 | Material Design variants as needed |
| **iPad (v1.5+)** | 10.2"+ | Two-column master-detail layout |

### 12.2 Rules

- **useWindowDimensions()** hook для all responsive decisions — no hardcoded widths
- **useSafeAreaInsets()** для top/bottom safe areas
- **aspectRatio** для images — enforce photo aspect, не hardcoded heights
- **Flex-based layouts** — stack на narrow, row на wide
- **Horizontal scroll** fallback для content that can't stack (чipс rows, tab bars)

### 12.3 Orientation

| Screen | Portrait | Landscape |
|---|---|---|
| Onboarding | ✅ | ❌ (lock to portrait) |
| Home tab | ✅ | ❌ |
| Camera | ✅ + tilted landscape | ✅ (rotates to match device) |
| Photo preview | ✅ | ✅ |
| **Estimate detail** | ✅ | ✅ (comfortable reading на tablet especially) |
| History list | ✅ | ❌ |
| Paywall | ✅ | ❌ |
| Settings | ✅ | ❌ |

### 12.4 iPad support (v1.5+)

- Master-detail pattern: list of estimates (left) + detail (right)
- Two-column на iPad in landscape, single-column on portrait
- All touch targets remain 44pt minimum (iPad user may use Apple Pencil too)
- No `React.Fragment` tricks — use proper `SplitView` component

---

## 13. Copy / Voice

### 13.1 Tone

**Brand voice:** friendly authority — knowledgeable friend who doesn't talk down, doesn't oversell, doesn't scare-monger.

Five pillars:
1. **Direct** — "This leak costs $15 to DIY or $275 for a pro" — not "Your plumbing situation presents several interesting options..."
2. **Empowering, not patronizing** — "You can fix this" — not "Don't worry, even *you* can do it!"
3. **Data-driven, not vague** — "$247 saved" — not "many dollars saved"
4. **Jargon-free** — "water shut-off valve" not "quarter-turn ball valve PRV"
5. **Honest about uncertainty** — "Range $180-$220, depends on exact part" — not "$200 flat" when we don't know

### 13.2 Signature phrases

- "Know the price" (brand tagline)
- "60-second estimate" (speed promise)
- "3 paths forward" (options framing)
- "Save money, stay smart" (value promise)
- "Fair pricing, your ZIP" (regional truth hook)
- "Let's figure it out" (empowering action)

### 13.3 Anti-copy (things we never write)

- **"Click here"** — iOS language is "Tap" (we're mobile-first)
- **Excessive exclamation marks** — "You can do it!!!" (too much — one !, тhoughtfully)
- **Fake urgency** — "LIMITED TIME! 50% OFF!" Unless true and time-bound
- **Scare tactics** — "Your house is dangerous! Call a pro NOW!" (conflicts с neutral advisor)
- **Patronizing encouragement** — "Good job!" after normal actions (feels like talking to a child)
- **Vague promises** — "Save tons of money!" ("tons" = weak, we have real numbers)
- **Corporate speak** — "At FixIt, we strive to..." (say what we do, not how we feel about it)

### 13.4 Persona-tuned copy

Per MONETIZATION.md §5, paywall copy varies по detected persona. Extended to in-app copy where clear signal:

- **Emma (first-time HO):** empowering, teaching — "Here's what plumbers know that homeowners usually don't"
- **Mike (DIY enthusiast):** efficient, respectful of skill — "Tools you'll need (you probably have these)"
- **Sarah (single HO):** protective, anti-ripoff — "Fair pricing in your ZIP — no contractor surprises"
- **Ronald (aging HO):** simple, large text, no jargon — "This is a small fix. Here's what it should cost."

---

## 14. Notification Spec

### 14.1 In-app banners

- **Position:** Top of screen, below status bar, above any content
- **Height:** 64pt
- **Auto-dismiss:** 4s (unless critical — error banners persist until user action)
- **Types:**
  - Success: green/accent background, checkmark icon
  - Info: neutral background, info icon
  - Warning: amber background, caution icon
  - Error: red/danger background, alert icon
- **Dismiss:** Swipe up, or tap X, or auto-timeout
- **Haptic:** Light for info/success, Error for error

### 14.2 Push notifications

**Budget:** 12-16 per year per user (per RETENTION-RESEARCH §7.1).

**Format:**
- Title: <10 words, <90 chars
- Body: specific, actionable, includes city name when relevant
- Deep-link to relevant screen (seasonal tip → maintenance dashboard, etc.)
- Respect DND / quiet hours (iOS handles automatically with time-sensitive flag)

**Good examples (copy):**
- "Denver HVAC pros booked out 3 weeks — estimate your fix first"
- "Your FixIt savings: $340. Anything worth a quick estimate?"
- "12 neighbors in 80203 fixed gutters this week — fall rains starting"
- "6 months ago you fixed your faucet. Still working? 30-sec check-in"

**Bad examples (avoid):**
- "Come back to FixIt! We miss you!" (generic, pleading)
- "Save on home repair!" (vague, promotional)
- "You haven't used FixIt in a while" (guilt-based)

### 14.3 Permission timing

**Do NOT** ask on onboarding first screen (conversion killer).

**Ask AFTER first successful estimate** with context:
- Native iOS prompt preceded by custom soft prompt screen:
  > "Want seasonal home maintenance reminders?
  > We'll send about 1 reminder per month — never spam.
  > [Yes, remind me] [Not now]"
- Only if user taps "Yes" → trigger native iOS permission prompt
- Grant rate with context: ~60% (vs ~25% without)

---

## 15. Prototype Testing Plan

Before final Stitch generation в Stage 5:

### 15.1 Figma clickable prototype

Top 10 screens clickable:
1. Welcome / permission primer
2. ZIP entry
3. Camera screen (simulated)
4. Photo preview
5. Answer-questions (quality tier)
6. Labor illusion
7. Estimate result — DIY tab default
8. Estimate result — Pro tab
9. Soft paywall
10. History tab with saved estimates

### 15.2 User tests (Emma persona primary)

**5 users** из Emma segment (first-time homeowners 28-38 в US), recruited через UserTesting.com:
- 3 from suburban markets (Denver, Austin, Atlanta)
- 2 from higher-cost markets (Seattle, Boston)
- All have taken one home-repair photo in past 90 days (signal of active use case)

### 15.3 Metrics to measure

| Metric | Target | Red flag if |
|---|---|---|
| Time to first estimate (from prototype open → estimate visible) | <90s в prototype (≈60s in real app) | >2 minutes |
| Time on labor illusion (do users wait or bail?) | 100% wait | Bail rate >10% |
| Tab switch rate on estimate screen | >70% users try at least 2 tabs | <40% |
| Paywall click rate | 20-30% tap CTA | <10% |
| Confusion moments (think-aloud) | <2 per session | >5 |
| Task completion (can user reach "Pro match" from photo in <5 taps?) | >80% | <50% |

### 15.4 Iteration plan

- Testing round 1 (week 1): 5 users, identify top 5 issues
- Fix prioritization: blocker issues → fix before next round
- Testing round 2 (week 2): 5 new users, verify fixes work
- Sign-off: проходит Round 2 с <2 blocker issues → передать в Stage 5 Stitch generation

---

## 16. Handoff Checklist

### 16.1 UX team → Design (Stage 5)

- [x] UX-SPEC.md (this document) — principles, interactions, states, a11y
- [ ] USER-FLOWS.md — 6-8 key user scenarios with happy path + edge cases (create next)
- [ ] SCREEN-MAP.md — full screen inventory с navigation (create next)
- [ ] WIREFRAMES.md — 15-20 ASCII wireframes with data + action notes (create next)
- [x] FUNNEL.md — conversion funnel metrics (companion to this doc)

### 16.2 Design team deliverables (Stage 5 output)

- [ ] Design system: colours, typography, iconography, component library
- [ ] High-fidelity mockups для все ~35 screens
- [ ] Figma interactive prototype (10 key screens clickable)
- [ ] Animation specs: labor illusion, estimate reveal, modal transitions (Lottie / Rive where needed)
- [ ] Dark mode variants для all screens
- [ ] App Store screenshots (6-8 benefit-driven)
- [ ] App icon A/B variants (minimum 3)

### 16.3 Priority order for Design

1. **Photo → Estimate flow** (core aha-moment — must be flawless)
2. **Onboarding** (ZIP, permissions, soft intros)
3. **Home dashboard** (both empty Day-1 state и mature state with savings counter)
4. **Paywall** (soft primary + context variants)
5. **History + saved projects**
6. **My Home dashboard (v1.5 preview)**
7. **Settings + Profile**
8. **Error + empty states**
9. **System screens** (offline, force-update)

---

## 17. Related Documents

- [PRODUCT-VISION.md](../02-product/PRODUCT-VISION.md) — seven principles, north star, guiding beliefs
- [MONETIZATION.md](../02-product/MONETIZATION.md) — paywall funnel, pricing, conversion tactics
- [PAYWALL-RESEARCH.md](../03-practices/PAYWALL-RESEARCH.md) — soft paywall deep-dive, Emma journey
- [RETENTION-RESEARCH.md](../03-practices/RETENTION-RESEARCH.md) — seasonal engagement, push strategy
- [FUNNEL.md](./FUNNEL.md) — stage-by-stage conversion metrics (this doc's companion)
- [USER-FLOWS.md](./USER-FLOWS.md) — core flows (TBD next)
- [SCREEN-MAP.md](./SCREEN-MAP.md) — screen inventory (TBD next)
- [WIREFRAMES.md](./WIREFRAMES.md) — ASCII wireframes (TBD next)

---

**Дата последнего обновления:** 2026-04-18
**Следующий шаг:** USER-FLOWS.md — детализация flows по сценариям Emma / Mike / Sarah / Tyler / Ronald.

**Approved by:**
- [ ] Amanda (Owner)
- [ ] Лана (Project Manager)
