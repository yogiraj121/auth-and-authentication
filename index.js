const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Sample protected routes
const { verifyToken } = require("./middleware/authMiddleware");
const { checkRole } = require("./middleware/roleMiddleware");

app.get("/api/user/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome user!", user: req.user });
});

app.get("/api/admin/data", verifyToken, checkRole("admin"), (req, res) => {
  res.json({ message: "Hello Admin!", user: req.user });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
