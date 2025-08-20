const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true },
  name: String,
  email: String,
  phone: String,
  profilePic: String,
  coverPhoto: String,
  bio: String,
  about: String,
  location: String, // Simplified, no geo for MVP
  interests: [String],
  preferences: {
    ageMin: Number,
    ageMax: Number,
    gender: String,
    distance: Number
  },
  swipesRight: [String],
  swipesLeft: [String],
  matches: [String],
  followers: [String],
  following: [String],
  blocked: [String]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
