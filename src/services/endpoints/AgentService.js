import api from "../api";

export const AgentService = {
    getMonitorStatus: () => api.get("/admin/agents/monitor"),
    updateAgentStatus: (agentId, status) => api.post("/admin/agents/update", { agent_id: agentId, status })
};