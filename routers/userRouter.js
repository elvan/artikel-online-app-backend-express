const express = require('express');
const {
  registerUser,
  loginUser,
  currentUser,
  updateUserName,
} = require('../controllers/userController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current-user', authGuard, currentUser);

router.put('/', authGuard, updateUserName);

module.exports = router;
