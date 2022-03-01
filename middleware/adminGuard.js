const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');

const User = require('../models/user');

dotenv.config();

const adminGuard = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(401);
      throw new Error('Admin user not found');
    }

    if (!user.isAdmin) {
      res.status(401);
      throw new Error('User is not admin');
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

module.exports = adminGuard;
