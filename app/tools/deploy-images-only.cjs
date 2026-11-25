// 캐릭터 이미지만 onischool.net 배포본(onischool-release/anotherday)에 반영한다.
// 시나리오(scenarios.js·precomputed.js)와 진행 로직은 배포본 그대로 둔다. 장면 갈래는 아직 확정하지 않았기 때문이다.
// 바꾸는 것: assets/characters/*.webp 24장, app.js의 그림 주소 캐시 버전(ART_V)과 기사 사진 설명, index.html 바닥글의 AI 이미지 안내.
// 사용: node tools/deploy-images-only.cjs [onischool-release 폴더 경로]
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const site = path.resolve(process.argv[2] || path.join(__dirname, '../../../OniSchool/onischool-release'));
const dest = path.join(site, 'anotherday');
if (!fs.existsSync(path.join(dest, 'app.js'))) { console.error(`배포본을 찾지 못했습니다: ${dest}`); process.exit(1); }
const src = path.join(__dirname, '../dist');

// 1) 이미지 교체
const chars = path.join(src, 'assets/characters');
let n = 0;
for (const f of fs.readdirSync(chars).filter(f => f.endsWith('.webp'))) {
  fs.copyFileSync(path.join(chars, f), path.join(dest, 'assets/characters', f)); n++;
}

// 2) app.js: 그림 주소와 사진 설명만 바꾼다. 바꿀 줄이 정확히 하나씩 있어야 진행한다.
function patch(file, pairs) {
  const p = path.join(dest, file);
  let s = fs.readFileSync(p, 'utf8');
  for (const [from, to] of pairs) {
    if (s.includes(to)) continue; // 이미 반영됨
    const count = s.split(from).length - 1;
    if (count !== 1) { console.error(`${file}: 바꿀 문장이 ${count}곳 있어 멈춥니다 → ${from.slice(0, 60)}`); process.exit(1); }
    s = s.replace(from, to);
  }
  fs.writeFileSync(p, s);
}
patch('app.js', [
  ["const artSrc=(id,kind)=>`assets/characters/${id}${kind==='face'?'-face':''}.webp`;",
   "// 그림을 바꾸면 ART_V를 올린다. 학교 사이트는 파일을 몇 시간씩 캐시해서, 같은 이름이면 예전 그림이 보일 수 있다.\nconst ART_V='20261125-photo';\nconst artSrc=(id,kind)=>`assets/characters/${id}${kind==='face'?'-face':''}.webp?v=${ART_V}`;"],
  ['모든 그림(약 1.2MB)', '모든 그림(약 1.4MB)'],
  ['실제 자료를 바탕으로 만든 가상 인물의 일러스트다.', '실제 자료를 바탕으로 꾸민 가상 인물이며, 이미지는 AI로 만들었다(실제 사진이 아님).'],
]);
patch('index.html', [
  ['캐릭터 그림은 AI로 만들었습니다', '캐릭터 이미지는 AI로 만든 가상 인물입니다(실제 사진이 아님)'],
]);

// 3) 바뀐 app.js의 캐시용 ?v= 해시 갱신(sync-onischool.cjs와 같은 방식)
const indexPath = path.join(dest, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8').replace(/(href|src)="([\w.-]+\.(?:js|css))(?:\?v=[^"]*)?"/g, (m, attr, file) => {
  const f = path.join(dest, file);
  if (!fs.existsSync(f)) return m;
  return `${attr}="${file}?v=${crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex').slice(0, 10)}"`;
});
fs.writeFileSync(indexPath, html);
console.log(`이미지 ${n}장 교체, app.js·index.html 이미지 관련 문장만 수정 → ${dest}`);
