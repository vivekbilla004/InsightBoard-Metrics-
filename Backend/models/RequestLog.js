const mongoose = require("mongoose");

const RequestLogSchema = new mongoose.Schema(
  {
    method: String,
    url: String,
    status: Number,
    responseTime: Number,
    ip: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("RequestLog", RequestLogSchema);
