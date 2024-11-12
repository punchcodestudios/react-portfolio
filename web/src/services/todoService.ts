import APIClient from "./api-client-two";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export default new APIClient<Todo>("/todos");
