const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * Fetch notes for a single given day.
 */
module.exports = async (req, res) => {
  const { date } = req.query;

  // TODO: date validation.

  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  try {
    const query = 'SELECT * FROM day_notes WHERE day = $1';
    const { rows } = await pool.query(query, [date]);

    if (rows.length > 0) {
      res.status(200).json(rows[0].notes);
    } else {
      res.status(200).json({ message: 'No notes found for this date' });
    }
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};