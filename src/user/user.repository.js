const mongoose = require("mongoose");
const { useVirtualId } = require("../db/database.js");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  objective: { type: Number, required: true },
});

useVirtualId(userSchema);
const User = mongoose.model("User", userSchema);

async function findByUsername(username) {
  return User.findOne({ username });
}

async function findById(userId) {
  return User.findById(userId);
}

async function createUser(user) {
  const newUser = new User(user);
  await newUser.save();
  return newUser.id;
}

async function createUserInfo(userInfo) {
  const { username, name, age, gender, height, objective } = userInfo;

  const user = await User.findOne({ username });

  user.name = name;
  user.age = age;
  user.gender = gender;
  user.height = height;
  user.objective = objective;

  await user.save();
}

module.exports = {
  findByUsername,
  findById,
  createUser,
  createUserInfo,
};
