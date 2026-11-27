// 트레일러 B안(코피) 앱 화면 고화질 녹화: REC-K1~K4, REC-K5~K7 (video/TRAILER-PLAN-KOFI.md · TRAILER-PLAN.md 3.1절/7.2절).
// 배포 사이트(https://onischool.net/anotherday/)를 실제로 조작하며 CDP screencast(PNG 2880×1800, 2x DPR)를 받아
// 30fps H.264 High CRF 10 MP4로 만든다. AI 응답 대기 시간은 녹화를 일시정지해 빈 시간을 뺀다.
// 사용(저장소 루트): node video/trailer/tools/record-app.mjs [REC-K1 REC-K2 ...]
// 출력: local-assets/video/app-recordings/REC-K*.mp4 (원본) → video/trailer/assets/app/REC-K*.mp4 (복사본)
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync, rmSync, copyFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../../..');
const { chromium } = createRequire(join(ROOT, 'app/package.json'))('playwright');
const URL = 'https://onischool.net/anotherday/';
const KEY = 'global-life-lab-v1';
const RAW = join(ROOT, 'local-assets/video/app-recordings');
const OUT = join(ROOT, 'video/trailer/assets/app');
mkdirSync(RAW, { recursive: true });
mkdirSync(OUT, { recursive: true });

function findFfmpeg() {
  if (process.env.FFMPEG && existsSync(process.env.FFMPEG)) return process.env.FFMPEG;
  const winget = join(process.env.LOCALAPPDATA || '', 'Microsoft/WinGet/Links/ffmpeg.exe');
  if (existsSync(winget)) return winget;
  return 'ffmpeg';
}
const FFMPEG = findFfmpeg();

const CURSOR = `
addEventListener('DOMContentLoaded', () => {
  const c = document.createElement('div');
  c.id = '__rec_cursor';
  c.style.cssText = 'position:fixed;left:0;top:0;width:28px;height:28px;z-index:2147483647;pointer-events:none;transform:translate(-200px,-200px)';
  c.innerHTML = '<svg viewBox="0 0 26 26" width="28" height="28" style="transition:transform .12s;transform-origin:4px 3px"><path d="M4 3 L4 21 L9 16.5 L12.5 24 L15.5 22.6 L12 15.3 L19 15.3 Z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  document.body.appendChild(c);
  addEventListener('mousemove', e => { c.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; }, true);
  addEventListener('mousedown', () => { c.firstChild.style.transform = 'scale(.82)'; }, true);
  addEventListener('mouseup', () => { c.firstChild.style.transform = ''; }, true);
});`;

