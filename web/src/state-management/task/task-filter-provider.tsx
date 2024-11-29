import { TaskFilter } from "@/entities/TaskItem";
import React, { useReducer, useState } from "react";
import TaskFilterContext from "./task-filter-context";
import taskFilterReducer from "./task-filter-reducer";

interface Props {
  children: React.ReactNode;
}

const initialValues: TaskFilter = {
  showActive: true,
  showCompleted: false,
};
const TaskFilterProvider = ({ children }: Props) => {
  const [taskFilter, dispatch] = useReducer(taskFilterReducer, initialValues);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const setShowActive = async (value: boolean): Promise<void> => {
    dispatch({ type: "SET_SHOW_ACTIVE", payload: value });
  };

  const setShowCompleted = async (value: boolean): Promise<void> => {
    dispatch({ type: "SET_SHOW_COMPLETED", payload: value });
  };

  return (
    <TaskFilterContext.Provider
      value={{
        taskFilter,
        dispatch,
        setShowActive,
        setShowCompleted,
      }}
    >
      {children}
    </TaskFilterContext.Provider>
  );
};

export default TaskFilterProvider;
