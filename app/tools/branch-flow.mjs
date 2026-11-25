// 실제 화면에서 A·B 버튼을 눌러 여덟 경로를 끝까지 진행하고, 장면 제목이 대본의 갈래와 같은지 확인한다.
// 사용: node tools/branch-flow.mjs [주소] [인물 id]   (기본 http://127.0.0.1:4173/ , tuvalu)
import { chromium } from 'playwright';
import fs from 'node:fs';
import vm from 'node:vm';

const url = process.argv[2] || 'http://127.0.0.1:4173/';
const id = process.argv[3] || 'tuvalu';
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(new URL('../dist/scenarios.js', import.meta.url), 'utf8'), ctx);
const c = ctx.window.SCENARIOS.find(x => x.id === id);
const KEY = 'global-life-lab-v1';

const browser = await chromium.launch();
const masks = process.env.ONLY ? process.env.ONLY.split(',').map(Number) : [...Array(8).keys()];
const results = await Promise.all(masks.map(async mask => {
  const choices = [0, 1, 2].map(i => (mask >> (2 - i)) & 1);
  const expected = ctx.window.resolveCase(c, choices).scenes.map(s => s.title);
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.route('**/api/**', r => r.fulfill({ status: 404, body: '' }));
  const seed = { completed: [], run: { id, step: 0, choices: [null, null, null], fields: { nickname: '테스트' }, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), view: 'chat' } };
  await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(k, v); sessionStorage.setItem('s', '1'); } }, [KEY, JSON.stringify(seed)]);
  await page.goto(url, { waitUntil: 'networkidle' });
  // 첫 화면이 그려진 뒤 '이어하기'로 장면에 들어간다(바로 확인하면 그리기 전이라 놓칠 수 있다).
  await page.locator('#resume').waitFor({ state: 'visible', timeout: 15000 });
  await page.locator('#resume').click();
  const seen = [];
  for (let step = 0; step < 3; step++) {
    await page.locator('.daypass').waitFor({ state: 'detached', timeout: 15000 });
    seen.push((await page.locator('.card-head h1').first().textContent()).trim());
    await page.locator(`[data-pick="${choices[step]}"]`).click();
    await page.locator('[data-action="next-scene"]').first().click();
  }
  await page.locator('.daypass').waitFor({ state: 'detached', timeout: 15000 });
  const recap = await page.locator('.recap-item strong').allTextContents();
  const want = ctx.window.resolveCase(c, choices).scenes.map((s, i) => s.options[choices[i]].text);
  const ok = JSON.stringify(seen) === JSON.stringify(expected) && JSON.stringify(recap) === JSON.stringify(want);
  return { path: choices.map(n => 'AB'[n]).join(''), ok, seen };
}));
await browser.close();
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'} ${r.path}: ${r.seen.join(' → ')}`);
const distinct = new Set(results.map(r => r.seen.slice(0, 2).join('|'))).size;
console.log(`서로 다른 아침·낮 경로 ${distinct}개, 서로 다른 장면 흐름 ${new Set(results.map(r => r.seen.join('|'))).size}개`);
process.exit(results.every(r => r.ok) ? 0 : 1);
