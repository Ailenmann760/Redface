const express = require('express');
const Post = require('../models/Post');

module.exports = (verifyToken) => {
  const router = express.Router();

  router.post('/', verifyToken, async (req, res) => {
    try {
      const post = new Post({ userId: req.user.uid, ...req.body });
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  router.get('/feed', verifyToken, async (req, res) => {
    try {
      const user = await User.findOne({ firebaseId: req.user.uid });
      const posts = await Post.find({ userId: { $in: user.following } }).sort({ createdAt: -1 });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  router.get('/explore', verifyToken, async (req, res) => {
    try {
      const posts = await Post.find().sort({ likes: -1 }).limit(20);
      res.json(posts);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  router.post('/:id/like', verifyToken, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.likes.includes(req.user.uid)) {
        post.likes = post.likes.filter(id => id !== req.user.uid);
      } else {
        post.likes.push(req.user.uid);
      }
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  // Comment, repost similar, omitted for brevity

  return router;
};
