const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = async (req, res) => {
  const { date } = req.query; // Expected in 'YYYY-MM-DD' format

  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  try {
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
    console.error('Failed to query notes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};