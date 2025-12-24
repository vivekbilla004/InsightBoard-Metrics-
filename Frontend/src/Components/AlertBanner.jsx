const AlertBanner = ({ alerts }) => {
  // console.log("Alerts in Banner:", alerts);
  if (!alerts.length) return null;

  return (
    <div className="mb-6 space-y-2">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`p-4 rounded text-white ${
            alert.severity === "critical"
              ? "bg-red-600"
              : "bg-yellow-500"
          }`}
        >
          <strong>{alert.type}</strong> — {alert.message}
          <div className="text-xs opacity-80">
            {alert.time}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;
