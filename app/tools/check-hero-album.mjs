import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const out='../local-assets/screenshots/2026-11-26-hero-album';
const browser=await chromium.launch();
const errors=[];
const page=await browser.newPage({viewport:{width:1440,height:900}});
page.on('pageerror',e=>errors.push(e.message));
await page.route('**/api/**',r=>r.fulfill({status:404,body:''}));
await page.goto('http://127.0.0.1:4191/',{waitUntil:'networkidle'});
await page.waitForFunction(()=>document.querySelector('.album-track').style.animationPlayState==='running');
const geometry=await page.evaluate(()=>{
 const a=document.querySelector('.hero-album').getBoundingClientRect(),t=document.querySelector('.title-body').getBoundingClientRect();
 return {gap:a.left-t.right,heightDelta:Math.abs(a.height-t.height),topDelta:Math.abs(a.top-t.top),photoHeightDelta:Math.max(...[...document.querySelectorAll('.album-photo')].map(e=>Math.abs(e.getBoundingClientRect().height-t.height))),loaded:[...document.querySelectorAll('.album-group:first-child img')].every(i=>i.complete&&i.naturalWidth>0)};
});
assert(geometry.gap>0&&geometry.heightDelta<1&&geometry.topDelta<1&&geometry.loaded&&geometry.photoHeightDelta<1);
await page.locator('.album-toggle').click();
assert.equal(await page.locator('.album-toggle').getAttribute('aria-pressed'),'true');
const matrix=()=>page.locator('.album-track').evaluate(e=>getComputedStyle(e).transform);
const stopped=await matrix();await page.waitForTimeout(250);assert.equal(await matrix(),stopped);
const seen=new Set();
for(let i=0;i<4;i++){
 await page.locator('.album-track').evaluate((e,time)=>{e.getAnimations()[0].currentTime=time;},i*24000);
 await page.waitForTimeout(30);
 const visible=await page.evaluate(()=>{const w=document.querySelector('.album-window').getBoundingClientRect();return [...document.querySelectorAll('.album-photo')].filter(e=>{const r=e.getBoundingClientRect();return r.left<w.right&&r.right>w.left;}).map(e=>e.dataset.person);});
 visible.forEach(id=>seen.add(id));
 const file=`${out}/phase-${i}-desktop-aligned.png`;if(!fs.existsSync(file))await page.screenshot({path:file});
}
assert.equal(seen.size,12);
const seam=await page.evaluate(()=>{const e=document.querySelector('.album-track'),groups=e.children;return Math.abs(groups[1].getBoundingClientRect().left-groups[0].getBoundingClientRect().left-e.getBoundingClientRect().width/2);});assert(seam<.1);
await page.locator('.album-toggle').click();await page.waitForTimeout(100);const moving=await matrix();await page.waitForTimeout(150);assert.notEqual(await matrix(),moving);
await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('.album-toggle').getAttribute('aria-pressed')==='true');assert.equal(await page.locator('.album-toggle').getAttribute('aria-pressed'),'true');
await page.locator('.album-toggle').click();assert.equal(await page.locator('.album-toggle').getAttribute('aria-pressed'),'false');
await page.emulateMedia({reducedMotion:'no-preference'});
for(const width of [1920,1024,901,900,768,390,320]){
 await page.setViewportSize({width,height:900});await page.waitForTimeout(70);
 const layout=await page.evaluate(()=>{const a=document.querySelector('.hero-album').getBoundingClientRect(),t=document.querySelector('.title-body').getBoundingClientRect(),b=document.querySelector('[data-action="random"]').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth,overlap:a.left<t.right&&a.right>t.left&&a.top<t.bottom&&a.bottom>t.top,button:b.right<=innerWidth&&b.left>=0};});
 assert(!layout.overflow&&!layout.overlap&&layout.button,JSON.stringify({width,...layout}));
}
await page.setViewportSize({width:1440,height:900});
await page.locator('.title-actions [data-nav="atlas"]').click();assert.equal(await page.locator('.tile').count(),12);
await page.locator('.tile[data-start="tuvalu"]').click();await page.waitForTimeout(250);assert(await page.locator('body').innerText().then(t=>t.includes('시오네')));
await page.locator('#brand').click();assert.equal(await page.locator('.hero-album').count(),1);
await page.locator('[data-action="random"]').click();await page.getByRole('button',{name:'새로 시작',exact:true}).click();await page.waitForTimeout(300);assert.equal(await page.locator('.hero-album').count(),0);
assert.deepEqual(errors,[]);
console.log(JSON.stringify({result:'PASS',geometry,allPeople:[...seen],seam,checks:['pause/resume','reduced motion and override','7 viewport widths','atlas and character entry','home remount','game start','no JS errors']}));
await browser.close();
