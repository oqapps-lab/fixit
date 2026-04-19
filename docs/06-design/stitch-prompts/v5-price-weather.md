# FixIt v5 — Price Weather

**Настроение:** playful but informative. Cost-as-weather-map. Каждая опция — своя climate zone.
**Палитра через природу:** sunrise coral + midday gold + afternoon teal — mapped к cost tiers
**X-instead-of-Y:** the weather IS the triage — each option is its own climate, with its own mood

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a home problem returns a weather-map of your three repair options — each route a climate zone with its own mood, temperature, and time-of-day. Fix-it-yourself is bright morning, hybrid is warm midday, full pro is the cool clear evening. Real prices, real labor rates, real decisions. For the moment you need to see the whole weather of the fix in one glance.

Mood & visual identity: imagine a glass-tiled weather display at a seaside airport — three adjacent zones showing three different climates on the same afternoon, each with its own atmosphere, its own light, its own slow-moving clouds. This app lives in that weather display — the moment three repair routes each become their own small world you can visit with your eyes. The palette is skies across a single day — sunrise coral softening into morning peach for the DIY zone, noon gold warming into amber for the Hybrid zone, late-afternoon teal cooling into sea-blue for the Pro zone. Each zone has its own weather. Color IS the climate. Light level IS the cost.

Three zones sit side-by-side like three weather panels in a broadcast — equal width, full screen height, the divisions between them soft gradient fades not hard lines. Each zone breathes its own color from its centre outward. The recommended zone has a brighter weathervane icon and a slightly warmer glow at its centre, like the sun found it first.

Functional aesthetic — each zone's saturation maps to cost (pale sunrise for cheapest DIY, more saturated amber for middle Hybrid, deepest teal for the Pro). Small animated clouds (static, but suggest slow movement) drift across each zone giving it life — wispy clouds over DIY (easy conditions), scattered clouds over Hybrid, dense but calm clouds over Pro. Time-of-day in each zone tells you the hours of labor — dawn for 30 min, midday for 45 min, late afternoon for two hours.

The anchor: a single bright-coral "I'll Try DIY" weathervane pill centred beneath the DIY zone — warm, inviting, definite. "Start here. The weather is easiest over here." The Hybrid and Pro zones have outlined pills, not filled.

Typography is editorial atmospheric. Large serif italic for the big weather headlines ("Light", "Fair", "Involved" — one word per zone naming the climate), clean sans for body and labor times, massive sans-serif for the dollar amounts because numbers are what Emma reads first. Numbers are the heroes — "$15", "$45", "$180" — each price sits in the brightest part of its zone's sky, rendered in heavy sans, a little sun in each weather panel.

One screen. The weather display at the seaside airport.

[top of screen] A small cloud-with-house glyph logo beside the app name "FixIt" in small clean sans on the left. Beside it, a soft pill "TODAY'S FORECAST" in tiny UPPERCASE TRACKED. On the right, a small circular user avatar.

[hero header] Below the top row, in medium sans: "The Weather of Your Fix". Below in soft body: "Leaky kitchen faucet cartridge. Three routes ahead."

A small rounded-square thumbnail of the user's photo beside the hero header, rendered like a postcard with a thin paler border.

[three weather zones, side-by-side, each full screen height below the header] Soft gradient fades between them, no hard dividers.

[DIY zone — sunrise coral warming into peach at centre] Top label: "DIY" in UPPERCASE TRACKED whisper. Below the label: a large italic serif word — "Light" (the weather headline). Below that, the centrepiece: "$15" as massive sans, sitting in the brightest part of the sky, glowing. Below the number: a small sun-at-dawn glyph. Below the glyph: "30 minutes · beginner · $7 kit from Home Depot" in soft body. Scattered wispy clouds drifting across the zone's upper third. At the bottom of the zone, a saturated coral pill button: "I'll Try DIY" in medium sans. A tiny green whisper below the button: "save $165".

[Hybrid zone — noon gold warming into amber at centre, more saturated than DIY] Top label: "HYBRID". Below: "Fair" in italic serif — the climate. Centrepiece: "$45" massive sans. Small midday-sun glyph. Body: "45-min visit · you buy the part · plumber installs." Scattered puffy clouds drifting mid-zone. Bottom: an amber outlined pill "See Hybrid Plan" — outlined not filled.

[Pro zone — late-afternoon teal cooling into sea-blue at centre, deepest saturation of the three] Top label: "FULL PRO". Below: "Involved" in italic serif. Centrepiece: "$180" massive sans. Small late-afternoon-sun glyph. Body: "2-hour visit · licensed plumber · 1-year warranty." Dense calm clouds across the zone's upper half. Bottom: a teal outlined pill "Find a Pro."

[bottom rail, spanning all three zones] A thin horizontal band at the very base with a subtle gradient mirroring all three zone colors. In the band, a tiny horizontal compass-like scale showing "DIFFICULTY" with a small marker indicating where on the scale the current problem sits (this is a "Light" problem so the marker is near the DIY end).

[nav] At the very bottom edge, a minimal pill-shaped navigation bar with four small rounded icons (home, camera, history, profile). Whisper-thin, never the focus.

Primary Design Surface: App.
```

---

## Что должно выйти (ожидание)

- Три side-by-side zones, каждая своя weather climate
- Gradient transitions между zones (не hard divider lines)
- Scattered clouds дрейфуют across каждой zone
- Large italic serif "Light" / "Fair" / "Involved" — weather headlines
- Massive $ amounts в brightest части каждой zone's sky
- Coral filled pill on DIY (anchor), outlined pills on Hybrid/Pro
- Bottom difficulty compass band spanning all zones

## Против чего тестировать

- Не должно выйти "weather.com UI" — должна остаться editorial magazine quality
- Не должно выйти "playful kids app" — weather метафора serious & beautiful
- Должно выйти "magazine weather feature meets repair app"
- Риск: самый experimental, может не работать на маленьких экранах (зоны становятся cramped); если крутой — самый memorable
