import { ReactNode, useReducer } from "react";
import TasksContext from "./task-context";

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

const taskReducer = (tasks: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [action.task, ...tasks];
    case "DELETE_TASK":
      return tasks.filter((t) => t.id !== action.taskId);
  }
};

interface Props {
  children: ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TaskProvider;
