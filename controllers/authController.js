const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if(user) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    newUser.save();
    res.status(201).json({ message: "User registered", user: newUser.email });
  } catch (err) {
    res.status(400).json({ message: "Registration failed", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

const getUser = async (req, res) => {
  res.json({ message: "User fetched successfully", user: req.user });
};

module.exports = { register, login, logout, getUser };
