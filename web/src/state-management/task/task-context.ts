import React from "react";
import { Dispatch } from "react";

export interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: "ADD_TASK";
  task: Task;
}

interface DeleteTask {
  type: "DELETE_TASK";
  taskId: number;
}

export type TaskAction = AddTask | DeleteTask;

export const taskReducer = (tasks: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [action.task, ...tasks];
    case "DELETE_TASK":
      return tasks.filter((t) => t.id !== action.taskId);
  }
};

interface TasksContextType {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
}

const TasksContext = React.createContext<TasksContextType>(
  {} as TasksContextType
);

export default TasksContext;
