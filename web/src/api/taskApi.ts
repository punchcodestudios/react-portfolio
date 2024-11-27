import { AddTaskItem, TaskItem } from "@/entities/TaskItem";
import ApiClient from "./apiClient";
import { FetchResponse } from "@/entities/FetchResponse";

export const getTasks = async () => {
  const client = new ApiClient<TaskItem[]>("/tasks/get-tasks");
  try {
    const response = (await client.getAll()).filter(
      (d) => d.completedDate === null
    );
    return response;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};

export const addTask = async (item: AddTaskItem) => {
  const client = new ApiClient<AddTaskItem>("/tasks/add-task");
  try {
    const response = await client.post(item);
    return response.data;
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

export const completeTask = async (refid: string) => {
  const client = new ApiClient<FetchResponse<TaskItem>>("/task/complete-task");
  try {
    const response = await client.post(refid);
    return response.results;
  } catch (error) {
    console.error("Error completing task: ", error);
    throw error;
  }
};
