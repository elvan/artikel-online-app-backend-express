const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const authGuard = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error(error.message);
    }
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = authGuard;
