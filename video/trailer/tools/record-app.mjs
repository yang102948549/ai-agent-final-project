// 트레일러용 앱 화면 녹화 REC-01~06 (video/TRAILER-PLAN.md 7.2절).
// 배포 사이트를 실제로 조작하며 Chrome 화면 전송(CDP screencast)으로 1440×900 프레임을 받아 30fps MP4로 만든다.
// 커서는 페이지에 그려 넣는다. AI 응답처럼 기다리는 동안은 녹화를 잠시 멈춰 빈 시간을 뺀다.
// 갤러리(REC-05)는 실제 학생 글이 찍히지 않도록 앱의 예시 데이터(app/tools/gallery-mock.mjs)로 가로챈다.
// 사용(저장소 루트): node video/trailer/tools/record-app.mjs [REC-01 REC-03 ...]
// 출력: local-assets/video/app-recordings/REC-0N.mp4 (원본) → video/trailer/assets/app/REC-0N.mp4 (트레일러용 복사본)
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync, rmSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '../../..');
const { chromium } = createRequire(join(ROOT, 'app/package.json'))('playwright');
const { mockGallery } = await import(pathToFileURL(join(ROOT, 'app/tools/gallery-mock.mjs')).href);
const URL = 'https://onischool.net/anotherday/';
const KEY = 'global-life-lab-v1';
const RAW = join(ROOT, 'local-assets/video/app-recordings');
const OUT = join(ROOT, 'video/trailer/assets/app');
mkdirSync(RAW, { recursive: true }); mkdirSync(OUT, { recursive: true });

const CURSOR = `
addEventListener('DOMContentLoaded', () => {
  const c = document.createElement('div');
  c.id = '__rec_cursor';
  c.style.cssText = 'position:fixed;left:0;top:0;width:26px;height:26px;z-index:2147483647;pointer-events:none;transform:translate(-200px,-200px)';
  c.innerHTML = '<svg viewBox="0 0 26 26" width="26" height="26" style="transition:transform .12s;transform-origin:4px 3px"><path d="M4 3 L4 21 L9 16.5 L12.5 24 L15.5 22.6 L12 15.3 L19 15.3 Z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  document.body.appendChild(c);
  addEventListener('mousemove', e => { c.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; }, true);
  addEventListener('mousedown', () => { c.firstChild.style.transform = 'scale(.82)'; }, true);
  addEventListener('mouseup', () => { c.firstChild.style.transform = ''; }, true);
});`;

const sleep = ms => new Promise(r => setTimeout(r, ms));
const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function recorder(page) {
  let cdp, frames = [], paused = false, pauseAt = 0, shift = 0, last = null;
  const pos = { x: 1200, y: 760 };
  return {
    pos,
    async start({ cursor = true } = {}) {
      cdp = await page.context().newCDPSession(page);
      cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
        cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
        if (paused) { last = { data, t: metadata.timestamp }; return; }
        frames.push({ data, t: metadata.timestamp - shift });
      });
      await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, maxWidth: 1440, maxHeight: 900, everyNthFrame: 1 });
      if (cursor) await page.mouse.move(pos.x, pos.y);
      this.t0 = Date.now() / 1000;
    },
    // 기다리는 동안(AI 응답 등) 녹화 멈춤: 멈춘 시간만큼 이후 프레임 시각을 당긴다
    pause() { paused = true; pauseAt = Date.now() / 1000; },
    resume() { shift += Date.now() / 1000 - pauseAt; paused = false; if (last) frames.push({ data: last.data, t: Date.now() / 1000 - shift }); },
    async glide(x, y, ms = 900) {
      const from = { ...pos }, n = Math.max(2, Math.round(ms / 16));
      for (let i = 1; i <= n; i++) {
        const k = ease(i / n);
        await page.mouse.move(from.x + (x - from.x) * k, from.y + (y - from.y) * k);
        await sleep(ms / n);
      }
      pos.x = x; pos.y = y;
    },
    async glideTo(locator, ms = 900) {
      const b = await locator.boundingBox();
      await this.glide(b.x + b.width * 0.45, b.y + b.height * 0.55, ms);
    },
    async click() { await page.mouse.down(); await sleep(110); await page.mouse.up(); },
    async scroll(dy, ms = 2500) {
      const n = Math.round(ms / 16), done = { v: 0 };
      for (let i = 1; i <= n; i++) {
        const target = dy * ease(i / n);
        await page.mouse.wheel(0, target - done.v); done.v = target;
        await sleep(ms / n);
      }
    },
    async stop(name) {
      const end = Date.now() / 1000 - shift;
      await cdp.send('Page.stopScreencast');
      const dir = join(RAW, `${name}-frames`);
      rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
      const list = [];
      frames.forEach((f, i) => {
        const file = join(dir, `${String(i).padStart(5, '0')}.jpg`);
        writeFileSync(file, Buffer.from(f.data, 'base64'));
        const next = i + 1 < frames.length ? frames[i + 1].t : end;
        list.push(`file '${file.replace(/\\/g, '/')}'`, `duration ${Math.max(0.001, next - f.t).toFixed(4)}`);
      });
      list.push(`file '${join(dir, `${String(frames.length - 1).padStart(5, '0')}.jpg`).replace(/\\/g, '/')}'`);
      writeFileSync(join(dir, 'list.txt'), list.join('\n'));
      const mp4 = join(RAW, `${name}.mp4`);
      execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', join(dir, 'list.txt'),
        '-vf', 'fps=30,scale=1440:900:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-crf', '14', '-preset', 'slow', '-movflags', '+faststart', mp4]);
      rmSync(dir, { recursive: true, force: true });
      copyFileSync(mp4, join(OUT, `${name}.mp4`));
      console.log(name, `${frames.length} frames, ${(end - this.t0).toFixed(1)}s →`, mp4);
    },
  };
}

