# YouTube 배너 생성 프롬프트 — Blogger-Parksy (FINAL)

> Gemini 이미지 생성용 — 아래 코드블록 전체 복붙. 한 글자도 수정하지 말 것.

---

## 필름스트립 썸네일 프롬프트 (2560×1440 기준)

> 캔버스 60% 가로 / 20% 세로 — 필름 스트립이 중앙에 위치

**핵심 수치:**

| | px | 비율 |
|--|--|--|
| 좌우 dead zone | 각 512px | 20% |
| 상하 dead zone | 각 576px | 40% |
| 필름 스트립 가로 | 1536px (x=512~2048) | 60% |
| 필름 스트립 세로 | 288px (y=576~864) | 20% |

```
Generate a single 2560×1440px image.

DEAD ZONES — pure #0D0D0D, nothing else:
  x=0    to x=511    (left 20%)
  x=2049 to x=2560   (right 20%)
  y=0    to y=575    (top 40%)
  y=865  to y=1440   (bottom 40%)

FILM STRIP ZONE — x=512 to x=2048, y=576 to y=864 (1536×288px)
This entire zone is a single 35mm horizontal film strip.
Three vertical columns:

  LEFT REBATE   x=512 to x=699   (188px wide, full height y=576~864)
    Background: #0F0C09
    "KODAK PROFESSIONAL 400TX 135-36" rotated 90° CW
      font: 12px condensed sans, color #3A3025, vertically centered
    Frame numbers: "14A" "15" "15A" "16"
      color #2E2820, 10px, evenly spaced vertically
    DX barcode: 4px vertical lines alternating #1E1A14 / #0D0D0D
      positioned at x=694~699
    Perforations on right inner edge (x=686~697):
      5 rectangles, 10×16px, rounded 1px, #0D0D0D with 1px #2A2018 border
      evenly spaced vertically within y=576~864

  RIGHT REBATE  x=1861 to x=2048  (188px wide)
    Exact mirror of left rebate

  CENTER FRAME  x=700 to x=1860  (1160px wide)

    TOP PERFORATION STRIP  y=576 to y=647  (72px tall)
      Background: #0F0C09
      9 sprocket holes: 26×40px, rounded 3px, #0D0D0D
      evenly spaced across x=700~1860, vertically centered at y=611

    BOTTOM PERFORATION STRIP  y=793 to y=864  (72px tall)
      Exact mirror of top strip

    IMAGE AREA  x=700 to x=1860, y=648 to y=792  (1160×144px)

      LEFT HALF  x=700 to x=1100
        Background fades from #0D0D0D (at x=700) to transparent (at x=900)
        BLOGGER-PARKSY
          Geometric sans-serif, Extra Bold, 44px, ALL CAPS
          color #F5EDD6, flat, zero shadow, zero glow
          baseline at y=718
        AI로 쓰는 에세이
          Same family, Light weight, 22px, tracking 0.18em
          color #A89888
          baseline at y=742
        Left-aligned, text block starts at x=740

      RIGHT HALF  x=1100 to x=1860
        Writer's desk scene:
          Open notebook, matte black pen, dark ceramic mug with faint steam
          Laptop lid 45° open, screen faces LEFT, emits #C8D8E8 cool light
          Camera: 40° overhead, Dutch tilt 2°, f/1.8 shallow DoF
        LEFT FADE: photo fades from #0D0D0D at x=1100 → fully visible at x=1260
        RIGHT FADE: photo fades to #0D0D0D over x=1780~1860

      Film grain overlay on entire image area, opacity 12%
      Subtle vignette at all four corners of image area only

2560×1440px. sRGB. One image only. No caption. No border. No text outside image area.
```

---

