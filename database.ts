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
  )
`);

// Seed initial data if empty
const rowCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (rowCount.count === 0) {
  const insert = db.prepare('INSERT INTO products (name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?)');
  insert.run('Oversized Hoodie', 59.99, 'Premium heavy cotton oversized hoodie for ultimate comfort.', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800', 'Hoodies');
  insert.run('Street Jacket', 89.99, 'Windproof street jacket with reflective details.', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800', 'Jackets');
  insert.run('Graphic Tee', 29.99, '100% organic cotton tee with custom CHOCO M graphics.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800', 'T-Shirts');
  insert.run('Cargo Pants', 65.00, 'Multi-pocket cargo pants for a utilitarian look.', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800', 'Pants');
  insert.run('Fashion Cap', 25.00, 'Embroidered logo cap with adjustable strap.', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800', 'Accessories');
}

export default db;
