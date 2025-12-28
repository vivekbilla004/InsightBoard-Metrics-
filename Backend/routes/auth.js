const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  if (!user.isActive) {
    return res.status(403).json({
      message: "Account deactivated. Contact admin.",
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const forcePasswordChange = user.mustChangePassword && user.role !== "admin";

  res.json({
    token,
    role: user.role,
    forcePasswordChange,
  });
});

// Change password route
router.post("/change-password", protect, async (req, res) => {
  const { newPassword } = req.body;

  const hashed = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(req.user.id, {
    password: hashed,
    mustChangePassword: false,
  });

  res.json({ message: "Password updated successfully" });
});

// Register route - only allows developer role registration
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   // prevent duplicate users
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     role: "developer", // 🔒 force developer role
//   });

//   res.status(201).json({
//     message: "Account created successfully",
//   });
// });

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
    role: "admin",
    mustChangePassword: false,
    status: "Active",
  });

  res.json({
    message: "Admin created",
    email: admin.email,
    password: "admin123",
  });
});

module.exports = router;
