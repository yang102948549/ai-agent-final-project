# 프롬프트와 작업 기록

## 2026-11-25-single-monitor-captures

- 실제 요청 — “대화내용캡쳐를 영상에 활용하려고 하는데 지금 전체 화면 캡쳐여서 모니터 2대가 다 나와. 현재 코덱스가 켜져있는 모니터만 캡쳐하면 돼.”
- 반영 — 전체 화면 원본에서 코덱스가 열린 왼쪽 모니터의 1920×1080 영역을 원본 픽셀로 추출해 `local-assets/conversations/2026-11-25-kickoff/06-codex-monitor.png`에 저장하고 CLAUDE.md 촬영 지침을 수정했다.

## 2026-11-25-windows-fullscreen-capture

- 실제 요청 — “이 방식을 md로 재정리해줘. 앞으로 이런 방식을 활용해야 하니까”
- 반영 — Windows 전체 화면 캡처 절차와 원본 보관, 해상도 확인, 포트폴리오 선별 기준을 CLAUDE.md에 추가했다.
- 확인한 예시 — `local-assets/conversations/2026-11-25-kickoff/05-windows-fullscreen.png`는 `Win + Print Screen`으로 촬영한 3840×1080 원본이다. 듀얼 모니터 전체 화면이 포함되어 있다.

## 2026-11-25-local-capture-assets

- 실제 요청 — “캡쳐본 이미지 해상도가 너무 떨어져. 고화질 해상도 캡쳐본이 있게 해줘. 그리고 이 캡쳐본은 그냥 현재 이 작업 폴더에 저장하게 하면 돼.”
- 반영 — 대화 원본을 `local-assets/conversations/2026-11-25-kickoff/`에 1536×816 PNG로 다시 캡처했다. 영상용 원본은 로컬에 보관하고, Git에는 포트폴리오 기록과 선별한 증거를 남기도록 지침을 고쳤다.
- 확인 — 기존 공개 이미지 세 장은 약 750px 너비였다. 새 원본은 실제 대화 창을 원본 크기로 캡처했다.

시작 단계의 대화 흐름과 영상용 원본은 `local-assets/conversations/2026-11-25-kickoff/README.md`에 정리했다. 이 경로는 로컬 작업 폴더에서 열 수 있다.

## 초기 설정 · 과제 가이드

- 실제 요청 발췌 — “개발할 때 이 가이드라인에 따라 체크리스트 및 다른 커밋, 프롬프트 md등을 정리해야하니까.”
- 추가 요청 — “과제에 제시한 것처럼 스크린샷도 매번 확인해서 넣을 수 있게 해야 해”
- 반영 — 과제 제출 기준, Claude Code의 작업별 기록·커밋 절차, 데스크톱·모바일 캡처 검토 규칙을 작성했다.
- 화면 확인 — 앱 구현 전 문서 설정이므로 촬영 대상이 없다.

## 2026-11-25-portfolio-structure

- 실제 요청 발췌 — “내가 제작을 시작할 때부터 끝날 때까지 하나의 기록을 남기는 포트폴리오 제출과제의 형식을 갖춘 제출용 레포인거야.”
- 반영 — 루트 README와 CLAUDE.md에 수업도구 웹앱, 화면 기록, 과정 영상과 트레일러의 위치를 명시하고 세 폴더에 안내를 추가했다.
- 검증 범위 — 문서와 폴더 연결을 확인한다. 앱 구현 전의 구조 정리로 화면 캡처 대상은 없다.

## 2026-11-25-import-original

- 실제 요청 — “새 배포가 아니라 기존 사이트를 그대로 이용할거야. 캡쳐는 세션을 파악해서 중요한 내용은 자동 캡쳐해서 폴더에 넣어줘. 내가 요구하지 않아도. 해결할 수업문제는 분기별 시나리오 수정이야. (…) 시나리오 분기를 읽고 그 선택에 따른 다른 장면들이 각각 등장할 수 있도록 시나리오를 세분화하도록 하자.”
- 이번 작업 범위 — 분기 개발에 앞서 원본을 가져오고 배포 화면을 기준선으로 남겼다. 분기 구현은 `2026-11-25-branching-scenes`에서 이어서 한다.
- 변경 이유 — 수정 전후를 같은 코드와 같은 화면 조건에서 비교하려면 원본 소스와 배포 기준 화면이 저장소 안에 있어야 한다.
- 변경 파일 — `app/` 전체(원본 `5f5f7b9`의 `dist/`, 스크립트, `relay/`, `design/`, 원본 README·HANDOFF), `app/README.md`, `app/package.json`, `app/tools/capture.mjs`, `.gitignore`(`!app/dist/` 예외), `ORIGINAL_PROJECT.md`
- AI 판단으로 고친 것 — `sync-onischool.cjs`의 기본 경로를 이 저장소 위치(`../../OniSchool/onischool-release`)에 맞췄다. 공개 저장소에 맞게 HANDOFF.md의 이메일·Worker 계정명을 `[이메일 가림]`, `[계정 가림]`으로 가렸다.
- 검증
  - `node validate.cjs` → `PASS: 12 unique scenarios, 36 scenes, 72 choices, 96 complete choice paths`
  - 배포본 비교: `diff -rq --strip-trailing-cr`로 onischool-release `anotherday/`와 비교. `index.html`의 `?v=` 해시만 다르다.
