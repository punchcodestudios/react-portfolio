import { AddTaskItem } from "@/entities/TaskItem";
import { addTask, completeTask, getTasks } from "../api/taskApi";
import { TaskQuery } from "@/state-management/task/task-query-store";

const TaskService = {
  getTasks: async (query: TaskQuery) => {
    try {
      const response = await getTasks(query);
      return response;
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      throw error;
    }
  },
  addTask: async (task: AddTaskItem) => {
    try {
      const response = await addTask(task);
      return response;
    } catch (error) {
      console.error("Error adding tasks: ", error);
      throw error;
    }
  },
  completeTask: async (refid: string) => {
    try {
      const response = await completeTask(refid);
      return response;
    } catch (error) {
      console.error("Error completing tasks", error);
      throw error;
    }
  },
};

export default TaskService;
