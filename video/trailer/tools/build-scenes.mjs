// 트레일러 B안(코피, 82.7초 · 2,481f @ 30fps) 장면 파일 12개를 콘티 데이터로 만든다.
// 콘티: video/TRAILER-PLAN-KOFI.md · 공통 규격: video/TRAILER-PLAN.md
// opening.html은 직접 작성한 파일이라 여기서 덮어쓰지 않는다.
// 실행: node video/trailer/tools/build-scenes.mjs
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = join(import.meta.dirname, "..", "compositions");
const r = (n) => Math.round(n * 1000) / 1000;
const FONT = `@font-face { font-family: "Pretendard"; src: url("assets/fonts/PretendardVariable.woff2") format("woff2"); font-weight: 100 900; }`;
const IN = (sel, t) => `tl.fromTo("${sel}", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power4.out" }, ${r(t)});`;
const OUT = (sel, t) => `tl.to("${sel}", { opacity: 0, duration: 0.2, ease: "power2.in" }, ${r(t)});`;

function file(id, dur, style, body, tweens, { bg = "#f4f3ef" } = {}) {
  return `<template>
  <style>
    ${FONT}
    #root { position: absolute; inset: 0; background: ${bg}; font-family: "Pretendard", sans-serif; overflow: hidden; }
${style}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1920" data-height="1080" data-duration="${dur}">
${body}
  </div>
  <script>
    const tl = gsap.timeline({ paused: true });
    ${tweens.join("\n    ")}
    window.__timelines["${id}"] = tl;
  </script>
</template>
`;
}

// 12명 썸네일 데이터 (TRAILER-PLAN.md 4.2절)
const CAST = [
  { id: "tuvalu", name: "시오네", country: "투발루", title: "바다가 가까워진 우리 집", color: "#1f7f7c" },
  { id: "pakistan", name: "아시프", country: "파키스탄", title: "쉴 수 없는 더운 하루", color: "#2d6b63" },
  { id: "bangladesh", name: "루파", country: "방글라데시", title: "물은 있지만 마실 수 없다", color: "#3e6399" },
  { id: "somalia", name: "호단", country: "소말리아", title: "비를 기다리는 가족", color: "#b06d12" },
  { id: "gaza", name: "라마", country: "팔레스타인", title: "급수 소식을 기다리는 하루", color: "#3f74a8" },
  { id: "haiti", name: "나데주", country: "아이티", title: "집을 떠난 뒤의 식탁", color: "#a86a14" },
  { id: "ghana", name: "코피", country: "가나", title: "카카오 밭과 교실 사이", color: "#86552a" },
  { id: "sudan", name: "암나", country: "수단 → 차드", title: "국경을 넘은 뒤에도", color: "#76589f" },
  { id: "rohingya", name: "누르", country: "미얀마 → 방글라데시", title: "학교의 문이 닫힌 아침", color: "#71519c" },
  { id: "afghanistan", name: "마리암", country: "아프가니스탄", title: "배우고 싶은 다음 학년", color: "#a3303d" },
  { id: "congo", name: "그라스", country: "콩고민주공화국", title: "배터리 뒤에 있는 우리 집", color: "#ad2843" },
  { id: "qatar", name: "람", country: "카타르", title: "일한 만큼 받을 수 있을까", color: "#66750f" },
];

// ── S2. 코피 (4.0–9.3초, 5.3초) ──
const PERSON_CSS = `    .panel { position: absolute; left: 1110px; top: 0; width: 810px; height: 1080px; overflow: hidden; }
    .kb { position: absolute; left: 0; top: 0; width: 810px; height: 1080px; transform-origin: 50% 40%; }
    .media { position: absolute; left: 0; top: 0; width: 810px; height: 1080px; object-fit: cover; }
    .text { position: absolute; left: 110px; top: 0; width: 900px; height: 1080px; display: flex; flex-direction: column; justify-content: center; }
    .place { font-size: 32px; font-weight: 500; color: #5c5c5c; letter-spacing: -0.01em; line-height: 1.3; }
    .line { font-size: 50px; font-weight: 600; color: #111111; letter-spacing: -0.03em; line-height: 1.36; margin-top: 28px; word-break: keep-all; max-width: 840px; }
    .close-line { font-size: 60px; font-weight: 600; color: #111111; letter-spacing: -0.03em; line-height: 1.34; word-break: keep-all; max-width: 860px; }
    .close-l1 { margin-top: 28px; }
    .close-l2 { margin-top: 8px; }
    .band { display: block; width: 72px; height: 5px; margin-top: 34px; transform-origin: 0 50%; }`;

