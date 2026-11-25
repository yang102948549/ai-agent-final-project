// 시나리오 분기 정리 문서를 만든다: 12명의 장면 갈래, 선택지와 결과, 장면 첫머리(나레이션·대사·답 칩), 전환 일과.
// 사용: node tools/scenario-md.cjs   →  design/scenario-branches.md
// scenarios.js와 precomputed.js에서 그대로 옮겨 쓰므로, 대본을 고친 뒤 다시 실행하면 문서가 맞춰진다.
// 맨 위 검토 메모는 design/scenario-review-notes.md를 그대로 붙인다(손으로 쓰는 부분).
const fs = require('fs'), path = require('path');
global.window = {};
require('../dist/scenarios.js');
require('../dist/precomputed.js');
const cases = window.SCENARIOS, PRE = window.PRECOMPUTED;
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'design', 'scenario-branches.md');
const NOTES = path.join(ROOT, 'design', 'scenario-review-notes.md');

const AB = n => 'AB'[n];
const slot = (raw, i) => (Array.isArray(raw.scenes[i]) ? raw.scenes[i] : [raw.scenes[i]]);
// 갈래 칸이면 그 칸에 이르는 앞 선택 이름(낮: A·B, 저녁: AA·AB·BA·BB)
const branchName = (i, j, n) => (n === 1 ? '' : i === 1 ? AB(j) : AB(j >> 1) + AB(j & 1));
const chips = cs => (cs || []).map(c => `\`${c.text}\``).join(' · ');
const routine = a => a.map(x => `${x.when} ${x.text}`).join(' → ');

const out = [];
const L = s => out.push(s);
L('# 시나리오 분기 정리');
L('');
L(`> \`node tools/scenario-md.cjs\`로 만든 문서다. 대본은 \`dist/scenarios.js\`, 첫머리·답 칩·일과는 \`dist/precomputed.js\`에서 옮겼다. 고칠 때는 두 파일을 고치고 다시 만든다.`);
L('');
if (fs.existsSync(NOTES)) { L(fs.readFileSync(NOTES, 'utf8').trim()); L(''); }

L('## 한눈에 보기');
L('');
L('| 인물 | 아침 | 낮 | 저녁 | 장면 흐름 |');
L('|---|---|---|---|---|');
for (const raw of cases) {
  const t = i => slot(raw, i).map((s, j, a) => (a.length > 1 ? `${branchName(i, j, a.length)}: ` : '') + `「${s.title}」`).join('<br>');
  const flows = new Set([0, 1, 2, 3].map(m => window.resolveCase(raw, [m >> 1, m & 1, 0]).scenes.map(s => s.title).join('|'))).size;
  L(`| ${raw.name} · ${raw.country} | ${t(0)} | ${t(1)} | ${t(2)} | ${flows}가지 |`);
}
L('');

for (const raw of cases) {
  const P = PRE[raw.id];
  L(`## ${raw.name} · ${raw.country} — ${raw.title}`);
  L('');
  L(`- 역할: ${raw.role}`);
  L(`- 상황(인물 소개): ${raw.summary}`);
  L(`- 첫 장면 답 칩: ${chips(P.chips0)}`);
  L('');
  for (let i = 0; i < 3; i++) {
    const ss = slot(raw, i);
    ss.forEach((s, j) => {
      const b = branchName(i, j, ss.length);
      L(`### ${s.time}${b ? ` (앞 선택 ${b} 뒤)` : ''} 「${s.title}」`);
      L('');
      L(s.story);
      L('');
      if (i > 0) {
        // 첫머리: 갈래 칸이면 그 갈래 하나, 고정 칸이면 앞 선택 A·B 두 가지
        const keys = ss.length > 1 ? [String(j)] : ['0', '1'];
        for (const k of keys) {
          const o = P.openings[i][k];
          const label = ss.length > 1 ? '첫머리' : `첫머리 (앞에서 ${AB(Number(k))}를 고른 경우)`;
          L(`**${label}** — ${o.narration}`);
          L('');
          if (o.dialogue) L(`> **${o.speaker}** “${o.dialogue}”`), L('');
          L(`답 칩: ${chips(o.chips)}`);
          L('');
        }
      }
      const pd = ss.length > 1 ? P.scenes[i][j] : P.scenes[i];
      L('| 선택 | 결과 | 다음 일과(전환 화면) |');
      L('|---|---|---|');
      s.options.forEach((o, k) => L(`| **${AB(k)}** ${o.text} | ${o.result} | ${routine(pd.after[k])} |`));
      L('');
    });
  }
}
fs.writeFileSync(OUT, out.join('\n'));
console.log(`저장: ${OUT}`);
