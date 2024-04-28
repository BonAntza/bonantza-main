const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * An upsert function to save notes for a given day.
 */
module.exports = async (req, res) => {
  const { date, notes } = req.body;

  // TODO: date validation and notes sanitation.

  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  // If day's notes already exist, do an update instead.
  const query = `
      INSERT INTO day_notes (day, notes)
      VALUES ($1, $2)
      ON CONFLICT (day)
      DO UPDATE SET notes = EXCLUDED.notes;
  `;

  try {
    await pool.query(query, [date, notes]);
    res.send("Upsert succesful!");
  } catch (err) {
    res.status(500).send('Failed to upsert note');
  }
};