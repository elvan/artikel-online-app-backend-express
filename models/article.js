const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add an author'],
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title must be less than 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please add a content'],
      trim: true,
      minlength: [10, 'Content must be at least 10 characters'],
      maxlength: [5000, 'Content must be less than 5000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'Business',
        'Politics',
        'Sports',
        'Style',
        'Travel',
        'Culture',
        'Health',
        'Technology',
        'Science',
      ],
    },
    status: {
      type: String,
      required: [true, 'Please add a status'],
      enum: ['Published', 'Archived'],
      default: 'Published',
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
