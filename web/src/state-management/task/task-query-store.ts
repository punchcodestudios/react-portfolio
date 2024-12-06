import { create } from "zustand";

export interface TaskQuery {
  showActive?: boolean;
  showCompleted?: boolean;
  currentPage: number | 1;
  pageSize: number | 99;
  searchText?: string;
}

interface TaskQueryStore {
  taskQuery: TaskQuery;
  setShowActive: (showActive: boolean) => void;
  setShowCompleted: (showCompleted: boolean) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearchText: (searchText: string) => void;
}

const initialValues: TaskQuery = {
  showActive: true,
  showCompleted: false,
  currentPage: 1,
  pageSize: 5,
  searchText: "",
};

const useTaskQueryStore = create<TaskQueryStore>((set) => ({
  taskQuery: initialValues,
  setShowActive: (showActive) =>
    set((store) => ({ taskQuery: { ...store.taskQuery, showActive } })),
  setShowCompleted: (showCompleted) =>
    set((store) => ({ taskQuery: { ...store.taskQuery, showCompleted } })),
  setCurrentPage: (currentPage) =>
    set((store) => ({ taskQuery: { ...store.taskQuery, currentPage } })),
  setPageSize: (pageSize) =>
    set((store) => ({ taskQuery: { ...store.taskQuery, pageSize } })),
  setSearchText: (searchText) =>
    set((store) => ({ taskQuery: { ...store.taskQuery, searchText } })),
}));

export default useTaskQueryStore;
