import React from "react";
import { DataContextProvider } from "~/components/data/data-context";
import type { DataItemProps } from "~/components/data/data-table-types";
import { Button } from "~/components/ui/button";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import ResponsiveDataTable from "~/components/data/responsive-data-table";

export const initColumns: DataItemProps[] = [
  { key: "ID", label: "ID", hidden: true },
  { key: "Name", label: "Name", filterable: true, sortable: true },
  { key: "Age", label: "Age", filterable: true, sortable: true },
  { key: "City", label: "City", filterable: true, sortable: true },
  { key: "Country", label: "Country", filterable: true, sortable: true },
  { key: "Email", label: "Email", filterable: true, sortable: true },
  { key: "Phone", label: "Phone", filterable: true, sortable: true },
  { key: "Occupation", label: "Occupation", filterable: true, sortable: true },
  { key: "Company", label: "Company", filterable: true, sortable: true },
  { key: "Status", label: "Status", filterable: true, sortable: true },
  { key: "Registered", label: "Registered", filterable: true, sortable: true },
  { key: "LastLogin", label: "Last Login", filterable: true, sortable: true },
  { key: "render", label: "Actions", filterable: false, sortable: false },
];

export const initData = [
  {
    ID: 1,
    Name: "Alice Johnson",
    Age: 28,
    City: "New York",
    Country: "USA",
    Email: "alice.johnson@example.com",
    Phone: "555-1234",
    Occupation: "Engineer",
    Company: "TechCorp",
    Status: "Active",
    Registered: "2023-01-15",
    LastLogin: "2025-05-30",
  },
  {
    ID: 2,
    Name: "Bob Smith",
    Age: 34,
    City: "San Francisco",
    Country: "USA",
    Email: "bob.smith@example.com",
    Phone: "555-5678",
    Occupation: "Designer",
    Company: "Creative Inc",
    Status: "Inactive",
    Registered: "2022-11-20",
    LastLogin: "2025-05-30",
  },
  {
    ID: 3,
    Name: "Charlie Lee",
    Age: 25,
    City: "Chicago",
    Country: "USA",
    Email: "charlie.lee@example.com",
    Phone: "555-8765",
    Occupation: "Developer",
    Company: "WebWorks",
    Status: "Active",
    Registered: "2024-03-10",
    LastLogin: "2025-05-30",
  },
];

export async function loader({ params }: LoaderFunctionArgs) {
  return {
    data: {
      columns: initColumns,
      initData: [...initData],
    },
  };
}

const DataTableContainer: React.FC<{}> = () => {
  const { data } = useLoaderData();

  const actionRender = (value: string, row: Record<string, any>) => (
    <div className="flex items-center space-x-2">
      <Button
        variant="primary"
        onClick={() => {
          // console.log("row:, value: ", { row: row, value: value });
          return alert(`Edit row with ID: ${row.Name}`);
        }}
      >
        Edit
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          // console.log("row:, value: ", { row: row, value: value });
          return alert(`Delete row with ID: ${row.ID}`);
        }}
      >
        Delete
      </Button>
    </div>
  );

  const renderedColumns = data.columns.map((col: DataItemProps) =>
    col.key === "render" ? { ...col, render: actionRender } : col
  );

  return (
    <>
      <DataContextProvider<DataItemProps> initialData={data.initData}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            Responsive Data Grid with Data Context
          </h2>
          <ResponsiveDataTable
            columns={renderedColumns}
            breakpoint="lg"
            rowLabelKey="Name"
          ></ResponsiveDataTable>
        </div>
      </DataContextProvider>
    </>
  );
};

export default DataTableContainer;
