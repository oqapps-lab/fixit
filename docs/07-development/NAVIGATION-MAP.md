# FixIt — NAVIGATION-MAP

**Date:** 2026-04-20
**Stage:** 06 Development
**Purpose:** Single source of truth for routes, presentations, and edges. Every SCREEN-MAP entry has a node; every USER-FLOWS transition has an edge.

---

## Route table

| Route | Type | Screen-map id | File |
|---|---|---|---|
| `/` | Redirect | — | `app/index.tsx` |
| `/(onboarding)/welcome` | Stack | 1.1 | `app/(onboarding)/welcome.tsx` |
| `/(onboarding)/location` | Stack | 1.2 | `app/(onboarding)/location.tsx` |
| `/(onboarding)/camera-primer` | Stack | 1.3 | `app/(onboarding)/camera-primer.tsx` |
| `/(onboarding)/capture` | Stack | 1.4 / 4.1 | `app/(onboarding)/capture.tsx` |
| `/(onboarding)/context` | Stack | 1.5 / 4.3 | `app/(onboarding)/context.tsx` |
| `/(onboarding)/processing` | Stack | 1.6 / 4.4 | `app/(onboarding)/processing.tsx` |
| `/(onboarding)/signup-ask` | Modal (sheet) | 1.8 | `app/(onboarding)/signup-ask.tsx` |
| `/(auth)/sign-up` | Stack | 2.1 | `app/(auth)/sign-up.tsx` |
| `/(auth)/sign-in` | Stack | 2.2 | `app/(auth)/sign-in.tsx` |
| `/(tabs)` | Tabs | 3 | `app/(tabs)/_layout.tsx` |
| `/(tabs)/` | Tab | 3.1 / 3.2.1 | `app/(tabs)/index.tsx` — Home Health Dashboard |
| `/(tabs)/repairs` | Tab | 3.3.1 | `app/(tabs)/repairs.tsx` — Projects / Estimates list |
| `/(tabs)/blueprints` | Tab | custom | `app/(tabs)/blueprints.tsx` — Blueprints index |
| `/(tabs)/vault` | Tab | 3.4 | `app/(tabs)/vault.tsx` — Profile / Empty state |
| `/your-house` | Stack | 1.7 initial / 4.5 re-entry | `app/your-house.tsx` |
| `/fix-selection` | Stack | 4.5 select | `app/fix-selection.tsx` |
| `/repair/[id]` | Stack | 4.5.detail | `app/repair/[id].tsx` |
| `/repair-step` | Stack | 4.5.1 step | `app/repair-step.tsx` |
| `/warranty` | Stack | 3.2.2 | `app/warranty.tsx` |
| `/seasonal` | Stack | 3.2.4 | `app/seasonal.tsx` |
| `/home-overview` | Stack | alt variant | `app/home-overview.tsx` |
| `/find-a-pro` | Transparent modal | 7.1 | `app/find-a-pro.tsx` |
| `/paywall` | Modal | 5.1 | `app/paywall.tsx` (batch 5) |
| `/paywall/save` | Modal | 5.2.1 | batch 5 |
| `/paywall/warranty` | Modal | 5.2.2 | batch 5 |
| `/paywall/pdf` | Modal | 5.2.3 | batch 5 |
| `/paywall/alerts` | Modal | 5.2.4 | batch 5 |
| `/paywall/success` | Modal | 5.3 | batch 5 |
| `/settings` | Stack | 3.4.1 | `app/settings/_layout.tsx` + subs (batch 4) |
| `/saved-projects` | Stack | 3.4.2 | batch 4 |
| `/estimates` | Stack | 3.3.1 expanded | batch 4 |
| `/estimates/[id]` | Stack | 3.3.2 | batch 4 |
| `/estimates/compare` | Stack | 3.3.3 | batch 4 |
| `/rooms/[id]` | Stack | 3.2.3 | batch 4 |
| `/notifications` | Stack | 6.1 | batch 6 |
| `/error/offline` | Modal | 8.1 | batch 7 |
| `/error/ai-failed` | Modal | 8.3 | batch 7 |
| `/error/blurry` | Modal | 8.5 | batch 7 |
| `/error/unknown-problem` | Modal | 8.6 | batch 7 |
| `/error/sub-failed` | Modal | 8.7 | batch 7 |
| `/error/force-update` | Modal fullscreen | 8.8 | batch 7 |
| `/error/maintenance` | Modal fullscreen | 8.9 | batch 7 |

---

