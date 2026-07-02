import React, { useState, useEffect } from "react";
import KPICard from "../../common/KPICard";
import Pagination from "../../common/Pagination/Pagination";
import "./style.css";
import { InventoryService } from "../../../services/endpoints/inventoryService";

const ITEMS_PER_PAGE = 10;

function Inventory() {
  const [inventoryAlerts, setInventoryAlerts] = useState([]);
  const [flashBanner, setFlashBanner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      
      const {data} = await InventoryService.getInventoryAlerts();
      setInventoryAlerts(data.inventory_alerts || []);
      setFlashBanner(data.flash_banner_active ?? false);
    } catch (err) {
      console.error("Inventory fetch failed:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);


  if (error) {
    return (
      <div className="revenue-error">
        <h2>Unable to Sync Inventory Database</h2>
        <p>{error.message || "Connection line to PostgreSQL timed out."}</p>
        <button onClick={fetchInventory}>Retry Sync</button>
      </div>
    );
  }

  // Live filter evaluating products by ID, Name, Category, or Status Trigger State
  const filteredAlerts = inventoryAlerts.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      (item.product_name && item.product_name.toLowerCase().includes(query)) ||
      (item.product_id && item.product_id.toString().toLowerCase().includes(query)) ||
      (item.category && item.category.toLowerCase().includes(query)) ||
      (item.trigger_state && item.trigger_state.toLowerCase().includes(query))
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredAlerts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedAlerts = filteredAlerts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on every new search
  };

  return (
    <div className="revenue-container">

      <div className="revenue-page-header">
        <div>
          <h1>Inventory & Stock Alerts</h1>
          <p>Real-time asset tracking and fulfillment alerts fetched directly from PostgreSQL.</p>
        </div>
      </div>

      {flashBanner && (
        <div className="inventory-flash-banner">
          <span className="banner-icon">⚠️</span> Critical Level Notice: Immediate inventory refills are required for flagged product lines.
        </div>
      )}

      <div className="inventory-summary-grid">
        <KPICard
          title="Total Stock Alerts"
          value={inventoryAlerts.length}
          subtitle="Flagged Catalog Products"
          trend="System Wide"
          trendType="negative"
          icon="📦"
          gradient="linear-gradient(135deg, #7367f0, #9c8cff)"
        />

        <KPICard
          title="Out Of Stock"
          value={inventoryAlerts.filter((item) => item.trigger_state === "OUT_OF_STOCK").length}
          subtitle="Empty Shelves Index"
          trend="Refill Urgently"
          trendType="negative"
          icon="🚨"
          gradient="linear-gradient(135deg, #ea5455, #ff7b7c)"
        />

        <KPICard
          title="Monitored Categories"
          value={new Set(inventoryAlerts.map((i) => i.category)).size}
          subtitle="Distinct Product Segments"
          trend="PostgreSQL Data"
          trendType="positive"
          icon="🏷️"
          gradient="linear-gradient(135deg, #28c76f, #48ea8a)"
        />
      </div>

      <div className="inventory-card">
        <div className="inventory-header">
          <div>
            <h2>Product Catalog Alerts</h2>
            <p>Monitored lines registering matching system trigger conditions.</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search by product, ID, category..."
              value={searchQuery}
              onChange={handleSearch}
              className="inventory-search-input"
            />
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <table className="revenue-styled-table">
            <thead>
              <tr>
                <th>Product reference ID</th>
                <th>Product Specification</th>
                <th>Category Line</th>
                <th>Unit Price</th>
                <th>Fulfillment Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAlerts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-table-state">
                    No active product lines match your filtering parameters.
                  </td>
                </tr>
              ) : (
                paginatedAlerts.map((item, index) => (
                  <tr key={`${item.product_id || 'item'}-${index}`} className="table-row-hover">
                    <td className="font-mono">{item.product_id}</td>
                    <td className="font-caller-bold">{item.product_name}</td>
                    <td><span className="intent-badge">{item.category}</span></td>
                    <td className="inventory-price-highlight">
                      ₹{Number(item.price || 0).toLocaleString()}
                    </td>
                    <td>
                      <span className={`status-pill ${item.trigger_state ? item.trigger_state.toLowerCase() : ""}`}>
                        {item.trigger_state ? item.trigger_state.replace(/_/g, " ") : ""}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

    </div>
  );
}

export default Inventory;