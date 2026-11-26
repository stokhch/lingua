// Хранилище прогресса. Два режима:
//  • server — аккаунт на сервере (server.js), прогресс синхронизируется через /api/state;
//  • local  — без регистрации, всё хранится в браузере (localStorage, а если он недоступен — в памяти).
const LS_TOKEN = 'lingva.token';
const LS_LOCAL = 'lingva.local';

const mem = {};
const ls = {
  get(k) { try { return localStorage.getItem(k); } catch { return mem[k] ?? null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { mem[k] = v; } },
  del(k) { try { localStorage.removeItem(k); } catch { delete mem[k]; } }
};

export function emptyState(name = 'Ученик') {
  return {
    v: 1, name, goal: 50, rate: 0.9, createdAt: Date.now(), lang: 'en',
    words: {}, xp: 0, xpLog: {}, streak: 0, bestStreak: 0, lastActive: null,
    readTexts: {}, grammar: {}, stats: { answers: 0, correct: 0, trainings: 0, perfect: 0 }, badges: {}
  };
}

function normalize(s) {
  const base = emptyState(s?.name);
  return { ...base, ...s, stats: { ...base.stats, ...(s?.stats || {}) } };
}

export const store = {
  mode: 'local',      // 'server' | 'local'
  serverAvailable: false,
  user: null,
  state: null,
  syncState: 'saved', // 'saved' | 'saving' | 'error'
  listeners: new Set(),

  async init() {
    try {
      const r = await fetch('api/health', { cache: 'no-store' });
      this.serverAvailable = r.ok && (await r.json()).ok === true;
    } catch { this.serverAvailable = false; }

    const token = ls.get(LS_TOKEN);
    if (this.serverAvailable && token) {
      try {
        const me = await this.api('GET', 'api/me');
        const st = await this.api('GET', 'api/state');
        this.mode = 'server'; this.user = me.user;
        this.state = normalize(st.state || emptyState(me.user.name));
        return true;
      } catch { ls.del(LS_TOKEN); }
    }
    const local = ls.get(LS_LOCAL);
    if (local) { this.mode = 'local'; this.state = normalize(JSON.parse(local)); return true; }
    if (!this.serverAvailable) { this.startLocal(); return true; }
    return false; // нужен вход или регистрация
  },

  async api(method, url, body) {
    const r = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (ls.get(LS_TOKEN) || '') },
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || 'Ошибка сети');
    return data;
  },

  startLocal(name) {
    this.mode = 'local'; this.user = null;
    const saved = ls.get(LS_LOCAL);
    this.state = saved ? normalize(JSON.parse(saved)) : emptyState(name || 'Гость');
    this.saveNow();
  },

  async auth(kind, payload) {
    const res = await this.api('POST', kind === 'login' ? 'api/login' : 'api/register', payload);
    ls.set(LS_TOKEN, res.token);
    this.mode = 'server'; this.user = res.user;
    const st = await this.api('GET', 'api/state');
    if (st.state) this.state = normalize(st.state);
    else {
      // Новый аккаунт: переносим прогресс, накопленный без регистрации.
      const local = ls.get(LS_LOCAL);
      this.state = local ? normalize({ ...JSON.parse(local), name: res.user.name }) : emptyState(res.user.name);
      await this.saveNow();
    }
    return res.user;
  },

  async logout() {
    if (this.mode === 'server') { try { await this.api('POST', 'api/logout'); } catch {} }
    ls.del(LS_TOKEN); this.user = null; this.state = null; this.mode = 'local';
  },

  save() {
    clearTimeout(this._t);
    this.syncState = 'saving';
    this._t = setTimeout(() => this.saveNow(), 600);
    this.emit();
  },

  async saveNow() {
    clearTimeout(this._t);
    try {
      if (this.mode === 'server') await this.api('PUT', 'api/state', { state: this.state });
      else ls.set(LS_LOCAL, JSON.stringify(this.state));
      this.syncState = 'saved';
    } catch { this.syncState = 'error'; }
    this.emit();
  },

  resetProgress() {
    const keep = { name: this.state.name, goal: this.state.goal, rate: this.state.rate, lang: this.state.lang || 'en' };
    this.state = { ...emptyState(), ...keep };
    return this.saveNow();
  },

  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
  emit() { for (const fn of this.listeners) fn(); }
};

window.addEventListener('beforeunload', () => { if (store.syncState === 'saving') store.saveNow(); });
