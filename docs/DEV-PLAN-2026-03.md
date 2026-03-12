# PARKSY Broadcasting — 개발 계획 v2.0
> 기준일: 2026-03-12  |  담당: dimas.thomas.sancho@gmail.com  |  엔진: Claude Code

---

## 비전

```
PARKSY Broadcasting =
  KR Merit 4모듈 × 5 Persona With-AI × YouTube 루프백
  + parksy.kr Mission Control (YouTube가 못 해주는 것)
```

**외국인이 한국을 이해하는 KR Merit 4모듈:**

| 모듈 | 컨셉 | 핵심 페르소나 |
|------|------|--------------|
| 허세교양 (Bluff Liberal Arts) | 아는 척하는 한국 교양문화 해부 | Philosopher |
| 하프블러드 어학 (Half-blood Language) | 한국어를 반쯤 아는 외국인 시점 | Blogger |
| 편집평가강박 (Edit Obsession) | 한국인의 완벽주의 편집 문화 | Visualizer + Technician |
| 민주주의 판타지 (Democracy Fantasy) | 한국 정치/사회를 판타지로 재해석 | Philosopher + Blogger |

**With-AI 원칙:** 모든 채널은 AI 100% 활용. 과정 자체가 콘텐츠.

---

## 전체 구조도

```
UPSTREAM STUDIOS
┌─────────────┬──────────────┬──────────────┬──────────────┐
│ parksy-image│ parksy-audio │ gohsy-fashion│ OrbitPrompt  │
│ 웹툰/CAD/선화│ BGM/Lyria3   │ 패션/렌더링  │ 프롬프트 관리 │
└──────┬──────┴──────┬───────┴──────┬───────┴──────┬───────┘
       │             │              │              │
       ▼             ▼              ▼              ▼
┌─────────────────────────────────────────────────────────┐
│              parksy.kr  MISSION CONTROL                  │
│  1F: TV Guide (공개)    B2: Studio Hub (스튜디오 연결)    │
│  B1: 채널 목록 (공개)   B3: Console (PO 발행/라우팅)      │
│                         B4: Office (25프로그램 현황판)    │
└──────────────────────┬──────────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
 YouTube 5채널    Tistory 25개    4 Domains
 (광고 수익)      (CDN + 초크보드) (SEO/브랜드)
```

### Tistory 역할 (핵심)

```
Tistory = 웹툰 CDN + YouTube 강의 초크보드

① CDN: parksy-image 웹툰 → Tistory 호스팅 → 전 도메인 embed
② 초크보드: 티스토리 글이 YouTube 영상의 판서/슬라이드 역할
   카메라: 티스토리 화면 + 강의 오버레이 → YouTube 업로드
③ 루프백: YouTube 시청자 → Tistory 글 클릭 → parksy.kr 체험
```

### YouTube 루프백 구조

```
YouTube 영상
  ↓ (설명란 링크)
parksy.kr 채널 페이지
  ↓ (YouTube가 못 해주는 서비스)
  ├── 인터랙티브 웹툰 뷰어 (Tistory CDN → embed)
  ├── BGM 플레이어 (Musician 채널)
  ├── 초크보드 강의 자료 (Tistory 글 embed)
  ├── With-AI 프롬프트 공개 (OrbitPrompt 연결)
  └── B3 Console → 시청자가 PO 요청 가능 (팬 참여)
  ↓
재방문 / 구독 / 알림
```

---

## 5 Persona × 5 Account = 25 프로그램 매트릭스

| Persona | parksy.kr | eae.kr | dtslib | dtslib1k | dtslib2k (KR Merit) |
|---------|-----------|--------|--------|----------|---------------------|
| Philosopher | Philosopher | PnL/Philosophy | Digital Asset | Philosophy | **kr-merit-aggro** (민주주의판타지) |
| Blogger | Blogger | MAL/Webappsbook | Idea Selling | Math | **kr-merit-halfblood** (하프블러드) |
| Visualizer | Visualizer | PenOn/Qsketch | Stock Investment | Social Studies | **kr-merit-shaman** (편집강박) |
| Musician | Musician | EML/Emotion | MRT/GenUnderstanding | Language | **korean-parksy** (어학음악) |
| Technician | Technician | PatchTech/MinMix | Finance & Legal | Science | **kr-merit-bluff** (허세교양) |

> dtslib2k = KR Merit 웹툰 시리즈 전진기지

---

## 개발 로드맵

### Phase 0 — 현재 완료 ✅

- [x] 랜딩 페이지 TV 가이드 스타일 (5채널 ALL ON AIR)
- [x] 8→5 채널 통폐합 (Protocol/Orbit/Tester → Philosopher)
- [x] B4 비밀번호 1126
- [x] youtube.json verified/subscribers 필드
- [x] CAVE UI + Elevator 5층 구조
- [x] cave-particles.js
- [x] 4도메인 Quartet 연결

---

### Phase 1 — Mission Control 데이터 척추 `[2026-03]`

**목표:** parksy.kr이 25개 프로그램을 실제로 알고 있는 상태

#### 1-A. `api/v1/programs.json` 생성

```json
{
  "matrix": {
    "philosopher": {
      "home": "parksy.kr/Philosopher",
      "programs": [
        { "account": "eae.kr", "name": "PnL/Philosophy", "url": "...", "status": "active" },
        { "account": "dtslib", "name": "Digital Asset", "url": "...", "status": "active" },
        { "account": "dtslib1k", "name": "Philosophy", "url": "...", "status": "active" },
        { "account": "dtslib2k", "name": "kr-merit-aggro", "url": "...", "krMerit": "democracy-fantasy" }
      ]
    }
    // ... 5 personas
  }
}
```

