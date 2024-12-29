import { UserStatus } from "@/utils/enums";
import useAuth from "@/state-management/auth/use-auth";
import useTasks from "@/state-management/task/use-tasks";
import { Link } from "react-router-dom";

const SubNavComponent = () => {
  const { user } = useAuth();
  const { active } = useTasks();

  if (user && user.status == UserStatus.CONFIRMED) {
    return (
      <div
        className="d-flex flex-row subnav-component"
        style={{ justifyContent: "flex-end" }}
      >
        <div className="user-info">{`Welcome ${user.username}`}</div>
        <div className="ms-5">
          <Link to="tasks/task-list">
            <span className="badge task-badge">{`Open tasks: ${active}`}</span>
          </Link>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SubNavComponent;
