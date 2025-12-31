import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiSummary } from "../services/api";
import { getApiMetrics } from "../services/api";
import LatencyChart from "../Components/LatencyChart";
import ErrorRateChart from "../Components/ErrorRateChart";

const ApiDetails = () => {
  const { apiId } = useParams();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);

  // Fetch API Summary
  useEffect(() => {
    const loadSummary = async () => {
      const data = await getApiSummary(apiId);
      console.log("API Summary:", data);
      setSummary(data);
      setLoading(false);
    };

    loadSummary();
  }, [apiId]);

  // Fetch API Metrics
  useEffect(() => {
    const loadMetrics = async () => {
      const data = await getApiMetrics(apiId);
      console.log("📊 metrics data:", data);
      setMetrics(data);
    };

    loadMetrics();
  }, [apiId]);

  if (loading) return <p className="p-6">Loading API details...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-shadow-white">
        API Performance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-white">
        <Stat label="Avg Latency" value={`${summary.avgLatency} ms`} />
        <Stat label="Uptime" value={`${summary.uptime}%`} />
        <Stat label="Error Rate" value={`${summary.errorRate}%`} />
      </div>

      {/* Charts will go here next */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <LatencyChart data={metrics} />
        <ErrorRateChart data={metrics} />
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="p-4 bg-gray-900 rounded">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default ApiDetails;
