import React from "react";
import { DataFilterContainer } from "./data-filter-container";
import { DataPager } from "./data-pager";
import { DataSortContainer } from "./data-sort-container";
import type { DataItemProps } from "./data-table-types";
import { HorizontalDataTable } from "./horizontal-data-table";
import VerticalDataTable from "./vertical-data-table";

interface ResponsiveDataTableProps {
  columns: DataItemProps[];
  rowLabelKey?: string | number;
  breakpoint: "sm" | "md" | "lg" | "xl";
}

const ResponsiveDataTable: React.FC<ResponsiveDataTableProps> = ({
  rowLabelKey,
  columns,
  breakpoint = "lg", // this should be configurable
}) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-[50%]">
          <DataFilterContainer columns={columns}></DataFilterContainer>
        </div>
        <div className="w-full lg:w-[50%]">
          <DataSortContainer columns={columns}></DataSortContainer>
        </div>
      </div>
      <div className="block lg:hidden w-full border mb-3 border-solid border-b-gray-600 ">
        <div className="font-header font-semibold m-4">Data:</div>
      </div>
      <div className={`hidden lg:block`}>
        <HorizontalDataTable columns={columns} />
      </div>
      <div className={`block lg:hidden`}>
        <VerticalDataTable columns={columns} rowLabelKey={rowLabelKey} />
      </div>
      <DataPager></DataPager>
    </>
  );
};

ResponsiveDataTable.displayName = "ResponsiveDataTable";
export { ResponsiveDataTable };
