// 피드백 대화에서 바로 글을 고치는 창을 확인한다.
// 사용: node tools/check-feedback-edit.mjs [--url http://127.0.0.1:4173/]
import { chromium } from 'playwright';
const i = process.argv.indexOf('--url');
const url = i > 0 ? process.argv[i + 1] : 'http://127.0.0.1:4173/';
const KEY = 'global-life-lab-v1';
const fails = [], errors = []; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails.push(m); };
const fields = { format: 'article', question: '바이투푸섬의 기후 변화 문제는 얼마나 심각할까?', notes: '해안 적응 사업이 진행 중이다 (UNDP 자료)',
  a_title: '바닷물에 잠기는 섬, 학교 가는 길도 사라진다', a_lead: '투발루의 바이투푸섬에서 시오네 씨는 바닷물이 차올라 학교에 가기 어려워지고 있다.',
  a_body: 'UNDP 자료에 따르면 해안을 지키는 사업이 진행 중이다. 시오네 씨는 “섬을 떠나고 싶지 않다”라고 말했다.', a_end: '이 섬의 아이들이 학교에 계속 다니려면 국제 사회의 지원이 필요하다.' };
const review = { log: [{ k: 'me', text: '제가 쓴 글이에요. 읽어 봐 주세요.' }, { k: 'say', speaker: '선생님', text: '본문에 숫자를 하나 넣어 볼까요?', chips: [] }], api: [] };
const seed = { completed: [], me: {}, run: { id: 'tuvalu', step: 2, choices: [0, 0, 0], view: 'plan', fields, review, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z' } };
const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
for (const [w, h, tag] of [[1440, 900, 'PC'], [390, 844, '모바일']]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h }, locale: 'ko-KR' })).newPage();
  page.on('pageerror', e => errors.push(e.message));
  let posted = null;
  await page.route('**/api/chat', r => {
    if (r.request().method() === 'GET') return r.fulfill({ status: 200, contentType: 'application/json', body: '{"configured":true}' });
    posted = r.request().postData();
    return r.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"busy"}' });
  });
  await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(k, v); sessionStorage.setItem('s', '1'); } }, [KEY, JSON.stringify(seed)]);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('#resume').click(); await page.waitForTimeout(400);
  await page.click('[data-action=rv-edit]'); await page.waitForTimeout(300);
  const m = page.locator('#modal .rv-edit');
  ok(await m.isVisible(), `${tag}: ‘피드백 보며 내 글 고치기’를 누르면 고치기 창이 열림`);
  ok((await m.locator('.rv-edit-fb').innerText()).includes('숫자를 하나 넣어'), `${tag}: 창 안에 받은 피드백이 함께 보임`);
  ok(await m.locator('textarea[data-field]').count() === 4, `${tag}: 글의 네 칸을 창 안에서 모두 고칠 수 있음`);
  const body = fields.a_body + ' 해수면은 해마다 약 5mm씩 오르고 있다.';
  await m.locator('[data-field=a_body]').fill(body);
  ok((await m.locator('[data-count=a_body]').innerText()).includes('좋아요'), `${tag}: 창 안에서도 글자 수가 갱신됨`);
  const sizes = await m.evaluate(el => { const r = el.getBoundingClientRect(); return [r.left >= 0, r.right <= innerWidth + 1, el.scrollWidth <= el.clientWidth + 1]; });
  ok(sizes.every(Boolean), `${tag}: 창이 화면을 넘지 않음`);
  await m.locator('.rv-edit-foot [data-action=rv-edit-close]').click(); await page.waitForTimeout(400);
  ok(await page.locator('#modal').isHidden(), `${tag}: 닫기로 창이 닫힘`);
  ok((await page.inputValue('#plan-form [data-field=a_body]')) === body, `${tag}: 닫은 뒤 결과물 화면에 고친 글이 그대로 반영`);
  ok(await page.evaluate(() => JSON.parse(localStorage.getItem('global-life-lab-v1')).run.fields.a_body.includes('5mm')), `${tag}: 고친 글이 저장됨`);
  await page.click('[data-action=rv-edit]'); await page.waitForTimeout(300);
  await page.click('[data-action=rv-edit-again]'); await page.waitForTimeout(1200);
  ok(posted && posted.includes('5mm'), `${tag}: ‘고친 글 다시 보여 주기’가 고친 글로 피드백을 요청함`);
  ok((await page.locator('#rv-log').innerText()).includes('고친 글을 다시 보여 줬어요'), `${tag}: 대화에 다시 보여 줬다는 표시`);
  await page.close();
}
await browser.close();
ok(!errors.length, 'JS 오류 없음 ' + errors.join(' | '));
console.log(fails.length ? `FAIL ${fails.length}` : 'ALL PASS'); process.exit(fails.length ? 1 : 0);
