import "./style.css";

import KPICard from "../../common/KPICard";
import DataGrid from "../../common/DataGrid";
import DashboardRevenue from "../DashboardRevenue";
import DashboardConversion from "../DashboardConversion";

function Dashboard() {

  const columns = [
    { header: "User", accessor: "user" },
    { header: "Department", accessor: "department" },
    { header: "Status", accessor: "status" },
    { header: "Calls", accessor: "calls" }
  ];

  const users = [
    {
      user: "Roshini",
      department: "Support",
      status: "Online",
      calls: 42
    },
    {
      user: "John",
      department: "Sales",
      status: "Busy",
      calls: 30
    },
    {
      user: "Alice",
      department: "Technical",
      status: "Offline",
      calls: 18
    },
    {
      user: "David",
      department: "Accounts",
      status: "Online",
      calls: 25
    }
  ];

  return (

    <div className="dashboard-page">

      <div className="dashboard-header">

        <div>

          <h1>Hi, Welcome Back 👋</h1>

          <p>
            Voice Agent Analytics Dashboard
          </p>

        </div>

        <div className="dashboard-buttons">

          <button>Email</button>

          <button>Print</button>

          <button className="purple">

            + Add User

          </button>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="kpi-grid">

        <KPICard
          title="Sales"
          value="$8,753"
          trend="+18%"
          color="#7367F0"
        />

        <KPICard
          title="Revenue"
          value="$12,840"
          trend="+9%"
          color="#28C76F"
        />

        <KPICard
          title="Orders"
          value="1,256"
          trend="+12%"
          color="#00CFE8"
        />

        <KPICard
          title="Customers"
          value="2,458"
          trend="+30%"
          color="#FF9F43"
        />

      </div>

      {/* Charts */}

      <div className="middle-grid">

        <DashboardRevenue />

        <DashboardConversion />

      </div>

      {/* Table */}

      <div className="table-card">

        <h3>Recent Users</h3>

        <DataGrid
          columns={columns}
          mockDatabaseSource={users}
        />

      </div>

    </div>

  );

}

export default Dashboard;