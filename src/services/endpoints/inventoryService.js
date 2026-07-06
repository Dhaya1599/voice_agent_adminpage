import api from "../api";

export const InventoryService = {
  getInventoryAlerts: () => api.get("/inventory/alerts"),
  getCategoryAlerts: () => api.get("/inventory/categories"),
  getTopPerformers: (category) => api.get("/inventory/top-performers", { params: { category } }),
};