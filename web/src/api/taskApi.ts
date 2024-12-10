import { AddTaskItem, TaskContent, TaskItem } from "@/entities/TaskItem";
import ApiClient from "./apiClient";
import { TaskQuery } from "@/state-management/task/task-query-store";
import { ApiResponse } from "./apiResponses";

export const getTasks = async (
  query: TaskQuery
): Promise<ApiResponse<TaskItem>> => {
  const client = new ApiClient<TaskItem>("/tasks/get-tasks", query);
  try {
    const response = await client.getAll();
    console.log("task response: ", response);
    return response;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};

export const addTask = async (
  item: AddTaskItem
): Promise<ApiResponse<TaskItem>> => {
  const client = new ApiClient<TaskItem>("/tasks/add-task");
  try {
    const response = await client.post(item);
    return response;
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

export const completeTask = async (
  refid: string
): Promise<ApiResponse<TaskItem>> => {
  const client = new ApiClient<TaskItem>("/tasks/complete-task");
  try {
    // console.log("REFID: ", refid);

    const response = await client.post({ id: refid });
    return response;
  } catch (error) {
    console.error("Error completing task: ", error);
    throw error;
  }
};
