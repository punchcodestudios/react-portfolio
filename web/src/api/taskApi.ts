import { AddTaskItem, TaskItem } from "@/entities/TaskItem";
import ApiClient from "./apiClient";
import { FetchResponse } from "@/entities/FetchResponse";

export const getTasks = async () => {
  const client = new ApiClient<TaskItem[]>("/tasks/get-tasks");
  try {
    const response = await client.getAll();
    // response.filter((task) => !task.completedDate);
    return response;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};

export const addTask = async (item: AddTaskItem) => {
  const client = new ApiClient<TaskItem>("/tasks/add-task");
  try {
    const response = await client.post(item);
    return response;
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

export const completeTask = async (refid: string) => {
  const client = new ApiClient<TaskItem>("/tasks/complete-task");
  try {
    console.log("REFID: ", refid);

    const response = await client.post({ id: refid });
    return response;
  } catch (error) {
    console.error("Error completing task: ", error);
    throw error;
  }
};
