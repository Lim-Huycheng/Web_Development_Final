const db = require('../config/database');

// Fetch all users
exports.getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

// Find a user by username
exports.findUserByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

// Create a new user
exports.createUser = async (user) => {
  const { username, password, email } = user;
  const [result] = await db.query(
    'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
    [username, password, email]
  );
  return result;
};

// Update a user
exports.updateUser = async (id, user) => {
  const { username, password, email } = user;
  const [result] = await db.query(
    'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?',
    [username, password, email, id]
  );
  return result;
};

// Delete a user
exports.deleteUser = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result;
};
