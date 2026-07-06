import api from "../api";

export const AgentService = {
    getMonitorStatus: () => api.get("/admin/agents/monitor"),
    getCallsPerHour: () => api.get("/admin/agents/calls-per-hour"),
    updateAgentStatus: (agentId, status) => api.post("/admin/agents/update", { agent_id: agentId, status })
};