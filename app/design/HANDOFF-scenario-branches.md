# 인계: 시나리오 갈래 확정본 적용 (2026-11-25)

다음 세션은 이 문서부터 읽는다. 관련 문서는 [재설계안](scenario-branch-plan.md), [검토 메모](scenario-review-notes.md), [분기 정리](scenario-branches.md)다.

## 상태 한 줄

[재설계안](scenario-branch-plan.md)의 장면을 대본과 미리 만든 내용에 **넣었다**. `node validate.cjs` 통과. 화면 경로 테스트는 기존 6명에 이어 누르·그라스 각 8개 경로도 PASS. 수정 후 화면과 문서 정리, 12명 상황별 장면 이미지 35장 연동까지 마치고 **2026-11-26 `https://onischool.net/anotherday/` 배포(`onischool-release` `e80cc7a`) 및 라이브 데스크톱·모바일 검증까지 완료했다.**

## 후속 작업 완료 (2026-11-25)

- 누르·그라스 각각 AAA~BBB 8경로에서 장면 제목과 마지막 돌아보기 선택 문구 일치 확인.
- 코피 낮 A·암나 낮 B·시오네 저녁 AA·라마 저녁 B의 데스크톱/모바일 수정 후 화면 8장 촬영·육안 확인. 모바일 스크롤 후 화면 4장도 추가했다. 제목·버튼 잘림 없음. 네 장면 모두 긴 대사를 스크롤로 끝까지 읽을 수 있고 양쪽 선택 버튼 클릭 가능, 가로 넘침 없음.
- `tools/scenario-md.cjs`: 동일 장면 객체를 묶어 한 번만 출력하고 첫머리는 각 갈래 이름과 함께 표시. 2칸 저녁은 낮 선택 A/B로 표기. 갈래마다 일과가 다르면 모두 보존한다.
- 생성 문서 검증: 고유 장면 제목 47개가 각각 1회, 첫머리 60개와 답 칩 보존.
- 재설계안은 적용됨으로 표시하고 검토 메모의 해결된 사항/원문 유지 사항을 구분했다. CHECKLIST 행과 [화면 증거](../../screenshots/2026-11-25-branch-redesign-apply/) 추가.
- AI 연결 대화의 답 칩 화면은 이번 테스트 범위 밖이다. 촬영에서는 API를 차단했고 답 칩은 생성 문서와 데이터에서 확인했다.

## 이번에 바꾼 것

| 인물 | 대본(`dist/scenarios.js`) | 미리 만든 내용(`dist/precomputed.js`) |
|---|---|---|
| 시오네 | 저녁 AA 「빗물 탱크의 마지막 물」, BB 「밤 밀물」로 교체. 소개 문구 수정 | 저녁 AA·BB 브리핑·일과·첫머리. 낮 A 뒤, 낮 B 뒤 마지막 일과 |
| 아시프 | 저녁 `[A, A, B, B]`: 「오늘 일당 1,200루피」 / 「밤 교대 자리」 | 저녁 첫머리 4개(아침·낮 조합), 브리핑·일과. 낮 뒤 일과 3줄 |
| 호단 | 저녁 `[낮 A 뒤, 낮 B 뒤]`: 「옆집 아샤의 빈 그릇」 / 「먼 우물로 가는 길」 | 저녁 첫머리 2개, 브리핑·일과 |
| 라마 | 저녁 `[낮 A 뒤, 낮 B 뒤]`: 「빵 두 장과 물 한 통」 / 「할아버지 텐트 앞」. 소개 수정 | 저녁 첫머리 2개, 브리핑·일과. 낮 뒤 마지막 일과 |
| 코피 | 낮 `[A 「밭에서 만난 아마」, B 「친구의 비밀」]`(B의 A 결과를 그날 안으로 줄임), 저녁 공통 「중간상인의 저울」. 소개 수정 | 아침 A 뒤 일과, 낮 A 첫머리·브리핑, 낮 B 브리핑 A, 저녁 첫머리 4개 |
| 암나 | 낮 `[A 「꽉 찬 교실의 앞자리」, B 「반 배정 시험과 서류 마감」]`, 저녁 공통 「우물 줄 끝에서」. 소개 수정 | 아침 B 뒤 일과, 낮 B 첫머리·브리핑, 저녁 첫머리 4개 |
| 누르 | 낮 `[A 「증명서가 없는 공부」, B 「하미다의 바느질 일감」]`, 저녁 공통 「오빠의 어깨」. 소개 수정 | 아침 B 뒤 일과, 낮 A 뒤 일과, 낮 B 첫머리·브리핑, 저녁 첫머리 4개 |
| 그라스 | 낮 `[A 「하나둘 서명하는 이웃들」, B 「돈으로 계산되지 않는 것」]`, 저녁 공통 「할머니의 무덤」 | 낮 A 첫머리·브리핑, 낮 B 뒤 일과, 저녁 첫머리 4개 |

