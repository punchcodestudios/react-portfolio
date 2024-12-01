import ButtonControl from "@/components/common/button/button.control";
import { TaskItem } from "@/entities/TaskItem";
import useTasks from "@/state-management/task/use-tasks";
import Date from "../../../extensions/Date";
import { useEffect, useState } from "react";
import useTaskFilters from "@/state-management/task/use-task-filters";

const TaskListGrid = () => {
  const { tasks, loading, error, completeTask } = useTasks();
  const { taskFilter } = useTaskFilters();
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    let newlist = [] as TaskItem[];
    if (taskFilter.showActive) {
      newlist = [
        ...tasks.filter((t) => !t.completedDate),
        ...newlist,
      ] as TaskItem[];
    }
    if (taskFilter.showCompleted) {
      newlist = [...tasks.filter((t) => t.completedDate), ...newlist];
    }
    setFilteredTasks(newlist);
  }, [tasks, taskFilter]);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) return <div>Error: {error}</div>;

  const getTaskStatus = (item: TaskItem): string => {
    const urgencyFactor = 3;
    const now = new Date(Date.now());
    const dateDiff = new Date(now).dateDiff(item.dueDate);

    if (item.completedDate) {
      return "Complete";
    }
    if (dateDiff < 0) {
      return "Late";
    }
    if (dateDiff <= urgencyFactor) {
      return "Urgent";
    }
    return "Open";
  };

  const handleClick = (id: string) => {
    completeTask(id);
  };

  return (
    <>
      {filteredTasks.length == 0 && (
        <div className="grid-container">
          <div className="grid-items mb-3">
            <ul className="data-items">
              <li className="">
                <p>
                  No items were found. Please check your filters and try again.
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
      {filteredTasks.length > 0 && (
        <div className="grid-container">
          {filteredTasks.map((task) => (
            <div key={`task-${task._id}`} className="d-flex grid-items mb-3">
              <div className="col-md-2">
                <ButtonControl
                  id={task._id}
                  name="complete-task"
                  cssClass="btn btn-primary"
                  onClick={() => handleClick(task._id)}
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
                    {task.taskGroupRefid}
                  </li>
                  <li className="">
                    <label>Status:</label>
                    {getTaskStatus(task)}
                  </li>
                </ul>
                <div className="data-items">
                  {/* <div className="heading">Details:</div> */}
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
