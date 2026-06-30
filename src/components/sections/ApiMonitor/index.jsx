import React, { useState, useEffect } from "react";
import KPICard from "../../common/KPICard";
import "./style.css";
import Pagination from "../../common/Pagination";
import { ApiMonitorService } from "../../../services/endpoints/apimonitorService";

function ApiMonitor() {
  const [health, setHealth] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cursors, setCursors] = useState([null]); 
  const [hasMore, setHasMore] = useState(true);

  const fetchMonitorData = async (page, cursor, query) => {
    setLoading(true);
    
    try {
      const [healthRes, logRes] = await Promise.all([
      ApiMonitorService.getHealthMetrics(),
      ApiMonitorService.getLogs(cursor, 10, query),
      ]);
      

      setHealth(healthRes.data);
      setLogs(logRes.data.logs || []);
      setHasMore(logRes.data.pagination?.has_more ?? false);

      if (page >= cursors.length) {
        setCursors(prev => [...prev, logRes.data.pagination?.next_cursor]);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitorData(1, null, "");
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    setCursors([null]);
    fetchMonitorData(1, null, query);
  };

  return (
    <div className="revenue-container">
      {/* KPI Monitoring Grid */}
      <div className="monitor-summary-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "25px" }}>
        <KPICard title="Twilio Carrier" value={health?.twilio_status || "OFFLINE"} subtitle="Voice Carrier Connectivity" trend="Active Webhooks" trendType="positive" icon="🌐" gradient="linear-gradient(135deg, #7367f0, #9c8cff)" />
        <KPICard title="Deepgram STT" value={health?.deepgram_status || "OFFLINE"} subtitle="Speech Transcription Engine" trend="Nova-2 Model" trendType="positive" icon="🎙️" gradient="linear-gradient(135deg, #28c76f, #48ea8a)" />
        <KPICard title="OTP Success Rate" value={`${health?.otp_success_rate_pct || 0}%`} subtitle="Verification Pipeline Completion" trend="Live Database Value" trendType="positive" icon="🔐" gradient="linear-gradient(135deg, #ff9f43, #ffc285)" />
        <KPICard title="LLM Latency" value={`${health?.llm_latency_tracker_ms || 0}ms`} subtitle="Mean Core Response Window" trend="Operational Metric" trendType="positive" icon="⚡" gradient="linear-gradient(135deg, #00cfe8, #1cdde7)" />
      </div>

      <div className="table-card">
        <div className="table-header-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>System Logs Architecture (Runtime Audit)</h2>
          <input
            type="text"
            placeholder="Search by caller, session or intent..."
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: "320px", padding: "10px 16px", fontSize: "14px", border: "1px solid #edf1f7", borderRadius: "10px", background: "#f8f9fd", outline: "none" }}
          />
        </div>

        <div className="table-responsive-wrapper">
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>Updating logs...</div>
          ) : (
            <table className="revenue-styled-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Session ID</th>
                  <th>Caller</th>
                  <th>Primary Intent</th>
                  <th>Latency</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? (
                  logs.map((log, index) => (
                    <tr key={`${log.session_id}-${index}`}>
                      <td className="font-mono">{log.session_id}</td>
                      <td>{log.caller}</td>
                      <td><span className="intent-badge">{log.primary_intent}</span></td>
                      <td>{log.latency}</td>
                      <td><span className={`status-pill ${log.status?.toLowerCase()}`}>{log.status}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "#8d94b2" }}>No records found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <Pagination 
          currentPage={currentPage} 
          onPageChange={(page) => {
            setCurrentPage(page);
            fetchMonitorData(page, cursors[page - 1], searchQuery);
          }} 
        />
      </div>
    </div>
  );
}

export default ApiMonitor;