import { AddTaskItem } from "@/entities/TaskItem";
import { addTask, completeTask, getTasks } from "../api/taskApi";

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
};

export default TaskService;
