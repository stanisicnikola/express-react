const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");

router.post("/", validateToken, async (req, res) => {
  const UserId = req.user.id;
  const { PostId } = req.body;
  const found = await Likes.findOne({
    where: { UserId: UserId, PostId: PostId },
  });
  if (found) {
    await Likes.destroy({ where: { UserId: UserId, PostId: PostId } });
    res.json({ liked: false });
  } else {
    await Likes.create({ UserId: UserId, PostId: PostId });
    res.json({ liked: true });
  }
});

module.exports = router;
