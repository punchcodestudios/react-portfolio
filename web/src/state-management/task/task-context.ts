import { AddTaskItem, TaskItem } from "@/entities/TaskItem";
import { Dispatch } from "react";
import { TaskAction } from "./task-reducer";
import React from "react";

interface TaskContextType {
  tasks: TaskItem[];
  loading: boolean;
  error: string;
  dispatch: Dispatch<TaskAction>;
  addTask: (item: AddTaskItem) => Promise<AddTaskItem>;
}

const TaskContext = React.createContext<TaskContextType>({} as TaskContextType);
export default TaskContext;

// import { AddTaskItem, TaskItem } from "@/entities/TaskItem";
// import React from "react";
// import { Dispatch } from "react";

// interface AddTaskAction {
//   type: "ADD_TASK";
//   addTask: AddTaskItem;
// }

// interface CompleteTaskAction {
//   type: "COMPLETE_TASK";
//   taskRefid: string;
// }

// export type TaskAction = AddTaskAction | CompleteTaskAction;

// export const taskReducer = (
//   addTask: AddTaskItem,
//   tasks: TaskItem[],
//   action: TaskAction
// ): TaskItem[] => {
//   switch (action.type) {
//     case "ADD_TASK":
//       const task: TaskItem = {};
//       return [task, ...tasks];
//     case "COMPLETE_TASK":
//       return tasks.filter((t) => t.refid !== action.taskRefid);
//   }
// };

// interface TasksContextType {
//   tasks: Task[];
//   dispatch: Dispatch<TaskAction>;
// }

// const TasksContext = React.createContext<TasksContextType>(
//   {} as TasksContextType
// );

// export default TasksContext;
