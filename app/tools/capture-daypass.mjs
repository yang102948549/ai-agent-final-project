// 장면 전환 화면(일과가 한 줄씩 지나가는 하늘)과 인물 소개 화면을 촬영한다. 미리 만든 일과·소개 문구를 고친 뒤 전후 비교에 쓴다.
// 사용: node tools/capture-daypass.mjs --url <주소> --out <폴더> --name <before|after>
// 촬영 장면은 아래 SHOTS. 기존 파일은 덮어쓰지 않는다.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []));
const { url, out, name } = args;
if (!url || !out || !name) { console.error('--url, --out, --name이 필요합니다.'); process.exit(1); }
const KEY = 'global-life-lab-v1';
const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
// pass: 이 장면에서 pick을 고르고 '다음 장면'을 눌러 전환 화면을 찍는다. profile: 그 인물의 소개 화면(intro)을 찍는다.
const SHOTS = [
  { suffix: '-tuvalu-pass-morning-b', pass: { id: 'tuvalu', step: 0, choices: [null, null, null], pick: 1 } },
  { suffix: '-tuvalu-pass-noon-aa', pass: { id: 'tuvalu', step: 1, choices: [0, null, null], pick: 0 } },
  { suffix: '-haiti-pass-evening-a', pass: { id: 'haiti', step: 2, choices: [0, 0, null], pick: 0 } },
  { suffix: '-tuvalu-profile', profile: 'tuvalu' },
];

fs.mkdirSync(out, { recursive: true });
// 이 컴퓨터에는 headless_shell 없이 전체 chromium만 깔려 있을 수 있다. PW_CHROME으로 실행 파일을 지정할 수 있다.
const browser = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
for (const shot of SHOTS) for (const [kind, opts] of Object.entries(VIEWPORTS)) {
  const file = path.join(out, `${name}-${kind}${shot.suffix}.png`);
  if (fs.existsSync(file)) { console.error(`이미 있음, 건너뜀: ${file}`); continue; }
  const ctx = await browser.newContext({ ...opts, locale: 'ko-KR' });
  const page = await ctx.newPage();
  await page.route('**/api/**', route => route.fulfill({ status: 404, body: '' }));
  const p = shot.pass || { id: shot.profile, step: 0, choices: [null, null, null] };
  const seed = { completed: [], me: { nickname: '테스트' }, run: { id: p.id, step: p.step, choices: p.choices, view: shot.pass ? 'chat' : 'intro', fields: { nickname: '테스트' }, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), startedAt: '2026-11-25T00:00:00.000Z' } };
  await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem(k, v); sessionStorage.setItem('seeded', '1'); } }, [KEY, JSON.stringify(seed)]);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('#resume').waitFor({ state: 'visible', timeout: 15000 });
  await page.locator('#resume').click();
  if (shot.pass) {
    await page.locator('.daypass').waitFor({ state: 'detached', timeout: 15000 });
    await page.locator(`[data-pick="${shot.pass.pick}"]`).click();
    await page.locator('[data-action="next-scene"]').first().click();
    await page.locator('.daypass').waitFor({ state: 'attached', timeout: 15000 });
    await page.waitForTimeout(3600); // 일과 세 줄이 모두 지나간 때
  } else {
    await page.waitForTimeout(1500);
  }
  await page.screenshot({ path: file });
  const v = opts.viewport;
  console.log(`${file} · ${v.width * opts.deviceScaleFactor}×${v.height * opts.deviceScaleFactor}`);
  await ctx.close();
}
await browser.close();
