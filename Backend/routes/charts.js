const express = require("express");
const router = express.Router();
const RequestLog = require("../models/RequestLog");

// Requests per minute (last 10 minutes)
router.get("/traffic", async (req, res) => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  const data = await RequestLog.aggregate([
    {
      $match: {
        createdAt: { $gte: tenMinutesAgo }
      }
    },
    {
      $group: {
        _id: {
          minute: {
            $dateToString: {
              format: "%H:%M",
              date: "$createdAt",
              timezone: "Asia/Kolkata"
            }
          }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.minute": 1 } }
  ]);

  res.json(
    data.map(d => ({
      time: d._id.minute,
      requests: d.count
    }))
  );
});

// Errors per minute
router.get("/errors", async (req, res) => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  const data = await RequestLog.aggregate([
    {
      $match: {
        createdAt: { $gte: tenMinutesAgo },
        status: { $gte: 500 }
      }
    },
    {
      $group: {
        _id: {
          minute: {
            $dateToString: {
              format: "%H:%M",
              date: "$createdAt",
              timezone: "Asia/Kolkata"
            }
          }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.minute": 1 } }
  ]);

  res.json(
    data.map(d => ({
      time: d._id.minute,
      errors: d.count
    }))
  );
});

module.exports = router;
