# FixIt v3 — Forecast Panel (Welcome screen)

**Настроение:** editorial atmospheric. House under moving sky. Direct heir of The Exhale.
**Палитра через природу:** dawn sky + golden-hour warmth + evening mint cool — house as atmospheric object
**X-instead-of-Y:** the sky IS the emotion — weather conditions narrate the relationship with your home

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a leak, a crack, a broken hinge returns a thoughtful forecast of how to fix it — the quick DIY path, the split-work middle route, the full-service pro option — with real prices for your ZIP and your quality tier. For the moment you find a problem at 7pm on a Tuesday and need to know "how bad is this, really?" Think wellness weather report meets a thoughtful Sunday magazine page about homes — atmospheric, unhurried, knowing.

Mood & visual identity: imagine a thoughtful weather report for your home — each problem read as a forecast of difficulty and cost, the air warming through the scale from easy-and-cheap to involved-and-serious. The quiet relief after a pro tells you "this is a small fix, you can do it." This app lives in that relief.

The palette breathes — large, slow, atmospheric gradients that shift like sky colors through golden hour. The entire screen is ONE long vertical gradient that narrates the welcome: pale seafoam at the very top (clear morning air), warming through soft peach and coral in the middle (golden hour), deepening into saturated terracotta in the lower third (evening warmth returning home). The gradient is not a background — it IS the atmosphere, the sky under which your house sits. Cooler color at top, warmer color at bottom. The gradient reads like a slow deep breath.

Drifting across the upper half of the screen, soft-edged translucent cloud-shapes in pale cream and dusty pink — three or four of them, at different sizes and heights, giving the sky life. Small particles or tiny specks of light float near the horizon, suggesting evening motes in golden light. In the extreme upper-right, a soft impressionistic sun rendered as a diffuse warm glow, about a quarter-way visible at the edge of the canvas.

CRITICAL RULES:
1. If an element can be removed without breaking the atmosphere, remove it — atmosphere is everything.
2. All shapes are soft organic forms, rounded silhouettes, and gradient-edge fades — nothing with a hard vector outline except the one coral CTA pill.
3. One single hard-edged element — a saturated coral pill — sits on the warm golden-hour band in the lower-middle of the screen. It's the one definite thing in the atmosphere. Everything else dissolves into gradient.
4. Typography is editorial-magazine — large italic serif for the hero headline, clean thin sans for body, tiny UPPERCASE TRACKED labels for section ids. Numbers are heroes, but on this welcome screen they stay whisper-small as teases.
5. The overall feeling is slow — like watching the sky change at golden hour while sitting on a porch with a cup of tea.

Large hero illustration occupying roughly the upper half of the screen, sitting on the gradient sky: an atmospheric aerial-three-quarter view of a single small stylized house — painted style, not line-drawn. The house is simple and warm: soft pitched roof, a glowing window or two, a wisp of chimney smoke rising. The house sits on a small suggestion of ground (a curve of soft terracotta earth), and the sky wraps around and above it as the full gradient. Around the house, small soft-edged weather glyphs floating at different distances: a tiny warm coral raindrop over one corner of the roof (suggesting a plumbing zone), a small mint-green leaf-blown mark near the front door (hinge zone), a tiny peach sun-spot near a window (seal zone). Each weather glyph has a soft glow around it — not sharp. Thin wisps of gold light streak diagonally across the scene, as if it's late afternoon and the sun is low. Two or three faint birds in silhouette drift near the top-right of the sky, going somewhere. The house itself has a single warm amber glow in one of its windows — someone is home. At the house's base, a pale soft shadow merges into the terracotta ground.

Below the house, in the warmest part of the gradient (golden-hour coral-to-amber band):

A tiny UPPERCASE TRACKED label in muted slate: "TODAY'S REPAIR FORECAST"

A hero headline in massive italic serif, two lines, soft drop-shadow of warmer coral behind it so it glows:
"Every fix"
"has its weather."

A single line of body text beneath in clean thin sans on the warm gradient: "Snap a photo of your problem. We'll read the forecast — cheap and quick, or involved and serious."

A large saturated coral pill button, crisp-edged and slightly glowing, centered on the warm gradient band: "BEGIN YOUR FORECAST" in clean medium sans, letter-spaced. The pill is the only hard-edged element on the whole screen.

Below the pill, a whisper-weight link in muted slate: "See a sample forecast" with a small gentle rain-drop arrow glyph.

In the lower fifth of the screen (the deeper terracotta band), three tiny scene-vignettes evenly spaced horizontally, each inside a soft circular-frosted-glass-halo that picks up the gradient's color:
- [left vignette — pale peach halo] A tiny painted scene of a leaky faucet, water-drops suggested, UPPERCASE TRACKED label beneath: "PLUMBING"
- [middle vignette — golden-hour amber halo] A tiny painted scene of a cracked tile or hinge, UPPERCASE TRACKED label: "SURFACES"
- [right vignette — deeper terracotta halo] A tiny painted scene of a dead appliance, UPPERCASE TRACKED label: "APPLIANCES"

These three vignettes suggest "the app covers all kinds of weather."

At the very base of the screen, three soft dots as progress indicators — the first filled coral (you are here), the others soft outlined cream.

Motion-directive: the clouds should feel like they WANT to drift slowly; the birds should feel like they WANT to glide; the warm glow in the house's window should feel like it WANTS to flicker gently. The sun at the corner should feel like it WANTS to set another inch. The gradient itself should feel like it WANTS to breathe. Static image, but alive with slow atmospheric motion.

Primary Design Surface: App.
```

---

## Что должно выйти (ожидание)

- Full-screen vertical gradient sky: seafoam → peach → coral → terracotta
- Painted stylized house in three-quarter aerial view on golden-hour sky
- Weather glyphs floating around house (raindrop, leaf, sun-spot)
- Chimney smoke + warm window glow + tiny birds silhouettes
- Soft clouds drifting + particles in golden light
- Coral CTA pill — единственный hard-edged element
- Italic serif hero headline with soft glow
- Three painted vignettes with frosted-halo backgrounds
- Weather-atmosphere everywhere, not dashboard

## Против чего тестировать

- Не должно выйти "stock iStock sunset house" — painted illustration, editorial quality
- Не должно выйти "Calm sleep app" — должны быть warm colors prominently, не cool pastels
- Должно выйти прямой cousin of "The Exhale" но про дом
- Наименее рискованный — твой проверенный формат в новом контексте
