# 코피 클립 제작 핸드오프

상태: 생성 전. 앞 세션은 브라우저 제어 연결 오류로 생성 요청을 제출하지 못했다. 이 문서는 코피 클립 1편만 다룬다.

## 참조와 설정

- 인물: 가나의 13살 학생 코피. 수학 시험과 가족의 카카오 밭일 사이에서 고민하는 인물.
- 반드시 업로드할 첫 화면 원본: `local-assets/photoreal-characters/diversity-20261126/ghana.png` (저장소 루트 기준).
- 이미지에서 유지할 것: 얼굴, 짧은 머리, 황토색 셔츠, 검은 배낭, 가방끈을 잡은 손, 공책과 연필, 카카오 나무 배경. 얼굴 모음 이미지가 아닌 개별 원본을 사용한다.
- 기존 클립 기준: `local-assets/video/clips/04-tuvalu.mp4`의 차분한 움직임과 무대사 연출. 기존 6편은 덮어쓰지 않는다.
- 생성: Google Flow의 이미지 기반 영상. 기존 제작 기록과 같은 Veo 3.1 Fast, 세로 9:16, 8초, 720p, 무음 반환 설정을 사용한다. 실제 UI에서 지원 여부를 확인한다.
- 출력 예정: `local-assets/video/clips/07-ghana.mp4`. 이미 있으면 덮어쓰지 말고 새 버전명으로 저장한다. 원본은 Git에 넣지 않는다.

## 붙여 넣을 생성 프롬프트

```text
Use the supplied image as the first-frame and character-identity reference.

Create one continuous, photorealistic 8-second shot of Kofi, the same 13-year-old Ghanaian schoolboy in the reference. Preserve his exact facial identity, short hair, ochre school shirt, dark trousers, black backpack, notebook and pencil, and the cocoa grove setting. Keep the original composition and natural daylight as closely as possible.

He gently holds his backpack strap. His initial warm smile gradually softens into a calm, thoughtful expression with his mouth closed. He briefly shifts his gaze toward the cocoa trees beside him, then looks down at the notebook already in his hand. The gesture is small and natural, suggesting a student thinking about school and his family's farm. He stays in place. End with a quiet, steady moment suitable for editing.

Subtle breathing, a natural blink, and slight leaf movement in a light breeze. A very slow, restrained camera push-in. No cuts, no sudden camera moves, no dramatic acting. Preserve natural hands and stable objects throughout. Keep his face, backpack strap and notebook visible within a central 3:4 crop-safe area inside the vertical 9:16 frame; do not crop the face or notebook during the push-in.

Silent video. No speech, no lip-sync, no voiceover, no music. Do not add captions, readable writing, logos, or new people. Do not introduce farm tools, dangerous work, injuries, tears or distress. Do not change the child's age, clothing, face or props. Do not make him walk, harvest cocoa, carry heavy loads, or perform large hand gestures.
```

## 저장 전 확인

1. 첫 화면의 코피와 얼굴·옷·가방이 일치하는지 원본 이미지와 대조한다.
2. 8초 전체를 재생해 말하는 입 모양, 손가락·공책·연필의 변형, 갑작스러운 장면 전환이 없는지 확인한다.
3. 얼굴과 공책이 3:4 편집 화면에서도 남고, 마지막에 잠시 멈춰 편집할 여유가 있는지 확인한다.
4. 실제 길이·해상도·오디오 유무를 확인한다. 무음 설정이 적용되지 않았다면 원본을 보존하고 편집용 무음 사본을 별도로 만든다.
5. 검수 결과와 실제 파일 경로를 기존 PROMPTS.md의 `2026-11-27-kofi-clip` 항목에 보완한다. 아직 아시프 중심 콘티와 앱 녹화를 교체한 것은 아니므로, 클립 생성만으로 트레일러 반영 완료라고 기록하지 않는다.
