import { TaskItem } from "@/entities/TaskItem";

interface AddTaskAction {
  type: "ADD_TASK";
  payload: TaskItem;
}

interface CompleteTaskAction {
  type: "COMPLETE_TASK";
  payload: TaskItem;
}

interface GetTasksAction {
  type: "GET_TASKS";
  payload: TaskItem[];
}

export type TaskAction = AddTaskAction | CompleteTaskAction | GetTasksAction;

const taskReducer = (state: TaskItem[], action: TaskAction): TaskItem[] => {
  switch (action.type) {
    case "ADD_TASK":
      console.log("add task: ", action.payload);
      return [action.payload, ...state];
    case "COMPLETE_TASK":
      let arr = [...state];
      const index = arr.findIndex((i) => i._id == action.payload._id);
      arr[index] = action.payload;
      return [...arr];
    case "GET_TASKS":
      return [...action.payload];
    default:
      return state;
  }
};

export default taskReducer;
