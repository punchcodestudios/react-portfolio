import { TaskItem } from "@/entities/TaskItem";

interface SetTasksAction {
  type: "SET_TASKS";
  payload: TaskItem[];
}

interface InitTasksAction {
  type: "INIT";
}

export type TaskAction = SetTasksAction | InitTasksAction;

const taskReducer = (state: TaskItem[], action: TaskAction): TaskItem[] => {
  switch (action.type) {
    case "SET_TASKS":
      return [...state, ...action.payload];
    case "INIT":
      return [];
    default:
      return state;
  }
};

export default taskReducer;
