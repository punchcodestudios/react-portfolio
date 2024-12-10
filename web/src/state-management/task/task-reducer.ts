import { ApiResponse } from "@/api/apiResponses";
import { TaskItem } from "@/entities/TaskItem";

interface AddTaskAction {
  type: "ADD_TASK";
  payload: ApiResponse<TaskItem>;
}

interface CompleteTaskAction {
  type: "COMPLETE_TASK";
  payload: ApiResponse<TaskItem>;
}

interface GetTasksAction {
  type: "GET_TASKS";
  payload: ApiResponse<TaskItem>;
}

export type TaskAction = AddTaskAction | CompleteTaskAction | GetTasksAction;

const taskReducer = (
  state: ApiResponse<TaskItem>,
  action: TaskAction
): ApiResponse<TaskItem> => {
  switch (action.type) {
    case "ADD_TASK":
      return action.payload;
    case "COMPLETE_TASK":
      return action.payload;
    case "GET_TASKS":
      return action.payload;
    default:
      return state;
  }
};

export default taskReducer;
