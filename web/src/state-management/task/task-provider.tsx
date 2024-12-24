import { TaskItem } from "@/entities/TaskItem";
import React, { useEffect, useReducer, useState } from "react";
import TaskContext from "./task-context";
import taskReducer from "./task-reducer";
import { TaskStatus } from "@/utils/enums";

interface Props {
  children: React.ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(taskReducer, [] as TaskItem[]);
  const [total, setTotal] = useState<number>(0);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const activeTasks = tasks?.filter(
        (t) => t.status !== TaskStatus.COMPLETE
      );
      setTotal(tasks.length);
      setActive(activeTasks && activeTasks.length > 0 ? activeTasks.length : 0);
    } else {
      dispatch({ type: "INIT" });
    }
  }, []);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const activeTasks = tasks?.filter(
        (t) => t.status !== TaskStatus.COMPLETE
      );
      setTotal(tasks.length);
      setActive(activeTasks && activeTasks.length > 0 ? activeTasks.length : 0);
    }
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        total,
        active,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