{
  const dur = 5.3;
  const body = `    <div id="kofi-panel" class="panel">
      <div id="kofi-kb" class="kb" data-layout-allow-overflow>
        <video id="kofi-media" class="clip media" data-start="0" data-duration="${dur}" data-track-index="0" src="assets/clips/07-ghana.mp4" muted playsinline></video>
      </div>
    </div>
    <div id="kofi-text" class="clip text" data-start="0" data-duration="${dur}" data-track-index="1">
      <p id="kofi-place" class="place">가나 카카오 마을</p>
      <p id="kofi-line" class="line">열세 살 코피는 카카오 밭과 교실 사이에서 하루를 고민합니다.</p>
      <i id="kofi-band" class="band" style="background:#86552a"></i>
    </div>`;
  const tw = [
    `tl.fromTo("#kofi-panel", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.inOut" }, 0);`,
    `tl.fromTo("#kofi-kb", { scale: 1 }, { scale: 1.02, duration: ${dur}, ease: "none" }, 0);`,
    IN("#kofi-place", 0.4),
    IN("#kofi-line", 0.5),
    `tl.fromTo("#kofi-band", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "expo.out" }, 0.55);`,
    `tl.to(["#kofi-place", "#kofi-line", "#kofi-band"], { opacity: 0, duration: 0.22, ease: "power2.in" }, 5.0);`,
  ];
  writeFileSync(join(DIR, "kofi.html"), file("kofi", dur, PERSON_CSS, body, tw));
}

// ── S3. 12명 썸네일 (9.3–14.8초, 5.5초) → 끝에서 코피만 남음 ──
{
  const dur = 5.5;
  const CSS = `    .cap { position: absolute; left: 110px; top: 64px; width: 1700px; font-size: 44px; font-weight: 600; color: #111111; letter-spacing: -0.03em; line-height: 1.2; }
    .grid { position: absolute; left: 110px; top: 148px; width: 1700px; display: grid; grid-template-columns: repeat(6, 266px); column-gap: 20px; row-gap: 28px; }
    .card { width: 266px; }
    .thumb-wrap { position: relative; width: 266px; height: 260px; overflow: hidden; background: #e6e4de; }
    .thumb-wrap.is-kofi { box-sizing: border-box; }
    .thumb { width: 266px; height: 260px; object-fit: cover; object-position: 50% 15%; display: block; }
    .kofi-ring { position: absolute; inset: 0; border: 3px solid #86552a; pointer-events: none; opacity: 0; }
    .bar { height: 4px; width: 100%; }
    .who { margin-top: 10px; font-size: 22px; font-weight: 600; color: #111111; letter-spacing: -0.02em; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sit { margin-top: 4px; font-size: 20px; font-weight: 400; color: #5c5c5c; letter-spacing: -0.015em; line-height: 1.3; word-break: keep-all; }`;
  const cards = CAST.map((c, i) => `      <div id="cast-c${i}" class="card${c.id === "ghana" ? " kofi-card" : " other-card"}">
        <div class="thumb-wrap${c.id === "ghana" ? " is-kofi" : ""}">
          <img class="thumb" src="assets/cast/${c.id}.jpg" alt="${c.name}" />
          ${c.id === "ghana" ? `<div id="cast-kofi-ring" class="kofi-ring"></div>` : ""}
        </div>
        <div class="bar" style="background:${c.color}"></div>
        <p class="who">${c.name} · ${c.country}</p>
        <p class="sit">${c.title}</p>
      </div>`).join("\n");
  const body = `    <p id="cast-cap" class="clip cap" data-hold data-start="0" data-duration="${dur}" data-track-index="1">우리는 오늘 누군가의 하루를 대신 살아 봅니다.</p>
    <div id="cast-grid" class="clip grid" data-hold data-start="0" data-duration="${dur}" data-track-index="0">
${cards}
    </div>`;
  const tw = [
    IN("#cast-cap", 0.4),
    ...CAST.map((_, i) => `tl.fromTo("#cast-c${i}", { opacity: 0 }, { opacity: 1, duration: 0.24, ease: "power2.out" }, ${r(0.4 + i * 0.08)});`),
    `tl.to(".other-card", { opacity: 0.28, duration: 0.5, ease: "power2.inOut" }, 4.7);`,
    `tl.to("#cast-kofi-ring", { opacity: 1, duration: 0.4, ease: "power2.out" }, 4.7);`,
    OUT("#cast-cap", 5.25),
  ];
  writeFileSync(join(DIR, "cast.html"), file("cast", dur, CSS, body, tw));
}

