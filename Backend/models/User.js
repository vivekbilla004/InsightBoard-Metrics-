const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["admin", "developer"],
      default: "developer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String, // e.g. Backend Developer, SRE
      default: "Developer",
    },
    status: {
      type: String,
      enum: ["Active", "Suspended"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
