# 캐릭터 그림 설계서

이미지 생성 도구로 12명의 캐릭터 그림을 만들 때 쓰는 설계서입니다. 캐릭터마다 한국어 설명과 바로 붙여 넣을 수 있는 영어 프롬프트가 있습니다. 대부분의 이미지 도구는 영어 프롬프트를 더 정확히 따릅니다.

## 1. 모든 그림에 공통으로 지킬 것

**파일**
- 이름: `dist/assets/characters/<id>.webp` (예: `tuvalu.webp`)
- 비율: 세로 3:4, 900×1200px 이상
- 앱은 그림을 세로 카드(3:4), 가로 카드(4:3), 작은 정사각형 썸네일로 잘라 씁니다. **얼굴과 상반신이 그림 가운데 위쪽**에 오게 해 주세요.

**화풍** (12장이 한 세트로 보이도록 같은 문장을 매번 붙입니다)
- 부드러운 반사실적 디지털 일러스트, 따뜻한 자연광, 차분한 색감
- 가슴 위 또는 허리 위까지 나오는 인물 초상, 배경에 그 사람의 장면이 보이게
- 인물은 정면이나 약간 비스듬히 서서 보는 사람과 눈을 마주침

**존엄하게 그리기**
- 이 그림은 "불쌍한 사람"이 아니라 **바람과 힘을 가진 또래**를 보여 줘야 합니다. 울거나 절망한 얼굴, 더러움이나 상처를 강조한 모습, 파괴된 건물 잔해를 크게 그리지 않습니다.
- 표정은 차분함, 생각에 잠김, 단단함, 조심스러운 희망 가운데 하나로 합니다.
- 옷차림은 그 지역에서 흔한 일상복입니다. 관광 엽서식 전통 의상이나 고정관념(사막=낙타, 아프리카=맨몸 등)을 피합니다.

**넣지 않을 것**
- 글자, 로고, 국기, 기관 상징(유엔, 앰네스티 등), 실존 인물의 얼굴
- 무기, 피, 군인, 폭발
- 아동이 위험한 노동을 하는 모습(칼질, 무거운 짐 나르기)

**공통 프롬프트 꼬리말** (모든 영어 프롬프트 끝에 붙임)

```
Soft semi-realistic digital illustration, warm natural light, muted earthy palette with gentle color, painterly texture, waist-up portrait centered in upper half of frame, subject looks calmly toward the viewer, dignified and hopeful mood, 3:4 vertical composition, no text, no logos, no flags, no watermark.
```

**공통 제외어** (도구에 negative prompt 칸이 있을 때)

```
text, letters, logo, flag, watermark, weapon, blood, injury, crying, tears, rubble, soldiers, explosion, exaggerated poverty, dirty face, caricature, stereotype costume, extra fingers, distorted face
```

**주제별 포인트 색** (앱의 주제 색과 맞추면 화면이 정돈되어 보입니다. 옷이나 소품 하나에만 살짝)

| 주제 | 색 | 해당 캐릭터 |
|---|---|---|
| 환경 | 청록 #0f766e | 시오네, 아시프 |
| 물 | 파랑 #1d4ed8 | 루파, 호단, 라마 |
| 빈곤 | 호박색 #b45309 | 나데주, 코피 |
| 난민 | 보라 #6d28d9 | 암나, 누르 |
| 인권 | 장미색 #be123c | 마리암, 그라스, 람 |

---

## 2. 캐릭터별 설계

### 01. 시오네 — 투발루 바이투푸섬 · `tuvalu.webp`

- **누구:** 13살 남학생. 폴리네시아계 외모, 짧은 곱슬머리, 햇볕에 그을린 피부.
- **옷:** 밝은 색 반팔 교복 셔츠와 반바지, 고무 슬리퍼. 목에 작은 조개 목걸이.
- **배경:** 야자수와 빵나무가 있는 낮은 산호섬. 모랫길 곳곳에 바닷물이 고여 있고 뒤로 청록빛 석호가 보입니다. 집은 낮은 단층집.
- **표정·자세:** 시험지가 든 공책을 옆구리에 끼고, 물 고인 길 앞에서 차분하지만 고민하는 얼굴.
- **포인트 색:** 청록 #0f766e (셔츠 줄무늬)

