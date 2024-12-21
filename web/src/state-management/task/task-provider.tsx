import { TaskItem } from "@/entities/TaskItem";
import React, { useEffect, useReducer } from "react";
import TaskContext from "./task-context";
import taskReducer from "./task-reducer";

interface Props {
  children: React.ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(taskReducer, [] as TaskItem[]);
  // const [isLoading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string>("");
  // const { taskQuery, setCurrentPage } = useTaskQueryStore();

  // const addTask = async (addTask: AddTaskItem) => {
  //   const data = await TaskService.addTask(addTask);
  //   setCurrentPage(1);
  //   await loadTasks();
  //   return Promise.resolve(data);
  // };

  // const completeTask = async (refid: string) => {
  //   const data = await TaskService.completeTask(refid);
  //   setCurrentPage(1);
  //   await loadTasks();
  //   return Promise.resolve(data);
  // };

  // const loadTasks = async () => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     const response = await TaskService.getTasks({
  //       showActive: taskQuery.showActive || false,
  //       showCompleted: taskQuery.showCompleted || false,
  //       currentPage: taskQuery.currentPage || 1,
  //       pageSize: taskQuery.pageSize || 5,
  //       searchText: taskQuery.searchText || "",
  //     });
  //     dispatch({
  //       type: "SET_TASKS",
  //       payload: response.content.target,
  //     });
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    dispatch({ type: "INIT" });
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
