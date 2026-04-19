# FixIt

## Stack
- Expo SDK 55, React Native, TypeScript strict
- expo-router (file-based routing)
- Supabase (auth, database, storage)
- Adapty (subscriptions)
- Claude API (photo analysis + repair reasoning + cost estimation + DIY guide generation)
- **No partnerships, no SKU databases, no web scraping, no manual content curation.** Claude API does all the heavy lifting.

## About
AI home repair cost advisor. User takes a photo of a problem (leaky pipe / broken chair / cracked floor / dead appliance) + answers 2-3 quick questions (zip, quality tier, DIY comfort). FixIt identifies the issue via Claude Vision, generates cost range estimates (materials + labor based on Claude's training + optional web search), returns 3 options: **DIY** (materials suggestions + AI-generated step-by-step guide), **Hybrid** (you buy parts, hire installation), **Full Pro** (deeplink to find a pro on Thumbtack / Google Maps / Yelp). No contractor onboarding, no partnership dependencies.

## Scope
- Home repair: plumbing, electrical, walls, floors, doors, windows, roofs, HVAC
- Furniture repair & assembly: broken chair, hinge, IKEA assembly, damaged table
- Appliance repair: washing machine, fridge, dishwasher, oven, AC
- Global — not US-only (Claude API works in any region; prices localized via region in prompt)

## Target Audience
- Homeowners 28-55 — primary
- Renters who need repairs for deposit recovery
- DIY enthusiasts wanting cost reality check
- Budget-conscious families

## Current Stage
Product re-scope complete (AI-only, no partnerships). Moving to Stage 5 Design (Лана + Stitch).

## Monetization
- **Freemium:** 3 estimates/month free, then paywall
- **Subscription:** $9.99/month or $49.99/year (annual preselected, 58% discount)
- **Pay-per-estimate:** $2.99 one-off (for casual users who don't want subscription)
- **Amazon Associates (optional, simple):** 1-3% on materials deeplinks — bonus revenue, no partnership needed, just Amazon affiliate account signup
- **NO Thumbtack/Angi/HomeAdvisor/Lowe's partnerships** — future v1.5+ if we get traction and partnerships approve us

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
- /docs/05-database/ — DB schema, migrations, RLS policies
- /docs/06-design/ — Stitch outputs, design system (stage 5)
- /docs/07-development/ — implementation notes
- /docs/08-deployment/ — store listings, release notes

## References
- `agents/reference-materials/niche-finding/niche-finder-system.md` — методология (GAP_SCORE)
- `agents/reference-materials/niche-finding/bug-bite-identifier-market-research.md` — эталон research
- `agents/reference-materials/monetization/` — paywall/onboarding primary research
- `agents/reference-materials/practices-examples/` — Sugar Quit как reference для структуры research docs

## Team
- **Manager:** Лана Бэй (@langbey / github: lanabey)
- **Owner:** Amanda (@gazetastreet)
- **Support:** Amanda will help on architecture and complex modules
