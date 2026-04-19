# FixIt v4 — Field Notes (Welcome screen)

**Настроение:** workshop journal + cutaway drawing. House as notebook sketch. Makers' aesthetic.
**Палитра через природу:** engineer's graph paper + pencil graphite + rust-orange correction + tea-stain
**X-instead-of-Y:** the page IS the welcome — a notebook where someone has been thinking about your house for you

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a problem at home returns a field-notebook-style diagnosis: what broke, why, and three routes priced in real dollars from real retailers. For the tinkerer moment when you want to understand the fix, not just pay for it. Think Moleskine research notebook meets an architect's cutaway drawing meets a craftsman's marginalia — curious, thorough, alive with annotation.

Mood & visual identity: imagine a working engineer's field notebook at the kitchen table — blue-gridded graph paper with the lines faintly visible, a sharp pencil beside it, a small rust-orange correction mark in the margin, a tea-stained ring from this morning. This app lives in that notebook. The palette is paper and pencil — pale blueprint-blue grid on a cream-paper ground, iron pencil-graphite for lines and text, a single rust-orange for the one thing someone circled as important, a warm tea-stain sepia for older-looking decorative flourishes. Grid IS the order. Marginalia IS the warmth.

The entire screen has a working graph-paper background — pale cream-bone base with a visible blue-grid of thin horizontal and vertical lines every few units, faded but definitely present. Scattered across the background, naturalistic imperfections: a faint brown tea-stain ring in the upper-left, a tiny smudge of pencil-graphite in the lower-right, a barely-visible crease along one edge of the paper, a small doodle-curl in the corner that someone drew absent-mindedly. Along the left edge of the screen, a row of three hole-punch marks as if this page was torn from a three-ring binder.

CRITICAL RULES:
1. If an element could be drawn by hand with a pencil in a notebook, draw it that way. If it couldn't, find another way.
2. All shapes are hand-drawn forms — slightly wobbly rectangles, pencil-texture lines, uneven circles, no machine-perfect edges except the one typeset CTA pill which sits deliberately against the handmade context.
3. One single accent color — a rust-orange that feels like fountain-pen ink someone used to correct a graphite draft — appears ONLY on the circled problem areas, one hand-drawn underline beneath the key phrase, and the pill button. Everything else is graphite, cream, blueprint-blue grid, occasional tea-stain sepia.
4. Typography is mixed notebook-style — a handwriting-mimic font for margin annotations and small labels, a medium geometric sans for the typeset headers and the CTA, a medium serif for the hero headline that feels like a chapter-title someone printed and pasted in. Everything lives on the grid lines.
5. The overall feeling is curious and alive — like finding someone's well-used notebook that's been thinking about exactly your problem for months.

Large hero illustration occupying the upper two-thirds of the screen: a beautiful hand-drawn cross-section cutaway of a two-story house, rendered in pencil-texture graphite on the graph paper, proportions friendly and slightly stylized. The drawing feels real — you can see where the pencil pressed harder, where lines overlap messily, where an architect's eraser rubbed out and redrew a detail. The house shows both stories in cutaway: interior walls visible, pipes running up the left side as graphite squiggles, a section of floor showing joists, a kitchen sink on the first floor, a bathroom on the second, a small attic peak at top, a door on the right, a window or two. Around and inside this drawing, multiple rust-orange ink-circles drawn freehand encircle problem-areas — one around the sink with a messy arrow leading to a handwritten note in margin: "leak — worn cartridge?", another circle around a door hinge with note "squeak, rust?", a third circle around a roof edge with note "possible gap — seal?". The handwritten notes are in a loose cursive-mimic style, slightly slanted, with small scribbles and corrections. A few pencil-drawn measurement lines extend out from the house with tiny numerical annotations in graphite ("~12ft", "~8ft"). In the lower-left corner of the drawing, a tiny compass rose drawn freehand in graphite with a rust-orange N-arrow. In the lower-right corner of the drawing, a paper-clipped Polaroid-style photo tilted slightly askew showing a generic small home interior — the Polaroid has a pencil-written caption beneath: "the subject". Around the margins of the house drawing, small decorative marginalia: a doodle of a wrench with exclamation marks, a tiny cup-of-coffee glyph drawn freehand, a thought-bubble with "$?" inside it in rust-orange.

Below the hero drawing:

A thin graphite horizontal rule drawn freehand (slightly uneven) across the page.

A UPPERCASE TRACKED label in graphite, slightly hand-stamped-feeling: "FIELD NOTEBOOK · ENTRY #0001"

A hero headline in medium serif, two lines (like a typeset chapter title pasted into the notebook), with a hand-drawn rust-orange underline beneath the second line (the underline has small imperfect wobble, clearly drawn not rendered):
"Snap a photo."
"Understand the fix."

In the margin to the right of the hero headline, a small handwritten annotation in cursive: "← this is the whole idea"

A single line of body text in handwriting-mimic script: "Real prices from real stores. Three routes — quick, split, or full-service. No markups, no guessing."

Below the body, a typeset rust-orange pill button — the only clean mechanical element on the page, deliberately contrasting with the hand-drawn surroundings — centered: "OPEN YOUR FIRST ENTRY" in clean medium sans, letter-spaced. Around the button, small pencil-drawn arrows from the margins point at it with handwritten notes: "start here!" and "tap ↓".

Below the button, a handwritten-style link in graphite: "or try a sample entry →" with a small hand-drawn arrow.

Near the bottom of the screen, a row of four paper-clipped Polaroid-sketches, each tilted at slightly different angles as if taped onto the page, each showing a hand-drawn pencil-sketch of a different problem type — a leaky faucet, a cracked tile, a door hinge, a broken appliance. Each Polaroid has a handwritten caption beneath in loose cursive: "plumbing", "surfaces", "hardware", "appliances". Around the Polaroids, small pencil doodles — a question mark here, a curved line there, a tiny star in the margin.

At the very base, three small hand-drawn dots with notebook-style hash marks next to the first one (indicating "you are here, page 1 of 3"). Beside the dots, a handwritten "p. 1 / 3" in cursive script.

Motion-directive: the rust-orange underlines and circles should feel like they WANT to still be drying (wet ink energy); the pencil drawings should feel like the hand that drew them WANTS to add another detail; the Polaroids should feel like they WANT to flutter in a breeze from an open kitchen window. Static image, but loud with someone thinking and drawing.

Primary Design Surface: App.
```

---

## Что должно выйти (ожидание)

- Full-screen cream-paper background with visible pale blue graph-paper grid
- Pencil-graphite cutaway drawing of a two-story house (hand-drawn, imperfect)
- Rust-orange hand-drawn ink-circles around problem areas with handwritten margin notes
- Pencil measurement lines with annotations ("~12ft")
- Paper-clipped Polaroid tilted askew in corner
- Marginalia: coffee cup doodle, wrench sketch, thought-bubble "$?"
- Tea-stain ring in corner + pencil smudges + hole-punch marks on left
- Hand-drawn rust-orange underline beneath hero headline (imperfect wobble)
- Handwritten cursive margin annotations pointing to elements
- Four paper-clipped Polaroid sketches with handwritten captions at bottom
- Overall: feels like someone's real working notebook

## Против чего тестировать

- Не должно выйти "scrapbook wedding crafting" — это working engineer's notebook
- Не должно выйти "hipster journal with calligraphy" — функциональный, не decorative
- Должно выйти "brilliant eccentric house-expert kept a notebook for you"
- Риск: attractive для Mike (DIY enthusiast), может отпугнуть Emma (anxious, wants clean answers fast). Но hero illustration качественно сделанное — хороший балласт.
