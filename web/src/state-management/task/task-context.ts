import { AddTaskItem, TaskItem } from "@/entities/TaskItem";
import React, { Dispatch } from "react";
import { TaskAction } from "./task-reducer";
import { ApiResponse } from "@/api/apiResponses";

interface TaskContextType {
  taskContent: ApiResponse<TaskItem>;
  isLoading: boolean;
  error: string;
  dispatch: Dispatch<TaskAction>;
  addTask: (item: AddTaskItem) => Promise<ApiResponse<TaskItem>>;
  completeTask: (refid: string) => Promise<ApiResponse<TaskItem>>;
}

const TaskContext = React.createContext<TaskContextType>({} as TaskContextType);
export default TaskContext;
