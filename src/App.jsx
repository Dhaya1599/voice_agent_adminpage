import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./App.css";

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

import LiveCalls from "./components/sections/LiveCalls";
import ApiMonitor from "./components/sections/ApiMonitor";
import Revenue from "./components/sections/Revenue";
import Inventory from "./components/sections/Inventory";
import AgentMonitor from "./components/sections/AgentMonitor";

function App() {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Briefly show the loading state whenever the URL path changes
  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => setIsPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="dashboard-root">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <AnimatePresence mode="wait">
            {isPageLoading ? (
              <motion.div
                key="page-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 3.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="spinner-overlay"
              >
                <div className="spinner"></div>
              </motion.div>
            ) : (
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/livecalls" replace />} />
                  <Route path="/livecalls" element={<LiveCalls />} />
                  <Route path="/api" element={<ApiMonitor />} />
                  <Route path="/revenue" element={<Revenue />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/agents" element={<AgentMonitor />} />
                  <Route path="*" element={<Navigate to="/livecalls" replace />} />
                </Routes>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;