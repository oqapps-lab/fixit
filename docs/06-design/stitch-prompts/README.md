# FixIt — Stitch prompts (screen-by-screen)

**Дата:** 2026-04-19
**Стиль:** The Exhale — light modern editorial, screen-wide vertical gradient, frosted glass + gradient orbs, ghosted hero numbers, single glossy coral anchor per screen
**Образец формулы:** [`sugar-quit/docs/06-design/style-exploration/FORMULA.md`](../../../../sugar-quit/docs/06-design/style-exploration/FORMULA.md) + [`v10-editorial-narrative.md`](../../../../sugar-quit/docs/06-design/style-exploration/v10-editorial-narrative.md)

Все промпты — в одном консистентном языке The Exhale, но каждый экран закрывает свою UX-задачу. Запускай в Stitch Pro **без картинок на вход**, один за другим. Stitch видит, что экраны — из одного продукта.

## Экраны

| # | Файл | Экран из SCREEN-MAP | Назначение |
|---|---|---|---|
| 1.1 | [`screen-welcome.md`](./screen-welcome.md) | Welcome | Первое впечатление, atmosphere setter |
| 1.4 | [`screen-camera.md`](./screen-camera.md) | Camera View | Sovereign full-bleed, warm guidance overlays |
| 1.6 | [`screen-processing.md`](./screen-processing.md) | AI Processing | Labor illusion 5-8 сек, 5 стадий |
| 1.7 | [`screen-estimate-result.md`](./screen-estimate-result.md) | First Estimate Result | **Aha moment** — главный экран продукта |
| 3.1 | [`screen-home.md`](./screen-home.md) | Home Tab | Post-onboarding, 5 widgets, home health |
| 5.1 | [`screen-paywall-soft.md`](./screen-paywall-soft.md) | Soft Paywall | После 3-го estimate, annual + monthly + pay-per |

## Что объединяет все 6 промптов

- **Screen-wide vertical gradient** (cream → peach → coral → mint → lavender)
- **4 gradient orbs** плавающих за всем содержанием
- **Frosted glass** surfaces с backdrop blur + warm shadow
- **Ghosted hero numbers** (translucent massive sans-serif watermarks — $2,340, $485, $165, 30m, 45m, 2h, 365 days)
- **Italic serif hero headline** per screen (editorial magazine feel)
- **UPPERCASE TRACKED whisper labels** вместо prose
- **Tiny flat-painted illustrations** (faucet, wrench, piggy-house, cherry blossoms, receipts, etc.)
- **Single glossy coral-to-amber anchor** — highlight streak, warm halo (CTA pill on action screens, "+" orb on home, capture button on camera)
- **Motion-directive** в каждом промпте — suggested breath/drift/pulse

## Что разделяет экраны

- **Welcome** — hero italic serif "Know the price / before it breaks you" + 3 painted category vignettes
- **Camera** — live viewfinder + frosted overlays + "LEAKY CARTRIDGE SPOTTED" confidence pill
- **Processing** — photo-circle centerpiece + rotating halo + 5 stage rows
- **Estimate Result** — 3 option glass cards (DIY mint / Hybrid peach / Pro coral) + ghosted time per card
- **Home** — 5 distinct widget forms (radial ring / flowing curve / scene card / chunky donut / vertical bars)
- **Paywall** — 2 pricing cards + painted receipts-on-corkboard + pay-per fallback

## Архив

Старые style-exploration варианты (v1-v5) в [`_archive/`](./_archive/) — первая итерация, слишком тёмные/скучные, перед тем как я вернулась к твоей The Exhale формуле.
