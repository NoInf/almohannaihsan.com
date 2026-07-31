/**
 * Nest UI Demo v3 - portfolio showcase logic.
 *
 * Static showcase only. Nothing here talks to a backend: every action either
 * changes local demo state or raises a toast that says it is a showcase.
 * All content is placeholder template data.
 */

/* =====================================================
   Demo data (placeholder)
   ===================================================== */

// Same six projects the v2 demo shows, so the version tabs read as one app
// evolving rather than three unrelated mockups.
const PROJECTS = [
  { name: 'Crab Controller', slug: 'crab controller', kind: 'Discord bot + GUI', status: 'running', lang: 'JavaScript', tags: ['gui', 'autostart'], files: '136 files',  size: '5.9 MB', updated: 'Updated 4d ago', next: 'Discord private channel management with GUI controls.',         life: 'active' },
  { name: 'shrimp rail',     slug: 'shrimp rail',     kind: 'Automation stack',  status: 'warning', lang: 'Python',     tags: ['python', 'gui'],     files: '629 files',  size: '200 MB', updated: 'Updated 5d ago', next: 'Training and knowledge capture automation stack.',              life: 'stale'  },
  { name: 'Glue Factory',    slug: 'glue factory',    kind: 'Desktop automation',status: 'running', lang: 'Python',     tags: ['python', 'gui'],     files: '1366 files', size: '327 MB', updated: 'Updated now',    next: 'Desktop automation workflows with capture and OCR pipelines.',  life: 'active' },
  { name: 'Lobster Bot',     slug: 'lobster bot',     kind: 'CLI bot',           status: 'offline', lang: 'Rust',       tags: ['rust', 'gui'],       files: '1170 files', size: '404 MB', updated: 'Updated 5d ago', next: 'Bot utilities and command workflows.',                          life: 'paused' },
  { name: 'Averardo Bank',   slug: 'averardo bank',   kind: 'Web app',           status: 'running', lang: 'TypeScript', tags: ['node', 'gui'],       files: '202 files',  size: '333 MB', updated: 'Updated now',    next: 'Web app that stores non sensitive records for a simple export.', life: 'active' },
  { name: 'Code Redeems',    slug: 'code redeems',    kind: 'Code tracker',      status: 'offline', lang: 'Markdown',   tags: ['codes', 'tools'],    files: '33 files',   size: '353 KB', updated: 'Updated 5d ago', next: 'Redeem code tracker and organizer utilities.',                  life: 'stale'  }
];

const TAB_CATALOG = [
  { icon: 'H', label: 'Home',             tab: 'home' },
  { icon: 'P', label: 'PC Stats',         tab: 'pc-stats' },
  { icon: 'T', label: 'TODOs',            tab: 'todos' },
  { icon: 'I', label: 'Idea Hub',         tab: 'idea-hub' },
  { icon: 'A', label: 'Active Processes', tab: 'active-processes' },
  { icon: 'L', label: 'Active Terminals', tab: 'active-terminals' },
  { icon: '⌘', label: 'Dev',              tab: 'dev' },
  { icon: '~', label: 'Logs',             tab: 'logs' },
  { icon: 'S', label: 'Settings',         tab: 'settings' },
  { icon: '>', label: 'Terminal' },
  { icon: 'N', label: 'Notes' },
  { icon: 'D', label: 'Docs' },
  { icon: 'G', label: 'Guest Desk' },
  { icon: 'W', label: 'Web Preview' },
  { icon: 'R', label: 'Sync Roots' }
];

