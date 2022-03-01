exports.registerUser = (req, res) => {
  res.json({
    message: 'User registered successfully',
  });
};

exports.loginUser = (req, res) => {
  res.json({
    message: 'User logged in successfully',
  });
};

exports.currentUser = (req, res) => {
  res.json({
    message: 'Current user',
  });
};
