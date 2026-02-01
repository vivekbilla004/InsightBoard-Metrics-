
import { useEffect, useState } from "react";
import { getMonitoredApis, getApiSummary } from "../services/api";
import ApiRow from "../Components/ApiRow";
import AddApiForm from "../Components/AddApiForm";

const ApiMonitor = () => {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApis = async () => {
    try {
      setLoading(true);
      const data = await getMonitoredApis();
      setApis(data);
    } catch (err) {
      setError("Failed to load monitored APIs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApis();
  }, []);

  return (
    <div className="bg-blue-950 h-screen pb-10">
      {/* Header */}
      <div className="mb-6 h-20 bg-[#1f2228]">
        <h1 className="text-2xl text-center p-5 font-bold text-white">
          API Monitor
        </h1>
      </div>

      {/* ✅ Add API Form — CORRECT PLACE */}
      <AddApiForm onAdd={loadApis} />

      {/* Loading state */}
      {/* Loading state */}
      {loading ? (
        <p className="text-center text-white">Loading APIs...</p>
      ) : (
        <div className="max-h-96 overflow-y-auto mx-auto w-[90%] rounded-2xl border border-gray-700 bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-red-50 sticky top-0 z-10">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">URL</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Latency</th>
                <th className="p-2 text-left">Availability</th>
              </tr>
            </thead>

            <tbody>
              {apis.map((api) => (
                <ApiRow key={api._id} api={api} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApiMonitor;
