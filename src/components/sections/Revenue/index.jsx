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
      

      const {data} = await RevenueService.getFinancials();
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

  if (loading) {
    return (
      <div className="revenue-loading">
        Compiling Financial Metrics...
      </div>
    );
  }

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
          <h1>Commerce & Revenue Ledger</h1>
          <p>Financial breakdown generated directly from your backend database.</p>
        </div>
      </div>

      <div className="revenue-summary-grid">

        <KPICard
          title="Total Revenue"
          value={`₹${Number(revenue).toLocaleString()}`}
          subtitle="Total Revenue Generated"
          trend="+12.8%"
          trendType="positive"
          icon="💰"
          gradient="linear-gradient(135deg,#7367F0,#9C8CFF)"
        />

        <KPICard
          title="Gross Profit"
          value={`₹${Number(profit).toLocaleString()}`}
          subtitle="Estimated Gross Profit"
          trend="+8.6%"
          trendType="positive"
          icon="📈"
          gradient="linear-gradient(135deg,#00C853,#43E97B)"
        />

        <KPICard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          subtitle="Customer Conversion"
          trend="+3.1%"
          trendType="positive"
          icon="🎯"
          gradient="linear-gradient(135deg,#00B4DB,#0083B0)"
        />

        <KPICard
          title="Average Order"
          value={`₹${Number(averageOrderValue).toLocaleString()}`}
          subtitle="Average Order Value"
          trend="+5.4%"
          trendType="positive"
          icon="🛒"
          gradient="linear-gradient(135deg,#F7971E,#FFD200)"
        />

      </div>

      <div className="revenue-card">

        <div className="revenue-header">
          <div>
            <h2>Revenue Summary</h2>
            <p>Live data fetched from your FastAPI backend.</p>
          </div>
        </div>

        <div className="summary-row">
          <RevenueChart revenue={revenue} profit={profit} />

          <div className="summary-box">
            <span>Total Revenue</span>
            <h3>₹{Number(revenue).toLocaleString()}</h3>
            <p className="positive">Live Database Value</p>
          </div>

          <div className="summary-box">
            <span>Gross Profit</span>
            <h3>₹{Number(profit).toLocaleString()}</h3>
            <p className="positive">Live Database Value</p>
          </div>

          <div className="summary-box">
            <span>Conversion Rate</span>
            <h3>{conversionRate}%</h3>
            <p className="positive">Live Database Value</p>
          </div>

          <div className="summary-box">
            <span>Average Order</span>
            <h3>₹{Number(averageOrderValue).toLocaleString()}</h3>
            <p className="positive">Live Database Value</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Revenue;