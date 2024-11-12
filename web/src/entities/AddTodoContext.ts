import { Todo } from "../services/todoService";

export interface AddTodoContext {
  previousTodos: Todo[];
}
