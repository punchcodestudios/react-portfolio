import { TaskFilter } from "@/entities/TaskItem";

interface SetShowActiveAction {
  type: "SET_SHOW_ACTIVE";
  payload: boolean;
}

interface SetShowCompletedAction {
  type: "SET_SHOW_COMPLETED";
  payload: boolean;
}

export type TaskFilterAction = SetShowActiveAction | SetShowCompletedAction;

const taskFilterReducer = (
  state: TaskFilter,
  action: TaskFilterAction
): TaskFilter => {
  switch (action.type) {
    case "SET_SHOW_ACTIVE":
      console.log("set show active: ", action.payload);
      let activeFilter = { ...state };
      console.log(activeFilter);
      activeFilter.showActive = action.payload;
      return { ...activeFilter };
    case "SET_SHOW_COMPLETED":
      let completedFilter = { ...state };
      completedFilter.showCompleted = action.payload;
      return { ...completedFilter };
    default:
      return state;
  }
};

export default taskFilterReducer;
