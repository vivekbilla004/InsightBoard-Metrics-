const LogsTable = ({ logs }) => {
  // console.log("LogsTable rendered with logs:", logs);
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="grid grid-cols-5 gap-2 bg-gray-100 px-4 py-3 font-semibold text-sm">
        <div>Method</div>
        <div>URL</div>
        <div>Status</div>
        <div>Response</div>
        <div>Time</div>
      </div>

      <div className="max-h-125 overflow-y-auto">
        {logs.map((log, index) => (
          <div
            key={`${log.localTime}-${index}`}
            className="grid grid-cols-5 gap-2 px-4 py-2 border-t text-sm"
          >
            <div className="font-semibold">{log.method}</div>

            <div className="text-gray-600 truncate">{log.url}</div>

            <div
              className={`font-bold ${
                log.status >= 400
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {log.status}
            </div>

            <div>{log.responseTime} ms</div>

            <div className="text-gray-500">{log.localTime}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsTable;
