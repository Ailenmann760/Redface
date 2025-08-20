const express = require('express');
const Message = require('../models/Message');

module.exports = (verifyToken) => {
  const router = express.Router();

  router.get('/:otherId', verifyToken, async (req, res) => {
    try {
      const messages = await Message.find({
        $or: [
          { senderId: req.user.uid, receiverId: req.params.otherId },
          { senderId: req.params.otherId, receiverId: req.user.uid }
        ]
      }).sort({ createdAt: 1 });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  router.post('/', verifyToken, async (req, res) => {
    try {
      const message = new Message({ senderId: req.user.uid, ...req.body });
      await message.save();
      res.json(message);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  return router;
};
