import api from "../api";

export const ApiMonitorService = {
  getHealthMetrics: () => api.get("/monitor/health-metrics"),

  getLogs: (cursor = null, limit = 10, search = "") =>
    api.get("/admin/logs", {
      params: { cursor, limit, search },
    }),
};