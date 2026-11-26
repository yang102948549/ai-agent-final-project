// 화면 증거 촬영: 같은 경로·화면 크기·테스트 데이터로 데스크톱과 모바일 PNG를 원본 해상도로 저장한다.
// 사용: node tools/capture.mjs --url <주소> --out <폴더> --name <before|after|baseline> [--run '{"id":"tuvalu","step":1,"choices":[0,null,null]}'] [--suffix -path-b] [--click "선택자"] [--scroll "선택자"]
// --run을 주면 브라우저 저장소에 진행 상태를 넣고 장면(chat) 화면을 연다. 기존 파일은 덮어쓰지 않는다.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []));
const { url, out, name } = args;
if (!url || !out || !name) { console.error('--url, --out, --name이 필요합니다.'); process.exit(1); }
const suffix = args.suffix || '';
const KEY = 'global-life-lab-v1';
const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

let seed = null;
if (args.run) {
  const r = JSON.parse(args.run);
  seed = { completed: [], me: { nickname: '테스트' }, run: { view: 'chat', fields: { nickname: '테스트' }, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z', ...r } };
}

fs.mkdirSync(out, { recursive: true });
// Playwright 전용 브라우저가 아직 없을 때는 PW_CHROME에 다른 Chromium 실행 파일 경로를 줄 수 있다.
const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
for (const [kind, opts] of Object.entries(VIEWPORTS)) {
  const file = path.join(out, `${name}-${kind}${suffix}.png`);
  if (fs.existsSync(file)) { console.error(`이미 있음, 건너뜀: ${file}`); continue; }
  const ctx = await browser.newContext({ ...opts, locale: 'ko-KR' });
  const page = await ctx.newPage();
  // 로컬 서버에는 AI 서버 함수가 없다. 배포 주소에서도 촬영 중 AI 호출이 나가지 않도록 막는다.
  await page.route('**/api/**', route => route.fulfill({ status: 404, body: '' }));
  if (seed) await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem(k, v); sessionStorage.setItem('seeded', '1'); } }, [KEY, JSON.stringify(seed)]);
  await page.goto(url, { waitUntil: 'networkidle' });
  if (seed) {
    const resume = page.locator('#resume');
    await resume.waitFor({ state: 'visible', timeout: 15000 });
    await resume.click();
  }
  if (args.click) await page.locator(args.click).first().click();
  // --scroll: 아래쪽 부분(예: 쓰는 칸, 성격 체크)을 화면 맨 위로 올려 찍는다.
  if (args.scroll) await page.locator(args.scroll).first().evaluate(el => { el.scrollIntoView({ block: 'start' }); window.scrollBy(0, -16); });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: file });
  const v = opts.viewport;
  console.log(`${file} · ${v.width * opts.deviceScaleFactor}×${v.height * opts.deviceScaleFactor}`);
  await ctx.close();
}
await browser.close();
