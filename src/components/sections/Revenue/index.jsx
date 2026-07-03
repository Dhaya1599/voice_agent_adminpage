import React, { useState, useEffect } from "react";
import KPICard from "../../common/KPICard";
import RevenueChart from "../../common/RevenueChart";
import "./style.css";
import { RevenueService } from "../../../services/endpoints/revenueService";

function Revenue() {
  const [metrics, setMetrics] = useState({
    revenue: 0,
    profit: 0,
    conversionRate: 0,
    averageOrderValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFinancials = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await RevenueService.getFinancials();
      setMetrics({
        revenue: data.total_revenue ?? 0,
        profit: data.gross_profit_estimated ?? 0,
        conversionRate: data.conversion_rate_pct ?? 0,
        averageOrderValue: data.avg_order_price ?? 0,
      });
    } catch (err) {
      console.error("Revenue fetch failed:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancials();
  }, []);

  if (error) {
    return (
      <div className="revenue-error">
        <h2>Unable to Load Revenue Data</h2>
        <p>{error.message || "Something went wrong."}</p>
        <button onClick={fetchFinancials}>Retry</button>
      </div>
    );
  }

  const { revenue, profit, conversionRate, averageOrderValue } = metrics;

  return (
    <div className="revenue-container">
      <div className="revenue-page-header">
        <div>
          <h2>Commerce & Revenue Ledger</h2>
          <p>Financial breakdown generated directly from your backend database.</p>
        </div>
      </div>

      {/* KPI Header Cards */}
      <div className="revenue-summary-grid">
        <KPICard title="Total Revenue" value={`₹${Number(revenue).toLocaleString()}`} icon="💰"gradient="linear-gradient(135deg, #ff9f43, #ffc285)" />
        <KPICard title="Gross Profit" value={`₹${Number(profit).toLocaleString()}`} icon="📈"gradient="linear-gradient(135deg, #7367f0, #9c8cff"/>
        <KPICard title="Conversion Rate" value={`${conversionRate}%`} icon="🎯"gradient="linear-gradient(135deg, #f7d40f, #f7d40f)" />
        <KPICard title="Average Order" value={`₹${Number(averageOrderValue).toLocaleString()}`} icon="🛒"gradient="linear-gradient(135deg, #00cfe8, #1cdde7)" />
      </div>

      {/* Main Chart Section - Now Full Width */}
      <div className="revenue-card">
        <div className="revenue-header">
          <div>
            <h2>Revenue Trend</h2>
            <p>Live data visualization.</p>
          </div>
        </div>
        <div className="revenue-chart">
          <RevenueChart revenue={revenue} profit={profit} />
        </div>
      </div>

      {/* Summary Row - Now Below the Chart */}
       
      
    </div>
  );
}

export default Revenue;