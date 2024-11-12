import { Link } from "react-router-dom";
import useAuth from "../../../state-management/auth/use-auth";
import useTasks from "../../../state-management/task/use-tasks";

const SubNavComponent = () => {
  const { tasks } = useTasks();
  const { user } = useAuth();

  return (
    <div className="d-flex flex-row" style={{ justifyContent: "flex-end" }}>
      <div className="">{`Welcome ${user}`}</div>
      <div className="ms-5">
        <Link to="task-list">
          <span className="badge text-bg-secondary">{`Open tasks: ${tasks.length}`}</span>
        </Link>
      </div>
    </div>
  );
};

export default SubNavComponent;
