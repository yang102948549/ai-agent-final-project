# 트레일러 영상 제작 PRD (`다른 곳의 하루`)

> 이 문서는 Remotion으로 **「다른 곳의 하루」 트레일러 영상(59.5초 MP4)**을 만들기 위한 제품 요구사항 정의서(PRD)다. 2026-11-27에 틀을 바꿨다. 앱 화면을 소개하는 영상이 아니라, **12명의 하루를 비추고 시청자가 그 하루를 대신 살아 보는 영상**이다.

---

## 1. 개요와 확정 결정

| 항목 | 명세 |
|---|---|
| **대상 앱** | 다른 곳의 하루 — 중학교 도덕 「지구촌 문제」 수업에서 12명의 하루를 대신 살아 보는 웹앱 |
| **과제 평가 영역** | 트레일러 영상 15점 — *누구에게 무엇이 좋은 앱인지 1분 안에 전달되는지* |
| **분량·규격** | **59.5초** (`1,785 frames` @ `30fps`), `1920×1080`, H.264 `yuv420p` MP4. 60초 제한까지 0.5초 여유 |
| **제작 도구·위치** | Remotion — 제작 코드 `video/`, 출력 `local-assets/video/trailer.mp4` |
| **인물·장면 자료** | [characters.md](../app/design/characters.md), [scenario-branches.md](../app/design/scenario-branches.md), `app/dist/assets/` |

### 확정 원칙

1. **주인공은 12명이다.** 12명 모두 이름·나이·사는 곳·그날의 장면 제목과 함께 한 번씩 화면 전체를 차지한다. 앱 화면(홈, 대화, 갤러리 캡처)은 쓰지 않는다.
2. **하루가 흐른다.** 여는 문장과 닫는 질문 사이에서 아침 → 낮 → 저녁이 흐르고, 시간대마다 4명씩 그 시간을 산다. 시청자는 12명의 같은 하루를 이어서 살아 보는 느낌을 받는다.
3. **시청자가 직접 고른다.** 중간에 한 번 시오네의 아침 선택 앞에 멈춰 세운다. 선택에 따라 하루가 달라진다는 앱의 핵심 경험을 앱 화면 없이 전달한다.
4. **빠르게 흘려보내지 않는다.** 모든 컷은 아래 2절의 머무는 시간 규칙을 지킨다.
5. **"나와 다른 하루"로 열고 "우리들의 하루"를 묻는 질문으로 닫는다.**
   - 여는 문장: **“오늘, 나와 다른 하루를 사는 사람들이 있습니다.”**
   - 가운데 질문: **“당신이라면 어떤 선택을 하시겠습니까?”** (시오네의 갈림길)
   - 닫는 질문: **“내일, 우리들의 하루는 어떻게 될까요?”**
6. **앱이 무엇인지는 질문 사이에 담는다.** 가운데 질문 뒤에 '선택에 따라 하루가 달라집니다'를 보여 준다. 닫는 질문 바로 앞의 제목 카드에서는 누가(중학교 도덕 수업) 무엇을(하루를 살아 보고 해결책을 쓴다) 하는지 한 줄로 밝힌다.
7. **QR 코드와 접속 주소는 넣지 않는다.** 시작 문구 "왜 안 갔니? / 왜 못 갔니?"도 쓰지 않는다. 마무리를 평서문 선언으로 닫지 않는다.
8. **내레이션 없이 화면 글과 소리로 전달한다.** 소리를 꺼도 이해되어야 한다.

---

## 2. 머무는 시간 규칙 (가독성)

| 규칙 | 기준 |
|---|---|
| 그림 먼저 | 컷이 바뀌면 **0.5초(15f)** 동안 그림만 보여 준 뒤 글자를 띄운다 |
| 글자 머무는 시간 | **글자 수 ÷ 8 + 1초**, 최소 **2초**. 장면 제목은 12자 이내로 해 2.5초 안에 읽히게 한다 |
| 한 컷 = 메시지 하나 | 작은 정보 줄 1개와 큰 장면 제목 1개까지만. 자막은 최대 2줄 |
| 글자 자리 고정 | 인물 컷은 늘 **왼쪽에 글, 오른쪽에 그림**. 눈이 글을 찾아 헤매지 않게 한다 |
| 전환 | 9f(0.3초) 크로스 디졸브만 쓴다. 빠른 컷·플래시·흔들림은 금지 |
| 핵심 문장 뒤 정지 | 여는 문장·가운데 질문·닫는 질문은 다 뜬 뒤 **2초 이상** 멈춘다. 이 문장들이 떠 있는 동안에는 다른 글을 띄우지 않는다 |

