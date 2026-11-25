# 수업도구 웹앱 제작 포트폴리오 · 생성형 AI Agent 개발 실습

이 저장소는 수업도구 웹앱의 기획부터 배포와 영상 제작까지 한 프로젝트의 이력을 담는 기말과제 제출물이다. 첫 구현부터 같은 저장소에 작업을 이어간다.

- **배포 사이트** — https://onischool.net/anotherday/ (2026-11-25 사진풍 캐릭터 이미지 반영. 선택별 장면 갈래는 시나리오 확정 전이라 아직 배포하지 않았다.)
- **완성 영상** — 제작 후 추가

수정 개발의 출발점은 기존 [global-life-simulator](https://github.com/yang102948549/global-life-simulator) 프로젝트다. 원본 기능과 주요 커밋은 [원본 프로젝트 기록](ORIGINAL_PROJECT.md)에 정리했다.

| 위치 | 제출 시 확인할 내용 |
|---|---|
| [app/](app/) | 수업도구 웹앱의 소스와 실행 방법. 배포가 끝나면 이 README 상단에 실제 사용 주소를 추가한다. |
| [PROMPTS.md](PROMPTS.md)와 커밋 이력 | 실제 요청, 선택한 이유, 구현 내용, 검증 결과를 작업 순서대로 읽을 수 있다. |
| [screenshots/](screenshots/)와 [CHECKLIST.md](CHECKLIST.md) | 포트폴리오에서 확인할 대표 화면과 개선 전후 비교를 작업 ID로 연결한다. |
| [video/](video/) | 과정 영상(2~3분)과 트레일러(30~60초)의 제작 코드. 완성 후 이 README에 두 편의 재생 링크를 추가한다. |

영상 편집에 사용할 원본 캡처와 중간 산출물은 이 작업 폴더의 `local-assets/`에 저장한다. 이 폴더는 Git에서 제외된다. 제출 근거로 필요한 대표 이미지는 `screenshots/`에 선별해 넣고, 완성 영상의 제출 위치와 링크는 README에 기록한다.

- [개발 가이드](DEVELOPMENT.md) — 평가 기준, 일정, 작업 완료 절차
- [Claude Code 작업 지침](CLAUDE.md) — 새 세션에서도 적용할 기록·커밋 규칙
- [개선 체크리스트](CHECKLIST.md) · [프롬프트 기록](PROMPTS.md)

이 저장소를 복제하고 루트에서 Claude Code를 열어 개발을 요청한다. 첫 앱 요청에는 대상 사용자와 해결할 문제를 적는다.
