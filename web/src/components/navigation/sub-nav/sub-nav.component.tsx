import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTasks from "../../../state-management/task/use-tasks";
import useAuth from "@/state-management/auth/use-auth";
import { TaskItem } from "@/entities/TaskItem";

const SubNavComponent = () => {
  const { tasks } = useTasks();
  const { userContent } = useAuth();
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  useEffect(() => {
    setFilteredTasks(tasks.filter((t) => !t.completedDate));
  }, [tasks]);

  useEffect(() => {
    console.log("user from sub nav:", userContent);
    setIsAuthenticated(userContent?.isAuthenticated);
  }, [userContent]);

  if (isAuthenticated) {
    return (
      <div
        className="d-flex flex-row subnav-component"
        style={{ justifyContent: "flex-end" }}
      >
        <div className="user-info">{`Welcome ${userContent.user.username}`}</div>
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
