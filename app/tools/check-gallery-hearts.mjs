// 갤러리 하트를 가짜 API(tools/gallery-mock.mjs)로 실제 화면에서 확인한다. 실제 갤러리에는 보내지 않는다.
// 사용: node tools/check-gallery-hearts.mjs [--url http://127.0.0.1:4173/]
import { chromium } from 'playwright';
import { mockGallery } from './gallery-mock.mjs';
const i = process.argv.indexOf('--url');
const url = i > 0 ? process.argv[i + 1] : 'http://127.0.0.1:4173/';
const browser = await chromium.launch();
const fails = []; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails.push(m); };
const errors = [];
async function open(opts = {}, ctxOpts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ko-KR', ...ctxOpts });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(e.message));
  const mock = await mockGallery(page, opts);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('nav [data-nav=gallery]').first().click();
  await page.locator('.gcard').first().waitFor();
  return { ctx, page, mock };
}
const heart = (page, key, scope = '.board') => page.locator(`${scope} [data-heart="${key}"]`);
const state = async (page, key, scope) => { const h = heart(page, key, scope); return { on: await h.evaluate(b => b.classList.contains('on')), n: Number(await h.locator('.heart-n').innerText()), pressed: await h.getAttribute('aria-pressed') }; };

// 1) 카드 하트
let { ctx, page, mock } = await open();
ok(await page.locator('.board [data-heart]').count() === 3, '카드마다 하트 버튼');
const voter = mock.calls[0]?.voter || '';
ok(/^[A-Za-z0-9-]{8,64}$/.test(voter), '목록을 부를 때 기기 번호(voter)를 함께 보냄');
let s = await state(page, '2-3-4');
ok(!s.on && s.n === 3 && s.pressed === 'false', '다른 친구들이 누른 하트 3개, 나는 아직 안 누름');
await heart(page, '2-3-4').click();
s = await state(page, '2-3-4');
ok(s.on && s.n === 4 && s.pressed === 'true', '누르면 빨간 하트, 4개');
ok(await heart(page, '2-3-4').evaluate(b => b.classList.contains('pop')), '누를 때 톡 튀는 애니메이션');
ok(mock.st['2-3-4'].has(voter), '서버(가짜)에 내 하트가 저장됨');
ok(await heart(page, '2-3-4').evaluate(b => getComputedStyle(b.querySelector('path')).fill) === 'rgb(237, 73, 86)', '켜진 하트는 인스타그램 빨강으로 채워짐');
await page.waitForTimeout(300);
await heart(page, '2-3-4').click(); await page.waitForTimeout(300);
s = await state(page, '2-3-4');
ok(!s.on && s.n === 3 && !mock.st['2-3-4'].has(voter), '다시 누르면 취소되어 3개');
// 하트를 눌러도 카드가 열리지 않음
ok(await page.locator('#modal').isHidden(), '하트를 눌러도 결과물 크게 보기가 열리지 않음');

// 2) 크게 보기: 하트 버튼과 두 번 톡
await page.locator('[data-open="2-3-11"]').click(); await page.waitForTimeout(400);
ok(await page.locator('#modal [data-heart="2-3-11"]').isVisible(), '크게 보기 위쪽 막대에 하트');
const doc = page.locator('#modal [data-tap="2-3-11"]');
const box = await doc.boundingBox();
await page.mouse.click(box.x + box.width / 2, box.y + 200);
await page.mouse.click(box.x + box.width / 2, box.y + 200);
ok(await page.locator('.heart-burst').count() === 1, '두 번 톡 누르면 가운데에 큰 하트가 핌');
await page.waitForTimeout(400);
s = await state(page, '2-3-11', '#modal');
ok(s.on && s.n === 2, '두 번 톡으로 하트가 켜짐 (1→2)');
ok((await state(page, '2-3-11')).on, '뒤에 있는 카드 하트도 같이 바뀜');
await page.waitForTimeout(400);
await page.mouse.click(box.x + box.width / 2, box.y + 200);
await page.mouse.click(box.x + box.width / 2, box.y + 200);
await page.waitForTimeout(400);
ok((await state(page, '2-3-11', '#modal')).n === 2, '이미 켜진 하트는 두 번 톡해도 꺼지지 않음 (인스타그램과 같음)');
await page.waitForTimeout(1000);
ok(await page.locator('.heart-burst').count() === 0, '큰 하트는 잠시 뒤 사라짐');
await page.mouse.click(box.x + box.width / 2, box.y + 200); await page.waitForTimeout(500);
await page.mouse.click(box.x + box.width / 2, box.y + 200); await page.waitForTimeout(400);
ok((await state(page, '2-3-11', '#modal')).n === 2 && await page.locator('.heart-burst').count() === 0, '천천히 두 번 누르면 하트가 아님');
await page.locator('#modal [data-action=ai-skip]').click();

// 3) 새로고침해도 내 하트가 남음(같은 기기 번호)
await page.reload({ waitUntil: 'networkidle' });
await page.locator('nav [data-nav=gallery]').first().click(); await page.locator('.gcard').first().waitFor();
ok(mock.calls.filter(c => c.action === 'list').every(c => c.voter === voter), '새로고침해도 같은 기기 번호');
s = await state(page, '2-3-11');
ok(s.on && s.n === 2, '새로고침해도 내가 누른 하트가 켜져 있음');
// 기록 지우기를 해도 기기 번호는 남음
await page.evaluate(() => localStorage.removeItem('global-life-lab-v1'));
ok(await page.evaluate(() => localStorage.getItem('anotherday-voter')) === voter, '진행 기록과 따로 저장되어 기록을 지워도 하트 기기 번호는 그대로');
await ctx.close();

// 4) 저장 실패: 되돌리고 알림
({ ctx, page, mock } = await open({ failHeart: true }));
await heart(page, '2-4-7').click(); await page.waitForTimeout(500);
s = await state(page, '2-4-7');
ok(!s.on && s.n === 0, '저장에 실패하면 하트를 원래대로 되돌림');
ok((await page.locator('#toast').innerText()).includes('하트를 저장하지 못했어요'), '실패하면 안내 문구');
await ctx.close();

// 5) 모바일: 카드 하트 크기와 누르기
({ ctx, page, mock } = await open({}, { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }));
const hb = await heart(page, '2-3-4').boundingBox();
ok(hb.width >= 40 && hb.height >= 40, `모바일 하트 누르는 칸 40px 이상 (${Math.round(hb.width)}×${Math.round(hb.height)})`);
await heart(page, '2-3-4').tap(); await page.waitForTimeout(300);
ok((await state(page, '2-3-4')).on, '모바일에서 톡 누르면 켜짐');
await ctx.close();

ok(!errors.length, 'JS 오류 없음 ' + errors.join(' | '));
await browser.close();
if (fails.length) { console.error(`FAIL ${fails.length}건`); process.exit(1); }
console.log('ALL PASS');
