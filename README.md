# FixIt

**AI home repair cost advisor** — фотография + пара вопросов → реальная оценка ремонта с вариантами DIY / Hybrid / Pro и актуальными ценами.

## Что делает

1. Пользователь фотографирует проблему (протекающая труба / сломанная мебель / умершая техника)
2. Отвечает на 3-5 вопросов (регион, качество ремонта, готовность делать самому, срочность)
3. FixIt:
   - Идентифицирует проблему (Claude Vision)
   - Подбирает нужные материалы + их цены (real-time через retailer APIs: Home Depot / Lowe's / Amazon)
   - Считает local labor rates (Thumbtack / HomeAdvisor / Yelp по zip/city)
   - Выдаёт 3 варианта: **DIY** (материалы + видео-гайд + время) / **Hybrid** (материалы сам, установка — мастер) / **Full Pro** (найти контрактора, получить квоту)
4. Опционально — lead-gen: связать с мастером через affiliate-партнёра

## Scope

- 🏠 Home repair: сантехника, электрика, стены, полы, двери, окна, крыша, HVAC
- 🪑 Furniture repair & assembly
- 🔌 Appliance repair: стиральная машина, холодильник, посудомойка, плита, кондиционер
- 🌍 Global

## Tech

Expo SDK 55 · React Native · TypeScript strict · Supabase · Adapty · Claude API

## Stage

Stage 5 Design — started 2026-04-20. Expo scaffolding + primitives + 8 key screens shipped.

## Design system

Design language is **"The Sunday Morning Sanctuary"** — distilled from Google Stitch via [DESIGN-GUIDE.md](docs/06-design/DESIGN-GUIDE.md). Warm cream canvas · vertical atmospheric gradient · frosted glass surfaces · glossy coral CTA · ghosted hero numbers · UPPERCASE TRACKED labels.

Primitives (use these, don't reinvent):

- `<AtmosphericGradient theme="sanctuary">` — full-screen vertical gradient (root of every screen)
- `<OrbField>` — 4 soft-blurred radial orbs drifting behind content
- `<GlassCard tint="sage" | "peach" | "coral" | "lavender">` — frosted pane with warm-tinted shadow
- `<PillCTA tone="primary" size="lg">` — the single anchor — glossy coral gradient, haptics, a11y
- `<GhostNumber value="$165" size="lg">` — massive translucent watermark number

All tokens live in [constants/tokens.ts](constants/tokens.ts). No inline hex allowed outside.

## Run

```bash
npm install
npm run ios        # or: npm run android / npm run web
```

## Current screens (design review build)

- `/(onboarding)/welcome` — hero editorial intro + 3 category vignettes + coral CTA
- `/(onboarding)/location` — ZIP entry with location auto-detect
- `/(onboarding)/camera-primer` — sample category tiles + permission priming
- `/(onboarding)/processing` — 5-stage labor illusion with rotating halo
- `/(onboarding)/result` — first estimate aha moment (3 route cards + savings pill)
- `/(tabs)/` — Home / My Home / Estimates / Profile with floating coral FAB
- `/paywall` — soft paywall after 3rd estimate
- `/find-a-pro` — bottom sheet deeplink to Thumbtack / Google Maps / Yelp

## Docs

- [DESIGN-GUIDE.md](docs/06-design/DESIGN-GUIDE.md) — authoritative design system (Stitch → native translation)
- [UX-SPEC.md](docs/04-ux/UX-SPEC.md) — interaction patterns, haptics, animations, copy voice
- [SCREEN-MAP.md](docs/04-ux/SCREEN-MAP.md) — full screen inventory (42 unique MVP)
- [USER-FLOWS.md](docs/04-ux/USER-FLOWS.md) — happy + edge flows
- [POSITIONING.md](docs/02-product/POSITIONING.md) — brand voice (calm advisor, Know/Decide/Understand)

## Team

- **Manager:** @langbey (Лана)
- **Owner:** @gazetastreet (Amanda)

---

*part of [oqapps-lab](https://github.com/oqapps-lab)*
