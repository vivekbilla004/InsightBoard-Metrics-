import { useEffect, useState } from "react";
import { getApiSummary } from "../services/api";
import HealthBadge from "./HealthBadge";
import { Link } from "react-router-dom";

const ApiRow = ({ api }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await getApiSummary(api._id);
        setSummary(data);
      } catch (err) {
        console.error("Failed to load summary", err);
      }
    };

    loadSummary();
  }, [api._id]);

  return (
    <tr className="border-t">
      {/* <td className="p-2 font-medium">{api.name}</td> */}
      <td>
      <Link to={`/api-monitor/${api._id}`} className="text-blue-400 p-2">
        {api.name}
      </Link></td>
      <td className="p-2 text-sm text-gray-600 truncate max-w-xs">{api.url}</td>
      <td className="p-2">
        <HealthBadge status={api.status} />
      </td>
      <td className="p-2">{summary ? `${summary.avgLatency} ms` : "—"}</td>
      <td className="p-2">{summary ? `${summary.uptime}%` : "—"}</td>
    </tr>
  );
};

export default ApiRow;
