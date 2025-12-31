import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const LatencyChart = ({ data }) => {
  return (
    <div className="bg-gray-900 p-4 rounded">
      <h3 className="text-sm mb-2 text-gray-300">Latency over time</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="createdAt" hide />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="responseTime"
            stroke="#38bdf8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LatencyChart;
