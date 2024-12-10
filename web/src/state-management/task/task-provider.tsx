import { AddTaskItem, TaskItem } from "@/entities/TaskItem";
import TaskService from "@/services/task-service";
import React, { useEffect, useReducer, useState } from "react";
import TaskContext from "./task-context";
import useTaskQueryStore from "./task-query-store";
import taskReducer from "./task-reducer";
import { ApiResponse } from "@/api/apiResponses";

interface Props {
  children: React.ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  const [content, dispatch] = useReducer(
    taskReducer,
    {} as ApiResponse<TaskItem>
  );
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { taskQuery, setCurrentPage } = useTaskQueryStore();

  const addTask = async (addTask: AddTaskItem) => {
    const data = await TaskService.addTask(addTask);
    setCurrentPage(1);
    await loadTasks();
    return Promise.resolve(data);
  };

  const completeTask = async (refid: string) => {
    const data = await TaskService.completeTask(refid);
    setCurrentPage(1);
    await loadTasks();
    return Promise.resolve(data);
  };

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await TaskService.getTasks({
        showActive: taskQuery.showActive || false,
        showCompleted: taskQuery.showCompleted || false,
        currentPage: taskQuery.currentPage || 1,
        pageSize: taskQuery.pageSize || 5,
        searchText: taskQuery.searchText || "",
      });
      dispatch({
        type: "GET_TASKS",
        payload: response,
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [taskQuery]);

  return (
    <TaskContext.Provider
      value={{
        content,
        isLoading,
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
