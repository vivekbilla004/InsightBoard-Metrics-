const RequestLog = require("../models/RequestLog");
const calculateMetrics = require("../utils/metricsCalculator");
const { checkErrorSpike } = require("../utils/alertEngine");

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", async () => {
    // ignore internal monitoring routes
    if (
      req.originalUrl.startsWith("/api/metrics") ||
      req.originalUrl.startsWith("/api/logs") ||
      req.originalUrl.startsWith("/api/charts")
    ) {
      return;
    }

    const duration = Date.now() - startTime;

    try {
      const log = await RequestLog.create({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        responseTime: duration,
        ip: req.ip,
      });

      const io = req.app.get("io");

      //new log event
      io.emit("new-log", {
        method: log.method,
        url: log.url,
        status: log.status,
        responseTime: log.responseTime,
        localTime: new Date(log.createdAt).toLocaleString("en-IN"),
      });

      //metrics update
      const metrics = await calculateMetrics();
      io.emit("metrics-update", metrics);

      //alert check
      const isSpike = await checkErrorSpike();
      if (isSpike) {
        console.log("🚨 ALERT TRIGGERED: Error spike");

        io.emit("alert", {
          type: "ERROR_SPIKE",
          message: "High error rate detected in last 1 minute",
          severity: "critical",
          time: new Date().toLocaleString("en-IN"),
        });
      }
    } catch (error) {
      console.error("Log save error:", error.message);
    }
  });

  next();
};

module.exports = requestLogger;
