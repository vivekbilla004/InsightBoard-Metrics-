const MetricsCards = ({ data }) => {
  // console.log("MetricsCards rendered with data:", data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="text-gray-500 text-sm">Total Requests</h4>
        <p className="text-3xl font-bold mt-2">
          {data.totalRequests ?? 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="text-gray-500 text-sm">Error Requests</h4>
        <p className="text-3xl font-bold text-red-500 mt-2">
          {data.errorRequests ?? 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="text-gray-500 text-sm">Avg Response (ms)</h4>
        <p className="text-3xl font-bold text-blue-600 mt-2">
          {data.avgResponseTime ?? 0}
        </p>
      </div>

    </div>
  );
};

export default MetricsCards;
