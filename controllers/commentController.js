const mongoose = require('mongoose');

const asyncHandler = require('express-async-handler');

const Article = require('../models/article');
const Comment = require('../models/comment');
const User = require('../models/user');

exports.listComments = asyncHandler(async (req, res, next) => {
  const articleId = req.params.articleId;

  const comments = await Comment.find({
    article: articleId,
  });

  if (comments.length === 0) {
    res.status(404);
    throw new Error('No comments found');
  }

  res.status(200).json({
    message: 'Fetched comments successfully',
    commentCount: comments.length,
    comments: comments,
  });
});

exports.createComment = asyncHandler(async (req, res, next) => {
  const articleId = req.params.articleId;
  const userId = req.user.id;

  const article = await Article.findById(articleId);

  if (!article) {
    res.status(404);
    throw new Error('Article not found');
  }

  if (article.status === 'Archived') {
    res.status(403);
    throw new Error('Can not create comment, article is archived');
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { message } = req.body;

  const comment = await Comment.create({
    article: articleId,
    author: userId,
    authorName: user.name,
    message: message,
  });

  res.status(201).json({
    message: 'Comment created successfully',
    comment: comment,
  });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const articleId = req.params.articleId;
  const commentId = req.params.commentId;
  const userId = req.user.id;

  const article = await Article.findById(articleId);

  if (!article) {
    res.status(404);
    throw new Error('Article not found');
  }

  if (article.status === 'Archived') {
    res.status(403);
    throw new Error('Can not delete comment, article is archived');
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  if (comment.author.toString() !== userId) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await comment.remove();

  res.status(200).json({
    message: 'Comment deleted successfully',
  });
});
