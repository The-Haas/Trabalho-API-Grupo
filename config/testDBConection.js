require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function testarConexao() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conectado com sucesso! Data/hora do banco:', res.rows[0].now);
    await pool.end();
  } catch (err) {
    console.error('Erro ao conectar no banco:', err);
  }
}

testarConexao();