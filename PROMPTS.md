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
