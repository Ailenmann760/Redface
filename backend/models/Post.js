const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: String,
  image: String,
  video: String,
  link: String,
  likes: [String],
  comments: [{
    userId: String,
    text: String,
    date: Date
  }],
  reposts: [String]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
