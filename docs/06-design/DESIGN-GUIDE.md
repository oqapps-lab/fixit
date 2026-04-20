# FixIt — Design Guide

**Дата:** 2026-04-20
**Стиль:** The Sunday Morning Sanctuary — editorial warm-cream canvas, atmospheric vertical gradient, frosted glass, coral anchor
**Статус:** v1.0 — derived from Stitch project `4884422333715047255` + UX-SPEC.md + Лана's 6 Stitch prompts
**Companion docs:** [UX-SPEC.md](../04-ux/UX-SPEC.md) · [SCREEN-MAP.md](../04-ux/SCREEN-MAP.md) · [stitch-prompts/](./stitch-prompts/) · [stitch-raw/](./stitch-raw/)

---

## TL;DR

Stitch сгенерировал для FixIt 22 экрана под theme **"The Sunday Morning Sanctuary"** — warm cream #fefcf4 canvas, coral/peach primary (#ac4218 → #fe7e4f), mint/sage secondary (#037524 → #96f996), italic serif hero (Noto Serif italic), UPPERCASE TRACKED labels (Inter), Epilogue thin body. Этот гайд — **distilled truth**: что из Stitch идёт в прод, что выбрасывается, какие примитивы строим, какие per-screen recipes применяем.

**Главный принцип:** Stitch — это moodboard, не spec. Мы вынимаем palette + atmospheric identity, строим свои 5 primitives (`AtmosphericGradient`, `OrbField`, `GlassCard`, `PillCTA`, `GhostNumber`), и из них собираем все 42 экрана MVP.

**Что ПРИНИМАЕМ из Stitch:**
- Cream→peach→coral→mint→lavender vertical gradient как every-screen background
- 4 gradient orbs drifting за всем содержанием (peach top-right, lavender mid-left, sage bottom-right, coral ember bottom-center)
- Frosted glass surfaces (40px blur, 85% cream translucency, hair-thin white border, warm-tinted shadow)
- Glossy coral anchor CTA (primary → primary_container gradient, highlight streak, warm halo)
- Ghosted hero numbers (translucent massive watermarks — "$165", "$2,340", "87", "30m")
- UPPERCASE TRACKED micro-labels (Inter, tracking 1.2)
- Temperature-as-information (warm = effort/urgency, cool = easy/savings)
- "No-line" rule — boundaries через tonal shifts, не через 1px borders

**Что ВЫБРАСЫВАЕМ (или меняем):**
- Noto Serif Italic как main hero → replaced с **Fraunces Italic** (screen-optimized serif, reads editorial без "magazine pretense"). Usage сужен: hero verdicts 2-5 слов, не parаграфы.
- Epilogue Thin body → replaced с **Plus Jakarta Sans** (лучшие mobile metrics, variable weights, надёжнее в RN).
- Dense Stitch layouts (web-grid assumptions) → 3-layer система (background / content / floating UI), `flex`-based, `useSafeAreaInsets`.
- Random inline hex values → ВСЁ идёт через `constants/tokens.ts`.
- Magazine-style multi-column prose → нет prose on screen per §13.2 UX-SPEC, labels + numbers + 1-sentence bodies.
- Stitch brand invention (proj title "FixIt Repair Advisor"/"Estimate Results"/"Repair Detail — Noir") → canonical product name **FixIt**, canonical voice per POSITIONING §7.

---

## 1. Colors & Atmospheric Depth

### 1.1 Core tokens (from Stitch Material 3 palette)

Все tokens живут в `constants/tokens.ts`. Никаких inline hex в screens — grep `#[0-9A-Fa-f]{6}` outside tokens.ts должен быть near-empty.

