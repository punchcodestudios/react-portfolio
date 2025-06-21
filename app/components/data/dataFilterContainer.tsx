import React, { useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { useDataContext } from "./dataContext";

import { FilterAction } from "~/utils/enums";
import { Input } from "../ui/input";
import VerticalExpandCard from "../ui/verticalExpandCard";
import type { DataItemProps } from "./dataTableTypes";
import type { SelectOption } from "~/entities/site";

// need to put zod into here .. no form
const FilterFormSchema = z.object({
  selectedFilterColumn: z.string().min(1, "Filter column is required"),
  selectedFilterAction: z.string().min(1, "Filter action is required"),
  selectedFilterValue: z.string().min(1, "Filter value is required"),
});

// Define the Filter type/schema
export const FilterSchema = z.object({
  action: z.string(),
  value: z.string(),
});

// TypeScript type for Filter
export type Filter = z.infer<typeof FilterSchema>;

// The main schema for Record<string | number, Filter[]>
export const FiltersRecordSchema = z.record(
  z.union([z.string(), z.number()]),
  z.array(FilterSchema)
);

type DataFilterHeaderProps = {
  headerText: string;
  showClearFilter: boolean;
  onClearFilter: () => void;
};

const DataFilterHeader: React.FC<DataFilterHeaderProps> = ({
  headerText,
  onClearFilter,
}: DataFilterHeaderProps) => {
  const { errors, filters } = useDataContext();
  const showClearFilter = filters;
  return (
    // <div className="border rounded shadow bg-white w-full">
    <div className="flex w-full items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{headerText}</span>
        {errors && errors["filter"] && (
          <span className="text-red-600 text-sm ml-2">{errors["filter"]}</span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {showClearFilter && (
          <button
            className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClearFilter}
            type="button"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

type DataFilterBodyProps = {
  filterColumns: DataItemProps[];
  currFilterColumn: string;
  onFilterColumnChange: (value: string) => void;
  filterActions: SelectOption<FilterAction>[];
  currFilterAction: string;
  onFilterActionChange: (value: FilterAction) => void;
  currFilterValue: string;
  onFilterValueChange: (value: string) => void;
};

const DataFilterBody: React.FC<DataFilterBodyProps> = ({
  filterColumns,
  currFilterColumn,
  onFilterColumnChange,
  filterActions,
  currFilterAction,
  onFilterActionChange,
  currFilterValue,
  onFilterValueChange,
}: DataFilterBodyProps) => {
  return (
    <>
      {/* DataFilter Body*/}
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-2 md:space-y-0 lg:space-x-4">
        {/* DataFilter Columns*/}
        <div className="w-full xl:w-1/3 mb-2 xl:mb-0">
          <select
            className="bg-background border border-gray-400 rounded w-full p-2"
            value={currFilterColumn}
            onChange={(e) => onFilterColumnChange(e.target.value)}
          >
            <option value="">Select Column</option>
            {filterColumns.map((col) => (
              <option key={col.key} value={col.label}>
                {col.label}
              </option>
            ))}
          </select>
        </div>
        {/* DataFilter Actions*/}
        <div className="w-full xl:w-1/3 mb-2 xl:mb-0">
          <select
            className="bg-background border border-gray-400 rounded w-full p-2"
            value={currFilterAction}
            onChange={(e) =>
              onFilterActionChange(e.currentTarget.value as FilterAction)
            }
          >
            <option value="">Select Action</option>
            {filterActions.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
        </div>
        {/* DataFilter Value*/}
        <div className="w-full xl:w-1/3 mb-2 xl:mb-0">
          <Input
            placeholder="Filter Value"
            value={currFilterValue}
            onChange={(e) => {
              onFilterValueChange(e.currentTarget.value);
            }}
          ></Input>
        </div>
      </div>
    </>
  );
};

type DataFilterFooterProps = {
  onApplyFilter: () => void;
  onCancelFilter: () => void;
};

const DataFilterFooter: React.FC<DataFilterFooterProps> = ({
  onApplyFilter,
  onCancelFilter,
}: DataFilterFooterProps) => {
  return (
    <div className="flex flex-row justify-end space-x-2">
      <Button
        variant="primary"
        className="w-full text-left"
        onClick={onCancelFilter}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        className="w-full text-left"
        onClick={onApplyFilter}
      >
        Apply
      </Button>
    </div>
  );
};

type DataFilterContainerProps = {
  columns: DataItemProps[];
};

const DataFilterContainer: React.FC<DataFilterContainerProps> = ({
  columns,
}: DataFilterContainerProps) => {
  const { setFilters, setRefreshData, errors, setErrors } = useDataContext();
  const filterColumns = columns.filter((col) => !col.hidden && col.filterable);

  //filter actions should move to a utility: ie.utility.getFilterActions() or possibly a config: dataFilterConfig.json
  const filterActions: SelectOption<FilterAction>[] = [
    {
      key: FilterAction.EQUALS,
      value: FilterAction.EQUALS,
      label: FilterAction.EQUALS.toString(),
    },
    {
      key: FilterAction.CONTAINS,
      value: FilterAction.CONTAINS,
      label: FilterAction.CONTAINS.toString(),
    },
    {
      key: FilterAction.GREATER_THAN,
      value: FilterAction.GREATER_THAN,
      label: FilterAction.GREATER_THAN.toString(),
    },
    {
      key: FilterAction.LESS_THAN,
      value: FilterAction.LESS_THAN,
      label: FilterAction.LESS_THAN.toString(),
    },

    {
      key: FilterAction.IS_NULL,
      value: FilterAction.IS_NULL,
      label: FilterAction.IS_NULL.toString(),
    },
    {
      key: FilterAction.IS_NOT_NULL,
      value: FilterAction.IS_NOT_NULL,
      label: FilterAction.IS_NOT_NULL.toString(),
    },
    // { key: FilterAction.STARTS_WITH, label: FilterAction.STARTS_WITH.toString() },
    // { key: FilterAction.ENDS_WITH, label: FilterAction.ENDS_WITH.toString() },
    // { key: FilterAction.IN, label: FilterAction.IN.toString() },
    // { key: FilterAction.NOT_IN, label: FilterAction.NOT_IN.toString() },
  ];

  const [currFilterColumn, setCurrFilterColumn] = React.useState("");
  const [currFilterAction, setCurrFilterAction] = React.useState("");
  const [currFilterValue, setCurrFilterValue] = React.useState("");

  const handleFilterColumnChange = (value: string) => {
    setCurrFilterColumn(value);
  };

  const handleFilterActionChange = (value: FilterAction) => {
    setCurrFilterAction(value);
  };

  const handleFilterValueChange = (value: string) => {
    setCurrFilterValue(value);
  };

  const handleApplyFilter = () => {
    if (!currFilterColumn || !currFilterAction || !currFilterValue) {
      setErrors({ ...errors, filter: "All filter fields must be filled out" });
      console.log(errors);
      return;
    }

    setFilters(() => {
      const newFilter: Filter = {
        action: currFilterAction,
        value: currFilterValue,
      };

      const newFilters = {} as Record<string | number, Filter[]>;
      newFilters[currFilterColumn] = [newFilter];
      return newFilters;
    });

    setRefreshData(new Date().getTime());
  };

  const handleClearFilter = () => {
    const newRecord = Object.fromEntries(
      Object.entries({ ...errors }).filter(([key]) => key !== "filter")
    );
    setErrors(() => {
      return newRecord as Record<string | number, string>;
    });
    setCurrFilterColumn("");
    setCurrFilterAction("");
    setCurrFilterValue("");
    setFilters(null);
    setRefreshData(new Date().getTime());
  };

  const handleCancelFilter = () => {
    const newRecord = Object.fromEntries(
      Object.entries({ ...errors }).filter(([key]) => key !== "filter")
    );
    setErrors(() => {
      return newRecord as Record<string | number, string>;
    });
    setCurrFilterColumn("");
    setCurrFilterAction("");
    setCurrFilterValue("");
    console.log("dataFilter.handleCancelFilter(): ", handleCancelFilter);
  };

  return (
    <VerticalExpandCard
      header={
        <DataFilterHeader
          headerText="Data Filter"
          onClearFilter={handleClearFilter}
          showClearFilter={true}
        />
      }
      body={
        <DataFilterBody
          filterColumns={filterColumns}
          currFilterColumn={currFilterColumn}
          onFilterColumnChange={handleFilterColumnChange}
          filterActions={filterActions}
          currFilterAction={currFilterAction}
          onFilterActionChange={handleFilterActionChange}
          currFilterValue={currFilterValue}
          onFilterValueChange={handleFilterValueChange}
        ></DataFilterBody>
      }
      footer={
        <DataFilterFooter
          onApplyFilter={handleApplyFilter}
          onCancelFilter={handleCancelFilter}
        />
      }
    ></VerticalExpandCard>
  );
};

export default DataFilterContainer;
