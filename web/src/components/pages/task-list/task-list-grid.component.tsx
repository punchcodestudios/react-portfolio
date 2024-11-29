import ButtonControl from "@/components/common/button/button.control";
import { TaskItem } from "@/entities/TaskItem";
import useTasks from "@/state-management/task/use-tasks";
import Date from "../../../extensions/Date";

const TaskListGrid = () => {
  const { tasks, loading, error, completeTask } = useTasks();

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
    console.log("handle click: ", id);
    completeTask(id);
  };

  return (
    <>
      <div className="grid-container">
        {tasks?.map((task) => (
          <div key={`task-${task._id}`} className="grid-items mb-3">
            {" "}
            <ul className="data-items">
              <li className="">
                <ButtonControl
                  id={task._id}
                  name="complete-task"
                  cssClass="btn btn-primary"
                  onClick={() => handleClick(task._id)}
                >
                  Complete
                </ButtonControl>
              </li>
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
            </ul>
            <div className="ms-3 data-item-details">
              <div className="heading">Details:</div>
              <ul className="">
                <li className="">
                  <label>Description:</label>
                  {task.description}
                </li>
                <li className="">
                  <label>Status:</label>
                  {getTaskStatus(task)}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskListGrid;
