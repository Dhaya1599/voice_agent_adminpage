import api from "../api";

export const RevenueService = {
  getFinancials: () => api.get("/analytics/financials"),
};