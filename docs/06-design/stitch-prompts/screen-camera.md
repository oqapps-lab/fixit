# FixIt — Camera View screen (1.4)

**Дата:** 2026-04-19
**Стиль:** The Exhale — soft frosted guidance overlays on full-bleed live camera, single coral capture button, warm editorial feel in a normally cold camera screen
**Образец:** `sugar-quit/docs/06-design/style-exploration/v10-editorial-narrative.md`

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a broken thing returns three priced routes — DIY, split, or pro — in sixty seconds. For the moment you've found the problem and you're holding your phone up to it, palms slightly unsteady, ready to ask.

Mood & visual identity: imagine a warm editorial magazine's photoshoot direction — not a cold industrial scanner. Your phone camera is seeing the problem, but the interface wrapping the viewfinder treats you like a photographer being gently coached, not a patient being scanned. The palette is light editorial — pale cream-peach frosted overlays, soft coral guidance text, a single warm amber accent on the capture button. Everything that's not live camera is frosted glass.

The screen is a full-bleed live camera viewfinder filling the entire canvas — the photo of whatever Emma is aiming at (in this concept, a leaky kitchen faucet under the sink, slightly dim kitchen lighting, warm cabinet wood visible at the edges of the frame). Over the live camera view, frosted glass overlay panels float at specific zones — top, bottom, and two small frosted orbs at the sides — giving guidance without blocking the composition.

Behind the frosted overlays in the darker corners of the camera view, very subtle warm-coral glow halos suggest warmth wrapping the cold camera feed. Each frosted overlay has backdrop blur around 30px, soft translucency (75% white-cream tint), a hair-thin white-translucent border, and a warm drop shadow softly separating it from the live camera. The overlays feel like they belong to the same visual world as the Welcome screen — same gradient-orb depth, same editorial feel, same warmth — even though they sit on a real photograph.

The anchor: a single massive glossy coral-to-amber capture button at the bottom-center of the screen, a large rounded pill or circle, with deep saturated gradient fill, a highlight streak across the top like polished glass, and a soft warm pulsing halo ring around it (suggesting "ready when you are"). The only hard-edged, only glossy, only saturated element on the screen. "When you're ready. I'm listening."

Typography is photoshoot-direction editorial. Clean medium geometric sans for guidance hints, UPPERCASE TRACKED whisper-labels for functional UI zones, one tiny italic serif for the gentle encouragement. No prose beyond 4-6 words per overlay.

One screen. The Camera View — Emma holding her phone up to the leak.

[top overlay — a thin frosted glass band across the upper area of the screen] On the left, a small frosted circle with a backward-arrow inside — close/cancel, very quiet. On the right, a small frosted circle with a flash icon inside, also quiet. Between them, a tiny UPPERCASE TRACKED label in warm coral-white: "STEP 1 OF 3 — SHOW US THE PROBLEM". Below the step label, a single italic serif encouragement in soft cream: "Get close. Let light fall on it."

[framing guide — four subtle coral corner-brackets placed at the golden-ratio framing rectangle inside the camera view] Very thin saturated coral lines forming just the four corner ticks of an implied framing rectangle, suggesting "place the problem inside this area." The brackets have soft glow halos around each corner — gentle, not aggressive. In the center of the framing rectangle when the camera sees something important, a very small frosted pill might appear (in this scene it does) with UPPERCASE TRACKED text: "LEAKY CARTRIDGE SPOTTED — 94% CONFIDENT." This small pill has a soft coral glow halo suggesting the AI is already working.

[left side — a small frosted vertical pill floating mid-left] Tiny UPPERCASE TRACKED label: "TIP". Below in thin italic sans: "Move a little closer." A tiny illustrated glyph of a small hand and phone in blush tone.

[right side — a small frosted vertical pill floating mid-right] Tiny UPPERCASE TRACKED label: "LIGHTING". Below in thin italic sans: "Bright side works." A tiny illustrated glyph of a small sun-burst in peach tone.

[bottom overlay — a thin frosted glass band across the lower area of the screen, more prominent than the top band] On the left, a small frosted circle with a gallery icon inside — "USE SAVED PHOTO" in UPPERCASE TRACKED whisper beneath, for Emma who wants to pick from her camera roll instead. On the right, a small frosted circle with a pencil-text icon — "DESCRIBE WITH TEXT" in UPPERCASE TRACKED whisper beneath, for Emma who can't get a clear photo. Between them, centered, the massive glossy coral capture button described above. Around the capture button, the bottom overlay extends a tiny bit with whisper-weight cream text beneath the button: "Tap when ready · or press and hold to capture video if it's dripping."

[very bottom edge] A single frosted thin pill showing progress: "01 · 02 · 03" with the 01 softly glowing coral (you are here in the first-photo flow). The tab bar is NOT shown — this is a sovereign full-screen flow above navigation.

Motion-directive: the coral corner brackets should feel like they WANT to pulse very gently, barely perceptible; the capture button's halo should feel like it WANTS to breathe slowly in and out; the "LEAKY CARTRIDGE SPOTTED" confidence pill should feel like it WANTS to appear fresh, like a live detection. Static image, but the AI-guidance feels alive.

Primary Design Surface: App.
```

---

## Что Stitch должен вытащить

- Full-bleed live camera view (warm kitchen scene with leaky faucet)
- Top + bottom frosted glass bands с guidance
- Small frosted side-pills с tips ("Move a little closer" + "Bright side works")
- Coral framing corner-brackets at golden-ratio frame
- Small frosted "LEAKY CARTRIDGE SPOTTED — 94% CONFIDENT" detection pill
- Gallery fallback + text fallback small frosted icons
- Massive glossy coral-amber capture button с pulsing halo — anchor
- Editorial italic-serif encouragement "Get close. Let light fall on it."
- 01·02·03 progress micro-pill at bottom
- Нет tab bar — sovereign full-screen flow
