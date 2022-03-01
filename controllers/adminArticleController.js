const asyncHandler = require('express-async-handler');

const Article = require('../models/article');
const User = require('../models/user');

exports.adminListArticles = asyncHandler(async (req, res, next) => {
  const articles = await Article.find({});

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

exports.adminCreateArticle = asyncHandler(async (req, res, next) => {
  const { title, content, category } = req.body;

  // Basic validation
  if (!title || !content || !category) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('You are not authorized to perform this action');
  }

  const article = await Article.create({
    author: user._id,
    title: title,
    content: content,
    category: category,
    status: 'Published',
  });

  res.status(201).json({
    message: 'Article created successfully',
    article: article,
  });
});
