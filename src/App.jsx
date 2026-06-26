import { useState } from "react";
import "./App.css";

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

import Dashboard from "./components/sections/Dashboard";
import LiveCalls from "./components/sections/LiveCalls";
import ApiMonitor from "./components/sections/ApiMonitor";
import Revenue from "./components/sections/Revenue";
import Inventory from "./components/sections/Inventory";

function App() {

  const [activePage, setActivePage] = useState("dashboard");

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
        return <Dashboard />;
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

          {renderPage()}

        </main>

      </div>

    </div>

  );

}

export default App;