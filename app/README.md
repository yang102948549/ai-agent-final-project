# 다른 곳의 하루 · 선택별 장면 분기 수정판

- **대상 사용자** — 중학교 도덕 「지구촌 문제」 수업에서 휴대폰·태블릿으로 참여하는 학생과 수업을 진행하는 교사
- **해결할 수업 문제** — 원본은 아침·낮·저녁 세 장면이 고정되어 있어 어떤 선택을 해도 같은 다음 장면으로 넘어간다. 학생의 선택이 이후의 삶을 실제로 바꾸는 경험이 약하다.
- **시연할 핵심 동작** — 같은 인물의 아침에서 서로 다른 선택을 하면 서로 다른 낮 장면과 저녁 장면이 이어진다.
- **장면 갈래** — `dist/scenarios.js`에서 낮 칸을 `[아침 A 뒤, 아침 B 뒤]`, 저녁 칸을 `[AA, AB, BA, BB]` 배열로 쓰면 선택에 따라 다른 장면이 나온다. 배열이 아닌 인물은 원본처럼 동작한다. 지금은 투발루 시오네가 나뉘어 있다.
- **배포 주소** — 기존 수업용 사이트 https://onischool.net/anotherday/ 를 그대로 사용한다.

## 출처

원본 [global-life-simulator](https://github.com/yang102948549/global-life-simulator)의 `main` 브랜치 `5f5f7b9`(2026-11-12)에서 가져왔다. 배포 사이트의 `anotherday/` 복사본과 비교해 줄바꿈과 캐시용 `?v=` 해시 외에는 차이가 없음을 확인했다. 원본 설명은 [ORIGINAL_README.md](ORIGINAL_README.md), 인계 문서는 [HANDOFF.md](HANDOFF.md)에 있다. 공개 저장소에 맞게 인계 문서의 이메일과 계정명은 가렸다.

| 경로 | 내용 |
|---|---|
| `dist/` | 배포되는 앱 전체. `scenarios.js`(대본), `precomputed.js`(미리 만든 브리핑·첫머리), `app.js`(화면·진행), `ai.js`(Gemini 대화) |
| `validate.cjs` | 시나리오와 문법 검사 |
| `precompute.cjs` | 선택별 브리핑과 첫머리를 onischool 서버의 Gemini로 미리 생성 |
| `sync-onischool.cjs` | `dist/`를 onischool 사이트 저장소의 `anotherday/`로 복사 |
| `relay/` | 학교망용 Gemini 중계 Cloudflare Worker |
| `design/scenario-branches.md` | 시나리오 분기 정리 문서(맨 위 검토 메모는 `design/scenario-review-notes.md`) |
| `tools/capture.mjs` | 데스크톱(1440×900)·모바일(390×844, 2배율) 화면 증거 촬영 |

## 로컬 실행과 검증

```bash
cd app
npm install                 # 화면 촬영 도구(Playwright)
npm run validate            # 시나리오·문법 검사
npm run serve               # http://127.0.0.1:4173
node tools/branch-flow.mjs  # 실제 화면에서 여덟 경로를 눌러 보며 장면 갈래 확인
node tools/scenario-md.cjs   # 12명의 장면 갈래·첫머리·답 칩·일과를 design/scenario-branches.md로 정리
node tools/capture-daypass.mjs --url http://127.0.0.1:4173/ --out ../local-assets/screenshots/<작업ID> --name after  # 장면 전환 일과·인물 소개 촬영
node tools/capture.mjs --url http://127.0.0.1:4173/ --out ../local-assets/screenshots/<작업ID> --name after \
  --run '{"id":"tuvalu","step":1,"choices":[0,null,null]}'
```

로컬 서버에는 AI 서버 함수가 없어서 A·B 버튼으로 진행한다. 촬영 도구는 배포 주소에서도 `/api/` 요청을 막아, 같은 대본 화면을 AI 호출 없이 촬영한다.

## 배포

```bash
npm run validate
node sync-onischool.cjs     # ../../OniSchool/onischool-release/anotherday 로 복사
# onischool-release 저장소에서 커밋·푸시하면 Cloudflare Pages가 자동 배포
```
