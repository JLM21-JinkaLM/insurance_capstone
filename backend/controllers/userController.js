const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    passwordHash: hash,
    role
  });

  res.json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "Invalid" });

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) return res.status(400).json({ message: "Invalid" });

  res.json({ token: generateToken(user) });
};