```
A 13-year-old Polynesian boy from Vaitupu, Tuvalu, short curly black hair, sun-tanned skin, wearing a light short-sleeved school shirt with a thin teal stripe and shorts, rubber flip-flops, small shell necklace, holding a school notebook under his arm. He stands on a sandy road where seawater puddles have pooled after high tide, low coral atoll with coconut palms and a breadfruit tree, turquoise lagoon behind, simple low houses. Calm but thoughtful expression.
```

### 02. 아시프 — 파키스탄 자코바바드 · `pakistan.webp`

- **누구:** 36살 남성 일용직 노동자, 열 살 딸의 아빠. 남아시아계, 짧게 다듬은 수염.
- **옷:** 땀에 젖은 연한 색 면 살와르 카미즈, 햇빛을 가리려고 머리에 두른 면 스카프.
- **배경:** 뜨거운 아지랑이가 피어오르는 벽돌 건축 현장, 흙먼지, 강한 아침 햇살. 한쪽에 물병.
- **표정·자세:** 이마의 땀을 손등으로 닦으며 하늘을 올려다보는, 지쳤지만 책임감 있는 얼굴.
- **포인트 색:** 청록 #0f766e (머리에 두른 스카프)

```
A 36-year-old Pakistani man from Jacobabad, day laborer and father, short trimmed beard, warm brown skin, wearing a light-colored cotton shalwar kameez damp with sweat, a teal cotton scarf wrapped loosely over his head against the sun, a plastic water bottle in one hand. Background: brick construction site in intense heat haze, dusty ground, stacked bricks, harsh early-morning sunlight. He wipes his brow with the back of his hand and glances at the sky, tired but determined.
```

### 03. 루파 — 방글라데시 해안 마을 · `bangladesh.webp`

- **누구:** 13살 여학생. 벵골계, 검은 머리를 하나로 땋음.
- **옷:** 학교 교복 같은 살와르 카미즈와 어깨에 두른 오르나(긴 스카프).
- **배경:** 벵골만 해안 마을. 짠물이 든 연못, 새우 양식장, 멀리 맹그로브 숲. 이른 새벽의 푸른빛.
- **표정·자세:** 알루미늄 물동이(콜시)를 옆구리에 끼고, 다른 손에는 학교 공책. 결심한 듯 단단한 눈빛.
- **포인트 색:** 파랑 #1d4ed8 (오르나)

```
A 13-year-old Bangladeshi girl from a coastal village near the Bay of Bengal, long black hair in a single braid, wearing a simple school-style salwar kameez with a blue orna scarf over her shoulders. She holds a dented aluminum water pitcher (kolshi) on her hip and a school notebook in her other hand. Background: early dawn, a brackish pond, shrimp ponds and a line of mangrove trees in the distance, soft blue morning light. Steady, determined eyes.
```

### 04. 호단 — 소말리아 농목축 지역 · `somalia.webp`

- **누구:** 15살 여학생. 소말리아계, 가족의 염소를 돌봄.
- **옷:** 밝은 색 무늬 히잡(가르바사르)과 긴 원피스(디라크).
- **배경:** 붉은 흙이 갈라진 메마른 땅, 아카시아 나무, 몇 마리의 염소, 노란 물통(제리캔).
- **표정·자세:** 염소 한 마리 곁에 무릎을 굽히고 앉아 하늘을 보는, 비를 기다리는 침착한 얼굴.
- **포인트 색:** 파랑 #1d4ed8 (히잡 무늬)

```
A 15-year-old Somali girl from a pastoral farming area, wearing a bright patterned headscarf (garbasaar) with blue accents and a long flowing dress (dirac). She crouches beside a goat, one hand resting on its back, looking up at a cloudless sky as if waiting for rain. Background: dry cracked red earth, acacia trees, a few goats, a yellow plastic jerrycan nearby, wide pale sky. Calm, patient expression.
```

