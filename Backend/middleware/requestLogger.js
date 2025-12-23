const RequestLog = require("../models/RequestLog");

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - startTime;

    console.log({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: duration + "ms",
      ip: req.ip
    });

    // Save log to DB
    try {
      await RequestLog.create({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        responseTime: duration,
        ip: req.ip
      });
    } catch (error) {
      console.error("Error saving request log:", error.message);
    }
  });

  next();
};

module.exports = requestLogger;
