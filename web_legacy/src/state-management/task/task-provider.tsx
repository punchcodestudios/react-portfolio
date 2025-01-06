import { TaskItem } from "@/entities/TaskItem";
import React, { useEffect, useReducer, useState } from "react";
import TaskContext from "./task-context";
import taskReducer from "./task-reducer";
import { TaskStatus } from "@/utils/enums";
import useTaskQueryStore from "./task-query-store";

interface Props {
  children: React.ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(taskReducer, [] as TaskItem[]);
  const [total, setTotal] = useState<number>(0);
  const [active, setActive] = useState<number>(0);
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);
  const [pagedTasks, setPagedTasks] = useState<TaskItem[]>([]);
  const { taskQuery } = useTaskQueryStore();

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const activeTasks = tasks?.filter(
        (t) => t.status !== TaskStatus.COMPLETE
      );
      setTotal(tasks.length);
      setActive(activeTasks && activeTasks.length > 0 ? activeTasks.length : 0);
      setFilteredTasks(tasks);
    } else {
      dispatch({ type: "INIT" });
    }
  }, []);

  useEffect(() => {
    // report total data set stats (i.e. total, active) :: tasks, total, active
    // subset data based on search criteria, if present: (i.e. keyword search) :: searchResults
    // subset searchReults based on show properties: (showActive, showComplete etc.) :: showResults
    // subset showResults based on advanced filters (filterStatus, filterGroup etc) :: showResults
    // return paged subset of showResults :: filteredTasks
    if (tasks && tasks.length > 0) {
      const activeTasks = tasks?.filter(
        (t) => t.status !== TaskStatus.COMPLETE
      );
      setTotal(tasks.length);
      setActive(activeTasks && activeTasks.length > 0 ? activeTasks.length : 0);
    }
  }, [tasks]);

  useEffect(() => {
    let filteredItems: TaskItem[] = [];

    // show tasks
    if (taskQuery.showActive) {
      filteredItems = [
        ...filteredItems,
        ...tasks.filter(
          (x) =>
            x.status != TaskStatus.DISCARDED && x.status != TaskStatus.COMPLETE
        ),
      ];
    }

    if (taskQuery.showCompleted) {
      filteredItems = [
        ...filteredItems,
        ...tasks.filter((x) => x.status == TaskStatus.COMPLETE),
      ];
    }

    // Page Tasks
    const startIndex =
      (Math.max(taskQuery.currentPage, 1) - 1) * taskQuery.pageSize;
    const endIndex = Math.min(
      taskQuery.pageSize * taskQuery.currentPage,
      tasks.length
    );
    // console.log("page size: ", taskQuery.pageSize);
    // console.log("start Index: ", startIndex);
    // console.log("end index: ", endIndex);

    // console.log("filteredItems: ", filteredItems);
    setFilteredTasks(filteredItems);
    const paged = filteredItems.slice(startIndex, endIndex);
    // console.log(paged);
    setPagedTasks(paged);
  }, [tasks, taskQuery]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        total,
        active,
        filteredTasks,
        pagedTasks,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
