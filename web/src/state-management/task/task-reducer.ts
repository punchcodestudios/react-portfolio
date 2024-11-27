import { TaskItem } from "@/entities/TaskItem";

interface AddTaskAction {
  type: "ADD_TASK";
  payload: TaskItem;
}

interface CompleteTaskAction {
  type: "COMPLETE_TASK";
  payload: string;
}

interface GetTasksAction {
  type: "GET_TASKS";
  payload: TaskItem[];
}

export type TaskAction = AddTaskAction | CompleteTaskAction | GetTasksAction;

const taskReducer = (state: TaskItem[], action: TaskAction): TaskItem[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [action.payload, ...state];
    case "COMPLETE_TASK":
      return state.filter((s) => s._id !== action.payload);
    case "GET_TASKS":
      return [...action.payload];
    default:
      return state;
  }
};

export default taskReducer;