---

## 3. 비주얼·모션 시스템 (`video/src/theme.ts`)

| 요소 | 규격 |
|---|---|
| **바탕** | 종이 `#f4f3ef`, 잉크 `#111111`, 보조 글자 `#5c5c5c`. 여는 문장과 닫는 질문만 `#111111` 암전 바탕(처음과 끝이 짝을 이룬다) |
| **시간대 빛** | 아침은 그림 위에 차가운 푸른빛 4%, 낮은 보정 없음, 저녁은 따뜻한 호박빛 6%. 시간이 흐르는 것을 색으로도 느끼게 한다 |
| **하루 막대** | 화면 맨 위에 가는 선(2px)이 59.5초 동안 왼쪽에서 오른쪽으로 차오르고, 왼쪽 위에 `아침` · `낮` · `저녁` 표시 |
| **인물 색** | 앱 `app.js`의 `TONE`과 같다. 시오네 `#1f7f7c`, 아시프 `#2d6b63`, 루파 `#3e6399`, 호단 `#b06d12`, 라마 `#3f74a8`, 나데주 `#a86a14`, 코피 `#86552a`, 암나 `#76589f`, 누르 `#71519c`, 마리암 `#a3303d`, 그라스 `#ad2843`, 람 `#66750f` |
| **서체** | 정보 줄은 Pretendard 36px, 장면 제목·여는 문장은 Gowun Batang 84–96px |
| **모션** | 정지 컷은 3.5초 동안 102%까지 천천히 다가가기(Ken Burns), **선별 6컷은 5초 I2V 영상 클립에서 중간 3.5~4.0초 트리밍 재생(`<OffthreadVideo>`)**. 글은 줄 단위로 아래에서 떠오르기(`Rise`). 바운스·회전·네온·보라 그라데이션·이모지는 금지 |
| **안전 여백** | 상하 72px, 좌우 110px |

### 인물 컷 배치 (1920×1080)

