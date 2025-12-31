// cron/apiMonitor.cron.js
const cron = require("node-cron");
const { pollApis } = require("../workers/apiMonitor.worker");

/**
 * Starts API monitoring cron job
 */
const startApiMonitoring = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("⏱ Running API health checks...");
    try {
      await pollApis();
    } catch (err) {
      console.error("API Monitor failed:", err.message);
    }
  });
};

module.exports = { startApiMonitoring };
