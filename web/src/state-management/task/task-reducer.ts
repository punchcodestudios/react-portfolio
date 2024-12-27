import { TaskItem } from "@/entities/TaskItem";

interface SetTasksAction {
  type: "SET_TASKS";
  payload: TaskItem[];
}

interface SetTaskAction {
  type: "SET_TASK";
  payload: TaskItem;
}

interface InitTasksAction {
  type: "INIT";
}

export type TaskAction = SetTaskAction | SetTasksAction | InitTasksAction;

const taskReducer = (state: TaskItem[], action: TaskAction): TaskItem[] => {
  switch (action.type) {
    case "SET_TASK":
      const currentState = [...state];
      const index = currentState.findIndex((i) => i._id == action.payload._id);
      currentState[index] = action.payload;
      return [...currentState];
    case "SET_TASKS":
      return action.payload;
    case "INIT":
      return [];
    default:
      return state;
  }
};

export default taskReducer;
