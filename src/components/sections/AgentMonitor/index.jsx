import React, { useState, useEffect } from "react";
import { AgentService } from "../../../services/endpoints/AgentService.js";
import "./style.css"

function AgentMonitor() {
    const [data, setData] = useState({ agents: [], queue_count: 0 });
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchStatus = async () => {
        try {
            const response = await AgentService.getMonitorStatus();
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch agent status:", err);
            setError("Could not load agent data.");
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    // Group + count agents by status
    const statusCounts = { busy: 0, free: 0, offline: 0 };
    data.agents.forEach((agent) => {
        const s = agent.status?.toLowerCase();
        if (statusCounts[s] !== undefined) statusCounts[s]++;
    });

    const toggleFilter = (status) => {
        setStatusFilter((prev) => (prev === status ? "all": status));
    };
    const filteredAgents =
        statusFilter === "all"
            ? data.agents
            : data.agents.filter((a) => a.status?.toLowerCase() === statusFilter);
    
    return (
        <div className="revenue-container">
            <div className="revenue-header">
                <h1>Agent Live Monitor</h1>
            </div>

            <div className="queue-banner">
                <h2>People Waiting in queue: {data.queue_count}</h2>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="status-summary">
                <div className="summary-card busy">
                    <span className="summary-count">{statusCounts.busy}</span>
                    <span className="summary-label">Busy</span>
                </div>
                <div className="summary-card free">
                    <span className="summary-count">{statusCounts.free}</span>
                    <span className="summary-label">Free</span>
                </div>
                <div className="summary-card offline">
                    <span className="summary-count">{statusCounts.offline}</span>
                    <span className="summary-label">Offline</span>
                </div>
            </div>
            <div className="table-header-row">
                <h3>Agents</h3>
                <div className = "filter-buttons">
                    <button
                        className={`filter-btn busy ${statusFilter === "busy" ? "active": ""}`}
                        onClick ={() => toggleFilter("busy")}
                    >
                        BUSY
                    </button>
                    <button
                        className={`filter-btn free ${statusFilter === "free" ? "active": ""}`}
                        onClick ={() => toggleFilter("free")}
                    >
                        FREE
                    </button>
                    <button
                        className={`filter-btn offline ${statusFilter === "offline" ? "active": ""}`}
                        onClick ={() => toggleFilter("offline")}
                    >
                        OFFLINE
                    </button>
                </div>
            </div> 
            <table className="agent-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAgents.map((agent, index) => (
                        <tr key={index} className={`row-${agent.status?.toLowerCase()}`}>
                            <td>{agent.name}</td>
                            <td>{agent.phone_no}</td>
                            <td>
                                <span className={`status-badge ${agent.status?.toLowerCase()}`}>
                                    {agent.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AgentMonitor;