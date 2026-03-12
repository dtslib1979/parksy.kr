# Landing Page Redesign Instructions

> Target: A-grade broadcasting station level
> Language: English (Korean spirit audience = foreigners interested in Korea)
> Runtime: Samsung Internet (built-in translation covers Korean readers)
> Executor: Termux Claude Code
> File: /index.html (single file, no build system)

---

## Philosophy

```
PARKSY Broadcasting = AI × Korean Merit × 7 Persona Liberal Arts

Each persona = a liberal arts subject
Each channel = a department in a one-person university-broadcasting hybrid
Korean spirit (기질) expressed through English copy, not Korean text
```

---

## FLOOR ARCHITECTURE

The landing page is a vertical building. Each floor MUST be visually distinct.

### Visual Floor Separation Rules

1. Each `floor-section` gets a unique subtle background gradient or tone shift
2. Floor transitions have a clear horizontal divider (1px line + floor badge)
3. Each floor header shows: `[BADGE] FLOOR NAME` + subtitle
4. Scroll reveals each floor with a slight fade-in

### Color Mapping per Floor

```
1F Lobby   → --cave-void (#0a0a0a) — the darkest, grand entrance
B1 Channel → --cave-deep (#111111) — slightly warmer, content browsing
B2 Studio  → --cave-wall (#1a1a1a) — workshop feel, more texture
B3 Console → --cave-stone (#252525) — utility, lighter surface
B4 Office  → --cave-void (#0a0a0a) — back to darkness, locked mystery
```

---

## 1F LOBBY — Grand Entrance

### Hero Section

```html
<h1>PARKSY<br>Broadcasting</h1>
<p class="station-tagline">Liberal Arts, Powered by AI & Korean Spirit</p>
```

### Stats Bar (real numbers only)

```
7 Channels  |  5 YouTube  |  4 Domains  |  1 AI Engine
```

### Channel Grid — 7 Liberal Arts + Archive

Keep the current structure (2-col grid, 1-col mobile). English copy with Korean spirit:

| # | Persona | Card Name | Card Desc | LIVE |
|---|---------|-----------|-----------|------|
| 01 | Philosopher | Philosopher TV | Depth of thought — existential inquiry | YES |
| 02 | Blogger | Blogger TV | Life in writing — daily essays & narrative | YES |
| 03 | Visualizer | Visualizer TV | Seeing is knowing — webtoon & visual arts | YES |
| 04 | Musician | Musician TV | Korean soundscape — AI-composed music | YES |
| 05 | Technician | Technician TV | The making is the content — automation & tools | YES |
| 06 | Protocol | Protocol TV | Structure as art — systems & frameworks | NO |
| 07 | Orbit-Log | Orbit-Log TV | Traces & trajectories — analytics & logs | NO |
| — | Archive | Archive | Full content vault | NO |

LIVE rule: YouTube-verified channels only (01–05).

### Footer

```
Beyond AI — Spirit · Intellect · Emotion
© 2026 PARKSY Broadcasting · DTSLIB Publishing
```

---

## B1 CHANNELS — Persona Department Listings

### Header

```
[B1] Channels
7 Persona Liberal Arts Channels
```

### Channel List (detailed rows)

Same 7 channels as lobby but in list format with richer descriptions:

| # | Name | Description |
|---|------|-------------|
| 01 | Philosopher TV | Existential inquiry & deep commentary |
| 02 | Blogger TV | Daily essays & personal narratives |
| 03 | Visualizer TV | Webtoon, infographics & visual literacy |
| 04 | Musician TV | AI composition & Korean soundscape |
| 05 | Technician TV | Automation, tooling & behind-the-scenes |
| 06 | Protocol TV | Systems architecture & structured frameworks |
| 07 | Orbit-Log TV | Analytics, tracking & orbital insights |

### Channel Index (tag cloud)

```
Philosophy · Essay · Visual · Music · Tech · Systems · Orbit
```

### LIVE status in B1

Match lobby: 01–05 = live, 06–07 = off.

---

## B2 STUDIO — Production Floor

### Header

```
[B2] Studio
Content Engines & Workspace
```

### Engine Cards (keep 5, no changes to structure)

1. Claude Code Engine (Online)
2. Transform Engine (Ready)
3. Python Pipeline (Local)
4. Content Factory (System)
5. PO Dispatch (Pending)

### PO Dispatch Channel Select — FIXED

```html
<option value="all">All Channels</option>
<option value="philosopher">CH.01 Philosopher</option>
<option value="blogger">CH.02 Blogger</option>
<option value="visualizer">CH.03 Visualizer</option>
<option value="musician">CH.04 Musician</option>
<option value="technician">CH.05 Technician</option>
<option value="protocol">CH.06 Protocol</option>
<option value="orbit">CH.07 Orbit-Log</option>
```

