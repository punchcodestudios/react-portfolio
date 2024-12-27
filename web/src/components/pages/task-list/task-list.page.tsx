import TaskListMenuBar from "../../common/data-grid/data-grid-menu-bar.component";
import TaskListGrid from "./task-list-grid.component";

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
