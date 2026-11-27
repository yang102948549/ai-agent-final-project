#!/usr/bin/env bash
# local-assets/의 원본(고해상도 PNG, Veo 클립)으로 트레일러 에셋을 만든다. 저장소 루트에서 실행:
#   bash video/trailer/tools/prepare-assets.sh
# 필요: ffmpeg, python(Pillow). 클립은 1.0초부터 5초를 잘라 3:4(720×960, 위에서 60px)로 자르고 810×1080·30fps·무음으로 만든다.
set -euo pipefail
P=video/trailer/assets
mkdir -p "$P/fonts" "$P/art" "$P/faces" "$P/clips"
[ -f "$P/fonts/PretendardVariable.woff2" ] || curl -sSL -o "$P/fonts/PretendardVariable.woff2" \
  https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2
python -I - <<'PY'
from PIL import Image, ImageOps
R = 'local-assets/'; P = 'video/trailer/assets/'
art = {
  'bangladesh': 'photoreal-characters/diversity-20261126/bangladesh.png',
  'afghanistan': 'photoreal-characters/diversity-20261126/afghanistan.png',
  'ghana-noon-a': 'scene-images/diversity-20261126/ghana-noon-a.png',
  'qatar-noon': 'scene-images/diversity-20261126/qatar-noon.png',
  'haiti-evening': 'scene-images/diversity-20261126/haiti-evening.png',
  'rohingya-evening': 'scene-images/diversity-20261126/rohingya-evening.png',
  'tuvalu-noon-a': 'scene-images/diversity-20261126/tuvalu-noon-a.png',
  'tuvalu-noon-b': 'scene-images/diversity-20261126/tuvalu-noon-b.png',
}
for k, v in art.items():
    ImageOps.fit(Image.open(R + v).convert('RGB'), (900, 1200), centering=(0.5, 0.0)).save(P + 'art/' + k + '.jpg', quality=88)
for c in 'pakistan bangladesh afghanistan tuvalu gaza ghana qatar somalia haiti sudan rohingya congo'.split():
    Image.open('app/dist/assets/characters/' + c + '-face.webp').convert('RGB').save(P + 'faces/' + c + '.jpg', quality=90)
PY
for f in 01-pakistan 04-tuvalu 05-gaza-noon 08-somalia-noon 10-sudan-evening 12-congo-evening; do
  ffmpeg -v error -y -ss 1.0 -t 5.0 -i "local-assets/video/clips/$f.mp4" -an \
    -vf "crop=720:960:0:60,scale=810:1080:flags=lanczos,fps=30" \
    -c:v libx264 -pix_fmt yuv420p -crf 20 -preset slow -movflags +faststart "$P/clips/$f.mp4"
done
ffmpeg -v error -y -sseof -0.1 -i "$P/clips/04-tuvalu.mp4" -frames:v 1 -q:v 3 "$P/art/tuvalu-hold.jpg"
echo "assets ready"
