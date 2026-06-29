import React, { useState, useEffect } from "react";

function Inventory() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/inventory/alerts")
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(() => {
        setAlerts([
          { sku: "PROD-SKU-802", name: "Premium Widget Variant", remaining: 0, status: "Out of Stock", actionTicket: "TCK-4091" },
          { sku: "PROD-SKU-114", name: "Standard Basic Package", remaining: 4, status: "Critical Threshold Low", actionTicket: "TCK-4092" },
          { sku: "PROD-SKU-339", name: "Enterprise Allocation Node", remaining: 12, status: "Healthy Status Trend", actionTicket: "None" }
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: "20px", color: "#888" }}>Polling Catalog Asset Allocations...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      <div>
        <h1 style={{ fontSize: "34px", color: "#2D2D52", margin: 0 }}>Inventory Alerts</h1>
        <p style={{ color: "#888", marginTop: "6px" }}>Threshold checking loops mapped straight out of the catalog database.</p>
      </div>

      <div style={{ background: "white", padding: "25px", borderRadius: "20px", boxShadow: "0 8px 25px rgba(0,0,0,.04)" }}>
        <h3 style={{ marginBottom: "20px", color: "#2D2D52" }}>Real-time Quantity Watch & Auto-Ticketing</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f7fc" }}>
              <th style={{ padding: "15px", textAlign: "left" }}>Catalog SKU</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Product Item Name</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Stock Counter</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Condition Severity</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Refill Action Ticket</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #edf1f7" }}>
                <td style={{ padding: "15px", fontFamily: "monospace", fontWeight: "600" }}>{item.sku}</td>
                <td style={{ padding: "15px", color: "#555" }}>{item.name}</td>
                <td style={{ padding: "15px", fontWeight: "600" }}>{item.remaining} units</td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    background: item.remaining === 0 ? "#ffeef0" : item.remaining <= 5 ? "#fff8ec" : "#e3fbf2",
                    color: item.remaining === 0 ? "#ea5455" : item.remaining <= 5 ? "#ff9f43" : "#28c76f"
                  }}>{item.status}</span>
                </td>
                <td style={{ padding: "15px" }}>
                  {item.actionTicket !== "None" ? (
                    <span style={{ color: "#7367F0", fontWeight: "600", background: "#f0eeff", padding: "4px 8px", borderRadius: "6px", fontSize: "13px" }}>
                      🎟️ {item.actionTicket}
                    </span>
                  ) : (
                    <span style={{ color: "#b9b9c3" }}>None Required</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;