// 완성 화면과 갤러리 크게 보기에서 신문 기사·정책 제안서·편지가 어떻게 보이는지 같은 조건으로 찍는다.
// 학생 글이 길 때 잘리거나 사진에 밀려 읽기 어려운지 보려고 실제 학생 글 길이(칸마다 2~4문장)의 예시 글을 쓴다.
// 사용: node tools/capture-docs.mjs --prefix before|after [--url ...] [--out 폴더]
// 파일: <prefix>-<desktop|mobile>-<article|policy|letter>.png(완성 화면 문서 전체), <prefix>-<desktop|mobile>-gallery-<형식>.png(갤러리 크게 보기 첫 화면)
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
import { mockGallery } from './gallery-mock.mjs';
const arg = k => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : null; };
const url = arg('url') || 'http://127.0.0.1:4173/', prefix = arg('prefix') || 'after';
const out = arg('out') || '../local-assets/screenshots/2026-11-26-doc-layout';
mkdirSync(out, { recursive: true });
const KEY = 'global-life-lab-v1';
const common = { question: '바이투푸섬에는 바닷물이 얼마나 들어오고 있을까?', notes: '투발루는 해발이 낮아 큰 파도가 오면 바닷물이 땅으로 스며든다 (UN 뉴스). 해안을 지키는 사업이 진행 중이다 (UNDP).', feeling: '시오네가 학교와 가족 일 가운데 하나를 골라야 했던 장면이 가장 마음에 남았다.', constraint: '바닷물이 들어오는 것은 시오네가 아무리 잘 골라도 막을 수 없는 일이었다.' };
const DRAFTS = {
  article: { format: 'article',
    a_title: '바닷물에 잠기는 섬, 학교 가는 길도 사라진다',
    a_lead: '투발루의 바이투푸섬에서 중학생 시오네 씨는 큰 파도가 올 때마다 바닷물이 차올라 학교에 가기 어려워지고 있다. 섬의 땅이 바다보다 조금밖에 높지 않기 때문이다.',
    a_body: 'UN 뉴스 자료에 따르면 투발루는 해발이 낮아 큰 파도가 오면 바닷물이 땅으로 스며든다. 바닷물이 들어온 밭에서는 빵나무와 채소가 잘 자라지 않는다.\n시오네 씨는 “할머니가 심은 빵나무가 있는 이 섬을 떠나고 싶지 않다”라고 말했다. 하지만 학교 운동장이 잠기는 날에는 수업이 멈추고, 가족은 다른 섬으로 옮길지 고민하고 있다.\nUNDP는 해안을 지키는 사업을 진행하고 있다. 바닷가에 돌과 모래로 둑을 쌓아 집과 학교를 지키는 일이다. 그러나 모든 마을에 둑이 생기려면 시간이 오래 걸린다.',
    a_end: '이 섬의 아이들이 학교에 계속 다니려면 해안을 지키는 사업이 더 빨리 퍼져야 한다. 우리는 멀리 있는 섬의 일을 어떻게 함께 책임질 수 있을까?' },
  policy: { format: 'policy', p_to: '투발루 정부 교육부', p_title: '바닷물이 들어와도 멈추지 않는 학교 만들기',
    p_problem: '바이투푸섬에서는 큰 파도가 오면 바닷물이 학교 운동장과 길까지 들어온다. UN 뉴스 자료에 따르면 투발루는 해발이 낮아 이런 일이 점점 잦아지고 있다. 그때마다 수업이 멈추고 학생들은 집에 머문다.',
    p_plan: '첫째, 학교 건물을 높은 곳으로 옮기거나 바닥을 높인다. 둘째, 바닷물이 들어오는 날에도 수업을 이어 갈 수 있도록 라디오 수업과 교재 꾸러미를 준비한다. 셋째, UNDP 해안 사업과 함께 학교 주변 둑을 먼저 쌓는다.',
    p_limit: '건물을 옮기려면 돈이 많이 든다. 그래서 기후재정 지원국과 국제기구의 지원을 함께 신청하고, 주민 회의에서 어디를 먼저 고칠지 정한다.' },
  letter: { format: 'letter', l_to: '기후재정 지원국 담당자님께',
    l_open: '안녕하세요. 저는 한국의 중학생입니다. 도덕 수업에서 투발루 바이투푸섬에 사는 시오네의 하루를 살아 보고 이 편지를 씁니다.',
    l_learned: '자료에 따르면 투발루는 해발이 낮아 큰 파도가 오면 바닷물이 땅으로 스며든다고 합니다. 시오네는 바닷물이 학교 운동장까지 들어와 수업을 못 하는 날이 있었습니다.',
    l_ask: '해안을 지키는 사업에 지원을 늘려 주시면 좋겠습니다. 특히 학교와 집이 많은 마을부터 둑을 쌓아 주시면 아이들이 계속 학교에 다닐 수 있습니다.',
    l_me: '저도 에너지를 아껴 쓰고, 친구들에게 투발루 이야기를 알리겠습니다. 읽어 주셔서 감사합니다.', l_from: '한국의 중학생 김하늘' },
};
const seed = fields => ({ completed: [], me: { grade: '2', cls: '3', num: '4', name: '김하늘' }, run: { id: 'tuvalu', step: 2, choices: [0, 0, 0], view: 'report', fields: { ...common, ...fields }, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z', finishedAt: '2026-11-26T05:00:00.000Z' } });
const GKEY = { article: '2-3-4', letter: '2-3-11', policy: '2-4-7' };
const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
for (const [vw, vh, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) for (const fmt of Object.keys(DRAFTS)) {
  const opts = { viewport: { width: vw, height: vh }, deviceScaleFactor: tag === 'mobile' ? 2 : 1, locale: 'ko-KR' };
  // 1) 완성 화면: 문서 전체를 한 장으로
  let file = `${out}/${prefix}-${tag}-${fmt}.png`;
  if (existsSync(file)) console.log('SKIP (exists)', file);
  else {
    const ctx = await browser.newContext(opts); const page = await ctx.newPage();
    await page.route('**/api/chat', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"configured":true}' }));
    await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('s')) { localStorage.setItem(k, v); sessionStorage.setItem('s', '1'); } }, [KEY, JSON.stringify(seed(DRAFTS[fmt]))]);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.locator('#resume').click(); await page.locator('.doc').first().waitFor(); await page.waitForTimeout(600);
    // 문서만 찍을 때 위에 붙은 메뉴 막대가 문서 윗부분을 덮지 않게 한다(실제 화면에서는 스크롤하면 보이는 부분).
    await page.addStyleTag({ content: '.topbar{position:static!important}' });
    await page.locator('.doc').first().screenshot({ path: file }); console.log('saved', file);
    await ctx.close();
  }
  // 2) 갤러리 크게 보기: 열었을 때 첫 화면
  file = `${out}/${prefix}-${tag}-gallery-${fmt}.png`;
  if (existsSync(file)) { console.log('SKIP (exists)', file); continue; }
  const ctx = await browser.newContext(opts); const page = await ctx.newPage();
  await mockGallery(page);
  await page.goto(url + '#gallery', { waitUntil: 'networkidle' });
  await page.locator('nav [data-nav=gallery]').first().click().catch(() => {});
  await page.locator(`[data-open="${GKEY[fmt]}"]`).click(); await page.locator('.work-view .doc').waitFor(); await page.waitForTimeout(800);
  await page.screenshot({ path: file }); console.log('saved', file);
  await ctx.close();
}
await browser.close();
