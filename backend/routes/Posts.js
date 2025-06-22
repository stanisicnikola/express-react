const express = require("express");
const router = express.Router();
const { Posts, Likes, Sequelize } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({
    attributes: {
      include: [
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM Likes WHERE Likes.PostId = Posts.id)"
          ),
          "likeCount",
        ],
      ],
    },
  });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byUserId/:userId", async (req, res) => {
  const userId = req.params.userId;
  const posts = await Posts.findAll({
    where: { UserId: userId },
    include: [Likes],
  });
  res.json(posts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  const username = req.user.username;
  const UserId = req.user.id;
  post.username = username;
  post.UserId = UserId;
  await Posts.create(post);
  res.json("Post successfully created!");
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Posts.destroy({ where: { id: id } });
  res.json("Post deleted!");
});

module.exports = router;
