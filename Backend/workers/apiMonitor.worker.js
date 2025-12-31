// workers/apiMonitor.worker.js
const axios = require("axios");
const MonitoredApi = require("../models/MonitoredApi");
const ApiMetric = require("../models/ApiMetric");
const { calculateHealthStatus } = require("../utils/healthCalculator");

/**
 * Poll all registered APIs and store metrics
 */
const pollApis = async () => {
      console.log("🟡 Worker started polling APIs");        
  const apis = await MonitoredApi.find();
   console.log("🟢 APIs found:", apis.length);
  for (const api of apis) {
    console.log("🔵 Polling:", api.url);
    const startTime = Date.now();

    try {
      const response = await axios({
        
        url: api.url,
        method: api.method || "GET",
        headers: api.headers || {},
        timeout: 5000,
      });
      console.log("✅ API responded:", response.status);

      const responseTime = Date.now() - startTime;

      await ApiMetric.create({
        
        apiId: api._id,
        responseTime,
        statusCode: response.status,
        success: true,
        
      })
      console.log("📊 Metric saved");;
    } catch (error) {
        console.log("❌ API failed:", error.message);
      const responseTime = Date.now() - startTime;

      await ApiMetric.create({
        apiId: api._id,
        responseTime,
        statusCode: error.response?.status || 0,
        success: false,
        errorMessage: error.message,
      });
      console.log("📊 Failure metric saved");
    }

    const recentMetrics = await ApiMetric.find({ apiId: api._id })
      .sort({ createdAt: -1 })
      .limit(20);

    const health = calculateHealthStatus(recentMetrics);

    api.status = health;
    await api.save();
  }
};

module.exports = { pollApis };
