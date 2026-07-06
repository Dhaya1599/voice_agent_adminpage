import api from "../api";

export const LiveCallsService = {
  getLogs: (cursor = null, limit = 10, search = "") =>
    api.get("/admin/logs", {
      params: { cursor, limit, search },
    }),

  getIntentSummary: () =>
    api.get("/admin/logs/intent-summary"),

  // Live telemetry uses Server-Sent Events, not a standard REST call,
  // so this returns the full stream URL for the component to open directly.
  getLiveStreamUrl: () => `${api.defaults.baseURL}/dashboard/live-stream`,
};