# FixIt — Design Guide (Noir / Blueprint)

**Дата:** 2026-04-20
**Стиль:** FIXIT NOIR — industrial engineering-inspection blueprint, near-black canvas, condensed display type, monochrome + amber/cyan accents
**Источник:** Stitch project `4884422333715047255`, 12 selected screens (см. `stitch-raw/screenshots/`)
**Статус:** v2.0 — replaces the warm "Sunday Morning Sanctuary" v1

---

## TL;DR

Stitch generated для FixIt **industrial inspection-document** mood:
- Pure near-black canvas (`#0A0A0B`)
- White text / monochrome hierarchy
- Condensed bold sans for display type ("ROOF LEAK", "HOME HEALTH DASHBOARD")
- Document ID labels everywhere ("REF: RP-002 · ACTIVE REPAIR", "BUILD: FP-052", "SEC_04 // ELEV_12")
- Single **amber pill CTA** (orange-to-peach gradient) as the only warm visual note
- **Blueprint accents** in cyan (`#6BCBD9`) for positive/calm status, **amber** (`#FFA95C`) for urgent/warm, **mint** (`#6BDE9A`) for healthy
- Tiny photo thumbnails in **grey square frames** (tools, handshake, toolbox)
- Italic serif moments only для hero verdicts ("Your house is calm", "Открути верхнюю гайку", "Найти мастера") — 1-3 lines max
- Thin 1px hairline borders/dividers, low opacity (`rgba(255,255,255,0.06)`)
- Progress bars = thin 1px amber lines on grey tracks
- Bottom tab bar with center "active" bubble

**Target feel:** reading a professional home-inspection report. Clinical precision with one warm human touch (the amber CTA, the serif italic line).

---

## 1. Colors

### 1.1 Core tokens

