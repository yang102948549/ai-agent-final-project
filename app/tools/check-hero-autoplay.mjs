import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const [url,out,phase='after']=process.argv.slice(2);
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch();
try {
for(const [kind,opts] of Object.entries({desktop:{viewport:{width:1440,height:900}},mobile:{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}})){
 const ctx=await browser.newContext({...opts,reducedMotion:'reduce'}),page=await ctx.newPage();
 await page.route('**/api/**',r=>r.fulfill({status:404,body:''}));
 await page.goto(url,{waitUntil:'networkidle'});
 await page.waitForFunction(()=>[...document.querySelectorAll('.album-group:first-child img')].every(i=>i.complete&&i.naturalWidth));
 const track=page.locator('.album-track'),matrix=()=>track.evaluate(e=>getComputedStyle(e).transform);
 const a=await matrix();await page.waitForTimeout(600);const b=await matrix();
 assert.equal(a!==b,phase!=='before');
 assert.equal(await page.locator('.album-toggle').getAttribute('aria-pressed'),phase==='before'?'true':'false');
 const file=`${out}/${phase}-${kind}-reduced.png`;if(!fs.existsSync(file))await page.screenshot({path:file});
 if(phase!=='before'){
  await page.locator('.album-toggle').click();const stopped=await matrix();await page.waitForTimeout(300);assert.equal(await matrix(),stopped);
  await page.locator('.album-toggle').click();await page.waitForTimeout(100);const resumed=await matrix();await page.waitForTimeout(300);assert.notEqual(await matrix(),resumed);
 }
 console.log(`${kind}: ${phase==='before'?'reproduced paused startup':'PASS autoplay under reduced motion + pause/resume'}`);
 await ctx.close();
}
}finally{await browser.close();}
