const MetricsCards = ({ data }) => {
  // console.log("MetricsCards rendered with data:", data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <p className="text-sm text-gray-500">Total Requests</p>
        <p className="text-3xl font-semibold text-gray-900 mt-2">
          {data.totalRequests}
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <p className="text-sm text-gray-500">Error Requests</p>
        <p className="text-3xl font-semibold text-red-600 mt-2">
          {data.errorRequests}
        </p>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <p className="text-sm text-gray-500">Average Response Time</p>
        <p className="text-3xl font-semibold text-gray-900 mt-2">
          {data.avgResponseTime} ms
        </p>
      </div>
    </div>
  );
};

export default MetricsCards;
