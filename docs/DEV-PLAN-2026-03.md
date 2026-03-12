# PARKSY Broadcasting — DEV PLAN v5.0 (Final)
> 기준일: 2026-03-12 | 상태: Phase 0 완료
> 참조 문서: ARCHITECTURE-OVERVIEW.md / CHANNEL-PAGES.md / LANDING-REDESIGN.md
> SoT: api/v1/programs.json · kr-merit.json · highschool.json · youtube.json

---

## 구조 프레임 (반도체 공정)

```
웨이퍼 (원자재)   = Tistory 25개         — CDN + 초크보드
전공정 (소재생산) = parksy-image          — 웹툰/선화
                  parksy-audio           — BGM/Lyria3
                  dtslib-cloud-appstore  — 강의도구
후공정 (조립)     = parksy.kr            — 편성 + Mission Control
테스트            = Claude Code          — 검증/QA/백엔드 대체
출하              = YouTube 5채널        — 유일한 수익원
```

**핵심 원칙:**
- 서버 없음. JSON 파일 = API (GitHub Pages 정적 서빙)
- 빌드 도구 없음. git push = 배포
- 공격 표면 1개 (GitHub 2FA)
- 비용: 연 ₩40,000 (도메인 4개만)

---

## 콘텐츠 3축

### 축 1 — 고교 교재 (dtslib1k)
한국 교육 강도는 외국에서 이미 유명. 수능/내신 체계 AI와 함께 해체.

| 페르소나 | 과목 | YouTube 훅 |
|---------|------|-----------|
| Philosopher | 철학 | Korean HS Philosophy — why they memorize Socrates for the SAT |
| Blogger | 수학 | Korean SAT Math with AI — Half-blood Edition |
| Visualizer | 사회 | Korean Social Studies — subjects they don't teach outside Korea |
| Musician | 국어 | Korean classical poetry remixed into music with Lyria3 |
| Technician | 과학 | Korean HS Science — memorization as performance art |

### 축 2 — KR Merit (dtslib2k)
외국인이 한국인을 이해 못 하는 이유를 모듈화.

| 모듈 | 페르소나 | 컨셉 |
|------|---------|------|
| 허세교양 (Bluff Liberal Arts) | Technician | 아는 척 문화, 교양 퍼포먼스 |
| 하프블러드 어학 (Half-blood) | Blogger | 반쯤 아는 외국인 시점 언어학 |
| 편집평가강박 (Edit Obsession) | Visualizer | 완벽주의, 고쳐쓰기 강박 |
| 민주주의 판타지 (Democracy Fantasy) | Philosopher | 한국 정치/사회 → 판타지 재해석 |

### 축 3 — With-AI (제작 방식, 독립 모듈 아님)
```
공식: 프롬프트 공개 → AI 출력 → 페르소나 해설 = 영상 1편
5(페르소나) × 5(고교) × 4(KR Merit) = 100가지 교차 조합
소재 고갈 구조적 불가능
```

---

## 경로 구조 (확정)

```
/channel/philosopher/   ← 프로그램 페이지 (YouTube 연동)
/channel/blogger/
/channel/visualizer/
/channel/musician/
/channel/technician/

/category/{name}/       ← 기존 경로 유지 (리다이렉트 또는 동일 콘텐츠)
```

> CHANNEL-PAGES.md 스펙 기준. youtube.json siteUrl 업데이트 포함.

---

## 25프로그램 매트릭스
> SoT: `api/v1/programs.json`

| Persona | parksy.kr | eae.kr | dtslib | dtslib1k (고교) | dtslib2k (KR Merit) |
|---------|-----------|--------|--------|----------------|---------------------|
| Philosopher | /channel/philosopher/ | PnL/Philosophy | Digital Asset | 철학 | kr-merit-aggro |
| Blogger | /channel/blogger/ | MAL/Webappsbook | Idea Selling | 수학 | kr-merit-halfblood |
| Visualizer | /channel/visualizer/ | PenOn/Qsketch | Stock Investment | 사회 | kr-merit-shaman |
| Musician | /channel/musician/ | EML/Emotion | MRT/GenUnderstanding | 국어 | korean-parksy |
| Technician | /channel/technician/ | PatchTech/MinMix | Finance & Legal | 과학 | kr-merit-bluff |

---

## YouTube 루프백

```
YouTube 영상
  ↓ 설명란 링크 → /channel/{name}/
  ├── 인터랙티브 웹툰 (Tistory CDN embed)
  ├── 강의 자료 전문 (Tistory 초크보드)
  ├── BGM 플레이어 (Web Audio API)
  ├── AI 프롬프트 공개 (OrbitPrompt)
  ├── KR Merit 자가진단 (JS 인터랙션)
  └── 교과서 원문 vs AI 비교 뷰
  ↓ 재방문 → 구독
```

---

## Tistory 이중 역할

### CDN
```
parksy-image → Tistory 이미지 업로드 → /channel/visualizer/ embed
```

