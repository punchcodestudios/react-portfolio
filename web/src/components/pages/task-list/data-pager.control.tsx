import { TaskItem } from "@/entities/TaskItem";
import useTaskFilters from "@/state-management/task/use-task-filters";
import useTasks from "@/state-management/task/use-tasks";
import React, { useEffect, useState } from "react";

const DataPager = () => {
  const { taskFilter, setCurrentPage } = useTaskFilters();
  const { tasks } = useTasks();

  const [currentTasks, setCurrentTasks] = useState<TaskItem[]>(
    [] as TaskItem[]
  );
  const [numPages, setNumPages] = useState<number>(1);

  useEffect(() => {
    let currTasks = [] as TaskItem[];
    if (taskFilter.showActive) {
      currTasks = [...tasks.filter((t) => !t.completedDate), ...currTasks];
    }
    if (taskFilter.showCompleted) {
      currTasks = [...tasks.filter((t) => t.completedDate), ...currTasks];
    }
    setCurrentTasks(currTasks);
    const pages =
      currTasks.length > 0
        ? Math.ceil(currTasks.length / taskFilter.pageSize)
        : 1;
    setNumPages(pages);
    setCurrentPage(1);
  }, [taskFilter.showActive, taskFilter.showCompleted]);

  return (
    <div>
      <span className="ms-2 me-2">{`Total Tasks: [ ${currentTasks.length} ]`}</span>
      <span className="ms-2 me-2">
        <button
          onClick={() => setCurrentPage(taskFilter.currentPage - 1)}
          disabled={taskFilter.currentPage == 1}
        >
          &lt;&lt;
        </button>
      </span>
      <span className="ms-2 me-2">{`Page: ${taskFilter.currentPage} of ${numPages}`}</span>
      <span className="ms-2 me-2">
        <button
          onClick={() => setCurrentPage(taskFilter.currentPage + 1)}
          disabled={taskFilter.currentPage == numPages}
        >
          &gt;&gt;
        </button>
      </span>
    </div>
  );
};

export default DataPager;