### 05. 라마 — 팔레스타인 가자지구 · `gaza.webp`

- **누구:** 14살 여학생. 동생 둘을 돌보는 큰언니.
- **옷:** 단정한 히잡, 편한 후드 티셔츠나 긴 카디건.
- **배경:** 비닐과 천으로 된 피란 텐트가 줄지어 선 모래 땅, 텐트 앞에 물통. 잔해나 폭격 장면은 넣지 않습니다.
- **표정·자세:** 물이 반쯤 든 플라스틱 물통을 두 손으로 들고, 어깨너머로 동생들을 살피는 듯한 책임감 있는 얼굴. 동생은 배경에 흐릿하게.
- **포인트 색:** 파랑 #1d4ed8 (물통)

```
A 14-year-old Palestinian girl from Gaza, eldest sister caring for two younger siblings, wearing a neat hijab and a simple hoodie, holding a half-full blue plastic water container with both hands. Background: rows of white and grey displacement tents made of tarp and fabric on sandy ground, water containers beside a tent, two small children softly blurred in the background. No rubble, no destruction. Responsible, gentle, resilient expression.
```

### 06. 나데주 — 아이티 포르토프랭스 · `haiti.webp`

- **누구:** 15살 여학생. 무장 폭력을 피해 다른 동네 학교 교실에서 지냄.
- **옷:** 깔끔한 블라우스, 리본으로 묶은 땋은 머리.
- **배경:** 교실을 임시 거처로 쓰는 모습. 칠판 아래 깔린 매트와 가방, 창으로 들어오는 햇빛. 칠판에 글씨는 넣지 않습니다.
- **표정·자세:** 연필과 공책을 가슴에 꼭 안고 창가에 선, 배우고 싶은 마음이 보이는 얼굴.
- **포인트 색:** 호박색 #b45309 (머리 리본)

```
A 15-year-old Haitian girl from Port-au-Prince, dark skin, braided hair tied with amber ribbons, wearing a neat short-sleeved blouse. She hugs a notebook and pencil to her chest and stands by a window. Background: a school classroom being used as a temporary shelter, sleeping mats and bags on the floor below a blank chalkboard, warm sunlight through the window. Hopeful, eager-to-learn expression.
```

### 07. 코피 — 가나 카카오 마을 · `ghana.webp`

- **누구:** 13살 남학생. 카카오 농가의 아들, 엔지니어가 꿈.
- **옷:** 가나 공립학교 교복 느낌의 갈색 반팔 셔츠와 반바지, 책가방.
- **배경:** 노랗고 주황빛인 카카오 열매가 달린 나무 그늘, 열대 숲 농장. **칼이나 무거운 자루는 그리지 않습니다.**
- **표정·자세:** 책가방 끈을 잡고 카카오 나무 옆에 서서, 밭과 학교 사이에서 고민하는 듯 살짝 웃는 얼굴.
- **포인트 색:** 호박색 #b45309 (교복)

```
A 13-year-old Ghanaian boy from a cocoa-farming village in Western North Ghana, short hair, wearing a brown short-sleeved school uniform shirt and shorts, holding the straps of his school backpack. He stands in the shade of cocoa trees heavy with yellow and orange cocoa pods, lush tropical farm behind him, dappled sunlight. No machete, no sacks, no work tools. A small thoughtful smile, dreaming of becoming an engineer.
```

### 08. 암나 — 수단에서 차드로 · `sudan.webp`

- **누구:** 14살 여학생. 수단에서 차드 동부로 피란 옴. 의사가 꿈.
- **옷:** 밝은 색 수단식 머릿수건(타르하)과 긴 옷.
- **배경:** 차드 동부의 모래 섞인 땅, 비닐을 덮은 임시 대피소, 멀리 아이들이 모인 학습 천막.
- **표정·자세:** 수단에서 가져온 낡은 공책을 두 손으로 소중하게 들고 있는, 단단하고 희망 있는 얼굴.
- **포인트 색:** 보라 #6d28d9 (머릿수건 무늬)

