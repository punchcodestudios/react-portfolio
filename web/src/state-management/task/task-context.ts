import { AddTaskItem, TaskItem } from "@/entities/TaskItem";
import React, { Dispatch } from "react";
import { TaskAction } from "./task-reducer";

interface TaskContextType {
  tasks: TaskItem[];
  loading: boolean;
  error: string;
  dispatch: Dispatch<TaskAction>;
  addTask: (item: AddTaskItem) => Promise<TaskItem>;
  completeTask: (refid: string) => Promise<TaskItem>;
}

const TaskContext = React.createContext<TaskContextType>({} as TaskContextType);
export default TaskContext;
