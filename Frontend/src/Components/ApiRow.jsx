import { useEffect, useState } from "react";
import { getApiSummary } from "../services/api";
import HealthBadge from "./HealthBadge";
import { Link } from "react-router-dom";

const ApiRow = ({ api }) => {
  return (
    <tr className="border-t p-2">
      {/* <td className="p-2 font-medium">{api.name}</td> */}
      <td className="p-2">
        <Link to={`/api-monitor/${api._id}`} className="text-blue-400 p-2">
          {api.name}
        </Link>
      </td>

      <td className="p-2 text-sm text-gray-600 truncate max-w-xs">{api.url}</td>
      <td className="p-2">
        <HealthBadge status={api.status} />
      </td>
      <td className="p-2">
        {api.avgLatency !== null ? `${api.avgLatency} ms` : "—"}
      </td>
      <td className="p-2">{api.uptime !== null ? `${api.uptime}%` : "—"}</td>
    </tr>
  );
};

export default ApiRow;