const THEMES = [
  { id: '',                 name: 'Default',          note: 'near-black',    colors: ['#0d0d0d', '#1a1a1a', '#5865f2', '#3fb950', '#e8e8e8'] },
  { id: 'terminal-classic', name: 'Terminal Classic', note: 'green on dark', colors: ['#0a0f0a', '#111a11', '#00e040', '#c8b400', '#00a030'] },
  { id: 'sepia',            name: 'Sepia',            note: 'warm amber',    colors: ['#1a1410', '#2a221a', '#d4900a', '#80c060', '#f0d8a0'] },
  { id: 'cyberpunk',        name: 'Cyberpunk',        note: 'neon',          colors: ['#08080f', '#111125', '#c020f0', '#20f0a0', '#e8e0ff'] },
  { id: 'light',            name: 'Light',            note: 'clean white',   colors: ['#f5f5f5', '#efefef', '#2563eb', '#16a34a', '#111111'] },
  { id: 'soft-blue',        name: 'Soft Blue',        note: 'calm',          colors: ['#0f1117', '#1b202c', '#4080c8', '#38c070', '#d8e4f0'] },
  { id: 'high-contrast',    name: 'High Contrast',    note: 'WCAG AA+',      colors: ['#000000', '#141414', '#ffcc00', '#00e040', '#ffffff'] },
  { id: 'warm-dark',        name: 'Warm Dark',        note: 'charcoal',      colors: ['#161412', '#262220', '#c07840', '#70c060', '#eaddd0'] }
];

const TODO_GROUPS = [
  { project: 'Crab Controller', items: ['Sample task item for the template', 'Another placeholder checklist entry', 'Example item, replace with real work'] },
  { project: 'Glue Factory',    items: ['Placeholder task one', 'Placeholder task two'] },
  { project: 'Averardo Bank',   items: ['Example checklist entry'] },
  { project: 'shrimp rail',     items: ['Sample item for layout preview', 'Second sample item'] },
  { project: 'Lobster Bot',     items: ['Filler task text'] }
];

const LOGS = [
  { t: '06:52:39', tag: 'Settings',  lvl: 'info',  msg: 'Loaded settings from 8 projects' },
  { t: '06:52:40', tag: 'Workspace', lvl: 'debug', msg: 'Loaded template configuration' },
  { t: '06:52:41', tag: 'System',    lvl: 'info',  msg: 'Instant load: 8 projects from cache' },
  { t: '06:52:42', tag: 'System',    lvl: 'info',  msg: 'Background refresh complete' },
  { t: '06:52:44', tag: 'Library',   lvl: 'info',  msg: 'Scanned 6 sources' },
  { t: '06:52:47', tag: 'Ports',     lvl: 'debug', msg: 'Port scan finished, 2 listening' },
  { t: '06:53:02', tag: 'Watcher',   lvl: 'info',  msg: 'Sample info entry for the template' },
  { t: '06:53:09', tag: 'Watcher',   lvl: 'warn',  msg: 'Sample warning entry for the template' },
  { t: '06:53:31', tag: 'Indexer',   lvl: 'info',  msg: 'Placeholder log line, no live data' },
  { t: '06:54:02', tag: 'Heartbeat', lvl: 'warn',  msg: 'One project reported a stale status' },
  { t: '06:54:18', tag: 'Storage',   lvl: 'error', msg: 'Sample error entry for the template' },
  { t: '06:54:19', tag: 'Storage',   lvl: 'info',  msg: 'Recovered, operation resumed' },
  { t: '06:55:00', tag: 'Tabs',      lvl: 'debug', msg: 'Tab slept: idea-hub' },
  { t: '06:55:44', tag: 'Session',   lvl: 'info',  msg: 'Example entry closing the sample buffer' }
];

const PROC_MESSAGES = {
  'Crab Controller': 'Connected, 6 guilds',
  'shrimp rail':     'Heartbeat is stale',
  'Glue Factory':    'Capture loop running',
  'Lobster Bot':     'Service not started',
  'Averardo Bank':   'Dev server on 5173',
  'Code Redeems':    'Service not started'
};

const TREE_CHILDREN = {
  'Crab Controller': ['src', 'gui', 'docs'],
  'Glue Factory':    ['src', 'config', 'docs'],
  'Averardo Bank':   ['frontend', 'electron', 'docs'],
  'Lobster Bot':     ['src', 'tests']
};

/* =====================================================
   Small helpers
   ===================================================== */

const $  = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

const nestWindow = $('#nest-window');
const reduceMotion = globalThis.matchMedia
  ? globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

let toastTimer = null;
function showToast(message) {
  let toast = $('#demo-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'demo-toast';
    toast.className = 'demo-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1700);
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));
}

/* =====================================================
   Cross-page version tabs (shared contract with v1 and v2)
   ===================================================== */

