const dotenv = require('dotenv');
const express = require('express');

const errorHandler = require('./middleware/errorHandler');
const userRouter = require('./routers/userRouter');

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_SERVER =
  process.env.MONGODB_SERVER || 'mongodb://localhost:27017/artikel-online-app';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
