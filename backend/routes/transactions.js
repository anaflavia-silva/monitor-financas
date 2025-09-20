const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all
router.get('/', (req, res) => {
  db.all('SELECT * FROM transactions ORDER BY date DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST create
router.post('/', (req, res) => {
  const { description, amount, type, category } = req.body;
  if (!description || amount === undefined || !type) return res.status(400).json({ error: 'Dados incompletos' });
  const date = new Date().toISOString();
  db.run(
    `INSERT INTO transactions (description, amount, type, category, date) VALUES (?,?,?,?,?)`,
    [description, amount, type, category || '', date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT * FROM transactions WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(row);
      });
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json({ deleted: true });
  });
});

module.exports = router;
