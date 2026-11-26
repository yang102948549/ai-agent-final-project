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

## 2026-11-25-photoreal-characters

- 실제 요청 — “지금은 2d그래픽으로 되어있는데 이 이미지와 각 캐릭터별 상황을 고려해서 캐릭터 이미지들을 재생성해줘”
- 기록 요청 — “작업기록 저장해줘. 그리고 수정내용은 수정내용에 커밋. 디자인 수정 내역에도 들어가야해.”
- 변경 이유 — 국가별 생활환경과 각 인물이 마주한 상황을 구체적으로 보여 주기 위해 실사풍으로 전환했다.
- 제작 — 내장 image_gen으로 기존 삽화를 각각 참조해 12명을 생성했다. 의복·소품·연령과 시나리오 배경을 지시했다. 원본 PNG와 인물별 지시문은 local-assets/photoreal-characters/에 보관했다. 공통 지시문은 app/design/photoreal-prompts.md에 공개한다.
- 제출용 변경 — app/dist/assets/characters/의 WebP 24개, app/dist/app.js의 이미지 캐시 버전과 기사 이미지 설명, app/dist/index.html의 AI 생성 안내. app/tools/make-faces.py는 얼굴 크롭, app/tools/paint-congo-x.py는 그라스의 집 벽 X 표시 보완에 사용되는 코드다. 현재 작업 폴더에 있던 관련 변경을 함께 검토해 기록한다.
- 원본 저장소 이미지 커밋 — 985770f. 기존 삽화는 원본 art-source/characters-before-photoreal-20261125-144447/에 보관했다. 제출용 저장소는 얼굴 크롭과 배경 보완을 포함하므로 원본 저장소 이미지와 일부 차이가 있다.
- 검증 — app/에서 node validate.cjs 통과. 인물 12명, 장면 40개, 선택지 80개, 전체 경로 96개, 분기와 사전 결과 및 JavaScript 문법 검증 성공.
- 화면 증거 — 기존에 저장되어 있던 local-assets/screenshots/2026-11-25-photoreal-characters/의 before/after-desktop.png(1440×900) 및 before/after-mobile.png(780×1688)를 이번 기록 작업에서 각각 열어 확인했다. 같은 홈 화면에서 삽화가 실사풍으로 바뀌며 제목·내비게이션·시작 버튼이 표시되는 것을 확인했다. 네 장을 screenshots/2026-11-25-photoreal-characters/에 선별했다.
- 추가 촬영 시도 — 샌드박스 브라우저 실행 경로 오류 후 외부 실행을 재시도했으나 로컬 4185 서버 연결이 시간 초과됐다. 이번 기록에서는 보관된 화면을 검토했으며 새 촬영 성공으로 기재하지 않는다.
- 대화 원본 — local-assets/conversations/2026-11-25-photoreal-characters/01-decision.png 및 01-decision-full.png가 있다. 이번 기록에서 대화 이미지 내용 검토는 보류했다.
- 디자인 개선 — CHECKLIST.md에 하나의 개선 항목으로 추가했다. 전후 화면 링크로 비교할 수 있다.
- 남은 검증 — 배포 URL에서 이미지와 모바일 동작 확인. 이번 작업은 로컬 커밋으로 기록한다.

### 2026-11-25-photoreal-characters · Claude Code 작업분(얼굴 다시 자르기, 콩고 X, 배경 재검토)

- 앞 기록과의 관계 — 위 기록과 커밋 `574ea46`은 다른 세션(코덱스)이 남겼다. 그 커밋에는 이 세션이 작업 중이던 얼굴 크롭, 콩고 X, 이미지 재압축, 캐시 버전, 안내 문구 변경이 함께 들어갔다. 이 절은 이 세션에서 실제로 한 일과 검증을 따로 적는다.
- 실제 요청
  - “이미지 수정본들도 확인해줘”
  - “사진풍으로 확정, 얼굴 다시 자르고 콩고 X 넣어서 반영해줘. 그리고 배경들도 안맞는게 있다면 재검토해줘”
- 확인한 문제
  - 새 `-face.webp`는 전신을 정사각형으로 줄인 것이었다. 휴대폰 장면 머리말 같은 작은 원에서 얼굴을 알아볼 수 없었다.
  - 콩고 그림에는 첫 장면 「벽에 그려진 빨간 X」의 X가 없었다.
- 한 일
  1. `app/tools/make-faces.py` — 전신 12장의 얼굴 위치 표로 360×360 얼굴 그림을 다시 잘랐다. 아이티는 너무 꽉 차고 가나는 아래로 치우쳐 좌표를 고쳤다. OpenCV 5에 Haar 검출기가 없어 표 방식을 썼다.
  2. `app/tools/paint-congo-x.py` — 문 왼쪽 회벽에 곱하기 합성으로 붓 자국 X를 칠했다. 벽 질감이 비치게 했고, 흘러내린 자국은 한 줄기로 줄였다.
  3. 전신 12장을 WebP 품질 78로 다시 저장했다(2,352KB → 1,153KB). 앱이 첫 화면 뒤에 모든 그림을 미리 받기 때문이다. 확대 비교에서 차이를 확인하지 못했다.
  4. `ART_V` 캐시 버전을 넣고, 기사 사진 설명과 바닥글에 “AI로 만든 가상 인물(실제 사진이 아님)”을 넣었다. 사진처럼 보여 실존 인물·실제 보도 사진으로 오해될 수 있어서다.
  5. 배경 재검토 — 설계서 2절과 12장을 대조해 `app/design/characters.md` 4절에 표로 남겼다.
     - 콩고 X 누락 외에 고칠 것은 없었다.
     - 방글라데시는 설계의 새벽빛이 아니라 한낮 빛이다.
     - 가자의 먼 회색 건물은 확대해도 잔해로 보이지 않았다.
     - 아이티 칠판에는 지운 자국만 있다.
  6. `app/tools/branch-flow.mjs` — 여덟 경로를 동시에 돌리면 로컬 python 서버가 요청을 놓쳐 실패했다(단독 실행은 통과). 두 경로씩 진행하도록 바꿨다.
- 검증
  - `node validate.cjs` 통과(장면 40, 경로 96).
  - `node tools/branch-flow.mjs` 여덟 경로 PASS.
  - 얼굴 12장과 콩고 X 확대본을 직접 열어 확인했다.
- 화면 — 로컬 http://127.0.0.1:4173/, 테스트 닉네임, AI 없음, 데스크톱 1440×900, 모바일 780×1688. 원본은 `local-assets/screenshots/2026-11-25-photoreal-characters/`에 있다.

| 전 → 후 | 관찰 |
|---|---|
| `before-mobile-tuvalu-noon.png` → `after-mobile-tuvalu-noon.png` | 머리말 원 안의 얼굴이 수채화에서 사진 얼굴로 바뀌고 크게 보인다. 글자와 버튼 가림은 없다. |
| `before-desktop-congo.png` → `after-desktop-congo.png` | 전신 그림 왼쪽 집 벽에 빨간 X가 보여 장면 제목과 맞는다. |
| `before-*-atlas.png` → `after-*-atlas.png` | 캐릭터 목록 카드가 사진으로 바뀌었고 잘림이 없다. |

- 공개한 대표 화면 — [얼굴 전](screenshots/2026-11-25-photoreal-characters/before-mobile-tuvalu-noon.png) · [얼굴 후](screenshots/2026-11-25-photoreal-characters/after-mobile-tuvalu-noon.png) · [콩고 전](screenshots/2026-11-25-photoreal-characters/before-desktop-congo.png) · [콩고 후](screenshots/2026-11-25-photoreal-characters/after-desktop-congo.png)
- 대화 캡처
  - `01-decision.png`(1920×1080, 15:05)는 오른쪽에 업무 메신저(실명·쪽지 제목)가 함께 찍혔다. **비공개**로 둔다.
  - 메신저를 뺀 `01-decision-terminal.png`(1350×1080)만 [공개본](screenshots/conversations/2026-11-25-photoreal-characters/01-decision-terminal.png)으로 올렸다.
- 남은 일 — 배포 전이다. onischool.net 반영과 배포 화면 확인은 사용자 승인 뒤에 한다.

## 2026-11-25-branch-dialogue-review

- 실제 요청
  - “시나리오 분기별 md를 다시 검토하자. 장면들이 바꼈기 때문에 그에 해당하는 대화와 칩들또한 변경되어야 해”
  - “"[로컬 경로 가림]" 시나리오 수정본 md를 다시 검토해줘”
  - “투발루뿐만이 아니라 전체 캐릭터들을 확인해야해.”
  - “지금은 시나리오 분기를 다시 살펴봐야하니까 md정리를 우선해줘 바로 배포하지 않을거야”
- 확인한 사실 — 저장소에 시나리오 분기 md 파일은 없었다. 장면별 대화(첫머리 나레이션·인물 대사)와 답 칩, 전환 일과는 `app/dist/precomputed.js`, 장면 대본은 `app/dist/scenarios.js`에 있고, 사람이 읽는 검토본은 `app/검토용-미리만든-내용.html`뿐이었다. 그래서 두 파일에서 그대로 옮겨 쓰는 md 정리 문서를 새로 만들었다.
- 한 일
  1. 12명 전체의 장면 대본·선택 결과·첫머리·대사·답 칩·일과를 경로별로 출력해 모두 읽고 대조했다. 갈래가 있는 인물은 투발루 하나이고, 나머지 11명은 장면이 고정이다.
  2. 어긋난 다섯 곳을 고쳤다(전후 문장은 [검토 메모](app/design/scenario-review-notes.md) 표).
     - 시오네 인물 소개 「상황」: B 경로에는 없는 “이주, 세상에 할 말” 대신 네 흐름을 모두 담는 문장
     - 시오네 아침 B 뒤 일과: 다음 장면에 나오지 않는 아빠 대신 선생님 문자로 이어지게
     - 시오네 낮 A 뒤 일과: 「카메라 앞 30초」 첫머리 장소(마을 어귀)와 맞춤
     - 나데주 저녁 A 뒤 일과: 아침 배급과 헷갈리던 “배급받은 쌀과 콩”을 “식량 꾸러미”로. 처음 고친 문장은 데스크톱에서 두 줄로 넘어가 더 짧게 다시 고쳤다.
     - 마리암 낮 첫머리 답 칩: 별표 행동으로 적힌 질문을 말로
  3. `app/tools/scenario-md.cjs` → `app/design/scenario-branches.md` 생성. 한눈에 보기 표, 인물별·갈래별 장면, 첫머리와 대사, 답 칩, 선택 결과와 다음 일과를 담는다. 맨 위에는 손으로 쓴 `app/design/scenario-review-notes.md`(현재 구조, 고친 곳, 그대로 둔 것과 결정할 일)를 붙인다.
  4. `node precompute.cjs --review`로 검토용 HTML도 다시 만들었다(Gemini 호출 없음).
  5. `app/tools/capture-daypass.mjs` — 장면 전환 일과와 인물 소개 화면을 찍는 도구. 이 컴퓨터의 Playwright 1169 전용 브라우저가 없어 실패해서, `PW_CHROME`으로 설치된 chrome-headless-shell(1234)을 지정해 촬영했다. 같은 방식으로 `tools/branch-flow.mjs`도 `PW_CHROME`을 받게 했다.
- 그대로 둔 것 — 결과 문장이 다음 장면보다 시간을 앞질러 가는 대본 원문(루파·코피·나데주·누르), 코피 저녁 첫머리의 대본에 없는 소품, 다른 11명에 갈래를 넣을지 여부. 검토 메모의 “결정 필요”에 적었다.
- 검증
  - `node validate.cjs` 통과(인물 12, 장면 40, 선택지 80, 경로 96, 미리 만든 내용이 모든 경로와 맞음).
  - `node tools/branch-flow.mjs` 여덟 경로 PASS(장면 흐름 4가지).
- 화면 — 로컬 http://127.0.0.1:4173/, 닉네임 `테스트`, AI 없음(`/api/` 차단), 데스크톱 1440×900, 모바일 390×844(2배율, 780×1688). 전 화면은 고친 두 파일을 `git stash`로 되돌린 상태에서 찍었다. 원본은 `local-assets/screenshots/2026-11-25-branch-dialogue-review/`.

| 전 → 후 | 관찰 |
|---|---|
| `before-*-tuvalu-pass-morning-b.png` → `after-*` | 낮 12시 줄이 “아빠를 기다린다”에서 “울리는 휴대전화를 꺼낸다”로. 모바일은 두 줄로 넘어가지만 카드 안에 다 보인다. |
| `before-*-tuvalu-pass-noon-aa.png` → `after-*` | 해 질 무렵 줄이 “마을 어귀로 나간다”로 |
| `before-*-haiti-pass-evening-a.png` → `after-*` | 첫 줄이 “식량 꾸러미를 교실 구석에 둔다”로, 데스크톱 한 줄 |
| `before-*-tuvalu-profile.png` → `after-*` | 「상황」 문구가 바뀌어 데스크톱에서 두 줄. 버튼 가림 없음. 모바일은 「상황」이 첫 화면 아래에 있어 그림과 표만 보인다(전후 같음). |

- 마리암 답 칩은 AI가 연결된 대화 화면에서만 보여, AI를 막은 촬영에서는 확인하지 못했다. 문서와 데이터로만 확인했다.
- 공개한 대표 화면 — [일과 전](screenshots/2026-11-25-branch-dialogue-review/before-desktop-tuvalu-pass-morning-b.png) · [일과 후](screenshots/2026-11-25-branch-dialogue-review/after-desktop-tuvalu-pass-morning-b.png) · [소개 전](screenshots/2026-11-25-branch-dialogue-review/before-desktop-tuvalu-profile.png) · [소개 후](screenshots/2026-11-25-branch-dialogue-review/after-desktop-tuvalu-profile.png)
- 대화 캡처 — 이번 세션에서는 대화 창을 촬영하지 못했다. 위 실제 요청 발췌로 대신하고 캡처는 대기 상태다.
- 배포 — 사용자 요청대로 하지 않았다. 로컬 커밋만 한다.

## 2026-11-25-deploy-photoreal-images

- 실제 요청 — “수정된 이미지를 확인하여 사이트 수정 배포해줘. 또 가이드라인을 확인하여 작업기록들은 https://github.com/yang102948549/ai-agent-final-project 커밋 기록 및 체크리스트 및 작업기록에 관련한md에 잘 정리하면서 수정해야 해”
- 작업 중 추가 요청
  - “지금 배포는 수정된 시나리오를 같이 배포하는게 아니라 이미지 수정만 하는거야”
  - “시나리오를 확정하지 않았기 때문에 기존 시나리오를 유지하고 이미지만 교체해”
- 판단 — `sync-onischool.cjs`는 `dist/` 전체를 복사하므로 장면 갈래(투발루)까지 배포된다. 그래서 쓰지 않았다. 배포본과 `dist/`를 비교해 이미지 관련 변경만 골랐다. 그림 24장, `app.js`의 그림 주소 캐시 버전(`ART_V`)과 기사 사진 설명, `index.html` 바닥글의 AI 이미지 안내가 그 대상이다. 이 내용을 `app/tools/deploy-images-only.cjs`로 만들어 배포본에 적용했다. 바꿀 문장이 정확히 한 곳에 있을 때만 고치고, 아니면 멈춘다. `app.js`의 `?v=` 해시만 새로 매겼다.
- 배포 전 확인한 수정 이미지 — `screenshots/2026-11-25-photoreal-characters/after-desktop-congo.png`(문 왼쪽 벽 빨간 X), `after-mobile-tuvalu-noon.png`(머리말 원 안 얼굴)를 다시 열어 확인했다.
- 변경 파일
  - 이 저장소: `app/tools/deploy-images-only.cjs`(새 파일), `app/tools/capture.mjs`(`PW_CHROME` 환경 변수로 다른 Chromium 실행 파일 사용), `app/README.md`, `README.md`(배포 주소), `CHECKLIST.md`(배포 확인 칸), `PROMPTS.md`, `screenshots/2026-11-25-deploy-photoreal-images/`
  - 사이트 저장소 onischool-release: 커밋 `f40818c` “anotherday: 캐릭터 이미지를 사진풍으로 교체(시나리오는 기존 유지)”. 26개 파일(`app.js` 7줄·`index.html` 2줄·WebP 24장)을 바꿔 `main`에 푸시했다. 약 20초 뒤 Cloudflare Pages 배포본에서 새 `app.js?v=09ef1001f5`가 확인됐다.
- 검증
  - `node validate.cjs`(개발본) → `PASS: 12 unique scenarios, 40 scenes, 80 choices, 96 complete choice paths; …`
  - 배포본 `git diff --quiet -- anotherday/scenarios.js anotherday/precomputed.js` → 변경 없음. `node --check anotherday/app.js` 통과.
  - 푸시 전 배포본을 로컬(127.0.0.1:4190)로 띄웠다. 투발루 낮 화면에서 사진풍 그림과 원본 장면이 함께 나오는 것을 확인했다(`local-assets/screenshots/2026-11-25-deploy-photoreal-images/precheck/`).
  - 배포 후 그림 24장을 `?v=20261125-photo` 주소로 내려받았다. `dist/`의 파일과 SHA-1이 모두 같았다. 바닥글에 “캐릭터 이미지는 AI로 만든 가상 인물입니다(실제 사진이 아님)”가 보였다.
- 화면 — 배포 주소 https://onischool.net/anotherday/, 닉네임 `테스트`, AI 호출 차단(`/api/`), 데스크톱 1440×900, 모바일 390×844(2배율, 780×1688)
  - 촬영 도구의 Playwright 1.52용 브라우저(1169)가 없어 설치를 시도했다. 내려받기가 10분 넘게 끝나지 않아 중단했다. 대신 이미 설치된 Playwright Chromium 1234(`chrome-win64/chrome.exe`)를 `PW_CHROME`으로 지정해 촬영했다.

