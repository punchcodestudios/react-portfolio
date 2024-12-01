import { AddTaskItem, TaskFilter, TaskItem } from "@/entities/TaskItem";
import { addTask, completeTask, getTasks } from "../api/taskApi";
import { FetchResponse } from "@/entities/FetchResponse";
import { useQuery } from "@tanstack/react-query";
import apiClient from "./api-client";

const TaskService = {
  getTasks: async () => {
    try {
      const response = await getTasks();
      return response;
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      throw new Error("Could not fetch tasks");
    }
  },
  addTask: async (task: AddTaskItem) => {
    try {
      // console.log("date from UI: ", task.dueDate);
      const response = await addTask(task);
      return response;
    } catch (error) {
      console.error("Error adding tasks: ", error);
      throw new Error("Error adding task");
    }
  },
  completeTask: async (refid: string) => {
    const response = await completeTask(refid);
    return response;
  },
  // getFilteredTasks: async (filter: TaskFilter) => {
  // return useQuery<FetchResponse<TaskItem>, Error>({
  //   queryKey: ["gallery", taskQuery],
  //   queryFn: () =>
  //     apiClient.getAll({
  //       params: {
  //         genres: galleryQuery.skillId,
  //         platforms: galleryQuery.disciplineId,
  //         ordering: galleryQuery.sortOrder,
  //         search: galleryQuery.searchText,
  //       },
  //     }),
  //   staleTime: 24 * 60 * 60 * 1000,
  // });
  // },
};

export default TaskService;
