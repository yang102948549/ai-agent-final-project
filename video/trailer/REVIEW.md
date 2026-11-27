# 트레일러 v3 B안(코피) 검토 (2026-11-27)

- 콘티: [../TRAILER-PLAN-KOFI.md](../TRAILER-PLAN-KOFI.md) (공통 규격: [../TRAILER-PLAN.md](../TRAILER-PLAN.md) 2·3·3.1·6·7·8·9절)
- 출력: `local-assets/video/trailer-v3-kofi.mp4` — `1920×1080`, `30fps`, H.264 `yuv420p`, **`82.70s`** (2,481 frames), **`122.5 MB`** (`128,487,541 B`), 평균 비트레이트 **`12.43 Mbps`** (`12,429 kbps`), 무음.
- 이전 버전(`trailer-v1.mp4`, `trailer-v2.mp4`)은 `local-assets/video/`에 보존했다.

## 만든 방식

- **장면 13개** (`compositions/`, 82.7초):
  - 직접 작성: `opening.html` (S1 여는 문장)
  - `tools/build-scenes.mjs` 생성 12개: `kofi`, `cast`, `app-scene`, `situation`, `options`, `app-choice`, `app-reflect`, `app-ask`, `others`, `app-docs`, `sione-close`, `finale`
- **인물 영상·썸네일** (`tools/prepare-assets.sh`):
  - S2 코피는 사진 대신 Google Flow Veo 3.1 Fast로 생성한 무음 사본(`07-ghana-silent.mp4`)을 3:4 크롭·810×1080 CRF 12로 가공해 반영했다.
  - S10 다른 학생들(라마·암나·그라스, 모두 14살)과 S12 시오네(끝 4.6초 + 마지막 프레임 정지 이미지), S3·S13 12명 썸네일(`assets/cast/*.jpg`, 600×800 JPG 95)을 함께 준비했다.
- **고화질 앱 화면 녹화** (`tools/record-app.mjs`, 3.1절 규격):
  - 배포 사이트(`https://onischool.net/anotherday/`)를 `1440×900` × `deviceScaleFactor: 2` (`2880×1800` PNG 무손실 CDP screencast) → `30fps` H.264 High **CRF 10** MP4로 7편(`REC-K1~K7`) 녹화했다.

| 녹화 | 장면 | 내용 | 데이터 |
|---|---|---|---|
| REC-K1 | S4 | 코피 아침 「“오늘 하루만 같이 가자”」 → 답 칩 클릭 → 아빠의 **실제 AI 대답** | 배포 AI (응답 대기 시간 제외) |
| REC-K2 | S7 | 코피 아침 선택 화면 → B(“학교에 갈게요…”) 클릭 → 결과(잘 본 시험과 다친 아빠) | AI 미연결 상태 모의(선택지 즉시 표시) |
| REC-K3 | S8 | 코피 돌아보기 → “어느 쪽을 골라도 일꾼을 쓸 돈이 없는 건 그대로였다.” 입력 | 예시 작성 |
| REC-K4 | S9 | 코피 질문·조사 → “카카오 농가 아이들은 왜 학교 대신 밭에 갈까?” → **실제 AI 조사 도우미 답 + ILO 원문 자료** | 배포 AI (응답 대기 시간 제외) |
| REC-K5 | S11 | 완성 신문 기사(시오네, `김*늘`) 스크롤 | 예시 작성본 |
| REC-K6 | S11 | 완성 정책 제안서(마리암, `이*아`) 스크롤 | 예시 작성본 |
| REC-K7 | S11 | 완성 편지(코피, `박*준`) 스크롤 | 예시 작성본 |

## 검증 및 깎음 기록

- **`hyperframes check --json`**: `lint` · `runtime` · `layout` · `contrast` · `craft` · `audio` 전 항목 **오류 0건** 통과.
- **스냅숏 19장 육안 검수 후 보정**:
  - S11 세 가지 글(`63s` 신문 기사, `66.5s` 정책 제안서, `70s` 편지)에서 상단 제목이 프레임 윗선에 살짝 잘리는 문제를 발견해 확대 값을 `scale: 1.26, x: -125, y: 112`(편지 `y: 100`)로 보정하고 재스냅숏 3장으로 제목·본문 전체 노출을 확인했다.
  - S3 `cast` · S5 `situation` · S6 `options`의 의도적 정지 구간에 `data-hold`를 추가했다.
- **렌더 후 확인 (`ffprobe` + 100% 프레임 추출)**:
  - `1920×1080`, `30fps`, `yuv420p`, `82.70s`, `12.43 Mbps` (목표 16M의 77.7%, v2 `3.4 Mbps` 대비 3.6배).
  - 최종 MP4에서 100% 원본 크기 PNG 3장(`20s` AI 대화 확대, `53.5s` AI 조사 확대, `82.65s` 마지막 검은 화면)을 추출해 직접 열어 본문·버튼·ILO 출처 글자가 번짐 없이 선명하게 읽히고 마지막 프레임이 완전한 검은 화면임을 확인했다.

## 남은 확인

- 배경 음악·클릭 효과음(음원 미정으로 무음 렌더링).
- 패들렛 제출 파일 크기 제한(현재 `122.5 MB`, 제한 초과 시 `--video-bitrate 8M` 업로드본 별도 생성) 및 분량 기준(30~60초 vs 82.7초) 최종 확인.
