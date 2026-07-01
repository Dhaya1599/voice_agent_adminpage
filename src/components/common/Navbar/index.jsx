import "./style.css";

import {
  FiSearch,
  FiSettings,
  FiUser,
  FiRefreshCw,
} from "react-icons/fi";

function Navbar() {
  // Global action to trigger a clean browser reload across all dashboard panels
  const handleGlobalRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="navbar">
      
      {/* Top Left Branding Group: Keeps Logo, Title, and Subtitle inline horizontally */}
      <div className="navbar-branding">
        <div className="logo-circle">
          VA
        </div>
        
        <div className="navbar-title">
          <h3>Voice Agent Dashboard</h3>
          <span>
            Real-Time Analytics Platform
          </span>
        </div>
      </div>

      {/* Top Right Group: Fully aligned action buttons & profile details */}
      <div className="navbar-right">
        
        {/* Global Dashboard Refresh Button */}
        <button 
          className="circle-btn global-sync-btn" 
          onClick={handleGlobalRefresh}
          title="Sync Entire Dashboard"
        >
          <FiRefreshCw />
        </button>

        {/* Settings Button */}
        <button className="circle-btn" title="System Settings">
          <FiSettings />
        </button>

        {/* User Profile Block */}
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