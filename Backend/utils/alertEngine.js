const RequestLog = require("../models/RequestLog");

// const threshold = Number(process.env.ERROR_ALERT_THRESHOLD || 5);
// const windowSec = Number(process.env.ALERT_TIME_WINDOW || 60);

const checkErrorSpike = async () => {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

  const errorCount = await RequestLog.countDocuments({
    status: { $gte: 500 },
    createdAt: { $gte: oneMinuteAgo }
  });

  return errorCount >= 5;
};

module.exports = { checkErrorSpike };
