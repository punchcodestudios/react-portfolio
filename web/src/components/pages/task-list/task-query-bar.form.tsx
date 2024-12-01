import useTaskQueryStore from "@/state-management/task/task-query-store";
import DataPager from "./data-pager.control";
import { useEffect } from "react";

const TaskQueryBar = () => {
  const { setShowActive, setShowCompleted } = useTaskQueryStore();
  const showActiveValue = useTaskQueryStore((s) => s.taskQuery.showActive);
  const showCompletedValue = useTaskQueryStore(
    (s) => s.taskQuery.showCompleted
  );

  return (
    <>
      <div className="query-bar-container">
        <div className="col-md-6 d-flex" style={{ color: "white" }}>
          <input className="input form-control" type="text"></input>
        </div>
        <div
          className="col-md-6 d-flex"
          style={{ color: "white", justifyContent: "flex-end" }}
        >
          <DataPager></DataPager>
        </div>
      </div>
      <div className="query-bar-container">
        <div className="col-md-6 d-flex" style={{ color: "white" }}>
          <label
            className="ms-2 me-2"
            htmlFor="radio"
            style={{ color: "white" }}
          >
            <input type="radio" name="radio" className="me-1" />
            Choice Two
          </label>
          <label
            className="ms-2 me-2"
            htmlFor="radio"
            style={{ color: "white" }}
          >
            <input type="radio" name="radio" className="me-1" />
            Choice One
          </label>
        </div>
        <div className="col-md-6 d-flex" style={{ color: "white" }}>
          <label
            className="ms-2 me-2"
            htmlFor="showActive"
            style={{ color: "white" }}
          >
            <input
              id="showActive"
              type="checkbox"
              name="show-active"
              className="me-1"
              checked={showActiveValue}
              // style={{ color: "white" }}
              onChange={(e) => setShowActive(e.target.checked)}
            />
            Show Active
          </label>
          <label
            className="ms-2 me-2"
            htmlFor="showCompleted"
            style={{ color: "white" }}
          >
            <input
              id="showCompleted"
              type="checkbox"
              name="show-completed"
              className="me-1"
              checked={showCompletedValue}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            Show Completed
          </label>
        </div>
      </div>
    </>
  );
};

export default TaskQueryBar;
