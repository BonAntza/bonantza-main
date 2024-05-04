const { Pool } = require('pg');
const { hasAccess } = require('../api/utilities/hasAccess');

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
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!await hasAccess(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

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
    res.status(200).send("Upsert successful!");
  } catch (err) {
    res.status(500).send('Failed to upsert notes');
  }
};