# FixIt

## Stack
- Expo SDK 55, React Native, TypeScript strict
- expo-router (file-based routing)
- Supabase (auth, database, storage)
- Adapty (subscriptions)
- Claude API (photo analysis + repair reasoning)
- Price aggregation APIs (Home Depot / Lowe's / Amazon Product / Thumbtack / HomeAdvisor — resolve at Research stage)

## About
AI home repair cost advisor. User takes a photo of a problem (leaky pipe / broken chair / cracked floor / dead appliance) + answers a few questions (region, quality tier, DIY readiness). FixIt identifies the issue, analyzes scope, pulls real-time material prices from retailer APIs, calculates regional labor rates, and returns 3 options: **DIY** (materials list + tutorial + time estimate), **Hybrid** (you buy materials, hire installation), **Full Pro** (find a contractor with quotes). Includes lead-gen affiliate revenue from pro-referral partners.

## Scope
- Home repair: plumbing, electrical, walls, floors, doors, windows, roofs, HVAC
- Furniture repair & assembly: broken chair, hinge, IKEA assembly, damaged table
- Appliance repair: washing machine, fridge, dishwasher, oven, AC
- Global — not US-only (but US gets richest data first)

## Target Audience
- Homeowners 28-55 — primary
- Renters who need repairs for deposit recovery
- DIY enthusiasts wanting cost reality check
- Budget-conscious families

## Current Stage
Research (Stage 1) — стартуем сейчас

## Monetization (to finalize at Product stage)
- Freemium: 3 estimates/мес free, then $9.99/мес unlimited
- Affiliate: $15-40 per pro-referral lead (Thumbtack / HomeAdvisor)
- Pay-per-estimate option for casual users ($2.99 one-off)
- Premium tier with home history + warranty tracker

## Rules
- useWindowDimensions() for responsive
- useSafeAreaInsets() for safe areas
- Haptics.impactAsync() on buttons
- aspectRatio for images (photos critical for this app — enforce)
- Mock data from /mock/ (NO real API until Stage 6)
- Functional components + TypeScript strict
- StyleSheet.create (no inline styles)
- No class components
- No any types

## 3-Layer Layout System
Each screen has three layers:
1. **Background** — absolute, gradients/images, NOT inside ScrollView
2. **Content** — flex/scroll, text, cards, interactive
3. **Floating UI** — absolute, bottom buttons/top header

## File Structure
- /app/ — screens (expo-router)
- /components/ui/ — shared UI components
- /components/[feature]/ — feature-specific components
- /constants/ — colors, fonts, layout
- /mock/ — mock data for development
- /docs/ — all documentation
- /docs/01-research/ — market research (stage 1)
- /docs/02-product/ — product vision, features, monetization (stage 2)
- /docs/03-practices/ — onboarding/paywall/retention/ASO research (stage 3)
- /docs/04-ux/ — wireframes, screen map, user flows (stage 4)
- /docs/06-design/ — Stitch outputs, design system (stage 5)

## References
- `agents/reference-materials/niche-finding/niche-finder-system.md` — методология (GAP_SCORE)
- `agents/reference-materials/niche-finding/bug-bite-identifier-market-research.md` — эталон research
- `agents/reference-materials/monetization/` — paywall/onboarding primary research
- `agents/reference-materials/practices-examples/` — Sugar Quit как reference для структуры research docs

## Team
- **Manager:** Лана Бэй (@langbey / github: lanabey)
- **Owner:** Amanda (@gazetastreet)
- **Support:** Amanda will help on architecture and complex modules