const sleep = ms => new Promise(r => setTimeout(r, ms));
const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function recorder(page) {
  let cdp, frames = [], paused = false, pauseAt = 0, shift = 0, last = null;
  const pos = { x: 1220, y: 760 };
  return {
    pos,
    async start({ cursor = true } = {}) {
      cdp = await page.context().newCDPSession(page);
      cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
        cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
        if (paused) { last = { data, t: metadata.timestamp }; return; }
        frames.push({ data, t: metadata.timestamp - shift });
      });
      await cdp.send('Page.startScreencast', {
        format: 'png',
        maxWidth: 2880,
        maxHeight: 1800,
        everyNthFrame: 1,
      });
      if (cursor) await page.mouse.move(pos.x, pos.y);
      this.t0 = Date.now() / 1000;
    },
    pause() { paused = true; pauseAt = Date.now() / 1000; },
    resume() {
      shift += Date.now() / 1000 - pauseAt;
      paused = false;
      if (last) frames.push({ data: last.data, t: Date.now() / 1000 - shift });
    },
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
      await this.glide(b.x + b.width * 0.45, b.y + b.height * 0.52, ms);
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
      if (!frames.length) throw new Error(`${name}: captured 0 frames`);
      const dir = join(RAW, `${name}-frames`);
      rmSync(dir, { recursive: true, force: true });
      mkdirSync(dir, { recursive: true });
      const list = [];
      frames.forEach((f, i) => {
        const file = join(dir, `${String(i).padStart(5, '0')}.png`);
        writeFileSync(file, Buffer.from(f.data, 'base64'));
        const next = i + 1 < frames.length ? frames[i + 1].t : end;
        list.push(`file '${file.replace(/\\/g, '/')}'`, `duration ${Math.max(0.001, next - f.t).toFixed(4)}`);
      });
      list.push(`file '${join(dir, `${String(frames.length - 1).padStart(5, '0')}.png`).replace(/\\/g, '/')}'`);
      writeFileSync(join(dir, 'list.txt'), list.join('\n'));
      const mp4 = join(RAW, `${name}.mp4`);
      execFileSync(FFMPEG, [
        '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', join(dir, 'list.txt'),
        '-vf', 'fps=30,scale=2880:1800:flags=lanczos,format=yuv420p',
        '-c:v', 'libx264', '-profile:v', 'high', '-crf', '10', '-preset', 'slow', '-g', '30',
        '-movflags', '+faststart', mp4,
      ]);
      rmSync(dir, { recursive: true, force: true });
      copyFileSync(mp4, join(OUT, `${name}.mp4`));
      console.log(name, `${frames.length} frames, ${(end - this.t0).toFixed(1)}s →`, mp4);
    },
  };
}

async function session(name, { state, routes } = {}, body) {
  const browser = await chromium.launch({ channel: 'chrome' });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'ko-KR',
  });
  const page = await ctx.newPage();
  await page.addInitScript(CURSOR);
  if (state) {
    await page.addInitScript(([k, v]) => {
      if (!sessionStorage.getItem('rec')) {
        localStorage.setItem(k, v);
        sessionStorage.setItem('rec', '1');
      }
    }, [KEY, JSON.stringify(state)]);
  }
  if (routes) await routes(page);
  const rec = recorder(page);
  await body(page, rec);
  await rec.stop(name);
  await browser.close();
}

const run = (id, step, choices, view, extra = {}) => ({
  completed: [],
  me: {},
  run: {
    id, step, choices, fields: {},
    chats: [0, 1, 2].map(() => ({ log: [], api: [] })),
    view,
    startedAt: '2026-11-27T00:00:00.000Z',
    ...extra,
  },
});