// ── 글 카드 공통 (S5 상황, S6 선택지) ──
const CARD_CSS = `    .wrap { position: absolute; left: 110px; top: 0; width: 1700px; height: 1080px; display: flex; flex-direction: column; justify-content: center; }
    .eyebrow { font-size: 32px; font-weight: 500; color: #5c5c5c; letter-spacing: -0.01em; line-height: 1.3; }
    .headline { font-size: 52px; font-weight: 600; color: #111111; letter-spacing: -0.03em; line-height: 1.38; margin-top: 26px; word-break: keep-all; max-width: 1480px; }
    .band { display: block; width: 72px; height: 5px; margin-top: 34px; background: #86552a; transform-origin: 0 50%; }
    .opts { margin-top: 48px; display: flex; flex-direction: column; gap: 24px; max-width: 1480px; }
    .opt { display: flex; align-items: center; gap: 24px; padding: 26px 32px; background: #ffffff; border: 1px solid #dcdad3; border-radius: 14px; }
    .badge { flex: 0 0 52px; height: 52px; border-radius: 10px; background: #86552a; color: #ffffff; font-size: 28px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
    .opt-text { font-size: 40px; font-weight: 500; color: #111111; letter-spacing: -0.025em; line-height: 1.35; word-break: keep-all; }`;

// S5. 상황 한 문장 (21.8–28.0초, 6.2초)
{
  const dur = 6.2;
  const body = `    <div id="sit-wrap" class="clip wrap" data-hold data-start="0" data-duration="${dur}" data-track-index="0">
      <p id="sit-eye" class="eyebrow">코피의 아침</p>
      <p id="sit-head" class="headline">일손이 모자란 아빠는 밭에 같이 가자고 하고, 오늘은 수학 시험 날입니다.</p>
      <i id="sit-band" class="band"></i>
    </div>`;
  const tw = [
    IN("#sit-eye", 0.3),
    IN("#sit-head", 0.4),
    `tl.fromTo("#sit-band", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "expo.out" }, 0.5);`,
    `tl.to(["#sit-eye", "#sit-head", "#sit-band"], { opacity: 0, duration: 0.22, ease: "power2.in" }, 5.95);`,
  ];
  writeFileSync(join(DIR, "situation.html"), file("situation", dur, CARD_CSS, body, tw));
}

// S6. 선택지 (28.0–36.0초, 8.0초)
{
  const dur = 8.0;
  const body = `    <div id="opt-wrap" class="clip wrap" data-hold data-start="0" data-duration="${dur}" data-track-index="0">
      <p id="opt-q" class="headline" style="margin-top:0">당신이라면 어떤 선택을 하시겠습니까?</p>
      <div class="opts">
        <div id="opt-a" class="opt"><span class="badge">A</span><p class="opt-text">아빠를 따라 밭에 간다</p></div>
        <div id="opt-b" class="opt"><span class="badge">B</span><p class="opt-text">“학교에 갈게요. 대신 저녁에 집안일을 다 할게요.”</p></div>
      </div>
    </div>`;
  const tw = [
    IN("#opt-q", 0.3),
    IN("#opt-a", 0.9),
    IN("#opt-b", 1.4),
    `tl.to(["#opt-q", "#opt-a", "#opt-b"], { opacity: 0, duration: 0.22, ease: "power2.in" }, 7.75);`,
  ];
  writeFileSync(join(DIR, "options.html"), file("options", dur, CARD_CSS, body, tw));
}

// ── 앱 장면 공통 (S4, S7, S8, S9, S11): 위 문장 + 아래 1392×870 앱 틀 ──
const APP_CSS = `    .frame { position: absolute; left: 264px; top: 170px; width: 1392px; height: 870px; overflow: hidden; background: #ffffff; outline: 1px solid #dcdad3; box-shadow: 0 12px 32px rgba(17, 17, 17, 0.08); }
    .layer { position: absolute; inset: 0; }
    .zoom { position: absolute; inset: 0; transform-origin: 50% 50%; }
    .rec { position: absolute; left: 0; top: 0; width: 1392px; height: 870px; object-fit: cover; }
    .cap { position: absolute; left: 264px; top: 82px; width: 1392px; font-size: 44px; font-weight: 600; color: #111111; letter-spacing: -0.03em; line-height: 1.2; white-space: nowrap; }`;

