(() => {
  const P = window.PHONE, S = window.STORY;
  const WD = ["日", "一", "二", "三", "四", "五", "六"];
  const parseD = str => { const [y, m, d] = str.split("-").map(Number); return new Date(y, m - 1, d); };
  const TODAY = P.today ? parseD(P.today) : new Date();
  if (P.today || !P.day) { P.weekday = "星期" + WD[TODAY.getDay()]; P.day = TODAY.getDate(); }
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };

  /* ================= 본문 ================= */
  const story = $("#story");
  story.innerHTML = (S.title ? `<h1>${esc(S.title)}</h1>` : "") + S.paragraphs.map(p =>
    p.trim() === "" ? `<p class="gap"></p>` :
      `<p>${esc(p).replace(/\[\[(.+?)\]\]/g, '<a class="phone-link" href="#phone">$1</a>')}</p>`
  ).join("");

  /* ================= 아이콘 ================= */
  const I = {
    calendar: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/><text x="30" y="17.5" text-anchor="middle" font-size="9.5" font-weight="600" fill="#f23b30">${esc(P.weekday)}</text><text x="30" y="48" text-anchor="middle" font-size="31" font-weight="400" fill="#111" letter-spacing="-1.2">${P.day}</text></svg>`,
    photos: `<svg viewBox="0 0 60 60"><defs><linearGradient id="phs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc8ff"/><stop offset="1" stop-color="#ffd7a8"/></linearGradient></defs><rect width="60" height="60" fill="#fff"/><rect x="9" y="12" width="42" height="36" rx="7" fill="url(#phs)"/><circle cx="40" cy="22" r="4.5" fill="#fff6c9"/><path d="M9 42l12-13 9 9 6-6 15 13v3a7 7 0 0 1-7 7H16a7 7 0 0 1-7-7z" fill="#3fa36b"/><path d="M27 48l9-16 15 16z" fill="#2d7d52"/></svg>`,
    camera: `<svg viewBox="0 0 60 60"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e9eb"/><stop offset="1" stop-color="#c8c8cc"/></linearGradient><radialGradient id="cl" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#8fa6d8"/><stop offset=".18" stop-color="#2a3560"/><stop offset=".6" stop-color="#0a0d18"/><stop offset="1" stop-color="#000"/></radialGradient><radialGradient id="cr" cx=".5" cy=".5" r=".5"><stop offset=".78" stop-color="#2b2b2e"/><stop offset=".9" stop-color="#5b5b60"/><stop offset="1" stop-color="#9a9aa0"/></radialGradient></defs><rect width="60" height="60" fill="url(#cg)"/><circle cx="30" cy="30" r="22" fill="url(#cr)"/><circle cx="30" cy="30" r="17" fill="url(#cl)"/><ellipse cx="25.5" cy="24.5" rx="4" ry="3" fill="#fff" opacity=".75"/><circle cx="34" cy="35" r="1.6" fill="#9fb4ff" opacity=".5"/></svg>`,
    clock: (() => { const [hh, mm] = (P.time || "10:10").split(":").map(Number); const ha = ((hh % 12) + mm / 60) * 30, ma = mm * 6;
      return `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/>${[...Array(60)].map((_, i) => i % 15 === 0 ? "" : `<line x1="30" y1="5" x2="30" y2="${i % 5 ? 7.5 : 9.5}" stroke="${i % 5 ? "#9a9a9e" : "#3a3a3c"}" stroke-width="${i % 5 ? .6 : 1.4}" transform="rotate(${i * 6} 30 30)"/>`).join("")}<g font-size="9" font-weight="600" fill="#3a3a3c" text-anchor="middle"><text x="30" y="14">12</text><text x="49" y="33.2">3</text><text x="30" y="52.5">6</text><text x="11" y="33.2">9</text></g><line x1="30" y1="30" x2="30" y2="17" stroke="#111" stroke-width="2.8" stroke-linecap="round" class="ic-h" transform="rotate(${ha} 30 30)"/><line x1="30" y1="30" x2="30" y2="10.5" stroke="#111" stroke-width="2.2" stroke-linecap="round" class="ic-m" transform="rotate(${ma} 30 30)"/><g class="ic-sec" transform="rotate(0 30 30)"><line x1="30" y1="35" x2="30" y2="8.5" stroke="#f5a623" stroke-width="1"/></g><circle cx="30" cy="30" r="2" fill="#111"/><circle cx="30" cy="30" r="1" fill="#f5a623"/></svg>`; })(),
    notes: `<svg viewBox="0 0 60 60"><defs><linearGradient id="nt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffdf5e"/><stop offset="1" stop-color="#f7c843"/></linearGradient><linearGradient id="nb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#f1f1f3"/></linearGradient></defs><rect width="60" height="60" fill="url(#nb)"/><rect width="60" height="20" fill="url(#nt)"/>${[...Array(15)].map((_, i) => `<circle cx="${4 + i * 3.7}" cy="23" r=".7" fill="#c7c7cc"/>`).join("")}<line x1="11" y1="34" x2="49" y2="34" stroke="#c7c7cc" stroke-width="1.6" stroke-linecap="round"/><line x1="11" y1="46" x2="49" y2="46" stroke="#c7c7cc" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    insta: `<svg viewBox="0 0 60 60"><defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ffb347"/><stop offset=".5" stop-color="#ff4f7b"/><stop offset="1" stop-color="#8f5cff"/></linearGradient></defs><rect width="60" height="60" fill="url(#ig)"/><path d="M30 44s-13-8-13-17a7 7 0 0 1 13-3.5A7 7 0 0 1 43 27c0 9-13 17-13 17z" fill="none" stroke="#fff" stroke-width="3.2" stroke-linejoin="round"/></svg>`,
    karrot: `<svg viewBox="0 0 60 60"><defs><linearGradient id="kr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a3d"/><stop offset="1" stop-color="#ff6f0f"/></linearGradient></defs><rect width="60" height="60" fill="url(#kr)"/><path d="M17 27l13-10 13 10v15a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2z" fill="#fff"/><rect x="26" y="32" width="8" height="12" rx="1.5" fill="#ff7a1f"/></svg>`,
    blockblast: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#2a2f6e"/>${[[10,10,"#ff5a5f"],[22,10,"#ff5a5f"],[34,10,"#ffc93c"],[10,22,"#4cc9f0"],[22,22,"#ffc93c"],[34,22,"#ffc93c"],[46,22,"#7bd389"],[10,34,"#4cc9f0"],[22,34,"#4cc9f0"],[34,34,"#b388eb"],[46,34,"#7bd389"],[34,46,"#b388eb"],[46,46,"#7bd389"],[22,46,"#b388eb"]].map(([x,y,c])=>`<rect x="${x-4}" y="${y-4}" width="11" height="11" rx="2.2" fill="${c}"/><rect x="${x-4}" y="${y-4}" width="11" height="3.2" rx="1.6" fill="#fff" opacity=".3"/>`).join("")}</svg>`,
    maps: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#e8efe1"/><path d="M0 40 L60 22 V34 L0 52Z" fill="#9fd3f5"/><rect x="0" y="0" width="22" height="20" fill="#b9e2a5"/><path d="M-2 14 L62 30" stroke="#fff" stroke-width="5"/><path d="M34 -2 L26 62" stroke="#fff" stroke-width="5"/><path d="M34 -2 L26 62" stroke="#f8c74a" stroke-width="2"/><path d="M41 12a8 8 0 0 0-16 0c0 7 8 15 8 15s8-8 8-15z" fill="#ff3b30"/><circle cx="33" cy="12" r="3" fill="#fff"/></svg>`,
    mines: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#c9ced6"/>${[0,1,2].flatMap(r=>[0,1,2].map(c=>`<rect x="${6+c*16}" y="${6+r*16}" width="15" height="15" fill="${(r+c)%2?'#e4e7ec':'#d6dae1'}"/>`)).join("")}<text x="13.5" y="19" text-anchor="middle" font-size="10" font-weight="800" fill="#2563eb">1</text><text x="45.5" y="51" text-anchor="middle" font-size="10" font-weight="800" fill="#16a34a">2</text><g transform="translate(30 30)"><circle r="5.5" fill="#111"/>${[0,45,90,135].map(a=>`<rect x="-.9" y="-8.5" width="1.8" height="17" fill="#111" transform="rotate(${a})"/>`).join("")}<circle cx="-1.8" cy="-1.8" r="1.4" fill="#fff"/></g><path d="M44 8v10M44 8l7 3-7 3" stroke="#111" stroke-width="1.6" fill="#e5484d"/></svg>`,
    mail: `<svg viewBox="0 0 60 60"><defs><linearGradient id="ml" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e90ff"/><stop offset="1" stop-color="#0a5fd8"/></linearGradient></defs><rect width="60" height="60" fill="url(#ml)"/><rect x="11" y="18" width="38" height="25" rx="3.5" fill="#fff"/><path d="M12 20l18 13 18-13" fill="none" stroke="#9cc3f5" stroke-width="2.2" stroke-linejoin="round"/></svg>`,
    translate: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#f1f3f7"/><rect x="8" y="10" width="28" height="30" rx="4" fill="#4a86f0"/><text x="22" y="32" text-anchor="middle" font-size="17" font-weight="700" fill="#fff">中</text><rect x="25" y="22" width="27" height="28" rx="4" fill="#fff" stroke="#c9d3e6"/><text x="38.5" y="42" text-anchor="middle" font-size="15" fill="#555">文</text></svg>`,
    weather: `<svg viewBox="0 0 60 60"><defs><linearGradient id="wt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b8de8"/><stop offset="1" stop-color="#7fc3f7"/></linearGradient></defs><rect width="60" height="60" fill="url(#wt)"/><circle cx="24" cy="24" r="9" fill="#ffd34d"/><path d="M22 44h20a7 7 0 0 0 0-14 9 9 0 0 0-17-1 6.5 6.5 0 0 0-3 15z" fill="#fff"/></svg>`,
    phone: `<svg viewBox="0 0 60 60"><defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ef06b"/><stop offset="1" stop-color="#1fc23b"/></linearGradient></defs><rect width="60" height="60" fill="url(#pg)"/><path d="M21.5 14.5c1.4-.9 3.1-.5 4 .9l3 4.7c.8 1.3.5 3-.7 3.9l-2.2 1.7c1.5 3.8 4.6 7.2 8.4 9l1.8-2.1c1-1.1 2.7-1.4 3.9-.5l4.5 3.2c1.3 1 1.6 2.8.6 4.1l-1.6 2.1c-1.6 2-4.3 2.8-6.8 2C25.9 42.1 18.5 34.6 15.4 26c-.9-2.4-.2-5.1 1.8-6.8z" fill="#fff"/></svg>`,
    chrome: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fff"/><circle cx="30" cy="30" r="21" fill="none" stroke="#1a73e8" stroke-width="3"/><ellipse cx="30" cy="30" rx="9" ry="21" fill="none" stroke="#1a73e8" stroke-width="2.4"/><path d="M10 30h40M13 20h34M13 40h34" stroke="#1a73e8" stroke-width="2.4"/></svg>`,
    messages: `<svg viewBox="0 0 60 60"><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ef06b"/><stop offset="1" stop-color="#1fc23b"/></linearGradient></defs><rect width="60" height="60" fill="url(#mg)"/><path d="M30 13c-10.5 0-19 6.9-19 15.5 0 5 2.9 9.4 7.4 12.2-.4 2.4-1.7 4.6-3.6 6.2 3.6.2 7.1-1 9.6-3.2 1.8.4 3.6.6 5.6.6 10.5 0 19-6.9 19-15.5S40.5 13 30 13z" fill="#fff"/></svg>`,
    kakao: `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#fee500"/><path d="M30 14c-11 0-20 6.9-20 15.4 0 5.4 3.6 10.2 9.1 12.9l-2 7.2 8.2-5.4c1.5.2 3.1.3 4.7.3 11 0 20-6.9 20-15.4S41 14 30 14z" fill="#3c1e1e"/><circle cx="22" cy="29.5" r="2.4" fill="#fee500"/><circle cx="30" cy="29.5" r="2.4" fill="#fee500"/><circle cx="38" cy="29.5" r="2.4" fill="#fee500"/></svg>`
  };
  const PERSON = `<svg viewBox="0 0 40 40"><circle cx="20" cy="15" r="8"/><path d="M4 40c1-9 8-14 16-14s15 5 16 14z"/></svg>`;
  const ic = {
    back: `<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>`,
    menu: `<svg viewBox="0 0 24 24"><path d="M4 7h16M7 12h13M10 17h10"/></svg>`,
    search: `<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>`,
    mic: `<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>`,
    compose: `<svg viewBox="0 0 24 24"><path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M17.5 3.5l3 3L12 15H9v-3z"/></svg>`,
    more: `<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1" fill="#111"/><circle cx="12" cy="12" r="1" fill="#111"/><circle cx="19" cy="12" r="1" fill="#111"/></svg>`,
    video: `<svg viewBox="0 0 24 24"><rect x="3" y="7" width="12" height="10" rx="2"/><path d="M15 11l6-3v8l-6-3"/></svg>`,
    clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>`,
    undo: `<svg viewBox="0 0 24 24"><path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg>`,
    share: `<svg viewBox="0 0 24 24"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11v9h12v-9"/></svg>`,
    check: `<svg viewBox="0 0 24 24"><circle cx="5" cy="7" r="2"/><path d="M10 7h10M10 17h10"/><circle cx="5" cy="17" r="2"/></svg>`,
    clip: `<svg viewBox="0 0 24 24"><path d="M20 11l-8 8a5 5 0 0 1-7-7l8-8a3.5 3.5 0 0 1 5 5l-8 8a2 2 0 0 1-3-3l7-7"/></svg>`,
    pen: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 16l3-8 3 8M10 13h4"/></svg>`
  };
  const av = (name, cls = "") => {
    const src = (P.avatars || {})[name];
    if (src) return `<div class="av ${cls}"><img src="${esc(src)}" alt=""></div>`;
    if (name === "juju") return `<div class="av ph ${cls}" style="align-items:center"><span style="color:#f2e6dc;font-weight:700;font-size:40%">J</span></div>`;
    return `<div class="av ${cls}">${PERSON}</div>`;
  };
  const photoBox = (m, side) => `<div class="photo ${side}">${m.img ? `<img src="${esc(m.img)}" alt="">` : `📷 ${esc(m.caption || "照片")}`}</div>`;

  /* ================= 네비게이션 ================= */
  const screens = $("#screens"), layer = $("#phoneLayer"), statusbar = $("#statusbar"), homebar = $("#homebar");
  $("#sbTime").textContent = P.time;
  let stack = [];

  function setChrome(el) {
    const dark = el.dataset.dark === "1";
    statusbar.classList.toggle("light", dark);
    homebar.classList.toggle("light", dark);
  }
  /* 아이폰처럼 아이콘에서 커지고, 아이콘으로 줄어드는 앱 열기/닫기 */
  const EASE = "cubic-bezier(.32,.72,0,1)";
  const canAnimate = typeof Element !== "undefined" && "animate" in Element.prototype;
  function iconTransform(r) {
    const d = screens.getBoundingClientRect();
    const sx = r.width / d.width, sy = r.height / d.height;
    const tx = r.left - d.left + r.width / 2 - d.width / 2, ty = r.top - d.top + r.height / 2 - d.height / 2;
    return `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;
  }
  function withAnim(ms) { const dev = $("#device"); dev.classList.add("anim"); clearTimeout(withAnim.t); withAnim.t = setTimeout(() => dev.classList.remove("anim"), ms + 40); }
  function zoomOpen(el, iconEl, home) {
    const from = iconTransform(iconEl.getBoundingClientRect());
    withAnim(520);
    el.style.borderRadius = "48px";
    el.animate([{ transform: from }, { transform: "none" }], { duration: 520, easing: EASE });
    el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "linear" });
    if (home) home.animate([{ transform: "scale(1)", opacity: 1 }, { transform: "scale(.92)", opacity: .6 }], { duration: 520, easing: EASE });
    setTimeout(() => { el.style.borderRadius = ""; }, 520);
  }
  function zoomClose(el, iconEl, home) {
    const to = iconTransform(iconEl.getBoundingClientRect());
    withAnim(460);
    el.style.borderRadius = "48px";
    el.animate([{ transform: "none" }, { transform: to }], { duration: 460, easing: EASE, fill: "forwards" });
    el.animate([{ opacity: 1 }, { opacity: 1, offset: .45 }, { opacity: 0 }], { duration: 460, easing: "linear", fill: "forwards" });
    if (home) home.animate([{ transform: "scale(.92)", opacity: .6 }, { transform: "scale(1)", opacity: 1 }], { duration: 460, easing: EASE });
  }
  function homeIcon(appId) { return appId && stack[0] ? stack[0].querySelector(`.app[data-app="${appId}"] .ic`) : null; }
  function show(el, mode, originEl) {
    const prev = stack[stack.length - 1];
    screens.appendChild(el);
    const zoom = mode === "app" && originEl && canAnimate;
    if (zoom) { el.dataset.fromApp = (originEl.closest("[data-app]") || {}).dataset?.app || ""; zoomOpen(el, originEl, prev); }
    else el.classList.add(mode === "app" ? "app-enter" : "push-enter");
    stack.push(el); setChrome(el);
    if (mode !== "none") { try { history.pushState({ d: stack.length - 1 }, "", "#phone"); } catch (e) {} }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.classList.remove("app-enter", "push-enter");
      if (prev && mode !== "app") prev.classList.add("under");
    }));
    el.querySelectorAll("[data-autobottom]").forEach(s => s.scrollTop = s.scrollHeight);
    return el;
  }
  let ignorePops = 0;
  const syncHistory = n => { if (n > 0) { ignorePops++; try { history.go(-n); } catch (e) { ignorePops--; } } };
  function popTo(depth, animateHome) {
    if (stack.length - 1 <= depth) return;
    const removed = stack.splice(depth + 1), prev = stack[depth];
    prev.classList.remove("under"); setChrome(prev); hideBanner();
    const icon = animateHome && depth === 0 && canAnimate ? homeIcon(removed[0].dataset.fromApp) : null;
    removed.forEach((t, i) => {
      if (i === removed.length - 1) {
        if (icon) zoomClose(t, icon, prev);
        else t.classList.add(animateHome && depth === 0 ? "app-enter" : "push-enter");
      }
      else t.style.opacity = 0;
      if (t._cleanup) t._cleanup();
      setTimeout(() => t.remove(), icon ? 470 : 420);
    });
  }
  function back() { if (stack.length <= 1) return; popTo(stack.length - 2); syncHistory(1); }
  function goHome() {
    if (stack.length <= 1) { const hb = homebar.querySelector("i"); hb.animate([{ transform: "translateY(0)" }, { transform: "translateY(-6px)" }, { transform: "translateY(0)" }], 300); return; }
    const n = stack.length - 1; popTo(0, true); syncHistory(n);
  }
  homebar.addEventListener("click", () => { if (locked) { if (!lockEl.classList.contains("pin")) showPin(); return; } goHome(); });
  // 제스처: 아래에서 위로 쓸기 = 홈 / 왼쪽 끝에서 오른쪽으로 쓸기 = 뒤로
  let g = null;
  const dev = $("#device");
  dev.addEventListener("pointerdown", e => {
    const r = dev.getBoundingClientRect();
    g = { x: e.clientX, y: e.clientY, bottom: r.bottom - e.clientY < 60, left: e.clientX - r.left < 28 };
  });
  dev.addEventListener("pointerup", e => {
    if (!g || locked) { g = null; return; }
    const dx = e.clientX - g.x, dy = g.y - e.clientY;
    if (g.bottom && dy > 50) goHome();
    else if (g.left && dx > 60 && Math.abs(dy) < 60) back();
    g = null;
  });

  /* ================= 홈 화면 ================= */
  const apps = [
    ["mail", "邮件"], ["calendar", "日历"], ["clock", "时钟"], ["weather", "天气"],
    ["notes", "备忘录"], ["photos", "相册"], ["camera", "相机"], ["insta", "Instagram"],
    ["blockblast", "Block Blast"], ["mines", "扫雷"], ["maps", "地图"]
  ];
  /* 홈 화면 위젯: 오늘 날짜 + 다음 일정 2개 */
  function nextEvents(n) {
    const evs = ((P.calendar && P.calendar.events) || []).filter(e => e.start).map(e => ({ ...e, d: parseD(e.date) }));
    const now = TODAY.getTime(), t = P.time || "00:00";
    return evs.filter(e => e.d.getTime() > now || (e.d.getTime() === now && e.start > t))
      .sort((a, b) => a.d - b.d || a.start.localeCompare(b.start)).slice(0, n);
  }
  function widgetHTML(which) {
    const list = nextEvents(2);
    const col = c => ((P.calendar && P.calendar.calendars) || {})[c] || "#8e8e93";
    const MW = P.homeMusic;
    const cal = `<button class="widget sq" data-app="calendar"><div class="wg-top"><small>星期${WD[TODAY.getDay()]}</small><b>${TODAY.getDate()}</b></div><div class="wg-list">${list.length ? list.map(e => `<div class="wg-ev"><i style="background:${col(e.cal)}"></i><div><b>${esc(e.title)}</b><small>${e.d.getMonth() + 1}/${e.d.getDate()} ${esc(e.start || "")}</small></div></div>`).join("") : `<div class="wg-none">暂无日程</div>`}</div></button>`;
    const mus = MW ? `<button class="widget sq mw" data-mlink style="grid-column:3 / span 2"><div class="mw-head"><div class="mw-art">${MW.cover ? `<img src="${esc(MW.cover)}" alt="">` : "<span>♪</span>"}</div><svg class="mw-note" viewBox="0 0 24 24"><path d="M9 18V5.5l11-2V16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="2.8" fill="currentColor"/><circle cx="17.5" cy="16" r="2.8" fill="currentColor"/></svg></div><div class="mw-t"><b>${esc(MW.title)}</b><small>${esc(MW.artist)}</small></div><span class="mw-pause"><svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>暂停</span></button>` : "";
    return which === "cal" ? cal : which === "music" ? mus : cal + mus;
  }
  const dock = [["phone", "电话"], ["chrome", "Chrome"], ["messages", "信息"], ["kakao", "KakaoTalk"]];
  const appBtn = ([id, label]) => {
    const b = P.badges[id];
    return `<button class="app" data-app="${id}"><div class="ic${(P.iconRound || []).includes(id) && (P.icons || {})[id] ? " round" : ""}">${(P.icons || {})[id] ? iconImg(P.icons[id], id) : I[id]}</div>${b ? `<em class="badge" data-badge="${id}">${b}</em>` : ""}<span>${esc(label)}</span></button>`;
  };
  /* 아이콘 이미지: 파일이 없으면 .jpg로 한 번 더 찾아보고, 그래도 없으면 기본 아이콘 */
  function iconImg(src, id) {
    const alt = src.replace(/\.png$/i, ".jpg");
    return `<img src="${esc(src)}" alt="" style="width:100%;height:100%;object-fit:cover" data-alt="${esc(alt)}" onerror="if(this.dataset.alt&&this.src.indexOf(this.dataset.alt)<0){this.src=this.dataset.alt}else{this.style.display='none';this.nextElementSibling.style.display='contents'}"><span style="display:none">${I[id]}</span>`;
  }
  function homeScreen() {
    const el = h(`<section class="screen home" data-dark="0">
      <button class="back-to-book" data-close>‹ 返回正文</button>
      <div class="grid">${(() => { const by = id => apps.find(a => a[0] === id), L = ids => ids.map(by).filter(Boolean).map(appBtn).join(""), used = ["clock", "weather", "notes", "photos", "mail", "calendar", "camera", "insta"]; return widgetHTML("cal") + L(used.slice(0, 4)) + widgetHTML("music") + L(used.slice(4)) + apps.filter(a => !used.includes(a[0])).map(appBtn).join(""); })()}</div>
      <div class="spot"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>搜索</div>
      <div class="dock">${dock.map(appBtn).join("")}</div>
    </section>`);
    el.addEventListener("click", e => {
      if (e.target.closest("[data-mlink]")) { const L = (P.homeMusic || {}).link; if (L) window.open(L, "_blank", "noopener"); return; }
      const a = e.target.closest("[data-app]"); if (!a) return;
      const fn = OPEN[a.dataset.app];
      if (fn) show(fn(), "app", a.querySelector(".ic"));
      else { a.classList.remove("wiggle"); void a.offsetWidth; a.classList.add("wiggle"); }
    });
    return el;
  }

  /* ================= 전화 ================= */
  function callsHTML() {
    const arrow = d => d === "out" ? "↗" : "↙";
    return P.calls.map((c, i) => `<button class="call" data-dial="${esc(c.name)}">${av(c.name)}<div class="info"><div style="min-width:0"><div class="nm ${c.missed ? "red" : ""}">${esc(c.name)}${c.count ? ` (${c.count})` : ""}</div><div class="sub">${arrow(c.dir)} ${esc(c.kind)}</div></div><span class="when">${esc(c.when)}</span><span class="ibtn">i</span></div></button>`).join("");
  }
  function phoneApp() {
    const el = h(`<section class="screen white">
      <div class="navbar"><span class="pill">编辑</span><span class="seg"><span class="on">全部</span><span>未接来电</span></span><span class="pill round">${ic.menu}</span></div>
      <div class="scroll">
        <div class="bigtitle">最近通话</div>
        <div class="searchfield">${ic.search}<span>搜索</span><span class="mic">${ic.mic}</span></div>
        <div data-calls>${callsHTML()}</div>
        <div style="height:20px"></div>
      </div>
      <nav class="tabbar">
        <div><svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z"/></svg>收藏</div>
        <div class="on"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 6v6l-3 2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>最近通话</div>
        <div><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="9.5" r="3.5" fill="#fff"/><path d="M5.5 18.5c1.5-3 4-4 6.5-4s5 1 6.5 4" fill="#fff"/></svg>通讯录</div>
        <div data-keypad><svg viewBox="0 0 24 24">${[4, 12, 20].flatMap(y => [5, 12, 19].map(x => `<circle cx="${x}" cy="${y}" r="2.6"/>`)).join("")}</svg>拨号键盘</div>
        <div data-vmail><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="6.5" cy="12" r="4"/><circle cx="17.5" cy="12" r="4"/><path d="M6.5 16h11"/></svg>语音信箱</div>
      </nav>
    </section>`);
    el.addEventListener("click", e => {
      if (e.target.closest("[data-keypad]")) { show(keypadView(), "push"); return; }
      if (e.target.closest("[data-vmail]")) { show(voicemailView(), "push"); return; }
      const r = e.target.closest("[data-dial]"); if (r && !e.target.closest(".ibtn")) outgoingCall(r.dataset.dial);
    });
    return el;
  }
  /* 语音信箱: 누르면 펼쳐지고, 재생하면 텍스트 변환이 한 줄씩 나타남 */
  function voicemailView() {
    const V = P.voicemail || [];
    const secs = s => { const [m, x] = s.split(":").map(Number); return m * 60 + x; };
    const el = h(`<section class="screen white vm">
      <div class="navbar"><button class="pill round" data-back>${ic.back}</button><span class="pill">编辑</span></div>
      <div class="scroll">
        <div class="bigtitle">语音信箱</div>
        ${V.map((v, i) => `<div class="vm-row" data-vm="${i}">
          <div class="vm-top">${v.new ? '<i class="vm-dot"></i>' : '<i class="vm-dot off"></i>'}<div class="vm-who"><b>${esc(v.from)}</b><small>${esc(v.kind || "手机")}</small></div><div class="vm-when"><span>${esc(v.date)}</span><small>${esc(v.length)}</small></div></div>
          <div class="vm-body">
            <div class="vm-bar"><i data-fill></i></div>
            <div class="vm-times"><span data-cur>0:00</span><span data-left>-${esc(v.length)}</span></div>
            <div class="vm-ctrl"><button data-vplay><svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg></button><span class="vm-spk">扬声器</span><span class="vm-del">删除</span></div>
            <div class="vm-tx"><small>文字转写（测试版）</small><p data-tx></p></div>
          </div>
        </div>`).join("")}
        <div style="height:30px"></div>
      </div>
    </section>`);
    let playing = null;
    const stop = () => { if (!playing) return; clearInterval(playing.t); stopSea(); const r = playing.row; r.classList.remove("playing"); r.querySelector("[data-vplay]").innerHTML = `<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg>`; playing = null; };
    el.addEventListener("click", e => {
      if (e.target.closest("[data-back]")) { stop(); back(); return; }
      const row = e.target.closest("[data-vm]"); if (!row) return;
      const i = +row.dataset.vm, v = V[i];
      if (e.target.closest("[data-vplay]")) {
        if (playing && playing.row === row) { stop(); return; }
        stop();
        const total = secs(v.length), tx = row.querySelector("[data-tx]"), lines = v.transcript || [];
        let pos = 0; tx.textContent = "";
        row.classList.add("playing"); row.querySelector("[data-vplay]").innerHTML = `<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>`;
        if (v.sea) startSea();
        const draw = () => {
          row.querySelector("[data-fill]").style.width = (pos / total * 100) + "%";
          row.querySelector("[data-cur]").textContent = `0:${String(pos).padStart(2, "0")}`.replace(/^0:(\d\d\d)/, "$1");
          row.querySelector("[data-left]").textContent = "-" + `${Math.floor((total - pos) / 60)}:${String((total - pos) % 60).padStart(2, "0")}`;
          const k = Math.min(lines.length, Math.ceil(pos / total * lines.length));
          tx.textContent = lines.slice(0, k).join(" ");
        };
        playing = { row, t: setInterval(() => { if (!el.isConnected) { stop(); return; } pos++; draw(); if (pos >= total) { tx.textContent = lines.join(" "); setTimeout(stop, 300); if (v.after) setTimeout(() => murmur(v.after), 1200); } }, 1000) };
        draw();
        if (v.new) { v.new = false; row.querySelector(".vm-dot").classList.add("off"); }
        return;
      }
      if (e.target.closest(".vm-body")) return;
      const open = row.classList.contains("open");
      el.querySelectorAll(".vm-row.open").forEach(r => r.classList.remove("open"));
      if (!open) row.classList.add("open");
    });
    return el;
  }
  /* 화면 아래에 혼잣말이 천천히 떠올랐다 사라짐 */
  function murmur(text) {
    const dev = $("#device"); dev.querySelector(".murmur")?.remove();
    const m = h(`<div class="murmur">${esc(text)}</div>`); dev.appendChild(m);
    requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add("show")));
    setTimeout(() => { m.classList.remove("show"); setTimeout(() => m.remove(), 1600); }, 1400 + 3000);
  }
  /* 키패드: 아무 숫자를 눌러도 정해진 번호(P.keypadNumber)가 한 자리씩 입력됨 */
  function keypadView() {
    const target = String(P.keypadNumber || ""), digits = target.replace(/\D/g, "");
    let n = 0;
    const fmtNum = k => { let out = "", c = 0; for (const ch of target) { if (/\d/.test(ch)) { if (c >= k) break; c++; out += ch; } else if (c < k) out += ch; } return out.replace(/-$/, ""); };
    const keys = [["1", ""], ["2", "ABC"], ["3", "DEF"], ["4", "GHI"], ["5", "JKL"], ["6", "MNO"], ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"], ["*", ""], ["0", "+"], ["#", ""]];
    const el = h(`<section class="screen white kp">
      <div class="kp-num"><span data-num></span><small data-sub></small></div>
      <div class="kp-grid">${keys.map(([k, s]) => `<button data-kk="${k}"><b>${k}</b>${s ? `<small>${s}</small>` : ""}</button>`).join("")}</div>
      <div class="kp-row"><span></span><button class="kp-call" data-kcall><svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" fill="#fff"/></svg></button><button class="kp-del" data-kdel hidden>⌫</button></div>
      <nav class="tabbar">
        <div><svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z"/></svg>收藏</div>
        <div data-recent><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 6v6l-3 2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>最近通话</div>
        <div><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="9.5" r="3.5" fill="#fff"/><path d="M5.5 18.5c1.5-3 4-4 6.5-4s5 1 6.5 4" fill="#fff"/></svg>通讯录</div>
        <div class="on"><svg viewBox="0 0 24 24">${[4, 12, 20].flatMap(y => [5, 12, 19].map(x => `<circle cx="${x}" cy="${y}" r="2.6"/>`)).join("")}</svg>拨号键盘</div>
        <div data-vmail><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="6.5" cy="12" r="4"/><circle cx="17.5" cy="12" r="4"/><path d="M6.5 16h11"/></svg>语音信箱</div>
      </nav>
    </section>`);
    const numEl = el.querySelector("[data-num]"), del = el.querySelector("[data-kdel]");
    const SD = P.speedDial || {}, subEl = el.querySelector("[data-sub]");
    let speed = null;   // 처음에 快捷拨号 숫자를 누르면 그 사람이 뜸
    const draw = () => {
      numEl.textContent = speed ? speed.key : fmtNum(n); del.hidden = !speed && n === 0;
      subEl.textContent = speed ? `快捷拨号 ${speed.key} · ${speed.name}` : "";
    };
    el.addEventListener("click", e => {
      if (e.target.closest("[data-recent]")) { back(); return; }
      if (e.target.closest("[data-vmail]")) { show(voicemailView(), "push"); return; }
      const kk = e.target.closest("[data-kk]");
      if (kk) {
        try { keyTone(); } catch (x) {}
        if (!speed && n === 0 && SD[kk.dataset.kk]) { speed = { key: kk.dataset.kk, name: SD[kk.dataset.kk] }; draw(); return; }
        if (speed) speed = null;
        if (n < digits.length) n++;
        draw(); return;
      }
      if (e.target.closest("[data-kdel]")) { if (speed) speed = null; else if (n) n--; draw(); return; }
      if (e.target.closest("[data-kcall]")) { if (speed) outgoingCall(speed.name); else if (n === digits.length && n) outgoingCall(target); }
    });
    draw();
    return el;
  }
  function keyTone() {
    if (!audioCtx) return;
    const o = audioCtx.createOscillator(), g = audioCtx.createGain(), t = audioCtx.currentTime;
    o.frequency.value = 1209; o.connect(g); g.connect(audioCtx.destination);
    g.gain.setValueAtTime(.05, t); g.gain.exponentialRampToValueAtTime(.0001, t + .12); o.start(t); o.stop(t + .13);
  }
  /* 통화 배경음: 파도 소리 (걸러낸 잡음 + 천천히 밀려왔다 빠지는 음량) */
  let seaNodes = null;
  function startSea() {
    if (!audioCtx || seaNodes) return;
    const sr = audioCtx.sampleRate, len = sr * 4, buf = audioCtx.createBuffer(1, len, sr), d = buf.getChannelData(0);
    let last = 0; for (let i = 0; i < len; i++) { last = (last + .02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }   // 브라운 노이즈
    const src = audioCtx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = audioCtx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 820;
    const swell = audioCtx.createGain(); swell.gain.value = 0;
    const out = audioCtx.createGain(); out.gain.value = 0;
    src.connect(lp); lp.connect(swell); swell.connect(out); out.connect(audioCtx.destination);
    const t = audioCtx.currentTime;
    out.gain.linearRampToValueAtTime(1.1, t + 1.5);
    // 파도: 6~8초 간격으로 밀려왔다 빠짐
    let at = t;
    for (let k = 0; k < 40; k++) {
      const per = 6 + Math.random() * 2.5, peak = .55 + Math.random() * .35;
      swell.gain.setValueAtTime(.06, at);
      swell.gain.linearRampToValueAtTime(peak, at + per * .45);
      swell.gain.exponentialRampToValueAtTime(.06, at + per);
      at += per;
    }
    src.start();
    seaNodes = { src, out };
  }
  function stopSea(fast) {
    if (!seaNodes) return;
    const { src, out } = seaNodes; seaNodes = null;
    try { const t = audioCtx.currentTime; out.gain.cancelScheduledValues(t); out.gain.setValueAtTime(out.gain.value, t); out.gain.linearRampToValueAtTime(0, t + (fast ? .05 : .6)); src.stop(t + (fast ? .1 : .7)); } catch (e) {}
  }
  /* 지직거리는 잡음 (통화가 강제로 끊길 때) */
  function noiseBurst(sec = 1.2) {
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();
    // 지직-: 끊겼다 이어지는 거친 잡음
    const sr = audioCtx.sampleRate, len = Math.floor(sr * sec), buf = audioCtx.createBuffer(1, len, sr), d = buf.getChannelData(0);
    let on = true, seg = 0, hold = 0, v = 0;
    for (let i = 0; i < len; i++) {
      if (--seg <= 0) { on = Math.random() < .75; seg = Math.floor(sr * (.01 + Math.random() * .06)); }
      if (--hold <= 0) { v = Math.random() * 2 - 1; hold = 1 + Math.floor(Math.random() * 6); }   // 샘플 홀드로 거친 질감
      d[i] = on ? v * (Math.random() < .15 ? 1 : .6) : 0;
    }
    const s = audioCtx.createBufferSource(), g = audioCtx.createGain(); s.buffer = buf; s.connect(g); g.connect(audioCtx.destination);
    const t = audioCtx.currentTime; g.gain.setValueAtTime(.32, t); g.gain.setValueAtTime(.32, t + sec * .8); g.gain.linearRampToValueAtTime(0, t + sec); s.start();
  }
  /* 화면 깜빡임 (흔들림 없이) */
  function flicker(ms = 1300) {
    const dev = $("#device");
    const cv = document.createElement("canvas"); cv.className = "glitch-cv";
    const W = 180, H = 390; cv.width = W; cv.height = H;   // 저해상도로 그려서 늘림 → 거친 픽셀 느낌
    dev.appendChild(cv);
    const g = cv.getContext("2d"), pal = ["#7b2cff", "#b44cff", "#ff3df2", "#2de2ff", "#ffffff", "#ff4a4a", "#3dff8b", "#ffd23d", "#5b5bff"];
    const frame = () => {
      g.clearRect(0, 0, W, H);
      const full = Math.random() < .55;
      if (full) { g.fillStyle = "#000"; g.fillRect(0, 0, W, H); }
      // 굵은 색 띠
      for (let k = 0, n = 1 + (Math.random() * 3 | 0); k < n; k++) {
        const y = Math.random() * H | 0, h = 6 + Math.random() * 40 | 0;
        g.fillStyle = Math.random() < .5 ? "#6a1fff" : (Math.random() < .5 ? "#000" : pal[Math.random() * pal.length | 0]);
        g.globalAlpha = .6 + Math.random() * .4; g.fillRect(0, y, W, h);
      }
      // 가로 줄무늬 (왼쪽에서 번지는 선)
      for (let k = 0; k < 140; k++) {
        const y = Math.random() * H | 0, len = W * (.2 + Math.random() * .8), x = Math.random() < .6 ? 0 : Math.random() * W * .5;
        g.globalAlpha = .35 + Math.random() * .65; g.fillStyle = pal[Math.random() * pal.length | 0];
        g.fillRect(x, y, len, Math.random() < .85 ? 1 : 2);
      }
      // 하얗게 번진 덩어리
      for (let k = 0; k < 3; k++) {
        const y = Math.random() * H, gr = g.createLinearGradient(0, 0, W * .6, 0);
        gr.addColorStop(0, "rgba(255,255,255,.95)"); gr.addColorStop(.25, "rgba(255,180,255,.6)"); gr.addColorStop(1, "rgba(255,255,255,0)");
        g.globalAlpha = 1; g.fillStyle = gr; g.fillRect(0, y, W * .6, 3 + Math.random() * 10);
      }
      // 점 잡음
      g.globalAlpha = .8;
      for (let k = 0; k < 260; k++) { g.fillStyle = Math.random() < .7 ? "#fff" : pal[Math.random() * pal.length | 0]; g.fillRect(Math.random() * W | 0, Math.random() * H | 0, 1 + (Math.random() * 3 | 0), 1); }
      g.globalAlpha = 1;
      cv.style.opacity = full ? 1 : (.45 + Math.random() * .5);
    };
    // 불규칙한 속도: 아주 짧게 튀거나, 잠깐 멈췄다가, 몰아서 깜빡임
    const tgt = () => dev.querySelector(".callui") || screens;
    const FX = ["none", "brightness(2.2) contrast(1.4)", "invert(.9)", "brightness(.35)", "saturate(3) hue-rotate(60deg)", "contrast(2.5) grayscale(.6)"];
    let alive = true, tm = null;
    const step = () => {
      if (!alive) return;
      if (Math.random() < .18) { cv.style.opacity = 0; tgt().style.filter = "none"; }        // 잠깐 정상 화면
      else { frame(); tgt().style.filter = FX[Math.random() * FX.length | 0]; tgt().style.opacity = Math.random() < .25 ? (.2 + Math.random() * .5) : 1; }
      tm = setTimeout(step, Math.random() < .35 ? 15 + Math.random() * 35 : 60 + Math.random() * 190);
    };
    step();
    setTimeout(() => { alive = false; clearTimeout(tm); cv.remove(); const t = tgt(); t.style.filter = ""; t.style.opacity = ""; }, ms);
  }

  /* ================= 크롬 ================= */
  function chromeApp() {
    const CR = P.chrome || { shortcuts: [], searches: [], feed: [], tabs: 1 };
    const card = (f, i) => f.type === "ad"
      ? `<div class="cr-card cr-ad" data-feed="${i}"><div class="cr-img" style="background:linear-gradient(135deg,${f.tone},${f.tone}cc)"><span>${esc(f.brand)}</span></div><div class="cr-txt"><b>${esc(f.title)}</b><p>${esc(f.sub)}</p><div class="cr-meta"><span class="cr-adtag">广告</span>${esc(f.brand)}<em class="cr-cta">${esc(f.cta || "详情")}</em></div></div></div>`
      : `<div class="cr-card" data-feed="${i}"><div class="cr-img" style="background:linear-gradient(140deg,${f.tone},${f.tone}55),repeating-linear-gradient(45deg,rgba(255,255,255,.06) 0 8px,transparent 8px 16px)"></div><div class="cr-txt"><b>${esc(f.title)}</b><div class="cr-meta"><span class="cr-src" style="background:${f.tone}">${esc(f.source[0])}</span>${esc(f.source)} · ${esc(f.time)}<em>⋮</em></div></div></div>`;
    const el = h(`<section class="screen white chrome">
      <div class="cr-bar"><button class="cr-omni" data-search>${ic.search}<span>搜索词或输入网址</span></button></div>
      <div class="scroll">
        <div class="cr-logo">搜索</div>
        <button class="cr-box" data-search>${ic.search}<span>搜索词或输入网址</span><span class="cr-mic">${ic.mic}</span></button>
        <div class="cr-short">${(CR.shortcuts || []).map(x => `<div><i style="background:${x.color}">${esc(x.letter)}</i><span>${esc(x.label)}</span></div>`).join("")}</div>
        <div class="cr-disc"><b>Discover</b><span>⚙︎</span></div>
        ${(CR.feed || []).map(card).join("")}
        <div style="height:20px"></div>
      </div>
      <div class="cr-tool"><span>‹</span><span class="dim">›</span><span class="plus">＋</span><span class="tabs">${CR.tabs || 1}</span><span>⋯</span></div>
    </section>`);
    el.addEventListener("click", e => {
      if (e.target.closest("[data-search]")) { show(searchHistory(), "push"); return; }
      const c = e.target.closest("[data-feed]");
      if (c) { const f = CR.feed[+c.dataset.feed]; show(f.type === "ad" ? adPage(f) : articlePage(f), "push"); }
    });
    return el;
  }
  function articlePage(f) {
    const el = h(`<section class="screen white chrome">
      <div class="cr-bar"><button class="pill round" data-back>${ic.back}</button><div class="cr-omni small"><span>🔒 ${esc(f.source.replace(/\s/g, "").toLowerCase())}.news</span></div></div>
      <div class="scroll cr-article">
        <div class="cr-src-line"><span class="cr-src" style="background:${f.tone}">${esc(f.source[0])}</span>${esc(f.source)}</div>
        <h1>${esc(f.title)}</h1>
        <div class="cr-when">2026.10.18 · ${esc(f.time)}</div>
        <div class="cr-hero" style="background:linear-gradient(140deg,${f.tone},${f.tone}55)"></div>
        ${(f.body || []).map(p => `<p>${esc(p)}</p>`).join("")}
        <div class="cr-inline-ad"><span class="cr-adtag">广告</span> 现在注册首月免费 · 高级财经通讯</div>
        <div style="height:30px"></div>
      </div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    return el;
  }
  function adPage(f) {
    const el = h(`<section class="screen white chrome">
      <div class="cr-bar"><button class="pill round" data-back>${ic.back}</button><div class="cr-omni small"><span>🔒 ${esc(f.brand)}</span></div></div>
      <div class="scroll"><div class="cr-adhero" style="background:linear-gradient(135deg,${f.tone},${f.tone}aa)"><small>${esc(f.brand)}</small><h1>${esc(f.title)}</h1><p>${esc(f.sub)}</p><span>${esc(f.cta || "详情")}</span></div></div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    return el;
  }
  function searchHistory() {
    const list = (P.chrome && P.chrome.searches) || P.searches || [];
    const el = h(`<section class="screen white chrome">
      <div class="cr-bar"><div class="cr-omni active">${ic.search}<span>搜索词或输入网址</span></div><button class="cr-cancel" data-back>取消</button></div>
      <div class="scroll"><div class="cr-histttl">最近搜索</div>${list.map(s => `<div class="hist">${ic.clock}<span>${esc(s)}</span><button class="del">✕</button></div>`).join("")}</div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    el.addEventListener("click", e => { const d = e.target.closest(".del"); if (d) d.parentElement.remove(); });
    return el;
  }

  /* ================= 메시지 ================= */
  function messagesApp() {
    const M = P.messages;
    const el = h(`<section class="screen white">
      <div class="navbar"><span class="pill">编辑</span><b style="font-size:17px">信息</b><span class="pill round">${ic.menu}</span></div>
      <div class="scroll">
        ${M.pinned ? `<button class="pinned" style="width:100%" data-chat="${esc(M.pinned)}">${av(M.pinned)}<span>${esc(M.pinned)}</span></button>` : `<div style="height:8px"></div>`}
        <div data-threads>${threadsHTML()}</div>
        <div style="height:110px"></div>
      </div>
      <div class="bottomsearch" style="position:absolute;left:0;right:0;bottom:0"><div class="searchfield">${ic.search}<span>搜索</span><span class="mic">${ic.mic}</span></div><span class="pill round">${ic.compose}</span></div>
    </section>`);
    el.addEventListener("click", e => {
      const c = e.target.closest("[data-chat]"), t = e.target.closest("[data-thread]");
      if (c) show(imChat(c.dataset.chat, M.chats[c.dataset.chat] || []), "push");
      if (t) { const th = M.threads[+t.dataset.thread]; th.unread = false; t.querySelector(".dot")?.remove(); if (!M.chats[th.name]) M.chats[th.name] = [{ text: th.preview }]; show(imChat(th.name, M.chats[th.name], th.sms), "push"); }
    });
    messagesListEl = el;
    return el;
  }
  let messagesListEl = null;
  function threadsHTML() {
    return P.messages.threads.map((t, i) => `<button class="thread" style="width:100%;text-align:left" data-thread="${i}">${t.unread ? '<i class="dot"></i>' : ""}${av(t.name)}<div class="body"><div class="row"><span class="nm">${esc(t.name)}</span><span class="when">${esc(t.when)}</span></div><div class="pv">${esc(t.preview)}</div></div></button>`).join("");
  }
  /* 입력창: 글자를 쓰면 发送 버튼이 나오고, 보내면 onSend(text) */
  function wireComposer(el, onSend) {
    const input = el.querySelector("[data-input]"), btn = el.querySelector("[data-send]");
    const sync = () => btn.classList.toggle("on", input.value.trim().length > 0);
    const send = () => { const t = input.value.trim(); if (!t) return; input.value = ""; sync(); onSend(t); input.focus(); };
    input.addEventListener("input", sync);
    input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.isComposing) { e.preventDefault(); send(); } });
    btn.addEventListener("click", send);
    ["pointerdown", "pointerup"].forEach(t => el.querySelector(".composer, .kcomp").addEventListener(t, e => e.stopPropagation()));
  }
  function imChat(name, msgs, sms) {
    const body = msgs.map(m => {
      const side = m.me ? "me" : "them";
      if (m.date) return `<div class="date">${esc(m.date)}</div>`;
      if (m.img !== undefined) return photoBox(m, side);
      if (m.voice) return `<div class="bub voice me"><span class="play"><svg width="12" height="12" viewBox="0 0 10 10"><path d="M2 1l7 4-7 4z" fill="#3d97f5"/></svg></span><span class="wave"></span><small>${esc(m.voice)}</small></div>`;
      return `<div class="bub ${side}${sms ? " sms" : ""}">${esc(m.text)}</div>`;
    }).join("");
    const el = h(`<section class="screen white">
      <div class="chat-head"><button class="pill round" data-back>${ic.back}</button><div class="who" ${(P.callScripts || {})[name] ? "data-callme" : ""}>${av(name)}<b>${esc(name)} ›</b></div>${(P.callScripts || {})[name] ? `<button class="pill round" data-callme><svg viewBox="0 0 24 24" width="20" height="20"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" fill="currentColor"/></svg></button>` : `<span class="pill round">${ic.video}</span>`}</div>
      <div class="scroll" data-autobottom><div class="imsg">${body}</div></div>
      <div class="composer${sms ? " is-sms" : ""}"><span class="plus">+</span><label class="field"><input data-input enterkeyhint="send" autocomplete="off" placeholder="${sms ? "短信" : "iMessage"}"><button class="send" data-send aria-label="发送"><svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></label></div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    el.querySelectorAll("[data-callme]").forEach(b => { b.style.cursor = "pointer"; b.onclick = () => outgoingCall(name); });
    // 이 방에 머무는 동안 불규칙하게 (2~15초 간격) 화면이 꺼질 듯 어두워졌다 밝아짐
    if ((P.messages.haunted || []).includes(name)) {
      const dim = (n) => {
        if (!el.isConnected) return;
        const down = 40 + Math.random() * 520, hold = 30 + Math.random() * 380, up = 60 + Math.random() * 700;
        el.style.transition = `filter ${down}ms ease-in`;
        el.style.filter = `brightness(${(.22 + Math.random() * .33).toFixed(2)})`;
        setTimeout(() => {
          el.style.transition = `filter ${up}ms ease-out`; el.style.filter = "";
          if (n > 1) setTimeout(() => dim(n - 1), up * (.3 + Math.random() * .6));   // 연달아 한두 번 더 휘청
        }, down + hold);
      };
      const loop = () => setTimeout(() => {
        if (!el.isConnected) return;
        if (stack[stack.length - 1] === el && !callEl && layer.classList.contains("open")) dim(Math.random() < .35 ? 2 + (Math.random() * 2 | 0) : 1);
        loop();
      }, 2000 + Math.random() * 13000);
      loop();
    }
    wireComposer(el, text => {
      msgs.push({ me: true, text });
      el.querySelector(".imsg").insertAdjacentHTML("beforeend", `<div class="bub me${sms ? " sms" : ""} sent">${esc(text)}</div>`);
      const sc = el.querySelector(".scroll"); sc.scrollTop = sc.scrollHeight;
      const M = P.messages; let th = M.threads.find(t => t.name === name);
      if (th) M.threads.splice(M.threads.indexOf(th), 1); else th = { name, sms };
      Object.assign(th, { preview: text, when: P.time, unread: false }); M.threads.unshift(th);
      if (messagesListEl && messagesListEl.isConnected) messagesListEl.querySelector("[data-threads]").innerHTML = threadsHTML();
      // 무슨 말을 보내도 오는 답장 (한 바퀴만)
      const SA = (P.messages.anyReplies || {})[name];
      if (SA && (SA._i ?? -1) + 1 < SA.length) {
        const r = SA[(SA._i = (SA._i ?? -1) + 1)];
        let wait = 1600;
        (Array.isArray(r) ? r : [r]).forEach(x => setTimeout(() => {
          msgs.push({ text: x });
          if (el.isConnected) { el.querySelector(".imsg").insertAdjacentHTML("beforeend", `<div class="bub them${sms ? " sms" : ""}">${esc(x)}</div>`); const s2 = el.querySelector(".scroll"); s2.scrollTop = s2.scrollHeight; }
          try { msgTone(); } catch (e) {}
          const th2 = P.messages.threads.find(t => t.name === name); if (th2) th2.preview = x;
          if (messagesListEl && messagesListEl.isConnected) messagesListEl.querySelector("[data-threads]").innerHTML = threadsHTML();
        }, (wait += 1300) - 1300));
      }
      // 답장하면 그 번호에서 먼저 전화가 옴 (한 번만)
      const RC = (P.messages.replyCall || {})[name], cs = (P.callScripts || {})[name];
      // 통화한 뒤에는: 답장이 왔다가 0.8초 뒤 잡음과 함께 사라짐 (보낼 때마다)
      if (RC && cs && cs._used) {
        setTimeout(() => {
          if (!el.isConnected) return;
          const L = RC.ghost || ["…"], txt = L[(RC._g = (RC._g ?? -1) + 1) % L.length];
          const b = h(`<div class="bub them${sms ? " sms" : ""} ghost">${esc(txt)}</div>`);
          el.querySelector(".imsg").appendChild(b); try { msgTone(); } catch (x) {}
          const sc = el.querySelector(".scroll"); sc.scrollTop = sc.scrollHeight;
          setTimeout(() => { try { noiseBurst(.35); } catch (x) {} flicker(350); b.remove(); }, 800);
        }, RC.ghostDelay || 1600);
        return;
      }
      if (RC && cs && !cs._used && !RC._fired) {
        RC._fired = true;
        setTimeout(() => { if (!callEl) incomingCall({ from: name, ringSeconds: 30, lineStart: 1100, hangUpAfter: 900, lines: cs.lines, ambience: cs.ambience, onAnswer: () => { cs._used = true; } }); }, RC.delay || 3000);
      }
    });
    return el;
  }

  /* ================= KakaoTalk ================= */
  let kakaoNotified = false;
  const kav = c => c && c.channel ? `<div class="av kch"><span>${esc(c.name[0])}</span></div>` : av(c ? c.name : "");
  function kakaoApp() {
    const K = P.kakao;
    const row = (c, extra = "") => `<button class="kk-row ${extra}${c.pinned ? " pin" : ""}" style="width:100%;text-align:left" data-room="${esc(c.name)}">${kav(c)}<div class="body"><div class="nm">${esc(c.name)}${c.pinned ? `<svg class="kpin" viewBox="0 0 24 24" width="13" height="13"><path d="M15 3l6 6-3 1-4 4 .5 4.5L13 20l-4-4-5 5-1-1 5-5-4-4 1.5-1.5L10 10l4-4z" fill="#b0b0b5"/></svg>` : ""}</div><div class="pv">${esc(c.preview)}</div></div><div class="meta"><span>${esc(c.when)}</span>${c.unread ? `<em>${c.unread}</em>` : ""}</div></button>`;
    const el = h(`<section class="screen kk">
      <div class="kk-top"><h2>聊天</h2><div class="icons">${ic.search}<svg viewBox="0 0 24 24"><path d="M12 4c-4.4 0-8 2.9-8 6.5 0 2.3 1.5 4.3 3.7 5.5L7 20l3.6-2.4c.5.1.9.1 1.4.1 4.4 0 8-2.9 8-6.5S16.4 4 12 4z"/></svg><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1.3z"/></svg></div></div>
      <div class="kk-chips"><span class="on">全部</span><span>💬 <em data-kbadge>${P.badges.kakao}</em></span><span>ChatGPT</span><span style="color:#2fbf4a">✆</span></div>
      <div class="scroll">
        ${K.ad ? `<div class="kk-ad"><div><small>${esc(K.ad.label)} ›</small><b>${esc(K.ad.title)}</b><span>${esc(K.ad.sub)}</span></div><div class="${K.ad.icon === "book" ? "kbook" : K.ad.icon === "coat" ? "kcoat" : "bottle"}"></div></div>` : ""}
        <div data-list>${K.chats.map(c => row(c)).join("")}</div>
      </div>
      <nav class="kk-tab">
        <span><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.5"/><path d="M3 21c1-5 5-7 9-7s8 2 9 7z"/></svg></span>
        <span class="on c"><svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.8 5.3 4.6 6.7L5.5 22l4.6-3.1c.6.1 1.2.1 1.9.1 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg><em data-kbadge>${P.badges.kakao}</em></span>
        <span><svg viewBox="0 0 24 24"><circle cx="9" cy="12" r="7"/><circle cx="16" cy="12" r="6" opacity=".6"/></svg></span>
        <span><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2" /></svg></span>
        <span><svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></span>
      </nav>
    </section>`);
    el.addEventListener("click", e => {
      const r = e.target.closest("[data-room]"); if (!r) return;
      const name = r.dataset.room, c = K.chats.find(x => x.name === name);
      if (c && c.unread) { P.badges.kakao -= c.unread; c.unread = 0; updKakaoBadges(); const em = r.querySelector(".meta em"); if (em) em.remove(); }
      const msgs = K.rooms[name] || [{ text: c ? c.preview : "", time: c?.when }];
      if (!K.rooms[name]) K.rooms[name] = msgs;
      show(kakaoRoom(name, K.rooms[name]), "push");
    });
    kakaoList = { el, row };
    return el;
  }
  let kakaoList = null;
  /* 고정 채팅방은 항상 맨 위에 두고, 새 대화는 그 아래로 */
  function kTop(c) { const K = P.kakao; const n = K.chats.filter(x => x.pinned && x !== c).length; K.chats.splice(c.pinned ? 0 : n, 0, c); }
  function kPrepend(list, node, c) { const pins = c.pinned ? [] : list.querySelectorAll(".kk-row.pin"); const last = pins[pins.length - 1]; if (last) last.after(node); else list.prepend(node); }
  /* 카톡 한 통 도착: 데이터·목록·대화방·배지·알림 반영 */
  function deliverKakao(from, text) {
    const K = P.kakao;
    msgTone();
    const room = (K.rooms[from] = K.rooms[from] || []);
    const todayLabel = `${TODAY.getFullYear()}年 ${TODAY.getMonth() + 1}月 ${TODAY.getDate()}日 星期${WD[TODAY.getDay()]}`;
    const lastDate = [...room].reverse().find(m => m.date);
    const needDate = !lastDate || lastDate.date !== todayLabel;
    if (needDate) room.push({ date: todayLabel });
    room.push({ text, time: P.time });
    let c = K.chats.find(x => x.name === from);
    if (c) K.chats.splice(K.chats.indexOf(c), 1); else c = { name: from };
    const top = stack[stack.length - 1], viewing = top && top.dataset.room === from;
    Object.assign(c, { preview: text, when: P.time, unread: viewing ? 0 : (c.unread || 0) + 1 });
    kTop(c);
    if (!viewing) { P.badges.kakao++; updKakaoBadges(); }
    if (kakaoList && kakaoList.el.isConnected) {
      const list = kakaoList.el.querySelector("[data-list]");
      list.querySelector(`[data-room="${CSS.escape(from)}"]`)?.remove();
      kPrepend(list, h(kakaoList.row(c, "new")), c);
    }
    if (viewing) {
      top.querySelector(".kmsgs").insertAdjacentHTML("beforeend", `${needDate ? `<div class="date">${todayLabel}</div>` : ""}<div class="kline them"><div class="kb">${esc(text)}</div><div class="kmeta"><span>${esc(P.time)}</span></div></div>`);
      const sc = top.querySelector(".scroll"); sc.scrollTop = sc.scrollHeight;
    } else {
      showBanner({ app: "KakaoTalk", from, text, onTap: () => openKakaoRoom(from) });
    }
  }
  /* 알림을 눌렀을 때: 카톡 앱 → 해당 대화방으로 바로 이동 */
  function openKakaoRoom(name) {
    if (callEl) return;   // 통화 중에는 알림만 닫힘
    const K = P.kakao;
    const top = stack[stack.length - 1];
    if (!(kakaoList && top === kakaoList.el) && !(top && top.dataset.room)) show(kakaoApp(), "push");
    const c = K.chats.find(x => x.name === name);
    if (c && c.unread) {
      P.badges.kakao -= c.unread; c.unread = 0; updKakaoBadges();
      kakaoList.el.querySelector(`[data-room="${CSS.escape(name)}"] .meta em`)?.remove();
    }
    show(kakaoRoom(name, (K.rooms[name] = K.rooms[name] || [])), "push");
  }
  /* 강민재 카톡 등 예약 알림: 캘린더 알림이 꺼지고 나서 시작 */
  let kakaoQueueStarted = false;
  function startKakaoQueue() {
    const N = P.kakao.notification;
    if (kakaoQueueStarted || !N || !N.from) return;
    kakaoQueueStarted = true;
    const queue = N.messages || [{ text: N.text, delay: N.delay }];
    let i = 0;
    const next = () => {
      if (i >= queue.length) return;
      setTimeout(function fire() {
        if (!layer.classList.contains("open") || locked) { setTimeout(fire, 1000); return; }   // 휴대폰이 닫혀 있으면 열릴 때까지 대기
        deliverKakao(N.from, queue[i++].text);
        next();
      }, queue[i].delay || 2000);
    };
    next();
  }
  function updKakaoBadges() {
    document.querySelectorAll('[data-badge="kakao"],[data-kbadge]').forEach(b => { b.textContent = P.badges.kakao; b.style.display = P.badges.kakao > 0 ? "" : "none"; });
  }
  function kakaoRoom(name, msgs) {
    const body = msgs.map(m => {
      if (m.date) return `<div class="date">${esc(m.date)}</div>`;
      const side = m.me ? "me" : "them";
      const inner = m.deleted ? `<div class="kb kdel">ⓘ 消息已删除</div>` : m.img !== undefined ? photoBox(m, side) : `<div class="kb">${esc(m.text)}</div>`;
      const meta = (m.time || m.unread) ? `<div class="kmeta">${m.unread ? `<i>${m.unread}</i>` : ""}<span>${esc(m.time || "")}</span></div>` : "";
      return `<div class="kline ${side}">${inner}${meta}</div>`;
    }).join("");
    const el = h(`<section class="screen kroom">
      <div class="chat-head"><button class="pill round" data-back>${ic.back}</button><b style="font-size:17px;padding-top:10px">${esc(name)}</b><span class="pill round">${ic.search}</span></div>
      <div class="scroll" data-autobottom><div class="kmsgs">${body}</div></div>
      <div class="kcomp"><label class="field"><span class="plus">+</span><input data-input enterkeyhint="send" autocomplete="off" placeholder="输入消息"><span class="hash">#</span><button class="ksend" data-send aria-label="发送"><svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="#3c1e1e" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></label></div>
    </section>`);
    el.dataset.room = name;
    el._rename = n => { name = n; };
    el.querySelector("[data-back]").onclick = back;
    wireComposer(el, typed => {
      let SC = (P.kakao.scripted || {})[name];
      if (SC && SC.once && SC.used) SC = null;
      if (SC) SC.used = true;
      // 트리거 단어를 한참 안 쓰면 정해진 문장이 대신 发送됨
      let sendText = typed;
      const NG = !SC && (P.kakao.nudge || {})[name];
      if (NG && !NG.done) {   // 아직 안 쓴 트리거 단어만, 그 단어 없이 after번 보내면 대신 发送 (한 번만)
        const has = (t, w) => t.replace(/\s+/g, "").includes(w);
        NG.used = NG.used || {};
        const left = () => NG.lines.filter(l => !NG.used[l.word]);
        if (NG.forcing || (NG.miss || 0) >= NG.after) {
          NG.forcing = true;
          const l = left()[0]; sendText = l.text; NG.used[l.word] = true;
          if (!left().length) NG.done = true;
        } else {
          const hit = left().filter(l => has(typed, l.word));
          if (hit.length) { hit.forEach(l => NG.used[l.word] = true); NG.miss = 0; if (!left().length) NG.done = true; }
          else NG.miss = (NG.miss || 0) + 1;
        }
      }
      (SC ? SC.send : [sendText]).forEach(text => {
      const todayLabel = `${TODAY.getFullYear()}年 ${TODAY.getMonth() + 1}月 ${TODAY.getDate()}日 星期${WD[TODAY.getDay()]}`;
      const lastDate = [...msgs].reverse().find(m => m.date);
      const needDate = !lastDate || lastDate.date !== todayLabel;
      if (needDate) msgs.push({ date: todayLabel });
      msgs.push({ me: true, text, time: P.time, unread: 1 });
      el.querySelector(".kmsgs").insertAdjacentHTML("beforeend", `${needDate ? `<div class="date">${todayLabel}</div>` : ""}<div class="kline me sent"><div class="kb">${esc(text)}</div><div class="kmeta"><i>1</i><span>${esc(P.time)}</span></div></div>`);
      const sc = el.querySelector(".scroll"); sc.scrollTop = sc.scrollHeight;
      const K = P.kakao; let c = K.chats.find(x => x.name === name);
      if (c) K.chats.splice(K.chats.indexOf(c), 1); else c = { name };
      Object.assign(c, { preview: text, when: P.time, unread: 0 }); kTop(c);
      if (kakaoList && kakaoList.el.isConnected) { const list = kakaoList.el.querySelector("[data-list]"); list.querySelector(`[data-room="${CSS.escape(name)}"]`)?.remove(); kPrepend(list, h(kakaoList.row(c)), c); }
      });
      const K = P.kakao, text = sendText;
      // 정해진 대화: 무엇을 보내도 위 문장이 发送되고, 답장은 목록 중 하나가 랜덤
      if (SC) {
        setTimeout(() => { msgs.forEach(m => { if (m.me) delete m.unread; }); el.querySelectorAll(".kline.me .kmeta i").forEach(x => x.remove()); }, 900);
        setTimeout(() => deliverKakao(name, SC.replies[Math.floor(Math.random() * SC.replies.length)]), 1800);
        return;
      }
      // 자동 답장
      const norm = t => t.replace(/[\s.!?~…]+/g, "");
      const hit = r => r.match.some(m => r.contains ? norm(text).includes(norm(m)) : norm(m) === norm(text));
      const rule = ((K.autoReplies || {})[name] || []).find(hit);
      const callRule = ((K.callTriggers || {})[name] || []).find(hit);
      if (callRule) {
        setTimeout(() => { msgs.forEach(m => { if (m.me) delete m.unread; }); el.querySelectorAll(".kline.me .kmeta i").forEach(x => x.remove()); }, 900);
        setTimeout(() => { if (!callEl) incomingCall(callRule.call.renameTo ? { ...callRule.call, onEnd: () => renameContact(name, callRule.call.renameTo) } : callRule.call); }, callRule.delay || 2500);
        return;
      }
      if (rule) {
        let wait = 1400;
        setTimeout(() => {   // 읽음 표시(1) 없애기
          msgs.forEach(m => { if (m.me) delete m.unread; });
          el.querySelectorAll(".kline.me .kmeta i").forEach(x => x.remove());
        }, 900);
        rule.replies.forEach(r => { setTimeout(() => deliverKakao(name, r), wait); wait += 1300; });
        return;
      }
      // 무슨 말을 보내도 돌아오는 답장 (차례대로 돌아가며)
      const AR = (K.anyReplies || {})[name];
      const ARL = (K.anyRepliesLoop || []).includes(name);   // 반복하는 방은 계속 답장
      if (AR && AR.length && (ARL || (AR._i ?? -1) + 1 < AR.length)) {   // 한 바퀴 다 돌면 더는 답장 없음 (읽지도 않음)
        setTimeout(() => { msgs.forEach(m => { if (m.me) delete m.unread; }); el.querySelectorAll(".kline.me .kmeta i").forEach(x => x.remove()); }, 900);
        const r = AR[(AR._i = ((AR._i ?? -1) + 1)) % AR.length];
        let wait = 1600; (Array.isArray(r) ? r : [r]).forEach(x => { setTimeout(() => deliverKakao(name, x), wait); wait += 1300; });
      }
    });
    return el;
  }
  const banner = $("#banner"); let bannerTimer;
  function showBanner(N) {
    if (bannerCur && bannerCur !== N && bannerCur.onHide) { const prev = bannerCur; bannerCur = null; prev.onHide(); }
    bannerCur = N;
    banner.innerHTML = `<div class="bi${N.kind === "calendar" ? " cal" : ""}">${N.kind === "calendar" ? I.calendar : ""}</div><div class="bt"><small>${esc(N.app)}</small><b>${esc(N.from)}</b>${esc(N.text)}</div><time>现在</time>`;
    banner.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add("show")));
    clearTimeout(bannerTimer); bannerTimer = setTimeout(hideBanner, N.duration || 5000);
  }
  let bannerCur = null;
  function hideBanner() {
    banner.classList.remove("show");
    const cur = bannerCur; bannerCur = null;
    if (cur && cur.onHide) cur.onHide();
  }
  banner.onclick = () => { const cur = bannerCur; hideBanner(); if (cur && cur.onTap) cur.onTap(); };

  /* ================= 메모 ================= */
  function notesApp() {
    const groups = [];
    P.notes.forEach((n, i) => { let g = groups.find(x => x.name === n.group); if (!g) groups.push(g = { name: n.group, items: [] }); g.items.push([n, i]); });
    const el = h(`<section class="screen notes">
      <div class="navbar"><span class="pill round">${ic.back}</span><span class="pill round">${ic.more}</span></div>
      <div class="scroll">
        <div class="bigtitle" style="padding-bottom:4px">全部 iCloud</div>
        <div class="count">${P.notes.length}条备忘录</div>
        ${groups.map(g => `<h3>${esc(g.name)}</h3>${g.items.map(([n, i]) => {
          const first = n.body.split("\n").filter(Boolean).join(" ") || "无更多文字";
          return `<button class="ncard" data-note="${i}"><b>${esc(n.title)}</b><div class="d"><em>${esc(n.date)}</em>${esc(first)}</div><div class="f">🗀 备忘录</div></button>`;
        }).join("")}`).join("")}
        <div style="height:20px"></div>
      </div>
      <div class="bottomsearch"><div class="searchfield">${ic.search}<span>搜索</span><span class="mic">${ic.mic}</span></div><span class="pill round">${ic.compose}</span></div>
    </section>`);
    el.querySelector(".navbar .pill").onclick = goHome;
    el.addEventListener("click", e => { const c = e.target.closest("[data-note]"); if (c) show(noteDetail(P.notes[+c.dataset.note]), "push"); });
    return el;
  }
  /* 메모 본문: "☐ "로 시작하는 줄은 눌러서 체크할 수 있는 체크리스트 */
  function noteBodyHTML(n) {
    n.done = n.done || {};
    return n.body.split("\n").map((line, i) => line.startsWith("☐")
      ? `<div class="nchk${n.done[i] ? " on" : ""}" data-ci="${i}"><i class="nbox"><svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></i><span>${esc(line.replace(/^☐\s*/, ""))}</span></div>`
      : `<div class="nline">${esc(line) || "&nbsp;"}</div>`).join("");
  }
  function noteDetail(n) {
    const el = h(`<section class="screen white">
      <div class="navbar"><button class="pill round" data-back>${ic.back}</button><span class="pill" style="gap:6px;padding:0 6px">${ic.undo.replace("<svg", '<svg style="margin:0 6px"')}${ic.share.replace("<svg", '<svg style="margin:0 6px"')}${ic.more.replace("<svg", '<svg style="margin:0 6px"')}</span></div>
      <div class="scroll"><div class="note-body"><div class="note-title">${esc(n.title)}</div>${noteBodyHTML(n)}</div></div>
      <div class="note-tools"><span class="grp">${ic.check}${ic.clip}${ic.pen}</span><span class="grp">${ic.compose}</span></div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    el.addEventListener("click", e => {
      const c = e.target.closest("[data-ci]"); if (!c) return;
      const i = +c.dataset.ci; n.done[i] = !n.done[i]; c.classList.toggle("on", n.done[i]);
    });
    return el;
  }

  /* ================= 번역 ================= */
  function translateApp() {
    const el = h(`<section class="screen white">
      <div class="tr-top"><button data-saved><svg viewBox="0 0 24 24"><path d="M7 3h10v18l-5-4-5 4z"/></svg></button><span class="brand"><b>翻译</b></span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18.5c1.5-2 3.5-3 5.5-3s4 1 5.5 3"/></svg></div>
      <div class="tr-input">输入文字</div>
      <div class="tr-langs"><span>韩语</span>⇄<span>中文（繁体）</span></div>
      <div class="tr-actions"><span class="sm"><i></i>实时翻译</span><span class="mic">${ic.mic}</span><span class="sm"><i></i>相机</span></div>
    </section>`);
    el.querySelector("[data-saved]").onclick = () => show(savedTranslations(), "push");
    return el;
  }
  function savedTranslations() {
    const el = h(`<section class="screen white">
      <div class="tr-head"><button data-back>‹ 主页</button>已保存的翻译</div>
      <div class="tr-tabs"><span class="on">表达笔记</span><span>脚本</span></div>
      <div class="scroll">${P.translations.map(t => `<div class="tr-item"><div class="t"><div class="src">${esc(t.src)}</div><div class="ko">${esc(t.ko)}</div></div><i class="bm"></i></div>`).join("")}<div style="height:40px"></div></div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    return el;
  }

  /* ================= 사진 ================= */
  function photosApp() {
    const imgs = [...SHOTS, ...(P.photos.images || [])];
    const n = Math.max(imgs.length, 60);
    const tile = i => {
      if (imgs[i]) return `background-image:url('${esc(imgs[i])}')`;
      const hue = (i * 47) % 360, l = 55 + (i * 13) % 25;
      return `background:linear-gradient(${(i * 67) % 360}deg,hsl(${hue} 25% ${l}%),hsl(${(hue + 40) % 360} 30% ${l - 22}%))`;
    };
    const el = h(`<section class="screen photos">
      <div class="ph-head"><div><h2>资料库</h2><small>${esc(P.photos.count)}个项目</small></div><div class="btns"><span class="pill round">${ic.menu}</span><span class="pill">选择</span></div></div>
      <div class="scroll"><div class="ph-grid">${[...Array(n)].map((_, i) => `<div data-ph="${i}" style="${tile(i)}"></div>`).join("")}</div><div style="height:120px"></div></div>
      <div class="ph-tab"><span class="seg2"><span class="on"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="5" width="15" height="14" rx="2"/><rect x="6" y="2" width="15" height="14" rx="2" opacity=".5"/></svg>资料库</span><span><svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="6" width="16" height="14" rx="2"/><rect x="6" y="3" width="12" height="2" rx="1"/></svg>合集</span></span><span class="srch">${ic.search}</span></div>
    </section>`);
    el.addEventListener("click", e => {
      const t = e.target.closest("[data-ph]"); if (!t) return;
      const v = h(`<section class="screen viewer" data-dark="1"><div class="navbar"><button class="pill round" data-back style="background:rgba(255,255,255,.2)">${ic.back.replace('<svg', '<svg style="stroke:#fff"')}</button></div><div class="img" style="${t.getAttribute("style")};background-size:${imgs[+t.dataset.ph] ? "contain" : "cover"}"></div><div style="height:60px"></div></section>`);
      v.querySelector("[data-back]").onclick = back;
      show(v, "push");
    });
    el.querySelector(".scroll").scrollTop = 0;
    return el;
  }


  /* ================= 시계 ================= */
  /* 计时器가 끝나면: 알림 + 알림음 → 잠시 뒤 정해진 링크로 이동 (다른 앱을 보고 있어도 작동) */
  let timerDone = null;
  function armTimer(ms) {
    clearTimeout(timerDone); timerDone = null;
    if (ms == null) return;
    timerDone = setTimeout(() => {
      const C = P.clock || {}, T = C._timer; if (T) T.running = false;
      try { msgTone(); setTimeout(msgTone, 400); setTimeout(msgTone, 800); } catch (e) {}
      showBanner({ app: "时钟", from: "计时器", text: "计时结束" });
      const link = (C.timer || {}).link;
      if (link) setTimeout(() => { window.location.href = link; }, 1500);
    }, Math.max(0, ms));
  }
  function clockApp() {
    const C = P.clock || {};
    const tabs = [
      ["world", "世界时钟", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9.5"/><ellipse cx="12" cy="12" rx="4.2" ry="9.5"/><path d="M2.5 12h19M4 7h16M4 17h16M12 2.5v19"/></svg>`],
      ["alarm", "闹钟", `<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" fill="currentColor"/><path d="M12 9v4.5H9" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M3.5 6.5l3-3M20.5 6.5l-3-3" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M7 20l-1.5 2M17 20l1.5 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`],
      ["stopwatch", "秒表", `<svg viewBox="0 0 24 24"><circle cx="12" cy="13.5" r="8.5" fill="currentColor"/><path d="M12 9v5" stroke="#000" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="14" r="1.3" fill="#000"/><path d="M10 2.5h4M12 2.5V5M18.5 6l1.5-1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`],
      ["timer", "计时器", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3a9 9 0 1 1-6.4 2.6"/><path d="M12 3v3M7.5 8.5L12 12"/></svg>`]
    ];
    const el = h(`<section class="screen clock" data-dark="1">
      <div class="ck-body"></div>
      <nav class="ck-tab">${tabs.map(([id, label, svg]) => `<button data-tab="${id}">${svg}<span>${label}</span></button>`).join("")}</nav>
    </section>`);
    const body = el.querySelector(".ck-body");
    const alive = () => el.isConnected;
    const pad = n => String(n).padStart(2, "0");

    /* --- 世界时钟 --- */
    const world = () => {
      const [hh, mm] = P.time.split(":").map(Number), home = C.home ?? 9;
      return `<div class="ck-nav"><span></span><span class="ck-btn">编辑</span><span class="ck-btn round">＋</span></div>
      <div class="scroll"><h1 class="ck-title">世界时钟</h1>
      ${(C.world || []).map(w => {
        const diff = w.offset - home; let t = hh * 60 + mm + diff * 60, day = "今天";
        if (t < 0) { t += 1440; day = "昨天"; } else if (t >= 1440) { t -= 1440; day = "明天"; }
        const H = Math.floor(t / 60), M = t % 60;
        const ap = H < 12 ? "上午" : "下午", h12 = H % 12 === 0 ? 12 : H % 12;
        return `<div class="ck-row"><div><small>${day}, ${diff >= 0 ? "+" : ""}${diff}小时</small><b class="ck-city">${esc(w.city)}</b></div><div class="ck-wt"><span>${ap}</span>${h12}:${pad(M)}</div></div>`;
      }).join("")}</div>`;
    };

    /* --- 闹钟 --- */
    const alarm = () => `<div class="ck-nav"><span></span><span class="ck-btn">编辑</span><span class="ck-btn round">＋</span></div>
      <div class="scroll"><h1 class="ck-title">闹钟</h1>
        <div class="ck-sec">🛏 睡眠 | 起床</div>
        <div class="ck-row"><span class="ck-none">${esc(C.sleep || "无闹钟")}</span><span class="ck-chg">更改</span></div>
        <div class="ck-sec" style="margin-top:44px">其他</div>
        ${(C.alarms || []).map((a, i) => `<div class="ck-row ${a.on ? "" : "off"}" data-alarm="${i}"><div><div class="ck-time">${esc(a.time)}</div><small>${esc(a.label)}${a.repeat ? " · " + esc(a.repeat) : ""}</small></div><button class="sw ${a.on ? "on" : ""}" aria-label="开关闹钟"><i></i></button></div>`).join("")}
      </div>`;

    /* --- 秒表 --- */
    const sw = C._sw || (C._sw = { run: false, start: 0, acc: 0, laps: [], lapStart: 0 });
    const swNow = () => sw.acc + (sw.run ? performance.now() - sw.start : 0);
    const fmt = ms => { const cs = Math.floor(ms / 10) % 100, s = Math.floor(ms / 1000) % 60, m = Math.floor(ms / 60000); return `${pad(m)}:${pad(s)}.${pad(cs)}`; };
    const stopwatch = () => `<div class="ck-nav"></div>
      <div class="ck-sw-time" data-swt>${fmt(swNow())}</div>
      <div class="ck-btns"><button class="cbtn gray" data-swl>${sw.run ? "计次" : (swNow() ? "重置" : "计次")}</button><span class="ck-dots"><i class="on"></i><i></i></span><button class="cbtn ${sw.run ? "red" : "green"}" data-sws>${sw.run ? "停止" : "开始"}</button></div>
      <div class="scroll ck-laps" data-laps></div>`;
    const drawLaps = () => {
      const box = body.querySelector("[data-laps]"); if (!box) return;
      const cur = swNow() - sw.lapStart;
      const rows = (swNow() || sw.laps.length) ? [`<div class="lap"><span>计次 ${sw.laps.length + 1}</span><span>${fmt(cur)}</span></div>`] : [];
      sw.laps.slice().reverse().forEach((l, i) => rows.push(`<div class="lap"><span>计次 ${sw.laps.length - i}</span><span>${fmt(l)}</span></div>`));
      box.innerHTML = rows.join("");
    };
    const swLoop = () => {
      if (!alive() || !sw.run) return;
      const t = body.querySelector("[data-swt]"); if (t) { t.textContent = fmt(swNow()); drawLaps(); }
      requestAnimationFrame(swLoop);
    };

    /* --- 计时器 --- */
    const T = C._timer || (C._timer = { h: C.timer?.h ?? 0, m: C.timer?.m ?? 9, s: C.timer?.s ?? 0, running: false, paused: false, end: 0, left: 0, total: 0 });
    const wheel = (key, max, unit) => `<div class="wheel" data-wheel="${key}" data-max="${max}"><div class="wpad"></div>${[...Array(max + 1)].map((_, i) => `<div class="wi">${i}</div>`).join("")}<div class="wpad"></div></div><span class="wunit u-${key}">${unit}</span>`;
    const tLeft = () => T.running ? (T.paused ? T.left : Math.max(0, T.end - Date.now())) : 0;
    const tfmt = ms => { const t = Math.ceil(ms / 1000), H = Math.floor(t / 3600), M = Math.floor(t / 60) % 60, S = t % 60; return H ? `${H}:${pad(M)}:${pad(S)}` : `${pad(M)}:${pad(S)}`; };
    const timer = () => `<div class="ck-nav"><span></span><span></span><span class="ck-btn">编辑</span></div>
      <div class="scroll"><h1 class="ck-title">计时器</h1>
        ${T.running ? `<div class="ck-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" class="bg"/><circle cx="50" cy="50" r="46" class="fg" data-ring/></svg><div class="ck-rt" data-tt>${tfmt(tLeft())}</div></div>`
          : `<div class="picker"><div class="pbar"></div>${wheel("h", 23, "时间")}${wheel("m", 59, "分钟")}${wheel("s", 59, "秒")}</div>`}
        <div class="ck-btns"><button class="cbtn gray ${T.running ? "" : "x"}" data-tc ${T.running ? "" : "disabled"}>${T.running ? "取消" : "✕"}</button><button class="cbtn ${T.running && !T.paused ? "orange" : "green"}" data-ts>${T.running ? (T.paused ? "继续" : "暂停") : `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M7 4l14 8-14 8z" fill="currentColor"/></svg>`}</button></div>
        <div class="ck-card"><div><span>标签</span><span class="dim">计时器</span></div><div><span>声音</span><span class="dim">${esc(C.timer?.sound || "提示音")} ›</span></div></div>
        ${(C.timerRecent || []).length ? `<div class="ck-sec" style="margin:34px 20px 0">最近项目</div>${C.timerRecent.map(r => `<div class="ck-row" style="margin:0 20px"><div><div class="ck-time dim">${esc(r)}</div><small>${esc(r)}</small></div><span class="cbtn green sm"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M7 4l14 8-14 8z" fill="currentColor"/></svg></span></div>`).join("")}` : ""}
        <div style="height:30px"></div>
      </div>`;
    const tLoop = () => {
      if (!alive() || !T.running) return;
      const left = tLeft(), t = body.querySelector("[data-tt]"), ring = body.querySelector("[data-ring]");
      if (t) t.textContent = tfmt(left);
      if (ring) ring.style.strokeDashoffset = 289 * (1 - left / T.total);
      if (left <= 0 && !T.paused) { T.running = false; render("timer"); return; }
      requestAnimationFrame(tLoop);
    };
    const initWheels = () => body.querySelectorAll("[data-wheel]").forEach(w => {
      const k = w.dataset.wheel, ITEM = 40;
      w.scrollTop = T[k] * ITEM;
      const mark = () => { const v = Math.round(w.scrollTop / ITEM); T[k] = Math.min(+w.dataset.max, Math.max(0, v)); w.querySelectorAll(".wi").forEach((x, i) => x.classList.toggle("sel", i === T[k])); };
      mark(); let to; w.addEventListener("scroll", () => { mark(); clearTimeout(to); to = setTimeout(() => { w.scrollTo({ top: T[k] * ITEM, behavior: "smooth" }); }, 120); }, { passive: true });
    });

    let cur;
    function render(tab) {
      cur = tab;
      el.querySelectorAll("[data-tab]").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
      body.innerHTML = { world, alarm, stopwatch, timer }[tab]();
      if (tab === "stopwatch") { drawLaps(); if (sw.run) requestAnimationFrame(swLoop); }
      if (tab === "timer") { if (T.running) { const r = body.querySelector("[data-ring]"); r.style.strokeDashoffset = 289 * (1 - tLeft() / T.total); requestAnimationFrame(tLoop); } else requestAnimationFrame(initWheels); }
    }
    el.addEventListener("click", e => {
      const t = e.target.closest("[data-tab]"); if (t) { render(t.dataset.tab); return; }
      const a = e.target.closest("[data-alarm] .sw");
      if (a) { const row = a.closest("[data-alarm]"), al = C.alarms[+row.dataset.alarm]; al.on = !al.on; a.classList.toggle("on", al.on); row.classList.toggle("off", !al.on); return; }
      if (e.target.closest("[data-sws]")) {
        if (sw.run) { sw.acc = swNow(); sw.run = false; } else { sw.start = performance.now(); sw.run = true; }
        render("stopwatch"); return;
      }
      if (e.target.closest("[data-swl]")) {
        if (sw.run) { const n = swNow(); sw.laps.push(n - sw.lapStart); sw.lapStart = n; drawLaps(); }
        else { sw.acc = 0; sw.laps = []; sw.lapStart = 0; render("stopwatch"); }
        return;
      }
      if (e.target.closest("[data-ts]")) {
        if (!T.running) { const tot = (T.h * 3600 + T.m * 60 + T.s) * 1000; if (!tot) return; T.total = tot; T.end = Date.now() + tot; T.running = true; T.paused = false; armTimer(T.end - Date.now()); }
        else if (T.paused) { T.end = Date.now() + T.left; T.paused = false; armTimer(T.left); }
        else { T.left = tLeft(); T.paused = true; armTimer(null); }
        render("timer"); return;
      }
      if (e.target.closest("[data-tc]") && T.running) { T.running = false; T.paused = false; armTimer(null); render("timer"); }
    });
    render(C.startTab || "alarm");
    return el;
  }


  /* ================= 카메라 (보는 사람 기기의 진짜 카메라) ================= */
  const SHOTS = [];
  function cameraApp() {
    const el = h(`<section class="screen cam" data-dark="1">
      <div class="cam-top"><span class="cam-ic">⚡︎</span><span class="cam-chev">⌃</span><span class="cam-ic">◎</span></div>
      <div class="cam-view"><video playsinline muted autoplay></video><div class="cam-msg" hidden></div><div class="cam-flash"></div><span class="cam-zoom">1×</span></div>
      <div class="cam-modes"><span>电影效果</span><span>视频</span><b>照片</b><span>人像</span><span>全景</span></div>
      <div class="cam-bottom"><button class="cam-thumb" data-thumb></button><button class="cam-shutter" data-shoot aria-label="拍摄"><i></i></button><button class="cam-flip" data-flip aria-label="切换摄像头"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 0 0-14.6-4.5M4 13a8 8 0 0 0 14.6 4.5"/><path d="M5 3v4h4M19 21v-4h-4"/></svg></button></div>
    </section>`);
    const video = el.querySelector("video"), msg = el.querySelector(".cam-msg"), thumb = el.querySelector("[data-thumb]");
    let stream = null, facing = "environment", dead = false;
    const stop = () => { if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; };
    el._cleanup = () => { dead = true; stop(); };
    const setThumb = () => { thumb.style.backgroundImage = SHOTS[0] ? `url('${SHOTS[0]}')` : ""; };
    setThumb();
    async function start() {
      stop();
      msg.hidden = true;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1920 }, height: { ideal: 1440 } }, audio: false });
        if (dead) { s.getTracks().forEach(t => t.stop()); return; }
        stream = s; video.srcObject = s;
        const st = s.getVideoTracks()[0].getSettings();
        video.classList.toggle("mirror", (st.facingMode || facing) === "user");
        await video.play().catch(() => {});
        msg.hidden = true;
      } catch (e) {
        msg.hidden = true; // 막혀도 안내 없이 검은 화면만
      }
    }
    el.addEventListener("click", e => {
      if (e.target.closest("[data-flip]")) { facing = facing === "user" ? "environment" : "user"; start(); return; }
      if (e.target.closest("[data-shoot]")) {
        const f = el.querySelector(".cam-flash"); f.classList.remove("go"); void f.offsetWidth; f.classList.add("go");
        if (!stream || !video.videoWidth) return;
        // 화면에 보이는 3:4 영역 그대로 저장
        const vw = video.videoWidth, vh = video.videoHeight, box = video.getBoundingClientRect();
        const ratio = box.width / box.height; let sw = vw, sh = vw / ratio;
        if (sh > vh) { sh = vh; sw = vh * ratio; }
        const c = document.createElement("canvas"); c.width = Math.round(sw); c.height = Math.round(sh);
        const g = c.getContext("2d");
        if (video.classList.contains("mirror")) { g.translate(c.width, 0); g.scale(-1, 1); }
        g.drawImage(video, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, c.width, c.height);
        SHOTS.unshift(c.toDataURL("image/jpeg", .88)); setThumb();
        return;
      }
      if (e.target.closest("[data-thumb]") && SHOTS[0]) {
        const v = h(`<section class="screen viewer" data-dark="1"><div class="navbar"><button class="pill round" data-back style="background:rgba(255,255,255,.2)">${ic.back.replace('<svg', '<svg style="stroke:#fff"')}</button></div><div class="img" style="background-image:url('${SHOTS[0]}')"></div><div style="height:60px"></div></section>`);
        v.querySelector("[data-back]").onclick = back;
        show(v, "push");
      }
    });
    setTimeout(start, 50);
    return el;
  }


  /* ================= 캘린더 ================= */
  function calendarApp() {
    const C = P.calendar || { calendars: {}, birthdays: [], holidays: [], events: [] };
    const key = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const holiday = {}; (C.holidays || []).forEach(x => (holiday[x.date] = holiday[x.date] || []).push(x.title));
    const color = cal => (C.calendars || {})[cal] || "#8e8e93";
    function eventsOn(d) {
      const k = key(d), md = k.slice(5), list = [];
      (holiday[k] || []).forEach(t => list.push({ title: t, cal: "韩国公休日", allday: true }));
      (C.birthdays || []).forEach(b => { if (b.md === md) list.push({ title: `${b.name} 生日`, cal: "생일", allday: true }); });
      (C.events || []).filter(e => e.date === k).sort((a, b) => (a.start || "").localeCompare(b.start || "")).forEach(e => list.push({ ...e, allday: !e.start }));
      return list;
    }
    let view = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1), sel = new Date(TODAY);
    const el = h(`<section class="screen white calapp">
      <div class="navbar"><button class="pill round" data-home>${ic.back}</button><span class="pill" style="gap:14px">${ic.search.replace("<svg", '<svg style="width:20px;height:20px"')}<span style="font-size:22px;font-weight:300">＋</span></span></div>
      <div class="cal-title"><b data-ttl></b></div>
      <div class="cal-wd">${WD.map((w, i) => `<span class="${i === 0 ? "sun" : i === 6 ? "sat" : ""}">${w}</span>`).join("")}</div>
      <div class="cal-grid" data-grid></div>
      <div class="cal-day" data-dayttl></div>
      <div class="scroll cal-list" data-list></div>
      <div class="cal-bottom"><button class="pill" data-today>今天</button><span class="pill">日历</span><span class="pill">收件箱</span></div>
    </section>`);
    const grid = el.querySelector("[data-grid]"), list = el.querySelector("[data-list]");
    function renderMonth() {
      el.querySelector("[data-ttl]").textContent = `${view.getFullYear()}年 ${view.getMonth() + 1}月`;
      const first = view.getDay(), days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      let html = "";
      for (let i = 0; i < first; i++) html += `<span></span>`;
      for (let d = 1; d <= days; d++) {
        const dt = new Date(view.getFullYear(), view.getMonth(), d), k = key(dt), ev = eventsOn(dt);
        const cls = ["cd"];
        if (dt.getDay() === 0 || holiday[k]) cls.push("red"); else if (dt.getDay() === 6) cls.push("sat");
        if (k === key(TODAY)) cls.push("today");
        if (k === key(sel)) cls.push("sel");
        const dots = ev.filter(e => e.cal !== "韩国公休日").slice(0, 3).map(e => `<i style="background:${color(e.cal)}"></i>`).join("");
        html += `<button class="${cls.join(" ")}" data-d="${k}"><b>${d}</b><em>${dots}</em></button>`;
      }
      grid.innerHTML = html;
    }
    function renderDay() {
      const ev = eventsOn(sel);
      el.querySelector("[data-dayttl]").textContent = `${sel.getMonth() + 1}月 ${sel.getDate()}日 星期${WD[sel.getDay()]}${key(sel) === key(TODAY) ? " · 今天" : ""}`;
      list.innerHTML = ev.length ? ev.map((e, i) => `<button class="cev" data-ev="${i}"><i style="background:${color(e.cal)}"></i><div><b>${e.emoji ? e.emoji + " " : ""}${esc(e.title)}</b>${e.place ? `<small>${esc(e.place)}</small>` : ""}</div><span>${e.allday ? "全天" : esc(e.start) + (e.end ? `<br>${esc(e.end)}` : "")}</span></button>`).join("")
        : `<div class="cal-empty">暂无日程</div>`;
      list._ev = ev;
    }
    function go(delta) { view = new Date(view.getFullYear(), view.getMonth() + delta, 1); grid.classList.remove("slide-l", "slide-r"); void grid.offsetWidth; grid.classList.add(delta > 0 ? "slide-l" : "slide-r"); renderMonth(); }
    el.addEventListener("click", e => {
      if (e.target.closest("[data-home]")) { goHome(); return; }
      const d = e.target.closest("[data-d]");
      if (d) { sel = parseD(d.dataset.d); renderMonth(); renderDay(); return; }
      if (e.target.closest("[data-today]")) { view = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1); sel = new Date(TODAY); renderMonth(); renderDay(); return; }
      const ev = e.target.closest("[data-ev]");
      if (ev) show(eventDetail(list._ev[+ev.dataset.ev], sel), "push");
    });
    // 좌우로 쓸어서 달 넘기기
    let sx = null, sy = null;
    grid.addEventListener("pointerdown", e => { sx = e.clientX; sy = e.clientY; });
    grid.addEventListener("pointerup", e => { if (sx === null) return; const dx = e.clientX - sx, dy = e.clientY - sy; sx = null; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1); });
    grid.addEventListener("wheel", e => { if (Math.abs(e.deltaX) > 30) { e.preventDefault(); go(e.deltaX > 0 ? 1 : -1); } }, { passive: false });
    el.querySelector(".cal-title").insertAdjacentHTML("beforeend", `<span class="cal-arrows"><button data-prev>‹</button><button data-next>›</button></span>`);
    el.querySelector("[data-prev]").onclick = () => go(-1);
    el.querySelector("[data-next]").onclick = () => go(1);
    renderMonth(); renderDay();
    return el;
  }
  function eventDetail(e, d) {
    const C = P.calendar || {}, col = (C.calendars || {})[e.cal] || "#8e8e93";
    const dateStr = `${d.getFullYear()}年 ${d.getMonth() + 1}月 ${d.getDate()}日 星期${WD[d.getDay()]}`;
    const el = h(`<section class="screen calapp">
      <div class="navbar"><button class="pill round" data-back>${ic.back}</button><span class="pill">编辑</span></div>
      <div class="scroll">
        <div class="evd-head"><h2>${e.emoji ? e.emoji + " " : ""}${esc(e.title)}</h2>${e.place ? `<p class="evd-place">${esc(e.place)}</p>` : ""}<p>${dateStr}</p><p>${e.allday ? "全天" : `${esc(e.start)}${e.end ? ` ~ ${esc(e.end)}` : ""}`}</p></div>
        <div class="evd-card"><div><span>日历</span><span class="evd-cal"><i style="background:${col}"></i>${esc(e.cal)}</span></div><div><span>提醒</span><span class="dim">${e.allday ? "当天（上午9点）" : "30分钟前"}</span></div></div>
        ${e.memo ? `<div class="evd-card"><div style="display:block"><span class="dim" style="font-size:13px">备忘录</span><p style="margin:6px 0 0">${esc(e.memo)}</p></div></div>` : ""}
        ${e.allday && e.cal === "韩国公休日" ? "" : `<div class="evd-card"><div><span style="color:#ff3b30">删除日程</span></div></div>`}
      </div>
    </section>`);
    el.querySelector("[data-back]").onclick = back;
    return el;
  }


  /* ================= 扫雷 (실제 플레이 + 최고기록) ================= */
  /* ================= 인스타그램 ================= */
  function instaApp() {
    const G = P.insta || { stories: [], posts: [] };
    const S = (d, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
    const II = {
      heart: S('<path d="M12 20.5s-8-5-8-11a4.5 4.5 0 0 1 8-2.8 4.5 4.5 0 0 1 8 2.8c0 6-8 11-8 11z"/>'),
      com: S('<path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4.2A8.5 8.5 0 1 1 20.5 11.5z"/>'),
      send: S('<path d="M21 3 3 10.5l7 2.5 2.5 7z"/><path d="M21 3 10 13"/>'),
      save: S('<path d="M6 3.5h12v17l-6-4.5-6 4.5z"/>'),
      home: S('<path d="M3.5 10.5 12 3.5l8.5 7V20a.5.5 0 0 1-.5.5h-5v-6h-6v6H4a.5.5 0 0 1-.5-.5z"/>'),
      search: S('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>'),
      plus: S('<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><path d="M12 8v8M8 12h8"/>'),
      reels: S('<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><path d="M3.5 8.5h17M9 3.5l2.5 5M14.5 3.5l2.5 5"/><path d="m10.5 12 4 2.3-4 2.3z" fill="currentColor"/>'),
      dm: S('<path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4.2A8.5 8.5 0 1 1 20.5 11.5z"/><path d="m8 13.5 3-3 2 2 3-3"/>'),
      menu: S('<path d="M4 9h16M8 15h12"/>'),
      verified: `<svg viewBox="0 0 24 24" class="ig-ver"><path d="M12 1.5l2.6 1.9 3.2-.2 1 3.1 2.7 1.8-1 3.1 1 3.1-2.7 1.8-1 3.1-3.2-.2L12 22.5l-2.6-1.9-3.2.2-1-3.1L2.5 15.9l1-3.1-1-3.1 2.7-1.8 1-3.1 3.2.2z" fill="#0095f6"/><path d="m8 12.3 2.7 2.6L16.3 9.4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      note: `<svg viewBox="0 0 24 24" class="ig-note"><path d="M9 18V5.5l11-2V16" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="6.5" cy="18" r="2.6" fill="currentColor"/><circle cx="17.5" cy="16" r="2.6" fill="currentColor"/></svg>`,
      more: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>`
    };
    const send = S('<path d="M21 3 3 10.5l7 2.5 2.5 7z"/><path d="M21 3 10 13"/>');
    // 빨간 점: 안 읽은 DM이 있으면 DM 아이콘에, 프로필을 한 번도 안 봤으면 프로필에
    const dmDot = () => (G.dms || []).some(d => d.unread);
    const refreshDots = () => document.querySelectorAll(".ig-tab").forEach(t => {
      t.querySelector("[data-dm]")?.classList.toggle("dot", dmDot());
      t.querySelector("[data-pdot]")?.classList.toggle("dot", !G._profSeen);
    });
    const tabBar = on => `<nav class="ig-tab">
      <button class="${on === "home" ? "on" : ""}" ${on === "home" ? "" : "data-back"}>${II.home}</button>
      <span>${II.reels}</span>
      <button data-dm class="${dmDot() ? "dot" : ""}">${send}</button>
      <span>${II.search}</span>
      <button class="${G._profSeen ? "" : "dot"}${on === "me" ? " me-on" : ""}" data-pdot ${on === "me" ? "" : "data-profile"}>${avatar(G.me || "me")}</button>
    </nav>`;
    const avatar = (id, big) => `<span class="ig-av${big ? " big" : ""}" style="background:hsl(${[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % 360} 55% 62%)">${esc(((id.match(/[a-z0-9가-힣]/i) || [id[0]])[0]).toUpperCase())}</span>`;
    const story = s => `<div class="ig-story${s.seen ? " seen" : ""}"><div class="ring">${s.me ? avatar(P.insta.me || "me", true) + '<b class="add">+</b>' : avatar(s.id, true)}</div><small>${esc(s.me ? "我的快拍" : s.id)}</small></div>`;
    const post = (q, i, mine) => `<article class="ig-post">
      <header><span class="ig-ring">${avatar(q.id)}</span><div><b>${esc(q.id)}${q.verified ? II.verified : ""}</b>${q.ad ? `<small>广告</small>` : q.music ? `<small>${II.note}${esc(q.music)}</small>` : q.place ? `<small>${esc(q.place)}</small>` : ""}</div>${q.follow ? `<span class="ig-follow">关注</span>` : ""}<span class="mo">${mine ? II.more : II.menu}</span></header>
      <div class="ig-img" style="${q.img ? `background:url('${esc(q.img)}') center/cover` : `background:${q.bg}`}">${q.img ? "" : `<span>${q.emoji || ""}</span>`}${q.headline ? `<b class="ig-adh">${esc(q.headline)}</b>` : ""}</div>
      ${q.ad ? `<div class="ig-cta"><span>${esc(q.cta || "了解更多")}</span><i>›</i></div>` : ""}
      <div class="ig-act">${mine ? II.heart : `<button data-like="${i}" class="${q.liked ? "on" : ""}">${II.heart}</button>`}${II.com}${II.send}<span style="flex:1"></span>${II.save}</div>
      <div class="ig-txt"><b ${mine ? "" : `data-likes="${i}"`}>赞 ${(q.likes + (q.liked ? 1 : 0)).toLocaleString()}</b>
        <p><b>${esc(q.id)}</b> ${esc(q.caption)}</p>
        ${q.comments ? `<span class="c">查看全部 ${q.comments} 条评论</span>` : ""}
        <span class="t">${esc(q.when)}</span></div>
    </article>`;
    const el = h(`<section class="screen ig">
      <div class="ig-top ig-main"><span class="ig-plus">${S('<path d="M12 4v16M4 12h16"/>')}</span><span class="ig-logo">Instagram <small>⌄</small></span><span class="ig-ti">${II.heart}</span></div>
      <div class="scroll">
        <div class="ig-stories">${[{ me: true }, ...(G.stories || [])].map(story).join("")}</div>
        ${(G.posts || []).map((q, i) => post(q, i)).join("")}
        <div style="height:30px"></div>
      </div>
      ${tabBar("home")}
    </section>`);
    /* 关注 목록: 맨 위 지정 계정들 + 나머지는 랜덤 이름·아이디 */
    function followingList() {
      const M = G.profile || {}, top = M.followingTop || [];
      const total = parseInt(String(M.following || "0").replace(/,/g, ""), 10) || top.length;
      const fam = "김이박최정강조윤장임한오서신권황안송류홍", giv = ["서준","하은","도윤","지우","민서","예준","서연","지호","수아","현우","유진","태윤","다은","승민","채원","준혁","소윤","건우","하린","시우","예린","동현","나연","재원"];
      const parts = ["daily","log","_","official","zip","film","moment","record","pic","seoul"];
      let seed = 7; const r = n => (seed = (seed * 9301 + 49297) % 233280, Math.floor(seed / 233280 * n));
      const rom = { "김":"kim","이":"lee","박":"park","최":"choi","정":"jung","강":"kang","조":"cho","윤":"yoon","장":"jang","임":"lim","한":"han","오":"oh","서":"seo","신":"shin","권":"kwon","황":"hwang","안":"ahn","송":"song","류":"ryu","홍":"hong" };
      const list = top.filter(u => u.at == null), mid = (M.followingMix || []);
      while (list.length + mid.length < total) {
        const f = fam[r(fam.length)], g = giv[r(giv.length)], k = r(4);
        const id = k === 0 ? `${rom[f]}.${parts[r(parts.length)]}${r(99)}` : k === 1 ? `${parts[r(parts.length)]}_${rom[f]}${r(9)}` : k === 2 ? `__${rom[f]}${r(999)}` : `${rom[f]}_${parts[r(parts.length)]}`;
        list.push({ id, name: f + g });
      }
      mid.forEach(u => list.splice(Math.min(u.at, list.length), 0, u));
      return list;
    }
    function followingView() {
      const M = G.profile || {}, list = followingList();
      const v = h(`<section class="screen ig">
        <div class="ig-top"><button class="ig-back" data-back>${ic.back}</button><span class="ig-uname" style="flex:1;text-align:center;margin-right:40px">${esc(G.me || "")}</span></div>
        <div class="ig-ftabs"><span>粉丝 ${esc(M.followers || "0")}</span><span class="on">关注 ${esc(M.following || "0")}</span></div>
        <div class="scroll">
          <div class="ig-search">${II.search}<span>搜索</span></div>
          ${list.map((u, i) => `<div class="ig-frow" ${u.profile ? `data-user="${i}"` : ""}>${avatar(u.id)}<div><b>${esc(u.id)}</b><small>${esc(u.name)}</small></div><span class="ig-fbtn">关注</span></div>`).join("")}
          <div style="height:30px"></div>
        </div>
      </section>`);
      v.addEventListener("click", e => {
        if (e.target.closest("[data-back]")) { back(); return; }
        const r = e.target.closest("[data-user]"); if (r) show(userView(list[+r.dataset.user]), "push");
      });
      return v;
    }
    /* 다른 사람 프로필 (帖子 없는 계정) */
    function userView(u) {
      const pf = u.profile || {};
      const v = h(`<section class="screen ig">
        <div class="ig-top"><button class="ig-back" data-back>${ic.back}</button><span class="ig-uname">${esc(u.id)}</span><span class="ig-ti">${II.more}</span></div>
        <div class="scroll">
          <div class="ig-prof"><div class="ig-pav">${avatar(u.id, true)}</div>
            <div class="ig-stats"><div><b>0</b><small>帖子</small></div><div><b>${esc(pf.followers || "0")}</b><small>粉丝</small></div><div><b>${esc(pf.following || "0")}</b><small>关注</small></div></div></div>
          <div class="ig-bio"><b>${esc(u.name)}</b></div>
          <div class="ig-btns"><span>关注 ⌄</span><span>私信</span></div>
          <div class="ig-gtabs"><span class="on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3.5" y="3.5" width="17" height="17"/><path d="M3.5 9.5h17M3.5 14.5h17M9.5 3.5v17M14.5 3.5v17"/></svg></span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><circle cx="12" cy="10" r="3"/><path d="M6.5 19c1-3 3.2-4.5 5.5-4.5s4.5 1.5 5.5 4.5"/></svg></span></div>
          <div class="ig-empty"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg></i><b>暂无帖子</b></div>
        </div>
      </section>`);
      v.querySelector("[data-back]").onclick = back;
      return v;
    }
    /* DM 목록 · 대화방 */
    function dmList() {
      const D = G.dms || [];
      const v = h(`<section class="screen ig">
        <div class="ig-top"><button class="ig-back" data-back>${ic.back}</button><span class="ig-uname">${esc(G.me || "")} ⌄</span><span class="ig-ti">${II.plus}</span></div>
        <div class="scroll">
          <div class="ig-search">${II.search}<span>搜索</span></div>
          <div class="ig-dmh"><b>信息</b><span>请求</span></div>
          ${D.map((c, i) => `<button class="ig-dmrow${c.unread ? " unread" : ""}" data-dmi="${i}">${avatar(c.id)}<div><b>${esc(c.name || c.id)}</b><small>${esc(c.preview)} · ${esc(c.when)}</small></div>${c.unread ? "<i></i>" : ""}</button>`).join("")}
          <div style="height:30px"></div>
        </div>
      </section>`);
      v.addEventListener("click", e => {
        if (e.target.closest("[data-back]")) { back(); return; }
        const r = e.target.closest("[data-dmi]"); if (!r) return;
        const c = D[+r.dataset.dmi];
        if (c.unread) { c.unread = false; r.classList.remove("unread"); r.querySelector("i")?.remove(); refreshDots(); }
        show(dmRoom(c), "push");
      });
      return v;
    }
    function dmRoom(c) {
      const prof = ((G.profile || {}).followingTop || []).find(u => u.id === c.id && u.profile);
      const body = (c.msgs || []).map(m => m.date ? `<div class="ig-dmdate">${esc(m.date)}</div>` : `<div class="ig-bub ${m.me ? "me" : ""}">${m.me ? "" : avatar(c.id)}<span>${esc(m.text)}</span></div>`).join("");
      const v = h(`<section class="screen ig">
        <div class="ig-top"><button class="ig-back" data-back>${ic.back}</button><div class="ig-dmt-wrap" data-uprof>${avatar(c.id)}<div class="ig-dmt"><b>${esc(c.name || c.id)}</b><small>${esc(c.id)}</small></div></div></div>
        <div class="scroll" data-autobottom><div class="ig-dmhead" data-uprof>${avatar(c.id, true)}<b>${esc(c.name || c.id)}</b><small>${esc(c.id)} · Instagram</small>${prof ? `<span class="ig-viewprof">查看主页</span>` : ""}</div>${body}${c.status ? `<div class="ig-seen">${esc(c.status)}</div>` : ""}<div style="height:16px"></div></div>
        <div class="ig-comp"><span>发送消息...</span></div>
      </section>`);
      v.querySelector("[data-back]").onclick = back;
      if (prof) v.querySelectorAll("[data-uprof]").forEach(x => { x.style.cursor = "pointer"; x.onclick = () => show(userView(prof), "push"); });
      return v;
    }
    function profileView() {
      G._profSeen = true; setTimeout(refreshDots, 0);
      const M = G.profile || {}, list = M.posts || [];
      const v = h(`<section class="screen ig">
        <div class="ig-top"><button class="ig-back" data-back>${ic.back}</button><span class="ig-uname">${esc(G.me || "")}</span><span class="ig-ti">${II.plus}${II.more}</span></div>
        <div class="scroll">
          <div class="ig-prof"><div class="ig-pav">${avatar(G.me || "me", true)}</div>
            <div class="ig-stats"><div><b>${list.length}</b><small>帖子</small></div><div><b>${esc(M.followers || "0")}</b><small>粉丝</small></div><div data-following><b>${esc(M.following || "0")}</b><small>关注</small></div></div></div>
          <div class="ig-bio"><b>${esc(M.name || "")}</b><p>${esc(M.bio || "")}</p></div>
          <div class="ig-btns"><span>编辑主页</span><span>分享主页</span></div>
          <div class="ig-gtabs"><span class="on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3.5" y="3.5" width="17" height="17"/><path d="M3.5 9.5h17M3.5 14.5h17M9.5 3.5v17M14.5 3.5v17"/></svg></span><span>${II.reels}</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><circle cx="12" cy="10" r="3"/><path d="M6.5 19c1-3 3.2-4.5 5.5-4.5s4.5 1.5 5.5 4.5"/></svg></span></div>
          <div class="ig-grid">${list.map((q, i) => `<button data-mine="${i}" style="${q.img ? `background:url('${esc(q.img)}') center/cover` : `background:${q.bg}`}">${q.img ? "" : `<span>${q.emoji || ""}</span>`}</button>`).join("")}</div>
          <div style="height:30px"></div>
        </div>
        ${tabBar("me")}
      </section>`);
      v.addEventListener("click", e => {
        if (e.target.closest("[data-back]")) { back(); return; }
        if (e.target.closest("[data-following]")) { show(followingView(), "push"); return; }
        if (e.target.closest("[data-dm]")) { show(dmList(), "push"); return; }
        const t = e.target.closest("[data-mine]"); if (!t) return;
        const i = +t.dataset.mine;
        const pv = h(`<section class="screen ig">
          <div class="ig-top"><button class="ig-back" data-back>${ic.back}</button><span class="ig-uname" style="flex:1;text-align:center;margin-right:40px">帖子</span></div>
          <div class="scroll">${list.slice(i).map((q, k) => post({ ...q, id: G.me }, i + k, true)).join("")}<div style="height:30px"></div></div>
        </section>`);
        pv.querySelector("[data-back]").onclick = back;
        show(pv, "push");
      });
      return v;
    }
    el.addEventListener("click", e => {
      if (e.target.closest("[data-home]")) { goHome(); return; }
      if (e.target.closest("[data-profile]")) { show(profileView(), "push"); return; }
      if (e.target.closest("[data-dm]")) { show(dmList(), "push"); return; }
      const b = e.target.closest("[data-like]"); if (!b) return;
      const i = +b.dataset.like, q = G.posts[i]; q.liked = !q.liked;
      b.classList.toggle("on", q.liked);
      el.querySelector(`[data-likes="${i}"]`).textContent = `赞 ${(q.likes + (q.liked ? 1 : 0)).toLocaleString()}`;
    });
    return el;
  }

  /* ================= 지도 ================= */
  function mapsApp() {
    const M = P.maps || { places: [] };
    const svgMap = `<svg class="mp-svg" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="700" fill="#eef0e8"/>
      <path d="M-20 430 C80 400 160 470 260 440 S380 380 430 400 L430 480 C360 470 300 520 220 520 S60 480 -20 510Z" fill="#a9d7f4"/>
      <rect x="20" y="70" width="120" height="90" rx="14" fill="#c7e6b4"/><rect x="250" y="560" width="120" height="100" rx="16" fill="#c7e6b4"/>
      <rect x="230" y="150" width="90" height="60" rx="6" fill="#e2e4dc"/><rect x="40" y="250" width="70" height="80" rx="6" fill="#e2e4dc"/><rect x="290" y="270" width="80" height="70" rx="6" fill="#e2e4dc"/>
      ${[[0, 210, 400, 230, 14], [0, 360, 400, 330, 10], [0, 600, 400, 580, 10], [170, 0, 150, 700, 16], [320, 0, 350, 700, 10], [70, 0, 90, 700, 8]].map(([a, b, c, d, w]) => `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#fff" stroke-width="${w}" stroke-linecap="round"/>`).join("")}
      <line x1="170" y1="0" x2="150" y2="700" stroke="#f8d26a" stroke-width="5"/>
      ${[["서초역", 105, 200], ["교대역", 210, 245], ["반포한강공원", 140, 455], ["송파구", 300, 300], ["서울동부지방법원", 300, 620], ["서리풀공원", 80, 120]].map(([n, x, y]) => `<text x="${x}" y="${y}" font-size="13" fill="#6b6f66" text-anchor="middle" font-weight="600">${n}</text>`).join("")}
    </svg>`;
    const el = h(`<section class="screen mp">
      <div class="mp-map">${svgMap}<i class="mp-me" style="left:46%;top:36%"></i><i class="mp-pin" data-pin hidden></i></div>
      <button class="mp-back" data-home>${ic.back}</button>
      <div class="mp-tools"><span>🗺</span><span>➤</span></div>
      <div class="mp-sheet">
        <div class="mp-grab"></div>
        <div class="mp-search">${ic.search}<span>搜索地图</span><span class="mic">${ic.mic}</span></div>
        <div class="mp-card" data-card hidden></div>
        <div data-list>
          <div class="mp-h">收藏</div>
          <div class="mp-favs">${(M.favorites || []).map((f, i) => `<button data-fav="${i}"><i style="background:${f.color}">${f.icon}</i><b>${esc(f.name)}</b><small>${esc(f.dist)}</small></button>`).join("")}</div>
          <div class="mp-h">我的列表</div>
          <button class="mp-row" data-foodlist><i style="background:#ff9500;color:#fff">🍴</i><div><b>美食清单</b><small>${(M.food || []).length}处 · 全国</small></div><span class="mp-chev">›</span></button>
          <div class="mp-h">最近项目</div>
          ${(M.recents || []).map((r, i) => `<button class="mp-row" data-rec="${i}"><i>${r.icon || "📍"}</i><div><b>${esc(r.name)}</b><small>${esc(r.addr)}</small></div></button>`).join("")}
        </div>
      </div>
    </section>`);
    const card = el.querySelector("[data-card]"), list = el.querySelector("[data-list]");
    let pin = el.querySelector("[data-pin]");
    const mapBox = el.querySelector(".mp-map"), localMap = mapBox.innerHTML, defaultList = list.innerHTML;
    // 전국 지도 + 맛집 핀
    const korea = sel => `<svg class="mp-svg" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid meet">
      <rect x="-400" y="-200" width="1200" height="1100" fill="#a9d7f4"/>
      <path d="M118 62 L175 52 L238 40 L292 28 L330 42 L338 120 L346 200 L352 280 L356 360 L350 430 L330 480 L302 518 L262 530 L222 546 L182 540 L142 552 L108 530 L80 500 L68 452 L84 402 L70 352 L90 302 L78 252 L98 202 L88 152 L108 112Z" fill="#eef0e8" stroke="#d6dccd" stroke-width="2"/>
      <ellipse cx="150" cy="640" rx="42" ry="18" fill="#eef0e8" stroke="#d6dccd" stroke-width="2"/>
      <circle cx="388" cy="168" r="4" fill="#eef0e8"/>
      <path d="M108 112 Q160 140 210 120 T300 90" stroke="#c7e6b4" stroke-width="26" fill="none" opacity=".7" stroke-linecap="round"/>
      <path d="M210 200 Q230 300 270 360" stroke="#c7e6b4" stroke-width="30" fill="none" opacity=".6" stroke-linecap="round"/>
      ${(M.food || []).map((f, i) => [f, i]).sort((a, b) => (a[1] === sel) - (b[1] === sel)).map(([f, i]) => `<g data-fpin="${i}" transform="translate(${f.x} ${f.y})" style="cursor:pointer"><circle r="${sel === i ? 17 : 12}" fill="${sel === i ? "#ff3b30" : "#ff9500"}" stroke="#fff" stroke-width="3"/><text y="5" text-anchor="middle" font-size="${sel === i ? 15 : 11}">🍴</text>${sel === i ? `<text y="-26" text-anchor="middle" font-size="22" font-weight="800" fill="#1c1c1e" stroke="#fff" stroke-width="4" paint-order="stroke">${esc(f.name)}</text>` : ""}</g>`).join("")}
    </svg>`;
    const foodList = () => `<div class="mp-fhead"><button data-fback>‹ 列表</button><b>🍴 美食清单</b><span>${(M.food || []).length}处</span></div>
      ${(M.food || []).map((f, i) => `<button class="mp-row" data-food="${i}"><i>${f.icon || "🍴"}</i><div><b>${esc(f.name)}</b><small>${esc(f.city)} · ${esc(f.menu)}</small>${f.memo ? `<em>${esc(f.memo)}</em>` : ""}</div></button>`).join("")}`;
    const enterFood = sel => {
      mapBox.innerHTML = korea(sel); mapBox.classList.add("food");
      list.innerHTML = foodList(); list.hidden = false; card.hidden = true;
      if (sel != null) list.querySelector(`[data-food="${sel}"]`)?.classList.add("on");
    };
    const exitFood = () => { mapBox.classList.remove("food"); mapBox.innerHTML = localMap; pin = el.querySelector("[data-pin]"); list.innerHTML = defaultList; card.hidden = true; list.hidden = false; };
    const open = it => {
      pin.hidden = false; pin.style.left = (it.x ?? 50) + "%"; pin.style.top = (it.y ?? 40) + "%";
      card.innerHTML = `<div class="mp-ct"><div><b>${esc(it.name)}</b><small>${esc(it.addr || "")}${it.dist ? " · " + esc(it.dist) : ""}</small></div><button data-cclose>✕</button></div>
        <div class="mp-cbtns"><span class="go">🚗 ${esc(it.time || "12分钟")}</span><span>📞 电话</span><span>⭐ 收藏</span></div>${it.note ? `<p class="mp-note">${esc(it.note)}</p>` : ""}`;
      card.hidden = false; list.hidden = true;
    };
    el.addEventListener("click", e => {
      if (e.target.closest("[data-home]")) { goHome(); return; }
      if (e.target.closest("[data-cclose]")) { card.hidden = true; list.hidden = false; pin.hidden = true; return; }
      if (e.target.closest("[data-foodlist]")) { enterFood(null); return; }
      if (e.target.closest("[data-fback]")) { exitFood(); return; }
      const fd = e.target.closest("[data-food]") || e.target.closest("[data-fpin]");
      if (fd) { const i = +(fd.dataset.food ?? fd.dataset.fpin); enterFood(i); list.querySelector(`[data-food="${i}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" }); return; }
      const f = e.target.closest("[data-fav]"); if (f) { open(M.favorites[+f.dataset.fav]); return; }
      const r = e.target.closest("[data-rec]"); if (r) open(M.recents[+r.dataset.rec]);
    });
    return el;
  }

  /* ================= 블록 블래스트 ================= */
  function blockblastApp() {
    const SZ = 8, KEY = "phone-bb-best";
    const COLORS = ["#ff5a5f", "#ffc93c", "#4cc9f0", "#7bd389", "#b388eb", "#ff9f43", "#5b8cff"];
    const SHAPES = [
      [[0,0]], [[0,0],[1,0]], [[0,0],[0,1]], [[0,0],[1,0],[2,0]], [[0,0],[0,1],[0,2]],
      [[0,0],[1,0],[2,0],[3,0]], [[0,0],[0,1],[0,2],[0,3]], [[0,0],[1,0],[2,0],[3,0],[4,0]], [[0,0],[0,1],[0,2],[0,3],[0,4]],
      [[0,0],[1,0],[0,1],[1,1]], [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]], [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]],
      [[0,0],[0,1],[0,2],[1,2]], [[1,0],[1,1],[1,2],[0,2]], [[0,0],[1,0],[0,1],[0,2]], [[0,0],[1,0],[1,1],[1,2]],
      [[0,0],[1,0],[2,0],[1,1]], [[1,0],[0,1],[1,1],[2,1]], [[0,0],[1,0],[1,1],[2,1]], [[1,0],[2,0],[0,1],[1,1]],
      [[0,0],[0,1],[1,1]], [[0,0],[1,0],[1,1]], [[1,0],[0,1],[1,1]], [[0,0],[1,0],[0,1]]
    ];
    const loadBest = () => { let v = (P.blockblast || {}).best || 0; try { v = Math.max(v, +(localStorage.getItem(KEY) || 0)); } catch (e) {} return v; };
    let grid, tray, score, best = loadBest(), over, combo = 0;
    const el = h(`<section class="screen bb" data-dark="1">
      <div class="navbar"><button class="pill round" data-home>${ic.back}</button><b style="font-size:17px;color:#fff">Block Blast</b><span class="pill round" data-reset>↻</span></div>
      <div class="bb-top"><div class="bb-best">👑 <b data-best>${best}</b></div><div class="bb-score" data-score>0</div></div>
      <div class="bb-board" data-board>${Array.from({ length: SZ * SZ }, (_, i) => `<i data-i="${i}"></i>`).join("")}</div>
      <div class="bb-tray" data-tray></div>
      <div class="bb-over" data-over hidden><b>没有空位了</b><span data-final></span><button data-reset>再试一次</button></div>
    </section>`);
    const boardEl = el.querySelector("[data-board]"), trayEl = el.querySelector("[data-tray]"), cellsEl = [...boardEl.children];
    const rnd = a => a[Math.floor(Math.random() * a.length)];
    // 쉬운 모드: 작은 블록이 더 자주 나오고, 가능하면 지금 판에 놓을 수 있는 블록만 나옴
    const EASY = SHAPES.filter(s => s.length <= 4);
    const newPiece = () => {
      for (let k = 0; k < 30; k++) { const s = Math.random() < .8 ? rnd(EASY) : rnd(SHAPES); if (!grid || canPlace(s)) return { s, c: rnd(COLORS) }; }
      return { s: [[0, 0]], c: rnd(COLORS) };
    };
    const dims = s => [Math.max(...s.map(q => q[0])) + 1, Math.max(...s.map(q => q[1])) + 1];
    const fits = (s, x, y) => s.every(([dx, dy]) => { const X = x + dx, Y = y + dy; return X >= 0 && Y >= 0 && X < SZ && Y < SZ && !grid[Y * SZ + X]; });
    const canPlace = s => { for (let y = 0; y < SZ; y++) for (let x = 0; x < SZ; x++) if (fits(s, x, y)) return true; return false; };
    function paint() {
      cellsEl.forEach((c, i) => { c.style.background = grid[i] || ""; c.className = grid[i] ? "on" : ""; });
      el.querySelector("[data-score]").textContent = score;
      el.querySelector("[data-best]").textContent = best;
    }
    function drawTray() {
      trayEl.innerHTML = tray.map((pc, k) => {
        if (!pc) return `<div class="bb-slot"></div>`;
        const [w, hh] = dims(pc.s), ok = canPlace(pc.s);
        return `<div class="bb-slot"><div class="bb-piece${ok ? "" : " no"}" data-k="${k}" style="width:${w * 20}px;height:${hh * 20}px">${pc.s.map(([x, y]) => `<i style="left:${x * 20}px;top:${y * 20}px;background:${pc.c}"></i>`).join("")}</div></div>`;
      }).join("");
    }
    function reset() {
      grid = Array(SZ * SZ).fill(null); score = 0; over = false; combo = 0;
      tray = [newPiece(), newPiece(), newPiece()];
      el.querySelector("[data-over]").hidden = true;
      paint(); drawTray();
    }
    function checkOver() {
      if (tray.some(pc => pc && canPlace(pc.s))) return;
      over = true;
      el.querySelector("[data-final]").textContent = `分数 ${score}`;
      el.querySelector("[data-over]").hidden = false;
    }
    function place(k, x, y) {
      const pc = tray[k];
      pc.s.forEach(([dx, dy]) => { grid[(y + dy) * SZ + x + dx] = pc.c; });
      score += pc.s.length * 10;
      const full = [];
      for (let r = 0; r < SZ; r++) if ([...Array(SZ).keys()].every(c => grid[r * SZ + c])) for (let c = 0; c < SZ; c++) full.push(r * SZ + c);
      let lines = 0;
      for (let r = 0; r < SZ; r++) if ([...Array(SZ).keys()].every(c => grid[r * SZ + c])) lines++;
      for (let c = 0; c < SZ; c++) if ([...Array(SZ).keys()].every(r => grid[r * SZ + c])) { lines++; for (let r = 0; r < SZ; r++) full.push(r * SZ + c); }
      tray[k] = null;
      if (tray.every(t => !t)) tray = [newPiece(), newPiece(), newPiece()];
      paint();
      if (lines) {
        combo++; score += lines * lines * 100 * combo;
        new Set(full).forEach(i => cellsEl[i].classList.add("pop"));
        setTimeout(() => { new Set(full).forEach(i => { grid[i] = null; }); paint(); drawTray(); checkOver(); }, 220);
      } else { combo = 0; drawTray(); checkOver(); }
      if (score > best) { best = score; try { localStorage.setItem(KEY, best); } catch (e) {} }
      el.querySelector("[data-score]").textContent = score;
      el.querySelector("[data-best]").textContent = best;
    }
    /* 드래그: 손가락보다 조금 위에 블록이 떠서 따라옴 */
    let drag = null;
    const local = (cx, cy) => { const r = el.getBoundingClientRect(), k = el.offsetWidth / r.width; return [(cx - r.left) * k, (cy - r.top) * k]; };
    const clearHint = () => cellsEl.forEach(c => c.classList.remove("hint", "bad"));
    function target(cx, cy) {
      const br = boardEl.getBoundingClientRect(), cell = br.width / SZ;
      const [w, hh] = dims(drag.pc.s);
      const left = cx - (w * cell) / 2, top = cy - drag.lift - hh * cell;
      return [Math.round((left - br.left) / cell), Math.round((top - br.top) / cell), cell, br];
    }
    trayEl.addEventListener("pointerdown", e => {
      const pe = e.target.closest(".bb-piece"); if (!pe || over) return;
      const k = +pe.dataset.k, pc = tray[k]; if (!pc) return;
      e.preventDefault();
      const br = boardEl.getBoundingClientRect(), r = el.getBoundingClientRect(), sc = el.offsetWidth / r.width;
      const cellPx = br.width / SZ * sc;
      const [w, hh] = dims(pc.s);
      const fl = h(`<div class="bb-float" style="width:${w * cellPx}px;height:${hh * cellPx}px">${pc.s.map(([x, y]) => `<i style="left:${x * cellPx}px;top:${y * cellPx}px;width:${cellPx - 3}px;height:${cellPx - 3}px;background:${pc.c}"></i>`).join("")}</div>`);
      el.appendChild(fl); pe.style.opacity = ".2";
      drag = { k, pc, fl, pe, lift: 40 / sc, w: w * cellPx, h: hh * cellPx };
      move(e); trayEl.setPointerCapture?.(e.pointerId);
    });
    function move(e) {
      if (!drag) return;
      const [lx, ly] = local(e.clientX, e.clientY);
      const sc = el.offsetWidth / el.getBoundingClientRect().width;
      drag.fl.style.left = lx - drag.w / 2 + "px"; drag.fl.style.top = ly - drag.lift * sc - drag.h + "px";
      clearHint();
      const [x, y] = target(e.clientX, e.clientY);
      drag.pos = fits(drag.pc.s, x, y) ? [x, y] : null;
      if (drag.pos) drag.pc.s.forEach(([dx, dy]) => cellsEl[(y + dy) * SZ + x + dx].classList.add("hint"));
    }
    trayEl.addEventListener("pointermove", move);
    const end = () => {
      if (!drag) return;
      clearHint(); drag.fl.remove(); drag.pe.style.opacity = "";
      const d = drag; drag = null;
      if (d.pos) place(d.k, d.pos[0], d.pos[1]);
    };
    trayEl.addEventListener("pointerup", end); trayEl.addEventListener("pointercancel", end);
    el.addEventListener("click", e => {
      if (e.target.closest("[data-home]")) { goHome(); return; }
      if (e.target.closest("[data-reset]")) reset();
    });
    reset();
    return el;
  }

  function minesApp() {
    const M = P.minesweeper || {};
    const W = M.cols || 9, H = M.rows || 9, N = M.mines || 10;
    const KEY = "phone-mines-best";
    const loadBest = () => { let v = M.best ?? null; try { const s = localStorage.getItem(KEY); if (s) v = Math.min(v ?? Infinity, +s); } catch (e) {} return v; };
    const fmt = t => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
    let cells, started, over, flagMode = false, t0 = 0, timer = null, opened = 0, best = loadBest();
    const el = h(`<section class="screen mines">
      <div class="navbar"><button class="pill round" data-home>${ic.back}</button><b style="font-size:17px">扫雷</b><span class="pill round" data-reset>↻</span></div>
      <div class="ms-bar"><div><small>剩余地雷</small><b data-left>${N}</b></div><button class="ms-face" data-reset>🙂</button><div><small>时间</small><b data-time>0:00</b></div></div>
      <div class="ms-best">最高纪录 <b data-best>${best != null ? fmt(best) : "-"}</b></div>
      <div class="ms-board" data-board style="grid-template-columns:repeat(${W},1fr)"></div>
      <div class="ms-tools"><button class="ms-mode on" data-mode="dig">⛏ 打开</button><button class="ms-mode" data-mode="flag">🚩 插旗</button></div>
      <div class="ms-msg" data-msg></div>
    </section>`);
    const board = el.querySelector("[data-board]"), faceEl = el.querySelector(".ms-face"), msg = el.querySelector("[data-msg]");
    function reset() {
      clearInterval(timer); timer = null; started = false; over = false; opened = 0;
      cells = Array.from({ length: W * H }, () => ({ mine: false, open: false, flag: false, n: 0 }));
      el.querySelector("[data-time]").textContent = "0:00"; el.querySelector("[data-left]").textContent = N;
      faceEl.textContent = "🙂"; msg.textContent = ""; msg.className = "ms-msg";
      board.innerHTML = cells.map((_, i) => `<button class="ms-c" data-i="${i}"></button>`).join("");
    }
    const nb = i => { const x = i % W, y = (i / W) | 0, r = []; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if (!dx && !dy) continue; const nx = x + dx, ny = y + dy; if (nx >= 0 && ny >= 0 && nx < W && ny < H) r.push(ny * W + nx); } return r; };
    function plant(safe) {
      const ban = new Set([safe, ...nb(safe)]); let k = 0;
      while (k < N) { const i = Math.floor(Math.random() * W * H); if (!ban.has(i) && !cells[i].mine) { cells[i].mine = true; k++; } }
      cells.forEach((c, i) => c.n = nb(i).filter(j => cells[j].mine).length);
    }
    function draw(i) {
      const c = cells[i], b = board.children[i];
      b.className = "ms-c" + (c.open ? " open" : "") + (c.flag ? " flag" : "") + (c.boom ? " boom" : "") + (c.open && c.n && !c.mine ? " n" + c.n : "");
      b.textContent = c.flag && !c.open ? "🚩" : c.open ? (c.mine ? "💣" : c.n || "") : "";
    }
    function open(i) {
      const st = [i];
      while (st.length) {
        const j = st.pop(), c = cells[j];
        if (c.open || c.flag) continue;
        c.open = true; opened++; draw(j);
        if (!c.mine && c.n === 0) nb(j).forEach(k => { if (!cells[k].open) st.push(k); });
      }
    }
    function end(win) {
      over = true; clearInterval(timer);
      const t = Math.floor((Date.now() - t0) / 1000);
      if (win) {
        faceEl.textContent = "😎";
        cells.forEach((c, i) => { if (c.mine && !c.flag) { c.flag = true; draw(i); } });
        el.querySelector("[data-left]").textContent = 0;
        let rec = "";
        if (best == null || t < best) { best = t; try { localStorage.setItem(KEY, String(t)); } catch (e) {} el.querySelector("[data-best]").textContent = fmt(t); rec = " · 最高纪录!"; }
        msg.textContent = `成功！ ${fmt(t)}${rec}`; msg.className = "ms-msg win";
      } else {
        faceEl.textContent = "😵";
        cells.forEach((c, i) => { if (c.mine) { c.open = true; draw(i); } });
        msg.textContent = "炸了！再试一次？"; msg.className = "ms-msg lose";
      }
    }
    function act(i, flag) {
      if (over) return;
      const c = cells[i];
      if (flag) {
        if (c.open) return;
        c.flag = !c.flag; draw(i);
        el.querySelector("[data-left]").textContent = N - cells.filter(x => x.flag).length;
        return;
      }
      if (c.flag) return;
      if (!started) {
        started = true; plant(i); t0 = Date.now();
        timer = setInterval(() => { if (!el.isConnected) { clearInterval(timer); return; } el.querySelector("[data-time]").textContent = fmt(Math.floor((Date.now() - t0) / 1000)); }, 500);
      }
      if (c.open && c.n) {   // 숫자를 누르면 주변 깃발 수가 맞을 때 나머지를 한 번에 열기
        const ns = nb(i); if (ns.filter(j => cells[j].flag).length === c.n) ns.forEach(j => { if (!cells[j].open && !cells[j].flag) { if (cells[j].mine) { cells[j].open = true; cells[j].boom = true; draw(j); end(false); } else open(j); } });
      } else if (c.mine) { c.open = true; c.boom = true; draw(i); end(false); return; }
      else open(i);
      if (!over && opened === W * H - N) end(true);
    }
    // 길게 누르면 깃발
    let pressT = null, longDone = false;
    board.addEventListener("pointerdown", e => { const b = e.target.closest("[data-i]"); if (!b) return; longDone = false; pressT = setTimeout(() => { longDone = true; act(+b.dataset.i, true); try { navigator.vibrate && navigator.vibrate(30); } catch (_) {} }, 380); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(t => board.addEventListener(t, () => clearTimeout(pressT)));
    board.addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (!b || longDone) return; act(+b.dataset.i, flagMode); });
    board.addEventListener("contextmenu", e => { e.preventDefault(); const b = e.target.closest("[data-i]"); if (b && !longDone) act(+b.dataset.i, true); });
    el.addEventListener("click", e => {
      if (e.target.closest("[data-home]")) { goHome(); return; }
      if (e.target.closest("[data-reset]")) { reset(); return; }
      const m = e.target.closest("[data-mode]");
      if (m) { flagMode = m.dataset.mode === "flag"; el.querySelectorAll("[data-mode]").forEach(x => x.classList.toggle("on", x === m)); }
    });
    el._cleanup = () => clearInterval(timer);
    reset();
    return el;
  }

  const OPEN = { maps: mapsApp, insta: instaApp, blockblast: blockblastApp, mines: minesApp, calendar: calendarApp, camera: cameraApp, clock: clockApp, phone: phoneApp, chrome: chromeApp, messages: messagesApp, kakao: kakaoApp, notes: notesApp, translate: translateApp, photos: photosApp };


  /* ================= 흐르는 시계 · 캘린더 알림 ================= */
  const START_SEC = (() => { const [hh, mm, ss] = (P.time || "11:59:30").split(":").map(Number); P.time = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`; return hh * 3600 + mm * 60 + (ss || 0); })();
  let clockStart = null, audioCtx = null;
  const alerted = new Set();
  const phoneSec = () => START_SEC + (clockStart ? Math.floor((Date.now() - clockStart) / 1000) : 0);
  function chime() {
    try {
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") audioCtx.resume();
      [0, .22, .44, 1.2, 1.42, 1.64].forEach((t, i) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain(), at = audioCtx.currentTime + t;
        o.type = "sine"; o.frequency.value = i % 3 === 2 ? 1318.5 : i % 3 === 1 ? 1046.5 : 880;
        g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(.18, at + .02); g.gain.exponentialRampToValueAtTime(.001, at + .4);
        o.connect(g).connect(audioCtx.destination); o.start(at); o.stop(at + .45);
      });
    } catch (e) {}
    try { navigator.vibrate && navigator.vibrate([250, 120, 250]); } catch (e) {}
  }
  /* 메시지 알림음 (짧은 '띠링') + 짧은 진동 */
  function msgTone() {
    try {
      if (audioCtx) {
        if (audioCtx.state === "suspended") audioCtx.resume();
        [[1568, 0], [2093, .11]].forEach(([f, t]) => {
          const o = audioCtx.createOscillator(), g = audioCtx.createGain(), at = audioCtx.currentTime + t;
          o.type = "triangle"; o.frequency.value = f;
          g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(.22, at + .01); g.gain.exponentialRampToValueAtTime(.001, at + .28);
          o.connect(g).connect(audioCtx.destination); o.start(at); o.stop(at + .3);
        });
      }
    } catch (e) {}
    try { navigator.vibrate && navigator.vibrate([90, 60, 90]); } catch (e) {}
  }

  /* ================= 걸려오는 전화 ================= */
  let callFired = false, callEl = null, ringTimer = null, callTimer = null;
  function ringOnce() {
    try {
      if (audioCtx) {
        if (audioCtx.state === "suspended") audioCtx.resume();
        [659.3, 784, 987.8, 784, 659.3, 784, 987.8, 1318.5].forEach((f, i) => {
          const o = audioCtx.createOscillator(), g = audioCtx.createGain(), at = audioCtx.currentTime + i * .16;
          o.type = "sine"; o.frequency.value = f;
          g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(.2, at + .015); g.gain.exponentialRampToValueAtTime(.001, at + .3);
          o.connect(g).connect(audioCtx.destination); o.start(at); o.stop(at + .32);
        });
      }
    } catch (e) {}
    try { navigator.vibrate && navigator.vibrate([700, 300, 700]); } catch (e) {}
  }
  function stopRing() { clearInterval(ringTimer); ringTimer = null; try { navigator.vibrate && navigator.vibrate(0); } catch (e) {} }
  /* 저장명 바꾸기: 데이터 전체(카톡·전화·语音信箱·캘린더 등)와 지금 열려 있는 화면의 이름을 한꺼번에 변경 */
  function renameContact(oldN, newN) {
    if (!oldN || !newN || oldN === newN) return;
    const seen = new WeakSet();
    const walk = o => {
      if (!o || typeof o !== "object" || seen.has(o) || o instanceof Node) return; seen.add(o);
      if (Array.isArray(o)) { o.forEach((v, i) => { if (v === oldN) o[i] = newN; else walk(v); }); return; }
      for (const k of Object.keys(o)) {
        let v = o[k];
        if (v === oldN) o[k] = v = newN; else walk(v);
        if (k === oldN) { o[newN] = v; delete o[k]; }
      }
    };
    walk(P);
    const dev = $("#device"), tw = document.createTreeWalker(dev, NodeFilter.SHOW_TEXT);
    for (let n; (n = tw.nextNode());) if (n.nodeValue.trim() === oldN) n.nodeValue = n.nodeValue.replace(oldN, newN);
    dev.querySelectorAll("*").forEach(e => { for (const at of [...e.attributes]) if (at.value === oldN) e.setAttribute(at.name, newN); if (e._rename && e.dataset.room === newN) e._rename(newN); });
    try { refreshCalls(); } catch (e) {}
  }
  function logCall(name, missed) {
    const last = P.calls[0];
    if (last && last.name === name && !!last.missed === !!missed && last.dir === "in" && last.when === P.time) last.count = (last.count || 1) + 1;
    else P.calls.unshift({ name, kind: "手机", dir: "in", missed: !!missed, when: P.time });
    if (missed) { P.badges.phone = (P.badges.phone || 0) + 1; document.querySelectorAll('[data-badge="phone"]').forEach(b => b.textContent = P.badges.phone); }
    refreshCalls();
  }
  const CI = {
    mute: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3" fill="#fff" stroke="none"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M4 4l16 16"/></svg>`,
    keypad: `<svg viewBox="0 0 24 24" fill="#fff">${[5, 12, 19].flatMap(y => [5, 12, 19].map(x => `<circle cx="${x}" cy="${y}" r="2.2"/>`)).join("")}<circle cx="12" cy="24.5" r="0"/></svg>`,
    audio: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="#fff" stroke="none"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>`,
    add: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
    facetime: `<svg viewBox="0 0 24 24" fill="#fff"><rect x="2.5" y="6.5" width="13" height="11" rx="2.5"/><path d="M16.5 10.5l5-3v9l-5-3z"/></svg>`,
    contact: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3.2"/><path d="M6.5 18.2c1.4-2.1 3.3-3.1 5.5-3.1s4.1 1 5.5 3.1"/></svg>`,
    hang: `<svg viewBox="0 0 24 24"><path d="M3 14.8c5-4.4 13-4.4 18 0l-2 2.3c-.5.5-1.2.6-1.8.2l-2-1.4c-.4-.3-.6-.7-.6-1.2v-1.6c-2.1-.6-4.3-.6-6.4 0v1.6c0 .5-.2.9-.6 1.2l-2 1.4c-.6.4-1.3.3-1.8-.2z" fill="#fff"/></svg>`,
    phone: `<svg viewBox="0 0 24 24"><path d="M6.6 3.4c.8-.5 1.8-.3 2.3.5l1.7 2.7c.5.8.3 1.7-.4 2.3l-1.3 1c.9 2.2 2.6 4.1 4.8 5.2l1-1.2c.6-.7 1.6-.8 2.3-.3l2.6 1.8c.8.5.9 1.6.4 2.4l-.9 1.2c-.9 1.2-2.5 1.6-3.9 1.1C10.4 18.6 6.1 14.3 4.3 9.3c-.5-1.4-.1-3 1.1-3.9z" fill="#34c759"/></svg>`,
    later: `<svg viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="13" r="7.5"/><path d="M12 9v4.3h-3" stroke="#3f4a3f" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M4 6.5l3-2.6M20 6.5l-3-2.6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
    msg: `<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 4C6.8 4 3 7.3 3 11.2c0 2.2 1.2 4.2 3.2 5.5-.2 1.3-.9 2.5-1.9 3.3 2 .1 3.8-.6 5.1-1.7.8.2 1.7.3 2.6.3 5.2 0 9-3.3 9-7.4S17.2 4 12 4z"/></svg>`
  };
  function incomingCall(cfg) {
    const C = cfg || P.incomingCall || {};
    const name = C.from || "강민재";
    hideBanner();
    callEl = h(`<div class="callui">
      <div class="cu-ringview">
        <div class="cu-name">${esc(name)}</div><div class="cu-sub">手机</div>
        <div class="cu-small"><button data-decline><i>${CI.later}</i>稍后提醒</button><button data-decline><i>${CI.msg}</i>信息</button></div>
        <div class="cu-slider" data-slider><div class="cu-track-text">滑动接听</div><div class="cu-knob" data-knob>${CI.phone}</div></div>
      </div>
      <div class="cu-liveview">
        <div class="cu-name">${esc(name)}</div><div class="cu-sub"><span class="cu-sim">默认</span><span data-ctime>00:00</span></div>
        <div class="cu-line" data-line></div>
        <div class="cu-grid">${[["mute", "静音"], ["keypad", "拨号键盘"], ["audio", "音频"], ["add", "添加通话"], ["facetime", "FaceTime"], ["contact", "通讯录"]].map(([k, l]) => `<button class="cu-key" data-key="${k}"><i>${CI[k]}</i><small>${l}</small></button>`).join("")}</div>
        <button class="cu-end" data-end>${CI.hang}</button>
      </div>
    </div>`);
    $("#device").appendChild(callEl);
    $("#device").classList.add("in-call");
    requestAnimationFrame(() => requestAnimationFrame(() => callEl.classList.add("in")));
    ringOnce(); ringTimer = setInterval(ringOnce, 2600);
    const missTimer = setTimeout(() => { if (callEl && !callEl.classList.contains("live")) { stopRing(); logCall(name, true); closeCall(); } }, (C.ringSeconds || 30) * 1000);
    callEl.querySelectorAll("[data-decline]").forEach(b => b.onclick = () => { clearTimeout(missTimer); stopRing(); logCall(name, true); closeCall(); });
    // 滑动接听
    const slider = callEl.querySelector("[data-slider]"), knob = callEl.querySelector("[data-knob]");
    let sx = null, max = 0;
    knob.addEventListener("pointerdown", e => { sx = e.clientX; max = slider.clientWidth - knob.offsetWidth - 12; knob.setPointerCapture(e.pointerId); knob.style.transition = "none"; e.stopPropagation(); });
    knob.addEventListener("pointermove", e => { if (sx === null) return; const dx = Math.max(0, Math.min(max, e.clientX - sx)); knob.style.transform = `translateX(${dx}px)`; slider.style.setProperty("--fade", 1 - dx / max); });
    const release = e => {
      if (sx === null) return;
      const dx = Math.max(0, Math.min(max, e.clientX - sx)); sx = null; knob.style.transition = "";
      if (dx > max * .7) { knob.style.transform = `translateX(${max}px)`; answer(); }
      else { knob.style.transform = ""; slider.style.setProperty("--fade", 1); }
      e.stopPropagation();
    };
    knob.addEventListener("pointerup", release); knob.addEventListener("pointercancel", release);
    function answer() {
      clearTimeout(missTimer); stopRing();
      callEl.classList.add("live");
      const tEl = callEl.querySelector("[data-ctime]"), t0 = Date.now();
      const draw = () => { const sec = Math.floor((Date.now() - t0) / 1000); tEl.textContent = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`; };
      draw(); callTimer = setInterval(draw, 1000);
      callEl.querySelectorAll('[data-key="mute"],[data-key="audio"]').forEach(k => k.onclick = () => k.classList.toggle("on"));
      const lineEl = callEl.querySelector("[data-line]"), timers = [];
      let ended = false;
      const endCall = (cut, lab) => { if (ended) return; ended = true; timers.forEach(clearTimeout); clearInterval(callTimer); if (cut !== true) lineEl.classList.remove("show"); logCall(name, false); tEl.textContent = lab || "通话结束"; setTimeout(closeCall, cut === true ? 1600 : 900); if (C.onEnd) setTimeout(C.onEnd, cut === true ? 1700 : 1000); };
      callEl.querySelector("[data-end]").onclick = () => endCall();
      if (C.onAnswer) C.onAnswer();
      if (C.ambience === "sea") startSea();
      // 상대방 대사: 차례대로 보여주고 마지막 대사가 사라진 뒤 전화가 끊김
      runLines(C.lines || [], lineEl, timers, { start: C.lineStart, hangUp: C.hangUpAfter, name, showWho: true }, endCall);
    }
  }
  /* 통화 대사 재생: start(ms) 뒤 첫 대사 → 각 대사 ms 동안 표시 → 마지막 대사가 사라지고 hangUp(ms) 뒤 onEnd */
  function runLines(lines, lineEl, timers, o, onEnd) {
    if (!lines.length) return;
    const showWho = o.showWho ?? lines.some(l => l.who === "me");
    const label = l => showWho ? `<small>${l.who === "me" ? esc(P.owner || "차주한") : esc(o.name)}</small>` : "";
    let at = o.start ?? 1100;
    for (const l of lines) {
      if (l.cut) {
        // 말하는 도중 끊기: 대사를 띄운 뒤 cutAfter(기본 1초) 만에 바로 通话结束 (대사는 그대로 남음)
        timers.push(setTimeout(() => {
          lineEl.innerHTML = `${label(l)}${esc(l.text)}`;
          lineEl.classList.toggle("me", l.who === "me");
          lineEl.classList.add("show");
        }, at));
        if (l.noise) timers.push(setTimeout(() => { noiseBurst(.9); flicker(900); stopSea(true); }, at + 500));
        timers.push(setTimeout(() => onEnd(true, l.endLabel), at + (l.cutAfter || 1000) + (l.noise ? 900 : 0)));
        return;
      }
      timers.push(setTimeout(() => {
        lineEl.innerHTML = `${label(l)}${esc(l.text)}`;
        lineEl.classList.toggle("me", l.who === "me");
        lineEl.classList.add("show");
      }, at));
      at += l.ms || 2800;
      timers.push(setTimeout(() => lineEl.classList.remove("show"), at));
    }
    timers.push(setTimeout(() => onEnd(false), at + (o.hangUp ?? 900)));
  }
  /* ================= 거는 전화 (통화 기록에서 누르면) ================= */
  let ringbackTimer = null;
  function ringbackOnce() {
    try {
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") audioCtx.resume();
      const at = audioCtx.currentTime;
      [440, 480].forEach(f => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.frequency.value = f; g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(.06, at + .03); g.gain.setValueAtTime(.06, at + 1); g.gain.linearRampToValueAtTime(0, at + 1.05);
        o.connect(g).connect(audioCtx.destination); o.start(at); o.stop(at + 1.1);
      });
    } catch (e) {}
  }
  const callTries = {};
  function outgoingCall(name) {
    if (callEl) return;
    const S = P.callScripts || {}, script = S[name] || S["기본"] || { lines: [] };
    const rate = script.answer ?? S.answerRate ?? 0.8;
    const answered = Math.random() < rate;
    hideBanner();
    callEl = h(`<div class="callui live dialing">
      <div class="cu-liveview">
        <div class="cu-name">${esc(name)}</div><div class="cu-sub"><span class="cu-sim">默认</span><span data-ctime>正在呼叫...</span></div>
        <div class="cu-line" data-line></div>
        <div class="cu-grid">${[["mute", "静音"], ["keypad", "拨号键盘"], ["audio", "音频"], ["add", "添加通话"], ["facetime", "FaceTime"], ["contact", "通讯录"]].map(([k, l]) => `<button class="cu-key" data-key="${k}"><i>${CI[k]}</i><small>${l}</small></button>`).join("")}</div>
        <button class="cu-end" data-end>${CI.hang}</button>
      </div>
    </div>`);
    $("#device").appendChild(callEl);
    $("#device").classList.add("in-call");
    requestAnimationFrame(() => requestAnimationFrame(() => callEl.classList.add("in")));
    const tEl = callEl.querySelector("[data-ctime]"), lineEl = callEl.querySelector("[data-line]"), timers = [];
    callEl.querySelectorAll('[data-key="mute"],[data-key="audio"]').forEach(k => k.onclick = () => k.classList.toggle("on"));
    ringbackOnce(); ringbackTimer = setInterval(ringbackOnce, 3000);
    let done = false;
    const finish = (label, keepLine) => {
      if (done) return; done = true;
      timers.forEach(clearTimeout); clearInterval(ringbackTimer); clearInterval(callTimer); if (!keepLine) lineEl.classList.remove("show");
      logOutgoing(name); tEl.textContent = label; setTimeout(closeCall, keepLine ? 1600 : 900);
    };
    callEl.querySelector("[data-end]").onclick = () => finish(callEl.classList.contains("dialing") ? "已取消" : "通话结束");
    // 처음 몇 번은 상대가 바로 끊음 (rejectFirst: [ms, ms, ...])
    const tries = (callTries[name] = (callTries[name] || 0) + 1), rej = script.rejectFirst || [];
    if (tries <= rej.length) { timers.push(setTimeout(() => { clearInterval(ringbackTimer); finish("通话结束"); }, rej[tries - 1])); return; }
    // 한 번 통화가 이어진 뒤에는 '없는 번호' 안내만 나옴
    if (script.deadAfterOnce && script._used) {
      timers.push(setTimeout(() => {
        clearInterval(ringbackTimer); callEl.classList.remove("dialing"); tEl.textContent = "连接中...";
        runLines([{ text: script.deadText || "您所拨打的号码是空号。请确认后再拨。", ms: 4200 }], lineEl, timers, { start: 300, hangUp: 400, name: "语音提示" , showWho: false }, () => finish("通话结束"));
      }, 2200));
      return;
    }
    const waitMs = answered ? (script.answerAfter ?? 3000 + Math.random() * 3000) : 9000;
    timers.push(setTimeout(() => {
      clearInterval(ringbackTimer);
      if (!answered) { finish("无应答"); return; }
      script._used = true;
      if (script.ambience === "sea") startSea();
      callEl.classList.remove("dialing");
      const t0 = Date.now();
      const draw = () => { const sec = Math.floor((Date.now() - t0) / 1000); tEl.textContent = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`; };
      draw(); callTimer = setInterval(draw, 1000);
      runLines((tries - rej.length >= 2 && script.again) || script.lines || [], lineEl, timers, { start: script.lineStart, hangUp: script.hangUpAfter, name }, (cut, lab) => finish(lab || "通话结束", cut));
    }, waitMs));
  }
  function logOutgoing(name) {
    const last = P.calls[0];
    if (last && last.name === name && last.dir === "out" && !last.missed && last.when === P.time) last.count = (last.count || 1) + 1;
    else P.calls.unshift({ name, kind: (P.calls.find(c => c.name === name) || {}).kind || "手机", dir: "out", when: P.time });
    refreshCalls();
  }
  function refreshCalls() { document.querySelectorAll("[data-calls]").forEach(box => box.innerHTML = callsHTML()); }
  function closeCall() {
    stopSea();
    if (!callEl) return;
    const el = callEl; callEl = null;
    $("#device").classList.remove("in-call");
    el.classList.remove("in"); setTimeout(() => el.remove(), 400);
  }

  function tick() {
    const t = phoneSec(), hh = Math.floor(t / 3600) % 24, mm = Math.floor(t / 60) % 60, ss = t % 60;
    const str = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    if (str !== P.time) P.time = str;
    $("#sbTime").textContent = P.time;
    const ha = ((hh % 12) + mm / 60) * 30, ma = mm * 6, sa = ss * 6;
    document.querySelectorAll(".ic-h").forEach(n => n.setAttribute("transform", `rotate(${ha} 30 30)`));
    document.querySelectorAll(".ic-m").forEach(n => n.setAttribute("transform", `rotate(${ma} 30 30)`));
    document.querySelectorAll(".ic-sec").forEach(n => n.setAttribute("transform", `rotate(${sa} 30 30)`));
    // 오늘 일정 중 alert: true 인 것이 시작 시각이 되면 알림
    if (lockEl) { const [a, b] = P.time.split(":"), tt = `${+a > 12 ? +a - 12 : +a}:${b}`; lockEl.querySelectorAll("[data-ltime]").forEach(n => { if (n.textContent !== tt) n.textContent = tt; }); }
    if (!layer.classList.contains("open") || locked) return;
    const C = P.incomingCall;
    if (C && C.from && !callFired && !callEl && clockStart && t - START_SEC >= (C.afterMinutes ?? 5) * 60) { callFired = true; incomingCall(); }
    const today = P.today;
    ((P.calendar && P.calendar.events) || []).forEach(e => {
      const id = e.date + e.start + e.title;
      if (e.alert && e.date === today && e.start && e.start <= P.time && !alerted.has(id)) {
        alerted.add(id);
        const [eh, em] = e.start.split(":").map(Number);
        const when = `${eh < 12 ? "上午" : "下午"} ${eh % 12 === 0 ? 12 : eh % 12}:${String(em).padStart(2, "0")}`;
        showBanner({ kind: "calendar", app: "日历", from: e.title, text: `今天 ${when}${e.place ? " · " + e.place : ""}`, duration: 9000, onHide: startKakaoQueue });
        chime();
      }
    });
  }
  setInterval(tick, 1000);


  /* ================= 잠금화면 · 암호 ================= */
  let locked = false, lockEl = null, pin = "";
  const PASS = String(P.passcode || "");
  const PASS_LEN = PASS.length || 4;
  const keys = [["1", ""], ["2", "ABC"], ["3", "DEF"], ["4", "GHI"], ["5", "JKL"], ["6", "MNO"], ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"]];
  function lockTime(t) { return `<div class="lk-time" data-ltime>${t}</div>`; }
  /* 잠금화면 위젯: 디데이 · 음악 · 闹钟 */
  function lockWidgets() {
    const W = P.lockWidgets; if (!W) return "";
    let dday = "";
    if (W.dday) {
      const [m, d] = W.dday.md.split("-").map(Number);
      let tgt = new Date(TODAY.getFullYear(), m - 1, d);
      const base = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
      if (tgt < base) tgt = new Date(TODAY.getFullYear() + 1, m - 1, d);
      const n = Math.round((tgt - base) / 864e5);
      dday = `<div class="lw-dday"><small>${esc(W.dday.label)}</small><b>${n === 0 ? "D-DAY" : "D-" + n}</b></div>`;
    }
    const music = W.music ? `<div class="lw-circ" data-music><svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor"/><circle cx="16.5" cy="16" r="2.5" fill="currentColor"/></svg><span>${esc(W.music)}</span></div>` : "";
    const alarm = W.alarm ? `<div class="lw-circ"><svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="7" fill="currentColor"/><path d="M12 9.5V13l2.2 1.6" stroke="#8aa" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M4 6l3-2.5M20 6l-3-2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>${esc(W.alarm)}</span></div>` : "";
    return `<div class="lk-widgets">${dday}<div class="lw-right">${music}${alarm}</div></div>`;
  }
  function lockPhone() {
    locked = true; pin = "";
    lockEl?.remove();
    const [hh, mm] = P.time.split(":");
    lockEl = h(`<div class="lock">
      <div class="lk-main">
        <svg class="lk-ic" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>
        <div class="lk-date">${TODAY.getMonth() + 1}月 ${TODAY.getDate()}日 星期${WD[TODAY.getDay()]}</div>
        ${lockTime(`${+hh > 12 ? +hh - 12 : +hh}:${mm}`)}
        ${lockWidgets()}
        <div class="lk-bottom"><span class="lk-btn"><svg viewBox="0 0 24 24"><path d="M8 2h8l-1.5 6v13a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9.5 21V8z" fill="currentColor"/></svg></span><span class="lk-btn"><svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="currentColor"/><circle cx="12" cy="13" r="3.5" fill="#333"/></svg></span></div>
        <div class="lk-hint">向上滑动解锁</div>
      </div>
      <div class="lk-pin">
        <div class="pin-title">输入密码</div>
        <div class="pin-dots">${"<i></i>".repeat(PASS_LEN)}</div>
        <div class="pin-pad">${keys.map(([n, l]) => `<button data-k="${n}"><b>${n}</b><small>${l}</small></button>`).join("")}<span></span><button data-k="0"><b>0</b></button><span></span></div>
        <div class="pin-foot"><span>紧急情况</span><button data-del>取消</button></div>
      </div>
    </div>`);
    $("#device").insertBefore(lockEl, $("#banner"));
    $("#device").classList.add("is-locked");
    // 아래에서 위로 쓸어올리면 암호 화면
    let sy = null;
    lockEl.addEventListener("pointerdown", e => { if (!lockEl.classList.contains("pin")) sy = e.clientY; });
    lockEl.addEventListener("pointerup", e => { if (sy !== null && sy - e.clientY > 60) showPin(); sy = null; });
    lockEl.addEventListener("click", e => {
      if (e.target.closest("[data-music]")) { const L = (P.lockWidgets || {}).musicLink; if (L) window.open(L, "_blank", "noopener"); return; }
      const k = e.target.closest("[data-k]"); if (k) { press(k.dataset.k); return; }
      if (e.target.closest("[data-del]")) { if (pin) { pin = pin.slice(0, -1); drawPin(); } else hidePin(); }
    });
  }
  /* 잠금화면 음악 위젯 → 재생 화면 */
  function openPlayer() {
    const M = (P.lockWidgets || {}).player || { title: P.lockWidgets.music, artist: "" };
    const [mm, ss] = (M.length || "4:00").split(":").map(Number), total = mm * 60 + ss;
    let pos = M.at || 0, playing = true, tm = null;
    const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    const pl = h(`<div class="lk-player">
      <div class="lp-grab" data-pclose></div>
      <div class="lp-art"><span>♪</span></div>
      <div class="lp-meta"><div><b>${esc(M.title)}</b><small>${esc(M.artist)}</small></div><span class="lp-more">•••</span></div>
      <div class="lp-bar"><i data-fill></i></div>
      <div class="lp-times"><span data-cur></span><span data-left></span></div>
      <div class="lp-ctrl"><button data-prev>⏮</button><button data-play class="big"></button><button data-next>⏭</button></div>
      <div class="lp-vol"><span>🔈</span><i><b></b></i><span>🔊</span></div>
      ${M.link ? `<a class="lp-link" href="${esc(M.link)}" target="_blank" rel="noopener">在 YouTube 收听 ↗</a>` : ""}
      <button class="lp-close" data-pclose>关闭</button>
    </div>`);
    const draw = () => {
      pl.querySelector("[data-fill]").style.width = (pos / total * 100) + "%";
      pl.querySelector("[data-cur]").textContent = fmt(pos);
      pl.querySelector("[data-left]").textContent = "-" + fmt(total - pos);
      pl.querySelector("[data-play]").innerHTML = playing ? `<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>` : `<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg>`;
    };
    tm = setInterval(() => { if (playing) { pos = (pos + 1) % total; draw(); } }, 1000);
    pl.addEventListener("click", e => {
      e.stopPropagation();
      if (e.target.closest("[data-play]")) { playing = !playing; draw(); }
      else if (e.target.closest("[data-prev]")) { pos = 0; draw(); }
      else if (e.target.closest("[data-next]")) { pos = 0; draw(); }
      else if (e.target.closest("[data-pclose]")) { clearInterval(tm); pl.classList.remove("show"); setTimeout(() => pl.remove(), 300); }
    });
    pl.addEventListener("pointerdown", e => e.stopPropagation());
    pl.addEventListener("pointerup", e => e.stopPropagation());
    draw(); lockEl.appendChild(pl); requestAnimationFrame(() => pl.classList.add("show"));
  }
  function showPin() { pin = ""; drawPin(); lockEl.classList.add("pin"); }
  function hidePin() { lockEl.classList.remove("pin"); }
  function drawPin() {
    lockEl.querySelectorAll(".pin-dots i").forEach((d, i) => d.classList.toggle("on", i < pin.length));
    lockEl.querySelector("[data-del]").textContent = pin ? "删除" : "取消";
  }
  function press(n) {
    if (!locked || pin.length >= PASS_LEN) return;
    pin += n; drawPin();
    if (pin.length < PASS_LEN) return;
    if (!PASS || pin === PASS) setTimeout(unlock, 150);
    else setTimeout(() => { const dots = lockEl.querySelector(".pin-dots"); dots.classList.remove("shake"); void dots.offsetWidth; dots.classList.add("shake"); try { navigator.vibrate && navigator.vibrate(120); } catch (e) {} pin = ""; drawPin(); }, 150);
  }
  function unlock() {
    locked = false;
    if (!clockStart) clockStart = Date.now();   // 처음 잠금을 풀 때부터 시간이 흐르기 시작
    const el = lockEl; lockEl = null;
    $("#device").classList.remove("is-locked");
    el.classList.add("out"); setTimeout(() => el.remove(), 450);
    tick();
  }
  document.addEventListener("keydown", e => {
    if (!locked || !lockEl || !layer.classList.contains("open")) return;
    if (/^[0-9]$/.test(e.key)) { if (!lockEl.classList.contains("pin")) showPin(); press(e.key); }
    else if (e.key === "Backspace" && pin) { pin = pin.slice(0, -1); drawPin(); }
    else if ((e.key === "Enter" || e.key === "ArrowUp" || e.key === " ") && !lockEl.classList.contains("pin")) { e.preventDefault(); showPin(); }
  });

  /* ================= 열기/닫기 ================= */
  let startedOnPhone = false;
  /* 화면 높이에 맞춰 통화·잠금 화면 크기 조절 */
  function fitScale() {
    const dev = $("#device"), hgt = dev.clientHeight || 844;
    dev.style.setProperty("--s", Math.min(1, Math.max(.55, hgt / 844)).toFixed(3));
    dev.classList.toggle("short", hgt < 800);   // 화면이 짧으면 '검색' 버튼 숨김 (아이콘과 겹치지 않게)
    // 홈 화면: 정사각형 위젯 크기와 앱 줄 높이 (위젯 = 아이콘 두 줄 높이, 화면 안에 다 들어가게)
    const wd = dev.clientWidth || 390, col = (wd - 44) / 4;
    // 아이콘(I) + 이름 + 줄 간격 = 줄 높이(RH), 위젯 = RH + I (위젯 위·아래가 아이콘 줄과 맞음)
    const short = hgt < 800, top = short ? 78 : 84, dockR = short ? 102 : 136;
    const Iw = Math.min(66, (col * 2 - 12 - 36) / 2);              // 가로 폭 기준 자연스러운 아이콘 크기
    const RH = Math.max(80, Math.min(Iw + 36, (hgt - top - dockR) / 5));  // 세로가 모자라면 줄 높이를 줄임
    const I = Math.max(50, Math.min(66, RH - 36)), W = RH + I;
    dev.style.setProperty("--ic", I.toFixed(1) + "px");
    dev.style.setProperty("--ws", W.toFixed(1) + "px"); dev.style.setProperty("--rh", RH.toFixed(1) + "px");
  }
  window.addEventListener("resize", fitScale);
  if (window.visualViewport) visualViewport.addEventListener("resize", fitScale);
  /* 안드로이드: 휴대폰을 열면 전체 화면 (아이폰은 브라우저가 허용하지 않아 그대로) */
  const ANDROID = /Android/i.test(navigator.userAgent);
  function enterFull() { if (!ANDROID || document.fullscreenElement) return; try { const r = document.documentElement.requestFullscreen?.({ navigationUI: "hide" }); r && r.catch(() => {}); } catch (e) {} }
  function exitFull() { if (!document.fullscreenElement) return; try { const r = document.exitFullscreen?.(); r && r.catch(() => {}); } catch (e) {} }
  document.addEventListener("pointerdown", () => { try { if (audioCtx && audioCtx.state === "suspended") audioCtx.resume(); } catch (e) {} }, true);
  function openPhone() {
    if (layer.classList.contains("open")) return;
    enterFull();
    requestAnimationFrame(fitScale);
    try { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    screens.innerHTML = ""; stack = [];
    show(homeScreen(), "none");
    stack[0].classList.remove("push-enter");
    lockPhone();
    layer.classList.add("open"); layer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closePhone() {
    const n = stack.length - 1;
    hidePhone();
    if (startedOnPhone) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} startedOnPhone = false; }
    else syncHistory(n + 1);
  }
  function hidePhone() {
    if (callEl) { const live = callEl.classList.contains("live"); stopRing(); clearInterval(callTimer); callEl.remove(); callEl = null; $("#device").classList.remove("in-call"); logCall((P.incomingCall || {}).from || "강민재", !live); }
    stack.forEach(sc => sc._cleanup && sc._cleanup());
    layer.classList.remove("open"); layer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; hideBanner();
    exitFull();
  }
  layer.addEventListener("click", e => { if (e.target.closest("[data-close]")) closePhone(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && layer.classList.contains("open")) (stack.length > 1 ? back() : closePhone()); });
  story.addEventListener("click", e => {
    const a = e.target.closest(".phone-link"); if (!a) return;
    e.preventDefault();
    try { history.pushState({ d: 0 }, "", "#phone"); } catch (err) {}
    openPhone();
  });
  // 브라우저/안드로이드 '뒤로 가기' → 휴대폰 안에서 한 단계 뒤로
  window.addEventListener("popstate", e => {
    if (ignorePops > 0) { ignorePops--; return; }
    const d = e.state && typeof e.state.d === "number" ? e.state.d : (location.hash === "#phone" ? 0 : -1);
    if (d < 0) { hidePhone(); return; }
    if (!layer.classList.contains("open")) openPhone();
    popTo(d, d === 0);
  });
  if (location.hash === "#phone") {
    startedOnPhone = true;
    try { history.replaceState({ d: 0 }, "", "#phone"); } catch (e) {}
    openPhone();
  }
})();
