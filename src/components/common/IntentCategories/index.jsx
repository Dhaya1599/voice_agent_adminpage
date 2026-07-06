import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { LiveCallsService } from "../../../services/endpoints/livecallsService";
import "./style.css";

const INTENT_COLORS = [
  "#7367f0",
  "#28c76f",
  "#00cfe8",
  "#ff9f43",
  "#ea5455",
  "#82868b",
  "#9c8cff",
  "#48ea8a",
];

function IntentCategories() {
  const [data, setData] = useState([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntents = async () => {
      try {
        const { data: res } = await LiveCallsService.getIntentSummary();
        setData(res.categories || []);
        setTotalLogs(res.total_logs || 0);
      } catch (err) {
        console.error("Intent summary fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIntents();
  }, []);

  if (loading) {
    return (
      <div className="intent-card">
        <div className="intent-card-header">
          <h3>Intent Categories</h3>
        </div>
        <div className="intent-loading">Loading intent data...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="intent-card">
        <div className="intent-card-header">
          <h3>Intent Categories</h3>
        </div>
        <div className="intent-loading">No intent data available.</div>
      </div>
    );
  }

  // Split categories into two columns
  const mid = Math.ceil(data.length / 2);
  const leftCol = data.slice(0, mid);
  const rightCol = data.slice(mid);

  // Total coverage percentage (should be ~100% but we compute it)
  const totalPercentage = data.reduce((sum, c) => sum + c.percentage, 0);

  // Chart data for Recharts
  const chartData = data.map((c, i) => ({
    name: c.intent,
    value: c.count,
    color: INTENT_COLORS[i % INTENT_COLORS.length],
  }));

  return (
    <div className="intent-card">
      <div className="intent-card-header">
        <h3>Intent Categories</h3>
      </div>

      <div className="intent-body">
        {/* Left column - progress bars */}
        <div className="intent-bars-col">
          {leftCol.map((cat, i) => (
            <div key={cat.intent} className="intent-bar-item">
              <div className="intent-bar-label">
                <span className="intent-dot" style={{ background: INTENT_COLORS[i % INTENT_COLORS.length] }} />
                <span className="intent-name">{cat.intent}</span>
                <span className="intent-pct">{cat.percentage}%</span>
              </div>
              <div className="intent-bar-track">
                <div
                  className="intent-bar-fill"
                  style={{
                    width: `${cat.percentage}%`,
                    background: INTENT_COLORS[i % INTENT_COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Center - donut chart */}
        <div className="intent-chart-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                animationBegin={0}
                animationDuration={800}
              >
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="intent-chart-label">
            <span className="intent-chart-total">Total</span>
            <span className="intent-chart-value">{Math.round(totalPercentage)}%</span>
          </div>
        </div>

        {/* Right column - progress bars */}
        <div className="intent-bars-col">
          {rightCol.map((cat, i) => {
            const colorIndex = mid + i;
            return (
              <div key={cat.intent} className="intent-bar-item">
                <div className="intent-bar-label">
                  <span className="intent-dot" style={{ background: INTENT_COLORS[colorIndex % INTENT_COLORS.length] }} />
                  <span className="intent-name">{cat.intent}</span>
                  <span className="intent-pct">{cat.percentage}%</span>
                </div>
                <div className="intent-bar-track">
                  <div
                    className="intent-bar-fill"
                    style={{
                      width: `${cat.percentage}%`,
                      background: INTENT_COLORS[colorIndex % INTENT_COLORS.length],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default IntentCategories;