const ARTICLE_SIONE = {
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

const POLICY_MARIAM = {
  question: '아프가니스탄 여학생들이 계속 배우려면 어떤 지원이 필요할까?',
  notes: '유네스코 자료에 따르면 6학년 이후 많은 여학생이 중등 교육을 받지 못하고 있다.',
  feeling: '공부하고 싶은데 학교 문이 닫혀 버린 마리암의 답답함이 오래 남았다.',
  constraint: '마리암이 어떤 선택을 해도 여학생의 학교를 막는 제도는 바뀌지 않았다.',
  format: 'policy',
  p_to: '유네스코',
  p_title: '여학생 원격 수업 지원',
  p_problem: '아프가니스탄에서는 6학년 이후 여학생이 학교에 다니지 못하고 있다. 유네스코 자료에 따르면 많은 여학생이 교육을 받지 못한다.',
  p_plan: '유네스코는 원격 수업을 지원해야 한다. 첫째, 라디오와 오프라인 강의를 연다. 둘째, 집에서 공부할 교재를 나눠 준다.',
  p_limit: '안전 문제가 생길 수 있다. 그래서 현지 주민 의견을 듣고 안전한 전달 방법을 함께 정한다.',
};

const LETTER_KOFI = {
  question: '카카오 농가 아이들은 왜 학교 대신 밭에 갈까?',
  notes: 'ILO 자료에 따르면 수확 감소와 가계 빈곤이 카카오 농가 아동 노동 위험을 키운다.',
  feeling: '시험과 아빠의 밭일 사이에서 어느 쪽을 골라도 마음이 무거웠다.',
  constraint: '어느 쪽을 골라도 일꾼을 쓸 돈이 없는 건 그대로였다.',
  format: 'letter',
  l_to: '초콜릿 회사 대표님께',
  l_open: '안녕하세요. 저는 한국의 중학생입니다. 도덕 수업에서 가나에 사는 열세 살 코피의 하루를 살아 보고 편지를 씁니다.',
  l_learned: '자료에 따르면 기후 변화로 수확이 줄고 소득이 모자라면 카카오 농가 아이들이 학교 대신 밭에서 일하는 경우가 많다고 합니다.',
  l_ask: '공정한 가격으로 카카오를 사 주시면 좋겠습니다. 그러면 농가가 일꾼을 쓸 수 있어 아이들이 계속 학교에 다닐 수 있습니다.',
  l_me: '저도 공정무역 초콜릿을 고르고 친구들에게 이야기를 나누겠습니다. 읽어 주셔서 감사합니다.',
  l_from: '박*준',
};

const JOBS = {
  // S4 장면과 대화: 코피 아침 「“오늘 하루만 같이 가자”」 → 첫 답 칩 클릭 → 아빠의 실제 AI 대답
  'REC-K1': () => session('REC-K1', {
    state: run('ghana', 0, [null, null, null], 'chat'),
  }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click();
    await page.locator('[data-chip]').first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(1200);
    await rec.start();
    await sleep(2200); // 본문이 충분히 보이는 구간
    const chip = page.locator('[data-chip]').first();
    const before = await chip.innerText();
    await rec.glideTo(chip, 1100);
    await sleep(300);
    await rec.click();
    await sleep(700);
    rec.pause();
    await page.waitForFunction(
      t => {
        const c = document.querySelector('[data-chip]');
        return c && c.innerText !== t;
      },
      before,
      { timeout: 60000 },
    );
    await page.waitForTimeout(400);
    rec.resume();
    const say = page.locator('.say, .bubble, [class*=say]').last();
    if (await say.count()) await say.scrollIntoViewIfNeeded().catch(() => {});
    await rec.glide(1240, 820, 900);
    await sleep(3200);
  }),

  // S7 웹앱에서 고르기: 코피 아침 선택 화면 → B(“학교에 갈게요…”) 클릭 → 결과 화면
  'REC-K2': () => session('REC-K2', {
    state: run('ghana', 0, [null, null, null], 'chat'),
    routes: p => p.route('**/api/chat', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"configured":false}' })),
  }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click();
    const b = page.locator('button', { hasText: '학교에 갈게요' }).first();
    await b.waitFor({ timeout: 15000 });
    await b.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await rec.start();
    await sleep(1600);
    await rec.glideTo(b, 1300);
    await sleep(400);
    await rec.click();
    await sleep(3800);
  }),

  // S8 돌아보기: 코피 돌아보기 화면 → “무엇을 골라도 그대로였던 어려움” 입력
  'REC-K3': () => session('REC-K3', {
    state: run('ghana', 2, [1, 0, 0], 'reflect', {
      fields: { feeling: '시험과 아빠의 밭일 사이에서 어느 쪽을 골라도 마음이 무거웠다.' },
    }),
  }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click();
    await page.locator('#reflection-form').waitFor({ timeout: 15000 });
    const box = page.locator('#reflection-form textarea').nth(1);
    await box.scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 260);
    await page.waitForTimeout(900);
    await rec.start();
    await sleep(700);
    await rec.glideTo(box, 1000);
    await rec.click();
    await sleep(250);
    await page.keyboard.type('어느 쪽을 골라도 일꾼을 쓸 돈이 없는 건 그대로였다.', { delay: 65 });
    await sleep(2800);
  }),

  // S9 질문과 AI 조사: 코피 질문·조사 화면 → 실제 AI 조사 도우미에게 질문 → 답과 원문 자료 표시
  'REC-K4': () => session('REC-K4', {
    state: run('ghana', 2, [1, 0, 0], 'lab', {
      fields: {
        format: 'letter',
        feeling: '시험과 아빠의 밭일 사이에서 어느 쪽을 골라도 마음이 무거웠다.',
        constraint: '어느 쪽을 골라도 일꾼을 쓸 돈이 없는 건 그대로였다.',
      },
    }),
  }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click();
    const ask = page.locator('#ask');
    await ask.waitFor({ timeout: 15000 });
    await ask.scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(1000);
    await ask.fill('카카오 농가 아이들은 왜 학교 대신 밭에 갈까?');
    await page.waitForTimeout(400);
    await rec.start();
    await sleep(1100);
    const submit = page.locator('#ask-form button[type=submit]');
    await rec.glideTo(submit, 1000);
    await sleep(300);
    await rec.click();
    await sleep(700);
    rec.pause();
    await page.waitForFunction(() => {
      const panel = document.querySelector('#ask-panel');
      if (!panel) return false;
      const bubbles = panel.querySelectorAll('.msg, .bubble, .say, .ai, [class*=reply], [class*=answer], p');
      const text = panel.innerText || '';
      return bubbles.length >= 2 && text.length > 80 && !text.includes('찾고 있') && !text.includes('답을 준비');
    }, { timeout: 60000 });
    await page.waitForTimeout(600);
    rec.resume();
    await page.locator('#ask-panel').scrollIntoViewIfNeeded().catch(() => {});
    await rec.glide(1260, 820, 800);
    await sleep(3800);
  }),

  // S11 세 가지 글 ① 신문 기사 (시오네)
  'REC-K5': () => session('REC-K5', {
    state: {
      ...run('tuvalu', 2, [0, 0, 0], 'report', { fields: ARTICLE_SIONE, finishedAt: '2026-11-27T05:00:00.000Z' }),
      me: { grade: '2', cls: '3', num: '4', name: '김*늘' },
    },
    routes: p => p.route('**/api/chat', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"configured":true}' })),
  }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click();
    await page.locator('.doc').first().waitFor({ timeout: 15000 });
    await page.locator('.doc').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await rec.start({ cursor: false });
    await sleep(1200);
    await rec.scroll(220, 2600);
    await sleep(2200);
  }),

  // S11 세 가지 글 ② 정책 제안서 (마리암)
  'REC-K6': () => session('REC-K6', {
    state: {
      ...run('afghanistan', 2, [1, 0, 1], 'report', { fields: POLICY_MARIAM, finishedAt: '2026-11-27T05:00:00.000Z' }),
      me: { grade: '2', cls: '4', num: '7', name: '이*아' },
    },
    routes: p => p.route('**/api/chat', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"configured":true}' })),
  }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click();
    await page.locator('.doc').first().waitFor({ timeout: 15000 });
    await page.locator('.doc').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await rec.start({ cursor: false });
    await sleep(1200);
    await rec.scroll(220, 2600);
    await sleep(2200);
  }),

  // S11 세 가지 글 ③ 편지 (코피)
  'REC-K7': () => session('REC-K7', {
    state: {
      ...run('ghana', 2, [1, 0, 0], 'report', { fields: LETTER_KOFI, finishedAt: '2026-11-27T05:00:00.000Z' }),
      me: { grade: '2', cls: '3', num: '11', name: '박*준' },
    },
    routes: p => p.route('**/api/chat', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"configured":true}' })),
  }, async (page, rec) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.locator('#resume').click();
    await page.locator('.doc').first().waitFor({ timeout: 15000 });
    await page.locator('.doc').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await rec.start({ cursor: false });
    await sleep(1200);
    await rec.scroll(220, 2600);
    await sleep(2200);
  }),
};

const want = process.argv.slice(2);
for (const [name, job] of Object.entries(JOBS)) {
  if (want.length && !want.includes(name)) continue;
  await job();
}
