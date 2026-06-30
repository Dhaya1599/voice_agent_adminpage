import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import "./style.css";

function RevenueChart({ revenue, profit }) {
  const data = [
    {
      month: "Jan",
      revenue: revenue * 0.48,
      profit: profit * 0.41,
    },
    {
      month: "Feb",
      revenue: revenue * 0.55,
      profit: profit * 0.46,
    },
    {
      month: "Mar",
      revenue: revenue * 0.63,
      profit: profit * 0.52,
    },
    {
      month: "Apr",
      revenue: revenue * 0.72,
      profit: profit * 0.59,
    },
    {
      month: "May",
      revenue: revenue * 0.81,
      profit: profit * 0.68,
    },
    {
      month: "Jun",
      revenue,
      profit,
    },
  ];

  return (
    <div className="revenue-chart-card">

      <div className="chart-title">

        <h3>Revenue Trend</h3>

        <p>Financial growth overview</p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="revenueGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#7367F0"
                stopOpacity={0.9}
              />

              <stop
                offset="95%"
                stopColor="#7367F0"
                stopOpacity={0.05}
              />
            </linearGradient>

            <linearGradient
              id="profitGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#00C853"
                stopOpacity={0.9}
              />

              <stop
                offset="95%"
                stopColor="#00C853"
                stopOpacity={0.05}
              />
            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#7367F0"
            fill="url(#revenueGradient)"
            strokeWidth={3}
          />

          <Area
            type="monotone"
            dataKey="profit"
            stroke="#00C853"
            fill="url(#profitGradient)"
            strokeWidth={3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;