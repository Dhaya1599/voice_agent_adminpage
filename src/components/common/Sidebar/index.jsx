import "./style.css";

import {
  FiPhone,
  FiServer,
  FiDollarSign,
  FiDatabase,
  FiChevronRight,
} from "react-icons/fi";

const menus = [
  {
    id: "livecalls",
    title: "Live Calls",
    icon: <FiPhone />,
  },
  {
    id: "api",
    title: "API Monitor",
    icon: <FiServer />,
  },
  {
    id: "revenue",
    title: "Revenue",
    icon: <FiDollarSign />,
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: <FiDatabase />,
  },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">

      <div className="logo">

        <div className="logo-circle">
          VA
        </div>

        <div className="logo-text">

          <h2>Voice Admin</h2>

          <p>Management Portal</p>

        </div>

      </div>

      <div className="sidebar-label">
        NAVIGATION
      </div>

      <nav className="sidebar-menu">

        {menus.map((menu) => (

          <button
            key={menu.id}
            className={
              activePage === menu.id
                ? "menu active"
                : "menu"
            }
            onClick={() => setActivePage(menu.id)}
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