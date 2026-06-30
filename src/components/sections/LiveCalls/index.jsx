import React, { useState, useEffect } from "react";
import KPICard from "../../common/KPICard";
import "./style.css"; // Imports the matched local stylesheet

function LiveCalls() {
  // Real-time metrics matching your SSE backend stream data structure
  const [metrics, setMetrics] = useState({
    active_concurrent_count: 0,
    average_call_duration_seconds: 0,
  });

  // Log tables and query state tracking
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to pull caller transaction records directly from the database
  const fetchDatabaseLogs = () => {
    fetch("http://127.0.0.1:8000/api/v1/admin/logs?limit=50")
      .then((res) => {
        if (!res.ok) throw new Error("Could not sync with operational log database.");
        return res.json();
      })
      .then((data) => {
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Database fetch failed:", err);
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Initial fetch for the database logs table
    fetchDatabaseLogs();

    // Establishes your live persistent SSE connection for top metric cards
    const eventSource = new EventSource("http://127.0.0.1:8000/api/v1/dashboard/live-stream");

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (!payload.error) {
          setMetrics(payload);
        }
      } catch (err) {
        console.error("Error reading live telemetry chunk:", err);
      }
    };

    eventSource.onerror = () => {
      console.warn("SSE connection interrupted. Reconnecting automatic stream layer...");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Filter logs directly based on the search input query matching caller, session ID, or intent
  const filteredLogs = logs.filter((log) => {
    const query = searchQuery.toLowerCase();
    return (
      (log.caller && log.caller.toLowerCase().includes(query)) ||
      (log.session_id && log.session_id.toLowerCase().includes(query)) ||
      (log.primary_intent && log.primary_intent.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return (
      <div className="revenue-loading">
        Compiling Live Telemetry Pipeline Metrics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="revenue-error">
        <h2>Unable to Sync Live Operations Data</h2>
        <p>{error.message || "Something went wrong."}</p>
        <button onClick={() => { setLoading(true); fetchDatabaseLogs(); }}>
          Retry Verification
        </button>
      </div>
    );
  }

  return (
    <div className="revenue-container">
      
      {/* Page Header Layout matching the Revenue layout exactly */}
      <div className="revenue-page-header">
        <div>
          <h1>Voice Operations Control Tower</h1>
          <p>Real-time telemetry streams and operational session audits matching the backend ledger.</p>
        </div>
        <button className="refresh-btn" onClick={fetchDatabaseLogs}>
          Refresh Table
        </button>
      </div>

      {/* Summary KPI Grid displaying the live metrics */}
      <div className="revenue-summary-grid">
        <KPICard
          title="Concurrent Streams"
          value={metrics.active_concurrent_count}
          subtitle="Real-time Stream Pipes"
          trend="Live Connection"
          trendType="positive"
          icon="🌐"
          gradient="linear-gradient(135deg, #7367f0, #9c8cff)"
        />

        <KPICard
          title="Average Duration"
          value={`${metrics.average_call_duration_seconds}s`}
          subtitle="Mean Session Window"
          trend="Telemetry"
          trendType="positive"
          icon="⏱️"
          gradient="linear-gradient(135deg, #28c76f, #48ea8a)"
        />

        <KPICard
          title="Active Calls"
          value={metrics.active_concurrent_count}
          subtitle="Active Pipeline Counter"
          trend="Node Primary"
          trendType="positive"
          icon="📞"
          gradient="linear-gradient(135deg, #00cfe8, #1cdde7)"
        />
      </div>

      {/* Main Database Caller Log Card */}
      <div className="livecalls-card" style={{ marginTop: "10px" }}>
        <div className="livecalls-header">
          <div>
            <h3 style={{ margin: 0 }}>Operational Caller Log Index</h3>
            <p style={{ margin: "4px 0 0 0", color: "#8d94b2", fontSize: "14px" }}>
              Queried records matching backend operational histories.
            </p>
          </div>
          
          {/* Unified styled search box overlay input component */}
          <div>
            <input
              type="text"
              placeholder="Search by caller identifier, session or intent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "320px",
                padding: "10px 16px",
                fontSize: "14px",
                border: "1px solid #edf1f7",
                borderRadius: "10px",
                background: "#f8f9fd",
                color: "#2c2c54",
                outline: "none"
              }}
            />
          </div>
        </div>

        {/* Database Search Table Viewport Component */}
        <div style={{ overflowX: "auto", width: "100%" }}>
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
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: "1px solid #edf1f7" }} className="table-row-hover">
                    <td style={{ padding: "16px", fontFamily: "monospace", fontWeight: "700", color: "#2c2c54" }}>{log.session_id}</td>
                    <td style={{ padding: "16px", color: "#2c2c54", fontWeight: "600" }}>{log.caller}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ background: "#f0f2fa", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", color: "#5e6484", fontWeight: "500" }}>
                        {log.primary_intent}
                      </span>
                    </td>
                    <td style={{ padding: "16px", color: "#8d94b2" }}>{log.latency}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{
                        padding: "5px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "600",
                        background: log.status?.toLowerCase() === "success" ? "#e8fbf3" : "#fff2f2",
                        color: log.status?.toLowerCase() === "success" ? "#16c784" : "#ea5455"
                      }}>{log.status}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "#8d94b2" }}>
                    No matching active runtime operational transactions located in dataset parameters.
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

export default LiveCalls;