- 화면 — `tools/capture.mjs`(Playwright Chromium)로 https://onischool.net/anotherday/ 를 촬영했다. 촬영 중 `/api/` 요청을 막아 AI 없이 대본 화면을 찍었다. 테스트 데이터는 닉네임 `테스트`, 투발루 시오네다.

| 원본(로컬, Git 제외) | 크기 | 상태 |
|---|---|---|
| `local-assets/screenshots/2026-11-25-import-original/baseline-desktop.png` · `baseline-mobile.png` | 1440×900 · 780×1688 | 첫 화면. 제목, 게임 시작 버튼, 인물 그림이 잘림 없이 보인다. |
| `…/baseline-desktop-noon-after-a.png` · `baseline-mobile-noon-after-a.png` | 1440×900 · 780×1688 | 아침 A(시험 보러 감) 뒤의 낮 장면 「떠날까, 남을까」 |
| `…/baseline-desktop-noon-after-b.png` · `baseline-mobile-noon-after-b.png` | 1440×900 · 780×1688 | 아침 B(집에 남음) 뒤의 낮 장면. 첫 두 문장만 다르고 제목과 A·B 선택지가 같다. |

- 관찰 — 두 경로 모두 「떠날까, 남을까」와 같은 두 선택지가 나온다. 아침 선택이 다음 장면을 바꾸지 못하는 문제를 화면으로 확인했다. 모바일에서는 선택 버튼이 화면 아래에 붙고, 글자와 버튼이 잘리지 않는다.
- 공개한 대표 화면 — [A 경로 낮](screenshots/2026-11-25-import-original/baseline-desktop-noon-after-a.png) · [B 경로 낮](screenshots/2026-11-25-import-original/baseline-desktop-noon-after-b.png) · [A 경로 낮(모바일)](screenshots/2026-11-25-import-original/baseline-mobile-noon-after-a.png)

## 2026-11-25-branching-scenes

- 실제 요청 — “해결할 수업문제는 분기별 시나리오 수정이야. 현재 해당 캐릭터들이 선택한 내용에 따라 시나리오가 분기가 되어야하는데 지금 장면들이 세장면으로 정해져있어서 어떤 선택을 하더라도 다음 정해진 장면으로 넘어갈 수 밖에 없어. 시나리오 분기를 읽고 그 선택에 따른 다른 장면들이 각각 등장할 수 있도록 시나리오를 세분화하도록 하자.”
- 작업 중 추가 요청 — “"C:\Users\USER\Desktop\OneDrive\1.교과서\도덕1\3.사회공동체와의 관계\global-life-simulator" 에서 그 내용들을 파악하면 돼” → 로컬 원본 폴더도 `5f5f7b9`이고, 차이는 `.gitignore` 한 줄과 Git 제외 그림 원본(`art-source/`)뿐임을 확인했다. app/에 가져온 소스가 로컬 원본과 같다.
- AI가 정한 설계 — 장면을 아침 1개 → 낮 2개 → 저녁 4개의 갈래 나무로 나누고, 결말은 8가지로 했다. `scenes`의 낮·저녁 칸을 배열로 바꾸면 갈래가 되고, 배열이 아닌 인물은 원본처럼 동작한다. 그래서 열두 명을 한 번에 바꾸지 않고 인물별로 옮길 수 있다. 이번에는 시범으로 투발루 시오네만 나눴다.
- 시오네의 갈래
  - 아침 「바닷물이 들어온 시험날」
  - 낮: A 뒤 「떠날까, 남을까」(원본), B 뒤 「보충 시험과 모래주머니」(새로 씀)
  - 저녁: AA 「카메라 앞 30초」(원본), AB 「할머니의 빵나무」, BA 「선생님의 추천서」, BB 「마을 회의의 한 표」(셋 다 새로 씀)
  - 새 장면은 원본의 작성 원칙을 따랐다. 두 선택지 모두 무언가를 잃게 하고, 구조적 설명은 `barrier`에 넣었다. 인물·장면은 교육용 가정이며 새 통계나 사실 주장은 넣지 않았다.
