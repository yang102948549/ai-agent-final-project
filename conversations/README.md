
# 대화 증거

## 개선 판단 — 2026-11-26-hero-album

실제 요청과 판단은 [PROMPTS.md](../PROMPTS.md#2026-11-26-hero-album)에 기록했다. 핵심 결정은 12명 전체의 앨범식 가로 흐름, 텍스트 영역 비침범, 모든 사진 높이 통일이다. 2026-11-26 대화 창 캡처는 앱 접근 승인 시간 초과로 대기 중이다. 실제 대화 이미지 링크는 촬영 후 추가한다.

앱 화면 증거: [데스크톱](../screenshots/2026-11-26-hero-album/after-desktop-aligned.png) · [모바일](../screenshots/2026-11-26-hero-album/after-mobile-aligned.png). 이는 대화 캡처가 아닌 실제 앱 화면이다.

## 개선 판단·배포 — 2026-11-26-min-length

실제 요청과 판단은 [PROMPTS.md](../PROMPTS.md#2026-11-26-min-length)와 [배포 기록](../PROMPTS.md#2026-11-26-deploy-min-length)에 있다. 핵심 결정은 막연한 돌아보기 질문을 ‘무엇을 골라도 그대로였던 어려움’으로 바꾸고 문장 틀을 주는 것, 돌아보기 이후 모든 서술 칸에 최소 20자(제목·받는 사람 10자)를 두는 것이다. 사용자가 대화는 전체 화면 그대로 캡처해도 된다고 정했다.

대화 캡처(1920×1080, 2026-11-26): [배포 요청 장면](../screenshots/conversations/2026-11-26-min-length/01-request-deploy.png) · [배포 후 검증 장면](../screenshots/conversations/2026-11-26-min-length/02-after-deploy.png)


## 배포·작업 방식 — 2026-11-26-paseo-workflow

사용자 요청:
- “현재 이 paseo 대화창 화면도 캡쳐해서 이런 식으로 작업하고 있다는 걸 알 수 있게 해줘”
- “이 paseo 이 창도 윈도우캡쳐도구를 활용해서 캡쳐해서 작업폴더에 넣어줘. 어떤 도구를 통해서 어떻게 하고 있다는 걸 작업 영상에 스크린샷 몇개를 넣는 용도야”
- “앞으로도 이런 paseo 작업 창들도 간혹 캡쳐해줘”
- “캡쳐도 알아서 해서 넣어야 해. 작업기록 md에 추가해줘”

Paseo의 대화·코드 작업·실행 결과가 함께 보이는 실제 창을 촬영해 과정 소개 영상(작업 영상)에서 멀티 에이전트 협업 도구 활용 근거로 사용한다. 앞으로도 주요 작업마다 에이전트가 알아서 Paseo 작업 창을 캡처해 `local-assets/conversations/<작업ID>/`와 `screenshots/conversations/<작업ID>/`에 추가한다(격리 데스크톱 `exebox-*` 세션에서 촬영이 제한될 경우 데스크톱 권한이 있는 세션에서 즉시 촬영해 보충).

- [Paseo 3창 작업 화면(개인정보 가림)](../screenshots/conversations/2026-11-26-paseo-workflow/paseo-workflow-redacted.png)
- [Paseo 전체 창 · 최소 글자 수 배포 후 검증](../screenshots/conversations/2026-11-26-min-length/02-after-deploy.png)
- [Paseo 전체 창 · 갤러리 하트 자동 검증 통과](../screenshots/conversations/2026-11-26-gallery-hearts/01-checks.png)

창 캡처 원본은 `local-assets/conversations/2026-11-26-paseo-workflow/paseo-workflow-original.png`(1536×816)에 보존했다. 공개본은 이전 캡처 속 개인정보·전송 전 입력·외부 문서 주소를 가림 표시했으며 나머지 실제 화면은 변경하지 않았다. 이 자료는 작업 방식 증거이며, 1920×1080 모니터 원본 요건을 충족한 영상용 촬영본은 아니다. 창 제어에서 사용자 입력 감지가 반복되어 추가 확대·스크롤은 수행하지 않았다.

## 개선 판단 — 2026-11-26-no-nickname

실제 요청과 판단은 [PROMPTS.md](../PROMPTS.md#2026-11-26-no-nickname)에 있다. 핵심 결정은 학생이 그 인물로 하루를 사는 활동이므로 시작할 때 이름을 받지 않고, 갤러리 제출 때만 학년·반·이름을 받는 것이다.

대화 캡처(전체 화면, 2026-11-26): [요청 장면 4800×1350](../screenshots/conversations/2026-11-26-no-nickname/01-request.png) · [배포 후 장면 1920×1080](../screenshots/conversations/2026-11-26-no-nickname/02-after-deploy.png). 편지 맺음은 인물 이름(코피 드림)으로 하기로 이어서 결정했다.

## 기능 구현 — 2026-11-26-gallery-hearts

실제 요청과 판단은 [PROMPTS.md](../PROMPTS.md#2026-11-26-gallery-hearts)에 있다. 핵심 결정은 로그인 없이 브라우저마다 무작위 기기 번호를 두어 한 결과물에 하트 하나만 달게 하고, 인스타그램처럼 카드 하트와 크게 보기에서 두 번 톡하기를 함께 두는 것이다.

대화 캡처(2026-11-26 15:53, 오른쪽 모니터 1920×1080): [검사 통과 장면](../screenshots/conversations/2026-11-26-gallery-hearts/01-checks.png). 왼쪽 모니터에 다른 업무 창이 있어 전체 화면 원본은 지우고 오른쪽 모니터만 남겼다.

## 영상 제작 — 2026-11-27 트레일러 콘티

트레일러 기획 대화의 실제 요청과 결정은 [PROMPTS.md](../PROMPTS.md#2026-11-27-trailer-prd-day)부터 이어지는 `2026-11-27-trailer-*` 기록에 있다. 영상 작업만 모은 목차는 [video/README.md](../video/README.md#영상-제작-작업-기록)에 있다.

- 핵심 결정은 네 가지다.
  - 앱 화면 소개를 버리고 12명의 하루를 비추며 그 하루를 대신 사는 구성으로 바꿨다.
  - QR·주소와 "왜 못 갔니" 시작을 뺐다.
  - "오늘, 나와 다른 하루를 사는 사람들이 있습니다."로 열고, "당신이라면 어떤 선택을 하시겠습니까?"와 "선택에 따라 하루가 달라집니다."를 거쳐, "내일, 우리들의 하루는 어떻게 될까요?"로 닫는다.
  - 인물 컷마다 3.5초 이상 머물게 해 빠르게 지나가지 않게 했다.
- 대화 캡처 원본은 로컬에만 둔다.
  - `local-assets/conversations/2026-11-27-trailer-prd-day/full-screen-01.png`(2560×1600)
  - `local-assets/conversations/2026-11-27-trailer-worklog/full-screen-01.png`(4480×1080, 두 모니터)와 Paseo 모니터만 잘라 낸 `paseo-monitor-01.png`(1920×1080)
  - 두 번째 캡처의 Paseo 창에는 다른 세션이 Google Flow로 Veo 인물 클립 6개를 만들어 검수하는 장면이 담겼다.
  - 콘티 결정 발화 자체는 화면에 없고, 로컬 사용자 경로가 보여 공개 선별본은 만들지 않았다.
