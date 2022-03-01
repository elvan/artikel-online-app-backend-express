const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

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

  const user = {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser._id),
  };

  if (newUser) {
    // Send response
    res.status(201).json({
      message: 'User registered successfully',
      user: user,
    });
  } else {
    // Failed to register user
    res.status(500);
    throw new Error('Failed to register user');
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  // Destructure the user object from the request body
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Check for existing user
  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Incorrect credentials');
  }

  const user = {
    _id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    token: generateToken(existingUser._id),
  };

  // Send response
  res.json({
    message: 'User logged in successfully',
    user: user,
  });
});

exports.currentUser = (req, res) => {
  res.json({
    message: 'Current user',
  });
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '30d',
  });
};
