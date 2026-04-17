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

Research (Stage 1) — старт 17.04.2026

## Docs

Вся документация в `/docs/` — от research до deployment. См. `CLAUDE.md` для полной стека и правил.

## Team

- **Manager:** @langbey (Лана)
- **Owner:** @gazetastreet (Amanda)

---

*part of [oqapps-lab](https://github.com/oqapps-lab)*
