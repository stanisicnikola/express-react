const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const listOfComments = await Comments.findAll({ where: { PostId: postId } });
  res.json(listOfComments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  res.json("Comment successfully added!");
});

module.exports = router;
