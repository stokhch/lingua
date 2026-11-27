// Хранилище прогресса. Два режима:
//  • server — аккаунт на сервере (server.js), прогресс синхронизируется через /api/state;
//  • local  — без регистрации, всё хранится в браузере (localStorage, а если он недоступен — в памяти).
// Офлайн-режим для аккаунта: копия прогресса лежит в браузере (lingva.account). Без сети учимся дальше,
// изменения копятся в копии с пометкой dirty и уходят на сервер, как только связь вернётся.
const LS_TOKEN = 'lingva.token';
const LS_LOCAL = 'lingva.local';
const LS_ACCOUNT = 'lingva.account';
const RETRY_MS = 20000;

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
    readTexts: {}, grammar: {}, materials: {}, openedTexts: {}, mySets: {}, exams: {}, stats: { answers: 0, correct: 0, trainings: 0, perfect: 0, byType: {} }, badges: {}, days: {}, chests: {}
  };
}

function readAccount() { try { return JSON.parse(ls.get(LS_ACCOUNT)) || null; } catch { return null; } }
function writeAccount(user, state, dirty) { ls.set(LS_ACCOUNT, JSON.stringify({ user, state, dirty, at: Date.now() })); }
// Нет связи (а не ответ сервера с ошибкой): fetch упал или не дождались ответа
export const isNetworkError = e => !e?.status;

function normalize(s) {
  const base = emptyState(s?.name);
  return { ...base, ...s, stats: { ...base.stats, ...(s?.stats || {}) } };
}

