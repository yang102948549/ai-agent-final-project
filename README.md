# 수업도구 웹앱 제작 포트폴리오 · 생성형 AI Agent 개발 실습

이 저장소는 수업도구 웹앱의 기획부터 배포와 영상 제작까지 한 프로젝트의 이력을 담는 기말과제 제출물이다. 첫 구현부터 같은 저장소에 작업을 이어간다.

- **배포 사이트** — https://onischool.net/anotherday/ (2026-11-26 선택별 장면 갈래·상황별 이미지 및 12명 히어로 사진 앨범 배포·검증 완료.)
- **완성 영상** — 제작 후 추가

수정 개발의 출발점은 기존 [global-life-simulator](https://github.com/yang102948549/global-life-simulator) 프로젝트다. 원본 기능과 주요 커밋은 [원본 프로젝트 기록](ORIGINAL_PROJECT.md)에 정리했다.

| 위치 | 제출 시 확인할 내용 |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | 웹앱의 프론트엔드·백엔드·AI·DB·배포 아키텍처 소개서 (시스템 구성도 및 기술 스택 정리). |
| [app/](app/) | 수업도구 웹앱의 소스와 실행 방법. 배포가 끝나면 이 README 상단에 실제 사용 주소를 추가한다. |
| [PROMPTS.md](PROMPTS.md)와 커밋 이력 | 실제 요청, 선택한 이유, 구현 내용, 검증 결과를 작업 순서대로 읽을 수 있다. |
| [screenshots/](screenshots/)와 [CHECKLIST.md](CHECKLIST.md) | 포트폴리오에서 확인할 대표 화면과 개선 전후 비교를 작업 ID로 연결한다. |
| [video/](video/) | 과정 영상(2~3분)과 트레일러(30~60초)의 제작 코드. 완성 후 이 README에 두 편의 재생 링크를 추가한다. |

## 웹앱 아키텍처 요약

자세한 시스템 구성도, API 보안·중계 방식, DB 스키마는 [ARCHITECTURE.md](ARCHITECTURE.md)에 정리했다.

- **프론트엔드 (`app/dist/`)** — 빌드 도구 없는 Vanilla HTML5 · CSS3 · ES6+ SPA (`index.html`, `style.css`, `app.js`, `scenarios.js`, `precomputed.js`, `ai.js`). 12명·47장면·96경로 분기 시나리오, 경량 WebP 59장(2.65MB) 및 단계별 순차 큐 프리로딩, `localStorage` 기반 진행 상태 자동 저장을 제공한다.
- **백엔드 · DB (`Cloudflare Pages Functions` + `app/relay/worker.js`)** — 별도 상시 서버 없이 Cloudflare 서버리스 엣지로 구성했다. Pages Functions(`/anotherday/api/chat`, `/api/gallery`)가 API 키 은닉·출처·프롬프트·입력값 검증과 속도 제한을 담당하고, 중계 Worker의 Durable Object `GeminiRelay`(미국 동부 `enam`, 4샤드)가 한국 학교망의 홍콩 경유 Gemini 지역 차단을 우회한다. 학급 갤러리 결과물과 1기기 1하트 반응은 아시아·태평양(`apac`) Durable Object `GalleryStore`의 내장 SQLite(`subs`, `hearts`)에 저장한다.
- **생성형 AI (`Google Gemini Interactions API`)** — `gemini-3.8-flash`와 `gemini-3.5-flash-lite`를 비저장(`store: false`)·JSON Schema 강제 출력 모드로 연동해 장면 자유 대화, 첫머리·브리핑, 조사 도우미, 당사자·교사 피드백 대화를 처리한다.

영상 편집에 사용할 원본 캡처와 중간 산출물은 이 작업 폴더의 `local-assets/`에 저장한다. 이 폴더는 Git에서 제외된다. 제출 근거로 필요한 대표 이미지는 `screenshots/`에 선별해 넣고, 완성 영상의 제출 위치와 링크는 README에 기록한다.

- [개발 가이드](DEVELOPMENT.md) — 평가 기준, 일정, 작업 완료 절차
- [Claude Code 작업 지침](CLAUDE.md) — 새 세션에서도 적용할 기록·커밋 규칙
- [개선 체크리스트](CHECKLIST.md) · [프롬프트 기록](PROMPTS.md)

이 저장소를 복제하고 루트에서 Claude Code를 열어 개발을 요청한다. 첫 앱 요청에는 대상 사용자와 해결할 문제를 적는다.
