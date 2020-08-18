const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const user = new User({ name: req.body.name, password: req.body.password });
  console.log("user info1", user, user.password);

  const hashedPass = await bcrypt.hash(req.body.password, 10);
  console.log("hashed pass", hashedPass);
  user.password = hashedPass;
  console.log("user info2", user, user.password);
  user.save();

  res.send("added user");
});

module.exports = router;
