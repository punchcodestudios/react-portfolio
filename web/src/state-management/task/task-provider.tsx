import { AddTaskItem, TaskItem } from "@/entities/TaskItem";
import TaskService from "@/services/task-service";
import React, { useEffect, useReducer, useState } from "react";
import TaskContext from "./task-context";
import taskReducer from "./task-reducer";

interface Props {
  children: React.ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const addTask = async (addTask: AddTaskItem) => {
    const data = await TaskService.addTask(addTask);
    dispatch({ type: "ADD_TASK", payload: data });
    return Promise.resolve(data);
  };

  const completeTask = async (refid: string) => {
    console.log(refid);
    const data = await TaskService.completeTask(refid);
    dispatch({ type: "COMPLETE_TASK", payload: data });
    return Promise.resolve(data);
  };

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await TaskService.getTasks();
        dispatch({ type: "GET_TASKS", payload: data as TaskItem[] });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        dispatch,
        addTask,
        completeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
