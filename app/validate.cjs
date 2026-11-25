// 시나리오·미리 만든 내용·문법 검사. 사용: node validate.cjs
// 낮·저녁 칸이 배열인 인물은 선택에 따라 장면이 갈라진다. 여덟 경로를 모두 따라가며 확인한다.
const fs = require('fs'), vm = require('vm'), assert = require('assert');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('dist/scenarios.js', 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync('dist/precomputed.js', 'utf8'), ctx);
const { SCENARIOS: cases, PRECOMPUTED: PRE, resolveCase, branchIndex } = ctx.window;

assert.equal(cases.length, 12);
assert.equal(new Set(cases.map(x => x.id)).size, 12);
let paths = 0, scenes = 0, branched = 0;
const checkScene = (s, where) => {
  assert(s && s.time && s.title && s.story && s.barrier, `${where}: 장면 항목이 비어 있음`);
  if (s.img) assert(fs.existsSync(`dist/assets/scenes/${s.img}.webp`), `${where}: 장면 그림 없음 (${s.img}.webp)`);
  assert.equal(s.options.length, 2, `${where}: 선택지는 두 개`);
  assert.notEqual(s.options[0].result, s.options[1].result, `${where}: 두 결과가 같음`);
  for (const o of s.options) assert(o.text && o.result, `${where}: 선택지 문장 또는 결과 없음`);
};
const checkLife = (l, where) => assert(l && ['headline', 'story', 'gained', 'lost'].every(k => typeof l[k] === 'string' && l[k].trim()), `${where}: 브리핑 없음`);

for (const c of cases) {
  assert(c.name && c.country && c.region && c.role && c.question, `${c.id}: 기본 정보`);
  assert(c.facts.length >= 2);
  assert(c.sources.length);
  for (const s of c.sources) { assert(new URL(s.url).protocol === 'https:'); assert(s.date); }
  assert.equal(c.scenes.length, 3, `${c.id}: 아침·낮·저녁 세 칸`);
  c.scenes.forEach((slot, i) => {
    if (Array.isArray(slot)) {
      assert(i > 0, `${c.id}: 아침은 갈라지지 않는다`);
      assert([2, 2 ** i].includes(slot.length), `${c.id}: ${i}번 칸의 갈래 수`);
      branched++;
      // 같은 장면 객체를 여러 갈래가 함께 쓸 수 있다([X, X, Y, Y]는 아침 선택으로만, [X, X, X, X]는 첫머리만 갈래별). 서로 다른 장면끼리는 제목이 달라야 한다.
      const uniq = [...new Set(slot)];
      uniq.forEach((s, k) => { checkScene(s, `${c.id} ${i}-${k}`); scenes++; });
      assert.equal(new Set(uniq.map(s => s.title)).size, uniq.length, `${c.id}: ${i}번 칸의 갈래 제목이 겹침`);
    } else { checkScene(slot, `${c.id} ${i}`); scenes++; }
  });
  const pre = PRE[c.id];
  for (let mask = 0; mask < 8; mask++) {
    const choices = [0, 1, 2].map(i => (mask >> (2 - i)) & 1);
    const r = resolveCase(c, choices);
    r.scenes.forEach((s, i) => {
      checkScene(s, `${c.id} 경로 ${choices.join('')} ${i}`);
      if (!pre) return;
      // 미리 만든 내용이 있으면 이 경로의 장면에 맞는 것이 있어야 한다.
      const k = branchIndex(c, i, choices), ps = pre.scenes[i], one = k === null ? ps : ps?.[k];
      assert(k === null ? !Array.isArray(ps) : Array.isArray(ps), `${c.id} ${i}: 미리 만든 장면 모양이 대본과 다름`);
      checkLife(one?.lives?.[choices[i]], `${c.id} 경로 ${choices.join('')} ${i}`);
      if (i > 0) assert(pre.openings[i]?.[k === null ? choices[i - 1] : k]?.narration, `${c.id} 경로 ${choices.join('')} ${i}: 첫머리 없음`);
    });
    paths++;
  }
}
new vm.Script(fs.readFileSync('dist/ai.js', 'utf8'));
new vm.Script(fs.readFileSync('dist/app.js', 'utf8'));
const tree = cases.filter(c => c.scenes.some(Array.isArray)).map(c => c.id);
console.log(`PASS: ${cases.length} unique scenarios, ${scenes} scenes, ${scenes * 2} choices, ${paths} complete choice paths; branched slots ${branched} (${tree.join(', ') || '없음'}); precomputed matches every path; sources and JavaScript syntax valid.`);
