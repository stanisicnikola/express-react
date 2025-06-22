const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/authMiddleware");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({ username: username, password: hash });
  });
  res.json("User successfully created!");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "User doesn't exist" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong username/password combination!" });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          "importantsecret"
        );
        res.json({
          accessToken: accessToken,
          username: user.username,
          id: user.id,
        });
      }
    });
  }
});

router.get("/validation", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(user);
});

router.put("/user/update/:id", async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  const user = await Users.findByPk(id);
  bcrypt.hash(password, 10).then((hash) => {
    user.update({
      password: hash,
    });
  });
  res.json("Password successfully updated!");
});

module.exports = router;
