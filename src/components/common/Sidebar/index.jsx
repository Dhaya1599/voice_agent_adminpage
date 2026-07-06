import { useState, useEffect, useRef } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FiPhone,
  FiServer,
  FiDollarSign,
  FiDatabase,
  FiChevronRight,
} from "react-icons/fi";

const menus = [
  { path: "/livecalls", title: "Live Calls", icon: <FiPhone /> },
  { path: "/api", title: "API Monitor", icon: <FiServer /> },
  { path: "/revenue", title: "Revenue", icon: <FiDollarSign /> },
  { path: "/inventory", title: "Inventory", icon: <FiDatabase /> },
  { path: "/agents", title: "Agent Monitor", icon: <FiPhone /> },
];

const API_BASE = "http://localhost:8000/api/v1";
const PING_INTERVAL_MS = 5000;

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [backendStatus, setBackendStatus] = useState("checking"); // "connected" | "disconnected" | "checking"
  const intervalRef = useRef(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(`${API_BASE}/monitor/health-metrics`, {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (res.ok) {
          setBackendStatus("connected");
        } else {
          setBackendStatus("disconnected");
        }
      } catch {
        setBackendStatus("disconnected");
      }
    };

    // Initial check
    checkBackend();

    // Poll every 5 seconds
    intervalRef.current = setInterval(checkBackend, PING_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const statusConfig = {
    connected: {
      dotClass: "system-status system-status--connected",
      label: "System Status",
      text: "Backend Connected",
    },
    disconnected: {
      dotClass: "system-status system-status--disconnected",
      label: "System Status",
      text: "Backend Disconnected",
    },
    checking: {
      dotClass: "system-status system-status--checking",
      label: "System Status",
      text: "Checking...",
    },
  };

  const status = statusConfig[backendStatus];

  return (
    <aside className="sidebar">

      <nav className="sidebar-menu">

        {menus.map((menu) => (

          <button
            key={menu.path}
            className={
              location.pathname === menu.path ? "menu-active" : "menu" }
            
            onClick={() => navigate(menu.path)}
          >

            <div className="menu-left">

              <div className="menu-icon">
                {menu.icon}
              </div>

              <span>
                {menu.title}
              </span>

            </div>

            <FiChevronRight className="menu-arrow" />

          </button>

        ))}

      </nav>

      <div className={`sidebar-footer ${backendStatus === "disconnected" ? "sidebar-footer--warn" : ""}`}>

        <div className={status.dotClass}></div>

        <div>

          <strong>{status.label}</strong>

          <p>{status.text}</p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;