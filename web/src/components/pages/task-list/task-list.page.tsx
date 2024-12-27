import AddTaskMenuBar from "./add-task-menu-bar.form";
import TaskListGrid from "./task-list-grid.component";
import TaskListMenuBar from "../../common/data-grid/data-grid-menu-bar.component";
import TaskQueryBar from "./task-query-bar.form";

const TaskListPage = () => {
  return (
    <>
      <TaskListMenuBar></TaskListMenuBar>
      {/* <TaskQueryBar></TaskQueryBar> */}
      <TaskListGrid></TaskListGrid>
    </>
  );
};

export default TaskListPage;
