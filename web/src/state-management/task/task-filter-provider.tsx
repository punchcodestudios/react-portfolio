import { TaskFilter } from "@/entities/TaskItem";
import React, { useReducer } from "react";
import TaskFilterContext from "./task-filter-context";
import taskFilterReducer from "./task-filter-reducer";

interface Props {
  children: React.ReactNode;
}

const initialValues: TaskFilter = {
  showActive: true,
  showCompleted: false,
  pageSize: 5,
  currentPage: 1,
};

const TaskFilterProvider = ({ children }: Props) => {
  const [taskFilter, dispatch] = useReducer(taskFilterReducer, initialValues);

  const setShowActive = async (value: boolean): Promise<void> => {
    dispatch({ type: "SET_SHOW_ACTIVE", payload: value });
  };

  const setShowCompleted = async (value: boolean): Promise<void> => {
    dispatch({ type: "SET_SHOW_COMPLETED", payload: value });
  };

  const setCurrentPage = async (value: number): Promise<void> => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: value });
  };

  return (
    <TaskFilterContext.Provider
      value={{
        taskFilter,
        dispatch,
        setShowActive,
        setShowCompleted,
        setCurrentPage,
      }}
    >
      {children}
    </TaskFilterContext.Provider>
  );
};

export default TaskFilterProvider;
