const express = require('express');
const {
  listArticles,
  getArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.get('/', listArticles);

router.get('/:id', getArticle);

module.exports = router;
