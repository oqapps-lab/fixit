# FixIt v2 — Calm Clarity

**Настроение:** architectural, precise, quietly confident. Engineer who won't bullshit you.
**Палитра через природу:** morning fog settling over slate roof + pale-bone paper + deep-ink marine + a single clean teal
**X-instead-of-Y:** clarity IS the trust — negative space and alignment replace visual noise

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a broken thing returns three honest routes: fix it yourself, split the work, or hire a licensed pro. Real material prices from Home Depot and Lowe's, real labor rates for your ZIP. For the moment you know it's broken but don't yet know what broken costs.

Mood & visual identity: imagine a municipal engineer's morning office — pale bone paper pinned to a drafting board, a slate-grey sky through a north-facing window, a single clean teal pen laid precisely parallel to a ruler, no clutter anywhere. This app lives in that clear cold morning light — the moment a calm professional reads the situation and gives you numbers you can trust. The palette is a winter morning — pale-bone backdrop settling into fog-grey, deep marine ink for hierarchy, a single saturated teal used sparingly like a signature on a document. Alignment IS the trust. Negative space IS the interface, creating hierarchy through precise spacing instead of borders.

Three routes sit on the page at exact equal distances, laid out like measurements on a blueprint — the cheapest on the left reads first, the middle in the center, the full-service on the right. Each is a quiet rectangular zone of pale-bone, separated from its neighbours by air alone, never by lines. The recommended route holds a single teal accent bar on its upper edge — a small underline saying "this one."

Functional aesthetic — the price range of each option is rendered as a thin horizontal bar beneath the headline, the bar widths in precise proportion to actual dollar amounts. The DIY bar is short. The Hybrid bar is medium. The Pro bar is long. You can read the spread at a glance without reading a number.

The anchor: the single teal accent bar above the recommended Pro option. Sharp, thin, definite. "This is where a licensed plumber earns their rate." Everything else reads in bone and fog and marine ink. The teal never appears elsewhere on the screen — it is reserved.

Typography is architectural and exact. A clean geometric sans throughout — thin for body, medium for headlines, bold only for the prices and the labor hours. Numbers are the heroes — "$15", "$45", "$180", "30 min", "2h", "half-day" — set in heavy sans with generous letter-spacing, right-aligned against the price bars so the eye can scan down a column. Every number has air around it. Nothing is cramped.

One screen. The morning drafting board — precise, clear, patient.

At the top, a small thumbnail of the user's photo rendered as a clean square with a thin marine outline — no Polaroid charm, just the photo on the desk. Beside it, a small UPPERCASE TRACKED label in fog-grey: "DIAGNOSIS". Below in deep marine sans: "Leaky Kitchen Faucet Cartridge" — medium-weight, sitting at the exact optical centre of the headline zone. A single body line beneath in fog-grey: "Worn O-ring in single-handle cartridge. 92% confidence."

A thin single-pixel marine horizontal rule well below the headline, no decoration.

Below the rule, a small UPPERCASE TRACKED section label: "THREE ROUTES" — nothing louder.

Three equal-width zones in a horizontal row, separated by air only.

[DIY zone] Top-right of the zone: a small UPPERCASE TRACKED label "DIY" in fog-grey. Center: "$15" in heavy marine sans, the smallest of the three prices. Below the number: a short horizontal bar in marine proportional to the cost (narrowest of the three). Below the bar: "30 min · O-ring kit · Beginner-friendly" in fog-grey small sans, set in one line. Below that: "Save $165" in teal whisper — the only teal text on the DIY zone, tiny, a single pill shape outlined not filled.

[Hybrid zone] Top-right: "HYBRID". Center: "$45" in heavy marine. Below: a medium horizontal bar in marine. Below the bar: "45 min visit · You buy the part · Save on labor." in fog-grey.

[Pro zone — the anchor] A single thin saturated teal bar across the top edge of the zone, exactly the width of the zone, aligned precisely to zero margin. Top-right: "FULL PRO" in UPPERCASE TRACKED. Center: "$180" in heavy marine, the largest of the three. Below: a long horizontal bar in marine proportional to the cost (widest of the three). Below the bar: "2-hour visit · Licensed plumber · 1-year warranty" in fog-grey. Below that: a small teal-outlined pill button "SCHEDULE" — the only filled-feeling element on the screen besides the teal accent bar.

Below the three zones, more air — at least the height of a route zone.

A quiet single-line prompt in deep marine sans: "Would you like to start with DIY?" set exactly centered. Below it, a teal-outlined pill button: "OPEN DIY GUIDE" — exactly the same weight as the SCHEDULE button, so hierarchy is horizontal not vertical.

At the very bottom edge, a minimal pill-shaped navigation with four small geometric line-icons (home, history, saved, profile), fog-grey, never the focus.

Primary Design Surface: App.
```

---

## Что должно выйти (ожидание)

- Pale bone + fog grey + marine ink + single teal accent
- Alignment как hero feature — всё на grid, всё дышит воздухом
- Price bars как proportional to dollar amount (data viz)
- Clean geometric sans, no serif anywhere
- Teal используется ОДИН раз (на Pro card) — как signature
- Горизонтальный rhythm: diagnosis → rule → three routes → prompt → button

## Против чего тестировать

- Не должно выйти "SaaS enterprise dashboard" — слишком корпоративно
- Не должно выйти "medical app cold" — должна остаться warmth через фото пользователя
- Должно выйти "engineer wrote this for you" — precision как kindness
