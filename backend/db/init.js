const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbFile = path.join(__dirname, 'finance.db');
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('income','expense')),
      category TEXT,
      date TEXT NOT NULL
    )
  `);

  const stmt = db.prepare(`INSERT INTO transactions (description, amount, type, category, date) VALUES (?,?,?,?,?)`);
  stmt.run('Salario', 4000, 'income', 'Trabalho', new Date().toISOString());
  stmt.run('Aluguel', 1200, 'expense', 'Moradia', new Date().toISOString());
  stmt.run('Supermercado', 300, 'expense', 'Alimentacao', new Date().toISOString());
  stmt.run('Freelance', 800, 'income', 'Freelas', new Date().toISOString());
  stmt.finalize();

  console.log('DB inicializado em', dbFile);
});

db.close();
