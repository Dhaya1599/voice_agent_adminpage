import React, { useState, useEffect } from "react";
import Pagination from "../../common/Pagination/Pagination";
import { AgentService } from "../../../services/endpoints/AgentService.js";
import CallsPerHourChart from "../../common/CallsPerHourChart";
import "./style.css";

const ITEMS_PER_PAGE = 10;

function AgentMonitor() {
    const [data, setData] = useState({ agents: [], queue_count: 0 });
    const [callsData, setCallsData] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

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

    const fetchCallsPerHour = async () => {
        try {
            const response = await AgentService.getCallsPerHour();
            setCallsData(response.data.calls_per_hour || []);
        } catch (err) {
            console.error("Failed to fetch calls per hour:", err);
        }
    };

    useEffect(() => {
        fetchStatus();
        fetchCallsPerHour();
        const interval = setInterval(() => {
            fetchStatus();
            fetchCallsPerHour();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter]);

    const statusCounts = { busy: 0, free: 0, offline: 0 };
    data.agents.forEach((agent) => {
        const s = agent.status?.toLowerCase();
        if (statusCounts[s] !== undefined) statusCounts[s]++;
    });

    const setFilter = (status) => {
        setStatusFilter(status);
    };

    const filteredAgents =
        statusFilter === "all"
            ? data.agents
            : data.agents.filter((a) => a.status?.toLowerCase() === statusFilter);

    const totalPages = Math.max(1, Math.ceil(filteredAgents.length / ITEMS_PER_PAGE));
    const paginatedAgents = filteredAgents.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="revenue-container">
            <div className="revenue-header">
                <h2>Agent Live Monitor</h2>
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

            <CallsPerHourChart data={callsData} />

            <div className="table-header-row">
                <h3>Agents</h3>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn all ${statusFilter === "all" ? "active" : ""}`}
                        onClick={() => setFilter("all")}
                    >
                        ALL
                    </button>
                    <button
                        className={`filter-btn busy ${statusFilter === "busy" ? "active" : ""}`}
                        onClick={() => setFilter("busy")}
                    >
                        BUSY
                    </button>
                    <button
                        className={`filter-btn free ${statusFilter === "free" ? "active" : ""}`}
                        onClick={() => setFilter("free")}
                    >
                        FREE
                    </button>
                    <button
                        className={`filter-btn offline ${statusFilter === "offline" ? "active" : ""}`}
                        onClick={() => setFilter("offline")}
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
                    {paginatedAgents.map((agent, index) => (
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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default AgentMonitor;