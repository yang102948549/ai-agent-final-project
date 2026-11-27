// 트레일러 v2 장면 파일(compositions/people|sione|app-*.html)을 콘티 데이터로 만든다.
// 콘티는 video/TRAILER-PLAN.md 5절. 문장·시간을 고치면 이 파일을 고치고 다시 실행한다: node video/trailer/tools/build-scenes.mjs
// opening.html·closing.html은 직접 쓴 파일이라 여기서 만들지 않는다.
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = join(import.meta.dirname, "..", "compositions");
const r = (n) => Math.round(n * 1000) / 1000;
const FONT = `@font-face { font-family: "Pretendard"; src: url("assets/fonts/PretendardVariable.woff2") format("woff2"); font-weight: 100 900; }`;
const IN = (sel, t) => `tl.fromTo("${sel}", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power4.out" }, ${r(t)});`;
const OUT = (sel, t) => `tl.to("${sel}", { opacity: 0, duration: 0.2, ease: "power2.in" }, ${r(t)});`;

function file(id, dur, style, body, tweens, { transparent = false } = {}) {
  return `<template>
  <style>
    ${FONT}
    #root { position: absolute; inset: 0; background: ${transparent ? "transparent" : "#f4f3ef"}; font-family: "Pretendard", sans-serif; overflow: hidden; }
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

// ── 인물 컷 (S2 세 사람, S8 시오네): 왼쪽 글, 오른쪽 3:4 영상 ──
const PERSON_CSS = `    .panel { position: absolute; left: 1110px; top: 0; width: 810px; height: 1080px; overflow: hidden; }
    .kb { position: absolute; left: 0; top: 0; width: 810px; height: 1080px; transform-origin: 50% 40%; }
    .media { position: absolute; left: 0; top: 0; width: 810px; height: 1080px; object-fit: cover; }
    .text { position: absolute; left: 110px; top: 0; width: 900px; height: 1080px; display: flex; flex-direction: column; justify-content: center; }
    .place { font-size: 32px; font-weight: 500; color: #5c5c5c; letter-spacing: -0.01em; line-height: 1.3; }
    .line { font-size: 50px; font-weight: 600; color: #111111; letter-spacing: -0.03em; line-height: 1.34; margin-top: 30px; word-break: keep-all; max-width: 820px; }
    .who { font-size: 40px; font-weight: 600; color: #111111; letter-spacing: -0.02em; line-height: 1.3; }
    .band { display: block; width: 72px; height: 5px; margin-top: 34px; transform-origin: 0 50%; }`;

function personCut(pre, p, start, dur, mediaDur, z, mediaStart = 0) {
  const textInner = p.line
    ? `<p id="${pre}-place" class="place">${p.place}</p>
      <p id="${pre}-line" class="line">${p.line}</p>`
    : `<p id="${pre}-place" class="who">${p.place}</p>`;
  return `    <div id="${pre}-panel" class="panel" style="z-index:${10 + z}">
      <div id="${pre}-kb" class="kb" data-layout-allow-overflow>
        <video id="${pre}-media" class="clip media" data-start="${start}" data-duration="${mediaDur}"${mediaStart ? ` data-media-start="${mediaStart}"` : ""} data-track-index="0" src="assets/clips/${p.clip}.mp4" muted playsinline></video>
      </div>
    </div>
    <div id="${pre}-text" class="clip text" data-start="${start}" data-duration="${dur}" data-track-index="1" style="z-index:${30 + z}">
      ${textInner}
      <i id="${pre}-band" class="band" style="background:${p.color}"></i>
    </div>`;
}
function personTweens(pre, p, t, dur, mediaDur, { fadeIn = true, textOut = true } = {}) {
  const tw = [];
  if (fadeIn) tw.push(`tl.fromTo("#${pre}-panel", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.inOut" }, ${r(t)});`);
  tw.push(`tl.fromTo("#${pre}-kb", { scale: 1 }, { scale: 1.02, duration: ${r(mediaDur)}, ease: "none" }, ${r(t)});`);
  tw.push(IN(`#${pre}-place`, t + 0.4));
  if (p.line) tw.push(IN(`#${pre}-line`, t + 0.5));
  tw.push(`tl.fromTo("#${pre}-band", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "expo.out" }, ${r(t + 0.55)});`);
  if (textOut) tw.push(`tl.to(["#${pre}-place", ${p.line ? `"#${pre}-line", ` : ""}"#${pre}-band"], { opacity: 0, duration: 0.2, ease: "power2.in" }, ${r(t + dur - 0.27)});`);
  return tw;
}

// S2 세 사람 (4.6초씩)
const PEOPLE = [
  { id: "asif", place: "파키스탄 자코바바드", line: "아시프는 아침부터 38도 더위 속에서 일합니다.", color: "#2d6b63", clip: "01-pakistan" },
  { id: "rama", place: "팔레스타인 가자지구", line: "라마는 동생들과 급수차 앞에서 물을 기다립니다.", color: "#3f74a8", clip: "05-gaza-noon" },
  { id: "amna", place: "수단에서 차드로", line: "피란 온 암나는 우물 줄 끝에서 차례를 기다립니다.", color: "#76589f", clip: "10-sudan-evening" },
];
{
  const CUT = 4.6, MIX = 0.3;
  const body = [], tw = [];
  PEOPLE.forEach((p, i) => {
    const t = r(i * CUT), last = i === PEOPLE.length - 1, md = r(last ? CUT : CUT + MIX);
    body.push(personCut(`pp-${p.id}`, p, t, CUT, md, i));
    tw.push(...personTweens(`pp-${p.id}`, p, t, CUT, md));
  });
  writeFileSync(join(DIR, "people.html"), file("people", r(CUT * PEOPLE.length), PERSON_CSS, body.join("\n"), tw));
}

// S8 시오네 (4초, 웃으며 끝나는 클립. 글은 정보 줄 하나)
{
  const p = { id: "sione", place: "투발루 바이투푸섬 · 시오네, 13살", color: "#1f7f7c", clip: "04-tuvalu-end" };
  const body = personCut("sn", p, 0, 4, 4.3, 0, 0.3); // 클립 4.6초 중 끝 4.3초 → 마지막 프레임(웃는 얼굴)이 장면 끝에 온다
  const tw = personTweens("sn", p, 0, 3.67, 4.3, { textOut: true }); // 글은 3.4초에 빠져 앱 첫 화면이 겹쳐 들어오기 전에 사라진다
  writeFileSync(join(DIR, "sione.html"), file("sione", 4.3, PERSON_CSS, body, tw));
}

// ── 앱 장면 (S3–S7, S9): 위에 문장, 아래 1344×840 앱 녹화 ──
const APP_CSS = `    .frame { position: absolute; left: 288px; top: 180px; width: 1344px; height: 840px; overflow: hidden; background: #ffffff; outline: 1px solid #dcdad3; box-shadow: 0 12px 32px rgba(17, 17, 17, 0.08); }
    .rec { position: absolute; left: 0; top: 0; width: 1344px; height: 840px; object-fit: cover; }
    .cap { position: absolute; left: 288px; top: 96px; width: 1344px; font-size: 48px; font-weight: 600; color: #111111; letter-spacing: -0.03em; line-height: 1.2; white-space: nowrap; }`;

// recs: [{ src, mediaStart, start, dur }], caps: [{ text, in, out }]
const APPS = [
  { id: "app-reveal", dur: 5.8, frameIn: 0.4, recs: [{ src: "REC-01", mediaStart: 0.3, start: 0, dur: 5.8 }], caps: [{ text: "우리는 오늘 누군가의 하루를 대신 살아 봅니다.", in: 0.4, out: 5.58 }] },
  { id: "app-choice", dur: 7.8, recs: [{ src: "REC-02", mediaStart: 1.0, start: 0, dur: 7.8 }], caps: [{ text: "당신이라면 어떤 선택을 하시겠습니까?", in: 0.4, out: 3.4 }, { text: "선택에 따라 하루가 달라집니다.", in: 4.0, out: 7.58 }] },
  { id: "app-chat", dur: 6.2, recs: [{ src: "REC-03", mediaStart: 1.8, start: 0, dur: 6.2 }], caps: [{ text: "장면 속 사람들과 AI로 대화합니다.", in: 0.4, out: 5.98 }] },
  { id: "app-write", dur: 6.8, recs: [{ src: "REC-04a", mediaStart: 1.0, start: 0, dur: 3.7 }, { src: "REC-04b", mediaStart: 0.3, start: 3.4, dur: 3.4 }], caps: [{ text: "바뀌지 않는 어려움을 찾고, 해결책을 씁니다.", in: 0.4, out: 6.58 }] },
  { id: "app-gallery", dur: 4.2, recs: [{ src: "REC-05", mediaStart: 0.4, start: 0, dur: 4.2 }], caps: [{ text: "친구들의 글을 함께 읽습니다.", in: 0.4, out: 3.98 }] },
  // S9 앱 첫 화면: 시오네 위로 0.3초 겹쳐 들어오고(배경 투명), 닫는 질문 아래로 0.5초 이어진다
  { id: "app-home", dur: 4.2, transparent: true, frameIn: 0.3, recs: [{ src: "REC-06", mediaStart: 0.5, start: 0, dur: 4.2 }], caps: [] },
];
for (const a of APPS) {
  const body = [], tw = [];
  if (a.transparent) body.push(`    <div id="${a.id}-paper" style="position:absolute;inset:0;background:#f4f3ef"></div>`);
  body.push(`    <div id="${a.id}-frame" class="frame">`);
  a.recs.forEach((rc, i) => {
    body.push(`      <div id="${a.id}-w${i}" style="position:absolute;inset:0;z-index:${i + 1}">
        <video id="${a.id}-rec${i}" class="clip rec" data-start="${rc.start}" data-duration="${rc.dur}" data-media-start="${rc.mediaStart}" data-track-index="0" src="assets/app/${rc.src}.mp4" muted playsinline></video>
      </div>`);
    if (i > 0) tw.push(`tl.fromTo("#${a.id}-w${i}", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.inOut" }, ${rc.start});`);
  });
  body.push(`    </div>`);
  a.caps.forEach((c, i) => {
    body.push(`    <p id="${a.id}-cap${i}" class="clip cap" data-start="0" data-duration="${a.dur}" data-track-index="1">${c.text}</p>`);
    tw.push(IN(`#${a.id}-cap${i}`, c.in));
    tw.push(OUT(`#${a.id}-cap${i}`, c.out));
  });
  if (a.frameIn) {
    tw.unshift(`tl.fromTo(${a.transparent ? `["#${a.id}-paper", "#${a.id}-frame"]` : `"#${a.id}-frame"`}, { opacity: 0 }, { opacity: 1, duration: ${a.frameIn}, ease: "power2.inOut" }, 0);`);
  }
  writeFileSync(join(DIR, `${a.id}.html`), file(a.id, a.dur, APP_CSS, body.join("\n"), tw, { transparent: a.transparent }));
}
console.log("scenes written");
