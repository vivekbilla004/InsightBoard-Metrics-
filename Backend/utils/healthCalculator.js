const calculateHealthStatus = (metrics) => {
  if (!metrics.length) return "HEALTHY";

  const total = metrics.length;
  const failures = metrics.filter(m => !m.success).length;
  const errorRate = (failures / total) * 100;

  const avgLatency =
    metrics.reduce((sum, m) => sum + (m.responseTime || 0), 0) / total;

  if (errorRate > 20) return "DOWN";
  if (errorRate > 5 || avgLatency > 2000) return "DEGRADED";

  return "HEALTHY";
};

module.exports = { calculateHealthStatus };
