# 만든 과정 소개 영상(작업영상) 초안 틀 (`다른 곳의 하루`)

> 이 문서는 **기존 프로젝트(`global-life-simulator`)를 수정·고도화한 기말과제 개발 과정**을 2~3분 MP4 영상으로 드러내기 위한 **과정 소개 영상 초안(PRD 초안)**이다.
> 핵심 전략은 **“기존 앱을 조금 고친 것”이 아니라 “실제 수업의 한계를 진단하고, 기록·검증·멀티 에이전트 협업 체계를 세워 전체를 다시 깎아 낸 과정”**을 시간순·증거 중심으로 보여 주는 것이다.

---

## 1. 프로젝트 개요 및 평가 기준 정합성

| 항목 | 명세 |
|---|---|
| **대상 앱** | **다른 곳의 하루** (`https://onischool.net/anotherday/`) |
| **출발선 (원본)** | [global-life-simulator](https://github.com/yang102948549/global-life-simulator) `5f5f7b9` (2026-11-12 기준 배포본) |
| **과제 평가 영역** | **과정 영상 25점** — *고치기 전/후 비교 3번 이상, 바꾼 이유, AI에게 실제로 시킨 말* (‘깎음’ 수준 목표) |
| **목표 분량·규격** | **2분 38초** (`158초`, `4,740 frames` @ `30fps`, `1920×1080` FHD, H.264 MP4) — 규정 2~3분 최적 구간 |
| **제작 도구·출력** | **Remotion** (`video/src/process/`) → 완성 MP4 `local-assets/video/process.mp4` |
| **비주얼 톤** | 트레일러([TRAILER-PLAN.md](TRAILER-PLAN.md))와 동일한 **르포 매거진 톤**(`#ffffff` / `#111111`, Pretendard + Gowun Batang, 캐릭터 포인트 색) + 작업 현장 씬에만 터미널·대화창 다크 프레임 대비 |

---

## 2. 이 영상이 반드시 풀어야 할 핵심 질문 2가지

기존 프로젝트를 이어서 수정 개발할 때 평가자가 가장 궁금해하는 두 가지를 영상 초반 44초 안에 정면으로 답한다.

1. **“기존 프로젝트에서 어떻게 작업을 시작했는가?” (Act 1)**
   - 막연하게 수정을 시작하지 않았다. 먼저 과제 채점 기준에 맞춰 **기록·검증 규칙(`DEVELOPMENT.md`, `CLAUDE.md`, `PROMPTS.md`, `CHECKLIST.md`)**을 세우고, 원본 `5f5f7b9`를 그대로 가져와 **배포 기준선(`baseline`) 화면**을 먼저 찍어 출발선을 고정했다.
   - 그 출발선 위에서 **실제 수업에서 드러난 근본 문제**(*“아침에 무엇을 골라도 낮·저녁 장면이 똑같다”*)를 짚어내며 첫 프롬프트를 내렸다.
2. **“어떤 작업 과정을 거치며 깎아 나갔는가?” (Act 2 + Act 3)**
   - **일하는 방식(Workflow)**: Paseo 환경에서 **Codex · Claude Code · Antigravity CLI**를 역할별로 병렬 운용하고, **핸드오프 문서(`캐릭터-분담-작업.md`, `HANDOFF-scenario-branches.md`)**로 작업을 나눈 뒤, 매 수정마다 **전 촬영 → 구현 → Playwright 자동 검증 → 후 촬영 → 배포 확인 → 커밋** 루프를 반복했다.
   - **5번의 실제 수정 라운드(규정 3회 이상 초과)**: 매 라운드마다 **① 실제 AI 요청(원문 발화/대화 캡처) → ② 수정 전/후 실제 화면 비교 → ③ 수업 관점의 바꾼 이유와 재검토**를 일관된 포맷으로 증명한다.

---

## 3. 전체 구조와 타임라인 (총 2분 38초 · 4,740 frames @ 30fps)

```text
[Act 1] 시작과 출발선 (0:00–0:26 · 26s)
   └─ 원본 5f5f7b9 가져오기 · 기록 체계 설계 · 배포 기준선(baseline)과 첫 문제 진단
[Act 2] 작업 방식 공개 (0:26–0:44 · 18s)
   └─ Paseo 멀티 에이전트 병렬 작업 · 핸드오프 분담 · 전/후 캡처 + Playwright 검증 루프
[Act 3] 핵심 수정 전/후 5대 라운드 (0:44–2:14 · 90s)
   ├─ Round 1 (18s): 고정 3장면 → 선택별 갈래 시나리오 재설계 (8명·47장면·96경로)
   ├─ Round 2 (20s): 2D 삽화 → 12명 실사풍 + 디테일 보완 + 35장 상황별 이미지 & 모바일 배너
   ├─ Round 3 (16s): 4명 모자이크 → 12명 히어로 사진 앨범 (높이 재검토·자동 재생)
   ├─ Round 4 (16s): 이름 입력 팝업 제거 + 돌아보기 질문 구체화·문장 틀·최소 20자
   └─ Round 5 (20s): 메일머지식 결과물 → 형식 선선택·장르별 쓰기·성격 체크 6기준
[Act 4] 검증·배포·성과 요약 (2:14–2:38 · 24s)
   └─ 정량 Before/After 대시보드 · 라이브 배포 확인 · 클로징 메시지
```

---

## 4. 씬별 상세 스토리보드 초안

### Act 1. 시작과 출발선 — “기존 앱을 어떻게 다시 시작했나” (`0:00–0:26` · `0–780f` · 26초)

| 구간 | 시간 | 화면 구성 및 연출 | 실제 증거·에셋 | 핵심 카피 |
|---|---|---|---|---|
| **P1-A. 오프닝 & 기록 체계 설계** | `0:00–0:13`<br>(0–390f) | 다크 씬(`#111111`). 타이틀 **“다른 곳의 하루 · 만든 과정”** → 11월 25일 킥오프 대화 캡처(`10-assignment.png`~`13-portfolio-structure.png` 2~3장 컷인)와 함께 저장소 4축(`app/`, `screenshots/`, `CHECKLIST.md`, `PROMPTS.md`)이 도식으로 펼쳐짐. | `local-assets/conversations/2026-11-25-kickoff/12-recording-rules.png`, `13-portfolio-structure.png` | 기존 수업 웹앱(`global-life-simulator`)에서 출발.<br>**수정 전, 기록과 검증의 틀부터 세웠습니다.** |
| **P1-B. 원본 기준선 & 첫 문제 발견** | `0:13–0:26`<br>(390–780f) | 화이트 씬 전환. 커밋 `5f5f7b9` 배지. 배포 기준선 화면 2장(`baseline-desktop-noon-after-a.png` vs `baseline-desktop-noon-after-b.png`)을 좌우로 나란히 놓고 빨간 하이라이트 박스로 **“아침 선택은 달랐는데 낮 장면 제목과 선택지가 똑같다”**를 바로 지목. 하단에 첫 실제 요청 대화 캡처(`01-request.png`) 슬라이드 인. | `screenshots/2026-11-25-import-original/baseline-desktop-noon-after-a.png`, `baseline-desktop-noon-after-b.png`, `screenshots/conversations/2026-11-25-branching-scenes/01-request.png` | **기준선 진단**: 아침에 다른 선택을 해도 낮·저녁은 같은 장면.<br>실제 요청: *“선택에 따른 다른 장면들이 각각 등장하도록 세분화하자”* |

---

### Act 2. 작업 방식 — “AI 에이전트와 어떻게 일했나” (`0:26–0:44` · `780–1320f` · 18초)

| 구간 | 시간 | 화면 구성 및 연출 | 실제 증거·에셋 | 핵심 카피 |
|---|---|---|---|---|
| **P2-A. Paseo 3창 멀티 에이전트 협업** | `0:26–0:36`<br>(780–1080f) | 실제 Paseo 3분할 작업 화면(`paseo-workflow-redacted.png`)을 풀프레임으로 띄우고, 좌·중·우 창에 차례로 콜아웃 라벨 점등:<br>• 왼쪽: **Codex** (히어로 앨범·UI)<br>• 가운데: **Claude Code** (시나리오·글쓰기·배포)<br>• 오른쪽: **Antigravity** (이미지 A조·가이드·영상 PRD) | `screenshots/conversations/2026-11-26-paseo-workflow/paseo-workflow-redacted.png` + `app/design/캐릭터-분담-작업.md` 발췌 | 한 번에 하나씩이 아니라,<br>**역할별 에이전트와 핸드오프 문서로 병렬 작업했습니다.** |
| **P2-B. 매 작업의 5단계 루프** | `0:36–0:44`<br>(1080–1320f) | 가로 파이프라인 다이어그램이 박자에 맞춰 점등: **`① 수정 전 캡처 → ② 구현 → ③ Playwright 자동 검증(PASS) → ④ 수정 후 캡처·육안 확인 → ⑤ 커밋·라이브 배포`**. 배경에 `validate.cjs`·`branch-flow.mjs` 통과 터미널 로그(`02-eight-paths-pass.png`) 짧게 오버레이. | `local-assets/conversations/2026-11-25-branching-scenes/02-eight-paths-pass.png` + Git 커밋 타임라인 | **모든 수정은 전/후 화면과 자동 검증을 통과한 뒤 커밋했습니다.** |

---

### Act 3. 핵심 수정 전/후 5대 라운드 (`0:44–2:14` · `1320–4020f` · 총 90초)

> **통일 카드 레이아웃 (시청자 피로도 방지)**: 매 라운드는 같은 3박자 리듬으로 진행한다.
> ① **실제 AI 요청** (상단 프롬프트 인용 카드 + 실제 대화 캡처) → ② **Before / After 화면 비교** (좌우 분할 또는 와이프 슬라이더) → ③ **바꾼 이유 & 재검토 디테일** (하단 르포 요약 띠).

#### Round 1. 시나리오 갈래 재설계 (`0:44–1:02` · `1320–1860f` · 18초)
- **실제 AI 요청** (`01-request.png` + `PROMPTS.md` 발췌):
  - *“선택에 따른 다른 장면들이 각각 등장할 수 있도록 시나리오를 세분화하도록 하자.”*
  - *“마지막 장면이 대표 발언으로 반복되지 않게 자연스러운 장면으로 검토해줘.”*
- **Before → After 화면**:
  - 투발루 시오네 낮 B: `before-desktop-tuvalu-noon-b.png` (고정 「떠날까, 남을까」) → `after-desktop-tuvalu-noon-b.png` (분기 「보충 시험과 모래주머니」)
  - 8명 확장 컷인: 가나 코피 낮 A(`before/after-desktop-ghana-noon-a.png`) + 콩고 그라스 저녁(`before/after-desktop-congo-evening.png`)
- **바꾼 이유**: 선택이 하루를 실제로 바꾼다고 느껴야 학생이 다른 길을 상상하고 구조적 제약을 비교할 수 있다. (36장면 → **47장면 · 96경로** 전수 통과)

#### Round 2. 2D 삽화 → 12명 실사풍 & 35장 상황별 장면 이미지 (`1:02–1:22` · `1860–2460f` · 20초)
- **실제 AI 요청** (`01-decision-terminal.png` + 발췌):
  - *“각 캐릭터별 상황을 고려해서 실사풍으로 재생성해줘.”*
  - **1차 검수·재요청(‘깎음’ 포인트!)**: *“얼굴 다시 자르고 콩고 X 넣어줘”* / *“시오네 낮 B 이미지와 설명이 맞지 않아. 재검토해줘”*
- **Before → After 화면 (2단 전개)**:
  1. `1:02–1:11`: 2D 삽화 → 실사풍 전환(`2026-11-25-photoreal-characters/before/after-desktop.png`) + **디테일 보완 2컷** (모바일 작은 원 얼굴 크롭 `before/after-mobile-tuvalu-noon.png`, 콩고 집 벽 빨간 X `before/after-desktop-congo.png`)
  2. `1:11–1:22`: 아침 초상 고정 → **A조·B조 분담으로 12명 35장 상황 이미지 완성** (`2026-11-26-scene-images-group-a/before/after-desktop-tuvalu-noon-b.png`, `2026-11-26-deploy-branches-and-scenes/before/after-desktop-pakistan-noon.png` + 모바일 16:9 배너 `after-mobile-pakistan-noon.png`)
- **바꾼 이유**: 인물의 생활환경과 시간대·분기 변화를 시각적으로 체감시키고, 첫 검수에서 발견한 소품 불일치·모바일 얼굴 잘림까지 끝까지 바로잡았다.

#### Round 3. 첫 화면 히어로 사진 앨범 & 높이 정렬·자동 재생 (`1:22–1:38` · `2460–2940f` · 16초)
- **실제 AI 요청** (`PROMPTS.md` 발췌):
  - *“12명이 앨범 사진 넘어가듯 3~4명씩 페이드인·아웃, 텍스트 침범 없이 높이를 맞춰줘.”*
  - **재검토 요청(‘깎음’ 포인트!)**: *“사진들 높이가 맞는지 재검토해줘.”* → *“자동 재생이 되어야 해.”*
- **Before → After 화면**:
  - `2026-11-26-deploy-hero-album/before-desktop.png` (4명+색 사각형 모자이크) → `after-desktop.png` & `after-mobile.png` (12명 가로 순환 앨범, 텍스트와 높이 차이 0px) + `2026-11-26-hero-autoplay/before/after-desktop-reduced.png` (정지 상태 → 자동 재생)
- **바꾼 이유**: 제목과 시작 버튼에 시선을 모으면서도 12명의 생활환경을 차분하게 보여 주고, 교실 PC(Windows 동작 줄이기 설정)에서도 첫 접속부터 자연스럽게 움직이게 했다.

#### Round 4. 이름 입력 팝업 제거 & 돌아보기 질문·최소 20자 (`1:38–1:54` · `2940–3420f` · 16초)
- **실제 AI 요청** (`2026-11-26-no-nickname/01-request.png`, `2026-11-26-min-length/01-request-deploy.png`):
  - *“시작 시 이름 입력 란은 걷어내자. 내가 해당 인물이 된 거잖아.”*
  - *“돌아보기 질문이 막연해… 이후 작성하는 모든 내용은 최소 20자 이상이어야 해.”*
- **Before → After 화면**:
  - `2026-11-26-deploy-no-nickname/before/after-desktop-join.png` (이름 팝업 → 바로 아침 장면 진입)
  - `2026-11-26-deploy-min-length/before/after-desktop-fields.png` + `after-mobile-starter.png` (막연한 질문 → ‘무엇을 골라도 그대로였던 어려움은?’ + 문장 틀 5개 + 실시간 20자 카운터)
- **바꾼 이유**: 몰입을 끊는 불필요한 단계는 덜어내고, 반대로 생각이 깊어져야 하는 성찰 칸에는 구체적 질문·문장 틀·최소 글자 수 장치를 더해 수업의 질을 높였다.

#### Round 5. 메일머지식 글쓰기 → 형식 선선택·장르별 쓰기·성격 체크 (`1:54–2:14` · `3420–4020f` · 20초)
- **실제 AI 요청** (`PROMPTS.md` 발췌):
  - *“지금은 질문 내용이 편지·신문기사·정책제안서에 메일머지 넣듯이 들어가서 그 성격이 드러나질 않아. 형식을 먼저 고르고 거기에 맞게 작성하도록 유도하자.”*
  - *“편지 쓸 때는 누구에게 쓸지, 마지막에 작성자 이름을 적는 걸로 하자.”*
- **Before → After 화면**:
  - `2026-11-26-deploy-genre-writing/before/after-desktop-lab.png` (조사 뒤 형식 선택 → 조사 맨 앞에서 형식 먼저 고르기)
  - `2026-11-26-genre-writing/before/after-desktop-letter.png` + `after-desktop-letter-desk.png` (일반 입력칸 → 편지지/기사/제안서 전용 쓰기 화면)
  - `2026-11-26-deploy-genre-writing/after-desktop-article-check.png` (**글의 성격 체크 6기준 ✓/○ 실시간 갱신** + AI 선생님 피드백 기준 연동)
- **바꾼 이유**: 학생이 무엇을 쓸지 먼저 정해야 그 글에 맞는 근거를 조사하고, 기사·제안서·편지 각각의 문체와 요건을 스스로 점검하며 완성할 수 있다.

---

### Act 4. 검증·배포·성과 요약과 클로징 (`2:14–2:38` · `4020–4740f` · 24초)

| 구간 | 시간 | 화면 구성 및 연출 | 실제 증거·에셋 | 핵심 카피 |
|---|---|---|---|---|
| **P4-A. 정량 변화 대시보드** | `2:14–2:25`<br>(4020–4350f) | 깔끔한 4칸 수치 카드가 차례로 카운트업(보라 그라데이션·이모지 없이 흰/회색/검정 르포 카드):<br>• 시나리오: **36 → 47장면** (8명 갈래 · 96경로)<br>• 이미지: **삽화 12장 → 실사 47장** (인물 12 + 장면 35)<br>• 자동 검증: **1개 → 7개 스크립트** (전부 PASS)<br>• 배포 검증: **`CHECKLIST.md` 전 항목 라이브 확인** | `CHECKLIST.md` + `app/tools/*.mjs` 목록 + `onischool-release` 배포 해시 | **원본 `5f5f7b9`에서 지금의 배포판까지**,<br>모든 개선은 실제 사이트에서 검증했습니다. |
| **P4-B. 클로징 & 아카이브 안내** | `2:25–2:38`<br>(4350–4740f) | 다크 씬 전환 후 Gowun Batang 클로징 문장 `Rise`: *“AI에게 한 번 맡기고 끝낸 것이 아니라, / 수업의 눈으로 묻고, 고치고, 검증하며 깎았습니다.”*<br>하단에 **배포 주소 `onischool.net/anotherday`**, **공개 GitHub 저장소**, **`CHECKLIST.md` · `PROMPTS.md`** 링크 표기 후 페이드아웃. | `screenshots/2026-11-26-deploy-hero-album/after-desktop.png` (은은한 배경) | **AI와 함께, 수업의 눈으로 끝까지 깎아 낸 기록.**<br>`onischool.net/anotherday` |

---

## 5. 보유 증거 점검 & 보완할 캡처

### 이미 확보된 핵심 증거 (바로 사용 가능)

- **대화 캡처 (실제 AI 요청 화면)**:
  - 킥오프·기록 규칙: `local-assets/conversations/2026-11-25-kickoff/10~14-*.png`
  - 분기 첫 요청·검증 통과: `screenshots/conversations/2026-11-25-branching-scenes/01-request.png`, `local-assets/conversations/2026-11-25-branching-scenes/02-eight-paths-pass.png`
  - 실사풍 전환 결정: `screenshots/conversations/2026-11-25-photoreal-characters/01-decision-terminal.png`
  - Paseo 멀티 에이전트 병렬 작업: `screenshots/conversations/2026-11-26-paseo-workflow/paseo-workflow-redacted.png`
  - 돌아보기 20자·이름 입력 제거 요청/배포: `screenshots/conversations/2026-11-26-min-length/01~02.png`, `2026-11-26-no-nickname/01~02.png`
- **수정 전/후 앱 화면**: Round 1~5 **모두 데스크톱·모바일 배포 전후 실제 PNG 확보 완료** (`screenshots/` 및 `local-assets/screenshots/`).

### 제작 전 보완·결정하면 더 좋아지는 항목 (초안 검토용)

1. **사운드 방식**: 트레일러와 동일하게 **안 A(자막/타이포 + 잔잔한 BGM + 효과음)**로 갈지, 과정 영상(2~3분)은 설명 밀도가 높으므로 **안 B(짧은 내레이션 추가)**로 갈지 결정.
2. **Round 수와 밀도**: 현재 **5대 라운드(90초)**가 모두 강력한 수정 사례이나, 한 라운드당 설명 여유를 더 두고 싶다면 **4대 라운드**(예: Round 3·4를 묶거나 170초로 살짝 확장)로 조정 가능.
3. **추가 대화 캡처(선택)**: Round 5(`2026-11-26-genre-writing`)는 업무 창 노출 때문에 대화 원본을 삭제했으므로, 영상에서는 `PROMPTS.md`의 실제 요청 원문 타이포 카드 + 실제 배포 전후 화면 조합으로 깔끔하게 처리한다(합성 대화 이미지 절대 금지).
4. **향후 추가 개선 반영 여지**: 12월 9일 마감 전까지 커밋 일수(5일 이상)를 채우며 **빈 화면·오류 상태 점검**, **DB/API 배포 동작 확인**, **`CHECKLIST.md` 공식 양식 정비** 등 추가 작업이 생기면 Act 4의 정량 요약 수치와 타임라인에 반영한다.

---

## 6. Remotion 코드 확장 계획 (`video/src/process/`)

트레일러와 `video/src/theme.ts`, `components/`를 공유하여 두 영상의 시각적 통일감을 유지한다.

- `video/src/Root.tsx`에 `<Composition id="Process" fps={30} width={1920} height={1080} durationInFrames={4740} />` 등록
- `video/src/components/BeforeAfterSplit.tsx`: 좌우 비교 + 중앙 와이프 슬라이더 + 전/후 라벨 공통 컴포넌트
- `video/src/components/PromptQuoteCard.tsx`: 실제 사용자 요청 원문과 대화 캡처 썸네일을 나란히 보여 주는 카드
- `video/src/process/data.ts`: 5대 라운드의 실제 프롬프트·이유·전후 이미지 경로·수치 데이터
- `video/src/process/scenes/`: `Act1Start.tsx`, `Act2Workflow.tsx`, `Act3Round.tsx`(5회 재사용 + 라운드별 변주), `Act4Summary.tsx`
