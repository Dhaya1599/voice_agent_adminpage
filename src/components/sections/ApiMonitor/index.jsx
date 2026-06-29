import React, { useState, useEffect } from "react";

function ApiMonitor() {
  const [health, setHealth] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/v1/monitor/health-metrics").then(res => res.json()),
      fetch("/api/v1/admin/logs").then(res => res.json())
    ])
    .then(([healthData, logData]) => {
      setHealth(healthData);
      setLogs(logData);
      setLoading(false);
    })
    .catch(() => {
      // Mock Data incorporating vendor configurations and modified log_id standard
      setHealth({
        twilio: "Operational",
        deepgram: "Operational",
        otpSuccessRate: "98.4%",
        llmLatency: "142ms",
        gatewayStatus: "Healthy"
      });
      setLogs([
        { log_id: "LOG-4011", number: "+1 (555) 912-3004", primary_intent: "OTP Verification", status: "Success", latency: "110ms" },
        { log_id: "LOG-4012", number: "+1 (555) 231-5091", primary_intent: "Product Availability Check", status: "Handled", latency: "185ms" },
        { log_id: "LOG-4013", number: "+1 (555) 441-9923", primary_intent: "Support Routing", status: "Failed", latency: "210ms" }
      ]);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: "20px", color: "#888" }}>Fetching Gateway Diagnostics...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      <div>
        <h1 style={{ fontSize: "34px", color: "#2D2D52", margin: 0 }}>API Gateways & Logs</h1>
        <p style={{ color: "#888", marginTop: "6px" }}>Vendor status, telemetry layers, and operational log audit tracking.</p>
      </div>

      {/* Vendor Health Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        <div style={{ background: "white", padding: "20px", borderRadius: "15px", borderLeft: "5px solid #28C76F" }}>
          <p style={{ color: "#888", margin: 0, fontSize: "13px" }}>Twilio Carrier Hook</p>
          <h3 style={{ margin: "5px 0 0 0", color: "#2D2D52" }}>{health?.twilio}</h3>
        </div>
        <div style={{ background: "white", padding: "20px", borderRadius: "15px", borderLeft: "5px solid #28C76F" }}>
          <p style={{ color: "#888", margin: 0, fontSize: "13px" }}>Deepgram STT Engine</p>
          <h3 style={{ margin: "5px 0 0 0", color: "#2D2D52" }}>{health?.deepgram}</h3>
        </div>
        <div style={{ background: "white", padding: "20px", borderRadius: "15px", borderLeft: "5px solid #7367F0" }}>
          <p style={{ color: "#888", margin: 0, fontSize: "13px" }}>OTP Success Rate</p>
          <h3 style={{ margin: "5px 0 0 0", color: "#2D2D52" }}>{health?.otpSuccessRate}</h3>
        </div>
        <div style={{ background: "white", padding: "20px", borderRadius: "15px", borderLeft: "5px solid #FF9F43" }}>
          <p style={{ color: "#888", margin: 0, fontSize: "13px" }}>LLM Base Latency</p>
          <h3 style={{ margin: "5px 0 0 0", color: "#2D2D52" }}>{health?.llmLatency}</h3>
        </div>
      </div>

      {/* Operational Logs Grid */}
      <div style={{ background: "white", padding: "25px", borderRadius: "20px", boxShadow: "0 8px 25px rgba(0,0,0,.04)" }}>
        <h3 style={{ marginBottom: "20px", color: "#2D2D52" }}>System Logs Architecture (Runtime Audit)</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f7fc" }}>
              <th style={{ padding: "15px", textAlign: "left" }}>Log ID</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Target Number</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Primary Intent</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Gateway Latency</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.log_id} style={{ borderBottom: "1px solid #edf1f7" }}>
                <td style={{ padding: "15px", fontWeight: "600", fontFamily: "monospace" }}>{log.log_id}</td>
                <td style={{ padding: "15px" }}>{log.number}</td>
                <td style={{ padding: "15px", color: "#555" }}>{log.primary_intent}</td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    background: log.status === "Failed" ? "#ffeef0" : "#e3fbf2",
                    color: log.status === "Failed" ? "#ea5455" : "#28c76f"
                  }}>{log.status}</span>
                </td>
                <td style={{ padding: "15px", fontWeight: "500", color: "#7367F0" }}>{log.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApiMonitor;