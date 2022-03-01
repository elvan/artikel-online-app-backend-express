const express = require('express');

const {
  adminListArticles,
  adminCreateArticle,
} = require('../controllers/adminArticleController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.get('/', authGuard, adminListArticles);

router.post('/', authGuard, adminCreateArticle);

module.exports = router;