async function session(name, { state, routes } = {}, body) {
  const browser = await chromium.launch({ channel: 'chrome' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'ko-KR' });
  const page = await ctx.newPage();
  await page.addInitScript(CURSOR);
  if (state) await page.addInitScript(([k, v]) => { if (!sessionStorage.getItem('rec')) { localStorage.setItem(k, v); sessionStorage.setItem('rec', '1'); } }, [KEY, JSON.stringify(state)]);
  if (routes) await routes(page);
  const rec = recorder(page);
  await body(page, rec);
  await rec.stop(name);
  await browser.close();
}

const run = (id, step, choices, view, extra = {}) => ({ completed: [], me: {}, run: { id, step, choices, fields: {}, chats: [0, 1, 2].map(() => ({ log: [], api: [] })), view, startedAt: '2026-11-27T00:00:00.000Z', ...extra } });

const ARTICLE = {
  question: '바이투푸섬에는 바닷물이 얼마나 들어오고 있을까?',
  notes: '투발루는 해발이 낮아 큰 파도가 오면 바닷물이 땅으로 스며든다 (UN 뉴스). 해안을 지키는 사업이 진행 중이다 (UNDP).',
  feeling: '시오네가 학교와 가족 일 가운데 하나를 골라야 했던 장면이 가장 마음에 남았다.',
  constraint: '어느 쪽을 골라도 바닷물이 들어오는 집과 학교 가는 길은 그대로였다.',
  format: 'article',
  a_title: '바닷물에 잠기는 섬, 학교 가는 길도 사라진다',
  a_lead: '투발루의 바이투푸섬에서 중학생 시오네 씨는 큰 파도가 올 때마다 바닷물이 차올라 학교에 가기 어려워지고 있다. 섬의 땅이 바다보다 조금밖에 높지 않기 때문이다.',
  a_body: 'UN 뉴스 자료에 따르면 투발루는 해발이 낮아 큰 파도가 오면 바닷물이 땅으로 스며든다. 바닷물이 들어온 밭에서는 빵나무와 채소가 잘 자라지 않는다.\n시오네 씨는 “할머니가 심은 빵나무가 있는 이 섬을 떠나고 싶지 않다”라고 말했다.',
  a_end: '이 섬의 아이들이 학교에 계속 다니려면 해안을 지키는 사업이 더 빨리 퍼져야 한다. 우리는 멀리 있는 섬의 일을 어떻게 함께 책임질 수 있을까?',
};

