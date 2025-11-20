import React, { useState } from "react";
import type { DataItemProps } from "./data-table-types";
import { useDataContext } from "./data-context";

type TableRow = { [key: string]: string | number };

interface VerticalDataTableProps {
  columns: DataItemProps[];
  rowLabelKey?: string | number; // Optional: which property to use as the row label
}

const VerticalDataTable: React.FC<VerticalDataTableProps> = ({
  columns,
  rowLabelKey = columns[0].key, // Default label key
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleRow = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const { displayData } = useDataContext<TableRow>();
  if (!displayData || displayData.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="space-y-4">
      {displayData.map((row, idx) => (
        <div key={idx} className="border rounded shadow">
          <button
            className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            onClick={() => toggleRow(idx)}
            aria-expanded={openIndexes.includes(idx)}
            aria-controls={`vertical-table-${idx}`}
          >
            <span className="font-semibold">
              {row[rowLabelKey] ?? `Row ${idx + 1}`}
            </span>
            <span className="ml-2">
              {openIndexes.includes(idx) ? "▲" : "▼"}
            </span>
          </button>
          {openIndexes.includes(idx) && (
            <div
              id={`vertical-table-${idx}`}
              className="overflow-x-auto w-full transition-all duration-200"
            >
              <table className="w-full min-w-[300px] border-collapse mb-2">
                <tbody>
                  {columns
                    .filter((x) => !x.hidden)
                    .map((col) => (
                      <tr key={col.key}>
                        <th className="border border-gray-300 px-3 py-2 text-left bg-gray-50 whitespace-nowrap w-1/3">
                          {col.label}
                        </th>
                        <td className="border border-gray-300 px-3 py-2 whitespace-nowrap">
                          {col.render
                            ? col.render(row[col.key], row)
                            : row[col.key]}
                        </td>
                      </tr>
                    ))}
                  {columns
                    .filter((x) => x.hidden)
                    .map((col) => (
                      <tr key={col.key}>
                        <th className="hidden">{col.label}</th>
                        <td className="hidden">{row[col.key]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

VerticalDataTable.displayName = "VerticalDataTable";
export { VerticalDataTable };