export const store = {
  mode: 'local',      // 'server' | 'local'
  serverAvailable: false,
  user: null,
  state: null,
  syncState: 'saved', // 'saved' | 'saving' | 'offline' | 'error'
  offline: false,     // аккаунт, но сервер сейчас недоступен (нет интернета)
  listeners: new Set(),

  async init() {
    const token = ls.get(LS_TOKEN), acc = readAccount();
    // Есть копия прогресса — долго сервер не ждём (без сети сразу открываем копию, а синхронизируем позже).
    // Без копии ждём сколько нужно: бесплатный хостинг просыпается до минуты.
    const hasCopy = !!(token && acc?.state);
    try {
      if (hasCopy && navigator.onLine === false) throw new Error('offline');
      const r = await fetch('api/health', { cache: 'no-store', signal: hasCopy ? AbortSignal.timeout?.(8000) : undefined });
      this.serverAvailable = r.ok && (await r.json()).ok === true;
    } catch { this.serverAvailable = false; }

    if (this.serverAvailable && token) {
      try {
        const me = await this.api('GET', 'api/me');
        this.mode = 'server'; this.user = me.user;
        if (acc?.dirty && acc.user?.id === me.user.id) {
          // В прошлый раз занимались без сети и закрыли приложение до синхронизации — отправляем сейчас
          this.state = normalize(acc.state);
          await this.saveNow();
        } else {
          const st = await this.api('GET', 'api/state');
          this.state = normalize(st.state || emptyState(me.user.name));
          writeAccount(this.user, this.state, false);
        }
        return true;
      } catch (e) {
        this.mode = 'local'; this.user = null;
        if (e.status === 401 || e.status === 403) { ls.del(LS_TOKEN); ls.del(LS_ACCOUNT); }
      }
    }
    // Вошли раньше, но сейчас нет сети (или сервер не отвечает): открываем копию прогресса из браузера
    if (ls.get(LS_TOKEN) && acc?.state) {
      this.mode = 'server'; this.user = acc.user;
      this.state = normalize(acc.state);
      this.syncState = acc.dirty ? 'offline' : 'saved';
      this.setOffline(true);
      return true;
    }
    const local = ls.get(LS_LOCAL);
    if (local) { this.mode = 'local'; this.state = normalize(JSON.parse(local)); return true; }
    if (!this.serverAvailable) { this.startLocal(); return true; }
    return false; // нужен вход или регистрация
  },

  async api(method, url, body) {
    let r;
    try {
      r = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (ls.get(LS_TOKEN) || '') },
        body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout?.(20000)
      });
    } catch {
      if (this.mode === 'server') this.setOffline(true);
      throw Object.assign(new Error('Нет связи с сервером. Проверьте интернет.'), { status: 0 });
    }
    if (this.mode === 'server' && this.offline) this.setOffline(false);
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw Object.assign(new Error(data.error || 'Ошибка сети'), { status: r.status });
    return data;
  },

  // Связь пропала или вернулась. Пока её нет — раз в 20 секунд пробуем достучаться до сервера;
  // вернулась — отправляем прогресс, накопленный без сети.
  setOffline(v) {
    v = !!v;
    if (v === this.offline) return;
    this.offline = v;
    clearInterval(this._retry);
    if (v) this._retry = setInterval(() => this.reconnect(), RETRY_MS);
    else {
      this.serverAvailable = true;
      if (readAccount()?.dirty) this.saveNow();
    }
    this.emit();
    window.dispatchEvent(new Event('lingva:connection'));
  },

  async reconnect() {
    if (this.mode !== 'server') {
      // Гость: просто узнаём, появился ли сервер (чтобы показать кнопку «Войти»)
      try { const r = await fetch('api/health', { cache: 'no-store' }); this.serverAvailable = r.ok; } catch { this.serverAvailable = false; }
      this.emit();
      return;
    }
    if (this._reconnecting) return;
    this._reconnecting = true;
    try { await this.api('GET', 'api/me'); }
    catch (e) { if (!isNetworkError(e)) { this.setOffline(false); this.syncState = 'error'; this.emit(); } }
    finally { this._reconnecting = false; }
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
    const st = await this.api('GET', 'api/state'), acc = readAccount();
    if (acc?.dirty && acc.user?.id === res.user.id) {
      // Вход истёк, пока занимались без сети: не теряем то, что накопилось на устройстве
      this.state = normalize(acc.state);
      await this.saveNow();
    } else if (st.state) { this.state = normalize(st.state); writeAccount(this.user, this.state, false); }
    else {
      // Новый аккаунт: переносим прогресс, накопленный без регистрации.
      const local = ls.get(LS_LOCAL);
      this.state = local ? normalize({ ...JSON.parse(local), name: res.user.name }) : emptyState(res.user.name);
      await this.saveNow();
    }
    return res.user;
  },

  async logout() {
    if (this.mode === 'server') {
      if (readAccount()?.dirty) await this.saveNow();
      try { await this.api('POST', 'api/logout'); } catch {}
    }
    ls.del(LS_TOKEN); ls.del(LS_ACCOUNT); this.user = null; this.state = null; this.mode = 'local';
    this.offline = false; clearInterval(this._retry);
  },

  /** Есть ли прогресс, который ещё не дошёл до сервера (занимались без сети). */
  get unsynced() { return this.mode === 'server' && !!readAccount()?.dirty; },

  save() {
    clearTimeout(this._t);
    this.syncState = 'saving';
    this._t = setTimeout(() => this.saveNow(), 600);
    this.emit();
  },

  async saveNow() {
    clearTimeout(this._t);
    if (this.mode !== 'server') {
      ls.set(LS_LOCAL, JSON.stringify(this.state));
      this.syncState = 'saved';
      return this.emit();
    }
    // Сначала — копия на устройстве: даже если сети нет или вкладку закроют, прогресс не пропадёт
    const snap = JSON.stringify(this.state), user = this.user;
    writeAccount(user, this.state, true);
    if (this.offline) { this.syncState = 'offline'; return this.emit(); }
    try {
      await this.api('PUT', 'api/state', { state: this.state });
      // Пока шёл запрос, прогресс мог измениться — тогда копия остаётся «не отправленной»
      writeAccount(user, this.state, JSON.stringify(this.state) !== snap);
      this.syncState = 'saved';
    } catch (e) { this.syncState = isNetworkError(e) ? 'offline' : 'error'; }
    this.emit();
  },

  resetProgress() {
    const keep = { name: this.state.name, goal: this.state.goal, rate: this.state.rate, lang: this.state.lang || 'en', ...(this.state.mute ? { mute: true } : {}), ...(this.state.hideFromAll ? { hideFromAll: true } : {}) };
    this.state = { ...emptyState(), ...keep };
    return this.saveNow();
  },

  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
  emit() { for (const fn of this.listeners) fn(); }
};

// Браузер сам сообщает, что сеть пропала или появилась (не всегда точно — поэтому есть и проверка раз в 20 с)
window.addEventListener('online', () => store.reconnect());
window.addEventListener('offline', () => { if (store.mode === 'server') store.setOffline(true); else store.emit(); });
window.addEventListener('beforeunload', () => { if (store.syncState === 'saving') store.saveNow(); });
