const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.status(200).json({ message: 'Access to protected content granted.' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};