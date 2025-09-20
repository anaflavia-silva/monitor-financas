const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/transactions', require('./routes/transactions'));

app.get('/api/summary', (req, res) => {
  const qTotal = `SELECT
    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpense
  FROM transactions`;
  db.get(qTotal, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    const totalIncome = row && row.totalIncome ? row.totalIncome : 0;
    const totalExpense = row && row.totalExpense ? row.totalExpense : 0;
    const balance = totalIncome - totalExpense;
    res.json({ totalIncome, totalExpense, balance });
  });
});

app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));
