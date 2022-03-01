const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_SERVER =
  process.env.MONGODB_SERVER || 'mongodb://localhost:27017/artikel-online-app';

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
