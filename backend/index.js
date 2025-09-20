const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DB_FILE = process.env.DB_FILE || './db/finance.db';

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) console.error('Erro ao conectar DB:', err.message);
  else console.log('Conectado ao banco de dados SQLite.');
});

// Rotas
app.get('/api/transactions', (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/transactions', (req, res) => {
  const { description, amount, type } = req.body;
  db.run(
    'INSERT INTO transactions (description, amount, type) VALUES (?, ?, ?)',
    [description, amount, type],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, description, amount, type });
    }
  );
});

app.delete('/api/transactions/:id', (req, res) => {
  db.run('DELETE FROM transactions WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