- 저녁 공통 장면은 `(s=>[s,s,s,s])(scene(...))`로 썼다. 장면은 하나이고 첫머리만 아침·낮 조합별로 다르다.
- `validate.cjs` — 한 칸에서 같은 장면 객체를 여러 갈래가 함께 쓰는 것을 허용하고, 서로 다른 장면끼리만 제목이 겹치지 않는지 본다. 결과: 장면 47, 선택지 94, 경로 96 PASS.
- 넣을 때 쓴 스크립트와 전체 문장 원본은 `local-assets/branch-apply/`(`content.cjs`, `apply.cjs`, Git 제외)에 있다. 이미 적용했으므로 **다시 실행하지 않는다**(일과 문장 확인에서 멈춘다).

## 이전 세션의 검증 기록 (후속 결과는 위 참조)

- `node validate.cjs` — PASS
- `node tools/branch-flow.mjs http://127.0.0.1:4173/ <id>`(PW_CHROME 지정) — 시오네·아시프·호단·라마·코피·암나 여덟 경로 PASS. **누르는 10분 넘게 끝나지 않아 중단, 그라스는 실행하지 못함.** 다음 세션에서 하나씩 다시 돌린다. 오래 걸리면 `ONLY=0,1 node tools/branch-flow.mjs ...`처럼 경로를 나눈다.
- 촬영 — 수정 전 화면만 찍었다: `local-assets/screenshots/2026-11-25-branch-redesign-apply/before-{desktop,mobile}-{ghana-noon-a,sudan-noon-b,tuvalu-evening-aa,gaza-evening-b}.png`. **수정 후 화면은 아직 없다.** 같은 명령에 `--name after`로 찍는다.
- 답 칩은 AI가 연결된 대화 화면에서만 보인다. 촬영 도구는 AI를 막으므로 칩은 `scenario-branches.md`와 검토용 HTML로 확인한다.

```bash
cd app
npm run serve   # 다른 창
export PW_CHROME="C:/Users/<사용자>/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe"
node tools/branch-flow.mjs http://127.0.0.1:4173/ rohingya
node tools/branch-flow.mjs http://127.0.0.1:4173/ congo
O=../local-assets/screenshots/2026-11-25-branch-redesign-apply
node tools/capture.mjs --url http://127.0.0.1:4173/ --out $O --name after --suffix -ghana-noon-a --run '{"id":"ghana","step":1,"choices":[0,null,null]}'
#   -sudan-noon-b [1,null,null] step 1 / -tuvalu-evening-aa [0,0,null] step 2 / -gaza-evening-b [0,1,null] step 2
```

## 이전 세션의 할 일 목록 (1~4 완료)

1. 누르·그라스 경로 테스트, 수정 후 화면 촬영과 이미지 확인(글자 잘림, 버튼 가림)
2. `tools/scenario-md.cjs` — 같은 장면을 여러 갈래가 함께 쓰면 정리 문서에 같은 장면이 되풀이되어 나온다. 같은 객체를 묶어 한 번만 쓰고 첫머리만 갈래별로 보이게 고친다.
3. `scenario-branch-plan.md`를 “적용됨”으로 표시, `scenario-review-notes.md`의 “결정 필요” 정리
4. CHECKLIST.md 행, 대표 화면 `screenshots/2026-11-25-branch-redesign-apply/` 선별
5. 그대로 둔 결정: 루파·코피·나데주·누르 원본 결과 문장의 시간 앞지름(검토 메모)
6. 배포 완료(2026-11-26, 사용자 승인 후 `node sync-onischool.cjs` → `onischool-release` `e80cc7a` 푸시 → `https://onischool.net/anotherday/` 데스크톱·모바일 라이브 검증 PASS).

현재 6번 배포까지 완료되었으며, 5번 원본 결과 문장의 후속 편집 여부만 선택 사항으로 남아 있다.
