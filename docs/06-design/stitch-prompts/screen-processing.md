# FixIt — AI Processing screen (1.6, labor illusion 5-8 sec)

**Дата:** 2026-04-19
**Стиль:** The Exhale — atmospheric gradient ceremony around a photo thumbnail, 5 animated-feeling stages, editorial labor-illusion trust-building
**Образец:** `sugar-quit/docs/06-design/style-exploration/v10-breathing-anchor.md`

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a broken thing returns three honest routes in under sixty seconds — but in those sixty seconds a lot has to happen: identify the issue, pull real prices from twelve retailers, calculate labor rates for Emma's zip, compare DIY vs Pro, finalize the estimate. This screen is that waiting. For the moment your phone is thinking, and you're hoping it gets this right.

Mood & visual identity: imagine the quiet pause before a sommelier says the vintage — thoughtful, careful, unhurried. The warm confidence of a professional at work. This app lives in that pause. The palette breathes — pale cream warming into a soft peach glow at the center, fading to cool mint at the edges. The entire screen is a slow, atmospheric gradient ceremony around a single frosted centerpiece. Color temperature creates quiet expectancy instead of impatience.

Behind everything, 4 soft-blurred gradient orbs drift at different depths — a large peach orb behind the centerpiece, a lavender orb top-left, a sage orb bottom-right, a pale coral ember upper-center — giving the cream background color depth you can almost reach into. The orbs feel like they're slowly breathing, matching the AI's thinking rhythm.

The anchor: the user's photo, rendered as a frosted glass circle at the upper third of the screen — a round frosted pane containing a slightly-desaturated version of the photo (the leaky faucet Emma just snapped), with a soft rotating glow halo around it in warm coral suggesting "I am looking at this carefully." The circle has backdrop blur at its edge, a hair-thin white-translucent border, and a pulsing warm shadow. The photo is the only element on the screen that is a real image. Everything else is typography, gradient, and frosted glass.

Typography is editorial sommelier quiet. Clean thin geometric sans for the stage descriptions, UPPERCASE TRACKED whisper-labels for meta-info, one large italic serif for the reassurance line, massive thin sans-serif gradient-filled numbers for the countdown that never quite appears (the progress is in words, not in a percent number). No prose beyond each stage's single descriptive line.

One screen. The Waiting — 6.5 seconds of labor illusion, five stages.

[top header — minimal on the pale cream upper band] A small UPPERCASE TRACKED whisper in muted slate, centered: "ANALYZING". Beneath it, a single italic serif reassurance in soft coral: "Hold on. We're doing the math."

[centerpiece — the frosted circle with Emma's photo, described above, sitting in the upper third of the screen, with the warm glow halo rotating slowly around it]. Inside the glow halo surrounding the frosted photo-circle, five tiny soft-coral dots orbit at equal angles, suggesting scanning motion. Behind the photo circle, a single subtle translucent concentric ring ripples outward once every two seconds suggesting the AI's breath.

[stage-progression column — directly below the photo centerpiece, a vertical stack of five stage rows, each a small frosted pill-shaped pane with its own subtle gradient-color-picked glow, with generous breathing space between them]

- Row 1 (pale mint glow, checked, complete) — A small frosted check-circle in sage on the left, "Identifying the issue" in clean sans, "LEAKY CARTRIDGE" in UPPERCASE TRACKED whisper coral on the right as the resolved answer.
- Row 2 (pale peach glow, currently active, soft pulse) — A small frosted circle with a subtle rotating shimmer on the left, "Checking twelve retailers for current prices" in clean sans, a tiny illustrated shopping-bag glyph in peach on the right. The row itself has a slightly brighter glow to show this is the active stage.
- Row 3 (soft coral glow, upcoming, hollow) — A small frosted hollow circle on the left, "Calculating labor rates for Denver, 80203" in clean sans, a tiny illustrated wrench glyph in soft coral on the right. This row is slightly dimmer.
- Row 4 (soft amber glow, upcoming, hollow) — "Comparing DIY vs. Pro for this fix" in clean sans, a tiny illustrated balance-scale glyph in amber.
- Row 5 (soft lavender glow, upcoming, hollow) — "Finalizing your estimate" in clean sans, a tiny illustrated checkmark-scroll glyph in lavender.

The stage rows feel like a gentle five-step breath. Each row is a small frosted pane with a subtle gradient glow picking up the color of the orbs behind it. The completed ones are warm, the active one is brighter, the upcoming ones are quiet.

[below the stage stack, generous breathing room] A tiny UPPERCASE TRACKED whisper in muted slate, centered: "USUALLY TAKES ABOUT 6 SECONDS".

[below that, in a barely-visible mint-lavender band near the bottom] A small frosted pill containing a single whisper-italic serif line: "While you wait — we look at twelve places no human has time to check." Beside it, a tiny illustrated scene in the left edge of the pill — a flat-color scene of a small hand holding up a magnifying glass over a tiny pipe, rendered in sage and blush.

[no CTA, no anchor button] This is a passive screen. The user is waiting. There is no action available. The progress itself is the action. When the processing completes (at 6.5s), the screen transitions to the First Estimate Result screen.

[very bottom edge] Three soft cream dots as progress indicator — the second one softly filled coral (you are here — step 2 of 3 in the onboarding flow: photo → processing → result). No tab bar.

Motion-directive: the photo-circle's rotating glow halo should feel like it WANTS to orbit once every 2 seconds; the five orbital dots should feel like they WANT to trail slightly behind the glow; the current active stage's glow should feel like it WANTS to pulse gently; the concentric ring ripple should feel like it WANTS to expand outward rhythmically; the orbs behind should feel like they WANT to drift at different paces; the upcoming stages should feel like they WANT to wake up when their turn arrives. The whole screen breathes slowly, patiently. Static image, but every element suggests "the AI is alive and thinking, not frozen."

Primary Design Surface: App.
```

---

## Что Stitch должен вытащить

- Pale cream warming to peach at center, mint at edges
- 4 gradient orbs drifting behind
- Frosted glass circle with user's photo as centerpiece + warm rotating glow halo + 5 orbital dots + concentric ripple ring
- Vertical stack of 5 stage rows (checked / active / 3 upcoming), each a frosted pill
- Tiny illustrated glyphs per stage (shopping bag, wrench, balance scale, checkmark-scroll)
- Italic serif "Hold on. We're doing the math." reassurance
- UPPERCASE TRACKED micro-labels (LEAKY CARTRIDGE, USUALLY TAKES ABOUT 6 SECONDS)
- No CTA — pure waiting state
- Breathing/orbital animation implied everywhere
