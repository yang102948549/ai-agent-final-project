# 제출 영상 (`video/`)

> **폴더 이름 주의**: 패들렛 과제안내의 공식 경로는 `videos/`가 아니라 단수 **`video/`**다. 영상 2편의 제작 코드가 `video/`에 함께 커밋되어 있어야 감점(영상 하나당 −5점)을 피할 수 있다.

## 제출할 영상 2편

| 영상 | 분량 | 형식 | 평가 핵심 (패들렛 채점기준) | 패들렛 업로드 위치 |
|---|---:|---|---|---|
| **트레일러 영상** (`Trailer`) | 30~60초 | MP4 (1920×1080, 30fps) | 누구에게 무엇이 좋은 앱인지 1분 안에 전달 (15점) | 글 첨부 또는 댓글 (택 1) |
| **만든 과정 소개 영상** (`Process`) | 2~3분 | MP4 (1920×1080, 30fps) | 고치기 전/후 비교 3번 이상, 바꾼 이유, AI에게 실제로 시킨 말 (25점) | 나머지 1편을 댓글/글에 분할 업로드 |

두 편 모두 Claude 또는 Codex로 코드를 작성해 제작한다(수업 시연 도구: **Remotion**).

## `video/` 폴더 구성 계획

### Git에 커밋하는 파일 (`video/`)

```text
video/
├── README.md                 # 폴더 구성, 미리보기·렌더링 명령 안내
├── TRAILER-PLAN.md           # 트레일러 영상(30~60초) 기획·스토리보드 초안
├── PROCESS-PLAN.md           # 과정 소개 영상(2~3분) 기획·스토리보드 (추후 작성)
├── package.json              # Remotion 의존성 및 render:trailer / render:process 스크립트
├── package-lock.json         # 의존성 잠금 파일
├── tsconfig.json             # TypeScript 설정
├── remotion.config.ts        # Remotion 번들·출력 설정
├── src/
│   ├── index.ts              # Remotion 엔트리포인트
│   ├── Root.tsx              # <Composition id="Trailer" /> · <Composition id="Process" /> 등록
│   ├── theme.ts              # 앱·발표 슬라이드와 통일된 색·서체·모션 토큰
│   ├── components/           # 공통 자막, 텍스트 떠오르기, 기기 프레임, 전/후 비교 컴포넌트
│   ├── trailer/              # 트레일러 씬 컴포넌트와 대본·데이터
│   └── process/              # 과정 소개 영상 씬 컴포넌트와 전/후 비교·프롬프트 데이터
└── public/                   # Remotion 렌더링에 직접 쓰는 선별된 경량 정적 에셋
    ├── screenshots/          # 앱 화면 선별 PNG (홈, 분기 장면, 돌아보기, 결과물, 갤러리 등)
    ├── art/                  # 실사 캐릭터·장면 WebP (필요한 대표 컷만 복사)
    ├── qr/                   # 배포 주소(onischool.net/anotherday/) QR 이미지
    └── audio/                # 라이선스 확인된 BGM·효과음(사용 시 출처 기록)
```

### Git에서 제외하고 `local-assets/`에 보관하는 파일

- `video/node_modules/` — `.gitignore`에 의해 자동 제외
- `local-assets/video/trailer.mp4`, `local-assets/video/process.mp4` — 최종 완성 MP4 및 테스트 렌더링 중간 파일 (용량 초과 방지를 위해 Git 제외, 직접 재생 검수 후 패들렛에 업로드)
- `local-assets/screenshots/`, `local-assets/conversations/` — 고해상도 원본 캡처 전체 보관소

완성 후 두 편의 재생·다운로드 링크와 패들렛 제출 기록을 루트 [README.md](../README.md)에도 남긴다.
