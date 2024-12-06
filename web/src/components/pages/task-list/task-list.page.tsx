import AddTaskMenuBar from "./add-task-menu-bar.form";
import TaskListGrid from "./task-list-grid.component";
import TaskQueryBar from "./task-query-bar.form";

const TaskListPage = () => {
  return (
    <>
      <AddTaskMenuBar></AddTaskMenuBar>
      <TaskQueryBar></TaskQueryBar>
      <TaskListGrid></TaskListGrid>
    </>
  );
};

export default TaskListPage;
