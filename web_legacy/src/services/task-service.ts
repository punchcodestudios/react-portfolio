import {
  AddTaskItem,
  EditTaskItem,
  TaskItem,
  TaskResponse,
} from "@/entities/TaskItem";
import {
  addTask,
  completeTask,
  getTasks,
  getTask,
  updateTask,
} from "../api/taskApi";
import { TaskQuery } from "@/state-management/task/task-query-store";
import { ApiResponse } from "@/api/apiResponses";

const TaskService = {
  getTasks: async (query: TaskQuery) => {
    try {
      const response = await getTasks(query);
      // console.log("response: ", response);
      return Promise.resolve(map(response));
    } catch (error: any) {
      // console.error("Error fetching tasks: ", error);
      return Promise.resolve(map(error));
    }
  },
  getTask: async (id: string) => {
    try {
      const response = await getTask(id);
      return Promise.resolve(map(response));
    } catch (error: any) {
      return Promise.resolve(map(error));
    }
  },
  addTask: async (task: AddTaskItem) => {
    try {
      const response = await addTask(task);
      // console.log("response from addTask: ", response);
      return Promise.resolve(map(response));
    } catch (error: any) {
      console.error("Error adding tasks: ", error);
      return Promise.resolve(map(error));
    }
  },
  updateTask: async (task: EditTaskItem) => {
    try {
      const response = await updateTask(task);
      // console.log("response from addTask: ", response);
      return Promise.resolve(map(response));
    } catch (error: any) {
      console.error("Error updating task: ", error);
      return Promise.resolve(map(error));
    }
  },
  completeTask: async (id: string) => {
    try {
      const response = await completeTask(id);
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
