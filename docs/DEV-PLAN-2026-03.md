# parksy.kr 개발 계획 — 2026-03

> 상태: 시운전 중 (Phase 0 완료, Phase 1 진행)
> 기준일: 2026-03-12
> 채널: 5개 전부 LIVE (YouTube 운영)

---

## 현재 상태 점검

| 항목 | 상태 | 비고 |
|------|------|------|
| 랜딩 페이지 | ✅ TV 가이드 스타일 완료 | 5채널 ALL ON AIR |
| 채널 통폐합 | ✅ 8→5 완료 | Protocol/Orbit → Philosopher |
| B4 비밀번호 | ✅ 1126 세팅 | date format 힌트 |
| youtube.json | ✅ verified/subscribers 필드 추가 | Musician 1구독자 실측 |
| Quartet 연결 | ✅ 4도메인 모두 표시 | parksy/dtslib/eae/eae-univ |
| cave-particles.js | ✅ 완료 | 1F 로비 파티클 |
| channelId | ❌ 미입력 | YouTube Studio에서 직접 확인 필요 |

---

## Phase 1 — 채널 페이지 정비 (다음)

### 우선순위 순

**P1. 각 채널 category/index.html 통일**
- 현재: 채널마다 디자인 제각각
- 목표: CAVE UI 통일, 채널 색상 구분
- 대상: Philosopher / Blogger / Visualizer / Musician / Technician

**P2. channelId 실제 입력**
- YouTube Studio → 채널 URL에서 채널 ID 추출
- api/v1/youtube.json 업데이트
- 자동 구독자 카운트 연동 가능해짐

**P3. 각 채널 콘텐츠 목록 페이지**
- 현재 글 목록이 수동 HTML
- videos[] 배열 활용한 동적 렌더링

---

## Phase 2 — B4 오피스 활성화

- **Strategy Board**: 채널별 콘텐츠 전략 문서
- **Production Queue**: 제작 예정 콘텐츠 목록
- **Analytics**: 채널별 조회수/구독자 추적
- **Manifest**: youtube.json 실시간 뷰어

---

## Phase 3 — 4도메인 크로스 연결

| 도메인 | 역할 | 연결 |
|--------|------|------|
| parksy.kr | Raw / 페르소나 | YouTube 5채널 |
| dtslib.kr | Biz / Economy | 비즈니스 레이어 |
| eae.kr | Education / MDX | 교육 콘텐츠 |
| eae-univ | Academy / Hub | 대학 구조 |

- 각 도메인 Quartet 그리드 동기화 (현재 각자 수동)
- 크로스 링크 자동화 스크립트

---

## Phase 4 — YouTube 자동화

- GitHub Actions: 채널 구독자/영상 수 자동 업데이트
- youtube.json → 랜딩 페이지 실시간 반영
- 영상 업로드 → 채널 페이지 자동 추가

---

## 보류 / 안 할 것

- ~~Protocol-Parksy 채널 복원~~ (Philosopher로 통폐합 확정)
- ~~Orbit-Log 채널 복원~~ (Philosopher로 통폐합 확정)
- ~~Archive 카드~~ (랜딩에서 제거 확정)
- ~~STANDBY 상태~~ (전 채널 LIVE 운영)
