import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTasks from "../../../state-management/task/use-tasks";
import useAuth from "@/state-management/auth/use-auth";
import { TaskItem } from "@/entities/TaskItem";

const SubNavComponent = () => {
  const { taskContent } = useTasks();
  const { userResponse } = useAuth();
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [username, setUsername] = useState("");

  // useEffect(() => {
  //   setFilteredTasks(
  //     taskContent.content.target.filter((t) => !t.completedDate)
  //   );
  // }, [taskContent]);

  useEffect(() => {
    setIsAuthenticated(userResponse.meta?.isAuthenticated || false);

    setUsername(userResponse?.target ? userResponse.target[0]?.username : "");
  }, [userResponse]);

  if (isAuthenticated) {
    return (
      <div
        className="d-flex flex-row subnav-component"
        style={{ justifyContent: "flex-end" }}
      >
        <div className="user-info">{`Welcome ${username}`}</div>
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