const demoVersions = [
  { id: '1', href: '../nest/',    folder: '/nest/' },
  { id: '2', href: '../nest-v2/', folder: '/nest-v2/' },
  { id: '3', href: '../nest-v3/', folder: '/nest-v3/' }
];

function initVersionTabs() {
  const demoTabs = $('#demo-tabs');
  if (!demoTabs) return;

  const path = globalThis.location.pathname;
  const current = demoVersions.find((v) => path.includes(v.folder)) || demoVersions[0];

  // The active marker is a CSS ::after on the active tab, so there is nothing
  // to measure or reposition here and nothing that can go stale on resize.
  demoTabs.innerHTML = demoVersions.map((version) => {
    const isActive = version.id === current.id;
    return '<button class="demo-tab' + (isActive ? ' active' : '') + '" type="button" role="tab"' +
      ' data-href="' + version.href + '" aria-selected="' + isActive + '"' +
      ' aria-label="Open Version ' + version.id + '">Version ' + version.id + '</button>';
  }).join('');

  $$('.demo-tab', demoTabs).forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetHref = tab.dataset.href;
      if (!targetHref) return;
      const currentPath = globalThis.location.pathname.replace(/\/+$/, '');
      const targetPath = new URL(targetHref, globalThis.location.href).pathname.replace(/\/+$/, '');
      if (currentPath === targetPath) return;
      document.body.classList.add('page-exit');
      setTimeout(() => { globalThis.location.href = targetHref; }, 220);
    });
  });

}

/* =====================================================
   Sidebar file tree
   ===================================================== */

function renderFileTree() {
  const host = $('#file-tree');
  if (!host) return;

  host.innerHTML = PROJECTS.map((p, i) => {
    const kids = TREE_CHILDREN[p.name];
    const chevron = kids ? '▸' : '';
    const row =
      '<div class="tree-row is-root" data-tree-index="' + i + '" data-slug="' + esc(p.slug) + '" role="button" tabindex="0">' +
        '<span class="tree-chevron">' + chevron + '</span>' +
        '<span class="tree-icon">■</span>' +
        '<span class="tree-name">' + esc(p.name) + '</span>' +
        '<span class="status-dot ' + (p.status === 'offline' ? '' : p.status) + '"></span>' +
      '</div>';
    const children = kids
      ? '<div class="tree-children">' + kids.map((c) =>
          '<div class="tree-row"><span class="tree-chevron"></span><span class="tree-icon">▫</span>' +
          '<span class="tree-name">' + esc(c) + '</span></div>').join('') + '</div>'
      : '';
    return row + children;
  }).join('');

  host.addEventListener('click', (ev) => {
    const row = ev.target.closest('.tree-row');
    if (!row) return;
    $$('.tree-row', host).forEach((r) => r.classList.remove('selected'));
    row.classList.add('selected');

    if (row.classList.contains('is-root')) {
      const kids = row.nextElementSibling;
      if (kids && kids.classList.contains('tree-children')) {
        kids.classList.toggle('open');
        row.classList.toggle('open');
      }
      const name = $('.tree-name', row).textContent;
      const statusProject = $('#status-project');
      const statusScope = $('.status-scope');
      if (statusProject) statusProject.textContent = name;
      if (statusScope) statusScope.textContent = 'scope: workspace/' + (row.dataset.slug || name);
    }
  });

  host.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    const row = ev.target.closest('.tree-row');
    if (!row) return;
    ev.preventDefault();
    row.click();
  });
}

/* =====================================================
   Home panel
   ===================================================== */

function startClock() {
  const timeEl = $('.home-time');
  const dateEl = $('.home-date');
  if (!timeEl || !dateEl) return;
  function tick() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    dateEl.textContent = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  tick();
  setInterval(tick, 1000);
}