| 원본(`local-assets/screenshots/2026-11-25-deploy-photoreal-images/`) | 관찰 |
|---|---|
| `before-desktop.png`·`before-mobile.png` → `after-desktop.png`·`after-mobile.png` (홈) | 2D 삽화가 사진풍으로 바뀌었다. 제목·시작 버튼·메뉴의 잘림이나 가림은 없다. |
| `before-*-congo.png` → `after-*-congo.png` (콩고 아침) | 배포 후 전신 그림 왼쪽 벽에 빨간 X가 보이고, 모바일 머리말 원에 얼굴이 보인다. 장면 글은 그대로다. |
| `before-*-tuvalu-noon.png` → `after-*-tuvalu-noon.png` (투발루 아침 A 뒤 낮) | 그림만 바뀌었다. 장면 「떠날까, 남을까」와 선택지가 같다. |
| `after-*-tuvalu-noon-b.png` (투발루 아침 B 뒤 낮) | 배포본은 여전히 원본 「떠날까, 남을까」다. 개발본의 「보충 시험과 모래주머니」 갈래가 배포되지 않았음을 확인했다. |

- 공개한 대표 화면 — [홈 전](screenshots/2026-11-25-deploy-photoreal-images/before-desktop.png) · [홈 후](screenshots/2026-11-25-deploy-photoreal-images/after-desktop.png) · [모바일 전](screenshots/2026-11-25-deploy-photoreal-images/before-mobile.png) · [모바일 후](screenshots/2026-11-25-deploy-photoreal-images/after-mobile.png) · [콩고 전](screenshots/2026-11-25-deploy-photoreal-images/before-desktop-congo.png) · [콩고 후](screenshots/2026-11-25-deploy-photoreal-images/after-desktop-congo.png) · [투발루 얼굴 전](screenshots/2026-11-25-deploy-photoreal-images/before-mobile-tuvalu-noon.png) · [투발루 얼굴 후](screenshots/2026-11-25-deploy-photoreal-images/after-mobile-tuvalu-noon.png) · [B 경로 원본 장면 유지](screenshots/2026-11-25-deploy-photoreal-images/after-desktop-tuvalu-noon-b.png)
- 대화 캡처 — 2026-11-25 22:57 촬영
  - `local-assets/conversations/2026-11-25-deploy-photoreal-images/01-images-only-full.png`(4480×1080 전체 원본)
  - `01-images-only.png`(1920×1080). 이번에는 대화 앱이 오른쪽 주 모니터(DISPLAY1)에 있어 그 영역을 잘랐다.
  - 화면에는 배포본 검증 이미지가 보인다. 사용자의 “이미지만 교체” 발화는 스크롤 위로 올라가 캡처에 없다. 위 발췌가 실제 발화다.
  - 오른쪽 창에 같은 저장소에서 시나리오 분기를 정리하는 다른 세션이 함께 보이므로 공개하지 않는다.
- 커밋 범위 — 같은 작업 폴더에서 다른 세션이 시나리오 분기 정리(`app/dist/scenarios.js`·`precomputed.js`, `app/tools/scenario-md.cjs` 등)를 진행 중이다. 이번 커밋에는 넣지 않았다. `app/README.md`도 이번 작업에서 고친 두 곳만 스테이징했다.
- 남은 일 — 장면 갈래는 시나리오 확정 뒤 별도 작업으로 배포한다.

## 2026-11-25-branch-redesign-plan

- 실제 요청
  - “다른 인물들도 마찬가지로 첫장면에서 고르는 상황에 따라 흐름이 바껴. 왜냐하면 어떤 인물은 학교를 안가기로 했는데 다음 장면은 학교에서의 상황인 경우거든. 이런 식으로 내가 선택한 내용들이 다음 장면에 이어서 반영되어야 하는데 그렇지 못한거야.  그리고 마지막 장면이 상황 해결을 위해 목소리를 내는 장면이 많은데 학생의 입장에서 사람들을 대표해서 목소리를 내는 상황은 사실 잘 어울리지 않아. 굳이 목소리를 내지 않아도 자연스러운 장면들이 나올 수 있도록 검토해줘”
  - “"[로컬 경로 가림]", https://github.com/yang102948549/global-life-simulator 내용들을 참고해줘 원본파일이니가”
- 한 일 — 앞 작업에서 읽은 12명 전체 대본을 두 기준(앞 선택과 다음 장면의 이어짐, 마지막 장면의 대표 발언 여부)으로 다시 진단하고, 바꿀 장면 초안을 [재설계안](app/design/scenario-branch-plan.md)에 썼다. 대본(`scenarios.js`)에는 아직 넣지 않았다. 사용자가 검토 후 확정할 초안이다.
  - 이어짐이 끊기는 곳: 코피(밭에 갔는데 낮은 교실), 암나(학습 텐트에 등록했는데 낮은 차드 마을 학교), 누르(집에서 공부하기로 했는데 낮은 공동체 학교 앞), 그라스(서명하지 않았는데 낮은 보상금 이사지), 아시프(일감을 잃었는데 저녁에 동료 대표).
  - 대표 발언 마지막 장면: 시오네 AA·BB, 아시프, 호단, 라마, 코피, 암나, 누르, 그라스. 가족·이웃 한 사람·오늘 밤 살림 크기의 장면으로 바꾸는 초안을 썼다.
  - 유지: 루파, 나데주, 마리암, 람과 시오네의 나머지 장면. 이유는 문서에 적었다.
  - 지금 코드(`branchIndex`의 `k % 칸 수`)로 저녁을 낮 선택만으로 2갈래, 또는 `[X, X, Y, Y]`로 아침 선택만으로 나눌 수 있음을 확인해 구조 표기에 적었다.
- 원본 참고 — 로컬 원본 폴더(GitHub 저장소와 같은 `985770f`)의 `scenarios.js` 머리말과 커밋 `ed10c76`(저녁을 마을 회의 요청으로 반복하지 않기), `3f2ad5f`·`6bf1d95`(아침·낮 결과는 그날 안에서 끝냄), `58adffe`(칩은 대본에 없는 인물을 지어내지 않음)를 확인했다. 이 원칙에 비춰 초안의 낮 결과 4개(코피·암나·누르·그라스)가 다음 날로 넘어가던 것을 그날 안으로 고쳤다. 원래 코피 낮 A 결과도 며칠 뒤로 앞질러 간다는 점을 문서에 적었다. GitHub 페이지는 따로 열지 않고 같은 커밋의 로컬 원본을 읽었다.
- 변경 파일 — `app/design/scenario-branch-plan.md`(새 문서), `app/design/scenario-review-notes.md`(결정할 일에 재설계안 링크), `app/design/scenario-branches.md`(다시 생성).
- 화면 확인 — 문서만 바꾸고 앱 데이터는 그대로라 비대상이다.
- 대화 캡처 — 촬영하지 못했다. 위 발췌로 대신하고 캡처는 대기 상태다.
- 배포 — 하지 않았다.

## 2026-11-25-scene-images-pilot

- 실제 요청
  - “이미지 가이드라인과 현재 이미지를 확인하여 각 상황별 이미지도 생성하도록 하자. 지금은 단순히 하나의 캐릭터 이미지만 있기 때문에 상황별로 다양한 이미지가 필요해. 지금 이미지와 md를 참고해서 어떤 이미지들을 구현할지 방향을 먼저 검토해줘”
  - “상황에 맞게 이미지는 바껴야 해. 지금은 시나리오 수정 중이니 파일럿으로 만들어 검증을 먼저 하자. 모바일은 이미지 로딩을 생각해야 해. 왜냐하면 지금 첫 화면들도 로딩을 먼저 하고 히어로섹션이 출력되기 때문에 이미지 전에 텍스트가 먼저 보이고 있어”
- 방향 검토 및 파일럿 설계
  - 기존 12장 실사 이미지와 가이드라인(`app/design/characters.md`, `app/design/photoreal-prompts.md`)을 대조해, 기존 12장은 대표 프로필·아침(장면 1)으로 유지하고 낮·저녁에 상황별 다큐멘터리 스틸컷을 교체하는 방향을 수립했다.
  - 시나리오 수정 중 폐기를 막기 위해 재설계안에서도 유지되는 확정 장면 위주로 파일럿을 구성했다: 투발루 시오네 4장(낮 A 「떠날까, 남을까」, 낮 B 「보충 시험과 모래주머니」, 저녁 AB 「할머니의 빵나무」, 저녁 BA 「선생님의 추천서」) + 아프가니스탄 마리암 1장(저녁 「사촌 언니의 전화」). 마리암 낮 「이웃 언니의 귓속말」은 이미지 생성 서버 용량 제한(HTTP 503)으로 보류하고 기존 이미지 폴백을 검증했다.
  - 시나리오 편집 작업과 충돌하지 않도록 장면별 이미지 매핑(`SCENE_ART`)은 `scenarios.js`가 아닌 `app.js`에 분리해 두었다.
- 모바일·초기 화면 로딩 최적화
  - `index.html`: 첫 화면 히어로 이미지에 `<link rel="preload" as="image" fetchpriority="high">`를 추가해 스크립트 해석과 병렬로 다운로드한다. 모바일(`≤900px`)은 실제 보이는 2장(`bangladesh`, `ghana`)만 선로딩하고 나머지 2장은 `media="(min-width:901px)"`로 데스크톱에만 선로딩한다.
  - `style.css`·`app.js`: 로딩 중 거대한 첫 글자가 먼저 보이지 않도록 오류 시(`.is-error`)에만 첫 글자를 표시하고 쉬머+페이드인으로 전환했다. 이미 받은 주소는 `loadedSrc`에 기록해 대화 재렌더링 시 깜빡임을 막는다.
  - 캐릭터 진입(`intro`) 시 해당 인물의 상황 이미지만 지연 프리로드(`preloadCaseScenes`)하고, 장면 전환(`dayPass`)이 진행되는 동안 다음 장면 이미지 디코드 완료를 최대 1.5초 한도로 기다려 전환 직후 글과 그림이 함께 뜨게 했다.
  - 모바일(`≤900px`)에서도 상황 변화를 볼 수 있도록 `.scene-card` 본문 상단에 16:9 고정 비율 배너(`.scene-banner`, 최대 높이 220px)를 배치했다.
- 변경 파일
  - `app/dist/assets/scenes/` — 파일럿 WebP 5장(`tuvalu-noon-a`, `tuvalu-noon-b`, `tuvalu-evening-ab`, `tuvalu-evening-ba`, `afghanistan-evening`, 각 896×1200, 45~90KB)
  - `app/dist/index.html` — 히어로 이미지 반응형 `<link rel="preload">`
  - `app/dist/app.js` — `SCENE_ART` 매핑, `preloadCaseScenes`, `waitSceneImage`(전환 중 디코드 대기), `loadedSrc` 캐시, `sceneBanner`, `ART_V='20261125-scene1'`
  - `app/dist/style.css` — `.art` 쉬머·페이드인, 모바일 `.scene-banner` 16:9 고정 레이아웃
  - `app/validate.cjs` — 장면 이미지 파일 존재 검사 추가
  - `app/design/scene-images-pilot.md` — 파일럿 프롬프트·로딩 설계 기록
  - `screenshots/2026-11-25-scene-images-pilot/`, `CHECKLIST.md`, `PROMPTS.md`
  - 원본 JPEG 5장은 Git 제외 폴더 `local-assets/scene-images-pilot/`에 보관했다.
- 검증
  - `node validate.cjs` → `PASS: 12 unique scenarios, 47 scenes, 94 choices, 96 complete choice paths; …` (5장 WebP 파일 존재 확인 포함)
  - `node --check dist/app.js` 통과
  - `node tools/branch-flow.mjs http://127.0.0.1:4179/ tuvalu` → 여덟 경로 모두 PASS (장면 전환 중 이미지 대기 포함 정상 동작)
  - Playwright 모바일 스모크 테스트 → `<link rel="preload" as="image">` 4개, 투발루 낮 A(`tuvalu-noon-a.webp`) 및 아프가니스탄 저녁(`afghanistan-evening.webp`) 배너 이미지 로드(`.is-loaded`) 확인
- 화면 — 로컬(127.0.0.1), 닉네임 `테스트`, AI 차단(`/api/`), 데스크톱 1440×900, 모바일 390×844(2배율, 780×1688). 원본은 `local-assets/screenshots/2026-11-25-scene-images-pilot/`.

| 전 → 후 | 관찰 |
|---|---|
| `before-desktop.png`·`before-mobile.png` → `after-desktop.png`·`after-mobile.png` (투발루 낮 A) | 데스크톱 왼쪽 초상이 아침 물웅덩이 길에서 한낮 집 식탁 가족 논의 장면으로 바뀌었다. 모바일에도 16:9 상황 배너가 본문 위에 잘림 없이 표시된다. |
| `after-*-tuvalu-noon-b.png` (투발루 낮 B) | 아침 B 선택 시 젖은 이불이 널린 마당에서 휴대전화를 보는 다른 이미지로 분기 전환된다. |
| `after-*-tuvalu-evening-ab.png`, `after-desktop-tuvalu-evening-ba.png` | 저녁 AB(할머니와 빵나무 저녁 식탁), 저녁 BA(노을 진 교실 창가와 선생님)가 경로별로 다르게 보인다. |
| `before-*-afghanistan-evening.png` → `after-*-afghanistan-evening-v2.png` | 아침과 같은 흙벽 방·창문이 어두운 밤하늘과 휴대전화 불빛 장면으로 바뀌었다. 초기 모바일 크롭에서 머리 위 여백이 좁아 `pos`를 `50% 15%`로 조정해 개선했다. |
| `after-mobile-afghanistan-noon-v2.png` (미생성 폴백) | 전용 이미지가 없는 장면은 기본 인물 그림으로 자연스럽게 폴백되며 잘림이 없다. |

- 공개한 대표 화면 — [투발루 낮 A 전(데스크톱)](screenshots/2026-11-25-scene-images-pilot/before-desktop.png) · [후(데스크톱)](screenshots/2026-11-25-scene-images-pilot/after-desktop.png) · [전(모바일)](screenshots/2026-11-25-scene-images-pilot/before-mobile.png) · [후(모바일)](screenshots/2026-11-25-scene-images-pilot/after-mobile.png) · [투발루 낮 B](screenshots/2026-11-25-scene-images-pilot/after-desktop-tuvalu-noon-b.png) · [투발루 저녁 AB](screenshots/2026-11-25-scene-images-pilot/after-desktop-tuvalu-evening-ab.png) · [투발루 저녁 AB(모바일)](screenshots/2026-11-25-scene-images-pilot/after-mobile-tuvalu-evening-ab.png) · [투발루 저녁 BA](screenshots/2026-11-25-scene-images-pilot/after-desktop-tuvalu-evening-ba.png) · [마리암 저녁 전](screenshots/2026-11-25-scene-images-pilot/before-desktop-afghanistan-evening.png) · [후](screenshots/2026-11-25-scene-images-pilot/after-desktop-afghanistan-evening.png) · [마리암 저녁 전(모바일)](screenshots/2026-11-25-scene-images-pilot/before-mobile-afghanistan-evening.png) · [후(모바일)](screenshots/2026-11-25-scene-images-pilot/after-mobile-afghanistan-evening.png)
- 대화 캡처 — 이번 세션에서는 대화 창을 촬영하지 못했다. 위 실제 요청 발췌로 대신하고 캡처는 대기 상태다.
- 남은 일 — 파일럿 검토 후 보류된 `afghanistan-noon`과 나머지 인물의 낮·저녁 상황 이미지를 순차 확장한다. 배포는 시나리오 확정 뒤 함께 진행한다.

## 2026-11-26-scene-images-group-a-part1

- 실제 요청
  - “시오네 낮 B 「보충 시험과 모래주머니」 896×1200 · 89.5KB 마당 빨랫줄 젖은 이불, 휴대전화를 쥐고 확성기 소리에 귀 기울이는 구도 이게 이미지와 설명이 맞지 않아. 재검토해줘”
  - “다른 에이전트에게 이미지 생성을 요청할거야. 여기서 몇명의 캐릭터를 수정하면 좋은지 정하고 명단도 알려줘. 그리고 나머지 명단들도 알려줘 다른 에이전트에게 생성 요청을 할거야”
  - “그럼 다른 에이전트에게 요청할 내용과 면담을 핸드오프md로 남겨줘. 캐릭터 분담 작업 md로 파일명을 지어서” / “그리고 a조 작업 시작해줘”
- 한 일
  1. **분담 핸드오프 문서 작성** — `app/design/캐릭터-분담-작업.md`에 최신 확정 시나리오(47장면) 기준 남은 31장을 A조(6명 · 15장, 이 세션)와 B조(6명 · 16장, 다른 에이전트)로 겹치지 않게 분담하고, 공통 규격·16:9 모바일 안전 구도 원칙·바로 복사해 전달할 요청문을 정리했다.
  2. **`tuvalu-noon-b.webp` 재검토·재생성** — 기존 파일럿 이미지에 확성기·모래주머니·공책이 빠지고 모바일 16:9 크롭에서 휴대전화까지 잘리던 문제를 고쳤다. 새 이미지(896×1200 · 81.1KB)에는 고민하는 표정의 시오네, 가슴 높이 공책과 휴대전화, 왼쪽 마당 빨랫줄 이불, 오른쪽 위 전봇대 금속 확성기, 해안에서 모래주머니를 쌓는 주민들이 한 화면에 모두 들어간다.
  3. **`tuvalu-evening-aa.webp` 신규 생성** — 시오네 저녁 AA 「빗물 탱크의 마지막 물」(896×1200 · 84.3KB). 해 질 녘 집 뒤 빗물 탱크 수도꼭지에 손을 올린 시오네와 빈 주전자를 든 펠레 할머니 구도.
  4. `app/dist/app.js`의 `SCENE_ART`에 `빗물 탱크의 마지막 물`(`pos:'50% 42%'`)을 추가하고 `보충 시험과 모래주머니` 초점을 `50% 24%`로 조정했으며 `ART_V`를 `20261126-scene2`로 올렸다(`index.html` preload 주소도 동기화).
