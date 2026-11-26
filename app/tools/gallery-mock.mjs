// 갤러리 화면 검사·촬영용 가짜 API. 실제 갤러리에는 아무것도 보내지 않는다.
// 하트는 기기 번호(voter)별로 켜고 끈다. 실제 저장소(relay/worker.js GalleryStore)와 같은 모양으로 답한다.
const now = Date.parse('2026-11-26T05:00:00Z');
export const ITEMS = [
  { key: '2-3-4', grade: 2, cls: 3, num: 4, name: '김*늘', cid: 'tuvalu', format: 'article', updated: now,
    data: { a_title: '바닷물에 잠기는 섬, 학교 가는 길도 사라진다', a_lead: '투발루의 바이투푸섬에서 시오네 씨는 바닷물이 차올라 학교에 가기 어려워지고 있다.', a_body: 'UN 뉴스 자료에 따르면 투발루는 해발이 낮아 바닷물이 땅으로 스며든다. 시오네 씨는 “섬을 떠나고 싶지 않다”라고 말했다.', a_end: '이 섬의 아이들이 학교에 계속 다니려면 국제 사회의 지원이 필요하다.', question: '시오네 같은 사람이 섬에 남으려면 무엇이 필요할까?', notes: '해발이 낮아 바닷물이 스며든다 (UN 뉴스)', feeling: '', constraint: '', choices: [0, 0, 0] } },
  { key: '2-3-11', grade: 2, cls: 3, num: 11, name: '박*준', cid: 'ghana', format: 'letter', updated: now - 3600e3,
    data: { l_to: '초콜릿 회사 대표님께', l_open: '안녕하세요. 저는 한국의 중학생입니다. 수업에서 코피의 하루를 살아 보고 편지를 씁니다.', l_learned: '자료에 따르면 카카오 농가 아이들이 학교 대신 농장에서 일하는 경우가 많습니다.', l_ask: '공정한 가격으로 카카오를 사 주시면 좋겠습니다. 그러면 아이들이 학교에 갈 수 있습니다.', l_me: '저도 공정무역 초콜릿을 고르겠습니다. 읽어 주셔서 감사합니다.', l_from: '박서준', question: '', notes: '', feeling: '', constraint: '', choices: [0, 1, 0] } },
  { key: '2-4-7', grade: 2, cls: 4, num: 7, name: '이*아', cid: 'afghanistan', format: 'policy', updated: now - 7200e3,
    data: { p_to: '유네스코', p_title: '여학생 원격 수업 지원', p_problem: '아프가니스탄에서는 6학년 이후 여학생이 학교에 다니지 못하고 있다. 유네스코 자료에 따르면 많은 여학생이 교육을 받지 못한다.', p_plan: '유네스코는 원격 수업을 지원해야 한다. 첫째, 라디오 수업을 연다. 둘째, 교재를 나눠 준다.', p_limit: '안전 문제가 생길 수 있다. 그래서 현지 주민 의견을 듣고 방법을 정한다.', question: '', notes: '', feeling: '', constraint: '', choices: [1, 0, 1] } },
];
// page.route로 /api/gallery를 가로챈다. state.hearts[key] = Set(voter). 처음부터 다른 학생이 누른 하트도 둔다.
export async function mockGallery(page, { hearts = { '2-3-4': ['other-1', 'other-2', 'other-3'], '2-3-11': ['other-1'] }, failHeart = false } = {}) {
  const st = Object.fromEntries(ITEMS.map(it => [it.key, new Set(hearts[it.key] || [])]));
  const calls = [];
  await page.route('**/api/gallery**', async route => {
    const req = route.request();
    if (req.method() === 'GET') {
      const voter = new URL(req.url()).searchParams.get('voter') || '';
      calls.push({ action: 'list', voter });
      return route.fulfill({ json: { items: ITEMS.map(it => ({ ...it, hearts: st[it.key].size, liked: !!voter && st[it.key].has(voter) })) } });
    }
    const body = JSON.parse(req.postData() || '{}');
    calls.push(body);
    if (body.action === 'heart') {
      if (failHeart) return route.fulfill({ status: 500, json: { error: { code: 'x' } } });
      const s = st[body.key]; if (!s) return route.fulfill({ status: 404, json: { error: { code: 'not_found' } } });
      if (body.on) s.add(body.voter); else s.delete(body.voter);
      return route.fulfill({ json: { ok: true, key: body.key, hearts: s.size, liked: s.has(body.voter) } });
    }
    return route.fulfill({ status: 400, json: { error: { code: 'bad_action' } } });
  });
  await page.route('**/api/chat**', r => r.fulfill({ status: 404, body: '' }));
  return { st, calls };
}
