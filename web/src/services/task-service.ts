import { AddTaskItem } from "@/entities/TaskItem";
import { addTask, completeTask, getTasks } from "../api/taskApi";

const TaskService = {
  getTasks: async () => {
    try {
      const response = await getTasks();
      console.log("response from task service: ", response);
      return response;
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      throw new Error("Could not fetch tasks");
    }
  },
  addTask: async (task: AddTaskItem) => {
    const response = await addTask(task);
    return response;
  },
  completeTask: async (refid: string) => {
    const response = await completeTask(refid);
    return response;
  },
};

export default TaskService;
