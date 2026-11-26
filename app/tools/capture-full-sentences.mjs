// 돌아보기·질문·조사·결과물(신문 기사)의 문장 틀을 같은 조건으로 찍는다.
// 사용: node tools/capture-full-sentences.mjs --prefix before|after [--url http://127.0.0.1:4173/] [--out 폴더]
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
const arg = k => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : null; };
const url = arg('url') || 'http://127.0.0.1:4173/', prefix = arg('prefix') || 'after';
const out = arg('out') || '../local-assets/screenshots/2026-11-26-full-sentences';
mkdirSync(out, { recursive: true });
const KEY = 'global-life-lab-v1';
const seed = (view, fields) => ({ completed: [], me: {}, run: { id: 'tuvalu', step: 2, choices: [0, 0, 0], view, fields, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z' } });
const shots = [
  ['reflect', seed('reflect', {}), '.starters'],
  ['lab', seed('lab', { format: 'article' }), '[data-frame]'],
  ['plan', seed('plan', { format: 'article', question: '바이투푸섬의 기후 변화 문제는 얼마나 심각할까?', notes: '해안 적응 사업이 진행 중이다 (UNDP 자료)' }), '[data-gstarter]'],
];
const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
for (const [vw, vh, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) for (const [name, s, sel] of shots) {
  const file = `${out}/${prefix}-${tag}-${name}.png`;
  if (existsSync(file)) { console.log('SKIP (exists)', file); continue; }
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: tag === 'mobile' ? 2 : 1, locale: 'ko-KR' });
  const page = await ctx.newPage();
  await page.route('**/api/**', r => r.fulfill({ status: 404, body: '' }));
  await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(k, v); sessionStorage.setItem('s', '1'); } }, [KEY, JSON.stringify(s)]);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('#resume').click(); await page.waitForTimeout(400);
  await page.locator(sel).first().scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, -120)); await page.waitForTimeout(200);
  await page.screenshot({ path: file }); console.log('saved', file);
  await ctx.close();
}
await browser.close();
