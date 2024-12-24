import ButtonControl from "@/components/common/button/button.control";
import { TaskQuery } from "@/state-management/task/task-query-store";
import useTasks from "@/state-management/task/use-tasks";
import { useEffect, useState } from "react";
import Date from "../../../extensions/Date";
import taskService from "../../../services/task-service";
import toast, { Toaster } from "react-hot-toast";
import NoContent from "@/components/common/no-content/no-content.component";

const TaskListGrid = () => {
  const { tasks, dispatch } = useTasks();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
    setIsLoading(true);
    taskService
      .getTasks({} as TaskQuery)
      .then((response) => {
        if (!response || !response.meta.success) {
          setError(response.error.message);
        } else {
          console.log("component response: ", response.target);
          dispatch({ type: "SET_TASKS", payload: response.target });
        }
      })
      .catch((error: any) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    toast.error(error);
  }

  const setComplete = (id: string) => {
    taskService.completeTask(id).then((response) => {
      if (response && response.meta.success) {
        dispatch({ type: "SET_TASK", payload: response.target[0] });
      } else {
        setError(response.error.message);
      }
    });
  };

  return (
    <>
      <Toaster></Toaster>
      {tasks.length == 0 && <NoContent></NoContent>}
      {tasks?.length > 0 && (
        <div className="grid-container">
          {tasks.map((task) => (
            <div key={`task-${task._id}`} className="d-flex grid-items mb-3">
              <div className="col-md-2">
                <ButtonControl
                  id={task._id}
                  name="complete-task"
                  cssClass="btn btn-primary"
                  onClick={() => setComplete(task._id)}
                >
                  Complete
                </ButtonControl>
              </div>
              <div className="col-md-10">
                <ul className="data-items">
                  <li>
                    <label>Title:</label>
                    {task.title}
                  </li>
                  <li>
                    <label>Due On:</label>
                    {new Date(task.dueDate).toDateOnlyString()}
                  </li>
                  <li>
                    <label>Group:</label>
                    {task.taskGroup}
                  </li>
                  <li className="">
                    <label>Status:</label>
                    {task.status}
                  </li>
                </ul>
                <div className="data-items">
                  <ul className="">
                    <li className="">
                      <label>Description:</label>
                      {task.description}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TaskListGrid;
