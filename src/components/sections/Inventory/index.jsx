import React, { useState, useEffect } from "react";
import KPICard from "../../common/KPICard";
import Pagination from "../../common/Pagination/Pagination";
import "./style.css";
import { InventoryService } from "../../../services/endpoints/inventoryService";

const ITEMS_PER_PAGE = 10;
const LOW_STOCK_LABEL = 5;

function Inventory() {
    const [data, setData] = useState({
        inventory_alerts: [],
        flash_banner_active: false,
        low_stock_count: 0,
        out_of_stock_count: 0,
    });
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topPerformers, setTopPerformers] = useState([]);

    const fetchInventory = async () => {
        try {
            const response = await InventoryService.getInventoryAlerts();
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch inventory:", err);
            setError("Could not load inventory data.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await InventoryService.getCategoryAlerts();
            setCategories(response.data.categories);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    const fetchTopPerformers = async (category) => {
        try {
            const response = await InventoryService.getTopPerformers(category);
            setTopPerformers(response.data.top_performers);
        } catch (err) {
            console.error("Failed to fetch top performers:", err);
        }
    };

    useEffect(() => {
        fetchInventory();
        fetchCategories();
        fetchTopPerformers(categoryFilter);
        const interval = setInterval(fetchInventory, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        fetchTopPerformers(categoryFilter);
    }, [categoryFilter, searchTerm]);

    const filteredItems = data.inventory_alerts
        .filter((item) => categoryFilter === "all" || item.category === categoryFilter)
        .filter((item) => item.product_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const getStatusPriority = (status) => {
        switch (status) {
            case "OUT_OF_STOCK": return 1;
            case "LOW_STOCK": return 2;
            case "IN_STOCK": return 3;
            default: return 4;
        }
    };

    const sortedItems = [...filteredItems].sort((a, b) => {
        return getStatusPriority(a.trigger_state) - getStatusPriority(b.trigger_state);
    });

    const totalPages = Math.max(1, Math.ceil(sortedItems.length / ITEMS_PER_PAGE));
    const paginatedItems = sortedItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Top 3 for the ranking bars, scaled relative to rank #1
    const topThree = topPerformers.slice(0, 3);
    const maxOrders = topThree.length > 0 ? topThree[0].total_orders : 0;

    return (
        <div className="revenue-container">
            <div className="inventory-header">
                <div>
                    <h2>Inventory</h2>
                    <p>Live product stock and performance overview</p>
                </div>
                <input
                    type="text"
                    className="inventory-search-input"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {error && <p className="error-text">{error}</p>}

            {data.flash_banner_active && (
                <div className="inventory-flash-banner">
                    <span className="banner-icon">⚠️</span>
                    Some items are out of stock — check the table below.
                </div>
            )}

            <div className="inventory-summary-grid">
                <KPICard
                    title="Low Stock"
                    value={data.low_stock_count}
                    subtitle={`≤ ${LOW_STOCK_LABEL} units remaining`}
                    icon="📉"
                    gradient="linear-gradient(135deg,#ff9f43,#ffc078)"
                />
                <KPICard
                    title="Out of Stock"
                    value={data.out_of_stock_count}
                    subtitle="Needs immediate restock"
                    icon="🚫"
                    gradient="linear-gradient(135deg,#ea5455,#ff8b8b)"
                />

                <div className="top-performer-card">
                    <div className="top-performer-header">
                        <span className="top-performer-icon">🏆</span>
                        <span className="top-performer-title">
                            Top Performers {categoryFilter !== "all" ? `(${categoryFilter})` : "(All Categories)"}
                        </span>
                    </div>

                    {topThree.length === 0 ? (
                        <p className="top-performer-empty">No order data yet</p>
                    ) : (
                        <div className="top-performer-list">
                            {topThree.map((p, index) => {
                                const widthPct = maxOrders > 0
                                    ? Math.max(8, Math.round((p.total_orders / maxOrders) * 100))
                                    : 0;
                                return (
                                    <div className="rank-row" key={p.product_id}>
                                        <div className="rank-row-top">
                                            <span className="rank-name">
                                                <span className={`rank-badge rank-${index + 1}`}>#{index + 1}</span>
                                                {p.product_name}
                                            </span>
                                            <span className="rank-count">{p.total_orders}</span>
                                        </div>
                                        <div className="rank-bar-track">
                                            <div
                                                className={`rank-bar-fill rank-${index + 1}`}
                                                style={{ width: `${widthPct}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="table-header-row">
                <h3>Products</h3>
                <select
                    className="category-dropdown"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <table className="agent-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedItems.map((item) => (
                        <tr key={item.product_id} className="table-row-hover">
                            <td>{item.product_name}</td>
                            <td>{item.category}</td>
                            <td className="inventory-price-highlight">${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <span className={`status-pill ${item.trigger_state.toLowerCase()}`}>
                                    {item.trigger_state.replace(/_/g, " ")}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default Inventory;