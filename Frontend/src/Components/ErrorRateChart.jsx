import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const ErrorRateChart = ({ data }) => {
  const formatted = data.map((m, i) => ({
    index: i,
    success: m.success ? 1 : 0,
    failure: m.success ? 0 : 1
  }));

  return (
    <div className="bg-gray-900 p-4 rounded">
      <h3 className="text-sm mb-2 text-gray-300">Failures over time</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={formatted}>
          <XAxis dataKey="index" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="success" stackId="a" fill="#22c55e" />
          <Bar dataKey="failure" stackId="a" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ErrorRateChart;
