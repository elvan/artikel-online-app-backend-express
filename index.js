const dotenv = require('dotenv');
const express = require('express');

const connectToDatabase = require('./database/connectToDatabase');
const enableCors = require('./middleware/enableCors');
const errorHandler = require('./middleware/errorHandler');
const adminArticleRouter = require('./routers/adminArticleRouter');
const articleRouter = require('./routers/articleRouter');
const userRouter = require('./routers/userRouter');

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(enableCors);

app.use('/api/users', userRouter);
app.use('/api/articles', articleRouter);
app.use('/api/admin/articles', adminArticleRouter);

app.use(errorHandler);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
  });
});
