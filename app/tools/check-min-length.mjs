// 돌아보기 이후 입력 칸의 최소 글자 수 검사를 실제 화면에서 확인한다.
// 사용: node tools/check-min-length.mjs [--url http://127.0.0.1:4173/]
import { chromium } from 'playwright';
const i = process.argv.indexOf('--url');
const url = i > 0 ? process.argv[i + 1] : 'http://127.0.0.1:4173/';
const KEY = 'global-life-lab-v1';
const seed = { completed: [], me: { nickname: '테스트' }, run: { id: 'tuvalu', step: 2, choices: [0, 0, 0], view: 'reflect', fields: { nickname: '테스트' }, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z' } };
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ko-KR' })).newPage();
const errors = []; page.on('pageerror', e => errors.push(e.message));
await page.route('**/api/**', r => r.fulfill({ status: 404, body: '' }));
await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(k, v); sessionStorage.setItem('s', '1'); } }, [KEY, JSON.stringify(seed)]);
await page.goto(url, { waitUntil: 'networkidle' });
await page.locator('#resume').click();
const fails = []; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails.push(m); };
const dialogShown = async () => { const m = page.locator('.modal.dialog'); const v = await m.waitFor({ state: 'visible', timeout: 3000 }).then(() => true, () => false); const t = v ? await m.innerText() : ''; if (v) { await m.locator('[data-dlg="1"]').click(); await m.waitFor({ state: 'hidden', timeout: 3000 }); } await page.waitForTimeout(300); return t; };
const view = () => page.evaluate(k => JSON.parse(localStorage.getItem(k)).run.view, KEY);

// 돌아보기
ok(await page.getByText('무엇을 골라도 그대로였던 어려움은?').isVisible(), '돌아보기 두 번째 질문이 구체적인 문장으로 바뀜');
await page.fill('[data-field=feeling]', '가족');
ok((await page.locator('[data-count=feeling]').innerText()).includes('2 / 20자'), '글자 수 표시: 2 / 20자');
await page.locator('[data-starter="1"]').click();
ok((await page.inputValue('[data-field=constraint]')).startsWith('집에 돈이 부족해서'), '문장 틀을 누르면 칸에 들어감');
ok((await page.locator('[data-count=constraint]').innerText()).includes('빈칸'), '빈칸(____)이 남으면 안내');
await page.click('#reflection-form button[type=submit]');
ok((await dialogShown()).includes('20자'), '19자 이하·빈칸 남음이면 넘어가지 않고 안내');
ok(await view() === 'reflect', '돌아보기 화면에 머무름');
await page.fill('[data-field=feeling]', '가족과 함께 섬에서 계속 살아가는 평범한 하루');
await page.fill('[data-field=constraint]', '집에 돈이 부족해서, 수도로 이사하는 대신 섬에 남을 수밖에 없었다.');
ok(await page.locator('[data-count=feeling].ok').count() === 1, '20자를 넘으면 표시가 완료 상태로 바뀜');
await page.click('#reflection-form button[type=submit]');
await page.waitForTimeout(600);
ok(await view() === 'lab', '두 칸 모두 20자 이상이면 질문·조사로 이동');

// 질문·조사
await page.locator('[data-frame="1"]').click();
await page.click('[data-action=to-plan]');
ok((await dialogShown()).length > 0 && await view() === 'lab', '질문 빈칸·알게 된 것 부족이면 결과물로 못 감');
await page.fill('[data-field=question]', '시오네 같은 사람이 섬에 남으려면 정부가 무엇을 해야 할까?');
await page.fill('[data-field=notes]', '짧은 메모');
await page.click('[data-action=to-plan]');
ok(await view() === 'lab', '알게 된 것이 20자 미만이면 머무름'); await dialogShown();
await page.fill('[data-field=notes]', '투발루는 해발이 낮아 바닷물이 땅으로 스며든다 (UN 뉴스 자료)');
await page.click('[data-action=to-plan]'); await page.waitForTimeout(600);
ok(await view() === 'plan', '질문·알게 된 것 20자 이상이면 결과물로 이동');

// 결과물(편지: 받는 사람은 10자 기준)
await page.click('[data-format=letter]'); await page.waitForTimeout(300);
await page.fill('[data-field=l_to]', '투발루 정부 담당자님께');
ok(await page.locator('[data-count=l_to].ok').count() === 1, '받는 사람은 10자 기준');
await page.fill('[data-field=l_learned]', '바닷물이 땅으로 들어와요.');
await page.fill('[data-field=l_ask]', '높은 땅에 학교와 집을 지을 수 있도록 예산을 늘려 주세요.');
await page.fill('[data-field=l_me]', '친구들에게 알리기');
await page.click('#plan-form button[type=submit]');
ok((await dialogShown()).includes('3칸') && await view() === 'plan', '편지 세 칸(두 칸 20자 미만 + 보내는 사람 빈칸)이 부족하면 완성 안 됨');
await page.fill('[data-field=l_learned]', '해발이 낮은 섬이라 바닷물이 땅으로 들어와 농사와 식수가 어려워요.');
await page.fill('[data-field=l_me]', '우리 반 친구들에게 투발루의 상황을 알리는 글을 쓰겠습니다.');
await page.click('#plan-form button[type=submit]');
const t = await dialogShown(); console.log('  dialog:', t.replace(/\s+/g, ' ')); ok(t.length > 0 && await view() === 'plan', '보내는 사람이 비면 완성 안 됨');
await page.fill('[data-field=l_from]', '코피');
ok(await page.locator('[data-count=l_from].ok').count() === 1, '보내는 사람은 2자 기준');
await page.click('#plan-form button[type=submit]'); await page.waitForTimeout(600);
ok(await view() === 'report', '모든 칸 기준 충족 시 완성 화면으로 이동');
ok(!errors.length, 'JS 오류 없음 ' + errors.join(' | '));
await browser.close();
if (fails.length) { console.error(`FAIL ${fails.length}건`); process.exit(1); }
console.log('ALL PASS');
