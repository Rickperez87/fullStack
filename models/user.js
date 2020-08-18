require("dotenv").config();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function (User) {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    "process.env.JWT_SECRET"
  );
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