- 중단 사유(서버 용량 제한) — A조 나머지 13장(`tuvalu-evening-bb`, `afghanistan-noon`, `pakistan` 3장, `bangladesh` 2장, `somalia` 3장, `gaza` 3장) 생성을 이어 시도했으나 이미지 생성 서버(`gemini-3.1-flash-image`)가 연속 `HTTP 503 UNAVAILABLE (No capacity available)`를 반환해 중단하고 1차 완료분만 먼저 검증·커밋했다.
- 검증
  - `node validate.cjs` → `PASS: 12 unique scenarios, 47 scenes, 94 choices, 96 complete choice paths; …`
  - `node --check dist/app.js` 통과
- 화면 — 로컬(127.0.0.1:4183~4184), 닉네임 `테스트`, AI 차단(`/api/`), 데스크톱 1440×900, 모바일 780×1688. 원본은 `local-assets/screenshots/2026-11-26-scene-images-group-a/`.
  - `before-*-tuvalu-noon-b.png` → `after-*-tuvalu-noon-b.png`: 데스크톱에서는 확성기·모래주머니·공책·휴대전화가 모두 보이고, 모바일 16:9 배너에서도 빨랫줄·고민하는 얼굴·공책과 폰 상단·모래주머니 작업이 한눈에 읽힌다.
  - `after-*-tuvalu-evening-aa.png`: 빗물 탱크·수도꼭지·시오네·주전자 손잡이가 데스크톱과 모바일 모두에서 잘림 없이 보인다.
- 공개한 대표 화면 — [보충 시험과 모래주머니 전](screenshots/2026-11-26-scene-images-group-a/before-desktop-tuvalu-noon-b.png) · [후](screenshots/2026-11-26-scene-images-group-a/after-desktop-tuvalu-noon-b.png) · [모바일 전](screenshots/2026-11-26-scene-images-group-a/before-mobile-tuvalu-noon-b.png) · [모바일 후](screenshots/2026-11-26-scene-images-group-a/after-mobile-tuvalu-noon-b.png) · [빗물 탱크 데스크톱](screenshots/2026-11-26-scene-images-group-a/after-desktop-tuvalu-evening-aa.png) · [모바일](screenshots/2026-11-26-scene-images-group-a/after-mobile-tuvalu-evening-aa.png)
- 대화 캡처 — 촬영하지 못했다. 위 실제 요청 발췌로 대신하고 캡처는 대기 상태다.
- 남은 일 — 이미지 생성 서버 용량이 회복되면 A조 나머지 13장을 이어서 생성·연동한다. `CHECKLIST.md`는 다른 세션의 변경이 작업 트리에 있어 이번 커밋에서는 섞지 않았다.

## 2026-11-26-scene-images-group-a-complete

- 실제 요청
  - “제미나이 api key는?” / “env 문서를 만들어서 넣는게 좋지 않을까?”
  - “저장했어 이어서 작업진행해줘. 그리고 이미지 생성만 지금 api를 이용하는 거지 다른 작업은 api를 이용하지 않을 거야.”
  - “작업이 완료되면 커밋 후 md 정리 후 백그라운드도 작업종료”
- 한 일
  1. 루트에 `.env`(Git 제외)와 `.env.example` 템플릿을 만들고, `.env`의 `GEMINI_API_KEY`로 호출 가능한 이미지 모델을 조회해 `gemini-3-pro-image-preview`(Nano Banana Pro)를 확인했다.
  2. 기존 캐릭터 원본(`local-assets/photoreal-characters/<id>.png`)을 참조 이미지로 첨부해 **A조 남은 13장 전량을 생성**하고 원본은 `local-assets/scene-images/`(Git 제외), 앱용 896×1200 WebP(품질 76, 44~144KB)는 `app/dist/assets/scenes/`에 저장했다:
     - 투발루 시오네: `tuvalu-evening-bb` 「밤 밀물」
     - 아프가니스탄 마리암: `afghanistan-noon` 「이웃 언니의 귓속말」
     - 파키스탄 아시프: `pakistan-noon` 「멈춰 버린 선풍기」, `pakistan-evening-a` 「오늘 일당 1,200루피」, `pakistan-evening-b` 「밤 교대 자리」
     - 방글라데시 루파: `bangladesh-noon` 「동아리 지원금 투표」, `bangladesh-evening` 「열쇠는 누가 가질까」
     - 소말리아 호단: `somalia-noon` 「시장에 염소를 팔까」, `somalia-evening-a` 「옆집 아샤의 빈 그릇」, `somalia-evening-b` 「먼 우물로 가는 길」
     - 팔레스타인 라마: `gaza-noon` 「급수차가 왔다」, `gaza-evening-a` 「빵 두 장과 물 한 통」, `gaza-evening-b` 「할아버지 텐트 앞」
  3. 13장을 모두 직접 열어 인물 일관성·직관적 상황 표현·모바일 16:9 안전 구도·금지 요소(글자·로고·잔해·무기·상처 없음)를 검수했다.
  4. `app/dist/app.js`의 `SCENE_ART`에 A조 6명 전량(19개 장면)을 반영(B조 에이전트가 넣은 6명 항목은 그대로 유지)하고 `ART_V`를 `20261126-scene-all`로 갱신(`index.html` preload 동기화)했다. 이로써 **12명 전체 낮·저녁 49개 장면 슬롯 누락 0건**을 달성했다.
  5. `app/design/캐릭터-분담-작업.md`의 A조 상태를 완료로 갱신했다.
- 검증
  - `node validate.cjs` → `PASS: 12 unique scenarios, 47 scenes, 94 choices, 96 complete choice paths; …` (전 장면 WebP 파일 존재 확인 포함)
  - `node --check dist/app.js` 통과
  - 전체 12명 낮·저녁 제목 매핑 검사 → `covered=49, missing=0`
- 화면 — 로컬(127.0.0.1:4185), 닉네임 `테스트`, AI 차단(`/api/`), 데스크톱 1440×900, 모바일 780×1688. 원본은 `local-assets/screenshots/2026-11-26-scene-images-group-a/`.
  - `before-*-pakistan-noon.png` → `after-*-pakistan-noon.png`: 뙤약볕 공사장 사진에서 정전 실내 멈춘 선풍기와 부채질하는 노모 곁의 아시프로 교체.
  - `before-*-somalia-evening-a.png` → `after-*-somalia-evening-a.png`: 한낮 염소 초상에서 노을 진 문간, 쌀자루와 빈 그릇을 든 아샤 구도로 교체.
  - `before-*-gaza-noon.png` → `after-*-gaza-noon.png`: 텐트 정면 초상에서 급수차 줄·물통 든 할아버지·옷자락 잡은 동생들 구도로 교체.
  - `after-*-bangladesh-evening.png`, `after-*-afghanistan-noon.png`, `after-*-tuvalu-evening-bb.png`: 데스크톱 3:4와 모바일 16:9 배너 모두 얼굴·핵심 소품이 잘림 없이 직관적으로 표시됨을 확인.
- 공개한 대표 화면 — [아시프 낮 전](screenshots/2026-11-26-scene-images-group-a/before-desktop-pakistan-noon.png) · [후](screenshots/2026-11-26-scene-images-group-a/after-desktop-pakistan-noon.png) · [모바일 후](screenshots/2026-11-26-scene-images-group-a/after-mobile-pakistan-noon.png) · [호단 저녁 A 전](screenshots/2026-11-26-scene-images-group-a/before-desktop-somalia-evening-a.png) · [후](screenshots/2026-11-26-scene-images-group-a/after-desktop-somalia-evening-a.png) · [모바일 후](screenshots/2026-11-26-scene-images-group-a/after-mobile-somalia-evening-a.png) · [라마 낮 전](screenshots/2026-11-26-scene-images-group-a/before-desktop-gaza-noon.png) · [후](screenshots/2026-11-26-scene-images-group-a/after-desktop-gaza-noon.png) · [모바일 후](screenshots/2026-11-26-scene-images-group-a/after-mobile-gaza-noon.png) · [루파 저녁](screenshots/2026-11-26-scene-images-group-a/after-desktop-bangladesh-evening.png) · [마리암 낮](screenshots/2026-11-26-scene-images-group-a/after-desktop-afghanistan-noon.png) · [시오네 저녁 BB](screenshots/2026-11-26-scene-images-group-a/after-desktop-tuvalu-evening-bb.png)
- 대화 캡처 — 촬영하지 못했다. 위 실제 요청 발췌로 대신하고 캡처는 대기 상태다.
- 남은 일 — B조 에이전트 커밋 완료 후 배포 전 최종 점검을 거쳐 원격 푸시·배포 여부를 결정한다.

## 2026-11-25-branch-redesign-apply (후속 검증·문서 정리 완료)

- 실제 요청
  - “app/design/HANDOFF-scenario-branches.md 에서 작업하던게 지금 중단이 되었어. 작업현황을 확인한 뒤 이어서 작업해줘”
  - “작업이 완료되면 커밋 후 md 정리 후 백그라운드도 작업종료”
- 확인한 현황 — 직전 세션(`6c6a5e1` 이후)이 `HANDOFF-scenario-branches.md`의 후속 항목 1~4(누르·그라스 각 8경로 PASS, 코피 낮 A·암나 낮 B·시오네 저녁 AA·라마 저녁 B 수정 후 데스크톱/모바일·스크롤 화면 12장 촬영, `tools/scenario-md.cjs` 객체 동일성 묶기 및 `scenario-branches.md` 재생성, `scenario-branch-plan.md`·`scenario-review-notes.md`·`CHECKLIST.md` 갱신, `scenarios.js` 임시 `img/pos` 제거)까지 마친 뒤 `PROMPTS.md` 기록과 로컬 커밋 직전에서 중단되어 있었다.
- 마무리 작업 — `node validate.cjs`(12명·47장면·94선택지·96경로 PASS)와 `node tools/scenario-md.cjs` 재생성 일치 여부를 재확인하고, `screenshots/2026-11-25-branch-redesign-apply/`의 대표 전후·스크롤 화면을 직접 열어 글자 잘림·버튼 가림 없음을 확인한 뒤 `PROMPTS.md`에 기록하고 커밋했다.
- 변경 파일 — `app/dist/scenarios.js`, `app/tools/scenario-md.cjs`, `app/design/scenario-branches.md`, `app/design/scenario-branch-plan.md`, `app/design/scenario-review-notes.md`, `app/design/HANDOFF-scenario-branches.md`, `screenshots/2026-11-25-branch-redesign-apply/`(20장), `CHECKLIST.md`, `PROMPTS.md`.
- 공개한 대표 화면 — [코피 낮 A 전](screenshots/2026-11-25-branch-redesign-apply/before-desktop-ghana-noon-a.png) · [후](screenshots/2026-11-25-branch-redesign-apply/after-desktop-ghana-noon-a.png) · [암나 낮 B 모바일](screenshots/2026-11-25-branch-redesign-apply/after-mobile-sudan-noon-b.png) · [스크롤 후](screenshots/2026-11-25-branch-redesign-apply/after-mobile-scrolled-sudan-noon-b.png) · [시오네 저녁 AA](screenshots/2026-11-25-branch-redesign-apply/after-desktop-tuvalu-evening-aa.png) · [라마 저녁 B](screenshots/2026-11-25-branch-redesign-apply/after-desktop-gaza-evening-b.png).
- 대화 캡처 — 촬영하지 못했다(대기). 위 실제 요청 발췌로 대신한다.

## 2026-11-25-branch-redesign-apply

- 실제 요청
  - “그럼 확정본을 바탕으로 대본을 넣고 그에 따른 대사, 칩, 일과를 테스트해보자”
  - “수정된 내용은 md로 저장 및 핸드오픈 문서로 남겨줘. 토큰 소진이 다되면 이어서 작업해야 하니까. 토큰이 95%에 도달하면 작업을 중지하고 현재까지의 작업 커밋 후 핸드오프 md 문서 작성”
- 한 일 — [재설계안](app/design/scenario-branch-plan.md)의 장면 15개를 `scenarios.js`에 넣고, 갈래마다 첫머리·대사·답 칩·브리핑·일과를 `precomputed.js`에 손으로 썼다. 같은 장면을 여러 갈래가 함께 쓸 수 있게 `validate.cjs`를 고쳤다. 상세와 남은 일은 [인계 문서](app/design/HANDOFF-scenario-branches.md).
- 검증 — `node validate.cjs` PASS(장면 47, 경로 96). 화면 경로 테스트는 시오네·아시프·호단·라마·코피·암나 PASS. 누르는 끝나지 않아 중단했고, 그라스는 실행하지 못했다.
- 화면 — 수정 전만 촬영(`local-assets/screenshots/2026-11-25-branch-redesign-apply/before-*`, 1440×900 / 780×1688). 수정 후 촬영과 이미지 확인은 남은 일이다.
- 대화 캡처 — 하지 못했다(대기).
- 배포 — 하지 않았다.

## 2026-11-26-scene-images-group-b

- 실제 요청
  - “app/design/캐릭터-분담-작업.md 문서를 읽고, 그중 B조(아이티·가나·수단·로힝야·콩고·카타르 6명, 총 16장) 상황별 장면 이미지 생성 및 앱 연동을 진행해 줘.”
  - (후속 통합) “작업이 완료되면 커밋 후 md 정리 후 백그라운드도 작업종료”
- 한 일
  1. B조 6명 16장(`haiti` 2, `ghana` 3, `sudan` 3, `rohingya` 3, `congo` 3, `qatar` 2)을 참조 이미지 기반으로 생성·검수하고 900×1200 WebP(품질 76, 78~236KiB)로 `app/dist/assets/scenes/`에 저장했다. 콩고 그라스 낮 A·B에는 기존 앱 캐릭터 이미지의 문 왼쪽 회벽 빨간 X를 일관되게 유지했다. 상세 프롬프트와 크롭 위치는 [B조 결과 문서](app/design/scene-images-group-b.md).
  2. `app/dist/app.js`의 `SCENE_ART`에 B조 6명 16개 장면이 등록되어 A조 19개와 합쳐 **전체 12명·35장 WebP·49개 낮/저녁 슬롯 100% 반영**을 완료했다.
  3. `app/design/캐릭터-분담-작업.md`의 B조 상태를 완료로 갱신하고 `CHECKLIST.md`에 전체 12명 상황별 장면 이미지 완료 행을 추가했다.
- 검증
  - `node validate.cjs` → `PASS: 12 unique scenarios, 47 scenes, 94 choices, 96 complete choice paths` 및 전 장면 WebP 존재 확인.
  - B조 16/16 모바일 브라우저 검사 PASS(900×1200 로드, 가로 넘침 없음, 양쪽 선택 버튼 클릭 가능).
- 화면 — 데스크톱 1440×900, 모바일 780×1688, AI 차단(`/api/`), 닉네임 `테스트`. 원본은 `local-assets/screenshots/2026-11-26-scene-images-group-b/`.
- 공개한 대표 화면 — [아이티 전](screenshots/2026-11-26-scene-images-group-b/before-desktop-haiti.png) · [후](screenshots/2026-11-26-scene-images-group-b/after-desktop-haiti.png) · [가나 전](screenshots/2026-11-26-scene-images-group-b/before-desktop-ghana.png) · [후](screenshots/2026-11-26-scene-images-group-b/after-desktop-ghana.png) · [가나 모바일 후](screenshots/2026-11-26-scene-images-group-b/after-mobile-ghana.png) · [수단 후](screenshots/2026-11-26-scene-images-group-b/after-desktop-sudan.png) · [로힝야 후](screenshots/2026-11-26-scene-images-group-b/after-desktop-rohingya.png) · [콩고 전](screenshots/2026-11-26-scene-images-group-b/before-desktop-congo.png) · [후](screenshots/2026-11-26-scene-images-group-b/after-desktop-congo.png) · [콩고 낮 A 배너](screenshots/2026-11-26-scene-images-group-b/banner-congo-noon-a.png) · [콩고 낮 B 배너](screenshots/2026-11-26-scene-images-group-b/banner-congo-noon-b.png) · [카타르 후](screenshots/2026-11-26-scene-images-group-b/after-desktop-qatar.png)
- 대화 캡처 — 촬영하지 못했다(대기). 위 실제 요청 발췌로 대신한다.

## 2026-11-26-deploy-branches-and-scenes

- 실제 요청
  - “작업이 완료되면 커밋 후 md 정리 후 백그라운드도 작업종료”
  - “또, 푸시 및 사이트 배포까지 완료해줘야해.”
  - “커밋 후 md정리 및 푸시, 사이트 배포는 api가 아닌 에이전트 모델로 실행”
- 한 일
  1. 배포 전 `https://onischool.net/anotherday/` 기준 화면 10장(홈·투발루 낮 B·파키스탄 낮·콩고 저녁·가나 낮 A 각 데스크톱/모바일)을 먼저 촬영해 기존 미분기 대본·아침 초상 고정·모바일 장면 배너 미적용 상태를 확보했다.
  2. `app/`에서 `node sync-onischool.cjs`를 실행해 배포본 66개 파일(상황별 장면 WebP 35장 포함)을 `onischool-release/anotherday/`에 동기화하고 `node --check` 문법 검사를 통과시켰다.
  3. `onischool-release` `main`에 커밋(`e80cc7a`) 및 푸시해 Cloudflare Pages로 `https://onischool.net/anotherday/`에 배포했다(외부 AI API 미사용).
  4. `CHECKLIST.md`, `app/design/HANDOFF-scenario-branches.md`, `app/design/scenario-branch-plan.md`, `PROMPTS.md`의 배포 상태를 갱신하고, 과제 저장소 `origin main`까지 푸시했다.
- 검증
  - 라이브 HTML 캐시 해시 확인: `app.js?v=c5b4a543ab` 반영 확인.
  - 라이브 상황별 장면 WebP HTTP HEAD 확인: `tuvalu-noon-b.webp`(200, 83,078B), `pakistan-noon.webp`(200, 84,470B), `congo-evening.webp`(200, 110,056B), `ghana-noon-a.webp`(200, 190,058B) 모두 `image/webp` 정상 응답.
