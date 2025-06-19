import React from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { useDataContext } from "./dataContext";

import { SortDirection } from "~/utils/enums";
import VerticalExpandCard from "../ui/verticalExpandCard";
import type { TableColumn } from "./dataTableTypes";
import type { SelectOption } from "~/entities/site";

// need to put zod into here .. no form
const SortFormSchema = z.object({
  selectedSortColumn: z.string().min(1, "Sort column is required"),
  selectedSortDirection: z.string().min(1, "Sort direction is required"),
});

// Define the Filter type/schema
export const SortSchema = z.object({
  direction: z.string(),
});

// TypeScript type for Filter
export type Sort = z.infer<typeof SortSchema>;

// The main schema for Record<string | number, Filter[]>
export const SortRecordSchema = z.record(
  z.union([z.string(), z.number()]),
  z.array(SortSchema)
);

type DataSortHeaderProps = {
  headerText: string;
  showClearSort: boolean;
  onClearSort: () => void;
};

const DataSortHeader: React.FC<DataSortHeaderProps> = ({
  headerText,
  onClearSort,
}: DataSortHeaderProps) => {
  const { errors } = useDataContext();

  return (
    // <div className="border rounded shadow bg-white w-full">
    <div className="flex w-full items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{headerText}</span>
        {errors && errors["sort"] && (
          <span className="text-red-600 text-sm ml-2">{`${errors["sort"]}`}</span>
        )}
      </div>
    </div>
  );
};

type DataSortBodyProps = {
  sortColumns: TableColumn[];
  currSortColumn: string;
  onSortColumnChange: (value: string) => void;
  sortDirections: SelectOption<SortDirection>[];
  currSortDirection: string;
  onSortDirectionChange: (value: SortDirection) => void;
};

const DataSortBody: React.FC<DataSortBodyProps> = ({
  sortColumns,
  currSortColumn,
  onSortColumnChange,
  sortDirections,
  currSortDirection,
  onSortDirectionChange,
}: DataSortBodyProps) => {
  return (
    <>
      {/* DataSort Body*/}
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-2 md:space-y-0 lg:space-x-4">
        {/* DataSort Columns*/}
        <div className="w-full xl:w-1/2 mb-2 xl:mb-0">
          <select
            className="bg-background border border-gray-400 rounded w-full p-2"
            value={currSortColumn}
            onChange={(e) => onSortColumnChange(e.target.value)}
          >
            <option value="">Select Column</option>
            {sortColumns.map((col) => (
              <option key={col.key} value={col.label}>
                {col.label}
              </option>
            ))}
          </select>
        </div>
        {/* DataSort Actions*/}
        <div className="w-full xl:w-1/2 mb-2 xl:mb-0">
          <select
            className="bg-background border border-gray-400 rounded w-full p-2"
            value={currSortDirection}
            onChange={(e) =>
              onSortDirectionChange(e.currentTarget.value as SortDirection)
            }
          >
            {sortDirections.map((col) => (
              <option key={col.key} value={col.label}>
                {col.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

type DataSortFooterProps = {
  onApplySort: () => void;
  onCancelSort: () => void;
};

const DataSortFooter: React.FC<DataSortFooterProps> = ({
  onApplySort,
  onCancelSort,
}: DataSortFooterProps) => {
  return (
    <div className="flex flex-row justify-end space-x-2">
      <Button
        variant="primary"
        className="w-full text-left"
        onClick={onCancelSort}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        className="w-full text-left"
        onClick={onApplySort}
      >
        Apply
      </Button>
    </div>
  );
};

type DataSortContainerProps = {
  columns: TableColumn[];
};

const DataSortContainer: React.FC<DataSortContainerProps> = ({
  columns,
}: DataSortContainerProps) => {
  const { setSort, setRefreshData, errors, setErrors } = useDataContext();
  const [currSortColumn, setCurrSortColumn] = React.useState<string>("");
  const [currSortDirection, setCurrSortDirection] =
    React.useState<SortDirection>(SortDirection.ASC);

  const sortColumns = columns.filter((col) => !col.hidden && col.sortable);

  const handleSortColumnChange = (value: string) => {
    setCurrSortColumn(value);
  };

  const handleSortDirectionChange = (value: SortDirection) => {
    setCurrSortDirection(value);
  };

  const handleApplySort = () => {
    if (!currSortColumn || !currSortDirection) {
      setErrors({ ...errors, sort: "All sort fields must be filled out" });
      return;
    }

    setSort({ key: currSortColumn, direction: currSortDirection });
    setRefreshData(new Date().getTime());
  };

  const handleClearSort = () => {
    const newRecord = Object.fromEntries(
      Object.entries({ ...errors }).filter(([key]) => key !== "sort")
    );
    setErrors(() => {
      return newRecord as Record<string | number, string>;
    });
    setCurrSortColumn("");
    setCurrSortDirection(SortDirection.ASC);
    setRefreshData(new Date().getTime());
  };

  const handleCancelSort = () => {
    const newRecord = Object.fromEntries(
      Object.entries({ ...errors }).filter(([key]) => key !== "sort")
    );
    setErrors(() => {
      return newRecord as Record<string | number, string>;
    });
    setCurrSortColumn("");
    setCurrSortDirection(SortDirection.ASC);
  };

  const sortDirections: SelectOption<SortDirection>[] = [
    { key: SortDirection.ASC, value: SortDirection.ASC, label: "Ascending" },
    { key: SortDirection.DESC, value: SortDirection.DESC, label: "Descending" },
  ];

  return (
    <div className="mb-2">
      <VerticalExpandCard
        header={
          <DataSortHeader
            headerText="Data Sort"
            onClearSort={handleClearSort}
            showClearSort={true}
          />
        }
        body={
          <DataSortBody
            sortColumns={sortColumns}
            currSortColumn={currSortColumn}
            onSortColumnChange={handleSortColumnChange}
            sortDirections={sortDirections}
            currSortDirection={currSortDirection}
            onSortDirectionChange={handleSortDirectionChange}
          ></DataSortBody>
        }
        footer={
          <DataSortFooter
            onApplySort={handleApplySort}
            onCancelSort={handleCancelSort}
          />
        }
      ></VerticalExpandCard>
    </div>
  );
};

export default DataSortContainer;
