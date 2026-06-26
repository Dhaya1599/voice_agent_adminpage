import "./style.css";

const tableData = [
  {
    invoice: "INV-1001",
    tenant: "Acme Telecom",
    minutes: 325,
    amount: "$425",
    status: "Paid",
  },
  {
    invoice: "INV-1002",
    tenant: "VoiceHub AI",
    minutes: 542,
    amount: "$790",
    status: "Pending",
  },
  {
    invoice: "INV-1003",
    tenant: "Nova Systems",
    minutes: 187,
    amount: "$240",
    status: "Completed",
  },
  {
    invoice: "INV-1004",
    tenant: "Cloud Connect",
    minutes: 611,
    amount: "$980",
    status: "Failed",
  },
  {
    invoice: "INV-1005",
    tenant: "Smart Dial",
    minutes: 456,
    amount: "$610",
    status: "Paid",
  },
];

function badge(status) {
  switch (status) {
    case "Paid":
      return "badge green";

    case "Pending":
      return "badge orange";

    case "Completed":
      return "badge blue";

    default:
      return "badge red";
  }
}

function DataGrid() {
  return (
    <div className="table-card">

      <div className="table-header">

        <h2>Accounts & Ledger Audit Entries</h2>

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      <table>

        <thead>

          <tr>

            <th>Invoice</th>

            <th>Tenant</th>

            <th>Minutes</th>

            <th>Amount</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {tableData.map((item) => (

            <tr key={item.invoice}>

              <td>{item.invoice}</td>

              <td>{item.tenant}</td>

              <td>{item.minutes}</td>

              <td>{item.amount}</td>

              <td>

                <span className={badge(item.status)}>
                  {item.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DataGrid;