#### 1-B. `api/v1/kr-merit.json` 생성

```json
{
  "modules": {
    "bluff": { "name": "허세교양", "persona": "technician", "tistory": "kr-merit-bluff", "youtube": "..." },
    "halfblood": { "name": "하프블러드 어학", "persona": "blogger", "tistory": "kr-merit-halfblood" },
    "edit-obsession": { "name": "편집평가강박", "persona": "visualizer", "tistory": "kr-merit-shaman" },
    "democracy-fantasy": { "name": "민주주의 판타지", "persona": "philosopher", "tistory": "kr-merit-aggro" }
  }
}
```

#### 1-C. B4 오피스 — 25프로그램 현황판

- 5×5 그리드 테이블 (Persona × Account)
- 각 셀: 프로그램명 + 최근 업데이트 + YouTube 링크
- KR Merit 모듈 표시

---

### Phase 2 — Tistory CDN + 초크보드 파이프라인 `[2026-04]`

**목표:** Tistory를 진짜 CDN + 강의 초크보드로 활용

#### 2-A. 웹툰 CDN 파이프라인

```
parksy-image (웹툰 제작)
  → Tistory 글 업로드 (이미지 호스팅)
  → parksy.kr/category/Visualizer 에 embed
  → YouTube 썸네일/스틸컷 연동
```

스크립트: `tools/tistory-cdn-sync.sh`

#### 2-B. 초크보드 → YouTube 워크플로우

```
1. Tistory에 강의 자료 작성 (텍스트 + 웹툰 이미지)
2. Samsung Internet에서 전체화면
3. 화면 녹화 + 보이스오버
4. YouTube 업로드 (설명란 → Tistory 글 링크)
5. parksy.kr 채널 페이지에 embed
```

템플릿: `docs/chalkboard-template.md`

#### 2-C. KR Merit 웹툰 시리즈

- dtslib2k 5개 계정이 각 KR Merit 모듈의 웹툰 시리즈
- parksy-image → Tistory CDN → dtslib2k 티스토리
- parksy.kr에서 통합 뷰어 제공 (YouTube가 못 해주는 것)

---

### Phase 3 — B3 Console PO 시스템 완성 `[2026-04~05]`

**목표:** B3에서 실제로 콘텐츠 제작 명령 발행 가능

#### 3-A. PO 라우팅 테이블

```
PO 유형          → 담당 스튜디오
────────────────────────────────
webtoon          → parksy-image
bgm              → parksy-audio + Lyria3
fashion-render   → gohsy-fashion
lecture-video    → Tistory 초크보드 워크플로우
short-clip       → dtslib-cloud-appstore (lecture-shorts)
with-ai-post     → Claude + Blogger 파이프라인
```

#### 3-B. PO → GitHub Issue 자동 생성

- B3 Console에서 PO 작성
- → 해당 upstream 레포에 GitHub Issue 자동 발행
- → 작업 완료 시 parksy.kr programs.json 자동 업데이트

---

### Phase 4 — YouTube 루프백 서비스 `[2026-05~06]`

**목표:** YouTube가 못 해주는 것을 parksy.kr에서 제공

| 서비스 | YouTube 불가 이유 | parksy.kr 구현 |
|--------|------------------|----------------|
| 인터랙티브 웹툰 | 정적 영상만 가능 | Tistory CDN embed + 인터랙션 |
| BGM 플레이어 | 배경음악 재생 불가 | Web Audio API |
| 프롬프트 공개 | 영상 설명란 한계 | OrbitPrompt 연결 뷰어 |
| With-AI 과정 공개 | 메타데이터 없음 | 제작 과정 타임라인 |
| KR Merit 자가진단 | 없음 | 4모듈 인터랙티브 퀴즈 |
| 팬 PO 요청 | 없음 | B3 Console 경량 공개 버전 |

---

### Phase 5 — 자동화 루프 `[2026-06+]`

```
콘텐츠 생산 자동화 루프:

1. OrbitPrompt → 프롬프트 생성
2. parksy-image → 웹툰/이미지 생성
3. parksy-audio → BGM 생성
4. Tistory CDN → 자료 업로드
5. YouTube → 영상 업로드
6. youtube.json → 자동 갱신 (GitHub Actions)
7. parksy.kr 채널 페이지 → 자동 업데이트
8. 시청자 → parksy.kr 방문 → 루프백 1로
```

---

## KPI

| 지표 | 현재 | 3개월 | 6개월 |
|------|------|-------|-------|
| YouTube 채널 수 | 5 | 5 | 5 |
| 총 업로드 영상 | 0 | 25+ | 100+ |
| 25프로그램 가동률 | 0% | 40% | 80% |
| Tistory CDN 활용 | 0 | 5채널 | 25개 |
| KR Merit 웹툰 | 0 | 1모듈 | 4모듈 |
| parksy.kr 월 방문 | - | 1,000 | 10,000 |

---

## 기술 스택 원칙

- **parksy.kr**: 순수 HTML/CSS/JS (빌드 도구 없음)
- **API**: JSON 파일 기반 (서버 없음, GitHub Pages)
- **자동화**: GitHub Actions
- **CDN**: Tistory (무료, 이미 보유)
- **AI**: Claude (텍스트), Lyria3 (음악), parksy-image 엔진 (시각)
- **비용**: ₩0 (모든 무료 인프라 활용)

---

## 다음 즉시 실행 항목

1. `api/v1/programs.json` 생성 — 25프로그램 매트릭스 데이터화
2. `api/v1/kr-merit.json` 생성 — KR Merit 4모듈 정의
3. B4 오피스 현황판 HTML 작성
4. Tistory CDN URL 실제 입력 (현재 null)
5. B3 Console PO 라우팅 테이블 실제 연결

