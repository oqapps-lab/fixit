# FixIt — Soft Paywall screen (5.1, after 3rd estimate)

**Дата:** 2026-04-19
**Стиль:** The Exhale — warm celebratory gradient, editorial "you've used your three" moment, two pricing zones (annual pre-selected) + pay-per fallback, ghosted savings number as proof
**Образец:** `sugar-quit/docs/06-design/style-exploration/v10-editorial-narrative.md`

---

## Промпт

```
FixIt — AI home repair cost advisor. Three free estimates, then a gentle pause — because the app has saved Emma real money and it's time to choose: unlimited fixes for $4.16/month, or pay-per-estimate for $2.99 when she needs one. For the moment you've used your three free photos and the app asks gently, "Was that helpful?"

Mood & visual identity: imagine the warm editorial magazine ending — the final spread where the story says "if this resonated, here's how we keep going." Not a salesperson's pitch. Not a locked gate. A soft pause over coffee. The palette breathes — pale cream at the top for acknowledgment, warming through saturated peach and dusty coral in the middle for the gentle ask, cooling into pale mint and lavender at the bottom for the quiet offer. The gradient tells a story: you arrived, we helped, here's how to keep helping.

Behind everything, 4 large soft-blurred gradient orbs float at different depths — a big peach orb top-right, a lavender orb mid-left, a sage-mint orb bottom-right, a pale coral ember bottom-center — giving the cream background color depth.

Every surface is frosted glass — backdrop blur around 40px, 85% white-cream translucency, hair-thin white-translucent border, soft warm-tinted drop shadow. Through the glass panes, the orbs show as softened color patches — the annual card glows saturated coral (the recommended warmth), the monthly card glows pale peach (softer choice), the pay-per link glows cool mint (the gentle fallback).

The anchor: a single glossy coral-to-amber pill at the center-lower zone — deep-saturated gradient fill, highlight streak on top like polished glass, warm shadow halo beneath. The only hard-edged, only saturated element. "Keep going. I'm the easy yes." Everything else is soft glass and floating color.

Typography is modern editorial magazine. Thin geometric sans for body and tier details, large italic serif for the hero headline, UPPERCASE TRACKED whisper-labels for sections, massive gradient-filled sans-serif for the savings number and the pricing numbers. Numbers are the heroes — "$485", "$4.16", "$9.99", "$2.99" — gradient-filled in their zone's hue.

One screen. The Soft Paywall — Emma just finished her third estimate.

[top header — quiet on the pale cream upper band] A small frosted circle close-button "X" in whisper-gray in the top-right corner. A tiny UPPERCASE TRACKED whisper centered in muted slate: "THREE FIXES LATER".

[hero block in the warmer middle band] Behind the hero, filling the negative space, a massive translucent sans-serif number "$485" — the total Emma has saved across her three estimates — gradient-text-filled peach-to-coral, semi-transparent, rendered larger than any solid element on the screen, sitting like a watermark. In tiny UPPERCASE TRACKED whisper coral near the ghosted number: "YOU'VE SAVED".

Over-laid on the ghosted number, a large editorial hero in italic serif, two lines: "You've found" / "real money." Below the hero in soft body thin sans: "Three estimates, three honest answers. $485 saved versus calling a pro blind. Ready for the next one?"

Below the hero, a tiny illustrated scene inside a soft frosted-glass rounded rectangle — a small painted scene of three tiny receipts pinned to a corkboard, each with a gold-star sticker beside it, rendered in blush, sage, and amber. Each receipt has a whisper-UPPERCASE-TRACKED label visible: "FAUCET · $165" · "TILE · $120" · "DISHWASHER · $200". This is social proof of her own savings.

[two pricing cards side-by-side in the warm-coral middle-lower band, generous spacing between them, each a frosted glass pane with its own gradient color-picked glow]

Card 1 — ANNUAL (pre-selected, warmer coral glow, slight visual prominence with a tiny saturated coral "BEST VALUE" ribbon at the top-left corner) — Inside: "FIXIT UNLIMITED · YEARLY" in tiny UPPERCASE TRACKED whisper at the top. Below, massive gradient-filled "$49.99" in coral-to-amber, centered, with "PER YEAR" in UPPERCASE TRACKED whisper beneath in muted coral. Below that, a smaller line showing the equivalent: "that's $4.16/month" in clean thin sans. Below that, a small body-sans list of three things the plan includes:
- "Unlimited estimates · Pro Match · Save forever"
- "Warranty tracker · PDF export · Price alerts"
- "Cancel anytime · 30-day guarantee"
Each list item has a tiny sage check-mark glyph. Behind the "$49.99" in ghosted massive translucent sans: "365 days" as decorative watermark filling the card's negative space.

Card 2 — MONTHLY (pale peach glow, less prominent) — Inside: "FIXIT UNLIMITED · MONTHLY" in tiny UPPERCASE TRACKED whisper. Below: "$9.99" gradient-filled peach-to-amber, with "PER MONTH" in UPPERCASE TRACKED whisper. Below: a short line "Flexible. Cancel anytime." in body sans. No feature list — just the essentials. Behind "$9.99" in ghosted translucent: "month-to-month" as watermark.

[anchor pill in the warm-coral center-lower zone, with generous breathing room above and below] The single glossy coral-to-amber CTA pill: "START ANNUAL — $49.99" in clean medium sans, letter-spaced. Highlight streak, warm shadow halo, faint pulse. Saturated gradient fill. The only hard-edged element.

Below the pill, a whisper-weight link in muted coral: "Or start monthly for $9.99 →"

[pay-per fallback, in the cooler mint-lavender lower band, quieter than the main pricing cards] A small frosted glass pill containing two quiet lines. Left side, a tiny illustrated coin glyph in sage. Right of it, UPPERCASE TRACKED whisper: "NOT READY FOR UNLIMITED?" Below in clean thin sans: "Pay just $2.99 for your next estimate." Tiny outlined sage pill at the right of the row: "Pay Once" — outlined, not filled, so it stays third-place under the coral anchor.

[below the fallback, in the softest lower band] A whisper-weight cream link centered: "Not now, take me home →" — the polite exit for Emma who wants to think about it.

[bottom tab bar — minimal frosted glass strip across the very base] Four small soft-rounded icons (HOME · CAMERA · HISTORY · PROFILE) — quiet, the strip doesn't draw attention away from the pricing. Today the CAMERA tab is softly grayed because the paywall gates new photos. A tiny sage coral dot below HOME.

Motion-directive: the orbs should feel like they WANT to drift slowly; the ghosted "$485" should feel like it WANTS to glow gently as proof; the annual card's "BEST VALUE" ribbon should feel like it WANTS to gently bob; the coral pill should feel like it WANTS to pulse slowly and warmly; the receipts illustration should feel like it WANTS to rustle like notes pinned on a corkboard. Static image, but every element suggests "we're not rushing you, take your time, but we're here."

Primary Design Surface: App.
```

---

## Что Stitch должен вытащить

- Full-screen vertical gradient: cream → peach → coral → mint → lavender
- 4 gradient orbs drifting behind
- Ghosted massive "$485" watermark in upper hero zone
- Italic serif hero "You've found / real money."
- Painted receipts-on-corkboard illustration (3 tiny receipts with gold stars, savings amounts)
- **Two pricing glass cards side-by-side** — annual (saturated coral, "BEST VALUE" ribbon) + monthly (pale peach)
- Ghosted "365 days" and "month-to-month" watermarks inside cards
- Tiny sage check-mark glyphs per feature
- Single glossy coral CTA pill "START ANNUAL — $49.99"
- Pay-per $2.99 fallback as quiet frosted pill below
- Polite exit link at bottom
- Minimal frosted tab bar
