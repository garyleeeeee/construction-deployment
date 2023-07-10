const express = require('express');
const router = express.Router();
const { httpAddNewUser, httpUpdateUserRole, httpSignInUser, httpGetAllUsers } = require('./users.controller');

// Get all users
router.get('/', async (req, res) => {
  return httpGetAllUsers(req, res);
})

// Create a new user
router.post('/signup', async (req, res) => {
    return httpAddNewUser(req, res);
});

// Sign in a user
router.post('/signin', async (req, res) => {
  return httpSignInUser(req, res);
})

// Update a user role
router.put('/updaterole', async (req, res) => {
  return httpUpdateUserRole(req, res);
});




module.exports = router;