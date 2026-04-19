# FixIt — Home Tab screen (3.1, returning user)

**Дата:** 2026-04-19
**Стиль:** The Exhale — screen-wide vertical gradient narrating the homeowner's day, frosted glass widgets with gradient color-picking, ghosted hero numbers, 5 widgets each with a different visual form
**Образец:** `sugar-quit/docs/06-design/style-exploration/v10-editorial-narrative.md`

---

## Промпт

```
FixIt — AI home repair cost advisor. Snap a photo of a problem, get three priced routes, save fixes to your home, track what's due. For the moment you open the app on a quiet Tuesday and want to see how your house is doing.

Mood & visual identity: imagine a thoughtful wellness weather report for your house — a quiet Sunday morning kitchen where you sit with coffee and glance through the room, sensing what's well and what wants attention. The pride of a homeowner whose house is mostly held together. The palette breathes — pale cream at the top for dawn clarity, warming through soft peach and dusty coral in the middle where the day's attention lives, cooling into pale mint and lavender at the bottom for the evening exhale. The entire screen is ONE long vertical gradient that narrates the day. Color temperature creates zones and hierarchy instead of borders.

Behind everything, 4 large soft-blurred gradient orbs float at different depths — a big peach orb top-right bleeding through the morning section, a lavender orb mid-left in the peak attention band, a sage-mint orb bottom-right in the evening band, a pale coral ember bottom-center. They are soft radial gradient spheres dissolving at the edges like distant planets.

Every widget container is a frosted glass pane — backdrop blur around 40px, 85% white-cream translucency, hair-thin white-translucent border, soft warm-tinted drop shadow lifting it off the gradient. Through each glass pane, the orbs show as softened color patches — the widget picks up the hue of the gradient below it.

The anchor: a single glossy coral-to-amber "+" orb floating above the tab bar — a solid saturated pill with highlight streak and warm shadow halo. "New photo. Start a fix. I am HERE, tap me." The only non-frosted, only hard-edged, only glossy element on the screen.

Typography is modern editorial. Thin geometric sans for body and labels, bold sans for numbers, one single italic serif moment for the hero greeting. UPPERCASE TRACKED whisper-light micro-labels only — no prose on the screen. Numbers are the heroes — "$2,340", "87", "14", "4" — gradient-filled in each widget's matching hue.

5 widgets. 5 distinct visual forms, no two widgets share the same shape.

Home screen:

[top header — minimal on the pale seafoam upper band] A small home-plus-magnifier glyph logo beside the app name "FixIt" in small clean sans on the left. A tiny UPPERCASE TRACKED whisper beneath in muted slate: "TUESDAY · APRIL 19". On the right, a small circular user avatar with sage glow halo.

[hero — typographic hero, no container, sits in the upper section of the gradient] Behind the upper gradient band, a ghosted massive translucent sans-serif number "$2,340" fills the negative space of the upper third — semi-transparent, gradient-text-filled peach-to-coral. Over-laid on this ghosted number, a large editorial hero: "Saved" in medium serif italic, then "this year" in the same serif thinner on the next line. Below in soft body sans, one line: "Seven DIY fixes. Three smart splits. Your house is doing well." Beside the hero, a tiny flat-illustrated glyph of a piggy-house (a piggy-bank shaped like a tiny cottage) in blush and sage.

[Widget 1 — Home Health Ring, radial ring chart in a frosted glass container, sits in the upper-mid peach-coral band] A frosted glass square widget with a thick gradient-filled torus ring inside. The ring is segmented into 6 parts, each tagged with an UPPERCASE TRACKED micro-label around its outer edge: PLUMBING · ELECTRICAL · WALLS · FLOORS · APPLIANCES · ROOF. Each segment's saturation shows its current health: plumbing is cool-sage (calm), appliances warming amber (watch this), walls deep coral (needs attention). In the center of the ring, a massive number "87" in bold gradient-text-fill coral-to-amber, with "HOME HEALTH" in tiny UPPERCASE TRACKED whisper beneath, and a thin serif italic word above: "Fair." A soft outer glow halo wraps the entire ring. Tiny flat-color illustrated glyphs inside relevant ring quadrants — a water-drop in plumbing (sage), a spark in electrical (pale amber), a brick in walls (coral), a gear in appliances (amber).

[Widget 2 — Recent Estimates Flow, curved flowing chart in a frosted glass container, sits in the coral-amber peak band] A wide frosted glass pane whose gradient backdrop glows saturated coral. Inside, a smooth flowing curve like a cardiogram wave traces repair activity across the last 12 months — 12 data points connected by a gradient-filled line warming into coral at recent months. The area under the curve is softly filled with peach-to-coral gradient fade. Two data points along the curve are larger — small gradient orbs with glow halos marking the two biggest repairs. Ghosted behind the curve in translucent massive sans: "12 fixes" as decorative hero-text filling the card's negative space. Top-left of the card: "REPAIR RHYTHM" in tiny UPPERCASE TRACKED whisper. Top-right: "$2,340 total" in clean medium sans. Tiny illustrated wrench glyph at April peak, tiny paintbrush at November peak — flat-color blush and amber.

[Widget 3 — Seasonal Tip Card, rounded-rect glass with integrated illustration, sits in the warm-lavender mid band] A frosted glass rounded-rectangular card whose gradient backdrop glows soft lavender. On the left side of the card, a small flat-illustrated spring scene — a tiny painted cottage with cherry blossoms drifting around it, a soft sage leaf, a pale pollen particle — rendered in pale blush, sage, and lavender. On the right, a UPPERCASE TRACKED whisper label: "THIS WEEK · SPRING". Below in serif italic: "The Tune-Up." Below in soft body sans: "Gutter check, AC pre-season, caulk walk-around. Three small fixes keep summer cheap." At the bottom-right corner of the card, a small outlined sage pill: "See Spring Plan" — outlined not filled, so it stays second to the coral anchor.

[Widget 4 — Category Spend Donut, chunky donut with gradient segments, sits in the mint-lavender lower band] A frosted glass square widget holding a chunky donut chart — thick saturated segments each with its own gradient fill: plumbing deep-coral-to-amber, electrical gold-to-wheat, walls sage-to-mint, appliances blush-to-peach, roof lavender-to-plum. Each segment is fat and clearly its own hue. In the center of the donut, a number "$2,340" in bold gradient-text-fill, "SPENT THIS YEAR" in tiny UPPERCASE TRACKED whisper beneath, thin serif italic above: "Modest." On the right side of the widget, a small legend column of 5 color-dots with category labels + percentages in UPPERCASE TRACKED whisper. Tiny illustrated glyphs beside each legend entry — faucet, lightning bolt, brick, fridge, house-top — all flat-color.

[Widget 5 — This Month Timeline, horizontal bar row with gradient segments, sits at the base mint band] A narrow frosted glass horizontal widget with 7 gradient-filled vertical bars of varying heights, one per week over the last 7 weeks. Each bar's height shows fix-activity — this week is tallest with coral-to-amber gradient, past weeks cooler tones fading back through peach to sage. Today's bar has a small gradient orb with glow halo floating at its top. Top-left: "THIS MONTH" in UPPERCASE TRACKED whisper. Top-right: "4 FIXES · $340" in clean small sans. Below the bars, a thin horizontal divider, and beneath it a whisper-italic serif line: "This week was quiet — your house is resting."

[anchor] Floating above the tab bar, center, the glossy coral-amber "+" orb described above — solid, saturated, a highlight streak on top, warm shadow halo beneath. Inside the orb, a thin white "+" icon. This is where Emma taps to start a new estimate.

[bottom tab bar — minimal frosted glass strip across the very base] Four small soft-rounded icons with generous spacing: HOME (active, faint coral dot below) · CAMERA · HISTORY · PROFILE. The coral "+" orb floats above the CAMERA slot. The strip itself is thin frosted glass, hair-thin top divider line.

Motion-directive: the orbs should feel like they WANT to drift slowly at different paces; the ring's outer glow should feel like it WANTS to breathe; the flowing curve should feel like it WANTS to still be drawing itself; the ghosted hero numbers should feel like they WANT to glow gently; the coral "+" orb should feel like it WANTS to pulse warmly like a candle-flame anchoring the screen. Static image, but the whole landscape breathes.

Primary Design Surface: App.
```

---

## Что Stitch должен вытащить

- Full-screen vertical gradient: seafoam → peach → coral → mint → lavender
- 4 gradient orbs drifting behind
- Ghosted "$2,340" massive translucent watermark in upper third
- Hero: "Saved / this year" italic serif + piggy-house glyph
- **5 distinct widget forms:** radial ring / flowing curve chart / rounded-rect card with scene / chunky donut / vertical bars
- Each widget picks up gradient color from zone below
- Tiny illustrated glyphs (water-drop, spark, brick, cottage, wrench, paintbrush, cherry blossoms)
- Gradient-filled hero numbers (87, $2,340)
- Glossy coral "+" orb anchor above tab bar
- Frosted tab bar at base
