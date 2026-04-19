# FixIt — Welcome screen (1.1)

**Дата:** 2026-04-19
**Стиль:** The Exhale — light modern editorial, screen-wide vertical gradient, frosted glass, hero typography, single coral anchor
**Образец:** `sugar-quit/docs/06-design/style-exploration/v10-editorial-narrative.md`

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a broken thing — pipe, hinge, tile, outlet — returns a fair price to fix it yourself, split the work, or hire a pro. Real material prices, real labor rates, no surprises. For the moment you open the cupboard and see water where water should not be — that small panic before you know what it costs.

Mood & visual identity: imagine a thoughtful wellness weather report for your house — each fix read as a forecast of difficulty and cost, the air warming through the scale from easy-and-cheap to involved-and-serious. The quiet relief after a pro tells you "this is a small fix, you can do it." This app lives in that relief.

The palette breathes — large, slow, atmospheric gradients that shift like sky colors through golden hour. The entire screen is ONE long vertical gradient that narrates the welcome: pale seafoam at the very top for dawn clarity, warming through soft peach and dusty coral in the middle for the warm invitation, cooling into pale mint and lavender at the bottom for quiet evening confidence. The gradient is not a background — it IS the atmosphere, creating zones through color temperature instead of borders. Cooler at top, warmer in middle, cooler again at bottom — like a single long exhale.

Behind everything, 4 large soft-blurred gradient orbs float at different depths — a big peach orb top-right, a lavender orb mid-left, a sage orb bottom-right, a pale coral ember bottom-center. They are soft-blurred radial gradient spheres dissolving at the edges like distant planets, giving the gradient background color depth you can almost reach into.

Every surface that holds content is frosted glass — backdrop blur around 40px, 85% white-cream translucency, a hair-thin white-translucent border, and a soft warm-tinted drop shadow (12px blur, 4px offset, 8% opacity) lifting each pane gently off the gradient. Through each frosted pane, the orbs show as softened color patches.

The anchor: a single glossy coral pill CTA floating in the lower-middle third — deep-saturated coral-to-amber gradient fill, a highlight streak on top like polished glass, a warm shadow halo beneath. The only non-frosted, only hard-edged, only glossy element. "Start here. One photo, one answer." Everything else is soft glass and floating color.

Typography is modern editorial magazine. Large italic serif for the hero headline, clean thin geometric sans for body and labels, UPPERCASE TRACKED whisper-light micro-labels for sections, massive sans-serif gradient-filled numbers only where dollar teasers appear at the bottom. No prose on screen — only hero headline + one body sentence + labels + numbers.

One screen. Welcome — Emma's first breath with the app.

[top header] A small home-plus-magnifier glyph logo beside the app name "FixIt" in small clean sans, left-aligned on the pale seafoam band. A tiny UPPERCASE TRACKED whisper beneath: "HOME REPAIR FORECAST".

[hero block in the warmer peach-coral middle band] Large editorial hero typography — "Know the price" in medium geometric sans italic-mixed-with-roman on one line, then "before it breaks you" in massive italic serif on the next line (the hero phrase — the largest text on the screen). Below the hero in soft body thin sans: "Snap a photo of what's broken. In 60 seconds you'll know if it's a $15 fix or a $500 one."

To the right of the hero block, a small flat-illustrated scene inside a soft frosted-glass circle with a sage glow halo — a tiny painted kitchen faucet with a single water drop falling from it, rendered in blush and sage and soft amber on a cream ground. The illustration feels hand-painted, not iconified.

[three illustrated scene vignettes below the hero, evenly spaced in a horizontal row, each inside its own small frosted-glass circular halo glowing its own gradient-picked color]
- Left vignette (pale mint halo): tiny painted scene of a door hinge with a small sparkle indicating attention, UPPERCASE TRACKED "HARDWARE" label beneath.
- Middle vignette (peach halo): tiny painted scene of a cracked ceramic tile with a soft crack line, UPPERCASE TRACKED "SURFACES" label beneath.
- Right vignette (soft coral halo): tiny painted scene of a dishwasher with a small wrench floating beside it, UPPERCASE TRACKED "APPLIANCES" label beneath.

Each vignette tells Emma "we cover this kind of problem too" without words.

[anchor pill — floating in the warm coral-amber middle-lower band with generous breathing room above and below it] A large saturated coral-to-amber gradient pill button, crisp-edged, highlight streak on top, warm shadow halo beneath, letter-spaced medium sans text: "TAKE A PHOTO OF YOUR PROBLEM". The only hard-edged element on the screen.

[below the pill, in the mint-lavender cooler band] A whisper-weight link in muted slate: "See a sample estimate instead →" with a small gentle arrow glyph.

[bottom band — just above the screen's base, in the coolest mint-lavender gradient zone] A thin horizontal band of three tiny illustrated scene-thumbnails, each inside a soft frosted rounded rectangle with whisper-small numeric teasers — each thumbnail is a tiny painted scene from a past estimate:
- "SAMPLE — LEAKY FAUCET · $15" in tiny UPPERCASE TRACKED beneath a small faucet illustration
- "SAMPLE — CRACKED TILE · $45" beneath a tiny tile scene
- "SAMPLE — DEAD DISHWASHER · $180" beneath a tiny appliance scene

These are previews. They whisper "here's what the answer looks like."

[very bottom edge] Three cream-peach progress dots acting as onboarding indicator — the first dot softly filled coral (you are here), the next two hollow cream outlines.

No tab bar yet — this is before the app opens. The coral pill is the only navigation.

Motion-directive: the orbs should feel like they WANT to drift slowly in the gradient; the water drop from the faucet illustration should feel like it WANTS to fall; the coral pill should feel like it WANTS to pulse warmly; the gradient itself should feel like it WANTS to breathe very slowly. Static image, but full of suggested atmospheric motion.

Primary Design Surface: App.
```

---

## Что Stitch должен вытащить

- Full-screen vertical gradient: seafoam → peach → coral → mint → lavender
- 4 soft-blurred gradient orbs drifting behind everything
- Hero: "Know the price / before it breaks you" — large italic serif with body prompt beneath
- Painted faucet-with-water-drop scene in frosted circle right of hero
- 3 painted category vignettes in frosted circles (HARDWARE · SURFACES · APPLIANCES)
- Glossy coral CTA pill — the only hard-edged element
- 3 bottom thumbnail previews с price teasers ($15 / $45 / $180)
- Space, space, space — airy modern feel
