import { TaskItem } from "@/entities/TaskItem";
import React, { Dispatch } from "react";
import { TaskAction } from "./task-reducer";

interface TaskContextType {
  tasks: TaskItem[];
  dispatch: Dispatch<TaskAction>;
}

const TaskContext = React.createContext<TaskContextType>({} as TaskContextType);
export default TaskContext;
