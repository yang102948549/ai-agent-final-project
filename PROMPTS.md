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