function renderProjectGrid() {
  const grid = $('#home-project-grid');
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((p) =>
    '<article class="project-card status-' + p.status + '" tabindex="0">' +
      '<div class="pc-head">' +
        '<div class="pc-identity">' +
          '<span class="pc-name">' + esc(p.name) + '</span>' +
          '<span class="pc-slug">' + esc(p.slug) + '</span>' +
        '</div>' +
        '<span class="status-dot ' + (p.status === 'offline' ? '' : p.status) + '"></span>' +
      '</div>' +
      '<p class="pc-desc">' + esc(p.next) + '</p>' +
      '<div class="pc-stats">' +
        '<span>' + esc(p.files) + '</span><span>' + esc(p.size) + '</span>' +
        '<span>' + esc(p.updated) + '</span><span>' + esc(p.lang) + '</span>' +
      '</div>' +
      '<div class="pc-meta">' +
        p.tags.map((t) => '<span class="badge">' + esc(t) + '</span>').join('') +
      '</div>' +
    '</article>').join('');

  grid.addEventListener('click', (ev) => {
    const card = ev.target.closest('.project-card');
    if (!card) return;
    showToast('Opening ' + $('.pc-name', card).textContent + ' is a demo showcase action');
  });
}

function renderCounts() {
  const running = PROJECTS.filter((p) => p.status === 'running').length;
  const warning = PROJECTS.filter((p) => p.status === 'warning').length;
  const offline = PROJECTS.filter((p) => p.status === 'offline').length;
  const summary = running + ' running, ' + warning + ' warning, ' + offline + ' offline';

  const hb = $('#home-heartbeat-label');
  if (hb) hb.textContent = summary + ' across ' + PROJECTS.length + ' projects';
  const ps = $('#proc-summary');
  if (ps) ps.textContent = summary;
  const pc = $('#projects-count');
  if (pc) pc.textContent = PROJECTS.length + ' tracked';
  const logs = $('#status-logs');
  if (logs) logs.textContent = LOGS.length + ' logs';
}

/* =====================================================
   PC Stats
   ===================================================== */

function sparkline(values, max, color) {
  const w = 100;
  const h = 30;
  const step = w / Math.max(1, values.length - 1);
  const points = values.map((v, i) => (i * step).toFixed(2) + ',' + (h - (v / max) * h).toFixed(2)).join(' ');
  const area = '0,' + h + ' ' + points + ' ' + w + ',' + h;
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true">' +
    '<polygon points="' + area + '" fill="' + color + '" opacity="0.14"></polygon>' +
    '<polyline points="' + points + '" fill="none" stroke="' + color + '" stroke-width="1.2" vector-effect="non-scaling-stroke"></polyline>' +
  '</svg>';
}

const history = {
  cpu: Array.from({ length: 40 }, (_, i) => 28 + Math.sin(i / 3) * 12 + (i % 5) * 2),
  ram: Array.from({ length: 40 }, (_, i) => 58 + Math.sin(i / 6) * 5),
  net: Array.from({ length: 40 }, (_, i) => 20 + Math.abs(Math.sin(i / 2)) * 60)
};

function usageColor(v) {
  if (v >= 80) return 'var(--status-red)';
  if (v >= 55) return 'var(--status-yellow)';
  return 'var(--status-green)';
}

function renderStats() {
  const cpuSpark = $('#cpu-spark');
  const ramSpark = $('#ram-spark');
  const netSpark = $('#net-spark');
  if (cpuSpark) cpuSpark.innerHTML = sparkline(history.cpu, 100, 'var(--accent)');
  if (ramSpark) ramSpark.innerHTML = sparkline(history.ram, 100, 'var(--status-blue)');
  if (netSpark) netSpark.innerHTML = sparkline(history.net, 100, 'var(--status-green)');

  const cpuVal = $('#cpu-val');
  if (cpuVal) cpuVal.textContent = Math.round(history.cpu[history.cpu.length - 1]) + '%';

  const cores = $('#core-list');
  if (cores) {
    const values = [42, 18, 63, 27, 12, 55, 31, 9];
    cores.innerHTML = values.map((v, i) =>
      '<div class="core-item">' +
        '<span class="core-lbl">C' + i + '</span>' +
        '<div class="bar-track core-bar"><div class="bar-fill" style="width:' + v + '%;background:' + usageColor(v) + '"></div></div>' +
        '<span class="core-val">' + v + '%</span>' +
      '</div>').join('');
  }
}

