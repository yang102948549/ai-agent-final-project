// 완성 화면의 신문 기사 배치: 왼쪽 인물 사진·바람, 오른쪽 학생 본문(한 단), 함께 생각해 볼 것은 그 아래. 좁은 화면에서는 차례로 쌓인다.
// 세 형식 모두 가로로 넘치지 않는지도 본다. 사용: node tools/check-doc-layout.mjs [--url http://127.0.0.1:4173/]
import { chromium } from 'playwright';
const i = process.argv.indexOf('--url');
const url = i > 0 ? process.argv[i + 1] : 'http://127.0.0.1:4173/';
const KEY = 'global-life-lab-v1';
const fails = []; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails.push(m); };
const F = { article: { format: 'article', a_title: '제목', a_lead: '리드', a_body: '첫 문단입니다.\n둘째 문단입니다.', a_end: '함께 생각할 질문' },
  policy: { format: 'policy', p_to: '정부', p_title: '제안', p_problem: '문제', p_plan: '계획', p_limit: '보완' },
  letter: { format: 'letter', l_to: '담당자님께', l_open: '안녕', l_learned: '배움', l_ask: '부탁', l_me: '나', l_from: '김하늘' } };
const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
for (const w of [1440, 390]) for (const [k, f] of Object.entries(F)) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } }); const page = await ctx.newPage();
  const s = { completed: [], me: {}, run: { id: 'tuvalu', step: 2, choices: [0, 0, 0], view: 'report', fields: f, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z' } };
  await page.addInitScript(([a, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(a, v); sessionStorage.setItem('s', '1'); } }, [KEY, JSON.stringify(s)]);
  await page.goto(url, { waitUntil: 'networkidle' }); await page.locator('#resume').click(); await page.locator('.doc').waitFor(); await page.waitForTimeout(300);
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${w}px ${k}: 가로 넘침 없음`);
  if (k !== 'article') { await ctx.close(); continue; }
  const r = await page.evaluate(() => { const b = s => document.querySelector(s)?.getBoundingClientRect(); return { side: b('.np-side'), story: b('.np-story'), quote: b('.np-side .np-quote'), photo: b('.np-side .np-photo'), op: b('.np-opinion'), spread: b('.np-spread'), cols: document.querySelectorAll('.np-story p').length, inStory: !!document.querySelector('.np-story .np-photo, .np-story .np-quote, .np-story .np-opinion') }; });
  ok(r.quote && r.photo && r.quote.top >= r.photo.bottom, `${w}px: 인물 바람이 사진 아래`);
  ok(r.cols === 2 && !r.inStory, `${w}px: 본문 칸에는 학생 글만`);
  ok(r.op.top >= r.spread.bottom, `${w}px: 함께 생각해 볼 것은 사진·본문 아래`);
  if (w === 1440) ok(r.story.left >= r.side.right && Math.abs(r.story.top - r.side.top) < 2, '1440px: 학생 본문이 인물 오른쪽');
  else ok(r.story.top >= r.side.bottom, '390px: 사진 → 바람 → 본문 차례로 쌓임');
  await ctx.close();
}
await browser.close();
console.log(fails.length ? `FAILED ${fails.length}` : 'ALL PASS'); process.exit(fails.length ? 1 : 0);
