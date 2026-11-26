// 질문 칸 없이, AI에게 물은 말이 ‘내가 물어본 것’으로 기록되는지 확인한다.
// 사용: node tools/check-ask-record.mjs [--url http://127.0.0.1:4173/]
import { chromium } from 'playwright';
const i = process.argv.indexOf('--url');
const url = i > 0 ? process.argv[i + 1] : 'http://127.0.0.1:4173/';
const KEY = 'global-life-lab-v1';
const fails = [], errors = []; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails.push(m); };
const seed = { completed: [], me: {}, run: { id: 'haiti', step: 2, choices: [0, 0, 0], view: 'lab', fields: { format: 'policy', feeling: '가족이 함께 안전하게 사는 평범한 하루', constraint: '동네가 위험해서 집으로 돌아갈 수 없었다.' }, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z' } };
const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ko-KR' })).newPage();
page.on('pageerror', e => errors.push(e.message));
await page.route('**/api/chat', r => r.request().method() === 'GET'
  ? r.fulfill({ status: 200, contentType: 'application/json', body: '{"configured":true}' })
  : r.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"busy"}' }));
await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(k, v); sessionStorage.setItem('s', '1'); } }, [KEY, JSON.stringify(seed)]);
await page.goto(url, { waitUntil: 'networkidle' });
await page.locator('#resume').click(); await page.waitForTimeout(400);
ok(await page.locator('[data-field=question]').count() === 0, '질문·조사에 ‘내가 알아볼 질문’ 칸이 없음');
ok((await page.locator('.sec').nth(1).locator('.tips').innerText()).includes('정책이나 지원'), '조언이 AI 묻기 바로 위에 있음');
await page.fill('#ask', '구호 단체는 지금 어떤 지원을 해?'); await page.click('#ask-form button[type=submit]'); await page.waitForTimeout(800);
await page.fill('#ask', '그 지원에서 무엇이 부족해?'); await page.click('#ask-form button[type=submit]'); await page.waitForTimeout(800);
const q = await page.evaluate(k => JSON.parse(localStorage.getItem(k)).run.fields.question, KEY);
ok(q === '구호 단체는 지금 어떤 지원을 해?\n그 지원에서 무엇이 부족해?', 'AI에게 물은 두 질문이 차례대로 기록됨');
await page.fill('[data-field=notes]', '아이티에서는 폭력 때문에 많은 사람이 집을 떠났다 (WFP 자료)');
await page.click('[data-action=to-plan]'); await page.waitForTimeout(600);
ok(await page.evaluate(k => JSON.parse(localStorage.getItem(k)).run.view, KEY) === 'plan', '질문 칸 없이 알게 된 것만 채우면 결과물로 이동');
const box = await page.locator('.my-research').innerText();
ok(box.includes('내가 물어본 것') && box.includes('무엇이 부족해'), '결과물 화면에 ‘내가 물어본 것’이 보임');
await browser.close();
ok(!errors.length, 'JS 오류 없음 ' + errors.join(' | '));
console.log(fails.length ? `FAIL ${fails.length}` : 'ALL PASS'); process.exit(fails.length ? 1 : 0);
