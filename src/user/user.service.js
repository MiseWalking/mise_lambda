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

  res.status(201).json({ message: "Signup successful" });
}

async function login(req, res) {
  const { username, password } = req.body;

  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }

  res.status(200).json({ success: true, message: "Login successful" });
}

module.exports = {
  signup,
  login,
};
