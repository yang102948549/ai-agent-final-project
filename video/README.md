# 제출 영상 (`video/`)

> **폴더 이름 주의**: 패들렛 과제안내의 공식 경로는 `videos/`가 아니라 단수 **`video/`**다. 영상 2편의 제작 코드가 `video/`에 함께 커밋되어 있어야 감점(영상 하나당 −5점)을 피할 수 있다.

## 제출할 영상 2편

| 영상 | 분량 | 형식 | 평가 핵심 (패들렛 채점기준) | 패들렛 업로드 위치 |
|---|---:|---|---|---|
| **트레일러 영상** (`Trailer`) | 30~60초 | MP4 (1920×1080, 30fps) | 누구에게 무엇이 좋은 앱인지 1분 안에 전달 (15점) | 글 첨부 또는 댓글 (택 1) |
| **만든 과정 소개 영상** (`Process`) | 2~3분 | MP4 (1920×1080, 30fps) | 고치기 전/후 비교 3번 이상, 바꾼 이유, AI에게 실제로 시킨 말 (25점) | 나머지 1편을 댓글/글에 분할 업로드 |

두 편 모두 Claude 또는 Codex로 코드를 작성해 제작한다(수업 시연 도구: **Remotion**).

## `video/` 폴더 구성 계획

### Git에 커밋하는 파일 (`video/`)

```text
video/
├── README.md                 # 폴더 구성, 미리보기·렌더링 명령 안내
├── TRAILER-PLAN.md           # 트레일러 PRD A안(아시프)
├── TRAILER-PLAN-KOFI.md      # 트레일러 PRD B안(코피, 학생 시점)
├── PROCESS-PLAN.md           # 과정 소개 영상(2~3분) 초안 틀 (기획·스토리보드)
├── package.json              # Remotion 의존성 및 render:trailer / render:process 스크립트
├── package-lock.json         # 의존성 잠금 파일
├── tsconfig.json             # TypeScript 설정
├── remotion.config.ts        # Remotion 번들·출력 설정
├── src/
│   ├── index.ts              # Remotion 엔트리포인트
│   ├── Root.tsx              # <Composition id="Trailer" /> · <Composition id="Process" /> 등록
│   ├── theme.ts              # 앱·발표 슬라이드와 통일된 색·서체·모션 토큰
│   ├── components/           # 공통 자막, 텍스트 떠오르기, 기기 프레임, 전/후 비교 컴포넌트
│   ├── trailer/              # 트레일러 씬 컴포넌트와 대본·데이터
│   └── process/              # 과정 소개 영상 씬 컴포넌트와 전/후 비교·프롬프트 데이터
└── public/                   # Remotion 렌더링에 직접 쓰는 선별된 경량 정적 에셋
    ├── screenshots/          # 과정 소개 영상용 앱 화면 선별 PNG
    ├── art/                  # 실사 캐릭터·장면 WebP (필요한 대표 컷만 복사)
    └── audio/                # 라이선스 확인된 BGM·효과음(사용 시 출처 기록)
```

### Git에서 제외하고 `local-assets/`에 보관하는 파일

- `video/node_modules/` — `.gitignore`에 의해 자동 제외
- `local-assets/video/trailer.mp4`, `local-assets/video/process.mp4` — 최종 완성 MP4 및 테스트 렌더링 중간 파일 (용량 초과 방지를 위해 Git 제외, 직접 재생 검수 후 패들렛에 업로드)
- `local-assets/screenshots/`, `local-assets/conversations/` — 고해상도 원본 캡처 전체 보관소

완성 후 두 편의 재생·다운로드 링크와 패들렛 제출 기록을 루트 [README.md](../README.md)에도 남긴다.

## 영상 제작 작업 기록

> 영상을 고칠 때마다 "고치기 전 문제 → 고친 후"를 [CHECKLIST.md](CHECKLIST.md)에 한 줄씩 쌓는다. 아래 목차는 작업별 상세 기록(PROMPTS.md)으로 가는 길이다.

영상 제작도 앱 개발과 같은 방식으로 기록한다. 작업마다 실제 요청, 바꾼 것, 이유, 검증 결과를 루트 [PROMPTS.md](../PROMPTS.md) 끝에 작업 ID 제목으로 쌓는다. 영상 관련 기록만 모아 보려면 아래 목차를 따라간다. 새 영상 작업을 기록하면 이 표에도 한 줄을 더한다.