- 화면 — 배포 주소 `https://onischool.net/anotherday/`, 닉네임 `테스트`, AI 차단(`/api/`), 데스크톱 1440×900, 모바일 780×1688. 원본 22장은 `local-assets/screenshots/2026-11-26-deploy-branches-and-scenes/`에 보관.
  - `before-*-tuvalu-noon-b.png` → `after-*-tuvalu-noon-b.png`: 기존 「떠날까, 남을까」·아침 초상에서 갈래 분기 「보충 시험과 모래주머니」와 확성기·모래주머니·공책·빨랫줄이 담긴 장면 이미지로 교체. 모바일 16:9 배너도 잘림 없이 표시.
  - `before-*-pakistan-noon.png` → `after-*-pakistan-noon.png`: 공사장 초상에서 정전 실내 멈춘 선풍기·부채질하는 어머니 장면으로 교체, 모바일 16:9 배너 정상 표시.
  - `before-*-congo-evening.png` → `after-*-congo-evening.png`: 기존 「“전기차, 지구를 위한 선택”」에서 재설계된 「할머니의 무덤」과 밤 실내 가족·목사님 대화 장면으로 교체.
  - `before-*-ghana-noon-a.png` → `after-*-ghana-noon-a-v2.png`: 기존 「친구의 비밀」에서 재설계된 「밭에서 만난 아마」와 카카오 밭길 대화 장면으로 교체(초회 `after-*-ghana-noon-a.png`는 최초 원격 다운로드 페이드인 도중 촬영되어 `-v2`로 재촬영해 완전 로드 확인).
- 공개한 대표 화면 — [홈 데스크톱](screenshots/2026-11-26-deploy-branches-and-scenes/after-desktop.png) · [홈 모바일](screenshots/2026-11-26-deploy-branches-and-scenes/after-mobile.png) · [투발루 낮 B 전](screenshots/2026-11-26-deploy-branches-and-scenes/before-desktop-tuvalu-noon-b.png) · [후](screenshots/2026-11-26-deploy-branches-and-scenes/after-desktop-tuvalu-noon-b.png) · [모바일 후](screenshots/2026-11-26-deploy-branches-and-scenes/after-mobile-tuvalu-noon-b.png) · [파키스탄 낮 전](screenshots/2026-11-26-deploy-branches-and-scenes/before-desktop-pakistan-noon.png) · [후](screenshots/2026-11-26-deploy-branches-and-scenes/after-desktop-pakistan-noon.png) · [모바일 후](screenshots/2026-11-26-deploy-branches-and-scenes/after-mobile-pakistan-noon.png) · [콩고 저녁 전](screenshots/2026-11-26-deploy-branches-and-scenes/before-desktop-congo-evening.png) · [후](screenshots/2026-11-26-deploy-branches-and-scenes/after-desktop-congo-evening.png) · [모바일 후](screenshots/2026-11-26-deploy-branches-and-scenes/after-mobile-congo-evening.png) · [가나 낮 A 전](screenshots/2026-11-26-deploy-branches-and-scenes/before-desktop-ghana-noon-a.png) · [후](screenshots/2026-11-26-deploy-branches-and-scenes/after-desktop-ghana-noon-a.png) · [모바일 후](screenshots/2026-11-26-deploy-branches-and-scenes/after-mobile-ghana-noon-a.png)
- 대화 캡처 — 촬영하지 못했다(대기). 위 실제 요청 발췌로 대신한다.


## 2026-11-26-hero-album

- 실제 요청 — “수정 방향에 맞게 진행해줘”
- 앞선 방향 지정 — “캐릭터들은 12명이 결국에 다 나오는 게 좋아. 한명 한명이 아니라 앨범 사진이 넘어가듯 3~4명정도 나오고 점점 페이드인 페이드아웃 되듯이 옆에서 등장하는 거야. 그리고 이 때 옆에 다른 곳의 하루 텍스트 범위는 침범하면 안돼. 그리고 그 텍스트만큼의 높이 비율에 맞춰서 이미지도 조정되어야 해”
- 후속 요청 — “사진들 높이가 맞는지 재검토해줘”
- 구현 및 판단 — 기존 사진 4명·색 타일 모자이크를 없애고 12명 전체를 96초 주기로 가로 이동시키는 앨범으로 교체했다. 데스크톱은 3~4장, 모바일은 2~3장이 동시에 보이며 양 끝 마스크로 출입 시 자연스럽게 페이드된다. 동일한 12장 그룹 두 개로 끝과 시작을 연결한다. 텍스트와 별도 grid 칸 및 overflow clipping으로 침범을 막고, 텍스트 묶음(제목·소개·버튼·안내문)에 사진 높이를 맞췄다. 1차 구현의 개별 사진 88%·94% 높이 차이는 후속 요청에 따라 제거해 모든 사진을 100% 높이로 통일했다.
- 로딩·조작 — 이미지 디코드 후 이동 시작, 일시정지/재생, OS 동작 줄이기 초기 정지와 수동 재생, 화면 밖·숨겨진 탭 정지, 홈을 떠날 때 관찰자/이벤트 해제. AI 생성 안내를 사진 아래 명시했다.
- 변경 파일 — `app/dist/app.js`, `app/dist/style.css`, `app/tools/check-hero-album.mjs`, `app/design/hero-album.md`, `screenshots/2026-11-26-hero-album/`, `PROMPTS.md`, `CHECKLIST.md`, `conversations/README.md`.
- 검증 — `node validate.cjs` PASS(12명·47장면·94선택지·96경로), `node --check app/dist/app.js` PASS. `node tools/check-hero-album.mjs` PASS: 12명 모두 표시, 반복 이음 오차 0px, 데스크톱 텍스트/무대/개별사진 높이 차이 0px·상단 차이 0px·가로 간격 43.1875px, 정지/재생, 동작 줄이기 및 수동 재생, 320/390/768/900/901/1024/1920px 가로 넘침·영역 겹침 없음, 캐릭터 선택·홈 재진입·새 게임 시작, JS 오류 없음.
- 검증 중 재시도 — 최초 소스 편집은 PowerShell 파이프 UTF-8 설정 누락으로 일치 문자열을 찾지 못해 변경 없이 종료했고 UTF-8로 재실행했다. 검증 실행 경로를 app/로 수정했다. 비동기 동작 줄이기 이벤트를 기다리도록 하고 기존 진행의 ‘새로 시작’ 확인창을 처리하도록 검증 스크립트를 수정한 후 통과했다.
- 화면 — `http://127.0.0.1:4191/`, 홈 기본 상태·공개 가상 인물·AI API 차단. 원본은 `local-assets/screenshots/2026-11-26-hero-album/`. `before-desktop.png`·`after-desktop-aligned.png` 1440×900, `before-mobile.png`·`after-mobile-aligned.png` 780×1688(390×844 @2x). 최초 수정본 `after-desktop.png`·`after-mobile.png`는 사진별 높이가 다른 중간 상태로 보존했다. `phase-0~3-desktop-aligned.png`는 실제 브라우저 애니메이션을 0/24/48/72초로 이동시켜 촬영한 12명 구도 검토 자료(1440×900)다. 최종 데스크톱·모바일 및 4개 구간 사진을 각각 다시 열어 얼굴·이름·버튼 가림과 높이 정렬을 확인했다. 양 끝 인물은 의도적으로 부분 노출·페이드되며 중앙으로 이동하면 전체 카드가 보인다.
- 공개 대표 화면 — [전 데스크톱](screenshots/2026-11-26-hero-album/before-desktop.png) · [후 데스크톱](screenshots/2026-11-26-hero-album/after-desktop-aligned.png) · [전 모바일](screenshots/2026-11-26-hero-album/before-mobile.png) · [후 모바일](screenshots/2026-11-26-hero-album/after-mobile-aligned.png) · [라마·마리암·아시프](screenshots/2026-11-26-hero-album/phase-1-desktop-aligned.png) · [호단·나데주·암나](screenshots/2026-11-26-hero-album/phase-2-desktop-aligned.png) · [누르·그라스·람](screenshots/2026-11-26-hero-album/phase-3-desktop-aligned.png).
- 대화 캡처 — 2026-11-26 현재 대화 제목의 Paseo 창을 확인하고 접근을 시도했으나 `Computer Use app approval timed out`(약 303초)으로 캡처 전 실패했다. 사진 높이 재검토 결정은 위 실제 발췌로 남겼으며 원본 모니터 캡처는 대기다. 합성 대화 이미지는 만들지 않았다.
- 배포 — 이번 작업은 로컬 구현·검증·커밋까지. 원격 푸시와 배포는 하지 않았다.


## 2026-11-26-deploy-hero-album

- 실제 요청 — “배포해줘”
- 한 일 — 배포 전 라이브 홈 데스크톱·모바일을 촬영했다. `app/`에서 `node validate.cjs` PASS 후 `node sync-onischool.cjs`로 확인된 `OniSchool/onischool-release/anotherday/`에 동기화했다. 변경은 app.js·style.css·index.html 3개이며 배포 커밋 `44f6096`을 origin main에 푸시했다. 라이브 `app.js?v=cfc3c871c2`, `style.css?v=531e389538` 반영을 확인했다. 루트 README의 오래된 미배포 안내도 실제 배포 현황에 맞게 수정했다.
- 검증 — `check-hero-album.mjs`에 URL·출력 폴더 인자를 추가해 실제 `https://onischool.net/anotherday/`에서 실행, PASS. 12명 전체 등장, 반복 연결 오차 0px, 사진/텍스트 높이·상단 차이 0px, 영역 간격 43.1875px. 일시정지/재생, OS 동작 줄이기, 320~1920px 7개 폭의 가로 넘침·겹침 없음, 캐릭터 선택·홈 재진입·새 게임 시작, JS 오류 없음. 최초 validate 호출은 루트에서 실행해 dist 경로 오류가 나서 app/에서 다시 실행했다.
- 화면 — 라이브 URL, 기본 홈·가상 인물 데이터, API 차단. 원본 `local-assets/screenshots/2026-11-26-deploy-hero-album/`에 before/after-desktop.png(1440×900), before/after-mobile.png(780×1688), phase-0~3-desktop-aligned.png(1440×900)를 보존했다. 저장한 8장을 직접 열어 배포 전 모자이크에서 배포 후 앨범으로 전환, 텍스트 비침범, 사진 높이 정렬, 얼굴·버튼 가림 없음을 확인했다. 구간별 화면은 실제 브라우저 애니메이션을 0/24/48/72초에 정지시켜 촬영했다.
- 대표 화면 — [PC 전](screenshots/2026-11-26-deploy-hero-album/before-desktop.png) · [PC 후](screenshots/2026-11-26-deploy-hero-album/after-desktop.png) · [모바일 전](screenshots/2026-11-26-deploy-hero-album/before-mobile.png) · [모바일 후](screenshots/2026-11-26-deploy-hero-album/after-mobile.png).
- 변경 파일 — README.md, CHECKLIST.md, PROMPTS.md, app/design/hero-album.md, app/tools/check-hero-album.mjs, screenshots/2026-11-26-deploy-hero-album/.
- 대화 캡처 — 앞선 같은 세션에서 대화 앱 접근 승인 시간이 초과되어 캡처 대기 상태다. 실제 요청은 위 발췌로 남겼다.

## 2026-11-26-min-length

- 실제 요청 — “활동 돌아보기 시 질문이 조금 막연해 내가 개인적으로 바꿀 수 없던 것은 무엇이었나요라는 질문 같은 경우 작성하기가 어려워. 그리고 최소 글자를 정하자. 20글자 이상은 작성해야 해. 활동돌아보기 이후에 학생들이 작성하는 모든 내용들은 최소글자가 있어야 해. 개선해줘.”
- 한 일
  1. 돌아보기 두 번째 질문 ‘내 선택만으로는 바꾸기 어려웠던 것은?’을 ‘(인물 이름)가 무엇을 골라도 그대로였던 어려움은?’으로 바꾸고, 누르면 칸에 들어가 첫 빈칸이 선택되는 문장 틀 5개(시설·돈·제도·안전·자연)를 추가했다. 첫 번째 질문에도 ‘무엇이, 왜 중요했는지’ 안내와 20자 이상 예시를 넣었다.
  2. 돌아보기 이후 학생이 쓰는 모든 칸(돌아보기 2칸, 나의 질문, 알게 된 것, 결과물 형식별 4칸)에 최소 20자를 적용했다. 공백은 여러 칸이어도 한 칸으로 센다. 짧아야 자연스러운 신문 제목·제안 이름·편지 받는 사람만 10자로 두었다(`MIN_SHORT`에서 조정 가능). 질문 틀·문장 틀의 ____ 빈칸이 남아 있으면 덜 쓴 것으로 본다.
  3. 칸 아래에 ‘2 / 20자 · 18자 더’처럼 실시간 글자 수를 보여 주고 기준을 넘으면 테마색 ‘n자 · 좋아요’로 바뀐다. 다음 단계·피드백 대화·완성 버튼에서 기준 미달이면 안내창을 띄우고 첫 미달 칸으로 이동한다.
  4. 대화·AI 질문·피드백 대화 입력창은 짧게 주고받는 채팅이라 최소 글자 대상에서 제외했다.
- 변경 파일 — `app/dist/app.js`, `app/dist/style.css`, `app/tools/check-min-length.mjs`(신규), `CHECKLIST.md`, `PROMPTS.md`, `screenshots/2026-11-26-min-length/`.
- 검증 — `npm run validate` PASS(12명·47장면·94선택지·96경로), `node --check dist/app.js` PASS. `node tools/check-min-length.mjs --url http://127.0.0.1:4193/` 15항목 ALL PASS: 새 질문 표시, 글자 수 표시, 문장 틀 입력과 빈칸 안내, 미달 시 돌아보기·질문·조사·결과물 각 단계 진행 차단, 기준 충족 시 이동, 편지 받는 사람 10자 기준, 완성 화면 도달, JS 오류 없음. 첫 실행은 검사 스크립트가 안내창을 `#modal`로 잘못 찾아 실패했고, 실제 안내창(`.modal.dialog`)을 기다리도록 고친 뒤 통과했다.
- 화면 — 로컬 `http://127.0.0.1:4193/`, 투발루 시오네·닉네임 `테스트`·선택 [0,0,0]·첫 칸에 ‘가족’ 입력, AI 차단. 원본은 `local-assets/screenshots/2026-11-26-min-length/`의 before/after-desktop(1440×900), before/after-mobile(780×1688)과 `-fields`(입력 칸으로 이동), `-lab`(질문·조사), after `-starter`(돈 문장 틀 선택) 변형. 저장한 화면을 열어 새 질문과 안내문, 글자 수 표시, 문장 틀 5개가 데스크톱·모바일에서 잘리거나 버튼을 가리지 않는 것, 문장 틀을 누르면 첫 빈칸이 선택되고 ‘빈칸(____)을 채워 주세요’가 뜨는 것을 확인했다.
- 공개한 대표 화면 — [전 PC](screenshots/2026-11-26-min-length/before-desktop-fields.png) · [후 PC](screenshots/2026-11-26-min-length/after-desktop-fields.png) · [전 모바일](screenshots/2026-11-26-min-length/before-mobile-fields.png) · [후 모바일](screenshots/2026-11-26-min-length/after-mobile-fields.png) · [문장 틀 선택](screenshots/2026-11-26-min-length/after-mobile-starter.png) · [질문·조사 글자 수](screenshots/2026-11-26-min-length/after-desktop-lab.png)
- 대화 캡처 — 촬영하지 못했다(대기). 위 실제 요청 발췌로 대신한다.
- 배포 — 로컬 구현·검증·커밋까지. 원격 푸시와 배포는 하지 않았다.

## 2026-11-26-deploy-min-length

- 실제 요청 — “배포 후 캡쳐도 진행. 그리고 작업기록 틈틈히 기록해줘.”
- 진행 기록
  1. (11:05) 대화 캡처 — 첫 시도는 DPI 배율 때문에 가상 화면이 1536×864로 잡혀 잘라내기에 실패했다. `SetProcessDPIAware` 후 재캡처해 1920×1080 원본(`local-assets/conversations/2026-11-26-min-length/01-request-deploy-full.png`, 이번엔 모니터 1대라 전체 = 왼쪽 영역)과 `01-request-deploy.png`를 저장했다. 처음엔 좌우 창의 다른 세션을 빼려고 가운데 대화 창만 자른 `01-request-deploy-terminal.png`(642×975)도 만들었으나, 사용자가 “아냐 그냥 전체 대화 캡쳐해도 돼. 프롬프트 내용이 md로 들어가기 떄문에 그 기록만 있어도 충분해”라고 해 전체 화면 `01-request-deploy.png`를 기본 기록으로 쓴다.
  2. 배포 전 라이브 화면 — `https://onischool.net/anotherday/`, 시오네·닉네임 `테스트`·선택 [0,0,0]·첫 칸 ‘가족’, AI 차단, 두 번째 칸으로 이동. `local-assets/screenshots/2026-11-26-deploy-min-length/before-desktop-fields.png`(1440×900)·`before-mobile-fields.png`(780×1688). 열어 보니 예전 질문 ‘내 선택만으로는 바꾸기 어려웠던 것은?’과 글자 수 표시 없음이 그대로였다.
  3. 배포 — `app/`에서 `npm run validate` PASS 후 `node sync-onischool.cjs`(66개 파일). 바뀐 파일은 app.js·style.css·index.html 3개. onischool-release `722093a`를 origin main에 푸시(Cloudflare Pages 자동 배포). 새 해시 `app.js?v=5215830f0d`, `style.css?v=eaf9a57952`.
  4. 라이브 검증 — 1차 조회 이전 해시, 약 20초 뒤 `app.js?v=5215830f0d` 반영 확인. `node tools/check-min-length.mjs --url https://onischool.net/anotherday/` 15항목 ALL PASS. 같은 조건으로 `after-desktop-fields.png`(1440×900)·`after-mobile-fields.png`(780×1688)·`after-*-starter.png`를 촬영해 열어 보니 새 질문, ‘2 / 20자 · 18자 더’ 표시, 문장 틀 5개와 첫 빈칸 선택, ‘빈칸(____)을 채워 주세요’ 안내가 잘림 없이 보였다.
  5. (11:09) 배포 후 대화 캡처 — 사용자 지시대로 전체 화면 그대로 `local-assets/conversations/2026-11-26-min-length/02-after-deploy.png`(1920×1080)로 저장, 열어서 배포 검증 대화가 읽히는 것을 확인했다.
