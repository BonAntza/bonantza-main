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
 * Returns all existing notes in a month. Fetches notes for the month in a given date variable.
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
    // The notes text must not be empty. Return all dates in the month that have some existing notes text.
    const query = `
      SELECT TO_CHAR(day, 'YYYY-MM-DD') as formatted_day
      FROM day_notes
      WHERE date_trunc('month', day) = date_trunc('month', to_date($1, 'YYYY-MM-DD'))
      AND notes IS NOT NULL AND notes != '';
    `;
    const { rows } = await pool.query(query, [date]);

    const datesWithNotes = rows.map(row => row.formatted_day);

    res.status(200).json(datesWithNotes);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};