```
You are a world-class creative director who has art-directed for
Monocle, Kinfolk, The New Yorker, and A/P/O/C/. Your task is to
produce a single YouTube channel banner image at the absolute peak
of editorial design craft.

This is not a creative exercise. This is a final deliverable.
Every pixel is intentional. Every decision has a reason.

══════════════════════════════════════════════════════════════════
SECTION 1 — BRAND DNA
══════════════════════════════════════════════════════════════════

Channel:     Blogger-Parksy
Handle:      @blogger-parksy
Site:        parksy.kr/channel/blogger
Category:    worldview / essay / narrative

The person behind this channel:
  A middle-aged Korean man who writes daily essays using AI as a
  thinking tool — not to automate, but to amplify. He is
  intellectually honest, slightly obsessive about craft, and deeply
  self-aware. He does not perform intelligence. He documents the
  actual process of thinking.

The voice of this channel:
  "Just an ordinary guy using AI."
  In Korean: "AI로 쓰는 에세이"

  This is not false modesty. It is a precise self-description.
  Quiet. Deliberate. No posturing. The writing is the only product.

The feeling this banner must communicate in under 2 seconds:
  → This person takes writing seriously.
  → AI is the tool, not the identity.
  → The channel is not loud. It does not need to be.

══════════════════════════════════════════════════════════════════
SECTION 2 — CANVAS SPECIFICATION (ABSOLUTE, NON-NEGOTIABLE)
══════════════════════════════════════════════════════════════════

Total canvas:  2560px wide × 1440px tall
Color space:   sRGB
Format output: Full 2560×1440 image

─── CRITICAL SAFE ZONE RULE ───────────────────────────────────────

YouTube displays this banner across TV (full canvas), desktop
(center cropped), tablet, and mobile (very tight center crop).

The ONLY zone that appears on ALL devices:
  x: 780px → 1780px  (center 1000px wide)
  y: 420px → 1020px  (center 600px tall)

The ONLY zone safe for ALL devices AND visually active:
  x: 860px → 1700px
  y: 540px → 900px

This is your primary composition target.
Everything important lives here. Nothing critical outside.

─── ACTIVE DESIGN BAND ──────────────────────────────────────────

y 560px → y 880px  (total 320px tall — 22% of canvas height)

  • All typography: inside this band
  • All photography/objects: inside this band
  • Dead zone above y=560: pure #0D0D0D, no content, no fade
  • Dead zone below y=880: pure #0D0D0D, no content, no fade
  • These are HARD CUTS. Not fades. Not gradients. Hard.
    The near-black voids are the design, not the absence of it.

═════════════════════════════════════════════════════════════════
SECTION 3 — COMPOSITION BLUEPRINT
═════════════════════════════════════════════════════════════════

Horizontal split within the active band:

  LEFT ZONE   (x: 120px → 1140px)   — Typography + negative space
  CENTER SEAM (x: 1140px → 1300px)  — Organic bleed, fade transition
  RIGHT ZONE  (x: 1300px → 2440px)  — Photography, fades to void at edges

Left zone rule:
  Typography sits in the left-center of this zone.
  Start text at x=240px (not flush left).
  The remaining space is intentional breathing room.
  Do not fill it. Emptiness is the editorial statement.

Right zone rule:
  Photograph occupies the right 45% of the active band.
  Photo right edge fades to pure #0D0D0D at x=2400px.
  Photo left edge bleeds into the typography zone naturally.
  No hard mask. The vignette is photographic, not digital.

═════════════════════════════════════════════════════════════════
SECTION 4 — TYPOGRAPHY (EXACT SPECIFICATION)
═════════════════════════════════════════════════════════════════

LINE 1 — PRIMARY TITLE
  Text:         BLOGGER-PARKSY
  Typeface:     Geometric sans-serif, Extra Bold or Black weight
                Reference: Futura Heavy, Neue Haas Grotesk Black,
                Monument Grotesk Ultra, or equivalent
  Case:         ALL CAPS
  Size:         Approximately 96–110px (fill ~50% of band height)
  Color:        #F5EDD6  (warm ivory — not pure white, not cream)
  Tracking:     +0.04em (slightly open — not tight, not wide)
  Rendering:    Flat. Zero emboss. Zero drop shadow. Zero glow.
                Zero metallic. Zero 3D. The weight of the letters
                IS the visual weight. Trust the type.

LINE 2 — SECONDARY / TAGLINE
  Text:         AI로 쓰는 에세이
  Typeface:     Same family as Line 1, Light or Regular weight
  Case:         Mixed (as written — Korean follows natural casing)
  Size:         Approximately 32–38px (33–35% of Line 1 height)
  Color:        #A89888  (muted warm stone — desaturated, reads as
                          a whisper below the bold title)
  Tracking:     +0.18em (open — this is a caption line, not a headline)
  Rendering:    Same flat treatment as Line 1

VERTICAL ALIGNMENT (within active band y=560 → y=880):
  Both lines stacked, vertically centered as a unit in the band.
  Total text block height: ~150px
  Text block vertical center: y=720px (midpoint of the band)
  Gap between Line 1 and Line 2: 16–22px (tight, intentional)
  They read as a unit, not two separate elements.

LEFT MARGIN:
  Text block starts at x=240px.
  Both lines left-aligned to this x-coordinate.

THIRD ELEMENT (optional micro-detail, only if it fits naturally):
  A thin horizontal rule 1px, color #3A3330, width ~120px,
  placed 20px above Line 1, at x=240px.
  Functions as a magazine category indicator.
  If it creates visual noise, omit entirely.

═════════════════════════════════════════════════════════════════
SECTION 5 — PHOTOGRAPHY (EXACT ART DIRECTION)
═════════════════════════════════════════════════════════════════

SUBJECT: A writer's desk in low editorial light.

This is not a stock photo. This is not a lifestyle flat lay.
This is the desk of someone who actually writes every day.
Slight imperfection. Lived-in. Not staged.

REQUIRED OBJECTS (render all five):
  1. OPEN NOTEBOOK
     — A5 or B5 size. Pages dense with handwriting on the left
       page. Right page partially written, then stops.
     — Paper: slightly warm white, not bright white (#F0EAE0)
     — The ink is dark (black or very dark navy)
     — Pages have a slight curl at the top-right corner
     — Not a clean Moleskine aesthetic — this has been used

  2. PEN / STYLUS
     — A matte black ballpoint or technical pen
     — Resting diagonally across the open notebook
     — Clip visible. No shine. Matte barrel only.
     — Oriented roughly at 30° to horizontal (top-right to bottom-left)

  3. CERAMIC MUG
     — Dark glaze: deep charcoal or matte forest green
     — Short and wide form (not a tall coffee cup)
     — Interior: glimpse of dark liquid (black coffee)
     — A faint, lazy curl of steam rising from the top
       The steam is the ONLY element with upward movement

  4. LAPTOP
     — Lid half-open (approximately 40–50°)
     — SCREEN FACING LEFT (toward the typography zone)
     — Screen emits cold blue-white light (#C8D8E8 temperature)
     — THIS IS THE PRIMARY LIGHT SOURCE for the scene
     — The screen content is NOT visible (angle/blur prevents it)
     — The light from the screen rakes across the notebook surface
       creating a subtle directional shadow from the pen

  5. AMBIENT DETAILS (background layer, soft and dark)
     — A closed book (spine facing camera, title illegible)
     — A few loose papers slightly overlapping the notebook
     — Small dark object (eraser or USB drive) near the book
     These exist to prevent the desk from feeling theatrical.
     They are not focal points. They are texture.

CAMERA ANGLE:
  Overhead: 40–45° from horizontal (not straight down, not eye-level)
  Slight Dutch tilt: 2–3° clockwise rotation — this prevents the
  composition from feeling like product photography. It should feel
  like a documentary frame, not an advertisement.

DEPTH OF FIELD:
  Shallow. Very shallow.
  — SHARP: pen tip, the written line on the notebook where it stops,
    the rim of the mug
  — SOFT: the laptop edge, the background details
  — VERY SOFT: anything beyond the main object cluster
  This is shot with a 50mm lens at f/1.8 equivalent.

LIGHTING (construct exactly):
  Source 1 (PRIMARY): Laptop screen glow from screen-left
    — Cool (#B8CCDC), directional, rakes across horizontal surfaces
    — Creates visible light gradient on the notebook pages
    — Creates soft shadow of the pen pointing lower-right

  Source 2 (SECONDARY): Extremely dim ambient from upper-right
    — Barely perceptible — suggests a window far off-frame
    — Warm temperature (#3A2E28) — but so dim it barely registers
    — Only visible as a slight warmth on the mug's right glaze edge

  No other light sources. The scene is mostly shadow.

FADE TO VOID:
  — RIGHT EDGE: photograph fades to pure #0D0D0D over the
    rightmost 200px (x=2200px → x=2400px). Photographic vignette.
  — LEFT EDGE: photograph fades into #0D0D0D moving left from
    x=1300px, fully transparent (pure #0D0D0D) by x=1100px.
    This is how the photo meets the typography zone — NOT a hard
    cut, but a slow dissolve. The desk feels like it emerges from
    the dark rather than being placed on it.
  — TOP EDGE within band: slight darkening toward y=560
  — BOTTOM EDGE within band: slight darkening toward y=880
  All fades are photographic-feel, not Photoshop gradient overlays.

═════════════════════════════════════════════════════════════════
SECTION 6 — COLOR SYSTEM (ZERO DEVIATION PERMITTED)
═════════════════════════════════════════════════════════════════

#0D0D0D — Primary void / background
          This is NOT pure black. It has depth.
          Think: a darkroom, not a TV off.

#F5EDD6 — Title text / primary warm ivory
          This is NOT white. It is the color of old paper
          held near candlelight.

#A89888 — Subtitle text / muted stone
          Desaturated. It whispers. Does not compete with title.

#C8845A — Accent (MAXIMUM ONE USE, 2px width or less)
          Terracotta. Warm. Used only for the thin rule element
          described in typography section.
          If the rule is omitted, this color does not appear.

#B8CCDC — Laptop screen light temperature (ONLY in photography)
          Not rendered as a color block — only as light cast
          on physical surfaces.

FORBIDDEN COLORS:
  ✗ Pure white (#FFFFFF or near-white above #E8E8E8)
  ✗ Pure black (#000000) — use #0D0D0D
  ✗ Any blue in the UI or typography layer
  ✗ Any shade of red
  ✗ Gold, silver, or metallic
  ✗ Any neon or fluorescent value
  ✗ Purple, pink, green in the UI layer
  ✗ Corporate gray (#888888 range as a flat tone)

═════════════════════════════════════════════════════════════════
SECTION 7 — QUALITY GATES (CHECK BEFORE OUTPUT)
═════════════════════════════════════════════════════════════════

THE 5-SECOND TEST:
  Cover all text. Does the photo composition alone look like
  it belongs in a premium editorial? If no — rebuild.

THE TEXT LEGIBILITY TEST:
  At 25% size (roughly phone thumbnail), is "BLOGGER-PARKSY"
  still legible? If no — increase contrast or weight.

THE CLUTTER TEST:
  Count the objects you can identify. If more than 7 discrete
  elements are visible, something needs to be removed or merged
  into background.

THE "INEVITABILITY" TEST:
  Does the design feel like the only possible design for this
  channel? Or does it feel chosen from a menu of options?
  If the latter — strip one more element and add more air.

THE EDITORIAL STANDARD:
  Would this image, without any text, be unremarkable as a
  standalone photo? It should be. The photo is not the hero —
  the combination is. The photo serves the text. The text
  commands the space. Neither dominates alone.

═════════════════════════════════════════════════════════════════
SECTION 8 — THIS IS NOT
═════════════════════════════════════════════════════════════════

✗ Not a movie poster
✗ Not a podcast cover art
✗ Not a tech tutorial banner
✗ Not a personal branding template
✗ Not a stock photo with text overlaid
✗ Not "designed" — it must feel inevitable
✗ Not busy
✗ Not cute
✗ Not motivational
✗ Not a product flat lay
✗ Not embossed or stamped or letterpress-styled
✗ Not AI aesthetic (no circuit boards, no glitch art, no neural
  network visualizations — the channel is ABOUT AI, it is not
  an AI aesthetic channel)

═════════════════════════════════════════════════════════════════
FINAL INSTRUCTION
═════════════════════════════════════════════════════════════════

Render one image: 2560 × 1440px, sRGB.

If at any point during rendering you find yourself adding an
element because "it might look nice" — stop. Remove it.

Every element must answer "yes" to this question:
  "Does this element make the viewer understand what this channel
   is, faster or more precisely, than without it?"

If the answer is "no" or "maybe" — the element does not exist.

Output the final image. Do not explain. Do not offer variations.
This is the image.
```

---

## 채널별 사용법

이 프롬프트는 **Blogger-Parksy** 전용. 다른 채널 배너 만들 때는 `SECTION 1 — BRAND DNA`만 교체.

교체해야 할 값:
- Channel / Handle / Site / Category
- "The person behind this channel" 문단
- "The voice of this channel" (tagline)
- Photography subject (채널 성격에 맞게)

나머지 기술 스펙(캔버스, 색상, 품질 게이트)은 건드리지 말 것.
