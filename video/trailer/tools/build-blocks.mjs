// 아침·낮·저녁 세 장면(compositions/morning|noon|evening.html)을 people 데이터로 만든다.
// 인물 정보는 video/TRAILER-PLAN.md 4절 표와 같아야 한다. 고친 뒤: node tools/build-blocks.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const CUT = 3.5; // 인물 한 컷 길이(초)
const MIX = 0.3; // 다음 컷과 겹치며 바뀌는 시간(초)

const blocks = {
  morning: [
    { id: "pakistan", place: "파키스탄 자코바바드", name: "아시프, 36살", title: "「오전 6시, 이미 38도」", color: "#2d6b63", clip: "01-pakistan" },
    { id: "bangladesh", place: "방글라데시 해안 마을", name: "루파, 13살", title: "「빈 물항아리와 발표날」", color: "#3e6399", art: "bangladesh" },
    { id: "afghanistan", place: "아프가니스탄", name: "마리암, 13살", title: "「오빠의 새 가방」", color: "#a3303d", art: "afghanistan" },
    { id: "tuvalu", place: "투발루 바이투푸섬", name: "시오네, 13살", title: "「바닷물이 들어온 시험날」", color: "#1f7f7c", clip: "04-tuvalu" },
  ],
  noon: [
    { id: "gaza", place: "팔레스타인 가자지구", name: "라마, 14살", title: "「급수차가 왔다」", color: "#3f74a8", clip: "05-gaza-noon" },
    { id: "ghana", place: "가나 카카오 마을", name: "코피, 13살", title: "「밭에서 만난 아마」", color: "#86552a", art: "ghana-noon-a" },
    { id: "qatar", place: "카타르 공사장", name: "람, 24살", title: "「“30분만 더”」", color: "#66750f", art: "qatar-noon" },
    { id: "somalia", place: "소말리아", name: "호단, 15살", title: "「시장에 염소를 팔까」", color: "#b06d12", clip: "08-somalia-noon" },
  ],
  evening: [
    { id: "haiti", place: "아이티 포르토프랭스", name: "나데주, 15살", title: "「두 개의 봉투」", color: "#a86a14", art: "haiti-evening" },
    { id: "sudan", place: "수단에서 차드로", name: "암나, 14살", title: "「우물 줄 끝에서」", color: "#76589f", clip: "10-sudan-evening" },
    { id: "rohingya", place: "콕스바자르 난민캠프", name: "누르, 13살", title: "「오빠의 어깨」", color: "#71519c", art: "rohingya-evening" },
    { id: "congo", place: "콩고민주공화국 콜웨지", name: "그라스, 14살", title: "「할머니의 무덤」", color: "#ad2843", clip: "12-congo-evening" },
  ],
};

const r = (n) => Math.round(n * 1000) / 1000;

function scene(blockId, people) {
  const total = CUT * people.length;
  const cuts = people
    .map((p, i) => {
      const start = r(i * CUT);
      const last = i === people.length - 1;
      const mediaDur = r(last ? CUT : CUT + MIX);
      const pre = `${blockId}-${p.id}`;
      const media = p.clip
        ? `<video id="${pre}-media" class="clip media" data-start="${start}" data-duration="${mediaDur}" data-track-index="0" src="assets/clips/${p.clip}.mp4" muted playsinline></video>`
        : `<img id="${pre}-media" class="clip media" data-start="${start}" data-duration="${mediaDur}" data-track-index="0" src="assets/art/${p.art}.jpg" alt="${p.name.split(",")[0]}" />`;
      return `
    <div id="${pre}-panel" class="panel" style="z-index:${10 + i}">
      <div id="${pre}-kb" class="kb" data-layout-allow-overflow>
        ${media}
      </div>
    </div>
    <div id="${pre}-text" class="clip text" data-start="${start}" data-duration="${CUT}" data-track-index="1" style="z-index:${30 + i}">
      <p id="${pre}-place" class="place">${p.place}</p>
      <p id="${pre}-name" class="name">${p.name}</p>
      <h2 id="${pre}-title" class="title">${p.title}</h2>
      <i id="${pre}-band" class="band" style="background:${p.color}"></i>
    </div>`;
    })
    .join("\n");

  const tweens = people
    .map((p, i) => {
      const t = r(i * CUT);
      const pre = `${blockId}-${p.id}`;
      return `
    tl.fromTo("#${pre}-panel", { opacity: 0 }, { opacity: 1, duration: ${MIX}, ease: "power2.inOut" }, ${t});
    tl.fromTo("#${pre}-kb", { scale: 1 }, { scale: 1.02, duration: ${r(CUT + MIX)}, ease: "none" }, ${t});
    tl.fromTo("#${pre}-place", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power4.out" }, ${r(t + 0.5)});
    tl.fromTo("#${pre}-name", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power4.out" }, ${r(t + 0.58)});
    tl.fromTo("#${pre}-title", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power4.out" }, ${r(t + 0.7)});
    tl.fromTo("#${pre}-band", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "expo.out" }, ${r(t + 0.75)});
    tl.to(["#${pre}-place", "#${pre}-name", "#${pre}-title", "#${pre}-band"], { opacity: 0, duration: 0.2, ease: "power2.in" }, ${r(t + CUT - 0.25)});`;
    })
    .join("\n");

  return `<template>
  <style>
    @font-face { font-family: "Pretendard"; src: url("assets/fonts/PretendardVariable.woff2") format("woff2"); font-weight: 100 900; }
    #root { position: absolute; inset: 0; background: #f4f3ef; font-family: "Pretendard", sans-serif; overflow: hidden; }
    .panel { position: absolute; left: 1110px; top: 0; width: 810px; height: 1080px; overflow: hidden; }
    .kb { position: absolute; left: 0; top: 0; width: 810px; height: 1080px; transform-origin: 50% 40%; }
    .media { position: absolute; left: 0; top: 0; width: 810px; height: 1080px; object-fit: cover; }
    .text { position: absolute; left: 110px; top: 0; width: 900px; height: 1080px; display: flex; flex-direction: column; justify-content: center; }
    .place { font-size: 34px; font-weight: 500; color: #5c5c5c; letter-spacing: -0.01em; line-height: 1.3; }
    .name { font-size: 40px; font-weight: 600; color: #111111; letter-spacing: -0.01em; line-height: 1.3; margin-top: 6px; }
    .title { font-size: 72px; font-weight: 600; color: #111111; letter-spacing: -0.03em; line-height: 1.22; margin-top: 44px; word-break: keep-all; }
    .band { display: block; width: 72px; height: 5px; margin-top: 36px; transform-origin: 0 50%; }
  </style>
  <div id="root" data-composition-id="${blockId}" data-width="1920" data-height="1080" data-duration="${total}">
${cuts}
  </div>
  <script>
    const tl = gsap.timeline({ paused: true });
${tweens}
    window.__timelines["${blockId}"] = tl;
  </script>
</template>
`;
}

for (const [id, people] of Object.entries(blocks)) {
  writeFileSync(join(root, "compositions", `${id}.html`), scene(id, people));
  console.log(`compositions/${id}.html`);
}
