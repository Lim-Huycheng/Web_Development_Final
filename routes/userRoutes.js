// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Render login page
router.get('/login', (req, res) => {
    res.render('user/login');  // Renders the login.ejs view
  });
  
  // Render sign-up page
  router.get('/signup', (req, res) => {
    res.render('user/signup');  // Renders the signup.ejs view
  });
  
// Routes for user operations
router.get('/', userController.getAllUsers); // Get all users
router.post('/signup', userController.signup); // Sign up a new user
router.post('/login', userController.login); // Login an existing user

module.exports = router;
