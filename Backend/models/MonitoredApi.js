const mongoose = require("mongoose");

const MonitoredApiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  method: {
    type: String,
    enum: ["GET", "POST", "PUT", "DELETE"],
    default: "GET"
  },
  headers: {
    type: Object,
    default: {}
  },
  interval: {
    type: Number, // in seconds
    default: 60
  },
  status: {
    type: String,
    enum: ["INITIALIZING", "HEALTHY", "DEGRADED", "DOWN"],
    default: "INITIALIZING"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("MonitoredApi", MonitoredApiSchema);