```
A 14-year-old Sudanese girl who fled to eastern Chad, wearing a bright Sudanese headscarf (tarha) with violet patterns and a long modest dress. She holds a worn school notebook she carried from home with both hands close to her chest. Background: sandy ground of a refugee settlement in eastern Chad, shelters covered with plastic sheeting, a learning tent with children in the far distance, wide warm sky. Steady, quietly hopeful expression; she dreams of becoming a doctor.
```

### 09. 누르 — 방글라데시 콕스바자르 로힝야 난민캠프 · `rohingya.webp`

- **누구:** 13살 여학생. 로힝야, 선생님이 꿈.
- **옷:** 머리에 두른 스카프와 긴 옷. 두 볼에 연한 노란빛 타나카(나무껍질 가루)를 바름.
- **배경:** 언덕을 따라 빽빽이 들어선 대나무와 방수포 대피소, 흙 계단, 멀리 학습센터 지붕.
- **표정·자세:** 교과서 두 권을 품에 안고 앞을 보는, 꿈을 놓지 않은 눈빛.
- **포인트 색:** 보라 #6d28d9 (스카프)

```
A 13-year-old Rohingya girl in a refugee camp in Cox's Bazar, Bangladesh, wearing a violet headscarf and a long modest dress, light yellow thanaka paste on both cheeks. She holds two textbooks to her chest. Background: dense hillside shelters made of bamboo and tarpaulin, earthen steps, the roof of a small learning center in the distance, soft overcast light. Determined eyes, she dreams of becoming a teacher.
```

### 10. 마리암 — 아프가니스탄 · `afghanistan.webp`

- **누구:** 13살 여학생. 6학년을 마쳤지만 중학교에 갈 수 없음. 의사가 꿈.
- **옷:** 머리를 덮는 단정한 스카프, 긴 옷. (부르카 같은 고정관념 이미지는 피합니다.)
- **배경:** 흙벽돌 집 안, 창문으로 들어오는 아침 햇살, 바닥의 카펫. 창밖 멀리 학교로 가는 길.
- **표정·자세:** 오빠의 낡은 과학 교과서를 무릎에 펼친 채 창밖을 바라보는, 조용하지만 꺾이지 않은 얼굴.
- **포인트 색:** 장미색 #be123c (스카프)

```
A 13-year-old Afghan girl at home, wearing a neat deep rose headscarf covering her hair and a long modest dress. She sits by a window in a mud-brick house with a patterned carpet, an old science textbook open on her lap, looking out toward a distant road that leads to a school. Soft morning sunlight. Quiet, resilient expression; she dreams of becoming a doctor.
```

### 11. 그라스 — 콩고민주공화국 콜웨지 · `congo.webp`

- **누구:** 14살 여학생. 광산 확장으로 집을 떠나야 할 처지.
- **옷:** 밝은 색 왁스 프린트 천(파뉴)으로 만든 옷.
- **배경:** 붉은 흙, 할머니가 심은 망고나무, 벽에 빨간 X 표시가 칠해진 단층집. 멀리 노천 광산의 계단식 비탈.
- **표정·자세:** 망고 씨앗 하나를 손바닥에 쥐고 집을 돌아보는, 담담하고 단호한 얼굴.
- **포인트 색:** 장미색 #be123c (왁스 프린트 무늬)

```
A 14-year-old Congolese girl from near Kolwezi, Democratic Republic of the Congo, wearing a dress made of bright wax-print fabric with rose-red patterns, hair in neat braids. She holds a mango seed in her palm and looks back at her home: a single-story house with a red X painted on its wall, a large mango tree beside it, red earth ground, terraced slopes of an open-pit mine in the distance. Composed, resolute expression.
```

### 12. 람 — 카타르의 네팔 출신 이주노동자 · `qatar.webp`

- **누구:** 24살 남성. 네팔에서 온 건설 노동자, 동생 등록금을 보냄.
- **옷:** 형광 안전조끼, 안전모(손에 듦), 긴팔 작업복.
- **배경:** 건설 중인 고층 빌딩과 크레인, 강한 사막 햇살, 그늘이 거의 없는 공사장.
- **표정·자세:** 휴대전화 화면(가족의 메시지)을 내려다보다 고개를 든, 지쳤지만 다정한 얼굴. 화면 글자는 보이지 않게.
- **포인트 색:** 장미색 #be123c (작업복 소매나 손목 끈)

