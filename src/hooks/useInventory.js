import { useState, useEffect, useCallback } from "react";
import { DashboardAPI } from "../services";

const initialState = {
  flashBanner: false,
  inventoryAlerts: [],
  totalAlerts: 0,
};

export default function useInventory() {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: response } = await DashboardAPI.getInventory();

      const rawAlerts = response?.inventory_alerts ?? [];

      const normalizedAlerts = rawAlerts.map((item) => ({
        product_id: item.product_id ?? "N/A",
        product_name: item.product_name ?? "Unknown Product",
        category: item.category ?? "General",
        price: Number(item.price ?? 0),
        trigger_state: item.trigger_state ?? "OUT_OF_STOCK",
      }));

      setData({
        flashBanner: response?.flash_banner_active ?? false,
        inventoryAlerts: normalizedAlerts,
        totalAlerts: normalizedAlerts.length,
      });
    } catch (err) {
      console.error("Inventory fetch failed:", err);
      setError(err);
      setData(initialState);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return {
    ...data,
    loading,
    error,
    refresh: fetchInventory,
  };
}