| Token | Light | Semantic meaning |
|---|---|---|
| `background` | `#FEFCF4` | Warm cream — base canvas |
| `surface` | `#FEFCF4` | Same as background (Material 3 convention) |
| `surfaceContainerLowest` | `#FFFFFF` | Highest-elevation white |
| `surfaceContainerLow` | `#FBF9F1` | Nested surface — glass card inner |
| `surfaceContainer` | `#F5F4EB` | Tonal container — secondary surfaces |
| `surfaceContainerHigh` | `#EFEEE5` | Higher-tonal boundary |
| `surfaceContainerHighest` | `#E9E9DE` | Max tonal container |
| `onSurface` | `#383833` | Primary text — warm dark, не #000 |
| `onSurfaceVariant` | `#65655F` | Secondary text, subtitles, labels |
| `outline` | `#81817A` | Borders when needed |
| `outlineVariant` | `#BAB9B2` | Ghost borders (use at 20% opacity for glass) |
| `primary` | `#AC4218` | Deep warm coral — CTA, effort signal |
| `primaryContainer` | `#FE7E4F` | Peach — CTA gradient end, accents |
| `primaryDim` | `#9C370B` | Pressed state |
| `onPrimary` | `#FFFFFF` | Text on coral |
| `secondary` | `#037524` | Deep sage/green — DIY win, savings |
| `secondaryContainer` | `#96F996` | Light mint — success backgrounds |
| `onSecondary` | `#FFFFFF` | Text on sage |
| `tertiary` | `#626374` | Slate — neutral meta, timestamps |
| `tertiaryContainer` | `#E6E6FA` | Lavender — informational accents |
| `error` | `#BE2D06` | Danger, failed states |
| `errorContainer` | `#F95630` | Error accent surface |
| `surfaceTint` | `#AC4218` | Shadow tint — all shadows warmed with primary |

### 1.2 Gradients (atmospheric vocabulary)

Each gradient имеет *mood name*, не location name. One gradient может быть на многих screens если mood совпадает.

| Name | Stops | Direction | Where |
|---|---|---|---|
| `sanctuary` | `#FEFCF4` → `#FFF1E3` → `#FFE1D2` → `#F1E8DC` → `#E8EEE6` → `#ECE7F4` | vertical top→bottom | Every screen — primary backdrop |
| `dawn` | `#FEFCF4` → `#FFD9C7` → `#FFAE88` | vertical | Welcome hero band, Home upper |
| `ctaCoral` | `#AC4218` → `#FE7E4F` | horizontal | Every PillCTA |
| `ctaCoralGlossy` | `#AC4218` → `#FE7E4F` → `#FFB896` (3-stop, highlight streak simulated via inner overlay) | diagonal 135° | Hero CTA only |
| `sageWin` | `#037524` → `#96F996` | vertical | DIY card glow, savings dots |
| `peachWarm` | `#FFB896` → `#FE7E4F` → `#ED7244` | vertical | Hybrid card glow, processing step-2 |
| `coralDeep` | `#AC4218` → `#8A3212` | vertical | Pro card glow, premium moments |
| `lavenderQuiet` | `#E6E6FA` → `#C9C7E8` | vertical | Tertiary tips, seasonal cards |
| `ghostedNumber` | `#AC4218` @ 0.18 → `#FE7E4F` @ 0.06 (text-fill style) | diagonal | Ghosted hero watermark numbers |

**Rule**: gradient `colors` arrays are `as const` tuples. Each has `start`/`end` in 0-1 space. See `tokens.ts` for full definition.

### 1.3 Orb field (атмосферная depth)

Behind every screen — 4 soft-blurred radial gradient orbs at fixed positions. Rendered once in `<OrbField/>`, sitting behind content at z-index 0 (after `<AtmosphericGradient/>`). Each orb is an absolutely-positioned `LinearGradient` circle with massive `blurRadius` + opacity 0.55-0.75.

| Orb | Color | Size | Position (% of screen) | Opacity |
|---|---|---|---|---|
| `peach` | `#FFDCC4` → `#FFF1E3` | 400×400 | top: -10%, right: -15% | 0.65 |
| `lavender` | `#E6E1F5` → `#F3F0FA` | 340×340 | top: 35%, left: -20% | 0.55 |
| `sage` | `#CFE8D5` → `#E4F3E8` | 320×320 | bottom: 5%, right: -15% | 0.60 |
| `coralEmber` | `#FFC1A8` → `#FFE1D2` | 260×260 | bottom: -8%, left: 30% | 0.50 |

Orbs ARE the "breath" of screens. They can be subtly animated (reanimated, 40s drift loop), but default — static для baseline.

### 1.4 Temperature as information

Из Stitch northStar — hierarchy через temperature, не scale:

- **Warm tones (coral, peach, amber):** effort, urgency, cost, Pro route, capture CTA
- **Cool tones (mint, sage, green):** savings, DIY win, "easy fix", completed state
- **Neutral (cream, lavender, slate):** informational, seasonal, meta

Never use red for DIY. Never use mint for emergency. The tint *is* the message.

---

## 2. Typography

