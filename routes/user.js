const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { register, login, logout, getUser } = require("../controllers/authController");
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user",authMiddleware, getUser);

module.exports = router;


