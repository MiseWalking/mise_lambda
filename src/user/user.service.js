const userRepository = require("./user.repository.js");

async function signup(req, res) {
  const { username, password } = req.body;

  const isUsernameTaken = await userRepository.findByUsername(username);
  if (isUsernameTaken) {
    return res
      .status(409)
      .json({ success: false, message: "The username is already taken" });
  }

  await userRepository.createUser({
    username,
    password,
  });

  res.status(201).json({ success: true, message: "Signup successful" });
}

async function login(req, res) {
  const { username, password } = req.body;

  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }

  const isValidPassword = password === user.password;
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }

  res.status(200).json({ success: true, message: "Login successful" });
}

async function createUserInfo(req, res) {
  try {
    const { username, name, age, gender, height, objective } = req.body;

    const user = await userRepository.findByUsername(username);

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!username || !name || !age || !gender || !height || !objective) {
      return res.status(400).json({ success: false, message: "Bad Request" });
    }

    await userRepository.createUserInfo({
      username,
      name,
      age,
      gender,
      height,
      objective,
    });

    res
      .status(201)
      .json({ success: true, message: "User information created" });
  } catch (error) {
    console.error("Error creating user information:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getUserInfo(req, res) {
  try {
    const { username } = req.params;

    const user = await userRepository.findByUsername(username);

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function updateUserInfo(req, res) {
  try {
    const { username } = req.params;
    const { name, age, gender, height, objective } = req.body;

    const user = await userRepository.findByUsername(username);

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    user.name = name || user.name;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.height = height || user.height;
    user.objective = objective || user.objective;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User information updated" });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = {
  signup,
  login,
  createUserInfo,
  getUserInfo,
  updateUserInfo,
};