// zooms: [{ start, dur, scale, x, y }] (from previous state; initial state can be set via init)
const APPS = [
  // S4. 장면과 대화 (14.8–21.8초, 7.0초)
  {
    id: "app-scene",
    dur: 7.0,
    frameIn: 0.3,
    recs: [{
      src: "REC-K1", mediaStart: 1.5, start: 0, dur: 7.0,
      zooms: [
        { at: 0.6, dur: 0.8, scale: 1.55, x: -175, y: 155 }, // 장면 제목·본문 확대
        { at: 3.5, dur: 0.8, scale: 1.55, x: -175, y: -40 }, // 학생 말·아빠 AI 대답 확대
      ],
    }],
    caps: [{ text: "그 사람이 되어 장면을 읽고, 주변 사람과 AI로 대화합니다.", in: 0.4, out: 6.75 }],
  },
  // S7. 웹앱에서 고르기 (36.0–43.0초, 7.0초)
  {
    id: "app-choice",
    dur: 7.0,
    frameIn: 0.3,
    recs: [{
      src: "REC-K2", mediaStart: 0.4, start: 0, dur: 7.0,
      zooms: [
        { at: 0.5, dur: 0.8, scale: 1.65, x: -195, y: -235 }, // A/B 선택 버튼 확대 → B 클릭
        { at: 3.6, dur: 0.8, scale: 1.55, x: -175, y: 20 },   // 결과 화면(잘 본 시험과 다친 아빠) 확대
      ],
    }],
    caps: [
      { text: "웹앱에서는 이렇게 고릅니다.", in: 0.3, out: 3.35 },
      { text: "선택에 따라 하루가 달라집니다.", in: 3.6, out: 6.75 },
    ],
  },
  // S8. 돌아보기 (43.0–49.0초, 6.0초)
  {
    id: "app-reflect",
    dur: 6.0,
    frameIn: 0.3,
    recs: [{
      src: "REC-K3", mediaStart: 1.0, start: 0, dur: 6.0,
      zooms: [
        { at: 0.5, dur: 0.8, scale: 1.55, x: -175, y: -70 }, // 돌아보기 질문·입력 칸 확대
      ],
    }],
    caps: [{ text: "무엇을 골라도 바뀌지 않은 어려움을 찾습니다.", in: 0.3, out: 5.75 }],
  },
  // S9. 질문과 AI 조사 (49.0–55.5초, 6.5초)
  {
    id: "app-ask",
    dur: 6.5,
    frameIn: 0.3,
    recs: [{
      src: "REC-K4", mediaStart: 1.2, start: 0, dur: 6.5,
      zooms: [
        { at: 0.5, dur: 0.8, scale: 1.55, x: -175, y: 40 }, // 질문·AI 조사 답·원문 자료 확대
      ],
    }],
    caps: [{ text: "궁금한 것을 물으면, AI가 자료를 찾아 답합니다.", in: 0.3, out: 6.25 }],
  },
  // S11. 세 가지 글 (61.5–71.7초, 10.2초 = 각 3.4초)
  {
    id: "app-docs",
    dur: 10.2,
    frameIn: 0.3,
    recs: [
      { src: "REC-K5", mediaStart: 0.4, start: 0, dur: 3.7, init: { scale: 1.26, x: -125, y: 112 } },
      { src: "REC-K6", mediaStart: 0.4, start: 3.4, dur: 3.7, init: { scale: 1.26, x: -125, y: 112 } },
      { src: "REC-K7", mediaStart: 0.4, start: 6.8, dur: 3.4, init: { scale: 1.26, x: -125, y: 100 } },
    ],
    caps: [
      { text: "신문 기사로 알리고,", in: 0.3, out: 3.2 },
      { text: "정책 제안서로 바꿀 길을 내고,", in: 3.6, out: 6.6 },
      { text: "편지로 마음을 전합니다.", in: 7.0, out: 9.95 },
    ],
  },
];

