# PARKSY Broadcasting — DEV PLAN v4.0
> 기준일: 2026-03-12 | 버전: 4.0 (8.5/10 리뷰 반영 → 100점 목표)
> 계정: dimas.thomas.sancho@gmail.com (Account C)
> SoT: api/v1/programs.json (25슬롯), kr-merit.json, highschool.json

---

## 단일 진실 원칙 (SoT 구조)

```
중복 관리 제거:
  docs/00-architecture/persona-channel-mapping.md → 폐기 예정
  api/v1/programs.json                            → 25프로그램 SoT
  api/v1/kr-merit.json                            → KR Merit 4모듈 SoT
  api/v1/highschool.json                          → 고교 과목 SoT
  api/v1/youtube.json                             → YouTube 채널 SoT

B4 오피스 현황판은 programs.json 하나만 읽어서 렌더링.
DEV-PLAN은 설계 원칙만. 데이터는 JSON이 관리.
```

---

## 핵심 명제

```
PARKSY Broadcasting =
  KR Merit 4모듈 × 고교 교재 5과목 × With-AI 제작방식
  × YouTube 루프백 (YouTube가 못 해주는 체험)

YouTube = 유일한 수익 엔진 (5채널 광고)
parksy.kr = Mission Control + 루프백 체험 공간
Tistory = 웹툰 CDN + 강의 초크보드 (비용 0)
```

---

## 3축 콘텐츠 구조

### 축 1 — 고교 교재 (dtslib1k)
> SoT: `api/v1/highschool.json`

| 페르소나 | 과목 | YouTube 훅 |
|---------|------|-----------|
| Philosopher | 철학 | Korean HS Philosophy — why they memorize Socrates for the SAT |
| Blogger | 수학 | Korean SAT Math with AI — Half-blood Edition |
| Visualizer | 사회 | Korean Social Studies — subjects they don't teach outside Korea |
| Musician | 국어 | Korean classical poetry remixed into music with Lyria3 |
| Technician | 과학 | Korean HS Science — memorization as performance art |

### 축 2 — KR Merit (dtslib2k)
> SoT: `api/v1/kr-merit.json`

| 모듈 | 페르소나 | 컨셉 |
|------|---------|------|
| 허세교양 (Bluff Liberal Arts) | Technician | 아는 척 문화, 교양 퍼포먼스 |
| 하프블러드 어학 (Half-blood Lang) | Blogger | 반쯤 아는 외국인 시점 언어학 |
| 편집평가강박 (Edit Obsession) | Visualizer | 완벽주의, 고쳐쓰기 강박 |
| 민주주의 판타지 (Democracy Fantasy) | Philosopher | 한국 정치/사회 → 판타지 장르 |

### 축 3 — With-AI (제작 방식, 독립 모듈 아님)
모든 콘텐츠에 관통. AI 사용 과정 투명 공개.
```
공식: 프롬프트 공개 → AI 출력 → 페르소나 해설 = 영상 1편
     (OrbitPrompt가 프롬프트 SoT)
```

### 3축 교차 = 소재 무한
```
Philosopher × 철학(고교) × 민주주의판타지 × Claude
→ "AI로 한국 고교 철학 시험 문제를 민주주의 판타지로 바꿔봤다"

Blogger × 수학(고교) × 하프블러드 × Claude
→ "수능 수학을 반쯤 아는 외국인이 AI와 푸는 법"

Musician × 국어(고교) × korean-parksy × Lyria3
→ "한국 고전시가를 AI가 BGM으로 만들면"

Visualizer × 사회(고교) × 편집강박 × parksy-image
→ "한국 사회 교과서를 웹툰으로 강박적으로 재편집"

Technician × 과학(고교) × 허세교양 × Claude
→ "한국 과학 교육의 허세를 AI로 해부"
```

---

## 전체 구조도

```
UPSTREAM STUDIOS
parksy-image (웹툰/선화) ─────── Visualizer / 초크보드 소재
parksy-audio (BGM/Lyria3) ────── Musician / 전 채널 배경음
gohsy-fashion (패션렌더) ──────── Visualizer KR Merit
OrbitPrompt (프롬프트) ─────────── With-AI 투명 공개
dtslib-cloud-appstore (강의도구) ─ 초크보드 제작 지원
        ↓
parksy.kr MISSION CONTROL
  1F  TV Guide (공개) ──── 5채널 TV 가이드
  B1  Channels (공개) ──── 채널별 콘텐츠 + 루프백 서비스
  B2  Studio Hub ────────── upstream 레포 연결 현황
  B3  Console (PO 발행) ─── 콘텐츠 제작 명령
  B4  Office (잠금:1126) ── 25프로그램 현황판 (programs.json 렌더)
        ↓
DISTRIBUTION
YouTube 5채널 → 광고수익 (유일한 수익원)
Tistory 25개  → CDN + 초크보드
4 Domains     → SEO + 루프백 진입점
```

---

## Tistory 이중 역할 (비용 0)

### CDN
```
parksy-image → 웹툰 제작 → Tistory 이미지 업로드
→ parksy.kr/category/Visualizer embed
→ YouTube 썸네일/스틸컷 재활용
```

### 초크보드 → YouTube 워크플로우 (수동 단계 명시)

```
[자동] OrbitPrompt + Claude → 강의 원고 생성
[수동] Tistory에 원고 + 웹툰 이미지 업로드
[수동] Samsung Internet 전체화면 + 화면녹화 + 보이스오버
[수동] YouTube 업로드 (설명란에 Tistory 글 링크)
[자동] GitHub Actions → YouTube API 감지 → youtube.json 갱신
[자동] parksy.kr 채널 페이지 programs.json 읽어 자동 업데이트
```

