import api from "../api";

export const InventoryService = {
  getInventoryAlerts: () => api.get("/inventory/alerts"),
};