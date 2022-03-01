const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: [true, 'Article is required'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    authorName: {
      type: String,
      required: [true, 'Author name is required'],
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
      trim: true,
      minlength: [3, 'Message must be at least 3 characters'],
      maxlength: [1000, 'Message must be less than 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
