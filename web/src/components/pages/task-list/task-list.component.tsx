import ButtonControl from "@/components/common/button/button.control";
import useTasks from "@/state-management/task/use-tasks";
import { useEffect } from "react";

const TaskList = () => {
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return <div>loading</div>;
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div
        className="row p-3 d-flex"
        style={{
          borderBottom: "1px #000 solid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="col-md-4"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Title
        </div>
        <div className="col-md-4">Description</div>
        <div className="col-md-2">Due Date</div>
        <div className="col-md-2">Action</div>
      </div>

      <ul>
        {tasks?.map((task) => (
          <li key={task._id}>
            <div className="row p-2">
              <div className="col-md-4">{task.title}</div>
              <div className="col-md-4">{task.description}</div>
              <div className="col-md-2">
                {new Date(task.dueDate).toDateString()}
              </div>
              <div className="col-md-2">
                <ButtonControl
                  id="completeTask"
                  name="complete-task"
                  cssClass="btn btn-primary"
                >
                  Complete
                </ButtonControl>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
