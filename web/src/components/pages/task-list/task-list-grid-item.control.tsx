import ButtonControl from "@/components/common/button/button.control";
import { TaskItem } from "@/entities/TaskItem";
import React, { useEffect } from "react";
import Date from "../../../extensions/Date";

interface Props {
  task: TaskItem;
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TaskListGridItem: React.FC<Props> = ({ task, onComplete, onEdit }) => {
  const handleComplete = (id: string) => {
    if (onComplete) {
      onComplete(id);
    }
  };

  const handleEdit = (id: string) => {
    if (onEdit) {
      onEdit(id);
    }
  };

  useEffect(() => {
    console.log("taskID: ", task._id);
  }, []);

  return (
    <div className="d-flex grid-items mb-3">
      <div className="col-md-2">
        <ButtonControl
          id={`complete_${task._id}`}
          name="complete-task"
          cssClass="btn btn-primary"
          onClick={() => handleComplete(task._id)}
        >
          Complete
        </ButtonControl>
        <ButtonControl
          id={`edit_${task._id}`}
          name="edit-task"
          cssClass="btn btn-primary"
          onClick={() => handleEdit(task._id)}
        >
          Edit
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
  );
};

export default TaskListGridItem;
