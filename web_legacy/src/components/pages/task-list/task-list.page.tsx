import TaskListMenuBar from "../../common/data-grid/data-grid-menu-bar.component";
import TaskListGrid from "./task-list-grid.component";

const pageHeaderImage = require("../../../assets/img/task-list.png");
const TaskListPage = () => {
  return (
    <>
      <article className="resume">
        <section className="header">
          <img src={pageHeaderImage}></img>
        </section>
        <TaskListMenuBar></TaskListMenuBar>
        {/* <TaskQueryBar></TaskQueryBar> */}
        <TaskListGrid></TaskListGrid>
      </article>
    </>
  );
};

export default TaskListPage;
