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


function Sidebar() {
  const loaction = useLocation();
  const navigate = useNavigate();
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

      <div className="sidebar-footer">

        <div className="system-status"></div>

        <div>

          <strong>System Status</strong>

          <p>Backend Connected</p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;