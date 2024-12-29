import { TaskItem } from "@/entities/TaskItem";
import IconService from "@/services/icon-service";
import { SolidIcon, TaskStatus } from "@/utils/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    //console.log("taskID: ", task._id);
  }, []);

  return (
    <div className="data-item-wrapper mb-2">
      {task.status !== TaskStatus.COMPLETE && (
        <ul className="data-items">
          <li className="action-item-wrapper">
            <div
              className="action-item"
              onClick={() => handleComplete(task._id)}
            >
              <FontAwesomeIcon
                icon={IconService.getSolid(SolidIcon.SET_COMPLETE)}
              ></FontAwesomeIcon>
              <span className="ms-2">Mark Complete</span>
            </div>
          </li>
          <li className="action-item-wrapper">
            <div className="action-item" onClick={() => handleEdit(task._id)}>
              <FontAwesomeIcon
                icon={IconService.getSolid(SolidIcon.EDIT)}
              ></FontAwesomeIcon>
              <span className="ms-2">Edit</span>
            </div>
          </li>
        </ul>
      )}
      <ul className="data-items">
        <li className={`status-item ${task.status.toLowerCase()}`}>
          <FontAwesomeIcon
            icon={IconService.getIconByStatus(task.status)}
            color={IconService.getColorByStatus(task.status)}
          ></FontAwesomeIcon>
          <span className={`ms-2 status ${task.status.toLowerCase()}`}>
            <em>STATUS: </em>
            {task.status}
          </span>
        </li>
        <li className="status-item">
          <FontAwesomeIcon
            icon={IconService.getSolid(SolidIcon.DUE)}
            color={
              task.status == TaskStatus.COMPLETE
                ? "black"
                : IconService.getColorByDueDate(task.dueDate)
            }
          ></FontAwesomeIcon>
          <span className="ms-2">
            {new Date(task.dueDate).toDateOnlyString()}
          </span>
        </li>
        <li className="status-item">
          <FontAwesomeIcon
            icon={IconService.getSolid(SolidIcon.GROUP)}
          ></FontAwesomeIcon>
          <span className="ms-2">{task.taskGroup}</span>
        </li>
      </ul>

      <ul className="data-items">
        <li>
          <span className="ms-2">
            <strong>{task.title}:</strong>
            <span className="ms-3">{task.description}</span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TaskListGridItem;
