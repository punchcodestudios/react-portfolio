import { AddTaskItem, TaskItem } from "@/entities/TaskItem";
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
    // console.error("Error fetching tasks: ", error);
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
    // console.error("Error adding task: ", error);
    throw error;
  }
};

export const completeTask = async (
  _id: string
): Promise<ApiResponse<TaskItem>> => {
  const client = new ApiClient<TaskItem>("/tasks/complete-task");
  try {
    const response = await client.post({ _id: _id });
    return response;
  } catch (error) {
    console.error("Error completing task: ", error);
    throw error;
  }
};