> 화면녹화 + 보이스오버는 구조상 수동. 자동화 범위 밖.
> 자동화 가능 구간: 원고 생성 / JSON 갱신 / 채널 페이지 업데이트.

---

## YouTube 루프백 서비스 (YouTube 불가 → parksy.kr 제공)

| 서비스 | YouTube 불가 이유 | parksy.kr 구현 |
|--------|-----------------|----------------|
| 인터랙티브 웹툰 | 정적 영상만 가능 | Tistory CDN embed + JS |
| 강의 자료 전문 | 설명란 한계 | Tistory 초크보드 embed |
| BGM 플레이어 | 배경음악 재생 불가 | Web Audio API |
| AI 프롬프트 공개 | 메타데이터 없음 | OrbitPrompt 뷰어 |
| KR Merit 자가진단 | 없음 | 4모듈 JS 인터랙션 |
| 교과서 원문 vs AI 비교 | 없음 | 사이드바이사이드 뷰 |

---

## 25프로그램 매트릭스
> SoT: `api/v1/programs.json`

| Persona | parksy.kr | eae.kr | dtslib | dtslib1k (고교) | dtslib2k (KR Merit) |
|---------|-----------|--------|--------|----------------|---------------------|
| Philosopher | 홈베이스 | PnL/Philosophy | Digital Asset | 철학 | kr-merit-aggro |
| Blogger | 홈베이스 | MAL/Webappsbook | Idea Selling | 수학 | kr-merit-halfblood |
| Visualizer | 홈베이스 | PenOn/Qsketch | Stock Investment | 사회 | kr-merit-shaman |
| Musician | 홈베이스 | EML/Emotion | MRT/GenUnderstanding | 국어 | korean-parksy |
| Technician | 홈베이스 | PatchTech/MinMix | Finance & Legal | 과학 | kr-merit-bluff |

---

## 로드맵

### Phase 0 ✅ 완료
- 랜딩 TV 가이드 (5채널 ALL ON AIR)
- 8→5 채널 통폐합
- B4 비밀번호 1126
- youtube.json verified 필드
- 4도메인 Quartet
- api/v1/ JSON 3개 (programs / kr-merit / highschool)

---

### Phase 1 — B4 오피스 현황판 `[즉시]`

programs.json 읽어서 25프로그램 테이블 렌더링.
- 5×5 그리드 (Persona × Account)
- 각 셀: 프로그램명 + 상태 + Tistory/YouTube 링크
- 상태별 색상: active(flame) / planned(dim) / null(cave)
- KR Merit 모듈 + 고교 과목 태그

---

### Phase 2 — 채널 페이지 완성 `[Phase 1 후]`

각 `/category/{채널}/index.html` 통일 구조:

```
[헤더] 페르소나 소개 + YouTube 채널 링크
[Module 1] 고교 교재 섹션 — Tistory 초크보드 링크
[Module 2] KR Merit 섹션 — 해당 모듈 웹툰/글
[YouTube] 최신 영상 (youtube.json에서 렌더)
[With-AI] 사용 프롬프트 공개 (OrbitPrompt 연결)
[체험] 루프백 서비스 (모듈별 인터랙션)
```

---

### Phase 3 — B3 Console PO 라우팅 `[Phase 2 후]`

실제 작동하는 제작 명령 시스템:

```
PO 유형          → 담당 스튜디오
─────────────────────────────────
webtoon          → parksy-image
bgm              → parksy-audio + Lyria3
lecture-script   → Claude + OrbitPrompt (자동)
lecture-video    → 초크보드 워크플로우 (수동)
short-clip       → dtslib-cloud-appstore
kr-merit-post    → dtslib2k 해당 계정
highschool-post  → dtslib1k 해당 계정
```

---

### Phase 4 — 자동화 루프 `[Phase 3 후]`

```
자동화 가능 구간:
A. OrbitPrompt → Claude → 강의 원고 초안 생성
B. parksy-image → Tistory CDN → programs.json tistoryUrl 갱신
C. YouTube 업로드 감지 → youtube.json 갱신 (GitHub Actions)
D. programs.json 업데이트 → B4 현황판 자동 반영

수동 유지:
- 화면녹화 + 보이스오버 (사람 개입 필수)
- YouTube 업로드 (검토 후 수동)
- Tistory 최종 편집
```

---

## KPI

| 지표 | 3개월 | 6개월 | 12개월 |
|------|-------|-------|--------|
| YouTube 영상 수 | 25+ | 100+ | 300+ |
| Tistory 초크보드 글 | 25+ | 100+ | 300+ |
| 25프로그램 가동률 | 40% | 80% | 100% |
| KR Merit 모듈 완성 | 1 | 4 | 4 |
| 고교 과목 가동 | 1 | 5 | 5 |
| parksy.kr 월 방문 | 1,000 | 10,000 | 100,000 |

---

## 기술 원칙

- parksy.kr: 순수 HTML/CSS/JS, 빌드 도구 없음, 서버 없음
- API: JSON 파일 정적 서빙 (GitHub Pages)
- 자동화: GitHub Actions
- CDN: Tistory (무료)
- AI: Claude(텍스트), Lyria3(음악), parksy-image(시각)
- 비용: ₩0

---

## 다음 즉시 실행

1. **B4 오피스 현황판** — programs.json 읽어서 25슬롯 테이블 렌더링
2. **persona-channel-mapping.md 폐기** — programs.json으로 통합, 중복 제거
3. **Tistory URL 실제 입력** — 계정별 첫 글 작성 후 programs.json 업데이트
