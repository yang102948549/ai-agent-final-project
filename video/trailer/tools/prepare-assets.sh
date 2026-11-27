#!/usr/bin/env bash
# local-assets/의 원본 Veo 클립과 12명 사진으로 트레일러 B안(코피) 에셋을 만든다.
# 저장소 루트에서 실행: bash video/trailer/tools/prepare-assets.sh
# 규격(TRAILER-PLAN.md 3.1절 · 7.1절):
# - 인물 영상: 3:4(720×960, 위에서 60px) 크롭 → 810×1080 lanczos · 30fps · 무음 · H.264 CRF 12 slow
# - 12명 썸네일: 900×1200 원본 → 3:4 위쪽 기준 JPG 품질 95 (600×800)
set -euo pipefail
P=video/trailer/assets
mkdir -p "$P/fonts" "$P/clips" "$P/cast"
[ -f "$P/fonts/PretendardVariable.woff2" ] || curl -sSL -o "$P/fonts/PretendardVariable.woff2" \
  https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2

VF="crop=720:960:0:60,scale=810:1080:flags=lanczos,fps=30"
enc() { ffmpeg -v error -y "$@" -an -vf "$VF" -c:v libx264 -pix_fmt yuv420p -crf 12 -preset slow -movflags +faststart; }

# S2 코피 (5.3초 + 0.3초 여유 = 5.6초, 0.5초부터)
KOFI_SRC="local-assets/video/clips/07-ghana-silent.mp4"
[ -f "$KOFI_SRC" ] || KOFI_SRC="local-assets/video/clips/07-ghana.mp4"
enc -ss 0.5 -t 5.8 -i "$KOFI_SRC" "$P/clips/07-ghana.mp4"

# S10 다른 학생들: 라마 · 암나 · 그라스 (6.0초 + 0.3초 여유 = 6.3초, 1.0초부터)
for f in 05-gaza-noon 10-sudan-evening 12-congo-evening; do
  enc -ss 1.0 -t 6.3 -i "local-assets/video/clips/$f.mp4" "$P/clips/$f.mp4"
done

# S12 시오네: 웃으며 끝나는 마지막 4.6초 + 마지막 프레임 정지 이미지
enc -sseof -4.6 -i local-assets/video/clips/04-tuvalu.mp4 "$P/clips/04-tuvalu-end.mp4"
ffmpeg -v error -y -sseof -0.05 -i "$P/clips/04-tuvalu-end.mp4" -frames:v 1 -q:v 2 "$P/clips/04-tuvalu-last.jpg"

# S3 · S13 12명 썸네일 (900×1200 → 600×800 JPG 95)
for id in tuvalu pakistan bangladesh somalia gaza haiti ghana sudan rohingya afghanistan congo qatar; do
  ffmpeg -v error -y -i "local-assets/photoreal-characters/diversity-20261126/$id.png" \
    -vf "crop=900:1200:0:0,scale=600:800:flags=lanczos" -q:v 2 "$P/cast/$id.jpg"
done

echo "B-plan clips and cast thumbnails ready"
