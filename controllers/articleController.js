const asyncHandler = require('express-async-handler');

const Article = require('../models/article');

exports.listArticles = asyncHandler(async (req, res, next) => {
  const articles = await Article.find({ status: 'Published' });

  if (articles.length === 0) {
    res.status(404);
    throw new Error('No articles found');
  }

  res.status(200).json({
    message: 'Fetched articles successfully',
    articles: articles,
  });
});

exports.createArticle = asyncHandler(async (req, res, next) => {
  res.status(201).json({
    message: 'Article created successfully',
  });
});
