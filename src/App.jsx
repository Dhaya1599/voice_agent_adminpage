import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./App.css";

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

import LiveCalls from "./components/sections/LiveCalls";
import ApiMonitor from "./components/sections/ApiMonitor";
import Revenue from "./components/sections/Revenue";
import Inventory from "./components/sections/Inventory";

function App() {
  // Sets livecalls seamlessly as the base homepage tab
  const [activePage, setActivePage] = useState("livecalls");

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
        // Graceful fallback to LiveCalls to prevent blank screen states
        return <LiveCalls />;
    }
  };

  return (
    <div className="dashboard-root">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <main className="dashboard-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;