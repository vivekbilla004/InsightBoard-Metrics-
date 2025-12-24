import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const TrafficChart = ({ data }) => {
  return (
    <div className="bg-white p-6 m-2 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Requests (Last 10 min)</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="requests"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficChart;
