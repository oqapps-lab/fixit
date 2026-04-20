# FixIt

**AI home repair cost advisor** — фотография + пара вопросов → реальная оценка ремонта с вариантами DIY / Hybrid / Pro и актуальными ценами.

## Что делает

1. Пользователь фотографирует проблему (протекающая труба / сломанная мебель / умершая техника)
2. Отвечает на 3-5 вопросов (регион, качество ремонта, готовность делать самому, срочность)
3. FixIt:
   - Идентифицирует проблему (Claude Vision)
   - Подбирает нужные материалы + их цены
   - Считает local labor rates по ZIP
   - Выдаёт 3 варианта: **DIY** (материалы + гайд) / **Hybrid** (материалы сам, установка — мастер) / **Full Pro** (deeplink в Thumbtack/Google/Yelp)

## Scope

- 🏠 Home repair: сантехника, электрика, стены, полы, двери, окна, крыша, HVAC
- 🪑 Furniture repair & assembly
- 🔌 Appliance repair: стиральная машина, холодильник, посудомойка, плита, кондиционер
- 🌍 Global

## Stack

Expo SDK 55 · React Native 0.83 · TypeScript strict · expo-router v6 · Supabase · Adapty · Claude API

## Stage

**Stage 5 Design — v2 Noir live (2026-04-20).**
Industrial blueprint dark theme distilled from 12 Stitch screens. Primitives + 10 screens shipped. Supabase/Claude API integration — Stage 6.

## Design system

**FixIt Noir** — industrial engineering-inspection mood:
- Near-black canvas с вертикальным атмосферным градиентом + amber glow снизу-справа + cyan glow сверху-слева
- Полупрозрачные glass-карточки (BlurView + top-edge highlight)
- Плавающий таб-бар (rounded pill, blur, amber dot indicator)
- Amber CTA (single clean gradient, subtle halo)
- Condensed Archivo Narrow + Inter + JetBrains Mono + Instrument Serif Italic
- Doc refs повсюду (`REF: RP-002 · ACTIVE · BUILD: FP-052`)
- Severity chips, progress bars, ring charts для диагностики

Авторитетный guide — [`docs/06-design/DESIGN-GUIDE.md`](docs/06-design/DESIGN-GUIDE.md). Оригинальные Stitch-скриншоты — [`docs/06-design/stitch-raw/`](docs/06-design/stitch-raw/).

## Запуск для тестирования

См. [`docs/07-development/RUN-LOCAL.md`](docs/07-development/RUN-LOCAL.md) — подробная инструкция (requirements, clone, install, start, troubleshooting).

Быстро (на Mac):
```bash
npm install --legacy-peer-deps
npx expo start --ios
```

## Structure

```
app/                 expo-router routes (file-based)
  (tabs)/            Systems / Projects / Blueprints / Vault
  repair/[id]        Repair Detail (dynamic)
  your-house         First estimate assessment
  fix-selection      Three routes selection
  repair-step        Step-by-step DIY guide
  warranty           Warranty tracker
  seasonal           Spring tune-up blueprint
  home-overview      "Твой дом" variant
  find-a-pro         Platform deeplink modal

components/ui/       14 design primitives
constants/           tokens.ts (single source of truth)
hooks/               useAppFonts
mock/                mock data (repair.ts)

docs/
  01-research/       Market research
  02-product/        POSITIONING / FEATURES / MONETIZATION / PRODUCT-VISION
  03-practices/      ONBOARDING / PAYWALL / RETENTION / ASO research
  04-ux/             SCREEN-MAP / USER-FLOWS / UX-SPEC / WIREFRAMES / FUNNEL
  05-database/       schema / migrations / RLS
  06-design/         DESIGN-GUIDE + stitch-raw screenshots
  07-development/    RUN-LOCAL + implementation notes
  08-deployment/     store listings + release notes
```

## Team

- **Owner:** @gazetastreet (Amanda)
- **Manager:** @langbey (Лана)

---

*part of [oqapps-lab](https://github.com/oqapps-lab)*