```text
┌──────────────────────────────────────────────────────────────┐
│ 아침 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ (하루 막대)       │
│                                    ┌────────────────────────┐ │
│   파키스탄 자코바바드                │                        │ │
│   아시프, 36살                      │   세로 그림 3:4         │ │
│                                    │   810×1080 (오른쪽 꽉)  │ │
│   「오전 6시,                       │                        │ │
│    이미 38도」                      │                        │ │
│   ━━ (인물 색 띠)                   │                        │ │
│                                    └────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

- 그림은 모두 세로 3:4(900×1200)라서 잘라 쓰지 않고 오른쪽에 높이를 꽉 채워 놓는다. 얼굴과 소품이 잘리지 않는다.

---

## 4. 12명의 배치

시간대마다 4명이 서로 다른 주제를 맡도록 나눴다. 아침 장면 그림은 앱에 없으므로 아침 4명은 인물 초상화를 쓴다.

| 순서 | 시간대 | 인물 · 나이 · 사는 곳 | 장면 제목 | 주제 | 매체 | 에셋 |
|---:|---|---|---|---|---|---|
| 1 | 아침 | 아시프 · 36살 · 파키스탄 자코바바드 | 「오전 6시, 이미 38도」 | 환경 | **영상(5s→3.5s)** | `clips/01-pakistan.mp4` (`characters/pakistan.webp`) |
| 2 | 아침 | 루파 · 13살 · 방글라데시 해안 마을 | 「빈 물항아리와 발표날」 | 물 | 사진(Ken Burns) | `characters/bangladesh.webp` |
| 3 | 아침 | 마리암 · 13살 · 아프가니스탄 | 「오빠의 새 가방」 | 인권 | 사진(Ken Burns) | `characters/afghanistan.webp` |
| 4 | 아침 | 시오네 · 13살 · 투발루 바이투푸섬 | 「바닷물이 들어온 시험날」 | 환경 | **영상(5s→4.0s)** | `clips/04-tuvalu.mp4` (`characters/tuvalu.webp`) |
| — | 선택 | 시오네의 갈림길 | 「떠날까, 남을까」 / 「보충 시험과 모래주머니」 | 환경 | 사진(Ken Burns) | `scenes/tuvalu-noon-a.webp`, `tuvalu-noon-b.webp` |
| 5 | 낮 | 라마 · 14살 · 팔레스타인 가자지구 | 「급수차가 왔다」 | 물 | **영상(5s→3.5s)** | `clips/05-gaza-noon.mp4` (`scenes/gaza-noon.webp`) |
| 6 | 낮 | 코피 · 13살 · 가나 카카오 마을 | 「밭에서 만난 아마」 | 빈곤 | 사진(Ken Burns) | `scenes/ghana-noon-a.webp` |
| 7 | 낮 | 람 · 24살 · 카타르 공사장 | 「“30분만 더”」 | 인권 | 사진(Ken Burns) | `scenes/qatar-noon.webp` |
| 8 | 낮 | 호단 · 15살 · 소말리아 | 「시장에 염소를 팔까」 | 물 | **영상(5s→3.5s)** | `clips/08-somalia-noon.mp4` (`scenes/somalia-noon.webp`) |
| 9 | 저녁 | 나데주 · 15살 · 아이티 포르토프랭스 | 「두 개의 봉투」 | 빈곤 | 사진(Ken Burns) | `scenes/haiti-evening.webp` |
| 10 | 저녁 | 암나 · 14살 · 수단에서 차드로 | 「우물 줄 끝에서」 | 난민 | **영상(5s→3.5s)** | `clips/10-sudan-evening.mp4` (`scenes/sudan-evening.webp`) |
| 11 | 저녁 | 누르 · 13살 · 콕스바자르 난민캠프 | 「오빠의 어깨」 | 난민 | 사진(Ken Burns) | `scenes/rohingya-evening.webp` |
| 12 | 저녁 | 그라스 · 14살 · 콩고민주공화국 콜웨지 | 「할머니의 무덤」 | 인권 | **영상(5s→3.5s)** | `clips/12-congo-evening.mp4` (`scenes/congo-evening.webp`) |

- 마지막 장면에는 12명의 얼굴(`characters/*-face.webp`)이 모두 다시 모인다.
- 아시프(36살)와 람(24살)은 어른이다. "12명의 또래"라고 묶어 부르지 않고 "열두 사람"이라고 쓴다.

---

## 5. 콘티 (59.5초 · 1,785 frames @ 30fps)

### 한눈에 보기

| 장면 | 시간 | 프레임 | 화면 | 핵심 글 |
|---|---|---|---|---|
| **S1 여는 문장** | 0:00–0:04 | `0–120f` | 암전 | “오늘, 나와 다른 하루를 사는 사람들이 있습니다.” |
| **S2 아침** | 0:04–0:18 | `120–540f` | 아시프 · 루파 · 마리암 · 시오네 | 사는 곳 · 이름, 나이 · 「장면 제목」 |
| **S3 가운데 질문** | 0:18–0:24 | `540–720f` | 시오네의 갈림길 → 낮 A/B 화면 분할 | “당신이라면 어떤 선택을 하시겠습니까?” → 선택에 따라 하루가 달라집니다. |
| **S4 낮** | 0:24–0:38 | `720–1140f` | 라마 · 코피 · 람 · 호단 | 사는 곳 · 이름, 나이 · 「장면 제목」 |
| **S5 저녁** | 0:38–0:52 | `1140–1560f` | 나데주 · 암나 · 누르 · 그라스 | 사는 곳 · 이름, 나이 · 「장면 제목」 |
| **S6 제목 카드** | 0:52–0:56 | `1560–1680f` | 12명 얼굴 격자 + 제목 | 다른 곳의 하루 / 그들의 하루를 살아 보고, 해결책을 씁니다. |
| **S7 닫는 질문** | 0:56–0:59.5 | `1680–1785f` | 암전 | “내일, 우리들의 하루는 어떻게 될까요?” |

- 여는 문장은 "나와 다른 하루"를 사는 사람들이 있다는 사실을 알린다. 이어지는 12명의 컷이 그 사람들이다.
- 닫는 질문은 '오늘 → 내일', '나와 다른 사람들 → 우리들'로 넘어간다. 남의 하루로 보던 것을 함께 사는 우리의 내일로 묻는다. 지구촌 문제를 내 일로 받아들이는 앱의 수업 목표(3차시 해결책 쓰기)와 같은 방향이다.
- 처음과 끝은 같은 암전 바탕, 같은 자리, 같은 서체를 써서 짝을 이룬다.

### S1. 여는 문장 (`0:00–0:04` · `0–120f`)

- `0–10f`: `#111111` 암전. 멀리서 파도·바람·새벽 새소리가 겹쳐 들린다.
- `10–25f`: 가운데 왼쪽에 Gowun Batang으로 두 줄이 차례로 떠오른다: **“오늘, / 나와 다른 하루를 사는 사람들이 있습니다.”** (21자, 3.6초)
- `25–111f`: 정지(2.9초, 첫 줄부터 3.4초). 화면 위에 하루 막대가 나타나고 `아침` 표시가 켜진다.
- `111–120f`: 암전이 걷히며 첫 인물 컷으로 디졸브.

### S2. 아침 — 네 사람이 눈을 뜬다 (`0:04–0:18` · `120–540f`)

컷마다 105f(3.5초). S4·S5도 같은 구성이다.

| 컷 안 시간 | 일어나는 일 |
|---|---|
| `0–15f` | 그림(또는 영상 클립)만 보인다(0.5초). 천천히 다가가기 시작 |
| `15f` | 정보 줄(사는 곳 / 이름, 나이)이 떠오른다 |
| `21f` | 장면 제목이 떠오르고, 아래에 인물 색 띠가 가로로 펼쳐진다 |
| `21–96f` | 그대로 머문다(장면 제목 2.5초) |
| `96–105f` | 다음 컷으로 디졸브 |

- `120–225f` **아시프** 「오전 6시, 이미 38도」 · `225–330f` **루파** 「빈 물항아리와 발표날」 · `330–435f` **마리암** 「오빠의 새 가방」 · `435–540f` **시오네** 「바닷물이 들어온 시험날」
- 시간대 빛: 차가운 아침빛. 소리: 컷마다 그곳의 소리를 아주 작게 깐다(더운 바람, 물항아리, 창밖 아이들 소리, 파도).

### S3. 가운데 질문 — 당신이라면? (`0:18–0:24` · `540–720f`)

- `540–555f`: 시오네 컷이 왼쪽으로 물러나 흐려진다(시오네의 영상 클립은 4.0초 분량이 여기까지 이어진다). 물러나기와 동시에 질문이 떠오른다.
- `540f`: 큰 줄 **“당신이라면 어떤 선택을 하시겠습니까?”** (17자)
- `552f`: 갈래 A `40분을 걸어 시험을 보러 간다` / `564f`: 갈래 B `집에 남아 엄마와 짐을 옮긴다`
- `564–633f`: 정지(질문이 뜬 뒤 3.1초, 갈래 B가 뜬 뒤 2.3초).
- `633–639f`: 두 갈래가 동시에 눌리고, 화면이 가운데에서 좌우로 갈라진다(종이 넘기는 소리 하나).
- `639–720f`: 왼쪽에 낮 A 「떠날까, 남을까」(`tuvalu-noon-a`), 오른쪽에 낮 B 「보충 시험과 모래주머니」(`tuvalu-noon-b`)가 나란히 놓인다. 제목은 각 그림 아래쪽 띠 위에 얹는다. 아래 가운데 한 줄: **선택에 따라 하루가 달라집니다.** (14자, 2.7초)
- `720f`: 하루 막대 표시가 `낮`으로 바뀐다.

### S4. 낮 — 네 사람의 한낮 (`0:24–0:38` · `720–1140f`)

- S2와 같은 컷 구성, 낮빛.
- `720–825f` **라마** 「급수차가 왔다」 · `825–930f` **코피** 「밭에서 만난 아마」 · `930–1035f` **람** 「“30분만 더”」 · `1035–1140f` **호단** 「시장에 염소를 팔까」
- 소리: 물통 부딪히는 소리, 숲의 벌레 소리, 공사장의 먼 기계음, 마른 바람과 염소 소리.

### S5. 저녁 — 네 사람의 저녁 (`0:38–0:52` · `1140–1560f`)

- S2와 같은 컷 구성, 따뜻한 저녁빛. `1140f`에 하루 막대 표시가 `저녁`으로 바뀐다.
- `1140–1245f` **나데주** 「두 개의 봉투」 · `1245–1350f` **암나** 「우물 줄 끝에서」 · `1350–1455f` **누르** 「오빠의 어깨」 · `1455–1560f` **그라스** 「할머니의 무덤」
- 소리: 교실 안의 낮은 말소리, 우물 도르래, 빗소리, 저녁 바람.

### S6. 제목 카드 — 이 앱이 하는 일 (`0:52–0:56` · `1560–1680f`)

- `1560–1575f`: 종이 바탕 위쪽에 12명의 얼굴이 6×2 격자로 1f 간격을 두고 놓인다(지나온 순서대로, 테두리는 인물 색). 이름은 넣지 않는다(읽을 글을 늘리지 않기 위해).
- `1575f`: 격자 아래에 함께 떠오른다.
  - 작은 줄(Pretendard 32px, `#5c5c5c`): **중학교 도덕 · 지구촌 문제 수업**
  - 제목(Gowun Batang 96px): **다른 곳의 하루**
  - 설명(Pretendard 40px): **그들의 하루를 살아 보고, 해결책을 씁니다.** (19자, 3.5초)
- 맨 아래 작은 글(26px, `#5c5c5c`): 등장인물은 실제 자료를 바탕으로 만든 가상 인물입니다.
- 하루 막대가 끝까지 찬다.

### S7. 닫는 질문 (`0:56–0:59.5` · `1680–1785f`)

- `1680–1695f`: 제목 카드가 어두워지며 S1과 같은 `#111111` 암전으로 돌아간다.
- `1695–1710f`: S1과 같은 자리, 같은 서체로 두 줄이 떠오른다: **“내일, / 우리들의 하루는 어떻게 될까요?”** (16자, 3.0초)
- `1710–1785f`: 정지(2.5초, 첫 줄부터 3.0초)한 채 끝난다. 배경 음악은 `1695f`부터 사그라들어 마지막 프레임에서 멈춘다. 다른 글은 띄우지 않는다.

### 글 다듬기 기준

- 화면의 모든 문장은 소리 내어 읽어 자연스러운 한국어여야 한다. 주어와 서술어가 맞지 않는 문장, 번역투, 어색한 선언문("~의 하루를 살았습니다" 같은 말)은 쓰지 않는다.
- 물음표는 가운데 질문과 닫는 질문 두 곳에만 쓴다.

---

## 6. 사운드

| 트랙 | 명세 |
|---|---|
| **배경 음악** | 가사 없는 잔잔한 피아노 또는 어쿠스틱(80–95 BPM). 여는 문장 −22 dB → 본편 −16 dB → 닫는 질문에서 사그라듦 |
| **그곳의 소리** | 인물 컷마다 그 장소의 소리를 −26 dB 안팎으로 아주 작게 깐다. 하루를 대신 사는 느낌을 만드는 핵심 장치 |
| **효과음** | 선택 장면의 종이 넘기는 소리 1번, 시간대가 바뀔 때 낮은 울림 1번. 클릭·게임 효과음은 쓰지 않는다 |
| **저작권** | CC0 또는 교육용 무료 음원만 쓰고 `video/public/audio/SOURCES.md`에 출처를 적는다 |

---

## 7. 에셋 및 움직이는 영상 클립(6개 균형안)

- 앱 화면 캡처와 추가 촬영(이전 초안의 `CAP-01`~`CAP-04`)은 쓰지 않는다.
- 4절 표의 그림 14장(초상화 4장 + 장면 10장)과 얼굴 12장을 `app/dist/assets/`에서 `video/public/art/`로 복사해 쓴다.
- 제작 전에 그림 14장을 하나씩 열어 확인한다. 장면 제목과 그림 내용이 맞는지, 3:4 배치에서 얼굴·소품이 잘리지 않는지 본다.

### 7.1 움직이는 인물 영상 클립 규격 (6개 균형안)

시간대마다 **영상 2컷 + 정지(Ken Burns) 2컷**을 교차 배치해 리듬과 강약을 만든다. S3 갈림길 2컷과 S6 마무리 12명 얼굴 격자는 정지 이미지를 유지한다.

- **생성 길이**: **클립당 5초** — 실제 컷 길이(3.5초, 시오네는 4.0초)와 앞뒤 디졸브(0.3초)를 안정적으로 덮고, 시작·끝의 미세한 흔들림을 피해 가장 자연스러운 중간 **3.5~4.0초** 구간만 트리밍해 쓴다.
- **비율·해상도·오디오**: **3:4 세로**(없으면 9:16 생성 후 중앙 3:4 크롭), 24~30fps, **무음(Audio Off)** — 장소별 소리와 BGM은 Remotion에서 별도 믹싱한다.
- **기준 원본**: 저해상도 얼굴 썸네일(`-face.webp`, 200×200) 대신 `local-assets/`의 고해상도 3:4 PNG 원본을 사용한다. 생성된 MP4는 `local-assets/video/clips/`에 원본 보관하고, 경량 적용본을 `video/public/clips/`에 둔다.

| 번호 | 인물(컷) | 원본 PNG (`local-assets/` 기준) | 5초 생성 프롬프트 (영문 권장) |
|---:|---|---|---|
| 1 | **아시프** (아침 1) | `photoreal-characters/diversity-20261126/pakistan.png` | Subtle documentary 35mm film motion, 5 seconds. Static camera with very gentle slow push-in. The man slowly lowers his right hand from his forehead, blinks naturally, and takes a calm breath while looking slightly off-camera into the heat. The ends of his teal scarf sway gently in the hot dry wind. Workers in the blurred brickyard background move very slightly. Realistic skin texture, natural daylight, no distortion, no sudden movement. |
| 2 | **시오네** (아침 4) | `photoreal-characters/diversity-20261126/tuvalu.png` | Subtle documentary 35mm film motion, 5 seconds. Static camera with very slow gentle push-in. The boy blinks naturally, gives a gentle warm slight smile, and subtly adjusts his grip on the blue notebook. Tropical sea breeze softly sways the palm leaves in the background and his shirt sleeves, creating tiny gentle ripples on the rainwater puddle behind him. Natural overcast coastal daylight, realistic face consistency. |
| 3 | **라마** (낮 1) | `scene-images/diversity-20261126/gaza-noon.png` | Subtle documentary 35mm film motion, 5 seconds. Static handheld documentary camera with minimal breathing motion. The teenage girl in the headscarf looks attentively at the elderly man, blinks naturally, and gives a small thoughtful nod. The elderly man shifts his weight slightly while holding the heavy white jerrycans. The two young children beside her blink and hold her jacket sleeve gently. People in the water truck line behind move subtly, light breeze moves the fabric of her scarf. |
| 4 | **호단** (낮 4) | `scene-images/diversity-20261126/somalia-noon.png` | Subtle documentary 35mm film motion, 5 seconds. Static camera with very gentle slow push-in. The father on the left speaks calmly with a slight natural hand gesture. The girl in the center listens thoughtfully, blinking and slowly shifting her gaze from her father toward the woman on the right. The goats in the foreground subtly twitch their ears and turn their heads slightly. Dry desert breeze gently rustles their patterned shawls. |
| 5 | **암나** (저녁 2) | `scene-images/diversity-20261126/sudan-evening.png` | Subtle documentary 35mm film motion, 5 seconds. Static camera in warm late afternoon golden light. The girl holding the white jerrycan listens closely, blinking naturally and giving a quiet, empathetic slight nod while keeping her arms around the container. The older woman on the right moves her raised hands gently as she speaks softly. Warm evening breeze lightly moves the girl's purple patterned shawl and distant camp silhouettes. |
| 6 | **그라스** (저녁 4) | `scene-images/diversity-20261126/congo-evening.png` | Subtle documentary 35mm film motion, 5 seconds. Static camera with very slow gentle push-in in warm low-light interior. The kerosene lamp flame on the wooden table flickers softly, casting gentle warm light across their faces. The pastor on the left gestures calmly with his hands as he speaks. The teenage girl in the center blinks naturally, takes a quiet breath, and slowly nods while listening. The parents on the right listen steadily, distant hill lights outside the window stay still. |

---

## 8. Remotion 코드 구조 (`video/`)

```text
video/
├── TRAILER-PLAN.md
├── package.json · tsconfig.json · remotion.config.ts
├── public/
│   ├── art/                     # 초상화 4 + 장면 10 + 얼굴 12
│   └── audio/                   # 배경 음악, 장소별 소리, 효과음, SOURCES.md
└── src/
    ├── index.ts
    ├── Root.tsx                 # <Composition id="Trailer" fps={30} width={1920} height={1080} durationInFrames={1785} />
    ├── theme.ts                 # 색·서체·여백·시간대 빛·머무는 시간 상수
    ├── components/
    │   ├── RiseText.tsx         # 줄 단위 떠오르기
    │   ├── DayBar.tsx           # 하루 막대와 시간대 표시
    │   └── PersonCut.tsx        # 인물 컷 한 장(그림 + 정보 줄 + 장면 제목 + 색 띠)
    └── trailer/
        ├── people.ts            # 12명 순서·나이·장소·장면 제목·색·그림 경로 (4절 표 그대로)
        ├── Trailer.tsx          # 6개 장면 조립과 소리 배치
        └── scenes/
            ├── BlackCard.tsx    # S1·S7 공용 (암전 + 두 줄 문장)
            ├── TimeBlock.tsx    # S2·S4·S5 공용 (시간대 + 4명)
            ├── Choice.tsx       # S3 가운데 질문과 시오네 갈림길
            └── TitleCard.tsx    # S6 얼굴 격자 + 제목 + 앱 설명
```

```bash
cd video
npm start                                                       # Remotion Studio 미리보기
npx remotion render src/index.ts Trailer ../local-assets/video/trailer.mp4
```

---

## 9. 검수 기준

1. **규격**: 59.5초, `1920×1080` MP4가 정상 재생된다. 제작 코드는 `video/`에 커밋하고 MP4는 `local-assets/video/`에 둔다.
2. **인물**: 처음 보는 사람이 소리를 끄고 본 뒤 인물 최소 3명의 이름이나 사는 곳을 말할 수 있다. 12명 모두 3.5초 이상 화면을 차지한다.
3. **속도**: 모든 장면 제목이 2.5초 이상, 여는 문장·가운데 질문·닫는 질문이 다 뜬 뒤 2초 이상 머문다. 실제 MP4를 처음부터 끝까지 재생해 읽기 버거운 컷이 없는지 확인한다.
4. **전달**: 처음 보는 사람이 "중학교 도덕 수업에서 다른 곳 사람들의 하루를 살아 보고 해결책을 쓰는 앱"이라고 말할 수 있다. 영상은 "나와 다른 하루"로 시작해 "우리들의 하루"를 묻는 질문으로 끝난다.
5. **존엄**: 울거나 절망한 표정, 파괴된 장면을 강조하지 않는다. 장면 제목은 앱 대본 그대로 쓰고 새로 지어내지 않는다.
6. **결함 0건**: 글자 잘림·겹침·안전 여백 침범이 없고, 얼굴·핵심 소품이 잘리지 않는다. AI 기본 디자인 요소가 하나도 없다.
7. **안전**: 'AI로 만든 가상 인물' 안내가 들어 있고, 음원 출처를 기록한다.

---

## 10. 제작 순서

1. **(완료)** PRD 틀 변경 — 12명의 하루를 영상의 뼈대로 삼음. "나와 다른 하루"로 열고 "우리들의 하루"를 묻는 질문으로 닫는 콘티로 다시 짬(이 문서).
2. **(다음)** 그림 14장·얼굴 12장 확인과 복사, 음원 고르기.
3. Remotion 프로젝트 만들기 → `PersonCut` 한 컷을 먼저 만들어 머무는 시간 확인 → 전체 6개 장면 구현 → 1차 렌더링(`local-assets/video/trailer-v1.mp4`).
4. 실제 MP4를 재생하며 속도와 가독성 다듬기 → `trailer.mp4` 확정.
5. 과정 소개 영상 PRD(`video/PROCESS-PLAN.md`) 작성. 앱 기능 설명(AI 대화, 조사, 결과물, 갤러리)은 이 영상에서 다룬다.