## Presentation rules

- **Modal** (`presentation: 'modal'`) — paywall, signup-ask, save-estimate, share-estimate
- **Transparent modal** (`presentation: 'transparentModal'`) — find-a-pro, context paywalls that overlay
- **Modal fullscreen** (`presentation: 'fullScreenModal'`) — force-update, maintenance (block navigation)
- **Stack default** — everything else, `slide_from_right` animation
- **Tabs** — `(tabs)` group, custom floating NoirTabBar

Modal dismiss rule (from `methodology_screen_map_first.md`):
```ts
const close = () => router.canGoBack() ? router.back() : router.replace('/(tabs)');
```
Never plain `router.back()` — deep-linked modals fail.

Tab switch rule: `router.replace('/(tabs)/<name>')` not `push(...)` to avoid stack buildup.

---

## Key edges (from USER-FLOWS)

### Flow 1: Install → First Estimate (Emma, ~75 sec, aha moment)
```
/  →  welcome (1.1)  [CTA "Take a photo"]
    →  location (1.2)  [zip entered]
    →  camera-primer (1.3)  [Allow camera]
    →  capture (1.4)  [shutter]
    →  context (1.5)  [Continue]
    →  processing (1.6)  [auto after 6.5s]
    →  your-house (1.7)  [Review fixes]
    →  fix-selection  [Select plan]
    →  repair/[id]  [THIS IS THE AHA]
    →  signup-ask (1.8, modal up)  [Save / Continue]
    →  (tabs)/  [Home]
```

### Flow 2: Returning user → estimate
```
(tabs)/  →  capture (4.1, direct from FAB)  →  context (4.3, pre-filled)  →  processing (4.4)  →  your-house → fix-selection → repair/[id]  →  save-estimate modal  →  (tabs)/
```

### Flow 3: Quota hit → soft paywall
```
(tabs)/  [4th estimate attempt]
    →  /paywall (5.1, modal)
        →  Pay flow  →  /paywall/success (5.3)  →  resume (tabs)/
        →  Or  Cancel  →  (tabs)/
        →  Or  Pay-per  →  capture
```

### Flow 4: Save quota hit → context paywall
```
repair/[id]  [Save button, 6th save]
    →  /paywall/save (5.2.1, transparent modal)
    →  Upgrade → /paywall → 5.3 → back to repair/[id]
    →  Or dismiss → repair/[id]
```

### Flow 5: Pro handoff
```
repair/[id]  [Find pro button]
    →  /find-a-pro (7.1, transparent modal)
    →  Tap platform → Linking.openURL()
    →  iOS returns → repair/[id] state preserved
```

### Flow 6: Error — camera denied
```
camera-primer (1.3)  [Allow → iOS denies]
    →  /error/camera-unavailable (8.2, modal)
    →  "Open Settings" → Linking.openSettings()
    →  Or "Use gallery instead" → capture with gallery-mode
```

### Flow 7: Offline
```
(any screen)  [network drop detected]
    →  top banner (not full-screen block)
    →  If user tries estimate →  /error/offline (8.1, modal)
    →  Retry polls every 10s
```

---

## Edge invariants (pre-commit checklist)

- [ ] Every `router.push`/`replace` target exists in this table
- [ ] Every modal uses `router.dismiss()` or `canGoBack()?back():replace(...)` fallback
- [ ] Tab switches use `router.replace`, not `push`
- [ ] No screen invented outside SCREEN-MAP (check against this table)
- [ ] Every Pressable with navigation has `accessibilityLabel` stating the target
- [ ] Primary nav taps have `Haptics.selectionAsync` or `Haptics.impactAsync`

---

## Batch dependency graph

```
Batch 1 (Onboarding) ─┐
                      ├─> Batch 2 (Auth + Main Tabs core) ─┐
                      │                                    ├─> Batch 3 (Estimate Flow extra) ─┐
                      │                                    │                                  │
                      └────────────────────────────────────┘                                  │
                                                                                              │
                                                         Batch 4 (Settings + sub-screens) ────┤
                                                         Batch 5 (Paywall + context) ─────────┤
                                                         Batch 6 (Notifications + maintenance)┤
                                                         Batch 7 (Error states) ──────────────┘
                                                                                              │
                                                                                              ▼
                                                                                    L3 parity + ship
```

Batches 4-7 are independent of each other — can parallelize via multi-agent.

---

## STATUS anchor
Updated inline at `<project>/STATUS.md`. Check there for current batch and last commit.
