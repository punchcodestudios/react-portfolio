import React from "react";
import type { TableColumn, TableRow } from "./dataTableTypes";
import { useDataContext } from "./dataContext";

interface DataTableProps {
  columns: TableColumn[];
}

const HorizontalDataTable: React.FC<DataTableProps> = ({ columns }) => {
  const { displayData } = useDataContext<TableRow>();
  if (!displayData || displayData.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="border-collapse w-full text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`border border-gray-300 bg-gray-100 px-3 py-2 text-left whitespace-nowrap ${
                  col.hidden ? "hidden" : ""
                } `}
              >
                <div className="flex justify-between items-center">
                  {col.label}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((row, idx) => (
            <tr key={idx}>
              {columns
                .filter((x) => !x.hidden)
                .map((col) => (
                  <td
                    key={col.key}
                    className="border border-gray-300 px-3 py-2 whitespace-nowrap"
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorizontalDataTable;
