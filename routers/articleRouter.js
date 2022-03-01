const express = require('express');
const {
  listArticles,
  createArticle,
} = require('../controllers/articleController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.get('/', listArticles);

router.post('/', authGuard, createArticle);

module.exports = router;
