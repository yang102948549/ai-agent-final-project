// GalleryStore(하트 포함)를 Node 내장 SQLite로 돌려 보는 검사. 배포 없이 저장 규칙을 확인한다.
// 사용: node relay/test-gallery-store.mjs
import { DatabaseSync } from 'node:sqlite';
import { GalleryStore } from './worker.js';

// Durable Object의 ctx.storage.sql.exec(쿼리, ...값) → { toArray() } 모양을 흉내 낸다.
const db = new DatabaseSync(':memory:');
const sql = { exec(q, ...p) { const st = db.prepare(q); const rows = /^\s*(SELECT|PRAGMA)/i.test(q) ? st.all(...p) : (st.run(...p), []); return { toArray: () => rows.map(r => ({ ...r })) }; } };
const store = new GalleryStore({ storage: { sql } });
const call = async (path, body) => (await store.fetch(new Request(`https://x/gallery/${path}`, { method: 'POST', body: JSON.stringify(body) }))).json().then(j => j);
const status = async (path, body) => (await store.fetch(new Request(`https://x/gallery/${path}`, { method: 'POST', body: JSON.stringify(body) }))).status;
const fails = []; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails.push(m); };

const sub = (num, name) => ({ grade: 2, cls: 3, num, name, cid: 'tuvalu', format: 'article', data: { a_title: '제목' } });
await call('submit', { sub: sub(4, '김하늘') });
await call('submit', { sub: sub(5, '이바다') });
let list = await call('list', { voter: 'dev-aaaaaaaa' });
ok(list.items.every(it => it.hearts === 0 && it.liked === false), '처음에는 하트 0, 누르지 않음');
let r = await call('heart', { key: '2-3-4', voter: 'dev-aaaaaaaa', on: true });
ok(r.hearts === 1 && r.liked === true, '하트를 누르면 1');
r = await call('heart', { key: '2-3-4', voter: 'dev-aaaaaaaa', on: true });
ok(r.hearts === 1, '같은 기기가 두 번 눌러도 1 (한 기기 한 하트)');
await call('heart', { key: '2-3-4', voter: 'dev-bbbbbbbb', on: true });
list = await call('list', { voter: 'dev-aaaaaaaa' });
const a = list.items.find(it => it.key === '2-3-4'), b = list.items.find(it => it.key === '2-3-5');
ok(a.hearts === 2 && a.liked === true && b.hearts === 0 && b.liked === false, '목록: 다른 기기 하트까지 2, 내가 누른 것만 liked');
ok((await call('list', {})).items.every(it => it.liked === false), 'voter 없이 목록을 보면 liked는 모두 false');
r = await call('heart', { key: '2-3-4', voter: 'dev-aaaaaaaa', on: false });
ok(r.hearts === 1 && r.liked === false, '다시 누르면 취소되어 1');
ok(await status('heart', { key: '9-9-9', voter: 'dev-aaaaaaaa', on: true }) === 404, '없는 결과물에는 하트를 달 수 없음(404)');
await call('submit', { sub: { ...sub(4, '김하늘'), data: { a_title: '고친 제목' } } });
ok((await call('list', {})).items.find(it => it.key === '2-3-4').hearts === 1, '같은 학생이 다시 제출해도 하트는 남음');
await call('delete', { key: '2-3-4' });
ok(db.prepare('SELECT COUNT(*) AS n FROM hearts WHERE key = ?').get('2-3-4').n === 0, '결과물을 지우면 그 하트도 지워짐');
ok((await call('list', { admin: true })).items[0].name === '이바다', '관리 목록은 전체 이름(기존 동작 유지)');
ok((await call('list', {})).items[0].name === '이*다', '일반 목록은 가운데 글자 가림(기존 동작 유지)');
if (fails.length) { console.error(`FAIL ${fails.length}건`); process.exit(1); }
console.log('ALL PASS');
