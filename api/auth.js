/**
 * API endpoint for login (serverless function).
 */

const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CIPHER = process.env.CIPHER;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * Gets userdata for a given username and checks if the password is a match.
 * @param String username 
 * @param String password 
 * @returns String - Username upon succesfull verification, null otherwise.
 */
const verifyUser = async (username, password) => {

  // Admin authentication.
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return username;
  }

  try {
    const query = "SELECT * FROM users WHERE username = $1";
    const { rows } = await pool.query(query, [username]);
    const user = rows.length > 0 ? rows[0] : null;

    // Username found, check the password.
    if (user) {
      const combinedValue = user.guardian + CIPHER + password;
      const isMatch = await bcrypt.compare(combinedValue, user.hash);

      if (isMatch) {
        return user.username;
      }
    }

    // Authentication failed.
    return null;
  } catch (err) {
    throw err;
  }
};

/**
 * API authorization endpoint for login.
 */
module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    const validUsername = await verifyUser(username, password);

    // User credentials are valid.
    if (validUsername) {
      // Generate a JSON token and send it back to the client.
      // TODO: token refresh needs to be implemented.
      const token = jwt.sign({ username: validUsername }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};