| Token | Hex | Use |
|---|---|---|
| `bg` | `#0A0A0B` | Screen canvas (darker than #000 is common mistake — keep it readable) |
| `surface1` | `#141416` | Card background (primary raised surface) |
| `surface2` | `#1C1C1F` | Elevated card (nested) |
| `surface3` | `#242428` | Hover/pressed state |
| `hairline` | `rgba(255,255,255,0.08)` | Card borders, dividers (NEVER solid 1px — always low opacity) |
| `hairlineStrong` | `rgba(255,255,255,0.14)` | Stronger divider (section breaks) |
| `text` | `#F5F5F7` | Primary text |
| `textSecondary` | `#A8A8AD` | Body secondary |
| `textTertiary` | `#6E6E74` | Meta, captions, doc refs |
| `textDim` | `#4A4A50` | Placeholder, disabled |
| `amber` | `#FFA95C` | CTA gradient end, warm accent, warning state |
| `amberDeep` | `#E8752A` | CTA gradient start, pressed |
| `cyan` | `#6BCBD9` | Blueprint accent, calm status, grid lines |
| `cyanDim` | `#3E7E88` | Dimmed cyan |
| `mint` | `#6BDE9A` | Healthy, success, DIY route |
| `mintDim` | `#2C8A52` | Dimmed mint |
| `danger` | `#FF5A5A` | Alert severity |
| `dangerDim` | `#8F2929` | Dimmed danger |

### 1.2 Accent gradients

| Name | Stops | Use |
|---|---|---|
| `ctaAmber` | `#E8752A` → `#FFA95C` | The ONE warm pill CTA — "DIY GUIDE", "SELECT PLAN" |
| `ctaAmberGlossy` | `#D06220` → `#FFA95C` → `#FFC89A` | Primary hero CTA with highlight streak |
| `ringAmber` | `#FFA95C` → `#E8752A` | Ring chart progress, progress bars |
| `scanCyan` | `#4FE5F9` → `#6BCBD9` | Blueprint scan lines, health ring |

### 1.3 Atmospheric overlays (subtle)

Instead of light-theme "orbs" — use **vignette** + **film grain**:
- Corner vignette: radial gradient from `rgba(0,0,0,0)` center to `rgba(0,0,0,0.55)` edges
- Optional grain: 2% opacity white noise texture (skip v1, add v1.5 if desired)
- **NO** warm gradient orbs. Noir canvas stays flat.

---

## 2. Typography

### 2.1 Families

| Alias | Font | Source | Use |
|---|---|---|---|
| `display` | **Archivo** ExtraBold | `@expo-google-fonts/archivo` | Display headers, big numbers (all-caps) |
| `displayNarrow` | **Archivo Narrow** Bold | `@expo-google-fonts/archivo-narrow` | Screen titles "ROOF LEAK", "HOME HEALTH DASHBOARD" |
| `body` | **Inter** Regular | `@expo-google-fonts/inter` | Body copy, card labels |
| `bodyMedium` | **Inter** Medium | same | Emphasized body |
| `label` | **Inter** Medium | same | UPPERCASE TRACKED labels |
| `mono` | **JetBrains Mono** Regular | `@expo-google-fonts/jetbrains-mono` | Doc refs: "REF: RP-002", "SEC_04 // ELEV_12", "40.7128° N" |
| `heroItalic` | **Instrument Serif** Italic | `@expo-google-fonts/instrument-serif` | Rare soft hero moments: "Your house is calm", "Открути верхнюю гайку", "Найти мастера" |

### 2.2 Scale

```ts
typeScale = {
  docRef: 10,       // REF / ID / coordinates
  labelMicro: 10,   // eyebrow micro
  labelSmall: 11,   // eyebrow
  bodySmall: 13,    // caption
  bodyMedium: 14,   // secondary body
  bodyLarge: 16,    // primary body
  titleSmall: 18,   // card titles
  titleMedium: 22,  // section titles
  titleLarge: 28,   // screen titles (all caps Archivo Narrow)
  displaySmall: 34, // hero titles
  displayMedium: 48, // hero numbers $450, 87
  displayLarge: 64, // mega hero
}
```

### 2.3 Tracking

```ts
tracking = {
  docRef: 1.6,      // mono labels, doc refs
  labelMicro: 2.0,  // UPPERCASE TRACKED
  labelWide: 1.4,
  normal: 0,
  tight: -0.4,      // display numbers
  heroItalic: -0.6, // serif italic
}
```

### 2.4 Anti-patterns

- ❌ Warm cream / peach — completely off-brand
- ❌ Magazine italic serif for every hero — only 1 screen every 3-4
- ❌ Multi-color gradients on display type — only amber CTA has gradient
- ❌ Thick rounded borders — hairline only
- ❌ Soft pastel backgrounds on cards — cards are `surface1` / `surface2` dark

---

## 3. Surfaces & depth

Dark theme — elevation via **tonal shift** + **hairline border**, NOT via shadow.

### 3.1 Card spec

```
background: #141416 (surface1) or #1C1C1F (surface2)
border: 1px rgba(255,255,255,0.08)
border-radius: 16-20 (md) / 28 (lg) / 999 (pill)
padding: 20-24
NO shadow in dark theme (shadows vanish on dark bg)
```

For pressed state: lift background by +tone shift (surface1 → surface2, surface2 → surface3).

### 3.2 Card variants

| Variant | BG | Border | Use |
|---|---|---|---|
| `default` | `surface1` | hairline | Primary card |
| `elevated` | `surface2` | hairline | Nested / featured |
| `outlined` | `transparent` | `hairlineStrong` | Action button, segmented |
| `blueprint` | `surface1` + grid overlay | `cyanDim` @ 0.3 | Technical diagram surface |

### 3.3 "Document label" chip

Small monospace chip, appears top of every detail screen:
```
REF: RP-002 · ACTIVE REPAIR
ID: RES-0492 // SECTOR 7
SEC_04 // ELEV_12
BUILD: FP-052
```
- Font: JetBrains Mono
- Size: 10pt
- Color: `textTertiary` for neutral parts, `amber` or `cyan` for status
- Tracking: 1.6

Renders as an inline Text row, no card.

---

## 4. Primitives (build these first)

### 4.1 `<NoirScreen scroll? vignette?>`

Root wrapper — near-black canvas, optional vignette overlay, handles safe-area insets. Replaces `AtmosphericGradient`.

```tsx
<NoirScreen>
  <NoirHeader brand="FIXIT NOIR" />
  <ScrollView>{content}</ScrollView>
  <NoirTabBar />
</NoirScreen>
```

### 4.2 `<NoirCard variant="default" padding={24}>`

Dark surface with hairline border. No blur. No shadow. Swap GlassCard 1:1.

### 4.3 `<DocRef tone="neutral" | "amber" | "cyan">REF: RP-002</DocRef>`

Monospace uppercase label chip. Replaces Eyebrow for technical contexts.

### 4.4 `<AmberCTA label="DIY GUIDE" size="lg" variant="primary" | "outlined">`

The ONE warm pill:
- `primary` → amber gradient fill, white text, highlight streak, haptic
- `outlined` → transparent bg, 1.4px amber border, amber text

Sizes: sm 36 / md 44 / lg 52 / xl 60.

### 4.5 `<HeroNumber value="$450" size="xl" tone="white" | "amber" | "mint">`

Big bold Archivo ExtraBold number display. No gradient fill — solid white or accent color. Includes optional `suffix` inline ("%", "days").

### 4.6 `<SeverityChip level="moderate">`

Small inline pill with status text + colored bar on left. Levels:
- `low` → mint
- `moderate` → amber  
- `high` → danger

### 4.7 `<ProgressBar value={0.35} tone="amber">` 

Thin 2px bar, dark track + accent fill.

### 4.8 `<RingChart value={87} size={140} segments={[...]}>`

Thin-stroke circular progress ring with category dots around perimeter (see Home Health Indicator screen). Uses SVG.

### 4.9 `<NoirTabBar>` (custom)

Bottom tab strip with 4 icons, center "active" circular highlight, no floating FAB (different from Sanctuary — noir doesn't have the FAB pattern). Icons: SYSTEMS / REPAIRS / BLUEPRINTS / VAULT (or HOME / PROJECTS / PLAN / PROFILE variants). Background: `surface1` with top hairline.

### 4.10 `<ToolChip label="SEALANT">` (small)

Grey pill with uppercase text. Row of 3 at "Required Tools / Materials" section.

### 4.11 `<SerifHero>`

Instrument Serif Italic wrapper for the rare soft-hero moment. Max 3 lines, centered.

---

## 5. Layout system

3-layer same as before, minus the orbs. Background is flat near-black.

```tsx
<NoirScreen>
  <NoirHeader />            {/* absolute top */}
  <ScrollView>
    {content}
  </ScrollView>
  <NoirTabBar />            {/* absolute bottom (via root layout) */}
</NoirScreen>
```

---

## 6. Screen recipes (12 screens → implementation)

### 6.1 Home Blueprint Noir (#4) → `app/(tabs)/index.tsx`

```
<NoirScreen>
  <NoirHeader brand="FIXIT NOIR" />
  <Text display>System Overview</Text>
  <DocRef mono>ID: RES-0492 // SECTOR 7</DocRef>
  
  <NoirCard elevated padding={24}>
    <HealthChip label="HEALTH: 84%" tone="mint" />  {/* top-right */}
    <BlueprintDiagram />                             {/* house wireframe SVG */}
    <NoirCard outlined padding={12}>
      <DocRef>EST. SAVE</DocRef>
      <HeroNumber value="2.4 kW" size="md" />       {/* or $ */}
    </NoirCard>
  </NoirCard>
  
  <SectionHeader right="VIEW LOG →">Recent Alerts</SectionHeader>
  <AlertRow icon="mint" title="Attic Moisture Detected" meta="SENSOR 04 · 12 MINS AGO" />
  <AlertRow icon="mint-check" title="HVAC Filter Optimal" meta="SYSTEM CHECK · 2 HRS AGO" />
  
  <NoirTabBar />
</NoirScreen>
```

### 6.2 Home Health Indicator (#8) → `app/(tabs)/health.tsx` or tap-through from Home

```
Header: "☰ FIXIT NOIR 👤"
DocRef: "PRIMARY RESIDENCE"
Display: "HOME HEALTH / DASHBOARD"

<NoirCard elevated>
  <RingChart value={87} />
    overlay: home icon center + "87" hero + "HOME HEALTH · FAIR" label
    segment dots around: ROOF / WALLS / PLUMBING / ELECTRICAL / APPLIANCES
  <row>LAST SCAN · 08:42 AM · TODAY ↺ RESCAN</row>
</NoirCard>

<AlertCard severity="moderate">
  "Roof Inspection Recommended"
  body line
  "VIEW DETAILS →"
</AlertCard>

<row>
  <StatCard title="HVAC EFFICIENCY" value="94%" />
  <StatCard title="WATER PRESSURE" value="62 PSI" />
</row>

<NoirTabBar active="projects" />   {/* PROJECTS highlighted per screenshot */}
```

### 6.3 Your House / First Estimate (#6) → `app/your-house.tsx`

First-view of what FixIt analyzed. Hero verdict + tagged diagnosis.

```
Header: "◁ [house icon] First Estimate ⚙"
Display: "YOUR HOUSE"
<NoirCard elevated>
  <HouseWireframe>                            {/* SVG illustration of house */}
    <Tag color="cyan" label="ROOF INTEGRITY" position={...} />
    <Tag color="amber" label="MAIN LINE" position={...} />
    <Pulse position={...} />                  {/* spot markers */}
  </HouseWireframe>
</NoirCard>
<AmberCTA outlined label="2 ISSUES FOUND" />
<NoirTabBar active="home" />
```

### 6.4 Fix Selection - Noir (#7) → `app/fix-selection.tsx`

Three routes stacked as cards with monochrome photos.

```
Header: ◁ SERVICE_DETAILS ⋯
Display: ROOF LEAK

<RouteCard imageKey="tools">
  HeroNumber $15 (white)
  meta "DIY · 15 MIN"
</RouteCard>

<RouteCard imageKey="handshake" recommendedBadge>
  HeroNumber $45 (amber)
  meta "HYBRID · 45 MIN"
</RouteCard>

<RouteCard imageKey="toolbox">
  HeroNumber $180 (white)
  meta "FULL PRO · 2 HOURS"
</RouteCard>

<AmberCTA primary label="SELECT PLAN" />
<NoirTabBar />
```

### 6.5 Repair Detail Noir (#3 / #12) → `app/repair/[id].tsx`

The core diagnostic screen.

```
Header: FIXIT NOIR 👤
DocRef row: "REF: RP-002 · ACTIVE REPAIR [·BUILD: FP-052]"

Display Narrow: "ROOF LEAK"
body: "Structural breach identified in North-West quadrant. Moisture penetration detected in sub-layer."

section "ESTIMATED IMPACT":
  HeroNumber "$450" (huge)
  body small: "Calculated based on local material costs and standard labor rates for a localized patch repair."

row:
  <col><DocRef>SEVERITY</DocRef><SeverityChip level="moderate" /></col>
  <col><DocRef>EST. TIME</DocRef><Text display>4-6</Text><sub>HOURS</sub></col>

<DocRef>REPAIR PROGRESS</DocRef>
<ProgressBar value={0.35} tone="amber" />
<Text tiny>0/1 STAGE COMPLETE · 35%</Text>

<DocRef>REQUIRED TOOLS / MATERIALS</DocRef>
<ToolChipRow labels={['SEALANT', 'LADDER', 'TROWEL']} />

<row padded>
  <AmberCTA outlined label="DIY GUIDE" />
  <AmberCTA primary label="FIND PRO" />
</row>

<NoirTabBar active="projects" />
```

### 6.6 Repair Step: Faucet Nut (#2) → `app/repair/[id]/step/[n].tsx`

Step-by-step guide.

```
Header: ◁ REPAIR_MANUAL ⚙

DocRef: "SYSTEM STATUS · Step 2 of 5"
<BlueprintPhoto aspectRatio={4/3}>                {/* small technical diagram */}
  labels "AXIAL_VIEW, COMPONENTS, 1:1 SPD"
</BlueprintPhoto>

<SerifHero italic>Открути верхнюю гайку</SerifHero>   {/* italic serif */}

<body>Используйте разводной ключ...</body>

<AlertRow amber>"STEP WARNING: Don't force it."</AlertRow>

<row>
  <AmberCTA outlined label="ГОТОВО" />         (half width)
  <AmberCTA outlined label="Я ЗАСТРЯЛ" />      (half width)
</row>

<tiny>ВРЕМЯ ЭТОГО ШАГА · 12 MIN</tiny>

<NoirTabBar />
```

### 6.7 Spring Tune-Up Blueprint (#5) → `app/seasonal-plan.tsx`

```
Header: ◁ OBSIDIAN ARCH 👤

<NoirCard elevated padding={32}>
  <BlueprintScene>                               {/* SVG house grid + 3 cyan dots */}
    <DocRef>SEC_04 // ELEV_12</DocRef>
    <DocRef>X: 42.1 Y: -18.4</DocRef>
  </BlueprintScene>
  
  <SerifHero italic>SPRING · THE TUNE-UP</SerifHero>
  <body small>three small things keep summer cheap</body>
</NoirCard>

<NoirTabBar active="repairs" />
```

### 6.8 Warranty Tracker (#10) → `app/warranty.tsx`

```
Header: ◁ MAINTENANCE_SYSTEM 👤

<BlueprintFrame>
  <FridgeIllustration />                         {/* grey wireframe appliance */}
</BlueprintFrame>

<RingChart value={0.58} amber />                 {/* partial ring */}
<HeroNumber inside-ring "423 days" />
<DocRef centered>WARRANTY · UNTIL JUL 2027</DocRef>

<AmberCTA outlined label="ADD RECEIPT PDF" />

<tiny row>
  <col>40.7128° N</col>
  <col>74.0060° W</col>
  <col>REF: 0092-B2</col>
</tiny>

<NoirTabBar active="repairs" />
```

### 6.9 My Home Empty (#11) → `app/(tabs)/vault.tsx` or initial empty state

```
Header: ◁ ARCHITECT.REPAIR 👤

<NoirCard elevated center padding={32}>
  <HouseOutlineIllustration />                    {/* SVG thin outline house */}
  
  <hero>Your house is calm</hero>                 {/* bold not italic */}
  <body>Snap a photo when something needs attention. Your saved fixes will live here.</body>
  
  <AmberCTA outlined label="TAKE A PHOTO →" />
</NoirCard>

<NoirTabBar active="plan" />
```

### 6.10 Find a Pro - Bottom Sheet (#1) → `app/find-a-pro.tsx`

```
Modal sheet, 70% height.

Header: ☰ PRO_ARCHITECT 👤

<NoirCard elevated>
  <BlueprintGridPattern />                        {/* subtle grid bg */}
  <SerifHero italic>Найти мастера</SerifHero>
  <DocRef centered>ARCHITECTURAL MAINTENANCE SEARCH</DocRef>
  
  <SearchField icon="pin" placeholder="" />        {/* one inline field */}
</NoirCard>

<TabBar active="search" />
```

### 6.11 Твой дом - Обзор (#9) → `app/(tabs)/home-overview.tsx`

```
Header: ☰ # HOME_CODE 🔔

<SerifHero italic>Твой дом</SerifHero>
<HouseIllustration warmLit />                     {/* house with warm light windows */}

<StatCard title="SAVED">$2,340</StatCard>
<StatCard title="HEALTH">87</StatCard>
<StatCard title="FIXES">7</StatCard>

<SectionHeader>RECOVERY CALENDAR</SectionHeader>
<ActivityGraph />                                  {/* thin mint curve */}

<ListRow title="Kitchen Tap Replacement" price="$145.00" />
<ListRow title="Bathroom Tile Grout" price="$320.00" />

<AmberCTA primary label="+ NEW FIX" />            {/* bottom right pill */}

<NoirTabBar />
```

### 6.12 Repair Detail Noir (#12) variant

Same as 6.5, slight layout tweaks. Reuse one template.

---

## 7. Iconography

Minimal stroke glyphs, 1px stroke, monochrome (white or accent). No flat-color illustrations.

- House outline
- Wrench (side view, 1px stroke)
- Clock (circle + 2 lines)
- Person (circle + trapezoid)
- Gear (cog)
- Chevron right (→)
- Pin (droplet-shape outline + dot)
- Grid (4 squares)

All via react-native-svg.

---

## 8. Haptics / motion

Same rules as UX-SPEC §3-4. Noir-specific:
- Press-scale on cards `0.98` (subtler than 0.96 — noir feels more restrained)
- No orb drift (nothing to drift — flat canvas)
- Blueprint grid can fade in on mount (200ms, optional)
- Italic serif hero — small fade-up entrance (300ms, translateY: 8 → 0)

---

## 9. Pre-commit checklist

- [ ] No `#fff`, `#ffffff` anywhere — always `colors.text` or `rgba(255,255,255,...)`
- [ ] No warm cream / peach / sage in core palette (only the 4 accent colors)
- [ ] Every screen wraps `<NoirScreen>`
- [ ] Every detail screen has a DocRef chip
- [ ] Italic serif used ≤1x per screen, only for soft moment
- [ ] Tab bar on every tab screen, not on modals
- [ ] All text `color` from tokens, not inline
- [ ] Display headers use Archivo Narrow Bold uppercase

---

## 10. Artifacts

- `constants/tokens.ts` — dark palette
- `components/ui/NoirScreen.tsx`
- `components/ui/NoirCard.tsx`
- `components/ui/NoirHeader.tsx`
- `components/ui/NoirTabBar.tsx`
- `components/ui/DocRef.tsx`
- `components/ui/AmberCTA.tsx`
- `components/ui/HeroNumber.tsx`
- `components/ui/SeverityChip.tsx`
- `components/ui/ProgressBar.tsx`
- `components/ui/RingChart.tsx`
- `components/ui/ToolChip.tsx`
- `components/ui/SerifHero.tsx`
- `components/ui/BlueprintGlyphs.tsx`
- `mock/repair.ts`

Plus 11 screens mapping to Stitch output.

---

**Last updated:** 2026-04-20 (v2 post-correction). Replaces Sunday Morning Sanctuary v1.