- 변경 파일
  - `app/dist/scenarios.js` — 시오네 갈래 장면 4개, `branchIndex`·`resolveCase`
  - `app/dist/app.js` — 진행 중인 인물을 선택에 맞게 해석, 미리 만든 내용을 갈래별로 조회
  - `app/dist/precomputed.js` — 시오네의 갈래별 브리핑·일과·첫머리. 새 갈래 내용은 Claude Code가 직접 썼고, 파일 머리에 그렇게 표시했다.
  - `app/precompute.cjs` — 갈래별 생성과 검토 문서
  - `app/validate.cjs` — 여덟 경로마다 장면과 미리 만든 내용 검사
  - `app/tools/branch-flow.mjs` — 실제 화면에서 여덟 경로 진행
  - `app/tools/capture.mjs` — 이어하기 버튼을 기다리도록 수정
  - `app/검토용-미리만든-내용.html`
- 검증
  - `node validate.cjs` → `PASS: 12 unique scenarios, 40 scenes, 80 choices, 96 complete choice paths; branched slots 2 (tuvalu); precomputed matches every path`
  - `node tools/branch-flow.mjs` → 로컬(http://127.0.0.1:4173/)에서 A·B 버튼과 ‘다음 장면’을 눌러 여덟 경로 모두 PASS. 장면 흐름이 원본 1가지에서 4가지로 늘었고, 돌아보기 화면의 세 선택도 경로와 일치했다.
  - `precompute.cjs`는 Gemini를 부르지 않는 방식으로 프롬프트만 만들어 확인했다. B 뒤 낮 장면의 프롬프트에는 앞 선택이 확정되고 다음 갈래 두 장면이 들어간다. 학교 서버로 실제 생성하는 것은 실행하지 않았다.
- 화면 — 로컬, 닉네임 `테스트`, AI 없음(`/api/` 차단), 데스크톱 1440×900, 모바일 390×844(2배율, 780×1688)

| 원본(`local-assets/screenshots/2026-11-25-branching-scenes/`) | 관찰 |
|---|---|
| `before-desktop.png`·`before-mobile.png` → `after-desktop.png`·`after-mobile.png` (아침 A 뒤 낮) | 원본 갈래라 전후가 같다. 회귀가 없음을 확인했다. |
| `before-*-noon-after-b.png` → `after-*-noon-after-b.png` | 전: 「떠날까, 남을까」. 후: 「보충 시험과 모래주머니」, 선택지도 시험·모래주머니로 바뀌었다. |
| `before-*-evening-bb.png` → `after-*-evening-bb.png` | 전: 「카메라 앞 30초」. 후: 「마을 회의의 한 표」 |
| `after-*-evening-ab.png`, `after-*-evening-ba.png` | 「할머니의 빵나무」, 「선생님의 추천서」. 두 줄 선택지도 버튼 안에 들어간다. |

- 남은 문제 — 모바일 BB 저녁은 첫머리가 길어 원로 할아버지 대사의 마지막 줄이 처음 화면에서 아래 선택 패널에 가려진다. 원본 장면에서는 대사가 다 보였다. 스크롤 동작 확인과 디자인 개선은 다음 작업으로 넘긴다.
- 공개한 대표 화면
  - 전: [B 뒤 낮](screenshots/2026-11-25-branching-scenes/before-desktop-noon-after-b.png)
  - 후: [B 뒤 낮](screenshots/2026-11-25-branching-scenes/after-desktop-noon-after-b.png) · [모바일](screenshots/2026-11-25-branching-scenes/after-mobile-noon-after-b.png) · [AB 저녁](screenshots/2026-11-25-branching-scenes/after-desktop-evening-ab.png) · [BA 저녁](screenshots/2026-11-25-branching-scenes/after-desktop-evening-ba.png) · [BB 저녁](screenshots/2026-11-25-branching-scenes/after-desktop-evening-bb.png)
- 대화 캡처 — `local-assets/conversations/2026-11-25-branching-scenes/01-request.png`(1920×1080, 주제 결정), `02-eight-paths-pass.png`(1920×1080, 로컬 원본 지정과 여덟 경로 통과). 2026-11-25 촬영. 공개본: [주제 결정](screenshots/conversations/2026-11-25-branching-scenes/01-request.png)
- 배포 — 아직 하지 않았다. onischool.net 반영은 사용자 승인 뒤 `sync-onischool.cjs`로 한다.