function startStatsTick() {
  if (reduceMotion) return;
  setInterval(() => {
    if (nestWindow.classList.contains('frozen')) return;
    history.cpu.push(Math.max(4, Math.min(96, history.cpu[history.cpu.length - 1] + (Math.random() * 18 - 9))));
    history.ram.push(Math.max(30, Math.min(92, history.ram[history.ram.length - 1] + (Math.random() * 5 - 2.5))));
    history.net.push(Math.max(0, Math.min(100, Math.random() * 90)));
    history.cpu.shift(); history.ram.shift(); history.net.shift();
    renderStats();
  }, 2200);
}

/* =====================================================
   TODOs / Active Processes / Logs
   ===================================================== */

function renderTodos() {
  const host = $('#todo-groups');
  if (!host) return;
  host.innerHTML = TODO_GROUPS.map((g, i) =>
    '<div class="todo-group' + (i === 0 ? ' open' : '') + '">' +
      '<button class="todo-group-head" type="button">' +
        '<span class="tree-chevron">▸</span>' +
        '<span>' + esc(g.project) + '</span>' +
        '<span class="todo-count">' + g.items.length + '</span>' +
      '</button>' +
      '<div class="todo-group-body"><ul class="home-todo-list">' +
        g.items.map((t) => '<li><span class="todo-box"></span><span class="todo-text">' + esc(t) + '</span></li>').join('') +
      '</ul></div>' +
    '</div>').join('');

  host.addEventListener('click', (ev) => {
    const head = ev.target.closest('.todo-group-head');
    if (!head) return;
    head.parentElement.classList.toggle('open');
  });
}

function renderProcCards() {
  const host = $('#proc-cards');
  if (!host) return;
  const ages = { running: 'heartbeat 3s ago', warning: 'heartbeat 41m ago', offline: 'no heartbeat' };
  host.innerHTML = PROJECTS.map((p) =>
    '<article class="proc-card status-' + p.status + '" data-status="' + p.status + '" data-name="' + esc(p.name.toLowerCase()) + '">' +
      '<div class="proc-card-head"><span class="status-dot ' + (p.status === 'offline' ? '' : p.status) + '"></span>' + esc(p.name) + '</div>' +
      '<div class="proc-card-msg">' + esc(PROC_MESSAGES[p.name] || 'Service not started') + '</div>' +
      '<div class="proc-card-time">' + ages[p.status] + '</div>' +
    '</article>').join('');
}

function renderRegistry() {
  const host = $('#projects-registry');
  if (!host) return;
  const badgeFor = { active: 'success', paused: 'warn', stale: 'danger', infra: '' };
  host.innerHTML =
    '<div class="registry-thead"><span>Project</span><span>Lifecycle</span><span>Next step</span><span>Language</span></div>' +
    PROJECTS.map((p) =>
      '<div class="registry-row">' +
        '<span class="registry-name"><span class="status-dot ' + (p.status === 'offline' ? '' : p.status) + '"></span>' + esc(p.name) + '</span>' +
        '<span><span class="badge ' + badgeFor[p.life] + '">' + p.life + '</span></span>' +
        '<span class="registry-next">' + esc(p.next) + '</span>' +
        '<span>' + esc(p.lang) + '</span>' +
      '</div>').join('');
}

function initProcFilters() {
  const filters = $('#proc-filters');
  const search = $('#proc-search');
  if (!filters) return;
  let mode = 'all';

  function apply() {
    const q = (search && search.value || '').trim().toLowerCase();
    let shown = 0;
    $$('.proc-card').forEach((card) => {
      const status = card.dataset.status;
      const matchMode = mode === 'all' || (mode === 'running' ? status !== 'offline' : status === 'offline');
      const matchText = !q || card.dataset.name.includes(q);
      const ok = matchMode && matchText;
      card.classList.toggle('hidden-by-filter', !ok);
      if (ok) shown += 1;
    });
    return shown;
  }

  filters.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-pfilter]');
    if (!btn) return;
    mode = btn.dataset.pfilter;
    $$('[data-pfilter]', filters).forEach((b) => b.classList.toggle('is-on', b === btn));
    showToast(btn.textContent + ': ' + apply() + ' shown');
  });

  if (search) search.addEventListener('input', apply);
}

