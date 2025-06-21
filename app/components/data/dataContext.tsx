import React, { createContext, useContext, useState, useEffect } from "react";
import type { Filter } from "./dataTableTypes";
import { FilterAction, SortDirection } from "~/utils/enums";

type TableRow = { [key: string]: any };

export interface DataContextType<T> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  displayData: T[];
  setDisplayData: React.Dispatch<React.SetStateAction<T[]>>;
  selectedRows: Set<number>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
  filters: Record<string | number, Filter[]> | null;
  setFilters: React.Dispatch<
    React.SetStateAction<Record<string | number, Filter[]> | null>
  >;
  sort: { key: string; direction: SortDirection } | null;
  setSort: React.Dispatch<
    React.SetStateAction<{ key: string; direction: SortDirection } | null>
  >;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  refreshData: number;
  setRefreshData: React.Dispatch<React.SetStateAction<number>>;
  errors: Record<string | number, string> | null;
  setErrors: React.Dispatch<
    React.SetStateAction<Record<string | number, string> | null>
  >;
}

const DataContext = createContext<DataContextType<any> | undefined>(undefined);

export function useDataContext<T>() {
  const ctx = useContext(DataContext) as DataContextType<T> | undefined;
  if (!ctx) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return ctx;
}

interface DataContextProviderProps<T> {
  initialData: T[];
  children: React.ReactNode;
}

export function DataContextProvider<T>({
  initialData,
  children,
}: DataContextProviderProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<Record<
    string | number,
    Filter[]
  > | null>(null);

  const [sort, setSort] = useState<{
    key: string;
    direction: SortDirection;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [displayData, setDisplayData] = useState<T[]>(initialData);
  const [refreshData, setRefreshData] = useState<number>(new Date().getTime());
  const [errors, setErrors] = useState<Record<string | number, string> | null>(
    null
  );

  useEffect(() => {
    let filteredData = data;
    // Filtering logic
    // console.log("Applying filters:", { filters: filters, row: rowsPerPage });
    if (filters) {
      Object.keys(filters).forEach((columnKey) => {
        const columnFilters = filters[columnKey];
        // console.log("Applying filters:", {
        //   filters: filters,
        //   columnFilters: columnFilters,
        // });
        columnFilters.forEach((filter) => {
          filteredData = filteredData.filter((row: any) => {
            const cellValue = row[columnKey.toLowerCase()] || row[columnKey];
            // console.log("inside foreach:", {
            //   row: row,
            //   columnKey: columnKey,
            //   cellValue: cellValue,
            // });
            switch (filter.action) {
              case FilterAction.EQUALS:
                return cellValue === filter.value;
              case FilterAction.CONTAINS:
                return String(cellValue).includes(String(filter.value));
              case FilterAction.GREATER_THAN:
                return +cellValue > +filter.value;
              case FilterAction.LESS_THAN:
                return +cellValue < +filter.value;
              case FilterAction.STARTS_WITH:
                return String(cellValue).startsWith(String(filter.value));
              case FilterAction.ENDS_WITH:
                return String(cellValue).endsWith(String(filter.value));
              case FilterAction.IN:
                return (
                  Array.isArray(filter.value) &&
                  filter.value.includes(cellValue)
                );
              case FilterAction.NOT_IN:
                return !(
                  Array.isArray(filter.value) &&
                  filter.value.includes(cellValue)
                );
              case FilterAction.IS_NULL:
                return cellValue === null || cellValue === undefined;
              case FilterAction.IS_NOT_NULL:
                return cellValue !== null && cellValue !== undefined;
              default:
                return true;
            }
          });
        });
      });
    }
    // --- SORT LOGIC ---
    if (sort && sort.key) {
      console.log("Sorting data by:", sort);
      filteredData = [...filteredData].sort((a: any, b: any) => {
        const aValue = a[sort.key.toLowerCase()] || a[sort.key];
        const bValue = b[sort.key.toLowerCase()] || b[sort.key];
        console.log("Comparing values:", {
          filteredData: filteredData,
          aValue: aValue,
          bValue: bValue,
          direction: sort.direction,
        });
        if (aValue == null && bValue == null) return 0;
        if (aValue == null)
          return sort.direction === SortDirection.ASC ? -1 : 1;
        if (bValue == null)
          return sort.direction === SortDirection.ASC ? 1 : -1;
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sort.direction === SortDirection.ASC
            ? aValue - bValue
            : bValue - aValue;
        }
        return sort.direction === SortDirection.ASC
          ? String(aValue)
              .toLowerCase()
              .localeCompare(String(bValue).toLowerCase())
          : String(bValue)
              .toLowerCase()
              .localeCompare(String(aValue).toLowerCase());
      });
    }
    // --- END SORT LOGIC ---
    // Pagination
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    setDisplayData(paginatedData);
    setTotalItems(filteredData.length);
  }, [refreshData, data, filters, sort, currentPage, rowsPerPage]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        displayData,
        setDisplayData,
        selectedRows,
        setSelectedRows,
        filters,
        setFilters,
        sort,
        setSort,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        setRowsPerPage,
        totalItems,
        setTotalItems,
        refreshData,
        setRefreshData,
        errors,
        setErrors,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
