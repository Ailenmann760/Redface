const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  text: String,
  seen: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
