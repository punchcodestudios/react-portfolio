import { TaskFilter } from "@/entities/TaskItem";

interface SetShowActiveAction {
  type: "SET_SHOW_ACTIVE";
  payload: boolean;
}

interface SetShowCompletedAction {
  type: "SET_SHOW_COMPLETED";
  payload: boolean;
}

interface SetCurrentPageAction {
  type: "SET_CURRENT_PAGE";
  payload: number;
}

export type TaskFilterAction =
  | SetShowActiveAction
  | SetShowCompletedAction
  | SetCurrentPageAction;

const taskFilterReducer = (
  state: TaskFilter,
  action: TaskFilterAction
): TaskFilter => {
  switch (action.type) {
    case "SET_SHOW_ACTIVE":
      let activeFilter = { ...state };
      activeFilter.showActive = action.payload;
      return { ...activeFilter };
    case "SET_SHOW_COMPLETED":
      let completedFilter = { ...state };
      completedFilter.showCompleted = action.payload;
      return { ...completedFilter };
    case "SET_CURRENT_PAGE":
      let currentPageFilter = { ...state };
      currentPageFilter.currentPage = action.payload;
      return { ...currentPageFilter };
    default:
      return state;
  }
};

export default taskFilterReducer;
