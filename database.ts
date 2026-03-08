import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('choco_m.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Initialize admin profile pic if not exists
const profilePic = db.prepare('SELECT value FROM admin_settings WHERE key = ?').get('profile_pic');
if (!profilePic) {
  db.prepare('INSERT INTO admin_settings (key, value) VALUES (?, ?)').run('profile_pic', 'https://picsum.photos/seed/admin/300/300');
}

export default db;
