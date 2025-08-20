const express = require('express');
const User = require('../models/User');

module.exports = (verifyToken) => {
  const router = express.Router();

  router.get('/suggested', verifyToken, async (req, res) => {
    try {
      const user = await User.findOne({ firebaseId: req.user.uid });
      const query = {
        firebaseId: { $ne: req.user.uid },
        firebaseId: { $nin: user.swipesLeft },
        firebaseId: { $nin: user.swipesRight }
      };
      // Add preferences filter (simplified)
      const suggested = await User.find(query).limit(10);
      res.json(suggested);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  router.post('/swipe', verifyToken, async (req, res) => {
    const { targetId, direction } = req.body;
    try {
      const user = await User.findOne({ firebaseId: req.user.uid });
      if (direction === 'right') {
        user.swipesRight.push(targetId);
        const target = await User.findOne({ firebaseId: targetId });
        if (target.swipesRight.includes(req.user.uid)) {
          user.matches.push(targetId);
          target.matches.push(req.user.uid);
          await target.save();
          // Socket notification
        }
      } else {
        user.swipesLeft.push(targetId);
      }
      await user.save();
      res.json({ msg: 'Swipe recorded' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  return router;
};
