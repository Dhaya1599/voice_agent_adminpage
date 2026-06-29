import api from "./api";

export const DashboardAPI = {
  getHealth: () =>
    api.get("/monitor/health-metrics"),

  getRevenue: () =>
    api.get("/analytics/financials"),

  getInventory: () =>
    api.get("/inventory/alerts"),

  getLogs: (cursor = null, limit = 10) =>
    api.get("/admin/logs", {
      params: {
        cursor,
        limit,
      },
    }),

  exportLogs: () =>
    api.get("/admin/logs/export", {
      responseType: "blob",
    }),
};