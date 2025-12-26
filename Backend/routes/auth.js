const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    role: user.role
  });
});

// Seed an admin user (for testing purposes)
router.post("/seed-admin", async (req, res) => {
  const bcrypt = require("bcryptjs");

  const existing = await User.findOne({ email: "admin@insightboard.com" });
  if (existing) {
    return res.json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await User.create({
    name: "Admin",
    email: "admin@insightboard.com",
    password: hashedPassword,
    role: "admin"
  });

  res.json({
    message: "Admin created",
    email: admin.email,
    password: "admin123"
  });
});



module.exports = router;
