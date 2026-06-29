import { useMemo, useState } from "react";
import "./style.css";

function getBadge(status) {
  switch (status?.toLowerCase()) {
    case "paid":
      return "badge green";

    case "pending":
      return "badge orange";

    case "completed":
      return "badge blue";

    default:
      return "badge red";
  }
}

function DataGrid({
  title = "Accounts & Ledger Audit Entries",
  columns = [],
  data = [],
  rowsPerPage = 5,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / rowsPerPage)
  );

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="table-card">

      <div className="table-header">

        <h2>{title}</h2>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

      </div>

      <table>

        <thead>

          <tr>

            {columns.map((column) => (
              <th key={column.key}>
                {column.label}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {paginatedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="empty-table"
              >
                No Records Found
              </td>
            </tr>
          )}

          {paginatedData.map((row, index) => (
            <tr key={index}>

              {columns.map((column) => (

                <td key={column.key}>

                  {column.key === "status" ? (
                    <span className={getBadge(row[column.key])}>
                      {row[column.key]}
                    </span>
                  ) : (
                    row[column.key]
                  )}

                </td>

              ))}

            </tr>
          ))}

        </tbody>

      </table>

      <div className="pagination">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default DataGrid;