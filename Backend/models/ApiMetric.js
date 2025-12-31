// models/ApiMetric.js
const mongoose = require("mongoose");

const ApiMetricSchema = new mongoose.Schema({
  apiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MonitoredApi",
    index: true
  },
  responseTime: Number, // ms
  statusCode: Number,
  success: Boolean,
  errorMessage: String
}, { timestamps: true });
module.exports = mongoose.model("ApiMetric", ApiMetricSchema);
