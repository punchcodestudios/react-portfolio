import { Link } from "react-router-dom";
import useAuth from "../../../state-management/auth/use-auth";
import useTasks from "../../../state-management/task/use-tasks";

const SubNavComponent = () => {
  const { tasks } = useTasks();
  const { username } = useAuth();
  return (
    <div
      className="d-flex flex-row subnav-component"
      style={{ justifyContent: "flex-end" }}
    >
      <div className="user-info">{`Welcome ${username}`}</div>
      <div className="ms-5">
        <Link to="task-list">
          <span className="badge task-badge">{`Open tasks: ${tasks.length}`}</span>
        </Link>
      </div>
    </div>
  );
};

export default SubNavComponent;
