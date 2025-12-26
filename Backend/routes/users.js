const express = require("express");
const User = require("../models/User");
const { protect, restrictTo } = require("../middleware/auth");
const bcrypt = require("bcryptjs"); 
const router = express.Router();

// Get all users (admin only)
router.get(
  "/",
  protect,
  restrictTo("admin"),
  async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
  }
);


// Admin creates user
router.post(
  "/",
  protect,
  restrictTo("admin"),
  async (req, res) => {
    const { name, email, role, title } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const password = "dev123"; // default password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role,
      title,
      password: hashedPassword
    });

    res.json({
      message: "User created successfully",
      email: user.email,
      role: user.role,
      title: user.title,
      tempPassword: password
    });
  }
);

// Update user (admin only)
router.put(
  "/:id",
  protect,
  restrictTo("admin"),
  async (req, res) => {
    const { role, status, title } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, status, title },
      { new: true }
    ).select("-password");

    res.json(user);
  }
);

// Delete user (admin only)
router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  }
);




//  Deactivate user (admin only)
router.patch(
  "/:id/deactivate",
  protect,
  restrictTo("admin"),
  async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res
        .status(400)
        .json({ message: "Admin cannot be deactivated" });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: "User deactivated successfully" });
  }
);


// GET users with pagination
router.get(
  "/",
  protect,
  restrictTo("admin"),
  async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().select("-password").skip(skip).limit(limit),
      User.countDocuments()
    ]);

    res.json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  }
);

module.exports = router;
