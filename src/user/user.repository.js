const mongoose = require("mongoose");
const { useVirtualId } = require("../db/database.js");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);
const User = mongoose.model("User", userSchema);

async function findByUsername(username) {
  return User.findOne({ username });
}

async function createUser(user) {
  const newUser = new User(user);
  await newUser.save();
  return newUser.id;
}

module.exports = {
  findByUsername,
  createUser,
};
