const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.registerUser = asyncHandler(async (req, res) => {
  // Destructure the user object from the request body
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Check for existing user
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (newUser) {
    // Send response
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });
  } else {
    // Failed to register user
    res.status(500);
    throw new Error('Failed to register user');
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  res.json({
    message: 'User logged in successfully',
  });
});

exports.currentUser = (req, res) => {
  res.json({
    message: 'Current user',
  });
};
