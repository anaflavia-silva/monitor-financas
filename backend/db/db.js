const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbFile = process.env.DB_FILE || path.join(__dirname, 'finance.db');

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Erro ao abrir DB', err.message);
  } else {
    console.log('Conectado ao SQLite:', dbFile);
  }
});

module.exports = db;
