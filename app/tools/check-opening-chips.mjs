import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const [url='http://127.0.0.1:4196/', phase='after', out='../local-assets/screenshots/2026-11-26-opening-chips']=process.argv.slice(2);
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch();
for(const [kind,viewport] of Object.entries({desktop:{width:1440,height:900},mobile:{width:390,height:844}})){
 const ctx=await browser.newContext({viewport,deviceScaleFactor:kind==='mobile'?2:1});
 const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/**',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({configured:true})}));
 await page.goto(url);const ids=await page.evaluate(()=>SCENARIOS.map(c=>c.id));
 for(const id of ids){
  await page.evaluate(id=>localStorage.setItem('global-life-lab-v1',JSON.stringify({completed:[],me:{},run:{id,step:0,choices:[null,null,null],fields:{},chats:[0,1,2].map(()=>({log:[],api:[]})),view:'intro',startedAt:'2026-11-26T00:00:00.000Z'}})),id);
  await page.reload({waitUntil:'networkidle'});await page.locator('#resume').click();await page.locator('[data-action=join]').click();
  await page.locator('[data-chip]').first().waitFor();
  const result=await page.evaluate(id=>{const c=SCENARIOS.find(c=>c.id===id),chips=PRECOMPUTED[id].chips0;return {valid:chips.length===3&&chips.every(x=>x.path==='none')&&[...document.querySelectorAll('[data-chip]')].every((e,i)=>e.textContent===chips[i].text.replaceAll('*',''))&&document.querySelector('#log').textContent.includes(c.scenes[0].story),overflow:document.documentElement.scrollWidth>innerWidth};},id);
  if(!result.valid||result.overflow||errors.length)throw Error(JSON.stringify({id,kind,result,errors}));
  if(id==='pakistan'){await page.locator('[data-chip]').last().scrollIntoViewIfNeeded();const file=path.join(out,`${phase}-${kind}.png`);if(fs.existsSync(file))throw Error('Refusing overwrite '+file);await page.screenshot({path:file});}
  console.log('PASS',kind,id,'scene + 3 exploratory chips, no overflow/errors');
 }
 await ctx.close();
}
await browser.close();
