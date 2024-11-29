import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTasks from "../../../state-management/task/use-tasks";
import useAuth from "@/state-management/auth/use-auth";
import { TaskItem } from "@/entities/TaskItem";

const SubNavComponent = () => {
  const { tasks } = useTasks();
  const { user, isAuthenticated } = useAuth();
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    setFilteredTasks(tasks.filter((t) => !t.completedDate));
  }, [tasks]);

  if (isAuthenticated) {
    return (
      <div
        className="d-flex flex-row subnav-component"
        style={{ justifyContent: "flex-end" }}
      >
        <div className="user-info">{`Welcome ${user.username}`}</div>
        <div className="ms-5">
          <Link to="task-list">
            <span className="badge task-badge">{`Open tasks: ${filteredTasks.length}`}</span>
          </Link>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SubNavComponent;