**Drop notoSerif italic as default hero.** Keep the editorial-italic *moment* for hero verdicts only, via Fraunces (a variable serif designed for screen — not Noto Serif).

### 2.1 Font families

| Alias | Font | Source | Where |
|---|---|---|---|
| `display` | Plus Jakarta Sans | `@expo-google-fonts/plus-jakarta-sans` | Hero numbers, display values, buttons |
| `displayItalic` | Fraunces Italic | `@expo-google-fonts/fraunces` | Hero verdicts (2-5 words max) |
| `body` | Plus Jakarta Sans | same | Body copy, card content |
| `label` | Inter | `@expo-google-fonts/inter` | UPPERCASE TRACKED micro-labels only |

### 2.2 Scale

```ts
typeScale = {
  labelMicro: 10,    // eyebrow — UPPERCASE TRACKED 1.8
  labelSmall: 11,    // eyebrow — UPPERCASE TRACKED 1.2
  bodySmall: 13,     // caption, meta
  bodyMedium: 14,    // secondary body
  bodyLarge: 16,     // primary body
  titleSmall: 18,    // card titles
  titleMedium: 22,   // section titles
  titleLarge: 28,    // screen titles
  displaySmall: 32,  // hero verdicts (Fraunces italic)
  displayMedium: 42, // hero verdicts large
  displayLarge: 56,  // ghosted numbers (watermark)
  displayGhost: 120, // mega ghosted — "$2,340" in upper third
}
```

### 2.3 Tracking (letter-spacing)

```ts
tracking = {
  labelMicro: 1.8,   // All-caps micro labels — "UPPERCASE TRACKED whisper"
  labelWide: 1.2,    // Labels and eyebrows
  normal: 0,         // Body
  hero: -0.8,        // Display headlines — tighter for editorial feel
  heroDisplay: -1.2, // Large displays
}
```

### 2.4 Anti-patterns (from Stitch output)

- ❌ Hero prose paragraphs in italic serif → use max 5 words, 2 lines.
- ❌ Mix sentence case + italic serif in same block → pick one per line.
- ❌ Body text in thin Epilogue — легко теряется on small screens → Plus Jakarta Sans regular or medium.
- ❌ Uppercase prose — UPPERCASE TRACKED is for 1-5 word labels, not sentences.

---

## 3. Elevation & Depth (Glassmorphism)

Per Stitch northStar: **physics-based layering, not digital shadows.**

### 3.1 Layering hierarchy

1. **Base (z:0)** — `<AtmosphericGradient theme="sanctuary"/>` — vertical gradient fills screen
2. **Orbs (z:1)** — `<OrbField/>` — 4 blurred orbs drifting, opacity 0.55-0.75
3. **Glass surfaces (z:5-10)** — `<GlassCard/>` — frosted panes carrying content
4. **Inline anchor (z:12)** — `<PillCTA/>` — the only hard-edged, glossy, saturated element
5. **Floating UI (z:50)** — tab bar, FAB, top header — outside ScrollView

### 3.2 Glass card spec

```
backdrop-filter: blur(40px)       // iOS: BlurView intensity 40 tint="light"
background: #FFFFFF @ 0.85         // Material cream translucency
border: 0.5pt #FFFFFF @ 0.55       // Hair-thin "ghost" border catching light
border-radius: 24 (md) / 32 (lg) / 999 (pill)
shadow: warmCardShadow             // see §3.4
```

**Android fallback**: `expo-blur` is noisy on Android — `Platform.OS === 'android'` branch uses semi-opaque View with bumped alpha.

### 3.3 Glass tints

GlassCard прикидывается tint-aware через prop `tint`:

| Tint | Inner BG | Border | Shadow |
|---|---|---|---|
| `default` | `#FFFFFF` @ 0.85 | `#FFFFFF` @ 0.55 | `warmCardShadow` |
| `sage` | `#E4F3E8` @ 0.70 | `#96F996` @ 0.40 | `sageShadow` |
| `peach` | `#FFE8D8` @ 0.70 | `#FFB896` @ 0.45 | `peachShadow` |
| `coral` | `#FFD9C7` @ 0.75 | `#FE7E4F` @ 0.50 | `coralShadow` |
| `lavender` | `#F0EDF7` @ 0.70 | `#E6E6FA` @ 0.50 | `lavenderShadow` |

