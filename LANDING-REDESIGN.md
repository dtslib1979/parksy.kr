# LANDING-REDESIGN.md

> parksy.kr 랜딩 페이지 설계 원칙 (2026-03-12 확정)
> Executor: Termux Claude Code
> File: /index.html (single file, no build system)

---

## 채널 구조 (확정)

**5채널 전부 YouTube 운영** — site-only 채널 없음

| # | Persona | YouTube | LIVE |
|---|---------|---------|------|
| 01 | Philosopher TV | @philosopher-parksy | YES |
| 02 | Blogger TV | @blogger-parksy | YES |
| 03 | Visualizer TV | @visualizer-parksy | YES |
| 04 | Musician TV | @musician-parksy | YES |
| 05 | Technician TV | @technician-parksy | YES |

- Tester + Protocol + Orbit-Log → Philosopher에 통폐합 완료
- STANDBY/OFF 상태 없음 — 전 채널 LIVE

---

## 철학

```
PARKSY Broadcasting = AI × Korean Spirit × Liberal Arts

English copy, Korean spirit
Each persona = a liberal arts subject
Korean spirit expressed through English, not Korean text
```

---

## 층별 구조 (5-Floor Elevator)

```
1F  Lobby    — Grand Entrance, 5-channel TV Guide
B1  Schedule — On Air Program Guide (5 CH × 25 PGMS, JS-rendered, filterable)
B2  Studio   — Engine & workspace
B3  Console  — Production Order dispatch
B4  Office   — Locked (code: date format)
```

---

## 1F 로비 현재 구조

- **Signal Ticker**: 상단 얇은 바 (5 CH / 4 DOMAINS / 25 TOOLS / 12 PIPELINES)
- **Hero**: ON AIR badge + PARKSY Broadcasting + "Be a Panelist with AI"
- **5 Channels — ALL ON AIR**: TV Guide 스타일 채널 로우 01→05
  - flame 좌측 스트라이프 + LIVE 펄스 배지
  - 채널 번호 크게 (1.6rem)
  - hover시 translateX(4px) + glow shadow
- **Quartet Grid**: 4 도메인 (parksy/dtslib/eae/eae-univ)
- **Footer**: Beyond AI — Spirit · Intellect · Emotion

---

## 설계 규칙

1. **언어**: 영문 only (`lang="en"`)
2. **카피 톤**: `Liberal Arts, Powered by AI & Korean Spirit`
3. **LIVE 기준**: 5채널 전부 LIVE (YouTube 운영 기준)
4. **Archive 없음**: 채널 그리드에 포함하지 않음
5. **Stats**: 실측치만 (5 CH / 4 Domains / 25 Tools / 12 Pipelines)
6. **디자인 시스템**: CAVE UI (--cave-void, --flame-core 등)
7. **빌드 도구 없음**: 순수 HTML/CSS/JS

---

## Termux에서 수정 시

```
이 파일 읽고 index.html에 적용해: ~/parksy.kr/LANDING-REDESIGN.md
```
