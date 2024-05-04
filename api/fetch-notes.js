const { Pool } = require('pg');
const { hasAccess } = require('../api/utilities/hasAccess');
const { validateDate } = require('../api/utilities/validation');

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
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!await hasAccess(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { date } = req.query;

  // Date validation.
  if (!date || !validateDate(date)) {
    return res.status(400).json({ error: 'Invalid or missing date parameter. Required format: YYYY-MM-DD' });
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
    res.status(500).json({ error: 'Internal server error' });
  }
};