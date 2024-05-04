const jwt = require('jsonwebtoken');

/**
 * Verifies the JWT token to authenticate backend requests.
 * @param {string} token - The JWT token to verify.
 * @returns {Promise<boolean>} - True if authenticated, false otherwise.
 */
const hasAccess = (token) => {
  return new Promise((resolve) => {
    if (!token) {
      resolve(false);
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
        resolve(!err);
      });
    }
  });
};

module.exports = { hasAccess };