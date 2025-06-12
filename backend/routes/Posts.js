const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  const username = req.user.username;
  post.username = username;
  await Posts.create(post);
  res.json("Post successfully created!");
});

module.exports = router;
