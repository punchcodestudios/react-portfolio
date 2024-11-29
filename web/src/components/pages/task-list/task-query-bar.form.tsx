import ButtonControl from "@/components/common/button/button.control";
import useTaskFilters from "@/state-management/task/use-task-filters";

const TaskQueryBar = () => {
  const { setShowActive, setShowCompleted, taskFilter } = useTaskFilters();
  return (
    <div className="query-bar-container">
      <div className="col-md-3">
        <input className="input form-control" type="text"></input>
      </div>
      <div className="col-md-3">
        <label htmlFor="showActive">
          <input
            id="showActive"
            className="input"
            type="checkbox"
            checked={taskFilter.showActive}
            onChange={(e) => setShowActive(e.target.checked)}
          ></input>
          Show Active
        </label>
      </div>
      <div className="col-md-3">
        <label htmlFor="showCompleted">
          <input
            id="showCompleted"
            className="input"
            type="checkbox"
            checked={taskFilter.showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          ></input>
          Show Completed
        </label>
      </div>
      <div className="col-md-3">
        <ButtonControl
          id="taskQuery"
          type="submit"
          name="task-query"
          cssClass="btn btn-primary"
        >
          Apply
        </ButtonControl>
      </div>
    </div>
  );
};

export default TaskQueryBar;
