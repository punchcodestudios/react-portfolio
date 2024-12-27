import NoContent from "@/components/common/no-content/no-content.component";
import useTaskQueryStore from "@/state-management/task/task-query-store";
import useTasks from "@/state-management/task/use-tasks";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import taskService from "../../../services/task-service";
import TaskListGridItem from "./task-list-grid-item.control";

const TaskListGrid = () => {
  const { pagedTasks, dispatch } = useTasks();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const taskQueryStore = useTaskQueryStore();

  useEffect(() => {
    setError("");
    setIsLoading(true);
    taskService
      .getTasks(taskQueryStore.taskQuery)
      .then((response) => {
        if (!response || !response.meta.success) {
          setError(response.error.message);
        } else {
          // console.log("component response: ", response.target);
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
    // console.log("complete id: ", id);
    taskService.completeTask(id).then((response) => {
      if (response && response.meta.success) {
        // console.log("Response: ", response);
        dispatch({ type: "SET_TASK", payload: response.target[0] });
      } else {
        setError(response.error.message);
      }
    });
  };

  const handleEdit = (id: string) => {
    // console.log("handle edit: ", id);
  };

  return (
    <>
      <Toaster></Toaster>
      {pagedTasks.length == 0 && <NoContent></NoContent>}
      {pagedTasks?.length > 0 && (
        <div className="grid-container">
          {pagedTasks.map((task, index) => (
            <TaskListGridItem
              task={task}
              onComplete={(id: string) => setComplete(id)}
              onEdit={(id: string) => handleEdit(id)}
            ></TaskListGridItem>
          ))}
        </div>
      )}
    </>
  );
};

export default TaskListGrid;
