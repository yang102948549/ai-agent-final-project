# 전신 그림(<id>.webp, 900×1205)에서 얼굴 부분을 정사각형으로 잘라 얼굴 그림(<id>-face.webp, 360×360)을 만든다.
# 앱의 작은 원(휴대폰 장면 머리말, 캐릭터 뽑기 칸, 갤러리 카드)에 얼굴이 크게 보이도록 머리와 목까지만 담는다.
# 사용: python tools/make-faces.py [인물 id ...]   (기본은 열두 명 모두)
#
# 얼굴 위치는 그림을 직접 보고 잰 값이다(가운데 x, 가운데 y, 얼굴 폭, 단위 px).
# 이 PC의 OpenCV 5에는 예전 얼굴 검출기(Haar)가 없고, 새 검출기는 모델 파일을 따로 받아야 해서 표로 관리한다.
# 그림을 바꾸면 이 표를 다시 재고, 만든 얼굴 그림을 열어 확인한다.
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / 'dist' / 'assets' / 'characters'
FACES = {
    'tuvalu': (430, 280, 165),
    'pakistan': (490, 290, 165),
    'bangladesh': (484, 275, 150),
    'somalia': (450, 325, 150),
    'gaza': (457, 325, 165),
    'haiti': (455, 330, 215),
    'ghana': (455, 290, 165),
    'sudan': (464, 305, 150),
    'rohingya': (455, 300, 180),
    'afghanistan': (518, 245, 135),
    'congo': (470, 400, 170),
    'qatar': (464, 340, 175),
}
SIZE = 360
SCALE = 2.2    # 잘라 낼 정사각형 한 변 = 얼굴 폭 × SCALE
DROP = 0.12    # 얼굴 가운데보다 조금 아래를 중심으로(목과 어깨선이 살짝 보이게)


def main(ids):
    for cid in ids:
        img = Image.open(ROOT / f'{cid}.webp').convert('RGB')
        cx, cy, w = FACES[cid]
        side = int(w * SCALE)
        cy += w * DROP
        left = int(max(0, min(img.width - side, cx - side / 2)))
        top = int(max(0, min(img.height - side, cy - side / 2)))
        out = img.crop((left, top, left + side, top + side)).resize((SIZE, SIZE), Image.LANCZOS)
        out.save(ROOT / f'{cid}-face.webp', 'WEBP', quality=88, method=6)
        print(f'{cid}: ({left},{top}) 한 변 {side}px → {SIZE}×{SIZE}')


if __name__ == '__main__':
    main(sys.argv[1:] or list(FACES))
