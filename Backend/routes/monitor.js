// routes/monitor.routes.js
const express = require("express");
const MonitoredApi = require("../models/MonitoredApi");

const router = express.Router();

router.post("/monitor", async (req, res) => {
  const { name, url, method, headers, interval } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  const api = await MonitoredApi.create({
    name,
    url,
    method,
    headers,
    interval,
    createdBy: req.user.id
  });

  res.status(201).json(api);
});

module.exports = router;
