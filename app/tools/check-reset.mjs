import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const phase=process.argv[2], url=process.argv[3]||'http://127.0.0.1:4173/';
const out='../local-assets/screenshots/2026-11-26-restore-reset';
mkdirSync(out,{recursive:true});
const key='global-life-lab-v1';
const seed={completed:['tuvalu','ghana'],run:{id:'pakistan',step:0,choices:[null,null,null],fields:{notes:'공개 예시 기록'},chats:[0,1,2].map(()=>({log:[],api:[]})),view:'intro'}};
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
for(const [tag,width,height,scale] of [['desktop',1440,900,1],['mobile',390,844,2]]){
 const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:scale});
 const page=await ctx.newPage(), errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(({key,seed})=>{if(!sessionStorage.getItem('seeded')){localStorage.setItem(key,JSON.stringify(seed));localStorage.setItem('anotherday-voter','example-voter-123');sessionStorage.setItem('seeded','1');}},{key,seed});
 await page.goto(url,{waitUntil:'networkidle'});
 await page.locator('[data-nav="guide"]').first().click();
 const shot=async(name)=>{const path=`${out}/${phase}-${tag}${name?'-'+name:''}.png`;assert(!existsSync(path),path);await page.screenshot({path,fullPage:!name,animations:"disabled"});};
 await shot('');
 if(phase.startsWith('after')){
  await page.getByRole('button',{name:'이 브라우저의 기록 지우기',exact:true}).click();
  await shot('confirm');
  await page.getByRole('button',{name:'그만두기',exact:true}).click();
  assert.deepEqual(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key),seed);
  await page.locator('[data-action="clear"]').click();
  await page.getByRole('button',{name:'지우기',exact:true}).click();
  await page.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).run===null,key);
  assert.deepEqual(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key),{run:null,completed:[]});
  assert.equal(await page.evaluate(()=>localStorage.getItem('anotherday-voter')),'example-voter-123');
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('[data-action="resume"]').count(),0);
  await page.locator('[data-nav="atlas"]').first().click();
  await page.getByText('이 브라우저에서 0 / 12명을 마쳤습니다.',{exact:false}).waitFor();
  await shot('empty');
  assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
 }
 assert.deepEqual(errors,[]);console.log('PASS',phase,tag);await ctx.close();
}
await browser.close();
