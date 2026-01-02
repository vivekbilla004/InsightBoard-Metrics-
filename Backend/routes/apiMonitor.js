const express = require("express");
const ApiMetric = require("../models/ApiMetric");
const MonitoredApi = require("../models/MonitoredApi");
const router = express.Router();

// Get all monitored APIs
router.get("/", async (req, res) => {
  try {
    const apis = await MonitoredApi.find().sort({ createdAt: -1 });
    res.json(apis);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch monitored APIs" });
  }
});

// GET /api/monitor/:apiId/metrics
router.get("/:apiId/metrics", async (req, res) => {
  const metrics = await ApiMetric.find({ apiId: req.params.apiId })
    .sort({ createdAt: 1 })
    .limit(50);

  res.json(metrics);
});

// POST /api/monitor
router.post("/", async (req, res) => {
  const { url, name } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  const api = await MonitoredApi.create({
    name: name || "New API",
    url,
    method: req.body.method || "GET",
    status: "INITIALIZING",
  });

  res.status(201).json(api);
});

// Get API summary
router.get("/:apiId/summary", async (req, res) => {
  const { apiId } = req.params;

  const metrics = await ApiMetric.find({ apiId });
  const lastMetric = metrics[metrics.length - 1];

  if (!metrics.length) {
    return res.json({
      avgLatency: 0,
      errorRate: 0,
      uptime: 100,
      totalRequests: 0,
    });
  }

  const total = metrics.length;
  const successCount = metrics.filter((m) => m.success).length;
  const failureCount = total - successCount;

  const avgLatency =
    metrics.reduce((sum, m) => sum + (m.responseTime || 0), 0) / total;

  const errorRate = (failureCount / total) * 100;
  const uptime = (successCount / total) * 100;

  res.json({
    avgLatency: Math.round(avgLatency),
    errorRate: Number(errorRate.toFixed(2)),
    uptime: Number(uptime.toFixed(2)),
    totalRequests: total,
    lastCheckedAt: lastMetric?.createdAt || null
  });
});

module.exports = router;