const JOBS = {
  // S3 앱 공개: 캐릭터 고르기(열두 명의 하루) 화면을 천천히 훑는다
  'REC-01': () => session('REC-01', {}, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('nav [data-nav=atlas]').click(); await page.waitForTimeout(1500);
    await rec.start(); await sleep(500);
    await rec.glide(720, 520, 1400);
    await rec.scroll(430, 3200);
    await rec.glide(560, 470, 1000); await sleep(900);
  }),
  // S4 고르기: 아시프 낮 「멈춰 버린 선풍기」, A 버튼을 누른다 (AI 미연결 상태 = 바로 고르는 화면)
  'REC-02': () => session('REC-02', {
    state: run('pakistan', 1, [0, null, null], 'chat'),
    routes: p => p.route('**/api/chat', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"configured":false}' })),
  }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click(); await page.waitForTimeout(1500);
    await rec.start(); await sleep(1800);
    const a = page.locator('button', { hasText: '옆집에 어머니를 잠시 부탁한다' }).first();
    await rec.glideTo(a, 1500); await sleep(700);
    await rec.click(); await sleep(3000);
  }),
  // S5 AI 대화: 답 칩을 누르면 학생 말이 오르고 어머니의 실제 AI 대답이 이어진다
  'REC-03': () => session('REC-03', { state: run('pakistan', 1, [0, null, null], 'chat') }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click(); await page.locator('[data-chip]').first().waitFor(); await page.waitForTimeout(1200);
    await rec.start(); await sleep(800);
    const chip = page.locator('[data-chip]').first();
    const before = await chip.innerText();
    await rec.glideTo(chip, 1300); await sleep(500);
    await rec.click(); await sleep(900);
    rec.pause();
    await page.waitForFunction(t => { const c = document.querySelector('[data-chip]'); return c && c.innerText !== t; }, before, { timeout: 60000 });
    await page.waitForTimeout(400);
    rec.resume();
    const say = page.locator('.say, .bubble, [class*=say]').last();
    if (await say.count()) await say.scrollIntoViewIfNeeded().catch(() => {});
    await rec.glide(1250, 820, 1200); await sleep(2600);
  }),
  // S6 돌아보고 쓰기 (1): 돌아보기에서 바뀌지 않은 어려움을 쓴다
  'REC-04a': () => session('REC-04a', { state: run('tuvalu', 2, [0, 0, 0], 'reflect', { fields: { feeling: ARTICLE.feeling } }) }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click(); await page.locator('#reflection-form').waitFor(); await page.waitForTimeout(1200);
    const box = page.locator('#reflection-form textarea').nth(1);
    await box.scrollIntoViewIfNeeded(); await page.mouse.wheel(0, 320); await page.waitForTimeout(800);
    await rec.start(); await sleep(500);
    await rec.glideTo(box, 1200); await rec.click(); await sleep(300);
    await page.keyboard.type('어느 쪽을 골라도 바닷물이 들어오는 집은 그대로였다.', { delay: 70 });
    await sleep(900);
  }),
  // S6 돌아보고 쓰기 (2): 완성한 신문 기사 결과물
  'REC-04b': () => session('REC-04b', {
    state: { ...run('tuvalu', 2, [0, 0, 0], 'report', { fields: ARTICLE, finishedAt: '2026-11-27T05:00:00.000Z' }), me: { grade: '2', cls: '3', num: '4', name: '김하늘' } },
    routes: p => p.route('**/api/chat', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"configured":true}' })),
  }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click(); await page.locator('.doc').first().waitFor(); await page.waitForTimeout(1200);
    await page.locator('.doc').first().scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
    await rec.start(); await sleep(600);
    await rec.scroll(260, 2600); await sleep(800);
  }),
  // S7 갤러리: 예시 데이터로 결과물 카드를 보여 주고 하트를 누른다
  'REC-05': () => session('REC-05', { routes: p => mockGallery(p) }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('nav [data-nav=gallery]').click(); await page.waitForTimeout(1800);
    await rec.start(); await sleep(500);
    const heart = page.locator('[data-heart]').nth(2);
    if (await heart.count()) { await rec.glideTo(heart, 1600); await sleep(400); await rec.click(); }
    await sleep(2000);
  }),
  // S9 앱 첫 화면: 제목과 12명 사진 앨범이 흐른다(커서 없음)
  'REC-06': () => session('REC-06', {}, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' }); await page.waitForTimeout(2500);
    await rec.start({ cursor: false }); await sleep(5200);
  }),
};

const want = process.argv.slice(2);
for (const [name, job] of Object.entries(JOBS)) {
  if (want.length && !want.includes(name)) continue;
  await job();
}
