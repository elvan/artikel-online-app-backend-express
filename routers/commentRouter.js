const express = require('express');
const {
  listComments,
  createComment,
  deleteComment,
} = require('../controllers/commentController');
const authGuard = require('../middleware/authGuard');

const router = express.Router({ mergeParams: true });

router.get('/', listComments);

router.post('/', authGuard, createComment);

router.delete('/:commentId', authGuard, deleteComment);

module.exports = router;
