const express = require('express');
const {
  listArticles,
  getArticle,
} = require('../controllers/articleController');
const commentRouter = require('./commentRouter');

const router = express.Router();

router.use('/:articleId/comments', commentRouter);

router.get('/', listArticles);

router.get('/:articleId', getArticle);

module.exports = router;
