const express = require('express');
const {
  listArticles,
  getArticle,
  createArticleComment,
} = require('../controllers/articleController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.get('/', listArticles);

router.get('/:id', getArticle);

router.post('/:id/comments', authGuard, createArticleComment);

module.exports = router;
