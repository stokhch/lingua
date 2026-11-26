// Хранилище базы Лингвы. save() принимает уже сериализованный JSON.
// Если задана переменная DATABASE_URL — данные лежат в PostgreSQL (например, бесплатный Neon или Supabase):
// вся база хранится одной JSON-записью в таблице lingva_store. Это переживает перезапуски и деплои
// на хостингах с временным диском (Render free). Нужен пакет `pg` (ставится через npm install).
// Иначе — файл db.json в папке LINGVA_DATA (по умолчанию ./data), запись атомарная через временный файл.

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

const EMPTY = () => ({ users: {}, sessions: {} });

function normalize(db) {
  if (!db || typeof db !== 'object') return EMPTY();
  return { ...db, users: db.users || {}, sessions: db.sessions || {} };
}

export async function fileStore(dataDir) {
  const file = path.join(dataDir, 'db.json');
  fs.mkdirSync(dataDir, { recursive: true });
  return {
    kind: 'file',
    async load() {
      try { return normalize(JSON.parse(await fsp.readFile(file, 'utf8'))); }
      catch (e) { if (e.code === 'ENOENT') return EMPTY(); throw e; }
    },
    async save(json) {
      const tmp = file + '.tmp';
      await fsp.writeFile(tmp, json);
      await fsp.rename(tmp, file);
    },
    async close() {},
  };
}

export async function pgStore(url) {
  let pg;
  try { pg = (await import('pg')).default; }
  catch { throw new Error('Задан DATABASE_URL, но пакет "pg" не установлен. Выполните npm install.'); }
  const pool = new pg.Pool({ connectionString: url, max: 2, idleTimeoutMillis: 10_000 });
  pool.on('error', e => console.error('PostgreSQL:', e.message));
  await pool.query(`CREATE TABLE IF NOT EXISTS lingva_store (
    id text PRIMARY KEY,
    data jsonb NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`);
  return {
    kind: 'postgres',
    async load() {
      const r = await pool.query(`SELECT data FROM lingva_store WHERE id = 'main'`);
      return normalize(r.rows[0]?.data);
    },
    async save(json) {
      await pool.query(
        `INSERT INTO lingva_store (id, data, updated_at) VALUES ('main', $1, now())
         ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
        [json]);
    },
    async close() { await pool.end(); },
  };
}

export function openStore({ databaseUrl, dataDir }) {
  return databaseUrl ? pgStore(databaseUrl) : fileStore(dataDir);
}
