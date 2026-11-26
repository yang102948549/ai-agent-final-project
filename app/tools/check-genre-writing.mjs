// 글의 종류를 먼저 고르고 그 글답게 쓰도록 안내하는 흐름을 실제 화면에서 확인한다.
// 사용: node tools/check-genre-writing.mjs [--url http://127.0.0.1:4173/]
import { chromium } from 'playwright';
const i = process.argv.indexOf('--url');
const url = i > 0 ? process.argv[i + 1] : 'http://127.0.0.1:4173/';
const KEY = 'global-life-lab-v1';
const base = { feeling: '가족과 함께 섬에서 계속 살아가는 평범한 하루', constraint: '집에 돈이 부족해서, 수도로 이사하는 대신 섬에 남을 수밖에 없었다.' };
const seedOf = (fields, view = 'lab') => ({ completed: [], me: {}, run: { id: 'tuvalu', step: 2, choices: [0, 0, 0], view, fields: { ...base, ...fields }, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z' } });
const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
const fails = []; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails.push(m); };
const errors = [];
async function open(seed) {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ko-KR' })).newPage();
  page.on('pageerror', e => errors.push(e.message));
  await page.route('**/api/**', r => r.fulfill({ status: 404, body: '' }));
  await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(k, v); sessionStorage.setItem('s', '1'); } }, [KEY, JSON.stringify(seed)]);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('#resume').click(); await page.waitForTimeout(300);
  return page;
}

// 1) 질문·조사: 종류를 먼저 고르고, 종류마다 질문 틀이 다르다
let page = await open(seedOf({}));
ok(await page.locator('.formats').isVisible() && await page.locator('.pick-first').isVisible(), '질문·조사 맨 앞에 글 종류 고르기, 고르기 전엔 안내만');
const framesFor = async k => { await page.click(`[data-format=${k}]`); await page.waitForTimeout(250); return page.locator('.sec .tips li').allInnerTexts(); };
const fa = await framesFor('article'), fp = await framesFor('policy'), fl = await framesFor('letter');
ok(fa.some(t => t.includes('숫자로')), '기사: 숫자로 답할 수 있게 묻는 조언');
ok(await page.locator('[data-frame]').count() === 0, '완성된 질문을 눌러 넣는 칩이 없고 조언만 보임');
ok(await page.locator('.sec h2', { hasText: '질문하고 알아보기' }).count() === 1 && await page.locator('.sec h2', { hasText: '나의 질문' }).count() === 0, '나의 질문과 알아보기가 한 단계로 합쳐짐');
ok(fp.some(t => t.includes('정책이나 지원')), '제안서: 이미 있는 정책과 부족한 점을 묻는 조언');
ok(fl.some(t => t.includes('편지를 받을 한 곳') && t.includes('투발루 정부')), '편지: 관련된 곳 가운데 받을 사람부터 정하라는 조언');
ok((await page.locator('[data-field=notes]').locator('xpath=..').innerText()).includes('편지 받을 사람'), '알게 된 것 안내도 종류에 맞게 바뀜');
await page.close();