function renderLogs() {
  const host = $('#log-list');
  if (!host) return;
  host.innerHTML = LOGS.map((l) =>
    '<div class="log-row level-' + l.lvl + '" data-level="' + l.lvl + '">' +
      '<span class="log-time">' + l.t + '</span>' +
      '<span class="log-tag">[' + esc(l.tag) + ']</span>' +
      '<span class="log-msg">' + esc(l.msg) + '</span>' +
    '</div>').join('');

  const filters = $('#log-filters');
  if (!filters) return;
  filters.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-level]');
    if (!btn) return;
    const level = btn.dataset.level;
    $$('[data-level]', filters).forEach((b) => b.classList.toggle('is-on', b === btn));
    let shown = 0;
    $$('.log-row', host).forEach((row) => {
      const ok = level === 'all' || row.dataset.level === level;
      row.classList.toggle('hidden-by-filter', !ok);
      if (ok) shown += 1;
    });
    showToast(btn.textContent + ': ' + shown + ' entries');
  });
}

/* =====================================================
   Tabs, launcher, command palette
   ===================================================== */

function setTab(name) {
  $$('.tab', $('#tab-bar')).forEach((tab) => {
    const on = tab.dataset.tab === name;
    tab.classList.toggle('active', on);
    tab.setAttribute('aria-selected', String(on));
    if (on) {
      const badge = $('.tab-badge', tab);
      if (badge) badge.classList.remove('visible');
    }
  });
  $$('.tab-panel').forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === name));
}

function initTabs() {
  const bar = $('#tab-bar');
  if (!bar) return;
  bar.addEventListener('click', (ev) => {
    if (ev.target.closest('.tab-close')) {
      ev.stopPropagation();
      showToast('Closing tabs is a demo showcase action');
      return;
    }
    const tab = ev.target.closest('.tab');
    if (tab) setTab(tab.dataset.tab);
  });

  $$('[data-open-tab]').forEach((btn) =>
    btn.addEventListener('click', () => setTab(btn.dataset.openTab)));
}

function initLauncher() {
  const btn = $('#tab-launcher');
  const menu = $('#launcher-dropdown');
  if (!btn || !menu) return;

  menu.innerHTML = TAB_CATALOG.map((def) =>
    '<div class="launcher-item' + (def.tab ? ' open' : '') + '" role="menuitem" tabindex="0"' +
      (def.tab ? ' data-tab="' + def.tab + '"' : '') + '>' +
      '<span class="launcher-icon">' + def.icon + '</span>' + esc(def.label) +
    '</div>').join('');

  btn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    const hidden = menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', String(!hidden));
    if (!hidden) {
      const rect = btn.getBoundingClientRect();
      const host = nestWindow.getBoundingClientRect();
      menu.style.left = Math.min(rect.left - host.left, host.width - 200) + 'px';
      menu.style.top = (rect.bottom - host.top) + 'px';
    }
  });

  menu.addEventListener('click', (ev) => {
    const item = ev.target.closest('.launcher-item');
    if (!item) return;
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    if (item.dataset.tab) setTab(item.dataset.tab);
    else showToast('Opening ' + item.textContent.trim() + ' is a demo showcase action');
  });

  document.addEventListener('click', () => {
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  });
}

const CMD_ITEMS = [
  { group: 'Tabs',     icon: 'H', label: 'Go to Home',             tab: 'home' },
  { group: 'Tabs',     icon: 'A', label: 'Go to Active Processes', tab: 'active-processes' },
  { group: 'Tabs',     icon: 'P', label: 'Go to PC Stats',         tab: 'pc-stats' },
  { group: 'Tabs',     icon: 'I', label: 'Go to Idea Hub',         tab: 'idea-hub' },
  { group: 'Tabs',     icon: 'S', label: 'Go to Settings',         tab: 'settings' },
  { group: 'Commands', icon: '⚙', label: 'Toggle freeze live updates', key: 'Freeze' },
  { group: 'Commands', icon: '◳', label: 'Toggle away mode',           key: 'Away' },
  { group: 'Commands', icon: '⌘', label: 'New terminal',               key: 'Ctrl+`' },
  { group: 'Commands', icon: '⤓', label: 'Export backup now' },
  { group: 'Projects', icon: '■', label: 'Open Crab Controller' },
  { group: 'Projects', icon: '■', label: 'Open Glue Factory' },
  { group: 'Projects', icon: '■', label: 'Open Averardo Bank' }
];

