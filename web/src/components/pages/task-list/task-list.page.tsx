import TaskFilterProvider from "@/state-management/task/task-filter-provider";
import AddTaskMenuBar from "./add-task-menu-bar.form";
import TaskListGrid from "./task-list-grid.component";
import TaskQueryBar from "./task-query-bar.form";

const TaskListPage = () => {
  return (
    <>
      <TaskFilterProvider>
        <AddTaskMenuBar></AddTaskMenuBar>
        <TaskQueryBar></TaskQueryBar>
        <TaskListGrid></TaskListGrid>
      </TaskFilterProvider>
    </>
  );
};

export default TaskListPage;
