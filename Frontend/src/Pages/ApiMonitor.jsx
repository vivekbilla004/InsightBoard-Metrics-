// import { useEffect, useState } from "react";
// import { getMonitoredApis } from "../services/api";
// import ApiTable from "../components/ApiTable";

// const ApiMonitor = () => {
//   const [apis, setApis] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadApis = async () => {
//       try {
//         const data = await getMonitoredApis();
//         console.log("Monitored APIs:", data);
//         setApis(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadApis();
//   }, []);

//   if (loading) return <p className="p-6">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         API Monitoring Dashboard
//       </h1>
//       <ApiTable apis={apis} />
//     </div>
//   );
// };

// export default ApiMonitor;

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
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">API Monitor</h1>
      </div>

      {/* ✅ Add API Form — CORRECT PLACE */}
      <AddApiForm onAdd={loadApis} />

      {/* Error state */}
      {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}

      {/* Loading state */}
      {loading ? (
        <p>Loading APIs...</p>
      ) : (
        <table className="w-full border border-gray-700 overflow-y-auto">
          <thead className="bg-red-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">URL</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Latency</th>
              <th className="p-2 text-left">Uptime</th>
            </tr>
          </thead>
          <tbody>
            {apis.map((api) => (
              <ApiRow key={api._id} api={api} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApiMonitor;
