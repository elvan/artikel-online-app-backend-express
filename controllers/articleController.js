const asyncHandler = require('express-async-handler');

const Article = require('../models/article');
const Comment = require('../models/comment');
const User = require('../models/user');

exports.listArticles = asyncHandler(async (req, res, next) => {
  const articles = await Article.find({ status: 'Published' });

  if (articles.length === 0) {
    res.status(404);
    throw new Error('No articles found');
  }

  res.status(200).json({
    message: 'Fetched articles successfully',
    articleCount: articles.length,
    articles: articles,
  });
});

exports.getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(404);
    throw new Error('Article not found');
  }

  res.status(200).json({
    message: 'Fetched article successfully',
    article: article,
  });
});

exports.createArticleComment = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(404);
    throw new Error('Article not found');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { message } = req.body;

  const comment = await Comment.create({
    article: article._id,
    author: req.user.id,
    authorName: user.name,
    message: message,
  });

  res.status(201).json({
    message: 'Comment created successfully',
    comment: comment,
  });
});
