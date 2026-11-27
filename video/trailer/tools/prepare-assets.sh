#!/usr/bin/env bash
# local-assets/의 원본 Veo 클립으로 트레일러 인물 영상을 만든다. 저장소 루트에서 실행:
#   bash video/trailer/tools/prepare-assets.sh
# 필요: ffmpeg. 3:4(720×960, 위에서 60px)로 잘라 810×1080·30fps·무음으로 만든다(오른쪽 아래 생성기 표시도 잘려 나간다).
# 앱 화면 녹화(assets/app/)는 node video/trailer/tools/record-app.mjs로 따로 만든다.
set -euo pipefail
P=video/trailer/assets
mkdir -p "$P/fonts" "$P/clips"
[ -f "$P/fonts/PretendardVariable.woff2" ] || curl -sSL -o "$P/fonts/PretendardVariable.woff2" \
  https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2
VF="crop=720:960:0:60,scale=810:1080:flags=lanczos,fps=30"
enc() { ffmpeg -v error -y "$@" -an -vf "$VF" -c:v libx264 -pix_fmt yuv420p -crf 18 -preset slow -movflags +faststart; }
# S2 세 사람: 1.0초부터 4.9초
for f in 01-pakistan 05-gaza-noon 10-sudan-evening; do
  enc -ss 1.0 -t 4.9 -i "local-assets/video/clips/$f.mp4" "$P/clips/$f.mp4"
done
# S8 시오네: 웃으며 끝나는 마지막 4.6초
enc -sseof -4.6 -i local-assets/video/clips/04-tuvalu.mp4 "$P/clips/04-tuvalu-end.mp4"
echo "clips ready"
