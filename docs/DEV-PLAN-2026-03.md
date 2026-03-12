# PARKSY Broadcasting — DEV PLAN v3.0
> 기준일: 2026-03-12 | 상태: Phase 0 완료, Phase 1 착수
> 계정: dimas.thomas.sancho@gmail.com (Account C)

---

## 핵심 명제

```
외국인이 한국을 이해하는 가장 빠른 경로:
  한국 고교 교실 + 한국인 기질(KR Merit) + AI가 다 해줌

YouTube = 유일한 수익 엔진 (5채널 광고)
parksy.kr = YouTube가 못 해주는 체험 공간 + Mission Control
Tistory = 웹툰 CDN + 강의 초크보드 (비용 0)
```

---

## 콘텐츠 3축

### 축 1 — 고교 교재 (dtslib1k)
한국 고등학교 교육과정. 외국에서 이미 유명한 "Korean education intensity"
수능/내신 체계를 AI와 함께 해체.

| 페르소나 | 과목 | YouTube 훅 |
|---------|------|------------|
| Philosopher | 철학 | "Korean HS Philosophy — why we memorize Socrates" |
| Blogger | 수학 | "Korean SAT Math, explained by AI to a half-foreigner" |
| Visualizer | 사회 | "Korean Social Studies — the subjects they don't teach outside Korea" |
| Musician | 언어(국어) | "Korean Literature class, remixed into music" |
| Technician | 과학 | "Korean HS Science — memorization as performance art" |

### 축 2 — KR Merit (dtslib2k)
한국인 기질 4종. 외국인이 한국인을 이해 못 하는 이유를 모듈화.

| 모듈 | 핵심 페르소나 | 컨셉 |
|------|-------------|------|
| 허세교양 (Bluff Liberal Arts) | Technician | 아는 척 문화, 교양 퍼포먼스 |
| 하프블러드 어학 (Half-blood Lang) | Blogger | 한국어를 반쯤 아는 시점의 언어학 |
| 편집평가강박 (Edit Obsession) | Visualizer | 완벽주의, 고쳐쓰기 문화 |
| 민주주의 판타지 (Democracy Fantasy) | Philosopher | 한국 정치/사회를 판타지로 재해석 |

### 축 3 — With-AI (전 채널 관통)
독립 모듈이 아닌 **제작 방식**. 모든 콘텐츠에 AI 과정 투명 공개.

```
공식: 프롬프트 공개 → AI 출력 → 페르소나 해설 = 영상 1편
"AI한테 이걸 시켜봤다" = 세 번째 레이어가 매번 새 각도를 만든다
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

Technician × 과학(고교) × 허세교양 × With-AI
→ "한국 과학 교육의 허세를 AI로 해부"
```

---

## 전체 구조도

```
UPSTREAM STUDIOS
parksy-image (웹툰/선화) → Visualizer / 초크보드 소재
parksy-audio (BGM/Lyria3) → Musician / 모든 채널 배경음
gohsy-fashion (패션렌더) → Visualizer KR Merit
OrbitPrompt (프롬프트) → With-AI 투명 공개
dtslib-cloud-appstore (강의도구) → 초크보드 제작
        ↓
parksy.kr MISSION CONTROL
  1F  TV Guide (공개) ─────────── 5채널 TV 가이드
  B1  Channels (공개) ─────────── 채널별 콘텐츠 목록
  B2  Studio Hub ──────────────── upstream 연결 현황
  B3  Console (PO 발행) ────────── 콘텐츠 제작 명령
  B4  Office (잠금:1126) ────────── 25프로그램 현황판
        ↓
DISTRIBUTION
YouTube 5채널 → 광고수익 (유일한 수익원)
Tistory 25개  → CDN + 초크보드 소재
4 Domains     → SEO + 루프백 진입점
```

---

## Tistory 이중 역할 (비용 0 인프라)

### CDN으로
```
parksy-image 웹툰 제작
  → Tistory 이미지 업로드 (무료 호스팅)
  → parksy.kr/category/Visualizer embed
  → YouTube 썸네일/스틸컷
```

### 초크보드로
```
Tistory에 강의 자료 작성 (텍스트 + 웹툰 이미지)
  → Samsung Internet 전체화면
  → 화면녹화 + 보이스오버
  → YouTube 업로드 (설명란 → Tistory 글 링크)
  → parksy.kr 채널 페이지에 embed
```

---

## YouTube 루프백 (YouTube가 못 해주는 것)

```
YouTube 영상 시청
  ↓ 설명란 링크
parksy.kr 채널 페이지
  ├── 인터랙티브 웹툰 뷰어 (Tistory CDN embed)
  ├── 강의 초크보드 전문 (Tistory 글)
  ├── BGM 플레이어 (Musician 채널 Web Audio)
  ├── 사용한 AI 프롬프트 전문 공개 (OrbitPrompt)
  ├── KR Merit 자가진단 (4모듈 인터랙션)
  └── 교과서 원문 vs AI 해석 나란히 보기
  ↓
재방문 → 구독 → 알림
```