No Tester. 7 channels only.

---

## B3 CONSOLE — Platform Hub

### Header

```
[B3] Console
Platform Integration Hub
```

### Platform Grid (keep 8 platforms, no changes)

### Broadcasting Quartet

```
Broadcasting Quartet
Raw · Business · Education · Academy

parksy.kr  → Raw / Entity     [RAW]
dtslib.kr  → Business / Commerce [BIZ]
eae.kr     → Education / MDX   [EDU]
eae-univ   → Academy / Hub     [HUB]
```

---

## B4 OFFICE — Locked Strategy Room

### Header

```
[B4] Office
Strategy & Planning Room
```

### Lock Screen

```
Authorized personnel only
Placeholder: "Enter access code"
Button: "Unlock"
Hint: "Hint: host name"
```

### Office Content (after unlock)

#### Strategy Board

```
- Content calendar planning
- Channel growth metrics
- Audience analysis
- Revenue streams
```

#### Meeting Notes

```
Weekly review and planning sessions.
"Coming Soon"
```

#### KPI Dashboard

```
7 Channels  |  ∞ Potential
```

#### Roadmap

```
Phase 1: Platform Setup ✓
Phase 2: Content Engine    ← current
Phase 3: Community Building
Phase 4: Monetization
```

---

## HEAD / SEO / META

```html
<html lang="en">
<title>PARKSY Broadcasting — Liberal Arts with AI & Korean Spirit</title>
<meta name="description" content="7 persona channels, each a liberal arts subject. AI-powered content broadcasting with Korean merit.">
<meta property="og:title" content="PARKSY Broadcasting — AI Liberal Arts">
<meta property="og:description" content="7 Personas × AI × Korean Spirit = Liberal Arts Content">
```

### Structured Data

```json
{
  "name": "PARKSY Broadcasting",
  "description": "AI-powered liberal arts broadcasting — 7 personas with Korean spirit",
  "applicationCategory": "Education"
}
```

---

## CSS ADDITIONS (add to inline <style>)

### Floor Separation

```css
/* Floor visual separation */
.floor-section {
  min-height: 100vh;
  padding: 2rem 1.5rem;
  position: relative;
}

#floor-lobby {
  background: linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%);
}

#floor-channels {
  background: linear-gradient(180deg, #0f0f0f 0%, #111111 100%);
  border-top: 1px solid rgba(255,255,255,0.05);
}

#floor-studio {
  background: linear-gradient(180deg, #111111 0%, #1a1a1a 100%);
  border-top: 1px solid rgba(255,255,255,0.05);
}

#floor-console {
  background: linear-gradient(180deg, #1a1a1a 0%, #252525 100%);
  border-top: 1px solid rgba(255,255,255,0.05);
}

#floor-office {
  background: linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%);
  border-top: 1px solid rgba(255,107,53,0.1);
}

/* Floor header enhancement */
.floor-header {
  text-align: center;
  padding: 2rem 0 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.floor-badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--cave-dim);
  border-radius: 2px;
  color: var(--cave-dim);
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.floor-title {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--cave-glow);
  margin: 0.5rem 0 0.25rem;
}

.floor-desc {
  font-size: 0.7rem;
  color: var(--cave-dim);
}
```

---

## EXECUTION CHECKLIST

1. [ ] Change `lang="ko"` → `lang="en"`
2. [ ] Update `<title>`, `<meta description>`, OG tags to English
3. [ ] Hero: `PARKSY Broadcasting` + `Liberal Arts, Powered by AI & Korean Spirit`
4. [ ] Stats bar: keep numbers, labels in English (Channels/YouTube/Domains/AI Engine)
5. [ ] 1F Channel grid: English names & descriptions per table above
6. [ ] 1F Footer: English
7. [ ] B1 Channel list: English names & descriptions, LIVE status corrected
8. [ ] B1 Channel index: English tags
9. [ ] B2 floor-desc: English
10. [ ] B2 PO Dispatch: Tester already removed, keep as-is
11. [ ] B3 floor-desc: English
12. [ ] B3 Quartet: English labels
13. [ ] B4 all content: English
14. [ ] Structured data: English
15. [ ] Add floor separation CSS (gradients + borders)
16. [ ] Verify: no Korean text remains in index.html (except HTML comments are OK)

---

## DO NOT CHANGE

- HTML structure / class names
- Elevator panel
- JS scripts
- CSS file references
- Link URLs
- Channel order (01 Philosopher through 07 Orbit-Log)
