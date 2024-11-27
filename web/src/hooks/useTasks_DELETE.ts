import { AddTaskItem, TaskItem } from "@/entities/TaskItem";
import NodeAPIClient from "@/services/node-api-client";

const useTasks = () => {
  const addTask = (addItem: AddTaskItem) => {
    const client = new NodeAPIClient<TaskItem>("/tasks/add-task");
    const newTask = { ...addItem };
    return client.post(newTask);
  };

  // function completeTask(refid: string) {
  //   const client = new NodeAPIClient<TaskItem>("/tasks/complete-task");
  //   client.post(refid);
  // }

  return {
    addTask,
    // completeTask,
  };
};

export default useTasks;
