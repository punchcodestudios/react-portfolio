import useTaskQueryStore from "@/state-management/task/task-query-store";
import useTasks from "@/state-management/task/use-tasks";
import { useEffect, useState } from "react";

const DataPager = () => {
  const { tasks } = useTasks();
  const { taskQuery, setCurrentPage } = useTaskQueryStore();

  const [numPages, setNumPages] = useState<number>(1);

  useEffect(() => {
    const pages =
      tasks.length > 0 ? Math.ceil(tasks.length / taskQuery.pageSize) : 1;
    setNumPages(pages);
  }, [tasks]);

  return (
    <div>
      <span className="ms-2 me-2">{`Total Tasks: [ ${tasks.length} ]`}</span>
      <span className="ms-2 me-2">
        <button
          onClick={() => setCurrentPage(taskQuery.currentPage - 1)}
          disabled={taskQuery?.currentPage == 1}
        >
          &lt;&lt;
        </button>
      </span>
      <span className="ms-2 me-2">{`Page: ${taskQuery.currentPage} of ${numPages}`}</span>
      <span className="ms-2 me-2">
        <button
          onClick={() => setCurrentPage(taskQuery.currentPage + 1)}
          disabled={taskQuery.currentPage == numPages}
        >
          &gt;&gt;
        </button>
      </span>
    </div>
  );
};

export default DataPager;
