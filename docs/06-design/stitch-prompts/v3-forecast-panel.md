# FixIt v3 — Forecast Panel

**Настроение:** editorial atmospheric. Wellness weather report но для поломок. Прямой наследник твоего The Exhale.
**Палитра через природу:** dawn sky + afternoon coral + evening mint — но translated в repair context
**X-instead-of-Y:** the gradient IS the triage — color temperature maps directly to fix difficulty

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a leak, a crack, a broken hinge returns a thoughtful forecast of how to fix it — the quick DIY path, the split-work middle route, the full-service pro option — with real prices for your ZIP and your quality tier. For the moment you find a problem at 7pm on a Tuesday and need to know "how bad is this, really?"

Mood & visual identity: imagine a thoughtful weather report for your home — each problem read as a forecast of difficulty and cost, the air warming through the scale from easy-and-cheap to involved-and-serious. The quiet relief after a pro tells you "this is a small fix, you can do it." This app lives in that relief.

The palette breathes — large, slow, atmospheric gradients that shift like sky colors through a repair day. The entire screen is ONE long vertical gradient that narrates the three routes: pale seafoam at the top for the diagnosis zone (clear morning air), warming through soft wheat and dusty coral in the middle for the DIY-to-Hybrid transition, deepening into saturated terracotta at the bottom for the Pro zone where real labor lives. The gradient is not a background — it IS the forecast, creating zones through color temperature instead of borders. Cooler color means simpler fix. Warmer color means more skill, more hours, more cost. The gradient reads like a thermometer you can run your finger down.

Cards float on this gradient as frosted-glass surfaces that pick up the color of the gradient beneath them — the DIY card glows seafoam, the Hybrid card glows wheat-to-coral, the Pro card glows deep terracotta. Editorial typography throughout — large hero serif for forecast headlines, clean sans for labor hours and quick facts, tiny UPPERCASE TRACKED labels for sections, massive sans-serif for the dollar numbers because dollars are what Emma reads first.

Functional aesthetic — color temperature maps difficulty, savings pill colors match cost-ratio (green pill = save the most, amber = save some, no pill on Pro because Pro has no savings). Cards' vertical height tells you the scope of the work at a glance — the DIY card is compact (small job), the Hybrid medium, the Pro card is the tallest (most content, most detail).

The anchor: a single sharp-edged coral pill on the DIY card — "START DIY GUIDE" — crisp against the soft gradient blur around it. "I am the quick path out of this mess. Tap me." Nothing else on the screen has a hard edge.

One screen. A repair forecast read like a wellness weather report crossed with a Sunday magazine page.

[top header] A small compass/target glyph logo beside the app name "FixIt" in small clean sans on the left, a small circular user avatar on the right.

[section label] A tiny UPPERCASE TRACKED label in muted slate beneath the header: "REPAIR FORECAST"

[hero] Large editorial hero typography — "It's a" in medium sans on one line, then "Quick Fix" in massive italic serif on the next line (Quick Fix is the hero headline — the verdict, the largest element on the screen). Below the hero in soft body text: "A worn O-ring in a single-handle cartridge. You can fix this in thirty minutes with a seven-dollar kit."

A small circular thumbnail of the user's photo to the right of the hero block, rendered inside a soft frosted circle, glowing faintly seafoam.

[DIY card — frosted glass with seafoam gradient backdrop glowing through] Top-left: "DIY" in tiny UPPERCASE TRACKED. Middle: "$15" as a massive sans hero number — the cheapest option is the largest number because that's the headline fact. Right side: a small seafoam water-drop icon. Below the number: "Thirty minutes. Beginner-friendly. O-ring kit from Home Depot." in soft body. A saturated coral pill button beneath the body: "START DIY GUIDE" in small clean sans. Behind all of this text, ghosted into the card background, a massive translucent sans-serif "30m" — the time rendered as semi-transparent hero typography filling the card's negative space.

[Hybrid card — frosted glass with wheat-to-coral gradient backdrop warming through, noticeably more saturated than the DIY card] Top-left: "HYBRID". Middle: "$45" as a hero number. Below: "Forty-five minutes. You buy the part, a plumber installs it. A middle path if you want the cartridge picked correctly." in soft body. A wheat-colored outlined pill: "SEE HYBRID PLAN."

[Pro card — frosted glass with deep terracotta gradient backdrop warming through, the most saturated of all three] Top-left: "FULL PRO". Middle: "$180" as a hero number. Below: "Two-hour visit. Licensed plumber. One-year warranty. Schedule same-day or next-morning." in soft body. A terracotta outlined pill: "FIND A PRO."

[savings footer] A thin horizontal row near the bottom: a tiny piggy-bank icon on the left, a small soft mint-green pill labeled "Best Savings" on the right. Below that row: a massive bold "$165" as a number (the single heaviest numeric element on the screen), with "SAVED GOING DIY" in tiny UPPERCASE TRACKED beneath in whisper tone.

[nav] At the very bottom edge: a minimal pill-shaped navigation bar with four small rounded icons (home, camera, history, profile). Whisper-thin, never the focus.

Primary Design Surface: App.
```

---

## Что должно выйти (ожидание)

- Screen-wide vertical gradient: seafoam → wheat/coral → terracotta
- Три frosted-glass cards picking up color of gradient behind them
- Editorial hero typography: "It's a [Quick Fix]" serif italic
- Dollar numbers как heroes ($15, $45, $180, $165)
- Ghosted translucent "30m" / "45m" / "2h" behind price numbers
- Coral "START DIY GUIDE" pill — единственный hard-edged element
- Photo thumbnail inside soft frosted circle

## Против чего тестировать

- Не должно выйти "Calm sleep app" — gradients должны быть warm, не cool-only
- Не должно выйти "Instagram filter aesthetic" — frosted glass должно работать функционально
- Должно выйти прямой кузен "The Exhale" но про ремонт
- Это ставка на твой уже проверенный успех — наименее рискованный вариант
