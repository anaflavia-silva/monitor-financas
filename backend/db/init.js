const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/finance.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL
    )
  `);

  db.run(`DELETE FROM transactions`); // Limpa dados antigos
  db.run(`INSERT INTO transactions (description, amount, type) VALUES
    ('Salário', 5000, 'entrada'),
    ('Aluguel', 1200, 'saida'),
    ('Supermercado', 600, 'saida'),
    ('Freelance', 800, 'entrada')
  `);

  console.log('Banco inicializado com dados de exemplo.');
  db.close();
});