Tint reflects *zone* of screen and *temperature meaning*. DIY card = sage. Hybrid = peach. Pro = coral. Seasonal tip = lavender.

### 3.4 Shadow library

Every shadow is **warm-tinted**, using `primary` (#AC4218) at low opacity. Never neutral grey shadows.

```ts
shadows = {
  warmCardShadow:   { shadowColor:'#AC4218', shadowOpacity:0.08, shadowRadius:24, shadowOffset:{width:0,height:12}, elevation:5 },
  warmCardShadowSm: { shadowColor:'#AC4218', shadowOpacity:0.06, shadowRadius:12, shadowOffset:{width:0,height:6}, elevation:3 },
  sageShadow:       { shadowColor:'#037524', shadowOpacity:0.10, shadowRadius:16, shadowOffset:{width:0,height:8}, elevation:4 },
  peachShadow:      { shadowColor:'#FE7E4F', shadowOpacity:0.14, shadowRadius:20, shadowOffset:{width:0,height:10}, elevation:5 },
  coralShadow:      { shadowColor:'#AC4218', shadowOpacity:0.20, shadowRadius:24, shadowOffset:{width:0,height:12}, elevation:6 },
  lavenderShadow:   { shadowColor:'#626374', shadowOpacity:0.10, shadowRadius:16, shadowOffset:{width:0,height:8}, elevation:4 },
  pillLg:           { shadowColor:'#AC4218', shadowOpacity:0.35, shadowRadius:22, shadowOffset:{width:0,height:14}, elevation:8 },
  pillSm:           { shadowColor:'#AC4218', shadowOpacity:0.22, shadowRadius:12, shadowOffset:{width:0,height:6}, elevation:4 },
  glowDotSm:        { shadowColor:'#AC4218', shadowOpacity:0.45, shadowRadius:10, shadowOffset:{width:0,height:0}, elevation:3 },
}
```

---

## 4. Primitives (build these first, before any screen)

Все 42 MVP screens сводятся к combinations из этих 5 primitives. Build one screen correctly → остальные идут в разы быстрее.

### 4.1 `<AtmosphericGradient theme="sanctuary">`

Root wrap every screen. Full-bleed vertical gradient filling absolute background. Children stack on top.

```tsx
<AtmosphericGradient theme="sanctuary">
  <OrbField />          // optional — skip on modals
  <ScrollView>...</ScrollView>
  <FloatingTabBar />    // absolute bottom
</AtmosphericGradient>
```

### 4.2 `<OrbField density="normal" | "sparse" | "dense">`

Renders 4 absolutely-positioned orbs per §1.3. Props optional:
- `density="sparse"` — 2 orbs only (modals, bottom sheets)
- `animated={true}` — slow reanimated drift (default `false` для baseline)

### 4.3 `<GlassCard tint="default" radius="md">`

Frosted pane. Props:
- `tint` — `default | sage | peach | coral | lavender`
- `radius` — `sm | md | lg | pill` (16 / 24 / 32 / 999)
- `style` — extend, but don't break internal `padding`
- iOS: BlurView 40. Android: semi-opaque View.

### 4.4 `<PillCTA label="OPEN DIY GUIDE" onPress tone="primary" size="lg">`

The single anchor per screen. 5 tones:
- `primary` (default) — coral gradient, white text, pulsing halo
- `sage` — outlined secondary button (mint border, sage text)
- `ghost` — transparent, just text + arrow (link fallback)
- `destructive` — error color, white text
- `onboarding` — warm coral but without halo (calmer presence)

Size `lg` = 56pt height. Size `md` = 44pt. Size `sm` = 36pt (chip-like).

Always includes:
- `accessibilityRole="button"`
- `accessibilityLabel={label}`
- `accessibilityState={{ disabled }}`
- `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)` on press (light for `ghost`)
- Pressed-state `scale: 0.96` via reanimated

### 4.5 `<GhostNumber value="$165" size="mega" tone="coralPeach">`

The massive translucent watermark number treatment. Behind hero verdicts, filling negative space of upper third. Uses masked gradient-fill on Plus Jakarta Sans ExtraBold. Sizes `sm` (56) / `md` (88) / `lg` (120) / `mega` (180). Tones map to gradients.

### 4.6 `<Eyebrow>` (helper)

UPPERCASE TRACKED micro-label. Props: `tone` (`coral | slate | sage | peach`), `size` (`micro | small`). Auto-applies Inter, tracking 1.8, text-transform.

### 4.7 `<TokenDot filled glow="sm">`

Per Sugar Quit methodology. Used для progress indicators (onboarding dots), stage dots (processing screen), streak states. 8pt diameter.

### 4.8 `<RouteCard route="DIY" price="$15" subtitle="30 MIN · BEGINNER" time="30m">`

Composite primitive combining `GlassCard` + `GhostNumber` + price + eyebrow + glyph slot. Three variants:
- `DIY` — tint `sage`, price in `sageWin` gradient, wrench glyph
- `Hybrid` — tint `peach`, price in `peachWarm` gradient, handshake glyph
- `Pro` — tint `coral`, price in `coralDeep` gradient, toolbox glyph

---

## 5. Layout system (3-layer rule, strict)

```tsx
// skeleton for EVERY screen
<AtmosphericGradient theme="sanctuary">
  <OrbField />

  {/* Layer 3 top — absolute header, renders over content */}
  <View style={[styles.header, { paddingTop: insets.top + 8 }]}>...</View>

  {/* Layer 2 — content */}
  <ScrollView
    contentContainerStyle={{
      paddingTop: insets.top + 72,        // header clearance
      paddingBottom: insets.bottom + 140, // tab bar clearance
      paddingHorizontal: spacing.lg,
    }}
  >
    {/* hero / cards / etc */}
  </ScrollView>

  {/* Layer 3 bottom — tab bar (renders via root layout, not per screen) */}
</AtmosphericGradient>
```

**Rules:**
- Background NEVER inside ScrollView (would scroll away).
- Floating UI (header, tab bar, FAB) outside ScrollView, always `position: absolute`.
- `paddingBottom` always includes `insets.bottom + 140` (tab bar floating at 100pt + 40 breathing).

---

## 6. Screen recipes (22 Stitch screens → 42 MVP screens)

One-liner recipe per MVP screen — how it composes from primitives. Full per-screen layouts в `stitch-prompts/screen-*.md` + these recipes.

### Onboarding (8 screens)

| Screen | Recipe |
|---|---|
| 1.1 Welcome | `<AtmosphericGradient dawn>` + `<OrbField>` + ghosted "FixIt" + `<Eyebrow>HOME REPAIR FORECAST</Eyebrow>` + Fraunces italic hero "Know the price / before the panic" + 3 category vignettes (`<GlassCard>` circles) + single `<PillCTA primary lg>` + 3 sample thumbnail chips + 3 onboarding dots |
| 1.2 Location | Same backdrop + 1-question hero "Where do you live?" + ZIP input (glass horizontal plane) + "Use my location" secondary link + progress dots |
| 1.3 Camera Primer | Backdrop + 4 sample thumbnails (`<GlassCard>` circle grid) + privacy statement + primary CTA "Allow camera" |
| 1.4 First Capture | Sovereign full-bleed camera (native) + top/bottom frosted bands (`<GlassCard radius=0 blur=30>`) + 4 coral corner brackets + left/right tip pills + massive coral capture button (`<PillCTA primary xl circle>`) + 01·02·03 dots |
| 1.5 Pre-estimate Context | Backdrop + 2 Q-cards (`<GlassCard sage | peach>`), each with 3 radio-like options + primary CTA "Continue" |
| 1.6 Processing | Backdrop + photo circle centerpiece (`<GlassCard pill>` with warm glow halo) + 5 stage rows (mini `<GlassCard>` pills, state-colored) + "USUALLY 6 SECONDS" eyebrow |
| 1.7 First Estimate Result | Backdrop + photo thumb + `<Eyebrow>WHAT WE FOUND</Eyebrow>` + Fraunces italic "A leaky cartridge. / An easy fix." + `<GhostNumber mega>$165</GhostNumber>` + 3 `<RouteCard>` stacked + savings pill + primary CTA "OPEN DIY GUIDE" |
| 1.8 Signup Ask | Soft bottom-sheet modal (`<GlassCard lg>`) + "$165 saved" highlight + Apple/Google/Email buttons |

### Auth (2)

| 2.1 Sign Up | Backdrop + 3 social buttons (`<PillCTA sage | dark | primary>`) + email field + ToS link |
| 2.2 Sign In | Same pattern, "Welcome back" hero |

### Main Tabs (4 primary)

| 3.1 Home | `<AtmosphericGradient>` + `<OrbField>` + ghosted "$2,340" watermark + Fraunces italic "Saved / this year" + 5 widgets in sequence (RingWidget / FlowCurveWidget / SeasonalCardWidget / SpendDonutWidget / MonthBarsWidget) + floating "+" orb FAB + tab bar |
| 3.2 My Home | Backdrop + home-health ring + rooms list (`<GlassCard>` repeating) + "Add a room" CTA |
| 3.3 Estimates | Backdrop + filter chips + timeline list of `<GlassCard>` rows + empty state |
| 3.4 Profile | Backdrop + avatar + savings counter + settings list |

### Estimate Flow (7)

Reuses 1.4, 1.5, 1.6, 1.7 primitives. Estimate detail at 4.5 = same Result template with 3 tabbed content swaps (DIY materials list / Hybrid split / Pro "Find on Thumbtack").

### Paywall (4 + 4 context)

| 5.1 Soft Paywall | Backdrop + ghosted "$485" + Fraunces italic "You've found / real money." + 3 receipts chip row + 2 pricing `<GlassCard coral | peach>` side-by-side + primary CTA "START ANNUAL — $49.99" + pay-per fallback pill + close link |
| 5.2.1-4 Context Paywalls | Same shell, different headline + benefit focus per feature gate |
| 5.3 Success | Confetti moment (one-shot) + "Welcome to Pro" + tab-return CTA |
| 5.4 Manage | Simple list screen |

### Find-a-Pro Sheet (1)

Bottom sheet 80% height + Eyebrow "FIND A PRO" + 3 platform pills (Thumbtack / Google Maps / Yelp — each `<PillCTA>` sized xl height) + "We don't earn from these links" disclaimer.

### Error states (9)

Each is a GlassCard centered in backdrop with headline + body + 1-2 CTAs. Pre-built template component `<ErrorScreen/>`.

---

## 7. Motion & haptics

Per UX-SPEC §3 + §4. Key animations:

| Animation | Duration | Easing | Trigger |
|---|---|---|---|
| Labor illusion progress | 5000-8000ms | Linear stepped | After photo submit |
| Estimate reveal | 400ms | EaseOut | On result screen mount |
| PillCTA press | 150ms | Spring | scale 0.96 |
| Modal present | 300ms | EaseOut | Slide up + backdrop fade |
| Orb drift (subtle) | 40000ms loop | Sinusoidal | On mount if `animated` prop set |

`useReducedMotion()` gate every decorative animation. Functional animations (tab switch, loading) стоят всегда.

Haptics — per §4 UX-SPEC table. Don't oversaturate — max 1 per 500ms.

---

## 8. Pre-commit checklist

- [ ] Every color/spacing/radius from `constants/tokens.ts` — grep для inline hex = ~0
- [ ] Every screen wrapped в `<AtmosphericGradient>` (except full-bleed camera)
- [ ] Every `<Pressable>` has `accessibilityRole` + `accessibilityLabel`
- [ ] Every primary tap has `Haptics`
- [ ] `tsc --noEmit` clean
- [ ] Brand name "FixIt" (not "Repair Advisor" or "The Sunday Morning Sanctuary")
- [ ] Voice "calm advisor" per POSITIONING §7 (signature: Know / Decide / Understand — anti: Connect / Match / Request)
- [ ] No magazine-italic paragraph prose — hero verdicts only, max 5 words
- [ ] `<OrbField>` present on every non-modal screen
- [ ] Floating UI outside ScrollView, absolute positioning
- [ ] Shadows warm-tinted (primary), never neutral grey

---

## 9. Artifacts

- `constants/tokens.ts` — full token source of truth (~200 lines)
- `components/ui/AtmosphericGradient.tsx` — full-screen gradient wrap
- `components/ui/OrbField.tsx` — 4 orbs behind content
- `components/ui/GlassCard.tsx` — frosted pane с tints
- `components/ui/PillCTA.tsx` — 5 variants, a11y-complete
- `components/ui/GhostNumber.tsx` — translucent watermark number
- `components/ui/Eyebrow.tsx` — UPPERCASE TRACKED helper
- `components/ui/TokenDot.tsx` — progress / streak dot
- `components/ui/RouteCard.tsx` — DIY/Hybrid/Pro composite

---

**Last updated:** 2026-04-20
**Next step:** Scaffold Expo app + implement primitives + ship first 8 screens.
