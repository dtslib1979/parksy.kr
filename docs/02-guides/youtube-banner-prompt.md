# YouTube 배너 생성 프롬프트 — Blogger-Parksy

> Gemini 이미지 생성용. 아래 전체 텍스트를 그대로 복붙.

---

```
You are a world-class creative director. Design a YouTube channel banner
at the level of Monocle magazine, Kinfolk editorial, or The New Yorker.

─────────────────────────────────────────
BRAND IDENTITY
─────────────────────────────────────────
Channel name:  Blogger-Parksy
Handle:        @blogger-parksy
Tagline:       "Just an ordinary guy using AI."
Subtitle (KR): "AI로 쓰는 에세이"
URL shown:     parksy.kr/channel/blogger
Voice: Intellectually honest. Self-aware. Not trying to impress —
       just documenting the process of thinking with AI.
Tone: Quiet confidence. Not loud. Not corporate. Not influencer.

─────────────────────────────────────────
CANVAS & CROP (NON-NEGOTIABLE)
─────────────────────────────────────────
Total image size: 2560 × 1440px

Active design band: y 580px → y 860px
  → 280px tall (19.4% of total height)
  → All text, photos, and objects must live INSIDE this band only
  → Do NOT fill the full 280px — keep generous top/bottom padding
     inside the band so elements breathe

Above y=580:  pure #0D0D0D — nothing, no gradients, no fade
Below y=860:  pure #0D0D0D — nothing, no gradients, no fade
Hard edges, not soft. The near-black zones are intentional dead space.

─────────────────────────────────────────
TYPOGRAPHY (left 55% of the band)
─────────────────────────────────────────
Line 1: "BLOGGER PARKSY"
  — Weight: Extra Bold / Black
  — Style: Geometric sans-serif — clean, modern, zero decoration
  — Color: warm ivory #F5EDD6
  — NO emboss. NO metallic. NO 3D. NO glow. The letterforms
    themselves carry all the weight.

Line 2: "AI로 쓰는 에세이"
  — Weight: Light or Regular, same typeface family
  — Size: 35% of Line 1 height
  — Color: muted warm stone #B8A898
  — Letter-spacing: wide (+0.2em)
  — Feels like a magazine deck line — calm, secondary

Left margin: 120px from left edge of image
Both lines centered vertically within the active band
Line gap: tight and intentional — not floating apart

─────────────────────────────────────────
PHOTOGRAPHY (right 50%, bleeds left into text zone)
─────────────────────────────────────────
Subject: A writer's desk — dark editorial style
Elements:
  • Open notebook, pages slightly worn at edges
  • Matte black ballpoint pen resting diagonally
  • Ceramic mug, dark glaze, faint curl of steam
  • Laptop lid half-open — screen casts cold blue-white light
    onto the surface (this is the PRIMARY light source)

Shot angle: 35° overhead, shallow depth of field
Right third: sharp focus
Moving left → gradual fade to pure #0D0D0D over ~600px
Natural photographic vignette fade — NOT a hard mask

─────────────────────────────────────────
COLOR SYSTEM (strict — zero deviation)
─────────────────────────────────────────
Background base:  #0D0D0D  (near-black — has textural depth)
Title text:       #F5EDD6  (warm ivory)
Subtitle text:    #B8A898  (stone gray)
One accent only:  #C8845A  (muted terracotta — used SPARINGLY,
                            2px rule or single small element max)

Zero other colors. No blue UI elements. No bright orange.
No gold. No neon.

─────────────────────────────────────────
WHAT THIS IS NOT
─────────────────────────────────────────
✗ Not a movie poster
✗ Not embossed gold title
✗ Not neon glow
✗ Not a stock photo composite
✗ Not busy — if it feels cluttered, remove until it doesn't
✗ Not "designed" — it should feel inevitable

─────────────────────────────────────────
FINAL STANDARD
─────────────────────────────────────────
Before rendering: would this image look credible on the cover
of a premium independent publication?
If yes — output. If not — rethink the composition.
```

---

## 업데이트 방법

채널 정보 바뀌면 `BRAND IDENTITY` 섹션만 수정. 나머지 스펙은 건드리지 말 것.
