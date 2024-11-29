import { TaskFilter } from "@/entities/TaskItem";
import React, { Dispatch } from "react";
import { TaskFilterAction } from "./task-filter-reducer";

interface TaskFilterContextType {
  taskFilter: TaskFilter;
  dispatch: Dispatch<TaskFilterAction>;
  setShowActive: (value: boolean) => void;
  setShowCompleted: (value: boolean) => void;
}

const TaskFilterContext = React.createContext<TaskFilterContextType>(
  {} as TaskFilterContextType
);
export default TaskFilterContext;