function initPalette() {
  const overlay = $('#cmd-overlay');
  const input = $('#cmd-input');
  const results = $('#cmd-results');
  if (!overlay || !input || !results) return;

  function render(query) {
    const q = query.trim().toLowerCase();
    const matches = CMD_ITEMS.filter((it) => !q || it.label.toLowerCase().includes(q));
    if (!matches.length) {
      results.innerHTML = '<p class="cmd-empty">No matches</p>';
      return;
    }
    let html = '';
    let group = null;
    matches.forEach((it, i) => {
      if (it.group !== group) {
        group = it.group;
        html += '<div class="cmd-group">' + group + '</div>';
      }
      html += '<div class="cmd-row' + (i === 0 ? ' active' : '') + '"' +
        (it.tab ? ' data-tab="' + it.tab + '"' : '') + '>' +
        '<span class="cmd-row-icon">' + it.icon + '</span>' + esc(it.label) +
        (it.key ? '<span class="cmd-row-key">' + esc(it.key) + '</span>' : '') +
      '</div>';
    });
    results.innerHTML = html;
  }

  function open() {
    overlay.classList.remove('hidden');
    input.value = '';
    render('');
    input.focus();
  }
  function close() { overlay.classList.add('hidden'); }

  input.addEventListener('input', () => render(input.value));
  results.addEventListener('click', (ev) => {
    const row = ev.target.closest('.cmd-row');
    if (!row) return;
    close();
    if (row.dataset.tab) setTab(row.dataset.tab);
    else showToast(row.textContent.trim() + ' is a demo showcase action');
  });
  overlay.addEventListener('click', (ev) => { if (ev.target === overlay) close(); });

  const paletteBtn = $('#hqa-palette');
  if (paletteBtn) paletteBtn.addEventListener('click', open);
  const searchBtn = $('#hqa-search');
  if (searchBtn) searchBtn.addEventListener('click', open);

  document.addEventListener('keydown', (ev) => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') { ev.preventDefault(); open(); }
    if (ev.key === 'Escape') {
      close();
      $('#keys-overlay').classList.add('hidden');
      $('#ai-popup').classList.add('hidden');
    }
  });
}

/* =====================================================
   Status bar, settings, sidebar resize
   ===================================================== */

function initStatusBar() {
  const freeze = $('#btn-freeze');
  if (freeze) freeze.addEventListener('click', () => {
    const on = nestWindow.classList.toggle('frozen');
    freeze.classList.toggle('active', on);
    showToast(on ? 'Background polling paused' : 'Background polling resumed');
  });

  const away = $('#btn-away');
  if (away) away.addEventListener('click', () => {
    const on = nestWindow.classList.toggle('away');
    away.classList.toggle('active', on);
    showToast(on ? 'Away mode on, events are queued' : 'Welcome back');
  });

  const keys = $('#btn-keys');
  const keysOverlay = $('#keys-overlay');
  if (keys && keysOverlay) {
    keys.addEventListener('click', () => keysOverlay.classList.remove('hidden'));
    keysOverlay.addEventListener('click', (ev) => { if (ev.target === keysOverlay) keysOverlay.classList.add('hidden'); });
    $('#keys-close').addEventListener('click', () => keysOverlay.classList.add('hidden'));
  }

  const ai = $('#btn-ai');
  const aiPopup = $('#ai-popup');
  if (ai && aiPopup) {
    ai.addEventListener('click', (ev) => { ev.stopPropagation(); aiPopup.classList.toggle('hidden'); });
    $('#ai-cancel').addEventListener('click', () => aiPopup.classList.add('hidden'));
  }
}