- 공개한 대표 화면 — [배포 전 PC](screenshots/2026-11-26-deploy-min-length/before-desktop-fields.png) · [배포 후 PC](screenshots/2026-11-26-deploy-min-length/after-desktop-fields.png) · [배포 전 모바일](screenshots/2026-11-26-deploy-min-length/before-mobile-fields.png) · [배포 후 모바일](screenshots/2026-11-26-deploy-min-length/after-mobile-fields.png) · [배포 후 문장 틀](screenshots/2026-11-26-deploy-min-length/after-mobile-starter.png)
- 대화 캡처 — [배포 요청](screenshots/conversations/2026-11-26-min-length/01-request-deploy.png) · [배포 후 검증](screenshots/conversations/2026-11-26-min-length/02-after-deploy.png)
- 변경 파일 — `PROMPTS.md`, `CHECKLIST.md`, `conversations/README.md`, `screenshots/2026-11-26-deploy-min-length/`, `screenshots/conversations/2026-11-26-min-length/`. 사이트 저장소는 onischool-release `722093a`.


## 2026-11-26-paseo-workflow

- 실제 요청 — “현재 이 paseo 대화창 화면도 캡쳐해서 이런 식으로 작업하고 있다는 걸 알 수 있게 해줘”
- 한 일 — computer-use로 현재 Paseo 창을 확인하고 실제 창 캡처 2장을 저장했다. 대화와 코드/실행 작업을 함께 보여주는 원본을 보존하고 공개본에는 이전 캡처 속 개인정보·전송 전 입력·외부 문서 주소를 명시적으로 가렸다. 화면이나 발화를 합성하지 않았다.
- 원본 — `local-assets/conversations/2026-11-26-paseo-workflow/paseo-window-original.png`, `paseo-workflow-original.png`, 각 1536×816. 2026-11-26 촬영. 후자가 최종 대표 원본이다.
- 공개본 — [Paseo 작업 방식](screenshots/conversations/2026-11-26-paseo-workflow/paseo-workflow-redacted.png), 1536×816. 저장 후 다시 열어 가림과 실제 대화·작업 화면을 확인했다.
- 제한 — 창 선택/접근성 조회가 지연되고 사용자 입력 감지로 확대·스크롤이 중단됐다. 반환된 창 해상도 그대로 저장했으며 1920×1080 모니터 원본으로 확대하거나 완료 처리하지 않았다. 모니터 원본 재촬영은 남아 있다. 앱 화면 수정이 없는 증거 정리이므로 이 항목의 전후 앱 화면 확인은 비대상이다.

## 2026-11-26-hero-autoplay

- 실제 요청 — “그리고 히어로 섹션에서 캐릭터들이 움직이는게 자동 재생이 되어야 해. 지금은 재생을 눌러야 애니메이션이 동작해”
- 원인·수정 — OS 동작 줄이기가 켜지면 `paused=motion.matches`로 시작하던 조건을 제거했다. 사용자 명시 요청에 따라 설정과 무관하게 사진 디코드 후 자동 재생한다. 수동 일시정지/재생, 탭 숨김·화면 밖 정지, 화면 종료 정리는 유지했다.
- 검증 — Playwright의 `reducedMotion: reduce`에서 데스크톱·모바일 모두 최초 정지를 재현했다. 수정 후 클릭 없이 transform이 변하는지, 일시정지 후 고정되는지, 재생 후 다시 변하는지를 `check-hero-autoplay.mjs`로 확인해 PASS. `node validate.cjs` PASS(12명·47장면·94선택·96경로). 기존 `check-hero-album.mjs`의 동작 줄이기 기대값도 자동 재생에 맞게 수정했다.
- 화면 — 기본 홈, API 차단, 동일한 reduced-motion 조건. `local-assets/screenshots/2026-11-26-hero-autoplay/before-desktop-reduced.png`·`after-desktop-reduced.png` 1440×900, `before-mobile-reduced.png`·`after-mobile-reduced.png` 780×1688. 전은 라이브, 후는 로컬 http://127.0.0.1:4191/ 이며 화면을 각각 열어 최초 ‘재생’ 표시가 ‘일시정지’로 바뀌고 사진 위치가 이동함을 확인했다. 별도 `before-desktop.png`·`before-mobile.png`는 기본 OS 설정 촬영으로 재현용 reduced 파일과 구별한다.
- 배포 — 기존 다른 작업을 보존하며 onischool-release의 app.js와 캐시 해시만 갱신하고 `a75fa3f`를 푸시했다. 라이브 검증 결과는 아래에 추가한다.

- 라이브 검증 — `app.js?v=6973754653` 반영. `check-hero-autoplay.mjs https://onischool.net/anotherday/`의 데스크톱·모바일 자동 재생 및 일시정지/재생 모두 PASS. 라이브 후 화면은 `local-assets/screenshots/2026-11-26-hero-autoplay-live/after-desktop-reduced.png`(1440×900), `after-mobile-reduced.png`(780×1688)에 보존하고 각각 직접 열어 확인했다.
- 공개 전후 — [PC 전](screenshots/2026-11-26-hero-autoplay/before-desktop-reduced.png) · [PC 후](screenshots/2026-11-26-hero-autoplay/after-desktop-reduced.png) · [모바일 전](screenshots/2026-11-26-hero-autoplay/before-mobile-reduced.png) · [모바일 후](screenshots/2026-11-26-hero-autoplay/after-mobile-reduced.png).

## 2026-11-26-no-nickname

- 실제 요청 — “그리고 시작 시 이름 닉네님을 입력하는 란은 걷어내자. 왜냐하면 이 사람의 삶을 사는거니까 내가 해당인물이 된거잖아. 갤러리 제출 때에만 지금 현재 방식처럼 내 정보를 입력하면 돼”
- 앞선 확인(같은 대화) — “생각해보기 입력 필드 란에 그냥 ㄷㄷ만 입력해도 다음 단게로 진행되는데?” → 사용자 Chrome 탭이 배포 전 옛 질문 문구와 글자 수 표시 없는 화면이었다. 라이브(`app.js?v=6973754653`)에서 같은 입력을 재현하면 “2 / 20자 · 18자 더”와 안내창이 떠 진행이 막혔다. 첫 페이지는 `Cache-Control: max-age=0`이라 새로고침하면 새 버전이 열리며, 배포 전부터 열려 있던 단일 페이지 탭이 원인이었다. 코드 변경 없음.
- 진행 기록
  1. 수정 전 촬영 — 로컬 `http://127.0.0.1:4193/`, 가나 코피, AI 차단. 인물 소개에서 ‘이 사람으로 시작’을 누른 화면(`before-*-join.png`)에 ‘플레이어 등록 · 플레이어 이름’ 팝업, 장면 화면(`before-*-chat.png`)에 초상 아래 ‘플레이어 · 테스트’ 표시를 확인했다.
  2. 구현 — 이름 입력 팝업(`openJoinModal`, `join-form` 처리)과 초상 아래 플레이어 표시(`playerTag`)를 없애고, ‘이 사람으로 시작’을 누르면 대화 칩을 미리 준비하며 곧바로 아침 장면으로 들어가게 했다. 결과물의 기자·제안자·보내는 사람은 갤러리 제출 칸의 학년·반·이름을 쓰고(`writer()`), 비어 있으면 ‘익명’으로 둔다. 갤러리 제출 칸과 갤러리 표시는 그대로다. 쓰지 않게 된 팝업·플레이어 CSS를 지웠다. 첫 치환 스크립트는 파일 줄바꿈이 CRLF로 바뀌어 있어 일치하지 않아 변경 없이 멈췄고, 줄바꿈과 무관하게 다시 작성해 적용했다.
  3. 검증 — `npm run validate` PASS(12명·47장면·94선택지·96경로), `node --check` PASS. 새 `node tools/check-no-nickname.mjs --url http://127.0.0.1:4193/` 9항목 ALL PASS(팝업 없음, 바로 장면 이동, 선택지 2개, 플레이어 표시 없음, 제출 정보 없으면 ‘익명 드림’, 있으면 ‘2학년 3반 홍길동 드림’, 제출 칸 유지, JS 오류 없음). 기존 `check-min-length.mjs` 15항목 ALL PASS.
  4. 수정 후 촬영 — 같은 조건으로 `after-*-join.png`(시작을 누르면 바로 ‘“오늘 하루만 같이 가자”’ 아침 장면), `after-*-chat.png`, `after-*-reflect.png`(돌아보기 초상에도 플레이어 표시 없음). 각각 열어 잘림·가림이 없음을 확인했다. 원본은 `local-assets/screenshots/2026-11-26-no-nickname/`, 데스크톱 1440×900·모바일 780×1688.
  5. 대화 캡처 — 이번엔 모니터 2대(1920×1080 + 2400×1350)라 전체 4800×1350을 `local-assets/conversations/2026-11-26-no-nickname/01-request-full.png`로 저장했다. 오른쪽 모니터만 잘라 본 파일은 창 경계와 맞지 않아 대화가 잘려 지웠고, 사용자 지시대로 전체 화면을 기록으로 쓴다.
  6. 커밋 정리 — 다른 세션의 히어로 자동 재생 작업(이미 배포·라이브 검증 완료)이 스테이징된 채 남아 있어, 섞이지 않게 그 스테이징 그대로 `d6406b9`로 먼저 커밋하고 이번 작업을 따로 커밋했다.
- 공개한 대표 화면 — [전 · 이름 입력 팝업](screenshots/2026-11-26-no-nickname/before-desktop-join.png) · [후 · 바로 아침 장면](screenshots/2026-11-26-no-nickname/after-desktop-join.png) · [후 모바일](screenshots/2026-11-26-no-nickname/after-mobile-join.png) · [전 모바일 장면](screenshots/2026-11-26-no-nickname/before-mobile-chat.png) · [후 돌아보기](screenshots/2026-11-26-no-nickname/after-desktop-reflect.png)
- 대화 캡처 — [요청 장면](screenshots/conversations/2026-11-26-no-nickname/01-request.png)
- 변경 파일 — `app/dist/app.js`, `app/dist/style.css`, `app/tools/check-no-nickname.mjs`(신규), `PROMPTS.md`, `CHECKLIST.md`, `conversations/README.md`, `screenshots/2026-11-26-no-nickname/`, `screenshots/conversations/2026-11-26-no-nickname/`.
- 배포 — 아래 `2026-11-26-letter-sign`과 함께 배포했다.

## 2026-11-26-letter-sign

- 실제 요청 — “편지쓰기에서 드림은 해당인물의 이름을 넣으면 돼. 마리암 드림, 코피 드림 이렇게 말이야” / 이어서 “작업후 커밋 배포 해줘”
- 한 일 — 편지 서식의 맺음 줄을 제출자 이름(없으면 ‘익명’) 대신 인물 이름으로 바꿨다(`${c.name} 드림`). 신문 기자·정책 제안자는 이전 작업대로 제출 칸 정보를 쓴다. 갤러리에서 보는 편지도 같은 서식이라 인물 이름으로 나온다.
- 검증 — `node --check` PASS. `check-no-nickname.mjs`의 편지 서명 항목을 “코피 드림”(제출 칸이 비었을 때와 채웠을 때 모두)으로 바꿔 9항목 ALL PASS.
- 화면 — 로컬, 가나 코피·편지 형식·예시 문장, AI 차단, 맺음 줄로 스크롤. 원본 `local-assets/screenshots/2026-11-26-letter-sign/` before/after-desktop(1440×900)·mobile(780×1688), 아프가니스탄 마리암 `after-*-afghanistan.png`. 열어 보니 전 ‘익명 드림’ → 후 ‘코피 드림’, ‘마리암 드림’이 잘림 없이 보였다.
- 공개한 대표 화면 — [전](screenshots/2026-11-26-letter-sign/before-desktop.png) · [후 코피](screenshots/2026-11-26-letter-sign/after-desktop.png) · [후 모바일](screenshots/2026-11-26-letter-sign/after-mobile.png) · [후 마리암](screenshots/2026-11-26-letter-sign/after-desktop-afghanistan.png)
- 변경 파일 — `app/dist/app.js`, `app/tools/check-no-nickname.mjs`, `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-letter-sign/`.


## 2026-11-26-padlet-rubric-and-trailer-prd

- 실제 요청
  - “https://padlet.com/limtaehyeong/15-s025jqwfv5267xpqq43o/wish/XGyBQb3KDqM9ZL6K 이 내용을 파악해서 채점기준 수정 및 가이드라인을 수정하여 깃에 커밋,푸시해줘”
  - “지금은 트레일러 영상 초안 틀을 짜자. 그리고 videos폴더에 들어갈 내용들이 뭐여야되는지 먼저 파악하고 작업을 시작할거야. 영상 초안틀은 md로 작성하자. 이 앱에 대해 발표했을 때 사용한 깃을 제시할게 참고해줘 https://github.com/yang102948549/moral-ai-class-1112”
  - “여러 인물 교차가 좋아. 사운드 방식은 a안으로, 추가캡쳐 방식도 도입하는걸로 해서 초안 틀 작성해줘. 지금은 영상 제작 prd라 생각하고 작성하면 돼”
- 한 일
  1. **패들렛 채점기준·가이드라인 반영 (`d050d8f`, 푸시 완료)** — 패들렛 공지 본문, 첨부 이미지(`CHECKLIST.md 만드는 법`), 첫 댓글 빈 양식을 모두 확인해 `DEVELOPMENT.md`, `CLAUDE.md`(로컬 `AGENTS.md` 동기화), `video/README.md`를 개정했다. 마감일(12월 9일 23:59), 통과 조건·감점 기준, 정성 평가 100점과 3단계 척도(기본값/손봄/깎음), DB·API 가산점 조건, `CHECKLIST.md` 공식 양식·규칙을 반영했다.
  2. **`video/` 폴더 구성 및 트레일러 초안 (`c6efb08`)** — 공식 폴더명이 `videos/`가 아닌 단수 `video/`임을 명시하고, Git 커밋 대상(`TRAILER-PLAN.md`, `PROCESS-PLAN.md`, Remotion 소스·선별 정적 에셋)과 `local-assets/` 제외 대상(`node_modules/`, 완성 MP4)을 `video/README.md`에 정리했다. 발표 슬라이드 저장소 `moral-ai-class-1112`(27장)를 분석해 르포 매거진 톤과 “왜 안 갔니? → 왜 못 갔니?” 질문 구조를 계승한 초안을 작성했다.
  3. **트레일러 영상 제작 PRD 확정 (`video/TRAILER-PLAN.md`)** — 사용자 확정에 따라 ① 여러 인물 교차(12명 얼굴·앨범 + 마리암 + 시오네 분기 + 아시프·코피·그라스·라마 4인 현장 몽타주), ② 사운드 안 A(무내레이션, 타이포 중심 + 잔잔한 BGM + 절제된 SFX), ③ 라이브 추가 캡처 4컷(`CAP-01`~`CAP-04`: AI 대화 칩, 조사 응답·출처 열림, 결과물·피드백, 학급 갤러리) 명세를 포함해 총 54초(1,620 frames @ 30fps) 프레임 단위 스토리보드, Remotion 코드 아키텍처, ‘깎음’ 검수 기준을 PRD 형식으로 완성했다.
- 변경 파일 — `DEVELOPMENT.md`, `CLAUDE.md`, `video/README.md`, `video/TRAILER-PLAN.md`, `PROMPTS.md`.
- 검증 — 문서 내 참조한 기존 앱 캡처 및 상황 이미지 11개 경로 존재 확인(모두 True). 문서 전용 작업이므로 앱 UI 전후 촬영은 비대상이다.
- 대화 캡처 — 촬영하지 못했다(대기). 위 실제 요청 발췌로 대신한다.
- 배포 — 문서 작업이므로 사이트 배포 비대상. `d050d8f`는 원격 푸시 완료, `video/` PRD 커밋은 로컬 커밋까지 수행.

## 2026-11-26-deploy-no-nickname

- 실제 요청 — “작업후 커밋 배포 해줘”
- 진행 기록
  1. 배포 전 라이브 촬영 — `https://onischool.net/anotherday/`, 가나 코피, AI 차단. `before-*-join.png`에 ‘플레이어 등록’ 이름 입력 팝업, `before-*-letter.png`에 ‘익명 드림’을 확인했다.
  2. 배포 — `app/`에서 `npm run validate` PASS, `node sync-onischool.cjs`(66개 파일, 바뀐 파일 app.js·style.css·index.html). 배포본 app.js가 과제 저장소 `d9c16a0`의 app.js와 같은지 해시로 확인한 뒤 onischool-release `f65d635`를 origin main에 푸시했다. 새 해시 `app.js?v=403931cb72`.
  3. 라이브 검증 — 약 20초 뒤 해시 반영. 라이브에서 `check-no-nickname.mjs` 9항목, `check-min-length.mjs` 15항목 모두 ALL PASS. `after-*-join.png`(누르면 바로 ‘“오늘 하루만 같이 가자”’ 아침 장면), `after-*-letter.png`(‘코피 드림’)를 열어 잘림·가림 없음을 확인했다. 원본은 `local-assets/screenshots/2026-11-26-deploy-no-nickname/`, 데스크톱 1440×900·모바일 780×1688.
  4. 대화 캡처 — (12:00) 전체 화면 1920×1080 `local-assets/conversations/2026-11-26-no-nickname/02-after-deploy-full.png`.
