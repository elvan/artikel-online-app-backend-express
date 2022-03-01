const express = require('express');

const {
  adminListArticles,
  adminCreateArticle,
  adminUpdateArticle,
  adminDeleteArticle,
} = require('../controllers/adminArticleController');
const adminGuard = require('../middleware/adminGuard');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.get('/', authGuard, adminGuard, adminListArticles);

router.post('/', authGuard, adminGuard, adminCreateArticle);

router.put('/:id', authGuard, adminGuard, adminUpdateArticle);

router.delete('/:id', authGuard, adminGuard, adminDeleteArticle);

module.exports = router;
