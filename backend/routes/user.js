const express = require('express');
const User = require('../models/User');

module.exports = (verifyToken) => {
  const router = express.Router();

  router.get('/profile', verifyToken, async (req, res) => {
    try {
      const user = await User.findOne({ firebaseId: req.user.uid });
      res.json(user);
  } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  router.post('/profile', verifyToken, async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { firebaseId: req.user.uid },
        req.body,
        { new: true, upsert: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  router.post('/follow', verifyToken, async (req, res) => {
    const { targetId } = req.body;
    try {
      const user = await User.findOne({ firebaseId: req.user.uid });
      user.following.push(targetId);
      await user.save();
      const target = await User.findOne({ firebaseId: targetId });
      target.followers.push(req.user.uid);
      await target.save();
      res.json({ msg: 'Followed' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  // Unfollow similar, omitted for brevity

  router.get('/search', verifyToken, async (req, res) => {
    const { q } = req.query;
    try {
      const users = await User.find({ name: { $regex: q, $options: 'i' } });
      res.json(users);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  return router;
};
