import "./style.css";

import {
  FiBell,
  FiSearch,
  FiSettings,
  FiUser,
  FiRefreshCw,
} from "react-icons/fi";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-left">

        <div className="navbar-title">

          <h2>Voice Agent Dashboard</h2>

          <span>
            Real-Time Analytics Platform
          </span>

        </div>

      </div>

      <div className="navbar-center">

        <div className="search-box">

          <FiSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search dashboards, invoices, inventory..."
          />

        </div>

      </div>

      <div className="navbar-right">

        <button className="circle-btn">
          <FiRefreshCw />
        </button>

        <button className="circle-btn notification">

          <FiBell />

          <span className="notification-dot"></span>

        </button>

        <button className="circle-btn">
          <FiSettings />
        </button>

        <div className="profile">

          <div className="avatar">

            <FiUser />

          </div>

          <div className="profile-info">

            <h4>Amirtha</h4>

            <span>Administrator</span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;