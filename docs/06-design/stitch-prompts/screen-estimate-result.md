# FixIt — First Estimate Result screen (1.7, aha moment)

**Дата:** 2026-04-19
**Стиль:** The Exhale — light modern editorial, screen-wide vertical gradient, 3 frosted glass option cards picking up gradient color, single coral CTA, ghosted massive savings number
**Образец:** `sugar-quit/docs/06-design/style-exploration/v10-editorial-narrative.md`

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a broken thing returns three honest routes — DIY, split, or pro — with real prices and real labor for your zip. For the moment you need to know what broken costs, fast and without friction. Think Oura meets Headspace meets a thoughtful magazine spread — light, airy, modern.

Mood & visual identity: imagine the pale pride of a calm Sunday morning kitchen — sunlight through linen curtains, cool air, everything soft and clear. The relief of knowing the price before the stress. This app lives in that Sunday light. The palette breathes — pale cream warming into soft peach, fading into pale mint and cool lavender, with one saturated coral note that only the anchor carries. Color temperature creates zones and hierarchy instead of borders. Warmer hue means more effort, cooler hue means easier fix.

Behind everything, 4 large soft-blurred gradient orbs float at different depths — a big peach orb top-right, a smaller lavender orb mid-left, a sage orb bottom-right, a pale coral ember bottom-center. They are soft radial gradient spheres dissolving at the edges like distant planets, giving the cream background color depth you can almost reach into.

Every surface is frosted glass — backdrop blur around 40px, 85% white-cream translucency, a hair-thin white-translucent border, and a soft warm-tinted drop shadow (12px blur, 4px offset, 8% opacity) lifting each pane gently off the gradient. Through each glass pane, the orbs show as softened color patches — the DIY pane glows faintly mint-sage, the Hybrid pane warms peach, the Pro pane deepens to soft coral.

The anchor: a single glossy coral pill CTA floating in the lower third — deep-saturated coral-to-amber gradient fill, a highlight streak on top like polished glass, a warm shadow halo beneath. The only non-frosted, only hard-edged, only glossy element. "Start here. I'm the quickest path out of this." Everything else is soft glass and floating color.

Typography is modern editorial. Thin geometric sans for body and labels, bold sans for numbers, one single moment of serif italic for the hero verdict. UPPERCASE TRACKED whisper-light micro-labels only — no prose on the screen. Numbers are the heroes — "$15", "$45", "$180", "$165 saved" — set large and gradient-filled, each sitting at the surface of its glass pane in a hue matching its zone.

One screen. First Estimate Result — the aha moment after Emma's first photo.

[top] A small thumbnail of Emma's photo rendered inside a soft frosted-glass circle with a gentle sage glow halo, top-left. Beside it a tiny UPPERCASE TRACKED whisper: "WHAT WE FOUND". Below, the hero verdict in soft serif italic, two lines: "A leaky cartridge. / An easy fix." Beside the verdict, a small flat-illustrated glyph of a dripping faucet in blush and sage.

[behind the hero verdict, filling the negative space of the upper third of the screen] A massive translucent sans-serif number "$165" — the savings going DIY — gradient-text-filled coral-to-peach, rendered larger than any solid element on the screen, semi-transparent, sitting like a watermark. Over-laid on this ghosted number, the verdict headline described above. Near the ghosted number in small UPPERCASE TRACKED whisper coral: "YOU'D SAVE".

[three glass cards, one row, generous spacing between them, each with its own gradient-color tint through the glass]

Card 1 — DIY — pale mint-sage glass glow. Inside: massive gradient-filled number "$15" sage-to-mint, UPPERCASE TRACKED "DIY" whisper above, "30 MIN · BEGINNER" whisper below. A tiny flat-illustrated wrench-and-O-ring glyph in sage-and-cream inside the card's upper-right corner. Behind the "$15" in semi-translucent massive sans: "30m" ghosted, filling the card's negative space.

Card 2 — HYBRID — warm peach glass glow. Inside: "$45" gradient-filled peach-to-amber, "HYBRID" whisper above, "45 MIN · YOU BUY, PRO FITS" below. Tiny handshake glyph in peach-and-cream in upper-right. Behind the "$45" ghosted massive "45m" sans.

Card 3 — FULL PRO — soft coral glass glow. Inside: "$180" gradient-filled coral-to-warm-amber, "FULL PRO" whisper above, "2 HOURS · LICENSED · WARRANTY" below. Tiny toolbox glyph in coral-and-cream in upper-right. Behind the "$180" ghosted massive "2h" sans.

Under the three cards, a floating frosted pill showing savings — very small, a single line: "$165 saved going DIY" in whisper-weight text with a tiny sage leaf glyph.

[anchor] Below all that, with generous breathing room above and below, the single glossy coral CTA pill: "OPEN DIY GUIDE" in clean medium sans with letter-spacing. Highlight streak, warm shadow halo, pulsing faintly.

Below the pill, whisper cream link: "Save for later →".

[bottom tab bar — minimal frosted glass strip across the very base] Four small soft-rounded icons with generous spacing: HOME (active, faint coral dot below) · CAMERA · HISTORY · PROFILE. The strip itself is thin frosted glass, hair-thin top divider line.

Everything breathes. Generous white-cream negative space between the hero, the three glass cards, the savings pill, and the CTA — the screen should feel airy, modern, unhurried.

Primary Design Surface: App.
```

---

## Что Stitch должен вытащить

- Pale cream + peach + mint + lavender gradient
- 4 gradient orbs behind everything
- Ghosted massive "$165" translucent number in upper third (watermark-style)
- Hero italic serif verdict "A leaky cartridge. / An easy fix."
- Photo thumbnail in frosted circle with sage glow
- 3 glass cards with own color tints: DIY mint-sage / Hybrid peach / Pro coral
- Each card: price hero number + ghosted time number ("30m", "45m", "2h") behind
- Tiny flat-illustrated glyphs (wrench, handshake, toolbox) per card
- Single frosted savings pill "$165 saved going DIY"
- Glossy coral CTA pill — anchor
- Frosted tab bar at base
