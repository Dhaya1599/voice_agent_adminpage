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

      const alerts = response.immediate_refill_tickets ?? [];

      setData({
        flashBanner: response.flash_banner_active ?? false,
        inventoryAlerts: alerts,
        totalAlerts: alerts.length,
      });
    } catch (err) {
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