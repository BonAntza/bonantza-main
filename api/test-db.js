const { Pool } = require('pg');

// Database pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.send(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  }
};