```
A 24-year-old Nepali migrant construction worker in Qatar, short black hair, wearing a long-sleeved work shirt with rose-red cuffs and a fluorescent safety vest, holding a hard hat in one hand and a phone in the other (screen not visible). Background: skyscrapers under construction, tall cranes, harsh desert sunlight, a construction site with almost no shade. He has just looked up from a message from his family, tired but warm expression.
```

---

## 3. 만든 뒤 점검

- [ ] 12장 모두 같은 화풍과 밝기로 보이는가
- [ ] 얼굴이 그림 위쪽 가운데에 있어 정사각형으로 잘라도 얼굴이 보이는가
- [ ] 글자, 국기, 로고, 무기가 들어가지 않았는가
- [ ] 슬픔이나 가난을 과장하지 않고 존엄하게 그렸는가
- [ ] 옷차림이 고정관념이 아닌 그 지역의 일상복인가 (확신이 없으면 그 지역 출신 사람이나 원문 자료 사진과 비교)
- [ ] 코피(가나) 그림에 칼이나 무거운 짐 같은 아동 노동 장면이 없는가
- [ ] `.webp`, 3:4, `<id>` 파일 이름으로 `dist/assets/characters/`에 넣었는가

---

## 4. 2026-11-25 사진풍으로 바꾼 기록

- **화풍 변경** — 12장을 수채화풍 일러스트에서 사진풍(photorealistic)으로 다시 만들었다. 인물·옷·소품·배경 구도는 위 설계를 그대로 따랐고, 사용자가 사진풍으로 확정했다. 1절의 "부드러운 반사실적 디지털 일러스트" 꼬리말은 예전 세트의 기준으로 남겨 둔다.
- **가상 인물 표시** — 사진처럼 보여 실존 인물로 오해할 수 있다. 그래서 바닥글을 "캐릭터 이미지는 AI로 만든 가상 인물입니다(실제 사진이 아님)"로 바꾸고, 신문 기사 서식의 사진 설명에도 "이미지는 AI로 만들었다(실제 사진이 아님)"를 넣었다. 예전 그림의 ✦ 표시는 새 그림에 없다.
- **얼굴 그림** — 새로 받은 `-face.webp`는 전신을 줄인 것이라 작은 원에서 얼굴이 보이지 않았다. `python tools/make-faces.py`로 전신 그림의 얼굴 위치 표를 써서 360×360으로 다시 잘랐다. 그림을 바꾸면 표의 좌표를 다시 잰다.
- **콩고 빨간 X** — 새 그림에 벽의 X가 빠져 첫 장면 「벽에 그려진 빨간 X」와 맞지 않았다. `python tools/paint-congo-x.py <원본> <저장>`으로 문 왼쪽 회벽에 페인트 X를 칠했다.
- **용량** — 전신 12장을 WebP 품질 78로 다시 저장했다(2.35MB → 약 1.15MB). 화면 비교로 차이를 확인하지 못했다.
- **캐시** — 같은 파일 이름이라 학교 사이트 캐시에 예전 그림이 남을 수 있다. `app.js`의 `ART_V`를 올리면 주소가 바뀐다.

### 배경 재검토 (설계서 2절과 대조)

