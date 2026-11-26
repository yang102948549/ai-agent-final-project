// 시작할 때 이름 입력 없이 바로 그 인물의 하루로 들어가는지, 결과물의 글쓴이가 제출 칸의 정보로 표시되는지 확인한다.
// 사용: node tools/check-no-nickname.mjs [--url http://127.0.0.1:4173/]
import { chromium } from 'playwright';
const i = process.argv.indexOf('--url');
const url = i > 0 ? process.argv[i + 1] : 'http://127.0.0.1:4173/';
const KEY = 'global-life-lab-v1';
const base = { id: 'ghana', step: 0, choices: [null, null, null], fields: {}, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z' };
const long = '해발이 낮은 섬이라 바닷물이 땅으로 들어와 농사와 식수가 어렵습니다.';
const browser = await chromium.launch();
const fails = []; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails.push(m); };
async function open(run, me) {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ko-KR' })).newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.route('**/api/**', r => r.fulfill({ status: 404, body: '' }));
  const seed = { completed: [], me, run };
  await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(k, v); sessionStorage.setItem('s', '1'); } }, [KEY, JSON.stringify(seed)]);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('#resume').click();
  return { page, errors };
}
// 1. 인물 소개 → 이 사람으로 시작 → 바로 아침 장면
{
  const { page, errors } = await open({ ...base, view: 'intro' }, {});
  await page.click('[data-action=join]');
  await page.waitForTimeout(800);
  ok(await page.locator('#join-name, #join-form').count() === 0, '이름 입력 팝업이 뜨지 않음');
  ok(await page.evaluate(k => JSON.parse(localStorage.getItem(k)).run.view, KEY) === 'chat', '바로 장면 화면으로 이동');
  ok(await page.locator('.choice').count() === 2, '아침 장면의 선택지 두 개가 보임');
  ok(await page.locator('.player').count() === 0, '초상 아래 플레이어 표시 없음');
  ok(!errors.length, 'JS 오류 없음 ' + errors.join(' | '));
}
// 2. 완성 화면: 제출 칸이 비면 익명, 채우면 학년·반·이름
const fields = { format: 'letter', question: long, notes: long, feeling: long, constraint: long, l_to: '가나 정부 담당자님께', l_learned: long, l_ask: long, l_me: long };
const done = { ...base, step: 2, choices: [0, 0, 0], view: 'report', fields };
{
  const { page } = await open(done, {});
  ok((await page.locator('.lt-from').innerText()).trim() === '코피 드림', '보내는 사람 칸이 없던 예전 편지는 인물 이름 “코피 드림”');
}
{
  const { page, errors } = await open(done, { grade: '2', cls: '3', num: '7', name: '홍길동' });
  ok((await page.locator('.lt-from').innerText()).trim() === '코피 드림', '제출 칸을 채워도 편지 서명은 “코피 드림”');
  ok(await page.locator('#submit-form [data-me=name]').inputValue() === '홍길동', '갤러리 제출 칸은 그대로 유지');
}
{
  const { page, errors } = await open({ ...done, fields: { ...fields, l_from: '2학년 3반 김하늘 드림' } }, {});
  ok((await page.locator('.lt-from').innerText()).trim() === '2학년 3반 김하늘 드림', '보내는 사람 칸을 쓰면 그 이름으로, “드림”은 한 번만');
  ok(!errors.length, 'JS 오류 없음 ' + errors.join(' | '));
}
await browser.close();
if (fails.length) { console.error(`FAIL ${fails.length}건`); process.exit(1); }
console.log('ALL PASS');
