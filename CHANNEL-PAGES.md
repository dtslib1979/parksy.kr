# Channel Program Pages — Build Instructions

> Executor: Termux Claude Code
> Priority: MEDIUM — after LANDING-REDESIGN.md is applied
> Date: 2026-03-12

---

## Architecture

```
parksy.kr/channel/{name}/index.html
```

5 pages for 5 YouTube-verified channels only:
- philosopher
- blogger
- visualizer
- musician
- technician

Protocol and Orbit-Log have NO YouTube → no program page yet.

---

## Data Source

`/api/v1/youtube.json` — read channel info from here:
- `handle` → YouTube handle
- `youtubeUrl` → link to YouTube channel
- `contentType` → program categories
- `persona` → display name

---

## Program Page Template

Each `/channel/{name}/index.html` follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Persona} — PARKSY Broadcasting</title>
  <meta name="description" content="{persona description} — PARKSY Broadcasting Channel">

  <!-- Shared Styles -->
  <link rel="stylesheet" href="/design/cave-ui.css">
  <link rel="stylesheet" href="/design/broadcast-ui.css">

  <style>
    /* Channel page specific styles */
    body {
      background: var(--cave-void, #0a0a0a);
      color: var(--cave-glow, #e8e8e8);
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
    }

    .channel-hero {
      min-height: 40vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 3rem 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .channel-number {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: var(--cave-dim, #666);
      letter-spacing: 0.2em;
      margin-bottom: 1rem;
    }

    .channel-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 2rem;
      font-weight: 600;
      margin: 0.5rem 0;
    }

    .channel-subject {
      font-size: 0.9rem;
      color: var(--cave-dim, #666);
      margin-top: 0.5rem;
    }

    .channel-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    .section-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--cave-dim, #666);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin: 2rem 0 1rem;
    }

    .program-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1rem 0;
    }

    .program-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      padding: 0.3rem 0.8rem;
      border: 1px solid var(--cave-dim, #666);
      border-radius: 2px;
      color: var(--cave-dim, #666);
    }

    .youtube-section {
      margin: 2rem 0;
      padding: 1.5rem;
      background: var(--cave-deep, #111);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 4px;
      text-align: center;
    }

    .subscribe-btn {
      display: inline-block;
      padding: 0.6rem 2rem;
      background: #ff0000;
      color: white;
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 2px;
      margin-top: 1rem;
    }

    .subscribe-btn:hover {
      background: #cc0000;
    }

    .back-link {
      display: inline-block;
      margin: 2rem 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--cave-dim, #666);
      text-decoration: none;
      letter-spacing: 0.05em;
    }

    .back-link:hover {
      color: var(--cave-glow, #e8e8e8);
    }

    .video-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin: 1rem 0;
    }

    .video-placeholder {
      aspect-ratio: 16/9;
      background: var(--cave-wall, #1a1a1a);
      border: 1px solid rgba(255,255,255,0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cave-dim, #666);
      font-size: 0.8rem;
    }

    @media (min-width: 600px) {
      .video-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
</head>
<body>
  <div class="channel-hero">
    <div class="channel-number">CH.{##} — PARKSY BROADCASTING</div>
    <h1 class="channel-name">{Persona} TV</h1>
    <p class="channel-subject">{subject description}</p>
  </div>

  <div class="channel-content">
    <a href="/" class="back-link">← Back to Station Lobby</a>

    <div class="section-title">Program Categories</div>
    <div class="program-tags">
      <!-- one tag per contentType entry -->
      <span class="program-tag">{contentType[0]}</span>
      <span class="program-tag">{contentType[1]}</span>
    </div>

    <div class="section-title">Latest from YouTube</div>
    <div class="youtube-section">
      <p>Watch on YouTube</p>
      <a href="{youtubeUrl}" class="subscribe-btn" target="_blank" rel="noopener">
        Subscribe — {handle}
      </a>
    </div>

    <div class="video-grid">
      <!-- Placeholder for future video embeds -->
      <div class="video-placeholder">Coming Soon</div>
      <div class="video-placeholder">Coming Soon</div>
    </div>

    <a href="/" class="back-link">← Back to Station Lobby</a>
  </div>
</body>
</html>
```

---

## Per-Channel Values

| # | folder | Persona | Subject | contentType |
|---|--------|---------|---------|-------------|
| 01 | philosopher | Philosopher | Depth of thought — existential inquiry | commentary, framing, concert, experiment |
| 02 | blogger | Blogger | Life in writing — daily essays & narrative | worldview, essay, narrative |
| 03 | visualizer | Visualizer | Seeing is knowing — webtoon & visual arts | webtoon, image, cad, pipeline |
| 04 | musician | Musician | Korean soundscape — AI-composed music | bgm, audio, lyria3 |
| 05 | technician | Technician | The making is the content — automation & tools | automation, pipeline, behind-the-scenes |

---

## Lobby Link Update (index.html)

In 1F Lobby channel grid, each `.ch-card` should link to the program page:

```html
<a href="/channel/philosopher/" class="ch-card ...">
```

For channels WITHOUT YouTube (06 Protocol, 07 Orbit-Log), keep as non-linking cards.

---

## youtube.json Update

Change `siteUrl` for each channel:

```json
"philosopher": {
  "siteUrl": "https://parksy.kr/channel/philosopher/"
}
```

(repeat for all 5 YouTube channels)

---

## YouTube Channel Description (MANUAL — user does this)

Each YouTube channel's About section should include:

```
Program Page: https://parksy.kr/channel/{name}/
Station: https://parksy.kr
```

---

## DO NOT

- Create pages for Protocol or Orbit-Log (no YouTube)
- Add build tools or frameworks
- Change the main index.html structure beyond adding href to channel cards
- Add analytics or tracking scripts
