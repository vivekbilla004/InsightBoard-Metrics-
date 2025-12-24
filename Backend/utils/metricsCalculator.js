const RequestLog = require("../models/RequestLog");

const calculateMetrics = async () => {
  const totalRequests = await RequestLog.countDocuments();

  const errorRequests = await RequestLog.countDocuments({
    status: { $gte: 400 },
  });

  const avgResponseAgg = await RequestLog.aggregate([
    {
      $group: {
        _id: null,
        avgResponseTime: { $avg: "$responseTime" },
      },
    },
  ]);

  return {
    totalRequests,
    errorRequests,
    avgResponseTime: Math.round(
      avgResponseAgg[0]?.avgResponseTime || 0
    ),
  };
};

module.exports = calculateMetrics;
