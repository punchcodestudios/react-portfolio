import { AddTaskItem, TaskItem, TaskResponse } from "@/entities/TaskItem";
import { addTask, completeTask, getTasks } from "../api/taskApi";
import { TaskQuery } from "@/state-management/task/task-query-store";
import { ApiResponse } from "@/api/apiResponses";

const TaskService = {
  getTasks: async (query: TaskQuery) => {
    try {
      const response = await getTasks(query);
      console.log("response: ", response);
      return Promise.resolve(map(response));
    } catch (error: any) {
      // console.error("Error fetching tasks: ", error);
      return Promise.resolve(map(error));
    }
  },
  addTask: async (task: AddTaskItem) => {
    try {
      const response = await addTask(task);
      return Promise.resolve(map(response));
    } catch (error: any) {
      // console.error("Error adding tasks: ", error);
      return Promise.resolve(map(error));
    }
  },
  completeTask: async (refid: string) => {
    try {
      const response = await completeTask(refid);
      return Promise.resolve(map(response));
    } catch (error: any) {
      // console.error("Error completing tasks", error);
      return Promise.resolve(map(error));
    }
  },
};

export default TaskService;

const map = (item: ApiResponse<TaskItem>): TaskResponse => {
  // console.log("map: ", item);
  const res = {
    target: item.content.target,
    meta: item.content.meta,
    error: item.content.error,
  } as TaskResponse;

  return res;
};
