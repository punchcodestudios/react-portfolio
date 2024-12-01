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
      throw new Error("Could not fetch tasks");
    }
  },
  addTask: async (task: AddTaskItem) => {
    try {
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
};

export default TaskService;
