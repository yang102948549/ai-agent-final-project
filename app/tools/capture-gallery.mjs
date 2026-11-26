// 갤러리 화면을 가짜 API(tools/gallery-mock.mjs)로 촬영한다. 실제 갤러리 데이터는 쓰지 않는다.
// 사용: node tools/capture-gallery.mjs --url <주소> --out <폴더> --name <before|after> [--suffix -open] [--open 2-3-4] [--like 2-3-4]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { mockGallery } from './gallery-mock.mjs';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []));
const { url, out, name } = args;
if (!url || !out || !name) { console.error('--url, --out, --name이 필요합니다.'); process.exit(1); }
const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const [kind, opts] of Object.entries(VIEWPORTS)) {
  const file = path.join(out, `${name}-${kind}${args.suffix || ''}.png`);
  if (fs.existsSync(file)) { console.error(`이미 있음, 건너뜀: ${file}`); continue; }
  const ctx = await browser.newContext({ ...opts, locale: 'ko-KR' });
  const page = await ctx.newPage();
  await mockGallery(page);
  await page.goto(url + '#gallery', { waitUntil: 'networkidle' });
  await page.locator('nav [data-nav=gallery]').first().click().catch(() => {});
  await page.locator('.gcard').first().waitFor({ timeout: 15000 });
  if (args.like) { await page.locator(`[data-heart="${args.like}"]`).first().click(); await page.waitForTimeout(700); }
  if (args.open) { await page.locator(`[data-open="${args.open}"]`).click(); await page.waitForTimeout(800); }
  await page.waitForTimeout(800);
  await page.screenshot({ path: file });
  const v = opts.viewport;
  console.log(`${file} · ${v.width * opts.deviceScaleFactor}×${v.height * opts.deviceScaleFactor}`);
  await ctx.close();
}
await browser.close();
