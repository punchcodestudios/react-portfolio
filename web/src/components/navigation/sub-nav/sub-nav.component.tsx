import { useEffect } from "react";
import { Link } from "react-router-dom";
import useTasks from "../../../state-management/task/use-tasks";
import useAuth from "@/state-management/auth/use-auth";

const SubNavComponent = () => {
  const { tasks } = useTasks();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {}, []);

  if (isAuthenticated) {
    return (
      <div
        className="d-flex flex-row subnav-component"
        style={{ justifyContent: "flex-end" }}
      >
        <div className="user-info">{`Welcome ${user.username}`}</div>
        <div className="ms-5">
          <Link to="task-list">
            <span className="badge task-badge">{`Open tasks: ${tasks.length}`}</span>
          </Link>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SubNavComponent;
