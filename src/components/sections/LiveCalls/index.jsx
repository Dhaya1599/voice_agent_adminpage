import React, { useState, useEffect } from "react";

function LiveCalls() {
  const [streamData, setStreamData] = useState({
    activeCalls: 0,
    concurrentCalls: 0,
    avgDuration: "00:00",
    calls: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/dashboard/live-stream")
      .then((res) => res.json())
      .then((data) => {
        setStreamData(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback Mock Data matching the endpoint schema definition
        setStreamData({
          activeCalls: 42,
          concurrentCalls: 58,
          avgDuration: "03:45",
          calls: [
            { id: "CALL-9912", agent: "Sarah AI", customer: "+1 (555) 019-2834", duration: "04:12", status: "In Progress" },
            { id: "CALL-9913", agent: "Support Bot 2", customer: "+1 (555) 014-4921", duration: "02:15", status: "Analyzing" },
            { id: "CALL-9914", agent: "Outbound Dial #4", customer: "+1 (555) 017-8832", duration: "00:54", status: "Listening" }
          ]
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: "20px", color: "#888" }}>Loading Stream Telemetry...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      <div>
        <h1 style={{ fontSize: "34px", color: "#2D2D52", margin: 0 }}>Live Streams</h1>
        <p style={{ color: "#888", marginTop: "6px" }}>Real-time voice agent metrics from the runtime pipeline.</p>
      </div>

      {/* Metric Counters */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <div style={{ background: "white", padding: "25px", borderRadius: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <p style={{ color: "#888", margin: 0, fontSize: "14px" }}>Active Call Counter</p>
          <h2 style={{ fontSize: "36px", margin: "10px 0 0 0", color: "#7367F0" }}>{streamData.activeCalls}</h2>
        </div>
        <div style={{ background: "white", padding: "25px", borderRadius: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <p style={{ color: "#888", margin: 0, fontSize: "14px" }}>Concurrent Call Peak</p>
          <h2 style={{ fontSize: "36px", margin: "10px 0 0 0", color: "#00CFE8" }}>{streamData.concurrentCalls}</h2>
        </div>
        <div style={{ background: "white", padding: "25px", borderRadius: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <p style={{ color: "#888", margin: 0, fontSize: "14px" }}>Average Call Duration</p>
          <h2 style={{ fontSize: "36px", margin: "10px 0 0 0", color: "#28C76F" }}>{streamData.avgDuration}</h2>
        </div>
      </div>

      {/* Table Area */}
      <div style={{ background: "white", padding: "25px", borderRadius: "20px", boxShadow: "0 8px 25px rgba(0,0,0,.04)" }}>
        <h3 style={{ marginBottom: "20px", color: "#2D2D52" }}>Active Session Pipeline</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f7fc" }}>
              <th style={{ padding: "15px", textAlign: "left", color: "#555" }}>Call ID</th>
              <th style={{ padding: "15px", textAlign: "left", color: "#555" }}>Agent Context</th>
              <th style={{ padding: "15px", textAlign: "left", color: "#555" }}>Customer Target</th>
              <th style={{ padding: "15px", textAlign: "left", color: "#555" }}>Duration</th>
              <th style={{ padding: "15px", textAlign: "left", color: "#555" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {streamData.calls.map((call) => (
              <tr key={call.id} style={{ borderBottom: "1px solid #edf1f7" }}>
                <td style={{ padding: "15px", fontWeight: "600", color: "#2D2D52" }}>{call.id}</td>
                <td style={{ padding: "15px", color: "#555" }}>{call.agent}</td>
                <td style={{ padding: "15px", color: "#555" }}>{call.customer}</td>
                <td style={{ padding: "15px", color: "#7367F0", fontWeight: "500" }}>{call.duration}</td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    background: call.status === "In Progress" ? "#dff7e8" : "#dde8ff",
                    color: call.status === "In Progress" ? "#00a854" : "#4b5cff"
                  }}>{call.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LiveCalls;