for (const a of APPS) {
  const body = [], tw = [];
  body.push(`    <div id="${a.id}-frame" class="frame">`);
  a.recs.forEach((rc, i) => {
    body.push(`      <div id="${a.id}-w${i}" class="layer" style="z-index:${i + 1}">
        <div id="${a.id}-z${i}" class="zoom" data-layout-allow-overflow>
          <video id="${a.id}-rec${i}" class="clip rec" data-start="${rc.start}" data-duration="${rc.dur}" data-media-start="${rc.mediaStart}" data-track-index="0" src="assets/app/${rc.src}.mp4" muted playsinline></video>
        </div>
      </div>`);
    if (i > 0) tw.push(`tl.fromTo("#${a.id}-w${i}", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.inOut" }, ${rc.start});`);
    if (rc.init) {
      tw.push(`tl.set("#${a.id}-z${i}", { scale: ${rc.init.scale}, x: ${rc.init.x}, y: ${rc.init.y} }, ${rc.start});`);
    }
    if (rc.zooms) {
      for (const z of rc.zooms) {
        tw.push(`tl.to("#${a.id}-z${i}", { scale: ${z.scale}, x: ${z.x}, y: ${z.y}, duration: ${z.dur}, ease: "power2.inOut" }, ${z.at});`);
      }
    }
  });
  body.push(`    </div>`);
  a.caps.forEach((c, i) => {
    body.push(`    <p id="${a.id}-cap${i}" class="clip cap" data-start="0" data-duration="${a.dur}" data-track-index="1">${c.text}</p>`);
    tw.push(IN(`#${a.id}-cap${i}`, c.in));
    tw.push(OUT(`#${a.id}-cap${i}`, c.out));
  });
  if (a.frameIn) {
    tw.unshift(`tl.fromTo("#${a.id}-frame", { opacity: 0 }, { opacity: 1, duration: ${a.frameIn}, ease: "power2.inOut" }, 0);`);
  }
  writeFileSync(join(DIR, `${a.id}.html`), file(a.id, a.dur, APP_CSS, body.join("\n"), tw));
}

// ── S10. 다른 학생들 (55.5–61.5초, 6.0초) ──
{
  const dur = 6.0;
  const OTHERS = [
    { id: "rama", label: "라마 · 팔레스타인 · 14살", color: "#3f74a8", clip: "05-gaza-noon" },
    { id: "amna", label: "암나 · 수단 → 차드 · 14살", color: "#76589f", clip: "10-sudan-evening" },
    { id: "grace", label: "그라스 · 콩고민주공화국 · 14살", color: "#ad2843", clip: "12-congo-evening" },
  ];
  const CSS = `    .cap { position: absolute; left: 110px; top: 82px; width: 1700px; font-size: 44px; font-weight: 600; color: #111111; letter-spacing: -0.03em; line-height: 1.25; }
    .row { position: absolute; left: 200px; top: 196px; width: 1520px; display: flex; gap: 40px; }
    .col { width: 480px; }
    .box { position: relative; width: 480px; height: 640px; overflow: hidden; background: #e6e4de; }
    .kb { position: absolute; inset: 0; transform-origin: 50% 40%; }
    .vid { position: absolute; inset: 0; width: 480px; height: 640px; object-fit: cover; }
    .bar { height: 5px; width: 100%; }
    .who { margin-top: 18px; font-size: 28px; font-weight: 600; color: #111111; letter-spacing: -0.02em; line-height: 1.3; }`;
  const cols = OTHERS.map((o, i) => `      <div id="oth-${o.id}" class="col">
        <div class="box">
          <div id="oth-kb-${o.id}" class="kb" data-layout-allow-overflow>
            <video id="oth-vid-${o.id}" class="clip vid" data-start="0" data-duration="${dur}" data-track-index="0" src="assets/clips/${o.clip}.mp4" muted playsinline></video>
          </div>
        </div>
        <div class="bar" style="background:${o.color}"></div>
        <p class="who">${o.label}</p>
      </div>`).join("\n");
  const body = `    <p id="oth-cap" class="clip cap" data-start="0" data-duration="${dur}" data-track-index="1">다른 나라 또래들이 겪는 서로 다른 어려움도 살아 볼 수 있습니다.</p>
    <div id="oth-row" class="row">
${cols}
    </div>`;
  const tw = [
    IN("#oth-cap", 0.5),
    ...OTHERS.flatMap((o, i) => [
      `tl.fromTo("#oth-${o.id}", { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" }, ${r(0.15 + i * 0.15)});`,
      `tl.fromTo("#oth-kb-${o.id}", { scale: 1 }, { scale: 1.02, duration: ${dur}, ease: "none" }, 0);`,
    ]),
    OUT("#oth-cap", 5.75),
  ];
  writeFileSync(join(DIR, "others.html"), file("others", dur, CSS, body, tw));
}

