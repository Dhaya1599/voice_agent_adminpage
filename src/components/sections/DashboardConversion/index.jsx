import React from "react";

function DashboardConversion() {
  const bars = [
    { label: "M", value: "40%" },
    { label: "T", value: "65%" },
    { label: "W", value: "50%" },
    { label: "T", value: "85%" },
    { label: "F", value: "70%" },
    { label: "S", value: "35%" },
    { label: "S", value: "45%" },
  ];

  return (
    <div style={{
      background: "white", 
      padding: "25px", 
      borderRadius: "20px",
      boxShadow: "0 8px 25px rgba(0,0,0,.04)",
      flex: 1,
    }}>
      <h3 style={{ margin: "0 0 25px 0", color: "#2d2d52", fontSize: "18px" }}>Conversion Rates</h3>

      {/* Bar Chart Container */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-end", 
        height: "170px", 
        padding: "0 10px" 
      }}>
        {bars.map((bar, index) => (
          <div key={index} style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            flex: 1,
            gap: "10px"
          }}>
            {/* The actual visual bar */}
            <div style={{
              width: "14px",
              height: `calc(${bar.value} * 1.4)`, // Scale value to layout height bounds
              background: index === 3 ? "#00CFE8" : "#eceff5", // Highlight Thursday bar
              borderRadius: "20px",
              transition: "height 0.5s ease"
            }}></div>
            
            {/* Label */}
            <span style={{ color: "#b9b9c3", fontSize: "12px", fontWeight: "500" }}>
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardConversion;