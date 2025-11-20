export type TableRow = { [key: string]: string | number };
import React from "react";
import type { SortDirection } from "~/utils/enums";

export type DataItemProps = {
  key: string;
  label: string;
  hidden?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  type?: string;
  value?: React.ReactNode;
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
};

export type Filter = {
  action: string; // e.g., "equals", "contains", etc.
  value: string | number; // The value to filter by
};

export type Sort = {
  direction: SortDirection;
};

export type TableTheme = {
  striped: boolean;
  oddRowColor?: string;
  evenRowColor?: string;
  selectionColor?: string;
  headerColor?: string;
};

export type TableProps<T> = {
  data: T[];
  columns: DataItemProps[];
  theme?: TableTheme;
};
