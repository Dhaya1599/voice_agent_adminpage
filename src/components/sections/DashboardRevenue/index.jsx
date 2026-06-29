import React from "react";

function DashboardRevenue() {
  const data = [30, 45, 35, 60, 49, 70, 65, 90, 80, 95];
  
  return (
    <div style={{
      background: "white", 
      padding: "25px", 
      borderRadius: "20px",
      boxShadow: "0 8px 25px rgba(0,0,0,.04)",
      flex: 1,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ margin: 0, color: "#2d2d52", fontSize: "18px" }}>Revenue Analytics</h3>
        <span style={{ color: "#28C76F", fontWeight: "600", fontSize: "14px" }}>+12.4% this month</span>
      </div>

      {/* SVG Line Chart */}
      <div style={{ width: "100%", height: "180px", position: "relative" }}>
        <svg viewBox="0 0 500 150" width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7367F0" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7367F0" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Background Grid Lines */}
          <line x1="0" y1="37.5" x2="500" y2="37.5" stroke="#f1f1f6" strokeWidth="1" />
          <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f1f6" strokeWidth="1" />
          <line x1="0" y1="112.5" x2="500" y2="112.5" stroke="#f1f1f6" strokeWidth="1" />

          {/* Area under the line */}
          <path
            d="M 0 150 L 0 110 Q 50 80 100 95 T 200 60 T 300 70 T 400 30 T 500 20 L 500 150 Z"
            fill="url(#revenueGlow)"
          />

          {/* Main Line */}
          <path
            d="M 0 110 Q 50 80 100 95 T 200 60 T 300 70 T 400 30 T 500 20"
            fill="none"
            stroke="#7367F0"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Active Data Dot */}
          <circle cx="400" cy="30" r="6" fill="#7367F0" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      {/* X-Axis Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", color: "#b9b9c3", fontSize: "12px", marginTop: "10px" }}>
        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
      </div>
    </div>
  );
}

export default DashboardRevenue;