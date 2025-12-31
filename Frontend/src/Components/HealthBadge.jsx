const statusStyles = {
  INITIALIZING: "bg-gray-200 text-gray-600",
  HEALTHY: "bg-green-100 text-green-700",
  DEGRADED: "bg-yellow-100 text-yellow-700",
  DOWN: "bg-red-100 text-red-700",
};

const HealthBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default HealthBadge;