### 초크보드 → YouTube 워크플로우
```
[자동] Claude → 강의 원고 초안
[수동] Tistory 원고 + 이미지 업로드
[수동] Samsung Internet 전체화면 + 화면녹화 + 보이스오버
[수동] YouTube 업로드 (설명란 → /channel/{name}/ 링크)
[자동] GitHub Actions → youtube.json 갱신
[자동] /channel/{name}/ 페이지 자동 반영
```

---

## 로드맵

### Phase 0 ✅ 완료
- 랜딩 TV 가이드 (5채널 ALL ON AIR)
- 8→5 채널 통폐합 (Protocol/Orbit/Tester → Philosopher)
- B4 비밀번호 1126
- youtube.json verified/subscribers 필드
- 4도메인 Quartet
- api/v1/ JSON 3종 (programs / kr-merit / highschool)
- ARCHITECTURE-OVERVIEW.md (기술 명세)
- CHANNEL-PAGES.md (채널 페이지 빌드 스펙)

---

### Phase 1 — 채널 페이지 5개 생성 `[즉시]`

> CHANNEL-PAGES.md 템플릿 완성됨 → 바로 실행 가능

**1-A. `/channel/{name}/index.html` × 5개 생성**
- CAVE UI 기반 (cave-ui.css + broadcast-ui.css)
- 채널 히어로 + 프로그램 태그 + YouTube 구독 버튼 + 영상 플레이스홀더
- Back to Lobby 링크

**1-B. 경로 연결**
- index.html `.ch-row` href → `/channel/{name}/`
- youtube.json `siteUrl` → `https://parksy.kr/channel/{name}/`
- programs.json `home.url` → `/channel/{name}/`

**1-C. ARCHITECTURE-OVERVIEW.md 7채널 → 5채널 수정**
- 문서 내 "7채널" 언급 전부 5로 정정

---

### Phase 2 — B4 오피스 현황판 `[Phase 1 후]`

programs.json 읽어서 25슬롯 테이블 렌더링.
- 5×5 그리드
- 각 셀: 프로그램명 + 상태(active/planned) + 링크
- KR Merit 모듈 + 고교 과목 태그
- `chalkboardReady` 상태 표시

---

### Phase 3 — B3 Console PO 라우팅 완성 `[Phase 2 후]`

실제 작동하는 제작 명령:

```
PO 유형          → 스튜디오
─────────────────────────────
webtoon          → parksy-image
bgm              → parksy-audio + Lyria3
lecture-script   → Claude (자동)
lecture-video    → 초크보드 워크플로우 (수동)
short-clip       → dtslib-cloud-appstore
kr-merit-post    → dtslib2k 해당 계정
highschool-post  → dtslib1k 해당 계정
```

---

### Phase 4 — 채널 페이지 루프백 서비스 `[Phase 3 후]`

`/channel/{name}/` 인터랙션 구현:

| 서비스 | 구현 |
|--------|------|
| 인터랙티브 웹툰 | Tistory CDN iframe + JS |
| BGM 플레이어 | Web Audio API |
| 프롬프트 공개 | OrbitPrompt 연결 |
| KR Merit 자가진단 | 4모듈 JS 퀴즈 |
| 초크보드 뷰어 | Tistory embed |

---

### Phase 5 — 자동화 `[Phase 4 후]`

```
자동화 범위:
A. Claude → 강의 원고 초안 (OrbitPrompt 연동)
B. Tistory URL 갱신 → programs.json 업데이트
C. YouTube 업로드 감지 → youtube.json 갱신 (GitHub Actions)
D. programs.json 변경 → B4 현황판 자동 반영

수동 유지 (구조상 불가):
- 화면녹화 + 보이스오버
- YouTube 최종 업로드
- Tistory 편집/검토
```

---

## KPI

| 지표 | 3개월 | 6개월 | 12개월 |
|------|-------|-------|--------|
| 채널 페이지 가동 | 5/5 | 5/5 | 5/5 |
| YouTube 영상 | 25+ | 100+ | 300+ |
| Tistory 초크보드 | 25+ | 100+ | 300+ |
| 25프로그램 가동률 | 40% | 80% | 100% |
| KR Merit 모듈 완성 | 1 | 4 | 4 |
| 고교 과목 가동 | 1 | 5 | 5 |

---

## 문서 관리 원칙

| 파일 | 역할 | 상태 |
|------|------|------|
| DEV-PLAN-2026-03.md | 설계 원칙 + 로드맵 | ✅ 이 파일 |
| ARCHITECTURE-OVERVIEW.md | 기술 명세 (보안/비용/비교) | 7채널 수정 필요 |
| CHANNEL-PAGES.md | 채널 페이지 빌드 스펙 | ✅ Phase 1 실행 준비 |
| LANDING-REDESIGN.md | 랜딩 설계 원칙 | ✅ 완료 |
| api/v1/programs.json | 25프로그램 SoT | ✅ |
| api/v1/kr-merit.json | KR Merit 4모듈 SoT | ✅ |
| api/v1/highschool.json | 고교 5과목 SoT | ✅ |
| api/v1/youtube.json | YouTube 채널 SoT | siteUrl 업데이트 필요 |
| docs/00-architecture/persona-channel-mapping.md | 폐기 예정 → programs.json으로 통합 | ⚠️ |
