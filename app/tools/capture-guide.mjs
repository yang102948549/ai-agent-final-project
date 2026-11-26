import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
const phase=process.argv[2],out='../local-assets/screenshots/2026-11-26-lesson-guide';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
for(const [tag,width,height,scale] of [['desktop',1440,900,1],['mobile',390,844,2]]){
 const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:scale});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.argv[3] || 'http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 await page.locator('[data-nav="guide"]').first().click();await page.locator('.page-head').waitFor();
 const file=`${out}/${phase}-${tag}.png`;if(existsSync(file))throw Error('Already exists '+file);
 await page.screenshot({path:file,fullPage:true});
 if(phase.startsWith('after')){
  const text=await page.locator('#app').innerText();
  for(const word of ['AI 대화 설정','AI 대화의 안전장치','12명을 모두 다루려면','공감을 다루는 방법'])if(text.includes(word))throw Error(word);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('overflow');
  await page.getByRole('button',{name:'캐릭터 고르기',exact:true}).click();
  await page.getByRole('heading',{name:'열두 명의 하루'}).waitFor();
 }
 if(errors.length)throw Error(errors.join('\n'));
 console.log('PASS',tag,file);await context.close();
}
await browser.close();
