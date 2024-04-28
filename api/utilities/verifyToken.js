const jwt = require('jsonwebtoken');

/**
 * Serverless function to check if token is verified for access. 
 * @returns String - Information of verification. 
 */
module.exports = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verification fail will throw an error.
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    // All good, token verified.
    res.status(200).json({ message: 'Access to protected content granted.' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};