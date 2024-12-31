// controllers/userController.js
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users); // Return users in JSON format
  } catch (err) {
    res.status(500).send('Error fetching users.');
  }
};

// Sign up a new user
exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    await userModel.createUser({ username, password: hashedPassword, email });

    // Redirect to the homepage
    res.redirect('/'); // This will redirect the user to the homepage
  } catch (err) {
    res.status(500).send('Error creating user.');
  }
};


// Login a user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await userModel.findUserByUsername(username);
    
    // If user exists, compare the entered password with the stored password
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).send('Login successful.');
    } else {
      res.status(401).send('Invalid credentials.'); // Invalid username or password
    }
  } catch (err) {
    res.status(500).send('Error logging in.');
  }
};
