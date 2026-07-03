import React from "react";
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

function CallsPerHourChart({ data }) {
  // If data is empty or null, provide mock data for illustration
  const chartData = data && data.length > 0 ? data : [
    { time: "09:00", calls: 5 },
    { time: "10:00", calls: 12 },
    { time: "11:00", calls: 18 },
    { time: "12:00", calls: 10 },
    { time: "13:00", calls: 7 },
    { time: "14:00", calls: 15 },
    { time: "15:00", calls: 25 },
    { time: "16:00", calls: 20 },
    { time: "17:00", calls: 14 },
    { time: "18:00", calls: 9 },
  ];

  return (
    <div className="calls-chart-card">
      <div className="chart-title">
        <h3>Call Volume Trend</h3>
        <p>Hourly activity tracking (last 24 hours)</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00cfe8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00cfe8" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f9" vertical={false} />
          <XAxis 
            dataKey="time" 
            tick={{ fill: "#8d94b2", fontSize: 12 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            tick={{ fill: "#8d94b2", fontSize: 12 }} 
            axisLine={false} 
            tickLine={false} 
            allowDecimals={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#ffffff", 
              border: "1px solid #edf1f7", 
              borderRadius: "8px", 
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)" 
            }} 
            labelStyle={{ color: "#2c2c54", fontWeight: "bold" }}
          />
          <Area
            type="monotone"
            dataKey="calls"
            name="Calls"
            stroke="#00cfe8"
            fill="url(#callsGradient)"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#00cfe8", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0, fill: "#00cfe8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CallsPerHourChart;
