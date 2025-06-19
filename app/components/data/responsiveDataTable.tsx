import React from "react";
import DataFilterContainer from "./dataFilterContainer";
import DataPager from "./dataPager";
import DataSortContainer from "./dataSortContainer";
import type { TableColumn } from "./dataTableTypes";
import HorizontalDataTable from "./horizontalDataTable";
import VerticalDataTable from "./verticalDataTable";

interface ResponsiveDataTableProps {
  dataColumns: TableColumn[];
  rowLabelKey?: string | number;
  breakpoint: "sm" | "md" | "lg" | "xl";
}

const ResponsiveDataTable: React.FC<ResponsiveDataTableProps> = ({
  rowLabelKey,
  dataColumns,
  breakpoint = "lg", // this should be configurable
}) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-[50%]">
          <DataSortContainer columns={dataColumns}></DataSortContainer>
        </div>
        <div className="w-full lg:w-[50%]">
          <DataFilterContainer columns={dataColumns}></DataFilterContainer>
        </div>
      </div>
      <div className="block lg:hidden w-full border mb-3 border-solid border-b-gray-600 ">
        <div className="font-header font-semibold m-4">Data:</div>
      </div>
      <div className={`hidden lg:block`}>
        <HorizontalDataTable columns={dataColumns} />
      </div>
      <div className={`block lg:hidden`}>
        <VerticalDataTable columns={dataColumns} rowLabelKey={rowLabelKey} />
      </div>
      <DataPager></DataPager>
    </>
  );
};

export default ResponsiveDataTable;
