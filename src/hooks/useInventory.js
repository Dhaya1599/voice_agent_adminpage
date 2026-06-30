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

      console.log("📡 Step 1: Requesting inventory payload from the backend API...");
      const responseWrapper = await DashboardAPI.getInventory();
      
      console.log("📥 Step 2: Full raw response wrapper object received:", responseWrapper);

      // Extract the nested data object
      const response = responseWrapper?.data;
      console.log("📦 Step 3: Extracted 'data' contents from wrapper:", response);

      if (!response) {
        console.warn("⚠️ Warning: response.data is completely empty or undefined!");
      }

      // Look closely at what your backend uses for its property arrays
      const tickets = response?.immediate_refill_tickets || response?.inventory_alerts || response?.alerts;
      
      console.log("🔍 Step 4: Located arrays inside properties (tickets found):", tickets);

      // If tickets doesn't exist, check if the response itself is the array
      const finalArray = Array.isArray(tickets) ? tickets : (Array.isArray(response) ? response : []);
      console.log("📊 Step 5: Final parsed array going into the frontend table:", finalArray);

      const normalizedAlerts = finalArray.map((item, index) => {
        console.log(`🔹 Inspecting array item index [${index}]:`, item);
        return {
          product_id: item.product_id || item.id || "N/A",
          product_name: item.product_name || item.name || "Unknown Product",
          category: item.category || "General",
          price: Number(item.price || item.unit_price || 0),
          trigger_state: item.trigger_state || item.status || "OUT_OF_STOCK"
        };
      });

      setData({
        flashBanner: response?.flash_banner_active ?? response?.flashBanner ?? false,
        inventoryAlerts: normalizedAlerts,
        totalAlerts: normalizedAlerts.length,
      });
    } catch (err) {
      console.error("❌ Step 6: Direct API Error caught during extraction loop:", err);
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