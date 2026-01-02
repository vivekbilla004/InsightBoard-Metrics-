import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getApiSummary } from "../services/api";
import { getApiMetrics } from "../services/api";
import LatencyChart from "../Components/LatencyChart";
import ErrorRateChart from "../Components/ErrorRateChart";
import { useNavigate } from "react-router-dom";

const ApiDetails = () => {
  const { apiId } = useParams();
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const previousStatusRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const [summaryData, metricsData] = await Promise.all([
        getApiSummary(apiId),
        getApiMetrics(apiId),
      ]);
      console.log("Loaded summary data:", summaryData);
      console.log("Loaded metrics data:", metricsData);
      previousStatusRef.current = summary?.status || null;

      setSummary(summaryData);
      setMetrics(metricsData);
    };

    loadData(); // initial load
    // const interval = setInterval(loadData, 10000); // refresh

    // return () => clearInterval(interval);
  }, [apiId]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  // Show message if no metrics yet
  {
    Array.isArray(metrics) && metrics.length === 0 && !loading && (
      <p className="text-gray-400 mt-4">Waiting for first health check…</p>
    );
  }

  return (
    <div className="p-6 bg-yellow-50 h-screen pb-10">
      <div className="flex w-full bg-blue-950 mb-4 rounded-lg gap-3 justify-center p-4 ">
        <h2 className="text-xl font-bold text-white ">API PERFORMANCE</h2>
        <button className="w-20 bg-white rounded-lg font-bold" onClick={() => navigate(-1)}>Back</button>
        <button className="w-20 bg-white rounded-lg font-bold" onClick={() => navigate('/')}>Home</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-white">
        <Stat label="Avg Latency" value={`${summary.avgLatency} ms`} />
        <Stat label="Availability" value={`${summary.uptime}%`} />
        <Stat label="Error Rate" value={`${summary.errorRate}%`} />

        <Stat
          label="Last Checked"
          value={
            summary.lastCheckedAt &&
            new Date(summary.lastCheckedAt).toLocaleString()
          }
        />
      </div>

      {/* Charts will go here next */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <LatencyChart data={metrics} />
        <ErrorRateChart data={metrics} />
      </div>

      {previousStatusRef.current &&
        summary &&
        previousStatusRef.current !== summary.status && (
          <div className="bg-yellow-900 text-yellow-200 p-3 rounded mb-4">
            Status changed from <strong>{previousStatusRef.current}</strong> to{" "}
            <strong>{summary.status}</strong>
          </div>
        )}
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