- 공개한 대표 화면 — [배포 전 시작](screenshots/2026-11-26-deploy-no-nickname/before-desktop-join.png) · [배포 후 시작](screenshots/2026-11-26-deploy-no-nickname/after-desktop-join.png) · [배포 후 모바일](screenshots/2026-11-26-deploy-no-nickname/after-mobile-join.png) · [배포 전 편지](screenshots/2026-11-26-deploy-no-nickname/before-desktop-letter.png) · [배포 후 편지](screenshots/2026-11-26-deploy-no-nickname/after-desktop-letter.png)
- 대화 캡처 — [배포 후 장면](screenshots/conversations/2026-11-26-no-nickname/02-after-deploy.png)
- 변경 파일 — `PROMPTS.md`, `CHECKLIST.md`, `conversations/README.md`, `screenshots/2026-11-26-deploy-no-nickname/`, `screenshots/conversations/2026-11-26-no-nickname/02-after-deploy.png`. 사이트 저장소 `f65d635`.

## 2026-11-26-letter-from

- 실제 요청 — “그럼 편지쓸 때는 누구에게 쓸지, 마지막에 작성자의 이름을 작성하는 걸로 하자.”
- 진행 기록
  1. 수정 전 촬영 — 로컬, 가나 코피·편지 형식·예시 문장, AI 차단. `before-*-plan.png`는 편지 칸이 받는 사람·알게 된 것·부탁·나도 할 일 네 칸뿐이고, `before-*-letter.png`는 맺음이 인물 이름 ‘코피 드림’으로 고정된 상태다.
  2. 구현 — 편지 형식 맨 끝에 ‘보내는 사람 · 작성자 이름’ 칸(`l_from`, 최소 2자)을 추가하고 맺음 줄을 그 이름으로 바꿨다(`signOf`). 학생이 ‘드림’·‘올림’까지 적어도 한 번만 나오게 하고, 이 칸이 없던 예전 제출물은 인물 이름으로 보인다. 받는 사람 칸(`l_to`)은 그대로 맨 앞이다. 첫 치환은 정규식의 `\s`가 `s`로 들어가 Edit로 바로잡았다.
  3. 빈 칸 처리 수정 — 검사 중, 칸이 완전히 비어 있으면 textarea의 `required` 때문에 브라우저 기본 말풍선만 뜨고 앱의 안내창·해당 칸 이동이 동작하지 않는 것을 발견했다(이전부터 있던 문제). 돌아보기·결과물 폼에 `novalidate`를 붙여 빈 칸도 앱 안내창으로 처리한다.
  4. 갤러리 서버 — onischool-release `functions/anotherday/api/gallery.js`가 형식별로 정한 칸만 저장해 `l_from`을 선택 칸(`OPTIONAL`)으로 추가했다. 배포 전부터 열려 있던 화면의 제출도 거절되지 않도록 필수는 아니다. `clean()`을 직접 불러 예전 제출(l_from 없음 → 빈 값 저장), 새 제출(‘코피’ 저장), 다른 형식 영향 없음, 필수 칸 누락 시 `empty_field`를 확인했다.
  5. 검증 — `npm run validate` PASS, `node --check` PASS. `check-min-length.mjs` ALL PASS(보내는 사람이 비면 완성 안 됨, 2자 기준 추가). `check-no-nickname.mjs` ALL PASS(예전 편지 ‘코피 드림’, ‘2학년 3반 김하늘 드림’처럼 드림 한 번). 첫 실행은 검사 스크립트 쪽 실수(새 블록에서 `errors` 변수 누락, 부족한 칸 수 2→3)로 실패해 고쳤다.
  6. 수정 후 촬영 — `after-*-plan.png`(보내는 사람 칸과 ‘0 / 2자 · 2자 더’), `after-*-letter.png`(‘2학년 3반 김하늘 드림’). 열어 보니 잘림·가림이 없다. 원본 `local-assets/screenshots/2026-11-26-letter-from/`, 데스크톱 1440×900·모바일 780×1688.
  7. 대화 캡처 — (12:13) 전체 화면을 찍었으나 화면에 다른 업무 창(인증서 로그인, 실명 노출)이 떠 있어 바로 지웠다. 이번 작업 대화 캡처는 없고 위 실제 요청 발췌로 대신한다.
- 공개한 대표 화면 — [전 입력](screenshots/2026-11-26-letter-from/before-desktop-plan.png) · [후 입력](screenshots/2026-11-26-letter-from/after-desktop-plan.png) · [후 모바일](screenshots/2026-11-26-letter-from/after-mobile-plan.png) · [전 편지](screenshots/2026-11-26-letter-from/before-desktop-letter.png) · [후 편지](screenshots/2026-11-26-letter-from/after-desktop-letter.png)
- 변경 파일 — `app/dist/app.js`, `app/tools/check-min-length.mjs`, `app/tools/check-no-nickname.mjs`, `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-letter-from/`. 사이트 저장소 `functions/anotherday/api/gallery.js`(배포 때 커밋).
- 배포 — 2026-11-26 `2026-11-26-deploy-genre-writing`에서 함께 배포했다(사이트 `695130d`).

## 2026-11-26-genre-writing

- 실제 요청 — “편지 외에 정책제안서와 신문기사도 작성 로직을 수정하자. 지금은 질문에 작성된 내용이 편지, 신문기사, 정책제안서에 그냥 칸칸마다 넣어져서 전혀 그 성격이 드러나질 않아. 편지, 신문기사, 정책제안서 셋 중에 하나를 선택하는 것을 먼저 선택하고 거기에 맞게 작성하도록 유도하는 게 좋아. 지금은 먼저 작성 파악 뒤 편지, 신문기사, 정책제안서에 메일머지 넣듯이 들어가는 구조라서 작성물을 평가할 수도 없어. 내용이 이상하게 들어오니까”
- 진행 기록
  1. 수정 전 촬영 — 로컬, 투발루 시오네·예시 조사 내용, AI 차단. `before-*-lab.png`는 질문·조사에 형식 선택이 없고 질문 틀이 한 가지뿐인 상태, `before-*-letter.png`는 결과물 단계에서야 형식을 고르고 칸 이름(받는 사람·내가 알게 된 것…)만 있는 상태다.
  2. 형식 먼저 — 질문·조사(마무리 2/4) 맨 앞에 ‘① 어떤 글로 세상에 내놓을까’를 두고, 고르기 전에는 질문·조사 칸 대신 안내만 보인다. 고르지 않고 ‘결과물 만들기’를 누르면 안내창이 뜬다. 질문 틀과 ‘알게 된 것’ 안내가 종류별로 달라진다(기사: 독자가 알아야 할 사실·규모, 제안서: 이미 있는 정책과 부족한 점·비용, 편지: 받을 사람이 할 수 있는 일). 형식 카드에 ‘읽는 사람’을 함께 보인다.
  3. 그 글답게 쓰기 — 결과물(마무리 3/4)은 고른 글로 바로 시작한다. 첫머리에 글 이름과 말투 안내(기사 ‘~했다/~이다’, 제안서 ‘~해야 한다/~을 제안한다’, 편지 존댓말·자기소개·부탁·다짐), ‘다른 글로 바꾸기’ 버튼. 칸은 그 글의 차례대로 번호를 붙이고, 칸마다 쓰는 법과 누르면 칸 끝에 이어 붙는 문장 틀을 준다. 편지는 줄 친 편지지, 기사는 큰 제목·명조 본문, 제안서는 장 표시 선으로 쓰는 칸이 그 글의 생김새를 닮게 했다.
  4. 칸 구성 — 편지에 ‘첫인사 · 나를 소개하고 쓰는 까닭’(`l_open`)을, 제안서에 ‘수신 · 누구에게 제안하나’(`p_to`, 최소 2자)를 추가했다. 편지 받는 사람은 이제 부르는 말만 쓰므로 최소 10자→4자. 완성 제안서의 ‘핵심 요약’은 각 칸의 첫 문장을 잘라 붙이던 것이라 지웠고, 수신은 학생이 적은 기관으로 표시한다(없던 예전 제출물은 기존 관련 주체).
  5. 글의 성격 체크 — 종류마다 기준 6개를 화면에 보이고 쓰는 동안 ✓/○로 바로 갱신한다(예: 기사 ‘출처를 밝혔다’, ‘나·저 같은 기자 자신의 말이 없다’, 제안서 ‘실행할 주체’, ‘현지 의견을 들을 방법’, 편지 ‘존댓말’, ‘받는 사람이 할 수 있는 일을 부탁’). 완성을 막지 않는 자기 점검이자 평가 기준이며, 같은 기준을 AI 피드백 대화의 선생님 판단 기준으로 넘긴다(`ai.js` `review`의 `criteria`).
  6. 함께 고친 것 — 글자 수 세기 정규식이 `/s+/`로 들어가 있어(공백을 한 칸으로 줄이지 못함) `/\s+/`로 바로잡았다. 검사 중 ‘옮겨야 한다’가 제안 문장으로, ‘편지를 씁니다’가 쓰는 까닭으로 인식되지 않는 것과 빈 기사가 ‘나·저 없음’을 통과하는 것을 발견해 기준을 고쳤다. 리드 문장 틀이 역할에 이름이 겹쳐 ‘시오네(열세 살 학생 시오네)’로 나와 이름만 쓰게 했다. 모바일에서 번호가 한 줄을 차지해 칸 옆으로 옮겼고, 제안서 칸 이름의 Ⅰ·Ⅱ·Ⅲ이 차례 번호와 겹쳐 뺐다(이 두 수정 전 `after-*-article-desk.png`, `after-*-policy-desk.png`는 지우고 다시 찍었다).
  7. 갤러리 서버 — onischool-release `functions/anotherday/api/gallery.js`의 선택 칸에 `l_open`, `p_to`를 추가했다. `clean()` 직접 검사: 예전 편지·제안서 받음, 새 칸 저장, 기사에는 다른 형식 칸이 붙지 않음, 필수 칸 누락 시 `empty_field` — 모두 PASS.
  8. 검증 — `npm run validate` PASS. 새 `tools/check-genre-writing.mjs` ALL PASS(종류 선택 전 질문 칸 없음, 종류별 질문 틀, 고른 글로 시작, 문장 틀 삽입·빈칸 선택·이어 붙임, 성격 체크 0→6 즉시 갱신과 ‘저는’이 들어가면 6→5, 다른 글로 바꾸기, 제안서 완성 화면 수신·핵심 요약 없음, 편지 첫인사 순서, 예전 제안서 표시, JS 오류 없음). `check-min-length.mjs`(종류 선택 필수, 편지 4칸 부족 안내로 갱신)·`check-no-nickname.mjs` ALL PASS. 캡처 도구에 아래쪽 부분을 찍는 `--scroll` 옵션을 추가했다.
  9. 수정 후 촬영 — `after-*-lab.png`(종류 선택과 안내), `after-*-lab-letter.png`(편지를 고른 뒤 질문 틀), `after-*-letter.png`(글 이름·말투 안내), `after-*-letter-desk.png`(편지지 칸과 문장 틀), `after-*-article-desk.png`, `after-*-article-check.png`(성격 체크 4/6), `after-*-policy-desk.png`, `after-*-policy-report.png`(수신 ‘투발루 정부’, 핵심 요약 없음). 모두 열어 잘림·가림이 없음을 확인했다. 원본 `local-assets/screenshots/2026-11-26-genre-writing/`, 데스크톱 1440×900·모바일 780×1688.
  10. 대화 캡처 — (14:06) 전체 화면 4800×1350을 찍었으나 왼쪽 모니터에 업무포털(실명·학교명)이 떠 있어 바로 지웠다. 이번 작업 대화 캡처는 없고 위 실제 요청 발췌로 대신한다.
- 공개한 대표 화면 — [전 질문·조사](screenshots/2026-11-26-genre-writing/before-desktop-lab.png) · [후 질문·조사](screenshots/2026-11-26-genre-writing/after-desktop-lab.png) · [후 모바일 질문 틀](screenshots/2026-11-26-genre-writing/after-mobile-lab-letter.png) · [전 결과물](screenshots/2026-11-26-genre-writing/before-desktop-letter.png) · [후 결과물](screenshots/2026-11-26-genre-writing/after-desktop-letter.png) · [편지 쓰기](screenshots/2026-11-26-genre-writing/after-desktop-letter-desk.png) · [기사 쓰기 모바일](screenshots/2026-11-26-genre-writing/after-mobile-article-desk.png) · [성격 체크](screenshots/2026-11-26-genre-writing/after-desktop-article-check.png) · [제안서 쓰기](screenshots/2026-11-26-genre-writing/after-desktop-policy-desk.png) · [완성 제안서](screenshots/2026-11-26-genre-writing/after-desktop-policy-report.png)
- 변경 파일 — `app/dist/app.js`, `app/dist/ai.js`, `app/dist/style.css`, `app/tools/check-genre-writing.mjs`(새로), `app/tools/check-min-length.mjs`, `app/tools/capture.mjs`, `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-genre-writing/`. 사이트 저장소 `functions/anotherday/api/gallery.js`(배포 때 커밋).
- 배포 — 2026-11-26 `2026-11-26-deploy-genre-writing`에서 함께 배포했다(사이트 `695130d`).

## 2026-11-26-deploy-genre-writing

- 실제 요청 — “배포진행해줘 푸시도 같이해줘”
- 진행 기록
  1. 배포 전 라이브 촬영 — `https://onischool.net/anotherday/`, 투발루 시오네·예시 조사 내용, AI 차단. `before-*-lab.png`는 형식 선택 없이 ‘① 나의 질문’부터 시작, `before-*-letter.png`는 결과물 단계에서 형식을 고르는 예전 화면이다.
  2. 배포 — `app/`에서 `npm run validate` PASS, `node sync-onischool.cjs`(66개 파일, 바뀐 파일 app.js·ai.js·style.css·index.html). 배포본 app.js·ai.js·style.css가 과제 저장소 `0554a58`과 같은지 해시로 확인했다. 앞 작업(2026-11-26-letter-from)의 보내는 사람 칸과 갤러리 API 변경(`l_from`, `l_open`, `p_to` 선택 칸)을 함께 담아 onischool-release `695130d`를 origin main에 푸시했다. 새 해시 `app.js?v=069541c211`.
  3. 라이브 검증 — 약 20초 뒤 해시 반영. 라이브에서 `check-genre-writing.mjs` 22항목, `check-min-length.mjs` 19항목, `check-no-nickname.mjs` 10항목 모두 ALL PASS(AI·갤러리 API 호출은 막고 검사해 실제 갤러리에 테스트 제출이 남지 않음). 갤러리 GET 200. `after-*-lab.png`(종류 고르기와 안내), `after-*-letter.png`(편지와 말투 안내, ‘다른 글로 바꾸기’), `after-*-article-check.png`(성격 체크 4/6)를 열어 잘림·가림 없음을 확인했다. 원본 `local-assets/screenshots/2026-11-26-deploy-genre-writing/`, 데스크톱 1440×900·모바일 780×1688.
  4. 대화 캡처 — 직전 작업에서 업무포털(실명) 노출로 지운 상태라 이번에도 찍지 않았다. 위 실제 요청 발췌로 대신한다.
- 공개한 대표 화면 — [배포 전 질문·조사](screenshots/2026-11-26-deploy-genre-writing/before-desktop-lab.png) · [배포 후 질문·조사](screenshots/2026-11-26-deploy-genre-writing/after-desktop-lab.png) · [배포 후 모바일 편지](screenshots/2026-11-26-deploy-genre-writing/after-mobile-letter.png) · [배포 후 성격 체크](screenshots/2026-11-26-deploy-genre-writing/after-desktop-article-check.png)
- 변경 파일 — `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-deploy-genre-writing/`. 사이트 저장소 `695130d`.
- 푸시 — 사용자 요청에 따라 과제 저장소 main을 origin에 푸시했다.


## 2026-11-26-process-video-plan

- 실제 요청 — “작업영상 초안도 생각해보자. 왜냐하면 기존 프로젝트에서 수정하는 거기 때문에 어떻게 작업을 시작했는지 어떤 작업과정을 거치고 있는지 영상으로 어떻게 드러낼지가 중요해”
- 한 일 — 기존 프로젝트(`global-life-simulator` `5f5f7b9`) 수정 개발의 시작과 작업 과정을 명확히 보여 주는 **과정 소개 영상(2분 38초, 4,740 frames @ 30fps)** 초안 틀을 `video/PROCESS-PLAN.md`로 작성하고 `video/README.md`를 갱신했다.
  - **Act 1 (시작과 출발선, 26초)**: 기록·검증 규칙(`DEVELOPMENT.md`, `CLAUDE.md`, `CHECKLIST.md`, `PROMPTS.md`) 수립과 원본 기준선(`baseline`) 진단, 첫 분기 요청 대화 캡처(`01-request.png`).
  - **Act 2 (작업 방식, 18초)**: Paseo 3창 멀티 에이전트 병렬 협업(`paseo-workflow-redacted.png`)과 핸드오프 분담, 전/후 캡처 + Playwright 자동 검증 5단계 루프.
  - **Act 3 (수정 전/후 5대 라운드, 90초)**: ① 선택별 갈래 시나리오(8명·47장면·96경로), ② 2D 삽화 → 12명 실사풍·디테일 보완·35장 상황 이미지, ③ 12명 히어로 사진 앨범·높이 정렬·자동 재생, ④ 이름 입력 제거·돌아보기 문장 틀·최소 20자, ⑤ 형식 선선택·장르별 쓰기·성격 체크 6기준. 각 라운드에 실제 AI 요청 원문·전/후 배포 화면·바꾼 이유를 연결했다.
  - **Act 4 (검증·배포·성과 요약, 24초)**: 정량 Before/After 대시보드와 라이브 배포 주소·저장소 안내.
- 변경 파일 — `video/PROCESS-PLAN.md`(신규), `video/README.md`, `PROMPTS.md`.
- 검증 — `video/PROCESS-PLAN.md`에 매핑한 대화·전후 앱 캡처 43개 경로 존재 확인(누락 0건). 문서 전용 작업이므로 앱 UI 전후 촬영은 비대상이다.
- 대화 캡처 — 촬영하지 못했다(대기). 위 실제 요청 발췌로 대신한다.
- 배포 — 문서 작업이므로 사이트 배포 비대상. 로컬 커밋까지 수행.

## 2026-11-26-gallery-hearts