function initSettings() {
  const grid = $('#theme-grid');
  if (grid) {
    grid.innerHTML = THEMES.map((t, i) =>
      '<button class="theme-swatch' + (i === 0 ? ' is-on' : '') + '" type="button" data-theme="' + t.id + '">' +
        '<span class="theme-strip">' + t.colors.map((c) => '<span style="background:' + c + '"></span>').join('') + '</span>' +
        '<span class="theme-name">' + t.name + '</span>' +
        '<span class="theme-note">' + t.note + '</span>' +
      '</button>').join('');

    grid.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.theme-swatch');
      if (!btn) return;
      $$('.theme-swatch', grid).forEach((b) => b.classList.toggle('is-on', b === btn));
      const theme = btn.dataset.theme;
      if (theme) nestWindow.dataset.theme = theme;
      else delete nestWindow.dataset.theme;
      renderStats();
      showToast($('.theme-name', btn).textContent + ' theme applied');
    });
  }

  $$('.seg').forEach((seg) => seg.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.seg-btn');
    if (!btn) return;
    $$('.seg-btn', seg).forEach((b) => b.classList.toggle('is-on', b === btn));
    if (seg.dataset.seg === 'sidebar') nestWindow.dataset.sidebar = btn.dataset.value;
    if (seg.dataset.seg === 'status')  nestWindow.dataset.status = btn.dataset.value;
  }));

  const scale = $('#ui-scale');
  const scaleVal = $('#ui-scale-val');
  if (scale && scaleVal) scale.addEventListener('input', () => {
    scaleVal.textContent = scale.value + '%';
    nestWindow.style.fontSize = (13 * (Number(scale.value) / 100)).toFixed(2) + 'px';
  });

  const crt = $('#sw-crt');
  if (crt) crt.addEventListener('click', () => {
    const on = crt.getAttribute('aria-checked') !== 'true';
    crt.setAttribute('aria-checked', String(on));
    nestWindow.classList.toggle('crt', on);
  });

  const ascii = $('#sw-ascii');
  if (ascii) ascii.addEventListener('click', () => {
    const on = ascii.getAttribute('aria-checked') !== 'true';
    ascii.setAttribute('aria-checked', String(on));
    showToast(on ? 'ASCII tab header enabled' : 'ASCII tab header disabled');
  });
}

function initResizer() {
  const resizer = $('#nest-resizer');
  const sidebar = $('#nest-sidebar');
  if (!resizer || !sidebar) return;
  let dragging = false;

  resizer.addEventListener('pointerdown', (ev) => {
    dragging = true;
    resizer.classList.add('dragging');
    resizer.setPointerCapture(ev.pointerId);
  });
  resizer.addEventListener('pointermove', (ev) => {
    if (!dragging) return;
    const rect = sidebar.getBoundingClientRect();
    const width = Math.max(140, Math.min(420, ev.clientX - rect.left));
    sidebar.style.width = width + 'px';
  });
  resizer.addEventListener('pointerup', (ev) => {
    dragging = false;
    resizer.classList.remove('dragging');
    resizer.releasePointerCapture(ev.pointerId);
  });
  resizer.addEventListener('keydown', (ev) => {
    const current = sidebar.getBoundingClientRect().width;
    if (ev.key === 'ArrowLeft')  { sidebar.style.width = Math.max(140, current - 12) + 'px'; ev.preventDefault(); }
    if (ev.key === 'ArrowRight') { sidebar.style.width = Math.min(420, current + 12) + 'px'; ev.preventDefault(); }
  });
}

function initDemoActions() {
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-demo-action]');
    if (!btn) return;
    showToast(btn.dataset.demoAction + ' is a demo showcase action');
  });
}

/* =====================================================
   Boot
   ===================================================== */

function boot() {
  initVersionTabs();
  renderFileTree();
  startClock();
  renderProjectGrid();
  renderCounts();
  renderStats();
  startStatsTick();
  renderTodos();
  renderProcCards();
  renderRegistry();
  initProcFilters();
  renderLogs();
  initTabs();
  initLauncher();
  initPalette();
  initStatusBar();
  initSettings();
  initResizer();
  initDemoActions();
  // setTimeout rather than requestAnimationFrame: rAF does not fire while the
  // tab is hidden, which would leave the page stuck at opacity 0 in a
  // background tab until it is focused.
  setTimeout(() => document.body.classList.add('page-ready'), 0);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
