import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./App.css";

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

import LiveCalls from "./components/sections/LiveCalls";
import ApiMonitor from "./components/sections/ApiMonitor";
import Revenue from "./components/sections/Revenue";
import Inventory from "./components/sections/Inventory";

function App() {
  // 1. Initialize state from localStorage, default to 'livecalls' if empty
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("dashboard-active-tab") || "livecalls";
  });

  // Tracks whether we're in the brief transition window between pages
  const [isPageLoading, setIsPageLoading] = useState(false);

  // 2. Persist state changes to localStorage whenever activePage updates
  useEffect(() => {
    localStorage.setItem("dashboard-active-tab", activePage);
  }, [activePage]);

  // Wraps the raw setter so navigation always shows a brief loading state
  // before the next page mounts, instead of switching instantly.
  const handlePageChange = (nextPage) => {
    if (nextPage === activePage) return; //if the user clicks the same page
    setIsPageLoading(true); //setting the loading to true
    setTimeout(() => {
      setActivePage(nextPage);
      setIsPageLoading(false);
    }, 800);
  };

  const renderPage = () => {
    switch (activePage) {
      case "livecalls":
        return <LiveCalls />;
      case "api":
        return <ApiMonitor />;
      case "revenue":
        return <Revenue />;
      case "inventory":
        return <Inventory />;
      default:
        return <LiveCalls />;
    }
  };

  return (
    <div className="dashboard-root">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar
          activePage={activePage}
          setActivePage={handlePageChange}
        />
  
        <main className="dashboard-content">
          <AnimatePresence mode="wait">
            {isPageLoading ? (
              <motion.div
                key="page-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="page-loading-state"
              >
                <div className="spinner"></div>
              </motion.div>

            ) : (
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                {renderPage()}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;