- 실제 요청 — “이제 갤러리에 있는 게시글에 하트표시도 달 수 있게 하자. 인스타 하트처럼”
- 진행 기록
  1. 구조 파악 — 갤러리는 Pages 함수(onischool-release `functions/anotherday/api/gallery.js`)가 검사하고, 저장은 중계 Worker(`app/relay/worker.js`의 `GalleryStore`, Durable Object SQLite)가 한다. 하트도 서버에 저장해야 반 친구들이 같은 숫자를 보므로 세 곳(Worker·Pages 함수·화면)을 함께 고쳤다.
  2. 수정 전 촬영 — 실제 갤러리 데이터 대신 가짜 API(`app/tools/gallery-mock.mjs`, 예시 결과물 3장, 가린 이름)로 `capture-gallery.mjs`를 만들어 찍었다. `before-*.png`는 카드에 하트가 없고, `before-*-open.png`는 크게 보기 위쪽 막대에 닫기만 있다.
  3. 저장소(Worker) — `hearts(key, voter, created)` 표를 추가해 한 기기(voter) 한 결과물에 하트 하나만 저장한다. 목록에 `hearts`(개수)와 `liked`(이 기기가 눌렀는지)를 붙이고, `/gallery/heart`로 켜고 끈다. 없는 결과물은 404, 결과물을 지우면 그 하트도 지운다. 같은 학생이 다시 제출해도 하트는 남는다. 기존 표는 그대로라 마이그레이션이 필요 없다.
  4. Pages 함수 — `{action:'heart', key, voter, on}`을 받아 결과물 번호(학년-반-번호)와 기기 번호 형식을 검사해 넘긴다. 한 반이 학교의 같은 IP에서 함께 누르므로 하트는 제출과 따로 1분 400번까지 센다. 목록 GET은 `?voter=`를 받아 넘긴다.
  5. 화면 — 기기 번호는 로그인이 없으니 브라우저가 무작위로 만들어 `anotherday-voter`에 둔다(‘이 브라우저의 기록 지우기’와 별개). 카드 오른쪽 아래에 하트와 숫자, 누르면 인스타그램 빨강(#ed4956)으로 채워지며 톡 튀고 다시 누르면 취소. 결과물 크게 보기 위쪽 막대에도 하트를 두고, 글을 두 번 톡(0.35초 안) 누르면 가운데 큰 하트가 피며 켜진다(이미 켜져 있으면 그대로, 인스타그램과 같음). 화면을 먼저 바꾸고 서버 답으로 숫자를 맞추며, 실패하면 되돌리고 안내한다. 움직임 줄이기 설정이면 애니메이션을 끈다.
  6. 함께 고친 것 — 모바일 크게 보기에서 하트가 들어가며 ‘닫기’가 두 줄로 깨져 줄바꿈을 막았다(그 전 `after-*-open.png`는 지우고 다시 찍었다).
  7. 검증 — `node relay/test-gallery-store.mjs`(Node 내장 SQLite로 실제 SQL 실행) 11항목 ALL PASS. Pages 함수를 저장소 호출만 가짜로 바꿔 11항목 PASS(voter 전달·이상한 값 버림·잘못된 key/voter 400·다른 사이트 403·하트 120번 뒤에도 같은 IP 제출 가능·하트 400번 초과 429), 기존 제출 검사 6항목 PASS. `tools/check-gallery-hearts.mjs` 24항목 ALL PASS(카드 하트, 3→4→3, 빨강 채움, 하트를 눌러도 카드가 열리지 않음, 두 번 톡 큰 하트와 켜짐, 카드·크게 보기 동시 갱신, 천천히 두 번은 무시, 새로고침 뒤 유지, 기록 지워도 기기 번호 유지, 실패 시 되돌림·안내, 모바일 누르는 칸 58×40). `check-genre-writing`·`check-min-length`·`check-no-nickname`·`npm run validate` 모두 PASS. 전체 검사를 한 번에 돌릴 때 `check-genre-writing`이 로컬 서버에서 멈춰 중단했고, 따로 다시 돌려 통과했다.
  8. 수정 후 촬영 — `after-*.png`(카드 하트, 코피 카드는 내가 눌러 빨강 2), `after-*-open.png`(크게 보기 막대의 빨간 하트 4와 닫기). 모두 열어 잘림·가림이 없음을 확인했다. 원본 `local-assets/screenshots/2026-11-26-gallery-hearts/`, 데스크톱 1440×900·모바일 780×1688.
  9. 대화 캡처 — (15:53) 전체 화면 4800×1350에서 왼쪽 모니터에 다른 업무 창이 있어 원본은 지우고 오른쪽 모니터 1920×1080만 `local-assets/conversations/2026-11-26-gallery-hearts/01-gallery-hearts-right.png`로 남겼다. 개인정보가 없음을 확인했다.
- 공개한 대표 화면 — [전 갤러리](screenshots/2026-11-26-gallery-hearts/before-desktop.png) · [후 갤러리](screenshots/2026-11-26-gallery-hearts/after-desktop.png) · [후 모바일](screenshots/2026-11-26-gallery-hearts/after-mobile.png) · [전 크게 보기](screenshots/2026-11-26-gallery-hearts/before-desktop-open.png) · [후 크게 보기](screenshots/2026-11-26-gallery-hearts/after-desktop-open.png) · [후 모바일 크게 보기](screenshots/2026-11-26-gallery-hearts/after-mobile-open.png)
- 대화 캡처 — [검사 통과 장면](screenshots/conversations/2026-11-26-gallery-hearts/01-checks.png)
- 변경 파일 — `app/dist/app.js`, `app/dist/style.css`, `app/relay/worker.js`, `app/relay/test-gallery-store.mjs`(새로), `app/tools/gallery-mock.mjs`(새로), `app/tools/capture-gallery.mjs`(새로), `app/tools/check-gallery-hearts.mjs`(새로), `PROMPTS.md`, `CHECKLIST.md`, `conversations/README.md`, `screenshots/2026-11-26-gallery-hearts/`, `screenshots/conversations/2026-11-26-gallery-hearts/`. 사이트 저장소 `functions/anotherday/api/gallery.js`(배포 때 커밋).
- 배포 — 2026-11-26 `2026-11-26-deploy-gallery-hearts`에서 Worker → 사이트 순서로 배포했다(사이트 `d3f0dc8`).

## 2026-11-26-deploy-gallery-hearts

- 실제 요청 — “커밋 푸시 배포해해줘”
- 진행 기록
  1. Worker 확인 — 배포된 `anotherday-gemini-relay`의 원본을 Cloudflare API(wrangler 로그인 토큰, 출력하지 않음)로 받아, 이번 수정 직전 `app/relay/worker.js`(커밋 `1c9daba~1`)와 글자 하나까지 같은지 확인했다(4,183자, 같음). 배포된 것을 덮어써 다른 변경이 사라지지 않게 하기 위해서다.
  2. Worker 배포 — `app/relay`에서 `npx wrangler deploy`. 버전 `2312ce80-c618-491a-b81b-f247c062966d`. 바로 뒤 라이브 갤러리 목록(실제 93장)이 정상으로 오고 모든 항목에 `hearts`·`liked`가 붙는 것을 확인했다(기존 화면은 이 칸을 무시하므로 영향 없음).
  3. 배포 전 라이브 촬영 — 실제 학생 결과물 대신 가짜 API(예시 3장)로 `https://onischool.net/anotherday/` 갤러리를 찍었다. `before-*.png`에 하트가 없다.
  4. 사이트 배포 — `npm run validate` PASS, `node sync-onischool.cjs`(바뀐 파일 app.js·style.css·index.html), 배포본이 과제 저장소 `1c9daba`와 같은지 해시로 확인한 뒤 갤러리 API(`functions/anotherday/api/gallery.js`)와 함께 onischool-release `d3f0dc8`를 origin main에 푸시했다. 새 해시 `app.js?v=f9d7c0b6b8`, 약 30초 뒤 반영.
  5. 라이브 검증 — 화면: `check-gallery-hearts.mjs`(가짜 API) 첫 실행은 예외로 끝났고(출력 끝 줄만 받아 원인 미확인, 라이브 페이지 로딩 지연으로 보임) 다시 돌려 24항목 ALL PASS. `check-genre-writing`·`check-min-length`·`check-no-nickname` ALL PASS. 실제 API: 확인용 기기 번호로 실제 결과물 하나에 하트를 켰다가(0→1, 목록에서 liked true) 바로 껐다(→0, 시작과 같음). 잘못된 결과물 번호 400, 없는 결과물 404, 다른 사이트 403. 같은 Worker가 중계하는 AI 대화도 짧은 실제 요청 하나로 200·completed를 확인했다.
  6. 배포 후 촬영 — `after-*.png`(카드 하트, 내가 누른 카드는 빨강 2), `after-*-open.png`(크게 보기 막대 빨간 하트 4와 닫기). 열어 잘림·가림 없음을 확인했다. 원본 `local-assets/screenshots/2026-11-26-deploy-gallery-hearts/`, 데스크톱 1440×900·모바일 780×1688.
  7. 대화 캡처 — 이번 단계는 찍지 않았다. 위 실제 요청 발췌로 대신한다.
- 공개한 대표 화면 — [배포 전](screenshots/2026-11-26-deploy-gallery-hearts/before-desktop.png) · [배포 후](screenshots/2026-11-26-deploy-gallery-hearts/after-desktop.png) · [배포 후 모바일](screenshots/2026-11-26-deploy-gallery-hearts/after-mobile.png) · [배포 후 크게 보기](screenshots/2026-11-26-deploy-gallery-hearts/after-desktop-open.png)
- 변경 파일 — `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-deploy-gallery-hearts/`. 사이트 저장소 `d3f0dc8`, Worker 버전 `2312ce80`.
- 푸시 — 사용자 요청에 따라 과제 저장소 main을 origin에 푸시했다.

## 2026-11-26-heart-size

- 실제 요청 — “하트가 너무 크고 굵어. 메모에 맞게 하트 크기를 작게 조정하고 라인굵기도 조정해줘. 지금은 게시글보다 하트가 눈에 더 잘보여.”
- 진행 기록
  1. 수정 전 촬영 — 로컬, 가짜 API(예시 3장), 코피 카드에 하트를 누른 상태. `before-*.png`는 하트 24px·선 1.9·숫자 14px 굵게(검정)라 카드 아래 정보보다 하트가 먼저 보인다.
  2. 수정 — 하트를 카드 아래 작은 정보 글자(13px·회색)와 같은 무게로 맞췄다. 아이콘 24→16px, 선 1.9→1.6(16px에서 약 1px), 숫자 14px 굵게 검정 → 13px 보통 회색. 누르는 칸은 높이 40px을 그대로 두었다(손가락으로 누르기 쉽게). 켜진 하트의 빨강, 톡 튀는 동작, 두 번 톡 큰 하트는 그대로다. 변경 파일은 `app/dist/style.css`뿐이다.
  3. 검증 — `check-gallery-hearts.mjs` ALL PASS(모바일 누르는 칸 44×40).
  4. 수정 후 촬영 — `after-*.png`(작은 회색 하트와 숫자, 켜진 하트만 빨강), `after-mobile-open.png`(크게 보기 막대도 같은 크기). 열어 잘림·가림 없음을 확인했다. 원본 `local-assets/screenshots/2026-11-26-heart-size/`, 데스크톱 1440×900·모바일 780×1688.
  5. 대화 캡처 — 찍지 않았다. 위 실제 요청 발췌로 대신한다.
- 공개한 대표 화면 — [전](screenshots/2026-11-26-heart-size/before-desktop.png) · [후](screenshots/2026-11-26-heart-size/after-desktop.png) · [전 모바일](screenshots/2026-11-26-heart-size/before-mobile.png) · [후 모바일](screenshots/2026-11-26-heart-size/after-mobile.png) · [후 모바일 크게 보기](screenshots/2026-11-26-heart-size/after-mobile-open.png)
- 변경 파일 — `app/dist/style.css`, `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-heart-size/`.
- 배포 — 2026-11-26 `2026-11-26-deploy-heart-size`에서 배포했다(사이트 `e8c44d9`).

## 2026-11-26-deploy-heart-size

- 실제 요청 — “커밋 푸시 배포해줘”
- 진행 기록
  1. 배포 전 라이브 촬영 — 가짜 API(예시 3장)로 `https://onischool.net/anotherday/` 갤러리, `before-*.png`는 큰 하트(24px)다.
  2. 배포 — `npm run validate` PASS, `node sync-onischool.cjs`(바뀐 파일 style.css·index.html), 배포본이 과제 저장소 `3008dde`와 해시로 같은지 확인한 뒤 onischool-release `e8c44d9`를 origin main에 푸시했다. Worker는 바뀌지 않아 다시 올리지 않았다. 새 해시 `style.css?v=98a7e53b38`, 약 30초 뒤 반영.
  3. 라이브 검증 — `check-gallery-hearts.mjs` ALL PASS(모바일 누르는 칸 44×40). `after-*.png`에서 작은 회색 하트와 켜진 하트만 빨강인 것을 열어 확인했다. 원본 `local-assets/screenshots/2026-11-26-deploy-heart-size/`, 데스크톱 1440×900·모바일 780×1688.
  4. 대화 캡처 — 찍지 않았다. 위 실제 요청 발췌로 대신한다.
- 공개한 대표 화면 — [배포 전](screenshots/2026-11-26-deploy-heart-size/before-desktop.png) · [배포 후](screenshots/2026-11-26-deploy-heart-size/after-desktop.png) · [배포 후 모바일](screenshots/2026-11-26-deploy-heart-size/after-mobile.png)
- 변경 파일 — `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-deploy-heart-size/`. 사이트 저장소 `e8c44d9`.
- 푸시 — 사용자 요청에 따라 과제 저장소 main을 origin에 푸시했다.


## 2026-11-26-opening-chips

- 실제 요청 — “이런 식으로 전 캐릭터들의 첫 상황에서의 칩들을 다시 분석해줘.” → “수정해서 커밋 배포해줘”
- 사용자 기준 — “첫 상황은 현장 감독에게서 문자가 와서 고민하는 상황인거잖아? 이런 식의 칩 텍스트들을 물어보는거야”
- 변경 — 12명 첫 칩 36개를 핵심 사건에 대한 반응, 선택의 조건·시간·비용·위험 질문, 갈등 표현으로 정리했다. 모든 path는 none 유지. 저장된 칩뿐 아니라 AI 첫 칩 생성 지침에도 같은 기준을 추가했다.
- 변경 파일 — app/dist/precomputed.js, app/dist/ai.js, app/tools/check-opening-chips.mjs, PROMPTS.md, CHECKLIST.md, screenshots/2026-11-26-opening-chips/.
- 검증 — 전체 12명·47장면·94선택·96경로 validate 통과. PC 1440×900, 모바일 390×844 CSS 픽셀(저장 780×1688), AI 연결 모의, 첫 시작 경로로 12명씩 대본·칩 3개·none·가로 넘침·JS 오류 확인. 아시프 전후 4장을 각각 열어 문구 및 잘림·가림 없음 확인. 원본 local-assets/screenshots/2026-11-26-opening-chips/.
- 재시도 — 최초 API 404 모의에서는 AI 미연결 선택지가 표시되어 칩 대기 시간 초과. configured:true로 고쳐 통과. 검증 스크립트는 최초 잘못된 작업 경로에서 실패해 app/에서 다시 실행했다.
- 공개 화면 — [PC 전](screenshots/2026-11-26-opening-chips/before-desktop.png) · [PC 후](screenshots/2026-11-26-opening-chips/after-desktop.png) · [모바일 전](screenshots/2026-11-26-opening-chips/before-mobile.png) · [모바일 후](screenshots/2026-11-26-opening-chips/after-mobile.png).
- 대화 캡처 — 실제 발췌를 위에 기록. 이번 작업의 대화 창 원본 캡처는 미확보, 캡처 대기. 앱 전후 캡처와 구별한다.
- 배포 확인 — 배포 후 추가 기록. 실시간 AI 응답 품질은 이번 정적 첫 칩 검증 범위 밖이다.

- 배포 완료 — 앱 ca94e61, 사이트 cb7bd8b 푸시. 라이브 ai.js?v=9c3642f5d8 및 precomputed.js?v=2d7cb5bf77 내용이 로컬과 일치. 배포 사이트에서도 12명 × PC·모바일 24회 모두 통과. 라이브 원본 local-assets/screenshots/2026-11-26-opening-chips-live/ (1440×900, 780×1688)을 각각 열어 문구와 잘림·가림 없음 확인. [라이브 PC](screenshots/2026-11-26-opening-chips/live-desktop.png) · [라이브 모바일](screenshots/2026-11-26-opening-chips/live-mobile.png).
- 추가 동작 확인 — 아시프 첫 칩 클릭 시 해당 문구가 그대로 API 입력으로 전달되고, 모의 503 응답에서는 오류 안내가 표시되며 선택은 null로 유지됨. 최초 오류 검사 명령의 한글이 PowerShell 파이프에서 손상되어 대기 시간 초과, 상태 기반 검사로 재시도해 통과.
- 체크리스트 — 기존 표를 공식 열 순서 및 앱 이름·배포 주소 형식으로 정리. 공개 GitHub 표 렌더링 확인 후 중간 빈 줄도 제거해 하나의 표로 정리.

## 2026-11-26-full-sentences

- 실제 요청 — “활동 돌아보기에서 내가 내용을 입력할 때 질문들이 나오는데 빈칸이 있는 질문들이 있어. 이 빈칸은 불필요해. 하나의 전체문장이 있는게 더 좋아. 그리고 내가 신문기사, 정책제안, 편지쓰기 중 활동을 하나 선택했을 떄 내가 알아볼 질문은 밑에 알아보기와 같은 내용이야. 즉 이 질문을 바로 알아보기로 이어져야 해. 즉, 나의 질문과 알아보기는 합쳐져야 맞아. 또 신문기사 작성시 첫문단에 리드라는 용어는 필요없어. 지금 전체적으로 이렇게 쓸데없는 용어들이 있는지 검토해줘. 검토범위는 새로 수정된 활동들이야. 또 빈칸이 있는 질문 혹은 문장들은 다 걷어내고 온전한 문장으로 복원”
- 검토 범위 — 돌아보기(문장 틀 5개), 질문·조사(질문 틀 3종×3개), 결과물(신문 기사·정책 제안서·편지 칸 이름과 예시 문장 15칸).
- 변경
  1. 빈칸(____) 문장 틀을 모두 온전한 문장으로 바꿨다. 인물 이름·지역·주제 낱말(환경→기후 변화, 물→깨끗한 물, 빈곤→가난, 난민→피난 생활, 인권→권리 침해)·첫 자료 기관명(예: UNDP 자료)·관련 정부/기관을 넣어 12명 모두 자연스럽게 읽히는지 출력해 확인했다. 칩 머리말 ‘틀’ → ‘예시’, 안내 문구의 ‘빈칸(____)을 채우면’ → ‘내 생각에 맞게 고치면’.
  2. ‘② 나의 질문’과 ‘③ 알아보기’를 ‘② 질문하고 알아보기’ 한 단계로 합쳤다(질문 고르기 → 질문 칸 → 자료·AI 묻기). ‘④ 알게 된 것’ → ‘③’. 질문 칩의 ‘출발 질문 ·’ 머리말도 뺐다.
  3. 불필요한 용어 정리 — ‘리드 · 첫 문단’→‘첫 문단’, ‘본문 · 원인과 근거’→‘원인과 근거’, ‘맺음’→‘마무리 문단’, 체크 ‘리드에’→‘첫 문단에’, ‘수신 · 누구에게 제안하나’→‘누구에게 제안하나’, ‘받는 사람 · 부르는 말’→‘받는 사람’, ‘첫인사 · 나를 소개하고 쓰는 까닭’→‘첫인사와 쓰는 까닭’, ‘보내는 사람 · 작성자 이름’→‘보내는 사람’.
  4. 남긴 것 — 예전에 저장된 글에 ____가 남아 있을 수 있어 글자 수 검사의 빈칸 안내는 유지했다. 완성 화면(신문 서식)의 ‘팩트 체크’, 제안서 서식의 ‘수신’ 표는 실제 문서 양식의 이름이라 이번 범위(입력 활동)에서 제외했다.
- 검증 — `check-genre-writing.mjs` ALL PASS(질문 예시에 빈칸 없음, 질문·알아보기 한 단계, 결과물 칸에 ____·‘리드’ 없음 항목 추가), `check-min-length.mjs` ALL PASS(빈칸 안내 항목을 ‘예시 문장이 온전한 문장으로 들어감’으로 교체), `npm run validate` PASS. 처음 실행은 Playwright 브라우저가 없어 실패해 설치된 Chrome(`PW_CHROME`)으로 다시 돌렸다.
- 화면 — `app/tools/capture-full-sentences.mjs`로 같은 조건(시오네, 신문 기사, 데스크톱 1440×900·모바일 390×844 CSS, 저장 780×1688)에서 돌아보기·질문조사·결과물 전후 12장을 찍었다. 원본 `local-assets/screenshots/2026-11-26-full-sentences/`. 후 화면을 열어 빈칸·‘리드’가 없고 문장이 잘리거나 가리지 않음을 확인했다.
- 공개한 대표 화면 — [전 돌아보기](screenshots/2026-11-26-full-sentences/before-mobile-reflect.png) · [후 돌아보기](screenshots/2026-11-26-full-sentences/after-mobile-reflect.png) · [전 질문·조사](screenshots/2026-11-26-full-sentences/before-desktop-lab.png) · [후 질문·조사](screenshots/2026-11-26-full-sentences/after-desktop-lab.png) · [전 결과물](screenshots/2026-11-26-full-sentences/before-desktop-plan.png) · [후 결과물](screenshots/2026-11-26-full-sentences/after-desktop-plan.png)
- 대화 캡처 — 찍지 않았다(캡처 대기). 위 실제 요청 발췌로 대신한다.
- 변경 파일 — `app/dist/app.js`, `app/tools/check-genre-writing.mjs`, `app/tools/check-min-length.mjs`, `app/tools/capture-full-sentences.mjs`(새로), `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-full-sentences/`.
- 배포 — 2026-11-26 `2026-11-26-deploy-full-sentences`에서 배포했다(사이트 `8a23d58`).

## 2026-11-26-deploy-full-sentences

- 실제 요청 — “배포 푸시 해줘”
- 진행 기록
  1. 배포 전 라이브 촬영 — `capture-full-sentences.mjs --url https://onischool.net/anotherday/`, 시오네·신문 기사 예시 데이터. `before-*`에 빈칸 틀과 따로 나뉜 ‘나의 질문/알아보기’가 보인다.
  2. 배포 — `npm run validate` PASS, `node sync-onischool.cjs`(바뀐 파일 app.js·index.html), 배포본 app.js가 과제 저장소와 같음(cmp)을 확인하고 onischool-release `8a23d58`을 origin main에 푸시. 새 해시 `app.js?v=6e0a117b03`, 약 30초 뒤 반영.
  3. 라이브 검증 — `check-genre-writing.mjs`·`check-min-length.mjs`를 라이브 주소로 돌려 ALL PASS.
  4. 배포 후 촬영 — 원본 `local-assets/screenshots/2026-11-26-deploy-full-sentences/`(데스크톱 1440×900·모바일 780×1688). after-desktop-lab·after-mobile-reflect를 열어 ‘질문하고 알아보기’와 완성 문장 예시, 잘림·가림 없음을 확인했다.
  5. 대화 캡처 — 찍지 않았다. 위 실제 요청 발췌로 대신한다.
- 공개한 대표 화면 — [배포 전](screenshots/2026-11-26-deploy-full-sentences/before-desktop-lab.png) · [배포 후](screenshots/2026-11-26-deploy-full-sentences/after-desktop-lab.png) · [배포 후 모바일 돌아보기](screenshots/2026-11-26-deploy-full-sentences/after-mobile-reflect.png) · [배포 후 결과물](screenshots/2026-11-26-deploy-full-sentences/after-desktop-plan.png)
- 변경 파일 — `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-deploy-full-sentences/`. 사이트 저장소 `8a23d58`.
- 푸시 — 사용자 요청에 따라 과제 저장소 main을 origin에 푸시했다.

## 2026-11-26-writing-coach

- 실제 요청 — “예시를 어떻게 하는지 어디에 보내는지 예시 문장을 통째로 제시하는 게 아니라 이런 식으로 쓰라는 지도 및 조언처럼 해줘. 왜냐하면 이용자들이 생각안하고 이 칩들을 바로 선택해서 제출할 수 있거든. 그리고 피드백 대화시 피드백을 통해 내 글을 직접 고칠 수 있어야 하는데 이 단계에서는 고칠 수 있는 방식이 이 창 안에서는 없어. 즉, 피드백 대화를 통해 내가 작성한 글을 다시 수정할 수 있는 단계로 넘어갈 수 있어야 해. 다시 위로 올라가서 수정하는건 다소 불편하거든”
- 변경
  1. 눌러 넣는 문장 칩을 모두 없애고 읽는 조언 목록(`.tips`)으로 바꿨다. 돌아보기는 원인 갈래 5개(시설·돈·제도·안전·자연)마다 무엇을 떠올릴지, 질문·조사는 글 종류별로 질문을 만드는 방향 3개와 ‘이야기가 던진 질문’(참고용 글, 누를 수 없음), 결과물은 칸마다 쓰는 조언을 보인다. ‘어디에 보내는지’는 문장 대신 그 이야기의 관련 기관 목록(예: 주민·투발루 정부·기후재정 지원국·국제기구)을 보여 주고 고르게 했다. 이전 작업에서 문장 틀용으로 만든 주제 낱말·자료 이름·기관 고르기 함수와 클릭 처리 코드는 지웠다.
  2. 피드백 대화에 ‘피드백 보며 내 글 고치기’ 버튼을 두고, 누르면 창이 열린다. 왼쪽(모바일은 위쪽, 화면 높이의 32%까지)에 마지막 피드백, 오른쪽에 글의 모든 칸이 있고 글자 수도 바로 갱신된다. ‘고친 글 다시 보여 주기’를 누르면 창을 닫고 고친 글로 다시 피드백을 요청한다. 닫으면 결과물 화면이 고친 글로 다시 그려지고 피드백 대화 위치로 돌아온다. 같은 칸이 화면에 두 개 생기므로 글자 수 표시는 모두 갱신하도록 바꿨다.
- 검증 — 새 `tools/check-feedback-edit.mjs`(PC·모바일 각 10항목: 창 열림, 피드백 표시, 4칸 편집, 글자 수 갱신, 화면 안 넘침, 닫은 뒤 반영·저장, 다시 보여 주기 요청에 고친 글 포함, JS 오류 없음) ALL PASS. `check-genre-writing`(칩 없음·조언 표시로 항목 교체)·`check-min-length`·`check-no-nickname` ALL PASS, `npm run validate` PASS. `check-no-nickname`은 Playwright 브라우저가 없어 처음엔 실행되지 않았고, 설치된 Chrome(`PW_CHROME`)을 쓰도록 고쳐 다시 돌렸다.
- 화면 — `app/tools/capture-coach.mjs`로 시오네·신문 기사 예시 글과 예시 피드백(선생님·시오네 두 마디, 실제 AI 응답 아님)을 넣어 같은 조건에서 촬영. 원본 `local-assets/screenshots/2026-11-26-writing-coach/`(데스크톱 1440×900, 모바일 780×1688). 전 8장, 후 10장(고치기 창은 새 화면이라 후만 있음). 처음 찍은 모바일 고치기 창에서 머리의 ‘닫기’가 가로로 늘어나고 아래 버튼 글자가 두 줄로 깨져 고친 뒤 후 화면을 다시 찍었다. 다시 찍은 화면을 열어 잘림·가림이 없음을 확인했다. 질문·조사 화면은 전후 기준 요소가 달라(전: 묻기 칸, 후: 조언 목록) 스크롤 위치가 다르다.
- 공개한 대표 화면 — [전 결과물](screenshots/2026-11-26-writing-coach/before-desktop-plan.png) · [후 결과물](screenshots/2026-11-26-writing-coach/after-desktop-plan.png) · [전 돌아보기](screenshots/2026-11-26-writing-coach/before-mobile-reflect.png) · [후 돌아보기](screenshots/2026-11-26-writing-coach/after-mobile-reflect.png) · [전 질문·조사](screenshots/2026-11-26-writing-coach/before-desktop-lab.png) · [후 질문·조사](screenshots/2026-11-26-writing-coach/after-desktop-lab.png) · [전 피드백](screenshots/2026-11-26-writing-coach/before-mobile-review.png) · [후 피드백](screenshots/2026-11-26-writing-coach/after-mobile-review.png) · [고치기 창](screenshots/2026-11-26-writing-coach/after-desktop-review-edit.png) · [고치기 창 모바일](screenshots/2026-11-26-writing-coach/after-mobile-review-edit.png)
- 대화 캡처 — 찍지 않았다(캡처 대기). 위 실제 요청 발췌로 대신한다.
- 변경 파일 — `app/dist/app.js`, `app/dist/style.css`, `app/tools/check-feedback-edit.mjs`(새로), `app/tools/capture-coach.mjs`(새로), `app/tools/check-genre-writing.mjs`, `app/tools/check-min-length.mjs`, `app/tools/check-no-nickname.mjs`, `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-writing-coach/`.
- 배포 — 2026-11-26 `2026-11-26-deploy-writing-coach`에서 배포했다(사이트 `aef0709`).

## 2026-11-26-lesson-guide

- 실제 요청 — “사이트의 수업안내 글은 말 그대로 이 앱에서 어떻게 진행되는지를 알려주는 소개글이어야 해. ai대화설정, 안전장치, 공감을 다루는 방법, 12명을 모두 다루려면과 같은 내용은 이 수업 안내와 관련이 없어. 수정해줘”
- 추가 지시 — “yolo 모드로 전환”. 추가 확인 없이 수정·검증·기록·로컬 커밋까지 진행한다고 안내했다.
- 변경 이유와 내용 — 교사 운영·기술 설명 대신 학생이 앱에서 진행하는 활동을 소개하도록 수업안내 전체를 정리했다. 1차시 인물 선택·세 장면 대화·돌아보기, 2차시 글 형식 선택·질문·자료 조사, 3차시 글쓰기·피드백을 보며 수정·제출·갤러리 순으로 설명한다. AI 설정·안전장치·12명 배분·공감 지도·평가 항목과 기록 삭제 버튼을 안내에서 제거하고 게임 시작·캐릭터 고르기로 연결했다.
- 검증 — http://127.0.0.1:4173/ 수업 안내를 빈 브라우저 기록에서 열어 데스크톱·모바일 실제 화면 촬영. 삭제한 네 제목 없음, 가로 넘침 없음, JS 오류 없음, 캐릭터 고르기 → 열두 명의 하루 이동 PASS. npm run validate PASS(12명·47장면·94선택·96경로). 정적 소개글이므로 별도 입력 오류 상태는 없으며 기존 API 오류 상태는 이번 문구 수정의 확인 대상이 아니다.
- 원본 — local-assets/screenshots/2026-11-26-lesson-guide/. 데스크톱 viewport 1440×900, 모바일 viewport 390×844·배율 2, 전체 페이지 PNG. 전후 네 이미지를 각각 직접 열어 올바른 수업안내 화면, 문구 변경, 잘림·버튼 가림 없음 확인. 실제 PNG 크기는 아래 기록.
- 공개 대표 — [PC 전](screenshots/2026-11-26-lesson-guide/before-desktop.png) · [PC 후](screenshots/2026-11-26-lesson-guide/after-desktop.png) · [모바일 전](screenshots/2026-11-26-lesson-guide/before-mobile.png) · [모바일 후](screenshots/2026-11-26-lesson-guide/after-mobile.png).
- 재시도 — 촬영 도구 생성 및 수정 명령에서 app/ 작업 폴더에 app/ 경로를 중복해 첫 실행 실패. 경로를 바로잡았다. 수정 전 화면을 after로 촬영한 1장은 failed-before-edit-desktop.png로 별도 보존하고 실제 수정 후 다시 촬영·검증했다.
- 대화 화면 — 실제 대화 창 캡처 접근은 확인하지 못했으며 캡처 대기. 위 실제 발췌를 기록했고 대화 증거 이미지를 합성하지 않았다.
- 변경 파일 — app/dist/app.js, app/tools/capture-guide.mjs, PROMPTS.md, CHECKLIST.md, screenshots/2026-11-26-lesson-guide/.
- 배포 — 이번 작업은 로컬 수정·검증·커밋까지 수행. 배포 사이트 반영 및 공개 GitHub 표 확인은 미실시.

## 2026-11-26-deploy-writing-coach

- 실제 요청 — “커밋 푸시 배포해줘”
- 진행 기록
  1. 배포 전 라이브 촬영 — `capture-coach.mjs --url https://onischool.net/anotherday/`(예시 글·예시 피드백, AI 연결 상태만 모의). `before-*`에 눌러 넣는 예시 칩이 보이고 고치기 창은 없다(8장).
  2. 배포 — `npm run validate` PASS, `node sync-onischool.cjs`(바뀐 파일 app.js·style.css·index.html), 배포본이 과제 저장소와 같음(cmp)을 확인하고 onischool-release `aef0709`를 origin main에 푸시. 새 해시 `app.js?v=951caf9f28`, 약 45초 뒤 반영.
  3. 라이브 검증 — `check-feedback-edit`·`check-genre-writing`·`check-min-length`·`check-no-nickname`를 라이브 주소로 돌려 모두 ALL PASS.
  4. 배포 후 촬영 — 원본 `local-assets/screenshots/2026-11-26-deploy-writing-coach/`(데스크톱 1440×900·모바일 780×1688, 후 10장). after-desktop-plan(칸별 조언)·after-mobile-review-edit(피드백과 칸이 함께 보이는 고치기 창)를 열어 잘림·가림 없음을 확인했다.
  5. 대화 캡처 — 찍지 않았다. 위 실제 요청 발췌로 대신한다.
- 공개한 대표 화면 — [배포 전](screenshots/2026-11-26-deploy-writing-coach/before-desktop-plan.png) · [배포 후](screenshots/2026-11-26-deploy-writing-coach/after-desktop-plan.png) · [고치기 창](screenshots/2026-11-26-deploy-writing-coach/after-desktop-review-edit.png) · [고치기 창 모바일](screenshots/2026-11-26-deploy-writing-coach/after-mobile-review-edit.png)
- 변경 파일 — `PROMPTS.md`, `CHECKLIST.md`, `screenshots/2026-11-26-deploy-writing-coach/`. 사이트 저장소 `aef0709`.
- 푸시 — 사용자 요청에 따라 과제 저장소 main을 origin에 푸시했다.

- PNG 크기: after-desktop.png: 1440×900
- PNG 크기: after-mobile.png: 780×2894
- PNG 크기: before-desktop.png: 1440×1138
- PNG 크기: before-mobile.png: 780×4254
- 추가 요청: 커밋 푸시 배포까지 완료해줘. 배포 및 원격 푸시 진행.
- 배포 완료 — 추가 요청에 따라 사이트 저장소 032417d를 origin/main에 푸시. 실제 https://onischool.net/anotherday/ 에서 데스크톱·모바일 수업안내 문구 및 캐릭터 목록 이동 PASS. 라이브 두 PNG도 각각 직접 열어 잘림·가림 없음을 확인했다. [배포 PC](screenshots/2026-11-26-lesson-guide/after-live-desktop.png), [배포 모바일](screenshots/2026-11-26-lesson-guide/after-live-mobile.png). 원본 동일 작업 폴더, 1440×900·780×2896. 앞의 배포 미실시 기록은 추가 요청 이전 상태다.
- 기록 재시도 — PNG 크기를 출력하는 Python 명령이 cp949 인코딩 오류로 실패해 python -X utf8로 재실행했다.