---

## 로드맵

### Phase 0 ✅ 완료
- 랜딩 TV 가이드 (5채널 ALL ON AIR)
- 8→5 채널 통폐합
- B4 비밀번호 1126
- youtube.json verified 필드
- 4도메인 Quartet

---

### Phase 1 — 데이터 척추 `[즉시]`

**25프로그램 + 3축 전부 JSON으로 정의**

`api/v1/programs.json` — 5×5 매트릭스
`api/v1/kr-merit.json` — KR Merit 4모듈
`api/v1/highschool.json` — 고교 5과목

B4 오피스 현황판:
- 25개 슬롯 테이블 (Persona × Account)
- 각 셀: 프로그램명 + Tistory URL + YouTube URL + 상태
- KR Merit 모듈 매핑 표시
- 고교 과목 매핑 표시

---

### Phase 2 — 채널 페이지 완성 `[Phase 1 후]`

각 `/category/{채널}/index.html` 통일:

```
[채널 헤더] — 페르소나 소개
[Module 1] 고교 교재 섹션 — Tistory 초크보드 링크
[Module 2] KR Merit 섹션 — 해당 모듈 웹툰/글
[YouTube] 최신 영상 embed
[With-AI] 사용한 프롬프트 공개
[체험] YouTube가 못 해주는 인터랙션
```

---

### Phase 3 — B3 Console PO 시스템 `[Phase 2 후]`

실제 작동하는 제작 명령 시스템:

```
PO 유형          → 담당 스튜디오
────────────────────────────────────
webtoon          → parksy-image
bgm              → parksy-audio + Lyria3
lecture-video    → Tistory 초크보드 워크플로우
short-clip       → dtslib-cloud-appstore
with-ai-post     → Claude + 해당 Tistory 계정
kr-merit-post    → dtslib2k 해당 계정
highschool-post  → dtslib1k 해당 계정
```

PO 발행 → GitHub Issue 자동 생성 → upstream 레포 연결

---

### Phase 4 — YouTube 루프백 서비스 `[Phase 3 후]`

채널 페이지 인터랙션 구현:

| 서비스 | 구현 방식 |
|--------|----------|
| 인터랙티브 웹툰 | Tistory CDN embed + JS 인터랙션 |
| BGM 플레이어 | Web Audio API (Lyria3 파일) |
| 프롬프트 공개 | OrbitPrompt 연결 |
| KR Merit 자가진단 | 4모듈 JS 퀴즈 |
| 초크보드 뷰어 | Tistory iframe embed |
| 교과서 비교 | 원문 vs AI 해석 사이드바이사이드 |

---

### Phase 5 — 자동화 루프 `[Phase 4 후]`

```
콘텐츠 생산 자동화:

1. OrbitPrompt → 프롬프트 생성
2. Claude → 고교/KR Merit 원고 초안
3. parksy-image → 웹툰 이미지
4. parksy-audio → BGM
5. Tistory → 초크보드 글 업로드
6. 화면녹화 → YouTube 업로드
7. GitHub Actions → youtube.json 갱신
8. parksy.kr 채널 페이지 → 자동 업데이트
9. 시청자 → parksy.kr 루프백 → 1번으로
```

---

## 5 Persona × 5 Account 전체 매트릭스

| Persona | parksy.kr | eae.kr | dtslib | dtslib1k (고교) | dtslib2k (KR Merit) |
|---------|-----------|--------|--------|----------------|---------------------|
| Philosopher | 홈베이스 | PnL/Philosophy | Digital Asset | 철학 | kr-merit-aggro |
| Blogger | 홈베이스 | MAL/Webappsbook | Idea Selling | 수학 | kr-merit-halfblood |
| Visualizer | 홈베이스 | PenOn/Qsketch | Stock Investment | 사회 | kr-merit-shaman |
| Musician | 홈베이스 | EML/Emotion | MRT/GenUnderstanding | 국어 | korean-parksy |
| Technician | 홈베이스 | PatchTech/MinMix | Finance & Legal | 과학 | kr-merit-bluff |

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

- parksy.kr: 순수 HTML/CSS/JS (빌드 도구 없음, 서버 없음)
- API: JSON 파일 (GitHub Pages 정적 서빙)
- 자동화: GitHub Actions
- CDN: Tistory (무료)
- AI: Claude(텍스트), Lyria3(음악), parksy-image(시각)
- 비용: ₩0

---

## 즉시 실행 (다음 세션)

1. `api/v1/highschool.json` — 5과목 정의
2. `api/v1/kr-merit.json` — 4모듈 정의
3. `api/v1/programs.json` — 25슬롯 전체 매트릭스
4. B4 오피스 현황판 HTML
5. Tistory 실제 URL 입력 (계정별 첫 글 작성 후)
