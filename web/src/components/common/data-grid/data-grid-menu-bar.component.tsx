import {
  CheckboxGroup,
  CheckboxItem,
} from "@/components/common/checkbox/checkbox.component";
import DataPager from "@/components/common/data-grid/data-pager.control";
import useTaskQueryStore from "@/state-management/task/task-query-store";
import useTasks from "@/state-management/task/use-tasks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TaskListMenuBar = () => {
  const { filteredTasks } = useTasks();
  const { setShowActive, setShowCompleted, setCurrentPage } =
    useTaskQueryStore();
  const taskQuery = useTaskQueryStore((s) => s.taskQuery);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const statusFilters: CheckboxItem[] = [
    {
      id: "showActive",
      name: "show-active",
      label: "Show Active",
      checked: taskQuery.showActive || false,
    },
    {
      id: "showCompleted",
      name: "show-completed",
      label: "Show Completed",
      checked: taskQuery.showCompleted || false,
    },
  ];

  useEffect(() => {
    // console.log("taskQuery: ", taskQuery);
    // console.log("filteredTasks.length: ", filteredTasks.length);
    setTotalRecords(filteredTasks.length);
  }, [filteredTasks]);

  const handleSearch = () => {
    // console.log("handle search");
  };

  const handlePageChange = (value: number) => {
    // console.log("handle page change: ", value);
    setCurrentPage(value);
  };

  const handleFilter = (value: string[]) => {
    // console.log("handleFilter.value: ", value);
    setShowActive(
      value.length > 0 && value.findIndex((x) => x == "showActive") >= 0
    );
    setShowCompleted(
      value.length > 0 && value.findIndex((x) => x == "showCompleted") >= 0
    );
  };

  return (
    <div className="add-task-wrapper data-query-bar-container">
      {/* <div className="col-lg-4">
        <SearchInput clickEvent={handleSearch}></SearchInput>
      </div> */}
      <div className="col-12 col-lg-3 d-flex underline center middle">
        <Link to="/tasks/add-task" className="btn btn-primary">
          Add Task
        </Link>
      </div>

      <div className="show-filter-wrapper underline col-12 col-lg-4 d-flex center middle">
        <CheckboxGroup
          options={statusFilters}
          onChange={(option) => handleFilter(option)}
        ></CheckboxGroup>
      </div>

      <div className="data-pager-wrapper col-12 col-lg-5 d-flex center middle">
        <DataPager
          onChange={handlePageChange}
          totalRecords={totalRecords}
          pageSize={taskQuery.pageSize}
        ></DataPager>
      </div>
    </div>
  );
};
``;
export default TaskListMenuBar;
