const express = require('express');

const {
  adminListArticles,
  adminCreateArticle,
  adminUpdateArticle,
  adminDeleteArticle,
} = require('../controllers/adminArticleController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.get('/', authGuard, adminListArticles);

router.post('/', authGuard, adminCreateArticle);

router.put('/:id', authGuard, adminUpdateArticle);

router.delete('/:id', authGuard, adminDeleteArticle);

module.exports = router;
