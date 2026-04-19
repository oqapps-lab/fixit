# FixIt v5 — Price Weather (Welcome screen)

**Настроение:** playful but informative. One house, three weathers. Triptych moment.
**Палитра через природу:** sunrise coral + noon gold + late-afternoon teal — mapped к fix difficulty
**X-instead-of-Y:** the weather IS the preview — three climate panels tell you what the app does faster than words

---

## Промпт

```
FixIt — AI home repair cost advisor. Photo of a home problem returns a weather-map of your three repair options — each route a climate zone with its own mood, temperature, and time-of-day. Fix-it-yourself is bright morning, hybrid is warm midday, full pro is the cool clear evening. Real prices, real labor rates, real decisions. For the moment you need to see the whole weather of the fix in one glance. Think a seaside airport's weather-tile display meets a painted travel-poster triptych — atmospheric, layered, three little worlds.

Mood & visual identity: imagine a glass-tiled weather display at a seaside airport — three adjacent panels showing three different climates on the same afternoon, each with its own atmosphere, its own light, its own slow-moving clouds. This app lives in that weather display. The palette is skies across a single day — sunrise coral softening into morning peach for the left panel, noon gold warming into amber for the middle panel, late-afternoon teal cooling into sea-blue for the right panel. Each panel has its own weather. Color IS the climate. Light level IS the cost.

The screen is divided into three vertical panels side-by-side (narrow gaps between them, soft gradient-fade edges on each panel so the transitions feel painterly rather than hard). Each panel has its own full background gradient running top-to-bottom. Between the three panels, very thin vertical lines of light — like the glass seams in a display — hint at the separation without enforcing it.

CRITICAL RULES:
1. If an element could appear in more than one panel, place it only in its true-climate panel — don't duplicate.
2. All shapes are painterly — soft cloud silhouettes, small weather glyphs, organic house forms. Nothing is line-drawn-technical. The only hard-edged element on the entire screen is the single coral CTA pill.
3. Three accent colors — sunrise coral, noon gold, afternoon teal — each appears ONLY in its own panel and nowhere else. The coral CTA pill sits in the left DIY panel because that's the easiest starting point.
4. Typography is editorial atmospheric — a large italic serif for each climate's headline word (one word per panel), a clean thin sans for body copy and labels, a massive sans-serif for any numeric teasers. Numbers stay small on this welcome screen — they're a preview, not the show.
5. The overall feeling is curious and wide — like looking at a weather forecast that's also a painting that's also three tiny adventure posters side-by-side.

Large hero illustration spanning all three panels — three adjacent painted scenes of the same small stylized house in three different weather conditions, same house orientation but different sky, different light, different atmosphere:

[LEFT PANEL — sunrise coral warming into morning peach gradient background]
A painted scene: the small house at dawn, facing a soft coral-pink sunrise sky. The sun is just cresting the horizon behind the house on the right side of the panel, rendered as a diffuse warm glow. The house is lit in soft peach on its right side with pale lavender shadows on the left. Wispy morning clouds drift high in the panel — two or three small ones, translucent cream. A single soft-coral weather-vane on the roof's peak pointing to one direction. Small motion particles in the sky suggest morning motes in the light. At the front of the house, a tiny painted mailbox and a single early-bird silhouette on a nearby fence. The ground beneath the house is soft peach-earth. Scattered across the ground at the bottom of the panel, small tufts of grass rendered as quick painted strokes.

[MIDDLE PANEL — noon gold warming into amber gradient background]
Same house shape, now under a high midday sky in saturated gold. The sun is overhead, rendered as a bright amber disc near the top of the panel with subtle rays radiating outward. The house is lit evenly in warm gold on all visible surfaces, with short midday shadows directly beneath it. Puffy cumulus clouds drift at mid-height in the panel — three or four of them, cream and peach, fuller than the morning clouds. A small weather-vane on the roof points to a different direction than in the left panel. The house's windows glow slightly warm, reflecting the overhead sun. Small particles of dust and pollen drift in the golden air. The ground is amber-earth with a single wildflower painted to the side.

[RIGHT PANEL — late-afternoon teal cooling into sea-blue gradient background]
Same house shape, now under the evening sky as day cools. The sky is deepening teal at the top, transitioning through soft mint to sea-blue at the bottom. The sun is setting behind the house and to the left, rendered as a cooler low glow, pale orange fading to deeper teal. The house is in partial silhouette, lit by the last warm light on one edge, cool-blue on the other. Dense but calm clouds drift at a lower height in the panel — painted in deeper slate and soft grey. The weather-vane is still, no wind. A warm amber glow emanates from one of the house's windows (someone is home, lamp is on). Tiny fireflies or evening particles sparkle near the house. The ground is cool sea-blue shadow with a single painted evergreen tree in silhouette to one side.

Across all three panels at the same horizontal level, a continuous horizon line connects them — so the three houses are understood to be the same house in three weathers, not three different houses.

Below the hero triptych, spanning all three panels horizontally:

A thin horizontal band with a subtle gradient mirroring all three climates (coral → gold → teal). Inside the band at the center: a tiny cloud-with-house glyph logo beside the app name "FixIt" in small clean sans, with a tiny UPPERCASE TRACKED tagline beneath: "THREE ROUTES. REAL PRICES. REAL WEATHER."

Below the band, a hero headline centered, in massive italic serif, two lines, each word in a color matching one of the panel climates (so the headline lives in all three worlds at once):
"Every fix"
"has three kinds of weather."

A single line of body text in clean thin sans, centered: "Snap a photo of what's broken. We'll map the weather of your options — the quick morning fix, the warm split-work afternoon, the full-service evening pro."

Below the body, a single saturated coral pill button — the only hard-edged element on the screen — aligned slightly to the left so it visually lives in the DIY morning panel's territory: "BEGIN WITH A PHOTO" in clean medium sans, letter-spaced.

Below the button, a whisper-weight link in muted slate: "See a sample forecast →"

Near the bottom of each panel, a tiny UPPERCASE TRACKED label identifying that panel's climate in its own accent color: LEFT panel says "DIY · MORNING" in coral, MIDDLE panel says "HYBRID · MIDDAY" in gold, RIGHT panel says "FULL PRO · EVENING" in teal. Beneath each label, a tiny price-preview in whisper weight: "from $15", "from $45", "from $180" — teasing the app's actual output without spoiling it.

At the very base, three cloud-shaped progress dots, each colored to match its panel (coral / gold / teal), evenly spaced — the coral one softly glowing (you are here).

Motion-directive: the clouds in each panel should feel like they WANT to drift at their own pace (slow-morning, brisker-midday, still-evening); the sun glows should feel like they WANT to pulse gently; the weather-vanes should feel like they WANT to turn; the fireflies in the evening panel should feel like they WANT to twinkle; the early-bird silhouette should feel like it WANTS to take flight. Each panel breathes its own atmosphere. Static image, but three distinct breathing climates.

Primary Design Surface: App.
```

---

## Что должно выйти (ожидание)

- Three vertical painted panels side-by-side: sunrise / noon / evening
- Same stylized house in each panel, different weather
- Coral + gold + teal, each used only in its panel
- Connected horizon line across all three (same house, not three houses)
- Clouds differ per panel (wispy / puffy / dense-calm)
- Weather-vanes pointing different directions per panel
- Midday has sun-disc + rays, evening has glowing window + fireflies
- Italic serif hero "Every fix / has three kinds of weather" with words in panel colors
- Single coral CTA pill as only hard-edged element
- Three price-teasers ("from $15", "from $45", "from $180") at bottom of each panel
- Cloud-shaped progress dots coloured to match panels

## Против чего тестировать

- Не должно выйти "weather.com UI" — painted editorial triptych, не TV broadcast
- Не должно выйти "playful kids app" — serious beautiful atmospheric
- Должно выйти "magazine weather feature meets travel poster"
- Самый experimental из всех — если сработает, будет самый unique и memorable look на рынке
- Риск: три панели на маленьком экране могут стать cramped; но welcome screen имеет достаточно места для hero triptych
