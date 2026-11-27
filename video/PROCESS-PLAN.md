# 만든 과정 소개 영상(작업영상) 제작 PRD 및 콘티 (`다른 곳의 하루`)

> 이 문서는 HyperFrames로 **「다른 곳의 하루」 만든 과정 소개 영상(2분 40초 MP4)**을 만들기 위한 제품 요구사항 정의서(PRD) 및 씬별 콘티다.
> 2026-11-27에 트레일러 v2([TRAILER-PLAN.md](TRAILER-PLAN.md))의 제작 방식(**HyperFrames**)과 비주얼 시스템에 맞춰 기존 Remotion 초안을 전면 개편하고, **11월 25~27일 전체 개선 이력(갤러리 SQLite DB · 다양성 35mm 재작업 · 로딩 44.6% 경량화 · 글쓰기 코치 · 트레일러 v1→v2 재설계)**을 모두 반영했다.

---

## 1. 개요와 평가 기준 정합성

| 항목 | 명세 |
|---|---|
| **대상 앱** | **다른 곳의 하루** (`https://onischool.net/anotherday/`) |
| **출발선 (원본)** | [global-life-simulator](https://github.com/yang102948549/global-life-simulator) `5f5f7b9` (2026-11-12 기준 배포본) |
| **과제 평가 영역** | **과정 영상 25점** — *고치기 전/후 비교 3번 이상, 바꾼 이유, AI에게 실제로 시킨 말* (‘깎음’ 수준 목표) |
| **분량·규격** | **2분 40초** (`160초`, `4,800 frames` @ `30fps`), `1920×1080` FHD, H.264 `yuv420p` MP4 — 규정 2~3분 정중앙 |
| **제작 도구·위치** | **HyperFrames** — 프로젝트 `video/process/`, 출력 `local-assets/video/process.mp4` |
| **참고 근거 문서** | [DEVELOPMENT.md](../DEVELOPMENT.md), [CHECKLIST.md](../CHECKLIST.md), [PROMPTS.md](../PROMPTS.md), [ARCHITECTURE.md](../ARCHITECTURE.md), [TRAILER-PLAN.md](TRAILER-PLAN.md) |

### 핵심 전략 4원칙

1. **“기존 앱을 조금 고친 것”이 아니라 “수업의 눈으로 전체를 다시 깎은 기록”임을 증명한다.**
   - 시작부터 원본 `5f5f7b9`의 배포 기준선(`baseline`)과 기록·검증 규칙(`CLAUDE.md`, `CHECKLIST.md`, `PROMPTS.md`)을 먼저 세운 과정을 보여 준다.
2. **평가 기준 3요소를 매 라운드 동일한 3박자 포맷으로 반복한다.**
   - 규정(3번 이상)을 넉넉히 넘긴 **6대 라운드(앱 개선 5회 + 영상 자체 v1→v2 개선 1회)** 모두에서 **① AI에게 실제로 시킨 말(원문 발화/대화 캡처) → ② 고치기 전/후 실제 화면 비교 → ③ 수업 관점의 바꾼 이유와 재검토**를 한눈에 보여 준다.
3. **‘깎음’의 증거(재요청·재작업)를 숨기지 않고 전면에 드러낸다.**
   - 1차 실사풍 → 다양성·35mm 전면 재작업, 하트 24px→16px 절제, 시오네 영상 입 움직임 발견 → 무음 미소 줌인 재촬영, 트레일러 v1(12명 나열) → v2(세 사람 + 실제 앱 녹화) 재설계 등 **AI 첫 결과를 그대로 쓰지 않고 끝까지 다듬은 판단**을 보여 준다.
4. **트레일러와 동일한 비주얼·가독성 규격을 지킨다.**
   - 소리를 꺼도 자막과 화면만으로 100% 이해되어야 하며, AI 기본 디자인(보라 그라데이션, 이모지 카드, 바운스·네온)을 쓰지 않는다.

---

## 2. 비주얼·가독성 시스템 (트레일러 `video/trailer/`와 통일)

| 요소 | 규격 |
|---|---|
| **바탕** | 종이 `#f4f3ef`, 잉크 `#111111`, 보조 `#5c5c5c`, 테두리 `#dcdad3`. 여는 씬(`P01`)·닫는 씬(`P11`)만 `#111111` 암전 바탕 |
| **강조 색** | 라운드별 얇은 띠(`72×5px`)와 `Before`/`After` 배지에만 절제해 사용 (`Before`: `#6b6b6b`, `After`: 앱 대표 톤 `#1f7f7c`, 실제 프롬프트 인용선: `#111111`) |
| **글꼴** | **Pretendard Variable** (`video/trailer/assets/fonts/PretendardVariable.woff2` 공유). 큰 제목 56–64px 600, 라운드 제목 40px 600, 프롬프트 인용·이유 28–32px 500, 라벨 22px 600 |
| **가독성 규칙** | 글자 머무는 시간 `글자 수 ÷ 8 + 1초`(최소 2초). 인용문과 이유 문장은 최대 2줄, 줄당 34자 이내. 전환은 `0.3초` 크로스 디졸브만 사용 |
| **안전 여백** | 콘텐츠 90% 액션 안전 영역, 핵심 텍스트 80% 제목 안전 영역(`상하 72–108px`, `좌우 96–110px`) 준수 |
| **진행 막대** | 상단 2px 얇은 진행 선이 160초 동안 왼쪽에서 오른쪽으로 차오르고, 왼쪽 위에 현재 단계(`01 시작` · `02 작업 방식` · `03 개선 1/6 ~ 6/6` · `04 검증과 성과`) 표시 |

### 라운드 씬 공통 레이아웃 (`P04`~`P09`, 1920×1080)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ 03 개선 1/6 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ (상단 진행 막대)          │
│                                                                      │
│  [실제 AI 요청]  “선택에 따른 다른 장면들이 각각 등장하도록 세분화하자”   │
│                                                                      │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐  │
│  │ BEFORE · 원본 고정 장면       │  │ AFTER · 선택별 분기 장면      │  │
│  │                              │  │                              │  │
│  │     실제 캡처 (780×488)      │→ │     실제 캡처 (780×488)      │  │
│  │                              │  │                              │  │
│  └──────────────────────────────┘  └──────────────────────────────┘  │
│                                                                      │
│  바꾼 이유 │ 내 선택이 하루를 실제로 바꾼다고 느껴야 구조적 제약을 비교한다 │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. 전체 타임라인 한눈에 보기 (총 2분 40초 · 160초 · 4,800 frames @ 30fps)

| 씬 ID | 구간 | 시간 | 길이 | 화면 구성 | 핵심 메시지 |
|---|---|---|---:|---|---|
| `P01-opening` | Act 1 오프닝 | `0:00–0:08` | 8s | 암전 `#111111` | **다른 곳의 하루 · 만든 과정** — AI에게 한 번 맡기고 끝내지 않고, 수업의 눈으로 깎아 낸 기록 |
| `P02-baseline` | Act 1 기준선 | `0:08–0:24` | 16s | 기록 체계 + 원본 기준선 A/B 비교 | 수정 전 기록·검증 규칙부터 세우고, 원본 `5f5f7b9` 기준선에서 첫 문제를 진단 |
| `P03-workflow` | Act 2 작업 방식 | `0:24–0:42` | 18s | Paseo 3분할 협업 화면 + 5단계 검증 루프 | Codex · Claude Code · Antigravity 병렬 협업과 매 작업 전/후 캡처·Playwright 검증 루프 |
| `P04-round1-branch` | Act 3 개선 1/6 | `0:42–0:58` | 16s | 고정 3장면 → 선택별 갈래 시나리오 | 아침 선택에 따라 낮·저녁이 갈라지는 8명·47장면·96경로 재설계 |
| `P05-round2-visual` | Act 3 개선 2/6 | `0:58–1:14` | 16s | 2D 삽화 → 35mm 다큐 실사 47장 & 경량화 | 1차 실사 검수 후 다양성·35mm 전면 재작업 + 35장 상황 이미지·로딩 44.6% 경량화 |
| `P06-round3-hero-flow` | Act 3 개선 3/6 | `1:14–1:30` | 16s | 12명 히어로 앨범 정렬 + 이름 팝업 제거 | 4명 모자이크 → 12명 순환 앨범·높이 0px 정렬·자동 재생, 시작 이름 팝업 제거 |
| `P07-round4-writing` | Act 3 개선 4/6 | `1:30–1:46` | 16s | 돌아보기 20자·형식 선선택·피드백 고치기 | 메일머지식 글쓰기 → 형식 선선택·성격 체크 6기준·피드백 보며 바로 고치기·기사 2단 배치 |
| `P08-round5-gallery-db` | Act 3 개선 5/6 | `1:46–2:02` | 16s | 갤러리 하트(SQLite DB) + 모바일 디테일 | Durable Object SQLite 하트 저장, 하트 24px→16px 절제, 모바일 대화 칩 줄 정렬 |
| `P09-round6-video` | Act 3 개선 6/6 | `2:02–2:18` | 16s | 트레일러 v1 → v2 & Veo 시오네 재촬영 | 영상도 첫 초안에 멈추지 않음: 시오네 무음 미소 재촬영, v1(12명 나열) → v2(세 사람+앱 녹화) |
| `P10-metrics` | Act 4 성과·구조 | `2:18–2:32` | 14s | 정량 변화 4카드 + 아키텍처·라이브 검증 | 36→47장면, 44.6% 경량화, Cloudflare+SQLite+Gemini 라이브 작동, CHECKLIST 전 항목 확인 |
| `P11-closing` | Act 5 클로징 | `2:32–2:40` | 8s | 암전 `#111111` | **수업의 눈으로 묻고, 고치고, 검증하며 깎았습니다.** + 배포·저장소 아카이브 안내 |

---

## 4. 씬별 상세 콘티 및 확정 에셋 경로

### Act 1. 시작과 기준선 (`0:00–0:24` · 24초)

#### `P01-opening.html` (`0:00–0:08` · 8초)
- **화면**: `#111111` 암전 바탕.
- **전개**:
  - `0.2s`: 작은 라벨 `다른 곳의 하루 · 개발 과정 기록`
  - `0.8s`: 큰 제목 **“기존 수업 웹앱을, / 수업의 눈으로 다시 깎았습니다.”**
  - `3.6s`: 보조 문장 `2026.11.25 – 11.27 · 기획 · 멀티 에이전트 협업 · 검증 · 라이브 배포`
  - `7.7s`: 0.3초 디졸브로 종이 바탕 전환.

#### `P02-baseline.html` (`0:08–0:24` · 16초)
- **전반 (`0:08–0:15`, 7초) — 기록·검증 체계부터 설계**:
  - 에셋: `local-assets/conversations/2026-11-25-kickoff/12-recording-rules.png`, `13-portfolio-structure.png`
  - 실제 요청 인용: *“개발할 때 이 가이드라인에 따라 체크리스트, 커밋, 프롬프트, 스크린샷을 매번 확인해서 넣어야 해.”*
  - 우측 도식: 저장소 4축(`app/` · `screenshots/` · `CHECKLIST.md` · `PROMPTS.md`)과 원본 `global-life-simulator (5f5f7b9)` 기준선 고정.
- **후반 (`0:15–0:24`, 9초) — 원본 기준선에서 첫 수업 문제 발견**:
  - 에셋:
    - `screenshots/2026-11-25-import-original/baseline-desktop-noon-after-a.png`
    - `screenshots/2026-11-25-import-original/baseline-desktop-noon-after-b.png`
    - `screenshots/conversations/2026-11-25-branching-scenes/01-request.png`
  - 연출: 두 기준선 화면을 좌우에 놓고 같은 제목(「떠날까, 남을까」)과 같은 A/B 버튼에 강조 테두리.
  - 핵심 카피: **기준선 진단 — 아침에 다른 선택을 해도, 낮과 저녁은 같은 장면이었습니다.**

---

### Act 2. 작업 방식 — 멀티 에이전트 협업과 검증 루프 (`0:24–0:42` · 18초)

#### `P03-workflow.html` (`0:24–0:42` · 18초)
- **전반 (`0:24–0:34`, 10초) — Paseo 3분할 멀티 에이전트 병렬 작업**:
  - 에셋: `screenshots/conversations/2026-11-26-paseo-workflow/paseo-workflow-redacted.png`
  - 연출: 실제 3분할 작업 화면을 중앙에 띄우고 좌·중·우 창에 순서대로 역할 콜아웃 점등:
    - 왼쪽 **Codex**: 히어로 앨범 · UI 정렬
    - 가운데 **Claude Code**: 시나리오 갈래 · 글쓰기 · 배포 · 트레일러 조립
    - 오른쪽 **Antigravity CLI**: 상황 이미지 · 아키텍처 문서 · Veo 영상 클립
  - 핵심 카피: **역할별 AI 에이전트와 핸드오프 문서로 병렬 작업했습니다.**
- **후반 (`0:34–0:42`, 8초) — 매 작업 5단계 검증 루프**:
  - 에셋: `local-assets/conversations/2026-11-25-branching-scenes/02-eight-paths-pass.png`
  - 연출: 가로 5단계 카드 순차 점등: **`① 수정 전 촬영 → ② 구현 → ③ 자동 검증(PASS) → ④ 수정 후 육안 확인 → ⑤ 커밋·배포`**
  - 핵심 카피: **모든 수정은 전/후 화면과 Playwright · `validate.cjs` 검증을 통과한 뒤 커밋했습니다.**

---

### Act 3. 핵심 개선 전/후 6대 라운드 (`0:42–2:18` · 96초, 각 16초)

#### `P04-round1-branch.html` — 개선 1/6. 고정 3장면 → 선택별 갈래 시나리오 (`0:42–0:58` · 16초)
- **실제 AI 요청** (`screenshots/conversations/2026-11-25-branching-scenes/01-request.png`):
  - *“선택에 따른 다른 장면들이 각각 등장할 수 있도록 시나리오를 세분화하자. 마지막 장면이 대표 발언으로 반복되지 않게 검토해줘.”*
- **Before → After 에셋**:
  - 전반(8s): 투발루 시오네 낮 B — `screenshots/2026-11-26-deploy-branches-and-scenes/before-desktop-tuvalu-noon-b.png` → `after-desktop-tuvalu-noon-b.png`
  - 후반(8s): 가나 코피 낮 A & 콩고 그라스 저녁 — `before/after-desktop-ghana-noon-a.png`, `before/after-desktop-congo-evening.png`
- **바꾼 이유**: 내 선택이 하루를 실제로 바꾼다고 느껴야 다른 길을 상상하고 구조적 제약을 비교할 수 있습니다. *(36장면 → 47장면 · 8명 갈래 · 96경로 전수 통과)*

#### `P05-round2-visual.html` — 개선 2/6. 2D 삽화 → 35mm 다큐 실사 47장 & 경량화 (`0:58–1:14` · 16초)
- **실제 AI 요청** (`screenshots/conversations/2026-11-25-photoreal-characters/01-decision-terminal.png`):
  - *“각 캐릭터별 상황을 고려해서 실사풍으로 재생성해줘.”* → **재검토(‘깎음’)**: *“얼굴 다시 자르고… 12명 외모·복장을 차별화해 35mm 다큐 질감으로 전면 재작업, 이미지 로딩 경량화”*
- **Before → After 에셋**:
  - 전반(8s): 2D 삽화 → 35mm 다큐멘터리 다양성 최종판 — `screenshots/2026-11-25-photoreal-characters/before-desktop.png` → `screenshots/2026-11-26-deploy-character-diversity/after-desktop-atlas.png` (우측 하단에 모바일 얼굴 크롭 전/후 인셋 `before/after-mobile-tuvalu-noon.png`)
  - 후반(8s): 상황별 낮·저녁 35장 & 모바일 16:9 배너 — `screenshots/2026-11-26-deploy-branches-and-scenes/before-desktop-pakistan-noon.png` → `after-desktop-pakistan-noon.png` + `after-mobile-pakistan-noon.png`
- **바꾼 이유**: 시간대와 분기 변화를 시각적으로 체감시키고, 59장 WebP를 **4.78MB → 2.65MB(44.6% 절감)**·순차 큐 프리로드로 학교 와이파이에서도 빠르게 열리게 했습니다.

#### `P06-round3-hero-flow.html` — 개선 3/6. 히어로 앨범 정렬 & 이름 팝업 제거 (`1:14–1:30` · 16초)
- **실제 AI 요청** (`screenshots/conversations/2026-11-26-no-nickname/01-request.png`):
  - *“12명이 앨범 사진 넘어가듯… 사진들 높이가 맞는지 재검토해줘.”* / *“시작 시 이름 입력 란은 걷어내자. 내가 해당 인물이 된 거잖아.”*
- **Before → After 에셋**:
  - 전반(8s): 4명 모자이크 → 12명 가로 순환 앨범(텍스트 높이 0px 정렬·자동 재생) — `screenshots/2026-11-26-deploy-hero-album/before-desktop.png` → `after-desktop.png`
  - 후반(8s): 이름 입력 팝업 제거 → 바로 아침 장면 진입 — `screenshots/2026-11-26-deploy-no-nickname/before-desktop-join.png` → `after-desktop-join.png`
- **바꾼 이유**: 첫 화면 시선을 정리해 교실 PC에서도 자동 재생되게 하고, 시작부터 몰입을 끊는 이름 입력 단계를 없앴습니다.

#### `P07-round4-writing.html` — 개선 4/6. 돌아보기 20자 · 형식 선선택 · 피드백 보며 고치기 (`1:30–1:46` · 16초)
- **실제 AI 요청** (`screenshots/conversations/2026-11-26-min-length/01-request-deploy.png` + `PROMPTS.md` 원문):
  - *“작성하는 모든 내용은 최소 20자 이상이어야 해.”* / *“메일머지 넣듯이 들어가지 않게 형식을 먼저 고르고, 칩을 눌러 그대로 제출하지 않게 조언으로 바꿔줘.”*
- **Before → After 에셋**:
  - 전반(8s): 돌아보기 질문 구체화·20자 카운터 + 조사 맨 앞 형식 선선택 — `screenshots/2026-11-26-deploy-min-length/before/after-desktop-fields.png`, `screenshots/2026-11-26-deploy-genre-writing/before/after-desktop-lab.png`
  - 후반(8s): 글의 성격 체크 6기준 + 피드백 보며 바로 고치기 창 + 신문 기사 2단 배치 — `screenshots/2026-11-26-deploy-genre-writing/after-desktop-article-check.png`, `screenshots/2026-11-26-deploy-writing-coach/after-desktop-review-edit.png`, `screenshots/2026-11-26-deploy-doc-layout/after-desktop-article.png`
- **바꾼 이유**: 베껴 쓰기를 막고 학생이 글의 종류에 맞춰 스스로 점검하고 피드백을 보며 그 자리에서 고칠 수 있게 흐름을 다시 짰습니다.

#### `P08-round5-gallery-db.html` — 개선 5/6. 갤러리 하트(SQLite DB) & 모바일 디테일 (`1:46–2:02` · 16초)
- **실제 AI 요청** (`screenshots/conversations/2026-11-26-gallery-hearts/01-request.png` + `PROMPTS.md` 원문):
  - *“갤러리 카드에 하트 공감 기능을 넣어줘.”* → **재검토(‘깎음’)**: *“하트가 게시글보다 먼저 눈에 띄지 않게 줄여줘.”* / *“모바일 대화 칩 두 줄 이상 왼쪽 정렬로 고쳐줘.”*
- **Before → After 에셋**:
  - 전반(9s): 갤러리 하트 추가 + 24px→16px 절제 + `GalleryStore` Durable Object SQLite(`subs`·`hearts`) 다이어그램 뱃지 — `screenshots/2026-11-26-deploy-gallery-hearts/before-desktop.png` → `screenshots/2026-11-26-deploy-heart-size/after-desktop.png`
  - 후반(7s): 모바일 대화 칩 줄 정렬 — `screenshots/2026-11-26-deploy-chip-align/before-mobile-long.png` → `after-mobile-long.png`
- **바꾼 이유**: 친구 글에 가볍게 공감하되 글이 주인공이 되도록 무게를 줄이고, 1기기 1하트가 서버 SQLite DB에 실제 저장되게 구현했습니다.

#### `P09-round6-video.html` — 개선 6/6. 트레일러까지 끝까지 깎음 (Veo 재촬영 · v1 → v2) (`2:02–2:18` · 16초)
- **실제 AI 요청** (`PROMPTS.md` 원문 + `local-assets/conversations/2026-11-27-trailer-v2/`):
  - *“시오네 영상은 대사하지 말고 웃으며 줌인하게 다시 만들자.”* / *“v1은 앱 화면이 없어 앱인지 모르겠다. 세 사람의 하루와 실제 앱 이용 화면으로 다시 짜자.”*
- **Before → After 에셋 (실제 영상 좌우 비교!)**:
  - 왼쪽 `BEFORE · 트레일러 v1`: `local-assets/video/trailer-v1.mp4` (12명 정지·영상 나열 구간, 6초 트리밍)
  - 오른쪽 `AFTER · 트레일러 v2`: `local-assets/video/trailer-v2.mp4` (세 사람의 하루 → 실제 앱 녹화 → 웃는 시오네 구간, 6초 트리밍)
- **바꾼 이유**: 앱뿐 아니라 소개 영상도 첫 초안에 만족하지 않고, 처음 보는 사람의 시선으로 콘티와 인물 클립을 다시 깎았습니다.

---

### Act 4. 검증·아키텍처·성과 요약 (`2:18–2:32` · 14초)

#### `P10-metrics.html` (`2:18–2:32` · 14초)
- **화면**: 종이 바탕 `#f4f3ef` 위 깔끔한 4칸 르포 수치 카드 + 하단 아키텍처 한 줄 요약([ARCHITECTURE.md](../ARCHITECTURE.md) 기반):
  1. **시나리오**: `36 → 47장면` (8명 분기 · 96경로 전수 통과)
  2. **비주얼·속도**: `2D 12장 → 35mm 실사 47장` (WebP 59장 `44.6%` 경량화)
  3. **백엔드·DB·AI**: `Cloudflare Pages + Worker(enam 중계) + Durable Object SQLite + Gemini API` 라이브 작동
  4. **검증·기록**: `CHECKLIST.md 26개 항목` 라이브 검증 · Playwright 자동 검증 스크립트 다수
- **핵심 카피**: **원본 `5f5f7b9`에서 지금의 배포판까지, 모든 개선은 실제 사이트에서 검증했습니다.**

---

### Act 5. 클로징 (`2:32–2:40` · 8초)

#### `P11-closing.html` (`2:32–2:40` · 8초)
- **화면**: `#111111` 암전 바탕 (P01 오프닝과 수미상관).
- **전개**:
  - `0.5s`: **“AI에게 한 번 맡기고 끝낸 것이 아니라, / 수업의 눈으로 묻고, 고치고, 검증하며 깎았습니다.”**
  - `3.5s`: 하단 아카이브 정보 (작은 회색 글자):
    - 배포: `onischool.net/anotherday`
    - 기록: `CHECKLIST.md` · `PROMPTS.md` · `ARCHITECTURE.md`
  - `6.0–8.0s`: BGM 페이드아웃과 함께 마무리.

---

## 5. 사운드

| 트랙 | 명세 |
|---|---|
| **배경 음악** | 가사 없는 차분한 피아노·로파이 또는 다큐멘터리 어쿠스틱(90–100 BPM). 오프닝 −22 dB → 본편 −16 dB → 클로징 2초 페이드아웃 |
| **효과음** | 라운드 전환 시 부드러운 종이 넘김 1회, Before→After 전환 시 미세한 클릭/틱 1회. 과한 효과음 금지 |
| **내레이션** | **없음** (트레일러와 동일하게 소리를 꺼도 화면 글·실제 캡처만으로 100% 이해 가능) |
| **저작권** | CC0 또는 교육용 무료 음원만 사용하고 출처를 `video/process/REVIEW.md`에 기록 |

---

## 6. HyperFrames 프로젝트 구조 (`video/process/`)

트레일러(`video/trailer/`)와 동일한 구조·폰트를 공유한다.

```text
video/process/
├── index.html                      # 루트: 11개 씬 조립 (160초 · 1920×1080 · 30fps)
├── compositions/
│   ├── p01-opening.html            # Act 1 오프닝 (8s)
│   ├── p02-baseline.html           # Act 1 기록 체계 + 기준선 진단 (16s)
│   ├── p03-workflow.html           # Act 2 Paseo 3분할 + 5단계 루프 (18s)
│   ├── p04-round1-branch.html      # Act 3 개선 1/6 시나리오 분기 (16s)
│   ├── p05-round2-visual.html      # Act 3 개선 2/6 35mm 실사 & 경량화 (16s)
│   ├── p06-round3-hero-flow.html   # Act 3 개선 3/6 히어로 앨범 & 이름 제거 (16s)
│   ├── p07-round4-writing.html     # Act 3 개선 4/6 글쓰기 흐름 & 피드백 (16s)
│   ├── p08-round5-gallery-db.html  # Act 3 개선 5/6 갤러리 DB & 모바일 칩 (16s)
│   ├── p09-round6-video.html       # Act 3 개선 6/6 트레일러 v1→v2 (16s)
│   ├── p10-metrics.html            # Act 4 정량 변화·아키텍처 요약 (14s)
│   └── p11-closing.html            # Act 5 클로징 (8s)
├── assets/
│   ├── fonts/PretendardVariable.woff2   # video/trailer/assets/fonts/에서 복사
│   ├── screens/                         # 선별 Before/After PNG (tools/prepare-assets.mjs로 복사)
│   ├── conv/                            # 선별 대화 캡처 PNG (비공개 정보 가림본만)
│   └── clips/                           # trailer-v1 / trailer-v2 비교용 6초 트리밍 MP4 (Git 제외)
├── tools/
│   └── prepare-assets.mjs               # screenshots/ 및 local-assets/에서 필요한 파일만 복사·검증
└── REVIEW.md                            # 스냅숏·렌더 검수 기록
```

---

## 7. 검수 기준 및 제작 순서

### 검수 기준
1. **규격**: 2분 40초(160초, 규정 2~3분), `1920×1080` MP4 정상 재생. 제작 코드 `video/process/` 커밋, 완성 MP4는 `local-assets/video/process.mp4` 보관.
2. **평가 3요소 충족**: 고치기 전/후 비교 **6회**(규정 3회 이상), 모든 라운드에 **실제 AI 요청 원문**과 **수업 관점의 바꾼 이유** 포함.
3. **가독성·개인정보**: `hyperframes check --json` 오류 0건, 글자 잘림·겹침 0건, 실제 학생 정보·업무 메신저·API 키 노출 0건.

### 제작 순서
1. **(완료)** 작업 영상 콘티 및 에셋 매핑 확정 (이 문서).
2. **(다음)** `video/process/` HyperFrames 프로젝트 초기화 + `tools/prepare-assets.mjs`로 선별 PNG·대화 캡처·`trailer-v1/v2` 비교 클립 준비.
3. 공통 라운드 레이아웃으로 `p01`~`p11` 구현 → `hyperframes check --json` 및 씬별 스냅숏(`snapshot`) 육안 검수.
4. `local-assets/video/process.mp4` 렌더링 후 처음부터 끝까지 재생해 속도·가독성 다듬기 → `video/process/REVIEW.md` 작성 및 커밋.
