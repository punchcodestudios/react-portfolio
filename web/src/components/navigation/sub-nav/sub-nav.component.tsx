import { UserStatus } from "@/utils/enums";
import useAuth from "@/state-management/auth/use-auth";
// import { Link } from "react-router-dom";
// import useTasks from "../../../state-management/task/use-tasks";
// import { TaskItem } from "@/entities/TaskItem";

const SubNavComponent = () => {
  // const { taskContent } = useTasks();
  // const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);
  const { user } = useAuth();

  // useEffect(() => {
  //   setFilteredTasks(
  //     taskContent.content.target.filter((t) => !t.completedDate)
  //   );
  // }, [taskContent]);
  if (user && user.status == UserStatus.CONFIRMED) {
    return (
      <div
        className="d-flex flex-row subnav-component"
        style={{ justifyContent: "flex-end" }}
      >
        <div className="user-info">{`Welcome ${user.username}`}</div>
        <div className="ms-5">
          {/* <Link to="task-list">
            <span className="badge task-badge">{`Open tasks: ${filteredTasks.length}`}</span>
          </Link> */}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SubNavComponent;
