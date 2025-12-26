const express = require("express");
const router = express.Router();
const RequestLog = require("../models/RequestLog");
const { protect, restrictTo } = require("../middleware/auth");

router.get(
  "/overview",
  protect,
  restrictTo("admin", "developer"),
  async (req, res) => {
    try {
      const totalRequests = await RequestLog.countDocuments();
      const errorRequests = await RequestLog.countDocuments({
        status: { $gte: 400 },
      });

      const avgResponse = await RequestLog.aggregate([
        { $group: { _id: null, avg: { $avg: "$responseTime" } } },
      ]);

      res.json({
        totalRequests,
        errorRequests,
        avgResponseTime: Math.round(avgResponse[0]?.avg || 0),
      });
    } catch (error) {
      res.status(500).json({ message: "Metrics error" });
    }
  }
);

module.exports = router;
