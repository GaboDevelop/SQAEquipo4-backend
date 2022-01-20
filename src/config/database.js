const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'sqa_equipo4',
  password: '1234',
  port: 5432,
});

pool.connect().then(() => console.log('connected'));

module.exports = {
  query: (text, params) => pool.query(text, params),
};