// 2) 결과물: 고른 종류로 바로 쓰고, 문장 틀과 글의 성격 체크가 동작한다
const research = { question: '시오네 같은 사람이 섬에 남으려면 정부가 무엇을 해야 할까?', notes: '투발루는 해발이 낮아 바닷물이 땅으로 스며든다 (UN 뉴스 자료)' };
page = await open(seedOf({ ...research, format: 'article' }, 'plan'));
ok(await page.locator('.genre-head').innerText().then(t => t.includes('신문 기사') && t.includes('~했다')), '결과물 첫머리에 고른 글과 그 말투 안내');
ok(await page.locator('.formats').count() === 0, '이미 고른 종류는 다시 고르지 않음');
ok((await page.locator('h1').innerText()).includes('신문을 펼친 많은 사람'), '제목에 읽는 사람이 드러남');
const sum = async () => { const n = await page.locator('.gc-sum b').innerText(); const miss = await page.locator('.gc-list li:not(.ok)').allInnerTexts(); if (miss.length) console.log('  아직:', miss.join(' / ').replace(/s+/g, ' ')); return n; };
ok(await sum() === '0', '빈 기사는 성격 체크 0개');
ok(await page.locator('[data-gstarter]').count() === 0 && await page.locator('.part .tips').count() === 4, '칸마다 눌러 넣는 예시 문장 대신 쓰는 조언');
ok((await page.locator('.part').nth(1).locator('.tips').innerText()).includes('누가, 어디서, 무엇을'), '첫 문단 조언: 누가·어디서·무엇을');
ok(!(await page.locator('.desk').innerText()).includes('____') && !(await page.locator('.desk').innerText()).includes('리드'), '결과물 칸에 빈칸과 ‘리드’ 용어가 없음');
await page.fill('[data-field=a_title]', '바닷물에 잠기는 섬, 학교 가는 길도 사라진다');
await page.fill('[data-field=a_lead]', '투발루의 바이투푸섬에서 시오네 씨는 바닷물이 차올라 학교에 가기 어려워지고 있다.');
await page.fill('[data-field=a_body]', 'UN 뉴스 자료에 따르면 투발루는 해발이 낮아 바닷물이 땅으로 스며든다. 시오네 씨는 “섬을 떠나고 싶지 않다”라고 말했다.');
await page.fill('[data-field=a_end]', '이 섬의 아이들이 학교에 계속 다니려면 국제 사회의 지원이 필요하다.');
ok(await sum() === '6', '기사답게 쓰면 성격 체크 6/6이 바로 갱신됨');
await page.fill('[data-field=a_end]', '저는 이 섬의 아이들이 학교에 계속 다니려면 지원이 필요하다고 생각해요.');
ok(await sum() === '5', '맺음에 ‘저는’이 들어가면 기자 자신의 말 기준이 빠짐 (6→5)');
// 다른 글로 바꾸기
await page.click('[data-action=format-change]'); await page.waitForTimeout(300);
ok(await page.locator('.formats').isVisible(), '‘다른 글로 바꾸기’를 누르면 종류 고르기가 다시 나옴');
await page.click('[data-format=policy]'); await page.waitForTimeout(300);
ok(await page.locator('[data-field=p_to]').count() === 1 && await page.locator('.part-no').count() === 5, '제안서: 수신 칸 포함 다섯 부분');
await page.fill('[data-field=p_to]', '투발루 정부');
await page.fill('[data-field=p_title]', '높은 지대 학교 이전 예산 지원');
await page.fill('[data-field=p_problem]', '바이투푸섬에서는 아이들이 교육받을 권리를 누리지 못하고 있다. UN 뉴스 자료에 따르면 바닷물이 땅으로 스며든다.');
await page.fill('[data-field=p_plan]', '투발루 정부는 학교를 높은 지대로 옮겨야 한다. 첫째, 예산을 마련한다. 둘째, 공사 기간에 임시 교실을 연다.');
await page.fill('[data-field=p_limit]', '비용이 많이 든다는 어려움이 있다. 그래서 국제 기금을 함께 쓰고, 주민 회의로 의견을 듣는다.');
ok(await sum() === '6', '제안서답게 쓰면 6/6');
await page.click('#plan-form button[type=submit]'); await page.waitForTimeout(600);
const doc = await page.locator('.doc-policy').innerText();
ok(doc.includes('투발루 정부') && !doc.includes('핵심 요약'), '완성 제안서: 수신에 내가 적은 기관, 칸에서 잘라 붙이던 핵심 요약은 없음');
await page.close();

// 3) 편지: 첫인사가 본문 맨 앞에 들어간다
page = await open(seedOf({ ...research, format: 'letter', l_to: '투발루 정부 담당자님께', l_open: '안녕하세요. 저는 한국의 중학생입니다. 수업에서 투발루를 알게 되어 편지를 씁니다.', l_learned: 'UN 뉴스 자료에 따르면 바닷물이 땅으로 스며들어 농사와 식수가 어렵습니다.', l_ask: '높은 땅에 학교를 지을 수 있도록 예산을 늘려 주시면 좋겠습니다.', l_me: '저도 친구들에게 알리겠습니다. 읽어 주셔서 감사합니다.', l_from: '김하늘' }, 'plan'));
ok(await sum() === '6', '편지답게 쓰면 6/6');
await page.click('#plan-form button[type=submit]'); await page.waitForTimeout(600);
const body = await page.locator('.lt-body p').allInnerTexts();
ok(body[0]?.startsWith('안녕하세요') && body.length === 4, '완성 편지: 첫인사 → 알게 된 것 → 부탁 → 다짐 순서');
await page.close();

// 4) 예전 기록: 첫인사·수신이 없던 결과물도 그대로 보인다
page = await open(seedOf({ ...research, format: 'policy', p_title: '높은 지대 학교 이전 예산 지원', p_problem: '문제 문단입니다. 근거가 있습니다.', p_plan: '제안 문단입니다.', p_limit: '보완 문단입니다.' }, 'report'));
ok((await page.locator('.pb-meta').innerText()).includes('수신'), '수신이 없던 예전 제안서는 기본 관련 주체로 표시');
await page.close();

ok(!errors.length, 'JS 오류 없음 ' + errors.join(' | '));
await browser.close();
if (fails.length) { console.error(`FAIL ${fails.length}건`); process.exit(1); }
console.log('ALL PASS');
