const express = require("express");
const router = express.Router();
const RequestLog = require("../models/RequestLog");

// GET logs with pagination & filters
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      method
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (method) query.method = method;

    const logs = await RequestLog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await RequestLog.countDocuments(query);

    const formattedLogs = logs.map(log => ({
      id: log._id,
      method: log.method,
      url: log.url,
      status: log.status,
      responseTime: log.responseTime,
      ip: log.ip,
      localTime: new Date(log.createdAt).toLocaleString("en-IN")
    }));

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      logs: formattedLogs
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
});

module.exports = router;
