# CLAUDE.md — parksy.kr


---

## Browser Runtime

> Parksy OS 2+2 매트릭스 — 이 레포 전담 브라우저

| 항목 | 값 |
|------|-----|
| **브라우저** | Samsung Internet |
| **이유** | 한국어 지식 아카이브 — 백그라운드 재생, AI 요약 |
| **URL** | https://parksy.kr |

---

## PENDING — Tistory Blog Subdomains (리마인더)

> PC 작업 후 Claude in Chrome으로 확인 예정

B2/B3 노드 그래프가 현재 계정 루트 URL로 연결돼 있음.
개별 블로그 서브도메인 확인되면 `design/elevator-system.js` 상단의 `TISTORY` 오브젝트만 업데이트하면 됨:

```javascript
// design/elevator-system.js → TISTORY 오브젝트
var TISTORY = {
  dm:  'https://[서브도메인].tistory.com', // KR Merit-사면민주주의  (dtslib2k)
  eo:  'https://[서브도메인].tistory.com', // KR Merit-편집강박어그로 (dtslib2k)
  hb:  'https://[서브도메인].tistory.com', // KR Merit-하프블러드 어학 (dtslib2k)
  ba:  'https://[서브도메인].tistory.com', // KR Merit-허세교양       (dtslib2k)
  hsp: 'https://[서브도메인].tistory.com', // 중년고딩철학            (dtslib1k)
  hsm: 'https://[서브도메인].tistory.com', // 중년고딩수학            (dtslib1k)
  hss: 'https://[서브도메인].tistory.com', // 중년고딩사회            (dtslib1k)
  hsk: 'https://[서브도메인].tistory.com', // KR Merit x KR reading material (dtslib1k)
  hsc: 'https://[서브도메인].tistory.com', // 중년고딩과학            (dtslib1k)
};
```

확인해야 할 계정:
- `dtslib2k@kakao.com` → 4개 KR Merit 블로그 서브도메인
- `dtslib1k@kakao.com` → 5개 HS Curriculum 블로그 서브도메인

확인 방법: 각 Tistory 블로그 관리 → 블로그 주소 확인

