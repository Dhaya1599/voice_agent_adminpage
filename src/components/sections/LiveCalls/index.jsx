import React, { useState, useEffect } from "react";
import KPICard from "../../common/KPICard";
import Pagination from "../../common/Pagination/Pagination";
import "./style.css";
import { LiveCallsService } from "../../../services/endpoints/livecallsService";


function LiveCalls() {
  const [metrics, setMetrics] = useState({
    active_concurrent_count: 0,
    average_call_duration_seconds: 0,
  });

  // State for Server-Side Pagination and Search
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cursors, setCursors] = useState([null]); // Tracks cursor for each page
  const [hasMore, setHasMore] = useState(true);

  // Updated fetch to support cursor and search query
  const fetchDatabaseLogs = async (page, cursor, query) => {
    setLoading(true);
    
    try {
      const { data } = await LiveCallsService.getLogs(cursor, 10, query);
      setLogs(data.logs || []);
      setHasMore(data.pagination?.has_more ?? false);


      // Store the next_cursor if we are moving to a new page
      if (page >= cursors.length) {
        setCursors(prev => [...prev, data.pagination?.next_cursor]);
      }
    } catch (err) {
      console.error("Database fetch failed:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseLogs(1, null, "");

    const eventSource = new EventSource(LiveCallsService.getLiveStreamUrl());
    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (!payload.error) setMetrics(payload);
      } catch (err) { console.error("Error reading live telemetry chunk:", err); }
    };
    return () => eventSource.close();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    setCursors([null]);
    fetchDatabaseLogs(1, null, query);
  };

  if (loading && logs.length === 0) {
    return <div className="revenue-loading">Compiling Live Telemetry Pipeline Metrics...</div>;
  }

  return (
    <div className="revenue-container">
      <div className="revenue-page-header">
        <div>
          <h1>Voice Operations Control Tower</h1>
          <p>Real-time telemetry streams and operational session audits matching the backend ledger.</p>
        </div>
      </div>

      <div className="revenue-summary-grid">
        <KPICard title="Concurrent Streams" value={metrics.active_concurrent_count} subtitle="Real-time Stream Pipes" trend="Live Connection" trendType="positive" icon="🌐" gradient="linear-gradient(135deg, #7367f0, #9c8cff)" />
        <KPICard title="Average Duration" value={`${metrics.average_call_duration_seconds}s`} subtitle="Mean Session Window" trend="Telemetry" trendType="positive" icon="⏱️" gradient="linear-gradient(135deg, #28c76f, #48ea8a)" />
        <KPICard title="Active Calls" value={metrics.active_concurrent_count} subtitle="Active Pipeline Counter" trend="Node Primary" trendType="positive" icon="📞" gradient="linear-gradient(135deg, #00cfe8, #1cdde7)" />
      </div>

      <div className="livecalls-card" style={{ marginTop: "10px" }}>
        <div className="livecalls-header">
          <div>
            <h3 style={{ margin: 0 }}>Operational Caller Log Index</h3>
            <p style={{ margin: "4px 0 0 0", color: "#8d94b2", fontSize: "14px" }}>Queried records matching backend operational histories.</p>
          </div>
          <input
            type="text"
            placeholder="Search by caller, session or intent..."
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: "320px", padding: "10px 16px", fontSize: "14px", border: "1px solid #edf1f7", borderRadius: "10px", background: "#f8f9fd", outline: "none" }}
          />
        </div>

        <div style={{ overflowX: "auto", width: "100%" }}>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>Updating logs...</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "15px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #edf1f7" }}>
                  <th style={{ padding: "16px", color: "#8d94b2", fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Session ID</th>
                  <th style={{ padding: "16px", color: "#8d94b2", fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Caller Target</th>
                  <th style={{ padding: "16px", color: "#8d94b2", fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Primary Intent</th>
                  <th style={{ padding: "16px", color: "#8d94b2", fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Latency</th>
                  <th style={{ padding: "16px", color: "#8d94b2", fontWeight: "600", fontSize: "13px", textTransform: "uppercase" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: "1px solid #edf1f7" }}>
                      <td style={{ padding: "16px", fontFamily: "monospace", fontWeight: "700", color: "#2c2c54" }}>{log.session_id}</td>
                      <td style={{ padding: "16px", color: "#2c2c54", fontWeight: "600" }}>{log.caller}</td>
                      <td style={{ padding: "16px" }}><span style={{ background: "#f0f2fa", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", color: "#5e6484" }}>{log.primary_intent}</span></td>
                      <td style={{ padding: "16px", color: "#8d94b2" }}>{log.latency}</td>
                      <td style={{ padding: "16px" }}><span style={{ padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "600", background: log.status?.toLowerCase() === "success" ? "#e8fbf3" : "#fff2f2", color: log.status?.toLowerCase() === "success" ? "#16c784" : "#ea5455" }}>{log.status}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "#8d94b2" }}>No records found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination Integration */}
        <Pagination 
          currentPage={currentPage} 
          onPageChange={(page) => {
            setCurrentPage(page);
            fetchDatabaseLogs(page, cursors[page - 1], searchQuery);
          }} 
        />
      </div>
    </div>
  );
}

export default LiveCalls;