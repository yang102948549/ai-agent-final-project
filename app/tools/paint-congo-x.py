# 콩고 그라스 그림(congo.webp)의 집 벽에 빨간 페인트 X 표시를 칠한다.
# 첫 장면 「벽에 그려진 빨간 X」와 그림 설계서(design/characters.md)의 배경에 맞추기 위한 편집이다.
# 사진풍으로 다시 만든 그림에 X가 빠져 있어, 문 왼쪽의 회벽에 붓으로 칠한 듯한 X를 얹는다.
# 사용: python tools/paint-congo-x.py <원본 congo.webp> <저장할 congo.webp>
import random
import sys

from PIL import Image, ImageChops, ImageDraw, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
img = Image.open(src).convert('RGB')
W, H = img.size
random.seed(7)

# 붓 자국 마스크: 두 획을 여러 겹의 조금씩 어긋난 선으로 그려 가장자리를 거칠게 만든다.
mask = Image.new('L', (W, H), 0)
d = ImageDraw.Draw(mask)
cx, cy, r = 135, 530, 36
strokes = [((cx - r, cy - r - 2), (cx + r, cy + r + 4)), ((cx + r + 2, cy - r), (cx - r - 3, cy + r + 2))]
for (x0, y0), (x1, y1) in strokes:
    for _ in range(14):
        j = lambda: random.uniform(-2.2, 2.2)
        d.line((x0 + j(), y0 + j(), x1 + j(), y1 + j()), fill=random.randint(150, 235), width=random.randint(7, 11))
    # 획 끝에서 흘러내린 페인트 한두 줄기
    for ex, ey in ((x1, y1),):
        for _ in range(1):
            dx = random.uniform(-6, 6)
            d.line((ex + dx, ey, ex + dx + random.uniform(-1, 1), ey + random.uniform(6, 16)), fill=110, width=2)
mask = mask.filter(ImageFilter.GaussianBlur(1.1))

# 회벽 질감이 비치도록 곱하기로 칠한다(색은 바랜 붉은 페인트).
paint = Image.new('RGB', (W, H), (178, 28, 30))
multiplied = ImageChops.multiply(img, paint)
lifted = Image.blend(multiplied, paint, 0.35)   # 너무 어둡지 않게 페인트 색을 조금 섞는다
out = Image.composite(lifted, img, mask)
out.save(dst, 'WEBP', quality=90, method=6)
print(f'칠함: 가운데 ({cx},{cy}), 반지름 {r}px → {dst}')
