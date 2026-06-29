import { useState, useEffect, useCallback } from "react";
import { DashboardAPI } from "../services";

const initialState = {
  revenue: 0,
  profit: 0,
  conversionRate: 0,
  averageOrderValue: 0,
};

export default function useRevenue() {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRevenue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: response } = await DashboardAPI.getRevenue();

      setData({
        revenue: response.total_revenue ?? 0,
        profit: response.gross_profit_estimated ?? 0,
        conversionRate: response.conversion_rate_pct ?? 0,
        averageOrderValue: response.avg_order_price ?? 0,
      });
    } catch (err) {
      setError(err);
      setData(initialState);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRevenue();
  }, [fetchRevenue]);

  return {
    ...data,
    loading,
    error,
    refresh: fetchRevenue,
  };
}