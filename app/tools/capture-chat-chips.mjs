// 대화 화면의 말 고르기 칩을 찍는다. 두 줄 이상인 칩의 줄 정렬을 보려고 칩이 긴 인물을 고른다.
// 사용: node tools/capture-chat-chips.mjs --prefix before|after [--url ...] [--out 폴더] [--ids pakistan,qatar]
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
const arg = k => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : null; };
const url = arg('url') || 'http://127.0.0.1:4173/', prefix = arg('prefix') || 'after';
const out = arg('out') || '../local-assets/screenshots/2026-11-26-chip-align';
const only = arg('ids')?.split(',');
mkdirSync(out, { recursive: true });
const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
for (const [vw, vh, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: tag === 'mobile' ? 2 : 1, locale: 'ko-KR', hasTouch: tag === 'mobile', isMobile: tag === 'mobile' });
  const page = await ctx.newPage();
  await page.route('**/api/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ configured: true }) }));
  await page.goto(url);
  const ids = only || await page.evaluate(() => SCENARIOS.map(c => c.id));
  for (const id of ids) {
    await page.evaluate(id => localStorage.setItem('global-life-lab-v1', JSON.stringify({ completed: [], me: {}, run: { id, step: 0, choices: [null, null, null], fields: {}, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), view: 'intro', startedAt: '2026-11-26T00:00:00.000Z' } })), id);
    await page.reload({ waitUntil: 'networkidle' }); await page.locator('#resume').click(); await page.locator('[data-action=join]').click();
    await page.locator('[data-chip]').first().waitFor(); await page.waitForTimeout(400);
    // 칩마다 줄 수와, 줄 안의 글자 묶음이 칩 양 끝으로 벌어졌는지(마지막 줄 오른쪽 여백이 지나치게 작은지)를 잰다
    const m = await page.evaluate(() => [...document.querySelectorAll('[data-chip]')].map(b => { const lh = parseFloat(getComputedStyle(b).lineHeight) || 20; const r = document.createRange(); r.selectNodeContents(b); const rects = [...r.getClientRects()]; const lines = new Set(rects.map(x => Math.round(x.top))).size; return { lines, align: getComputedStyle(b).textAlign, jc: getComputedStyle(b).justifyContent, kids: b.childNodes.length, text: b.textContent.slice(0, 30) }; }));
    console.log(tag, id, JSON.stringify(m.filter(x => x.lines > 1)));
    const file = `${out}/${prefix}-${tag}-${id}.png`;
    if (only && !existsSync(file)) { await page.locator('[data-chip]').last().scrollIntoViewIfNeeded(); await page.screenshot({ path: file }); console.log('saved', file); }
  }
  await ctx.close();
}
// 대화가 이어진 뒤 AI가 준 긴 칩(행동 표시 *…*, 결정으로 이어지는 → 칩)
const LONG = [
  { text: '*고개를 끄덕이며* 그럼 오늘은 학교에 가지 말고 어머니를 도와 물을 길어 올게요', path: 'a' },
  { text: '선생님께 연락해서 숙제를 받아 올 수 있는지 먼저 물어볼래요', path: 'none' },
  { text: '*잠시 망설이다가* 동생이랑 같이 학교에 가고, 물은 저녁에 길어 오면 안 될까요?', path: 'b' }];
for (const [vw, vh, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
  const file = `${out}/${prefix}-${tag}-long.png`;
  if (existsSync(file)) { console.log('SKIP (exists)', file); continue; }
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: tag === 'mobile' ? 2 : 1, locale: 'ko-KR', hasTouch: tag === 'mobile', isMobile: tag === 'mobile' });
  const page = await ctx.newPage();
  await page.route('**/api/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ configured: true }) }));
  const chat0 = { log: [{ k: 'me', text: '오늘 학교에 꼭 가야 할까요?' }, { k: 'say', speaker: '어머니', text: '물이 떨어졌단다. 오늘은 네가 좀 도와줬으면 좋겠구나.' }], api: [], chips: LONG };
  const st = { completed: [], me: {}, run: { id: 'pakistan', step: 0, choices: [null, null, null], fields: {}, chats: [chat0, { log: [], api: [] }, { log: [], api: [] }], view: 'chat', startedAt: '2026-11-26T00:00:00.000Z' } };
  await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(k, v); sessionStorage.setItem('s', '1'); } }, ['global-life-lab-v1', JSON.stringify(st)]);
  await page.goto(url, { waitUntil: 'networkidle' }); await page.locator('#resume').click();
  await page.locator('[data-chip]').first().waitFor(); await page.waitForTimeout(500);
  const m = await page.evaluate(() => [...document.querySelectorAll('[data-chip]')].map(b => { const r = document.createRange(); r.selectNodeContents(b); const lines = new Set([...r.getClientRects()].map(x => Math.round(x.top))).size; return { lines, jc: getComputedStyle(b).justifyContent, kids: b.childNodes.length }; }));
  console.log(tag, 'long', JSON.stringify(m));
  await page.locator('[data-chip]').last().scrollIntoViewIfNeeded(); await page.screenshot({ path: file }); console.log('saved', file);
  await ctx.close();
}
await browser.close();