| 인물 | 결과 |
|---|---|
| 시오네 · 투발루 | 맞음. 빵나무, 물 고인 모랫길, 석호, 낮은 집. 반바지 대신 긴 바지(배경 외 차이) |
| 아시프 · 파키스탄 | 맞음. 벽돌 공사장, 물병, 청록 스카프 |
| 루파 · 방글라데시 | 대체로 맞음. 새우 양식 연못과 맹그로브는 있으나 설계의 "이른 새벽 푸른빛"이 아니라 한낮의 밝은 빛 |
| 호단 · 소말리아 | 맞음. 갈라진 붉은 땅, 아카시아, 염소, 노란 제리캔 |
| 라마 · 가자 | 맞음. 텐트 줄, 물통, 뒤의 동생들. 멀리 회색 건물이 있으나 확대해 보아도 잔해·폭격 흔적은 보이지 않음 |
| 나데주 · 아이티 | 맞음. 교실 매트와 가방, 창. 칠판에 지운 자국만 있고 읽히는 글씨 없음 |
| 코피 · 가나 | 맞음. 카카오 나무, 칼·자루 없음 |
| 암나 · 수단 | 맞음. 비닐 대피소, 멀리 아이들이 모인 학습 천막 |
| 누르 · 로힝야 | 맞음. 대나무·방수포 대피소, 흙 계단, 타나카. 예전 그림의 잘못된 영어 글자가 사라짐 |
| 마리암 · 아프가니스탄 | 맞음. 흙벽 집, 창밖 길, 카펫. 펼친 책에 읽히지 않는 글줄 |
| 그라스 · 콩고 | **X 누락 → 칠해서 고침.** 망고나무, 붉은 흙, 노천 광산 |
| 람 · 카타르 | 맞음. 고층 건물, 크레인, 휴대전화 화면 안 보임 |

---

## 5. 2026-11-26 외모·복장 차별화 및 35mm 다큐멘터리 실사 질감 재제작

- **배경** — 1차 사진풍 변환본은 2D 삽화를 그대로 참조(`image-to-image`)해 만들다 보니 ① 여학생 5명(남성 아시프 포함 6명)이 머릿수건/히잡을 착용해 실루엣이 겹치고, ② 흑인 5명(소말리아·수단·아이티·가나·콩고)과 남아시아 여학생(방글라데시·로힝야)의 이목구비·정면 무표정이 비슷하며, ③ 람(카타르)·시오네(투발루)·루파(방글라데시) 등에 일러스트 특유의 매끈한 피부와 회화적 배경 느낌이 남아 있었다.
- **복장·헤어 차별화(머릿수건 6명 → 히잡 3명)**:
  - **마리암(아프가니스탄)**: 실내(집 창가) 장면이므로 붉은 숄을 머리에서 내려 어깨에 두르고 검은 반묶음 웨이브 머리카락을 드러냄.
  - **암나(수단)**: 보라색 타르하를 어깨에 두르고 자연스러운 짧은 아프로 퍼프 번(양쪽 묶음 머리)과 이마·귀를 드러냄.
  - **아시프(파키스탄)**: 청록 스카프를 머리에서 내려 목에 걸고 땀에 젖은 검은 머리카락을 드러냄.
- **인종·권역별 골격·표정 차별화**:
  - **그라스(콩고)**: 짧은 자연 아프로 헤어(가르마), 또렷한 광대와 턱선, 어깨너머로 돌아보는 단호한 표정. 집 왼쪽 회벽에 빨간 X(`tools/paint-congo-x.py`, `cx=135, cy=530, r=36`).
  - **나데주(아이티)**: 둥근 볼과 밝은 미소, 호박색 리본으로 묶은 양갈래 땋은 머리.
  - **호단(소말리아)**: 동아프리카 특유의 갸름한 얼굴형과 높은 콧대, 파랑·황금 무늬 가르바사르.
  - **코피(가나)**: 짧은 페이드 컷과 환하게 웃는 소년 인상, 한 손에 가방 끈과 다른 손에 톱니바퀴 스케치 공책.
  - **누르(로힝야)**: 동남아/미얀마 접경의 부드러운 턱선과 눈매, 양 볼 타나카 분장, 한쪽 팔에 책을 낀 자세.
- **35mm 다큐멘터리 사진 질감**: 람·시오네·루파·라마를 포함한 12명 모두 실제 피부 모공·직물 주름·광학 렌즈 배경 흐림(심도)이 살아 있는 35mm 다큐멘터리 사진풍으로 생성하고 `tools/make-faces.py` 좌표 표를 갱신해 360×360 얼굴 썸네일 12장을 다시 잘랐다.