| 날짜 | 작업 ID | 한 일 |
|---|---|---|
| 2026-11-26 | [padlet-rubric-and-trailer-prd](../PROMPTS.md#2026-11-26-padlet-rubric-and-trailer-prd) | 채점 기준 확인, 첫 트레일러 PRD 작성 |
| 2026-11-26 | [process-video-plan](../PROMPTS.md#2026-11-26-process-video-plan) | 과정 소개 영상 초안 틀([PROCESS-PLAN.md](PROCESS-PLAN.md)) |
| 2026-11-27 | [trailer-prd-day](../PROMPTS.md#2026-11-27-trailer-prd-day) | 트레일러를 앱 화면 소개에서 '12명의 하루를 대신 사는' 구성으로 전환 |
| 2026-11-27 | [trailer-video-clips-plan](../PROMPTS.md#2026-11-27-trailer-video-clips-plan) | 인물 6명 5초 영상 클립 계획과 프롬프트 |
| 2026-11-27 | [trailer-conti-question](../PROMPTS.md#2026-11-27-trailer-conti-question) | 질문으로 열고 닫는 콘티 |
| 2026-11-27 | [trailer-open-close-line](../PROMPTS.md#2026-11-27-trailer-open-close-line) | 여는 문장 "오늘, 나와 다른 하루를 사는 사람들이 있습니다." / 닫는 질문 "내일, 우리들의 하루는 어떻게 될까요?" |
| 2026-11-27 | [trailer-mid-question](../PROMPTS.md#2026-11-27-trailer-mid-question) | 가운데 질문 "당신이라면 어떤 선택을 하시겠습니까?" |
| 2026-11-27 | [trailer-clips-gen](../PROMPTS.md#2026-11-27-trailer-clips-gen) | 인물 영상 클립 1차 생성 |
| 2026-11-27 | [trailer-clips-veo-flow](../PROMPTS.md#2026-11-27-trailer-clips-veo-flow) | 버벅이는 클립을 Google Flow(Veo 3.1 Fast)로 다시 생성 |
| 2026-11-27 | [trailer-worklog](../PROMPTS.md#2026-11-27-trailer-worklog) | "선택에 따라 하루가 달라집니다." 문구, 이 목차 신설 |
| 2026-11-27 | [trailer-hyperframes-v1](../PROMPTS.md#2026-11-27-trailer-hyperframes-v1) | HyperFrames로 트레일러 초안 v1 제작([trailer/](trailer/), 검토 [trailer/REVIEW.md](trailer/REVIEW.md)) |
| 2026-11-27 | [trailer-conti-v2](../PROMPTS.md#2026-11-27-trailer-conti-v2) | v1을 보고 콘티를 다시 짬: 세 사람의 하루 + 앱 이용 장면 + 웃는 시오네와 앱 첫 화면 |
| 2026-11-27 | [trailer-v2](../PROMPTS.md#2026-11-27-trailer-v2) | 배포 사이트 앱 화면 녹화 6개(REC-01~06)와 콘티 v2로 트레일러 v2 렌더 |
| 2026-11-27 | [trailer-conti-v3](../PROMPTS.md#2026-11-27-trailer-conti-v3) | v2를 보고 콘티 v3: 2분 이내, 앱 녹화 2배 해상도와 확대, 상황 → A/B → 실제 선택, 세 가지 글 모두 |
| 2026-11-27 | [trailer-conti-v3-1](../PROMPTS.md#2026-11-27-trailer-conti-v3-1) | 12명을 사진 썸네일(이름·나라·상황)로, 닫는 질문은 웃는 시오네와 함께, 끝은 12명 + 타이틀 + 페이드아웃 |
| 2026-11-27 | [video-checklist](../PROMPTS.md#2026-11-27-video-checklist) | 영상 수정 체크리스트 [CHECKLIST.md](CHECKLIST.md) 신설, 트레일러 수정 22건 정리 |
| 2026-11-27 | [trailer-conti-v4](../PROMPTS.md#2026-11-27-trailer-conti-v4) | 콘티 v4: 81.8초, 돌아보기는 아시프로, 다양한 사람들 장면·AI 조사 장면 추가, 타이틀 위 "도덕 · 인권 수업용" |
| 2026-11-27 | [trailer-plan-kofi](../PROMPTS.md#2026-11-27-trailer-plan-kofi) | 코피(13살 학생) 시점 B안 PRD [TRAILER-PLAN-KOFI.md](TRAILER-PLAN-KOFI.md) 작성 |
| 2026-11-27 | [trailer-render-quality](../PROMPTS.md#2026-11-27-trailer-render-quality) | 트레일러 PRD에 고화질 렌더링 규격(비트레이트·녹화 PNG·중간 파일 CRF) 추가 |

### 기록과 자료가 놓이는 곳

| 무엇 | 어디 | Git |
|---|---|---|
| 기획(PRD·콘티) | [TRAILER-PLAN.md](TRAILER-PLAN.md), [PROCESS-PLAN.md](PROCESS-PLAN.md) | 커밋 |
| 영상 수정 체크리스트(고치기 전 → 고친 후) | [CHECKLIST.md](CHECKLIST.md) | 커밋 |
| 작업 기록(요청·결정·검증) | [PROMPTS.md](../PROMPTS.md) — 위 목차 | 커밋 |
| 결정 장면 대화 캡처(공개 선별본) | `screenshots/conversations/<작업ID>/`, 설명은 [conversations/README.md](../conversations/README.md) | 커밋 |
| 대화 캡처 원본 | `local-assets/conversations/<작업ID>/` | 제외 |
| 인물 영상 클립 원본 | `local-assets/video/clips/` | 제외 |
| 앱 화면 녹화 원본 | `local-assets/video/app-recordings/` — `node video/trailer/tools/record-app.mjs`로 다시 녹화 | 제외 |
| 트레일러 HyperFrames 프로젝트 | [trailer/](trailer/) — 클립은 `bash video/trailer/tools/prepare-assets.sh`로 다시 만든다 | 커밋(클립 제외) |
| 렌더링한 MP4 | `local-assets/video/` | 제외 |
