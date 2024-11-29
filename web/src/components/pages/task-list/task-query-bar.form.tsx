import ButtonControl from "@/components/common/button/button.control";
import React from "react";

const TaskQueryBar = () => {
  return (
    <div className="query-bar-container">
      <div className="col-md-3">
        <input className="input form-control" type="text"></input>
      </div>
      <div className="col-md-3">
        <label htmlFor="showActive">
          <input id="showActive" className="input" type="checkbox"></input>
          Show Active
        </label>
      </div>
      <div className="col-md-3">
        <label htmlFor="showCompleted">
          <input id="showCompleted" className="input" type="checkbox"></input>
          Show Completed
        </label>
      </div>
      <div className="col-md-3">
        <label htmlFor="showCompleted">
          <ButtonControl
            id="taskQuery"
            type="submit"
            name="task-query"
            cssClass="btn btn-primary"
          >
            Apply
          </ButtonControl>
        </label>
      </div>
    </div>
  );
};

export default TaskQueryBar;
