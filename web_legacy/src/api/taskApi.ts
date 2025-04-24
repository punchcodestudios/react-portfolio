import { AddTaskItem, EditTaskItem, TaskItem } from "@/entities/TaskItem";
import { TaskQuery } from "@/state-management/task/task-query-store";
import ApiClient from "./apiClient";
import { ApiResponse } from "./apiResponses";

export const getTasks = async (
  query: TaskQuery
): Promise<ApiResponse<TaskItem>> => {
  const client = new ApiClient<TaskItem>("/tasks/get-tasks", query);
  try {
    return client.getAll().then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    console.error("Error fetching tasks: ", error);
    return Promise.resolve(error);
  }
};

export const getTask = async (id: string): Promise<ApiResponse<TaskItem>> => {
  const client = new ApiClient<TaskItem>("tasks/get-task", { id: id });
  try {
    return client.get(id).then((response) => {
      return Promise.resolve(response);
    });
  } catch (error: any) {
    console.log("Error fetching task ", error);
    return Promise.resolve(error);
  }
};

export const addTask = async (
  item: AddTaskItem
): Promise<ApiResponse<TaskItem>> => {
  const client = new ApiClient<TaskItem>("/tasks/add-task");
  try {
    const response = await client.post(item);

    return Promise.resolve(response);
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

export const updateTask = async (
  item: EditTaskItem
): Promise<ApiResponse<TaskItem>> => {
  const client = new ApiClient<TaskItem>("/tasks/update-task");
  try {
    const response = await client.post(item);

    return Promise.resolve(response);
  } catch (error) {
    console.error("Error updating task: ", error);
    throw error;
  }
};

export const completeTask = async (
  id: string
): Promise<ApiResponse<TaskItem>> => {
  const client = new ApiClient<TaskItem>("/tasks/complete-task");
  try {
    const response = await client.post({ id: id });
    return response;
  } catch (error) {
    console.error("Error completing task: ", error);
    throw error;
  }
};
