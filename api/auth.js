const jwt = require('jsonwebtoken');

// Include the verifyUser logic here or import it from another module if needed
const verifyUser = async (username, password) => {
  // Your user verification logic goes here
  if (username === "bonantza" && password === "password") {
    return { username }; // Dummy user object
  }
  return null;
};

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Use the verifyUser function to check the user's credentials
    const user = await verifyUser(username, password);

    if (user) {
      // User credentials are valid
      // Generate a JSON token and send it back to the client
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY);
      res.json({ token });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
