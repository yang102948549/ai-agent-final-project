// 문장 틀 대신 쓰는 법 조언, 피드백 대화에서 바로 고치기 화면을 같은 조건으로 찍는다.
// 사용: node tools/capture-coach.mjs --prefix before|after [--url ...] [--out 폴더]
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
const arg = k => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : null; };
const url = arg('url') || 'http://127.0.0.1:4173/', prefix = arg('prefix') || 'after';
const out = arg('out') || '../local-assets/screenshots/2026-11-26-writing-coach';
mkdirSync(out, { recursive: true });
const KEY = 'global-life-lab-v1';
const draft = { format: 'article', question: '바이투푸섬의 기후 변화 문제는 얼마나 심각할까?', notes: '해안 적응 사업이 진행 중이다 (UNDP 자료)',
  a_title: '바닷물에 잠기는 섬, 학교 가는 길도 사라진다', a_lead: '투발루의 바이투푸섬에서 시오네 씨는 바닷물이 차올라 학교에 가기 어려워지고 있다.',
  a_body: 'UNDP 자료에 따르면 해안을 지키는 사업이 진행 중이다. 시오네 씨는 “섬을 떠나고 싶지 않다”라고 말했다.', a_end: '이 섬의 아이들이 학교에 계속 다니려면 국제 사회의 지원이 필요하다.' };
const review = { log: [{ k: 'me', text: '제가 쓴 글이에요. 읽어 봐 주세요.' },
  { k: 'say', speaker: '선생님', text: '첫 문단이 분명해요. 다만 본문에 숫자가 하나도 없어서, 바닷물이 얼마나 차올랐는지 독자가 짐작하기 어려워요. 자료에서 숫자 하나를 찾아 넣어 볼까요?', chips: ['숫자를 찾아볼게요', '어떤 숫자가 좋을까요?'] },
  { k: 'say', speaker: '시오네', text: '우리 학교 운동장도 큰 파도가 오면 잠겨요. 그 이야기도 들어가면 좋겠어요.' }], api: [] };
const seed = (view, fields, extra = {}) => ({ completed: [], me: {}, run: { id: 'tuvalu', step: 2, choices: [0, 0, 0], view, fields, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z', ...extra } });
const shots = [
  ['reflect', seed('reflect', {}), '.starters, .tips'],
  ['lab', seed('lab', { format: 'article' }), '#ask-panel, .tips'],
  ['plan', seed('plan', { format: 'article', question: draft.question, notes: draft.notes }), '.part'],
  ['review', seed('plan', draft, { review }), '#rv-panel'],
  ['review-edit', seed('plan', draft, { review }), '[data-action=rv-edit]', true],
];
const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
for (const [vw, vh, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) for (const [name, s, sel, click] of shots) {
  const file = `${out}/${prefix}-${tag}-${name}.png`;
  if (existsSync(file)) { console.log('SKIP (exists)', file); continue; }
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: tag === 'mobile' ? 2 : 1, locale: 'ko-KR' });
  const page = await ctx.newPage();
  await page.route('**/api/chat', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"configured":true}' }));
  await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(k, v); sessionStorage.setItem('s', '1'); } }, [KEY, JSON.stringify(s)]);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('#resume').click(); await page.waitForTimeout(500);
  const el = page.locator(sel).first();
  if (!(await el.count())) { console.log('MISSING', name, sel); await ctx.close(); continue; }
  if (click) { await el.click(); await page.waitForTimeout(400); }
  else { await el.scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, -140)); await page.waitForTimeout(200); }
  await page.screenshot({ path: file }); console.log('saved', file);
  await ctx.close();
}
await browser.close();
