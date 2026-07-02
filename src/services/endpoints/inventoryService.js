import api from "../api";

export const InventoryService = {
  getInventoryAlerts: () => api.get("/inventory/alerts"),
  getCategoryAlerts: () => api.get("/inventory/categories"),
  getTopPerformers: () => api.get("/inventory/top-performers"),
};