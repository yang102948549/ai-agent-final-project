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