// ── S12. 시오네와 닫는 질문 (71.7–77.2초, 5.5초) ──
{
  const dur = 5.5;
  const body = `    <div id="sn-panel" class="panel">
      <div id="sn-kb" class="kb" data-layout-allow-overflow>
        <video id="sn-media" class="clip media" data-start="0" data-duration="4.6" data-track-index="0" src="assets/clips/04-tuvalu-end.mp4" muted playsinline></video>
        <img id="sn-still" class="clip media" data-start="4.55" data-duration="0.95" data-track-index="0" src="assets/clips/04-tuvalu-last.jpg" alt="시오네" />
      </div>
    </div>
    <div id="sn-text" class="clip text" data-start="0" data-duration="${dur}" data-track-index="1">
      <p id="sn-place" class="place">투발루 바이투푸섬 · 시오네, 13살</p>
      <p id="sn-l1" class="close-line close-l1">내일,</p>
      <p id="sn-l2" class="close-line close-l2">우리들의 하루는 어떻게 될까요?</p>
      <i id="sn-band" class="band" style="background:#1f7f7c"></i>
    </div>`;
  const tw = [
    `tl.fromTo("#sn-panel", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.inOut" }, 0);`,
    `tl.fromTo("#sn-kb", { scale: 1 }, { scale: 1.02, duration: ${dur}, ease: "none" }, 0);`,
    IN("#sn-place", 0.4),
    IN("#sn-l1", 0.7),
    IN("#sn-l2", 0.9),
    `tl.fromTo("#sn-band", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "expo.out" }, 0.95);`,
    `tl.to(["#sn-place", "#sn-l1", "#sn-l2", "#sn-band"], { opacity: 0, duration: 0.25, ease: "power2.in" }, 5.2);`,
  ];
  writeFileSync(join(DIR, "sione-close.html"), file("sione-close", dur, PERSON_CSS, body, tw));
}

// ── S13. 12명과 타이틀 (77.2–82.7초, 5.5초) → 1.1초 검은 화면 페이드아웃 ──
{
  const dur = 5.5;
  const CSS = `    .grid { position: absolute; left: 312px; top: 76px; width: 1296px; display: grid; grid-template-columns: repeat(6, 196px); column-gap: 24px; row-gap: 20px; }
    .tile { width: 196px; }
    .thumb { width: 196px; height: 224px; object-fit: cover; object-position: 50% 15%; display: block; background: #e6e4de; }
    .bar { height: 4px; width: 100%; }
    .title-box { position: absolute; left: 110px; top: 616px; width: 1700px; text-align: center; }
    .sub { font-size: 36px; font-weight: 500; color: #5c5c5c; letter-spacing: -0.01em; line-height: 1.3; }
    .main { margin-top: 16px; font-size: 112px; font-weight: 700; color: #111111; letter-spacing: -0.04em; line-height: 1.1; }
    .fadeout { position: absolute; inset: 0; background: #000000; opacity: 0; pointer-events: none; z-index: 90; }`;
  const tiles = CAST.map((c, i) => `      <div id="fin-t${i}" class="tile">
        <img class="thumb" src="assets/cast/${c.id}.jpg" alt="${c.name}" />
        <div class="bar" style="background:${c.color}"></div>
      </div>`).join("\n");
  const body = `    <div id="fin-grid" class="clip grid" data-start="0" data-duration="${dur}" data-track-index="0">
${tiles}
    </div>
    <div id="fin-title" class="clip title-box" data-start="0" data-duration="${dur}" data-track-index="1">
      <p id="fin-sub" class="sub">도덕 · 인권 수업용</p>
      <h1 id="fin-main" class="main">다른 곳의 하루</h1>
    </div>
    <div id="fin-black" class="fadeout"></div>`;
  const tw = [
    ...CAST.map((_, i) => `tl.fromTo("#fin-t${i}", { opacity: 0 }, { opacity: 1, duration: 0.24, ease: "power2.out" }, ${r(i * 0.08)});`),
    IN("#fin-sub", 1.4),
    IN("#fin-main", 1.4),
    `tl.fromTo("#fin-black", { opacity: 0 }, { opacity: 1, duration: 1.1, ease: "power2.inOut" }, 4.4);`,
  ];
  writeFileSync(join(DIR, "finale.html"), file("finale", dur, CSS, body, tw));
}

console.log("B-plan 12 scenes written (S2..S13)");
