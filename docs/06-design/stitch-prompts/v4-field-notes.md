# FixIt v4 — Field Notes

**Настроение:** workshop journal. Blueprint paper + hand measurements. Нерды-ремонтники любят.
**Палитра через природу:** engineer's graph paper + pencil graphite + rust-orange correction mark + fresh ink
**X-instead-of-Y:** the grid IS the structure — visible measurements replace hidden alignment

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a problem at home returns a field-notebook-style diagnosis: what broke, why, and three routes priced in real dollars from real retailers. For the tinkerer moment when you want to understand the fix, not just pay for it.

Mood & visual identity: imagine a working engineer's field notebook at the kitchen table — blue-gridded graph paper with the lines faintly visible, a sharp pencil beside it, a small rust-orange correction mark in the margin of the last page, fresh ink still wet on the diagnosis at the top. This app lives in that notebook — the moment a tinkering friend draws out the fix for you in three routes and writes the numbers right next to each one. The palette is paper and pencil — pale blueprint-blue grid on a cream-paper ground, iron pencil-graphite for lines and text, a single rust-orange for the recommended route like a hand-drawn correction. Grid IS the hierarchy. Marginalia IS the context.

Three routes are drawn on the same page like three sketches of the same repair — each bracketed with a thin graphite frame, each with a small sketched tool icon drawn inline, each with a price written at the top-right corner like a notebook margin. The grid is always visible faintly behind everything. The recommended route has a rust-orange hand-drawn underline beneath its price, like someone circled it with a fountain pen.

Functional aesthetic — effort and cost shown as two small hand-drawn bars in each route's corner: a "TIME" bar graphed out of five tick-marks, a "SKILL" bar same. The bars are literally drawn, not rendered clean. You can see the pencil texture. DIY has 1 time tick and 1 skill tick. Hybrid has 3 time ticks and 2 skill ticks. Pro has 5 time ticks and 5 skill ticks. The numbers tell you the same thing but the sketched bars let a visual reader get it in one glance.

The anchor: the rust-orange underline beneath the recommended price on the DIY card — a single handwritten stroke, slightly uneven, the only saturated color on the page. "This is the one I'd start with. Try me." Everything else is paper and pencil.

Typography is notebook-handwriting paired with typeset headers. A clean geometric sans for headlines (like the printed header of a lab notebook page). A hand-mimicking casual serif or handwritten italic for margin notes and annotations ("likely the $7 kit from aisle 14" drawn in the margin beside the DIY price). Numbers are the heroes — written in large typeset sans for the dollar amounts ($15, $45, $180), underlined by graphite rule lines. Every number sits on the grid, aligned to the visible paper behind it.

One screen. The notebook page.

[top of page] A small hand-drawn house-plus-compass glyph in graphite, beside a typeset masthead "FIXIT · FIELD NOTEBOOK" in small UPPERCASE TRACKED. A date in the far-right margin in handwritten style: "TUE · APR 18 · 7:42 PM".

[diagnosis block] A thin graphite horizontal rule separating the header from the content. Below the rule, a UPPERCASE TRACKED section label "DIAGNOSIS #0047" in graphite. Beside it, a small square Polaroid-style thumbnail of the user's photo with a thin graphite outline, slightly tilted on the page as if paper-clipped. Beneath the photo's level, in a clean medium sans headline: "Leaky Kitchen Faucet Cartridge." Below in handwritten-style annotation: "— worn O-ring, single-handle. common failure. the part costs about $7."

[section break] A thin wavy graphite line drawn freehand across the page like a sketchbook separator.

[UPPERCASE TRACKED label] "THREE ROUTES —"

Three boxed routes stacked vertically (more notebook-like than side-by-side), each inside a thin graphite rectangle frame drawn with slightly-uneven lines like a pencil ruler.

[DIY route box] Top-left corner of the box: a tiny sketched wrench glyph in graphite. Top-right corner: "$15" in medium sans with a rust-orange hand-drawn underline beneath it (the single accent on the page). Below the price: "DIY" in small UPPERCASE TRACKED. Middle of the box: a single line in clean sans — "30 min · beginner · O-ring kit from Home Depot." In the far-right margin of the box, two tiny hand-drawn bars: "TIME ▮▯▯▯▯" and "SKILL ▮▯▯▯▯" sketched out in graphite ticks. Bottom-right of the box: a handwritten margin note "try this first — save $165".

[Hybrid route box] Same structure, no accent color. Top-left: a tiny sketched handshake glyph. Top-right: "$45" in medium sans, underlined with a plain graphite rule. "HYBRID" label. Middle: "45 min visit · you buy the cartridge · pro installs." Margin bars "TIME ▮▮▮▯▯" and "SKILL ▮▮▯▯▯". Margin note: "middle path. good if you want the part sized right."

[Pro route box] Top-left: a tiny sketched toolbox glyph. Top-right: "$180" in medium sans, underlined with plain graphite. "FULL PRO" label. Middle: "2-hour visit · licensed plumber · 1-year warranty." Margin bars "TIME ▮▮▮▮▮" and "SKILL ▮▮▮▮▮". Margin note: "for when it's not actually the O-ring."

[bottom of page] A thin graphite rule. Below the rule, a small UPPERCASE TRACKED label "RECOMMENDED START" aligned-left. Beside it, a graphite-outlined pill button with handwritten-style text: "Open DIY Guide →". The arrow looks hand-drawn.

In the lower margin, a whisper-thin row of four minimal line-icons like sketched notebook tabs: (home, camera, history, profile). They look drawn not designed.

Primary Design Surface: App.
```

---

## Что должно выйти (ожидание)

- Faint blue grid paper background всегда виден
- Graphite pencil lines, uneven hand-drawn rectangles
- Single rust-orange accent на DIY price underline
- Stacked vertical route boxes (не horizontal cards!) — notebook pages идут сверху вниз
- Hand-drawn bars "TIME ▮▯▯▯▯" и "SKILL ▮▯▯▯▯"
- Handwritten-style margin notes mixed с typeset headers
- Polaroid thumbnail paper-clipped askew
- Sketched tool icons (не filled SF Symbols)

## Против чего тестировать

- Не должно выйти "gaming retro aesthetic" — это рабочий notebook, не decorative
- Не должно выйти "scrapbook wedding" — engineer notebook, не crafting
- Должно выйти "makerspace vibe" — ntigeno для DIY enthusiasts
- Риск: может отпугнуть Emma (non-technical persona), но привлечь Mike (DIY enthusiast secondary)
