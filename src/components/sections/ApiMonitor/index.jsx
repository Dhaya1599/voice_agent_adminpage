import React, { useState, useEffect } from "react";
import KPICard from "../../common/KPICard";
import "./style.css"; 

function ApiMonitor() {
  const [health, setHealth] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMonitorData = () => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/v1/monitor/health-metrics").then((res) => {
        if (!res.ok) throw new Error("Health telemetry offline");
        return res.json();
      }),
      fetch("http://127.0.0.1:8000/api/v1/admin/logs?limit=15").then((res) => {
        if (!res.ok) throw new Error("Logs database line broken");
        return res.json();
      })
    ])
      .then(([healthData, logData]) => {
        setHealth(healthData);
        setLogs(logData.logs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gateway diagnostics fetch failed:", err);
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMonitorData();
  }, []);

  if (loading) return <div className="revenue-loading">Fetching System Diagnostics...</div>;
  if (error) return <div className="revenue-error"><button onClick={fetchMonitorData}>Retry</button></div>;

  return (
    <div className="revenue-container">
      {/* KPI Monitoring Block Grid */}
      <div className="monitor-summary-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "25px" }}>
        <KPICard title="Twilio Carrier" value={health?.twilio_status || "OFFLINE"} subtitle="Voice Carrier Connectivity" trend="Active Webhooks" trendType="positive" icon="📡" gradient="linear-gradient(135deg, #7367f0, #9c8cff)" />
        <KPICard title="Deepgram STT" value={health?.deepgram_status || "OFFLINE"} subtitle="Speech Transcription Engine" trend="Nova-2 Model" trendType="positive" icon="🤖" gradient="linear-gradient(135deg, #28c76f, #48ea8a)" />
        <KPICard title="OTP Success Rate" value={`${health?.otp_success_rate_pct || 0}%`} subtitle="Verification Pipeline Completion" trend="Live Database Value" trendType="positive" icon="🔒" gradient="linear-gradient(135deg, #ff9f43, #ffc285)" />
        <KPICard title="LLM Latency" value={`${health?.llm_latency_tracker_ms || 0}ms`} subtitle="Mean Core Response Window" trend="Operational Metric" trendType="positive" icon="⚡" gradient="linear-gradient(135deg, #00cfe8, #1cdde7)" />
      </div>

      {/* Main Structural Layout Card Container */}
      <div className="table-card">
        <div className="table-header-group">
          <h2>System Logs Architecture (Runtime Audit)</h2>
          <p>Chronological transaction trail captured from background task metrics handlers.</p>
        </div>

        <div className="table-responsive-wrapper">
          <table className="revenue-styled-table">
            <thead>
              <tr>
                <th>Session reference ID</th>
                <th>Caller Target</th>
                <th>Primary Intent</th>
                <th>Gateway Latency</th>
                <th>Channel Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log, index) => {
                  // Normalize fallback keys safely
                  const statusLabel = (log.status || "SUCCESS").toUpperCase();
                  let statusClass = "status-success";
                  if (statusLabel === "FAILED") statusClass = "status-failed";
                  if (statusLabel === "DEGRADED") statusClass = "status-degraded";

                  return (
                    <tr key={`${log.session_id || 'log'}-${index}`}>
                      <td className="font-mono">{log.session_id}</td>
                      <td className="font-caller-bold">{log.caller}</td>
                      <td>
                        <span className="intent-badge">{log.primary_intent}</span>
                      </td>
                      <td className="latency-txt-highlight">{log.latency}</td>
                      <td>
                        <span className={`status-pill ${statusClass}`}>
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="empty-table-state">
                    No active integration runtime records mapped to database clusters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ApiMonitor;