const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.query('SELECT 1')
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch((err) => console.error('Error de conexión a BD:', err));

module.exports = pool;