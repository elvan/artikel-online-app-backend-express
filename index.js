const dotenv = require('dotenv');
const express = require('express');

const connectToDatabase = require('./database/connectToDatabase');
const errorHandler = require('./middleware/errorHandler');
const userRouter = require('./routers/userRouter');

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.use(errorHandler);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
  });
});
