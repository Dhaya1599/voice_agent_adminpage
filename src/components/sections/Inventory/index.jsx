import React from "react";
import useInventory from "../../../hooks/useInventory";

function Inventory() {
  const {
    flashBanner,
    inventoryAlerts,
    totalAlerts,
    loading,
    error,
    refresh,
  } = useInventory();

  if (loading) {
    return (
      <div style={{ padding: "20px", color: "#888" }}>
        Loading Inventory Data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Unable to Load Inventory Data</h2>
        <p>{error.message || "Something went wrong."}</p>
        <button onClick={refresh}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "34px",
              color: "#2D2D52",
              margin: 0,
            }}
          >
            Inventory Alerts
          </h1>

          <p
            style={{
              color: "#888",
              marginTop: "6px",
            }}
          >
            Live inventory information from PostgreSQL.
          </p>
        </div>

        <button
          onClick={refresh}
          style={{
            background: "#7367F0",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Refresh
        </button>
      </div>

      {flashBanner && (
        <div
          style={{
            background: "#FFF8E6",
            border: "1px solid #FFD166",
            color: "#8A5A00",
            padding: "14px 18px",
            borderRadius: "12px",
            fontWeight: "600",
          }}
        >
          ⚠️ Immediate inventory refill required.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "18px",
            boxShadow: "0 8px 25px rgba(0,0,0,.04)",
          }}
        >
          <span style={{ color: "#888" }}>Total Alerts</span>
          <h2 style={{ color: "#7367F0" }}>{totalAlerts}</h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "18px",
            boxShadow: "0 8px 25px rgba(0,0,0,.04)",
          }}
        >
          <span style={{ color: "#888" }}>Out of Stock</span>
          <h2 style={{ color: "#EA5455" }}>
            {inventoryAlerts.filter(
              (item) => item.trigger_state === "OUT_OF_STOCK"
            ).length}
          </h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "18px",
            boxShadow: "0 8px 25px rgba(0,0,0,.04)",
          }}
        >
          <span style={{ color: "#888" }}>Categories</span>
          <h2 style={{ color: "#28C76F" }}>
            {new Set(inventoryAlerts.map((i) => i.category)).size}
          </h2>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,.04)",
        }}
      >
        <h3
          style={{
            marginBottom: "20px",
            color: "#2D2D52",
          }}
        >
          Product Catalog Alerts
        </h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#F5F7FC" }}>
              <th style={{ padding: "15px", textAlign: "left" }}>
                Product ID
              </th>

              <th style={{ padding: "15px", textAlign: "left" }}>
                Product Name
              </th>

              <th style={{ padding: "15px", textAlign: "left" }}>
                Category
              </th>

              <th style={{ padding: "15px", textAlign: "left" }}>
                Price
              </th>

              <th style={{ padding: "15px", textAlign: "left" }}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {inventoryAlerts.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "30px",
                    textAlign: "center",
                    color: "#999",
                  }}
                >
                  No inventory alerts found.
                </td>
              </tr>
            ) : (
              inventoryAlerts.map((item) => (
                <tr
                  key={item.product_id}
                  style={{
                    borderBottom: "1px solid #EDF1F7",
                  }}
                >
                  <td
                    style={{
                      padding: "15px",
                      fontFamily: "monospace",
                      fontWeight: "600",
                    }}
                  >
                    {item.product_id}
                  </td>

                  <td style={{ padding: "15px" }}>
                    {item.product_name}
                  </td>

                  <td style={{ padding: "15px" }}>
                    {item.category}
                  </td>

                  <td style={{ padding: "15px", fontWeight: "600" }}>
                    ${Number(item.price).toFixed(2)}
                  </td>

                  <td style={{ padding: "15px" }}>
                    <span
                      style={{
                        background: "#FFE5E8",
                        color: "#EA5455",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.trigger_state}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;